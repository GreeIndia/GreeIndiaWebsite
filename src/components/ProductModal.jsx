import React, { useEffect, useState } from "react";
import { X, CalendarCheck, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductModal = ({ product, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [render, setRender] = useState(isOpen);

  // Handle animation delay (wait for slide out before unmounting)
  useEffect(() => {
    if (isOpen) setRender(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setRender(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!render || !product) return null;

  const handleBookNow = () => {
    onClose();
    setTimeout(() => {
      navigate("/booking", { state: { product } });
    }, 300); // Give drawer time to slide away nicely before route jump
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] font-inter flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      
      {/* Dimmed Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Centered Compact Modal Card */}
      <div 
        className={`relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col sm:flex-row transform transition-transform duration-300 ${isOpen ? "scale-100" : "scale-95 translate-y-4"} overflow-hidden max-h-[90vh]`}
      >
        
        {/* Floating Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors text-gray-600"
        >
          <X size={16} />
        </button>

        {/* Left: Compact Image Column */}
        <div className="w-full sm:w-2/5 md:w-1/2 h-48 sm:h-auto bg-gray-50 relative flex-shrink-0">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 left-4 z-20 bg-white shadow-sm px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full text-blue-800">
            {product.category}
          </span>
        </div>

        {/* Right: Scrollable Data Column */}
        <div className="w-full sm:w-3/5 md:w-1/2 flex flex-col hide-scrollbar overflow-y-auto">
          
          <div className="p-6 md:p-8 flex-grow">
            <h2 className="text-2xl font-black tracking-tight text-gray-900 mb-2">
              {product.name}
            </h2>
            
            {product.price && (
              <p className="text-lg font-black text-blue-700 mb-4">
                {product.price}
              </p>
            )}
            
            <p className="text-gray-600 text-sm leading-relaxed font-medium mb-6">
              {product.description || "Intelligent climate infrastructure engineered for maximum efficiency. Designed for robust, long-term deployment."}
            </p>

            {/* Micro Specifications */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-widest">Status</span>
                <span className="text-green-600 font-bold">In Stock</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-widest">Class</span>
                <span className="text-gray-900 font-bold">{product.category}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-widest">Warranty</span>
                <span className="text-gray-900 font-bold">Standard</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer Action */}
          <div className="p-6 md:p-8 pt-0 mt-auto">
            <button 
              onClick={handleBookNow}
              className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white py-3.5 rounded-xl font-bold uppercase text-sm tracking-widest transition-all shadow-md"
            >
              <CalendarCheck size={18} />
              Book Equipment
            </button>
            <p className="text-center text-[9px] uppercase tracking-widest font-bold text-gray-400 mt-3 flex items-center justify-center gap-1.5">
              <ShieldCheck size={12} className="text-blue-500" /> Secure Gateway
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductModal;
