import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { API_URL, apiFetch } from '../config/api';
import { getSellingPrice, getDisplayMRP, getDiscountPercent, formatPrice } from '../utils/pricing';
import { useWishlist } from '../context/WishlistContext';

const ProductGallery = ({ hideHeading }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await apiFetch(`${API_URL}/products`);
        const json = await res.json();
        if (json.success && json.data && json.data.items) {
          // Sort by highest rating (or star if rating is missing)
          const sorted = json.data.items.sort((a, b) => {
            const ratingA = a.ratings?.rating || a.star || 0;
            const ratingB = b.ratings?.rating || b.star || 0;
            return ratingB - ratingA;
          });
          setProducts(sorted.slice(0, 8)); // Top 8
        }
      } catch (err) {
        console.error("Failed to fetch top products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopProducts();
  }, []);

  return (
    <div className="w-full">

      {/* Heading */}
      {!hideHeading && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 relative"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 inline-block relative">
            Our {" "}
            <span className="bg-gradient-to-r from-blue-700 to-blue-700 bg-clip-text text-transparent">
              Products
            </span>
            <svg className="absolute w-full h-3 -bottom-2 right-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/></svg>
          </h2>

          <p className="text-gray-500 mt-5 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            Precision-engineered cooling systems designed for exceptional environments.
          </p>
        </motion.div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
            <span className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
              className={`group relative flex-col h-full bg-white rounded-3xl border border-gray-100 shadow-[0_5px_15px_rgb(0,0,0,0.04)] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer ${index >= 3 ? 'hidden sm:flex' : 'flex'}`}
            >
              {/* Top Image Section */}
              <div className="relative h-[220px] w-full overflow-hidden bg-gray-100 flex justify-center items-center">
                {/* Overlay glow */}
                <div className="absolute inset-0 bg-blue-950/5 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                
                <img
                  src={(product.images?.[0] || product.image) || "https://placehold.co/800x800/f3f4f6/4c1d95?text=Product+Image"}
                  alt={product.name || (product.capacity ? `${product.capacity} Ton AC` : "Unnamed Asset")}
                  className="w-full h-full object-cover mix-blend-multiply"
                />
                
                {/* Category Badge */}
                <span className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold tracking-widest uppercase rounded-full text-blue-800 shadow-sm">
                  {product.variant || product.segment || 'Residential'}
                </span>

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  className="absolute top-4 right-14 z-20 bg-white/90 hover:bg-red-50 hover:text-red-500 backdrop-blur-md p-2 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:scale-110 active:scale-95"
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
                    e.stopPropagation();
                                                    const url = encodeURIComponent(`${window.location.origin}/product/${product._id}`);
                    const text = encodeURIComponent(`Hey! Look at this premium Gree AC: ${product.name || (product.capacity ? product.capacity + ' Ton AC' : '')}. Perfect for your home! ❄️✨\n\n`);
                    window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank');
                  }}
                  className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-[#25D366] hover:text-white backdrop-blur-md p-2 rounded-full text-[#25D366] shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:scale-110 active:scale-95"
                  title="Share on WhatsApp"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                </button>
              </div>

              {/* Content Body */}
              <div className="flex flex-col flex-1 p-6 relative">
                <div className="flex-1">
                  <h3 className="text-gray-900 font-bold text-lg md:text-xl tracking-tight mb-1 group-hover:text-blue-700 transition-colors">
                    {product.name || (product.capacity ? `${product.capacity} Ton AC` : 'Unnamed Asset')}
                  </h3>
                  <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mt-1">★ {product.ratings?.rating || product.star || 4.5} Rating</p>
                </div>

                {/* Bottom Row: Price & Action */}
                <div className="mt-6 flex items-end justify-between border-t border-gray-100 pt-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-white bg-green-500 px-2 py-0.5 rounded-full">{getDiscountPercent(product)}% OFF</span>
                      <span className="text-xs text-gray-400 line-through">{formatPrice(getDisplayMRP(product))}</span>
                    </div>
                    <p className="text-xl font-extrabold text-gray-900">
                      {product.mrp ? formatPrice(getSellingPrice(product)) : product.price || 'TBD'}
                    </p>
                  </div>
                  
                  {/* Arrow Icon Button */}
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 transition-transform duration-300 group-hover:bg-blue-700 group-hover:text-white group-hover:-rotate-45">
                    <ArrowUpRight size={20} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
              
              {/* Very subtle glow bleeding over the edges on hover */}
              <div className="absolute inset-0 pointer-events-none rounded-3xl ring-2 ring-transparent group-hover:ring-blue-600/20 transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      )}

      {/* More Products Button */}
      {!hideHeading && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <Link 
            to="/products"
            className="px-10 py-4 rounded-full bg-blue-950 hover:bg-blue-950 text-white font-bold tracking-widest uppercase text-sm shadow-[0_5px_15px_rgba(49,46,129,0.3)] hover:shadow-[0_10px_20px_rgba(49,46,129,0.4)] active:scale-95 transition-all duration-300"
          >
            Explore More Products
          </Link>
        </motion.div>
      )}

    </div>
  );
};

export default ProductGallery;