import React from "react";
import ContactUs from "@/components/ContactUs/ContactUs";

export const metadata = {
  title: "Contact Us | Augustina Tradelink Pvt. Ltd.",
  description:
    "Get in touch with Augustina Tradelink for inquiries about our biomass solutions. Reach out via phone, email, or our contact form for expert assistance with your renewable energy projects.",
  alternates: {
    canonical: "/contact-us",
  },

  openGraph: {
    title: "Contact Us | Augustina Tradelink Pvt. Ltd.",
    description:
      "Have a question? Contact our team for expert guidance on sustainable biomass and renewable energy solutions.",
    url: "https://augustina.in/contact-us",
    images: [
      {
        url: "https://augustina.in/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Contact Us forAugustina Tradelink Pvt. Ltd.",
      },
    ],
    siteName: "Augustina Tradelink Pvt. Ltd.",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Augustina Tradelink Pvt. Ltd.",
    description:
      "Have a question? Contact our team for expert guidance on sustainable biomass and renewable energy solutions.",
    images: [
      {
        url: "https://augustina.in/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Contact Us for Augustina Tradelink Pvt. Ltd.",
      },
    ],
  },
};

const contactPage = () => {
  return <ContactUs />;
};

export default contactPage;
