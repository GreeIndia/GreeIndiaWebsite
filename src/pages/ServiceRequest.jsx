import React, { useState } from "react";
import { Send, Wrench, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { fetchLocationByPincode } from "../utils/pincode";
import { API_URL, apiFetch } from "../config/api";
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { INDIAN_STATES } from '../utils/states';

const ServiceRequest = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [formData, setFormData] = useState({
    productModel: "",
    serialNumber: "",
    purchaseDate: "",
    name: "",
    email: "",
    phone: "",
    landmark: "",
    pincode: "",
    city: "",
    district: "",
    state: "",
    country: "India",
    issue: "",
  });

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
        const res = await apiFetch(`${API_URL}/service-requests`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const json = await res.json();
        
        if (json.success) {
            toast.success("Service Request successfully lodged!");
            setFormData({ productModel: "", serialNumber: "", purchaseDate: "", name: "", email: "", phone: "", landmark: "", pincode: "", city: "", district: "", state: "", country: "India", issue: "" });
            setShowSuccessPopup(true);
        } else {
            toast.error('Failed to submit request: ' + (json.error || 'Unknown error'));
        }
    } catch (err) {
        console.error("Submission error", err);
        toast.error('An error occurred while submitting the request.');
    } finally {
        setLoading(false);
    }
  };

  const handlePincodeChange = async (e) => {
    const pincode = e.target.value;
    setFormData(prev => ({ ...prev, pincode }));

    if (pincode.length === 6) {
        const location = await fetchLocationByPincode(pincode);
        if (location) {
            setFormData(prev => ({
                ...prev,
                city: location.city || prev.city,
                district: location.district || prev.district,
                state: location.state || prev.state,
                country: location.country || prev.country
            }));
        }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-20 flex flex-col items-center font-inter">
      <Helmet>
        <title>Service Request | GREE INDIA</title>
      </Helmet>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 relative z-10 px-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
          <Wrench size={14} />
          Technical Support
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
            Service Request
          </span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto font-medium">
          Register your product issue and our certified engineering team will resolve it promptly.
        </p>
      </motion.div>

      <div className="w-full max-w-3xl px-4 mx-auto relative z-10">
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
                <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
                  {step === 1 ? "Product & Contact Info" : "Location & Issue"}
                </span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-500 ease-out bg-gradient-to-r from-blue-600 to-blue-500"
                  style={{ width: step === 1 ? "50%" : "100%" }}
                ></div>
              </div>
            </div>

            <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-6 relative z-10">
              
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 border-b border-gray-100 pb-2">Product Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product Model</label>
                      <input type="text" required
                        className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:ring-2 font-bold focus:border-blue-600 focus:ring-blue-600/20"
                        value={formData.productModel} onChange={(e) => setFormData({ ...formData, productModel: e.target.value })}
                        placeholder="e.g. GR-INV-9000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Serial Number</label>
                      <input type="text" required
                        className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:ring-2 font-bold focus:border-blue-600 focus:ring-blue-600/20"
                        value={formData.serialNumber} onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                        placeholder="16-digit serial number"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date of Purchase</label>
                      <input type="date" required
                        className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:ring-2 font-bold uppercase focus:border-blue-600 focus:ring-blue-600/20"
                        value={formData.purchaseDate} onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mt-8 mb-2 border-b border-gray-100 pb-2">Contact Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                      <input type="text" required
                        className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:ring-2 font-bold focus:border-blue-600 focus:ring-blue-600/20"
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mobile Number</label>
                      <input type="tel" required
                        className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:ring-2 font-bold focus:border-blue-600 focus:ring-blue-600/20"
                        value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                      <input type="email" required
                        className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:ring-2 font-bold focus:border-blue-600 focus:ring-blue-600/20"
                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <button type="submit"
                    className="group w-full inline-flex items-center justify-center gap-3 text-white font-bold px-8 py-5 rounded-xl transition-all duration-300 active:scale-95 mt-8 uppercase tracking-widest text-sm bg-blue-950 hover:bg-blue-950 shadow-[0_0_20px_rgba(49,46,129,0.3)] hover:shadow-[0_0_40px_rgba(49,46,129,0.5)]"
                  >
                    <span>Next Step</span>
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 border-b border-gray-100 pb-2">Location</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Landmark / Street Address</label>
                        <input type="text" required
                          className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:ring-2 font-bold focus:border-blue-600 focus:ring-blue-600/20"
                          value={formData.landmark} onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                          placeholder="e.g. Near City Mall, 12th Avenue"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PIN Code</label>
                        <input type="text" required maxLength={6}
                          className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:ring-2 font-bold focus:border-blue-600 focus:ring-blue-600/20"
                          value={formData.pincode} onChange={handlePincodeChange}
                          placeholder="6 Digit PIN"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">City</label>
                        <input type="text" required
                          className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:ring-2 font-bold focus:border-blue-600 focus:ring-blue-600/20"
                          value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">District</label>
                        <input type="text" required
                          className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:ring-2 font-bold focus:border-blue-600 focus:ring-blue-600/20"
                          value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">State</label>
                        <select required
                          className="w-full bg-gray-50 border border-gray-100 text-gray-900 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:ring-2 font-bold focus:border-blue-600 focus:ring-blue-600/20 appearance-none cursor-pointer"
                          value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        >
                          <option value="">Select State / UT</option>
                          {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mt-8 mb-2 border-b border-gray-100 pb-2">Technical Issue</h3>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</label>
                    <textarea required rows={4}
                      className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:ring-2 resize-none font-bold focus:border-blue-600 focus:ring-blue-600/20"
                      value={formData.issue} onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                      placeholder="Please describe the issue in detail (e.g., error codes, weird noises, not cooling)"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <button type="button" onClick={handleBack} disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-600 font-bold px-8 py-5 rounded-xl transition-all duration-300 hover:bg-gray-200 active:scale-95 disabled:opacity-70 uppercase tracking-widest text-sm"
                    >
                      <ArrowLeft size={18} className="transition-transform duration-300 -translate-x-1" />
                      <span>Back</span>
                    </button>
                    <button type="submit" disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 text-white font-bold px-8 py-5 rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-70 uppercase tracking-widest text-sm bg-blue-700 hover:bg-blue-800 shadow-[0_0_20px_rgba(29,78,216,0.3)] hover:shadow-[0_0_40px_rgba(29,78,216,0.5)]"
                    >
                      {loading ? "Lodging..." : (
                        <><span>Submit Request</span><Send size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></>
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
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle size={40} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">Request Received!</h2>
            <p className="text-sm font-medium text-gray-600 mb-6 leading-relaxed">
              Your service request has been successfully registered. We have sent a confirmation email to <strong className="text-gray-900">{formData.email || 'your email'}</strong>. Our technical support team will contact you shortly to schedule a visit.
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

export default ServiceRequest;
