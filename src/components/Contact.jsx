import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import toast from 'react-hot-toast';
import { motion } from "framer-motion";

import { API_URL, apiFetch } from "../config/api";

const Contact = () => {
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
      const res = await apiFetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative bg-[#0b1121] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">

      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-700/20 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-700/20 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

      <div className="relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-8 p-8 md:p-16 lg:p-20 items-center">

        {/* Left Side: Typography & Information (Takes 5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left items-center lg:items-start"
        >

          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 text-blue-300 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 md:mb-8 w-max">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Reach Out
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-4 md:mb-6">
            Ready to <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300">
              Collaborate?
            </span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed mb-8 md:mb-12 max-w-md">
            Our engineering team is ready to discuss your infrastructure needs. We typically respond within 24 hours.
          </p>

          <div className="space-y-5 md:space-y-8 w-full max-w-xs sm:max-w-none">
            <div className="flex items-center gap-4 md:gap-6 group text-left">
              <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-300 shadow-lg">
                <Phone className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-widest mb-0.5 md:mb-1">Direct Line</p>
                <div className="flex flex-col">
                  <a href="tel:+919870290602" className="text-base md:text-lg font-bold text-gray-200 hover:text-blue-400 transition-colors duration-300">+91 9870290602</a>
                  <a href="tel:+911800569786" className="text-xs font-medium text-gray-400 hover:text-blue-400 transition-colors duration-300 mt-0.5">Alternate: +91 1800 569 0786</a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-6 group text-left">
              <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-300 shadow-lg">
                <Mail className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-widest mb-0.5 md:mb-1">Email Support</p>
                <a href="mailto:support.greeind@gmail.com" className="text-base md:text-lg font-bold text-gray-200 hover:text-blue-400 transition-colors duration-300">support.greeind@gmail.com</a>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-6 group text-left">
              <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-300 shadow-lg">
                <MapPin className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-widest mb-0.5 md:mb-1">NOIDA HQ</p>
                <p className="text-sm md:text-base font-bold text-gray-200 leading-tight">Assotech Business Cresterra (ABC)<br /><span className="text-gray-400 font-normal text-xs md:text-sm">Tower No. 1, Unit No. 1012, Sector 135, Noida, UP, 201304</span></p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Dark Glass Form (Takes 7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7 lg:pl-12"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 text-center lg:text-left">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-gray-700 text-white placeholder-gray-600 rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 outline-none transition-all duration-300 focus:bg-white/10 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-sm md:text-base"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    className="w-full bg-white/5 border border-gray-700 text-white placeholder-gray-600 rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 outline-none transition-all duration-300 focus:bg-white/10 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-sm md:text-base"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full bg-white/5 border border-gray-700 text-white placeholder-gray-600 rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 outline-none transition-all duration-300 focus:bg-white/10 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-sm md:text-base"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                  <select
                    required
                    className="w-full bg-[#0f1929] border border-gray-700 text-white rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 outline-none transition-all duration-300 focus:bg-[#0f1929] focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-sm md:text-base appearance-none cursor-pointer"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="" disabled style={{ background: '#0f1929', color: '#9ca3af' }}>Select Subject</option>
                    <option value="General Query" style={{ background: '#0f1929', color: '#fff' }}>General Query</option>
                    <option value="Help & Support" style={{ background: '#0f1929', color: '#fff' }}>Help &amp; Support</option>
                    <option value="Sales Support" style={{ background: '#0f1929', color: '#fff' }}>Sales Support</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Inquiry Details</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your infrastructure needs..."
                  className="w-full bg-white/5 border border-gray-700 text-white placeholder-gray-600 rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 outline-none transition-all duration-300 focus:bg-white/10 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 resize-none text-sm md:text-base"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full inline-flex items-center justify-center gap-2 md:gap-3 bg-blue-700 text-white font-bold text-base md:text-lg px-6 py-4 md:px-8 md:py-5 rounded-xl md:rounded-2xl transition-all duration-300 hover:bg-blue-600 shadow-[0_0_20px_rgba(29,78,216,0.3)] hover:shadow-[0_0_40px_rgba(29,78,216,0.5)] disabled:opacity-70 mt-2 md:mt-4 overflow-hidden"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10 tracking-wide">Transmit Request</span>
                    <Send className="w-4 h-4 md:w-5 md:h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] skew-x-[-15deg] group-hover:animate-[shine_1.5s_ease-in-out]"></div>
              </button>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;