import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Users, LogOut, ChartNoAxesCombined, Trash2, Plus, X, Eye, EyeOff, Edit3, Wrench, Briefcase, CheckCircle, Settings, AlertCircle, ChevronDown } from "lucide-react";
import { API_URL, apiFetch } from '../../config/api';
import toast from 'react-hot-toast';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [navGroups, setNavGroups] = useState({ store: true, sales: true, support: false, other: false });
  const toggleNavGroup = (group) => setNavGroups(prev => ({ ...prev, [group]: !prev[group] }));
  
  // Product Management State
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, mode: 'add', data: null });
  const [orderModal, setOrderModal] = useState({ isOpen: false, data: null });
  const [supportModal, setSupportModal] = useState({ isOpen: false, data: null, type: '' });
  const [formStep, setFormStep] = useState(1);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Variant Management State
  const [variants, setVariants] = useState([]);
  const [newVariantName, setNewVariantName] = useState("");
  
  // Settings State
  const [settingsForm, setSettingsForm] = useState({ email: '', currentPassword: '', newPassword: '' });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  
  // Custom Confirmation Dialog State
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, message: '', onConfirm: null });
  const [refundRejectionDialog, setRefundRejectionDialog] = useState({ isOpen: false, orderId: null, reason: '' });

  const [serviceRequests, setServiceRequests] = useState([]);
  const [installations, setInstallations] = useState([]);
  const [dealerRequests, setDealerRequests] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  
  // Social Wall State
  const [socialWallForm, setSocialWallForm] = useState({
    instagram: { imageUrl: '', caption: '', likes: '', date: '', postUrl: '' },
    facebook: { imageUrl: '', caption: '', likes: '', date: '', postUrl: '' }
  });
  const emptyProduct = {
      name: "",
      modelId: "",
      variant: "Fixed Speed Range",
      description: "",
      mrp: "",
      image: "",
      images: [],
      quantity: 10,
      segment: "",
      capacity: "",
      cooling_capacity: "",
      star: "",
      refrigerent: "",
      discount: "",
      ratings: { rating: 0, total_reviews: 0, reviews: [] }
  };
  const [newProduct, setNewProduct] = useState(emptyProduct);

  // AUTH PROTECT GUARD: Evict if no token is found
  useEffect(() => {
    const token = localStorage.getItem("gree_admin_token");
    if (!token) navigate("/admin/login");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("gree_admin_token");
    navigate("/admin/login");
  };

  // Fetch Products
  const fetchProducts = async () => {
      setLoading(true);
      try {
          const res = await apiFetch(`${API_URL}/products?limit=100`);
          const json = await res.json();
          if (json.success) setProducts(json.data.items);
      } catch (err) {
          console.error("Failed to fetch products:", err);
      } finally {
          setLoading(false);
      }
  };

  // Fetch Orders
  const fetchOrders = async () => {
      setLoading(true);
      try {
          const res = await apiFetch(`${API_URL}/orders?limit=100`);
          const json = await res.json();
          if (json.success) setOrders(json.data.items);
      } catch (err) {
          console.error("Failed to fetch orders:", err);
      } finally {
          setLoading(false);
      }
  };

  // Fetch Variants
  const fetchVariants = async () => {
      setLoading(true);
      try {
          const res = await apiFetch(`${API_URL}/variants`);
          const json = await res.json();
          if (json.success) setVariants(json.data);
      } catch (err) {
          console.error("Failed to fetch variants:", err);
      } finally {
          setLoading(false);
      }
  };

  const fetchServiceRequests = async () => {
      setLoading(true);
      try {
          const res = await apiFetch(`${API_URL}/service-requests`);
          const json = await res.json();
          if (json.success) setServiceRequests(json.data);
      } catch (err) {
          console.error("Failed to fetch service requests:", err);
      } finally {
          setLoading(false);
      }
  };

  const fetchInstallations = async () => {
      setLoading(true);
      try {
          const res = await apiFetch(`${API_URL}/installation-requests`);
          const json = await res.json();
          if (json.success) setInstallations(json.data);
      } catch (err) {
          console.error("Failed to fetch installations:", err);
      } finally {
          setLoading(false);
      }
  };

  const fetchDealerRequests = async () => {
      setLoading(true);
      try {
          const res = await apiFetch(`${API_URL}/dealer-requests`);
          const json = await res.json();
          if (json.success) setDealerRequests(json.data);
      } catch (err) {
          console.error("Failed to fetch dealer requests:", err);
      } finally {
          setLoading(false);
      }
  };

  const fetchFeedbacks = async () => {
      setLoading(true);
      try {
          const res = await apiFetch(`${API_URL}/online-feedbacks`);
          const json = await res.json();
          if (json.success) setFeedbacks(json.data);
      } catch (err) {
          console.error("Failed to fetch feedbacks:", err);
      } finally {
          setLoading(false);
      }
  };

  const fetchSocialWall = async () => {
      setLoading(true);
      try {
          const res = await apiFetch(`${API_URL}/social-wall`);
          const json = await res.json();
          if (json.success && json.data) {
              setSocialWallForm({
                  instagram: json.data.instagram || { imageUrl: '', caption: '', likes: '', date: '', postUrl: '' },
                  facebook: json.data.facebook || { imageUrl: '', caption: '', likes: '', date: '', postUrl: '' }
              });
          }
      } catch (err) {
          console.error("Failed to fetch social wall:", err);
      } finally {
          setLoading(false);
      }
  };

  // Load data when tab switches
  useEffect(() => {
      if (!localStorage.getItem("gree_admin_token")) return;
      if (activeTab === "overview") {
          fetchProducts();
          fetchOrders();
          fetchVariants();
      } else if (activeTab === "products") {
          fetchProducts();
          fetchVariants();
      } else if (activeTab === "orders" || activeTab === "refunds") {
          fetchOrders();
      } else if (activeTab === "variants") {
          fetchVariants();
      } else if (activeTab === "service") {
          fetchServiceRequests();
      } else if (activeTab === "installations") {
          fetchInstallations();
      } else if (activeTab === "dealers") {
          fetchDealerRequests();
      } else if (activeTab === "feedbacks") {
          fetchFeedbacks();
      } else if (activeTab === "socialwall") {
          fetchSocialWall();
      }
  }, [activeTab]);

  // Handle Add/Edit Product Submit
  const handleModalSubmit = async (e) => {
      e.preventDefault();
      
      if (uploadingImage) {
          toast.error('Please wait for the image to finish uploading.');
          return;
      }
      
      const isEdit = modalConfig.mode === 'edit';
      const url = isEdit ? `${API_URL}/products/${modalConfig.data._id}` : `${API_URL}/products`;
      const method = isEdit ? "PUT" : "POST";

      try {
          const res = await apiFetch(url, {
              method,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newProduct)
          });
          const json = await res.json();
          if (json.success) {
              if (isEdit) {
                  setProducts(products.map(p => p._id === modalConfig.data._id ? json.data : p));
              } else {
                  setProducts([json.data, ...products]);
              }
              setModalConfig({ isOpen: false, mode: 'add', data: null });
              setNewProduct(emptyProduct);
              setFormStep(1);
          }
      } catch (err) {
          toast.error(`Failed to ${isEdit ? 'update' : 'inject'} product.`);
      }
  };

  const handleProductImageUpload = async (e) => {
      const files = Array.from(e.target.files);
      if (!files.length) return;

      const currentCount = newProduct.images?.length || 0;
      const remaining = 5 - currentCount;
      if (remaining <= 0) {
          toast.error('Maximum 5 images allowed. Remove some to add more.');
          return;
      }
      const filesToUpload = files.slice(0, remaining);
      if (files.length > remaining) {
          toast(`Only ${remaining} slot(s) remaining. Uploading first ${remaining} file(s).`, { icon: '⚠️' });
      }

      setUploadingImage(true);
      const uploadedUrls = [];

      for (const file of filesToUpload) {
          const formData = new FormData();
          formData.append('image', file);
          try {
              const res = await apiFetch(`${API_URL}/upload`, { method: 'POST', body: formData });
              if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
              const json = await res.json();
              if (json.success) {
                  uploadedUrls.push(json.url);
              } else {
                  toast.error('Upload failed: ' + json.error);
              }
          } catch (err) {
              toast.error('Failed to upload: ' + err.message);
          }
      }

      if (uploadedUrls.length) {
          setNewProduct(prev => {
              const merged = [...(prev.images || []), ...uploadedUrls];
              return { ...prev, images: merged, image: merged[0] };
          });
          toast.success(`${uploadedUrls.length} image(s) uploaded!`);
      }
      setUploadingImage(false);
  };

  const handleRemoveProductImage = (index) => {
      setNewProduct(prev => {
          const updated = prev.images.filter((_, i) => i !== index);
          return { ...prev, images: updated, image: updated[0] || '' };
      });
  };

  const handleAddReview = () => {
      setNewProduct(prev => ({
          ...prev,
          ratings: {
              ...prev.ratings,
              reviews: [...(prev.ratings?.reviews || []), { reviewer: '', rating: 5, comment: '', date: new Date().toISOString() }]
          }
      }));
  };

  const handleUpdateReview = (index, field, value) => {
      setNewProduct(prev => {
          const updatedReviews = [...(prev.ratings?.reviews || [])];
          updatedReviews[index] = { ...updatedReviews[index], [field]: value };
          return { ...prev, ratings: { ...prev.ratings, reviews: updatedReviews } };
      });
  };

  const handleRemoveReview = (index) => {
      setNewProduct(prev => {
          const updatedReviews = prev.ratings.reviews.filter((_, i) => i !== index);
          return { ...prev, ratings: { ...prev.ratings, reviews: updatedReviews } };
      });
  };

  // Open Modal Helpers
  const openAddModal = () => {
      setNewProduct(emptyProduct);
      setModalConfig({ isOpen: true, mode: 'add', data: null });
      setFormStep(1);
  };

  const openEditModal = (product) => {
      setNewProduct({
          name: product.name || (product.capacity ? `${product.capacity} Ton AC` : ""),
          modelId: product.modelId || "",
          variant: product.variant || "Fixed Speed Range",
          description: product.description || "",
          mrp: product.mrp || product.price || "",
          image: product.image || "",
          images: product.images || (product.image ? [product.image] : []),
          quantity: product.quantity || 0,
          segment: product.segment || "",
          capacity: product.capacity || "",
          cooling_capacity: product.cooling_capacity || "",
          star: product.star || "",
          refrigerent: product.refrigerent || "",
          discount: product.discount || "",
          ratings: product.ratings || { rating: 0, total_reviews: 0, reviews: [] }
      });
      setModalConfig({ isOpen: true, mode: 'edit', data: product });
      setFormStep(1);
  };



  // Handle Delete Product
  const handleDelete = (id) => {
      setConfirmDialog({
          isOpen: true,
          message: "Are you sure you want to permanently delete this asset?",
          onConfirm: async () => {
              try {
                  const res = await apiFetch(`${API_URL}/products/${id}`, { method: "DELETE" });
                  const json = await res.json();
                  if (json.success) {
                      setProducts(products.filter(p => p._id !== id));
                      toast.success("Asset deleted successfully");
                  }
              } catch (err) {
                  toast.error("Failed to delete product.");
              }
              setConfirmDialog({ isOpen: false, message: '', onConfirm: null });
          }
      });
  };

  // Handle Update Order Status
  const handleUpdateOrderStatus = async (id, newStatus) => {
      if (newStatus === 'Refund Rejected') {
          setRefundRejectionDialog({ isOpen: true, orderId: id, reason: '' });
          return;
      }
      await updateOrderStatusAPI(id, newStatus);
  };

  const updateOrderStatusAPI = async (id, newStatus, rejectionReason = null) => {
      try {
          const body = { orderStatus: newStatus };
          if (rejectionReason) body.rejectionReason = rejectionReason;

          const res = await apiFetch(`${API_URL}/orders/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body)
          });
          const json = await res.json();
          if (json.success) {
              setOrders(orders.map(o => o._id === id ? json.data : o));
              toast.success(`Fulfillment status updated to ${newStatus}`);
          }
      } catch (err) {
          toast.error("Failed to update order status.");
      }
  };

  const submitRefundRejection = () => {
      if (!refundRejectionDialog.reason.trim()) {
          toast.error("Rejection reason is required.");
          return;
      }
      updateOrderStatusAPI(refundRejectionDialog.orderId, 'Refund Rejected', refundRejectionDialog.reason);
      setRefundRejectionDialog({ isOpen: false, orderId: null, reason: '' });
  };

  // Handle Delete Order
  const handleDeleteOrder = (id) => {
      setConfirmDialog({
          isOpen: true,
          message: "Are you sure you want to permanently delete this order?",
          onConfirm: async () => {
              try {
                  const res = await apiFetch(`${API_URL}/orders/${id}`, { method: "DELETE" });
                  const json = await res.json();
                  if (json.success) {
                      setOrders(orders.filter(o => o._id !== id));
                      toast.success("Order deleted successfully");
                  }
              } catch (err) {
                  toast.error("Failed to delete order.");
              }
              setConfirmDialog({ isOpen: false, message: '', onConfirm: null });
          }
      });
  };

  // Handle Refund Order
  const handleRefundOrder = async (id) => {
      setConfirmDialog({
          isOpen: true,
          message: "Are you sure you want to refund this order via Razorpay? This action is irreversible.",
          onConfirm: async () => {
              try {
                  const res = await apiFetch(`${API_URL}/orders/${id}/refund`, { method: "POST" });
                  const json = await res.json();
                  if (json.success) {
                      setOrders(orders.map(o => o._id === id ? json.data : o));
                      toast.success("Order refunded successfully");
                  } else {
                      toast.error("Refund failed: " + json.error);
                  }
              } catch (err) {
                  toast.error("Failed to process refund.");
              }
              setConfirmDialog({ isOpen: false, message: '', onConfirm: null });
          }
      });
  };

  // Handle Settings Update
  const handleSettingsSubmit = async (e) => {
      e.preventDefault();
      if (!settingsForm.currentPassword) {
          toast.error("Current password is required");
          return;
      }
      setLoading(true);
      try {
          const res = await apiFetch(`${API_URL}/admin/settings`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(settingsForm)
          });
          const json = await res.json();
          if (json.success) {
              toast.success(json.message || "Settings updated successfully");
              setSettingsForm({ email: '', currentPassword: '', newPassword: '' });
          } else {
              toast.error(json.error || "Failed to update settings");
          }
      } catch (err) {
          toast.error("An error occurred");
      } finally {
          setLoading(false);
      }
  };

  // Handle Social Wall Update
  const handleSocialWallSubmit = async (e, platform) => {
      e.preventDefault();
      setLoading(true);
      
      const payload = {};
      payload[platform] = socialWallForm[platform];

      try {
          const res = await apiFetch(`${API_URL}/social-wall`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
          });
          const json = await res.json();
          if (json.success) {
              toast.success(`${platform === 'instagram' ? 'Instagram' : 'Facebook'} post updated successfully`);
          } else {
              toast.error("Failed to update social wall");
          }
      } catch (err) {
          toast.error("An error occurred while updating social wall");
      } finally {
          setLoading(false);
      }
  };

  const handleSocialWallImageUpload = async (e, platform) => {
      const file = e.target.files[0];
      if (!file) return;

      if (uploadingImage) {
          toast.error('Please wait for the previous image to finish uploading.');
          return;
      }

      setUploadingImage(true);
      const formData = new FormData();
      formData.append('image', file);

      try {
          const res = await apiFetch(`${API_URL}/upload`, {
              method: 'POST',
              body: formData
          });
          
          if (!res.ok) {
              const text = await res.text();
              throw new Error(`Upload failed with status ${res.status}: ${text.substring(0, 50)}`);
          }
          
          const json = await res.json();
          if (json.success) {
              setSocialWallForm(prev => ({
                  ...prev,
                  [platform]: { ...prev[platform], imageUrl: json.url }
              }));
              toast.success(`${platform === 'instagram' ? 'Instagram' : 'Facebook'} image uploaded successfully!`);
          } else {
              toast.error('Image upload failed: ' + json.error);
          }
      } catch (err) {
          toast.error('Failed to upload image. Error: ' + err.message);
          console.error(err);
      } finally {
          setUploadingImage(false);
      }
  };

  // Handle Add Variant
  const handleAddVariant = async (e) => {
      e.preventDefault();
      if (!newVariantName.trim()) return;
      try {
          const res = await apiFetch(`${API_URL}/variants`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name: newVariantName })
          });
          const json = await res.json();
          if (json.success) {
              setVariants([json.data, ...variants]);
              setNewVariantName("");
          }
      } catch (err) {
          toast.error("Failed to inject variant to database.");
      }
  };

  // Handle Delete Variant
  const handleDeleteVariant = (id) => {
      setConfirmDialog({
          isOpen: true,
          message: "Permanently delete this variant? Products using this variant will keep the name but it won't be available for new deployments.",
          onConfirm: async () => {
              try {
                  const res = await apiFetch(`${API_URL}/variants/${id}`, { method: "DELETE" });
                  const json = await res.json();
                  if (json.success) {
                      setVariants(variants.filter(v => v._id !== id));
                      toast.success("Variant deleted successfully");
                  }
              } catch (err) {
                  toast.error("Failed to delete variant.");
              }
              setConfirmDialog({ isOpen: false, message: '', onConfirm: null });
          }
      });
  };

  // Handle Update Support Request Status
  const handleSupportStatusUpdate = async (type, id, newStatus) => {
      let endpoint = '';
      if (type === 'service') endpoint = 'service-requests';
      else if (type === 'installation') endpoint = 'installation-requests';
      else if (type === 'dealer') endpoint = 'dealer-requests';
      else if (type === 'feedback') endpoint = 'online-feedbacks';
      
      try {
          const res = await apiFetch(`${API_URL}/${endpoint}/${id}/status`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ status: newStatus })
          });
          const json = await res.json();
          if (json.success) {
              if (type === 'service') {
                  setServiceRequests(serviceRequests.map(req => req._id === id ? json.data : req));
              } else if (type === 'installation') {
                  setInstallations(installations.map(req => req._id === id ? json.data : req));
              } else if (type === 'dealer') {
                  setDealerRequests(dealerRequests.map(req => req._id === id ? json.data : req));
              } else if (type === 'feedback') {
                  setFeedbacks(feedbacks.map(req => req._id === id ? json.data : req));
              }
              toast.success(`Marked as ${newStatus}`);
          }
      } catch (err) {
          toast.error("Failed to update status.");
      }
  };

  // Handle Delete Support Request
  const handleSupportDelete = (type, id) => {
      let endpoint = '';
      if (type === 'service') endpoint = 'service-requests';
      else if (type === 'installation') endpoint = 'installation-requests';
      else if (type === 'dealer') endpoint = 'dealer-requests';
      else if (type === 'feedback') endpoint = 'online-feedbacks';

      setConfirmDialog({
          isOpen: true,
          message: "Are you sure you want to permanently delete this request?",
          onConfirm: async () => {
              try {
                  const res = await apiFetch(`${API_URL}/${endpoint}/${id}`, { method: "DELETE" });
                  const json = await res.json();
                  if (json.success) {
                      if (type === 'service') {
                          setServiceRequests(serviceRequests.filter(req => req._id !== id));
                      } else if (type === 'installation') {
                          setInstallations(installations.filter(req => req._id !== id));
                      } else if (type === 'dealer') {
                          setDealerRequests(dealerRequests.filter(req => req._id !== id));
                      } else if (type === 'feedback') {
                          setFeedbacks(feedbacks.filter(req => req._id !== id));
                      }
                      toast.success("Request deleted successfully");
                  }
              } catch (err) {
                  toast.error("Failed to delete request.");
              }
              setConfirmDialog({ isOpen: false, message: '', onConfirm: null });
          }
      });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-inter text-gray-900">
      
      {/* LEFT: Administrative Sidebar */}
      <aside className="w-full md:w-[280px] bg-[#0B1120] text-white md:h-screen relative md:fixed left-0 top-0 flex flex-col py-4 md:py-10 shadow-xl z-50 border-b md:border-b-0 md:border-r border-white/5">
        <div className="px-6 md:px-8 md:mb-16 flex justify-between items-center md:block">
          <div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
              Gree<span className="text-blue-500">IND</span>
            </h2>
            <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mt-1 md:mt-2 block">Admin Workspace</span>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <button 
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-bold uppercase tracking-widest text-[10px] transition-colors border border-white/10"
            >
              {isNavOpen ? <X size={14} /> : <LayoutDashboard size={14} />} Menu
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg font-bold uppercase tracking-widest text-[10px] transition-colors border border-red-500/20"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>

        <div className={`${isNavOpen ? 'block' : 'hidden'} md:block w-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:flex-grow mt-4 md:mt-0 absolute md:static top-full left-0 bg-[#0B1120] md:bg-transparent shadow-xl md:shadow-none border-b border-white/5 md:border-none max-h-[80vh] md:max-h-none z-50 py-4 md:py-0`}>
          <nav className="w-full px-4 flex flex-col gap-2 md:gap-0 md:space-y-2 pb-2 md:pb-0">
            <button 
              onClick={() => { setActiveTab("overview"); setIsNavOpen(false); }}
              className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2.5 md:py-3.5 rounded-lg md:rounded-xl font-bold tracking-wide transition-all text-sm md:text-base ${activeTab === "overview" ? "bg-blue-700/10 text-blue-500 border border-blue-600/20" : "hover:bg-white/5 text-gray-400 hover:text-white border border-transparent"}`}
            >
              <LayoutDashboard className="w-4 h-4 md:w-[18px] md:h-[18px]" /> <span className="whitespace-nowrap">Overview</span>
            </button>
            {/* --- GROUP: STORE --- */}
            <div className="flex flex-col gap-1">
              <button 
                onClick={() => toggleNavGroup('store')}
                className="w-full flex items-center justify-between px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-gray-300 transition-colors"
              >
                <span>Store Catalog</span>
                <ChevronDown size={14} className={`transition-transform ${navGroups.store ? 'rotate-180' : ''}`} />
              </button>
              {navGroups.store && (
                <div className="flex flex-col gap-1 ml-2 border-l border-white/5 pl-2">
                  <button 
                    onClick={() => { setActiveTab("products"); setIsNavOpen(false); }}
                    className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-3 py-2.5 rounded-lg md:rounded-xl font-bold tracking-wide transition-all text-sm md:text-base ${activeTab === "products" ? "bg-blue-700/10 text-blue-500 border border-blue-600/20" : "hover:bg-white/5 text-gray-400 hover:text-white border border-transparent"}`}
                  >
                    <Package className="w-4 h-4 md:w-[18px] md:h-[18px]" /> <span className="whitespace-nowrap">Inventory</span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab("variants"); setIsNavOpen(false); }}
                    className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-3 py-2.5 rounded-lg md:rounded-xl font-bold tracking-wide transition-all text-sm md:text-base ${activeTab === "variants" ? "bg-blue-700/10 text-blue-500 border border-blue-600/20" : "hover:bg-white/5 text-gray-400 hover:text-white border border-transparent"}`}
                  >
                    <Package className="w-4 h-4 md:w-[18px] md:h-[18px]" /> <span className="whitespace-nowrap">Variants</span>
                  </button>
                </div>
              )}
            </div>

            {/* --- GROUP: SALES --- */}
            <div className="flex flex-col gap-1 mt-2">
              <button 
                onClick={() => toggleNavGroup('sales')}
                className="w-full flex items-center justify-between px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-gray-300 transition-colors"
              >
                <span>Sales & Revenue</span>
                <ChevronDown size={14} className={`transition-transform ${navGroups.sales ? 'rotate-180' : ''}`} />
              </button>
              {navGroups.sales && (
                <div className="flex flex-col gap-1 ml-2 border-l border-white/5 pl-2">
                  <button 
                    onClick={() => { setActiveTab("orders"); setIsNavOpen(false); }}
                    className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-3 py-2.5 rounded-lg md:rounded-xl font-bold tracking-wide transition-all text-sm md:text-base ${activeTab === "orders" ? "bg-blue-700/10 text-blue-500 border border-blue-600/20" : "hover:bg-white/5 text-gray-400 hover:text-white border border-transparent"}`}
                  >
                    <Users className="w-4 h-4 md:w-[18px] md:h-[18px]" /> <span className="whitespace-nowrap">Orders</span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab("refunds"); setIsNavOpen(false); }}
                    className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-3 py-2.5 rounded-lg md:rounded-xl font-bold tracking-wide transition-all text-sm md:text-base ${activeTab === "refunds" ? "bg-red-700/10 text-red-500 border border-red-600/20" : "hover:bg-white/5 text-gray-400 hover:text-white border border-transparent"}`}
                  >
                    <AlertCircle className="w-4 h-4 md:w-[18px] md:h-[18px]" /> <span className="whitespace-nowrap">Refunds</span>
                  </button>
                </div>
              )}
            </div>

            {/* --- GROUP: SUPPORT --- */}
            <div className="flex flex-col gap-1 mt-2">
              <button 
                onClick={() => toggleNavGroup('support')}
                className="w-full flex items-center justify-between px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-gray-300 transition-colors"
              >
                <span>Support & Network</span>
                <ChevronDown size={14} className={`transition-transform ${navGroups.support ? 'rotate-180' : ''}`} />
              </button>
              {navGroups.support && (
                <div className="flex flex-col gap-1 ml-2 border-l border-white/5 pl-2">
                  <button 
                    onClick={() => { setActiveTab("service"); setIsNavOpen(false); }}
                    className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-3 py-2.5 rounded-lg md:rounded-xl font-bold tracking-wide transition-all text-sm md:text-base ${activeTab === "service" ? "bg-blue-700/10 text-blue-500 border border-blue-600/20" : "hover:bg-white/5 text-gray-400 hover:text-white border border-transparent"}`}
                  >
                    <Wrench className="w-4 h-4 md:w-[18px] md:h-[18px]" /> <span className="whitespace-nowrap">Service</span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab("installations"); setIsNavOpen(false); }}
                    className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-3 py-2.5 rounded-lg md:rounded-xl font-bold tracking-wide transition-all text-sm md:text-base ${activeTab === "installations" ? "bg-blue-700/10 text-blue-500 border border-blue-600/20" : "hover:bg-white/5 text-gray-400 hover:text-white border border-transparent"}`}
                  >
                    <Package className="w-4 h-4 md:w-[18px] md:h-[18px]" /> <span className="whitespace-nowrap">Installs</span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab("dealers"); setIsNavOpen(false); }}
                    className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-3 py-2.5 rounded-lg md:rounded-xl font-bold tracking-wide transition-all text-sm md:text-base ${activeTab === "dealers" ? "bg-blue-700/10 text-blue-500 border border-blue-600/20" : "hover:bg-white/5 text-gray-400 hover:text-white border border-transparent"}`}
                  >
                    <Briefcase className="w-4 h-4 md:w-[18px] md:h-[18px]" /> <span className="whitespace-nowrap">Dealers</span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab("feedbacks"); setIsNavOpen(false); }}
                    className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-3 py-2.5 rounded-lg md:rounded-xl font-bold tracking-wide transition-all text-sm md:text-base ${activeTab === "feedbacks" ? "bg-blue-700/10 text-blue-500 border border-blue-600/20" : "hover:bg-white/5 text-gray-400 hover:text-white border border-transparent"}`}
                  >
                    <Users className="w-4 h-4 md:w-[18px] md:h-[18px]" /> <span className="whitespace-nowrap">Feedbacks</span>
                  </button>
                </div>
              )}
            </div>

            {/* --- GROUP: OTHER --- */}
            <div className="flex flex-col gap-1 mt-2">
              <button 
                onClick={() => toggleNavGroup('other')}
                className="w-full flex items-center justify-between px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-gray-300 transition-colors"
              >
                <span>Other</span>
                <ChevronDown size={14} className={`transition-transform ${navGroups.other ? 'rotate-180' : ''}`} />
              </button>
              {navGroups.other && (
                <div className="flex flex-col gap-1 ml-2 border-l border-white/5 pl-2">
                  <button 
                    onClick={() => { setActiveTab("socialwall"); setIsNavOpen(false); }}
                    className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-3 py-2.5 rounded-lg md:rounded-xl font-bold tracking-wide transition-all text-sm md:text-base ${activeTab === "socialwall" ? "bg-blue-700/10 text-blue-500 border border-blue-600/20" : "hover:bg-white/5 text-gray-400 hover:text-white border border-transparent"}`}
                  >
                    <Briefcase className="w-4 h-4 md:w-[18px] md:h-[18px]" /> <span className="whitespace-nowrap">Social Wall</span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab("settings"); setIsNavOpen(false); }}
                    className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-3 py-2.5 rounded-lg md:rounded-xl font-bold tracking-wide transition-all text-sm md:text-base ${activeTab === "settings" ? "bg-blue-700/10 text-blue-500 border border-blue-600/20" : "hover:bg-white/5 text-gray-400 hover:text-white border border-transparent"}`}
                  >
                    <Settings className="w-4 h-4 md:w-[18px] md:h-[18px]" /> <span className="whitespace-nowrap">Settings</span>
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="hidden md:block w-full px-4 mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-colors border border-red-500/20"
          >
            <LogOut size={14} /> Terminate Session
          </button>
        </div>
      </aside>

      {/* RIGHT: Dashboard Main Viewer */}
      <main className="md:ml-[280px] flex-1 p-4 sm:p-6 md:p-10 lg:p-14 w-full overflow-hidden">
        
        <header className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-4 mb-8 md:mb-12">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                {activeTab === "overview" ? "Command Center" : activeTab === "products" ? "Inventory Matrix" : activeTab === "variants" ? "Variant Configurations" : activeTab === "orders" ? "Order Terminal" : activeTab === "service" ? "Service Requests" : activeTab === "installations" ? "Installations" : activeTab === "settings" ? "System Settings" : activeTab === "feedbacks" ? "Customer Feedbacks" : activeTab === "socialwall" ? "Social Wall Configurator" : "B2B Dealer Applications"}
            </h1>
            <p className="text-gray-500 font-medium mt-2 text-sm">
                {activeTab === "overview" ? "Live metrics and system diagnostics." : activeTab === "products" ? "Manage global infrastructure and stock levels." : activeTab === "variants" ? "Define allowed hardware designations." : activeTab === "orders" ? "Real-time fulfillment and order tracking." : activeTab === "service" ? "Manage technical support requests." : activeTab === "installations" ? "Manage product installations." : activeTab === "settings" ? "Manage admin credentials and system configuration." : activeTab === "feedbacks" ? "Review online feedback and customer inquiries." : activeTab === "socialwall" ? "Manage featured posts displayed on the homepage." : "Review B2B partnership applications."}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-200">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
            <span className="text-xs font-bold text-gray-700 tracking-widest uppercase">Network Secure</span>
          </div>
        </header>

        {/* --- TAB: OVERVIEW --- */}
        {activeTab === "overview" && (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-600/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 relative z-10">Active Infrastructure</h3>
                        <span className="text-4xl font-black text-gray-900 relative z-10">{products.length}</span>
                        <p className="text-emerald-500 text-xs font-bold mt-4 flex items-center gap-1 relative z-10">Assets Deployed</p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 relative z-10">Global Inventory Value</h3>
                        <span className="text-4xl font-black text-gray-900 relative z-10">
                            ₹{(products.reduce((acc, p) => acc + (p.quantity * (p.mrp || 45000)), 0) / 100000).toFixed(2)}M
                        </span>
                        <p className="text-blue-500 text-xs font-bold mt-4 flex items-center gap-1 relative z-10">Capital Tied Up</p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 relative z-10">Total Order Volume</h3>
                        <span className="text-4xl font-black text-gray-900 relative z-10">{orders.length}</span>
                        <p className="text-amber-500 text-xs font-bold mt-4 flex items-center gap-1 relative z-10">Registered Bookings</p>
                    </div>

                    <div className="bg-[#0B1120] text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500"><ChartNoAxesCombined size={120} /></div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 relative z-10">Variant Topology</h3>
                        <span className="text-4xl font-black text-white relative z-10">{variants.length}</span>
                        <p className="text-blue-500 text-xs font-bold mt-4 flex items-center gap-1 relative z-10">Active Designations</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
                    <h3 className="text-lg font-black text-gray-900 tracking-tight mb-6">Recent System Activity</h3>
                    <div className="space-y-4">
                        {orders.slice(0, 3).map((order, idx) => (
                            <div key={order._id || idx} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                                    {order.firstName ? order.firstName.charAt(0) : 'O'}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 text-sm">New Order #{order.orderId || order._id.toString().substring(0,6).toUpperCase()}</h4>
                                    <p className="text-xs font-medium text-gray-500">Placed by {order.firstName} {order.lastName}</p>
                                </div>
                                <div className="text-right">
                                    <span className="block font-black text-gray-900 text-sm">₹{order.totalAmount?.toLocaleString()}</span>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${order.paymentStatus === 'Completed' ? 'text-emerald-500' : 'text-amber-500'}`}>{order.paymentStatus === 'Completed' ? 'Paid' : order.paymentStatus}</span>
                                </div>
                            </div>
                        ))}
                        {orders.length === 0 && (
                            <p className="text-center text-sm font-bold text-gray-400 py-10">No recent activity detected.</p>
                        )}
                    </div>
                </div>
            </div>
        )}

        {/* --- TAB: PRODUCTS --- */}
        {activeTab === "products" && (
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
                    <table className="w-full text-left border-collapse">
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
                                    <td colSpan="4" className="p-10 text-center text-sm font-bold text-gray-400">Syncing with databank...</td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-10 text-center text-sm font-bold text-gray-400">No assets detected.</td>
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
        )}

        {/* --- TAB: VARIANTS --- */}
        {activeTab === "variants" && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">Variant Registry</h3>
                    <form onSubmit={handleAddVariant} className="flex items-center gap-3">
                        <input type="text" value={newVariantName} onChange={e => setNewVariantName(e.target.value)} required placeholder="New Variant Name..." className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 font-medium w-64" />
                        <button type="submit" className="flex items-center gap-2 bg-[#0B1120] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg whitespace-nowrap">
                            <Plus size={16} /> Register
                        </button>
                    </form>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse">
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
        )}

        {/* --- TAB: ORDERS & REFUNDS --- */}
        {(activeTab === "orders" || activeTab === "refunds") && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">
                        {activeTab === "refunds" ? "Refund Requests" : "Global Order Terminal"}
                    </h3>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-widest border-b border-gray-200">
                                <th className="p-5 pl-8 font-bold">Order ID</th>
                                <th className="p-5 font-bold">Customer</th>
                                <th className="p-5 font-bold">Items</th>
                                <th className="p-5 font-bold">Total</th>
                                <th className="p-5 font-bold">Payment</th>
                                <th className="p-5 font-bold">Status</th>
                                <th className="p-5 pr-8 text-right font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="p-10 text-center text-sm font-bold text-gray-400">Loading terminal data...</td>
                                </tr>
                            ) : (activeTab === "refunds" ? orders.filter(o => o.returnIssue) : orders).length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="p-10 text-center text-sm font-bold text-gray-400">
                                        {activeTab === "refunds" ? "No active refund requests." : "No active orders."}
                                    </td>
                                </tr>
                            ) : (activeTab === "refunds" ? orders.filter(o => o.returnIssue) : orders).map(order => (
                                <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 pl-8 text-xs font-mono font-bold text-blue-700 bg-blue-50/50">
                                        <div>#{order._id.substring(order._id.length - 8).toUpperCase()}</div>
                                        {order.returnIssue && (
                                            <div className="mt-2 text-[9px] bg-red-100 text-red-600 px-2 py-0.5 rounded uppercase tracking-widest inline-flex items-center gap-1 border border-red-200">
                                                <AlertCircle size={10} /> Refund Req.
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm font-bold text-gray-900">{order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                                        <p className="text-xs font-medium text-gray-500 mt-0.5">{order.customerInfo.email}</p>
                                        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{order.customerInfo.city}, {order.customerInfo.state}</p>
                                    </td>
                                    <td className="p-4">
                                        <ul className="text-xs font-medium text-gray-600 space-y-1.5">
                                            {order.orderItems.map((item, idx) => (
                                                <li key={idx} className="flex gap-2">
                                                    <span className="font-bold text-gray-900 bg-gray-100 px-1.5 rounded">{item.quantity}x</span> 
                                                    {item.name}
                                                </li>
                                            ))}
                                        </ul>
                                        {activeTab === "refunds" && (
                                            <div className="mt-3 flex flex-col gap-2">
                                                <a href={`${API_URL}/orders/${order._id}/invoice`} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 font-bold uppercase tracking-widest flex items-center gap-1 hover:text-blue-800 transition-colors">
                                                    <Eye size={12} /> System Invoice
                                                </a>
                                                {order.returnInvoice && (
                                                    <a href={order.returnInvoice.startsWith('http') ? order.returnInvoice : `${API_URL.replace('/api', '')}/${order.returnInvoice.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 font-bold uppercase tracking-widest flex items-center gap-1 hover:text-blue-800 transition-colors">
                                                        <Eye size={12} /> Customer Invoice
                                                    </a>
                                                )}
                                                {order.returnIssueMedia && (
                                                    <a href={order.returnIssueMedia.startsWith('http') ? order.returnIssueMedia : `${API_URL.replace('/api', '')}/${order.returnIssueMedia.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer" className="text-[10px] text-purple-600 font-bold uppercase tracking-widest flex items-center gap-1 hover:text-purple-800 transition-colors">
                                                        <Eye size={12} /> View Media
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4 text-sm font-black text-gray-900">₹{order.totalAmount.toLocaleString()}</td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-2 items-start">
                                            <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest ${order.paymentMethod === 'Pay With Razor Pay' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                                                {order.paymentMethod === 'Pay With Razor Pay' ? 'Razorpay' : order.paymentMethod === 'Pay with UPI' ? 'UPI' : order.paymentMethod}
                                            </span>
                                            <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest ${order.paymentStatus === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : order.paymentStatus === 'Failed' ? 'bg-red-50 text-red-600 border border-red-100' : order.paymentStatus === 'Delivered' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                                                {order.paymentStatus || 'Pending'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <select 
                                            value={order.orderStatus || 'Ordered'} 
                                            onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                                            className={`text-xs font-bold rounded-lg border outline-none px-2 py-1.5 cursor-pointer transition-colors ${
                                                order.orderStatus === 'Delivered' || order.orderStatus === 'Refund Accepted' || order.orderStatus === 'Refunded' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                order.orderStatus === 'Cancelled' || order.orderStatus === 'Refund Rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                                                order.orderStatus === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                order.orderStatus === 'Packed' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                order.orderStatus === 'Refund Requested' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                                'bg-blue-50 text-blue-800 border-blue-200'
                                            }`}
                                        >
                                            {activeTab === "refunds" ? (
                                                <>
                                                    <option value="Refund Requested">Refund Requested</option>
                                                    <option value="Refund Accepted">Refund Accepted</option>
                                                    <option value="Refund Rejected">Refund Rejected</option>
                                                    <option value="Refunded">Refunded</option>
                                                </>
                                            ) : (
                                                <>
                                                    <option value="Ordered">Ordered</option>
                                                    <option value="Packed">Packed</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                    <option value="Refund Requested">Refund Requested</option>
                                                </>
                                            )}
                                        </select>
                                    </td>
                                    <td className="p-4 pr-8 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => setOrderModal({ isOpen: true, data: order })} className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors" title="View Details">
                                                <Eye size={14} />
                                            </button>
                                            {(order.paymentStatus === 'Completed' && order.paymentMethod === 'Razorpay' || order.paymentMethod === 'Online') && (
                                                <button onClick={() => handleRefundOrder(order._id)} className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 text-amber-500 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors" title="Refund Order">
                                                    <span className="font-bold text-xs">₹</span>
                                                </button>
                                            )}
                                            <button onClick={() => handleDeleteOrder(order._id)} className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors" title="Delete Order">
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
        )}

        {/* --- TAB: SERVICE REQUESTS --- */}
        {activeTab === "service" && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">Technical Service Requests</h3>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-widest border-b border-gray-200">
                                <th className="p-5 pl-8 font-bold">Request ID</th>
                                <th className="p-5 font-bold">Customer Info</th>
                                <th className="p-5 font-bold">Product Details</th>
                                <th className="p-5 font-bold">Issue</th>
                                <th className="p-5 font-bold">Status</th>
                                <th className="p-5 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-sm font-bold text-gray-400">Loading service requests...</td>
                                </tr>
                            ) : serviceRequests.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-sm font-bold text-gray-400">No active service requests.</td>
                                </tr>
                            ) : serviceRequests.map(req => (
                                <tr key={req._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 pl-8 text-xs font-mono font-bold text-blue-700 bg-blue-50/50">
                                        #{req._id.substring(req._id.length - 8).toUpperCase()}
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm font-bold text-gray-900">{req.name}</p>
                                        <p className="text-xs font-medium text-gray-500 mt-0.5">{req.phone}</p>
                                        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{req.city}, {req.state}</p>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm font-bold text-gray-900">{req.productModel}</p>
                                        <p className="text-xs text-gray-500 font-mono mt-0.5">SN: {req.serialNumber}</p>
                                        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Purchased: {new Date(req.purchaseDate).toLocaleDateString()}</p>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-xs font-medium text-gray-700 line-clamp-2 max-w-xs">{req.issue}</p>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest ${req.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => setSupportModal({ isOpen: true, type: 'service', data: req })} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="View Details"><Eye size={16} /></button>
                                            <button onClick={() => handleSupportStatusUpdate('service', req._id, 'Resolved')} className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" title="Mark Resolved"><CheckCircle size={16} /></button>
                                            <button onClick={() => handleSupportDelete('service', req._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* --- TAB: INSTALLATIONS --- */}
        {activeTab === "installations" && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">Installation Appointments</h3>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-widest border-b border-gray-200">
                                <th className="p-5 pl-8 font-bold">Request ID</th>
                                <th className="p-5 font-bold">Customer Info</th>
                                <th className="p-5 font-bold">Address</th>
                                <th className="p-5 font-bold">Document</th>
                                <th className="p-5 font-bold">Status</th>
                                <th className="p-5 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-sm font-bold text-gray-400">Loading installation requests...</td>
                                </tr>
                            ) : installations.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-sm font-bold text-gray-400">No active installation requests.</td>
                                </tr>
                            ) : installations.map(req => (
                                <tr key={req._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 pl-8 text-xs font-mono font-bold text-emerald-600 bg-emerald-50/50">
                                        #{req._id.substring(req._id.length - 8).toUpperCase()}
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm font-bold text-gray-900">{req.name}</p>
                                        <p className="text-xs font-medium text-gray-500 mt-0.5">{req.phone}</p>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-xs font-medium text-gray-700 max-w-xs">{req.landmark}, {req.city}, {req.state} - {req.pincode}</p>
                                    </td>
                                    <td className="p-4">
                                        {req.billCopy ? (
                                            <a href={req.billCopy} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 hover:underline">View Bill Copy</a>
                                        ) : (
                                            <span className="text-xs text-gray-400">No Document</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest ${req.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => setSupportModal({ isOpen: true, type: 'installation', data: req })} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="View Details"><Eye size={16} /></button>
                                            <button onClick={() => handleSupportStatusUpdate('installation', req._id, 'Completed')} className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" title="Mark Completed"><CheckCircle size={16} /></button>
                                            <button onClick={() => handleSupportDelete('installation', req._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* --- TAB: DEALER REQUESTS --- */}
        {activeTab === "dealers" && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">B2B Dealer Applications</h3>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-widest border-b border-gray-200">
                                <th className="p-5 pl-8 font-bold">App ID</th>
                                <th className="p-5 font-bold">Business Name</th>
                                <th className="p-5 font-bold">Contact Person</th>
                                <th className="p-5 font-bold">Tax ID / GST</th>
                                <th className="p-5 font-bold">Status</th>
                                <th className="p-5 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-sm font-bold text-gray-400">Loading applications...</td>
                                </tr>
                            ) : dealerRequests.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-sm font-bold text-gray-400">No active applications.</td>
                                </tr>
                            ) : dealerRequests.map(req => (
                                <tr key={req._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 pl-8 text-xs font-mono font-bold text-blue-700 bg-blue-50/50">
                                        #{req._id.substring(req._id.length - 8).toUpperCase()}
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm font-bold text-gray-900">{req.businessName}</p>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm font-bold text-gray-900">{req.contactPerson}</p>
                                        <p className="text-xs font-medium text-gray-500 mt-0.5">{req.email}</p>
                                        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{req.phone}</p>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-xs font-medium text-gray-700 font-mono">{req.taxId}</p>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest ${req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : req.status === 'Rejected' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => setSupportModal({ isOpen: true, type: 'dealer', data: req })} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="View Details"><Eye size={16} /></button>
                                            <button onClick={() => handleSupportStatusUpdate('dealer', req._id, 'Approved')} className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" title="Approve"><CheckCircle size={16} /></button>
                                            <button onClick={() => handleSupportDelete('dealer', req._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* --- TAB: FEEDBACKS --- */}
        {activeTab === "feedbacks" && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">Online Feedbacks</h3>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-widest border-b border-gray-200">
                                <th className="p-5 pl-8 font-bold">Feedback ID</th>
                                <th className="p-5 font-bold">User Info</th>
                                <th className="p-5 font-bold">Product / Type</th>
                                <th className="p-5 font-bold">Status</th>
                                <th className="p-5 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-sm font-bold text-gray-400">Loading feedbacks...</td>
                                </tr>
                            ) : feedbacks.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-sm font-bold text-gray-400">No active feedbacks.</td>
                                </tr>
                            ) : feedbacks.map(req => (
                                <tr key={req._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 pl-8 text-xs font-mono font-bold text-blue-600 bg-blue-50/50">
                                        #{req._id.substring(req._id.length - 8).toUpperCase()}
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm font-bold text-gray-900">{req.name}</p>
                                        <p className="text-xs font-medium text-gray-500 mt-0.5">{req.email}</p>
                                        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{req.tel}</p>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm font-bold text-gray-900">{req.product}</p>
                                        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{req.type}</p>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest ${req.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : req.status === 'Reviewed' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => setSupportModal({ isOpen: true, type: 'feedback', data: req })} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="View Details"><Eye size={16} /></button>
                                            <button onClick={() => handleSupportStatusUpdate('feedback', req._id, 'Resolved')} className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" title="Mark Resolved"><CheckCircle size={16} /></button>
                                            <button onClick={() => handleSupportDelete('feedback', req._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* --- TAB: SOCIAL WALL --- */}
        {activeTab === "socialwall" && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-lg font-black text-gray-900 tracking-tight mb-6">Social Wall Configurator</h3>
                <div className="space-y-8">
                    {/* Instagram Config */}
                    <form onSubmit={(e) => handleSocialWallSubmit(e, 'instagram')} className="bg-pink-50/50 p-6 rounded-2xl border border-pink-100">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-pink-600 uppercase tracking-widest text-xs flex items-center gap-2">
                                <FaInstagram size={16} /> Instagram Featured Post
                            </h4>
                            <button type="submit" disabled={loading} className="bg-pink-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-pink-700 transition-colors shadow-md">
                                {loading ? 'Saving...' : 'Deploy Insta Post'}
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Image URL (Upload or Paste Link)</label>
                                <div className="flex gap-2">
                                    <input type="text" value={socialWallForm.instagram.imageUrl} onChange={e => setSocialWallForm({...socialWallForm, instagram: {...socialWallForm.instagram, imageUrl: e.target.value}})} className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-500" required />
                                    <label className="flex items-center justify-center bg-gray-900 text-white px-4 rounded-xl cursor-pointer hover:bg-black transition-colors text-xs font-bold uppercase tracking-widest whitespace-nowrap shadow-sm">
                                        Upload
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSocialWallImageUpload(e, 'instagram')} />
                                    </label>
                                </div>
                                {socialWallForm.instagram.imageUrl && (
                                    <div className="mt-2 w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                        <img src={socialWallForm.instagram.imageUrl} alt="Instagram preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Post Link URL</label>
                                <input type="text" value={socialWallForm.instagram.postUrl} onChange={e => setSocialWallForm({...socialWallForm, instagram: {...socialWallForm.instagram, postUrl: e.target.value}})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-500" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Likes Count</label>
                                <input type="text" value={socialWallForm.instagram.likes} onChange={e => setSocialWallForm({...socialWallForm, instagram: {...socialWallForm.instagram, likes: e.target.value}})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-500" required placeholder="e.g. 1,248 likes" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Date</label>
                                <input type="text" value={socialWallForm.instagram.date} onChange={e => setSocialWallForm({...socialWallForm, instagram: {...socialWallForm.instagram, date: e.target.value}})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-500" required placeholder="e.g. 2 DAYS AGO" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-500 mb-1">Caption</label>
                                <textarea rows="3" value={socialWallForm.instagram.caption} onChange={e => setSocialWallForm({...socialWallForm, instagram: {...socialWallForm.instagram, caption: e.target.value}})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-500" required></textarea>
                            </div>
                        </div>
                    </form>

                    {/* Facebook Config */}
                    <form onSubmit={(e) => handleSocialWallSubmit(e, 'facebook')} className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-blue-600 uppercase tracking-widest text-xs flex items-center gap-2">
                                <FaFacebookF size={16} /> Facebook Featured Post
                            </h4>
                            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-md">
                                {loading ? 'Saving...' : 'Deploy FB Post'}
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Image URL (Upload or Paste Link)</label>
                                <div className="flex gap-2">
                                    <input type="text" value={socialWallForm.facebook.imageUrl} onChange={e => setSocialWallForm({...socialWallForm, facebook: {...socialWallForm.facebook, imageUrl: e.target.value}})} className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500" required />
                                    <label className="flex items-center justify-center bg-gray-900 text-white px-4 rounded-xl cursor-pointer hover:bg-black transition-colors text-xs font-bold uppercase tracking-widest whitespace-nowrap shadow-sm">
                                        Upload
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSocialWallImageUpload(e, 'facebook')} />
                                    </label>
                                </div>
                                {socialWallForm.facebook.imageUrl && (
                                    <div className="mt-2 w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                        <img src={socialWallForm.facebook.imageUrl} alt="Facebook preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Post Link URL</label>
                                <input type="text" value={socialWallForm.facebook.postUrl} onChange={e => setSocialWallForm({...socialWallForm, facebook: {...socialWallForm.facebook, postUrl: e.target.value}})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Likes Count</label>
                                <input type="text" value={socialWallForm.facebook.likes} onChange={e => setSocialWallForm({...socialWallForm, facebook: {...socialWallForm.facebook, likes: e.target.value}})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500" required placeholder="e.g. 2.4K" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Date</label>
                                <input type="text" value={socialWallForm.facebook.date} onChange={e => setSocialWallForm({...socialWallForm, facebook: {...socialWallForm.facebook, date: e.target.value}})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500" required placeholder="e.g. 4 hrs" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-500 mb-1">Caption</label>
                                <textarea rows="3" value={socialWallForm.facebook.caption} onChange={e => setSocialWallForm({...socialWallForm, facebook: {...socialWallForm.facebook, caption: e.target.value}})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500" required></textarea>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {/* --- TAB: SETTINGS --- */}
        {activeTab === "settings" && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <span className="w-6 h-1 bg-blue-700 rounded-full inline-block"></span>
                    Update Credentials
                </h2>
                <form onSubmit={handleSettingsSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">New Email Address (Optional)</label>
                        <input 
                            type="email" 
                            value={settingsForm.email}
                            onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                            placeholder="Enter new email address"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">New Password (Optional)</label>
                        <div className="relative">
                            <input 
                                type={showNewPassword ? "text" : "password"} 
                                value={settingsForm.newPassword}
                                onChange={(e) => setSettingsForm({ ...settingsForm, newPassword: e.target.value })}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                                placeholder="Enter new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    <hr className="border-gray-100" />
                    <div>
                        <label className="block text-xs font-bold text-red-500 uppercase tracking-wider mb-2">Current Password (Required)</label>
                        <div className="relative">
                            <input 
                                type={showCurrentPassword ? "text" : "password"} 
                                required
                                value={settingsForm.currentPassword}
                                onChange={(e) => setSettingsForm({ ...settingsForm, currentPassword: e.target.value })}
                                className="w-full bg-red-50 border border-red-200 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/50"
                                placeholder="Enter current password to verify"
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-600 focus:outline-none"
                            >
                                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl font-bold uppercase text-sm tracking-widest transition-all shadow-md disabled:opacity-70 flex justify-center items-center gap-2"
                    >
                        {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <><Settings size={18} /> Update Settings</>}
                    </button>
                </form>
            </div>
        )}

      </main>

      {/* --- ADD / EDIT PRODUCT MODAL --- */}
      {modalConfig.isOpen && (
          <div className="fixed inset-0 z-[100] bg-[#0B1120]/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                      <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                          {modalConfig.mode === 'add' ? 'Deploy New Component' : 'Update Asset Data'}
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest">Step {formStep} of 3</span>
                      </h3>
                      <button onClick={() => { setModalConfig({ isOpen: false, mode: 'add', data: null }); setFormStep(1); }} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-900 transition-colors"><X size={16} /></button>
                  </div>
                  
                  <form onSubmit={handleModalSubmit} className="p-6 md:p-8 space-y-6">
                          {formStep === 1 && (
                              <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
                                  <div className="grid grid-cols-2 gap-6">
                                      <div className="space-y-2">
                                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Asset Name / Capacity</label>
                                          <input required type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 font-bold text-gray-900" placeholder="e.g. 1.6 Ton AC" />
                                      </div>
                                      <div className="space-y-2">
                                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Model ID</label>
                                          <input type="text" value={newProduct.modelId} onChange={e => setNewProduct({...newProduct, modelId: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 font-mono font-bold text-blue-800" placeholder="e.g. GWC18AGB-K6DNA1A" />
                                      </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-6">
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
                                      
                                      {/* Image Grid Preview */}
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
                                  <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Capacity (Tonnage)</label>
                                        <input required type="number" step="0.1" value={newProduct.capacity} onChange={e => setNewProduct({...newProduct, capacity: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 font-medium" placeholder="e.g. 1.6" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cooling Capacity (Watts)</label>
                                        <input type="number" value={newProduct.cooling_capacity} onChange={e => setNewProduct({...newProduct, cooling_capacity: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 font-medium" placeholder="e.g. 5200" />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Star Rating</label>
                                        <input required type="number" max="5" min="1" value={newProduct.star} onChange={e => setNewProduct({...newProduct, star: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 font-medium" placeholder="e.g. 5" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Refrigerant</label>
                                        <input type="text" value={newProduct.refrigerent} onChange={e => setNewProduct({...newProduct, refrigerent: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 font-medium" placeholder="e.g. R32" />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-3 gap-6">
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
                                      <textarea required rows={3} value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 resize-none font-medium"></textarea>
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
                                              <div className="grid grid-cols-2 gap-4 mb-3">
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
      )}

        {/* --- ORDER INFO MODAL --- */}
        {orderModal.isOpen && orderModal.data && (
            <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div className="bg-white rounded-[2rem] p-8 max-w-2xl w-full shadow-2xl relative animate-fadeInScale max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                        <h2 className="text-2xl font-black text-gray-900">Order #{orderModal.data._id.slice(-8).toUpperCase()}</h2>
                        <button onClick={() => setOrderModal({ isOpen: false, data: null })} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"><X size={16} /></button>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Customer Details</h3>
                                <p className="font-bold text-gray-900">{orderModal.data.customerInfo.firstName} {orderModal.data.customerInfo.lastName}</p>
                                <p className="text-sm text-gray-600">{orderModal.data.customerInfo.email}</p>
                                <p className="text-sm text-gray-600">{orderModal.data.customerInfo.phone}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Shipping Address</h3>
                                <p className="text-sm text-gray-900">{orderModal.data.customerInfo.apartment}, {orderModal.data.customerInfo.landmark}</p>
                                <p className="text-sm text-gray-900">{orderModal.data.customerInfo.district}, {orderModal.data.customerInfo.city}</p>
                                <p className="text-sm text-gray-900">{orderModal.data.customerInfo.state} - {orderModal.data.customerInfo.pincode}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Order Items</h3>
                            <div className="space-y-3">
                                {orderModal.data.orderItems.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <div className="flex gap-3 items-center">
                                            <span className="font-black text-gray-900 bg-white px-2 py-1 rounded shadow-sm border border-gray-100">{item.quantity}x</span>
                                            <div>
                                                <p className="font-bold text-sm text-gray-900">{item.name}</p>
                                            </div>
                                        </div>
                                        <p className="font-bold text-blue-700">₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {orderModal.data.returnIssue && (
                            <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                                <h3 className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <AlertCircle size={14} /> Refund / Return Requested
                                </h3>
                                <p className="text-sm text-gray-900 mb-3">{orderModal.data.returnIssue}</p>
                                {orderModal.data.returnIssueMedia ? (
                                    <a 
                                        href={orderModal.data.returnIssueMedia} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors"
                                    >
                                        <Eye size={14} /> View Attached Media
                                    </a>
                                ) : (
                                    <span className="text-xs font-bold text-gray-500">No Image/Video uploaded</span>
                                )}
                            </div>
                        )}

                        <div className="bg-[#0B1120] text-white p-5 rounded-2xl space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Payment Breakdown</p>
                                    <p className="text-sm font-medium">Subtotal</p>
                                    <p className="text-sm font-medium">Shipping</p>
                                    <p className="text-sm font-medium">GST (18%)</p>
                                </div>
                                <div className="text-right mt-4">
                                    <p className="text-sm font-bold">₹{orderModal.data.subtotal?.toLocaleString() || 'N/A'}</p>
                                    <p className="text-sm font-bold">₹{orderModal.data.shippingFee?.toLocaleString() || 'N/A'}</p>
                                    <p className="text-sm font-bold">₹{orderModal.data.gstAmount?.toLocaleString() || 'N/A'}</p>
                                </div>
                            </div>
                            
                            {orderModal.data.customerInfo?.gstNumber && (
                                <div className="bg-blue-950/30 p-3 rounded-lg border border-blue-600/20 flex justify-between items-center">
                                    <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">Customer GSTIN</span>
                                    <span className="text-sm font-mono font-bold text-white">{orderModal.data.customerInfo.gstNumber}</span>
                                </div>
                            )}

                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Final Amount</p>
                                    <p className="text-2xl font-black text-emerald-400">₹{orderModal.data.totalAmount.toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Gateway</p>
                                    <span className="bg-white/10 px-2 py-1 rounded text-xs font-bold">{orderModal.data.paymentMethod}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        
        {/* --- SUPPORT INFO MODAL --- */}
        {supportModal.isOpen && supportModal.data && (
            <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div className="bg-white rounded-[2rem] p-8 max-w-2xl w-full shadow-2xl relative animate-fadeInScale max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                        <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                            {supportModal.type === 'service' && <><Wrench className="text-blue-600" /> Service Request</>}
                            {supportModal.type === 'installation' && <><Package className="text-emerald-500" /> Installation Request</>}
                            {supportModal.type === 'dealer' && <><Briefcase className="text-blue-600" /> Dealer Application</>}
                            {supportModal.type === 'feedback' && <><Users className="text-blue-500" /> Customer Feedback</>}
                            <span className="text-gray-400 font-mono text-sm ml-2">#{supportModal.data._id.slice(-8).toUpperCase()}</span>
                        </h2>
                        <button onClick={() => setSupportModal({ isOpen: false, data: null, type: '' })} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"><X size={16} /></button>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
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
                                    <div className="grid grid-cols-2 gap-4">
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
        )}
        {/* --- CONFIRMATION DIALOG MODAL --- */}
        {confirmDialog.isOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative animate-fadeInScale flex flex-col text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <Trash2 size={30} className="text-red-500" />
                    </div>
                    <h2 className="text-xl font-black text-gray-900 mb-2">Confirm Action</h2>
                    <p className="text-sm font-medium text-gray-500 mb-8">{confirmDialog.message}</p>
                    <div className="flex gap-3 w-full">
                        <button 
                            onClick={() => setConfirmDialog({ isOpen: false, message: '', onConfirm: null })}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={confirmDialog.onConfirm}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )}
        {/* --- REFUND REJECTION DIALOG MODAL --- */}
        {refundRejectionDialog.isOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-fadeInScale flex flex-col text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <AlertCircle size={30} className="text-red-500" />
                    </div>
                    <h2 className="text-xl font-black text-gray-900 mb-2">Reject Refund Request</h2>
                    <p className="text-sm font-medium text-gray-500 mb-6">Please provide a reason for rejecting this refund. This will be emailed to the customer.</p>
                    <textarea
                        value={refundRejectionDialog.reason}
                        onChange={(e) => setRefundRejectionDialog(prev => ({ ...prev, reason: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none resize-none h-24 mb-6"
                        placeholder="e.g. Invoice does not match the product purchased."
                    />
                    <div className="flex gap-3 w-full">
                        <button 
                            onClick={() => setRefundRejectionDialog({ isOpen: false, orderId: null, reason: '' })}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={submitRefundRejection}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors"
                        >
                            Reject & Email
                        </button>
                    </div>
                </div>
            </div>
        )}
        
        <style jsx>{`
            @keyframes fadeInScale {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
            .animate-fadeInScale {
                animation: fadeInScale 0.2s ease-out forwards;
            }
        `}</style>
    </div>
  );
};

export default AdminDashboard;
