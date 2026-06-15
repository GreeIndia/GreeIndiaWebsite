import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import slider1 from "../assets/images/Home_Slider/slider_image_1.png";
import slider2 from "../assets/images/Home_Slider/slider_image_2.png";

const slides = [
  { id: 1, src: slider1, alt: "GREE INDIA Slider 1" },
  { id: 2, src: slider2, alt: "GREE INDIA Slider 2" },
];

const HomeSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative w-full max-w-[1920px] mx-auto overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl group"
    >
      
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full relative bg-gray-50 flex items-center justify-center">
            {/* Optional subtle gradient overlay so controls/text stay visible if added later */}
            <div className="absolute inset-0 bg-black/5 z-10 pointer-events-none"></div>
            <img 
              src={slide.src} 
              alt={slide.alt} 
              className="w-full h-auto object-contain"
            />
          </div>
        ))}
      </div>

      {/* Manual Controls - Hidden on mobile, visible on hover on larger screens */}
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-blue-700 shadow-lg"
      >
        <ChevronLeft size={24} strokeWidth={3} />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-blue-700 shadow-lg"
      >
        <ChevronRight size={24} strokeWidth={3} />
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === idx 
                ? "w-8 h-2.5 bg-white" 
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default HomeSlider;
