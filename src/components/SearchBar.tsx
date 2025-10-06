import { useState, FormEvent } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
  darkMode: boolean;
}

function SearchBar({ onSearch, loading, darkMode }: SearchBarProps) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`flex items-center gap-2 p-2 rounded-2xl backdrop-blur-xl border shadow-lg transition-all duration-300 ${
        darkMode
          ? 'bg-white/10 border-white/20'
          : 'bg-white/40 border-white/50'
      }`}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={loading}
          className={`flex-1 px-4 py-3 bg-transparent outline-none font-medium placeholder:font-normal transition-colors ${
            darkMode
              ? 'text-white placeholder-gray-400'
              : 'text-gray-800 placeholder-gray-600'
          }`}
        />
        <button
          type="submit"
          disabled={loading}
          className={`p-3 rounded-xl transition-all duration-300 ${
            darkMode
              ? 'bg-blue-500 hover:bg-blue-600 active:scale-95'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
          } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
        >
          <Search className="w-6 h-6 text-white" />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
