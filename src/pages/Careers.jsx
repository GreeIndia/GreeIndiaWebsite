import React from "react";
import Layout from "../components/Layout";
import { Briefcase, Zap, Globe, ArrowRight } from "lucide-react";

const Careers = () => {
  return (
    <Layout>
      <div className="bg-[#F8FAFC] min-h-screen font-inter pt-32 pb-24">
        
        {/* Header Section */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-widest uppercase mb-6">
            Join The Vanguard
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6">
            Build the Tech that <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">
              Cools the World
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-3xl mx-auto">
            We are looking for brilliant engineers, visionary designers, and relentless operators to help us scale the next generation of climate infrastructure.
          </p>
        </section>

        {/* Culture Section */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 grid lg:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100">
            <Zap size={32} className="text-yellow-500 mb-6" />
            <h3 className="text-2xl font-black text-gray-900 mb-4">High Velocity</h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              We ship hardware and software at an unprecedented pace. You will be empowered to make decisions, break constraints, and immediately see the impact of your work.
            </p>
          </div>
          <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100">
            <Globe size={32} className="text-blue-500 mb-6" />
            <h3 className="text-2xl font-black text-gray-900 mb-4">Global Scale</h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              What you build here will be deployed across 180 countries. We tackle complex logistical, engineering, and data challenges that come with true global infrastructure.
            </p>
          </div>
          <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100">
            <Briefcase size={32} className="text-blue-600 mb-6" />
            <h3 className="text-2xl font-black text-gray-900 mb-4">Total Ownership</h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              No red tape. We hire exceptional talent and get out of their way. You own your projects from conceptual blueprint to final assembly.
            </p>
          </div>
        </section>

        {/* Open Positions Placeholder */}
        <section className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-lg border border-gray-100 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full blur-[80px]"></div>
            
            <h2 className="relative z-10 text-3xl font-black text-gray-900 mb-4">Open Positions</h2>
            <p className="relative z-10 text-gray-500 font-medium mb-10 max-w-lg mx-auto">
              Our engineering and operations teams are currently at capacity as we deploy the Q3 infrastructure, but we are always looking for exceptional talent.
            </p>
            
            <button className="relative z-10 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gray-900 text-white font-bold text-sm tracking-widest uppercase hover:bg-blue-700 transition-colors shadow-xl">
              Send Spontaneous Application
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Careers;
