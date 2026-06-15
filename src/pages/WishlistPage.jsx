import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Heart, ArrowRight, Trash2, ShoppingCart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { getSellingPrice, getDisplayMRP, formatPrice } from '../utils/pricing';
import { motion } from 'framer-motion';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <Layout>
      <div className="pt-32 pb-24 px-6 md:px-12 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex items-end justify-between mb-10 border-b border-gray-200 pb-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <Heart className="text-blue-700" size={36} fill="currentColor" /> My Wishlist
              </h1>
              <p className="text-gray-500 font-medium mt-2">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={40} className="text-blue-300" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-500 font-medium mb-8 max-w-md mx-auto">
                Save items you love to your wishlist. Review them anytime and easily move them to your cart.
              </p>
              <Link to="/products" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest text-white bg-blue-700 hover:bg-blue-800 transition-all shadow-[0_8px_24px_rgba(29,78,216,0.3)] hover:shadow-[0_12px_30px_rgba(29,78,216,0.4)] hover:-translate-y-1">
                Explore Products <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item, idx) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-[2rem] p-5 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:border-blue-100 transition-all duration-300 group flex flex-col"
                >
                  <div className="relative aspect-square rounded-2xl bg-gray-50 overflow-hidden mb-4 border border-gray-100/50">
                    <img 
                      src={item.images?.[0] || item.image || "https://placehold.co/400x400/f3f4f6/1e40af?text=AC"}
                      alt={item.name}
                      className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />
                    <button 
                      onClick={() => removeFromWishlist(item._id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 hover:text-red-600 shadow-sm transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={14} strokeWidth={2.5} />
                    </button>
                    {item.variant && (
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 text-[9px] font-black tracking-widest uppercase rounded-md text-blue-800 shadow-sm">
                        {item.variant}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <Link to={`/product/${item._id}`} className="block group-hover:text-blue-700 transition-colors">
                      <h3 className="font-bold text-gray-900 leading-snug line-clamp-2 mb-1">
                        {item.name || (item.capacity ? `${item.capacity} Ton AC` : 'Unnamed Product')}
                      </h3>
                      {item.modelId && (
                        <p className="text-[10px] font-mono font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded inline-block mb-3">
                          {item.modelId}
                        </p>
                      )}
                    </Link>

                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                      <div>
                        {item.mrp && (
                          <p className="text-[10px] text-gray-400 line-through mb-0.5 font-medium">
                            {formatPrice(getDisplayMRP(item))}
                          </p>
                        )}
                        <p className="text-lg font-black text-gray-900">
                          {item.mrp ? formatPrice(getSellingPrice(item)) : 'TBD'}
                        </p>
                      </div>
                      
                      <button 
                        onClick={() => addToCart(item, 1)}
                        className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 hover:bg-blue-700 hover:text-white transition-all shadow-sm hover:shadow-[0_4px_15px_rgba(29,78,216,0.3)] active:scale-95"
                        title="Add to Cart"
                      >
                        <ShoppingCart size={18} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WishlistPage;
