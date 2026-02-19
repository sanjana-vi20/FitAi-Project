import React from 'react';
import { Zap, Brain, Timer, ChevronRight, BarChart3, ArrowUpRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-bgMain text-textMain overflow-x-hidden min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] flex items-center justify-center px-6">
        {/* CSS Background Glow */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-brand/10 blur-[100px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto text-center z-10">
          <div className="animate-fade-in inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-full mb-6">
            <span className="h-2 w-2 rounded-full bg-brand"></span>
            <span className="text-[10px] font-bold text-brand uppercase tracking-widest">Adaptive Intelligence Engine</span>
          </div>

          <h1 className="animate-fade-in delay-1 text-5xl md:text-8xl font-black mb-6 leading-tight">
            Your Fitness <br />
            <span className="text-brand italic">Evolved.</span>
          </h1>

          <p className="animate-fade-in delay-2 text-textMuted text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            A habit-driven adaptive fitness intelligence system that builds long-term 
            fitness habits through structured tracking.
          </p>

          <div className="animate-fade-in delay-2 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-glow bg-brand hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95">
              Start Your Journey <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1: Habit Intelligence */}
          <div className="bg-bgCard p-10 rounded-3xl border border-slate-800 hover:border-brand transition-all hover:-translate-y-3 duration-300 group">
            <div className="bg-brand/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand transition-colors">
              <Brain size={28} className="text-brand group-hover:text-white" />
            </div>
            <h4 className="text-2xl font-bold mb-4">Habit Intelligence</h4>
            <p className="text-textMuted text-sm mb-6 leading-relaxed">
              Calculates your Habit Score (Workout 60% + Diet 40%) to predict drop-off risks.
            </p>
            <div className="flex items-center gap-2 text-brand font-bold text-sm cursor-pointer">
              Explore Engine <ArrowUpRight size={16} />
            </div>
          </div>

          {/* Feature 2: Energy & Recovery */}
          <div className="bg-bgCard p-10 rounded-3xl border border-slate-800 hover:border-success transition-all hover:-translate-y-3 duration-300 group">
            <div className="bg-success/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-success transition-colors">
              <Timer size={28} className="text-success group-hover:text-white" />
            </div>
            <h4 className="text-2xl font-bold mb-4">Adaptive Recovery</h4>
            <p className="text-textMuted text-sm mb-6 leading-relaxed">
              If fatigue flags are high (3 in 7 days), the system forces a recovery day automatically.
            </p>
            <div className="flex items-center gap-2 text-success font-bold text-sm cursor-pointer">
              Check Logic <ArrowUpRight size={16} />
            </div>
          </div>

          {/* Feature 3: Progressive Overload */}
          <div className="bg-bgCard p-10 rounded-3xl border border-slate-800 hover:border-brand transition-all hover:-translate-y-3 duration-300 group">
            <div className="bg-brand/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand transition-colors">
              <BarChart3 size={28} className="text-brand group-hover:text-white" />
            </div>
            <h4 className="text-2xl font-bold mb-4">Auto Progression</h4>
            <p className="text-textMuted text-sm mb-6 leading-relaxed">
              Increases volume by 5-10% when workout completion exceeds 90% for two weeks.
            </p>
            <div className="flex items-center gap-2 text-brand font-bold text-sm cursor-pointer">
              View Metrics <ArrowUpRight size={16} />
            </div>
          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-slate-800 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 animate-float">
          <Zap className="text-brand" fill="currentColor" size={20} />
          <span className="font-black italic tracking-tighter">FitAI</span>
        </div>
        <p className="text-textMuted text-xs">Built for NavKalpana-RICR-NK-0001</p>
        <div className="flex gap-6 text-xs font-bold text-textMuted">
          <a href="#" className="hover:text-brand transition">GITHUB</a>
          <a href="#" className="hover:text-brand transition">DOCUMENTATION</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;