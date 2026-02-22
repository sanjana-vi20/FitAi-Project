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
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-lime-400 pt-6 selection:text-black">
      {/* --- HERO SECTION --- */}

      <section className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden bg-slate-950">
        {/* Background Glows for Depth */}
        <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-lime-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[0%] w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />

        <div className="container mx-auto px-6 z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* LEFT CONTENT */}
            <div className="flex-1 text-left">
              <div
                data-aos="fade-right"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 mb-6"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
                </span>
                <span className="text-sm font-medium text-slate-300 tracking-wide uppercase">
                  AI Adaptive Engine Active
                </span>
              </div>

              <h1
                data-aos="fade-right"
                data-aos-delay="100"
                className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]"
              >
                Evolutionary <br />
                <span className="text-lime-400 drop-shadow-[0_0_15px_rgba(163,230,53,0.3)]">
                  Fitness Intelligence
                </span>
              </h1>

              <p
                data-aos="fade-right"
                data-aos-delay="200"
                className="max-w-xl text-lg text-slate-400 mb-10 leading-relaxed"
              >
                FitAI monitors your{" "}
                <span className="text-white font-semibold italic underline decoration-lime-500/50">
                  Habit Score
                </span>{" "}
                and recovery levels to dynamically adjust your training and
                nutrition plans every 24 hours.
              </p>

              <div
                data-aos="fade-up"
                data-aos-delay="400"
                className="flex flex-col sm:flex-row items-center gap-5"
              >
                <button className="w-full sm:w-auto px-10 py-4 bg-lime-400 text-black font-black rounded-2xl hover:bg-lime-300 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(163,230,53,0.3)]">
                  GET STARTED <ChevronRight size={20} strokeWidth={3} />
                </button>
                <button className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl border border-slate-800 hover:bg-slate-800 transition-all">
                  LEARN MORE
                </button>
              </div>
            </div>

            {/* RIGHT VISUAL - Using Generated AI Image */}
            <div
              className="flex-1 relative"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="relative z-10 w-full max-w-[550px] mx-auto group">
                {/* Main Generated Image */}
                <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-800 shadow-2xl transition-all duration-700 group-hover:border-lime-500/50">
                  <img
                    src={hero}
                    alt="FitAI Isometric Monitoring"
                    className="w-full h-auto object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700"
                  />
                  {/* Overlay Gradient for more "Tech" look */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
                </div>

                {/* Floating AI Status Card */}
                <div className="absolute -bottom-8 -left-4 md:-left-10 p-5 bg-slate-900/90 backdrop-blur-2xl border border-slate-700 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-bounce-slow">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-lime-500/20 rounded-xl text-lime-400">
                      <Brain size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">
                        Engine Status
                      </p>
                      <p className="text-sm font-bold text-white tracking-tight">
                        ANALYZING HABITS...
                      </p>
                      <div className="w-full bg-slate-800 h-1 mt-2 rounded-full overflow-hidden">
                        <div className="bg-lime-400 h-full w-[92%] animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Metrics Badge */}
                <div className="absolute -top-6 right-0 p-4 bg-blue-600/10 backdrop-blur-xl border border-blue-500/30 rounded-2xl shadow-xl">
                  <div className="flex flex-col items-center gap-1">
                    <BarChart3 className="text-blue-400" size={24} />
                    <span className="text-[10px] font-bold text-blue-200">
                      LIVE SYNC
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS STRIP --- */}
      <div className="border-y border-slate-900 bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Habit Accuracy", val: "98%" },
              { label: "Active Users", val: "10k+" },
              { label: "Workout Logs", val: "1M+" },
              { label: "Success Rate", val: "94%" },
            ].map((stat, i) => (
              <div key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.val}
                </div>
                <div className="text-sm text-slate-500 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 data-aos="fade-up" className="text-4xl font-bold mb-4">
            Engineered for Results
          </h2>
          <div
            data-aos="fade-up"
            className="w-20 h-1 bg-lime-500 mx-auto"
          ></div>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div
            data-aos="fade-right"
            className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-lime-500/50 transition-colors group"
          >
            <div className="w-12 h-12 bg-lime-500/10 rounded-lg flex items-center justify-center text-lime-400 mb-6 group-hover:scale-110 transition-transform">
              <Brain size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Habit Intelligence</h3>
            <p className="text-slate-400 leading-relaxed">
              Our formula $Score = (W \times 0.6) + (D \times 0.4)$ tracks your
              consistency and predicts drop-off risks before they happen.
            </p>
          </div>

          {/* Card 2 */}
          <div
            data-aos="fade-up"
            className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-colors group"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Recovery Engine</h3>
            <p className="text-slate-400 leading-relaxed">
              Feeling fatigued? FitAI automatically adjusts your volume or swaps
              high-intensity moves for mobility work.
            </p>
          </div>

          {/* Card 3 */}
          <div
            data-aos="fade-left"
            className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition-colors group"
          >
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Target size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Goal Forecasting</h3>
            <p className="text-slate-400 leading-relaxed">
              Get dynamic completion dates for your weight goals based on your
              actual weekly average weight change.
            </p>
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div
            data-aos="zoom-out"
            className="relative p-12 rounded-[40px] bg-gradient-to-r from-lime-500 to-emerald-600 overflow-hidden text-center text-black"
          >
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <Activity size={200} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to outwork your old self?
            </h2>
            <p className="text-lg font-medium mb-10 max-w-xl mx-auto opacity-90">
              Join the 10,000+ users who have stopped guessing and started
              training with AI precision.
            </p>
            <button className="px-10 py-4 bg-black text-white rounded-full font-bold hover:scale-105 transition-transform">
              Get Started for Free
            </button>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t border-slate-900 text-center text-slate-500 text-sm">
        &copy; 2026 FitAI Engine. NavKalpana-RICR Hackathon Project.
      </footer>
    </div>
  );
};

export default Home;
