import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, Check } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { API_URL, apiFetch } from "../config/api";

const Footer = () => {
  const [variants, setVariants] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const res = await apiFetch(`${API_URL}/variants`);
        const json = await res.json();
        if (json.success) {
          setVariants(json.data.map(v => v.name));
        }
      } catch (error) {
        console.error("Failed to fetch variants:", error);
        setVariants(["Fixed Speed Range", "Inverter Range"]);
      }
    };
    fetchVariants();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setShowSuccessModal(true);
      setEmail("");
      // Auto close after 3 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    }
  };

  return (
    <footer className="relative bg-[#0b1121] text-gray-300 pt-20 overflow-hidden border-t border-white/5">

      {/* Massive Background Typography Art */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[30vw] sm:text-[25vw] md:text-[20rem] lg:text-[25rem] font-black text-blue-600/[0.03] tracking-tighter pointer-events-none select-none z-0 leading-[0.85] md:leading-none">
        GREE<br className="block md:hidden" />IND
      </div>

      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-700/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-700/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">

          {/* Brand & Mission (4 cols) */}
          <div className="md:col-span-12 lg:col-span-4 pr-4">
            <h2 className="mb-6">
              <img src="/logo/GREE INDIA.webp" alt="GREE INDIA Logo" loading="eager" fetchPriority="high" className="h-8 md:h-10 object-contain" />
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8 font-medium">
              Architecting the future of global climate control. We deliver high-efficiency cooling infrastructures engineered for sustainability, performance, and durability in modern environments.
            </p>

            {/* Social Icons */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/GREEINDIAOFFICAL"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all duration-300 shadow-sm cursor-pointer hover:scale-110"
                style={{ color: '#1877F2' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1877F2'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#1877F2'; }}
              >
                <FaFacebookF size={14} />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/gree_india_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all duration-300 shadow-sm cursor-pointer hover:scale-110"
                style={{ color: '#E1306C' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'transparent'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#E1306C'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
              >
                <FaInstagram size={14} />
              </a>

              {/* WhatsApp */}
              <a
                href="#"
                onClick={e => { e.preventDefault(); window.open("https://wa.me/message/EOW5UTLSU7I6H1", "_blank"); }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all duration-300 shadow-sm cursor-pointer hover:scale-110"
                style={{ color: '#25D366' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#25D366'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#25D366'; }}
              >
                <FaWhatsapp size={14} />
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com/GreeIndia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all duration-300 shadow-sm cursor-pointer hover:scale-110"
                style={{ color: '#e2e8f0' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#333'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#e2e8f0'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
              >
                <FaXTwitter size={14} />
              </a>

              <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest ml-2 mt-1 md:mt-0">
                - Social Media approved accounts
              </span>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="md:col-span-4 lg:col-span-2">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Company</h3>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              {["Home", "About Us", "Our Mission", "Careers", "Contact"].map((item, i) => (
                <li key={i}>
                  <Link to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`} className="hover:text-blue-500 hover:translate-x-1 inline-block transition-all duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Links (2 cols) */}
          <div className="md:col-span-4 lg:col-span-2">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Solutions</h3>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              <li>
                <Link to="/products" className="hover:text-blue-500 hover:translate-x-1 inline-block transition-all duration-300">
                  All Products
                </Link>
              </li>
              {variants.map((variant, idx) => (
                <li key={idx}>
                  <Link to={`/products/${encodeURIComponent(variant).replace(/%20/g, '-')}`} className="hover:text-blue-500 hover:translate-x-1 inline-block transition-all duration-300">
                    {variant}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter (4 cols) */}
          <div className="md:col-span-4 lg:col-span-4">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Stay Updated</h3>
            <p className="text-sm text-gray-400 font-medium mb-6 leading-relaxed">
              Subscribe to our engineering newsletter for the latest breakthroughs in climate tech and product releases.
            </p>

            <form className="relative group" onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm rounded-2xl px-5 py-4 outline-none transition-all duration-300 focus:bg-white/10 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 aspect-square bg-blue-700 hover:bg-blue-600 text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(29,78,216,0.3)] hover:scale-105"
              >
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </form>
          </div>

        </div>

        {/* Footer Bottom Strip */}
        <div className="pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest text-center md:text-left">
            © COPYRIGHT | {new Date().getFullYear()} GREE INDIA. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs font-semibold text-gray-500 uppercase tracking-widest">
            <Link to="/privacy-policy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-blue-500 transition-colors">Terms of Service</Link>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="mt-4 pt-6 pb-8 border-t border-white/5 flex justify-center w-full">
          <p className="text-[10px] text-gray-500 font-medium tracking-widest uppercase text-center">
            Developed by <a href="https://www.linkedin.com/in/akshatsharma52/" target="_blank" rel="noopener noreferrer" className="text-gray-300 font-bold hover:text-white transition-colors cursor-pointer">Akshat Sharma</a> & Hemant Sharma
          </p>
        </div>

      </div>

      {/* Subscription Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-300">
          <div className="bg-[#0b1121] border border-white/10 rounded-3xl p-8 max-w-sm w-full flex flex-col items-center text-center shadow-2xl transform transition-all animate-in zoom-in-95 duration-300">
            {/* Animated Check */}
            <div className="relative w-20 h-20 mb-6 flex justify-center items-center">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 bg-green-500/30 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
              {/* Inner solid circle */}
              <div className="relative flex items-center justify-center w-16 h-16 bg-green-500 rounded-full shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                {/* SVG for drawing checkmark smoothly */}
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" strokeDasharray="24" strokeDashoffset="0" className="animate-[dash_0.5s_ease-out_forwards]" />
                </svg>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">Success!</h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Thank you for subscribing. You'll now receive the latest updates directly to your inbox.
            </p>
            
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3.5 rounded-xl transition-all duration-300 shadow-sm"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Global CSS for dash animation if not present */}
      <style>{`
        @keyframes dash {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;