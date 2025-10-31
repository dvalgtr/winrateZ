import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-6xl font-bold neon-glow mb-4">
            ⚡ WinRateZ
          </h1>
          <div className="w-32 h-1 bg-yellow-400 mx-auto glow-yellow rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-1 bg-yellow-400 glow-yellow rounded-full mx-auto mb-4"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-yellow-400 text-lg glow-text-yellow"
        >
          Loading Futuristic Calculator...
        </motion.p>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto mt-8 glow-yellow"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
