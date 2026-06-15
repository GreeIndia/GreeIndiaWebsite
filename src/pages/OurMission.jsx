import React from "react";
import Layout from "../components/Layout";
import { Leaf, Globe, ShieldCheck } from "lucide-react";

const OurMission = () => {
  return (
    <Layout>
      <div className="bg-[#F8FAFC] min-h-screen font-inter pt-32 pb-24">
        
        {/* Header Section */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-widest uppercase mb-6">
            Corporate Directive
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6">
            Architecting a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-700">
              Sustainable Tomorrow
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-3xl mx-auto">
            At GREE INDIA, our mission extends far beyond manufacturing. We are dedicated to pioneering zero-emission cooling technologies that protect our planet while delivering uncompromising performance to millions worldwide.
          </p>
        </section>

        {/* Pillars Section */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 grid lg:grid-cols-3 gap-8 mb-20">
          
          <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <Leaf size={32} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">Eco-Innovation</h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              We engineer our systems to consume vastly less power. Our next-generation refrigerants and inverter drives are designed to drastically reduce carbon footprints across residential and industrial sectors.
            </p>
          </div>

          <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-6">
              <Globe size={32} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">Global Accessibility</h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              Climate control is a necessity, not a luxury. We leverage our massive production capabilities to make state-of-the-art, durable air conditioning available to over 180 countries.
            </p>
          </div>

          <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">Unyielding Integrity</h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              Every unit that leaves our facilities is rigorously tested to outlast standard industry benchmarks. We build trust by delivering hardware that simply does not fail when you need it most.
            </p>
          </div>

        </section>

        {/* Vision Statement */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <div className="bg-gradient-to-br from-gray-900 to-[#0b1120] rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-700/20 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-700/20 rounded-full blur-[80px]"></div>
            
            <h2 className="relative z-10 text-3xl md:text-5xl font-black text-white leading-tight mb-8">
              "To create a centenary enterprise and build a better environment for humankind."
            </h2>
            <p className="relative z-10 text-blue-300 font-bold uppercase tracking-widest text-sm">
              The GREE INDIA Vision
            </p>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default OurMission;
