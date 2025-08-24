// src/app/products/page.jsx
import React from "react";
import Products from "@/components/Products/Products";
import CalculatorApp from "@/components/Calculator/CalculatorApp";

export const metadata = {
  title: "Our Products | Asia Biomass Tradelink Pvt. Ltd.",
  description:
    "Explore our range of advanced biomass processing equipment, including heavy-duty shredders, dewatering presses, and bio compactors. Engineered for efficiency and sustainability.",
  alternates: {
    canonical: "/products",
  },

  openGraph: {
    title: "Our Products | Asia Biomass Tradelink Pvt. Ltd.",
    description:
      "Discover our high-performance biomass processing equipment, designed for a sustainable future.",
    url: "https://Asia Biomass.in/products",
    images: [
      {
        url: "https://Asia Biomass.in/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "A showcase of Asia Biomass Tradelink's biomass processing equipment.",
      },
    ],
    siteName: "Asia Biomass Tradelink Pvt. Ltd.",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Our Products | Asia Biomass Tradelink Pvt. Ltd.",
    description:
      "Discover our high-performance biomass processing equipment, designed for a sustainable future.",
    images: [
      {
        url: "https://Asia Biomass.in/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "A showcase of Asia Biomass Tradelink's biomass processing equipment.",
      },
    ],
  },
};

const productsPage = () => {
  return (
    <>
      <Products />
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Biomass Project Calculator
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estimate the requirements for your next project with our easy-to-use calculator.
            </p>
          </div>
          <CalculatorApp />
        </div>
      </div>
    </>
  );
};

export default productsPage;