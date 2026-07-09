const BASE_URL = "https://www.southerncontainersolutions.com";

export function getLocalBusinessSchema() {
  const organizationId = `${BASE_URL}/#localbusiness`;

  const city = (name, stateName) => ({
    "@type": "City",
    name,
    containedInPlace: {
      "@type": "State",
      name: stateName,
    },
  });

  const state = (name) => ({
    "@type": "State",
    name,
  });

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": organizationId,
    name: "Southern Container Solutions",
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.svg`,
    image: `${BASE_URL}/favicon.svg`,
    telephone: "+1-985-251-2356",
    email: "info@southerncontainersolutions.com",
    priceRange: "$$",
    description:
      "Southern Container Solutions builds and delivers commercial shipping container offices and jobsite command centers across the Gulf South industrial corridor. Turnkey 20' and 40' containerized offices for refineries, chemical plants, shipyards, and mega construction projects.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Covington",
      addressRegion: "LA",
      postalCode: "70433",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.4755,
      longitude: -90.1009,
    },
    areaServed: [
      state("Louisiana"),
      state("Texas"),
      state("Mississippi"),
      state("Alabama"),
      city("Houston", "Texas"),
      city("Baton Rouge", "Louisiana"),
      city("Mobile", "Alabama"),
      city("Beaumont", "Texas"),
      city("Lake Charles", "Louisiana"),
      city("Corpus Christi", "Texas"),
      city("Gulfport", "Mississippi"),
      city("Lafayette", "Louisiana"),
      city("Geismar", "Louisiana"),
      city("Pasadena", "Texas"),
      city("Baytown", "Texas"),
    ],
    knowsAbout: [
      "Commercial Shipping Container Offices",
      "Jobsite Command Centers",
      "Containerized Mobile Offices",
      "Industrial Jobsite Offices",
      "Shipping Container Modifications",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${BASE_URL}/#service-container-offices`,
          name: "Commercial Shipping Container Offices",
          serviceType: "Commercial Shipping Container Offices",
          description:
            "Turnkey 20' and 40' climate-controlled shipping container offices built for commercial jobsites, refinery turnarounds, and industrial staging across Louisiana, Texas, Mississippi, and Alabama.",
          provider: {
            "@id": organizationId,
          },
          areaServed: [
            state("Louisiana"),
            state("Texas"),
            state("Mississippi"),
            state("Alabama"),
          ],
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${BASE_URL}/#service-jobsite-command-centers`,
          name: "Jobsite Command Centers",
          serviceType: "Jobsite Command Centers",
          description:
            "Ground-level, steel-framed jobsite command centers for project managers, engineers, and safety teams on Gulf South industrial and construction sites.",
          provider: {
            "@id": organizationId,
          },
          areaServed: [
            state("Louisiana"),
            state("Texas"),
            state("Mississippi"),
            state("Alabama"),
          ],
        },
      },
    ],
  };
}
