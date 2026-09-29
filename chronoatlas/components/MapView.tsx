"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl, { Map as MLMap, LngLatLike } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { yearToFilename, nearestKeyframe } from "@/lib/years";
import { colorForName, inkForName, PAPER } from "@/lib/colors";
import { EVENTS } from "@/lib/events";

export interface MapViewHandle {
  flyTo: (lng: number, lat: number, zoom: number) => void;
}

export interface TerritorySelection {
  name: string;
  partOf?: string;
  subjectTo?: string;
}

interface MapViewProps {
  year: number;
  onSelectEmpire: (selection: TerritorySelection) => void;
  onSelectEvent: (id: string) => void;
  registerFlyTo: (fn: (lng: number, lat: number, zoom: number) => void) => void;
}

// CARTO's light no-labels raster, pushed toward parchment via paint tweaks,
// sits under the hand-tinted territory polygons like a printed base map.
const STYLE: maplibregl.StyleSpecification = {
  version: 8,
  glyphs: "https://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
  sources: {
    "carto-light": {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png",
        "https://c.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png",
        "https://d.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors © CARTO",
    },
  },
  layers: [
    { id: "bg", type: "background", paint: { "background-color": PAPER.sea } },
    {
      id: "carto-light-layer",
      type: "raster",
      source: "carto-light",
      paint: {
        "raster-opacity": 0.9,
        "raster-brightness-min": 0.94,
        "raster-brightness-max": 1,
        "raster-saturation": -0.7,
        "raster-contrast": -0.05,
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

  // Keep the latest callbacks in refs so the once-registered map handlers
  // never close over a stale identity from an earlier render.
  const onSelectEmpireRef = useRef(onSelectEmpire);
  const onSelectEventRef = useRef(onSelectEvent);
  useEffect(() => {
    onSelectEmpireRef.current = onSelectEmpire;
    onSelectEventRef.current = onSelectEvent;
  }, [onSelectEmpire, onSelectEvent]);

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
          "fill-color": ["coalesce", ["get", "fillColor"], PAPER.land],
          "fill-opacity": 0,
          "fill-opacity-transition": { duration: 500 },
        },
      });

      map.addLayer({
        id: "territories-line",
        type: "line",
        source: "territories",
        paint: {
          "line-color": ["coalesce", ["get", "inkColor"], "#5d5344"],
          "line-width": ["interpolate", ["linear"], ["zoom"], 2, 0.7, 5, 1.1, 8, 1.6],
          "line-opacity": 0,
          "line-opacity-transition": { duration: 500 },
        },
      });

      map.addLayer({
        id: "territories-label",
        type: "symbol",
        source: "territories",
        layout: {
          "text-field": ["coalesce", ["get", "NAME"], ""],
          "text-font": ["Noto Sans Regular"],
          "text-transform": "uppercase",
          "text-letter-spacing": 0.14,
          "text-size": ["interpolate", ["linear"], ["zoom"], 2.5, 9.5, 5, 12, 8, 15],
          "text-padding": 6,
        },
        paint: {
          "text-color": "rgba(61, 52, 38, 0.82)",
          "text-halo-color": "rgba(233, 223, 200, 0.85)",
          "text-halo-width": 1.1,
          "text-opacity": 0,
          "text-opacity-transition": { duration: 500 },
        },
      });

      const namedAt = (point: maplibregl.PointLike) => {
        try {
          const hits = map.queryRenderedFeatures(point, {
            layers: ["territories-fill"],
          });
          // Most polygons in the dataset have NAME: null (seas, anonymous
          // regions). Prefer the topmost hit that actually has a name so
          // unnamed overlays don't swallow clicks on real polities.
          return hits.find((f) => {
            const n = (f.properties as Record<string, unknown> | null | undefined)?.NAME;
            return typeof n === "string" && n.length > 0;
          });
        } catch {
          // Style can transiently be mid-transition during scrubbing.
          return undefined;
        }
      };

      // Map-level handlers instead of per-layer delegated events: the
      // queryRenderedFeatures filter already ignores unnamed/sea polygons.
      map.on("mousemove", (e) => {
        map.getCanvas().style.cursor = namedAt(e.point) ? "pointer" : "";
      });

      map.on("click", (e) => {
        const feat = namedAt(e.point);
        const props = feat?.properties as Record<string, unknown> | undefined;
        const name = props?.NAME;
        if (props && typeof name === "string" && name.length > 0) {
          onSelectEmpireRef.current({
            name,
            partOf: typeof props.PARTOF === "string" ? props.PARTOF : undefined,
            subjectTo: typeof props.SUBJECTO === "string" ? props.SUBJECTO : undefined,
          });
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
        // Inject deterministic per-territory color so the paint expressions
        // can just read plain properties.
        for (const f of data!.features) {
          const name = (f.properties as Record<string, unknown> | null)?.NAME;
          const n = typeof name === "string" && name.length > 0 ? name : null;
          f.properties = {
            ...(f.properties as Record<string, unknown>),
            fillColor: colorForName(n),
            inkColor: inkForName(n),
          };
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
    map.setPaintProperty("territories-label", "text-opacity", 0);
    window.setTimeout(() => {
      // Another keyframe may have been requested during the fade window.
      if (currentKeyframeRef.current !== keyframe) return;
      source.setData(data as GeoJSON.FeatureCollection);
      map.setPaintProperty("territories-fill", "fill-opacity", 0.6);
      map.setPaintProperty("territories-line", "line-opacity", 0.85);
      map.setPaintProperty("territories-label", "text-opacity", 0.85);
    }, 260);
  }, []);

  useEffect(() => {
    if (!ready) return;
    // Deferred so the async load's state updates happen in a callback,
    // not synchronously in the effect body.
    queueMicrotask(() => loadYear(nearestKeyframe(year)));
  }, [ready, year, loadYear]);

  // Event pins — added once map is ready, rendered as wax seals on the paper
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    EVENTS.forEach((ev) => {
      // The marker ROOT element is positioned by MapLibre via an inline
      // `transform: translate(...)` — never touch transform on it, or the
      // pin jumps to the pane origin. Visuals + hover live on an inner span.
      const el = document.createElement("button");
      el.setAttribute("aria-label", ev.title);
      el.title = `${ev.title} — ${ev.displayYear}`;

      const face = document.createElement("span");
      face.style.cssText = `
        width: 22px; height: 22px; border-radius: 999px;
        display: flex; align-items: center; justify-content: center;
        font-size: 12px; line-height: 1;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
        transform-origin: center;
      ` + (ev.importance === "high"
        ? `background: #e9dfc8; border: 1.5px solid #6f5f45; color: #3d3426;
           box-shadow: 0 1px 4px rgba(60, 48, 30, 0.45);`
        : `background: rgba(233, 223, 200, 0.85); border: 1px solid rgba(111, 95, 69, 0.6);
           color: rgba(61, 52, 38, 0.75); box-shadow: 0 1px 3px rgba(60, 48, 30, 0.3);`);
      face.innerText = ev.icon;
      face.onmouseenter = () => {
        face.style.transform = "scale(1.2)";
        face.style.boxShadow = "0 2px 8px rgba(60, 48, 30, 0.5)";
      };
      face.onmouseleave = () => {
        face.style.transform = "";
        face.style.boxShadow = "";
      };
      el.appendChild(face);

      el.onclick = (e) => {
        e.stopPropagation();
        onSelectEventRef.current(ev.id);
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
  }, [ready]);

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
