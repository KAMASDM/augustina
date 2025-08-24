// app/blogs/page.jsx

import React from "react";
import Blogs from "@/components/Blogs/Blogs";

export const metadata = {
  title: "Our Blog | Asia Biomass Tradelink Pvt. Ltd.",
  description:
    "Read the latest articles, news, and insights from the biomass industry. Stay informed with updates from Asia Biomass Tradelink Pvt. Ltd.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Our Blog | Asia Biomass Tradelink Pvt. Ltd.",
    description:
      "Insights, news, and articles on biomass processing technology and sustainability.",
    url: "https://asiabiomass.in/blogs",
    images: [
      {
        url: "https://asiabiomass.in/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Asia Biomass Tradelink Pvt. Ltd. Blog",
      },
    ],
    siteName: "Asia Biomass Tradelink Pvt. Ltd.",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Blog | Asia Biomass Tradelink Pvt. Ltd.",
    description:
      "Insights, news, and articles on biomass processing technology and sustainability.",
    images: ["https://asiabiomass.in/assets/images/logo.png"],
  },
};

const blogsPage = () => {
  return <Blogs />;
};

export default blogsPage;