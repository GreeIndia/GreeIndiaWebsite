import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import CookieConsent from "./components/CookieConsent";

import Home from "./pages/Home";
import About from "./pages/About";
import CartPage from "./pages/CartPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import Booking from "./pages/Booking";
import ContactUs from "./pages/ContactUs";
import DealerForm from "./pages/DealerForm";
import ServiceRequest from "./pages/ServiceRequest";
import InstallationForm from "./pages/InstallationForm";
import TrackOrders from "./pages/TrackOrders";
import AdminLogin from "./pages/admin/AdminLogin";
import OurMission from "./pages/OurMission";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

// Lazy Loaded Routes
const DownloadCenter = lazy(() => import("./pages/DownloadCenter"));
const NewsVideo = lazy(() => import("./pages/NewsVideo"));
const OnlineFeedback = lazy(() => import("./pages/OnlineFeedback"));
const HelpSupport = lazy(() => import("./pages/HelpSupport"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProductView = lazy(() => import("./pages/admin/AdminProductView"));
const RefundOrder = lazy(() => import("./pages/RefundOrder"));

// Utility component to ensure the page scrolls to the absolute top upon route changes
const ScrollToTopRoute = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// Internal wrapper so we can use useLocation hook for route checking
const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTopRoute />
      <Toaster position="top-center" />
      
      {/* GLOBAL NAVBAR - Suppressed on Admin Routes */}
      {!isAdminRoute && <Navbar />}

      <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ourmission" element={<OurMission />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:variantId" element={<ProductsPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<ContactUs />} />
          
          {/* NEW FORMS */}
          <Route path="/dealer-form" element={<DealerForm />} />
          <Route path="/service-request" element={<ServiceRequest />} />
          <Route path="/installation-form" element={<InstallationForm />} />
          
          {/* OTHERS */}
          <Route path="/news-video" element={<NewsVideo />} />
          <Route path="/download-app" element={<DownloadCenter />} />
          <Route path="/online-feedback" element={<OnlineFeedback />} />
          <Route path="/help-support" element={<HelpSupport />} />
          <Route path="/refund-order" element={<RefundOrder />} />
          
          {/* TRACKING */}
          <Route path="/track-orders" element={<TrackOrders />} />
          
          {/* SECURE ADMIN ROUTES */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/product/:productId" element={<AdminProductView />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* CATCH ALL 404 ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {/* GLOBAL FOOTER - Suppressed on Admin Routes */}
      {!isAdminRoute && <Footer />}

      {/* GLOBAL SCROLL BUTTON */}
      {!isAdminRoute && <ScrollTop />}

      {/* GLOBAL COOKIE CONSENT */}
      {!isAdminRoute && <CookieConsent />}
    </>
  );
};

const App = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <AppContent />
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;