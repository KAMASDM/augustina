import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { HiPhone, HiMail, HiLocationMarker, HiClock } from "react-icons/hi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const companyName = "Asia Biomass Tradelink Pvt Ltd";
  const companyAddress = {
    street: "415-A, Kapadia Compound, Vasta Devdi Road",
    city: "Katargam, Surat",
    postalCode: "395004",
    region: "Gujarat",
    country: "India",
  };

  return (
    <footer
      className="bg-gradient-to-b from-gray-50 to-gray-100"
      role="contentinfo"
    >
      <div className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div itemScope itemType="https://schema.org/Organization">
              <Link href="/" className="inline-block mb-6" passHref>
                <Image
                  src="/assets/images/logo.png"
                  alt={`${companyName} Logo`}
                  height={40}
                  width={120}
                  priority
                  itemProp="logo"
                />
              </Link>
              <p className="text-gray-600 mb-6" itemProp="description">
                Committed to innovation that leads to a green future. We provide
                innovative & commercially viable solutions for sustainable
                energy.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/Asia Biomass"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="text-primary-600 transition-colors"
                  itemProp="sameAs"
                >
                  <FaFacebook className="w-6 h-6" />
                </a>
                <a
                  href="https://twitter.com/Asia Biomass"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Twitter"
                  className="text-primary-600 transition-colors"
                  itemProp="sameAs"
                >
                  <FaTwitter className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com/company/Asia Biomass"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on LinkedIn"
                  className="text-primary-600 transition-colors"
                  itemProp="sameAs"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Quick Links
              </h3>
              <ul className="space-y-4">
                {[
                  { name: "About Us", path: "/about-us" },
                  { name: "Services", path: "/services" },
                  { name: "Products", path: "/products" },
                  { name: "Contact Us", path: "/contact-us" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                      aria-label={`Navigate to ${item.name}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Our Services
              </h3>
              <ul className="space-y-4">
                {[
                  "Free Consultancy",
                  "Optimised Solutions",
                  "Biomass Equipment",
                  "Project Revival",
                  "Installation Services",
                ].map((service) => (
                  <li key={service}>
                    <Link
                      href="/services"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                      aria-label={`Learn more about ${service}`}
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div itemScope itemType="https://schema.org/LocalBusiness">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Contact Info
              </h3>
              <div className="space-y-4">
                <div
                  className="flex items-start space-x-3"
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <HiLocationMarker className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-600">
                    <span itemProp="streetAddress">
                      {companyAddress.street}
                    </span>
                    ,{" "}
                    <span itemProp="addressLocality">
                      {companyAddress.city}
                    </span>{" "}
                    -{" "}
                    <span itemProp="postalCode">
                      {companyAddress.postalCode}
                    </span>
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <HiPhone className="w-5 h-5 text-primary-600" />
                  <a
                    href="tel:+919998835511"
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                    itemProp="telephone"
                    aria-label="Call us at +91 9998835511"
                  >
                    +91 9998835511
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <HiMail className="w-5 h-5 text-primary-600" />
                  <a
                    href="mailto:enquiry@Asia Biomass.in"
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                    itemProp="email"
                    aria-label="Email us at enquiry@Asia Biomass.in"
                  >
                    enquiry@Asia Biomass.in
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <HiClock className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-600" itemProp="openingHours">
                    Mon - Sat 10.00 AM - 8.00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 text-center md:flex md:justify-between md:text-left">
            <p className="text-gray-600">
              © {currentYear} {companyName}. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <Link
                href="/privacy-policy"
                className="text-gray-600 hover:text-primary-600 transition-colors mx-4"
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="text-gray-600 hover:text-primary-600 transition-colors mx-4"
                aria-label="Terms and Conditions"
              >
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
