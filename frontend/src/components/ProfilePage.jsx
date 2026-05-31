import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Shield,
  Scale,
  Ruler,
  Activity,
  Flame,
  Target,
  Trophy,
  Edit3,
  Save,
  LogOut,
  Calendar,
  Calendar1,
} from "lucide-react";
import AOS from "aos";
import { useAuth } from "../config/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../config/API";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user, setUser, setIsLogin } = useAuth();

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800 });
    if (!user) {
      navigate("/login");
    }
  }, []);

  console.log(user);

  const targetDetails = (e) => {
    switch (e) {
      case "height-gain":
        return `${user?.profile[0]?.target?.height} cm`;
      case "weight-gain":
        return `${user?.profile[0]?.target?.weight} kg`;
      case "muscle-gain":
        return `${user?.profile[0]?.target?.weight} kg`;
      case "weight-loss":
        return `${user?.profile[0]?.target?.weight} kg`;

      default:
        return "Consistency";
    }
  };

  const handleLogout = async () => {
    try {
      const res = await api.get(import.meta.env.VITE_LOGOUT); // backend bhraman to clear cookie
      setUser(""); //auth clear
      setIsLogin(false); // auth login clear
      sessionStorage.removeItem("FitAIUser"); // session clear
      toast.success("Logout Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  return (
    <>
      {!user && (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
          Loading Node...
        </div>
      )}
      <div className="min-h-screen bg-[#05080a] text-white pt-24 pb-12 px-6 font-sans overflow-hidden">
        {/* Background Decorative Glows */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-lime-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* --- PROFILE HEADER --- */}
          <div
            className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 bg-slate-900/30 p-8 rounded-[3rem] border border-white/5 backdrop-blur-xl"
            data-aos="fade-down"
          >
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-lime-400 to-blue-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative w-32 h-32 bg-slate-950 rounded-full border-2 border-slate-800 flex items-center justify-center overflow-hidden">
                  <User size={60} className="text-slate-700" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter italic">
                  {user?.fullName}
                </h1>
                <p className="text-lime-400 text-xs font-black tracking-[0.3em] uppercase mt-1 flex items-center gap-2 justify-center md:justify-start">
                  <Shield size={14} /> Level:{" "}
                  {user?.profile[0]?.experienceLevel} athlete
                </p>
                <p className="text-slate-500 text-sm mt-2">{user?.email}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-lime-400/50 transition-all flex items-center gap-2">
                <Edit3 size={16} /> Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
              >
                <LogOut size={16} />
              </button>
            </div>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => navigate("/profile-setup")}
                className="px-6 py-3 bg-lime-400 border border-lime-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-lime-400/50 
                          text-black transition-all flex items-center gap-2"
              >
                <Calendar1 size={16} /> Plan Your Workout
              </button>
              <button
                onClick={() => navigate("/diet-setup")}
                className="px-6 py-3 bg-lime-400 border border-lime-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-lime-400/50 
                          text-black transition-all flex items-center gap-2"
              >
                <Calendar size={16} /> Plan Your Diet
              </button>
            </div>
          </div>

          {/* --- DATA GRID --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1. Core Biometrics Card */}
            <div
              className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-8 flex flex-col justify-between"
              data-aos="fade-right"
            >
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 mb-8 italic">
                Biometric Data
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-950 rounded-xl group-hover:text-lime-400 transition-colors">
                      <Ruler size={18} />
                    </div>
                    <span className="text-xs font-bold text-slate-400">
                      Height
                    </span>
                  </div>
                  <span className="text-lg font-black">
                    {user?.profile[0]?.height}{" "}
                    <small className="text-[10px] text-slate-500">cm</small>
                  </span>
                </div>
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-950 rounded-xl group-hover:text-lime-400 transition-colors">
                      <Scale size={18} />
                    </div>
                    <span className="text-xs font-bold text-slate-400">
                      Weight
                    </span>
                  </div>
                  <span className="text-lg font-black">
                    {user?.profile[0]?.weight}{" "}
                    <small className="text-[10px] text-slate-500">kg</small>
                  </span>
                </div>
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-950 rounded-xl group-hover:text-lime-400 transition-colors">
                      <Activity size={18} />
                    </div>
                    <span className="text-xs font-bold text-slate-400">
                      BMI
                    </span>
                  </div>
                  <span className="text-lg font-black text-blue-400">
                    {user?.profile[0]?.bmi.toFixed(2)}{" "}
                    <small className="text-[10px] text-slate-500">
                      kg/m <sup>2</sup>
                    </small>
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Nutritional Identity Card */}
            <div
              className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-8"
              data-aos="fade-up"
            >
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 mb-8 italic">
                Nutritional Floor
              </h3>
              <div className="space-y-8">
                <div className="text-center p-6 bg-slate-950 rounded-[2rem] border border-white/5">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Maintenance Calories
                  </p>
                  <h6 className="text-xl font-black mt-1">
                    {user?.profile[0]?.maintainanceCal?.toFixed()}
                  </h6>
                  <p className="text-[10px] text-slate-600 mt-1 uppercase">
                    Kcal / Day
                  </p>
                </div>
                <div className="text-center p-6 bg-lime-400 rounded-[2rem] text-black shadow-[0_0_30px_rgba(163,230,53,0.2)]">
                  <p className="text-[10px] font-black opacity-60 uppercase tracking-widest">
                    Target Intake
                  </p>
                  <h4 className="text-3xl font-black mt-1">
                    {user?.profile[0]?.target?.calories?.toFixed()} kcal
                  </h4>
                  <p className="text-[10px] font-bold mt-1 uppercase italic">
                    Goal Optimized
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Mission Objectives Card */}
            <div
              className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-8 flex flex-col justify-between"
              data-aos="fade-left"
            >
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 mb-8 italic">
                Current Mission
              </h3>
              <div className="space-y-6">
                <div className="p-4 bg-slate-950 rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
                    <Trophy size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                      Activity Goal
                    </p>
                    <p className="text-xs font-black uppercase">
                      {user?.profile[0]?.activities?.replace("-", " ")}
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl">
                    <Flame size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                      Activity Intensity
                    </p>
                    <p className="text-xs font-black uppercase">
                      {user?.profile[0]?.activityLevel}
                    </p>
                  </div>
                </div>

                {/* Conditional Rendering for Targets */}
                <div className="mt-4 p-4 border border-lime-400/20 bg-lime-400/5 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Target size={14} className="text-lime-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-lime-400">
                      Target Node
                    </span>
                  </div>
                  <p className="text-xl font-black">
                    {targetDetails(user?.profile[0]?.activities)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- SYSTEM LOGS / TIMESTAMPS --- */}
          <div className="mt-8 flex justify-center gap-6" data-aos="fade-up">
            <div className="px-4 py-2 bg-slate-900/50 rounded-full border border-white/5 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
              Last Updated: {new Date(user.updatedAt).toLocaleDateString()}
            </div>
            <div className="px-4 py-2 bg-slate-900/50 rounded-full border border-white/5 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
              Status: {user?.isActive ? "System Active" : "System Hibernating"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
