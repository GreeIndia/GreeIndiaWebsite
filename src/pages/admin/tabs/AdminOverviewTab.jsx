import React from 'react';
import { ChartNoAxesCombined } from 'lucide-react';

const AdminOverviewTab = ({ products, orders, variants }) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-600/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 relative z-10">Active Infrastructure</h3>
                    <span className="text-4xl font-black text-gray-900 relative z-10">{products.length}</span>
                    <p className="text-emerald-500 text-xs font-bold mt-4 flex items-center gap-1 relative z-10">Assets Deployed</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 relative z-10">Global Inventory Value</h3>
                    <span className="text-4xl font-black text-gray-900 relative z-10">
                        ₹{(products.reduce((acc, p) => acc + (p.quantity * (p.mrp || 45000)), 0) / 100000).toFixed(2)}M
                    </span>
                    <p className="text-blue-500 text-xs font-bold mt-4 flex items-center gap-1 relative z-10">Capital Tied Up</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 relative z-10">Total Order Volume</h3>
                    <span className="text-4xl font-black text-gray-900 relative z-10">{orders.length}</span>
                    <p className="text-amber-500 text-xs font-bold mt-4 flex items-center gap-1 relative z-10">Registered Bookings</p>
                </div>

                <div className="bg-[#0B1120] text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500"><ChartNoAxesCombined size={120} /></div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 relative z-10">Variant Topology</h3>
                    <span className="text-4xl font-black text-white relative z-10">{variants.length}</span>
                    <p className="text-blue-500 text-xs font-bold mt-4 flex items-center gap-1 relative z-10">Active Designations</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
                <h3 className="text-lg font-black text-gray-900 tracking-tight mb-6">Recent System Activity</h3>
                <div className="space-y-4">
                    {orders.slice(0, 3).map((order, idx) => (
                        <div key={order._id || idx} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                                {order.firstName ? order.firstName.charAt(0) : 'O'}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900 text-sm">New Order #{order.orderId || order._id.toString().substring(0,6).toUpperCase()}</h4>
                                <p className="text-xs font-medium text-gray-500">Placed by {order.firstName} {order.lastName}</p>
                            </div>
                            <div className="text-right">
                                <span className="block font-black text-gray-900 text-sm">₹{order.totalAmount?.toLocaleString()}</span>
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${order.paymentStatus === 'Completed' ? 'text-emerald-500' : 'text-amber-500'}`}>{order.paymentStatus === 'Completed' ? 'Paid' : order.paymentStatus}</span>
                            </div>
                        </div>
                    ))}
                    {orders.length === 0 && (
                        <p className="text-center text-sm font-bold text-gray-400 py-10">No recent activity detected.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminOverviewTab;
