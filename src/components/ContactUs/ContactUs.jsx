"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  HiPhone,
  HiMail,
  HiLocationMarker,
  HiClock,
  HiCheck,
  HiExclamationCircle,
} from "react-icons/hi";

const contactInfo = [
  {
    icon: <HiLocationMarker className="w-6 h-6" />,
    title: "Address",
    content:
      "415-A, Kapadia Compound, Vasta Devdi Road, Katargam, Surat- 395004",
    link: "https://www.google.com/maps/search/?api=1&query=415-A, Kapadia Compound, Vasta Devdi Road, Katargam, Surat- 395004",
  },
  {
    icon: <HiPhone className="w-6 h-6" />,
    title: "Phone",
    content: "+91 9998835511",
    link: "tel:+919998835511",
  },
  {
    icon: <HiMail className="w-6 h-6" />,
    title: "Email",
    content: "enquiry@asiabiomass.in",
    link: "mailto:enquiry@asiabiomass.in",
  },
  {
    icon: <HiClock className="w-6 h-6" />,
    title: "Working Hours",
    content: "Mon - Sat 10.00 AM - 8.00 PM",
    link: null,
  },
];

const ContactUs = () => {
  const [formData, setFormData] = useState({
    product: "",
    service: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState({ status: "idle", message: "" });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [productRes, serviceRes] = await Promise.all([
          axios.get("https://sweekarme.in/asiabio/api/products/"),
          axios.get("https://sweekarme.in/asiabio/api/services/"),
        ]);
        setProducts(productRes.data);
        setServices(serviceRes.data);
      } catch (err) {
        console.error("Failed to fetch form options:", err);
        setFormStatus({
          status: "error",
          message: "Could not load form options. Please refresh the page.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDropdownData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ status: "submitting", message: "" });

    const submissionData = {
      ...formData,
      product: formData.product || null,
      service: formData.service || null,
    };

    try {
      await axios.post(
        "https://sweekarme.in/asiabio/api/contacts/enquiry/",
        submissionData
      );
      setFormStatus({
        status: "success",
        message: "Enquiry sent successfully!",
      });
      setFormData({
        product: "",
        service: "",
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to submit enquiry:", error);
      setFormStatus({
        status: "error",
        message: "Failed to send enquiry. Please try again.",
      });
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="product"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Product
                    </label>
                    <select
                      id="product"
                      value={formData.product}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="">Select a Product</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Service
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="">Select a Service</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name *
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
                    Email Address *
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
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message *
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
                  disabled={formStatus.status === "submitting" || loading}
                  className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
                >
                  {formStatus.status === "submitting"
                    ? "Sending..."
                    : "Send Message"}
                </motion.button>
                {formStatus.status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center text-green-600 bg-green-50 p-4 rounded-lg"
                  >
                    <HiCheck className="w-5 h-5 mr-2" /> {formStatus.message}
                  </motion.div>
                )}
                {formStatus.status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center text-red-600 bg-red-50 p-4 rounded-lg"
                  >
                    <HiExclamationCircle className="w-5 h-5 mr-2" />{" "}
                    {formStatus.message}
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.485123539462!2d72.8225583153921!3d21.21255868731358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f5e6b492b77%3A0x6b158d63a43bf248!2sVasta%20Devdi%20Rd%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1662557438459!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "1rem" }}
                  allowFullScreen
                  loading="lazy"
                  title="Company Location Map"
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
