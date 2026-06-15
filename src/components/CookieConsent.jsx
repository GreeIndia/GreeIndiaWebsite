import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('greeind_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('greeind_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('greeind_cookie_consent', 'rejected');
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-200 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] p-4 md:py-6 md:px-8 font-sans">
      <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row items-start xl:items-center gap-6 justify-between">
        
        {/* Text Section */}
        <div className="flex-1 text-[13px] md:text-[14px] text-gray-700 leading-[1.6]">
          We use cookies and similar tools for various purposes, including to improve your experience on our website, to personalise content and ads, to provide social media features and to analyse our traffic. We may also share information about your use of our website with our social media, advertising and analytics partners, who may combine it with other information that you have provided to them or that they have collected from your use of their services. To learn more about our use of these tools please review our [Cookie Policy]. Please click [Accept All Cookies] if you agree with the use of all of our cookies. Please click [Cookie Settings] to customise your cookie settings on our website <Link to="/privacy-policy" className="font-bold text-blue-700 hover:underline">Cookies Policy</Link>
        </div>

        {/* Action Buttons Section */}
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto xl:flex-nowrap shrink-0">
          <button 
            className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 rounded-full transition-colors duration-200 whitespace-nowrap"
            onClick={() => {/* Implement settings logic later */}}
          >
            Cookies Settings
          </button>
          <button 
            onClick={handleReject}
            className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 rounded-full transition-colors duration-200 whitespace-nowrap"
          >
            Reject All
          </button>
          <button 
            onClick={handleAccept}
            className="px-8 py-2.5 text-xs font-bold uppercase tracking-widest bg-blue-700 hover:bg-blue-800 text-white rounded-full transition-all duration-300 shadow-[0_5px_15px_rgba(29,78,216,0.3)] hover:shadow-[0_10px_20px_rgba(29,78,216,0.4)] hover:-translate-y-0.5 whitespace-nowrap"
          >
            Accept All Cookies
          </button>
          <button onClick={handleClose} className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-colors duration-200 ml-auto xl:ml-2" aria-label="Close">
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
