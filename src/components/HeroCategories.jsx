import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  {
    name: 'Split AC',
    link: '/products',
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="9" width="20" height="6" rx="1" />
        <line x1="4" y1="13" x2="20" y2="13" />
      </svg>
    ),
  },
  {
    name: 'Window AC',
    link: '/products',
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="12" rx="1" />
        <line x1="14" y1="6" x2="14" y2="18" />
        <line x1="16" y1="9" x2="19" y2="9" />
        <line x1="16" y1="11" x2="19" y2="11" />
        <line x1="16" y1="13" x2="19" y2="13" />
        <line x1="16" y1="15" x2="19" y2="15" />
        <circle cx="17.5" cy="16.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'Duct AC',
    link: '/products',
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" />
        <rect x="7" y="7" width="10" height="10" />
        <rect x="10" y="10" width="4" height="4" />
        <line x1="4" y1="4" x2="10" y2="10" />
        <line x1="20" y1="4" x2="14" y2="10" />
        <line x1="4" y1="20" x2="10" y2="14" />
        <line x1="20" y1="20" x2="14" y2="14" />
      </svg>
    ),
  },
  {
    name: 'Cassette AC',
    link: '/products',
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3,7 21,7 18,17 6,17" />
        <rect x="8" y="9" width="8" height="6" />
        <line x1="10" y1="9" x2="10" y2="15" />
        <line x1="12" y1="9" x2="12" y2="15" />
        <line x1="14" y1="9" x2="14" y2="15" />
      </svg>
    ),
  },
  {
    name: 'VRF Systems',
    link: '/products',
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="7" height="14" />
        <rect x="13" y="6" width="7" height="14" />
        <path d="M5,6 V4 h5 v2" />
        <path d="M14,6 V4 h5 v2" />
        <line x1="6" y1="10" x2="9" y2="10" />
        <line x1="6" y1="12" x2="9" y2="12" />
        <line x1="6" y1="14" x2="9" y2="14" />
        <line x1="15" y1="10" x2="18" y2="10" />
        <line x1="15" y1="12" x2="18" y2="12" />
        <line x1="15" y1="14" x2="18" y2="14" />
        <line x1="3" y1="20" x2="21" y2="20" />
      </svg>
    ),
  },
];

const slideVariants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    };
  },
};

const HeroCategories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  return (
    <div className="w-full bg-white relative z-30 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border-b border-gray-100">
      <div className="max-w-[1600px] mx-auto">
        
        {/* DESKTOP VIEW */}
        <div className="hidden lg:flex justify-between items-center py-8 px-12 gap-0">
          {categories.map((category, index) => (
            <React.Fragment key={category.name}>
              <Link to={category.link} className="w-auto focus:outline-none group">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index, ease: "easeOut" }}
                  className="flex items-center gap-6 relative"
                >
                  <div className="text-gray-400 group-hover:text-blue-600 transition-all duration-500 transform group-hover:scale-110 relative">
                    <div className="absolute inset-0 bg-blue-50 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100 -z-10"></div>
                    {category.icon}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-gray-900 tracking-wide group-hover:text-blue-700 transition-colors duration-300">
                      {category.name}
                    </span>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1 flex items-center gap-1 group-hover:text-blue-500 transition-colors duration-300">
                      Buy Now
                      <svg className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                  </div>
                </motion.div>
              </Link>
              {index < categories.length - 1 && (
                <div className="w-px h-12 bg-gray-200"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* MOBILE / TABLET VIEW */}
        <div className="flex lg:hidden items-center justify-between py-6 px-4 sm:px-8 relative overflow-hidden h-[110px]">
          {/* Left Arrow */}
          <button 
            onClick={prevSlide}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300 focus:outline-none z-10 bg-white shadow-sm border border-gray-100 active:scale-95"
            aria-label="Previous Category"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>

          {/* Single Item Container */}
          <div className="flex-1 flex justify-center items-center relative h-full">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 flex justify-center items-center"
              >
                <Link to={categories[currentIndex].link} className="focus:outline-none group">
                  <div className="flex items-center gap-5 relative">
                    <div className="text-gray-500 group-hover:text-blue-600 transition-all duration-500 transform group-hover:scale-110 relative">
                      <div className="absolute inset-0 bg-blue-50 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100 -z-10"></div>
                      {categories[currentIndex].icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[16px] font-bold text-gray-900 tracking-wide group-hover:text-blue-700 transition-colors duration-300">
                        {categories[currentIndex].name}
                      </span>
                      <span className="text-[12px] font-bold text-blue-500 uppercase tracking-widest mt-1 flex items-center gap-1 transition-colors duration-300">
                        Buy Now
                        <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={nextSlide}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300 focus:outline-none z-10 bg-white shadow-sm border border-gray-100 active:scale-95"
            aria-label="Next Category"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default HeroCategories;
