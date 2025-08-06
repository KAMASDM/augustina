import React from "react";
import ContactUs from "@/components/ContactUs/ContactUs";

export const metadata = {
  title: "Contact Us | Asia Biomass Tradelink Pvt. Ltd.",
  description:
    "Get in touch with Asia Biomass Tradelink for inquiries about our biomass solutions. Reach out via phone, email, or our contact form for expert assistance with your renewable energy projects.",
  alternates: {
    canonical: "/contact-us",
  },

  openGraph: {
    title: "Contact Us | Asia Biomass Tradelink Pvt. Ltd.",
    description:
      "Have a question? Contact our team for expert guidance on sustainable biomass and renewable energy solutions.",
    url: "https://Asia Biomass.in/contact-us",
    images: [
      {
        url: "https://Asia Biomass.in/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Contact Us forAsia Biomass Tradelink Pvt. Ltd.",
      },
    ],
    siteName: "Asia Biomass Tradelink Pvt. Ltd.",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Asia Biomass Tradelink Pvt. Ltd.",
    description:
      "Have a question? Contact our team for expert guidance on sustainable biomass and renewable energy solutions.",
    images: [
      {
        url: "https://Asia Biomass.in/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Contact Us for Asia Biomass Tradelink Pvt. Ltd.",
      },
    ],
  },
};

const contactPage = () => {
  return <ContactUs />;
};

export default contactPage;
