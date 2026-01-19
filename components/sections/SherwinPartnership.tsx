"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Smartphone,
  Monitor,
} from "lucide-react";
import Link from "next/link";

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
