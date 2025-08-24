// src/app/blogs/[slug]/page.jsx
import BlogDetail from "@/components/Blogs/BlogDetail";

async function getBlog(slug) {
  try {
    const response = await fetch(`https://sweekarme.in/asiabio/api/blogs/${slug}/`, {
      next: { revalidate: 3600 },
    });
    
    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const data = await response.json();
    console.log('Blog data fetched successfully:', data.title);
    return data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export default async function BlogPage({ params }) {
  console.log('BlogPage component rendered with slug:', params.slug);
  
  const blog = await getBlog(params.slug);

  if (!blog) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
          <p>Could not find blog with slug: {params.slug}</p>
          <p className="mt-4 text-sm text-gray-600">Check the browser console for API errors</p>
        </div>
      </div>
    );
  }

  return <BlogDetail blog={blog} />;
}

export async function generateMetadata({ params }) {
  const blog = await getBlog(params.slug);
  
  if (!blog) {
    return {
      title: "Blog Not Found | Asia Biomass Tradelink Pvt. Ltd.",
    };
  }

  return {
    title: `${blog.title} | Asia Biomass Tradelink Pvt. Ltd.`,
    description: blog.content?.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...',
  };
}