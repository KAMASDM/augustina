import { notFound } from 'next/navigation';
import BlogDetail from "@/components/Blogs/BlogDetail";
import axios from 'axios';

// The server-side metadata function now works correctly
export async function generateMetadata({ params }) {
  const slug = params.slug;
  const product = await getBlog(slug);

  if (!product) {
    return {
      title: "Article Not Found | Asia Biomass Tradelink Pvt. Ltd.",
      description: "The requested blog article could not be found.",
    };
  }

  return {
    title: `${product.title} | Asia Biomass Tradelink Pvt. Ltd.`,
    description: product.meta_description || product.content?.split("\n")[0] || "Read our latest insights on biomass and renewable energy solutions.",
  };
}

// Helper function to fetch a single blog post on the server
async function getBlog(slug) {
  try {
    const response = await axios.get(
      `https://sweekarme.in/asiabio/api/blogs/${slug}/`
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.error(`Failed to fetch blog post ${slug}:`, error);
    throw new Error('Failed to load blog post data.');
  }
}

// The main page component is now a Server Component
export default async function BlogPage({ params }) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    // This will render src/app/blogs/[slug]/not-found.jsx
    notFound();
  }

  // On success, render the BlogDetail component with the fetched data
  return <BlogDetail blog={blog} />;
}