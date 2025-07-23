import React from "react";
import Products from "@/components/Products/Products";

export const metadata = {
  title: "Our Products | Augustina Tradelink Pvt. Ltd.",
  description:
    "Explore our range of advanced biomass processing equipment, including heavy-duty shredders, dewatering presses, and bio compactors. Engineered for efficiency and sustainability.",
  alternates: {
    canonical: "/products",
  },

  openGraph: {
    title: "Our Products | Augustina Tradelink Pvt. Ltd.",
    description:
      "Discover our high-performance biomass processing equipment, designed for a sustainable future.",
    url: "https://augustina.in/products",
    images: [
      {
        url: "https://augustina.in/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "A showcase of Augustina Tradelink's biomass processing equipment.",
      },
    ],
    siteName: "Augustina Tradelink Pvt. Ltd.",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Our Products | Augustina Tradelink Pvt. Ltd.",
    description:
      "Discover our high-performance biomass processing equipment, designed for a sustainable future.",
    images: [
      {
        url: "https://augustina.in/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "A showcase of Augustina Tradelink's biomass processing equipment.",
      },
    ],
  },
};

const productsPage = () => {
  return <Products />;
};

export default productsPage;
