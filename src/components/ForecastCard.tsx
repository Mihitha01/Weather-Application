import React from 'react';

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

interface ForecastProps {
  data: ForecastData[];
  darkMode: boolean;
  unit: 'metric' | 'imperial';
}

const ForecastCard: React.FC<ForecastProps> = ({ data, darkMode, unit }) => {
  // Helper to format date
  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getTemp = (temp: number) => {
    return unit === 'metric' 
      ? Math.round(temp)
      : Math.round((temp * 9 / 5) + 32);
  };

  return (
    <div className="mt-8 w-full max-w-3xl mx-auto fade-in">
      <h3 className={`text-2xl font-bold mb-4 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {data.map((day, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl backdrop-blur-md border transition-all duration-300 transform hover:scale-105 ${
              darkMode
                ? 'bg-white/5 border-white/10 shadow-lg'
                : 'bg-white/20 border-white/30 shadow-md'
            }`}
          >
            <p className={`text-center font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              {getDayName(day.dt_txt)}
            </p>
            <div className="flex justify-center mb-2">
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="w-12 h-12"
              />
            </div>
            <p className={`text-center text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {getTemp(day.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
            </p>
            <p className={`text-center text-xs capitalize ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {day.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
