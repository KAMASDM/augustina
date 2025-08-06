import React from "react";
import ProductDetail from "@/components/Products/ProductDetail";
import axios from "axios";

// Helper function to fetch a single product
const getProduct = async (slug) => {
  try {
    const response = await axios.get(
      `https://sweekarme.in/asiabio/api/products/${slug}/`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product ${slug}:`, error);
    return null;
  }
};

export const generateMetadata = async ({ params }) => {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: "Product Not Found | Asia Biomass Tradelink Pvt. Ltd.",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.name} | Asia Biomass Tradelink Pvt. Ltd.`,
    description: product.meta_description || product.description.split("\n")[0],
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Asia Biomass Tradelink Pvt. Ltd.`,
      description:
        product.meta_description || product.description.split("\n")[0],
      url: `https://Asia Biomass.in/products/${product.slug}`,
      images: product.image
        ? [
            {
              url: product.image,
              width: 800,
              height: 600,
              alt: product.name,
            },
          ]
        : [],
      siteName: "Asia Biomass Tradelink Pvt. Ltd.",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Asia Biomass Tradelink Pvt. Ltd.`,
      description:
        product.meta_description || product.description.split("\n")[0],
      images: product.image ? [product.image] : [],
    },
  };
};

const ProductDetailPage = async ({ params }) => {
  const product = await getProduct(params.slug);
  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  const getProductSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      brand: {
        "@type": "Brand",
        name: "Asia Biomass Tradelink Pvt. Ltd.",
      },
      ...(product.model && { model: product.model }),
      ...(product.category_name && { category: product.category_name }),
      offers: {
        "@type": "Offer",
        url: `https://Asia Biomass.in/products/${product.slug}`,
        priceCurrency: "INR", 
        availability: "https://schema.org/InStock",
      },
      ...(product.specifications && {
        additionalProperty: Object.entries(product.specifications).map(
          ([key, value]) => ({
            "@type": "PropertyValue",
            name: key.replace(/_/g, " "),
            value: value,
          })
        ),
      }),
    };
  };

  const productSchema = getProductSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetail product={product} />
    </>
  );
};

export default ProductDetailPage;
