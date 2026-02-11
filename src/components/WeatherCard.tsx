import { Wind, Droplets, Thermometer, Gauge, Eye } from 'lucide-react';

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

interface WeatherCardProps {
  data: WeatherData;
  darkMode: boolean;
}

const getWeatherEmoji = (weatherMain: string): string => {
  const emojiMap: { [key: string]: string } = {
    clear: '☀️',
    clouds: '☁️',
    rain: '🌧️',
    drizzle: '🌦️',
    thunderstorm: '⛈️',
    snow: '❄️',
    mist: '🌫️',
    fog: '🌫️',
    haze: '🌫️',
  };
  return emojiMap[weatherMain] || '🌤️';
};

function WeatherCard({ data, darkMode }: WeatherCardProps) {
  return (
    <div className="mt-8 fade-in">
      <div className={`p-8 rounded-3xl backdrop-blur-xl border shadow-2xl transition-all duration-300 ${
        darkMode
          ? 'bg-white/10 border-white/20 shadow-black/30'
          : 'bg-white/30 border-white/40 shadow-blue-500/20'
      }`}>
        {/* City Name */}
        <div className="text-center mb-6">
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {data.city}, {data.country}
          </h2>
        </div>

        {/* Weather Icon & Emoji */}
        <div className="flex justify-center items-center mb-6">
          <div className="text-8xl float">
            {getWeatherEmoji(data.weatherMain)}
          </div>
        </div>

        {/* Temperature */}
        <div className="text-center mb-4">
          <div className={`text-7xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {data.temperature}°C
          </div>
          <p className={`text-xl mt-2 capitalize ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {data.description}
          </p>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {/* Humidity */}
          <div className={`p-4 rounded-2xl backdrop-blur-md border ${
            darkMode
              ? 'bg-white/5 border-white/10'
              : 'bg-white/40 border-white/30'
          }`}>
            <div className="flex items-center justify-center mb-2">
              <Droplets className={`w-6 h-6 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
            </div>
            <p className={`text-center text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Humidity
            </p>
            <p className={`text-center text-xl md:text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {data.humidity}%
            </p>
          </div>

          {/* Wind Speed */}
          <div className={`p-4 rounded-2xl backdrop-blur-md border ${
            darkMode
              ? 'bg-white/5 border-white/10'
              : 'bg-white/40 border-white/30'
          }`}>
            <div className="flex items-center justify-center mb-2">
              <Wind className={`w-6 h-6 ${darkMode ? 'text-teal-300' : 'text-teal-600'}`} />
            </div>
            <p className={`text-center text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Wind Speed
            </p>
            <p className={`text-center text-xl md:text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {data.windSpeed} m/s
            </p>
          </div>

          {/* Feels Like */}
          <div className={`p-4 rounded-2xl backdrop-blur-md border ${
            darkMode
              ? 'bg-white/5 border-white/10'
              : 'bg-white/40 border-white/30'
          }`}>
            <div className="flex items-center justify-center mb-2">
              <Thermometer className={`w-6 h-6 ${darkMode ? 'text-red-300' : 'text-red-600'}`} />
            </div>
            <p className={`text-center text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Feels Like
            </p>
            <p className={`text-center text-xl md:text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {data.feelsLike}°C
            </p>
          </div>

          {/* Pressure */}
          <div className={`p-4 rounded-2xl backdrop-blur-md border ${
            darkMode
              ? 'bg-white/5 border-white/10'
              : 'bg-white/40 border-white/30'
          }`}>
            <div className="flex items-center justify-center mb-2">
              <Gauge className={`w-6 h-6 ${darkMode ? 'text-purple-300' : 'text-purple-600'}`} />
            </div>
            <p className={`text-center text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Pressure
            </p>
            <p className={`text-center text-xl md:text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {data.pressure} hPa
            </p>
          </div>

          {/* Visibility */}
          <div className={`p-4 rounded-2xl backdrop-blur-md border col-span-2 md:col-span-1 ${
            darkMode
              ? 'bg-white/5 border-white/10'
              : 'bg-white/40 border-white/30'
          }`}>
            <div className="flex items-center justify-center mb-2">
              <Eye className={`w-6 h-6 ${darkMode ? 'text-yellow-300' : 'text-yellow-600'}`} />
            </div>
            <p className={`text-center text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Visibility
            </p>
            <p className={`text-center text-xl md:text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {data.visibility} km
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
