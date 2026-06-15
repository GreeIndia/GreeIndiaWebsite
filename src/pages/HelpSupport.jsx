import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HelpCircle, Download, Phone } from "lucide-react";

const HelpSupport = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      q: "How do I register my product for warranty?",
      a: "You can register your product by filling out the Dealer Form or contacting our support team directly. Ensure you have your invoice and product serial number handy."
    },
    {
      q: "Where can I download the Gree+ Smart App?",
      a: "The Gree+ Smart App can be downloaded from our Download Center. Click the Download card above to be redirected to the app links for both iOS and Android."
    },
    {
      q: "How can I request a service or installation?",
      a: "Simply navigate to the 'Services' menu at the top and select 'Service Request' or 'Installation Form'. Our technicians will reach out within 24 hours."
    },
    {
      q: "Where can I find the user manual for my AC?",
      a: "All user manuals, brochures, and technical documents are available in our Download Center. Just select your product model to access the files."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-inter">
      <Helmet>
        <title>Help & Support | GREE INDIA</title>
      </Helmet>

      {/* Header spacing */}
      <div className="pt-32 pb-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Service & Support</h1>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed mx-auto md:mx-0">
            Our expert sales and service professionals in India, as well as our thorough FAQ section, can help you with anything from Gree product selection to installation and maintenance.
          </p>
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto px-6 md:px-12 w-full py-16">
        {/* 3 Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          
          <a href="#faq" className="group bg-white rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-[0_5px_30px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-blue-200 hover:shadow-[0_20px_40px_rgba(29,78,216,0.08)] transition-all duration-500 hover:-translate-y-2">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <HelpCircle className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">FAQ</h3>
            <p className="text-gray-500 text-sm mt-3">Find quick answers to common questions</p>
          </a>

          <Link to="/download-app" className="group bg-white rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-[0_5px_30px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-blue-200 hover:shadow-[0_20px_40px_rgba(29,78,216,0.08)] transition-all duration-500 hover:-translate-y-2">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Download className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">Download</h3>
            <p className="text-gray-500 text-sm mt-3">Get apps, manuals, and brochures</p>
          </Link>

          <Link to="/contact" className="group bg-white rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-[0_5px_30px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-blue-200 hover:shadow-[0_20px_40px_rgba(29,78,216,0.08)] transition-all duration-500 hover:-translate-y-2">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Phone className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">Contact Us</h3>
            <p className="text-gray-500 text-sm mt-3">Reach out to our support team directly</p>
          </Link>

        </div>

        {/* FAQ Section */}
        <div id="faq" className="scroll-mt-32 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-100 transition-colors">
                <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
                  <span className="text-blue-600 font-black">Q.</span> {faq.q}
                </h4>
                <p className="text-gray-600 leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
