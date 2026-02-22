import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Target,
  Scale,
  Ruler,
  Zap,
  Trophy,
  Flame,
  Check,
} from "lucide-react";
import AOS from "aos";
import api from '../../config/API'
import { useNavigate } from "react-router-dom";

const ProfileSetup = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "moderate",
    experienceLevel: "beginner",
    activities: "stay-fit",
    type: "strength",
    target: {
      height: "",
      weight: "",
    },
  });
  
  const navigate = useNavigate();
  const [loading , setLoading] = useState(false);
  const [excersise , setExcersise] = useState();

  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleChange = (e) => {
    // e.preventDefault();

    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    console.log("formData : ", formData);
    setLoading(true)

    try {
      const res = await api.post("/")
      
    } catch (error) {
      
    }


    onComplete();
    navigate('/user-dashboard')
  };

  return (
    <div className="fixed inset-0 z-150 flex items-center justify-center p-4 bg-[#05080a]/95 backdrop-blur-2xl">
      <div
        data-aos="zoom-in"
        className="w-full max-w-2xl bg-slate-900 border border-white/5 rounded-[3rem] p-8 md:p-10 relative overflow-hidden shadow-2xl"
      >
        {/* Progress Bar */}
        <div
          className="absolute top-0 left-0 h-1 bg-lime-400 transition-all duration-700"
          style={{ width: `${(step / 4) * 100}%` }}
        />

        {/* --- STEP 1: BIOMETRICS --- */}
        {step === 1 && (
          <div data-aos="fade-right" className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                Step 01: Physical Stats
              </h2>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-left">
                Core Biometric Data
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Age (Years)
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-white focus:border-lime-400/50 outline-none transition-all"
                  placeholder="e.g. 24"
                  required
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Gender Identity
                </label>
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-white focus:border-lime-400/50 outline-none appearance-none"
                >
                  <option value={'male'}>Male</option>
                  <option value={'female'}>Female</option>
                </select>
              </div>
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Scale size={14} /> Current Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-white focus:border-lime-400/50 outline-none"
                  placeholder="75"
                  required
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Ruler size={14} /> Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-white focus:border-lime-400/50 outline-none"
                  placeholder="180"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* --- STEP 2: LIFESTYLE & EXPERIENCE --- */}
        {step === 2 && (
          <div data-aos="fade-right" className="space-y-6 text-left">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
              Step 02: Performance Level
            </h2>

            <div className="space-y-6 text-left">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Activity Intensity
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["light", "moderate", "extreme"].map((level) => (
                    <button
                    required
                      key={level}
                      onClick={() =>
                        handleChange({
                          target: { name: "activityLevel", value: level },
                        })
                      }
                      className={`py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${formData.activityLevel === level ? "bg-lime-400 text-black border-lime-400" : "bg-slate-950 text-slate-500 border-slate-800 hover:border-slate-600"}`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 text-left">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Training Experience
                </label>
                <div className="grid grid-cols-2 gap-3 text-left">
                  {["beginner", "intermediate"].map((exp) => (
                    <button
                      key={exp}
                      required
                      onClick={() =>
                        handleChange({
                          target: { name: "experienceLevel", value: exp },
                        })
                      }
                      className={`py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${formData.experienceLevel === exp ? "bg-blue-500 text-white border-blue-500" : "bg-slate-950 text-slate-500 border-slate-800 hover:border-slate-600"}`}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- STEP 3: MISSION & FOCUS --- */}
        {step === 3 && (
          <div data-aos="fade-right" className="space-y-6 text-left">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
              Step 03: Primary Mission
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                {
                  id: "weight-loss",
                  label: "Weight Loss",
                  icon: <Flame size={16} />,
                },
                {
                  id: "muscle-gain",
                  label: "Muscle Gain",
                  icon: <Trophy size={16} />,
                },
                { id: "stay-fit", label: "Stay Fit", icon: <Zap size={16} /> },
                {
                  id: "weight-gain",
                  label: "Weight Gain",
                  icon: <Scale size={16} />,
                },
                {
                  id: "height-gain",
                  label: "Height Gain",
                  icon: <Scale size={16} />,
                },
              ].map((act) => (
                <button
                  key={act.id}
                  onClick={() =>
                    handleChange({
                      target: { name: "activities", value: act.id },
                    })
                  }
                  className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${formData.activities === act.id ? "bg-lime-400/10 border-lime-400 text-white" : "bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600"}`}
                >
                  {act.icon}
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {act.label}
                  </span>
                </button>
              ))}
            </div>

            {/* <div className="space-y-3 text-left">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Training Methodology</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-white focus:border-lime-400/50 outline-none">
                {['strength', 'hypertrophy', 'cardio', 'endurance', 'mobility'].map(t => (
                  <option key={t} value={t}>{t.toUpperCase()}</option>
                ))}
              </select>
            </div> */}
          </div>
        )}
        {/* --- STEP 4: TARGET METRICS --- */}
        {step === 4 && (
          <div data-aos="fade-right" className="space-y-6 text-left">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
              Step 04: Target Objectives
            </h2>
            <p className="text-slate-500 text-xs font-medium italic mb-6">
              Define your specific mission goals for the AI.
            </p>

            <div className="space-y-6">
              {/* 1. Target Weight: Only shows if activities is weight-loss or weight-gain */}
              {(formData.activities === "weight-loss" ||
                formData.activities === "weight-gain" ||
                formData.activities === "muscle-gain") && (
                <div data-aos="fade-up" className="space-y-2 text-left">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Target size={14} className="text-lime-400" /> Target Weight
                    (kg)
                  </label>
                  <input
                    type="number"
                    name="targetWeight"
                    value={formData.target.weight}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        target: { ...formData.target, weight: e.target.value },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-white focus:border-lime-400/50 outline-none transition-all"
                    placeholder="What is your goal weight?"
                  />
                </div>
              )}

              {/* 2. Target Height: Only shows if activities is height-gain */}
              {formData.activities === "height-gain" && (
                <div data-aos="fade-up" className="space-y-2 text-left">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Ruler size={14} className="text-blue-400" /> Target Height
                    (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.target.height}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        target: { ...formData.target, height: e.target.value },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-white focus:border-blue-400/50 outline-none transition-all"
                    placeholder="What is your goal height?"
                  />
                </div>
              )}

              {/* 3. Stay Fit / Maintenance (Default message if no target needed) */}
              {/* {formData.activities === "stay-fit" && (
        <div data-aos="zoom-in" className="p-8 border-2 border-dashed border-slate-800 rounded-[2rem] text-center">
          <Zap size={32} className="mx-auto text-slate-600 mb-4" />
          <p className="text-sm text-slate-400 font-medium">
            You've chosen <span className="text-white uppercase font-black">Stay Fit</span>. <br /> 
            The AI will focus on body recomposition and maintenance. 
            <br />No specific targets required.
          </p>
        </div>
      )} */}

              {/* AI Contextual Message */}
              <div className="p-4 bg-lime-400/5 border border-lime-400/20 rounded-2xl mt-4">
                <p className="text-[10px] text-lime-400 font-bold uppercase tracking-widest mb-1">
                  System Logic
                </p>
                <p className="text-xs text-slate-400 leading-relaxed italic">
                  Based on your <b>{formData.activities.replace("-", " ")}</b>{" "}
                  selection, the adaptive engine is ready to calculate your BMI
                  and daily macro floors.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* --- NAVIGATION --- */}
        <div className="mt-12 flex items-center justify-between gap-4">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="px-8 py-4 rounded-2xl bg-slate-800 text-white font-bold text-xs uppercase tracking-widest hover:bg-slate-700 transition-all"
            >
              Back
            </button>
          )}

          <button
            onClick={
              step === 4
                ? handleSubmit
                : nextStep
            } // Aapka handleSubmit yahan aayega
            className="flex-1 px-8 py-4 rounded-2xl bg-lime-400 text-black font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_30px_rgba(163,230,53,0.3)]"
          >
            {step === 4 ? "Finalize Profile" : "Confirm & Continue"}
            <ChevronRight size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
