import React, { useEffect } from 'react';
import { Target, Zap, Cpu, Users, ShieldCheck, Dumbbell, ArrowRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const features = [
    {
      icon: <Cpu className="text-lime-400" size={32} />,
      title: "Adaptive Engine",
      desc: "Our AI doesn't just plan; it evolves. It adjusts your weights and reps based on your real-time performance and recovery."
    },
    {
      icon: <Target className="text-blue-400" size={32} />,
      title: "Habit Scoring",
      desc: "We track consistency, not just intensity. Your Habit Score is the heartbeat of your transformation journey."
    },
    {
      icon: <Zap className="text-orange-400" size={32} />,
      title: "Dynamic Dietetics",
      desc: "Instant macro adjustments based on your daily activity levels. Eat precisely what your body needs to grow."
    }
  ];

  return (
    <div className="min-h-screen bg-[#05080a] text-white pt-24 pb-16 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lime-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div data-aos="fade-down" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-lime-400">The Future of Fitness</span>
          </div>
          <h1 data-aos="fade-up" className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6 leading-none">
            We are <span className="text-lime-400">FitAI.</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="200" className="text-slate-400 text-lg leading-relaxed">
            Born at the intersection of Silicon Valley tech and elite sports science, 
            we've built the world’s first <span className="text-white font-bold italic">Adaptive Intelligence Engine</span> for personalized physical evolution.
          </p>
        </div>

        {/* --- MISSION CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {features.map((f, i) => (
            <div 
              key={i}
              data-aos="zoom-in"
              data-aos-delay={i * 100}
              className="p-8 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] hover:border-lime-400/30 transition-all group"
            >
              <div className="mb-6 p-4 bg-slate-950 rounded-2xl inline-block border border-slate-800 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-black uppercase italic mb-4 tracking-tight">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* --- WHY US SECTION --- */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <div className="flex-1" data-aos="fade-right">
            <h2 className="text-4xl font-black uppercase italic mb-6 leading-tight">
              Science-Backed <br /> <span className="text-lime-400">Data-Driven</span>
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-lime-400/10 p-2 rounded-lg text-lime-400"><ShieldCheck size={20}/></div>
                <p className="text-slate-400 text-sm"><span className="text-white font-bold">Privacy First:</span> Your health data is encrypted with military-grade protocols.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-blue-400/10 p-2 rounded-lg text-blue-400"><Users size={20}/></div>
                <p className="text-slate-400 text-sm"><span className="text-white font-bold">Community:</span> Join a network of 10,000+ elite athletes pushing their limits.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-orange-400/10 p-2 rounded-lg text-orange-400"><Dumbbell size={20}/></div>
                <p className="text-slate-400 text-sm"><span className="text-white font-bold">Expertise:</span> Algorithms verified by Olympic-level strength coaches.</p>
              </div>
            </div>
            <button className="mt-10 px-8 py-4 bg-white text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-lime-400 transition-all flex items-center gap-2">
              Start Your Protocol <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="flex-1 relative" data-aos="fade-left">
             <div className="absolute inset-0 bg-lime-400/20 blur-[100px] rounded-full" />
             <div className="relative p-8 bg-slate-900/80 border border-slate-800 rounded-[3rem] overflow-hidden">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-12 w-12 bg-slate-800 rounded-full animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-3 w-32 bg-slate-800 rounded animate-pulse" />
                    <div className="h-2 w-20 bg-slate-800 rounded animate-pulse" />
                  </div>
                </div>
                <div className="space-y-4">
                   <div className="h-2 w-full bg-slate-800 rounded" />
                   <div className="h-2 w-full bg-slate-800 rounded" />
                   <div className="h-2 w-3/4 bg-slate-800 rounded" />
                </div>
                <div className="mt-10 h-32 w-full bg-gradient-to-t from-lime-400/20 to-transparent border-t border-lime-400/30 rounded-t-xl" />
                <p className="absolute bottom-12 left-0 right-0 text-center text-[10px] font-bold text-lime-400 uppercase tracking-[0.4em]">Engine Visualizing...</p>
             </div>
          </div>
        </div>

        {/* --- CTA SECTION --- */}
        <div data-aos="zoom-out" className="p-12 md:p-20 bg-gradient-to-br from-lime-400 to-emerald-600 rounded-[4rem] text-center text-black">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-6">Stop Guessing. <br /> Start Evolving.</h2>
          <p className="text-black/70 font-bold max-w-xl mx-auto mb-10 uppercase tracking-widest text-sm">
            Ready to let the machine build the best version of you?
          </p>
          <button className="px-10 py-5 bg-black text-white font-black uppercase text-sm tracking-widest rounded-full hover:scale-105 transition-all shadow-2xl">
            Initialize Access
          </button>
        </div>

      </div>
    </div>
  );
};

export default About;