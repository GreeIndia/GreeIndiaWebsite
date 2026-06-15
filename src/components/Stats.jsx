import React, { useEffect, useState, useRef } from "react";
import { Globe, Users, FlaskConical, Award, Building2, Factory, LineChart, Cpu } from "lucide-react";
import { motion } from "framer-motion";

const statsData = [
  { value: 90000, suffix: "+", label: "Total Employees", icon: Users, main: true },
  { value: 160, suffix: "+", label: "Global Markets", icon: Globe, main: true },
  { value: 1045, suffix: "", label: "Labs Worldwide", icon: FlaskConical, main: true },
  { value: 246, suffix: "th", label: "Forbes 2000", icon: Award, main: false },
  { value: 436, suffix: "th", label: "Fortune 500", icon: LineChart, main: false },
  { value: 15, suffix: "", label: "Production Bases", icon: Factory, main: false },
  { value: 126, suffix: "", label: "Research Centers", icon: Building2, main: false },
  { value: 20, suffix: "+", label: "Years Innovation", icon: Cpu, main: false },
];

const CountUp = ({ end, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1500;
          const increment = end / (duration / 16);
          const counter = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(counter);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const Stats = () => {
  return (
    <div className="w-full relative bg-[#050814] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_80px_-15px_rgba(0,0,0,0.5)] border border-white/5">
      
      {/* Background Ambience & Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-950/30 via-[#050814] to-[#050814] pointer-events-none"></div>
      <div className="absolute w-[800px] h-[800px] bg-blue-700/10 rounded-full blur-[150px] -bottom-[400px] -left-[200px] pointer-events-none"></div>
      
      {/* Blueprint Grid Lines overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBWMG0tMzkuNSAwdjQwaDQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMikiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-30 pointer-events-none"></div>

      <div className="relative z-10 p-8 md:p-14 lg:p-20 grid xl:grid-cols-12 gap-12 xl:gap-8 items-center">
        
        {/* Left Side: Massive Typography (5 Cols) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="xl:col-span-5 flex flex-col justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-300 text-xs font-bold tracking-widest uppercase mb-6 w-max">
            Global Impact
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-extrabold tracking-tight leading-[1.1] mb-6">
            Engineering the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-500">
              Future of Cooling
            </span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-lg mb-8">
            Decades of relentless innovation have forged an infrastructure capable of commanding climate control environments on a strictly global scale.
          </p>
          
          {/* Decorative metric line */}
          <div className="flex items-center gap-4 mt-4">
            <div className="h-[1px] w-12 bg-blue-600"></div>
            <p className="text-xs text-blue-300/60 uppercase tracking-widest font-bold">Unmatched Scale</p>
          </div>
        </motion.div>

        {/* Right Side: Bento Grid of Stats (7 Cols) */}
        <div className="xl:col-span-7">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {statsData.map((stat, idx) => {
              const Icon = stat.icon;
              // Let the first card span full width on mobile and 2 rows on desktop for a cool breaking-grid effect
              let specialGrid = "bg-white/5 border-white/5 hover:bg-white/10";
              if (idx === 0) {
                specialGrid = "col-span-2 md:col-span-1 md:row-span-2 bg-gradient-to-b from-blue-950/40 to-blue-950/20 border-blue-600/20";
              } else if (idx === 7) {
                // Make the last item full width on mobile to balance the 2-column grid
                specialGrid = "col-span-2 md:col-span-1 bg-white/5 border-white/5 hover:bg-white/10";
              }
              
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  key={idx} 
                  className={`relative p-6 rounded-[1.5rem] border backdrop-blur-sm flex flex-col justify-between transition-colors duration-300 group ${specialGrid}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${stat.main ? 'bg-blue-600/20 text-blue-500' : 'bg-white/5 text-gray-400 group-hover:bg-blue-600/20 group-hover:text-blue-300'}`}>
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  
                  <div>
                    <h3 className={`font-black tracking-tight mb-1 ${stat.main ? (idx === 0 ? 'text-4xl md:text-5xl' : 'text-2xl md:text-4xl') : 'text-xl md:text-3xl'} text-white`}>
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </h3>
                    <p className={`text-sm font-medium ${stat.main ? 'text-blue-200' : 'text-gray-500'}`}>
                      {stat.label}
                    </p>
                  </div>
                  
                  {/* Subtle hover glow ring */}
                  <div className="absolute inset-0 border-2 border-blue-600/0 group-hover:border-blue-600/30 rounded-[1.5rem] transition-colors duration-500 pointer-events-none"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Stats;