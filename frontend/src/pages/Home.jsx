import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Activity,
  Brain,
  Target,
  Zap,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import hero from "../assets/hero.png";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, // Thoda fast for better feel
      once: true,    // Mobile scroll par baar-baar animation annoying ho sakti hai
      mirror: false,
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-lime-400 selection:text-black overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 lg:py-0 overflow-hidden bg-slate-950">
        {/* Background Glows */}
        <div className="absolute top-[-5%] left-[-10%] w-48 h-48 md:w-72 md:h-72 bg-lime-500/10 blur-[80px] md:blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-64 h-64 md:w-96 md:h-96 bg-blue-600/10 blur-[80px] md:blur-[120px] rounded-full" />

        <div className="container mx-auto px-4 sm:px-6 z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            
            {/* LEFT CONTENT */}
            <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
              <div
                data-aos="fade-right"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 mb-6"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
                </span>
                <span className="text-xs md:text-sm font-medium text-slate-300 tracking-wide uppercase">
                  AI Adaptive Engine Active
                </span>
              </div>

              <h1
                data-aos="fade-right"
                data-aos-delay="100"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]"
              >
                Evolutionary <br />
                <span className="text-lime-400 drop-shadow-[0_0_15px_rgba(163,230,53,0.3)]">
                  Fitness Intelligence
                </span>
              </h1>

              <p
                data-aos="fade-right"
                data-aos-delay="200"
                className="max-w-xl mx-auto lg:mx-0 text-base md:text-lg text-slate-400 mb-8 md:mb-10 leading-relaxed"
              >
                FitAI monitors your{" "}
                <span className="text-white font-semibold italic underline decoration-lime-500/50">
                  Habit Score
                </span>{" "}
                and recovery levels to dynamically adjust your training.
              </p>

              <div
                data-aos="fade-up"
                data-aos-delay="400"
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <button className="w-full sm:w-auto px-8 py-4 bg-lime-400 text-black font-black rounded-2xl hover:bg-lime-300 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-lime-500/20">
                  GET STARTED <ChevronRight size={20} strokeWidth={3} />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl border border-slate-800 hover:bg-slate-800 transition-all">
                  LEARN MORE
                </button>
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div
              className="flex-1 relative order-1 lg:order-2 w-full max-w-[400px] lg:max-w-none"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="relative z-10 w-full lg:max-w-[550px] mx-auto group">
                <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-slate-800 shadow-2xl">
                  <img
                    src={hero}
                    alt="FitAI Monitoring"
                    className="w-full h-auto object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
                </div>

                {/* Status Card - Scaled for Mobile */}
                <div className="absolute -bottom-6 -left-2 md:-left-10 p-4 md:p-5 bg-slate-900/90 backdrop-blur-2xl border border-slate-700 rounded-2xl shadow-2xl scale-90 md:scale-100">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-lime-500/20 rounded-xl text-lime-400">
                      <Brain size={24} />
                    </div>
                    <div>
                      <p className="text-[8px] md:text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                        Engine Status
                      </p>
                      <p className="text-xs md:text-sm font-bold text-white uppercase">
                        Analyzing...
                      </p>
                      <div className="w-20 md:w-32 bg-slate-800 h-1 mt-2 rounded-full overflow-hidden">
                        <div className="bg-lime-400 h-full w-[92%] animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS STRIP --- */}
      <div className="border-y border-slate-900 bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8 md:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Habit Accuracy", val: "98%" },
              { label: "Active Users", val: "10k+" },
              { label: "Workout Logs", val: "1M+" },
              { label: "Success Rate", val: "94%" },
            ].map((stat, i) => (
              <div key={i} className="text-center" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.val}
                </div>
                <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <section className="py-16 md:py-24 bg-slate-950">
        <div className="container mx-auto px-6 text-center mb-12 md:mb-16">
          <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-bold mb-4">
            Engineered for Results
          </h2>
          <div data-aos="fade-up" className="w-16 h-1 bg-lime-500 mx-auto"></div>
        </div>

        <div className="container mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard 
            icon={<Brain size={28} />} 
            title="Habit Intelligence" 
            color="lime"
            desc="Our formula $Score = (W \times 0.6) + (D \times 0.4)$ tracks consistency."
            aos="fade-up"
          />
          <FeatureCard 
            icon={<Zap size={28} />} 
            title="Recovery Engine" 
            color="blue"
            desc="FitAI automatically adjusts volume based on your fatigue levels."
            aos="fade-up"
          />
          <FeatureCard 
            icon={<Target size={28} />} 
            title="Goal Forecasting" 
            color="purple"
            desc="Get dynamic completion dates based on your actual weekly progress."
            aos="fade-up"
          />
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div
            data-aos="zoom-out"
            className="relative p-8 md:p-16 rounded-[30px] md:rounded-[40px] bg-gradient-to-br from-lime-500 to-emerald-600 overflow-hidden text-center text-black"
          >
            <div className="hidden md:block absolute top-0 right-0 p-10 opacity-10">
              <Activity size={200} />
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              Ready to outwork <br className="md:hidden" /> your old self?
            </h2>
            <p className="text-sm md:text-lg font-medium mb-8 md:mb-10 max-w-xl mx-auto opacity-90">
              Join 10,000+ users training with AI precision.
            </p>
            <button className="w-full sm:w-auto px-10 py-4 bg-black text-white rounded-full font-bold hover:scale-105 transition-transform shadow-xl">
              Get Started for Free
            </button>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-slate-900 text-center text-slate-500 text-xs md:text-sm">
        &copy; 2026 FitAI Engine. NavKalpana-RICR Hackathon Project.
      </footer>
    </div>
  );
};

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, desc, color, aos }) => {
  const colors = {
    lime: "group-hover:border-lime-500/50 text-lime-400 bg-lime-500/10",
    blue: "group-hover:border-blue-500/50 text-blue-400 bg-blue-500/10",
    purple: "group-hover:border-purple-500/50 text-purple-400 bg-purple-500/10",
  };

  return (
    <div
      data-aos={aos}
      className={`p-8 rounded-3xl bg-slate-900/50 border border-slate-800 transition-all group ${colors[color].split(' ')[0]}`}
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${colors[color].split(' ').slice(1).join(' ')}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-400 text-sm md:text-base leading-relaxed">{desc}</p>
    </div>
  );
};

export default Home;