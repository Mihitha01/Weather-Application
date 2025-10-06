interface BackgroundAnimationProps {
  weatherType: string;
  darkMode: boolean;
}

function BackgroundAnimation({ weatherType, darkMode }: BackgroundAnimationProps) {
  const renderClouds = () => {
    return (
      <>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="cloud absolute opacity-30"
            style={{
              top: `${Math.random() * 80}%`,
              animationDuration: `${20 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          >
            <div className={`w-32 h-12 rounded-full ${darkMode ? 'bg-white/20' : 'bg-white/40'}`} />
          </div>
        ))}
      </>
    );
  };

  const renderRain = () => {
    return (
      <>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 bg-blue-200/40 opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${20 + Math.random() * 30}px`,
              animation: `drift ${1 + Math.random() * 2}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </>
    );
  };

  const renderSnow = () => {
    return (
      <>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              animation: `drift ${5 + Math.random() * 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10" />

      {/* Weather-based animations */}
      {(weatherType === 'clouds' || weatherType === 'clear') && renderClouds()}
      {(weatherType === 'rain' || weatherType === 'drizzle' || weatherType === 'thunderstorm') && renderRain()}
      {weatherType === 'snow' && renderSnow()}

      {/* Floating orbs for decoration */}
      <div
        className={`absolute w-64 h-64 rounded-full blur-3xl opacity-20 ${
          darkMode ? 'bg-blue-400' : 'bg-yellow-300'
        }`}
        style={{
          top: '10%',
          right: '10%',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <div
        className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 ${
          darkMode ? 'bg-purple-400' : 'bg-pink-300'
        }`}
        style={{
          bottom: '10%',
          left: '10%',
          animation: 'float 8s ease-in-out infinite',
          animationDelay: '2s',
        }}
      />
    </div>
  );
}

export default BackgroundAnimation;
