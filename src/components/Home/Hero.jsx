// src/components/Home/Hero.jsx
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  HiArrowRight,
  HiOutlineChartBar,
  HiOutlineLightBulb,
  HiOutlineGlobe,
} from "react-icons/hi";

const features = [
  {
    icon: <HiOutlineChartBar className="w-6 h-6" />,
    title: "21+ Projects",
    description: "Successfully Completed",
  },
  {
    icon: <HiOutlineLightBulb className="w-6 h-6" />,
    title: "15+ Years",
    description: "Industry Experience",
  },
  {
    icon: <HiOutlineGlobe className="w-6 h-6" />,
    title: "Global Reach",
    description: "International Solutions",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Hero = ({ heroData }) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50" />
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[120%] h-full">
          <svg
            className="absolute inset-0 w-full h-full text-primary-100/30"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <pattern
              id="heroPattern"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(10)"
            >
              <circle cx="1" cy="1" r="1" />
            </pattern>
            <rect width="100" height="100" fill="url(#heroPattern)" />
          </svg>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <motion.div variants={itemVariants}>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                dangerouslySetInnerHTML={{ __html: heroData.hero_title }}
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl"
              dangerouslySetInnerHTML={{ __html: heroData.hero_subtitle }}
            />

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href={heroData.hero_cta_link || "/contact-us"}
                aria-label="Get started with our green energy solutions"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-8 py-3 bg-primary-500 text-white rounded-full font-medium hover:bg-primary-600 transition-colors"
                >
                  Get Started
                  <HiArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </Link>
              <Link
                href="/about-us"
                aria-label="Learn more about our company and technology"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-primary-500 text-primary-600 rounded-full font-medium hover:bg-primary-50 transition-colors"
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[600px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={`https://sweekarme.in${heroData.hero_image}`}
                  alt="Modern biomass energy facility with processing machinery under a clear sky, symbolizing a green future."
                  fill
                  className="object-cover rounded-2xl shadow-2xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-transparent rounded-2xl" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <HiOutlineLightBulb className="w-6 h-6 text-primary-600" />
                  </div>
                 
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg"
              >
                <p className="text-sm font-semibold text-primary-600">
                  20M+ Tonnes
                </p>
                <p className="text-xs text-gray-600">
                  Biomass Processing Target
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;