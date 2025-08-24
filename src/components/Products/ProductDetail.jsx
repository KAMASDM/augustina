// src/components/pages/ProductDetailPage.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Star,
  CheckCircle,
  Download,
  Phone,
  Send,
  Zap,
  Shield,
  Users,
  Award,
  FileText,
  Calendar,
  Settings,
  Package,
  Mail,
  Info,
  Target,
  Wrench,
  ChevronRight,
  XCircle,
  Eye,
  Tag,
} from "lucide-react";
import ProductSlider from "../common/ProductSlider";

// Enhanced Product Inquiry Form Component
const ProductInquiryForm = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    product: product?.id || null,
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({ status: "idle", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ status: "submitting", message: "" });
    
    try {
      await axios.post(
        "https://sweekarme.in/asiabio/api/products/enquiry/",
        formData
      );
      setFormStatus({
        status: "success",
        message: "Enquiry sent successfully! We'll get back to you soon.",
      });
      // Reset form
      setFormData({
        product: product?.id || null,
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to submit enquiry:", error);
      setFormStatus({
        status: "error",
        message: "Failed to send enquiry. Please try again later.",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Product Enquiry</h2>
              <p className="text-gray-600">Get detailed information about {product.name}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XCircle className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="Your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                placeholder="Tell us about your requirements, questions, or how we can help you..."
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formStatus.status === "submitting"}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus.status === "submitting" ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  "Send Enquiry"
                )}
              </button>
            </div>

            {formStatus.status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center text-green-700 bg-green-50 p-4 rounded-lg border border-green-200"
              >
                <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="text-sm">{formStatus.message}</span>
              </motion.div>
            )}
            {formStatus.status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center text-red-700 bg-red-50 p-4 rounded-lg border border-red-200"
              >
                <XCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="text-sm">{formStatus.message}</span>
              </motion.div>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [showContactForm, setShowContactForm] = useState(false);
  const [availableTabs, setAvailableTabs] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `https://sweekarme.in/asiabio/api/products/${slug}/`
        );
        const productData = response.data;
        setProduct(productData);

        // Define available tabs based on data
        const allPossibleTabs = [
          { 
            key: "overview", 
            label: "Overview", 
            icon: <Info className="w-4 h-4" />, 
            data: productData.description 
          },
          { 
            key: "features", 
            label: "Features", 
            icon: <Star className="w-4 h-4" />, 
            data: productData.features 
          },
          { 
            key: "applications", 
            label: "Applications", 
            icon: <Target className="w-4 h-4" />, 
            data: productData.applications 
          },
          { 
            key: "maintenance", 
            label: "Maintenance", 
            icon: <Wrench className="w-4 h-4" />, 
            data: productData.maintenance_requirements 
          },
        ];

        // Filter tabs to only include those with data
        const currentAvailableTabs = allPossibleTabs.filter(tab => 
          tab.data && tab.data.trim() !== ""
        );
        setAvailableTabs(currentAvailableTabs);

        const availableKeys = currentAvailableTabs.map(tab => tab.key);
        if (!availableKeys.includes(activeTab)) {
          setActiveTab(currentAvailableTabs.length > 0 ? currentAvailableTabs[0].key : "overview");
        }

      } catch (err) {
        setError("Failed to load product details.");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">Loading Product Details...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait while we fetch the information</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Product Not Found</h1>
          <p className="mb-8 text-gray-600">{error || "Sorry, we couldn't find the product you're looking for."}</p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors shadow-lg"
          >
            Return to Products Page
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages = [
    product.image,
    ...(product.images || []).map((img) => typeof img === 'string' ? img : img.image),
  ].filter(Boolean);

  return (
    <>
      {showContactForm && (
        <ProductInquiryForm 
          product={product} 
          onClose={() => setShowContactForm(false)} 
        />
      )}
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-25 py-12 sm:py-20 mt-16 sm:mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <Link 
                href="/products" 
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors mb-4"
              >
                <ChevronLeft size={20} />
                Back to Products
              </Link>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-4">
                <Award className="w-4 h-4 mr-2" />
                Category #{product.category}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>
              <div className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {product.meta_description || product.description.split(".")[0] + "."}
              </div>
            </motion.div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Product Images */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
              >
                <div className="relative h-64 sm:h-96 lg:h-[500px]">
                  {galleryImages.length > 0 ? (
                    <Image
                      src={galleryImages[currentImageIndex]}
                      alt={`${product.name} - Image ${currentImageIndex + 1}`}
                      fill
                      className="object-contain bg-white"
                      priority={currentImageIndex === 0}
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <Package className="w-16 h-16 mx-auto mb-4" />
                        <p>Product Image Coming Soon</p>
                      </div>
                    </div>
                  )}
                </div>
                {galleryImages.length > 1 && (
                  <div className="p-4 border-t border-gray-100">
                    <div className="grid grid-cols-5 gap-2">
                      {galleryImages.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
                            index === currentImageIndex 
                              ? "ring-2 ring-primary-500 ring-offset-2 scale-105" 
                              : "hover:opacity-75 hover:scale-105"
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`${product.name} thumbnail ${index + 1}`}
                            width={120}
                            height={80}
                            className="w-full h-16 object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Key Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">High Performance</h3>
                      <p className="text-xs text-gray-600">Industry leading efficiency</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Quality Assured</h3>
                      <p className="text-xs text-gray-600">Comprehensive warranty</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Expert Support</h3>
                      <p className="text-xs text-gray-600">24/7 technical assistance</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Certified</h3>
                      <p className="text-xs text-gray-600">Quality standards</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Tabbed Content */}
              {availableTabs.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
                >
                  {/* Tab Navigation */}
                  <div className="border-b border-gray-200">
                    <nav className="flex overflow-x-auto">
                      {availableTabs.map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setActiveTab(tab.key)}
                          className={`flex items-center px-4 sm:px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                            activeTab === tab.key
                              ? "border-primary-500 text-primary-600 bg-primary-50"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {tab.icon}
                          <span className="ml-2">{tab.label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6 sm:p-8">
                    {activeTab === "overview" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                            <Info className="w-6 h-6" />
                          </div>
                          <h2 className="text-2xl font-bold text-gray-900">Product Overview</h2>
                        </div>
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                          <p>{product.description}</p>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "features" && product.features && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                            <Star className="w-6 h-6" />
                          </div>
                          <h2 className="text-2xl font-bold text-gray-900">Features & Advantages</h2>
                        </div>
                        <div 
                          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: product.features }}
                        />
                      </motion.div>
                    )}

                    {activeTab === "applications" && product.applications && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                            <Target className="w-6 h-6" />
                          </div>
                          <h2 className="text-2xl font-bold text-gray-900">Applications & Use Cases</h2>
                        </div>
                        <div 
                          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: product.applications }}
                        />
                      </motion.div>
                    )}

                    {activeTab === "maintenance" && product.maintenance_requirements && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                            <Wrench className="w-6 h-6" />
                          </div>
                          <h2 className="text-2xl font-bold text-gray-900">Maintenance & Support</h2>
                        </div>
                        <div 
                          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: product.maintenance_requirements }}
                        />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Enquiry Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 sticky top-24"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Get Detailed Quote
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Get personalized pricing and technical specifications
                  </p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 px-6 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Request Detailed Quote
                  </button>
                  
                  <a
                    href="tel:+917096033001"
                    className="w-full border-2 border-primary-300 text-primary-600 py-4 px-6 rounded-lg hover:bg-primary-50 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Call Expert Now
                  </a>

                  {product.brochure && (
                    <a
                      href={product.brochure}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Download Brochure
                    </a>
                  )}
                  
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Schedule Demo
                  </button>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    href="/products"
                    className="w-full flex items-center justify-between p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center">
                      <Package className="w-5 h-5 mr-3 text-primary-600" />
                      <span>View All Products</span>
                    </div>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        {/* Related Products */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductSlider
              currentProduct={product}
              title="Similar Products You Might Like"
            />
          </div>
        </div>
      </div>
    </>
  );
}