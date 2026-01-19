"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

// Fallback testimonials if API fails
const fallbackTestimonials = [
  {
    id: 1,
    text: "Udebrock Family Finishes transformed our weathered deck into a stunning outdoor space. The attention to detail and quality of their work exceeded our expectations. Highly recommend!",
    author: "Mike & Sarah Thompson",
    location: "Houghton Lake, MI",
    project: "Deck Restoration",
    rating: 5,
  },
  {
    id: 2,
    text: "After getting quotes from several companies, we chose Udebrock for our fence staining project. Best decision we made - the finish is beautiful and has held up perfectly through the seasons.",
    author: "Jennifer Davis",
    location: "Higgins Lake, MI",
    project: "Fence Staining",
    rating: 5,
  },
  {
    id: 3,
    text: "Professional, reliable, and the results speak for themselves. Our log home looks brand new after their treatment. They really understand wood and how to protect it.",
    author: "Robert & Linda Chen",
    location: "Roscommon, MI",
    project: "Log Home Treatment",
    rating: 5,
  },
  {
    id: 4,
    text: "From the initial consultation to the final walkthrough, the Udebrock team was exceptional. They took the time to explain the process and the products they use. Outstanding service!",
    author: "David Martinez",
    location: "Houghton Lake, MI",
    project: "Exterior Painting",
    rating: 5,
  },
];

interface Testimonial {
  id: number;
  text: string;
  author: string;
  location: string;
  project: string;
  rating: number;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        const data = await response.json();
        
        if (data.reviews && data.reviews.length > 0) {
          // Format reviews from API to match testimonial structure
          const formattedReviews = data.reviews.map((review: any, index: number) => ({
            id: index + 1,
            text: review.text || review.full_text || '',
            author: review.author || 'Customer',
            location: review.location || 'Northern Michigan',
            project: review.project || 'Painting Project',
            rating: typeof review.rating === 'number' ? review.rating : 5,
          }));
          
          setTestimonials(formattedReviews);
          setIsLoading(false);
        } else {
          // Use fallback if no reviews found
          setTestimonials(fallbackTestimonials);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Use fallback on error
        setTestimonials(fallbackTestimonials);
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials]);

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return (prev + 1) % testimonials.length;
      }
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="py-24 bg-cream relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-antique-600 font-semibold mb-4"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-forest-700 mb-4"
          >
            What Our Customers Say
          </motion.h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote icon */}
            <Quote className="absolute -top-4 -left-4 w-16 h-16 text-antique-300 opacity-50" />

            {/* Navigation buttons */}
            <button
              onClick={() => navigate(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-cream rounded-full shadow-md flex items-center justify-center text-walnut-600 hover:bg-forest-100 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigate(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-cream rounded-full shadow-md flex items-center justify-center text-walnut-600 hover:bg-forest-100 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Testimonial content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 min-h-[300px] flex items-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 fill-antique-500 text-antique-500"
                        />
                      )
                    )}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl text-walnut-700 leading-relaxed mb-8">
                    &ldquo;{testimonials[currentIndex].text}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-forest-100 flex items-center justify-center">
                      <span className="text-forest-600 font-bold text-lg">
                        {testimonials[currentIndex].author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-walnut-800">
                        {testimonials[currentIndex].author}
                      </p>
                      <p className="text-sm text-walnut-500">
                        {testimonials[currentIndex].project} •{" "}
                        {testimonials[currentIndex].location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-forest-500 w-8"
                    : "bg-walnut-200 hover:bg-walnut-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
