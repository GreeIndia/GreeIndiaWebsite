import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Send, ArrowRight, ArrowLeft, CheckCircle, MessageSquare, Upload } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { submitOnlineFeedback } from "../config/api";

const OnlineFeedback = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    area: "",
    product: "",
    type: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file && file.size > 5 * 1024 * 1024) {
        toast.error("File size must not exceed 5MB.");
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && (!formData.name || !formData.email || !formData.tel)) {
        toast.error("Please fill in all contact details.");
        return;
    }
    if (step === 2 && (!formData.area || !formData.product || !formData.type)) {
        toast.error("Please make a selection for all categories.");
        return;
    }
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description) {
        toast.error("Please provide a description.");
        return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) data.append(key, formData[key]);
      });

      const response = await submitOnlineFeedback(data);
      if (response.ok) {
        toast.success("Feedback Submitted Successfully!");
        setFormData({
            name: "", email: "", tel: "", area: "", product: "", type: "", description: "", image: null
        });
        setShowSuccessPopup(true);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Submission error", error);
      toast.error("An error occurred during submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-20 flex flex-col items-center font-inter">
      <Helmet>
        <title>Online Feedback | GREE INDIA</title>
      </Helmet>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 relative z-10 px-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
          <MessageSquare size={14} />
          Customer Voice
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4">
          Online <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">Feedback</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto font-medium">
          Help us improve your experience. Share your thoughts, issues, or suggestions with our executive team.
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
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step {step} of 3</span>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
                    {step === 1 ? "Contact Details" : step === 2 ? "Categorization" : "Feedback & Media"}
                </span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500 ease-out"
                  style={{ width: step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%" }}
                ></div>
              </div>
            </div>

            <form onSubmit={step < 3 ? handleNext : handleSubmit} className="space-y-6 relative z-10">
              
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                    <input type="text" required name="name"
                      className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 font-bold"
                      value={formData.name} onChange={handleChange}
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                    <input type="email" required name="email"
                      className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 font-bold"
                      value={formData.email} onChange={handleChange}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mobile Number</label>
                    <input type="tel" required name="tel"
                      className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 font-bold"
                      value={formData.tel} onChange={handleChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <button type="submit"
                    className="group w-full inline-flex items-center justify-center gap-3 bg-gray-900 text-white font-bold px-8 py-5 rounded-xl transition-all duration-300 hover:bg-blue-700 shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_40px_rgba(29,78,216,0.3)] active:scale-95 mt-8 uppercase tracking-widest text-sm"
                  >
                    <span>Next Step</span>
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Target Division</label>
                    <div className="flex flex-wrap gap-3">
                        {["Corporate Sales", "Technical Support", "Installation Logistics", "Dealership Network", "General Management"].map(opt => (
                        <button
                            key={opt} type="button"
                            onClick={() => setFormData({ ...formData, area: opt })}
                            className={`px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${
                            formData.area === opt 
                                ? 'bg-blue-700 text-white border-blue-700 shadow-md scale-[1.02]' 
                                : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800'
                            }`}
                        >
                            {opt}
                        </button>
                        ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Inquiry Nature</label>
                    <div className="flex flex-wrap gap-3">
                        {["Executive Consultation", "B2B Pricing", "System Troubleshooting", "Strategic Partnership", "Other Request"].map(opt => (
                        <button
                            key={opt} type="button"
                            onClick={() => setFormData({ ...formData, type: opt })}
                            className={`px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${
                            formData.type === opt 
                                ? 'bg-blue-700 text-white border-blue-700 shadow-md scale-[1.02]' 
                                : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800'
                            }`}
                        >
                            {opt}
                        </button>
                        ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Product Architecture Focus</label>
                    <div className="flex flex-wrap gap-3">
                        {["Split Series", "Window Series", "Cassette Arrays", "Tower Units", "Ductable Systems", "Custom Solution"].map(prod => (
                        <button
                            key={prod} type="button"
                            onClick={() => setFormData({ ...formData, product: prod })}
                            className={`px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${
                            formData.product === prod 
                                ? 'bg-blue-700 text-white border-blue-700 shadow-md scale-[1.02]' 
                                : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800'
                            }`}
                        >
                            {prod}
                        </button>
                        ))}
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
                      className="group w-full inline-flex items-center justify-center gap-3 bg-gray-900 text-white font-bold px-8 py-5 rounded-xl transition-all duration-300 hover:bg-blue-700 shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_40px_rgba(29,78,216,0.3)] active:scale-95 disabled:opacity-70 uppercase tracking-widest text-sm"
                    >
                      <span>Next Step</span>
                      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Feedback Description</label>
                    <textarea required name="description" rows={6}
                      className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 font-bold resize-none"
                      value={formData.description} onChange={handleChange}
                      placeholder="Elaborate on your feedback or requirements..."
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Attach Image/Document (Optional)</label>
                    <div className="relative">
                        <input type="file" name="image" onChange={handleChange} accept="image/*,.pdf" className="hidden" id="file-upload" />
                        <label
                        htmlFor="file-upload"
                        className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 group ${
                            formData.image 
                            ? 'border-blue-600 bg-blue-50/50' 
                            : 'border-gray-200 bg-gray-50 hover:border-blue-500 hover:bg-blue-50/30'
                        }`}
                        >
                        {formData.image ? (
                            <div className="flex flex-col items-center gap-3">
                            <CheckCircle className="w-8 h-8 text-blue-700" />
                            <span className="block text-sm font-bold text-gray-900">{formData.image.name}</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                            <Upload className="w-8 h-8 text-gray-400 group-hover:text-blue-700 transition-colors mb-3" />
                            <span className="text-sm font-bold text-gray-600 group-hover:text-blue-700 transition-colors">Click to upload or drag & drop</span>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">JPEG, PNG, PDF up to 5MB</span>
                            </div>
                        )}
                        </label>
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
                      className="group w-full inline-flex items-center justify-center gap-2 text-white font-bold px-8 py-5 rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-70 uppercase tracking-widest text-sm bg-gradient-to-r from-blue-700 to-blue-500 hover:shadow-[0_0_30px_rgba(29,78,216,0.4)]"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative flex flex-col text-center items-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle size={40} className="text-blue-700" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">Feedback Received!</h2>
            <p className="text-sm font-medium text-gray-600 mb-6 leading-relaxed">
              Your submission has been successfully processed. Our executive team will review your requirements and respond shortly.
            </p>
            <button 
              onClick={() => {
                setShowSuccessPopup(false);
                setStep(1);
              }}
              className="w-full bg-gray-900 hover:bg-blue-700 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-blue-700/30"
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

export default OnlineFeedback;
