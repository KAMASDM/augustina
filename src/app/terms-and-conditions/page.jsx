import TermsAndConditions from "@/components/TermsAndConditions/TermsAndConditions";
import React from "react";

export const metadata = {
  title: "Terms and Conditions | Asia Biomass Tradelink Pvt. Ltd.",
  description:
    "Read the Terms and Conditions for using the Asia Biomass Tradelink Pvt. Ltd. website. This page outlines the rules, liabilities, and governing laws for all users.",
  alternates: {
    canonical: "/terms-and-conditions",
  },

  openGraph: {
    title: "Terms and Conditions | Asia Biomass Tradelink Pvt. Ltd.",
    description:
      "Please review our Terms and Conditions before using our website and services.",
    url: "https://Asia Biomass.in/terms-and-conditions",
    images: [
      {
        url: "https://Asia Biomass.in/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Terms and Conditions for Asia Biomass Tradelink Pvt. Ltd.",
      },
    ],
    siteName: "Asia Biomass Tradelink Pvt. Ltd.",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions | Asia Biomass Tradelink Pvt. Ltd.",
    description:
      "Please review our Terms and Conditions before using our website and services.",
    images: [
      {
        url: "https://Asia Biomass.in/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Terms and Conditions for Asia Biomass Tradelink Pvt. Ltd.",
      },
    ],
  },
};

const termsAndConditionspage = () => {
  return <TermsAndConditions />;
};

export default termsAndConditionspage;
