import TermsAndConditions from "@/components/TermsAndConditions/TermsAndConditions";
import React from "react";

export const metadata = {
  title: "Terms and Conditions | Augustina Tradelink Pvt. Ltd.",
  description:
    "Read the Terms and Conditions for using the Augustina Tradelink Pvt. Ltd. website. This page outlines the rules, liabilities, and governing laws for all users.",
  alternates: {
    canonical: "/terms-and-conditions",
  },

  openGraph: {
    title: "Terms and Conditions | Augustina Tradelink Pvt. Ltd.",
    description:
      "Please review our Terms and Conditions before using our website and services.",
    url: "https://augustina.in/terms-and-conditions",
    images: [
      {
        url: "https://augustina.in/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Terms and Conditions for Augustina Tradelink Pvt. Ltd.",
      },
    ],
    siteName: "Augustina Tradelink Pvt. Ltd.",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions | Augustina Tradelink Pvt. Ltd.",
    description:
      "Please review our Terms and Conditions before using our website and services.",
    images: [
      {
        url: "https://augustina.in/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Terms and Conditions for Augustina Tradelink Pvt. Ltd.",
      },
    ],
  },
};

const termsAndConditionspage = () => {
  return <TermsAndConditions />;
};

export default termsAndConditionspage;
