import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Apple, Play, Download, Zap, Shield, Smartphone, Star, CheckCircle2, ChevronRight } from "lucide-react";

// Premium Animation Easing
const premiumEase = [0.22, 1, 0.36, 1];

const apps = [
  {
    id: 1,
    name: "Gree+ Smart",
    badge: "Editor's Choice",
    subtitle: "The Ultimate Control Center",
    description: "Elevate your living space with the Gree+ Smart App. Effortlessly control temperature, monitor energy consumption, and customize smart schedules from anywhere in the world.",
    iconUrl: "/logo/GREE INDIA.png",
    rating: "4.9",
    reviews: "124K+",
    features: [
      { icon: Zap, text: "Real-time energy tracking & analytics" },
      { icon: Shield, text: "Bank-grade data security & encryption" },
      { icon: Smartphone, text: "Seamless multi-device synchronization" }
    ],
    iosLink: "https://apps.apple.com/us/app/gree/id1167812986",
    androidLink: "https://play.google.com/store/apps/details?id=com.gree.greeplus&hl=en&gl=US",
    glowColor: "bg-blue-300",
    accentColor: "text-blue-700",
    gradientText: "from-blue-700 to-blue-700",
    mockupColor: "from-blue-50/50 to-white"
  },
  {
    id: 2,
    name: "Gree Service",
    badge: "Enterprise Partner",
    subtitle: "For Our Premium Partners",
    description: "An exclusive digital ecosystem designed specifically for our elite dealers and installation experts. Manage tickets, track warranties, and order genuine parts with unprecedented speed.",
    iconUrl: "/logo/GREE INDIA.png",
    rating: "4.8",
    reviews: "12K+",
    features: [
      { icon: CheckCircle2, text: "Instant ticket assignment & tracking" },
      { icon: Shield, text: "Verified OEM parts marketplace" },
      { icon: Smartphone, text: "Interactive technical manuals library" }
    ],
    iosLink: "https://apps.apple.com/",
    androidLink: "https://play.google.com/",
    glowColor: "bg-blue-300",
    accentColor: "text-blue-700",
    gradientText: "from-blue-700 to-pink-600",
    mockupColor: "from-blue-50/50 to-white"
  }
];

const PremiumDownloadBtn = ({ icon: Icon, platform, link }) => (
  <a 
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex items-center justify-center gap-3 w-full sm:w-[220px] px-6 py-3.5 rounded-xl bg-[#0a0a0a] border border-[#222] shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_35px_rgba(29,78,216,0.3)] hover:border-blue-600/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
  >
    {/* Hover Glow */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-700/10 to-blue-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    <div className="relative z-10">
      <Icon className="w-8 h-8 text-white group-hover:scale-105 transition-transform duration-300" fill={platform === 'App Store' ? 'currentColor' : 'none'} />
    </div>
    
    <div className="flex flex-col text-left relative z-10 ml-1">
      <span className="text-[10px] font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
        {platform === 'App Store' ? 'Download on the' : 'GET IT ON'}
      </span>
      <span className="text-base md:text-lg font-semibold text-white tracking-wide leading-none mt-0.5">
        {platform === 'App Store' ? 'App Store' : 'Google Play'}
      </span>
    </div>
  </a>
);

const AppShowcase = ({ app, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className="relative flex items-center py-16 md:py-24 overflow-hidden">
      
      {/* Background Separation */}
      {!isEven && (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/50 -z-10" />
      )}

      <div className="max-w-[1500px] w-full mx-auto px-6 md:px-12 relative z-10">
        
        {/* Soft Background Glow */}
        <div className={`absolute top-1/2 ${isEven ? 'right-10' : 'left-10'} -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.15] ${app.glowColor} pointer-events-none mix-blend-multiply`} />

        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
          
          {/* App Info Content */}
          <div className="w-full lg:w-1/2 space-y-8 relative z-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: premiumEase }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-gray-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm">
                  {app.badge}
                </span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4" fill="currentColor" />
                  <span className="text-sm font-bold text-gray-900">{app.rating}</span>
                </div>
              </div>
              
              <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-gray-900 tracking-tighter leading-[0.95]">
                {app.name.split(' ')[0]} <br/>
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${app.gradientText}`}>{app.name.split(' ').slice(1).join(' ')}</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed max-w-xl">
                {app.description}
              </p>
            </motion.div>

            {/* Features List */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: premiumEase }}
              className="space-y-5"
            >
              {app.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-default">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                    <feature.icon className={`w-5 h-5 ${app.accentColor}`} strokeWidth={2.5} />
                  </div>
                  <span className="text-base font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                    {feature.text}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Download Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.4, ease: premiumEase }}
              className="flex flex-col sm:flex-row gap-5 pt-6"
            >
              <PremiumDownloadBtn 
                icon={Apple} 
                platform="App Store" 
                link={app.iosLink} 
              />
              <PremiumDownloadBtn 
                icon={Play} 
                platform="Google Play" 
                link={app.androidLink} 
              />
            </motion.div>
          </div>

          {/* Abstract App Visualization (Floating) */}
          <div className="w-full lg:w-1/2 flex justify-center relative z-10 perspective-[2000px]">
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[420px] aspect-[9/19] rounded-[3.5rem] bg-white border-[6px] border-blue-300/50 overflow-hidden"
              style={{
                boxShadow: "0 40px 100px -20px rgba(29,78,216,0.15), inset 0 0 0 4px rgba(255,255,255,1), inset 0 0 0 5px rgba(29,78,216,0.1)"
              }}
            >
              {/* Dynamic Screen Background */}
              <div className={`absolute inset-0 bg-gradient-to-b ${app.mockupColor}`} />
              
              {/* Fake UI Content */}
              <div className="absolute top-16 inset-x-8">
                {/* Header Profile area */}
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm p-2 flex items-center justify-center border border-gray-50">
                       <img src={app.iconUrl} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="w-16 h-2 bg-gray-200 rounded-full mb-2"></div>
                      <div className="w-24 h-3 bg-gray-900 rounded-full"></div>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-50">
                    <div className="w-4 h-4 rounded-full bg-green-400"></div>
                  </div>
                </div>

                {/* Main Card */}
                <div className="w-full h-48 rounded-3xl bg-white shadow-[0_15px_35px_rgba(0,0,0,0.06)] p-6 mb-6 border border-gray-50">
                  <div className="w-32 h-4 bg-gray-100 rounded-full mb-6"></div>
                  <div className="flex items-end justify-between mb-4">
                    <div className="w-20 h-16 bg-gradient-to-t from-gray-200 to-gray-50 rounded-lg"></div>
                    <div className="w-20 h-24 bg-gradient-to-t from-blue-200 to-blue-50 rounded-lg shadow-inner"></div>
                    <div className="w-20 h-12 bg-gradient-to-t from-gray-200 to-gray-50 rounded-lg"></div>
                  </div>
                </div>

                {/* Small Cards */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 h-32 rounded-3xl bg-white shadow-[0_15px_35px_rgba(0,0,0,0.06)] p-5 border border-gray-50">
                    <div className="w-8 h-8 rounded-full bg-blue-50 mb-4 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="w-16 h-3 bg-gray-200 rounded-full mb-2"></div>
                    <div className="w-12 h-2 bg-gray-100 rounded-full"></div>
                  </div>
                  <div className="flex-1 h-32 rounded-3xl bg-white shadow-[0_15px_35px_rgba(0,0,0,0.06)] p-5 border border-gray-50">
                    <div className="w-8 h-8 rounded-full bg-blue-50 mb-4 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="w-16 h-3 bg-gray-200 rounded-full mb-2"></div>
                    <div className="w-12 h-2 bg-gray-100 rounded-full"></div>
                  </div>
                </div>

                {/* List Items */}
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="w-full h-16 rounded-2xl bg-white shadow-[0_8px_20px_rgba(0,0,0,0.04)] border border-gray-50 p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100"></div>
                        <div className="w-20 h-2 bg-gray-200 rounded-full"></div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

const DownloadCenter = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-inter overflow-hidden">
      <Helmet>
        <title>App Ecosystem | GREE INDIA</title>
        <meta name="description" content="Discover and download official GREE INDIA luxury mobile applications." />
      </Helmet>

      {/* Subtle Noise/Grid Background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Hero Section */}
      <div className="pt-32 pb-10 relative z-10">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: premiumEase }}
          >
            <div className="inline-flex items-center justify-center gap-2 mb-8">
              <span className="w-8 h-[1px] bg-blue-700"></span>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-700">
                Official Digital Experience
              </span>
              <span className="w-8 h-[1px] bg-blue-700"></span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter text-gray-900 mb-8 leading-[0.95]">
              The App <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-700 to-pink-600">
                Ecosystem
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
              Experience the pinnacle of digital control and support with our beautifully crafted, ultra-responsive mobile applications.
            </p>
          </motion.div>
        </div>
      </div>

      {/* App Sections */}
      <div className="pb-16 relative z-10">
        {apps.map((app, index) => (
          <AppShowcase key={app.id} app={app} index={index} />
        ))}
      </div>

    </div>
  );
};

export default DownloadCenter;
