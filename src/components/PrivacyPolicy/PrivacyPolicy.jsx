"use client";
import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  const Section = ({ title, children }) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="space-y-4 text-gray-600">{children}</div>
    </div>
  );

  return (
    <div className="pt-20">
      <section className="relative bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Privacy Policy
            </h1>
          </motion.div>
        </div>
      </section>

      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <Section title="1. Introduction">
              <p>
                Welcome to Augustina Tradelink Pvt. Ltd. ("we," "our," or "us").
                We are committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you visit our website. Please read this policy
                carefully. If you do not agree with the terms of this privacy
                policy, please do not access the site.
              </p>
            </Section>

            <Section title="2. Information We Collect">
              <p>
                We may collect information about you in a variety of ways. The
                information we may collect on the Site includes:
              </p>
              <h3 className="text-xl font-semibold text-gray-700 mt-4">
                Personal Data
              </h3>
              <p>
                Personally identifiable information, such as your name, email
                address, and telephone number, that you voluntarily give to us
                when you contact us through our contact form. You are under no
                obligation to provide us with personal information of any kind;
                however, your refusal to do so may prevent you from using
                certain features of the Site.
              </p>
              <h3 className="text-xl font-semibold text-gray-700 mt-4">
                Usage Data
              </h3>
              <p>
                Information our servers automatically collect when you access
                the Site, such as your IP address, your browser type, your
                operating system, your access times, and the pages you have
                viewed directly before and after accessing the Site.
              </p>
            </Section>

            <Section title="3. How We Use Your Information">
              <p>
                Having accurate information about you permits us to provide you
                with a smooth, efficient, and customized experience.
                Specifically, we may use information collected about you via the
                Site to:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Respond to your inquiries and provide you with information
                  about our products and services.
                </li>
                <li>Improve our website and offerings.</li>
                <li>
                  Compile anonymous statistical data and analysis for use
                  internally.
                </li>
                <li>
                  Ensure the security and operational integrity of our website.
                </li>
              </ul>
            </Section>

            <Section title="4. Disclosure of Your Information">
              <p>
                We do not sell, trade, or otherwise transfer to outside parties
                your personally identifiable information. This does not include
                trusted third parties who assist us in operating our website or
                servicing you (such as EmailJS for handling contact form
                submissions), so long as those parties agree to keep this
                information confidential. We may also release your information
                when we believe release is appropriate to comply with the law.
              </p>
            </Section>

            <Section title="5. Security of Your Information">
              <p>
                We use administrative, technical, and physical security measures
                to help protect your personal information. While we have taken
                reasonable steps to secure the personal information you provide
                to us, please be aware that despite our efforts, no security
                measures are perfect or impenetrable, and no method of data
                transmission can be guaranteed against any interception or other
                type of misuse.
              </p>
            </Section>

            <Section title="6. Contact Us">
              <p>
                If you have questions or comments about this Privacy Policy,
                please contact us at:
              </p>
              <p>
                <strong>Augustina Tradelink Pvt. Ltd.</strong>
                <br />
                415-A, Kapadia Compound, Vasta Devdi Road, Katargam, Surat-
                395004
                <br />
                Email:{" "}
                <a
                  href="mailto:enquiry@augustina.in"
                  className="text-primary-600 hover:underline"
                >
                  enquiry@augustina.in
                </a>
              </p>
            </Section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
