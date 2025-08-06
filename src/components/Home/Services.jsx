"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaLeaf,
  FaRecycle,
  FaCog,
  FaTools,
  FaIndustry,
  FaWrench,
} from "react-icons/fa";

const iconMap = {
  "Free Consultancy": <FaLeaf className="w-8 h-8" />,
  "Optimised Solutions": <FaRecycle className="w-8 h-8" />,
  "Design & Engineering": <FaCog className="w-8 h-8" />,
  "Project Revival": <FaTools className="w-8 h-8" />,
  "Customized Solutions": <FaIndustry className="w-8 h-8" />,
  "Installation & Commissioning": <FaWrench className="w-8 h-8" />,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};
const Services = ({ serviceData }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const services = serviceData.why_choose_us_items || [];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-primary-600 mb-4"
          >
            {serviceData.why_choose_us_title || "What We Do"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Provide Innovative & Commercially Viable Solutions
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id || index}
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
            >
              <div className="text-primary-500 mb-4">
                {iconMap[service.title] || <FaCog className="w-8 h-8" />}
              </div>
              <h3 className="text-xl font-semibold text-primary-600 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 flex-grow">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
