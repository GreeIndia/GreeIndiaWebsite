import React, { useState } from "react";
import { Send, Package, ArrowRight, ArrowLeft, Upload, CheckCircle } from "lucide-react";
import { fetchLocationByPincode } from "../utils/pincode";
import { API_URL, apiFetch } from "../config/api";
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { INDIAN_STATES } from '../utils/states';

const InstallationForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    landmark: "",
    pincode: "",
    city: "",
    district: "",
    state: "",
    country: "India",
    billCopy: "",
    billCopyName: "",
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
    
    if (!formData.billCopy) {
        toast.error("Please upload a bill copy.");
        setLoading(false);
        return;
    }

    try {
        const payload = new FormData();
        Object.keys(formData).forEach(key => {
            if (key !== 'billCopyName') {
                payload.append(key, formData[key]);
            }
        });

        const res = await apiFetch(`${API_URL}/installation-requests`, {
            method: 'POST',
            body: payload
        });
        const json = await res.json();
        
        if (json.success) {
            toast.success("Installation Request successfully lodged!");
            setFormData({ name: "", email: "", phone: "", landmark: "", pincode: "", city: "", district: "", state: "", country: "India", billCopy: "", billCopyName: "" });
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

  const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          if (file.size > 5 * 1024 * 1024) {
              toast.error("File size exceeds 5MB limit.");
              return;
          }
          setFormData({ ...formData, billCopy: file, billCopyName: file.name });
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
    <div className="bg-gray-50 min-h-screen pt-32 pb-20 flex flex-col items-center font-inter">
      <Helmet>
        <title>Installation Request | GREE INDIA</title>
      </Helmet>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 relative z-10 px-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
          <Package size={14} />
          Installation Support
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Installation Form
          </span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto font-medium">
          Book an installation appointment for your newly purchased Gree product.
        </p>
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
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                  {step === 1 ? "Contact & Location" : "Documentation"}
                </span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-500 ease-out bg-gradient-to-r from-emerald-500 to-teal-500"
                  style={{ width: step === 1 ? "50%" : "100%" }}
                ></div>
              </div>
            </div>

            <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-6 relative z-10">
              
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                      <input type="text" required
                        className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:ring-2 font-bold focus:border-emerald-500 focus:ring-emerald-500/20"
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mobile Number</label>
                      <input type="tel" required
                        className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:ring-2 font-bold focus:border-emerald-500 focus:ring-emerald-500/20"
                        value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                      <input type="email" required
                        className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:ring-2 font-bold focus:border-emerald-500 focus:ring-emerald-500/20"
                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Landmark / Street Address</label>
                        <input type="text" required
                          className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:ring-2 font-bold focus:border-emerald-500 focus:ring-emerald-500/20"
                          value={formData.landmark} onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                          placeholder="e.g. Near City Mall, 12th Avenue"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PIN Code</label>
                        <input type="text" required maxLength={6}
                          className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:ring-2 font-bold focus:border-emerald-500 focus:ring-emerald-500/20"
                          value={formData.pincode} onChange={handlePincodeChange}
                          placeholder="6 Digit PIN"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">City</label>
                        <input type="text" required
                          className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:ring-2 font-bold focus:border-emerald-500 focus:ring-emerald-500/20"
                          value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">District</label>
                        <input type="text" required
                          className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:ring-2 font-bold focus:border-emerald-500 focus:ring-emerald-500/20"
                          value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">State</label>
                        <select required
                          className="w-full bg-gray-50 border border-gray-100 text-gray-900 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:ring-2 font-bold focus:border-emerald-500 focus:ring-emerald-500/20 appearance-none cursor-pointer"
                          value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        >
                          <option value="">Select State / UT</option>
                          {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Country</label>
                        <input type="text" required
                          className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:ring-2 font-bold focus:border-emerald-500 focus:ring-emerald-500/20"
                          value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        />
                    </div>
                  </div>

                  <button type="submit"
                    className="group w-full inline-flex items-center justify-center gap-3 text-white font-bold px-8 py-5 rounded-xl transition-all duration-300 active:scale-95 mt-8 uppercase tracking-widest text-sm bg-emerald-900 hover:bg-emerald-950 shadow-[0_0_20px_rgba(6,78,59,0.3)] hover:shadow-[0_0_40px_rgba(6,78,59,0.5)]"
                  >
                    <span>Next Step</span>
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bill Copy (Upload)</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors duration-300 cursor-pointer relative">
                      <input type="file" required={!formData.billCopy} accept=".pdf,.jpg,.jpeg,.png" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                        onChange={handleFileChange}
                      />
                      <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                      <p className="text-sm font-bold text-gray-700">{formData.billCopyName ? formData.billCopyName : "Click or drag file to upload bill copy"}</p>
                      <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, JPG, PNG (Max 5MB)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <button type="button" onClick={handleBack} disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-600 font-bold px-8 py-5 rounded-xl transition-all duration-300 hover:bg-gray-200 active:scale-95 disabled:opacity-70 uppercase tracking-widest text-sm"
                    >
                      <ArrowLeft size={18} className="transition-transform duration-300 -translate-x-1" />
                      <span>Back</span>
                    </button>
                    <button type="submit" disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 text-white font-bold px-8 py-5 rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-70 uppercase tracking-widest text-sm bg-emerald-600 hover:bg-emerald-700 shadow-[0_0_20px_rgba(5,150,105,0.3)] hover:shadow-[0_0_40px_rgba(5,150,105,0.5)]"
                    >
                      {loading ? "Booking..." : (
                        <><span>Book Installation</span><Send size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></>
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
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle size={40} className="text-emerald-500" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">Booking Confirmed!</h2>
            <p className="text-sm font-medium text-gray-600 mb-6 leading-relaxed">
              Your installation request has been successfully registered. We have sent a confirmation email to <strong className="text-gray-900">{formData.email || 'your email'}</strong>. Our installation team will contact you shortly to schedule your appointment.
            </p>
            <button 
              onClick={() => {
                setShowSuccessPopup(false);
                setStep(1);
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-emerald-600/30"
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

export default InstallationForm;
