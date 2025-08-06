import React from "react";
import AboutUs from "@/components/AboutUs/AboutUs";

export const metadata = {
  title: "About Us | Asia Biomass Tradelink Pvt. Ltd.",
  description:
    "Learn about Asia Biomass Tradelink's 15-year journey in sustainable innovation. Discover our mission and vision to convert biomass waste into renewable energy solutions for a greener future.",
    alternates: {
    canonical: "/about-us",
  },

  openGraph: {
    title: "About Us | Asia Biomass Tradelink Pvt. Ltd.",
    description:
      "Discover our 15-year mission to pioneer sustainable biomass and renewable energy solutions.",
    url: "https://Asia Biomass.in/about-us",
    images: [
      {
        url: "https://Asia Biomass.in/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "About Us for Asia Biomass Tradelink Pvt. Ltd.",
      },
    ],
    siteName: "Asia Biomass Tradelink Pvt. Ltd.",
    locale: "en_US",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "About Us | Asia Biomass Tradelink Pvt. Ltd.",
    description:
      "Discover our 15-year mission to pioneer sustainable biomass and renewable energy solutions.",
    images: [
      {
        url: "https://Asia Biomass.in/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "About Us for Asia Biomass Tradelink Pvt. Ltd.",
      },
    ],
  },
};

const aboutPage = () => {
  return <AboutUs />;
};

export default aboutPage;
