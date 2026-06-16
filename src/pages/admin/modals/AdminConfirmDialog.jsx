import React from 'react';
import { Trash2 } from 'lucide-react';

const AdminConfirmDialog = ({ confirmDialog, setConfirmDialog }) => {
    if (!confirmDialog.isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative animate-fadeInScale flex flex-col text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Trash2 size={30} className="text-red-500" />
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-2">Confirm Action</h2>
                <p className="text-sm font-medium text-gray-500 mb-8">{confirmDialog.message}</p>
                <div className="flex gap-3 w-full">
                    <button 
                        onClick={() => setConfirmDialog({ isOpen: false, message: '', onConfirm: null })}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={confirmDialog.onConfirm}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminConfirmDialog;
