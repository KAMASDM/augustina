"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Box, Gauge, Book } from "lucide-react";

const ProductDetail = ({ product }) => {
  // If product is null or undefined (e.g., during fallback), show a loading or error state
  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  // Get the first line of the description for the hero subtitle. Optional chaining `?.` prevents errors if description is null.
  const subtitle = product.description?.split(/\r?\n/)[0] || "";

  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="relative bg-gradient-to-b from-primary-50 to-white pt-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {product.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {/* Show the first line of the description here */}
              {subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 mb-12">
          <header className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-primary-600 mb-4">
              <span className="font-medium">
                {product.category_name || "General"}
              </span>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-6 text-neutral-600">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center mr-3">
                  <Book className="w-5 h-5 text-neutral-500" />
                </div>
                <p className="font-medium text-neutral-800">
                  Model: {product.model }
                </p>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span className="text-sm">
                  Maintenance Interval: {product.maintenance_interval || "N/A"}
                </span>
              </div>
            </div>
          </header>

          <div className="rounded-2xl overflow-hidden mb-8 relative h-[400px]">
            <Image
              src={product?.image} // Fallback image
              alt={`Image of ${product.name}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          {/* === START: UPDATED DESCRIPTION SECTION === */}
          {/* This section now renders the entire description from the API */}
          {product.description && (
            <div className="bg-neutral-50 p-6 rounded-xl mb-8">
              <h2 className="text-2xl font-bold mb-4">Product Details</h2>
              {/* The `white-space: 'pre-line'` style is key to preserving newlines */}
              <div
                className="text-neutral-700 leading-relaxed"
                style={{ whiteSpace: "pre-line" }}
              >
                {product.description}
              </div>
            </div>
          )}
          {/* === END: UPDATED DESCRIPTION SECTION === */}

          {/* The sections below will only render if the data exists in your API response */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Render specifications if they exist */}
            {product.specifications &&
              Object.keys(product.specifications).length > 0 && (
                <div className="bg-neutral-50 p-6 rounded-xl">
                  <h2 className="text-2xl font-bold mb-4">
                    Technical Specifications
                  </h2>
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-2 border-b border-neutral-200 text-sm"
                      >
                        <span className="font-medium capitalize text-gray-600">
                          {key.replace(/_/g, " ")}
                        </span>
                        <span className="text-gray-800 font-semibold">
                          {value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              )}
          </div>

          {/* Render applications if they exist */}
          {product.applications && product.applications.length > 0 && (
            <div className="bg-neutral-50 p-6 rounded-xl mb-8">
              <h2 className="text-2xl font-bold mb-4">Applications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {product.applications.map((application, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-sm text-center"
                  >
                    <Gauge className="w-6 h-6 text-primary-600 mb-2 mx-auto" />
                    <span className="text-sm">{application}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Render warranty if it exists */}
          {product.warranty && (
            <div className="bg-primary-50 p-6 rounded-xl text-center">
              <h2 className="text-2xl font-bold mb-2">Warranty Information</h2>
              <p className="text-neutral-700 font-semibold">
                {product.warranty}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
