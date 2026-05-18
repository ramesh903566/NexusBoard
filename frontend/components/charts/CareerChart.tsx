"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export function CareerChart({ data }: { data: any[] }) {
  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="rgba(255,255,255,0.3)" 
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'monospace' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.3)" 
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'monospace' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0E131F', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
            itemStyle={{ fontFamily: 'monospace' }}
          />
          <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }} />
          <Bar 
            name="Recruiter Views" 
            dataKey="views" 
            fill="#3B82F6" 
            radius={[4, 4, 0, 0]} 
            style={{ filter: "drop-shadow(0 0 6px rgba(59,130,246,0.6))" }}
          />
          <Bar 
            name="Applications Sent" 
            dataKey="applications" 
            fill="#F59E0B" 
            radius={[4, 4, 0, 0]} 
            style={{ filter: "drop-shadow(0 0 6px rgba(245,158,11,0.6))" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
