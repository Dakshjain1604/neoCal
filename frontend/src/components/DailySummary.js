import React from 'react';
import { Flame, TrendingUp } from 'lucide-react';

const DailySummary = ({ summary, user }) => {
  const target = user?.daily_calorie_target || 2000;
  const consumed = summary?.total_calories || 0;
  const remaining = target - consumed;
  const percentage = Math.min((consumed / target) * 100, 100);

  const protein = summary?.total_macros?.protein_g || 0;
  const carbs = summary?.total_macros?.carbs_g || 0;
  const fat = summary?.total_macros?.fat_g || 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8" data-testid="daily-summary">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Daily Summary
        </h2>
        <Flame className="w-8 h-8 text-orange-500" />
      </div>

      {/* Calorie Progress Circle */}
      <div className="flex justify-center mb-8">
        <div className="relative w-48 h-48">
          <svg className="transform -rotate-90 w-48 h-48">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={`${2 * Math.PI * 88 * (1 - percentage / 100)}`}
              className="text-blue-600 dark:text-blue-400 transition-all duration-1000"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {Math.round(consumed)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              of {target} cal
            </p>
          </div>
        </div>
      </div>

      {/* Remaining Calories */}
      <div className="text-center mb-8">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {remaining > 0 ? (
            <>
              <span className="font-bold text-green-600 dark:text-green-400">
                {Math.round(remaining)} calories
              </span>{' '}
              remaining today
            </>
          ) : (
            <>
              <span className="font-bold text-red-600 dark:text-red-400">
                {Math.round(Math.abs(remaining))} calories
              </span>{' '}
              over target
            </>
          )}
        </p>
      </div>

      {/* Macros Breakdown */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Protein</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {Math.round(protein)}g
          </p>
        </div>
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Carbs</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {Math.round(carbs)}g
          </p>
        </div>
        <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Fat</p>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {Math.round(fat)}g
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailySummary;
