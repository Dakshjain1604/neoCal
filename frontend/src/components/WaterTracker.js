import React, { useState, useEffect } from 'react';
import { Droplet, Plus, Minus } from 'lucide-react';

const WaterTracker = ({ selectedDate }) => {
  const [waterIntake, setWaterIntake] = useState(0);
  const [goal, setGoal] = useState(8); // 8 glasses per day
  const [glassSize, setGlassSize] = useState(250); // 250ml per glass

  useEffect(() => {
    // Load water intake for selected date from localStorage
    const stored = localStorage.getItem(`water-${selectedDate}`);
    if (stored) {
      setWaterIntake(parseInt(stored));
    } else {
      setWaterIntake(0);
    }
  }, [selectedDate]);

  const saveWaterIntake = (value) => {
    setWaterIntake(value);
    localStorage.setItem(`water-${selectedDate}`, value.toString());
  };

  const addGlass = () => {
    saveWaterIntake(waterIntake + 1);
  };

  const removeGlass = () => {
    if (waterIntake > 0) {
      saveWaterIntake(waterIntake - 1);
    }
  };

  const percentage = Math.min((waterIntake / goal) * 100, 100);
  const totalMl = waterIntake * glassSize;

  return (
    <div className="max-w-4xl mx-auto" data-testid="water-tracker">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Water Tracker
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        {/* Water Progress */}
        <div className="flex justify-center mb-8">
          <div className="relative w-64 h-64">
            <svg className="w-64 h-64">
              <defs>
                <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
              </defs>
              <circle
                cx="128"
                cy="128"
                r="112"
                fill="none"
                stroke="currentColor"
                strokeWidth="16"
                className="text-gray-200 dark:text-gray-700"
              />
              <circle
                cx="128"
                cy="128"
                r="112"
                fill="none"
                stroke="url(#waterGradient)"
                strokeWidth="16"
                strokeDasharray={`${2 * Math.PI * 112}`}
                strokeDashoffset={`${2 * Math.PI * 112 * (1 - percentage / 100)}`}
                className="transition-all duration-500"
                strokeLinecap="round"
                transform="rotate(-90 128 128)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Droplet className="w-12 h-12 text-cyan-500 mb-2" />
              <p className="text-4xl font-bold text-gray-900 dark:text-white">
                {waterIntake}/{goal}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                glasses
              </p>
              <p className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mt-2">
                {totalMl}ml
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center space-x-6 mb-8">
          <button
            onClick={removeGlass}
            disabled={waterIntake === 0}
            className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            data-testid="decrease-water"
          >
            <Minus className="w-6 h-6" />
          </button>

          <div className="text-center px-8 py-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Add one glass
            </p>
            <p className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
              {glassSize}ml
            </p>
          </div>

          <button
            onClick={addGlass}
            className="w-14 h-14 rounded-full bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-200 dark:hover:bg-cyan-900/40 transition-colors flex items-center justify-center"
            data-testid="increase-water"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Add Buttons */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => saveWaterIntake(waterIntake + num)}
              className="py-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/20 hover:text-cyan-600 dark:hover:text-cyan-400 font-semibold transition-colors"
              data-testid={`add-${num}-glass`}
            >
              +{num}
            </button>
          ))}
        </div>

        {/* Settings */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Settings
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Daily Goal (glasses)
              </label>
              <input
                type="number"
                value={goal}
                onChange={(e) => setGoal(Math.max(1, parseInt(e.target.value) || 8))}
                min="1"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                data-testid="water-goal-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Glass Size (ml)
              </label>
              <input
                type="number"
                value={glassSize}
                onChange={(e) => setGlassSize(Math.max(50, parseInt(e.target.value) || 250))}
                min="50"
                step="50"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                data-testid="glass-size-input"
              />
            </div>
          </div>
        </div>

        {/* Achievement Message */}
        {waterIntake >= goal && (
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center animate-fade-in">
            <p className="text-green-600 dark:text-green-400 font-semibold">
              🎉 Great job! You've reached your daily water goal!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaterTracker;
