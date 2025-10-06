import { useState, useEffect } from 'react';
import { Search, Wind, Droplets, Loader2, Sun, Moon } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import BackgroundAnimation from './components/BackgroundAnimation';

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  weatherMain: string;
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const fetchWeather = async (city: string) => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found. Please try another city.');
        }
        throw new Error('Failed to fetch weather data. Please try again.');
      }

      const data = await response.json();

      setWeatherData({
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
        weatherMain: data.weather[0].main.toLowerCase(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
      darkMode
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900'
        : weatherData?.weatherMain === 'clear'
        ? 'bg-gradient-to-br from-blue-400 via-blue-300 to-yellow-200'
        : weatherData?.weatherMain === 'rain' || weatherData?.weatherMain === 'drizzle'
        ? 'bg-gradient-to-br from-gray-600 via-gray-500 to-blue-400'
        : weatherData?.weatherMain === 'thunderstorm'
        ? 'bg-gradient-to-br from-gray-800 via-purple-900 to-gray-700'
        : weatherData?.weatherMain === 'snow'
        ? 'bg-gradient-to-br from-blue-100 via-white to-blue-200'
        : weatherData?.weatherMain === 'clouds'
        ? 'bg-gradient-to-br from-gray-400 via-gray-300 to-blue-300'
        : 'bg-gradient-to-br from-blue-500 via-purple-400 to-pink-300'
    }`}>
      <BackgroundAnimation weatherType={weatherData?.weatherMain || 'clear'} darkMode={darkMode} />

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 shadow-lg group"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <Sun className="w-6 h-6 text-yellow-300 group-hover:rotate-180 transition-transform duration-500" />
        ) : (
          <Moon className="w-6 h-6 text-gray-700 group-hover:rotate-12 transition-transform duration-300" />
        )}
      </button>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Title */}
          <h1 className={`text-5xl font-bold text-center mb-8 float ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Weather App
          </h1>

          {/* Search Bar */}
          <SearchBar onSearch={fetchWeather} loading={loading} darkMode={darkMode} />

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 rounded-2xl bg-red-500/20 backdrop-blur-md border border-red-500/30 fade-in">
              <p className={`text-center ${darkMode ? 'text-red-200' : 'text-red-700'} font-medium`}>
                {error}
              </p>
            </div>
          )}

          {/* Loading Spinner */}
          {loading && (
            <div className="mt-12 flex flex-col items-center fade-in">
              <Loader2 className={`w-16 h-16 spinner ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
              <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
                Fetching weather data...
              </p>
            </div>
          )}

          {/* Weather Card */}
          {weatherData && !loading && (
            <WeatherCard data={weatherData} darkMode={darkMode} />
          )}

          {/* Instructions */}
          {!weatherData && !loading && !error && (
            <div className="mt-8 text-center fade-in">
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-lg`}>
                Enter a city name to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
