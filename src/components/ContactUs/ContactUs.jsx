"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HiPhone,
  HiMail,
  HiLocationMarker,
  HiClock,
  HiCheck,
  HiExclamationCircle,
} from "react-icons/hi";
import emailjs from "emailjs-com";

const contactInfo = [
  {
    icon: <HiLocationMarker className="w-6 h-6" />,
    title: "Address",
    content:
      "415-A, Kapadia Compound, Vasta Devdi Road, Katargam, Surat- 395004",
    link: "https://maps.google.com/maps/dir//6R8P%2BCR+Patel+Nagar+Surat,+Gujarat/@21.2160625,72.8370625,19z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3be04ee13b4bbd7b:0x42dbeece79eba542",
  },
  {
    icon: <HiPhone className="w-6 h-6" />,
    title: "Phone",
    content: "+91 9998835511",
    link: "tel:9998835511",
  },
  {
    icon: <HiMail className="w-6 h-6" />,
    title: "Email",
    content: "enquiry@augustina.in",
    link: "mailto:enquiry@augustina.in",
  },
  {
    icon: <HiClock className="w-6 h-6" />,
    title: "Working Hours",
    content: "Mon - Sat 10.00 AM - 8.00 PM",
    link: null,
  },
];

const ContactUs = () => {
  const [formStatus, setFormStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");

    const serviceID = process.env.EMAILJS_SERVICE_ID;
    const templateID1 = process.env.EMAILJS_TEMPLATE_ID_1;
    const templateID2 = process.env.EMAILJS_TEMPLATE_ID_2;
    const userID = process.env.EMAILJS_USER_ID;

    try {
      await Promise.all([
        emailjs.send(serviceID, templateID1, formData, userID),
        emailjs.send(serviceID, templateID2, formData, userID),
      ]);

      setFormStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Failed to send email:", error);
      setFormStatus("error");
    }
  };

  return (
    <div className="pt-20">
      <section className="relative bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our biomass solutions? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
                >
                  {formStatus === "submitting" ? "Sending..." : "Send Message"}
                </motion.button>
                {formStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center text-green-600 bg-green-50 p-4 rounded-lg"
                  >
                    <HiCheck className="w-5 h-5 mr-2" /> Message sent
                    successfully!
                  </motion.div>
                )}
                {formStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center text-red-600 bg-red-50 p-4 rounded-lg"
                  >
                    <HiExclamationCircle className="w-5 h-5 mr-2" /> Failed to
                    send. Please try again.
                  </motion.div>
                )}
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link || "#"}
                    target={info.link ? "_blank" : undefined}
                    rel={info.link ? "noopener noreferrer" : undefined}
                    whileHover={{ y: -5 }}
                    className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                      {info.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {info.title}
                    </h3>
                    <p className="text-gray-600">{info.content}</p>
                  </motion.a>
                ))}
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-2 h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.4167873750644!2d72.83487531493444!3d21.216062585894343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04ee13b4bbd7b%3A0x42dbeece79eba542!2sPatel%20Nagar%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1629790000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "1rem" }}
                  allowFullScreen
                  loading="lazy"
                  title="Augustina Tradelink Location Map"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
