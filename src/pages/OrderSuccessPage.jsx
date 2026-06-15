import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { CheckCircle, ShoppingBag, Home, Download } from 'lucide-react';
import { API_URL } from '../config/api';

const OrderSuccessPage = () => {
    const location = useLocation();
    const orderId = location.state?.orderId;

    // If accessed directly without an orderId, redirect home
    if (!orderId) {
        return <Navigate to="/" replace />;
    }

    return (
        <Layout>
            <div className="pt-32 pb-20 px-6 md:px-12 bg-gray-50 min-h-screen font-inter flex items-center justify-center">
                <div className="max-w-xl w-full bg-white rounded-3xl p-10 md:p-14 shadow-xl border border-gray-100 text-center relative overflow-hidden">
                    
                    {/* Decorative Background Blob */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                            <CheckCircle size={48} />
                        </div>
                        
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
                            Order Confirmed!
                        </h1>
                        
                        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                            Thank you for choosing GREE INDIA. Your order has been successfully placed and is currently being processed.
                        </p>
                        
                        <div className="bg-gray-50 rounded-2xl p-6 w-full mb-10 border border-gray-100">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Order Reference ID</p>
                            <p className="font-mono font-bold text-gray-900 text-lg">{orderId}</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 w-full mb-4">
                            <a 
                                href={`${API_URL}/orders/${orderId}/invoice`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex justify-center items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-md"
                            >
                                <Download size={18} /> Download Invoice
                            </a>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <Link 
                                to="/products"
                                className="flex-1 flex justify-center items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors"
                            >
                                <ShoppingBag size={18} /> Continue Shopping
                            </Link>
                            
                            <Link 
                                to="/"
                                className="flex-1 flex justify-center items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors"
                            >
                                <Home size={18} /> Return Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default OrderSuccessPage;
