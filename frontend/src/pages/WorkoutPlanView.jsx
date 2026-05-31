import React, { useState } from "react";
import {
  Dumbbell,
  Clock,
  Zap,
  Flame,
  ChevronRight,
  Calendar,
  Info,
  CheckCircle2,
  Target,
} from "lucide-react";

const WorkoutPlanView = ({ planData }) => {
  const [selectedDay, setSelectedDay] = useState(0); // Default Day 1 (DayIndex 0)

  // Analytics helper from data
  const { analytics, goal, experienceLevel, weekTemplate } = planData;

  return (
    <>
      {analytics && goal && weekTemplate && (
        <div className="w-full space-y-8 animate-in fade-in duration-700 overflow-hidden">
          {/* --- TOP ANALYTICS BAR --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Avg Intensity",
                value: analytics.averageIntensity,
                icon: <Zap size={16} />,
                color: "text-lime-400",
              },
              {
                label: "Workout Days",
                value: `${analytics.totalWorkoutDays} / 7`,
                icon: <Calendar size={16} />,
                color: "text-blue-400",
              },
              {
                label: "Total Volume",
                value: `${analytics.totalExercises} Ex.`,
                icon: <Dumbbell size={16} />,
                color: "text-orange-400",
              },
              {
                label: "Current Goal",
                value: goal.replace("-", " "),
                icon: <Target size={16} />,
                color: "text-purple-400",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-slate-900/50 border border-white/5 p-4 rounded-2xl backdrop-blur-md"
              >
                <div className={`mb-2 ${stat.color} opacity-80`}>
                  {stat.icon}
                </div>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                  {stat.label}
                </p>
                <h4 className="text-lg font-black text-white uppercase italic">
                  {stat.value}
                </h4>
              </div>
            ))}
          </div>

          {/* --- WEEKLY SELECTOR --- */}
          <div className="flex flex-wrap gap-2 p-2 bg-slate-950/50 border border-slate-800 rounded-[2rem] overflow-x-auto no-scrollbar">
            {weekTemplate.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDay(idx)}
                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap
              ${
                selectedDay === idx
                  ? "bg-lime-400 text-black shadow-[0_0_15px_rgba(163,230,53,0.4)]"
                  : "text-slate-500 hover:text-slate-300 hover:bg-slate-900"
              }`}
              >
                {day.day} {day.type === "rest" && "💤"}
              </button>
            ))}
          </div>

          {/* --- DAY DETAILS SECTION --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Day Summary */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 rounded-[3rem] sticky top-28">
                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">
                  {weekTemplate[selectedDay].day}
                </h3>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime-400/10 border border-lime-400/20 rounded-full text-lime-400 mb-6">
                  <Zap size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {weekTemplate[selectedDay].type} Node
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-800">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                      Focus
                    </span>
                    <span className="text-xs text-white font-black uppercase italic">
                      {weekTemplate[selectedDay].focus}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-800">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                      Intensity
                    </span>
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 w-4 rounded-full ${i < weekTemplate[selectedDay].intensityLevel ? "bg-orange-500" : "bg-slate-800"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {weekTemplate[selectedDay].type === "rest" ? (
                  <div className="mt-8 p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl text-center">
                    <Clock className="mx-auto text-blue-400 mb-3" size={32} />
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      AI has scheduled a **Rest Node** to optimize muscle
                      recovery and hormone balance.
                    </p>
                  </div>
                ) : (
                  <button className="w-full mt-8 py-4 bg-lime-400 text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:scale-105 transition-all shadow-lg active:scale-95">
                    Execute Protocol
                  </button>
                )}
              </div>
            </div>

            {/* Right: Exercises List */}
            <div className="lg:col-span-2 space-y-4">
              {weekTemplate[selectedDay].exercises.length > 0 ? (
                weekTemplate[selectedDay].exercises.map((ex, i) => (
                  <div
                    key={i}
                    data-aos="fade-left"
                    data-aos-delay={i * 100}
                    className="group relative bg-slate-900/30 backdrop-blur-md border border-white/5 p-6 rounded-[2rem] hover:border-lime-500/30 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-6">
                      <div className="h-14 w-14 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center text-lime-400 group-hover:bg-lime-400 group-hover:text-black transition-all">
                        <Dumbbell size={24} />
                      </div>
                      <div>
                        <h5 className="text-white font-black uppercase italic tracking-tight group-hover:text-lime-400 transition-colors">
                          {ex.exerciseName}
                        </h5>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            {ex.type}
                          </span>
                          <div className="h-1 w-1 bg-slate-700 rounded-full" />
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
                            <Clock size={10} /> {ex.duration} MINS
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">
                        Target
                      </p>
                      <p className="text-xl font-black text-white italic">
                        {ex.sets}{" "}
                        <span className="text-xs text-slate-500">SETS</span>
                        {ex.reps !== "N/A" && (
                          <>
                            {" "}
                            <span className="mx-1">×</span> {ex.reps}{" "}
                            <span className="text-xs text-slate-500">REPS</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 bg-slate-900/10 border-2 border-dashed border-slate-800 rounded-[3rem]">
                  <div className="p-6 bg-slate-900 rounded-full mb-4">
                    <Zap size={48} className="text-slate-700" />
                  </div>
                  <h4 className="text-xl font-black text-slate-500 uppercase italic">
                    Adaptive Recovery Active
                  </h4>
                  <p className="max-w-xs text-xs text-slate-600 font-medium mt-2 leading-relaxed">
                    No exercises scheduled for today. The engine is prioritizing
                    CNS recovery based on your intensity levels.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkoutPlanView;
