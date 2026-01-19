"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Paintbrush,
  Layers,
  Shield,
  Home,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ProjectImage {
  id: number;
  url: string;
  alt: string;
}

interface Service {
  icon: typeof Home;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  projectImages: ProjectImage[];
}

const services: Service[] = [
  {
    icon: Home,
    title: "Interior Projects",
    category: "interior",
    description:
      "Transform your interior spaces with expert finishing services including walls, trim, and custom interior woodwork that brings your vision to life.",
    thumbnail: "/assets/images/interior-thumbnail.jpg",
    projectImages: [
      {
        id: 1,
        url: "/assets/images/interior-1.png",
        alt: "Interior painting project - living room",
      },
      {
        id: 2,
        url: "/assets/images/interior-2.jpg",
        alt: "Interior painting project - bedroom",
      },
      {
        id: 3,
        url: "/assets/images/interior-3.jpg",
        alt: "Interior painting project - hallway",
      },
      {
        id: 4,
        url: "/assets/images/interior-4.jpg",
        alt: "Interior painting project - accent wall",
      },
    ],
  },
  {
    icon: Shield,
    title: "Exterior Projects",
    category: "exterior",
    description:
      "Protect and beautify your home's exterior with weather-resistant finishes that stand up to Michigan's harsh seasons while enhancing curb appeal.",
    thumbnail: "/assets/images/exterior-thumbnail.jpg",
    projectImages: [
      {
        id: 1,
        url: "/assets/images/exterior-1.jpg",
        alt: "Exterior painting project - full house",
      },
      {
        id: 2,
        url: "/assets/images/exterior-2.jpg",
        alt: "Exterior painting project - siding detail",
      },
      {
        id: 3,
        url: "/assets/images/exterior-3.jpg",
        alt: "Exterior painting project - trim work",
      },
      {
        id: 4,
        url: "/assets/images/exterior-4.jpg",
        alt: "Exterior painting project - completed home",
      },
    ],
  },
  {
    icon: Paintbrush,
    title: "Cabinet Projects",
    category: "cabinets",
    description:
      "Breathe new life into your kitchen and bathroom cabinets with professional refinishing that saves money while delivering stunning results.",
    thumbnail: "/assets/images/cabinet-thumbnail.png",
    projectImages: [
      {
        id: 1,
        url: "/assets/images/cabinet-1.jpg",
        alt: "Cabinet refinishing - kitchen cabinets",
      },
      {
        id: 2,
        url: "/assets/images/cabinet-2.jpg",
        alt: "Cabinet refinishing - bathroom vanity",
      },
      { id: 3, url: "/assets/images/cabinet-3.jpg", alt: "Cabinet refinishing - detail work" },
      {
        id: 4,
        url: "/assets/images/cabinet-4.jpg",
        alt: "Cabinet refinishing - completed kitchen",
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (service: Service) => {
    setSelectedService(service);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedService(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedService) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % selectedService.projectImages.length
      );
    }
  };

  const prevImage = () => {
    if (selectedService) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + selectedService.projectImages.length) %
          selectedService.projectImages.length
      );
    }
  };

  return (
    <section id="services" className="pt-12 pb-12 bg-cream">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-forest-700 mb-3"
          >
            Our Services
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-2xl md:text-3xl font-semibold text-walnut-700 mb-4"
          >
            Quality Finishes That Last
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-walnut-600 max-w-2xl mx-auto"
          >
            Professional craftsmanship that enhances and protects the beauty of your home, inside and out
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
                 className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              onClick={() => openGallery(service)}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-walnut-100">
                {service.thumbnail && service.thumbnail !== "placeholder" ? (
                  <>
                    <img
                      src={service.thumbnail}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      style={{ 
                        display: 'block',
                        position: 'relative',
                        zIndex: 1,
                        minHeight: '100%',
                        width: '100%',
                        height: '100%'
                      }}
                      loading="eager"
                      decoding="async"
                      onError={(e) => {
                        console.error('Image failed to load:', service.thumbnail);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-forest-500/20 to-walnut-500/40 group-hover:opacity-70 transition-opacity pointer-events-none"
                      style={{ zIndex: 2 }}
                    />
                    <div 
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-walnut-900/50 pointer-events-none"
                      style={{ zIndex: 3 }}
                    >
                      <span className="text-white font-semibold text-lg">
                        View Gallery →
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="relative h-full bg-gradient-to-br from-walnut-300 to-walnut-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-forest-500/20 to-walnut-500/40 group-hover:opacity-70 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white font-semibold text-lg">
                        View Gallery →
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-forest-100 flex items-center justify-center mb-4 group-hover:bg-forest-500 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-forest-600 group-hover:text-cream transition-colors duration-300" />
                </div>

                <h3 className="font-bold text-xl text-walnut-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-walnut-600 leading-relaxed text-sm">
                  {service.description}
                </p>

                {/* View projects link */}
                <div className="mt-4 pt-4 border-t border-walnut-100">
                  <span className="text-forest-600 font-medium text-sm group-hover:text-forest-700 transition-colors">
                    View Gallery →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
            className="fixed inset-0 z-50 bg-walnut-900/95 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-cream rounded-xl overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={closeGallery}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-walnut-800/80 rounded-full flex items-center justify-center text-cream hover:bg-walnut-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="bg-forest-700 text-cream p-6">
                <div className="flex items-center gap-3">
                  <selectedService.icon className="w-8 h-8" />
                  <div>
                    <h3 className="font-bold text-2xl">
                      {selectedService.title}
                    </h3>
                    <p className="text-forest-100 text-sm">
                      Project Gallery ({currentImageIndex + 1} of{" "}
                      {selectedService.projectImages.length})
                    </p>
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="relative bg-walnut-100">
                {/* Navigation buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-cream/90 rounded-full shadow-md flex items-center justify-center text-walnut-600 hover:bg-cream transition-colors z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-cream/90 rounded-full shadow-md flex items-center justify-center text-walnut-600 hover:bg-cream transition-colors z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Current Image */}
                {selectedService.projectImages[currentImageIndex].url !== "placeholder" ? (
                  <div className="aspect-video bg-walnut-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={selectedService.projectImages[currentImageIndex].url}
                      alt={selectedService.projectImages[currentImageIndex].alt}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-walnut-300 to-walnut-500 flex items-center justify-center">
                    <p className="text-cream text-lg font-medium">
                      {selectedService.projectImages[currentImageIndex].alt}
                    </p>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="p-6 bg-white">
                <div className="flex gap-3 justify-center">
                  {selectedService.projectImages.map((img, index) => (
                    <button
                      key={img.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden transition-all ${
                        index === currentImageIndex
                          ? "ring-4 ring-forest-500 scale-110"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      {img.url !== "placeholder" ? (
                        <img
                          src={img.url}
                          alt={img.alt}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-walnut-300 to-walnut-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
