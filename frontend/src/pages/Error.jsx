import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home, ChevronLeft, Cpu, Activity } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Error404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-[#05080a] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* --- BACKGROUND DECORATIONS --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        
        {/* --- ERROR ICON --- */}
        <div data-aos="zoom-in" className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 animate-pulse" />
          <div className="relative bg-slate-900 border border-red-500/30 p-8 rounded-[2.5rem] shadow-2xl">
            <AlertTriangle size={80} className="text-red-500 animate-bounce" strokeWidth={1.5} />
          </div>
          {/* Floating Small Icons */}
          <div className="absolute -top-4 -right-4 p-3 bg-slate-800 rounded-xl border border-slate-700 animate-spin-slow">
            <Cpu size={20} className="text-slate-500" />
          </div>
        </div>

        {/* --- TEXT CONTENT --- */}
        <div data-aos="fade-up" data-aos-delay="200">
          <h1 className="text-8xl md:text-9xl font-black italic tracking-tighter text-white opacity-10 absolute -top-20 left-1/2 -translate-x-1/2 select-none">
            404
          </h1>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
            Node Not <span className="text-red-500">Found</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-[1px] w-12 bg-slate-800" />
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em]">Error Code: 0x00404_NULL_PATH</p>
            <div className="h-[1px] w-12 bg-slate-800" />
          </div>
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed mb-10">
            The adaptive engine could not locate the requested coordinates. The path might have been deleted from the core or never existed in this evolution.
          </p>
        </div>

        {/* --- ACTION BUTTONS --- */}
        <div data-aos="fade-up" data-aos-delay="400" className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl border border-slate-800 hover:bg-slate-800 hover:border-slate-600 transition-all flex items-center justify-center gap-2"
          >
            <ChevronLeft size={16} /> Revert Sequence
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-10 py-4 bg-lime-400 text-black font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-[0_10px_30px_rgba(163,230,53,0.2)] hover:bg-lime-300 hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <Home size={16} /> Return to Core
          </button>
        </div>

        {/* --- DECORATIVE FOOTER --- */}
        <div data-aos="fade-up" data-aos-delay="600" className="mt-16 flex justify-center items-center gap-6 opacity-30">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-lime-400" />
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">System Online</span>
          </div>
          <div className="h-4 w-[1px] bg-slate-800" />
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Path Error</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Error404;
