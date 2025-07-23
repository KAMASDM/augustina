module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml", "/404", "/500"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL}/sitemap.xml`,
      `${process.env.SITE_URL}/server-sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  additionalPaths: async (config) => {
    const { productData } = require("./src/lib/productData");
    const productPaths = productData.map((product) => ({
      loc: `/products/${product.slug}`,
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));

    const staticPaths = [
      "/",
      "/about-us",
      "/contact-us",
      "/products",
      "/services",
      "/privacy-policy",
      "/terms-and-conditions",
    ].map((path) => ({
      loc: path,
      changefreq: "daily",
      priority: path === "/" ? 1.0 : 0.9,
      lastmod: new Date().toISOString(),
    }));

    return [...staticPaths, ...productPaths];
  },
};
