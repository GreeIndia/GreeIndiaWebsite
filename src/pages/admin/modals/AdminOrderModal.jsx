import React from 'react';
import { X, AlertCircle, Eye } from 'lucide-react';

const AdminOrderModal = ({ orderModal, setOrderModal }) => {
    if (!orderModal.isOpen || !orderModal.data) return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[2rem] p-6 md:p-8 max-w-2xl w-full shadow-2xl relative animate-fadeInScale max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                    <h2 className="text-xl md:text-2xl font-black text-gray-900">Order #{orderModal.data._id.slice(-8).toUpperCase()}</h2>
                    <button onClick={() => setOrderModal({ isOpen: false, data: null })} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors flex-shrink-0"><X size={16} /></button>
                </div>
                
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Customer Details</h3>
                            <p className="font-bold text-gray-900">{orderModal.data.customerInfo.firstName} {orderModal.data.customerInfo.lastName}</p>
                            <p className="text-sm text-gray-600">{orderModal.data.customerInfo.email}</p>
                            <p className="text-sm text-gray-600">{orderModal.data.customerInfo.phone}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Shipping Address</h3>
                            <p className="text-sm text-gray-900">{orderModal.data.customerInfo.apartment}, {orderModal.data.customerInfo.landmark}</p>
                            <p className="text-sm text-gray-900">{orderModal.data.customerInfo.district}, {orderModal.data.customerInfo.city}</p>
                            <p className="text-sm text-gray-900">{orderModal.data.customerInfo.state} - {orderModal.data.customerInfo.pincode}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Order Items</h3>
                        <div className="space-y-3">
                            {orderModal.data.orderItems.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <div className="flex gap-3 items-center">
                                        <span className="font-black text-gray-900 bg-white px-2 py-1 rounded shadow-sm border border-gray-100">{item.quantity}x</span>
                                        <div>
                                            <p className="font-bold text-sm text-gray-900">{item.name}</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-blue-700">₹{(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {orderModal.data.returnIssue && (
                        <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                            <h3 className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <AlertCircle size={14} /> Refund / Return Requested
                            </h3>
                            <p className="text-sm text-gray-900 mb-3">{orderModal.data.returnIssue}</p>
                            {orderModal.data.returnIssueMedia ? (
                                <a 
                                    href={orderModal.data.returnIssueMedia} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors"
                                >
                                    <Eye size={14} /> View Attached Media
                                </a>
                            ) : (
                                <span className="text-xs font-bold text-gray-500">No Image/Video uploaded</span>
                            )}
                        </div>
                    )}

                    <div className="bg-[#0B1120] text-white p-5 rounded-2xl space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-white/10">
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Payment Breakdown</p>
                                <p className="text-sm font-medium">Subtotal</p>
                                <p className="text-sm font-medium">Shipping</p>
                                <p className="text-sm font-medium">GST (18%)</p>
                            </div>
                            <div className="text-right mt-4">
                                <p className="text-sm font-bold">₹{orderModal.data.subtotal?.toLocaleString() || 'N/A'}</p>
                                <p className="text-sm font-bold">₹{orderModal.data.shippingFee?.toLocaleString() || 'N/A'}</p>
                                <p className="text-sm font-bold">₹{orderModal.data.gstAmount?.toLocaleString() || 'N/A'}</p>
                            </div>
                        </div>
                        
                        {orderModal.data.customerInfo?.gstNumber && (
                            <div className="bg-blue-950/30 p-3 rounded-lg border border-blue-600/20 flex justify-between items-center">
                                <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">Customer GSTIN</span>
                                <span className="text-sm font-mono font-bold text-white">{orderModal.data.customerInfo.gstNumber}</span>
                            </div>
                        )}

                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Final Amount</p>
                                <p className="text-2xl font-black text-emerald-400">₹{orderModal.data.totalAmount.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Gateway</p>
                                <span className="bg-white/10 px-2 py-1 rounded text-xs font-bold">{orderModal.data.paymentMethod}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderModal;
