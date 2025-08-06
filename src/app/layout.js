import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import TidioChat from "@/components/Layout/TidioChat";

export const metadata = {
  title: "Asia Biomass Tradelink Pvt. Ltd.",
  description:
    "Asia Biomass Tradelink is a leading provider of trade and logistics solutions for the global marketplace.",
  icons: {
    icon: [
      { url: "/assets/images/logo.png" },
      { url: "/assets/images/logo.png", sizes: "32x32", type: "image/png" },
    ],
    apple: {
      url: "/assets/images/logo.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
  
  openGraph: {
    title: "Asia Biomass Tradelink Pvt. Ltd.",
    description:
      "Asia Biomass Tradelink is a leading provider of trade and logistics solutions for the global marketplace.",
    images: [
      {
        url: "https://Asia Biomass.in/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Asia Biomass Tradelink Pvt. Ltd.",
      },
    ],
    siteName: "Asia Biomass Tradelink Pvt. Ltd.",
    locale: "en_US",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Asia Biomass Tradelink Pvt. Ltd.",
    description:
      "Asia Biomass Tradelink is a leading provider of trade and logistics solutions for the global marketplace.",
    images: [
      {
        url: "https://Asia Biomass.in/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Asia Biomass Tradelink Pvt. Ltd.",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Header />
        {children}
        <Footer />
        <TidioChat />
      </body>
    </html>
  );
}
