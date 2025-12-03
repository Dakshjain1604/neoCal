import React from 'react';
import { Clock, Camera, Type, Barcode } from 'lucide-react';
import { format } from 'date-fns';

const MealHistory = ({ meals, onRefresh }) => {
  const getSourceIcon = (source) => {
    switch (source) {
      case 'image':
        return <Camera className="w-5 h-5" />;
      case 'text':
        return <Type className="w-5 h-5" />;
      case 'barcode':
        return <Barcode className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8" data-testid="meal-history">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Meal History
        </h2>
        <button
          onClick={onRefresh}
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-semibold"
          data-testid="refresh-meals"
        >
          Refresh
        </button>
      </div>

      {meals.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            No meals logged yet today
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            Start tracking your meals to see them here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {meals.map((meal) => (
            <div
              key={meal.meal_id}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow"
              data-testid="meal-item"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    {getSourceIcon(meal.source)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(meal.timestamp), 'h:mm a')}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 capitalize">
                      {meal.source}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Math.round(meal.total_calories)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">calories</p>
                </div>
              </div>

              {/* Macros */}
              <div className="flex space-x-4 mb-3 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">P: </span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {Math.round(meal.total_macros.protein_g)}g
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">C: </span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {Math.round(meal.total_macros.carbs_g)}g
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">F: </span>
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    {Math.round(meal.total_macros.fat_g)}g
                  </span>
                </div>
              </div>

              {/* Food Items */}
              <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
                {meal.foods.map((food, index) => (
                  <p
                    key={index}
                    className="text-sm text-gray-600 dark:text-gray-400 capitalize"
                  >
                    • {food.name} ({Math.round(food.grams)}g)
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealHistory;
