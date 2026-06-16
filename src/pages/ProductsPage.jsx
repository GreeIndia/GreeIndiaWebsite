import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API_URL, apiFetch } from '../config/api';
import { getSellingPrice, getDisplayMRP, getDiscountPercent, formatPrice } from '../utils/pricing';
import { optimizeCloudinaryUrl } from '../utils/imageOptimizer';
import { Helmet } from 'react-helmet-async';
import { Star, ShoppingCart, Filter, X, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductsPage = () => {
    const { variantId } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [addedItems, setAddedItems] = useState({});
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const priceRanges = [
        { id: 'under_40k', label: 'Under ₹40,000', min: 0, max: 40000 },
        { id: '40k_50k', label: '₹40,000 - ₹50,000', min: 40000, max: 50000 },
        { id: '50k_60k', label: '₹50,000 - ₹60,000', min: 50000, max: 60000 },
        { id: 'over_60k', label: 'Over ₹60,000', min: 60000, max: null }
    ];

    const variantName = variantId ? decodeURIComponent(variantId.replace(/-/g, ' ')) : '';

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedItems(prev => ({ ...prev, [product._id]: true }));
        setTimeout(() => {
            setAddedItems(prev => ({ ...prev, [product._id]: false }));
        }, 2000);
    };

    const fetchProducts = async (pageNum = 1, append = false) => {
        if (pageNum === 1) setLoading(true);
        else setLoadingMore(true);

        try {
            const baseUrl = variantName 
                ? `${API_URL}/products?variant=${encodeURIComponent(variantName)}`
                : `${API_URL}/products`;
            const url = `${baseUrl}${variantName ? '&' : '?'}page=${pageNum}&limit=12`;
                
            const res = await apiFetch(url);
            const data = await res.json();
            
            if (data.success) {
                if (append) {
                    setProducts(prev => [...prev, ...data.data.items]);
                } else {
                    setProducts(data.data.items);
                }
                setTotalPages(data.data.totalPages);
                setPage(pageNum);
            } else {
                setError('Failed to load products');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchProducts(1, false);
    }, [variantName]);

    const handleLoadMore = () => {
        if (page < totalPages) {
            fetchProducts(page + 1, true);
        }
    };

    // Filter products based on selected price range
    const filteredProducts = products.filter(product => {
        if (!selectedPriceRange) return true;
        const price = getSellingPrice(product);
        const range = priceRanges.find(r => r.id === selectedPriceRange);
        if (!range) return true;
        
        if (range.min !== null && price < range.min) return false;
        if (range.max !== null && price > range.max) return false;
        return true;
    });

    // Group products by segment
    const groupedProducts = filteredProducts.reduce((acc, product) => {
        const segment = product.segment || 'Other';
        if (!acc[segment]) {
            acc[segment] = [];
        }
        acc[segment].push(product);
        return acc;
    }, {});

    return (
        <>
            <Helmet>
                <title>{variantName ? `${variantName} | GREE INDIA` : 'Products | GREE INDIA'}</title>
            </Helmet>
            <div className="pt-32 pb-20 bg-[#FAFAFA] min-h-screen font-inter relative overflow-hidden">
                {/* Background Ambient Glows */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-300/30 rounded-full blur-[120px] mix-blend-multiply"></div>
                    <div className="absolute top-[30%] right-[-5%] w-[35%] h-[50%] bg-blue-300/20 rounded-full blur-[120px] mix-blend-multiply"></div>
                    <div className="absolute bottom-[-10%] left-[15%] w-[50%] h-[40%] bg-blue-300/20 rounded-full blur-[120px] mix-blend-multiply"></div>
                </div>

                <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 xl:px-12 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                            {variantName || 'All Products'}
                        </h1>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Explore our premium range of {variantName || 'products'} designed for ultimate comfort and energy efficiency.
                        </p>
                        
                        <div className="mt-8 flex justify-center">
                            <button 
                                onClick={() => setIsFilterOpen(true)}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full font-bold text-gray-800 hover:border-blue-600 hover:text-blue-700 shadow-sm transition-all"
                            >
                                <Filter size={18} />
                                Filter Products
                                {selectedPriceRange && (
                                    <span className="w-2 h-2 rounded-full bg-blue-700 ml-1"></span>
                                )}
                            </button>
                        </div>
                    </motion.div>

                    {/* Offcanvas Filter Sidebar */}
                    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)}></div>
                        
                        <div className={`absolute top-0 right-0 h-full w-full max-w-xs bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                                    <Filter size={20} className="text-blue-700" /> Filters
                                </h3>
                                <button onClick={() => setIsFilterOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="p-6 flex-grow overflow-y-auto">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Price Range</p>
                                    {selectedPriceRange && (
                                        <button 
                                            onClick={() => setSelectedPriceRange(null)}
                                            className="text-xs font-bold text-red-500 hover:text-red-600 uppercase tracking-wider"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    {priceRanges.map(range => (
                                        <label key={range.id} className="flex items-center gap-3 cursor-pointer group">
                                            <input 
                                                type="radio" 
                                                name="priceRange" 
                                                className="hidden" 
                                                checked={selectedPriceRange === range.id}
                                                onChange={() => setSelectedPriceRange(range.id)}
                                            />
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedPriceRange === range.id ? 'bg-blue-700 border-blue-700 text-white shadow-md' : 'bg-gray-50 border-gray-200 group-hover:border-blue-500 text-transparent'}`}>
                                                <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                                            </div>
                                            <span className={`text-sm font-medium transition-colors ${selectedPriceRange === range.id ? 'text-blue-800 font-bold' : 'text-gray-600 group-hover:text-gray-900'}`}>
                                                {range.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="p-6 border-t border-gray-100">
                                <button onClick={() => setIsFilterOpen(false)} className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg">
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="w-full">
                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
                                </div>
                            ) : error ? (
                                <div className="text-center text-red-500 font-medium py-10 bg-red-50 rounded-2xl border border-red-100">
                                    {error}
                                </div>
                            ) : filteredProducts.length === 0 ? (
                                <div className="text-center bg-white rounded-3xl border border-gray-100 py-24 shadow-sm flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
                                        <Filter size={24} />
                                    </div>
                                    <p className="text-lg font-bold text-gray-900 mb-2">No products found</p>
                                    <p className="text-gray-500">Try adjusting your filters to see more results.</p>
                                    {selectedPriceRange && (
                                        <button 
                                            onClick={() => setSelectedPriceRange(null)}
                                            className="mt-6 px-6 py-2.5 bg-blue-50 text-blue-700 font-bold text-sm rounded-full hover:bg-blue-100 transition-colors"
                                        >
                                            Clear Filters
                                        </button>
                                    )}
                                </div>
                            ) : (
                                Object.keys(groupedProducts).map((segment, idx) => (
                            <div key={idx} className="mb-16">
                                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 mb-10 flex items-center gap-4">
                                    <span className="w-8 h-1.5 bg-gradient-to-r from-blue-700 to-blue-500 rounded-full inline-block shadow-[0_2px_10px_rgba(29,78,216,0.3)]"></span>
                                    {segment} Collection
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {groupedProducts[segment].map((product, pIdx) => (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ duration: 0.5, delay: pIdx * 0.1 }}
                                            key={product._id} 
                                            onClick={() => navigate(`/product/${product._id}`)}
                                            className="bg-white rounded-[2rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(29,78,216,0.1)] transition-all duration-500 hover:-translate-y-2 border border-gray-100 group flex flex-col relative cursor-pointer"
                                        >
                                            {/* Image placeholder */}
                                            <div className="bg-gradient-to-b from-gray-50 to-white h-64 flex justify-center items-center relative overflow-hidden block">
                                                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-500 z-0"></div>
                                                <img 
                                                    src={optimizeCloudinaryUrl(product.image) || `https://placehold.co/600x400/f3f4f6/4c1d95?text=${product.capacity}+Ton+AC`} 
                                                    alt={product.name || `AC ${product.capacity} Ton`}
                                                    loading="lazy"
                                                    className="object-cover w-full h-full mix-blend-multiply relative z-10"
                                                />
                                                <div className="absolute top-5 right-5 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black tracking-widest text-blue-800 shadow-[0_4px_10px_rgba(0,0,0,0.05)] border border-blue-100/50 uppercase">
                                                    {product.star} Star
                                                </div>

                                                {/* Wishlist Button */}
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        toggleWishlist(product);
                                                    }}
                                                    className="absolute top-5 right-24 z-20 bg-white hover:bg-red-50 hover:text-red-500 p-2.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:scale-110 active:scale-95 border border-gray-50"
                                                    title="Add to Wishlist"
                                                >
                                                    <Heart 
                                                        size={18} 
                                                        className={isInWishlist(product._id) ? "fill-red-500 text-red-500" : "text-gray-400"} 
                                                    />
                                                </button>

                                                {/* WhatsApp Share Button */}
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        const url = encodeURIComponent(`${window.location.origin}/product/${product._id}`);
                                                        const text = encodeURIComponent(`Hey! Look at this premium Gree AC: ${product.name || (product.capacity ? product.capacity + ' Ton AC' : '')}. Perfect for your home! ❄️✨\n\n`);
                                                        window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank');
                                                    }}
                                                    className="absolute top-5 left-5 z-20 bg-white hover:bg-[#25D366] hover:text-white p-2.5 rounded-full text-[#25D366] shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:scale-110 active:scale-95 border border-gray-50"
                                                    title="Share on WhatsApp"
                                                >
                                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            
                                            <div className="p-7 lg:p-8 flex-grow flex flex-col bg-white">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-700 transition-colors tracking-tight">
                                                            {product.capacity ? `${product.capacity} Ton AC` : product.name}
                                                        </h3>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-100/50">
                                                        <Star size={14} className="text-amber-500 fill-amber-500" />
                                                        <span className="text-xs font-black text-amber-700">{product.ratings?.rating || 'N/A'}</span>
                                                    </div>
                                                </div>
                                                
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Cooling Capacity: {product.cooling_capacity}W</p>
                                                
                                                <p className="text-gray-500 text-sm mb-8 flex-grow line-clamp-2 leading-relaxed font-medium">
                                                    {product.description}
                                                </p>
                                                
                                                <div className="mt-auto pt-6 border-t border-gray-100">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="text-[10px] font-black text-white bg-gradient-to-r from-emerald-400 to-emerald-500 px-3 py-1 rounded-full tracking-[0.2em] shadow-sm uppercase">{getDiscountPercent(product)}% OFF</span>
                                                        <span className="text-sm font-bold text-gray-300 line-through decoration-2">{formatPrice(getDisplayMRP(product))}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center mt-1">
                                                        <div>
                                                            <p className="text-3xl font-black text-gray-900 tracking-tight">
                                                                {product.mrp ? formatPrice(getSellingPrice(product)) : 'TBD'}
                                                            </p>
                                                        </div>
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleAddToCart(product);
                                                            }}
                                                            disabled={product.quantity <= 0}
                                                            className={`w-12 h-12 flex justify-center items-center rounded-2xl font-bold transition-all ${
                                                                product.quantity <= 0 
                                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                                    : addedItems[product._id] 
                                                                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                                                                        : 'bg-gray-900 hover:bg-blue-700 text-white shadow-[0_8px_20px_rgba(17,24,39,0.15)] hover:shadow-[0_12px_25px_rgba(29,78,216,0.3)] hover:-translate-y-1'
                                                            }`}
                                                            title="Add to Cart"
                                                        >
                                                            <ShoppingCart size={20} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                    
                    {/* Load More Button */}
                    {!loading && !error && filteredProducts.length > 0 && page < totalPages && (
                        <div className="mt-12 flex justify-center">
                            <button 
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                className="px-8 py-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-bold rounded-full shadow-lg transition-all"
                            >
                                {loadingMore ? "Loading..." : "Load More Products"}
                            </button>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductsPage;
