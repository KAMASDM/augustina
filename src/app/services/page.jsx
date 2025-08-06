import React from "react";
import Services from "@/components/Services/Services";

export const metadata = {
  title: "Our Services | Asia Biomass Tradelink Pvt. Ltd.",
  description:
    "Discover the comprehensive services offered by Asia Biomass Tradelink, including free consultancy, optimized biomass solutions, and project revival for non-functional systems.",
  alternates: {
    canonical: "/services",
  },

  openGraph: {
    title: "Our Services | Asia Biomass Tradelink Pvt. Ltd.",
    description:
      "From expert consultancy to project implementation and revival, explore our end-to-end biomass solutions.",
    url: "https://Asia Biomass.in/services",
    images: [
      {
        url: "https://Asia Biomass.in/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "An overview of Asia Biomass Tradelink's biomass project services.",
      },
    ],
    siteName: "Asia Biomass Tradelink Pvt. Ltd.",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Our Services | Asia Biomass Tradelink Pvt. Ltd.",
    description:
      "From expert consultancy to project implementation and revival, explore our end-to-end biomass solutions.",
    images: [
      {
        url: "https://Asia Biomass.in/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "An overview of Asia Biomass Tradelink's biomass project services.",
      },
    ],
  },
};

const servicesPage = () => {
  return <Services />;
};

export default servicesPage;
