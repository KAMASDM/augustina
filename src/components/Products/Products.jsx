// src/components/Products/Products.jsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Search,
  Filter,
  Calendar,
  Download,
  Eye,
  Star,
  Tag,
  ChevronRight,
  Package,
  Zap,
  Shield,
  Users,
  Award,
  Settings,
  ArrowRight,
  Info,
  Lightbulb,
  BarChart3,
  Phone
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://sweekarme.in/asiabio/api/products/"
        );
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.meta_description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort products
    results.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "updated":
          return new Date(b.updated_at) - new Date(a.updated_at);
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });

    setFilteredProducts(results);
  }, [searchQuery, products, sortBy]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const extractFirstSentence = (description) => {
    if (!description) return "";
    const sentences = description.split(/[.!?]/);
    return sentences[0] + (sentences.length > 1 ? "." : "");
  };

  const getProductBadge = (product) => {
    if (product.brochure) return { text: "Brochure Available", color: "bg-green-100 text-green-800 border-green-200" };
    if (product.applications) return { text: "Detailed Info", color: "bg-blue-100 text-blue-800 border-blue-200" };
    if (product.features) return { text: "Feature Rich", color: "bg-purple-100 text-purple-800 border-purple-200" };
    return { text: "Available", color: "bg-gray-100 text-gray-800 border-gray-200" };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Loading Products</h2>
          <p className="text-gray-600">Please wait while we fetch our latest equipment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Info className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-25 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Premium Biomass Equipment
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Our Product Range
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Advanced biomass processing equipment engineered for efficiency, sustainability, and superior performance. Transform your waste into valuable energy resources.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                <span>{products.length} Products Available</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Regularly Updated</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white shadow-sm sticky top-16 z-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-700 font-medium"
              >
                <option value="name">Sort by Name</option>
                <option value="updated">Recently Updated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>
              {filteredProducts.length === products.length 
                ? `Showing all ${products.length} products`
                : `Showing ${filteredProducts.length} of ${products.length} products`
              }
            </span>
            {searchQuery && (
              <span>
                for "<span className="font-medium text-gray-900">{searchQuery}</span>"
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => {
                const badge = getProductBadge(product);
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-primary-200 transform hover:-translate-y-1">
                      {/* Product Image */}
                      <div className="relative h-64 overflow-hidden bg-gray-100">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={`${product.name} - Biomass Equipment`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center text-gray-400">
                              <Package className="w-12 h-12 mx-auto mb-3" />
                              <p className="text-sm font-medium">Product Image</p>
                              <p className="text-xs">Coming Soon</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
                            {badge.text}
                          </span>
                        </div>

                        {/* Quick Actions */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex gap-2">
                            {product.brochure && (
                              <button
                                onClick={() => window.open(product.brochure, '_blank')}
                                className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-md"
                                title="Download Brochure"
                              >
                                <Download className="w-4 h-4 text-gray-700" />
                              </button>
                            )}
                            <Link
                              href={`/products/${product.slug}`}
                              className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-md"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4 text-gray-700" />
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Product Content */}
                      <div className="p-6">
                        {/* Title & Description */}
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors leading-tight">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                            {product.meta_description || extractFirstSentence(product.description)}
                          </p>
                        </div>

                        {/* Product Meta */}
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-6 py-2 border-t border-gray-100">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>Updated {formatDate(product.updated_at)}</span>
                          </div>
                          <div className="flex items-center">
                            <Tag className="w-3 h-3 mr-1" />
                            <span>ID #{product.id}</span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <Link href={`/products/${product.slug}`} className="block">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-4 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                          >
                            <span>View Details</span>
                            <ArrowRight className="w-4 h-4" />
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any products matching your search. Try adjusting your search terms.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                >
                  Clear Search
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Technology Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Our Equipment
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our biomass processing equipment is built with cutting-edge technology and engineered for maximum efficiency and reliability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "Advanced Engineering",
                description: "Each product is meticulously designed for optimal performance and longevity, incorporating the latest biomass processing innovations.",
                color: "bg-yellow-100 text-yellow-600"
              },
              {
                icon: Zap,
                title: "Energy Efficiency",
                description: "Our machines minimize energy consumption while maximizing output, significantly reducing operational costs and environmental impact.",
                color: "bg-blue-100 text-blue-600"
              },
              {
                icon: BarChart3,
                title: "High Throughput",
                description: "Experience superior processing capabilities that convert large volumes of biomass waste into valuable energy resources efficiently.",
                color: "bg-green-100 text-green-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-primary-200 h-full">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Process Approach
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We provide comprehensive solutions for every stage of biomass processing, from raw material to finished fuel products.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Collection & Pre-processing", icon: "🔄", desc: "Gather and prepare biomass waste for processing" },
              { title: "Shredding & Size Reduction", icon: "⚡", desc: "Break down materials into manageable pieces" },
              { title: "Dewatering & Drying", icon: "💧", desc: "Remove moisture for optimal processing" },
              { title: "Densification", icon: "📦", desc: "Compact into high-density fuel products" }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 text-center h-full">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-8 md:p-12 text-white text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Biomass Operations?
              </h2>
              <p className="text-lg md:text-xl mb-8 text-primary-100">
                Get in touch with our experts to discuss your specific requirements and find the perfect biomass processing solution for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+917096033001"
                  className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold shadow-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
                <Link href="/products">
                  <button className="px-8 py-4 bg-primary-700 text-white border border-primary-400 rounded-lg hover:bg-primary-800 transition-colors font-semibold">
                    Browse All Products
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;