import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL, apiFetch } from '../../config/api';
import { ArrowLeft, Package, Activity, Zap, Wind, Banknote } from "lucide-react";
import toast from 'react-hot-toast';

const AdminProductView = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await apiFetch(`${API_URL}/products/${productId}`);
                const json = await res.json();
                if (json.success) {
                    setProduct(json.data);
                } else {
                    toast.error("Failed to fetch product details.");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <span className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                    <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">Extracting Asset Data...</span>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Asset not found or connection lost.</p>
            </div>
        );
    }

    const nameDisplay = product.name || (product.capacity ? `${product.capacity} Ton AC` : "Unnamed Asset");

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-inter text-gray-900">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 px-10 py-6 sticky top-0 z-50 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <button 
                        onClick={() => navigate('/admin')}
                        className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-700 rounded-xl transition-colors border border-gray-100"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black tracking-tight">{nameDisplay}</h1>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Asset ID: {product._id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border ${product.quantity > 0 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-500 border-red-100'}`}>
                        {product.quantity > 0 ? 'In Stock' : 'Depleted'}
                    </span>
                    <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold uppercase tracking-widest">
                        {product.variant || 'Standard Configuration'}
                    </span>
                </div>
            </header>

            <main className="p-10 lg:p-14 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column: Visuals & Core Specs */}
                <div className="lg:col-span-5 space-y-10">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-[2rem] h-[500px] flex items-center justify-center p-12 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <img 
                            src={product.image || `https://placehold.co/800x600/f3f4f6/4c1d95?text=Asset+Image`} 
                            alt={nameDisplay} 
                            className="object-contain h-full w-full mix-blend-multiply drop-shadow-2xl transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 shadow-sm border border-white/50">
                                {product.segment || 'General Segment'}
                            </span>
                            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-700 shadow-sm border border-white/50">
                                {product.catalogSegment || 'Residential'}
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-bold text-gray-900 tracking-tight mb-4 flex items-center gap-2"><Banknote size={16} className="text-blue-600" /> Financials</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Base MRP</span>
                                <span className="text-2xl font-black text-gray-900">₹{product.mrp ? Math.round(product.mrp * 1.30).toLocaleString() : 'TBD'}</span>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Available Stock</span>
                                <span className={`text-2xl font-black ${product.quantity > 0 ? 'text-emerald-500' : 'text-red-500'}`}>{product.quantity || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Deep Technical Data */}
                <div className="lg:col-span-7 space-y-10">
                    <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-black tracking-tight mb-2">Technical Description</h2>
                        <p className="text-gray-500 font-medium leading-relaxed">
                            {product.description || "No extensive technical overview provided for this asset."}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                            <Zap size={24} className="text-blue-500 mb-4 relative z-10" />
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 relative z-10">Cooling Capacity</h3>
                            <span className="text-3xl font-black text-gray-900 relative z-10">{product.cooling_capacity || 'N/A'} <span className="text-sm text-gray-400">Watts</span></span>
                        </div>
                        
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                            <Activity size={24} className="text-amber-500 mb-4 relative z-10" />
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 relative z-10">Energy Rating</h3>
                            <span className="text-3xl font-black text-gray-900 relative z-10">{product.star || '?'} <span className="text-sm text-gray-400">Stars</span></span>
                        </div>
                        
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                            <Wind size={24} className="text-emerald-500 mb-4 relative z-10" />
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 relative z-10">Refrigerant</h3>
                            <span className="text-3xl font-black text-gray-900 relative z-10">{product.refrigerent || 'N/A'}</span>
                        </div>

                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                            <Package size={24} className="text-blue-600 mb-4 relative z-10" />
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 relative z-10">Tonnage</h3>
                            <span className="text-3xl font-black text-gray-900 relative z-10">{product.capacity || 'N/A'} <span className="text-sm text-gray-400">Ton</span></span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminProductView;
