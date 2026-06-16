import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutDashboard, Package, Users, LogOut, ChartNoAxesCombined, Trash2, Plus, X, Eye, EyeOff, Edit3, Wrench, Briefcase, CheckCircle, Settings, AlertCircle, ChevronDown } from "lucide-react";
import { API_URL, apiFetch } from '../../config/api';
import toast from 'react-hot-toast';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

// Tabs
import AdminOverviewTab from './tabs/AdminOverviewTab';
import AdminProductsTab from './tabs/AdminProductsTab';
import AdminVariantsTab from './tabs/AdminVariantsTab';
import AdminOrdersTab from './tabs/AdminOrdersTab';
import AdminServiceTab from './tabs/AdminServiceTab';
import AdminInstallationsTab from './tabs/AdminInstallationsTab';
import AdminDealersTab from './tabs/AdminDealersTab';
import AdminFeedbacksTab from './tabs/AdminFeedbacksTab';
import AdminSocialWallTab from './tabs/AdminSocialWallTab';
import AdminSettingsTab from './tabs/AdminSettingsTab';

// Modals
import AdminProductModal from './modals/AdminProductModal';
import AdminOrderModal from './modals/AdminOrderModal';
import AdminSupportModal from './modals/AdminSupportModal';
import AdminConfirmDialog from './modals/AdminConfirmDialog';
import AdminRefundRejectionDialog from './modals/AdminRefundRejectionDialog';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { tab } = useParams();

  const getActiveTab = () => {
      if (!tab) return "overview";
      if (tab === "inventory") return "products";
      if (tab === "social-wall") return "socialwall";
      return tab;
  };
  
  const activeTab = getActiveTab();

  const setActiveTab = (newTab) => {
      if (newTab === "products") navigate("/admin/inventory");
      else if (newTab === "socialwall") navigate("/admin/social-wall");
      else if (newTab === "overview") navigate("/admin");
      else navigate(`/admin/${newTab}`);
  };

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

        <div className={`${isNavOpen ? 'block' : 'hidden'} md:block w-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:flex-grow mt-0 absolute md:static top-[100%] left-0 bg-[#0B1120] md:bg-transparent shadow-xl md:shadow-none border-b border-white/5 md:border-none max-h-[80vh] md:max-h-none z-50 py-4 md:py-0`}>
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
            <AdminOverviewTab 
                products={products} 
                orders={orders} 
                variants={variants} 
            />
        )}

        {/* --- TAB: PRODUCTS --- */}
        {activeTab === "products" && (
            <AdminProductsTab 
                products={products} 
                loading={loading} 
                openAddModal={openAddModal} 
                openEditModal={openEditModal} 
                handleDelete={handleDelete}
                navigate={navigate}
            />
        )}

        {/* --- TAB: VARIANTS --- */}
        {activeTab === "variants" && (
            <AdminVariantsTab 
                variants={variants} 
                newVariantName={newVariantName} 
                setNewVariantName={setNewVariantName} 
                handleAddVariant={handleAddVariant} 
                handleDeleteVariant={handleDeleteVariant} 
            />
        )}

        {/* --- TAB: ORDERS --- */}
        {(activeTab === "orders" || activeTab === "refunds") && (
            <AdminOrdersTab 
                activeTab={activeTab} 
                orders={orders} 
                loading={loading} 
                setOrderModal={setOrderModal} 
                handleUpdateOrderStatus={handleUpdateOrderStatus} 
                handleRefundOrder={handleRefundOrder} 
                handleDeleteOrder={handleDeleteOrder} 
                API_URL={API_URL}
            />
        )}

        {/* --- TAB: SERVICE --- */}
        {activeTab === "service" && (
            <AdminServiceTab 
                serviceRequests={serviceRequests} 
                loading={loading} 
                setSupportModal={setSupportModal} 
                handleSupportStatusUpdate={handleSupportStatusUpdate} 
                handleSupportDelete={handleSupportDelete} 
            />
        )}

        {/* --- TAB: INSTALLATIONS --- */}
        {activeTab === "installations" && (
            <AdminInstallationsTab 
                installations={installations} 
                loading={loading} 
                setSupportModal={setSupportModal} 
                handleSupportStatusUpdate={handleSupportStatusUpdate} 
                handleSupportDelete={handleSupportDelete} 
            />
        )}

        {/* --- TAB: DEALERS --- */}
        {activeTab === "dealers" && (
            <AdminDealersTab 
                dealerRequests={dealerRequests} 
                loading={loading} 
                setSupportModal={setSupportModal} 
                handleSupportStatusUpdate={handleSupportStatusUpdate} 
                handleSupportDelete={handleSupportDelete} 
            />
        )}

        {/* --- TAB: FEEDBACKS --- */}
        {activeTab === "feedbacks" && (
            <AdminFeedbacksTab 
                feedbacks={feedbacks} 
                loading={loading} 
                setSupportModal={setSupportModal} 
                handleSupportStatusUpdate={handleSupportStatusUpdate} 
                handleSupportDelete={handleSupportDelete} 
            />
        )}

        {/* --- TAB: SOCIAL WALL --- */}
        {activeTab === "socialwall" && (
            <AdminSocialWallTab 
                socialWallForm={socialWallForm} 
                setSocialWallForm={setSocialWallForm} 
                handleSocialWallSubmit={handleSocialWallSubmit} 
                handleSocialWallImageUpload={handleSocialWallImageUpload} 
                loading={loading} 
            />
        )}

        {/* --- TAB: SETTINGS --- */}
        {activeTab === "settings" && (
            <AdminSettingsTab 
                settingsForm={settingsForm} 
                setSettingsForm={setSettingsForm} 
                showNewPassword={showNewPassword} 
                setShowNewPassword={setShowNewPassword} 
                showCurrentPassword={showCurrentPassword} 
                setShowCurrentPassword={setShowCurrentPassword} 
                handleSettingsSubmit={handleSettingsSubmit} 
                loading={loading} 
            />
        )}

      </main>

      {/* --- ADD / EDIT PRODUCT MODAL --- */}
      <AdminProductModal 
          modalConfig={modalConfig} 
          setModalConfig={setModalConfig} 
          formStep={formStep} 
          setFormStep={setFormStep} 
          newProduct={newProduct} 
          setNewProduct={setNewProduct} 
          variants={variants} 
          handleModalSubmit={handleModalSubmit} 
          handleProductImageUpload={handleProductImageUpload} 
          handleRemoveProductImage={handleRemoveProductImage} 
          uploadingImage={uploadingImage} 
          handleAddReview={handleAddReview} 
          handleRemoveReview={handleRemoveReview} 
          handleUpdateReview={handleUpdateReview} 
      />

        {/* --- ORDER INFO MODAL --- */}
        <AdminOrderModal 
            orderModal={orderModal} 
            setOrderModal={setOrderModal} 
        />

        {/* --- SUPPORT INFO MODAL --- */}
        <AdminSupportModal 
            supportModal={supportModal} 
            setSupportModal={setSupportModal} 
        />
        {/* --- CONFIRMATION DIALOG MODAL --- */}
        <AdminConfirmDialog 
            confirmDialog={confirmDialog} 
            setConfirmDialog={setConfirmDialog} 
        />
        {/* --- REFUND REJECTION DIALOG MODAL --- */}
        <AdminRefundRejectionDialog 
            refundRejectionDialog={refundRejectionDialog} 
            setRefundRejectionDialog={setRefundRejectionDialog} 
            submitRefundRejection={submitRefundRejection} 
        />
        
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
