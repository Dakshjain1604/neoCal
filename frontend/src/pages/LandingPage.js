import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Barcode, Search, TrendingUp, Droplet, Dumbbell, Moon, Sun, Star } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const { login } = useAuth();

  const handleGetStarted = async () => {
    const result = await login();
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">Cal AI</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            data-testid="theme-toggle-button"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
          <button
            onClick={handleGetStarted}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
            data-testid="get-started-button"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="text-gray-600 dark:text-gray-400">Loved by 5M users with ⭐ 4.9 rating</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
          Meet Cal AI
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Track your calories
          </span>
          <br />
          with just a picture
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          Meet Cal AI, the AI-powered app for easy calorie tracking. Snap a photo,
          scan a barcode, or describe your meal and get instant calorie and
          nutrient info.
        </p>
        
        <button
          onClick={handleGetStarted}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
          data-testid="hero-get-started-button"
        >
          Start Tracking Free
        </button>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20" data-testid="features-section">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
          What does Cal AI include?
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-4">
              <Camera className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Track With Just a Picture
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Snap a photo with Cal AI, and our AI analyzes and breaks down your meal to determine calories, protein, carbs, and fat.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-4">
              <Barcode className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Barcode Scanner
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Quickly scan barcodes for instant nutritional information from our extensive database.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Search Database
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Search from our database of foods. Find and log foods quickly by name or brand.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Progress Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor your weight, measurements, and nutrition goals. Get personalized AI suggestions.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-cyan-100 dark:bg-cyan-900 rounded-xl flex items-center justify-center mb-4">
              <Droplet className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Water Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Log your water intake effortlessly. Cal AI helps you stay hydrated throughout the day.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-red-100 dark:bg-red-900 rounded-xl flex items-center justify-center mb-4">
              <Dumbbell className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Exercise Logging
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track your daily exercise and stay active. Integrates seamlessly with your fitness routine.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl my-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Why choose Cal AI?
        </h2>
        <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-16">
          Cal AI is the most advanced calorie tracker
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Free up your time
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Cal AI automatically calculates your calories, protein, carbs, and fat. No manual calculations needed.
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-5xl mb-4">🔗</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Integrate seamlessly
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Cal AI integrates with your favorite fitness products to track everything in one place.
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-5xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Lose weight effortlessly
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              AI-powered meal analysis helps you make better choices and reach your goals faster.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to start your journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join millions of users tracking their calories with AI
          </p>
          <button
            onClick={handleGetStarted}
            className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
            data-testid="cta-get-started-button"
          >
            Start Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        <p>© 2024 Cal AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
