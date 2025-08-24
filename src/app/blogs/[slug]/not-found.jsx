// src/app/blogs/[slug]/not-found.jsx
'use client';

import Link from 'next/link';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="mx-auto h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Blog Post Not Found
        </h1>
        
        <p className="text-lg text-gray-600 mb-2">
          Sorry, we couldn't find the blog post you're looking for.
        </p>
        
        <p className="text-sm text-gray-500 mb-8">
          The post may have been moved, deleted, or the URL might be incorrect.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            href="/blogs"
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            View All Blogs
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600">
            <strong>Looking for something specific?</strong> Try browsing our blog categories or 
            <Link href="/contact-us" className="underline ml-1">
              contact us
            </Link>
            {' '}for assistance.
          </p>
        </div>

        {/* Popular Posts */}
        <div className="mt-8 text-left">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Popular Posts:</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link 
                href="/blogs" 
                className="text-primary-600 hover:text-primary-700 hover:underline"
              >
                → Complete Guide to Palm Oil Mill Waste Management
              </Link>
            </li>
            <li>
              <Link 
                href="/blogs" 
                className="text-primary-600 hover:text-primary-700 hover:underline"
              >
                → Sugar Mill Bagasse to Briquettes Solutions  
              </Link>
            </li>
            <li>
              <Link 
                href="/blogs" 
                className="text-primary-600 hover:text-primary-700 hover:underline"
              >
                → Biomass ROI Calculator for Mills
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}