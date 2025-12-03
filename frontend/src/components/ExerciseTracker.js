import React, { useState, useEffect } from 'react';
import { Dumbbell, Plus, Trash2, Clock, Flame } from 'lucide-react';

const ExerciseTracker = ({ selectedDate }) => {
  const [exercises, setExercises] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: '',
    duration: 30,
    caloriesBurned: 100,
  });

  const exercisePresets = [
    { name: 'Running', caloriesPerMin: 10 },
    { name: 'Walking', caloriesPerMin: 4 },
    { name: 'Cycling', caloriesPerMin: 8 },
    { name: 'Swimming', caloriesPerMin: 9 },
    { name: 'Weightlifting', caloriesPerMin: 6 },
    { name: 'Yoga', caloriesPerMin: 3 },
    { name: 'Dancing', caloriesPerMin: 5 },
    { name: 'HIIT', caloriesPerMin: 12 },
  ];

  useEffect(() => {
    // Load exercises for selected date from localStorage
    const stored = localStorage.getItem(`exercises-${selectedDate}`);
    if (stored) {
      setExercises(JSON.parse(stored));
    } else {
      setExercises([]);
    }
  }, [selectedDate]);

  const saveExercises = (updatedExercises) => {
    setExercises(updatedExercises);
    localStorage.setItem(`exercises-${selectedDate}`, JSON.stringify(updatedExercises));
  };

  const addExercise = (e) => {
    e.preventDefault();
    if (!newExercise.name.trim()) return;

    const exercise = {
      id: Date.now(),
      ...newExercise,
      timestamp: new Date().toISOString(),
    };

    saveExercises([...exercises, exercise]);
    setNewExercise({ name: '', duration: 30, caloriesBurned: 100 });
    setShowAddForm(false);
  };

  const deleteExercise = (id) => {
    saveExercises(exercises.filter((ex) => ex.id !== id));
  };

  const selectPreset = (preset) => {
    const calories = preset.caloriesPerMin * newExercise.duration;
    setNewExercise({
      ...newExercise,
      name: preset.name,
      caloriesBurned: calories,
    });
  };

  const updateDuration = (duration) => {
    const selectedPreset = exercisePresets.find((p) => p.name === newExercise.name);
    const calories = selectedPreset
      ? selectedPreset.caloriesPerMin * duration
      : Math.round((newExercise.caloriesBurned / newExercise.duration) * duration);

    setNewExercise({
      ...newExercise,
      duration,
      caloriesBurned: calories,
    });
  };

  const totalCaloriesBurned = exercises.reduce(
    (sum, ex) => sum + ex.caloriesBurned,
    0
  );
  const totalDuration = exercises.reduce((sum, ex) => sum + ex.duration, 0);

  return (
    <div className="max-w-4xl mx-auto" data-testid="exercise-tracker">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Exercise Tracker
      </h1>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <Flame className="w-12 h-12" />
            <span className="text-sm opacity-80">Calories Burned</span>
          </div>
          <p className="text-5xl font-bold">{totalCaloriesBurned}</p>
          <p className="text-sm opacity-80 mt-2">kcal today</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-12 h-12" />
            <span className="text-sm opacity-80">Active Time</span>
          </div>
          <p className="text-5xl font-bold">{totalDuration}</p>
          <p className="text-sm opacity-80 mt-2">minutes today</p>
        </div>
      </div>

      {/* Add Exercise Button */}
      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full mb-6 py-4 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl hover:border-blue-500 dark:hover:border-blue-400 transition-colors flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          data-testid="show-add-exercise"
        >
          <Plus className="w-6 h-6" />
          <span className="font-semibold">Log Exercise</span>
        </button>
      )}

      {/* Add Exercise Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-6 animate-slide-up">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Log New Exercise
          </h3>

          <form onSubmit={addExercise}>
            {/* Exercise Presets */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quick Select
              </label>
              <div className="grid grid-cols-4 gap-2">
                {exercisePresets.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => selectPreset(preset)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      newExercise.name === preset.name
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    data-testid={`preset-${preset.name.toLowerCase()}`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Exercise Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Exercise Name
              </label>
              <input
                type="text"
                value={newExercise.name}
                onChange={(e) =>
                  setNewExercise({ ...newExercise, name: e.target.value })
                }
                placeholder="e.g., Running"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                data-testid="exercise-name-input"
              />
            </div>

            {/* Duration */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={newExercise.duration}
                onChange={(e) =>
                  updateDuration(Math.max(1, parseInt(e.target.value) || 30))
                }
                min="1"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                data-testid="exercise-duration-input"
              />
            </div>

            {/* Calories Burned */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Calories Burned
              </label>
              <input
                type="number"
                value={newExercise.caloriesBurned}
                onChange={(e) =>
                  setNewExercise({
                    ...newExercise,
                    caloriesBurned: Math.max(1, parseInt(e.target.value) || 100),
                  })
                }
                min="1"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                data-testid="exercise-calories-input"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                data-testid="save-exercise"
              >
                Add Exercise
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                data-testid="cancel-exercise"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Exercise List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Today's Exercises
        </h3>

        {exercises.length === 0 ? (
          <div className="text-center py-12">
            <Dumbbell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No exercises logged yet
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Add an exercise to start tracking
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                data-testid="exercise-item"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {exercise.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {exercise.duration} min • {exercise.caloriesBurned} cal
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteExercise(exercise.id)}
                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  data-testid="delete-exercise"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseTracker;
