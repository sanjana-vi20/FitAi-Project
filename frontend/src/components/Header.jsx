import React, { useState, useEffect } from "react";
import { Menu, X, Dumbbell, LogOut, User as UserIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

// Example: Aap ek local JSON file use kar sakte hain ya public URL
const runningAnimationUrl =
  "https://lottie.host/d5580afd-5e87-4001-b659-8727bcfaca14/SzIPA2L18L.json";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Maan lete hain context se user mil raha hai
  const user = JSON.parse(sessionStorage.getItem("FitAIUser"));
  const isAuthenticated = !!user;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("FitAIUser");
    toast.success("Engine Shutdown Successful");
    navigate("/");
    setIsOpen(false);
  };

  const authLinks = [
    { name: "Dashboard", href: "/user-dashboard" },
    { name: "Workouts", href: "/workout" },
    { name: "Diet AI", href: "/diet" },
    { name: "Profile", href: "/profile" },
    { name: "Community", href: "/community" },
  ];

  return (
    <>
      <nav
        className={`fixed w-full top-0 left-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* --- LOGO --- */}
            <div
              className="flex items-center gap-2 group cursor-pointer relative z-[110]"
              onClick={() => navigate("/")}
            >
              <div className="bg-lime-400 p-2 rounded-xl shadow-[0_0_15px_rgba(163,230,53,0.4)] group-hover:rotate-12 transition-transform">
                <Dumbbell size={20} className="text-black" strokeWidth={3} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                FIT<span className="text-lime-400">AI</span>
              </span>
            </div>

            {/* --- CENTER: LOTTIE RUNNER (Only if Not Logged In) --- */}
            {/* Center Animation Section */}
            {!isAuthenticated && (
              <div className="hidden lg:flex items-center gap-3 overflow-hidden">
                {/* Ye main container hai jo animation ko limit mein rakhega */}
                <div className="w-40 h-22 relative flex items-center justify-center">
                  <motion.div
                    className="w-22 h-22 flex-shrink-0"
                    initial={{ x: -60 }} // Start position (left side of the small box)
                    animate={{ x: 60 }} // End position (right side of the small box)
                    transition={{
                      duration: 3, // Speed of running
                      repeat: Infinity, // Non-stop
                      ease: "linear", // Constant speed (no sudden slow-down)
                      repeatType: "loop", // Reset to start instantly without moving backwards
                    }}
                  >
                    <Lottie
                      path={runningAnimationUrl}
                      loop={true}
                      autoplay={true}
                      
                    />
                  </motion.div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-lime-400 uppercase tracking-widest animate-pulse">
                    AI Engine Active
                  </span>
                  <span className="text-[8px] text-slate-500 font-bold uppercase">
                    Tracking Protocol...
                  </span>
                </div>

               
              </div>
            )}

            {/* --- DESKTOP NAV (Only if Logged In) --- */}
            <div className="hidden md:flex items-center space-x-6">
              {isAuthenticated &&
                authLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => navigate(link.href)}
                    className="relative text-sm font-bold text-slate-400 hover:text-white transition-colors group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-400 transition-all group-hover:w-full"></span>
                  </button>
                ))}
            </div>

            {/* --- ACTIONS --- */}
            <div className="hidden md:flex items-center gap-4">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="relative text-sm font-bold text-slate-400 hover:text-white transition-colors group"
                  >
                    Login
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-400 transition-all group-hover:w-full"></span>
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="px-6 py-2.5 bg-lime-400 text-black text-xs font-black rounded-full hover:bg-white transition-all shadow-lg active:scale-95"
                  >
                    JOIN CORE
                  </button>

                   <div className="pl-4">
                  <button className="relative text-sm font-bold text-slate-400 hover:text-white transition-colors group" onClick={()=>navigate('/community')}>
                    Community
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-400 transition-all group-hover:w-full"></span>
                  </button>
                </div>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-2xl">
                    <div className="w-2 h-2 rounded-full bg-lime-500 animate-ping"></div>
                    <span className="text-xs font-black text-slate-200 uppercase">
                      {user?.fullName?.split(" ")[0] || "Athlete"}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-slate-300"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer */}
      <div className="h-[80px] md:h-[90px] w-full bg-slate-950"></div>
    </>
  );
};

export default Header;
