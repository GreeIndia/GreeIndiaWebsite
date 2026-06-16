import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const AdminVariantsTab = ({ variants, loading, newVariantName, setNewVariantName, handleAddVariant, handleDeleteVariant }) => {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h3 className="text-lg font-black text-gray-900 tracking-tight">Variant Registry</h3>
                <form onSubmit={handleAddVariant} className="flex flex-col sm:flex-row w-full md:w-auto items-stretch sm:items-center gap-3">
                    <input type="text" value={newVariantName} onChange={e => setNewVariantName(e.target.value)} required placeholder="New Variant Name..." className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 font-medium w-full sm:w-64" />
                    <button type="submit" className="flex justify-center items-center gap-2 bg-[#0B1120] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg whitespace-nowrap">
                        <Plus size={16} /> Register
                    </button>
                </form>
            </div>
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[1000px] lg:min-w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-widest border-b border-gray-200">
                            <th className="p-5 pl-8 font-bold">Variant Designation</th>
                            <th className="p-5 font-bold">Registration Date</th>
                            <th className="p-5 pr-8 text-right font-bold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="3" className="p-10 text-center text-sm font-bold text-gray-400">Loading variants...</td>
                            </tr>
                        ) : variants.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="p-10 text-center text-sm font-bold text-gray-400">No variants registered.</td>
                            </tr>
                        ) : variants.map(v => (
                            <tr key={v._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                <td className="p-4 pl-8">
                                    <span className="font-bold text-gray-900 text-sm tracking-tight">{v.name}</span>
                                </td>
                                <td className="p-4 text-sm text-gray-500">
                                    {new Date(v.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-4 pr-8 text-right">
                                    <button onClick={() => handleDeleteVariant(v._id)} className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors ml-auto" title="Delete Variant">
                                        <Trash2 size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminVariantsTab;
