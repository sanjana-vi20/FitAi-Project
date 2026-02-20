import React, { useState, useEffect } from "react";
import { Dumbbell, Mail, Lock, User, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import api from '../config/API';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (formData.fullName.length < 3) {
      toast.error("Name must be at least 3 characters");
      return false;
    }
    const emailRegex = /^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please use a professional email format");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Access Keys (Passwords) do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validate()) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/register", formData);
      toast.success("Identity Created. Redirecting...");
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05080a] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Tech Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-lime-500/10 blur-[120px] rounded-full" />

      {/* Main Registration Card */}
      <div 
        data-aos="zoom-in-up"
        className="relative max-w-2xl w-full bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
      >
        
        {/* Left Branding Strip (Slim) */}
        <div className="md:w-1/3 bg-gradient-to-b from-lime-400 to-emerald-600 p-8 flex flex-col justify-between text-black">
          <div className="z-10">
            <div className="bg-black p-2 rounded-xl inline-block mb-6 shadow-lg">
              <Dumbbell size={24} className="text-lime-400" />
            </div>
            <h2 className="text-3xl font-black tracking-tighter leading-tight uppercase">
              Join the <br /> <span className="text-white">Elite</span> <br /> Core
            </h2>
          </div>
          <div className="space-y-4">
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-black/10 p-2 rounded-lg">
                <ShieldCheck size={14}/> Encrypted Data
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-black/10 p-2 rounded-lg">
                <Zap size={14}/> Real-time Sync
             </div>
          </div>
        </div>

        {/* Right Form Area */}
        <div className="md:w-2/3 p-8 lg:p-12">
          <div className="mb-8" data-aos="fade-left" data-aos-delay="200">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">Create Identity</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Start your adaptive evolution</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="space-y-1" data-aos="fade-up" data-aos-delay="300">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-lime-400 transition-colors" size={18} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="FULL NAME"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-lime-500/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1" data-aos="fade-up" data-aos-delay="400">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Identity Sync (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-lime-400 transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="EMAIL@CORE.NET"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-lime-500/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1" data-aos="fade-up" data-aos-delay="500">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Set Key</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-lime-400 transition-colors" size={18} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-xs font-bold text-white focus:outline-none focus:border-lime-500/50 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1" data-aos="fade-up" data-aos-delay="500">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Confirm Key</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-lime-400 transition-colors" size={18} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-xs font-bold text-white focus:outline-none focus:border-lime-500/50 transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              data-aos="zoom-in"
              data-aos-delay="600"
              type="submit"
              disabled={isLoading}
              className="group relative w-full h-14 bg-lime-400 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all hover:scale-[1.01] active:scale-95 mt-4"
            >
              <span className="relative z-10 text-black font-black text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                {isLoading ? "Synchronizing..." : "Initialize Profile"}
                <ArrowRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </form>

          <p className="mt-8 text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest" data-aos="fade-up" data-aos-delay="700">
            Already verified?{" "}
            <a href="/login" className="text-white hover:text-lime-400 transition-colors underline underline-offset-4 decoration-lime-500/30">
              Access Node
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;