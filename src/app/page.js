import HomePage from "@/components/Home/HomePage"
const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Asia Biomass Tradelink Pvt. Ltd.",
  url: "https://asiabiomass.in",
  logo: "https://AsiaBiomass.in/assets/images/logo.png",
  sameAs: [
    "https://www.facebook.com/AsiaBiomass",
    "https://www.instagram.com/AsiaBiomass",
    "https://x.com/Asia Biomass",
  ],
  description:
    "Asia Biomass Tradelink is a leading provider of trade and logistics solutions for the global marketplace.",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <div className="overflow-hidden pt-20">
        <HomePage/>
      </div>
    </>
  );
}
