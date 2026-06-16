import React from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

const AdminProductModal = ({ 
    modalConfig, setModalConfig, formStep, setFormStep, newProduct, setNewProduct, 
    variants, handleModalSubmit, handleProductImageUpload, handleRemoveProductImage, 
    uploadingImage, handleAddReview, handleRemoveReview, handleUpdateReview 
}) => {
    if (!modalConfig.isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-[#0B1120]/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-[fadeIn_0.3s_ease-out]">
                <div className="p-6 border-b border-gray-100 flex justify-between items-start md:items-center bg-gray-50/50 flex-shrink-0">
                    <h3 className="text-lg md:text-xl font-black text-gray-900 flex flex-wrap items-center gap-2 md:gap-3">
                        {modalConfig.mode === 'add' ? 'Deploy Component' : 'Update Asset Data'}
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest mt-1 md:mt-0">Step {formStep} of 3</span>
                    </h3>
                    <button type="button" onClick={() => { setModalConfig({ isOpen: false, mode: 'add', data: null }); setFormStep(1); }} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-900 transition-colors flex-shrink-0"><X size={16} /></button>
                </div>
                
                <form onSubmit={handleModalSubmit} className="p-6 md:p-8 space-y-6 overflow-y-auto">
                    {formStep === 1 && (
                        <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Asset Name / Capacity</label>
                                    <input required type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 font-bold text-gray-900" placeholder="e.g. 1.6 Ton AC" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Model ID</label>
                                    <input type="text" value={newProduct.modelId} onChange={e => setNewProduct({...newProduct, modelId: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 font-mono font-bold text-blue-800" placeholder="e.g. GWC18AGB-K6DNA1A" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Variant</label>
                                    <div className="relative">
                                        <select required value={newProduct.variant} onChange={e => setNewProduct({...newProduct, variant: e.target.value})} className="w-full appearance-none bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 font-bold text-gray-800 shadow-sm transition-all hover:bg-white hover:border-gray-300 cursor-pointer pr-10">
                                            {variants.length > 0 ? (
                                                variants.map(v => <option key={v._id} value={v.name} className="font-medium text-gray-900 py-2">{v.name}</option>)
                                            ) : (
                                                <option value="Fixed Speed Range">Fixed Speed Range (Default)</option>
                                            )}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                                            <svg className="h-4 w-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target Segment</label>
                                    <input required type="text" value={newProduct.segment} onChange={e => setNewProduct({...newProduct, segment: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 font-medium" placeholder="e.g. Residential AC" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product Images (Max 5)</label>
                                    <span className="text-[10px] font-bold text-gray-400">{newProduct.images?.length || 0}/5 uploaded</span>
                                </div>
                                
                                {newProduct.images?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {newProduct.images.map((url, idx) => (
                                            <div key={idx} className="relative group">
                                                <img src={url} alt={`Product ${idx+1}`} className="h-16 w-16 object-cover rounded-xl border border-gray-200 shadow-sm" />
                                                {idx === 0 && (
                                                    <span className="absolute -top-1 -left-1 bg-blue-700 text-white text-[8px] font-black rounded-full px-1.5 py-0.5 uppercase tracking-wider">Main</span>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveProductImage(idx)}
                                                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                                                >
                                                    <X size={10} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center gap-3">
                                    <label className={`flex-1 flex items-center justify-center gap-2 border-2 border-dashed rounded-xl px-4 py-3 text-sm font-bold transition-colors cursor-pointer ${(newProduct.images?.length >= 5 || uploadingImage) ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-blue-200 text-blue-700 hover:border-blue-500 hover:bg-blue-50'}`}>
                                        {uploadingImage ? (
                                            <><span className="animate-spin border-2 border-blue-300 border-t-blue-700 rounded-full w-4 h-4"></span> Uploading...</>
                                        ) : (
                                            <><Plus size={16} /> Add Images {newProduct.images?.length >= 5 ? '(Max reached)' : `(${5 - (newProduct.images?.length || 0)} left)`}</>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            disabled={newProduct.images?.length >= 5 || uploadingImage}
                                            onChange={handleProductImageUpload}
                                        />
                                    </label>
                                </div>
                                <p className="text-[10px] text-gray-400">First image will be the main/thumbnail. Drag to reorder not supported yet.</p>
                            </div>

                            <button type="button" onClick={() => setFormStep(2)} className="w-full bg-[#0B1120] text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors uppercase tracking-widest text-xs shadow-lg mt-2">
                                Next Step
                            </button>
                        </div>
                    )}

                    {formStep === 2 && (
                        <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Capacity (Tonnage)</label>
                                    <input required type="number" step="0.1" value={newProduct.capacity} onChange={e => setNewProduct({...newProduct, capacity: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 font-medium" placeholder="e.g. 1.6" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cooling Capacity (Watts)</label>
                                    <input type="number" value={newProduct.cooling_capacity} onChange={e => setNewProduct({...newProduct, cooling_capacity: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 font-medium" placeholder="e.g. 5200" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Star Rating</label>
                                    <input required type="number" max="5" min="1" value={newProduct.star} onChange={e => setNewProduct({...newProduct, star: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 font-medium" placeholder="e.g. 5" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Refrigerant</label>
                                    <input type="text" value={newProduct.refrigerent} onChange={e => setNewProduct({...newProduct, refrigerent: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 font-medium" placeholder="e.g. R32" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">MRP (Base Price)</label>
                                    <input required type="number" value={newProduct.mrp} onChange={e => setNewProduct({...newProduct, mrp: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 font-medium" placeholder="e.g. 45000" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Discount (%)</label>
                                    <input type="number" min="0" max="100" value={newProduct.discount} onChange={e => setNewProduct({...newProduct, discount: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 font-medium" placeholder="e.g. 55" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stock Quantity</label>
                                    <input required type="number" value={newProduct.quantity} onChange={e => setNewProduct({...newProduct, quantity: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 font-medium" placeholder="e.g. 10" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Technical Specifications (Desc)</label>
                                <textarea required rows="3" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 resize-none font-medium"></textarea>
                            </div>

                            <div className="flex gap-4 mt-2">
                                <button type="button" onClick={() => setFormStep(1)} className="w-1/3 bg-gray-100 text-gray-500 font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors uppercase tracking-widest text-xs">
                                    Back
                                </button>
                                <button type="button" onClick={() => setFormStep(3)} className="w-2/3 bg-[#0B1120] text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors uppercase tracking-widest text-xs shadow-lg">
                                    Next Step
                                </button>
                            </div>
                        </div>
                    )}

                    {formStep === 3 && (
                        <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dummy Reviews (Optional)</label>
                                <button type="button" onClick={handleAddReview} className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors">
                                    <Plus size={14} /> Add Review
                                </button>
                            </div>
                            
                            <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                                {newProduct.ratings?.reviews?.map((review, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative">
                                        <button type="button" onClick={() => handleRemoveReview(index)} className="absolute top-3 right-3 text-red-500 hover:text-red-700 bg-white rounded-full p-1 shadow-sm">
                                            <Trash2 size={14} />
                                        </button>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Reviewer Name</label>
                                                <input type="text" value={review.reviewer} onChange={(e) => handleUpdateReview(index, 'reviewer', e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-600" placeholder="e.g. Rahul Sharma" required />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Star Rating</label>
                                                <input type="number" min="1" max="5" step="1" value={review.rating} onChange={(e) => handleUpdateReview(index, 'rating', Number(e.target.value))} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-600" required />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Date</label>
                                                <input type="date" value={review.date ? new Date(review.date).toISOString().split('T')[0] : ''} onChange={(e) => handleUpdateReview(index, 'date', e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-600" required />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Comment</label>
                                            <textarea value={review.comment} onChange={(e) => handleUpdateReview(index, 'comment', e.target.value)} rows="2" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-600 resize-none" placeholder="Great product!" required></textarea>
                                        </div>
                                    </div>
                                ))}
                                
                                {(!newProduct.ratings?.reviews || newProduct.ratings.reviews.length === 0) && (
                                    <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-xl">
                                        <p className="text-sm font-medium text-gray-400">No dummy reviews added yet.</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4 mt-2">
                                <button type="button" onClick={() => setFormStep(2)} className="w-1/3 bg-gray-100 text-gray-500 font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors uppercase tracking-widest text-xs">
                                    Back
                                </button>
                                <button disabled={uploadingImage} type="submit" className={`w-2/3 text-white font-bold py-4 rounded-xl transition-colors uppercase tracking-widest text-xs shadow-lg ${uploadingImage ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0B1120] hover:bg-gray-800'}`}>
                                    {modalConfig.mode === 'add' ? 'Initiate Deployment' : 'Save Modifications'}
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AdminProductModal;
