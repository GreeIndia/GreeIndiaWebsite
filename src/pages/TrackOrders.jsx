import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Package, Truck, CheckCircle, PackageOpen, XCircle, Search, Clock, Download } from "lucide-react";
import { API_URL, apiFetch } from "../config/api";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const TrackOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [manualOrderId, setManualOrderId] = useState("");
    const [searchError, setSearchError] = useState("");

    const fetchOrders = async (orderIds) => {
        try {
            setLoading(true);
            const res = await apiFetch(`${API_URL}/orders/track`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderIds })
            });
            const json = await res.json();
            if (json.success) {
                setOrders(json.data);
                setSearchError("");
            } else {
                setSearchError("Failed to fetch orders.");
            }
        } catch (error) {
            console.error("Error fetching tracked orders:", error);
            setSearchError("Network error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem('gree_user_orders') || '[]');
        if (savedOrders.length > 0) {
            fetchOrders(savedOrders);
        } else {
            setLoading(false);
        }
    }, []);

    const handleManualTrack = (e) => {
        e.preventDefault();
        if (!manualOrderId.trim()) return;
        
        // Add to local storage
        const savedOrders = JSON.parse(localStorage.getItem('gree_user_orders') || '[]');
        if (!savedOrders.includes(manualOrderId.trim())) {
            savedOrders.push(manualOrderId.trim());
            localStorage.setItem('gree_user_orders', JSON.stringify(savedOrders));
        }
        
        // Refetch
        fetchOrders(savedOrders);
        setManualOrderId("");
    };

    const getStatusStep = (status) => {
        switch (status) {
            case 'Ordered': return 1;
            case 'Packed': return 2;
            case 'Shipped': return 3;
            case 'Delivered': return 4;
            case 'Cancelled': return -1;
            default: return 1;
        }
    };

    return (
        <Layout>
            <Helmet>
                <title>Track Order | GREE INDIA</title>
            </Helmet>
            <div className="pt-32 pb-20 px-6 md:px-12 bg-gray-50 min-h-screen font-inter">
                <div className="max-w-[800px] mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-10"
                    >
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4 flex items-center justify-center gap-3">
                            <Package className="text-blue-700" size={36} /> Track Your Orders
                        </h1>
                        <p className="text-gray-500 font-medium">View the real-time fulfillment status of your recent purchases.</p>
                    </motion.div>

                    <form onSubmit={handleManualTrack} className="mb-12 relative flex items-center max-w-lg mx-auto">
                        <Search className="absolute left-4 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            value={manualOrderId}
                            onChange={(e) => setManualOrderId(e.target.value)}
                            placeholder="Enter your Order ID (e.g., 60f1a...)" 
                            className="w-full pl-12 pr-32 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent font-mono text-sm font-bold text-gray-900"
                        />
                        <button type="submit" className="absolute right-2 top-2 bottom-2 bg-[#0B1120] text-white px-6 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors">
                            Track
                        </button>
                    </form>

                    {searchError && (
                        <div className="text-center text-red-500 font-bold mb-8 bg-red-50 py-3 rounded-lg border border-red-100">
                            {searchError}
                        </div>
                    )}

                    {loading ? (
                        <div className="flex flex-col justify-center items-center py-20 opacity-50">
                            <PackageOpen className="animate-bounce text-blue-300 mb-4" size={48} />
                            <p className="font-bold text-gray-400 uppercase tracking-widest">Locating Shipments...</p>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <PackageOpen size={32} className="text-gray-300" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-2">No Active Orders Found</h3>
                            <p className="text-gray-500 font-medium mb-8">You haven't placed any orders on this device recently.</p>
                            <Link to="/products" className="bg-blue-700 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-blue-800 transition-all hover:shadow-lg hover:shadow-blue-600/30">
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {orders.map(order => {
                                const step = getStatusStep(order.orderStatus || 'Ordered');
                                const isCancelled = step === -1;

                                return (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        key={order._id} 
                                        className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 relative overflow-hidden group"
                                    >
                                        {/* Status Ribbon */}
                                        <div className={`absolute top-0 right-0 px-6 py-1.5 rounded-bl-2xl font-bold uppercase tracking-widest text-[10px] ${
                                            isCancelled ? 'bg-red-500 text-white' : 
                                            step === 4 ? 'bg-emerald-500 text-white' : 
                                            'bg-blue-100 text-blue-800'
                                        }`}>
                                            {order.orderStatus || 'Ordered'}
                                        </div>

                                        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8 border-b border-gray-100 pb-6">
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                                                <p className="font-mono font-black text-lg text-gray-900">#{order._id.slice(-8).toUpperCase()}</p>
                                                <p className="text-xs text-gray-500 font-medium mt-1 flex items-center gap-1"><Clock size={12}/> Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <div className="md:text-right">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                                                <p className="font-black text-2xl text-emerald-600">₹{order.totalAmount?.toLocaleString()}</p>
                                                {!isCancelled && (
                                                    <a 
                                                        href={`${API_URL}/orders/${order._id}/invoice`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 bg-blue-50 text-blue-800 hover:bg-blue-100 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors"
                                                    >
                                                        <Download size={14} /> Invoice
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Dynamic Status Timeline */}
                                        <div className="mb-8 relative pt-4">
                                            {isCancelled ? (
                                                <div className="flex items-center justify-center gap-3 text-red-500 bg-red-50 p-4 rounded-2xl border border-red-100">
                                                    <XCircle size={24} />
                                                    <div>
                                                        <h4 className="font-black">Order Cancelled</h4>
                                                        <p className="text-xs font-medium text-red-400">This order has been terminated.</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="absolute top-8 left-6 right-6 h-1.5 bg-gray-100 rounded-full z-0 overflow-hidden">
                                                        <div 
                                                            className="h-full bg-blue-600 transition-all duration-1000 ease-out" 
                                                            style={{ width: `${((step - 1) / 3) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="flex justify-between relative z-10">
                                                        {/* Step 1: Ordered */}
                                                        <div className="flex flex-col items-center gap-3 w-16">
                                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${step >= 1 ? 'bg-blue-700 text-white shadow-lg shadow-blue-600/30' : 'bg-gray-100 text-gray-400 border-2 border-white'}`}>
                                                                <Package size={18} />
                                                            </div>
                                                            <span className={`text-[10px] font-bold uppercase tracking-widest text-center ${step >= 1 ? 'text-blue-950' : 'text-gray-400'}`}>Ordered</span>
                                                        </div>
                                                        
                                                        {/* Step 2: Packed */}
                                                        <div className="flex flex-col items-center gap-3 w-16">
                                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${step >= 2 ? 'bg-blue-700 text-white shadow-lg shadow-blue-600/30' : 'bg-gray-100 text-gray-400 border-2 border-white'}`}>
                                                                <PackageOpen size={18} />
                                                            </div>
                                                            <span className={`text-[10px] font-bold uppercase tracking-widest text-center ${step >= 2 ? 'text-blue-950' : 'text-gray-400'}`}>Packed</span>
                                                        </div>

                                                        {/* Step 3: Shipped */}
                                                        <div className="flex flex-col items-center gap-3 w-16">
                                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${step >= 3 ? 'bg-blue-700 text-white shadow-lg shadow-blue-600/30' : 'bg-gray-100 text-gray-400 border-2 border-white'}`}>
                                                                <Truck size={18} />
                                                            </div>
                                                            <span className={`text-[10px] font-bold uppercase tracking-widest text-center ${step >= 3 ? 'text-blue-950' : 'text-gray-400'}`}>Shipped</span>
                                                        </div>

                                                        {/* Step 4: Delivered */}
                                                        <div className="flex flex-col items-center gap-3 w-16">
                                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${step >= 4 ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-gray-100 text-gray-400 border-2 border-white'}`}>
                                                                <CheckCircle size={18} />
                                                            </div>
                                                            <span className={`text-[10px] font-bold uppercase tracking-widest text-center ${step >= 4 ? 'text-emerald-700' : 'text-gray-400'}`}>Delivered</span>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Items in Shipment</h4>
                                            <div className="space-y-3">
                                                {order.orderItems.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between items-center text-sm font-bold text-gray-900">
                                                        <div className="flex items-center gap-3">
                                                            <span className="bg-white border border-gray-200 w-6 h-6 flex items-center justify-center rounded text-xs text-blue-700 shadow-sm">{item.quantity}x</span>
                                                            <span>{item.name}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default TrackOrders;
