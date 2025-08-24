// src/app/blogs/[slug]/page.jsx
import BlogDetail from "@/components/Blogs/BlogDetail";
import { notFound } from 'next/navigation';

async function getBlog(slug) {
  try {
    // Validate slug before API call
    if (!slug || slug.length > 100 || !/^[a-z0-9\-]+$/.test(slug)) {
      console.error('Invalid slug format:', slug);
      return null;
    }

    console.log('Fetching blog with slug:', slug);
    
    const response = await fetch(`https://sweekarme.in/asiabio/api/blogs/${slug}/`, {
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NextJS/13.0)',
        'Accept': 'application/json',
      },
    });
    
    console.log('API Response status:', response.status);
    
    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      
      // Handle specific error codes
      if (response.status === 404) {
        console.log('Blog not found in API');
        return null;
      }
      
      if (response.status >= 500) {
        console.error('Server error, retrying...');
        // Retry once for server errors
        await new Promise(resolve => setTimeout(resolve, 1000));
        const retryResponse = await fetch(`https://sweekarme.in/asiabio/api/blogs/${slug}/`);
        if (!retryResponse.ok) {
          return null;
        }
        const retryData = await retryResponse.json();
        return retryData;
      }
      
      return null;
    }
    
    const data = await response.json();
    console.log('Blog data fetched successfully:', data?.title || 'No title');
    
    // Validate the returned data
    if (!data || !data.title || !data.slug) {
      console.error('Invalid blog data received:', data);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

// More conservative static params generation
export async function generateStaticParams() {
  try {
    console.log('Generating static params for blogs...');
    
    const response = await fetch('https://sweekarme.in/asiabio/api/blogs/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NextJS/13.0)',
        'Accept': 'application/json',
      },
      // Don't cache during build to get fresh data
      cache: 'no-store',
    });
    
    if (!response.ok) {
      console.warn('Could not fetch blogs for static generation:', response.status);
      return []; // Return empty array to prevent build failure
    }
    
    const blogs = await response.json();
    console.log('Fetched blogs for static generation:', blogs?.length || 0);
    
    if (!Array.isArray(blogs)) {
      console.warn('Blogs data is not an array:', typeof blogs);
      return [];
    }
    
    // Filter and validate slugs
    const validParams = blogs
      .filter(blog => {
        if (!blog || !blog.slug) return false;
        
        // Skip very long slugs that might cause issues
        if (blog.slug.length > 80) {
          console.warn('Skipping very long slug:', blog.slug);
          return false;
        }
        
        // Validate slug format
        if (!/^[a-z0-9\-]+$/.test(blog.slug)) {
          console.warn('Skipping invalid slug format:', blog.slug);
          return false;
        }
        
        return true;
      })
      .map(blog => ({
        slug: blog.slug,
      }));
    
    console.log('Generated static params for', validParams.length, 'blogs');
    
    // Limit to first 50 to prevent build timeouts
    return validParams.slice(0, 50);
    
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return []; // Return empty array to prevent build failure
  }
}

export default async function BlogPage({ params }) {
  try {
    // Handle params properly
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    
    console.log('BlogPage rendered with slug:', slug);
    
    if (!slug) {
      console.error('No slug provided');
      notFound();
    }
    
    // Decode the slug in case it's URL encoded
    const decodedSlug = decodeURIComponent(slug);
    
    const blog = await getBlog(decodedSlug);
    
    if (!blog) {
      console.log('Blog not found, showing 404');
      notFound();
    }
    
    return <BlogDetail blog={blog} />;
    
  } catch (error) {
    console.error('Error in BlogPage component:', error);
    notFound();
  }
}

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    
    if (!slug) {
      return {
        title: "Blog Not Found | Asia Biomass Tradelink Pvt. Ltd.",
      };
    }
    
    const decodedSlug = decodeURIComponent(slug);
    const blog = await getBlog(decodedSlug);
    
    if (!blog) {
      return {
        title: "Blog Not Found | Asia Biomass Tradelink Pvt. Ltd.",
        description: "The requested blog post could not be found.",
      };
    }

    // Clean and truncate description
    const description = blog.content 
      ? blog.content.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...'
      : blog.title || 'Read our latest insights on biomass and renewable energy.';

    return {
      title: `${blog.title} | Asia Biomass Tradelink Pvt. Ltd.`,
      description,
      alternates: {
        canonical: `/blogs/${slug}`,
      },
      openGraph: {
        title: `${blog.title} | Asia Biomass Tradelink Pvt. Ltd.`,
        description,
        url: `https://asiabiomass.in/blogs/${slug}`,
        images: blog.featured_image ? [
          {
            url: blog.featured_image.startsWith('http') 
              ? blog.featured_image 
              : `https://sweekarme.in${blog.featured_image}`,
            width: 800,
            height: 600,
            alt: blog.title,
          },
        ] : [
          {
            url: "https://asiabiomass.in/assets/images/logo.png",
            width: 800,
            height: 600,
            alt: "Asia Biomass Tradelink",
          }
        ],
        siteName: "Asia Biomass Tradelink Pvt. Ltd.",
        locale: "en_US",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: `${blog.title} | Asia Biomass Tradelink Pvt. Ltd.`,
        description,
        images: blog.featured_image ? [
          blog.featured_image.startsWith('http') 
            ? blog.featured_image 
            : `https://sweekarme.in${blog.featured_image}`
        ] : ["https://asiabiomass.in/assets/images/logo.png"],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "Blog | Asia Biomass Tradelink Pvt. Ltd.",
      description: "Read our latest insights on biomass and renewable energy solutions.",
    };
  }
}