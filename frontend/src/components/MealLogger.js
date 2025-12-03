import React, { useState } from 'react';
import { Camera, Type, Barcode, Upload, Loader } from 'lucide-react';
import { mealAPI } from '../services/api';

const MealLogger = ({ onMealLogged }) => {
  const [activeMethod, setActiveMethod] = useState('text');
  const [textDescription, setTextDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [barcodeValue, setBarcodeValue] = useState('');
  const [servings, setServings] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!textDescription.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await mealAPI.createFromText(textDescription);
      setResult(response.data);
      setTextDescription('');
      if (onMealLogged) onMealLogged();
    } catch (err) {
      setError('Failed to log meal. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    try {
      const response = await mealAPI.createFromImage(selectedFile);
      setResult(response.data);
      setSelectedFile(null);
      if (onMealLogged) onMealLogged();
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBarcodeSubmit = async (e) => {
    e.preventDefault();
    if (!barcodeValue.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await mealAPI.createFromBarcode(barcodeValue, servings);
      setResult(response.data);
      setBarcodeValue('');
      setServings(1);
      if (onMealLogged) onMealLogged();
    } catch (err) {
      setError('Failed to find barcode. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const methods = [
    { id: 'text', label: 'Text Description', icon: Type },
    { id: 'image', label: 'Photo', icon: Camera },
    { id: 'barcode', label: 'Barcode', icon: Barcode },
  ];

  return (
    <div className="max-w-4xl mx-auto" data-testid="meal-logger">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Track Your Meal
      </h1>

      {/* Method Selection */}
      <div className="flex space-x-2 mb-6">
        {methods.map((method) => {
          const Icon = method.icon;
          return (
            <button
              key={method.id}
              onClick={() => {
                setActiveMethod(method.id);
                setError(null);
                setResult(null);
              }}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold transition-all ${
                activeMethod === method.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-blue-400'
              }`}
              data-testid={`method-${method.id}`}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden sm:inline">{method.label}</span>
            </button>
          );
        })}
      </div>

      {/* Input Forms */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-6">
        {activeMethod === 'text' && (
          <form onSubmit={handleTextSubmit} data-testid="text-form">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Describe your meal
            </label>
            <textarea
              value={textDescription}
              onChange={(e) => setTextDescription(e.target.value)}
              placeholder="e.g., 200g grilled chicken with rice and vegetables"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
              disabled={loading}
              data-testid="text-input"
            />
            <button
              type="submit"
              disabled={loading || !textDescription.trim()}
              className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              data-testid="text-submit"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Log Meal'
              )}
            </button>
          </form>
        )}

        {activeMethod === 'image' && (
          <form onSubmit={handleImageSubmit} data-testid="image-form">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Upload a photo of your meal
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                disabled={loading}
                data-testid="image-input"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-12 h-12 text-gray-400 mb-3" />
                <span className="text-gray-600 dark:text-gray-400">
                  {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                </span>
                <span className="text-sm text-gray-400 mt-2">
                  PNG, JPG, GIF up to 10MB
                </span>
              </label>
            </div>
            <button
              type="submit"
              disabled={loading || !selectedFile}
              className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              data-testid="image-submit"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing Image...
                </>
              ) : (
                'Analyze Photo'
              )}
            </button>
          </form>
        )}

        {activeMethod === 'barcode' && (
          <form onSubmit={handleBarcodeSubmit} data-testid="barcode-form">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Enter barcode number
            </label>
            <input
              type="text"
              value={barcodeValue}
              onChange={(e) => setBarcodeValue(e.target.value)}
              placeholder="e.g., 012345678901"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
              data-testid="barcode-input"
            />
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Number of servings
              </label>
              <input
                type="number"
                value={servings}
                onChange={(e) => setServings(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                disabled={loading}
                data-testid="servings-input"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !barcodeValue.trim()}
              className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              data-testid="barcode-submit"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Looking up...
                </>
              ) : (
                'Find Product'
              )}
            </button>
          </form>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6" data-testid="error-message">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-slide-up" data-testid="meal-result">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Meal Logged Successfully! 🎉
            </h3>
            <button
              onClick={() => setResult(null)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Total Calories */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Calories</p>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">
                {Math.round(result.total_calories)}
              </p>
            </div>
          </div>

          {/* Macros */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Protein</p>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {Math.round(result.total_macros.protein_g)}g
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Carbs</p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">
                {Math.round(result.total_macros.carbs_g)}g
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Fat</p>
              <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
                {Math.round(result.total_macros.fat_g)}g
              </p>
            </div>
          </div>

          {/* Food Items */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Detected Foods:
            </h4>
            <div className="space-y-2">
              {result.foods.map((food, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white capitalize">
                      {food.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {Math.round(food.grams)}g • {Math.round(food.calories)} cal
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                    <div>P: {Math.round(food.protein_g)}g</div>
                    <div>C: {Math.round(food.carbs_g)}g</div>
                    <div>F: {Math.round(food.fat_g)}g</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealLogger;
