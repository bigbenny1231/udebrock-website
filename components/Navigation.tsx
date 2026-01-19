"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "View Your Room", href: "#explore-colors" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Pay Invoice", href: "#payment" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close mobile menu if open
    const targetIdClean = targetId.replace('#', '');
    
    // Small delay to ensure DOM is ready, especially for mobile menu
    setTimeout(() => {
      const element = document.getElementById(targetIdClean);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80, // Adjust for fixed header height
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-cream/95 backdrop-blur-sm shadow-md py-1"
            : "bg-cream/95 backdrop-blur-sm lg:bg-transparent py-2"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="#home" 
              onClick={(e) => handleScrollTo(e, '#home')}
              className="flex items-center gap-1"
            >
              <img 
                src="/assets/images/company-logo.png" 
                alt="Udebrock Family Finishes Logo" 
                className="h-10 w-10 md:h-12 md:w-12 object-contain -my-2"
              />
              <span className="font-bold text-xl md:text-2xl text-forest-700">
                Udebrock
              </span>
              <span className="font-bold text-xl md:text-2xl text-walnut-500">
                Family Finishes
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-walnut-700 hover:text-forest-600 font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="bg-antique-500 hover:bg-antique-400 text-walnut-900 font-semibold py-2 px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Get Estimate
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-walnut-700"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-walnut-900/50 z-50 lg:hidden"
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-cream z-50 lg:hidden shadow-xl"
            >
              <div className="p-6">
                {/* Close button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-walnut-700"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Logo */}
                <div className="mb-8 flex items-center gap-2">
                  <img 
                    src="/assets/images/company-logo.png" 
                    alt="Udebrock Family Finishes Logo" 
                    className="h-10 w-10 object-contain"
                  />
                  <div>
                    <span className="font-bold text-xl text-forest-700 block">
                      Udebrock
                    </span>
                    <span className="font-bold text-xl text-walnut-500 block">
                      Family Finishes
                    </span>
                  </div>
                </div>

                {/* Links */}
                <div className="space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        handleScrollTo(e, link.href);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block py-3 text-lg text-walnut-700 hover:text-forest-600 font-medium border-b border-walnut-100"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <Link
                    href="#contact"
                    onClick={(e) => {
                      handleScrollTo(e, '#contact');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-center bg-antique-500 hover:bg-antique-400 text-walnut-900 font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Get Your Free Estimate
                  </Link>
                </div>

                {/* Phone */}
                <a
                  href="tel:+19896193317"
                  className="mt-6 flex items-center justify-center gap-2 text-forest-600 font-medium"
                >
                  <Phone className="w-5 h-5" />
                  (989) 619-3317
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
