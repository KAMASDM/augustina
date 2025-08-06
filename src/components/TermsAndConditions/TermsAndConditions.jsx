"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const TermsAndConditions = () => {
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
              Terms and Conditions
            </h1>
          </motion.div>
        </div>
      </section>

      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <Section title="1. Agreement to Terms">
              <p>
                By accessing and using this website (the "Site"), you accept and
                agree to be bound by the terms and provision of this agreement.
                In addition, when using this Site's particular services, you
                shall be subject to any posted guidelines or rules applicable to
                such services. Any participation in this Site will constitute
                acceptance of this agreement.
              </p>
            </Section>

            <Section title="2. Intellectual Property">
              <p>
                The Site and its original content, features, and functionality
                are owned by Asia Biomass Tradelink Pvt. Ltd. and are protected by
                international copyright, trademark, patent, trade secret, and
                other intellectual property or proprietary rights laws. This
                includes all text, graphics, logos, images, and software.
              </p>
            </Section>

            <Section title="3. Use of the Website">
              <p>
                You are granted a limited license to access and use the Site for
                personal and informational purposes. You agree not to use the
                Site for any unlawful purpose or any purpose prohibited under
                this clause. You agree not to use the Site in any way that could
                damage the Site, the services, or the general business of
                Asia Biomass Tradelink Pvt. Ltd.
              </p>
            </Section>

            <Section title="4. Disclaimer of Warranties">
              <p>
                This Site is provided on an "as is" and "as available" basis.
                Asia Biomass Tradelink Pvt. Ltd. makes no representations or
                warranties of any kind, express or implied, as to the operation
                of the Site or the information, content, materials, or products
                included on this Site. You expressly agree that your use of this
                Site is at your sole risk.
              </p>
            </Section>

            <Section title="5. Limitation of Liability">
              <p>
                In no event shall Asia Biomass Tradelink Pvt. Ltd., nor its
                directors, employees, partners, agents, suppliers, or
                affiliates, be liable for any indirect, incidental, special,
                consequential or punitive damages, including without limitation,
                loss of profits, data, use, goodwill, or other intangible
                losses, resulting from your access to or use of or inability to
                access or use the Site.
              </p>
            </Section>

            <Section title="6. Governing Law">
              <p>
                These Terms shall be governed and construed in accordance with
                the laws of India, with jurisdiction in the courts of Surat,
                Gujarat, without regard to its conflict of law provisions.
              </p>
            </Section>

            <Section title="7. Changes to Terms">
              <p>
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. We will provide notice of any
                changes by posting the new Terms and Conditions on this Site.
                Your continued use of the Site after any such changes
                constitutes your acceptance of the new Terms.
              </p>
            </Section>

            <Section title="8. Contact Us">
              <p>
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <p>
                <Link
                  href="/contact-us"
                  className="text-primary-600 hover:underline"
                >
                  Contact Page
                </Link>
              </p>
            </Section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;
