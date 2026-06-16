import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { API_URL, apiFetch } from '../config/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// The full Contact Us Page Strategy
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiFetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Thank you! Your payload has successfully breached our network.");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast.error("Transmission Failed: " + data.error);
      }
    } catch (error) {
      console.error("API Error", error);
      toast.error("Critical failure connecting to the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-0 flex flex-col font-inter">
      <Helmet>
        <title>Contact Us | GREE INDIA</title>
      </Helmet>

      {/* 1. Header Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-4 md:px-8 mb-16 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          Direct Comm Link
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 mb-4">
          Contact <span className="bg-gradient-to-r from-blue-700 to-blue-700 bg-clip-text text-transparent">GREE INDIA</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto font-medium">Initiate contact with our engineering network. We monitor communications 24/7 for critical enterprise infrastructure deployments.</p>
      </motion.section>

      {/* 2. Unified Grid (Form + Contact Details) */}
      <section className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20 relative z-10">

        {/* Left: Contact Info Node */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 bg-white rounded-[2rem] p-10 md:p-14 shadow-sm border border-gray-100 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-8">Corporate Channels</h3>
            <div className="space-y-8">
              <div className="flex items-center gap-4 sm:gap-6 group">
                <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Phone size={22} className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Direct Line</p>
                  <div className="flex flex-col">
                    <a href="tel:+919870290602" className="text-base sm:text-lg md:text-xl font-bold text-gray-900 hover:text-blue-700 transition-colors duration-300">+91 9870290602</a>
                    <a href="tel:+911800569786" className="text-xs sm:text-sm font-medium text-gray-500 hover:text-blue-700 transition-colors duration-300 mt-0.5">Alternate: +91 1800 569 0786</a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-6 group">
                <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Mail size={22} className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email Protocol</p>
                  <a href="mailto:support.greeind@gmail.com" className="text-sm sm:text-base md:text-xl font-bold text-gray-900 hover:text-blue-700 transition-colors duration-300 break-all sm:break-normal block">support.greeind@gmail.com</a>
                </div>
              </div>
              <div className="flex gap-4 sm:gap-6 group">
                <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-all duration-300 shadow-sm">
                  <MapPin size={22} className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Global HQ</p>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 leading-snug tracking-tight">Assotech Business Cresterra (ABC)<br /><span className="text-gray-500 font-medium text-xs sm:text-sm md:text-base">Tower No. 1, Unit No. 1012, Sector 135, Noida, UP, 201304</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global Reach. Local Execution.</p>
          </div>
        </motion.div>

        {/* Right: Submission Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7 bg-[#0B1120] rounded-[2rem] p-6 sm:p-10 md:p-14 shadow-2xl relative overflow-hidden text-white"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-700/30 blur-[100px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

          <h3 className="text-3xl font-black tracking-tight mb-8 relative z-10">Send Data Packet</h3>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Operative Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 sm:py-4 outline-none transition-all duration-300 focus:bg-white/10 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 font-bold text-sm sm:text-base"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Return Address (Email)</label>
                <input
                  type="email"
                  required
                  placeholder="john@company.com"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 sm:py-4 outline-none transition-all duration-300 focus:bg-white/10 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 font-bold text-sm sm:text-base"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Phone + Subject row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 sm:py-4 outline-none transition-all duration-300 focus:bg-white/10 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 font-bold text-sm sm:text-base"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Subject</label>
                <select
                  required
                  className="w-full bg-[#0B1120] border border-white/10 text-white rounded-xl px-4 py-3 sm:py-4 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 font-bold appearance-none cursor-pointer text-sm sm:text-base"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="" disabled style={{background:'#0B1120', color:'#9ca3af'}}>Select Subject</option>
                  <option value="General Query" style={{background:'#0B1120', color:'#fff'}}>General Query</option>
                  <option value="Help & Support" style={{background:'#0B1120', color:'#fff'}}>Help &amp; Support</option>
                  <option value="Sales Support" style={{background:'#0B1120', color:'#fff'}}>Sales Support</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Inquiry Architecture</label>
              <textarea
                required
                rows={4}
                placeholder="Define your infrastructure needs..."
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 sm:py-4 outline-none transition-all duration-300 focus:bg-white/10 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 resize-none font-bold text-sm sm:text-base"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full inline-flex items-center justify-center gap-3 bg-blue-700 text-white font-bold px-8 py-4 sm:py-5 rounded-xl transition-all duration-300 hover:bg-blue-600 shadow-[0_0_20px_rgba(29,78,216,0.3)] hover:shadow-[0_0_40px_rgba(29,78,216,0.5)] disabled:opacity-70 mt-4 uppercase tracking-widest text-xs sm:text-sm"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Transmitting...
                </span>
              ) : (
                <>
                  <span>Transmit Packet</span>
                  <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </>
              )}
            </button>
          </form>
        </motion.div>

      </section>

      {/* HK + Zhuhai Office Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 mb-10 relative z-10"
      >
        <div className="flex flex-col gap-4">

          {/* Zhuhai Parent Company — TOP */}
          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Parent Company — Zhuhai, China</p>
              <h4 className="text-base md:text-lg font-black text-gray-900 tracking-tight">Gree Electric Appliances, Inc. of Zhuhai</h4>
            </div>
          </div>

          {/* Hong Kong Office — BELOW */}
          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm flex items-start gap-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Regional Office — Hong Kong</p>
              <h4 className="text-base md:text-lg font-black text-gray-900 tracking-tight mb-1">Hong Kong Gree Electric Appliances Sales Limited</h4>
              <p className="text-gray-500 font-medium text-sm">Unit 26/12, 26/F, Mira Place Tower A, 132 Nathan Road, Tsimshatsui, Kowloon, Hong Kong</p>
            </div>
          </div>

        </div>
      </motion.section>

      {/* 3. Edge-to-Edge Map */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="w-full mt-8 px-4 md:px-8 lg:px-12 pb-16 relative z-10"
      >
        <div className="w-full h-[500px] md:h-[600px] relative shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-200 rounded-3xl overflow-hidden">
          <iframe
            src="https://maps.google.com/maps?q=Assotech%20Business%20Cresterra,%20Sector%20135,%20Noida&t=&z=14&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="GREE INDIA HQ Map"
          ></iframe>

          {/* Floating Tag */}
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Corporate HQ</p>
              <p className="text-sm font-black text-gray-900 tracking-tight">GREE INDIA · Noida</p>
            </div>
          </div>
        </div>
      </motion.section>

    </div>
  );
};

export default ContactUs;
