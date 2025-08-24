// src/app/blogs/[slug]/page.jsx (Client-side fallback version)
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { ArrowLeft, Loader2 } from 'lucide-react';
import BlogDetail from "@/components/Blogs/BlogDetail";

export default function BlogPage() {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Set a default title while loading
    document.title = 'Loading Blog Post... | Asia Biomass Tradelink Pvt. Ltd.';

    const fetchBlog = async () => {
      // Handle slug, which can be a string or an array for catch-all routes
      let slug = params.slug;
      if (Array.isArray(slug)) {
        slug = slug.join('/'); // Join if it's a catch-all route
      }
      
      if (!slug) {
        setError('No blog slug provided');
        setLoading(false);
        document.title = 'Error | Asia Biomass Tradelink Pvt. Ltd.';
        return;
      }

      try {
        console.log('Fetching blog with slug:', slug);
        const response = await axios.get(
          `https://sweekarme.in/asiabio/api/blogs/${slug}/`,
          {
            timeout: 15000, // 15 second timeout
            headers: {
              'User-Agent': 'Mozilla/5.0 (compatible; NextJS/14.0)', // Example User-Agent
            },
          }
        );

        console.log('Blog fetched successfully:', response.data?.title);
        setBlog(response.data);
        // Set page title dynamically after fetching the blog
        document.title = `${response.data.title} | Asia Biomass Tradelink Pvt. Ltd.`;

      } catch (err) {
        console.error('Error fetching blog:', err);
        document.title = 'Error Loading Blog | Asia Biomass Tradelink Pvt. Ltd.';
        
        if (err.response?.status === 404) {
          setError('Blog post not found');
        } else if (err.code === 'ECONNABORTED') {
          setError('Request timed out. The server is taking too long to respond.');
        } else {
          setError('Failed to load the blog post. Please check your connection and try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params.slug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Article</h2>
          <p className="text-gray-600">Please wait while we fetch the content...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !blog) {
    const currentSlug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full text-center">
          <div className="mb-8">
            <div className="mx-auto h-24 w-24 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="h-12 w-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {error === 'Blog post not found' ? 'Article Not Found' : 'Something Went Wrong'}
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          
          {currentSlug && (
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-500">
                <strong>Requested URL:</strong> /blogs/{currentSlug}
              </p>
            </div>
          )}

          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              href="/blogs"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              View All Blogs
            </Link>
            
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Try Again
            </button>
          </div>

          {/* Debug info (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-8 text-left bg-gray-50 p-3 rounded">
              <summary className="font-semibold cursor-pointer text-gray-700">Debug Information</summary>
              <div className="mt-2 p-4 bg-gray-100 rounded text-xs font-mono break-all">
                <p><strong>Slug:</strong> {currentSlug}</p>
                <p><strong>Error Details:</strong> {error}</p>
                <p><strong>Timestamp:</strong> {new Date().toISOString()}</p>
              </div>
            </details>
          )}
        </div>
      </div>
    );
  }

  // Success state
  return <BlogDetail blog={blog} />;
}