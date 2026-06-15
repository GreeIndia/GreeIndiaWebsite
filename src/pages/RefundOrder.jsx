import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle, X, ChevronRight, ChevronLeft, AlertCircle, Image as ImageIcon, Video, Loader2 } from 'lucide-react';
import { API_URL } from '../config/api';
import toast from 'react-hot-toast';

const RefundOrder = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderId: '',
    issue: '',
  });
  const [file, setFile] = useState(null); // Invoice
  const [issueMedia, setIssueMedia] = useState(null); // Issue Image/Video
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderIdStatus, setOrderIdStatus] = useState('idle'); // 'idle', 'loading', 'valid', 'invalid'

  useEffect(() => {
    if (formData.orderId.length > 0) {
      setOrderIdStatus('loading');
    } else {
      setOrderIdStatus('idle');
    }

    const checkOrder = async () => {
      if (formData.orderId.length < 5) {
        setOrderIdStatus('invalid');
        return;
      }
      try {
        const queryParams = new URLSearchParams();
        queryParams.append('orderId', formData.orderId);
        if (formData.name) queryParams.append('name', formData.name);
        if (formData.email) queryParams.append('email', formData.email);

        const res = await fetch(`${API_URL}/orders/check-validity?${queryParams.toString()}`);
        const data = await res.json();
        
        if (data.success && data.valid) {
          setOrderIdStatus('valid');
        } else {
          setOrderIdStatus('invalid');
        }
      } catch (err) {
        setOrderIdStatus('invalid');
      }
    };

    const debounceTimer = setTimeout(() => {
      if (formData.orderId) {
        checkOrder();
      }
    }, 250);

    return () => clearTimeout(debounceTimer);
  }, [formData.orderId, formData.name, formData.email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error('Only JPG, PNG, and PDF formats are allowed for invoices.');
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB.');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleMediaChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska', 'video/webm'];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error('Only Image or Video formats are allowed.');
        return;
      }
      if (selectedFile.size > 100 * 1024 * 1024) {
        toast.error('Media file size must be less than 100MB.');
        return;
      }
      setIssueMedia(selectedFile);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.orderId) {
        toast.error('Please fill all fields in this step.');
        return;
      }
      if (orderIdStatus !== 'valid') {
        toast.error('Please ensure your Name, Email, and Order ID match our records.');
        return;
      }
    } else if (step === 2) {
      if (!formData.issue) {
        toast.error('Please describe your issue.');
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error('Please upload your invoice.');
      return;
    }

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('orderId', formData.orderId);
    submitData.append('issue', formData.issue);
    submitData.append('invoice', file);
    if (issueMedia) {
      submitData.append('issueMedia', issueMedia);
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/orders/refund-request`, {
        method: 'POST',
        body: submitData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setShowSuccess(true);
        setStep(1);
        setFormData({ name: '', email: '', orderId: '', issue: '' });
        setFile(null);
        setIssueMedia(null);
      } else {
        toast.error(data.error || 'Failed to initiate refund. Please check your details.');
      }
    } catch (error) {
      console.error('Refund Error:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((num) => (
        <React.Fragment key={num}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= num ? 'bg-blue-700 text-white shadow-md' : 'bg-gray-100 text-gray-400'}`}>
            {num}
          </div>
          {num < 3 && (
            <div className={`w-12 h-1 transition-colors ${step > num ? 'bg-blue-700' : 'bg-gray-100'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] font-inter pt-32 pb-20">
      <Helmet>
        <title>Refund Order | GREE INDIA</title>
        <meta name="description" content="Initiate a refund for your recent GREE INDIA order." />
      </Helmet>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-700 font-bold tracking-widest uppercase text-xs mb-3 block">
            Customer Support
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">
            Refund <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">Order</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Need a refund? We guarantee a hassle-free experience. 
            Simply provide your order details, describe the issue, and upload your invoice to initiate the process.
          </p>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100"
        >
          {renderStepIndicator()}

          {/* Policy Alert box */}
          <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl border border-blue-100 mb-8">
            <AlertCircle className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-blue-900 mb-1">Refund Policy</h4>
              <p className="text-xs text-blue-700/80 leading-relaxed">
                Ensure the email matches the one used during checkout. Our support team will review your request.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Order ID</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="orderId"
                        value={formData.orderId}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-50 border text-gray-900 rounded-xl px-4 py-3 outline-none focus:ring-4 transition-all pr-12 ${
                          orderIdStatus === 'valid' ? 'border-green-500 focus:ring-green-500/10' :
                          orderIdStatus === 'invalid' ? 'border-red-500 focus:ring-red-500/10' :
                          'border-gray-200 focus:border-blue-500 focus:ring-blue-500/10'
                        }`}
                        placeholder="Paste your Order ID"
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        {orderIdStatus === 'loading' && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
                        {orderIdStatus === 'valid' && <CheckCircle className="w-5 h-5 text-green-500" />}
                        {orderIdStatus === 'invalid' && <AlertCircle className="w-5 h-5 text-red-500" />}
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button type="button" onClick={handleNext} className="bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl px-8 py-3.5 flex items-center gap-2 transition-all shadow-[0_10px_20px_rgba(29,78,216,0.2)] hover:shadow-[0_15px_30px_rgba(29,78,216,0.3)] hover:-translate-y-0.5 active:scale-95">
                      Next Step <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Issue Description</label>
                    <textarea
                      name="issue"
                      value={formData.issue}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all min-h-[120px] resize-y"
                      placeholder="Please describe the issue with your order..."
                    ></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                      <Video className="w-4 h-4 text-blue-600" /> Upload Product Image / Video (Optional)
                    </label>
                    <div className="mt-1 relative rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 bg-gray-50 hover:bg-blue-50/50 transition-colors group cursor-pointer">
                      <input
                        type="file"
                        onChange={handleMediaChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        accept="image/*,video/*"
                      />
                      <div className="p-6 text-center">
                        {issueMedia ? (
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                              <ImageIcon className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900 line-clamp-1 px-4">{issueMedia.name}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {(issueMedia.size / 1024 / 1024).toFixed(2)} MB • Click to replace
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 group-hover:text-blue-500 group-hover:scale-110 transition-all">
                              <Upload className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">Click to upload media</p>
                              <p className="text-xs text-gray-500 mt-1">Images or Videos (max. 100MB)</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 flex justify-between">
                    <button type="button" onClick={handlePrev} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl px-6 py-3.5 flex items-center gap-2 transition-colors">
                      <ChevronLeft className="w-5 h-5" /> Back
                    </button>
                    <button type="button" onClick={handleNext} className="bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl px-8 py-3.5 flex items-center gap-2 transition-all shadow-[0_10px_20px_rgba(29,78,216,0.2)] hover:shadow-[0_15px_30px_rgba(29,78,216,0.3)] hover:-translate-y-0.5 active:scale-95">
                      Next Step <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Upload Order Invoice</label>
                    <div className="mt-1 relative rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 bg-gray-50 hover:bg-blue-50/50 transition-colors group cursor-pointer">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        accept=".jpg,.jpeg,.png,.pdf"
                      />
                      <div className="p-8 text-center">
                        {file ? (
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                              <FileText className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900 px-4 line-clamp-1">{file.name}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {(file.size / 1024 / 1024).toFixed(2)} MB • Click to replace
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 group-hover:text-blue-500 group-hover:scale-110 transition-all">
                              <Upload className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">Click to upload invoice</p>
                              <p className="text-xs text-gray-500 mt-1">PDF, JPG or PNG (max. 5MB)</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 flex justify-between">
                    <button type="button" onClick={handlePrev} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl px-6 py-3.5 flex items-center gap-2 transition-colors">
                      <ChevronLeft className="w-5 h-5" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl px-8 py-3.5 flex items-center justify-center gap-2 transition-all shadow-[0_10px_20px_rgba(22,163,74,0.2)] hover:shadow-[0_15px_30px_rgba(22,163,74,0.3)] hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Submit Request <CheckCircle className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
              onClick={() => setShowSuccess(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white rounded-3xl p-8 md:p-10 max-w-md w-full shadow-2xl pointer-events-auto relative text-center"
              >
                <button 
                  onClick={() => setShowSuccess(false)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 mb-3">
                  Refund Process Initiated!
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  Your request has been successfully registered. We have sent a confirmation email to your provided address regarding the next steps. Our support team will contact you shortly.
                </p>

                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all active:scale-95"
                >
                  Close & Continue
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RefundOrder;
