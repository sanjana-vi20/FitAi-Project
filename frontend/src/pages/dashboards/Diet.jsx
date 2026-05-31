import React, { useState, useEffect } from "react";
import { 
  Utensils, 
  Leaf, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  ChevronRight, 
  Scale, 
  Zap,
  CheckCircle2
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const Diet = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // Schema ke hisab se state management
  const [dietConfig, setDietConfig] = useState({
    dietaryPreference: "vegetarian",
    deficitOrSurplusLevel: "deficit",
    mealFrequency: 3,
    allergies: ["None"],
    heavyMealTiming: "lunch",
    flexibilityMode: "no-free-day"
  });

  const preferences = [
    { id: "vegetarian", label: "Vegetarian", icon: <Leaf className="text-green-400" /> },
    { id: "non-vegetarian", label: "Non-Veg", icon: <Zap className="text-red-400" /> },
    { id: "vegan", label: "Vegan", icon: <Leaf className="text-emerald-400" /> },
    { id: "eggetarian", label: "Eggetarian", icon: <Zap className="text-yellow-400" /> },
  ];

  return (
    <div className="min-h-screen bg-[#05080a] text-white p-4 md:p-8 pt-28 font-sans selection:bg-lime-400 selection:text-black">
      
      {/* --- PAGE HEADER --- */}
      <div className="max-w-5xl mx-auto mb-12" data-aos="fade-down">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-lime-400/10 rounded-2xl border border-lime-400/20">
            <Utensils className="text-lime-400" size={28} />
          </div>
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter italic">
              Nutritional <span className="text-lime-400">Blueprint</span>
            </h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-1 italic">
              AI Powered Diet Engine Configuration
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* --- 1. DIETARY PREFERENCE --- */}
        <section className="space-y-6" data-aos="fade-right">
          <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
            <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
            Dietary Foundation
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {preferences.map((pref) => (
              <button
                key={pref.id}
                onClick={() => setDietConfig({ ...dietConfig, dietaryPreference: pref.id })}
                className={`p-6 rounded-[2rem] border-2 transition-all duration-500 flex flex-col items-center gap-3 ${
                  dietConfig.dietaryPreference === pref.id 
                  ? "bg-lime-400 border-lime-400 text-black shadow-[0_0_30px_rgba(163,230,53,0.3)]" 
                  : "bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-600"
                }`}
              >
                {pref.icon}
                <span className="text-xs font-black uppercase">{pref.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* --- 2. ENERGY GOAL --- */}
        <section className="space-y-6" data-aos="fade-left">
          <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            Energy Vector
          </h2>
          <div className="flex gap-4">
            {["deficit", "surplus"].map((level) => (
              <button
                key={level}
                onClick={() => setDietConfig({ ...dietConfig, deficitOrSurplusLevel: level })}
                className={`flex-1 p-8 rounded-[2.5rem] border-2 transition-all duration-500 text-center relative overflow-hidden ${
                  dietConfig.deficitOrSurplusLevel === level 
                  ? "bg-white border-white text-black" 
                  : "bg-slate-900/40 border-slate-800 text-slate-500"
                }`}
              >
                <Scale className={`mx-auto mb-2 ${dietConfig.deficitOrSurplusLevel === level ? "text-blue-600" : "text-slate-700"}`} />
                <span className="text-sm font-black uppercase">{level}</span>
                <p className="text-[9px] mt-1 opacity-60 font-bold uppercase italic">Weight {level === 'deficit' ? 'Loss' : 'Gain'}</p>
              </button>
            ))}
          </div>
        </section>

        {/* --- 3. MEAL FREQUENCY & TIMING --- */}
        <section className="space-y-6" data-aos="fade-up">
          <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            Temporal Logic
          </h2>
          <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[3rem] space-y-8">
            {/* Frequency Slider */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black uppercase text-slate-500 tracking-widest">Meal Frequency</span>
                <span className="text-lime-400 font-black text-xl">{dietConfig.mealFrequency} <span className="text-xs">Sessions</span></span>
              </div>
              <input 
                type="range" min="2" max="6" 
                value={dietConfig.mealFrequency}
                onChange={(e) => setDietConfig({...dietConfig, mealFrequency: parseInt(e.target.value)})}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-lime-400" 
              />
            </div>

            {/* Heavy Meal Timing */}
            <div>
              <span className="text-xs font-black uppercase text-slate-500 tracking-widest mb-4 block">Peak Intake Window</span>
              <div className="flex flex-wrap gap-2">
                {["breakfast", "lunch", "dinner", "evening-snack"].map((time) => (
                  <button
                    key={time}
                    onClick={() => setDietConfig({...dietConfig, heavyMealTiming: time})}
                    className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                      dietConfig.heavyMealTiming === time 
                      ? "bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]" 
                      : "bg-slate-950 border-slate-800 text-slate-600"
                    }`}
                  >
                    {time.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- 4. ALLERGIES & FLEXIBILITY --- */}
        <section className="space-y-6" data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            Biological Constraints
          </h2>
          <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[3rem] space-y-8">
            {/* Allergies Chip Cloud */}
            <div>
               <span className="text-xs font-black uppercase text-slate-500 tracking-widest mb-4 block flex items-center gap-2">
                 <AlertTriangle size={14} className="text-red-500" /> High Alert Allergies
               </span>
               <div className="flex flex-wrap gap-2">
                 {["Peanuts", "Dairy", "Gluten", "Soy", "None"].map((all) => (
                    <button
                      key={all}
                      onClick={() => setDietConfig({...dietConfig, allergies: [all]})}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                        dietConfig.allergies.includes(all)
                        ? "bg-red-500 text-white shadow-lg"
                        : "bg-slate-800 text-slate-500 border border-slate-700 hover:border-red-500/50"
                      }`}
                    >
                      {all}
                    </button>
                 ))}
               </div>
            </div>

            {/* Flexibility Mode */}
            <div className="pt-4 border-t border-slate-800">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm font-bold">
                    <Calendar size={18} className="text-blue-400" />
                    <span className="uppercase tracking-widest text-[11px]">Free Sunday Protocol</span>
                  </div>
                  <button 
                    onClick={() => setDietConfig({...dietConfig, flexibilityMode: dietConfig.flexibilityMode === 'free-sunday' ? 'no-free-day' : 'free-sunday'})}
                    className={`w-14 h-7 rounded-full transition-all relative ${dietConfig.flexibilityMode === 'free-sunday' ? 'bg-blue-500' : 'bg-slate-800'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${dietConfig.flexibilityMode === 'free-sunday' ? 'left-8' : 'left-1'}`} />
                  </button>
               </div>
            </div>
          </div>
        </section>

        {/* --- SAVE / GENERATE BUTTON --- */}
        <div className="md:col-span-2 pt-10" data-aos="zoom-in">
          <button className="w-full py-8 bg-lime-400 text-black rounded-[3rem] font-black text-2xl uppercase italic tracking-tighter hover:bg-white hover:scale-[1.02] transition-all flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(163,230,53,0.2)]">
            Synthesize Diet Plan <CheckCircle2 size={32} strokeWidth={3} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Diet;