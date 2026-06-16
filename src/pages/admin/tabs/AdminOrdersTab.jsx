import React from 'react';
import { Eye, AlertCircle, Trash2 } from 'lucide-react';

const AdminOrdersTab = ({ activeTab, orders, loading, setOrderModal, handleUpdateOrderStatus, handleRefundOrder, handleDeleteOrder, API_URL }) => {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-lg font-black text-gray-900 tracking-tight">
                    {activeTab === "refunds" ? "Refund Requests" : "Global Order Terminal"}
                </h3>
            </div>
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[1000px] lg:min-w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-widest border-b border-gray-200">
                            <th className="p-5 pl-8 font-bold">Order ID</th>
                            <th className="p-5 font-bold">Customer</th>
                            <th className="p-5 font-bold">Items</th>
                            <th className="p-5 font-bold">Total</th>
                            <th className="p-5 font-bold">Payment</th>
                            <th className="p-5 font-bold">Status</th>
                            <th className="p-5 pr-8 text-right font-bold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="p-10 text-center text-sm font-bold text-gray-400">Loading terminal data...</td>
                            </tr>
                        ) : (activeTab === "refunds" ? orders.filter(o => o.returnIssue) : orders).length === 0 ? (
                            <tr>
                                <td colSpan="7" className="p-10 text-center text-sm font-bold text-gray-400">
                                    {activeTab === "refunds" ? "No active refund requests." : "No active orders."}
                                </td>
                            </tr>
                        ) : (activeTab === "refunds" ? orders.filter(o => o.returnIssue) : orders).map(order => (
                            <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                <td className="p-4 pl-8 text-xs font-mono font-bold text-blue-700 bg-blue-50/50">
                                    <div>#{order._id.substring(order._id.length - 8).toUpperCase()}</div>
                                    {order.returnIssue && (
                                        <div className="mt-2 text-[9px] bg-red-100 text-red-600 px-2 py-0.5 rounded uppercase tracking-widest inline-flex items-center gap-1 border border-red-200">
                                            <AlertCircle size={10} /> Refund Req.
                                        </div>
                                    )}
                                </td>
                                <td className="p-4">
                                    <p className="text-sm font-bold text-gray-900">{order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                                    <p className="text-xs font-medium text-gray-500 mt-0.5">{order.customerInfo.email}</p>
                                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{order.customerInfo.city}, {order.customerInfo.state}</p>
                                </td>
                                <td className="p-4">
                                    <ul className="text-xs font-medium text-gray-600 space-y-1.5">
                                        {order.orderItems.map((item, idx) => (
                                            <li key={idx} className="flex gap-2">
                                                <span className="font-bold text-gray-900 bg-gray-100 px-1.5 rounded">{item.quantity}x</span> 
                                                {item.name}
                                            </li>
                                        ))}
                                    </ul>
                                    {activeTab === "refunds" && (
                                        <div className="mt-3 flex flex-col gap-2">
                                            <a href={`${API_URL}/orders/${order._id}/invoice`} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 font-bold uppercase tracking-widest flex items-center gap-1 hover:text-blue-800 transition-colors">
                                                <Eye size={12} /> System Invoice
                                            </a>
                                            {order.returnInvoice && (
                                                <a href={order.returnInvoice.startsWith('http') ? order.returnInvoice : `${API_URL.replace('/api', '')}/${order.returnInvoice.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 font-bold uppercase tracking-widest flex items-center gap-1 hover:text-blue-800 transition-colors">
                                                    <Eye size={12} /> Customer Invoice
                                                </a>
                                            )}
                                            {order.returnIssueMedia && (
                                                <a href={order.returnIssueMedia.startsWith('http') ? order.returnIssueMedia : `${API_URL.replace('/api', '')}/${order.returnIssueMedia.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer" className="text-[10px] text-purple-600 font-bold uppercase tracking-widest flex items-center gap-1 hover:text-purple-800 transition-colors">
                                                    <Eye size={12} /> View Media
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </td>
                                <td className="p-4 text-sm font-black text-gray-900">₹{order.totalAmount.toLocaleString()}</td>
                                <td className="p-4">
                                    <div className="flex flex-col gap-2 items-start">
                                        <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest ${order.paymentMethod === 'Pay With Razor Pay' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                                            {order.paymentMethod === 'Pay With Razor Pay' ? 'Razorpay' : order.paymentMethod === 'Pay with UPI' ? 'UPI' : order.paymentMethod}
                                        </span>
                                        <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest ${order.paymentStatus === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : order.paymentStatus === 'Failed' ? 'bg-red-50 text-red-600 border border-red-100' : order.paymentStatus === 'Delivered' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                                            {order.paymentStatus || 'Pending'}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <select 
                                        value={order.orderStatus || 'Ordered'} 
                                        onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                                        className={`text-xs font-bold rounded-lg border outline-none px-2 py-1.5 cursor-pointer transition-colors ${
                                            order.orderStatus === 'Delivered' || order.orderStatus === 'Refund Accepted' || order.orderStatus === 'Refunded' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                            order.orderStatus === 'Cancelled' || order.orderStatus === 'Refund Rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                                            order.orderStatus === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                            order.orderStatus === 'Packed' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                            order.orderStatus === 'Refund Requested' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                            'bg-blue-50 text-blue-800 border-blue-200'
                                        }`}
                                    >
                                        {activeTab === "refunds" ? (
                                            <>
                                                <option value="Refund Requested">Refund Requested</option>
                                                <option value="Refund Accepted">Refund Accepted</option>
                                                <option value="Refund Rejected">Refund Rejected</option>
                                                <option value="Refunded">Refunded</option>
                                            </>
                                        ) : (
                                            <>
                                                <option value="Ordered">Ordered</option>
                                                <option value="Packed">Packed</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                                <option value="Refund Requested">Refund Requested</option>
                                            </>
                                        )}
                                    </select>
                                </td>
                                <td className="p-4 pr-8 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => setOrderModal({ isOpen: true, data: order })} className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors" title="View Details">
                                            <Eye size={14} />
                                        </button>
                                        {((order.paymentStatus === 'Completed' && order.paymentMethod === 'Razorpay') || order.paymentMethod === 'Online') && (
                                            <button onClick={() => handleRefundOrder(order._id)} className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 text-amber-500 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors" title="Refund Order">
                                                <span className="font-bold text-xs">₹</span>
                                            </button>
                                        )}
                                        <button onClick={() => handleDeleteOrder(order._id)} className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors" title="Delete Order">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrdersTab;
