import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* Background Vertical Stripes */}
      <div className="absolute inset-0 z-0 flex">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-white' : 'bg-[#f7f7f9]'}`}></div>
        ))}
      </div>

      <div className="z-10 text-center flex flex-col items-center relative w-full max-w-5xl px-4">
        
        {/* Large 404 Background Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[85%] md:-translate-y-[75%] w-full pointer-events-none flex justify-center items-center">
          <h1 className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-black text-[#d2cbf1] select-none tracking-tight leading-none drop-shadow-sm flex">
            <span>4</span>
            <span className="mx-2 md:mx-6 z-0">0</span>
            <span>4</span>
          </h1>
        </div>

        {/* Custom SVG Illustration of Disconnected Plug */}
        <div className="relative w-full max-w-3xl h-64 md:h-80 mx-auto mt-20 md:mt-40 z-20">
          <svg viewBox="0 0 800 300" className="w-full h-full drop-shadow-xl overflow-visible">
            <defs>
              <linearGradient id="plugGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
              <linearGradient id="plugGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>

            {/* Left Wire & Socket Group */}
            <g className="animate-[floatLeft_6s_ease-in-out_infinite]">
              <path d="M 100 220 C 150 80, 231 140, 300 180" stroke="#312e81" strokeWidth="16" fill="none" strokeLinecap="round" />
              <g transform="translate(300, 180) rotate(30)">
                <path d="M 80 -40 L 40 -40 C 10 -40 0 -20 0 0 C 0 20 10 40 40 40 L 80 40 Z" fill="url(#plugGradDark)"/>
                <ellipse cx="80" cy="0" rx="15" ry="40" fill="#c4b5fd" />
                <circle cx="83" cy="-15" r="7" fill="#1e1b4b" />
                <circle cx="83" cy="15" r="7" fill="#1e1b4b" />
              </g>
            </g>

            {/* Right Wire & Plug Group */}
            <g className="animate-[floatRight_5s_ease-in-out_infinite]">
              <path d="M 700 160 C 650 280, 569 240, 500 200" stroke="#312e81" strokeWidth="16" fill="none" strokeLinecap="round" />
              <g transform="translate(500, 200) rotate(30)">
                <rect x="-115" y="-20" width="40" height="12" rx="4" fill="#312e81" />
                <rect x="-115" y="8" width="40" height="12" rx="4" fill="#312e81" />
                <path d="M -80 -40 L -40 -40 C -10 -40 0 -20 0 0 C 0 20 -10 40 -40 40 L -80 40 Z" fill="url(#plugGrad)"/>
                <ellipse cx="-80" cy="0" rx="15" ry="40" fill="#60a5fa" />
              </g>
            </g>
          </svg>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-[#312e81] mt-8 z-20 drop-shadow-sm">
          Sorry, Page Not Found
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto mt-2 z-20">
          <Link
            to="/"
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#4c1d95] text-white hover:bg-[#312e81] rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <Home size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-gray-50 text-[#4c1d95] rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg border border-gray-200"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Go Back
          </button>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatLeft {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        @keyframes floatRight {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(-5px); }
        }
      `}} />
    </div>
  );
};

export default NotFound;
