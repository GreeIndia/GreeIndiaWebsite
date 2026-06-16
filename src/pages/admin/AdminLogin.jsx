import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, apiFetch } from '../../config/api';
import { ShieldCheck, LockKeyhole, Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await apiFetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
      });
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem("gree_admin_token", data.token);
        navigate("/admin");
      } else {
        setError(data.error || "Authentication failed.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4 font-inter relative">
      
      {/* Cinematic background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-700/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl mx-auto mt-[-10vh]">
        
        <div className="flex flex-col items-center mb-8 md:mb-10">
          <div className="w-16 h-16 bg-blue-700/20 rounded-full flex items-center justify-center mb-4">
            <LockKeyhole size={28} className="text-blue-500" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white mb-2">Corporate Network</h1>
          <p className="text-gray-400 text-sm font-medium">Restricted Administrative Gateway</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-xs font-bold uppercase tracking-widest text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Admin ID / Email</label>
            <input 
              required 
              type="email" 
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-600 transition-colors font-bold text-white placeholder-gray-600" 
              placeholder="director@greeind.com" 
            />
          </div>
          
          <div className="flex flex-col gap-2 relative">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Access Passcode</label>
            <div className="relative">
              <input 
                required 
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-600 transition-colors font-bold text-white placeholder-gray-600 pr-12" 
                placeholder="••••••••••••" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-[0_0_20px_rgba(29,78,216,0.3)] mt-8"
          >
            {loading ? "Authenticating..." : "Authenticate"}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 text-gray-500 text-xs font-bold">
          <ShieldCheck size={14} />
          End-to-End Encrypted Handshake
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
