// components/Blogs/BlogDetail.jsx

"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, CalendarDays, Folder, Tag, ArrowLeft, Home } from "lucide-react";
import { useState } from "react";

// A simple date formatter
const formatDate = (dateString) => {
  if (!dateString) return "Unknown date";
  try {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

// Helper function to get the correct image URL
const getImageUrl = (path) => {
  if (!path || path === null || path === undefined || path === "null") {
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

// Simplified Image component with better error handling
const BlogImage = ({ src, alt, className, priority = false, ...props }) => {
  const [imgSrc, setImgSrc] = useState(() => getImageUrl(src));
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      console.log("Image failed to load, using placeholder:", imgSrc);
      setHasError(true);
      setImgSrc("/assets/images/placeholder.png");
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt || "Blog image"}
      className={className}
      onError={handleError}
      priority={priority}
      {...props}
    />
  );
};

const BlogDetail = ({ blog }) => {
  // Loading state
  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading Article...</p>
        </div>
      </div>
    );
  }

  // Safely extract author name
  const getAuthorName = () => {
    if (!blog.author) return "Asia Biomass Team";
    
    const firstName = blog.author.first_name?.trim();
    const lastName = blog.author.last_name?.trim();
    
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName) {
      return firstName;
    } else if (blog.author.username) {
      return blog.author.username;
    }
    
    return "Asia Biomass Team";
  };

  const authorName = getAuthorName();

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
              {blog.title || "Article"}
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
            {/* Category */}
            {blog.category?.name && (
              <div className="flex items-center space-x-2 text-sm text-primary-600 mb-4 font-semibold">
                <Folder className="w-4 h-4" />
                <span>{blog.category.name}</span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              {blog.title || "Untitled Article"}
            </h1>

            {/* Meta information */}
            <div className="flex flex-wrap items-center space-x-6 text-neutral-500 text-sm">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>By {authorName}</span>
              </div>
              {blog.published_at && (
                <div className="flex items-center">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  <time dateTime={blog.published_at}>
                    {formatDate(blog.published_at)}
                  </time>
                </div>
              )}
            </div>
          </header>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden my-8 relative h-64 md:h-96">
            <BlogImage
              src={blog.featured_image}
              alt={`Featured image for ${blog.title || "article"}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
            
            {/* Overlay for articles without featured image or when using placeholder */}
            {(!blog.featured_image || blog.featured_image === null) && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/30 flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <Folder className="w-12 h-12 mx-auto mb-3 opacity-80" />
                  <p className="text-lg font-semibold opacity-90">
                    {blog.category?.name || "Blog Article"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Article Content */}
          {blog.content && (
            <div
              className="prose prose-lg max-w-none prose-a:text-primary-600 prose-img:rounded-xl prose-headings:text-gray-900 prose-p:text-gray-700 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          )}

          {!blog.content && (
            <div className="text-center py-12 text-gray-500">
              <p>No content available for this article.</p>
            </div>
          )}

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <footer className="mt-12 pt-8 border-t border-neutral-200">
              <div className="flex items-center flex-wrap gap-3">
                <Tag className="w-5 h-5 text-neutral-500" />
                <h3 className="text-lg font-semibold text-neutral-800 mr-2">
                  Tags:
                </h3>
                {blog.tags.map((tag) => (
                  <span
                    key={tag.slug || tag.name}
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