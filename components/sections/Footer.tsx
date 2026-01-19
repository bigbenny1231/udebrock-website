"use client";

import Link from "next/link";
import { Facebook, Phone, Mail, MapPin } from "lucide-react";

const services = [
  { name: "Interior Projects", href: "#services" },
  { name: "Exterior Projects", href: "#services" },
  { name: "Cabinet Projects", href: "#services" },
];

const quickLinks = [
  { name: "Reviews", href: "#testimonials" },
  { name: "Get Estimate", href: "#contact" },
  { name: "Pay Invoice", href: "#payment" },
  { name: "View Your Room", href: "#explore-colors" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-walnut-800 text-cream">
      {/* Main footer content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <img 
                src="/assets/images/company-logo.png" 
                alt="Udebrock Family Finishes Logo" 
                className="h-12 w-12 object-contain -my-4"
              />
              <h3 className="font-bold text-2xl">
                Udebrock Family Finishes
              </h3>
            </div>
            <p className="text-walnut-200 mb-6 leading-relaxed">
                     Northern Michigan&apos;s trusted experts in interior and exterior
                     painting and cabinet restoration. Family-owned and committed
                     to quality craftsmanship.
            </p>
            {/* Social */}
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/mielitepainting/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-walnut-700 rounded-lg flex items-center justify-center hover:bg-forest-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-antique-400">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-walnut-200 hover:text-antique-400 transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links column */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-antique-400">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-walnut-200 hover:text-antique-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-antique-400">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+19896193317"
                  className="flex items-center gap-3 text-walnut-200 hover:text-antique-400 transition-colors"
                >
                  <Phone className="w-5 h-5 text-forest-400" />
                  (989) 619-3317
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@udebrockfinishes.com"
                  className="flex items-center gap-3 text-walnut-200 hover:text-antique-400 transition-colors"
                >
                  <Mail className="w-5 h-5 text-forest-400" />
                  contact@udebrockfinishes.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-walnut-200">
                <MapPin className="w-5 h-5 text-forest-400 flex-shrink-0 mt-0.5" />
                <span>
                  Serving Houghton Lake, Higgins Lake,
                  <br />
                  Roscommon & Surrounding Areas
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-walnut-700">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-walnut-400 text-sm">
              © {currentYear} Udebrock Family Finishes. All rights reserved.
            </p>
            <p className="text-walnut-400 text-sm flex items-center gap-2">
              Proudly using{" "}
              <span className="text-[#0066B1] font-semibold">
                Sherwin-Williams®
              </span>{" "}
              products
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
