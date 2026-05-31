import React from "react";
import {
  Zap,
  AlertTriangle,
  TrendingUp,
  Info,
  ArrowRight,
  BrainCircuit,
  Droplets,
} from "lucide-react";

const Insights = ({ metrics }) => {
  // Logic based on your variables
  const getRecommendation = () => {
    const { cpa, ms, ph, el, il } = metrics;
    const avgEnergy = el?.filter((e) => e === "high").length;

    // Condition 1: Plan is too heavy
    if (parseFloat(cpa) < 60 && parseFloat(ms) > 7) {
      return {
        type: "warning",
        title: "PROTOCOL OVERLOAD",
        message:
          'Your completion rate is low and soreness is critical. The engine suggests downshifting to "Mobility & Recovery" mode for 48 hours.',
        action: "Switch to Light Plan",
      };
    }

    // Condition 2: Plan is too light
    if (parseFloat(cpa) > 90 && parseFloat(ms) < 3 && avgEnergy >= 2) {
      return {
        type: "growth",
        title: "STAGNATION ALERT",
        message:
          "You are crushing your targets with high energy. The engine suggests increasing intensity by +5% to trigger new hypertrophy.",
        action: "Upgrade to Heavy Plan",
      };
    }

    // Condition 3: Diet issues (Protein hit low)
    if (parseFloat(ph) < 0.5) {
      return {
        type: "diet",
        title: "MACRO DEFICIT",
        message:
          "Your workout consistency is great, but you missed your Protein Hit ratio. Muscle repair will be slow. Increase protein intake.",
        action: "View Diet Plan",
      };
    }

    // Default: Balanced
    return {
      type: "stable",
      title: "OPTIMAL SYNC",
      message:
        "Your metrics are stable. The current protocol is perfectly adapted to your recovery cycle. Keep the streak alive.",
      action: "Continue Protocol",
    };
  };

  const rec = getRecommendation();

  // Theme Colors
  const themes = {
    warning: "border-orange-500/30 bg-orange-500/5 text-orange-400",
    growth: "border-lime-400/30 bg-lime-400/5 text-lime-400",
    diet: "border-blue-500/30 bg-blue-500/5 text-blue-400",
    stable: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400",
  };

  return (
    <div
      className={`border rounded-[2rem] p-6 backdrop-blur-xl relative overflow-hidden transition-all duration-500 ${themes[rec.type]}`}
    >
      {/* Background Decorative Element */}
      <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
        <BrainCircuit size={150} />
      </div>

      <div className="flex items-start gap-4">
        {/* Icon based on type */}
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 mt-1">
          {rec.type === "warning" && <AlertTriangle size={24} />}
          {rec.type === "growth" && <Zap size={24} />}
          {rec.type === "diet" && <Droplets size={24} />}
          {rec.type === "stable" && <TrendingUp size={24} />}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">
              Adaptive Engine Insight
            </span>
            <div className="h-1 w-1 bg-current rounded-full animate-pulse" />
          </div>

          <h4 className="text-xl font-black italic uppercase tracking-tight mb-2">
            {rec.title}
          </h4>

          <p className="text-xs font-medium leading-relaxed mb-6 text-white/70 max-w-md">
            {rec.message}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all border border-white/10">
              {rec.action} <ArrowRight size={14} />
            </button>

            {/* Real Stats in the corner */}
            <div className="flex gap-4 border-l border-white/10 pl-6">
              <div className="text-center">
                <p className="text-[8px] uppercase font-bold opacity-50">
                  Soreness
                </p>
                <p className="text-xs font-black text-white">{metrics.ms}/10</p>
              </div>
              <div className="text-center">
                <p className="text-[8px] uppercase font-bold opacity-50">
                  Completion
                </p>
                <p className="text-xs font-black text-white">
                  {Math.round(metrics.cpa)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
