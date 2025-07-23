import React from "react";
import { productData } from "@/lib/productData";
import ProductDetail from "@/components/Products/ProductDetail";

export const generateMetadata = async ({ params }) => {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return {
      title: "Product Not Found | Augustina Tradelink Pvt. Ltd.",
      description: "The requested product was not found",
    };
  }

  const product = productData.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | Augustina Tradelink Pvt. Ltd.",
      description: "The requested product was not found",
    };
  }

  return {
    title: `${product.name} | Augustina Tradelink Pvt. Ltd.`,
    description: product.description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Augustina Tradelink Pvt. Ltd.`,
      description: product.description,
      url: `https://augustina.in/products/${product.slug}`,
      images: [
        {
          url: `https://augustina.in${product.image}`,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      siteName: "Augustina Tradelink Pvt. Ltd.",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Augustina Tradelink Pvt. Ltd.`,
      description: product.description,
      images: [
        {
          url: `https://augustina.in${product.image}`,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
};

const productDetailpage = async ({ params }) => {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const product = productData.find((p) => p.slug === slug);

  const getProductSchema = () => {
    if (!product) return null;

    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: `https://augustina.in${product.image}`,
      brand: {
        "@type": "Brand",
        name: "Augustina Tradelink Pvt. Ltd.",
      },
      model: product.model,
      category: product.category,
      offers: {
        "@type": "Offer",
        url: `https://augustina.in/products/${product.slug}`,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Capacity",
          value: product.specifications.capacity,
        },
        {
          "@type": "PropertyValue",
          name: "Power",
          value: product.specifications.power,
        },
        {
          "@type": "PropertyValue",
          name: "Weight",
          value: product.specifications.weight,
        },
      ],
    };
  };

  const productSchema = getProductSchema();

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <ProductDetail product={product} />
    </>
  );
};

export default productDetailpage;
