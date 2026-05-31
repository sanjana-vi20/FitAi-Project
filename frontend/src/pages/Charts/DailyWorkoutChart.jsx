import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

const DailyWorkoutChart = ({ data }) => {
  return (
    <div className="w-full h-[400px] bg-[#1a1a1a] p-6 rounded-3xl shadow-lg">
      <h3 className="text-white text-lg font-semibold mb-6">Daily Workout Analysis</h3>
      
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
          
          <XAxis 
            dataKey="day" 
            stroke="#888" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          
          {/* Left Y-Axis for Completion % */}
          <YAxis 
            yAxisId="left" 
            stroke="#888" 
            fontSize={12} 
            unit="%" 
            axisLine={false} 
            tickLine={false} 
          />
          
          {/* Right Y-Axis for Duration (Minutes) */}
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            stroke="#888" 
            fontSize={12} 
            unit="m" 
            axisLine={false} 
            tickLine={false} 
          />

          <Tooltip 
            contentStyle={{ backgroundColor: '#222', border: 'none', borderRadius: '10px', color: '#fff' }}
            itemStyle={{ fontSize: '12px' }}
          />
          <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />

          {/* Bar for Completion Percentage */}
          <Bar 
            yAxisId="left" 
            dataKey="completion" 
            name="Completion %" 
            fill="#6366f1" 
            radius={[6, 6, 0, 0]} 
            barSize={30} 
          >
            {/* Conditional Color: Agar 100% hai toh green, kam hai toh blue */}
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.completion === 100 ? '#10b981' : '#6366f1'} />
            ))}
          </Bar>

          {/* Line for Duration Minutes */}
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="duration" 
            name="Duration (min)" 
            stroke="#f59e0b" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#f59e0b' }} 
            activeDot={{ r: 6 }} 
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyWorkoutChart;