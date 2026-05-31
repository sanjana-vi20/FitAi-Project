import React, { useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, LineChart, Line 
} from 'recharts';
import { 
  Activity, Zap, Moon, Flame, Target, 
  Trophy, TrendingUp, AlertCircle 
} from 'lucide-react';
import Insights from './Insights';

const VisualDashboard = ({ rawData }) => {
  // 1. Data Processing for Charts
  const chartData = useMemo(() => {
    return rawData.map(log => ({
      name: new Date(log.workoutDetails.date).toLocaleDateString('en-US', { weekday: 'short' }),
      calories: log.dietDetails.estimatedCaloriesConsumed,
      completion: log.workoutDetails.completionPercentage,
      soreness: log.recoveryDetails.muscleSoreness,
      sleep: log.recoveryDetails.sleepHours,
    })).reverse(); // Newest last for the graph
  }, [rawData]);

  // 2. Metrics Calculation
  const latest = rawData[0] || {};
  const stats = useMemo(() => {
    const totalCals = rawData.reduce((acc, curr) => acc + curr.dietDetails.estimatedCaloriesConsumed, 0);
    return {
      avgCals: Math.round(totalCals / (rawData.length || 1)),
      todayCompletion: latest.workoutDetails?.completionPercentage || 0,
      todaySoreness: latest.recoveryDetails?.muscleSoreness || 0,
      streak: 4, // Yahan apna streak logic call karein
    };
  }, [rawData]);

  return (
    <div className="space-y-6">
      {/* --- TOP ROW: DYNAMIC STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Daily Avg Calories" value={stats.avgCals} unit="kcal" icon={<Flame className="text-orange-500" />} />
        <StatCard title="Workout Load" value={stats.todayCompletion} unit="%" icon={<Zap className="text-lime-400" />} />
        <StatCard title="Sleep Analysis" value={latest.recoveryDetails?.sleepHours || 0} unit="hrs" icon={<Moon className="text-blue-400" />} />
        <StatCard title="Muscle Stress" value={stats.todaySoreness} unit="/10" icon={<Activity className="text-red-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- LEFT: CALORIE & PERFORMANCE TREND --- */}
        <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[2.5rem]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black uppercase italic tracking-tighter">Evolution Metrics</h3>
            <div className="flex gap-4 text-[10px] font-bold uppercase">
              <span className="flex items-center gap-1 text-lime-400"><div className="h-2 w-2 bg-lime-400 rounded-full" /> Completion</span>
              <span className="flex items-center gap-1 text-orange-500"><div className="h-2 w-2 bg-orange-500 rounded-full" /> Calories</span>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="calories" stroke="#f97316" fillOpacity={1} fill="url(#colorCal)" strokeWidth={3} />
                <Area type="monotone" dataKey="completion" stroke="#a3e635" fill="transparent" strokeWidth={3} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- RIGHT: RECOVERY ENGINE --- */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[2.5rem] flex flex-col justify-between">
          <h3 className="text-lg font-black uppercase italic tracking-tighter mb-4">Recovery Balance</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <Bar dataKey="soreness" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sleep" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                <Tooltip cursor={{fill: '#1e293b'}} contentStyle={{backgroundColor: '#0f172a', borderRadius: '12px', border: 'none'}} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                <span className="text-slate-500">Latest Energy Level</span>
                <span className="text-lime-400">{latest.recoveryDetails?.energyLevel}</span>
             </div>
             <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-lime-400 transition-all duration-1000" 
                  style={{ width: latest.recoveryDetails?.energyLevel === 'high' ? '100%' : '40%' }} 
                />
             </div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM: AI INSIGHTS --- */}
      {/* Yahan humne pichla EngineInsight use kiya hai jo aapke data ko analyze karta hai */}
      <Insights metrics={{
          cpa: stats.todayCompletion,
          ms: stats.todaySoreness,
          ph: latest.dietDetails?.proteinHit ? 1 : 0,
          el: rawData.map(l => l.recoveryDetails.energyLevel),
          sh: latest.recoveryDetails?.sleepHours
      }} />

    </div>
  );
};

// UI Sub-components
const StatCard = ({ title, value, unit, icon }) => (
  <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-5 rounded-[2rem] group hover:border-white/10 transition-all">
    <div className="flex justify-between items-start mb-2">
      <div className="p-2 bg-white/5 rounded-xl">{icon}</div>
      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{title}</div>
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-3xl font-black text-white">{value}</span>
      <span className="text-xs font-bold text-slate-500 uppercase">{unit}</span>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl shadow-2xl">
        <p className="text-[10px] font-black text-slate-500 uppercase mb-2">{label}</p>
        <p className="text-xs font-bold text-orange-500">Calories: {payload[0].value}kcal</p>
        <p className="text-xs font-bold text-lime-400">Completion: {payload[1].value}%</p>
      </div>
    );
  }
  return null;
};

export default VisualDashboard;