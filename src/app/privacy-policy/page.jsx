import React from "react";
import PrivacyPolicy from "@/components/PrivacyPolicy/PrivacyPolicy";

export const metadata = {
  title: "Privacy Policy | Asia Biomass Tradelink Pvt. Ltd.",
  description:
    "Review the Privacy Policy for Asia Biomass Tradelink Pvt. Ltd. Understand how we collect, use, and protect your personal information when you visit our website and use our services.",
  alternates: {
    canonical: "/privacy-policy",
  },

  openGraph: {
    title: "Privacy Policy | Asia Biomass Tradelink Pvt. Ltd.",
    description:
      "Learn how we handle your data and our commitment to protecting your privacy.",
    url: "https://Asia Biomass.in/privacy-policy",
    images: [
      {
        url: "https://Asia Biomass.in/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Privacy Policy for Asia Biomass Tradelink Pvt. Ltd.",
      },
    ],
    siteName: "Asia Biomass Tradelink Pvt. Ltd.",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Asia Biomass Tradelink Pvt. Ltd.",
    description:
      "Learn how we handle your data and our commitment to protecting your privacy.",
    images: [
      {
        url: "https://Asia Biomass.in/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Privacy Policy for Asia Biomass Tradelink Pvt. Ltd.",
      },
    ],
  },
};

const privacyPolicyPage = () => {
  return <PrivacyPolicy />;
};

export default privacyPolicyPage;
