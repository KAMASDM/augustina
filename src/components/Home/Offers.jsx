"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlineScale,
} from "react-icons/hi";

// NOTE: The API data does not currently include an "offers" section.
// This component uses static data as a placeholder.
const offersData = [
  {
    icon: <HiOutlineCurrencyDollar className="w-8 h-8" />,
    title: "CONVERT YOUR BIOMASS WASTE TO BRIQUETTE",
    price: "US$06.00 PER MT",
    description:
      "We provide equipment to convert your biomass waste to briquettes.",
    buttonText: "Contact Us",
    image: "/assets/images/offer/CONVERT YOUR BIOMASS.jpg",
    altText:
      "A pile of freshly made biomass briquettes, ready for use as fuel.",
    highlight: "Most Popular",
  },
  {
    icon: <HiOutlineClock className="w-8 h-8" />,
    title: "EQUIPMENTS ON LEASE",
    price: "Starting from $2000/month",
    description:
      "We provide equipment to convert your biomass waste to briquettes on lease.",
    buttonText: "Get Details",
    image: "/assets/images/offer/EQUIPMENTS ON LEASE.png",
    altText:
      "Industrial biomass processing equipment in a clean facility, available for lease.",
  },
  {
    icon: <HiOutlineScale className="w-8 h-8" />,
    title: "BUILD-OWN-OPERATE-TRANSFER (B.O.O.T)",
    price: "Custom Solutions",
    description:
      "We provide equipment on a B.O.O.T basis for long-term partnership.",
    buttonText: "Learn More",
    image: "/assets/images/offer/BUILD-OWN.jpg",
    altText: "Engineers collaborating on a large-scale biomass project plan.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Offers = ({ offers }) => {
  // The 'offers' prop is passed but not used yet
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-b from-white to-primary-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Offers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect solution for your biomass waste conversion needs.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {offersData.map((offer, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden group flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={offer.image}
                  alt={offer.altText}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30" />
              </div>

              {offer.highlight && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {offer.highlight}
                  </span>
                </div>
              )}

              <div className="p-6 flex flex-col flex-grow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                  {offer.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {offer.title}
                </h3>

                <div className="text-2xl font-bold text-primary-600 mb-4">
                  {offer.price}
                </div>

                <p className="text-gray-600 mb-6 flex-grow">
                  {offer.description}
                </p>

                <div className="mt-auto">
                  <p className="text-sm text-gray-500 mb-4">
                    Terms and conditions apply
                  </p>
                  <Link
                    href="/contact-us"
                    aria-label={`Find out more about our offer: ${offer.title}`}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
                    >
                      {offer.buttonText}
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-6">
            Need a custom solution? Let's discuss your specific requirements.
          </p>
          <Link href="/contact-us">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-500 text-white px-8 py-3 rounded-full font-medium hover:bg-primary-600 transition-colors"
            >
              Contact Our Experts
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Offers;
