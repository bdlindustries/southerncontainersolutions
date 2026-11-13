/** Legacy top-level city URLs → canonical `/locations/{slug}` paths. */
export const ROOT_CITY_REDIRECTS = [
  { source: "/gulfport-ms", destination: "/locations/gulfport-ms" },
  { source: "/pascagoula-ms", destination: "/locations/pascagoula-ms" },
  { source: "/mobile-al", destination: "/locations/mobile-al" },
  { source: "/morgan-city-la", destination: "/locations/morgan-city-la" },
  { source: "/geismar-la", destination: "/locations/geismar-la" },
] as const;
