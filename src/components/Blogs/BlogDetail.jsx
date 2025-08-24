// components/Blogs/BlogDetail.jsx

"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, CalendarDays, Folder, Tag, ArrowLeft, Home } from "lucide-react";
import { useState } from "react";

// A simple date formatter
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Helper function to get the correct image URL
const getImageUrl = (path) => {
  if (!path || path === null || path === undefined) {
    return "/assets/images/placeholder.png";
  }
  
  // Check if the path is already an absolute URL
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  
  // Handle relative paths that might start with or without leading slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `https://sweekarme.in${cleanPath}`;
};

// Safe Image component with error handling
const SafeImage = ({ src, alt, className, ...props }) => {
  const [imgSrc, setImgSrc] = useState(getImageUrl(src));
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc("/assets/images/placeholder.png");
    }
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl flex items-center justify-center">
          <span className="text-gray-400">Loading...</span>
        </div>
      )}
      <Image
        src={imgSrc}
        alt={alt}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
};

const BlogDetail = ({ blog }) => {
  // Loading state
  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading Article...</p>
      </div>
    );
  }

  const authorName = blog.author?.first_name && blog.author.first_name.trim()
    ? `${blog.author.first_name} ${blog.author.last_name}`.trim()
    : blog.author?.username || "Asia Biomass Team";

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 pt-24 pb-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-3 text-sm">
            <Link 
              href="/" 
              className="flex items-center text-gray-500 hover:text-primary-600 transition-colors"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link 
              href="/blogs" 
              className="text-gray-500 hover:text-primary-600 transition-colors"
            >
              Blog
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">
              {blog.title}
            </span>
          </nav>
          
          {/* Back to Blog Button */}
          <Link href="/blogs">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Articles
            </motion.button>
          </Link>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white">
          <header className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-primary-600 mb-4 font-semibold">
              <Folder className="w-4 h-4" />
              <span>{blog.category?.name || "Uncategorized"}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center space-x-6 text-neutral-500 text-sm">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>By {authorName}</span>
              </div>
              <div className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-2" />
                <time dateTime={blog.published_at}>
                  {formatDate(blog.published_at)}
                </time>
              </div>
            </div>
          </header>

          {/* Featured Image - Always show, either the actual image or placeholder */}
          <div className="rounded-2xl overflow-hidden my-8 relative h-64 md:h-96">
            <SafeImage
              src={blog.featured_image}
              alt={`Featured image for ${blog.title}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
            {/* Overlay for blogs without featured image */}
            {(!blog.featured_image || blog.featured_image === null) && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/30 flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <Folder className="w-12 h-12 mx-auto mb-3 opacity-80" />
                  <p className="text-lg font-semibold opacity-90">{blog.category?.name || "Blog"}</p>
                </div>
              </div>
            )}
          </div>

          {/* Render the HTML content from the API */}
          {blog.content && (
            <div
              className="prose prose-lg max-w-none prose-a:text-primary-600 prose-img:rounded-xl prose-headings:text-gray-900 prose-p:text-gray-700"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          )}

          {/* Render Tags if they exist */}
          {blog.tags && blog.tags.length > 0 && (
            <footer className="mt-12 pt-8 border-t border-neutral-200">
              <div className="flex items-center flex-wrap gap-3">
                <Tag className="w-5 h-5 text-neutral-500" />
                <h3 className="text-lg font-semibold text-neutral-800 mr-2">
                  Tags:
                </h3>
                {blog.tags.map((tag) => (
                  <span
                    key={tag.slug}
                    className="bg-neutral-100 text-neutral-700 text-sm font-medium px-3 py-1 rounded-full hover:bg-primary-50 transition-colors"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </footer>
          )}

          {/* Navigation Footer */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <div className="flex justify-between items-center">
              <Link href="/blogs">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center text-gray-600 hover:text-primary-600 font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  More Articles
                </motion.button>
              </Link>
              
              <Link href="/contact-us">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogDetail;