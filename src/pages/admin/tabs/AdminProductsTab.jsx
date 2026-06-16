import React from 'react';
import { Plus, Eye, Edit3, Trash2 } from 'lucide-react';

const AdminProductsTab = ({ products, loading, openAddModal, openEditModal, handleDelete, navigate }) => {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-lg font-black text-gray-900 tracking-tight">Active Infrastructure</h3>
                <button 
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-[#0B1120] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg"
                >
                    <Plus size={16} /> Deploy Asset
                </button>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[1000px] lg:min-w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-widest border-b border-gray-200">
                            <th className="p-5 pl-8 font-bold">Asset Name</th>
                            <th className="p-5 font-bold">Model ID</th>
                            <th className="p-5 font-bold">Variant Designation</th>
                            <th className="p-5 font-bold">Stock</th>
                            <th className="p-5 font-bold">MRP</th>
                            <th className="p-5 pr-8 text-right font-bold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="p-10 text-center text-sm font-bold text-gray-400">Syncing with databank...</td>
                            </tr>
                        ) : products.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="p-10 text-center text-sm font-bold text-gray-400">No assets detected.</td>
                            </tr>
                        ) : products.map(p => (
                            <tr key={p._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                <td className="p-4 pl-8">
                                    <span className="font-bold text-gray-900 text-sm tracking-tight">{p.name || (p.capacity ? `${p.capacity} Ton AC` : 'Unnamed Asset')}</span>
                                </td>
                                <td className="p-4">
                                    <span className="font-mono text-xs font-bold text-blue-800 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">{p.modelId || '—'}</span>
                                </td>
                                <td className="p-4">
                                    <span className="text-sm font-medium text-gray-600">{p.variant || 'N/A'}</span>
                                </td>
                                <td className="p-4">
                                    <span className={`font-black text-sm ${p.quantity > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                                        {p.quantity || 0} Units
                                    </span>
                                </td>
                                <td className="p-4 text-sm font-bold text-gray-900">₹{p.mrp ? Math.round(p.mrp * 1.30).toLocaleString() : p.price || 'TBD'}</td>
                                <td className="p-4 pr-8 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => navigate(`/admin/product/${p._id}`)} className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors" title="View Details">
                                            <Eye size={14} />
                                        </button>
                                        <button onClick={() => openEditModal(p)} className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 text-amber-500 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors" title="Edit Asset">
                                            <Edit3 size={14} />
                                        </button>
                                        <button onClick={() => handleDelete(p._id)} className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors" title="Delete Asset">
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

export default AdminProductsTab;
