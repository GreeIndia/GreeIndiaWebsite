import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-8 right-8 z-[100] group
        transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-50 pointer-events-none"}
      `}
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-blue-700/20 blur-xl rounded-full scale-50 group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>

      {/* Expandable Capsule */}
      <div className="relative flex items-center justify-center h-[52px] w-[52px] rounded-full 
        bg-[#0b1120]/90 backdrop-blur-2xl border border-white/10 
        shadow-[0_10px_40px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_30px_rgba(29,78,216,0.3)]
        group-hover:w-[130px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
        
        {/* The Arrow (Slides up and disappears on hover) */}
        <ArrowUp 
          size={20} 
          strokeWidth={2.5}
          className="absolute text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] 
          group-hover:-translate-y-12 group-hover:opacity-0" 
        />
        
        {/* The Text (Slides up from the bottom on hover) */}
        <span className="absolute translate-y-12 opacity-0 font-bold tracking-widest text-[11px] uppercase text-blue-300
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] 
          group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap">
          To Top
        </span>
        
      </div>
    </button>
  );
};

export default ScrollTop;