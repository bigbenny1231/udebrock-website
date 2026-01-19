"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const portfolioItems = [
  {
    id: 1,
    category: "interior",
    title: "Living Room Transformation",
    description: "Complete interior paint refresh with Duration interior paint",
  },
  {
    id: 2,
    category: "exterior",
    title: "Home Exterior Refresh",
    description: "Full exterior repaint using Latitude exterior paint",
  },
  {
    id: 3,
    category: "doors",
    title: "Front Entry Door Refinish",
    description: "Beautiful door restoration with Emerald Urethane finish",
  },
  {
    id: 4,
    category: "cabinets",
    title: "Kitchen Cabinet Refinish",
    description: "Complete kitchen transformation with premium cabinet finish",
  },
];

const filters = [
  { id: "all", label: "All Projects" },
  { id: "interior", label: "Interior" },
  { id: "exterior", label: "Exterior" },
  { id: "doors", label: "Doors" },
  { id: "cabinets", label: "Cabinets" },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<
    (typeof portfolioItems)[0] | null
  >(null);

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 bg-walnut-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-antique-600 font-semibold mb-4"
          >
            Our Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-forest-700 mb-4"
          >
            Recent Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-walnut-600 max-w-2xl mx-auto"
          >
            See the transformation our expert finishing brings to homes across
            Northern Michigan
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-forest-500 text-cream shadow-md"
                  : "bg-cream text-walnut-600 hover:bg-forest-100"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedItem(item)}
                className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
              >
                {/* Placeholder gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-walnut-300 to-walnut-500" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-forest-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <span className="text-antique-400 text-sm font-medium uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="text-cream font-bold text-lg">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-antique-500 hover:bg-antique-400 text-walnut-900 font-semibold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Start Your Project
          </a>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-walnut-900/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-cream rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-walnut-800/80 rounded-full flex items-center justify-center text-cream hover:bg-walnut-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-video bg-gradient-to-br from-walnut-300 to-walnut-500" />
              <div className="p-6">
                <span className="text-antique-600 text-sm font-medium uppercase tracking-wider">
                  {selectedItem.category}
                </span>
                <h3 className="font-bold text-2xl text-walnut-800 mt-1">
                  {selectedItem.title}
                </h3>
                <p className="text-walnut-600 mt-2">{selectedItem.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
