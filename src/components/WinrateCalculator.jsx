import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatHistory from './StatHistory';

const WinrateCalculator = () => {
  const [totalMatches, setTotalMatches] = useState(0);
  const [totalWins, setTotalWins] = useState(0);
  const [winrate, setWinrate] = useState(0);
  const [history, setHistory] = useState([]);
  const [displayWinrate, setDisplayWinrate] = useState(0);

  useEffect(() => {
    const savedData = localStorage.getItem('winrateData');
    if (savedData) {
      const { totalMatches, totalWins, history } = JSON.parse(savedData);
      setTotalMatches(totalMatches);
      setTotalWins(totalWins);
      setHistory(history || []);
    }
  }, []);

  useEffect(() => {
    const winrateData = {
      totalMatches,
      totalWins,
      history
    };
    localStorage.setItem('winrateData', JSON.stringify(winrateData));
  }, [totalMatches, totalWins, history]);

  useEffect(() => {
    if (totalMatches > 0) {
      const newWinrate = (totalWins / totalMatches) * 100;
      setWinrate(newWinrate);
      
      const duration = 1500;
      const steps = 60;
      const stepValue = newWinrate / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setDisplayWinrate(stepValue * currentStep);
        
        if (currentStep >= steps) {
          setDisplayWinrate(newWinrate);
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    } else {
      setWinrate(0);
      setDisplayWinrate(0);
    }
  }, [totalMatches, totalWins]);

  const addToHistory = () => {
    if (totalMatches > 0) {
      const newEntry = {
        date: new Date().toLocaleDateString(),
        winrate: parseFloat(winrate.toFixed(2)),
        matches: totalMatches,
        wins: totalWins
      };
      
      setHistory(prev => {
        const updated = [...prev, newEntry].slice(-10);
        return updated;
      });
    }
  };

  const handleWinChange = (change) => {
    const newWins = Math.max(0, totalWins + change);
    setTotalWins(newWins);
    if (newWins > totalMatches) {
      setTotalMatches(newWins);
    }
  };

  const handleMatchChange = (change) => {
    const newMatches = Math.max(0, totalMatches + change);
    setTotalMatches(newMatches);
    if (newMatches < totalWins) {
      setTotalWins(newMatches);
    }
  };

  const resetData = () => {
    setTotalMatches(0);
    setTotalWins(0);
    setHistory([]);
  };

  const getWinrateColor = () => {
    if (winrate >= 60) return 'text-green-400';
    if (winrate >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold neon-glow mb-4">
            ⚡ WinRateZ
          </h1>
          <p className="text-yellow-400 glow-text-yellow text-lg md:text-xl">
            Futuristic Win Rate Calculator
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-yellow-400/20 glow-border"
          >
            <h2 className="text-2xl font-bold mb-6 text-yellow-400 glow-text-yellow">
              Input Stats
            </h2>

            <div className="space-y-6">
              {/* Total Matches */}
              <div>
                <label className="block text-sm font-medium mb-2 glow-text-yellow">
                  Total Matches
                </label>
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleMatchChange(-1)}
                    className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold glow-yellow hover:bg-yellow-300 transition-colors"
                  >
                    -
                  </motion.button>
                  <input
                    type="number"
                    value={totalMatches}
                    onChange={(e) => setTotalMatches(parseInt(e.target.value) || 0)}
                    className="flex-1 bg-gray-800 border border-yellow-400/30 rounded-lg px-4 py-3 text-white text-center glow-border"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleMatchChange(1)}
                    className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold glow-yellow hover:bg-yellow-300 transition-colors"
                  >
                    +
                  </motion.button>
                </div>
              </div>

              {/* Total Wins */}
              <div>
                <label className="block text-sm font-medium mb-2 glow-text-yellow">
                  Total Wins
                </label>
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleWinChange(-1)}
                    className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold glow-yellow hover:bg-yellow-300 transition-colors"
                  >
                    -
                  </motion.button>
                  <input
                    type="number"
                    value={totalWins}
                    onChange={(e) => setTotalWins(parseInt(e.target.value) || 0)}
                    className="flex-1 bg-gray-800 border border-yellow-400/30 rounded-lg px-4 py-3 text-white text-center glow-border"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleWinChange(1)}
                    className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold glow-yellow hover:bg-yellow-300 transition-colors"
                  >
                    +
                  </motion.button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addToHistory}
                  className="flex-1 bg-yellow-400 text-black py-3 rounded-lg font-bold glow-yellow hover:bg-yellow-300 transition-colors"
                >
                  Save to History
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetData}
                  className="flex-1 bg-red-500 text-white py-3 rounded-lg font-bold glow-red hover:bg-red-400 transition-colors"
                >
                  Reset All
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Winrate Display */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-yellow-400/20 glow-border flex flex-col justify-center items-center"
          >
            <h2 className="text-2xl font-bold mb-4 text-yellow-400 glow-text-yellow">
              Current Win Rate
            </h2>
            
            <div className="text-center">
              <motion.div
                key={displayWinrate}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-6xl md:text-8xl font-bold ${getWinrateColor()} glow-text`}
              >
                {displayWinrate.toFixed(1)}%
              </motion.div>
              
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-800/50 rounded-lg p-3 glow-border">
                  <div className="text-yellow-400">Total Matches</div>
                  <div className="text-xl font-bold">{totalMatches}</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 glow-border">
                  <div className="text-yellow-400">Total Wins</div>
                  <div className="text-xl font-bold">{totalWins}</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 glow-border">
                  <div className="text-yellow-400">Total Losses</div>
                  <div className="text-xl font-bold">{totalMatches - totalWins}</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 glow-border">
                  <div className="text-yellow-400">Win/Loss Ratio</div>
                  <div className="text-xl font-bold">
                    {totalMatches - totalWins > 0 
                      ? (totalWins / (totalMatches - totalWins)).toFixed(2)
                      : '∞'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Simulator Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-yellow-400/20 glow-border"
        >
          <h2 className="text-2xl font-bold mb-6 text-yellow-400 glow-text-yellow">
            Win Rate Simulator
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { wins: 1, matches: 1 },
              { wins: 5, matches: 10 },
              { wins: 10, matches: 20 },
              { wins: 25, matches: 50 },
              { wins: 50, matches: 100 },
              { wins: 100, matches: 200 }
            ].map((scenario, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setTotalWins(scenario.wins);
                  setTotalMatches(scenario.matches);
                }}
                className="bg-gray-800/50 border border-yellow-400/30 rounded-lg p-4 text-left glow-border hover:bg-gray-700/50 transition-colors"
              >
                <div className="text-yellow-400 font-bold">
                  {((scenario.wins / scenario.matches) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-300">
                  {scenario.wins}W - {scenario.matches - scenario.wins}L
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* History Chart */}
        <StatHistory history={history} />
      </div>
    </div>
  );
};

export default WinrateCalculator;