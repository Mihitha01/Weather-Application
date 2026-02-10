# ☀️ Weather Application

A beautiful, animated weather application built with React, TypeScript, Vite, and Tailwind CSS. Features real-time weather data, dynamic backgrounds, and a sleek dark mode.

## ✨ Features

- 🌍 Real-time weather data for any city worldwide
- 🎨 Dynamic background animations based on weather conditions
- 🌓 Dark/Light mode toggle
- 📱 Responsive design
- ⚡ Fast and modern (Vite + React + TypeScript)
- 🎭 Beautiful glassmorphism UI effects

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Your OpenWeatherMap API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account at [Sign Up Page](https://home.openweathermap.org/users/sign_up)
3. Navigate to [API Keys](https://home.openweathermap.org/api_keys)
4. Copy your API key (it may take a few minutes to activate)

### 3. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
2. Open `.env` and replace `your_api_key_here` with your actual API key:
   ```
   VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

### 4. Run the Application

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## 🎯 Usage

1. Enter any city name in the search bar
2. Press Enter or click the search button
3. View real-time weather information including:
   - Current temperature
   - Weather description
   - Humidity levels
   - Wind speed
4. Toggle dark mode using the sun/moon button in the top-right corner

## 🛠️ Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **OpenWeatherMap API** - Weather data

## 🐛 Troubleshooting

### "API key not configured" error
- Make sure you created a `.env` file in the project root
- Verify your API key is correctly set in the `.env` file
- Restart the dev server after adding the API key

### "Invalid API key" error
- Check that your API key is active (can take 10-15 minutes after creation)
- Verify you copied the entire key without extra spaces
- Make sure you're using the correct API key from OpenWeatherMap

### "City not found" error
- Check the spelling of the city name
- Try adding the country code (e.g., "London,UK")
- Some small cities might not be in the database

## 📝 License

MIT

