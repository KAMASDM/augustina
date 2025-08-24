// src/components/common/ProductSlider.js
"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, ArrowRight, Package, Tag, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "axios";

export default function ProductSlider({ currentProduct, title = "Related Products" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        // Fetch all products from biomass API
        const response = await axios.get("https://sweekarme.in/asiabio/api/products/");
        const allProducts = response.data;

        // Filter products with similar applications or description keywords
        const relatedProducts = allProducts.filter(product => {
          // Exclude the current product
          if (product.id === currentProduct.id) return false;
          
          // Check for similar keywords in description
          if (currentProduct.description && product.description) {
            const currentKeywords = currentProduct.description.toLowerCase().split(/\s+/).filter(word => word.length > 4);
            const productKeywords = product.description.toLowerCase().split(/\s+/).filter(word => word.length > 4);
            
            const hasCommonKeywords = currentKeywords.some(keyword => 
              productKeywords.some(prodWord => 
                prodWord.includes(keyword) || keyword.includes(prodWord)
              )
            );
            
            if (hasCommonKeywords) return true;
          }
          
          // Check if product has similar applications (if applications field exists)
          if (currentProduct.applications && product.applications) {
            const currentApps = Array.isArray(currentProduct.applications) 
              ? currentProduct.applications 
              : currentProduct.applications.split(',').map(s => s.trim());
            const productApps = Array.isArray(product.applications) 
              ? product.applications 
              : product.applications.split(',').map(s => s.trim());
              
            return currentApps.some(currentApp => 
              productApps.some(prodApp => 
                prodApp.toLowerCase().includes(currentApp.toLowerCase()) ||
                currentApp.toLowerCase().includes(prodApp.toLowerCase())
              )
            );
          }
          
          return false;
        });

        // If no products with similar content, show products from same category
        let finalProducts = relatedProducts;
        if (finalProducts.length === 0) {
          finalProducts = allProducts.filter(product => 
            product.id !== currentProduct.id && 
            product.category === currentProduct.category
          );
        }

        // If still no products, show random products (excluding current)
        if (finalProducts.length === 0) {
          finalProducts = allProducts.filter(product => product.id !== currentProduct.id);
        }

        // Shuffle and limit to 8 products for performance
        const shuffled = finalProducts.sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 8));
      } catch (err) {
        setError("Failed to load related products");
        console.error("Error fetching related products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (currentProduct) {
      fetchRelatedProducts();
    }
  }, [currentProduct]);

  const scrollToSlide = (index) => {
    setCurrentSlide(index);
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.children[0]?.offsetWidth || 0;
      const gap = 24; // 1.5rem gap
      sliderRef.current.scrollTo({
        left: index * (slideWidth + gap),
        behavior: 'smooth'
      });
    }
  };

  const nextSlide = () => {
    const nextIndex = currentSlide + 1 >= products.length ? 0 : currentSlide + 1;
    scrollToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentSlide - 1 < 0 ? products.length - 1 : currentSlide - 1;
    scrollToSlide(prevIndex);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const extractFirstSentence = (description) => {
    if (!description) return "";
    const sentences = description.split(/[.!?]/);
    return sentences[0] + (sentences.length > 1 ? "..." : "");
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="flex gap-6 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-72 animate-pulse">
              <div className="bg-gray-300 h-48 rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || products.length === 0) {
    return null; // Don't show the slider if there are no related products
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 text-sm mt-1">
            Discover more products that might interest you
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-110"
            aria-label="Previous products"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-110"
            aria-label="Next products"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative overflow-hidden">
        <div 
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-80 group"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200 overflow-hidden h-full">
                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="320px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <Package className="w-12 h-12 text-gray-400" />
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 backdrop-blur-sm">
                        Category #{product.category}
                      </span>
                    </div>

                    {/* Updated Badge */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="p-2 rounded-full bg-white/90 backdrop-blur-sm">
                        <Calendar size={14} className="text-primary-600" />
                      </div>
                    </div>
                  </div>

                  {/* Product Content */}
                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2 leading-tight">
                        {product.name}
                      </h3>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {product.meta_description || extractFirstSentence(product.description)}
                    </p>

                    {/* Product Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Tag className="w-3 h-3 mr-1" />
                        ID #{product.id}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Updated {formatDate(product.updated_at)}
                      </div>
                    </div>

                    {/* Features Preview */}
                    {product.description && (
                      <div className="mb-4">
                        <div className="space-y-1">
                          {product.description
                            .split("\n")
                            .filter(line => line.trim() && line.length < 80)
                            .slice(1, 3)
                            .map((highlight, i) => (
                              <div key={i} className="flex items-start text-xs text-gray-600">
                                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                                <span className="line-clamp-1">{highlight}</span>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="mt-auto">
                      <div className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-4 text-center rounded-lg font-semibold shadow-md group-hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm">
                        <span>View Details</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="h-1 w-full bg-gradient-to-r from-primary-500 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {products.length > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {products.slice(0, Math.ceil(products.length / 3)).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index * 3)}
              className={`h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentSlide / 3) === index
                  ? "w-8 bg-primary-500 scale-125"
                  : "w-2 bg-gray-300 hover:bg-gray-400 hover:scale-110"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* View All Products Link */}
      <div className="text-center mt-8">
        <Link href="/products">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300 border border-gray-300"
          >
            View All Products
            <ArrowRight size={16} />
          </motion.button>
        </Link>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </motion.div>
  );
}