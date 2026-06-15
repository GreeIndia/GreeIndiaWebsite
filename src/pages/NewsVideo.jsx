import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

const videos = [
  { 
    id: 1, 
    src: "https://res.cloudinary.com/dczjwjbvy/video/upload/v1780939962/News-1_ygsugh.mp4", 
    title: "Global Innovation Summit", 
    description: "Witness the unveiling of our next-generation climate technologies at the 2026 Summit.",
    category: "Premiere",
    duration: "2:45"
  },
  { 
    id: 2, 
    src: "https://res.cloudinary.com/dczjwjbvy/video/upload/v1780939943/News-2_dfahxw.mp4", 
    title: "The Inverter Series", 
    description: "Whisper-quiet performance meets unprecedented energy efficiency.",
    category: "Launch",
    duration: "1:30"
  },
  { 
    id: 3, 
    src: "https://res.cloudinary.com/dczjwjbvy/video/upload/v1780939950/News-3_w2aoxr.mp4", 
    title: "Sustainable Future", 
    description: "Our commitment to a greener planet through state-of-the-art manufacturing.",
    category: "Documentary",
    duration: "3:15"
  },
];

const PremiumVideoCard = ({ video, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        // Pause other videos
        document.querySelectorAll('video').forEach(vid => {
          if (vid !== videoRef.current) {
            vid.pause();
          }
        });
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-shadow duration-500">
      
      {/* Video Section */}
      <div 
        className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 cursor-pointer group"
        onClick={togglePlay}
        onMouseLeave={() => {
          if (!isPlaying && videoRef.current) {
            videoRef.current.currentTime = 0;
          }
        }}
      >
        <video 
          ref={videoRef}
          src={video.src}
          className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-100 opacity-100' : 'scale-105 opacity-90 group-hover:scale-110'}`}
          controls={false}
          controlsList="nodownload"
          onContextMenu={(e) => e.preventDefault()}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          playsInline
        />

        {/* Custom Play/Pause Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100 bg-black/10' : 'opacity-100 bg-black/5 group-hover:bg-black/10'}`}>
          <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-white flex items-center justify-center text-gray-900 transform transition-transform duration-300 hover:scale-110">
            {isPlaying ? <Pause className="w-6 h-6" fill="currentColor" /> : <Play className="w-6 h-6 ml-1" fill="currentColor" />}
          </div>
        </div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col flex-1 pt-6 px-2">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">
            {video.category}
          </span>
          <span className="text-xs font-bold text-gray-400">
            {video.duration} MIN
          </span>
        </div>
        
        <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-3 line-clamp-1">
          {video.title}
        </h3>
        
        <p className="text-gray-500 text-sm leading-relaxed font-light line-clamp-3">
          {video.description}
        </p>
      </div>

    </div>
  );
};

const NewsVideo = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] font-inter pb-20">
      <Helmet>
        <title>Media Gallery | GREE INDIA</title>
        <meta name="description" content="Watch the latest news and video coverage about GREE INDIA." />
      </Helmet>

      <div className="max-w-[1500px] mx-auto px-6 md:px-10 pt-32">
        
        {/* Minimalist Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-700">Coverage</span>
            </h1>
          </div>
          <div className="md:max-w-xs lg:max-w-sm text-gray-500 text-sm md:text-base font-light">
            Explore our curated selection of high-quality videos and news updates.
          </div>
        </div>

        {/* 3-Column Symmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <PremiumVideoCard video={video} index={index} />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default NewsVideo;
