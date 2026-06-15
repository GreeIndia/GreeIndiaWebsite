import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { API_URL, apiFetch } from '../config/api';
import { getSellingPrice, getDisplayMRP, getDiscountPercent, formatPrice } from '../utils/pricing';
import { optimizeCloudinaryUrl } from '../utils/imageOptimizer';
import { Star, ShoppingCart, ShieldCheck, Snowflake, Zap, RefreshCcw, Droplets, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const FloatingInput = ({ label, type = "text", id, value, onChange, required, rows }) => {
    const isTextarea = rows > 0;
    const Component = isTextarea ? "textarea" : "input";
    return (
        <div className="relative group">
            <Component
                type={isTextarea ? undefined : type}
                id={id}
                required={required}
                rows={rows}
                value={value}
                onChange={onChange}
                placeholder=" "
                className={`peer w-full bg-white border border-gray-200 rounded-2xl px-6 pb-4 pt-8 text-gray-900 text-base focus:border-blue-700/50 focus:ring-4 focus:ring-blue-700/10 outline-none transition-all duration-300 placeholder-transparent hover:border-gray-300 shadow-sm ${isTextarea ? 'resize-none' : ''}`}
            />
            <label
                htmlFor={id}
                className={`absolute transition-all duration-300 pointer-events-none cursor-text left-6 ${
                    value
                        ? 'top-2.5 text-[10px] font-bold uppercase tracking-widest text-blue-700'
                        : 'top-6 text-sm font-medium text-gray-400 peer-focus:top-2.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-blue-700'
                }`}
            >
                {label} {required && <span className="text-blue-700">*</span>}
            </label>
        </div>
    );
};

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [added, setAdded] = useState(false);
    
    // Review form state
    const [orderId, setOrderId] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await apiFetch(`${API_URL}/products/${productId}`);
                const data = await res.json();
                if (data.success) {
                    setProduct(data.data);
                } else {
                    setError('Product not found.');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    // Auto-rotate images every 3 seconds
    useEffect(() => {
        const images = product?.images?.length > 1 ? product.images : null;
        if (!images) return;
        const timer = setInterval(() => {
            setSlideIndex(prev => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [product]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        }
    };

    const handleBuyNow = () => {
        if (product) {
            navigate("/checkout", { state: { directBuyItem: { ...product, quantity: 1 } } });
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!orderId || !comment) return;
        
        setSubmittingReview(true);
        try {
            const res = await apiFetch(`${API_URL}/products/${productId}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, rating, comment })
            });
            const data = await res.json();
            if (data.success) {
                setProduct(data.data);
                setOrderId('');
                setComment('');
                setRating(5);
                toast.success('Review published successfully.');
            } else {
                toast.error(data.error || 'Failed to submit review');
            }
        } catch (err) {
            toast.error('Error submitting review');
        } finally {
            setSubmittingReview(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="pt-32 pb-20 flex justify-center items-center min-h-screen bg-gray-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
                </div>
            </Layout>
        );
    }

    if (error || !product) {
        return (
            <Layout>
                <div className="pt-32 pb-20 flex justify-center items-center min-h-screen bg-gray-50">
                    <div className="text-center text-red-500 font-bold py-10 px-20 bg-red-50 rounded-3xl border border-red-100 shadow-sm">
                        {error || "Product not found"}
                    </div>
                </div>
            </Layout>
        );
    }

    const discountPct = getDiscountPercent(product);
    const sellingPrice = getSellingPrice(product);
    const displayMRP = getDisplayMRP(product);
    const reviewsList = product.ratings?.reviews || [];

    return (
        <>
            <Helmet>
                <title>{product.name || `${product.capacity} Ton AC`} - GREE INDIA</title>
                <meta name="description" content={`Buy ${product.name || `${product.capacity} Ton AC`} by GREE INDIA. Enjoy premium cooling, energy efficiency, and smart features. Price: ₹${formatPrice(sellingPrice)}.`} />
                <meta property="og:title" content={`${product.name || `${product.capacity} Ton AC`} - GREE INDIA`} />
                <meta property="og:description" content={`Buy ${product.name || `${product.capacity} Ton AC`} by GREE INDIA. Enjoy premium cooling, energy efficiency, and smart features.`} />
                {product.image && <meta property="og:image" content={optimizeCloudinaryUrl(product.image)} />}
            </Helmet>

            <div className="min-h-screen pt-32 pb-24 bg-[#FAFAFA] font-inter relative overflow-hidden">
                
                {/* Background Ambient Glows */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-300/30 rounded-full blur-[120px] mix-blend-multiply"></div>
                    <div className="absolute top-[30%] right-[-5%] w-[35%] h-[50%] bg-blue-300/20 rounded-full blur-[120px] mix-blend-multiply"></div>
                    <div className="absolute bottom-[-10%] left-[15%] w-[50%] h-[40%] bg-blue-300/20 rounded-full blur-[120px] mix-blend-multiply"></div>
                </div>

                <div className="w-full mx-auto px-4 sm:px-6 md:px-8 xl:px-12 space-y-10 relative z-10">
                    
                    {/* ROW 1: Image (Left) & Title/Price/Cart (Right) */}
                    <div className="grid grid-cols-1 lg:grid-cols-8 gap-10 lg:gap-16 items-center">
                        {/* Image Left */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lg:col-span-5 bg-gradient-to-br from-white to-gray-50/50 rounded-3xl border border-gray-100 shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)] relative h-[450px] md:h-[550px] flex items-center justify-center overflow-hidden group"
                        >
                            <span className="absolute top-6 left-6 bg-white/80 backdrop-blur-md text-blue-700 px-5 py-2 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full border border-blue-100 shadow-sm z-20">
                                {product.variant || product.category || 'Premium Series'}
                            </span>
                            
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const url = encodeURIComponent(window.location.href);
                                    const text = encodeURIComponent(`Experience premium climate control with Gree: ${product.name || (product.capacity ? product.capacity + ' Ton AC' : '')}. ❄️✨\n\n`);
                                    window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank');
                                }}
                                className="absolute top-6 right-6 z-20 bg-white hover:bg-[#25D366] hover:text-white p-3 rounded-full text-[#25D366] shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:scale-110 active:scale-95 border border-gray-100"
                                title="Share via WhatsApp"
                            >
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                                </svg>
                            </button>

                            {/* Wishlist Button */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleWishlist(product);
                                }}
                                className="absolute top-6 right-20 z-20 bg-white hover:bg-red-50 hover:text-red-500 p-3 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:scale-110 active:scale-95 border border-gray-100"
                                title="Add to Wishlist"
                            >
                                <Heart 
                                    size={20} 
                                    className={isInWishlist(product._id) ? "fill-red-500 text-red-500" : "text-gray-400"} 
                                />
                            </button>

                            {/* Image/Slider */}
                            {(() => {
                                const allImages = product.images?.length ? product.images : (product.image ? [product.image] : []);
                                if (allImages.length <= 1) {
                                    return (
                                        <img 
                                            src={optimizeCloudinaryUrl(allImages[0]) || `https://placehold.co/800x600/f3f4f6/4c1d95?text=${product.capacity}+Ton+AC`}
                                            alt={product.name}
                                            className="w-full h-full object-cover mix-blend-multiply" 
                                        />
                                    );
                                }
                                return (
                                    <div className="relative w-full h-full">
                                        {allImages.map((src, idx) => (
                                            <img
                                                key={idx}
                                                src={optimizeCloudinaryUrl(src)}
                                                alt={`${product.name} view ${idx + 1}`}
                                                className={`absolute inset-0 w-full h-full object-cover mix-blend-multiply transition-opacity duration-700 ${idx === slideIndex ? 'opacity-100' : 'opacity-0'}`}
                                            />
                                        ))}
                                        {/* Dot indicators */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                                            {allImages.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setSlideIndex(idx)}
                                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === slideIndex ? 'bg-blue-700 w-4' : 'bg-gray-300'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })()}
                        </motion.div>

                        {/* Name/Actions Right */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-3 flex flex-col justify-center"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex text-amber-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} className={i < Math.round(product.ratings?.rating || 0) ? "fill-amber-400" : "text-gray-200"} />
                                    ))}
                                </div>
                                <span className="text-sm font-bold text-gray-400">({product.ratings?.total_reviews || 0} Reviews)</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3 leading-tight">
                                {product.capacity ? `${product.capacity} Ton AC` : product.name}
                            </h1>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">
                                {product.segment || 'Executive Collection'}
                            </p>

                            <div className="flex items-end gap-4 mb-10 pb-10 border-b border-gray-200">
                                <div className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
                                    {formatPrice(sellingPrice)}
                                </div>
                                {displayMRP && (
                                    <div className="text-lg lg:text-xl font-bold text-gray-400 line-through mb-1.5">
                                        {formatPrice(displayMRP)}
                                    </div>
                                )}
                                {discountPct > 0 && (
                                    <div className="mb-2.5 bg-green-50 text-green-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded border border-green-200">
                                        Save {discountPct}%
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <button 
                                    onClick={handleAddToCart}
                                    disabled={product.quantity <= 0}
                                    className={`flex-1 flex justify-center items-center gap-3 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all ${
                                        product.quantity <= 0
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                                            : added 
                                                ? "bg-emerald-50 text-emerald-600 border border-emerald-200" 
                                                : "bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                                    }`}
                                >
                                    {added ? <ShieldCheck size={20} /> : <ShoppingCart size={20} />}
                                    {product.quantity <= 0 ? 'Out of Stock' : added ? "Added to Cart" : "Add to Cart"}
                                </button>
                                <button 
                                    onClick={handleBuyNow}
                                    disabled={product.quantity <= 0}
                                    className={`flex-1 flex justify-center items-center gap-3 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all ${
                                        product.quantity <= 0
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                                            : "bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-[0_8px_20px_rgba(29,78,216,0.2)] hover:shadow-[0_12px_25px_rgba(29,78,216,0.3)] hover:-translate-y-0.5"
                                    }`}
                                >
                                    <Zap size={20} className={product.quantity > 0 ? "fill-white/20" : ""} />
                                    Buy Now
                                </button>
                            </div>

                            <div className="flex items-center gap-4 bg-blue-50/60 border border-blue-100 p-4 rounded-2xl">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                                    <ShieldCheck className="text-blue-700" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Assured Top Quality Product</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* ROW 2: Product Info + Description */}
                    <div className="flex flex-col gap-12 lg:gap-16 bg-white rounded-3xl p-10 lg:p-16 border border-gray-100 shadow-sm">
                        {/* Product Info (Specs) */}
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                                <span className="w-6 h-1 bg-blue-700 rounded-full inline-block"></span>
                                Technical Specifications
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:border-blue-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_20px_rgba(29,78,216,0.1)] transition-all duration-300 hover:-translate-y-1 group">
                                    <div className="w-12 h-12 rounded-xl bg-blue-100/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Snowflake className="text-blue-700" size={24} />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Cooling Power</p>
                                    <p className="text-lg font-black text-gray-900">{product.cooling_capacity || 'Max'}W</p>
                                </div>
                                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:border-amber-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_20px_rgba(245,158,11,0.1)] transition-all duration-300 hover:-translate-y-1 group">
                                    <div className="w-12 h-12 rounded-xl bg-amber-100/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Zap className="text-amber-500" size={24} />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Energy Rating</p>
                                    <p className="text-lg font-black text-gray-900">{product.star || 'Standard'} Star</p>
                                </div>
                                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:border-blue-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_20px_rgba(59,130,246,0.1)] transition-all duration-300 hover:-translate-y-1 group">
                                    <div className="w-12 h-12 rounded-xl bg-blue-100/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Droplets className="text-blue-500" size={24} />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Refrigerant</p>
                                    <p className="text-lg font-black text-gray-900">{product.refrigerent || 'Eco-Safe R32'}</p>
                                </div>
                                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:border-emerald-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_20px_rgba(16,185,129,0.1)] transition-all duration-300 hover:-translate-y-1 group">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${product.quantity > 0 ? 'bg-emerald-100/50' : 'bg-red-100/50'}`}>
                                        <RefreshCcw className={product.quantity > 0 ? "text-emerald-500" : "text-red-500"} size={24} />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Availability</p>
                                    <p className="text-lg font-black text-gray-900">{product.quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 mb-6 flex items-center gap-3">
                                <span className="w-6 h-1 bg-blue-700 rounded-full inline-block"></span>
                                Product Description
                            </h2>
                            <div className="border-l-4 border-blue-200 pl-6 py-2">
                                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ROW 3: Reviews in Cards (4 Max in a row) */}
                    <div>
                        <div className="mb-14 text-center relative">
                            <span className="inline-block px-5 py-2 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-blue-100 shadow-sm">Verified Feedback</span>
                            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 tracking-tight">Customer Experiences</h2>
                            <p className="text-gray-500 font-medium mt-4 text-lg">See what our premium customers are saying.</p>
                        </div>
                        
                        {reviewsList.length === 0 ? (
                            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-2xl mx-auto">
                                <Star size={32} className="text-blue-300 mx-auto mb-4" />
                                <p className="text-xl font-bold text-gray-900 mb-2">No reviews yet.</p>
                                <p className="text-gray-500 font-medium text-sm">Be the first to share your experience.</p>
                            </div>
                        ) : (
                            <div className={`grid gap-6 ${
                                reviewsList.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
                                reviewsList.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' :
                                reviewsList.length === 3 ? 'grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto' :
                                'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
                            }`}>
                                {reviewsList.slice(0, 4).map((review, idx) => (
                                    <div key={idx} className="bg-white rounded-[2rem] p-8 lg:p-10 border border-gray-100 shadow-sm flex flex-col relative overflow-hidden hover:shadow-2xl hover:shadow-blue-950/5 transition-all duration-500 hover:-translate-y-1 group">
                                        {/* Watermark Quote Icon */}
                                        <div className="absolute top-6 right-6 text-blue-50 opacity-50 transform rotate-180 pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:text-blue-100">
                                            <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                                            </svg>
                                        </div>

                                        <div className="flex items-center gap-4 mb-6 relative z-10">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-[0_4px_10px_rgba(29,78,216,0.3)] shrink-0">
                                                {review.reviewer.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-gray-900 text-base truncate">{review.reviewer}</p>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <ShieldCheck size={14} className="text-emerald-500" />
                                                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Verified</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex text-amber-400 mb-6 relative z-10">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} className={i < review.rating ? "fill-amber-400 drop-shadow-sm" : "text-gray-200"} />
                                            ))}
                                        </div>
                                        
                                        <p className="text-gray-600 text-base leading-relaxed font-medium flex-grow relative z-10">
                                            "{review.comment}"
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ROW 4: Add Review Form */}
                    <div className="w-full bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-blue-950/5 border border-blue-50">
                        <div className="flex flex-col lg:flex-row">
                            {/* Left Side Branding */}
                            <div className="lg:w-5/12 bg-gray-900 p-12 lg:p-16 flex flex-col justify-center text-white relative overflow-hidden">
                                {/* Ambient Dark Glow */}
                                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-950/40 to-transparent z-0 pointer-events-none"></div>
                                
                                {/* Watermark Star */}
                                <div className="absolute -bottom-24 -right-12 text-gray-800/50 transform rotate-12 pointer-events-none z-0">
                                    <Star size={240} className="fill-gray-800/30" />
                                </div>
                                
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-950/50">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-black mb-5 tracking-tight text-white">
                                        Share Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400">Experience</span>
                                    </h3>
                                    <p className="text-gray-400 font-medium text-lg leading-relaxed">
                                        We value your authentic feedback. Your insights on the <span className="text-gray-200 font-bold">{product.capacity ? `${product.capacity} Ton AC` : product.name}</span> help us maintain our concierge-level standards.
                                    </p>
                                </div>
                            </div>
                            
                            {/* Right Side Form */}
                            <div className="lg:w-7/12 p-10 lg:p-16">
                                <form onSubmit={handleReviewSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                                        <FloatingInput 
                                            id="orderId" 
                                            label="Order ID" 
                                            value={orderId} 
                                            onChange={(e) => setOrderId(e.target.value)} 
                                            required 
                                        />
                                        <div className="flex flex-col justify-center bg-gray-50 rounded-2xl border border-gray-100 px-6 pb-2 pt-3 h-full min-h-[72px]">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Rating</span>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map((num) => (
                                                    <button key={num} type="button" onClick={() => setRating(num)} className="transition-transform hover:scale-110 active:scale-95">
                                                        <Star size={28} className={`transition-colors ${num <= rating ? "text-amber-400 fill-amber-400 drop-shadow-sm" : "text-gray-300"}`} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <FloatingInput 
                                        id="comment" 
                                        label="Your Review" 
                                        value={comment} 
                                        onChange={(e) => setComment(e.target.value)} 
                                        required 
                                        rows={4}
                                    />

                                    <div className="flex justify-end pt-2">
                                        <button 
                                            type="submit"
                                            disabled={submittingReview}
                                            className="w-full md:w-auto px-12 bg-gray-900 hover:bg-blue-700 text-white py-5 rounded-2xl font-bold uppercase text-xs tracking-[0.2em] transition-all duration-500 shadow-lg hover:shadow-[0_15px_30px_rgba(29,78,216,0.3)] disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-1"
                                        >
                                            {submittingReview ? 'Publishing...' : 'Publish Review'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ProductDetailsPage;
