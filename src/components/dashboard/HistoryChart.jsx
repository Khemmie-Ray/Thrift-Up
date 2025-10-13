import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", value: 400 },
  { month: "Feb", value: 450 },
  { month: "Mar", value: 600 },
  { month: "Apr", value: 300 },
  { month: "May", value: 400 },
  { month: "Jun", value: 550 },
  { month: "Jul", value: 450 },
  { month: "Aug", value: 600 },
  { month: "Sep", value: 400 },
  { month: "Oct", value: 500 },
  { month: "Nov", value: 600 },
  { month: "Dec", value: 500 },
];

const HistoryChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis domain={[0, "auto"]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoryChart;
