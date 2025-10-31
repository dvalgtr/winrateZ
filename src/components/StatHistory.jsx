import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-yellow-400/30 rounded-lg p-3 glow-border">
        <p className="text-yellow-400 font-bold">{label}</p>
        <p className="text-white">Win Rate: {payload[0].value}%</p>
        <p className="text-gray-300 text-sm">
          {payload[0].payload.wins}W - {payload[0].payload.matches - payload[0].payload.wins}L
        </p>
      </div>
    );
  }
  return null;
};

const StatHistory = ({ history }) => {
  if (history.length === 0) {
    return (
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-8 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-yellow-400/20 glow-border"
      >
        <h2 className="text-2xl font-bold mb-6 text-yellow-400 glow-text-yellow">
          Win Rate History
        </h2>
        <div className="text-center text-gray-400 py-8">
          No history data available. Save your stats to see the chart.
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="mt-8 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-yellow-400/20 glow-border"
    >
      <h2 className="text-2xl font-bold mb-6 text-yellow-400 glow-text-yellow">
        Win Rate History
      </h2>
      
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="winrate" 
              stroke="#FFD300"
              strokeWidth={3}
              dot={{ fill: '#FFD300', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#FFD300' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default StatHistory;