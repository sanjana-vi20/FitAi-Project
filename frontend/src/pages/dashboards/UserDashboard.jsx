import React, { useEffect, useState } from 'react';
import { 
  Activity, TrendingUp, Calendar, Zap, 
  Target, BarChart3, ChevronRight, AlertCircle 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import AOS from 'aos';
import ProfileSetup from './ProfileSetup';

// Dummy Data for Progress Graph
const data = [
  { name: 'Week 1', weight: 80, habit: 60 },
  { name: 'Week 2', weight: 78.5, habit: 75 },
  { name: 'Week 3', weight: 77.2, habit: 85 },
  { name: 'Week 4', weight: 76.8, habit: 92 },
];

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [showSetup, setShowSetup] = useState(false);



  useEffect(() => {
    AOS.init({ duration: 800 });
    const user = JSON.parse(sessionStorage.getItem("FitAIUser"));
    if (!user?.age || !user?.weight) {
    setShowSetup(true);
  }
    setUserData(user);
  }, []);

  return (
    <div className="min-h-screen bg-[#05080a] text-white p-9 md:p-8 pt-28 font-sans">
      {showSetup && <ProfileSetup onComplete={(data) => {
      // Data update karo aur modal close karo
      setShowSetup(false);
      // Backend ko update bhejne ka logic yahan aayega
    }}/>}
      
      {/* --- HEADER STATS --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Habit Score Card */}
        <div data-aos="fade-up" className="bg-slate-900/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
            <Target size={80} className="text-lime-400" />
          </div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Habit Score</p>
          <h3 className="text-4xl font-black mt-2 text-lime-400">92%</h3>
          <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
             <TrendingUp size={12} className="text-lime-400" /> +5.2% from last week
          </p>
        </div>

        {/* Current Weight */}
        <div data-aos="fade-up" data-aos-delay="100" className="bg-slate-900/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Body Mass</p>
          <h3 className="text-4xl font-black mt-2 text-white">76.8 <span className="text-lg text-slate-500 font-medium tracking-normal">kg</span></h3>
          <p className="text-[10px] text-slate-400 mt-2 italic underline decoration-blue-500/50">Next check-in in 2 days</p>
        </div>

        {/* Streak */}
        <div data-aos="fade-up" data-aos-delay="200" className="bg-slate-900/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Activity Streak</p>
          <h3 className="text-4xl font-black mt-2 text-orange-500">14 <span className="text-lg text-slate-500 font-medium tracking-normal">Days</span></h3>
          <div className="flex gap-1 mt-3">
            {[1,2,3,4,5,6,7].map(d => <div key={d} className={`h-1 flex-1 rounded-full ${d < 6 ? 'bg-orange-500' : 'bg-slate-800'}`} />)}
          </div>
        </div>

        {/* Fatigue Level */}
        <div data-aos="fade-up" data-aos-delay="300" className="bg-slate-900/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Energy Level</p>
          <h3 className="text-4xl font-black mt-2 text-blue-400">Normal</h3>
          <div className="flex items-center gap-2 mt-2">
             <Zap size={14} className="text-blue-400 fill-blue-400" />
             <p className="text-[10px] text-slate-400">AI suggests full-intensity workout</p>
          </div>
        </div>
      </div>

      {/* --- MAIN GRID --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Progress Chart (2 Cols) */}
        <div data-aos="fade-right" className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl p-8 rounded-[3rem] border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-sm font-black uppercase tracking-widest text-white italic">Transformation Forecast</h4>
            <select className="bg-slate-950 border border-slate-800 text-[10px] px-3 py-1 rounded-lg outline-none">
              <option>Weight Trend</option>
              <option>Habit Consistency</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a3e635" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a3e635" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                  itemStyle={{ color: '#a3e635' }}
                />
                <Area type="monotone" dataKey="weight" stroke="#a3e635" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Panel: Daily Tasks */}
        <div data-aos="fade-left" className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-[3rem] border border-white/5">
          <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6 italic">Today's Protocol</h4>
          <div className="space-y-4">
            
            {/* Task 1 */}
            <div className="flex items-center gap-4 p-4 bg-slate-950/50 border border-slate-800 rounded-2xl group hover:border-lime-500/50 transition-all cursor-pointer">
              <div className="p-2 bg-lime-500/20 rounded-lg text-lime-400 group-hover:scale-110 transition-transform">
                <Calendar size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-white uppercase tracking-tighter">Leg Day (Volume A)</p>
                <p className="text-[10px] text-slate-500 italic">Expected Calories: 450 kcal</p>
              </div>
              <ChevronRight size={16} className="text-slate-700" />
            </div>

            {/* Task 2 */}
            <div className="flex items-center gap-4 p-4 bg-slate-950/50 border border-slate-800 rounded-2xl group hover:border-blue-500/50 transition-all cursor-pointer">
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                <Activity size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-white uppercase tracking-tighter">Log Lunch (Macros)</p>
                <p className="text-[10px] text-slate-500 italic">Goal: 40g Protein</p>
              </div>
              <ChevronRight size={16} className="text-slate-700" />
            </div>

            {/* AI Notification */}
            <div className="mt-8 p-4 bg-lime-400/10 border border-lime-400/20 rounded-2xl">
              <div className="flex items-center gap-2 text-lime-400 mb-2">
                <AlertCircle size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Engine Insight</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                Your **Habit Score** is increasing. FitAI will adjust your weights by **+2.5kg** for tomorrow's Upper Body session.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default UserDashboard;