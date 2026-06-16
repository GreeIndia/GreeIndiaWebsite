import React from 'react';
import { Eye, CheckCircle, Trash2 } from 'lucide-react';

const AdminFeedbacksTab = ({ feedbacks, loading, setSupportModal, handleSupportStatusUpdate, handleSupportDelete }) => {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-lg font-black text-gray-900 tracking-tight">Online Feedbacks</h3>
            </div>
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[1000px] lg:min-w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-widest border-b border-gray-200">
                            <th className="p-5 pl-8 font-bold">Feedback ID</th>
                            <th className="p-5 font-bold">User Info</th>
                            <th className="p-5 font-bold">Product / Type</th>
                            <th className="p-5 font-bold">Status</th>
                            <th className="p-5 font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="p-10 text-center text-sm font-bold text-gray-400">Loading feedbacks...</td>
                            </tr>
                        ) : feedbacks.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-10 text-center text-sm font-bold text-gray-400">No active feedbacks.</td>
                            </tr>
                        ) : feedbacks.map(req => (
                            <tr key={req._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                <td className="p-4 pl-8 text-xs font-mono font-bold text-blue-600 bg-blue-50/50">
                                    #{req._id.substring(req._id.length - 8).toUpperCase()}
                                </td>
                                <td className="p-4">
                                    <p className="text-sm font-bold text-gray-900">{req.name}</p>
                                    <p className="text-xs font-medium text-gray-500 mt-0.5">{req.email}</p>
                                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{req.tel}</p>
                                </td>
                                <td className="p-4">
                                    <p className="text-sm font-bold text-gray-900">{req.product}</p>
                                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{req.type}</p>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest ${req.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : req.status === 'Reviewed' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => setSupportModal({ isOpen: true, type: 'feedback', data: req })} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="View Details"><Eye size={16} /></button>
                                        <button onClick={() => handleSupportStatusUpdate('feedback', req._id, 'Resolved')} className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" title="Mark Resolved"><CheckCircle size={16} /></button>
                                        <button onClick={() => handleSupportDelete('feedback', req._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 size={16} /></button>
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

export default AdminFeedbacksTab;
