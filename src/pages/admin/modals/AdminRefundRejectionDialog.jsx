import React from 'react';
import { AlertCircle } from 'lucide-react';

const AdminRefundRejectionDialog = ({ refundRejectionDialog, setRefundRejectionDialog, submitRefundRejection }) => {
    if (!refundRejectionDialog.isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-fadeInScale flex flex-col text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <AlertCircle size={30} className="text-red-500" />
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-2">Reject Refund Request</h2>
                <p className="text-sm font-medium text-gray-500 mb-6">Please provide a reason for rejecting this refund. This will be emailed to the customer.</p>
                <textarea
                    value={refundRejectionDialog.reason}
                    onChange={(e) => setRefundRejectionDialog(prev => ({ ...prev, reason: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none resize-none h-24 mb-6"
                    placeholder="e.g. Invoice does not match the product purchased."
                />
                <div className="flex gap-3 w-full">
                    <button 
                        onClick={() => setRefundRejectionDialog({ isOpen: false, orderId: null, reason: '' })}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={submitRefundRejection}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors"
                    >
                        Reject & Email
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminRefundRejectionDialog;
