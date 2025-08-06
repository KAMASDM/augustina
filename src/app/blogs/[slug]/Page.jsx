// app/blogs/[slug]/page.jsx

import React from "react";
import { notFound } from "next/navigation";
import { cache } from "react";
import BlogDetail from "@/components/Blogs/BlogDetail";
import axios from "axios";

// Helper function wrapped in React.cache to prevent duplicate API calls
export const getBlog = cache(async (slug) => {
  try {
    const response = await axios.get(
      `https://sweekarme.in/asiabio/api/blogs/${slug}/`
    );
    return response.data;
  } catch (error) {
    // Log the error for debugging but don't expose details to the client
    console.error(`Failed to fetch blog ${slug}:`, error.message);
    // Return null when the API call fails (e.g., 404 from the API)
    return null;
  }
});

// Generate dynamic metadata for the page
export const generateMetadata = async ({ params }) => {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found | Asia Biomass Tradelink Pvt. Ltd.",
    };
  }

  // Safely create a plain text description from HTML content
  const plainDescription =
    blog.meta_description ||
    (blog.content || "").replace(/<[^>]*>?/gm, " ").substring(0, 160);

  // Safely determine the author's name
  const authorName = blog.author?.first_name
    ? `${blog.author.first_name} ${blog.author.last_name}`.trim()
    : blog.author?.username;

  return {
    title: `${
      blog.meta_title || blog.title
    } | Asia Biomass Tradelink Pvt. Ltd.`,
    description: plainDescription,
    alternates: {
      canonical: `/blogs/${blog.slug}`,
    },
    openGraph: {
      title: `${
        blog.meta_title || blog.title
      } | Asia Biomass Tradelink Pvt. Ltd.`,
      description: plainDescription,
      url: `https://asiabiomass.in/blogs/${blog.slug}`,
      images: blog.featured_image
        ? [
            {
              url: blog.featured_image,
              width: 1200,
              height: 630,
              alt: blog.title,
            },
          ]
        : [],
      siteName: "Asia Biomass Tradelink Pvt. Ltd.",
      locale: "en_US",
      type: "article",
      publishedTime: blog.published_at,
      modifiedTime: blog.updated_at,
      authors: authorName ? [authorName] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${
        blog.meta_title || blog.title
      } | Asia Biomass Tradelink Pvt. Ltd.`,
      description: plainDescription,
      images: blog.featured_image ? [blog.featured_image] : [],
    },
  };
};

const BlogDetailPage = async ({ params }) => {
  const blog = await getBlog(params.slug);

  // If no blog is found, trigger the Next.js 404 page
  if (!blog) {
    notFound();
  }

  // Structured data for rich results
  const getBlogSchema = () => {
    // Safely determine the author's name for the schema
    const authorName = blog.author?.first_name
      ? `${blog.author.first_name} ${blog.author.last_name}`.trim()
      : blog.author?.username;

    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title,
      name: blog.title,
      description:
        blog.meta_description ||
        (blog.content || "").replace(/<[^>]*>?/gm, " ").substring(0, 160),
      image:
        blog.featured_image || "https://asiabiomass.in/assets/images/logo.png",
      author: {
        "@type": "Person",
        name: authorName || "Asia Biomass Tradelink Pvt. Ltd.",
      },
      publisher: {
        "@type": "Organization",
        name: "Asia Biomass Tradelink Pvt. Ltd.",
        logo: {
          "@type": "ImageObject",
          url: "https://asiabiomass.in/assets/images/logo.png",
        },
      },
      datePublished: blog.published_at,
      dateModified: blog.updated_at,
    };
  };

  const blogSchema = getBlogSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogDetail blog={blog} />
    </>
  );
};

export default BlogDetailPage;
