import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ChildActivityChart() {
  const data = [
    { time: "8 AM", active: 10 },
    { time: "10 AM", active: 20 },
    { time: "12 PM", active: 18 },
    { time: "2 PM", active: 15 },
    { time: "4 PM", active: 25 },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="font-bold text-lg mb-3">Child Movement Activity</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
