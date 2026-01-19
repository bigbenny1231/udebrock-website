"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      className="relative flex flex-col md:flex-row bg-cream overflow-hidden"
      style={{ height: 'calc(100vh - 80px)', marginTop: '80px' }}
    >
      {/* Left Side - Image Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-cream p-2 md:p-8 overflow-hidden" style={{ height: '100%', maxHeight: 'calc(100vh - 80px)' }}>
        <img
          src="/assets/images/hero-background.jpg.jpg"
          alt="Udebrock Family"
          className="rounded-lg shadow-lg w-full max-w-lg object-cover"
          style={{ height: '100%', maxHeight: '100%', width: 'auto' }}
        />
      </div>

      {/* Right Side - Text Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-forest-50/50 to-cream py-12 md:py-16 px-6">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-forest-700 leading-tight mb-6">
              Expert Finishing{" "}
              <span className="text-walnut-500">For Every Surface</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-walnut-600 mb-8 leading-relaxed">
              A family-owned business bringing quality craftsmanship and personal attention to every project in Northern Michigan.
            </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="bg-antique-500 hover:bg-antique-400 text-walnut-900 font-semibold text-lg px-8 py-4 rounded-lg inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Get Your Free Estimate
              <ChevronDown className="w-5 h-5" />
            </Link>
            <Link
              href="#explore-colors"
              onClick={(e) => handleScrollTo(e, '#explore-colors')}
              className="bg-forest-500 hover:bg-forest-400 text-cream font-semibold text-lg px-8 py-4 rounded-lg inline-flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Explore Colors
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-8 h-8 text-walnut-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
