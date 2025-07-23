import About from "@/components/Home/About";
import Clients from "@/components/Home/Clients";
import Hero from "@/components/Home/Hero";
import Offers from "@/components/Home/Offers";
import Services from "@/components/Home/Services";
import Testimonials from "@/components/Home/Testimonials";

const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Augustina Tradelink Pvt. Ltd.",
  url: "https://augustina.in",
  logo: "https://augustina.in/assets/images/logo.png",
  sameAs: [
    "https://www.facebook.com/augustina",
    "https://www.instagram.com/augustina",
    "https://x.com/augustina",
  ],
  description:
    "Augustina Tradelink is a leading provider of trade and logistics solutions for the global marketplace.",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <div className="overflow-hidden pt-20">
        <Hero />
        <About />
        <Services />
        <Offers />
        <Testimonials />
        <Clients />
      </div>
    </>
  );
}
