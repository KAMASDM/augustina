// components/Blogs/BlogDetail.jsx

"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, CalendarDays, Folder, Tag } from "lucide-react";

// A simple date formatter
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
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

  const authorName = blog.author?.first_name
    ? `${blog.author.first_name} ${blog.author.last_name}`.trim()
    : blog.author.username;

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
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

          {blog.featured_image && (
            <div className="rounded-2xl overflow-hidden my-8 relative h-64 md:h-96">
              <Image
                src={blog.featured_image}
                alt={`Featured image for ${blog.title}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          )}

          {/* Render the HTML content from the API */}
          {blog.content && (
            <div
              className="prose prose-lg max-w-none prose-a:text-primary-600 prose-img:rounded-xl"
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
                    className="bg-neutral-100 text-neutral-700 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </footer>
          )}
        </article>
      </main>
    </div>
  );
};

export default BlogDetail;
