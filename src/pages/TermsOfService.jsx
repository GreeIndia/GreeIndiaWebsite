import React from "react";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import { FileText, UserCheck, Monitor, ShoppingCart, Briefcase, Lightbulb, ShieldAlert, AlertTriangle, Scale, RefreshCw, Mail } from "lucide-react";

const rise = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

const sections = [
  {
    icon: UserCheck,
    title: "1. Acceptance of Terms",
    content: <p>By accessing and using the GREE INDIA website and services, you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our platform.</p>
  },
  {
    icon: Monitor,
    title: "2. Use of Services",
    content: (
      <>
        <p>GREE INDIA grants you a limited, non-exclusive, non-transferable license to access and use our website for lawful purposes. You agree not to:</p>
        <ul className="list-disc list-inside mt-3 space-y-2 text-gray-600">
          <li>Use the platform for any illegal or unauthorized purpose</li>
          <li>Attempt to gain unauthorized access to any part of our systems</li>
          <li>Transmit harmful, offensive, or disruptive content</li>
          <li>Reproduce or redistribute any content without prior written consent</li>
          <li>Interfere with the normal operation of the website</li>
        </ul>
      </>
    )
  },
  {
    icon: ShoppingCart,
    title: "3. Products & Orders",
    content: <p>All product listings on GREE INDIA are subject to availability. We reserve the right to modify prices, discontinue products, or cancel orders at our discretion. Pricing is subject to change without notice. All purchases are final unless otherwise stated in our return policy.</p>
  },
  {
    icon: Briefcase,
    title: "4. Dealer & Service Agreements",
    content: <p>Submitting a Dealer Form or Service Request does not constitute a binding agreement until officially confirmed in writing by a GREE INDIA representative. GREE INDIA reserves the right to approve or reject any dealer application or service request at its sole discretion.</p>
  },
  {
    icon: Lightbulb,
    title: "5. Intellectual Property",
    content: <p>All content on this website, including text, graphics, logos, images, and software, is the property of GREE INDIA or its content suppliers and is protected by applicable intellectual property laws. Unauthorized use is strictly prohibited.</p>
  },
  {
    icon: ShieldAlert,
    title: "6. Limitation of Liability",
    content: <p>GREE INDIA shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services or products. Our total liability shall not exceed the amount paid by you for the specific product or service giving rise to the claim.</p>
  },
  {
    icon: AlertTriangle,
    title: "7. Warranty Disclaimer",
    content: <p>Our website and services are provided on an "as is" and "as available" basis. GREE INDIA makes no warranties, express or implied, regarding the accuracy, reliability, or availability of our platform. Product warranties are governed by separate warranty documentation provided at the time of purchase.</p>
  },
  {
    icon: Scale,
    title: "8. Governing Law",
    content: <p>These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Noida, Uttar Pradesh, India.</p>
  },
  {
    icon: RefreshCw,
    title: "9. Changes to Terms",
    content: <p>GREE INDIA reserves the right to modify these Terms of Service at any time. Updated terms will be posted on this page with a revised date. Continued use of our services after changes constitutes your acceptance of the new terms.</p>
  }
];

const TermsOfService = () => {
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
              <FileText size={14} />
              Legal Document
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
              Terms of Service
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
                  transition={{ ...rise.transition, delay: idx * 0.08 }}
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
                    <h2 className="text-2xl font-black text-white">10. Contact</h2>
                  </div>
                  <p className="text-gray-400 font-medium mb-6">For any questions regarding these Terms of Service, please contact us.</p>
                  
                  <div className="space-y-2">
                    <p className="font-bold text-white text-lg">GREE INDIA — Legal Department</p>
                    <p className="text-gray-400">Assotech Business Cresterra (ABC), Tower No. 1, Unit No. 1012, Sector 135, Noida, UP, 201304</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 min-w-[280px] w-full md:w-auto">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md overflow-hidden">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Email</p>
                    <p className="text-blue-400 font-bold break-all">support.greeind@gmail.com</p>
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

export default TermsOfService;
