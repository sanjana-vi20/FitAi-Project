import React, { useEffect, useState } from "react";
import {
  Activity,
  TrendingUp,
  Calendar,
  Zap,
  Target,
  BarChart3,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import AOS from "aos";
import ProfileSetup from "./ProfileSetup";
import { useAuth } from "../../config/AuthContext";
import ChatBot from "../ChatBot";
import api from "../../config/API";
import toast from "react-hot-toast";
import { useWorkout } from "../../config/WorkoutContext";
import Insights from "./Insights";
import VisualDashboard from "./VisualDashoard";

// Dummy Data for Progress Graph
const data = [
  { name: "Week 1", weight: 80, habit: 60 },
  { name: "Week 2", weight: 78.5, habit: 75 },
  { name: "Week 3", weight: 77.2, habit: 85 },
  { name: "Week 4", weight: 76.8, habit: 92 },
];

const UserDashboard = () => {
  const { setStreak, streak } = useWorkout();

  const [userData, setUserData] = useState(null);
  const [showSetup, setShowSetup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [workoutAnalysis, setWorkoutAnalysis] = useState([]);

  const [allWorkouts, setAllWorkouts] = useState([]);

  const [limited, setLimited] = useState({});

  const [details, setDetails] = useState({
    habitScore: 0,
    energyLevel: "",
  });

  const { user, isLogin } = useAuth();

  const fetchAllLogs = async () => {
    try {
      const fetchLogs = await api.get(`${import.meta.env.VITE_GET_ALL_WORKOUT_G}/${user._id}`);
      console.log(fetchLogs);

      setAllWorkouts(fetchLogs?.data?.data);

      const logs = fetchLogs?.data?.data;

      const energyLevel = logs[0]?.recoveryDetails?.energyLevel;

      const currentStreak = calculateStreak(logs);

      const currentHabit = calculateHabitScore(logs);

      setDetails((prev) => ({
        ...prev,
        habitScore: currentHabit,
        energyLevel: energyLevel,
      }));
      setStreak(currentStreak);
    } catch (error) {
      toast.error(error?.data?.message || "Unknown Error");
    }
  };

  const calculateStreak = (logs) => {
    if (!logs || logs.length === 0) return 0;

    // 1. Sirf completed workouts ki unique dates (YYYY-MM-DD) nikalen
    const completedDates = logs
      .filter((log) => log.workoutDetails?.completed === true)
      .map((log) =>
        new Date(log.workoutDetails.date).toLocaleDateString("en-CA"),
      ) // YYYY-MM-DD format
      .sort((a, b) => new Date(b) - new Date(a)); // Newest first

    const uniqueDates = [...new Set(completedDates)];
    if (uniqueDates.length === 0) return 0;

    let streak = 0;
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check karein ki aakhri workout aaj tha ya kal
    const lastLogDate = new Date(uniqueDates[0]);
    lastLogDate.setHours(0, 0, 0, 0);

    const diffInTime = today.getTime() - lastLogDate.getTime();
    const diffInDays = diffInTime / (1000 * 3060 * 60 * 24);

    if (diffInDays > 1) return 0; // Streak toot gayi (2 din se zyada ka gap)

    // 2. Continuous days count karein
    for (let i = 0; i < uniqueDates.length; i++) {
      const currentLog = new Date(uniqueDates[i]);
      currentLog.setHours(0, 0, 0, 0);

      const expectedDate = new Date(lastLogDate);
      expectedDate.setDate(expectedDate.getDate() - i);
      expectedDate.setHours(0, 0, 0, 0);

      if (currentLog.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const calculateHabitScore = (logs) => {
    if (!logs || logs.length === 0) return 0;

    let totalTasks = 0;
    let completedTasks = 0;

    logs.forEach((log) => {
      // workoutDetails se data nikalna
      const done = log.workoutDetails?.exercisesDone || 0;
      const total = log.workoutDetails?.totalExercises || 0;

      completedTasks += done;
      totalTasks += total;
    });

    if (totalTasks === 0) return 0;

    // Formula: (Done / Total) * 100
    const score = (completedTasks / totalTasks) * 100;
    return Math.round(score); // Rounding to nearest integer
  };

  const fetchLimited = async () => {
    try {
      const res = await api.get(import.meta.env.VITE_PATCH_COMPLETED);
      console.log(res?.data?.data);
      sessionStorage.setItem("LimitedData", JSON.stringify(res?.data?.data));
      setLimited(res?.data?.data);
    } catch (error) {
      toast.error(error?.data?.message || "Unknown Error");
    }
  };

  useEffect(() => {
    fetchAllLogs();
    fetchLimited();
  }, [user]);

  useEffect(() => {
    AOS.init({ duration: 800 });
    if (!user?.profile[0]?.age || !user?.profile[0]?.weight) {
      setShowSetup(true);
    }
    setUserData(user);

    fetchWorkoutsession();
  }, []);

  const mostFrequent = limited?.el
    ?.sort(
      (a, b) =>
        limited?.el.filter((v) => v === a).length -
        limited?.el.filter((v) => v === b).length,
    )
    .pop();

  return (
    <>
      <div className="min-h-screen bg-[#05080a] text-white p-9 md:p-8 pt-28 font-sans">
        {showSetup && (
          <ProfileSetup
            onComplete={(data) => {
              // Data update karo aur modal close karo
              setShowSetup(false);
              // Backend ko update bhejne ka logic yahan aayega
            }}
          />
        )}

        {/* --- HEADER STATS --- */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Habit Score Card */}
          <div
            data-aos="fade-up"
            className="bg-slate-900/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
              <Target size={80} className="text-lime-400" />
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              Habit Score
            </p>
            <h3 className="text-4xl font-black mt-2 text-lime-400">
              {limited?.habit}
            </h3>
            <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
              <TrendingUp size={12} className="text-lime-400" /> +5.2% from last
              week
            </p>
          </div>

          {/* Current Weight */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="bg-slate-900/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group"
          >
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              Body Mass
            </p>
            <h3 className="text-4xl font-black mt-2 text-white">
              {user?.profile[0]?.weight}{" "}
              <span className="text-lg text-slate-500 font-medium tracking-normal">
                kg
              </span>
            </h3>
            <p className="text-[10px] text-slate-400 mt-2 italic underline decoration-blue-500/50">
              Everyday logs
            </p>
          </div>

          {/* Streak */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="bg-slate-900/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group"
          >
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              Activity Streak
            </p>
            <h3 className="text-4xl font-black mt-2 text-orange-500">
              {streak}{" "}
              <span className="text-lg text-slate-500 font-medium tracking-normal">
                {streak === 1 ? "Day" : "Days"}
              </span>
            </h3>
            <div className="flex gap-1 mt-3">
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <div
                  key={d}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    // Agar streak 7 se kam hai toh current progress dikhao,
                    // agar 7+ hai toh saare orange dikhao (Weekly milestone)
                    d <= (streak % 8 === 0 && streak > 0 ? 7 : streak % 8)
                      ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"
                      : "bg-slate-800"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Fatigue Level */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="bg-slate-900/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group"
          >
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              Energy Level
            </p>
            <h3 className="text-4xl font-black mt-2 text-blue-400 capitalize">
              {mostFrequent}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <Zap size={14} className="text-blue-400 fill-blue-400" />
              <p className="text-[10px] text-slate-400">
                {details?.energyLevel === "low"
                  ? "Please take a lighter workout"
                  : details?.energyLevel === "normal"
                    ? "You need to be careful"
                    : "You can increase your sets, as you are energetic.."}
              </p>
            </div>
          </div>
        </div>

        <VisualDashboard rawData={allWorkouts} />
        {/* --- MAIN GRID --- */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Chart (2 Cols) */}

          {/* <div
            data-aos="fade-right"
            className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl p-8 rounded-[3rem] border border-white/5"
          >
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-sm font-black uppercase tracking-widest text-white italic">
                Transformation Forecast
              </h4>
              <select className="bg-slate-950 border border-slate-800 text-[10px] px-3 py-1 rounded-lg outline-none">
                <option>Weight Trend</option>
                <option>Habit Consistency</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient
                      id="colorWeight"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#a3e635" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#a3e635" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "12px",
                    }}
                    itemStyle={{ color: "#a3e635" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="weight"
                    stroke="#a3e635"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorWeight)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div> */}

          <ChatBot />
        </div>
      </div>

      {/* <WorkoutPlanView planData={allWorkouts}/> */}
    </>
  );
};

export default UserDashboard;
