// src/components/AboutUs/AboutUs.jsx
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  HiOutlineLightBulb,
  HiOutlineEye,
  HiChip,
  HiGlobe,
  HiOutlineUserGroup,
  HiOutlineBookOpen,
} from "react-icons/hi";
import Image from "next/image";

const valueIcons = {
  "Expert Team": <HiOutlineUserGroup className="w-6 h-6" />,
  "Innovative Technology": <HiChip className="w-6 h-6" />,
  "Global Reach": <HiGlobe className="w-6 h-6" />,
};

const AboutUsContent = ({ aboutData }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const companyValues = aboutData.company_values || [];
  const teamMembers = aboutData.team_members || [];

  return (
    <div className="pt-20 bg-gray-50">
      <section className="relative bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.3 } },
            }}
            className="text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              {aboutData.title || "Sustainable Innovation"}
            </motion.h1>
            <motion.div
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{
                __html: aboutData.intro_content || "",
              }}
            />
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {aboutData.story_title || "Our Story"}
              </h2>
              <div
                className="text-gray-600 space-y-4"
                dangerouslySetInnerHTML={{
                  __html: aboutData.story_content || "",
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-80 rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src={
                  aboutData.intro_image
                    ? `https://sweekarme.in${aboutData.intro_image}`
                    : "/assets/images/story-placeholder.jpg"
                }
                alt="Our company's journey"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <HiOutlineLightBulb className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {aboutData.mission_title || "Our Mission"}
              </h2>
              <div
                className="text-gray-600 space-y-4"
                dangerouslySetInnerHTML={{
                  __html: aboutData.mission_content || "",
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <HiOutlineEye className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {aboutData.vision_title || "Our Vision"}
              </h2>
              <div
                className="text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: aboutData.vision_content || "",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-b from-white to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {aboutData.values_title || "Our Core Values"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide our work and define our commitment to a
              greener future.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4 mx-auto">
                  {valueIcons[value.title] || <HiChip className="w-6 h-6" />}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {aboutData.team_title || "Meet Our Team"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The dedicated professionals driving our mission forward.
            </p>
          </motion.div>

          <div className="mt-16">
            {teamMembers && teamMembers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100 flex flex-col items-center"
                  >
                    <div className="relative w-32 h-32 mb-4">
                      <Image
                        src={
                          member.image
                            ? `https://sweekarme.in${member.image}`
                            : `https://placehold.co/200x200/d1fae5/166534?text=${member.name.charAt(
                                0
                              )}`
                        }
                        alt={member.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 font-semibold mb-3">
                      {member.position}
                    </p>
                    <div
                      className="text-sm text-gray-600 text-left space-y-2 prose prose-sm"
                      dangerouslySetInnerHTML={{ __html: member.bio }}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 bg-white p-12 rounded-2xl shadow-md">
                <HiOutlineUserGroup className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-lg">
                  Our dedicated team members' profiles are coming soon.
                </p>
                <p>Stay tuned to meet the experts behind our success.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// This is the main page component that fetches data.
const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get(
          "https://sweekarme.in/asiabio/api/about/"
        );
        setAboutData(response.data);
      } catch (err) {
        console.error("Error fetching about page data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-700">Loading About Us Page...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-600">Error: Failed to load page data.</p>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-700">No data available to display.</p>
      </div>
    );
  }

  return <AboutUsContent aboutData={aboutData} />;
};

export default AboutPage;