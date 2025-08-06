// components/Blogs/Blogs.jsx

"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useState, useEffect } from "react";
import axios from "axios";

// Helper function to strip HTML for a plain text summary
const createSummary = (htmlContent, length = 100) => {
  if (!htmlContent) return "";
  const plainText = htmlContent.replace(/<[^>]*>?/gm, " ");
  return plainText.length > length
    ? plainText.substring(0, length) + "..."
    : plainText;
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://sweekarme.in/asiabio/api/blogs/"
        );
        setBlogs(response.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-neutral-50">
      <section className="relative bg-gradient-to-b from-primary-50 to-neutral-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              From Our Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest industry news, trends, and expert
              insights from our team.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group h-full flex flex-col"
              >
                <Link href={`/blogs/${blog.slug}`} passHref className="block">
                  <div className="relative w-full h-56 flex-shrink-0">
                    <Image
                      src={
                        blog.featured_image || "/assets/images/placeholder.png"
                      } // Fallback image
                      alt={`Featured image for ${blog.title}`}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-sm text-primary-600 font-medium mb-2">
                    {blog.category.name}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex-grow line-clamp-2">
                    <Link
                      href=""
                      passHref
                      className="hover:text-primary-600 transition-colors"
                    >
                      {blog.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {createSummary(blog.content, 120)}
                  </p>

                  <div className="mt-auto pt-4 border-t border-neutral-100">
                    <Link
                      href=""
                      passHref
                      className="inline-flex items-center font-semibold text-primary-500 hover:text-primary-600"
                    >
                      Read More
                      <HiOutlineArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
