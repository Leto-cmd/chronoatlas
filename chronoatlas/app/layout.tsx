import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChronoAtlas — Watch History Happen",
  description:
    "Explore history spatially. Drag through time and watch empires rise, expand, and fall on an interactive map of the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg text-text">
        {children}
      </body>
    </html>
  );
}
