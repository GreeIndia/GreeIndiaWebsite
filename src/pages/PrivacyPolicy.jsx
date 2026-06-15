import React from "react";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, Settings, Share2, Lock, Cookie, UserCheck, RefreshCw, Mail } from "lucide-react";

const rise = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

const sections = [
  {
    icon: FileText,
    title: "1. Information We Collect",
    content: <p>GREE INDIA collects information you provide directly to us, including name, email address, phone number, and company details when you fill out our contact, dealer, or service forms. We may also collect usage data such as pages visited and browser type to improve our platform.</p>
  },
  {
    icon: Settings,
    title: "2. How We Use Your Information",
    content: (
      <>
        <p>We use the information we collect to:</p>
        <ul className="list-disc list-inside mt-3 space-y-2 text-gray-600">
          <li>Process your service requests and dealer applications</li>
          <li>Respond to your inquiries and provide customer support</li>
          <li>Send product updates, technical bulletins, and promotional communications (with your consent)</li>
          <li>Improve our website, products, and services</li>
          <li>Comply with applicable legal obligations</li>
        </ul>
      </>
    )
  },
  {
    icon: Share2,
    title: "3. Data Sharing",
    content: <p>GREE INDIA does not sell, rent, or trade your personal information to third parties. We may share your data with trusted service providers who assist in our business operations, subject to strict confidentiality agreements. We may also disclose information if required by law or to protect our legal rights.</p>
  },
  {
    icon: Lock,
    title: "4. Data Security",
    content: <p>We implement industry-standard security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. All data transmissions are encrypted using SSL/TLS protocols. However, no method of transmission over the Internet is 100% secure.</p>
  },
  {
    icon: Cookie,
    title: "5. Cookies",
    content: <p>Our website may use cookies to enhance your browsing experience and analyze site traffic. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. If you do not accept cookies, some parts of our website may not function properly.</p>
  },
  {
    icon: UserCheck,
    title: "6. Your Rights",
    content: <p>You have the right to access, correct, or delete your personal data held by us. To exercise these rights, please contact us at <span className="text-blue-700 font-bold">support.greeind.com</span>. We will respond to your request within 30 days.</p>
  },
  {
    icon: RefreshCw,
    title: "7. Changes to This Policy",
    content: <p>GREE INDIA reserves the right to update this Privacy Policy at any time. We will notify you of significant changes by posting the new policy on this page with an updated revision date. Continued use of our services after changes constitutes acceptance of the updated policy.</p>
  }
];

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="bg-[#F8FAFC] min-h-screen font-inter pt-32 pb-24 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50 to-transparent pointer-events-none" />
        <div className="absolute -top-32 right-1/4 w-[400px] h-[400px] bg-blue-400 rounded-full blur-[120px] opacity-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm border border-blue-200">
              <ShieldCheck size={14} />
              Legal Document
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-gray-500 font-medium">Last updated: April 2026</p>
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-6">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <motion.div 
                  key={idx}
                  {...rise}
                  transition={{ ...rise.transition, delay: idx * 0.1 }}
                  className="bg-white rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 group"
                >
                  <div className="flex flex-col md:flex-row items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4">{section.title}</h2>
                      <div className="text-gray-600 leading-relaxed font-medium">
                        {section.content}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Contact Section */}
            <motion.div 
              {...rise}
              transition={{ ...rise.transition, delay: 0.8 }}
              className="bg-gradient-to-br from-gray-900 to-[#0b1120] rounded-3xl p-8 md:p-10 shadow-xl border border-gray-800 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-700/20 rounded-full blur-[80px] group-hover:bg-blue-600/30 transition-colors duration-500"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center backdrop-blur-sm">
                      <Mail size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-white">8. Contact Us</h2>
                  </div>
                  <p className="text-gray-400 font-medium mb-6">If you have any questions about this Privacy Policy, please contact us.</p>
                  
                  <div className="space-y-2">
                    <p className="font-bold text-white text-lg">GREE INDIA — Data Privacy Office</p>
                    <p className="text-gray-400">Assotech Business Cresterra (ABC), Tower No. 1, Unit No. 1012, Sector 135, Noida, UP, 201304</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 min-w-[280px] w-full md:w-auto">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md overflow-hidden">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Website</p>
                    <p className="text-blue-400 font-bold break-all">support.greeind.com</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-white font-bold">+91 9870290602 <br/><span className="text-gray-400 text-sm font-normal">Alternate: +91 1800 569 0786</span></p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
