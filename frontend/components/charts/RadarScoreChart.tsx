"use client";

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts';

export function RadarScoreChart({ data }: { data: any[] }) {
  return (
    <div className="w-full h-full min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12, fontFamily: 'monospace' }} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0E131F', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
            itemStyle={{ color: '#10B981', fontFamily: 'monospace' }}
          />
          <Radar 
            name="Score" 
            dataKey="A" 
            stroke="#10B981" 
            fill="#10B981" 
            fillOpacity={0.4} 
            style={{ filter: "drop-shadow(0 0 10px rgba(16,185,129,0.5))" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
