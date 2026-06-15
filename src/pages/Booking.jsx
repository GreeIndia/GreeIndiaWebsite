import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { API_URL, apiFetch } from '../config/api';
import { ShieldCheck, CreditCard, ChevronLeft, MapPin, User, Building2 } from "lucide-react";
import toast from 'react-hot-toast';
import { INDIAN_STATES } from '../utils/states';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    building: "",
    street: "",
    city: "",
    state: "",
  });
  const [loading, setLoading] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4 font-inter">
        <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">No Infrastructure Selected</h1>
        <p className="text-gray-500 mb-8 max-w-md font-medium">Please return to the catalog to assign hardware for deployment.</p>
        <Link to="/" className="bg-blue-700 text-white px-8 py-3 rounded-full font-bold tracking-widest uppercase hover:bg-blue-800 transition-all shadow-lg">
          Browse Catalog
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bookingPayload = {
      productName: product.name,
      productCategory: product.category,
      productPrice: product.price || "TBD",
      ...formData
    };

    try {
      const response = await apiFetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload)
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Deployment initialized successfully for ${product.name}! Gateway communication complete.`);
        navigate("/");
      } else {
        toast.error("Transaction Failed: " + data.error);
      }
    } catch (error) {
      console.error("API Error", error);
      toast.error("Critical gateway failure. Ensure backend servers are nominal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-inter relative flex justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f8f9fa] via-[#f3f0ff] to-[#eef2ff] overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-300/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="w-full max-w-4xl relative z-10 flex flex-col pt-8">
        
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-800 font-bold tracking-widest uppercase text-xs transition-colors mb-8 self-start bg-white/50 px-4 py-2 rounded-full border border-gray-200 backdrop-blur-sm"
        >
          <ChevronLeft size={16} /> Cancel & Return
        </button>

        {/* The Glass Monolith Wrapper */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_60px_rgba(29,78,216,0.05)] border border-white p-6 md:p-12">
          
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Secure Deployment</h1>
            <p className="text-gray-500 font-medium mt-3">Finalize your hardware acquisition securely.</p>
          </div>

          {/* Horizontal Product Strip */}
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 pr-6 rounded-2xl shadow-sm border border-gray-100 mb-10 w-full transform transition-all hover:shadow-md">
            <div className="w-full sm:w-32 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <span className="text-[10px] font-black tracking-widest uppercase text-blue-700 bg-blue-50 px-2 py-1 rounded inline-block mb-1">{product.category}</span>
              <h2 className="text-xl font-black text-gray-900">{product.name}</h2>
            </div>

            <div className="text-center sm:text-right border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto mt-4 sm:mt-0">
              <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Total Valuation</p>
              <p className="text-2xl font-black text-gray-900">{product.price || "TBD"}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* Form Section 1 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 relative">
              <div className="absolute -top-4 left-6 bg-blue-700 text-white w-8 h-8 rounded-xl flex items-center justify-center shadow-lg">
                <User size={16} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-6 pl-10 border-b border-gray-50 pb-4">
                Director Profile
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 relative">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Legal Full Name</label>
                  <input required type="text" name="fullName" onChange={handleChange} className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-gray-900" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-2 relative">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Corporate Email</label>
                  <input required type="email" name="email" onChange={handleChange} className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-gray-900" placeholder="director@company.com" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2 relative">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Mobile Contact</label>
                  <input required type="tel" name="mobile" onChange={handleChange} className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-gray-900" placeholder="+91 98765 43210" />
                </div>
              </div>
            </div>

            {/* Form Section 2 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 relative">
              <div className="absolute -top-4 left-6 bg-blue-700 text-white w-8 h-8 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 size={16} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-6 pl-10 border-b border-gray-50 pb-4">
                Installation Destination
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 md:col-span-2 relative">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Building & Suite</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input required type="text" name="building" onChange={handleChange} className="w-full bg-gray-50/50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-gray-900" placeholder="Tower B, Executive Block" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Street Coordinates</label>
                  <input required type="text" name="street" onChange={handleChange} className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-gray-900" placeholder="Cyber Hub Main Avenue" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">City</label>
                  <input required type="text" name="city" onChange={handleChange} className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-gray-900" placeholder="New Delhi" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">State / Region</label>
                  <select required name="state" onChange={handleChange} value={formData.state} className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-gray-900 appearance-none cursor-pointer">
                    <option value="">Select State / UT</option>
                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-[0_15px_40px_rgba(0,0,0,0.15)] transform hover:-translate-y-1 relative overflow-hidden group disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {loading ? (
                 <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                 </span>
              ) : (
                 <>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    <CreditCard size={20} />
                    Process Transaction
                 </>
              )}
            </button>
            
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 text-center flex justify-center items-center gap-1.5 focus:outline-none">
              <ShieldCheck size={14} className="text-green-500" /> End-to-End Encrypted Handshake Protocol
            </p>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Booking;
