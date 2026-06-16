import React from 'react';
import { X, Wrench, Package, Briefcase, Users, Eye } from 'lucide-react';

const AdminSupportModal = ({ supportModal, setSupportModal }) => {
    if (!supportModal.isOpen || !supportModal.data) return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[2rem] p-6 md:p-8 max-w-2xl w-full shadow-2xl relative animate-fadeInScale max-h-[90vh] overflow-y-auto flex flex-col">
                <div className="flex justify-between items-start md:items-center mb-6 pb-4 border-b border-gray-100 flex-shrink-0">
                    <h2 className="text-lg md:text-xl font-black text-gray-900 flex flex-wrap items-center gap-2">
                        {supportModal.type === 'service' && <><Wrench className="text-blue-600 w-5 h-5" /> Service Request</>}
                        {supportModal.type === 'installation' && <><Package className="text-emerald-500 w-5 h-5" /> Installation</>}
                        {supportModal.type === 'dealer' && <><Briefcase className="text-blue-600 w-5 h-5" /> Dealer App</>}
                        {supportModal.type === 'feedback' && <><Users className="text-blue-500 w-5 h-5" /> Feedback</>}
                        <span className="text-gray-400 font-mono text-xs md:text-sm ml-1 md:ml-2">#{supportModal.data._id.slice(-8).toUpperCase()}</span>
                    </h2>
                    <button onClick={() => setSupportModal({ isOpen: false, data: null, type: '' })} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors flex-shrink-0"><X size={16} /></button>
                </div>
                
                <div className="space-y-6 flex-1 overflow-y-auto pr-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                {supportModal.type === 'dealer' ? 'Business Details' : 'Customer Details'}
                            </h3>
                            <p className="font-bold text-gray-900">{supportModal.type === 'dealer' ? supportModal.data.businessName : supportModal.data.name}</p>
                            {supportModal.type === 'dealer' && <p className="text-sm text-gray-600">Contact: {supportModal.data.contactPerson}</p>}
                            <p className="text-sm text-gray-600">{supportModal.data.email || 'N/A'}</p>
                            <p className="text-sm text-gray-600">{supportModal.data.phone || supportModal.data.tel}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Location</h3>
                            {supportModal.type === 'feedback' ? (
                                <>
                                    <p className="text-sm text-gray-900">{supportModal.data.area}</p>
                                </>
                            ) : supportModal.type !== 'dealer' ? (
                                <>
                                    <p className="text-sm text-gray-900">{supportModal.data.landmark}</p>
                                    <p className="text-sm text-gray-900">{supportModal.data.district}, {supportModal.data.city}</p>
                                    <p className="text-sm text-gray-900">{supportModal.data.state} - {supportModal.data.pincode}</p>
                                </>
                            ) : (
                                <p className="text-sm text-gray-900">{supportModal.data.location}</p>
                            )}
                        </div>
                    </div>

                    {supportModal.type === 'service' && (
                        <>
                            <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                                <h3 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">Product Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Model</p>
                                        <p className="font-bold text-gray-900">{supportModal.data.productModel}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Serial Number</p>
                                        <p className="font-mono font-bold text-gray-900">{supportModal.data.serialNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Purchase Date</p>
                                        <p className="font-bold text-gray-900">{new Date(supportModal.data.purchaseDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Reported Issue</h3>
                                <p className="text-sm text-gray-800 leading-relaxed">{supportModal.data.issue}</p>
                            </div>
                            {supportModal.data.billCopy && (
                                <a href={supportModal.data.billCopy} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-colors">
                                    <Eye size={16} /> View Bill Document
                                </a>
                            )}
                        </>
                    )}

                    {supportModal.type === 'installation' && (
                        <>
                            {supportModal.data.billCopy ? (
                                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Attached Document</h3>
                                        <p className="text-sm font-bold text-gray-900">Purchase Bill Copy</p>
                                    </div>
                                    <a href={supportModal.data.billCopy} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-200 transition-colors">
                                        <Eye size={14} /> View Document
                                    </a>
                                </div>
                            ) : (
                                <div className="bg-red-50 p-5 rounded-2xl border border-red-100 text-red-600 text-sm font-bold flex items-center justify-center">
                                    No bill document was attached to this request.
                                </div>
                            )}
                        </>
                    )}

                    {supportModal.type === 'dealer' && (
                        <>
                            <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex justify-between items-center">
                                <div>
                                    <h3 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">Tax / GST Information</h3>
                                    <p className="font-mono font-black text-lg text-blue-950">{supportModal.data.taxId}</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Message / Remarks</h3>
                                <p className="text-sm text-gray-800 leading-relaxed">{supportModal.data.message || 'No additional message provided.'}</p>
                            </div>
                        </>
                    )}

                    {supportModal.type === 'feedback' && (
                        <>
                            <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex justify-between items-center">
                                <div>
                                    <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Product Details</h3>
                                    <p className="font-bold text-gray-900">{supportModal.data.product}</p>
                                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{supportModal.data.type}</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Description</h3>
                                <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{supportModal.data.description || 'No additional description provided.'}</p>
                            </div>
                            {supportModal.data.image && (
                                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 flex justify-between items-center mt-4">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Attached Media</span>
                                    <a href={supportModal.data.image} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-200 transition-colors">
                                        <Eye size={14} /> View File
                                    </a>
                                </div>
                            )}
                        </>
                    )}
                    
                </div>
            </div>
        </div>
    );
};

export default AdminSupportModal;
