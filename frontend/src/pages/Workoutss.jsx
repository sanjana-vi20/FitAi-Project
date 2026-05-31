import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../config/AuthContext";
import api from "../config/API";
import toast from "react-hot-toast";
import {
  Dumbbell,
  Zap,
  Coffee,
  X,
  ChevronRight,
  CheckCircle2,
  Clock,
  Flame,
  Battery,
  Moon,
  Utensils,
  FileText,
  Activity,
  Plus,
  Minus,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useWorkout } from "../config/WorkoutContext";

// ─────────────────────────────────────────────
// SET TRACKER MODAL
// Opens when user clicks "Initialize Set" on an exercise
// Lets user log each set's reps + weight, then marks exercise done
// ─────────────────────────────────────────────
const SetTrackerModal = ({ exercise, onClose, onComplete }) => {
  // Build initial sets array from exercise plan
  const [sets, setSets] = useState(
    Array.from({ length: exercise.sets }, (_, i) => ({
      setNumber: i + 1,
      targetReps: exercise.reps,
      actualReps: exercise.reps, // pre-fill with planned reps
      weight: 0,
      completed: false,
    })),
  );
  const [activeSet, setActiveSet] = useState(0);
  const [restTimer, setRestTimer] = useState(null); // countdown in seconds
  const timerRef = useRef(null);

  // Rest timer logic — starts after each set is completed
  const startRestTimer = () => {
    setRestTimer(60); // 60s rest by default
    timerRef.current = setInterval(() => {
      setRestTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  const completeSet = (index) => {
    setSets((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], completed: true };
      return updated;
    });
    // Move to next set or finish
    if (index + 1 < sets.length) {
      setActiveSet(index + 1);
      startRestTimer(); // start rest between sets
    }
  };

  const updateSet = (index, field, value) => {
    setSets((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: Number(value) };
      return updated;
    });
  };

  const allDone = sets.every((s) => s.completed);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end md:items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#0d1117] border border-white/10 rounded-[2.5rem] p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] text-lime-400 font-black uppercase tracking-widest mb-1">
              Active Exercise
            </p>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">
              {exercise.exerciseName}
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              {exercise.sets} sets × {exercise.reps} reps planned
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Rest Timer */}
        {restTimer !== null && (
          <div className="bg-lime-400/10 border border-lime-400/30 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-lime-400" />
              <span className="text-sm font-black text-lime-400 uppercase tracking-widest">
                Rest Period
              </span>
            </div>
            <span className="text-3xl font-black text-lime-400">
              {restTimer}s
            </span>
          </div>
        )}

        {/* Sets List */}
        <div className="space-y-4">
          {sets.map((set, i) => (
            <div
              key={i}
              className={`rounded-[1.5rem] border p-5 transition-all duration-300 ${
                set.completed
                  ? "bg-green-500/10 border-green-500/30"
                  : i === activeSet
                    ? "bg-lime-400/5 border-lime-400/40"
                    : "bg-slate-900/40 border-white/5 opacity-50"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Set {set.setNumber}
                </span>
                {set.completed && (
                  <CheckCircle2 size={16} className="text-green-400" />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Reps Input */}
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">
                    Reps Done
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={set.completed || i !== activeSet}
                      onClick={() =>
                        updateSet(
                          i,
                          "actualReps",
                          Math.max(0, set.actualReps - 1),
                        )
                      }
                      className="w-8 h-8 bg-slate-800 rounded-xl flex items-center justify-center disabled:opacity-30"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-2xl font-black text-white w-10 text-center">
                      {set.actualReps}
                    </span>
                    <button
                      disabled={set.completed || i !== activeSet}
                      onClick={() =>
                        updateSet(i, "actualReps", set.actualReps + 1)
                      }
                      className="w-8 h-8 bg-slate-800 rounded-xl flex items-center justify-center disabled:opacity-30"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Weight Input */}
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">
                    Weight (kg)
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={set.completed || i !== activeSet}
                      onClick={() =>
                        updateSet(i, "weight", Math.max(0, set.weight - 2.5))
                      }
                      className="w-8 h-8 bg-slate-800 rounded-xl flex items-center justify-center disabled:opacity-30"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-2xl font-black text-white w-10 text-center">
                      {set.weight}
                    </span>
                    <button
                      disabled={set.completed || i !== activeSet}
                      onClick={() => updateSet(i, "weight", set.weight + 2.5)}
                      className="w-8 h-8 bg-slate-800 rounded-xl flex items-center justify-center disabled:opacity-30"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Complete Set Button */}
              {!set.completed && i === activeSet && (
                <button
                  onClick={() => completeSet(i)}
                  className="mt-4 w-full py-3 bg-lime-400 text-black font-black text-xs uppercase tracking-widest rounded-xl"
                >
                  ✓ Complete Set {set.setNumber}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Done CTA */}
        {allDone && (
          <button
            onClick={() => onComplete(sets)}
            className="w-full py-4 bg-green-500 text-black font-black text-sm uppercase tracking-widest rounded-2xl"
          >
            Exercise Complete 🎉
          </button>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// POST-WORKOUT FORM MODAL
// Opens after all exercises are done
// Collects recovery, diet, notes from user
// ─────────────────────────────────────────────
const PostWorkoutModal = ({ onSubmit, onClose, isLoading }) => {
  const [recovery, setRecovery] = useState({
    energyLevel: "medium",
    sleepHours: 7,
    muscleSoreness: 3,
  });
  const [diet, setDiet] = useState({
    followed: false,
    estimatedCaloriesConsumed: 0,
    proteinHit: false,
  });
  const [notes, setNotes] = useState("");

  const energyOptions = [
    { value: "low", label: "Drained", emoji: "🪫" },
    { value: "medium", label: "Okay", emoji: "⚡" },
    { value: "high", label: "Pumped", emoji: "🔥" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end md:items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#0d1117] border border-white/10 rounded-[2.5rem] p-8 space-y-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] text-lime-400 font-black uppercase tracking-widest mb-1">
              Almost Done
            </p>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">
              Post-Workout Check-in
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── RECOVERY ── */}
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <Battery size={16} className="text-lime-400" />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-300">
              Recovery Details
            </h3>
          </div>

          {/* Energy Level */}
          <div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-3">
              How do you feel?
            </p>
            <div className="grid grid-cols-3 gap-3">
              {energyOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() =>
                    setRecovery((p) => ({ ...p, energyLevel: opt.value }))
                  }
                  className={`py-3 rounded-2xl border font-black text-xs uppercase tracking-widest transition-all ${
                    recovery.energyLevel === opt.value
                      ? "bg-lime-400 border-lime-400 text-black"
                      : "bg-slate-900 border-slate-800 text-slate-400"
                  }`}
                >
                  <span className="block text-xl mb-1">{opt.emoji}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sleep Hours */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                Sleep Last Night
              </p>
              <span className="text-lime-400 font-black text-sm">
                {recovery.sleepHours}h
              </span>
            </div>
            <input
              type="range"
              min={3}
              max={12}
              step={0.5}
              value={recovery.sleepHours}
              onChange={(e) =>
                setRecovery((p) => ({
                  ...p,
                  sleepHours: parseFloat(e.target.value),
                }))
              }
              className="w-full accent-lime-400"
            />
            <div className="flex justify-between text-[9px] text-slate-600 mt-1">
              <span>3h</span>
              <span>12h</span>
            </div>
          </div>

          {/* Muscle Soreness */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                Muscle Soreness
              </p>
              <span className="text-lime-400 font-black text-sm">
                {recovery.muscleSoreness}/10
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={recovery.muscleSoreness}
              onChange={(e) =>
                setRecovery((p) => ({
                  ...p,
                  muscleSoreness: parseInt(e.target.value),
                }))
              }
              className="w-full accent-lime-400"
            />
            <div className="flex justify-between text-[9px] text-slate-600 mt-1">
              <span>None</span>
              <span>Destroyed</span>
            </div>
          </div>
        </div>

        {/* ── DIET ── */}
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <Utensils size={16} className="text-lime-400" />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-300">
              Diet Details
            </h3>
          </div>

          {/* Followed Diet Toggle */}
          <div className="flex items-center justify-between bg-slate-900/60 rounded-2xl px-5 py-4 border border-white/5">
            <p className="text-sm font-bold text-slate-300">
              Followed meal plan?
            </p>
            <button
              onClick={() => setDiet((p) => ({ ...p, followed: !p.followed }))}
              className={`w-14 h-7 rounded-full transition-all relative ${diet.followed ? "bg-lime-400" : "bg-slate-700"}`}
            >
              <span
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${diet.followed ? "left-8" : "left-1"}`}
              />
            </button>
          </div>

          {/* Calories */}
          <div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">
              Estimated Calories Consumed
            </p>
            <input
              type="number"
              placeholder="e.g. 2400"
              value={diet.estimatedCaloriesConsumed || ""}
              onChange={(e) =>
                setDiet((p) => ({
                  ...p,
                  estimatedCaloriesConsumed: parseInt(e.target.value) || 0,
                }))
              }
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-3 text-white font-bold focus:border-lime-400 outline-none transition-colors"
            />
          </div>

          {/* Protein Hit Toggle */}
          <div className="flex items-center justify-between bg-slate-900/60 rounded-2xl px-5 py-4 border border-white/5">
            <p className="text-sm font-bold text-slate-300">
              Hit protein target?
            </p>
            <button
              onClick={() =>
                setDiet((p) => ({ ...p, proteinHit: !p.proteinHit }))
              }
              className={`w-14 h-7 rounded-full transition-all relative ${diet.proteinHit ? "bg-lime-400" : "bg-slate-700"}`}
            >
              <span
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${diet.proteinHit ? "left-8" : "left-1"}`}
              />
            </button>
          </div>
        </div>

        {/* ── NOTES ── */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-lime-400" />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-300">
              Session Notes
            </h3>
          </div>
          <textarea
            placeholder="How did it go? Any PRs, pain, or observations..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-white font-medium text-sm resize-none focus:border-lime-400 outline-none transition-colors placeholder:text-slate-600"
          />
        </div>

        {/* Submit */}
        <button
          onClick={() =>
            onSubmit({ recoveryDetails: recovery, dietDetails: diet, notes })
          }
          disabled={isLoading}
          className="w-full py-4 bg-lime-400 text-black font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Submit Workout Log 🏆"}
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// MAIN WORKOUTS COMPONENT
// ─────────────────────────────────────────────
const Workoutss = () => {
  const { user } = useAuth();
  const { weekWorkouts, setWeekWorkouts } = useWorkout();

  const [plan, setPlan] = useState({});

  // date object so that

  const today = new Date();
  const tomorrow = new Date(today); // copy banayi
  tomorrow.setDate(today.getDate() + 1);

  const [activeStep, setActiveStep] = useState(0);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);

  // Which exercise modal is open (index or null)
  const [activeExerciseModal, setActiveExerciseModal] = useState(null);
  // Show post-workout form?
  const [showPostWorkout, setShowPostWorkout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track completion per exercise: { completed: bool, sets: [...] }
  const [exerciseProgress, setExerciseProgress] = useState([]);

  console.log(weekWorkouts);

  useEffect(() => {
    if (weekWorkouts && weekWorkouts.length > 0) {
      const todayStr = new Date().toDateString();
      const index = weekWorkouts.findIndex(
        (w) => w.date && new Date(w.date).toDateString() === todayStr,
      );
      
      if (index !== -1) {
        setActiveStep(index);
      }
    }
  }, [weekWorkouts]);

  console.log(activeStep)
  const currentDayData = weekWorkouts?.[activeStep];


  // ── Init exercise progress when day changes ──
  useEffect(() => {
    if (currentDayData?.exercises?.length > 0) {
      setExerciseProgress(
        currentDayData.exercises.map(() => ({ completed: false, sets: [] })),
      );
    } else {
      setExerciseProgress([]);
    }
    setWorkoutStarted(false);
    setStartTime(null);
  }, [activeStep, weekWorkouts]);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const fetchWorkouts = async () => {
    try {
      const res = await api.get(import.meta.env.VITE_GET_MAIN_TODAY_PLAN);
      setPlan(res?.data?.data);
      setWeekWorkouts(res?.data?.data?.weekTemplate);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // ── Start workout session ──
  const startWorkout = () => {
    setWorkoutStarted(true);
    setStartTime(new Date());
  };

  // ── Called when user finishes logging all sets for an exercise ──
  const handleExerciseComplete = (exerciseIndex, sets) => {
    setExerciseProgress((prev) => {
      const updated = [...prev];
      updated[exerciseIndex] = { completed: true, sets };
      return updated;
    });
    setActiveExerciseModal(null);
  };

  const exercisesDone = exerciseProgress.filter((e) => e.completed).length;
  const totalExercises = exerciseProgress.length;
  const allExercisesDone =
    totalExercises > 0 && exercisesDone === totalExercises;

  // ── Final submission ──
  const handleFinalSubmit = async ({ recoveryDetails, dietDetails, notes }) => {
    setIsSubmitting(true);
    const durationMinutes = startTime
      ? Math.round((new Date() - startTime) / 60000)
      : 0;

    // Build detailed exercise logs
    const exerciseLogs = currentDayData.exercises.map((ex, i) => ({
      exerciseName: ex.exerciseName,
      completed: exerciseProgress[i]?.completed || false,
      sets: exerciseProgress[i]?.sets || [],
    }));

    const payload = {
      dayIndex: activeStep,
      workoutDetails: {
        date: startTime || new Date(),
        planned: true,
        completed: allExercisesDone,
        exercisesDone,
        totalExercises,
        durationMinutes,
        intensityLevel: currentDayData?.intensityLevel,
        completionPercentage: Math.round(
          (exercisesDone / totalExercises) * 100,
        ),
        exerciseLogs, // ← per-exercise set data
      },
      recoveryDetails,
      dietDetails,
      notes,
      planId: plan._id,
    };

    console.log("📦 Final Payload:", payload);

    try {
      await api.post(import.meta.env.VITE_WORKOUT_LOG_P, payload);
      toast.success("Workout logged successfully! 💪");
      setShowPostWorkout(false);
    } catch (error) {
      console.error(error?.response?.data?.message || "Unknown Error");
      toast.error("Failed to save. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleIsCompletedChange = async (obj, id) => {
    try {
      const res = await api.patch(`${import.meta.env.VITE_PATCH_COMPLETED}/${obj}/${id}`);
      console.log(res?.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const isSame =
    new Date(currentDayData?.date).toDateString() !== today.toDateString();

  return (
    <>
      {/* ── SET TRACKER MODAL ── */}
      {activeExerciseModal !== null &&
        currentDayData?.exercises?.[activeExerciseModal] && (
          <SetTrackerModal
            exercise={currentDayData.exercises[activeExerciseModal]}
            onClose={() => setActiveExerciseModal(null)}
            onComplete={(sets) =>
              handleExerciseComplete(activeExerciseModal, sets)
            }
          />
        )}

      {/* ── POST-WORKOUT MODAL ── */}
      {showPostWorkout && (
        <PostWorkoutModal
          onClose={() => setShowPostWorkout(false)}
          onSubmit={handleFinalSubmit}
          isLoading={isSubmitting}
        />
      )}

      <div className="min-h-screen bg-[#05080a] text-white p-4 md:p-8 pt-28 font-sans selection:bg-lime-400 selection:text-black">
        {/* ── DAY STEPPER ── */}
        <div className="max-w-7xl mx-auto mb-12 overflow-x-auto no-scrollbar py-4">
          <div className="flex items-center gap-4 min-w-max px-2">
            {weekWorkouts?.map((item, index) => (
              <div key={index} className="flex items-center">
                <button
                  onClick={() => setActiveStep(index)}
                  className={`flex flex-col items-center justify-center w-20 h-20 rounded-[2rem] border-2 transition-all duration-500 ${
                    activeStep === index
                      ? "bg-lime-400 border-lime-400 text-black shadow-[0_0_30px_rgba(163,230,53,0.4)] scale-110"
                      : "bg-slate-900/40 border-slate-800 text-slate-500 hover:border-slate-600 hover:bg-slate-900"
                  }`}
                >
                  <span className="text-[9px] font-black uppercase tracking-tighter mb-1">
                    Day
                  </span>
                  <span className="text-2xl font-black leading-none">
                    {index + 1}
                  </span>
                </button>
                {index !== weekWorkouts.length - 1 && (
                  <div
                    className={`w-10 h-[2px] mx-2 rounded-full ${index < activeStep ? "bg-lime-400" : "bg-slate-900"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* ── HEADER ── */}
          <div
            className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
            data-aos="fade-right"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-lime-400/10 text-lime-400 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] border border-lime-400/20">
                  {currentDayData?.type || "ACTIVE"} SESSION
                </span>
                <div className="h-1 w-12 bg-slate-800 rounded-full" />
                <span className="text-slate-500 font-bold text-xs italic uppercase tracking-widest">
                  {currentDayData?.day}
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
                DAY <span className="text-lime-400">0{activeStep + 1}</span>
              </h1>
            </div>

            {/* Stats Panel */}
            <div className="grid grid-cols-2 gap-4 bg-slate-900/30 p-6 rounded-[2.5rem] border border-white/5 backdrop-blur-xl">
              <div className="pr-6 border-r border-slate-800">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1 text-right">
                  Strategic Focus
                </p>
                <p className="text-sm font-bold text-white uppercase text-right italic">
                  {currentDayData?.focus?.replace("-", " ")}
                </p>
              </div>
              <div className="pl-2">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">
                  Intensity Level
                </p>
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-lime-400 fill-lime-400" />
                  <p className="text-sm font-bold text-white">
                    0{currentDayData?.intensityLevel}{" "}
                    <span className="text-slate-500">/ 05</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── START WORKOUT BUTTON ── */}
          {!workoutStarted && currentDayData?.exercises?.length > 0 && (
            <button
              onClick={startWorkout}
              disabled={isSame || currentDayData?.isCompleted}
              className="mb-8 w-full py-5 disabled:cursor-not-allowed bg-lime-500 text-black font-black text-xs uppercase tracking-[0.3em] rounded-[1.5rem] hover:bg-lime-400 transition-all"
            >
              Start Workout Session
            </button>
          )}

          {/* ── PROGRESS BAR (visible after start) ── */}
          {workoutStarted && totalExercises > 0 && (
            <div
              className="mb-8 bg-slate-900/40 rounded-[2rem] p-6 border border-white/5"
              data-aos="fade-up"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Progress
                </span>
                <span className="text-lime-400 font-black text-sm">
                  {exercisesDone}/{totalExercises} exercises
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-lime-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${(exercisesDone / totalExercises) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* ── EXERCISES GRID ── */}
          {currentDayData?.exercises?.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {currentDayData.exercises.map((ex, i) => {
                const done = exerciseProgress[i]?.completed;
                return (
                  <div
                    key={i}
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                    className={`group relative backdrop-blur-xl border rounded-[3rem] p-8 md:p-10 transition-all duration-500 ${
                      done
                        ? "bg-green-500/5 border-green-500/30"
                        : "bg-slate-900/40 border-white/5 hover:border-lime-400/30"
                    }`}
                  >
                    {/* Ghost number */}
                    <span className="absolute top-6 right-10 text-8xl font-black text-white/[0.03] italic pointer-events-none">
                      0{i + 1}
                    </span>

                    <div className="flex items-start gap-6 mb-10">
                      <div
                        className={`w-16 h-16 rounded-3xl flex items-center justify-center text-black shadow-lg transition-transform group-hover:rotate-6 ${done ? "bg-green-400" : "bg-gradient-to-br from-lime-400 to-emerald-500"}`}
                      >
                        {done ? (
                          <CheckCircle2 size={32} strokeWidth={2.5} />
                        ) : (
                          <Activity size={32} strokeWidth={2.5} />
                        )}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-3xl font-black uppercase tracking-tighter text-white italic leading-none">
                          {ex.exerciseName}
                        </h3>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <span className="text-[9px] bg-slate-950 text-slate-400 border border-slate-800 px-3 py-1 rounded-full font-black uppercase tracking-widest">
                            {ex.type}
                          </span>
                          {done && (
                            <span className="text-[9px] bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-black uppercase tracking-widest">
                              ✓ Done
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-5 mb-10">
                      {[
                        { label: "Sets", value: ex.sets },
                        { label: "Reps", value: ex.reps },
                        {
                          label: "Duration",
                          value: `${Math.floor(ex.duration / 60)}m`,
                          accent: true,
                        },
                      ].map(({ label, value, accent }) => (
                        <div
                          key={label}
                          className="bg-slate-950/80 p-5 rounded-[2rem] border border-white/5 text-center"
                        >
                          <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">
                            {label}
                          </p>
                          <p
                            className={`text-3xl font-black leading-none tracking-tighter ${accent ? "text-lime-400" : "text-white"}`}
                          >
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      disabled={!workoutStarted || done}
                      onClick={() => setActiveExerciseModal(i)}
                      className={`w-full py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] transition-all ${
                        done
                          ? "bg-green-500 text-black cursor-default"
                          : !workoutStarted
                            ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                            : "bg-lime-400 text-black hover:bg-white active:scale-95"
                      }`}
                    >
                      {done
                        ? "✓ Completed"
                        : !workoutStarted
                          ? "Start Session First"
                          : "Initialize Set 01"}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ── REST DAY ── */
            <div
              data-aos="zoom-in"
              className="relative py-28 px-10 bg-slate-900/10 border-2 border-dashed border-slate-800 rounded-[4rem] text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-blue-500/5 blur-[150px] rounded-full -z-10 animate-pulse" />
              <div className="w-28 h-28 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mx-auto mb-10 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                <Coffee size={56} strokeWidth={1.5} />
              </div>
              <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white">
                Neural Recovery
              </h2>
              <p className="text-slate-500 text-sm mt-6 max-w-md mx-auto leading-relaxed font-medium uppercase tracking-wide">
                The AI Engine has scheduled a{" "}
                <span className="text-blue-400">Biological Recalibration</span>.
                Rest is essential for ATP synthesis and muscle fiber repair.
              </p>
            </div>
          )}
        </div>

        {/* ── FINISH WORKOUT BUTTON ── */}
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => {
              handleIsCompletedChange(currentDayData?.day, plan._id);
              setShowPostWorkout(true);
            }}
            disabled={!allExercisesDone}
            className={`w-full py-5 my-5 font-black text-xs uppercase tracking-[0.3em] rounded-[1.5rem] transition-all active:scale-95 ${
              allExercisesDone
                ? "bg-lime-400 text-black hover:bg-white shadow-[0_15px_40px_rgba(163,230,53,0.15)]"
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            {allExercisesDone
              ? "🏆 Finish Workout"
              : `Complete all exercises to finish (${exercisesDone}/${totalExercises})`}
          </button>
        </div>
      </div>
    </>
  );
};

export default Workoutss;
