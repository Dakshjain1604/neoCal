import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Plus, Edit2, Save, X } from 'lucide-react';
import { format } from 'date-fns';

const ProgressTracker = () => {
  const [weightEntries, setWeightEntries] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    weight: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    notes: '',
  });
  const [goalWeight, setGoalWeight] = useState(70);
  const [editingGoal, setEditingGoal] = useState(false);

  useEffect(() => {
    // Load weight entries from localStorage
    const stored = localStorage.getItem('weight-entries');
    if (stored) {
      setWeightEntries(JSON.parse(stored));
    }

    const storedGoal = localStorage.getItem('goal-weight');
    if (storedGoal) {
      setGoalWeight(parseFloat(storedGoal));
    }
  }, []);

  const saveWeightEntries = (entries) => {
    setWeightEntries(entries);
    localStorage.setItem('weight-entries', JSON.stringify(entries));
  };

  const addEntry = (e) => {
    e.preventDefault();
    if (!newEntry.weight) return;

    const entry = {
      id: Date.now(),
      weight: parseFloat(newEntry.weight),
      date: newEntry.date,
      notes: newEntry.notes,
    };

    const updated = [...weightEntries, entry].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    saveWeightEntries(updated);
    setNewEntry({ weight: '', date: format(new Date(), 'yyyy-MM-dd'), notes: '' });
    setShowAddForm(false);
  };

  const deleteEntry = (id) => {
    saveWeightEntries(weightEntries.filter((e) => e.id !== id));
  };

  const saveGoal = () => {
    localStorage.setItem('goal-weight', goalWeight.toString());
    setEditingGoal(false);
  };

  const currentWeight = weightEntries[0]?.weight || 0;
  const previousWeight = weightEntries[1]?.weight || currentWeight;
  const weightChange = currentWeight - previousWeight;
  const toGoal = currentWeight - goalWeight;

  return (
    <div className="max-w-4xl mx-auto" data-testid="progress-tracker">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Progress Tracker
      </h1>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Current Weight */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Current Weight
          </p>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">
            {currentWeight || '--'}
            <span className="text-lg ml-1">kg</span>
          </p>
        </div>

        {/* Weight Change */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Change
          </p>
          <div className="flex items-center space-x-2">
            {weightChange !== 0 && (
              <div
                className={`flex items-center ${
                  weightChange > 0
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-green-600 dark:text-green-400'
                }`}
              >
                {weightChange > 0 ? (
                  <TrendingUp className="w-6 h-6" />
                ) : (
                  <TrendingDown className="w-6 h-6" />
                )}
              </div>
            )}
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {weightChange > 0 ? '+' : ''}
              {weightChange.toFixed(1)}
              <span className="text-lg ml-1">kg</span>
            </p>
          </div>
        </div>

        {/* Goal Weight */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm opacity-80">Goal Weight</p>
            <button
              onClick={() => setEditingGoal(!editingGoal)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              data-testid="edit-goal-button"
            >
              {editingGoal ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
            </button>
          </div>
          {editingGoal ? (
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={goalWeight}
                onChange={(e) => setGoalWeight(parseFloat(e.target.value) || 70)}
                step="0.1"
                className="w-24 px-2 py-1 rounded bg-white/20 text-white placeholder-white/60"
                data-testid="goal-weight-input"
              />
              <button
                onClick={saveGoal}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                data-testid="save-goal-button"
              >
                <Save className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <p className="text-4xl font-bold">
                {goalWeight}
                <span className="text-lg ml-1">kg</span>
              </p>
              <p className="text-sm opacity-80 mt-2">
                {toGoal > 0 ? `${toGoal.toFixed(1)} kg to lose` : 'Goal reached! 🎉'}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Add Entry Button */}
      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full mb-6 py-4 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl hover:border-blue-500 dark:hover:border-blue-400 transition-colors flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          data-testid="show-add-entry"
        >
          <Plus className="w-6 h-6" />
          <span className="font-semibold">Log Weight</span>
        </button>
      )}

      {/* Add Entry Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-6 animate-slide-up">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Log New Weight
          </h3>

          <form onSubmit={addEntry}>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={newEntry.weight}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, weight: e.target.value })
                  }
                  step="0.1"
                  placeholder="70.5"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                  data-testid="weight-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={newEntry.date}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, date: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                  data-testid="date-input"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes (optional)
              </label>
              <textarea
                value={newEntry.notes}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, notes: e.target.value })
                }
                placeholder="How are you feeling?"
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                data-testid="notes-input"
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                data-testid="save-entry"
              >
                Save Entry
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                data-testid="cancel-entry"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Weight History */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Weight History
        </h3>

        {weightEntries.length === 0 ? (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No weight entries yet
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Start tracking your weight to see progress
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {weightEntries.map((entry, index) => {
              const prevEntry = weightEntries[index + 1];
              const change = prevEntry
                ? entry.weight - prevEntry.weight
                : 0;

              return (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  data-testid="weight-entry"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {entry.weight} kg
                      </p>
                      {change !== 0 && (
                        <span
                          className={`text-sm font-medium ${
                            change > 0
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-green-600 dark:text-green-400'
                          }`}
                        >
                          {change > 0 ? '+' : ''}
                          {change.toFixed(1)} kg
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {format(new Date(entry.date), 'MMMM d, yyyy')}
                    </p>
                    {entry.notes && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {entry.notes}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    data-testid="delete-entry"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;
