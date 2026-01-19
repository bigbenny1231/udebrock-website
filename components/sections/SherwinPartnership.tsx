"use client";

import { motion } from "framer-motion";
import {
  Paintbrush,
  Layers,
  Droplet,
  ExternalLink,
  Smartphone,
  Monitor,
} from "lucide-react";
import Link from "next/link";

const products = [
  {
    icon: Paintbrush,
    name: "Duration®",
    category: "Interior Paint",
    description:
      "Premium interior paint with exceptional coverage and durability. A lifetime warranty paint that delivers beautiful, long-lasting results for any interior space.",
    link: "https://www.sherwin-williams.com/homeowners/products/duration-home-interior-acrylic-latex",
  },
  {
    icon: Layers,
    name: "Emerald® Urethane",
    category: "Trim & Door Paint",
    description:
      "Advanced waterborne alkyd with the toughness of oil-based paint. Perfect for doors, trim, and cabinets with a smooth, durable finish that resists scuffs and marks.",
    link: "https://www.sherwin-williams.com/homeowners/products/emerald-urethane-trim-enamel",
  },
  {
    icon: Droplet,
    name: "Latitude®",
    category: "Exterior Paint",
    description:
      "Advanced exterior acrylic coating that provides exceptional durability and fade resistance. Perfect for Michigan's changing seasons with superior weather protection.",
    link: "https://www.sherwin-williams.com/homeowners/products/latitude-exterior-acrylic-latex",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SherwinPartnership() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="colors" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="text-[#0066B1] font-bold text-lg">
              Sherwin-Williams®
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-forest-700 mb-4"
          >
            The Best Protection Starts with the Best Paint
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-walnut-600 max-w-3xl mx-auto"
          >
            We&apos;ve built our reputation on quality — that&apos;s why we
            trust Sherwin-Williams premium products to protect your home for
            years to come.
          </motion.p>
        </div>

        {/* Product Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {products.map((product) => (
            <motion.a
              key={product.name}
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="bg-cream rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group block"
            >
              <div className="w-14 h-14 rounded-xl bg-[#0066B1]/10 flex items-center justify-center mb-6 group-hover:bg-[#0066B1] transition-colors duration-300">
                <product.icon className="w-7 h-7 text-[#0066B1] group-hover:text-white transition-colors duration-300" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-xl text-walnut-800">
                  {product.name}
                </h3>
                <ExternalLink className="w-4 h-4 text-walnut-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <p className="text-sm text-[#0066B1] font-medium mb-3">
                {product.category}
              </p>

              <p className="text-walnut-600 leading-relaxed">
                {product.description}
              </p>
            </motion.a>
          ))}
        </motion.div>

        {/* Color Tools Section */}
        <motion.div
          id="explore-colors"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-cream rounded-2xl shadow-lg p-8 md:p-12 scroll-mt-24"
        >
          <h3 className="font-bold text-2xl text-forest-700 text-center mb-8">
            Ready to Explore Colors?
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Color Visualizer Card */}
            <div className="bg-forest-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-forest-500 rounded-lg flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-cream" />
                </div>
                <h4 className="font-bold text-lg text-forest-700">
                  Color Visualizer
                </h4>
              </div>

              <p className="text-walnut-600 mb-6">
                Upload a photo of your space and virtually paint it with any
                Sherwin-Williams color. See exactly how it will look before you
                commit.
              </p>

              <div className="space-y-3">
                <a
                  href="https://www.sherwin-williams.com/visualizer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-forest-500 hover:bg-forest-400 text-cream font-semibold py-3 px-4 rounded-lg text-center transition-colors"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Monitor className="w-4 h-4" />
                    Open Web Visualizer
                  </span>
                </a>

                <div className="flex gap-3">
                  <a
                    href="https://apps.apple.com/app/colorsnap-visualizer/id316256242"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-4 bg-walnut-100 hover:bg-walnut-200 rounded-lg text-center text-sm font-medium text-walnut-700 transition-colors"
                  >
                    iOS App
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.sherwin.colorsnap.visualizer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-4 bg-walnut-100 hover:bg-walnut-200 rounded-lg text-center text-sm font-medium text-walnut-700 transition-colors"
                  >
                    Android App
                  </a>
                </div>
              </div>
            </div>

            {/* Color Consultation Card */}
            <div className="bg-antique-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-antique-500 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-walnut-900" />
                </div>
                <h4 className="font-bold text-lg text-walnut-800">
                  Free Color Consultation
                </h4>
              </div>

              <p className="text-walnut-600 mb-6">
                Book a FREE 30-minute virtual session with a Sherwin-Williams
                color expert. Get personalized recommendations for your project.
              </p>

              <a
                href="https://www.sherwin-williams.com/en-us/virtual-color-consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-antique-500 hover:bg-antique-400 text-walnut-900 font-semibold py-3 px-4 rounded-lg text-center transition-colors"
              >
                <span className="flex items-center justify-center gap-2">
                  Get Expert Color Advice — Free
                  <ExternalLink className="w-4 h-4" />
                </span>
              </a>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="mt-8 p-4 bg-forest-50 rounded-lg border border-forest-200">
            <p className="text-forest-700 text-center">
              <strong>Pro Tip:</strong> Found your perfect shade? Add the color
              name and code (like &quot;Agreeable Gray SW 7029&quot;) to your
              quote request. It helps us give you an accurate estimate faster!
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="inline-flex items-center gap-2 bg-antique-500 hover:bg-antique-400 text-walnut-900 font-semibold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Get Your Free Estimate
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
