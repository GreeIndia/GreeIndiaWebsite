import React, { useState } from "react";
import { Send, Briefcase, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { API_URL, apiFetch } from "../config/api";
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const DealerForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
    taxId: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) setStep(2);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const res = await apiFetch(`${API_URL}/dealer-requests`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const json = await res.json();
        
        if (json.success) {
            toast.success("Dealer Application Submitted Successfully!");
            setFormData({ businessName: "", contactPerson: "", email: "", phone: "", taxId: "" });
            setShowSuccessPopup(true);
        } else {
            toast.error('Failed to submit application: ' + (json.error || 'Unknown error'));
        }
    } catch (err) {
        console.error("Submission error", err);
        toast.error('An error occurred while submitting the application.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-16 flex flex-col items-center font-inter">
      <Helmet>
        <title>Become a Dealer | GREE INDIA</title>
      </Helmet>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 relative z-10 px-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
          <Briefcase size={14} />
          B2B Partnership
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4">
          Become a <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">Gree Dealer</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto font-medium">Join our global distribution network and supply state-of-the-art climate infrastructure to your region.</p>
      </motion.div>

      <div className="w-full max-w-3xl px-4 relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-[2rem] p-10 md:p-14 shadow-2xl border border-gray-100 relative overflow-hidden"
        >
            
            {/* Progress Bar */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step {step} of 2</span>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">{step === 1 ? "Business Details" : "Contact Information"}</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-500 ease-out"
                  style={{ width: step === 1 ? "50%" : "100%" }}
                ></div>
              </div>
            </div>

            <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-6 relative z-10">
              
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Business/Company Name</label>
                    <input type="text" required
                      className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 font-bold"
                      value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="e.g. Acme Cooling Solutions"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tax ID / GST Number</label>
                    <input type="text" required
                      className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 font-bold"
                      value={formData.taxId} onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                      placeholder="Enter corporate tax ID"
                    />
                  </div>

                  <button type="submit"
                    className="group w-full inline-flex items-center justify-center gap-3 bg-blue-950 text-white font-bold px-8 py-5 rounded-xl transition-all duration-300 hover:bg-blue-950 shadow-[0_0_20px_rgba(49,46,129,0.3)] hover:shadow-[0_0_40px_rgba(49,46,129,0.5)] active:scale-95 mt-8 uppercase tracking-widest text-sm"
                  >
                    <span>Next Step</span>
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contact Person</label>
                    <input type="text" required
                      className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 font-bold"
                      value={formData.contactPerson} onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                    <input type="email" required
                      className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 font-bold"
                      value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="director@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                    <input type="tel" required
                      className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 font-bold"
                      value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <button type="button" onClick={handleBack} disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-600 font-bold px-8 py-5 rounded-xl transition-all duration-300 hover:bg-gray-200 active:scale-95 disabled:opacity-70 uppercase tracking-widest text-sm"
                    >
                      <ArrowLeft size={18} className="transition-transform duration-300 -translate-x-1" />
                      <span>Back</span>
                    </button>
                    <button type="submit" disabled={loading}
                      className="group w-full inline-flex items-center justify-center gap-2 bg-blue-700 text-white font-bold px-8 py-5 rounded-xl transition-all duration-300 hover:bg-blue-800 shadow-[0_0_20px_rgba(29,78,216,0.3)] hover:shadow-[0_0_40px_rgba(29,78,216,0.5)] active:scale-95 disabled:opacity-70 uppercase tracking-widest text-sm"
                    >
                      {loading ? "Submitting..." : (
                        <><span>Submit</span><Send size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
        </motion.div>
      {/* Success Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative animate-fadeInScale flex flex-col text-center items-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle size={40} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">Application Submitted!</h2>
            <p className="text-sm font-medium text-gray-600 mb-6 leading-relaxed">
              Your dealer application has been successfully submitted. Our B2B partnership team will review your details and contact you shortly.
            </p>
            <button 
              onClick={() => {
                setShowSuccessPopup(false);
                setStep(1);
              }}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-700/30"
            >
              Done
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default DealerForm;
