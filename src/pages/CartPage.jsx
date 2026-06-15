import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ShieldCheck, Truck, Award, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSellingPrice, formatPrice } from '../utils/pricing';

const f = (d = 0) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] },
});

const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
    const gst = Math.round(cartTotal * 0.18);

    return (
        <Layout>
            <div className="min-h-screen bg-white font-inter">
                {/* Purple top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700" />

                <div className="pt-28 pb-24 px-4 md:px-10 max-w-[1300px] mx-auto">

                    {/* ── HEADER ── */}
                    <motion.div {...f(0)} className="mb-10 flex items-end justify-between border-b border-gray-100 pb-8">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 mb-1.5">
                                GREE INDIA &nbsp;/&nbsp; Cart
                            </p>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none flex items-center gap-3">
                                Shopping Cart
                                {cartItems.length > 0 && (
                                    <span className="text-base font-black text-white bg-blue-700 rounded-full px-2.5 py-0.5">
                                        {cartItems.length}
                                    </span>
                                )}
                            </h1>
                        </div>
                        <Link to="/products" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-blue-700 transition-colors">
                            <ArrowLeft size={13} /> Back to Products
                        </Link>
                    </motion.div>

                    {/* ── EMPTY STATE ── */}
                    {cartItems.length === 0 ? (
                        <motion.div {...f(0.1)} className="flex flex-col items-center text-center py-20">
                            <div className="w-28 h-28 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-8">
                                <ShoppingBag size={50} className="text-blue-300" />
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 mb-3">Your cart is empty</h2>
                            <p className="text-gray-400 font-medium mb-10 max-w-sm leading-relaxed">
                                Browse our premium AC collection and add products to your cart.
                            </p>
                            <Link to="/products"
                                className="px-9 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] text-white bg-blue-700 hover:bg-blue-800 transition-colors shadow-[0_8px_24px_rgba(29,78,216,0.3)]">
                                Explore Products
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="flex flex-col xl:flex-row gap-10 items-start">

                            {/* ══ LEFT COLUMN ══ */}
                            <div className="flex-1 min-w-0">

                                {/* Table header */}
                                <motion.div {...f(0.07)} className="hidden md:grid grid-cols-12 gap-6 px-2 mb-4">
                                    {['Product', 'Unit Price', 'Qty', 'Total', ''].map((h, i) => (
                                        <div key={i} className={`text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 ${i === 0 ? 'col-span-5' : i === 4 ? 'col-span-1' : 'col-span-2 text-center'}`}>{h}</div>
                                    ))}
                                </motion.div>

                                {/* Items */}
                                <div className="space-y-3">
                                    {cartItems.map((item, idx) => (
                                        <motion.div key={item._id} {...f(0.1 + idx * 0.07)}
                                            className="rounded-2xl border border-gray-100 bg-white overflow-hidden hover:border-blue-200 hover:shadow-[0_4px_20px_rgba(29,78,216,0.07)] transition-all duration-300">

                                            {/* DESKTOP */}
                                            <div className="hidden md:grid grid-cols-12 gap-6 p-5 items-center">
                                                {/* Product */}
                                                <div className="col-span-5 flex items-center gap-4">
                                                    <div className="w-[84px] h-[84px] rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                                                        <img
                                                            src={(item.images?.[0] || item.image) || `https://placehold.co/200x200/f3f4f6/7c3aed?text=AC`}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover rounded-xl mix-blend-multiply"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-0.5">{item.variant || 'Residential'}</p>
                                                        <h3 className="font-black text-gray-900 text-[15px] leading-tight">{item.capacity} Ton Air Conditioner</h3>
                                                        <p className="text-[11px] text-gray-400 font-medium mt-0.5">{item.segment || 'Premium Series'}</p>
                                                    </div>
                                                </div>
                                                {/* Unit price */}
                                                <div className="col-span-2 text-center">
                                                    <span className="text-sm font-black text-gray-700">{item.mrp ? formatPrice(getSellingPrice(item)) : '—'}</span>
                                                </div>
                                                {/* Qty */}
                                                <div className="col-span-2 flex justify-center">
                                                    <div className="flex items-center rounded-xl border border-gray-200 overflow-hidden bg-gray-50">
                                                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                            className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-blue-700 hover:bg-blue-50 transition-colors">
                                                            <Minus size={12} />
                                                        </button>
                                                        <span className="w-8 text-center text-sm font-black text-gray-900">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                            className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-blue-700 hover:bg-blue-50 transition-colors">
                                                            <Plus size={12} />
                                                        </button>
                                                    </div>
                                                </div>
                                                {/* Line total */}
                                                <div className="col-span-2 text-center">
                                                    <span className="text-sm font-black text-gray-900">{item.mrp ? formatPrice(getSellingPrice(item) * item.quantity) : '—'}</span>
                                                </div>
                                                {/* Remove */}
                                                <div className="col-span-1 flex justify-end">
                                                    <button onClick={() => removeFromCart(item._id)}
                                                        className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* MOBILE */}
                                            <div className="flex md:hidden gap-4 p-4">
                                                <div className="w-20 h-20 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                                                    <img src={(item.images?.[0] || item.image) || `https://placehold.co/200x200/f3f4f6/7c3aed?text=AC`}
                                                        alt={item.name} className="w-full h-full object-cover mix-blend-multiply rounded-xl" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-blue-600">{item.variant || 'AC'}</p>
                                                    <h3 className="font-black text-gray-900 text-sm mt-0.5">{item.capacity} Ton AC</h3>
                                                    <p className="text-sm font-black text-blue-700 mt-1">{item.mrp ? formatPrice(getSellingPrice(item)) : '—'}</p>
                                                    <div className="flex items-center gap-3 mt-2.5">
                                                        <div className="flex items-center rounded-xl border border-gray-200 overflow-hidden bg-gray-50">
                                                            <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-700"><Minus size={11} /></button>
                                                            <span className="w-7 text-center text-sm font-black text-gray-900">{item.quantity}</span>
                                                            <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-700"><Plus size={11} /></button>
                                                        </div>
                                                        <button onClick={() => removeFromCart(item._id)} className="text-gray-300 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Trust bar */}
                                <motion.div {...f(0.3)} className="mt-8 grid grid-cols-3 gap-3">
                                    {[
                                        { icon: Truck,       label: 'Doorstep Delivery', sub: 'Pan India' },
                                        { icon: ShieldCheck, label: '1-Year Warranty',    sub: 'All products' },
                                        { icon: Award,       label: 'Certified Genuine',  sub: 'Official Gree' },
                                    ].map(({ icon: Icon, label, sub }) => (
                                        <div key={label} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                <Icon size={15} className="text-blue-700" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-gray-800 leading-tight">{label}</p>
                                                <p className="text-[10px] text-gray-400 font-medium">{sub}</p>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>

                                <motion.div {...f(0.35)} className="mt-5">
                                    <Link to="/products" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 hover:text-blue-700 transition-colors">
                                        <ArrowLeft size={11} /> Continue Shopping
                                    </Link>
                                </motion.div>
                            </div>

                            {/* ══ RIGHT: Order Summary ══ */}
                            <motion.div {...f(0.18)} className="xl:w-[380px] flex-shrink-0 w-full">
                                <div className="sticky top-28 rounded-3xl overflow-hidden border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.07)]">

                                    {/* Purple header */}
                                    <div className="bg-gradient-to-br from-blue-800 via-blue-700 to-blue-700 px-7 py-6">
                                        <p className="text-[9px] font-black uppercase tracking-[0.35em] text-blue-200 mb-0.5">Review</p>
                                        <h2 className="text-xl font-black text-white">Order Summary</h2>
                                    </div>

                                    <div className="bg-white px-7 py-6 space-y-5">

                                        {/* Per-item list */}
                                        <div className="space-y-2.5">
                                            {cartItems.map(item => (
                                                <div key={item._id} className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2 min-w-0 mr-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                                        <span className="text-sm text-gray-600 font-medium truncate">
                                                            {item.capacity}T AC
                                                        </span>
                                                        <span className="text-xs text-gray-400 font-bold flex-shrink-0">×{item.quantity}</span>
                                                    </div>
                                                    <span className="text-sm font-black text-gray-900 flex-shrink-0">
                                                        {item.mrp ? formatPrice(getSellingPrice(item) * item.quantity) : '—'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="border-t border-dashed border-gray-200" />

                                        {/* Price rows */}
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500 font-medium">Subtotal</span>
                                                <span className="text-sm font-black text-gray-900">₹{cartTotal.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500 font-medium flex items-center gap-1.5">
                                                    <Truck size={12} className="text-gray-400" /> Shipping
                                                </span>
                                                <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                                    Calculated at checkout
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500 font-medium">GST (18%)</span>
                                                <span className="text-sm font-black text-gray-900">₹{gst.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-100" />

                                        {/* Estimated total */}
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-widest text-gray-400">Est. Total</p>
                                                <p className="text-[10px] text-gray-400 mt-0.5">Excl. shipping</p>
                                            </div>
                                            <p className="text-3xl font-black text-gray-900">₹{(cartTotal + gst).toLocaleString()}</p>
                                        </div>

                                        {/* Note */}
                                        <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl p-3">
                                            <Tag size={12} className="text-blue-600 flex-shrink-0 mt-0.5" />
                                            <p className="text-[10px] font-medium text-blue-800 leading-relaxed">
                                                Shipping charges (₹2,000–₹4,500) will be calculated based on your delivery location at checkout.
                                            </p>
                                        </div>

                                        {/* CTA */}
                                        <Link to="/checkout"
                                            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] text-white bg-blue-700 hover:bg-blue-800 transition-colors shadow-[0_6px_24px_rgba(29,78,216,0.3)] hover:shadow-[0_8px_32px_rgba(29,78,216,0.45)]">
                                            Proceed to Checkout
                                            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>

                                        <p className="text-[10px] text-center text-gray-400 font-medium flex items-center justify-center gap-1.5">
                                            <ShieldCheck size={10} className="text-green-500" />
                                            256-bit secure · Genuine Gree products
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
