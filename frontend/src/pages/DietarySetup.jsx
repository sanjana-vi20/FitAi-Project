import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Utensils,
  Clock,
  AlertTriangle,
  Calendar,
  Check,
  Leaf,
  Egg,
  Drumstick,
  Sparkles,
} from "lucide-react";
import AOS from "aos";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../config/AuthContext";
import api from "../config/API";
import toast from "react-hot-toast";
import DietPlan from "./DietPlanPage";

const DietarySetup = ({ onComplete }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [dietChart, setDietChart] = useState({});

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    deficitOrSurplusLevel: "deficit",
    mealFrequency: 0,
    dietaryPreference: "vegetarian",
    allergies: [],
    heavyMealTiming: "lunch",
    flexibilityMode: "no-free-day",
  });

  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  const allergyOptions = [
    "Peanuts",
    "Dairy",
    "Gluten",
    "Soy",
    "Shellfish",
    "Eggs",
    "Tree Nuts",
    "None",
  ];

  // Logic to generate meal timing options based on frequency
  const getMealOptions = () => {
    const base = ["Breakfast", "Lunch", "Dinner"];
    if (parseInt(formData.mealFrequency) === 4)
      return ["Breakfast", "Lunch", "Mid-Day-Meal", "Dinner"];
    if (parseInt(formData.mealFrequency) === 5)
      return ["Breakfast", "Morning-Snack", "Lunch", "Evening-Snack", "Dinner"];
    return base;
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAllergyToggle = (allergy) => {
    if (allergy === "None") {
      setFormData((prev) => ({ ...prev, allergies: ["None"] }));
      return;
    }
    setFormData((prev) => {
      const filtered = prev.allergies.filter((a) => a !== "None");
      return {
        ...prev,
        allergies: filtered.includes(allergy)
          ? filtered.filter((a) => a !== allergy)
          : [...filtered, allergy],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(import.meta.env.VITE_DIET_PREFERENCE_P, formData);
      toast.success(res?.data?.message || "Diet Plan generated Successfully");

      navigate('/diet');
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <>
      <div className="fixed inset-0 z-150 flex items-center justify-center p-4 bg-[#05080a]/95 backdrop-blur-2xl">
        <div
          data-aos="zoom-in"
          className="w-full max-w-2xl bg-slate-900 border border-white/5 rounded-[3rem] p-8 md:p-10 relative overflow-hidden shadow-2xl"
        >
          {/* Progress Bar */}
          <div
            className="absolute top-0 left-0 h-1 bg-lime-400 transition-all duration-700"
            style={{ width: `${(step / 3) * 100}%` }}
          />

          {/* --- STEP 1: CALORIC GOAL & PREFERENCE --- */}
          {step === 1 && (
            <div data-aos="fade-right" className="space-y-8 text-left">
              <div>
                <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                  Step 01: Diet Identity
                </h2>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                  Fuel Preference & Strategy
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                    Caloric Strategy
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {["deficit", "surplus"].map((mode) => (
                      <button
                        key={mode}
                        onClick={() =>
                          handleChange("deficitOrSurplusLevel", mode)
                        }
                        className={`py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${formData.deficitOrSurplusLevel === mode ? "bg-lime-400 text-black border-lime-400" : "bg-slate-950 text-slate-500 border-slate-800 hover:border-slate-600"}`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                    Dietary Preference
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "vegetarian",
                      "non-vegetarian",
                      "vegan",
                      "eggetarian",
                    ].map((pref) => (
                      <button
                        key={pref}
                        onClick={() => handleChange("dietaryPreference", pref)}
                        className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${formData.dietaryPreference === pref ? "bg-lime-400/10 border-lime-400 text-white" : "bg-slate-950 text-slate-500 border-slate-800 hover:border-slate-600"}`}
                      >
                        <Check
                          size={14}
                          className={
                            formData.dietaryPreference === pref
                              ? "text-lime-400"
                              : "text-transparent"
                          }
                        />
                        <span className="text-[10px] font-black uppercase">
                          {pref}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- STEP 2: FREQUENCY & TIMING --- */}
          {step === 2 && (
            <div data-aos="fade-right" className="space-y-8 text-left">
              <div>
                <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                  Step 02: Meal Sequencing
                </h2>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                  Optimization of Intake Timing
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Utensils size={14} /> Meals Frequency
                  </label>
                  <div className="flex gap-4">
                    {[3, 4, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleChange("mealFrequency", num)}
                        className={`flex-1 py-4 rounded-2xl border font-black transition-all ${formData.mealFrequency === num ? "bg-white text-black border-white" : "bg-slate-950 text-slate-500 border-slate-800"}`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Clock size={14} /> Heavy Meal Timing
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {getMealOptions().map((time) => (
                      <button
                        key={time}
                        onClick={() =>
                          handleChange("heavyMealTiming", time.toLowerCase())
                        }
                        className={`p-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${formData.heavyMealTiming === time.toLowerCase() ? "border-lime-400 text-lime-400 bg-lime-400/5" : "bg-slate-950 text-slate-500 border-slate-800 hover:border-slate-600"}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- STEP 3: ALLERGIES & FLEXIBILITY --- */}
          {step === 3 && (
            <div data-aos="fade-right" className="space-y-8 text-left">
              <div>
                <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                  Step 03: Protocol Limits
                </h2>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                  Safety & Recovery Modes
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <AlertTriangle size={14} /> Allergies / Intolerances
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {allergyOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAllergyToggle(opt)}
                        className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${formData.allergies.includes(opt) ? "bg-red-500 border-red-500 text-white" : "bg-slate-950 text-slate-500 border-slate-800 hover:border-slate-600"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Calendar size={14} /> Flexibility Protocol
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      {
                        id: "free-sunday",
                        label: "Sunday Holiday (Cheat Day Allowed)",
                      },
                      {
                        id: "no-free-day",
                        label: "Full Compliance (No Holidays)",
                      },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => handleChange("flexibilityMode", mode.id)}
                        className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${formData.flexibilityMode === mode.id ? "border-lime-400 bg-lime-400/5 text-white" : "bg-slate-950 text-slate-500 border-slate-800"}`}
                      >
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {mode.label}
                        </span>
                        {formData.flexibilityMode === mode.id && (
                          <Sparkles size={16} className="text-lime-400" />
                        )}
                      </button>
                    ))}
                  </div>
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
              onClick={step === 3 ? handleSubmit : nextStep}
              disabled={loading}
              className="flex-1 px-8 py-4 rounded-2xl bg-lime-400 text-black font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_30px_rgba(163,230,53,0.3)]"
            >
              {loading
                ? "Syncing Engine..."
                : step === 3
                  ? "Generate Diet Plan"
                  : "Confirm & Continue"}
              {!loading && <ChevronRight size={18} strokeWidth={3} />}
            </button>
          </div>
        </div>
      </div>

      {/* <DietPlan/> */}
    </>
  );
};

export default DietarySetup;
