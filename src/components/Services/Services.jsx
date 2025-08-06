"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";
import {
  HiOutlineLightBulb,
  HiOutlineCog,
  HiOutlineRefresh,
} from "react-icons/hi";

// Helper object to map service slugs to their corresponding icons
const serviceIcons = {
  "free-consultancy": <HiOutlineLightBulb className="w-8 h-8" />,
  "optimised-solutions": <HiOutlineCog className="w-8 h-8" />,
  "project-revival": <HiOutlineRefresh className="w-8 h-8" />,
};

// This hardcoded data remains as the API doesn't provide it.
const processSteps = [
  {
    number: "01",
    title: "Initial Consultation",
    description:
      "We begin with a thorough assessment of your biomass waste processing needs.",
  },
  {
    number: "02",
    title: "Solution Design",
    description:
      "Our team develops a customized solution tailored to your specific requirements.",
  },
  {
    number: "03",
    title: "Implementation",
    description:
      "Expert installation and setup of your biomass processing equipment.",
  },
  {
    number: "04",
    title: "Support & Maintenance",
    description:
      "Ongoing technical support and maintenance services to ensure optimal performance.",
  },
];

const Services = () => {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        // NOTE: Using a placeholder API endpoint as the provided one was for the homepage.
        // Replace with your actual services API endpoint.
        const response = await axios.get(
          "https://sweekarme.in/asiabio/api/services/" // Example endpoint
        );

        // Process the data to match the component's structure
        const processedData = response.data.map((service) => {
          const descriptionParts = service.description.split("\r\n\r\n");
          const mainDescription = descriptionParts[0];
          const features =
            descriptionParts.length > 1
              ? descriptionParts[1]
                  .split("\r\n")
                  .filter((line) => line.trim() !== "")
              : [];

          return {
            ...service,
            description: mainDescription,
            features: features,
          };
        });

        setServicesData(processedData);
      } catch (err) {
        console.error("Error fetching services data:", err);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchServicesData();
  }, []);

  return (
    <div className="pt-20">
      <section className="relative bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive biomass waste solutions from consultation to
              implementation
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="text-center text-gray-600">Loading services...</div>
          )}
          {error && <div className="text-center text-red-500">{error}</div>}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesData.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-6">
                    {serviceIcons[service.slug] || (
                      <HiOutlineLightBulb className="w-8 h-8" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A systematic approach to implementing effective biomass solutions
            </p>
          </motion.div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5">
              <svg width="100%" height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  className="stroke-primary-200"
                />
              </svg>
            </div>
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative bg-white rounded-xl shadow-lg p-6 h-full text-center z-10"
              >
                <span className="text-5xl font-bold text-primary-200 mb-4 block">
                  {step.number}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-600 rounded-2xl p-8 md:p-12 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Transform Your Biomass Waste?
                </h2>
                <p className="text-primary-100 mb-6">
                  Contact us today to discuss your project and discover how we
                  can help you achieve your sustainability goals.
                </p>
                <Link href="/contact-us">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </div>
              <div className="relative h-64 md:h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600/50 to-transparent rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
