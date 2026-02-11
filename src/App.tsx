import { useState, useEffect } from 'react';
import { Search, Wind, Droplets, Loader2, Sun, Moon } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
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
  feelsLike: number;
  pressure: number;
  visibility: number;
}

interface ForecastData {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
    description: string;
    main: string;
  }[];
  dt_txt: string;
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('weatherSearchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addToHistory = (city: string) => {
    setSearchHistory(prev => {
      const filtered = prev.filter(c => c.toLowerCase() !== city.toLowerCase());
      return [city, ...filtered].slice(0, 5);
    });
  };

  const fetchWeatherData = async (queryParams: string) => {
    setLoading(true);
    setError('');
    setWeatherData(null);
    setForecastData([]);

    try {
      const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
      
      // Check if API key is missing or still has the placeholder value
      if (!API_KEY || API_KEY === 'your_api_key_here') {
        throw new Error('⚠️ API key not configured! Please add your OpenWeatherMap API key to the .env file. Get one free at https://openweathermap.org/api');
      }

      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?${queryParams}&appid=${API_KEY}&units=metric`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?${queryParams}&appid=${API_KEY}&units=metric`)
      ]);

      if (!weatherResponse.ok) {
        if (weatherResponse.status === 404) {
          throw new Error('Location not found. Please try again.');
        }
        if (weatherResponse.status === 401) {
          throw new Error('⚠️ Invalid API key. Please check your .env file and make sure you have a valid OpenWeatherMap API key.');
        }
        if (weatherResponse.status === 429) {
          throw new Error('⚠️ API rate limit exceeded. Please wait a moment and try again.');
        }
        throw new Error(`Failed to fetch weather data (Error ${weatherResponse.status}). Please try again.`);
      }

      const data = await weatherResponse.json();

      if (forecastResponse.ok) {
        const forecastJson = await forecastResponse.json();
        const dailyData = forecastJson.list.filter((reading: any) => 
          reading.dt_txt.includes('12:00:00')
        );
        setForecastData(dailyData);
      }

      setWeatherData({
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
        weatherMain: data.weather[0].main.toLowerCase(),
        feelsLike: Math.round(data.main.feels_like),
        pressure: data.main.pressure,
        visibility: data.visibility / 1000, // Convert to km
      });

      addToHistory(data.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = (city: string) => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    fetchWeatherData(`q=${city}`);
  };

  const fetchLocationWeather = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(`lat=${latitude}&lon=${longitude}`);
        },
        (error) => {
          setLoading(false);
          if (error.code === error.PERMISSION_DENIED) {
            setError('Location permission denied. Please enable location access.');
          } else {
            setError('Unable to retrieve location.');
          }
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
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

      {/* Controls */}
      <div className="absolute top-6 right-6 z-20 flex gap-3">
        {/* Unit Toggle */}
        <button
          onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}
          className={`w-12 h-12 rounded-full backdrop-blur-md border transition-all duration-300 shadow-lg font-bold flex items-center justify-center ${
            darkMode 
              ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
              : 'bg-white/30 border-white/40 text-gray-800 hover:bg-white/50'
          }`}
          aria-label="Toggle unit"
        >
          {unit === 'metric' ? '°C' : '°F'}
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-12 h-12 rounded-full backdrop-blur-md border transition-all duration-300 shadow-lg flex items-center justify-center group ${
            darkMode 
              ? 'bg-white/10 border-white/20 hover:bg-white/20' 
              : 'bg-white/30 border-white/40 hover:bg-white/50'
          }`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="w-6 h-6 text-yellow-300 group-hover:rotate-180 transition-transform duration-500" />
          ) : (
            <Moon className="w-6 h-6 text-gray-700 group-hover:rotate-12 transition-transform duration-300" />
          )}
        </button>
      </div>

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
          <SearchBar 
            onSearch={fetchWeather} 
            onLocation={fetchLocationWeather}
            loading={loading} 
            darkMode={darkMode} 
          />

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2 fade-in">
              <span className={`text-xs flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Recent:
              </span>
              {searchHistory.map((city) => (
                <button
                  key={city}
                  onClick={() => fetchWeather(city)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                    darkMode
                      ? 'bg-white/10 hover:bg-white/20 text-gray-200 border border-white/10'
                      : 'bg-white/40 hover:bg-white/60 text-gray-700 border border-white/20'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          )}

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
            <WeatherCard data={weatherData} darkMode={darkMode} unit={unit} />
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

        {/* Forecast Card */}
        {forecastData.length > 0 && !loading && (
          <ForecastCard data={forecastData} darkMode={darkMode} unit={unit} />
        )}
      </div>
    </div>
  );
}

export default App;
