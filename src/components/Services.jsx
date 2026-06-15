import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Commercial Users",
    short: "CAC",
    desc: "Advanced cooling systems designed for large-scale commercial environments with high efficiency, durability, and robust performance.",
    points: ["10+ Series", "1000+ Models", "Industrial Grade"],
    image: "/commercial_ac.webp",
  },
  {
    title: "Household Users",
    short: "RAC",
    desc: "Energy-efficient and smart air conditioning solutions tailored to bring absolute comfort and silence to modern homes.",
    points: ["20+ Categories", "400+ Series", "Smart Enabled"],
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
  },
];

const Services = () => {
  return (
    <div className="w-full">
      {/* Heading */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 relative"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 inline-block relative">
          What Services We{" "}
          <span className="bg-gradient-to-r from-blue-700 to-blue-700 bg-clip-text text-transparent">
            Offer
          </span>
          {/* Subtle underline stroke */}
          <svg className="absolute w-full h-3 -bottom-2 right-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/></svg>
        </h2>
        <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Scalable, efficient, and future-ready cooling solutions for residential tranquility and commercial power.
        </p>
      </motion.div>

      {/* Bento Grid Cards */}
      <div className="grid lg:grid-cols-2 gap-8">
        {services.map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="group relative rounded-[2rem] overflow-hidden flex flex-col h-full bg-gray-50 shadow-sm border border-gray-100/50 hover:shadow-2xl transition-all duration-500"
          >
            {/* Image Banner */}
            <div className="relative h-[240px] md:h-[300px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent z-10 transition-opacity duration-500 group-hover:from-blue-950/90"></div>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-[1s] group-hover:scale-110 group-hover:rotate-1"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold tracking-widest uppercase border border-white/20 mb-3 inline-block shadow-lg">
                  {item.short}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex flex-col flex-grow p-8 bg-white z-0 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-[100px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <p className="text-gray-600 text-sm md:text-base leading-relaxed flex-grow">
                {item.desc}
              </p>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-2 mt-6 mb-8 pt-6 border-t border-gray-100">
                {item.points.map((p, idx) => (
                  <span key={idx} className="px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-50 rounded-md border border-blue-100/50">
                    {p}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <Link to="/products" className="flex items-center gap-2 text-sm font-bold text-blue-800 hover:text-blue-950 transition-colors group/btn">
                <span>Discover Infrastructure</span>
                <ArrowRight size={16} className="transform transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;