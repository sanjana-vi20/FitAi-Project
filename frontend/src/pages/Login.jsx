import React, { useState, useEffect } from "react";
import { Dumbbell, Mail, Lock, ChevronRight, Fingerprint, Activity } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import api from '../config/API';

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", formData);
      if (res.data) {
        toast.success("Biometrics Verified. Welcome.");
        sessionStorage.setItem("FitAIUser", JSON.stringify(res?.data?.data ));
        navigate('/user-dashboard');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Access Denied");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05080a] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* --- ANIMATED BACKGROUND ELEMENTS --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-lime-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* --- LOGIN CARD --- */}
      <div 
        data-aos="zoom-out-up"
        className="relative w-full max-w-[450px] bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* Top Accent Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent shadow-[0_0_15px_rgba(163,230,53,0.8)]" />

        {/* --- HEADER --- */}
        <div className="text-center mb-10" data-aos="fade-down" data-aos-delay="200">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-lime-400 blur-xl opacity-20 animate-pulse" />
            <div className="relative bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <Fingerprint size={32} className="text-lime-400" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-[0.3em] mb-1">
            Access <span className="text-lime-400">Node</span>
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-[1px] w-8 bg-slate-800" />
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">User Verification Required</p>
            <div className="h-[1px] w-8 bg-slate-800" />
          </div>
        </div>

        {/* --- FORM --- */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          <div data-aos="fade-up" data-aos-delay="400">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-lime-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
              <div className="relative flex items-center">
                <Mail className="absolute left-4 text-slate-500 group-focus-within:text-lime-400 transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="IDENTITY@CORE.NET"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold tracking-widest text-white placeholder:text-slate-700 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="500">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-lime-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
              <div className="relative flex items-center">
                <Lock className="absolute left-4 text-slate-500 group-focus-within:text-lime-400 transition-colors" size={18} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="ACCESS_KEY"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold tracking-widest text-white placeholder:text-slate-700 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <button
            data-aos="zoom-in"
            data-aos-delay="600"
            type="submit"
            disabled={loading}
            className="group relative w-full h-14 bg-lime-400 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all hover:shadow-[0_0_35px_rgba(163,230,53,0.5)] active:scale-95"
          >
            <div className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full opacity-10" />
            <span className="relative text-black font-black text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2">
              {loading ? "Decrypting..." : "Initialize Engine"}
              <ChevronRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </form>

        {/* --- FOOTER --- */}
        <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="700">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            First mission? {" "}
            <a href="/register" className="text-white hover:text-lime-400 transition-all border-b border-slate-800 hover:border-lime-400 pb-1">
              Create New Identity
            </a>
          </p>
          
          <div className="flex justify-center gap-4 mt-8 opacity-20">
            <Activity size={16} className="text-lime-400" />
            <div className="w-[1px] h-4 bg-slate-700" />
            <Dumbbell size={16} className="text-white" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;