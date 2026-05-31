import React from "react";
import { useAuth } from "../config/AuthContext";
import { useState } from "react";
import api from "../config/API";
import { useEffect } from "react";
// import React, { useState, useEffect } from "react";
import {
  Dumbbell,
  Play,
  CheckCircle2,
  Timer,
  Flame,
  ChevronRight,
  Info,
  Zap,
  Coffee,
  Loader2,
  Activity,
  Target,
  LayoutDashboard,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
// import { Activity } from "react";
import { useWorkout } from "../config/WorkoutContext";

const Workouts = () => {
  const { user, islogin } = useAuth();

  const [loading, setLoading] = useState();

  const { weekWorkouts, setWeekWorkouts, plan, setPlan } = useWorkout();

  const [activeStep, setActiveStep] = useState(0);

  // All the details below

  const [workoutDetails, setWorkoutDetails] = useState({
    date: Date.now(),
    planned: false,
    completed: false,
    completionPercentage: 0,
    exercisesDone: 0,
    totalExercises: 0,
    durationMinutes: 0,
    intensityLevel: 1,
  });
  const [notes, setNotes] = useState("");
  const [dietDetails, setDietDetails] = useState({
    followed: false,
    adherencePercentage: 0,
    estimatedCaloriesConsumed: 0,
    proteinHit: false,
  });
  const [recoveryDetails, setRecoveryDetails] = useState({
    energyLevel: "",
    sleepHours: 0,
    muscleSoreness: 1,
  });
  const [bodyMetrics, setBodyMetrics] = useState({
    chest: 0,
    thighs: 0,
    waist: 0,
    arms: 0,
  });
  // const currentDayData = workouts[activeStep];

  const [formData, setFormData] = useState({
    activities: user?.profile[0]?.activities,
    activityLevel: user?.profile[0]?.activityLevel,
    experienceLevel: user?.profile[0]?.experienceLevel,
  });

  const currentDayData = weekWorkouts?.[activeStep];

  const fetchWorkouts = async () => {
    try {
      const res = await api.get(import.meta.env.VITE_GET_WORKOUTS_G);
    setPlan(res?.data?.data);
    setWeekWorkouts(res?.data?.data?.weekTemplate);
    } catch (error) {
      console.log(error)
    }
  };

useEffect(() => {
  fetchWorkouts();
}, []);

  const handleWorkoutSubmission = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("");
      toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  // all essential functions

  const startWorkout = () => {
    setWorkoutDetails((prev) => ({
      ...prev,
      date: new Date(),
      [planned]: !!currentDayData,
      totalExercises: currentDayData?.exercises?.length,
      intensityLevel: currentDayData?.intensityLevel,
    }));
  };

  // console.log(user);

  // console.log(weekWorkouts[0]?.weekTemplate[activeStep]?.exercises);
  // console.log(plan);

 if (loading) {
    return (
      <div className="min-h-screen bg-[#05080a] text-white p-4 md:p-8 pt-28 font-sans flex flex-col items-center justify-center">
        <p className="text-lime-400 font-black animate-pulse uppercase tracking-[0.3em] text-[10px]">
          Establishing Neural Link...
        </p>
      </div>
    );
  }

  // No Data State
  if (!weekWorkouts || weekWorkouts.length === 0) {
    return (
      <div className="h-screen w-full bg-[#05080a] flex flex-col items-center justify-center text-white p-6 text-center">
        <h2 className="text-2xl font-black uppercase italic">No Protocol Synced</h2>
        <p className="text-slate-500 text-sm mt-2 max-w-xs">
          Please ensure your profile is complete to generate a workout plan.
        </p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#05080a] text-white p-4 md:p-8 pt-28 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- 1. TOP ANALYTICS BAR --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12" data-aos="fade-down">
          {[
            { label: "Goal", value: weekWorkouts[activeStep]?.goal, icon: <Target size={14}/> },
            { label: "Intensity", value: `${weekWorkouts[activeStep].analytics?.averageIntensity} Lvl`, icon: <Zap size={14}/> },
            { label: "Total Exercises", value: weekWorkouts[activeStep].analytics?.totalExercises, icon: <Activity size={14}/> },
            { label: "Workout Days", value: `${weekWorkouts[activeStep].analytics?.totalWorkoutDays} / 7`, icon: <LayoutDashboard size={14}/> }
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900/40 border border-white/5 p-4 rounded-3xl backdrop-blur-xl group hover:border-lime-400/30 transition-all">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                {stat.icon}
                <span className="text-[9px] font-black uppercase tracking-widest">{stat.label}</span>
              </div>
              <p className="text-lg font-black uppercase italic text-white group-hover:text-lime-400 transition-colors">
                {stat.value?.toString().replace('-', ' ')}
              </p>
            </div>
          ))}
        </div>

        {/* --- 2. DAY STEPPER --- */}
        <div className="flex items-center gap-4 p-4  overflow-x-auto no-scrollbar pb-8 mb-8" data-aos="fade-up">
          {weekWorkouts[0]?.weekTemplate?.map((item, index) => (
            <div key={index} className="flex items-center">
              <button
                onClick={() => setActiveStep(index)}
                className={`flex flex-col items-center justify-center min-w-[70px] h-[70px] rounded-3xl border-2 transition-all duration-500 ${
                  activeStep === index
                    ? "bg-lime-400 border-lime-400 text-black shadow-[0_0_30px_rgba(163,230,53,0.4)] scale-110"
                    : "bg-slate-900/40 border-slate-800 text-slate-500"
                }`}
              >
                <span className="text-[8px] font-black uppercase mb-1">Day</span>
                <span className="text-xl font-black leading-none">{index + 1}</span>
              </button>
              {index !== weekWorkouts[0].weekTemplate.length - 1 && (
                <div className={`w-6 h-[2px] mx-1 rounded-full ${index < activeStep ? "bg-lime-400" : "bg-slate-900"}`} />
              )}
            </div>
          ))}
        </div>

        {/* --- 3. EXERCISES SECTION --- */}
        {currentDayData?.weekTemplate[activeStep]?.exercises?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2 mb-4" data-aos="fade-right">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter">
                  {currentDayData.weekTemplate[activeStep].day} <span className="text-lime-400">Execution</span>
                </h2>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1 italic">
                  Focus: {currentDayData.weekTemplate[activeStep].focus?.replace('-', ' ')} / Intensity: {currentDayData.weekTemplate[activeStep].intensityLevel}
                </p>
            </div>
            
            {currentDayData.weekTemplate[activeStep].exercises.map((ex, i) => (
              <div key={i} data-aos="zoom-in-up" data-aos-delay={i * 100} className="group relative bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-lime-400/30 transition-all duration-500">
                <span className="absolute top-6 right-8 text-7xl font-black text-white/[0.03] italic pointer-events-none group-hover:text-lime-400/[0.05]">0{i + 1}</span>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-2xl flex items-center justify-center text-black shadow-lg">
                    <Activity size={28} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white italic">{ex.exerciseName}</h3>
                    <span className="text-[9px] bg-slate-950 text-slate-500 px-3 py-1 rounded-full font-black uppercase border border-white/5">{ex.type}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-black/40 p-4 rounded-3xl border border-white/5 text-center group-hover:bg-black/60 transition-colors">
                    <p className="text-[9px] text-slate-500 font-black uppercase">Sets</p>
                    <p className="text-2xl font-black text-white">{ex.sets}</p>
                  </div>
                  {ex?.reps !== "N/A" && (<div className="bg-black/40 p-4 rounded-3xl border border-white/5 text-center group-hover:bg-black/60 transition-colors">
                    <p className="text-[9px] text-slate-500 font-black uppercase">Reps</p>
                    <p className="text-lg font-black text-white leading-tight mt-1">{ex.reps}</p>
                  </div>)}
                  <div className="bg-black/40 p-4 rounded-3xl border border-white/5 text-center group-hover:bg-black/60 transition-colors">
                    <p className="text-[9px] text-slate-500 font-black uppercase">Duration</p>
                    <p className="text-2xl font-black text-lime-400 leading-tight">
                        {ex.duration >= 60 ? `${Math.floor(ex.duration / 60)}m` : `${ex.duration}s`}
                    </p>
                  </div>
                </div>

                <button className="w-full py-4 bg-lime-400 text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-white transition-all shadow-[0_10px_30px_rgba(163,230,53,0.15)] active:scale-95">
                  Start Performance
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* --- REST DAY UI --- */
          <div data-aos="zoom-in" className="relative py-32 bg-slate-900/10 border-2 border-dashed border-slate-800 rounded-[4rem] text-center">
            <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mx-auto mb-8 animate-bounce">
              <Coffee size={48} />
            </div>
            <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white">Neural Recovery</h2>
            <p className="text-slate-500 text-sm mt-4 max-w-sm mx-auto uppercase font-bold tracking-wide">
              Biological Recalibration in progress. Optimization requires total rest.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Workouts;
