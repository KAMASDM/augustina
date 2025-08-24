/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://sweekarme.in/asiabio',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: [
    '/admin/*',
    '/api/*',
    '/server-sitemap.xml', // <= exclude here
  ],
  additionalPaths: async (config) => {
    const result = []

    // Add dynamic product pages
    try {
      const response = await fetch('https://sweekarme.in/asiabio/api/products/')
      const products = await response.json()
      
      products.forEach((product) => {
        result.push({
          loc: `/products/${product.slug}`,
          changefreq: 'monthly',
          priority: 0.8,
          lastmod: product.updated_at,
        })
      })
    } catch (error) {
      console.log('Error fetching products for sitemap:', error)
    }

    // Add other dynamic pages if you have them
    // Categories, blogs, etc.

    return result
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    additionalSitemaps: [
      'https://sweekarme.in/asiabio/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom function to change priority based on path
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }

    if (path.startsWith('/products')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    }

    // Default transformation
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
  },
}