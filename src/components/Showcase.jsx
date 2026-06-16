import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Film } from "lucide-react";
import { motion } from "framer-motion";


const videos = [
  {
    src: "https://res.cloudinary.com/dczjwjbvy/video/upload/Video_1_yazzkw.mp4",
    title: "GREE INDIA Pular Introduction",
    desc: "Advanced cooling systems built for performance, durability, and energy efficiency across industries.",
    tag: "Product Series",
  },
  {
    src: "https://res.cloudinary.com/dczjwjbvy/video/upload/Video_2_iyzpsj.mp4",
    title: "GREE INDIA AWE 2021",
    desc: "A closer look at our global production, engineering excellence, and research-driven innovation.",
    tag: "Innovation Event",
  },
];

const Showcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // When active video changes, reset play state
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [activeIndex]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const activeVideo = videos[activeIndex];

  return (
    <div className="w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-2">
          Visual {" "}
          <span className="bg-gradient-to-r from-blue-700 to-blue-700 bg-clip-text text-transparent">
            Showcase
          </span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg">
          Experience the monumental scale and meticulous engineering behind the technology that powers GREE INDIA.
        </p>
      </motion.div>

      {/* Layout Wrapper */}
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

        {/* Main Cinematic Viewer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 relative w-full aspect-video bg-gray-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border flex border-gray-800 group"
        >

          {/* The Video Element */}
          <video
            ref={videoRef}
            src={activeVideo.src}
            className={`w-full h-full object-cover transition-opacity duration-700 ${isPlaying ? 'opacity-100' : 'opacity-60'}`}
            playsInline
            onEnded={() => setIsPlaying(false)}
          />

          {/* Content Overlay when Paused */}
          <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent transition-opacity duration-500 flex flex-col justify-end p-4 sm:p-8 md:p-12 ${isPlaying ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
            <div className="max-w-3xl translate-y-0 transition-transform duration-500">
              <span className="px-2 py-0.5 sm:py-1 md:px-3 md:py-1 bg-white/20 backdrop-blur-md rounded-md text-white text-[10px] md:text-xs font-bold tracking-widest uppercase border border-white/20 mb-1 sm:mb-2 md:mb-4 inline-block">
                {activeVideo.tag}
              </span>
              <h3 className="text-xl sm:text-3xl md:text-5xl font-bold text-white mb-1 sm:mb-2 md:mb-4 drop-shadow-lg leading-tight">
                {activeVideo.title}
              </h3>
              <p className="text-gray-200 text-xs sm:text-sm md:text-xl font-light mb-1 sm:mb-2 md:mb-8 max-w-2xl line-clamp-1 sm:line-clamp-none">
                {activeVideo.desc}
              </p>
            </div>
          </div>

          {/* Huge Play/Pause Button Area */}
          <div
            className="absolute inset-0 flex items-center justify-center pb-8 sm:pb-0 cursor-pointer"
            onClick={togglePlay}
          >
            <div className={`w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:bg-white/20 ${isPlaying ? 'opacity-0 group-hover:opacity-100 scale-90' : 'opacity-100 scale-100 shadow-[0_0_50px_rgba(255,255,255,0.2)]'}`}>
              {isPlaying ? (
                <Pause className="w-5 h-5 sm:w-8 sm:h-8 md:w-12 md:h-12 text-white drop-shadow-md" fill="currentColor" strokeWidth={1} />
              ) : (
                <Play className="w-5 h-5 sm:w-8 sm:h-8 md:w-12 md:h-12 text-white drop-shadow-md ml-0.5 sm:ml-1" fill="currentColor" strokeWidth={1} />
              )}
            </div>
          </div>
        </motion.div>

        {/* Playlist / Selectors */}
        <div className="flex flex-col gap-4 lg:gap-6 justify-center p-2">
          {videos.map((vid, idx) => {
            const isActive = activeIndex === idx;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`min-h-[120px] md:min-h-[140px] relative overflow-hidden rounded-2xl md:rounded-[2rem] cursor-pointer p-5 md:p-8 flex flex-col justify-center border transition-all duration-300 ${isActive
                  ? 'bg-blue-700 border-blue-600 shadow-xl shadow-blue-600/20'
                  : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'}`}>
                    <Film size={24} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className={`text-lg md:text-xl font-bold leading-tight line-clamp-2 ${isActive ? 'text-white' : 'text-gray-900'}`}>{vid.title}</h4>
                    <p className={`text-xs md:text-sm mt-1 ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                      Click to view chapter
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Showcase;