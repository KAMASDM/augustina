// src/app/sitemap.js
import axios from 'axios';

const BASE_URL = 'https://asiabiomass.in';
const API_BASE_URL = 'https://sweekarme.in/asiabio/api/';

export default async function sitemap() {
  // Fetch static pages
  const staticPaths = [
    '', // Home page
    '/about-us',
    '/products',
    '/services',
    '/blogs',
    '/contact-us',
    '/privacy-policy',
    '/terms-and-conditions',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date().toISOString(),
  }));

  // Fetch dynamic product pages
  let products = [];
  try {
    const productResponse = await axios.get(`${API_BASE_URL}products/`);
    products = productResponse.data;
  } catch (error) {
    console.error('Failed to fetch products for sitemap:', error);
  }
  const productPaths = products.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    lastModified: new Date(product.updated_at).toISOString(),
  }));

  // Fetch dynamic blog pages
  let blogs = [];
  try {
    const blogResponse = await axios.get(`${API_BASE_URL}blogs/`);
    blogs = blogResponse.data;
  } catch (error) {
    console.error('Failed to fetch blogs for sitemap:', error);
  }
  const blogPaths = blogs.map((blog) => ({
    url: `${BASE_URL}/blogs/${blog.slug}`,
    lastModified: new Date(blog.updated_at).toISOString(),
  }));

  // Combine all paths into a single sitemap
  return [
    ...staticPaths,
    ...productPaths,
    ...blogPaths,
  ];
}