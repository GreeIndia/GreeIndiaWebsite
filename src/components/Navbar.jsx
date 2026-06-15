import React, { useEffect, useState, useRef } from "react";
import { Menu, X, ChevronDown, ShoppingCart, Search, ArrowUpRight, Sparkles, Heart } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { API_URL, apiFetch } from "../config/api";
import { getSellingPrice, formatPrice } from "../utils/pricing";

function useDebounce(v, d) {
  const [s, setS] = useState(v);
  useEffect(() => { const t = setTimeout(() => setS(v), d); return () => clearTimeout(t); }, [v, d]);
  return s;
}

const InlineSearch = ({ onClose, isTransparent }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const debounced = useDebounce(query, 280);

  useEffect(() => {
    apiFetch(`${API_URL}/products`).then(r => r.json()).then(j => {
      if (j.success) setAllProducts(j.data?.items || []);
    }).catch(() => {});
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  useEffect(() => {
    const h = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  useEffect(() => {
    if (debounced.trim().length < 2) { setResults([]); return; }
    setLoading(true);
    const q = debounced.toLowerCase();
    const r = allProducts.filter(p =>
      [p.name, p.variant, p.segment, p.category, p.modelId, p.capacity ? `${p.capacity} ton` : ""]
        .some(f => (f || "").toLowerCase().includes(q))
    ).slice(0, 5);
    setTimeout(() => { setResults(r); setLoading(false); }, 150);
  }, [debounced, allProducts]);

  const go = id => { navigate(`/product/${id}`); onClose(); };
  const submit = e => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    onClose();
  };

  return (
    <div className="flex-1 max-w-2xl mx-auto relative flex items-center w-full" style={{ animation: "fadeIn 0.3s ease-out" }}>
      <form onSubmit={submit} className={`relative flex items-center w-full rounded-full transition-all duration-300 ${isTransparent ? 'bg-white/10 border border-white/20' : 'bg-gray-100 border border-gray-200'} px-4 py-2`}>
        <Search size={18} className={`${isTransparent ? 'text-white/60' : 'text-gray-400'} shrink-0`} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search products..."
          className={`flex-1 bg-transparent px-3 text-sm outline-none ${isTransparent ? 'text-white placeholder-white/50' : 'text-gray-900 placeholder-gray-500'}`}
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} className={`p-1 ${isTransparent ? 'text-white/60 hover:text-white' : 'text-gray-400 hover:text-gray-600'} shrink-0`}>
            <X size={16} />
          </button>
        )}
      </form>

      {/* Dropdown Results */}
      {query && (
        <div className="absolute top-full left-0 w-full mt-4 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[100]" style={{ animation: "slideDown 0.2s ease-out" }}>
          <div className="max-h-[60vh] overflow-y-auto">
            {loading && (
              <div className="p-6 flex justify-center">
                <div className="animate-spin w-5 h-5 border-2 border-blue-700 border-t-transparent rounded-full" />
              </div>
            )}

            {!loading && debounced.length >= 2 && results.length === 0 && (
              <div className="p-6 text-center text-gray-500 font-medium text-sm">
                No products found for "{query}"
              </div>
            )}

            {!loading && results.length > 0 && (
              <div className="p-2 flex flex-col">
                {results.map(p => (
                  <button
                    key={p._id}
                    onClick={() => go(p._id)}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-50 transition-colors text-left group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                      <img 
                        src={p.images?.[0] || p.image || `https://placehold.co/100x100/f8fafc/475569?text=AC`}
                        alt={p.name}
                        className="w-full h-full object-cover mix-blend-multiply"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-900 font-bold group-hover:text-blue-700 transition-colors truncate text-sm">
                        {p.name || (p.capacity ? `${p.capacity} Ton AC` : "AC Unit")}
                      </h4>
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-0.5">
                        {p.segment || "Product"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-700 font-black text-sm">{p.mrp ? formatPrice(getSellingPrice(p)) : ""}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════ */
const Navbar = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location  = useLocation();
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    apiFetch(`${API_URL}/variants`).then(r => r.json()).then(j => {
      if (j.success) setVariants(j.data.map(v => v.name));
    }).catch(() => setVariants(["Fixed Speed Range", "Inverter Range"]));
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setSearchOpen(false); setOpen(false); }, [location.pathname]);

  const isHome = location.pathname === "/";
  const isTransparent = isHome && !scrolled;
  const base = `transition-colors duration-300 font-bold uppercase tracking-widest text-sm ${isTransparent ? "text-gray-200 hover:text-white" : "text-gray-600 hover:text-blue-700"}`;

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-gradient-to-b from-black/60 to-transparent border-b border-white/10 py-5"
          : "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200 py-5"
      }`}>
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 flex items-center justify-between">

          <Link to="/" className="flex items-center flex-shrink-0">
            <img src="/logo/GREE INDIA.webp" alt="GREE INDIA Logo" loading="eager" fetchPriority="high"
              className="h-6 md:h-8 max-w-[150px] object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.4)] hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-300" />
          </Link>

          {/* Middle Section: Desktop Links OR Inline Search */}
          <div className="flex-1 flex items-center justify-center mx-4 lg:mx-8">
            {searchOpen ? (
              <InlineSearch onClose={() => setSearchOpen(false)} isTransparent={isTransparent} />
            ) : (
              <div className="hidden lg:flex items-center gap-6 xl:gap-8 animate-in fade-in duration-300">
                <Link to="/" className={base}>Home</Link>
                <Link to="/about" className={base}>About</Link>

                {[
                  { label: "Products", links: variants.map(v => ({ label: v, to: `/products/${encodeURIComponent(v).replace(/%20/g, '-')}` })) },
                  { label: "Services",  links: [{ label: "Dealer Form", to: "/dealer-form" }, { label: "Service Request", to: "/service-request" }, { label: "Installation Form", to: "/installation-form" }] },
                  { label: "Others",   links: [{ label: "News Video", to: "/news-video" }, { label: "Help & Support", to: "/help-support" }, { label: "Online Feedback", to: "/online-feedback" }, { label: "Refund Order", to: "/refund-order" }] },
                ].map(({ label, links }) => (
                  <div key={label} className="relative group">
                    <button className={`flex items-center gap-1.5 ${base} outline-none cursor-pointer py-2`}>
                      {label}
                      <ChevronDown size={14} className={`transition-transform duration-300 group-hover:-rotate-180 ${isTransparent ? "text-gray-400" : "text-gray-500"}`} />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 py-3 min-w-[220px] flex flex-col">
                        {links.map((l, i) => (
                          <Link key={i} to={l.to} className="px-6 py-3 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">{l.label}</Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <Link to="/track-orders" className={base}>Track Orders</Link>
                <Link to="/contact" className="inline-flex bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-[0_5px_15px_rgba(29,78,216,0.3)] hover:shadow-[0_10px_20px_rgba(29,78,216,0.4)] hover:-translate-y-0.5 active:scale-95">
                  Contact Us
                </Link>
              </div>
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            {/* Search Toggle Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label={searchOpen ? "Close Search" : "Open Search"}
              className={`relative p-2.5 rounded-xl transition-all duration-200 group ${
                isTransparent ? "text-white/70 hover:text-white hover:bg-white/10" : "text-gray-500 hover:text-blue-700 hover:bg-blue-50"
              }`}
            >
              {searchOpen ? <X size={20} strokeWidth={1.75} /> : <Search size={20} strokeWidth={1.75} />}
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative group p-1">
              <Heart size={24} className={`transition-colors ${isTransparent ? "text-white" : "text-gray-800 group-hover:text-blue-700"}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative group p-1">
              <ShoppingCart size={24} className={`transition-colors ${isTransparent ? "text-white" : "text-gray-800 group-hover:text-blue-700"}`} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-700 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile toggle */}
            <div className="lg:hidden">
              {open
                ? <X size={26} className={`cursor-pointer ${isTransparent ? "text-white" : "text-gray-900"}`} onClick={() => setOpen(false)} />
                : <Menu size={26} className={`cursor-pointer ${isTransparent ? "text-white" : "text-gray-900"}`} onClick={() => setOpen(true)} />
              }
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto lg:hidden
          ${open ? "max-h-[85vh] opacity-100 py-4" : "max-h-0 opacity-0 py-0"}`}>

          <button onClick={() => { setOpen(false); setSearchOpen(true); }}
            className="mx-6 my-3 flex items-center gap-3 px-5 py-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-2xl transition-all text-left">
            <Search size={16} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-400">Search products...</span>
          </button>

          {[
            { label: "Home", to: "/" },
            { label: "About", to: "/about" },
            { label: "Track Orders", to: "/track-orders" },
            { label: "Help & Support", to: "/help-support" },
            { label: "Contact Us", to: "/contact" },
            { label: "Dealer Form", to: "/dealer-form" },
            { label: "Service Request", to: "/service-request" },
            { label: "Refund Order", to: "/refund-order" },
          ].map(({ label, to }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}
              className="px-8 py-4 text-gray-800 font-bold uppercase tracking-widest text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors border-b border-gray-50">
              {label}
            </Link>
          ))}

          <div className="flex flex-col border-b border-gray-50">
            <div className="px-8 py-4 text-gray-400 font-bold uppercase tracking-widest text-xs">Products</div>
            {variants.map((v, i) => (
              <Link key={i} to={`/products/${encodeURIComponent(v).replace(/%20/g, '-')}`} onClick={() => setOpen(false)}
                className="pl-12 pr-8 py-3 text-gray-700 font-bold tracking-wider text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors">{v}</Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;