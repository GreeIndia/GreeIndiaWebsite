import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Stats from "../components/Stats";
import Services from "../components/Services";
import Showcase from "../components/Showcase";
import HomeSlider from "../components/HomeSlider";
import ProductGallery from "../components/ProductGallery";
import Contact from "../components/Contact";
import SocialWall from "../components/SocialWall";
import SalesBanner from "../components/SalesBanner";
import HeroCategories from "../components/HeroCategories";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50/60 via-blue-50/30 to-blue-50/60 min-h-screen flex flex-col font-inter">
      <Helmet>
        <title>Home | GREE INDIA</title>
        <link rel="preload" as="image" href="/hero_ac.png" fetchpriority="high" />
      </Helmet>

      {/* 1. CINEMATIC HERO SECTION */}
      <section id="home" className="relative h-screen min-h-[700px] flex flex-col justify-center pt-24 pb-10 overflow-hidden">

        {/* Abstract Background Visual */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero_ac.png"
            alt="Luxury AC Living Room"
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover filter blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-[#15122e]/90 to-blue-950/95 mix-blend-multiply"></div>
          {/* Light sweep effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-[200%] animate-[spin_10s_linear_infinite] opacity-50"></div>
        </div>

        {/* Hero Content Card */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 mt-16 md:mt-0 flex flex-col items-center justify-center text-center">

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-blue-300/30 bg-blue-600/10 backdrop-blur-md mb-8 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-sm font-medium tracking-wide text-blue-100">
              Official GREE INDIA Electric Appliances
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-tight"
          >
            Innovate <span className="font-light italic text-blue-300">the</span> <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-300 to-blue-300">
              Climate Control
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-2xl text-blue-100/80 font-light max-w-2xl mx-auto leading-relaxed mb-12"
          >
            State-of-the-art cooling technology designed for efficiency, massive scale, and absolute corporate comfort.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <Link
              to="/products"
              className="px-8 py-4 rounded-full bg-white text-blue-950 font-bold text-lg hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center justify-center gap-3"
            >
              Explore Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
            <a
              href="#services"
              className="px-8 py-4 rounded-full border border-white/30 text-white font-bold text-lg hover:bg-white/10 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
            >
              What We Offer
            </a>
          </motion.div>

        </div>

      </section>

      <HeroCategories />

      {/* THE MAIN CONTENT BODY - distinct spacing below Hero */}
      <main className="relative z-20 flex-grow pt-8 md:pt-16 space-y-8 md:space-y-12 pb-16 overflow-hidden">

        {/* 1. SERVICES */}
        <section id="services" className="w-full px-4 md:px-8 lg:px-12 mx-auto">
          <Services />
        </section>

        {/* 2. SALES BANNER + IMAGE SLIDER WITH COPY */}
        <section id="slider" className="relative w-full">
          {/* Sales Banner strip */}
          <SalesBanner />

          <div className="max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto pt-10 md:pt-16">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left side Typography */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:pr-10 z-10"
            >
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-4 border border-blue-200 bg-blue-50 px-4 py-1.5 rounded-full w-fit"
              >
                Global Infrastructure
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]"
              >
                Engineered for <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-700">Absolute Scale</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium"
              >
                GREE INDIA commands the world's most sophisticated manufacturing arrays. Our specialized facilities are designed to architect, assemble, and deploy advanced cooling matrices to millions of enterprises and homes worldwide without compromising a single parameter of quality.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100"
              >
                <div>
                  <h4 className="text-3xl font-black text-gray-900">400M+</h4>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Global Users</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-gray-900">180</h4>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Countries Deployed</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right side Slider */}
            <div className="w-full relative group">
              {/* Decorative glow behind slider */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-blue-500 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-30 transition duration-700"></div>
              <HomeSlider />
            </div>

          </div>
          </div>
        </section>

        {/* 3. SHOWCASE */}
        <section id="showcase" className="relative w-full px-4 md:px-8 lg:px-12 mx-auto">
          {/* Decorative background stripe */}
          <div className="absolute top-1/2 left-0 w-full h-[60%] bg-gradient-to-r from-blue-50 to-blue-50 -skew-y-2 -z-10"></div>
          <Showcase />
        </section>

        {/* 3. STATS */}
        <section id="stats" className="relative py-12 md:py-16 w-full px-4 md:px-8 lg:px-12 mx-auto">
          <Stats />
        </section>

        {/* 4. PRODUCTS */}
        <section id="products" className="relative w-full px-4 md:px-8 lg:px-12 mx-auto">
          <ProductGallery />
        </section>

        {/* 5. SOCIAL WALL */}
        <section id="social" className="relative w-full mx-auto">
          <SocialWall />
        </section>

        {/* 6. CONTACT */}
        <section id="contact" className="relative w-full px-4 md:px-8 lg:px-12 mx-auto">
          <Contact />
        </section>

      </main>
    </div>
  );
};

export default Home;