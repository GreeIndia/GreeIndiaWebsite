import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const AdminSocialWallTab = ({ socialWallForm, setSocialWallForm, handleSocialWallSubmit, handleSocialWallImageUpload, loading }) => {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 md:p-8">
            <h3 className="text-lg font-black text-gray-900 tracking-tight mb-6">Social Wall Configurator</h3>
            <div className="space-y-8">
                {/* Instagram Config */}
                <form onSubmit={(e) => handleSocialWallSubmit(e, 'instagram')} className="bg-pink-50/50 p-4 md:p-6 rounded-2xl border border-pink-100">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <h4 className="font-bold text-pink-600 uppercase tracking-widest text-xs flex items-center gap-2">
                            <FaInstagram size={16} /> Instagram Featured Post
                        </h4>
                        <button type="submit" disabled={loading} className="w-full md:w-auto bg-pink-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-pink-700 transition-colors shadow-md text-center">
                            {loading ? 'Saving...' : 'Deploy Insta Post'}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2">Image URL (Upload or Paste Link)</label>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input type="text" value={socialWallForm.instagram.imageUrl} onChange={e => setSocialWallForm({...socialWallForm, instagram: {...socialWallForm.instagram, imageUrl: e.target.value}})} className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 md:py-2.5 text-sm outline-none focus:border-pink-500 w-full" required />
                                <label className="flex items-center justify-center bg-gray-900 text-white px-6 py-3 md:py-2.5 rounded-xl cursor-pointer hover:bg-black transition-colors text-xs font-bold uppercase tracking-widest whitespace-nowrap shadow-sm w-full sm:w-auto">
                                    Upload
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSocialWallImageUpload(e, 'instagram')} />
                                </label>
                            </div>
                            {socialWallForm.instagram.imageUrl && (
                                <div className="mt-2 w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                    <img src={socialWallForm.instagram.imageUrl} alt="Instagram preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2">Post Link URL</label>
                            <input type="text" value={socialWallForm.instagram.postUrl} onChange={e => setSocialWallForm({...socialWallForm, instagram: {...socialWallForm.instagram, postUrl: e.target.value}})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 md:py-2.5 text-sm outline-none focus:border-pink-500" required />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2">Likes Count</label>
                            <input type="text" value={socialWallForm.instagram.likes} onChange={e => setSocialWallForm({...socialWallForm, instagram: {...socialWallForm.instagram, likes: e.target.value}})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 md:py-2.5 text-sm outline-none focus:border-pink-500" required placeholder="e.g. 1,248 likes" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2">Date</label>
                            <input type="text" value={socialWallForm.instagram.date} onChange={e => setSocialWallForm({...socialWallForm, instagram: {...socialWallForm.instagram, date: e.target.value}})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 md:py-2.5 text-sm outline-none focus:border-pink-500" required placeholder="e.g. 2 DAYS AGO" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 mb-2">Caption</label>
                            <textarea rows="3" value={socialWallForm.instagram.caption} onChange={e => setSocialWallForm({...socialWallForm, instagram: {...socialWallForm.instagram, caption: e.target.value}})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 md:py-2.5 text-sm outline-none focus:border-pink-500" required></textarea>
                        </div>
                    </div>
                </form>

                {/* Facebook Config */}
                <form onSubmit={(e) => handleSocialWallSubmit(e, 'facebook')} className="bg-blue-50/50 p-4 md:p-6 rounded-2xl border border-blue-100">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <h4 className="font-bold text-blue-600 uppercase tracking-widest text-xs flex items-center gap-2">
                            <FaFacebookF size={16} /> Facebook Featured Post
                        </h4>
                        <button type="submit" disabled={loading} className="w-full md:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-md text-center">
                            {loading ? 'Saving...' : 'Deploy FB Post'}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2">Image URL (Upload or Paste Link)</label>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input type="text" value={socialWallForm.facebook.imageUrl} onChange={e => setSocialWallForm({...socialWallForm, facebook: {...socialWallForm.facebook, imageUrl: e.target.value}})} className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 md:py-2.5 text-sm outline-none focus:border-blue-500 w-full" required />
                                <label className="flex items-center justify-center bg-gray-900 text-white px-6 py-3 md:py-2.5 rounded-xl cursor-pointer hover:bg-black transition-colors text-xs font-bold uppercase tracking-widest whitespace-nowrap shadow-sm w-full sm:w-auto">
                                    Upload
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSocialWallImageUpload(e, 'facebook')} />
                                </label>
                            </div>
                            {socialWallForm.facebook.imageUrl && (
                                <div className="mt-2 w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                    <img src={socialWallForm.facebook.imageUrl} alt="Facebook preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2">Post Link URL</label>
                            <input type="text" value={socialWallForm.facebook.postUrl} onChange={e => setSocialWallForm({...socialWallForm, facebook: {...socialWallForm.facebook, postUrl: e.target.value}})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 md:py-2.5 text-sm outline-none focus:border-blue-500" required />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2">Likes Count</label>
                            <input type="text" value={socialWallForm.facebook.likes} onChange={e => setSocialWallForm({...socialWallForm, facebook: {...socialWallForm.facebook, likes: e.target.value}})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 md:py-2.5 text-sm outline-none focus:border-blue-500" required placeholder="e.g. 2.4K" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2">Date</label>
                            <input type="text" value={socialWallForm.facebook.date} onChange={e => setSocialWallForm({...socialWallForm, facebook: {...socialWallForm.facebook, date: e.target.value}})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 md:py-2.5 text-sm outline-none focus:border-blue-500" required placeholder="e.g. 4 hrs" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 mb-2">Caption</label>
                            <textarea rows="3" value={socialWallForm.facebook.caption} onChange={e => setSocialWallForm({...socialWallForm, facebook: {...socialWallForm.facebook, caption: e.target.value}})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 md:py-2.5 text-sm outline-none focus:border-blue-500" required></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminSocialWallTab;
