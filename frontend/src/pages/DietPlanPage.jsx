import React, { useState, useEffect } from "react";
import {
  Flame,
  Target,
  Dumbbell,
  Calendar,
  ChevronRight,
  Activity,
  PieChart,
  Info,
} from "lucide-react";
import AOS from "aos";
import api from "../config/API";
import { useAuth } from "../config/AuthContext";
import DietarySetup from "./DietarySetup";

const DietPlan = () => {
  const { user } = useAuth();

  const [selectedDay, setSelectedDay] = useState(0);
  // const [isShowModel, setIsShowModel] = useState(true);

  const [dietChart, setDietChart] = useState(null);

  const fetchDietChart = async () => {
    try {
      console.log(user._id);

      const res = await api.get(
        `${import.meta.env.VITE_GET_DIET_CHART_G}/${user._id}`,
      );
      localStorage.setItem("DietChart", JSON.stringify(res?.data));
      setDietChart(res?.data);
      console.log(res?.data);
    } catch (error) {
      console.log(error);
    }
  };


  // useEffect(() => {

  //   fetchDietChart();

  //   const data = JSON.parse(localStorage.getItem("DietChart"));
  //   console.log(data);
  //   setDietChart(data);
  // }, []);

  

  useEffect(() => {
    const loadData = async () => {
      // Pehle localStorage check karein
      const savedData = localStorage.getItem("DietChart");
      if (savedData) {
        setDietChart(JSON.parse(savedData).data); // dhayan de yahan .data hai ya nahi structure ke hisab se
      }
      // Phir fresh data fetch karein
      await fetchDietChart();
    };
    loadData();
    AOS?.init({ duration: 800 });
  }, []);


  console.log(dietChart);

  // Agar data load nahi hua
  if (!dietChart)
    return (
      <div className="text-white p-10">Initializing Nutritional Engine....</div>
    );

  return (
    <>
      {/* {isShowModel && (
        <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <DietarySetup onComplete={() => setIsShowModel(false)} />
        </div>
      )} */}
      <div className="min-h-screen bg-[#05080a] text-white pt-24 pb-12 px-6 font-sans">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* --- HEADER: GOAL & STATUS --- */}
          <div
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/30 p-8 rounded-[3rem] border border-white/5 backdrop-blur-xl"
            data-aos="fade-down"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-lime-400 text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                  Week {dietChart?.data?.weekNumber} Active
                </span>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-black uppercase tracking-widest rounded-full">
                  {dietChart?.data?.goal?.replace("-", " ")}
                </span>
              </div>
              <h1 className="text-4xl font-black uppercase italic tracking-tighter">
                Dietary <span className="text-lime-400">Protocol</span>
              </h1>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0?.2em] mb-1">
                System Status
              </p>
              <div className="flex items-center gap-2 text-lime-400">
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-ping" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Optimizing Metabolism
                </span>
              </div>
            </div>
          </div>

          {/* --- MACRO SUMMARY ROW --- */}
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            data-aos="fade-up"
          >
            {/* Calorie Card */}
            <div className="bg-slate-900/40 p-6 rounded-[2?.5rem] border border-white/5 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Flame size={120} />
              </div>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                Daily Target
              </p>
              <h3 className="text-4xl font-black text-white mt-2 italic">
                {dietChart?.data?.dailyTargets?.calories}{" "}
                <span className="text-sm text-slate-500 not-italic">Kcal</span>
              </h3>
              <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-400">
                <Info size={12} /> Base:{" "}
                {dietChart?.data?.planMeta?.maintenanceCalories} | Adj:{" "}
                {dietChart?.data?.planMeta?.adjustmentValue}
              </div>
            </div>

            {/* Protein */}
            <div className="bg-slate-900/40 p-6 rounded-[2?.5rem] border border-white/5">
              <div className="flex justify-between items-center mb-4">
                <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">
                  Protein
                </p>
                <span className="text-[10px] text-slate-500 font-bold">
                  {dietChart?.data?.macroSplit?.proteinPercent}%
                </span>
              </div>
              <h3 className="text-3xl font-black">
                {dietChart?.data?.dailyTargets?.proteinGrams}g
              </h3>
              <div className="w-full bg-slate-950 h-1?.5 rounded-full mt-4 overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full"
                  style={{
                    width: `${dietChart?.data?.macroSplit?.proteinPercent}%`,
                  }}
                />
              </div>
            </div>

            {/* Carbs */}
            <div className="bg-slate-900/40 p-6 rounded-[2?.5rem] border border-white/5">
              <div className="flex justify-between items-center mb-4">
                <p className="text-[10px] text-lime-400 font-black uppercase tracking-widest">
                  Carbohydrates
                </p>
                <span className="text-[10px] text-slate-500 font-bold">
                  {dietChart?.data?.macroSplit?.carbsPercent}%
                </span>
              </div>
              <h3 className="text-3xl font-black">
                {dietChart?.data?.dailyTargets?.carbsGrams}g
              </h3>
              <div className="w-full bg-slate-950 h-1?.5 rounded-full mt-4 overflow-hidden">
                <div
                  className="bg-lime-400 h-full rounded-full"
                  style={{
                    width: `${dietChart?.data?.macroSplit?.carbsPercent}%`,
                  }}
                />
              </div>
            </div>

            {/* Fats */}
            <div className="bg-slate-900/40 p-6 rounded-[2?.5rem] border border-white/5">
              <div className="flex justify-between items-center mb-4">
                <p className="text-[10px] text-orange-400 font-black uppercase tracking-widest">
                  Fats
                </p>
                <span className="text-[10px] text-slate-500 font-bold">
                  {dietChart?.data?.macroSplit?.fatPercent}%
                </span>
              </div>
              <h3 className="text-3xl font-black">
                {dietChart?.data?.dailyTargets?.fatGrams}g
              </h3>
              <div className="w-full bg-slate-950 h-1?.5 rounded-full mt-4 overflow-hidden">
                <div
                  className="bg-orange-400 h-full rounded-full"
                  style={{
                    width: `${dietChart?.data?.macroSplit?.fatPercent}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* --- 7-DAY NAVIGATION & DETAILS --- */}
          <div
            className="grid grid-cols-1 lg:grid-cols-4 gap-8"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {/* Day Selector Sidebar */}
            <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 ml-4">
                Select Day Node
              </p>
              {dietChart?.data?.days?.map((day, idx) => (
                <button
                  key={day?._id}
                  onClick={() => setSelectedDay(idx)}
                  className={`w-full p-5 rounded-[2rem] border transition-all flex items-center justify-between group ${selectedDay === idx ? "bg-lime-400 border-lime-400 text-black shadow-[0_10px_30px_rgba(163,230,53,0?.2)]" : "bg-slate-900/40 border-white/5 text-slate-500 hover:border-white/10"}`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar size={18} />
                    <span className="text-xs font-black uppercase tracking-widest">
                      {day?.day}
                    </span>
                  </div>
                  <ChevronRight
                    size={16}
                    className={
                      selectedDay === idx ? "text-black" : "text-slate-800"
                    }
                  />
                </button>
              ))}
            </div>

            {/* Day Details Area */}
            <div className="lg:col-span-3 bg-slate-900/40 border border-white/5 rounded-[3rem] p-10 relative overflow-hidden">
              {/* Decorative Background Icon */}
              <PieChart
                size={200}
                className="absolute -right-20 -bottom-20 opacity-5 text-white"
              />

              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-3xl font-black uppercase italic tracking-tight">
                    {dietChart?.data?.days[selectedDay]?.day} Consumption
                  </h2>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">
                    Adaptive Nutritional Distribution
                  </p>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl border border-white/5 text-center">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    Daily Burn
                  </p>
                  <p className="text-xl font-black text-lime-400">
                    -{dietChart?.days?.[selectedDay]?.planned?.calories || 0}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                    <span>Protein</span>
                    <span>
                      {dietChart?.days[selectedDay]?.planned?.protein}g
                    </span>
                  </div>
                  <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                    <span>Carbs</span>
                    <span>
                      {dietChart?.data?.days[selectedDay]?.planned?.carbs}g
                    </span>
                  </div>
                  <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className="bg-lime-400 h-full rounded-full"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                    <span>Fats</span>
                    <span>
                      {dietChart?.data?.days[selectedDay]?.planned?.fat}g
                    </span>
                  </div>
                  <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className="bg-orange-400 h-full rounded-full"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-16 p-8 bg-lime-400/5 border border-lime-400/10 rounded-[2rem] flex items-center gap-6">
                <div className="bg-lime-400/20 p-4 rounded-2xl text-lime-400">
                  <Activity size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0?.2em] text-lime-400 mb-1">
                    AI Recommendation
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed italic">
                    "Based on your <b>{dietChart?.goal}</b> mission, today's
                    focus is on sustained glucose release?. Ensure high protein
                    intake post-workout to meet the{" "}
                    {dietChart?.days[selectedDay]?.planned?.protein}g
                    threshold?."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DietPlan;
