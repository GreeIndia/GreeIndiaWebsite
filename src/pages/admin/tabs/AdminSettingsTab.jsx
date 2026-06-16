import React from 'react';
import { Settings, Eye, EyeOff } from 'lucide-react';

const AdminSettingsTab = ({ settingsForm, setSettingsForm, showNewPassword, setShowNewPassword, showCurrentPassword, setShowCurrentPassword, handleSettingsSubmit, loading }) => {
    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-6 h-1 bg-blue-700 rounded-full inline-block"></span>
                Update Credentials
            </h2>
            <form onSubmit={handleSettingsSubmit} className="space-y-6">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">New Email Address (Optional)</label>
                    <input 
                        type="email" 
                        value={settingsForm.email}
                        onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                        placeholder="Enter new email address"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">New Password (Optional)</label>
                    <div className="relative">
                        <input 
                            type={showNewPassword ? "text" : "password"} 
                            value={settingsForm.newPassword}
                            onChange={(e) => setSettingsForm({ ...settingsForm, newPassword: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                            placeholder="Enter new password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
                <hr className="border-gray-100" />
                <div>
                    <label className="block text-xs font-bold text-red-500 uppercase tracking-wider mb-2">Current Password (Required)</label>
                    <div className="relative">
                        <input 
                            type={showCurrentPassword ? "text" : "password"} 
                            required
                            value={settingsForm.currentPassword}
                            onChange={(e) => setSettingsForm({ ...settingsForm, currentPassword: e.target.value })}
                            className="w-full bg-red-50 border border-red-200 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/50"
                            placeholder="Enter current password to verify"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-600 focus:outline-none"
                        >
                            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl font-bold uppercase text-sm tracking-widest transition-all shadow-md disabled:opacity-70 flex justify-center items-center gap-2"
                >
                    {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <><Settings size={18} /> Update Settings</>}
                </button>
            </form>
        </div>
    );
};

export default AdminSettingsTab;
