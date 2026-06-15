import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { API_URL, apiFetch } from '../config/api';
import { getSellingPrice, formatPrice } from '../utils/pricing';
import { useCart } from '../context/CartContext';
import { fetchLocationByPincode } from '../utils/pincode';
import { Lock, CreditCard, MapPin, Truck, CheckCircle, Download, ChevronDown, User, Mail, Phone } from 'lucide-react';
import { INDIAN_STATES } from '../utils/states';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const CheckoutPage = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    
    const directBuyItem = location.state?.directBuyItem;
    const checkoutItems = directBuyItem ? [directBuyItem] : cartItems;
    const checkoutTotal = directBuyItem ? getSellingPrice(directBuyItem) * directBuyItem.quantity : cartTotal;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        landmark: '',
        district: '',
        apartment: '',
        city: '',
        state: '',
        pincode: '',
        gstNumber: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('Paytm Business');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccessData, setOrderSuccessData] = useState(null);
    const [checkoutStep, setCheckoutStep] = useState(1);
    const [errors, setErrors] = useState({});

    const handleContinueToStep2 = () => {
        const inputs = ['firstName', 'lastName', 'email', 'phone'];
        let newErrors = {};
        let isValid = true;
        
        inputs.forEach(name => {
            if (!formData[name] || formData[name].trim() === '') {
                newErrors[name] = true;
                isValid = false;
            }
        });
        
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = true;
            isValid = false;
            toast.error("Please enter a valid email address.");
        }

        if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = true;
            isValid = false;
            toast.error("Please enter a valid 10-digit phone number.");
        }

        setErrors(prev => ({...prev, ...newErrors}));

        if (isValid) {
            setCheckoutStep(2);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleContinueToStep3 = () => {
        const inputs = ['apartment', 'district', 'city', 'state', 'pincode'];
        let newErrors = {};
        let isValid = true;
        
        inputs.forEach(name => {
            if (!formData[name] || formData[name].trim() === '') {
                newErrors[name] = true;
                isValid = false;
            }
        });

        if (formData.pincode && formData.pincode.trim().length !== 6) {
            newErrors.pincode = true;
            isValid = false;
            toast.error("Please enter a valid 6-digit PIN code.");
        }

        setErrors(prev => ({...prev, ...newErrors}));

        if (isValid) {
            setCheckoutStep(3);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Redirect to cart if empty (unless order succeeded)
    React.useEffect(() => {
        if (!directBuyItem && cartItems.length === 0 && !orderSuccessData) {
            navigate('/cart');
        }
    }, [cartItems, navigate, orderSuccessData, directBuyItem]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (value.trim() !== '') {
            setErrors(prev => ({ ...prev, [name]: false }));
        }
        
        if (name === 'pincode' && value.length === 6) {
            const location = await fetchLocationByPincode(value);
            if (location) {
                setFormData(prev => ({
                    ...prev,
                    district: location.district,
                    city: location.city,
                    state: location.state
                }));
            }
        }
    };

    const loadPaytmScript = () => {
        return new Promise((resolve) => {
            const mid = import.meta.env.VITE_PAYTM_MID || 'YOUR_PAYTM_MID_HERE';
            const isProd = import.meta.env.VITE_PAYTM_ENVIRONMENT === 'PROD';
            const hostname = isProd ? 'securegw.paytm.in' : 'securegw-stage.paytm.in';
            const script = document.createElement("script");
            script.src = `https://${hostname}/merchantpgpui/checkoutjs/merchants/${mid}.js`;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const calculateShipping = (state) => {
        if (!state || state.trim() === '') return 0;
        const st = state.toLowerCase().trim();
        
        // North
        if (st.includes('delhi') || st.includes('punjab') || st.includes('haryana') || st.includes('himachal') || st.includes('jammu') || st.includes('kashmir') || st.includes('uttarakhand') || st.includes('uttar pradesh') || st.includes('chandigarh')) {
            return 2000;
        }
        // South
        if (st.includes('kerala') || st.includes('tamil nadu') || st.includes('karnataka') || st.includes('andhra') || st.includes('telangana') || st.includes('puducherry')) {
            return 3500;
        }
        // West
        if (st.includes('maharashtra') || st.includes('gujarat') || st.includes('rajasthan') || st.includes('goa') || st.includes('dadra') || st.includes('daman')) {
            return 2500;
        }
        // East / NE / Island
        if (st.includes('west bengal') || st.includes('bihar') || st.includes('odisha') || st.includes('jharkhand') || st.includes('assam') || st.includes('sikkim') || st.includes('meghalaya') || st.includes('tripura') || st.includes('arunachal') || st.includes('manipur') || st.includes('mizoram') || st.includes('nagaland') || st.includes('andaman') || st.includes('lakshadweep')) {
            return 4500;
        }
        // Central
        if (st.includes('madhya pradesh') || st.includes('chhattisgarh')) {
            return 2200;
        }
        
        return 2000; // Default fallback
    };

    const shippingFee = calculateShipping(formData.state);
    const subtotal = checkoutTotal;
    const isValidGST = (gst) => {
        if (!gst || gst.trim() === '') return false;
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i;
        return gstRegex.test(gst.trim());
    };

    const isGstValid = isValidGST(formData.gstNumber);
    const showGstError = formData.gstNumber && formData.gstNumber.trim().length > 0 && !isGstValid;
    const gstAmount = isGstValid ? 0 : Math.round(subtotal * 0.18);
    const finalTotal = subtotal + shippingFee + gstAmount;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const orderData = {
            customerInfo: formData,
            orderItems: checkoutItems.map(item => ({
                productId: item._id,
                name: item.name || `${item.capacity} Ton AC`,
                capacity: item.capacity,
                quantity: item.quantity,
                price: getSellingPrice(item)
            })),
            totalAmount: finalTotal,
            subtotal: subtotal,
            shippingFee: shippingFee,
            gstAmount: gstAmount,
            paymentMethod: paymentMethod
        };

        if (paymentMethod === 'Pay (Free)') {
            try {
                const orderRes = await apiFetch(`${API_URL}/orders/free-order`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData)
                });
                const orderDataResult = await orderRes.json();
                
                if (orderDataResult.success) {
                    if (!directBuyItem) clearCart();
                    
                    // Save to localStorage for tracking
                    const existingOrders = JSON.parse(localStorage.getItem('gree_user_orders') || '[]');
                    if (!existingOrders.includes(orderDataResult.data._id)) {
                        existingOrders.push(orderDataResult.data._id);
                        localStorage.setItem('gree_user_orders', JSON.stringify(existingOrders));
                    }

                    setOrderSuccessData(orderDataResult.data);
                } else {
                    toast.error('Order Placement Failed: ' + (orderDataResult.error || 'Unknown error'));
                }
            } catch (err) {
                console.error("Free order error", err);
                toast.error('Error placing free order.');
            } finally {
                setIsSubmitting(false);
            }
            return;
        }

        const resScript = await loadPaytmScript();
        if (!resScript) {
            toast.error("Paytm SDK failed to load. Are you online?");
            setIsSubmitting(false);
            return;
        }

        try {
            // Generate Idempotency Key
            const idempotencyKey = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);

            // 1. Create Paytm Order on Backend & Reserve Stock
            const rpRes = await apiFetch(`${API_URL}/orders/paytm-create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...orderData, amount: finalTotal, currency: "INR", idempotencyKey })
            });
            const rpData = await rpRes.json();
            
            if (!rpData.success) {
                toast.error('Failed to initialize payment gateway: ' + (rpData.error || 'Unknown error'));
                setIsSubmitting(false);
                return;
            }

            // 2. Open Paytm Widget
            const config = {
                "root": "",
                "flow": "DEFAULT",
                "data": {
                    "orderId": rpData.orderId, 
                    "token": rpData.txnToken, 
                    "tokenType": "TXN_TOKEN",
                    "amount": finalTotal
                },
                "handler": {
                    "notifyMerchant": function(eventName, data) {
                        console.log("Paytm notifyMerchant:", eventName, data);
                    },
                    "transactionStatus": async function(paymentStatus) {
                        try {
                            // 3. Payment Success/Failure - Verify Checksum and Complete Order
                            const verificationData = {
                                dbOrderId: rpData.dbOrder._id,
                                paytmOrderId: paymentStatus.ORDERID,
                                paytmTransactionId: paymentStatus.TXNID,
                                paytmChecksum: paymentStatus.CHECKSUMHASH || '',
                                paytmResponseParams: paymentStatus
                            };

                            if (paymentStatus.STATUS === 'TXN_SUCCESS') {
                                const orderRes = await apiFetch(`${API_URL}/orders`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(verificationData)
                                });
                                const orderDataResult = await orderRes.json();
                                
                                if (orderDataResult.success) {
                                    if (!directBuyItem) clearCart();
                                    
                                    // Save to localStorage for tracking
                                    const existingOrders = JSON.parse(localStorage.getItem('gree_user_orders') || '[]');
                                    if (!existingOrders.includes(orderDataResult.data._id)) {
                                        existingOrders.push(orderDataResult.data._id);
                                        localStorage.setItem('gree_user_orders', JSON.stringify(existingOrders));
                                    }

                                    setOrderSuccessData(orderDataResult.data);
                                } else {
                                    toast.error('Order Placement Failed: ' + (orderDataResult.error || 'Unknown error'));
                                    setIsSubmitting(false);
                                }
                            } else {
                                toast.error('Payment Failed: ' + (paymentStatus.RESPMSG || 'Unknown reason'));
                                setIsSubmitting(false);
                            }
                        } catch (err) {
                            console.error("Verification error", err);
                            toast.error('Error verifying payment & placing order.');
                            setIsSubmitting(false);
                        }
                        window.Paytm.CheckoutJS.close();
                    }
                }
            };

            if (window.Paytm && window.Paytm.CheckoutJS) {
                window.Paytm.CheckoutJS.onLoad(function() {
                    window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                        window.Paytm.CheckoutJS.invoke();
                    }).catch(function onError(error){
                        console.error("Paytm init error", error);
                        toast.error('Error initializing payment modal.');
                        setIsSubmitting(false);
                    });
                });
            } else {
                 toast.error('Paytm SDK not loaded.');
                 setIsSubmitting(false);
            }

        } catch (error) {
            console.error("Order error", error);
            toast.error('An error occurred while placing the order.');
            setIsSubmitting(false);
        }
    };

    if (checkoutItems.length === 0 && !orderSuccessData) return null;

    return (
        <>
            <Helmet>
                <title>Secure Checkout | GREE INDIA</title>
            </Helmet>
            <div className="pt-32 pb-20 min-h-screen font-inter relative flex items-center justify-center bg-[#fafafa]">
                {/* Abstract Background */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px] mix-blend-multiply"></div>
                    <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-purple-500/20 rounded-full blur-[120px] mix-blend-multiply"></div>
                    <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[80px]"></div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-[1400px] w-full mx-auto px-4 lg:px-8 relative z-10"
                >
                    <div className="bg-white/70 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.08)] border border-white flex flex-col lg:flex-row overflow-hidden relative">
                        
                        {/* Left Side: Form */}
                        <div className="w-full lg:w-[60%] xl:w-[65%] flex flex-col p-6 lg:p-10 bg-white/80 relative z-10">
                            <div className="mb-8 flex flex-col items-center lg:items-start text-center lg:text-left">
                                <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                                        <Lock size={20} />
                                    </div>
                                    Secure Checkout
                                </h1>
                                <p className="text-gray-500 font-medium">Complete your order securely.</p>
                            </div>

                            <div className="flex-grow w-full max-w-3xl mx-auto lg:mx-0">
                                <form id="checkout-form" onSubmit={handleSubmit} noValidate className="space-y-6">
                                    
                                    {/* Progress Indicator */}
                                    <div className="mb-10 relative">
                                        <div className="flex items-center justify-between relative z-10 px-2">
                                            {[1, 2, 3].map((num) => (
                                                <div key={num} className="flex flex-col items-center gap-2">
                                                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-lg transition-all duration-500 ${checkoutStep >= num ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-110' : 'bg-gray-100 text-gray-400'}`}>
                                                        {checkoutStep > num ? <CheckCircle size={20} /> : num}
                                                    </div>
                                                    <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-500 ${checkoutStep >= num ? 'text-blue-600' : 'text-gray-400'}`}>
                                                        {num === 1 ? 'Contact' : num === 2 ? 'Shipping' : 'Payment'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="absolute left-6 right-6 top-5 md:top-6 -translate-y-1/2 h-1 bg-gray-100 rounded-full z-0">
                                            <div 
                                                className="absolute left-0 top-0 h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                                                style={{ width: `${((checkoutStep - 1) / 2) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50/50 rounded-[2rem] border border-gray-100 p-6 md:p-8 relative overflow-hidden">
                                        <AnimatePresence mode="wait">
                                            {checkoutStep === 1 && (
                                                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                                    <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Contact Details</h2>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div>
                                                            <label className={`block text-[11px] font-black uppercase tracking-widest mb-3 ${errors.firstName ? 'text-red-500' : 'text-gray-900'}`}>First Name <span className="text-red-500">*</span></label>
                                                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={`w-full bg-white border-2 rounded-2xl px-6 py-3.5 text-sm font-bold focus:outline-none transition-all duration-300 ${errors.firstName ? 'border-red-500 text-red-600 focus:ring-4 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 hover:border-gray-300 text-gray-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 shadow-sm'}`} />
                                                        </div>
                                                        <div>
                                                            <label className={`block text-[11px] font-black uppercase tracking-widest mb-3 ${errors.lastName ? 'text-red-500' : 'text-gray-900'}`}>Last Name <span className="text-red-500">*</span></label>
                                                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={`w-full bg-white border-2 rounded-2xl px-6 py-3.5 text-sm font-bold focus:outline-none transition-all duration-300 ${errors.lastName ? 'border-red-500 text-red-600 focus:ring-4 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 hover:border-gray-300 text-gray-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 shadow-sm'}`} />
                                                        </div>
                                                        <div className="md:col-span-2">
                                                            <label className={`block text-[11px] font-black uppercase tracking-widest mb-3 ${errors.email ? 'text-red-500' : 'text-gray-900'}`}>Email Address <span className="text-red-500">*</span></label>
                                                            <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full bg-white border-2 rounded-2xl px-6 py-3.5 text-sm font-bold focus:outline-none transition-all duration-300 ${errors.email ? 'border-red-500 text-red-600 focus:ring-4 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 hover:border-gray-300 text-gray-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 shadow-sm'}`} />
                                                        </div>
                                                        <div className="md:col-span-2">
                                                            <label className={`block text-[11px] font-black uppercase tracking-widest mb-3 ${errors.phone ? 'text-red-500' : 'text-gray-900'}`}>Phone Number <span className="text-red-500">*</span></label>
                                                            <input type="tel" maxLength="10" name="phone" value={formData.phone} onChange={handleChange} className={`w-full bg-white border-2 rounded-2xl px-6 py-3.5 text-sm font-bold focus:outline-none transition-all duration-300 ${errors.phone ? 'border-red-500 text-red-600 focus:ring-4 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 hover:border-gray-300 text-gray-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 shadow-sm'}`} placeholder="10 Digit Mobile Number" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-8 flex justify-end">
                                                        <button 
                                                            type="button" 
                                                            onClick={handleContinueToStep2}
                                                            className="w-full md:w-auto group bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)] hover:-translate-y-1 flex justify-center items-center gap-3"
                                                        >
                                                            Continue to Shipping <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {checkoutStep === 2 && (
                                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                                    <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Shipping Address</h2>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div>
                                                            <label className={`block text-[11px] font-black uppercase tracking-widest mb-3 ${errors.pincode ? 'text-red-500' : 'text-gray-900'}`}>PIN Code <span className="text-red-500">*</span></label>
                                                            <input type="text" maxLength="6" name="pincode" value={formData.pincode} onChange={handleChange} className={`w-full bg-white border-2 rounded-2xl px-6 py-3.5 text-sm font-bold focus:outline-none transition-all duration-300 ${errors.pincode ? 'border-red-500 text-red-600 focus:ring-4 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 hover:border-gray-300 text-gray-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 shadow-sm'}`} placeholder="6 Digit PIN" />
                                                        </div>
                                                        <div>
                                                            <label className={`block text-[11px] font-black uppercase tracking-widest mb-3 ${errors.city ? 'text-red-500' : 'text-gray-900'}`}>City <span className="text-red-500">*</span></label>
                                                            <input type="text" name="city" value={formData.city} onChange={handleChange} className={`w-full bg-white border-2 rounded-2xl px-6 py-3.5 text-sm font-bold focus:outline-none transition-all duration-300 ${errors.city ? 'border-red-500 text-red-600 focus:ring-4 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 hover:border-gray-300 text-gray-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 shadow-sm'}`} />
                                                        </div>
                                                        <div>
                                                            <label className={`block text-[11px] font-black uppercase tracking-widest mb-3 ${errors.district ? 'text-red-500' : 'text-gray-900'}`}>District <span className="text-red-500">*</span></label>
                                                            <input type="text" name="district" value={formData.district} onChange={handleChange} className={`w-full bg-white border-2 rounded-2xl px-6 py-3.5 text-sm font-bold focus:outline-none transition-all duration-300 ${errors.district ? 'border-red-500 text-red-600 focus:ring-4 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 hover:border-gray-300 text-gray-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 shadow-sm'}`} />
                                                        </div>
                                                        <div className="relative">
                                                            <label className={`block text-[11px] font-black uppercase tracking-widest mb-3 ${errors.state ? 'text-red-500' : 'text-gray-900'}`}>State <span className="text-red-500">*</span></label>
                                                            <select name="state" value={formData.state} onChange={handleChange} className={`w-full bg-white border-2 rounded-2xl px-6 py-3.5 text-sm font-bold focus:outline-none transition-all duration-300 appearance-none cursor-pointer ${errors.state ? 'border-red-500 text-red-600 focus:ring-4 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 hover:border-gray-300 text-gray-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 shadow-sm'}`}>
                                                                <option value="">Select State / UT</option>
                                                                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                                                            </select>
                                                            <div className="absolute right-6 top-[50px] pointer-events-none text-gray-400">
                                                                <ChevronDown size={20} />
                                                            </div>
                                                        </div>
                                                        <div className="md:col-span-2">
                                                            <label className={`block text-[11px] font-black uppercase tracking-widest mb-3 ${errors.apartment ? 'text-red-500' : 'text-gray-900'}`}>Apartment / Flat / Suite <span className="text-red-500">*</span></label>
                                                            <input type="text" name="apartment" value={formData.apartment} onChange={handleChange} className={`w-full bg-white border-2 rounded-2xl px-6 py-3.5 text-sm font-bold focus:outline-none transition-all duration-300 ${errors.apartment ? 'border-red-500 text-red-600 focus:ring-4 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 hover:border-gray-300 text-gray-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 shadow-sm'}`} placeholder="House No., Building Name" />
                                                        </div>
                                                        <div className="md:col-span-2">
                                                            <label className={`block text-[11px] font-black uppercase tracking-widest mb-3 ${errors.landmark ? 'text-red-500' : 'text-gray-900'}`}>Landmark (Optional)</label>
                                                            <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} className={`w-full bg-white border-2 rounded-2xl px-6 py-3.5 text-sm font-bold focus:outline-none transition-all duration-300 ${errors.landmark ? 'border-red-500 text-red-600 focus:ring-4 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 hover:border-gray-300 text-gray-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 shadow-sm'}`} placeholder="Near a known place" />
                                                        </div>
                                                        <div className="md:col-span-2 mt-2">
                                                            <label className="block text-[11px] font-black text-gray-900 uppercase tracking-widest mb-3">GST Number (Optional)</label>
                                                            <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} className={`w-full bg-white border-2 rounded-2xl px-6 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 transition-all duration-300 ${showGstError ? 'border-red-400 focus:ring-red-500/10 text-red-900' : isGstValid ? 'border-emerald-400 focus:ring-emerald-500/10 text-emerald-900' : 'border-gray-200 hover:border-gray-300 text-gray-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 shadow-sm'}`} placeholder="Enter Valid 15-digit GST Number" />
                                                            {showGstError && <p className="text-red-500 text-xs mt-2 font-black tracking-wide">Please enter a valid GST number format.</p>}
                                                            {isGstValid && <p className="text-emerald-600 text-xs mt-2 font-black flex items-center gap-1 tracking-wide"><CheckCircle size={14}/> Valid GST Number. 18% GST Exempted.</p>}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="mt-8 flex justify-between pt-6 border-t border-gray-100">
                                                        <button 
                                                            type="button" 
                                                            onClick={() => setCheckoutStep(1)}
                                                            className="w-auto bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300"
                                                        >
                                                            Back
                                                        </button>
                                                        <button 
                                                            type="button" 
                                                            onClick={handleContinueToStep3}
                                                            className="w-auto group bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)] hover:-translate-y-1 flex justify-center items-center gap-3"
                                                        >
                                                            Proceed to Payment <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {checkoutStep === 3 && (
                                                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                                    <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Payment Method</h2>
                                                    <div className="space-y-4">
                                                        <label className={`relative flex items-center gap-5 p-5 rounded-2xl border-2 transition-all duration-300 opacity-60 cursor-not-allowed bg-gray-50 border-gray-200 overflow-hidden`}>
                                                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZTllOWU5IiAvPgo8L3N2Zz4=')] opacity-50"></div>
                                                            <input 
                                                                type="radio" 
                                                                name="paymentMethod" 
                                                                value="Paytm Business"
                                                                checked={paymentMethod === 'Paytm Business'}
                                                                disabled
                                                                className="w-5 h-5 text-gray-400 cursor-not-allowed z-10"
                                                            />
                                                            <div className="flex-grow z-10">
                                                                <span className="font-black text-gray-900 text-lg flex items-center gap-2">Paytm Business <span className="bg-gray-200 text-gray-600 text-[9px] uppercase px-2 py-0.5 rounded-full tracking-widest">Maintenance</span></span>
                                                                <span className="text-xs font-bold text-gray-500 mt-1 block">Currently unavailable. Securely pay online via Credit/Debit Cards, UPI, or Netbanking.</span>
                                                            </div>
                                                            <CreditCard size={32} className="text-gray-300 z-10 hidden sm:block" />
                                                        </label>
                                                    </div>
                                                    <div className="mt-8 flex flex-col-reverse sm:flex-row justify-between pt-6 border-t border-gray-100 gap-4">
                                                        <button 
                                                            type="button" 
                                                            onClick={() => setCheckoutStep(2)}
                                                            className="w-full sm:w-auto bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300"
                                                        >
                                                            Back
                                                        </button>
                                                        <button 
                                                            type="submit" 
                                                            disabled={isSubmitting || paymentMethod === 'Paytm Business' || !paymentMethod}
                                                            className="w-full sm:w-auto group bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.4)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-3"
                                                        >
                                                            {isSubmitting ? 'Processing...' : 'Confirm Order'} <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>

                        {/* Right: Order Summary */}
                        <div className="w-full lg:w-[40%] xl:w-[35%] bg-[#0A0A0A] text-white relative border-t lg:border-t-0 lg:border-l border-gray-800 p-6 lg:p-10 overflow-hidden">
                            {/* Inner glow & Texture */}
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+Cjwvc3ZnPg==')] opacity-50 z-0"></div>
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 z-0"></div>
                            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600/10 blur-[80px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2 z-0"></div>
                            
                            <div className="relative z-10 h-full flex flex-col">
                                <h2 className="text-xs font-black mb-8 pb-4 border-b border-white/10 uppercase tracking-[0.3em] text-gray-400 flex items-center justify-between">
                                    <span>Order Summary</span>
                                    <span className="bg-white/10 px-3 py-1 rounded-full text-white">{checkoutItems.length} {checkoutItems.length === 1 ? 'Item' : 'Items'}</span>
                               </h2>
                                
                                <div className="space-y-4 mb-8 flex-shrink-0">
                                    {checkoutItems.map(item => (
                                        <div key={item._id} className="flex gap-4 group items-center bg-white/[0.02] border border-white/[0.05] p-3 rounded-2xl hover:bg-white/[0.04] transition-all duration-300">
                                            <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 p-2 border border-white/10 relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <img src={item.image || `https://placehold.co/100x100?text=AC`} alt="Product" className="object-contain h-full w-full mix-blend-screen relative z-10 drop-shadow-lg" />
                                            </div>
                                            <div className="flex-grow flex flex-col justify-center">
                                                <h4 className="text-sm font-bold text-gray-200 line-clamp-1 group-hover:text-white transition-colors">{item.capacity ? `${item.capacity} Ton AC` : item.name}</h4>
                                                <p className="text-[10px] text-blue-400 font-bold tracking-wider uppercase mt-1">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-sm font-black text-white bg-white/10 px-3 py-2 rounded-xl border border-white/10 shadow-inner group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300">
                                                {formatPrice(getSellingPrice(item) * item.quantity)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Dynamic Details in Summary */}
                                <div className="flex-grow space-y-4">
                                    {checkoutStep > 1 && (
                                        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 animate-fadeInScale">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-gray-500 font-bold uppercase tracking-widest text-[9px] flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Contact
                                                </h3>
                                                <button onClick={() => setCheckoutStep(1)} className="text-blue-400 hover:text-white text-[10px] uppercase font-bold tracking-wider transition-colors">Edit</button>
                                            </div>
                                            <div className="text-gray-300 text-xs font-medium space-y-2.5">
                                                <p className="font-bold text-white text-sm flex items-center gap-2"><User size={14} className="text-gray-500"/> {formData.firstName} {formData.lastName}</p>
                                                <p className="flex items-center gap-2"><Mail size={14} className="text-gray-500"/> {formData.email}</p>
                                                <p className="flex items-center gap-2"><Phone size={14} className="text-gray-500"/> +91 {formData.phone}</p>
                                            </div>
                                        </div>
                                    )}

                                    {checkoutStep > 2 && (
                                        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 animate-fadeInScale">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-gray-500 font-bold uppercase tracking-widest text-[9px] flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Delivery
                                                </h3>
                                                <button onClick={() => setCheckoutStep(2)} className="text-blue-400 hover:text-white text-[10px] uppercase font-bold tracking-wider transition-colors">Edit</button>
                                            </div>
                                            <div className="text-gray-300 text-xs font-medium space-y-2">
                                                <p className="flex items-start gap-2">
                                                    <MapPin size={14} className="text-gray-500 mt-0.5 flex-shrink-0"/> 
                                                    <span className="leading-relaxed">
                                                        {formData.apartment}, {formData.landmark && `${formData.landmark}, `}<br/>
                                                        {formData.city}, {formData.district}<br/>
                                                        {formData.state} - <span className="font-bold text-white">{formData.pincode}</span>
                                                    </span>
                                                </p>
                                                {formData.gstNumber && isGstValid && (
                                                    <p className="text-emerald-400 mt-3 text-[10px] font-bold bg-emerald-400/10 px-2 py-1.5 rounded flex items-center gap-1.5 w-fit">
                                                        <CheckCircle size={12}/> GST: {formData.gstNumber}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8">
                                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-xs">
                                        <div className="flex justify-between text-gray-400 font-medium items-center">
                                            <span>Subtotal</span>
                                            <span className="text-white font-bold text-sm">₹{subtotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-400 font-medium items-center">
                                            <span>Shipping</span>
                                            <span className="text-white font-bold">₹{shippingFee.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-400 font-medium items-center">
                                            <span>GST (18%)</span>
                                            <div className="flex items-center gap-2">
                                                {gstAmount === 0 && <span className="text-[9px] uppercase font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20">Exempted</span>}
                                                <span className="text-white font-bold">₹{gstAmount.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="pt-4 border-t border-white/10 border-dashed flex justify-between items-end mt-2">
                                            <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Total Due</span>
                                            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">₹{finalTotal.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Success Modal */}
            {orderSuccessData && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
                    <div className="bg-[#0A0A0A] border border-gray-800 rounded-3xl p-8 md:p-12 max-w-md w-full shadow-[0_0_80px_rgba(37,99,235,0.2)] relative animate-fadeInScale flex flex-col items-center text-center overflow-hidden">
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/20 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 z-0"></div>
                        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-emerald-600/20 blur-[60px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2 z-0"></div>
                        
                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-[0_10px_30px_rgba(16,185,129,0.3)] relative z-10 animate-bounce-slow">
                            <CheckCircle size={40} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-black text-white mb-2 tracking-tight relative z-10">Order Confirmed!</h2>
                        <p className="text-gray-400 mb-8 relative z-10">Your digital receipt is ready.</p>
                        
                        <div className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-8 relative z-10">
                            {/* Jagged edge top/bottom effect simulated by borders */}
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Order ID</span>
                                <span className="text-sm font-black text-gray-200 tracking-wider">{orderSuccessData._id.slice(-8).toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Paid</span>
                                <span className="text-xl font-black text-emerald-400">₹{orderSuccessData.totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="border-t border-white/10 border-dashed pt-4 mt-2">
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Confirmation sent to</p>
                                <p className="text-sm font-bold text-blue-400 truncate">{orderSuccessData.customerInfo.email}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 w-full relative z-10">
                            <a 
                                href={`${API_URL}/orders/${orderSuccessData._id}/invoice`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-blue-600 hover:bg-blue-500 shadow-[0_10px_20px_rgba(37,99,235,0.2)] flex justify-center items-center gap-2 text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 hover:-translate-y-1"
                            >
                                <Download size={16} /> Download Invoice
                            </a>
                            <button 
                                onClick={() => navigate('/')}
                                className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-xs transition-all duration-300"
                            >
                                Continue Shopping
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
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-fadeInScale {
                    animation: fadeInScale 0.3s ease-out forwards;
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }
            `}</style>
        </>
    );
};

export default CheckoutPage;
