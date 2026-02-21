import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Target, Scale, Ruler, User as UserIcon, Check } from 'lucide-react';
import AOS from 'aos';

const ProfileSetup = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    goal: 'weight-loss'
  });

  useEffect(() => {
    AOS.init();
  }, []);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = () => {
    // Yahan aap API call karenge profile update karne ke liye
    console.log("Profile Data Submitted:", formData);
    onComplete(formData);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-[#05080a]/90 backdrop-blur-xl">
      <div 
        data-aos="zoom-in" 
        className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-2xl"
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1 bg-lime-400 transition-all duration-500" style={{ width: `${(step/3)*100}%` }} />

        {/* --- STEP 1: BIO DATA --- */}
        {step === 1 && (
          <div data-aos="fade-left">
            <h2 className="text-2xl font-black text-white uppercase italic mb-2 tracking-tight">Step 01: Biometrics</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-8">Establish your baseline metrics</p>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Age</label>
                  <input type="number" placeholder="25" className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-white outline-none focus:border-lime-400/50" 
                    onChange={(e) => setFormData({...formData, age: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Gender</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-white outline-none focus:border-lime-400/50 appearance-none"
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2"><Scale size={14}/> Weight (kg)</label>
                  <input type="number" placeholder="70" className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-white outline-none focus:border-lime-400/50" 
                     onChange={(e) => setFormData({...formData, weight: e.target.value})}/>
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2"><Ruler size={14}/> Height (cm)</label>
                  <input type="number" placeholder="175" className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-white outline-none focus:border-lime-400/50" 
                     onChange={(e) => setFormData({...formData, height: e.target.value})}/>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- STEP 2: GOALS & ACTIVITY --- */}
        {step === 2 && (
          <div data-aos="fade-left">
            <h2 className="text-2xl font-black text-white uppercase italic mb-2 tracking-tight">Step 02: Objectives</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-8">What is your primary mission?</p>
            
            <div className="space-y-4">
              {['Weight Loss', 'Muscle Gain', 'Endurance', 'Maintenance'].map((goal) => (
                <button 
                  key={goal}
                  onClick={() => setFormData({...formData, goal: goal.toLowerCase().replace(' ', '-')})}
                  className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between group ${formData.goal === goal.toLowerCase().replace(' ', '-') ? 'border-lime-400 bg-lime-400/10 text-white' : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-600'}`}
                >
                  <span className="font-bold text-xs uppercase tracking-widest">{goal}</span>
                  {formData.goal === goal.toLowerCase().replace(' ', '-') && <Check size={18} className="text-lime-400" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- NAVIGATION BUTTONS --- */}
        <div className="mt-12 flex items-center justify-between gap-4">
          {step > 1 && (
            <button onClick={prevStep} className="p-4 rounded-2xl bg-slate-800 text-white hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
              <ChevronLeft size={20} /> Back
            </button>
          )}
          
          <button 
            onClick={step === 2 ? handleSubmit : nextStep}
            className="flex-1 p-4 rounded-2xl bg-lime-400 text-black font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)]"
          >
            {step === 2 ? 'Initialize Engine' : 'Next Protocol'} <ChevronRight size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;