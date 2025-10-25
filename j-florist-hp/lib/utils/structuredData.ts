import { CatalogItem } from "@/types";

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "葬儀専門のお花屋さん",
    description: "葬儀・法要向けのお花を真心込めてお届けします。迅速な対応と高品質なサービスでご遺族をサポートいたします。",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
    telephone: "000-000-0000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "〇〇町1-2-3",
      addressLocality: "〇〇市",
      addressRegion: "〇〇県",
      postalCode: "000-0000",
      addressCountry: "JP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.68123,
      longitude: 139.76454,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "¥¥",
    image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/images/og-image.jpg`,
  };
}

export function generateProductSchema(item: CatalogItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description: item.description,
    image: item.image_url,
    category: item.category,
    offers: {
      "@type": "Offer",
      price: item.price,
      priceCurrency: "JPY",
      availability: item.is_active
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "葬儀専門のお花屋さん",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/images/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "000-000-0000",
      contactType: "customer service",
      areaServed: "JP",
      availableLanguage: ["Japanese"],
    },
    sameAs: [
      // Add social media URLs if available
      // "https://www.facebook.com/yourpage",
      // "https://www.instagram.com/yourpage",
    ],
  };
}
