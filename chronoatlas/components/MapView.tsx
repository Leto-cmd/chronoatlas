"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl, { Map as MLMap, LngLatLike } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { yearToFilename, nearestKeyframe } from "@/lib/years";
import { colorForName } from "@/lib/colors";
import { EVENTS } from "@/lib/events";

export interface MapViewHandle {
  flyTo: (lng: number, lat: number, zoom: number) => void;
}

interface MapViewProps {
  year: number;
  onSelectEmpire: (name: string) => void;
  onSelectEvent: (id: string) => void;
  registerFlyTo: (fn: (lng: number, lat: number, zoom: number) => void) => void;
}

// MapLibre only expands {z}/{x}/{y} — Leaflet's {r}/{s} tokens break tile
// loading and leave a blank canvas that blends into the dark page background.
const STYLE: maplibregl.StyleSpecification = {
  version: 8,
  glyphs: "https://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
  sources: {
    "carto-dark": {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png",
        "https://c.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png",
        "https://d.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors © CARTO",
    },
  },
  layers: [
    { id: "bg", type: "background", paint: { "background-color": "#0a0f1f" } },
    {
      id: "carto-dark-layer",
      type: "raster",
      source: "carto-dark",
      paint: {
        "raster-opacity": 0.55,
        "raster-brightness-min": 0,
        "raster-brightness-max": 0.35,
        "raster-saturation": -0.35,
        "raster-contrast": 0.12,
      },
    },
  ],
};

const EMPTY_FC: GeoJSON.FeatureCollection = { type: "FeatureCollection", features: [] };

export default function MapView({
  year,
  onSelectEmpire,
  onSelectEvent,
  registerFlyTo,
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MLMap | null>(null);
  const cacheRef = useRef<Map<number, GeoJSON.FeatureCollection>>(new Map());
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [ready, setReady] = useState(false);
  const [loadingBorders, setLoadingBorders] = useState(false);
  const currentKeyframeRef = useRef<number | null>(null);

  // Init map once
  useEffect(() => {
    if (!containerRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE,
      center: [15, 30],
      zoom: 2.1,
      minZoom: 1.4,
      maxZoom: 8,
      attributionControl: { compact: true },
    });
    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");

    map.on("load", () => {
      map.resize();
      map.addSource("territories", { type: "geojson", data: EMPTY_FC });

      map.addLayer({
        id: "territories-fill",
        type: "fill",
        source: "territories",
        paint: {
          "fill-color": ["coalesce", ["get", "fillColor"], "#3a4a66"],
          "fill-opacity": 0,
          "fill-opacity-transition": { duration: 500 },
        },
      });

      map.addLayer({
        id: "territories-line",
        type: "line",
        source: "territories",
        paint: {
          "line-color": ["coalesce", ["get", "fillColor"], "#3a4a66"],
          "line-width": 1.1,
          "line-opacity": 0,
          "line-opacity-transition": { duration: 500 },
        },
      });

      const namedAt = (point: maplibregl.PointLike) => {
        const hits = map.queryRenderedFeatures(point, {
          layers: ["territories-fill"],
        });
        // Most polygons in the dataset have NAME: null (seas, anonymous
        // regions). Prefer the topmost hit that actually has a name so
        // unnamed overlays don't swallow clicks on real empires.
        return hits.find((f) => {
          const n = f.properties?.NAME;
          return typeof n === "string" && n.length > 0;
        });
      };

      map.on("mousemove", "territories-fill", (e) => {
        map.getCanvas().style.cursor = namedAt(e.point) ? "pointer" : "";
      });
      map.on("mouseleave", "territories-fill", () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("click", "territories-fill", (e) => {
        const feat = namedAt(e.point);
        const name = feat?.properties?.NAME;
        if (typeof name === "string" && name.length > 0) {
          onSelectEmpire(name);
        }
      });

      setReady(true);
    });

    // Catch late layout (flex/absolute) so the WebGL canvas isn't 0×0.
    const onWinResize = () => map.resize();
    window.addEventListener("resize", onWinResize);
    requestAnimationFrame(() => map.resize());

    registerFlyTo((lng, lat, zoom) => {
      mapRef.current?.flyTo({
        center: [lng, lat] as LngLatLike,
        zoom,
        duration: 2200,
        curve: 1.4,
        essential: true,
      });
    });

    return () => {
      window.removeEventListener("resize", onWinResize);
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load + crossfade territory borders when the active keyframe year changes
  const loadYear = useCallback(async (keyframe: number) => {
    const map = mapRef.current;
    if (!map) return;
    if (currentKeyframeRef.current === keyframe) return;
    currentKeyframeRef.current = keyframe;

    let data = cacheRef.current.get(keyframe);
    if (!data) {
      setLoadingBorders(true);
      try {
        const res = await fetch(yearToFilename(keyframe));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        data = await res.json();
        // Inject deterministic per-territory color so the fill-color expression
        // can just read a plain property.
        for (const f of data!.features) {
          const name = f.properties?.NAME ?? null;
          f.properties = { ...f.properties, fillColor: colorForName(name) };
        }
        cacheRef.current.set(keyframe, data!);
      } catch (err) {
        console.error(`Failed to load borders for ${keyframe}:`, err);
        currentKeyframeRef.current = null;
        setLoadingBorders(false);
        return;
      }
      setLoadingBorders(false);
    }

    // Guard against race: another year may have been requested meanwhile.
    if (currentKeyframeRef.current !== keyframe) return;

    const source = map.getSource("territories") as maplibregl.GeoJSONSource | undefined;
    if (!source) return;

    // fade out -> swap data -> fade in
    map.setPaintProperty("territories-fill", "fill-opacity", 0);
    map.setPaintProperty("territories-line", "line-opacity", 0);
    window.setTimeout(() => {
      source.setData(data as GeoJSON.FeatureCollection);
      map.setPaintProperty("territories-fill", "fill-opacity", 0.62);
      map.setPaintProperty("territories-line", "line-opacity", 0.9);
    }, 260);
  }, []);

  useEffect(() => {
    if (!ready) return;
    loadYear(nearestKeyframe(year));
  }, [ready, year, loadYear]);

  // Event pins — added once map is ready, filtered by relevance to current era
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    EVENTS.forEach((ev) => {
      const el = document.createElement("button");
      el.setAttribute("aria-label", ev.title);
      el.style.cssText = `
        width: 30px; height: 30px; border-radius: 999px;
        display: flex; align-items: center; justify-content: center;
        background: rgba(13,19,38,0.9); border: 1.5px solid rgba(232,184,75,0.7);
        box-shadow: 0 0 12px rgba(232,184,75,0.45);
        font-size: 14px; cursor: pointer; transform-origin: center;
      `;
      el.innerText = ev.icon;
      el.onclick = (e) => {
        e.stopPropagation();
        onSelectEvent(ev.id);
      };

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([ev.lng, ev.lat])
        .addTo(map);
      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
    };
  }, [ready, onSelectEvent]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
      {loadingBorders && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 rounded-full bg-panel border border-border text-xs text-text-muted font-mono">
          Drawing borders…
        </div>
      )}
    </div>
  );
}
