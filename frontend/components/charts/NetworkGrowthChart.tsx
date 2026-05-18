"use client";

import { ResponsiveContainer, ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export function NetworkGrowthChart({ data }: { data: any[] }) {
  return (
    <div className="w-full h-full min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          
          <XAxis 
            dataKey="date" 
            stroke="rgba(255,255,255,0.3)" 
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'monospace' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            yAxisId="left"
            stroke="rgba(255,255,255,0.3)" 
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'monospace' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="rgba(255,255,255,0.3)" 
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'monospace' }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip 
            contentStyle={{ backgroundColor: '#0E131F', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
            labelStyle={{ color: '#fff' }}
          />
          
          <Area 
            yAxisId="left"
            type="monotone" 
            dataKey="followers" 
            name="Followers"
            stroke="#8B5CF6" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorFollowers)" 
            style={{ filter: "drop-shadow(0 0 8px rgba(139,92,246,0.5))" }}
          />
          
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="impressions" 
            name="Impressions"
            stroke="#4edea3" 
            strokeWidth={2}
            dot={false}
            style={{ filter: "drop-shadow(0 0 6px rgba(78,222,163,0.8))" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
