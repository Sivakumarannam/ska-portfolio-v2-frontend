import React, { useState } from 'react';
import { CloudRain, Search, Wind, Droplets, Thermometer, MapPin, CheckCircle2 } from 'lucide-react';
import { playTechClick, playSuccessChime } from '../utils/sound';

interface CityWeather {
  city: string;
  country: string;
  lat: number;
  lon: number;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  emoji: string;
  forecast: { day: string; high: number; low: number; emoji: string }[];
}

const PRESET_CITIES: Record<string, CityWeather> = {
  bangalore: {
    city: 'Bangalore',
    country: 'India',
    lat: 12.9716,
    lon: 77.5946,
    temp: 24.2,
    feelsLike: 25.0,
    humidity: 62,
    windSpeed: 14.5,
    condition: 'Partly Cloudy',
    emoji: '⛅',
    forecast: [
      { day: 'Wed', high: 26, low: 18, emoji: '⛅' },
      { day: 'Thu', high: 27, low: 19, emoji: '🌤️' },
      { day: 'Fri', high: 25, low: 18, emoji: '🌧️' },
      { day: 'Sat', high: 28, low: 20, emoji: '☀️' },
      { day: 'Sun', high: 27, low: 19, emoji: '⛅' },
    ],
  },
  pune: {
    city: 'Pune (Tata Comms Center)',
    country: 'India',
    lat: 18.5204,
    lon: 73.8567,
    temp: 26.8,
    feelsLike: 27.5,
    humidity: 54,
    windSpeed: 11.2,
    condition: 'Clear Sky',
    emoji: '☀️',
    forecast: [
      { day: 'Wed', high: 29, low: 17, emoji: '☀️' },
      { day: 'Thu', high: 30, low: 18, emoji: '🌤️' },
      { day: 'Fri', high: 28, low: 17, emoji: '⛅' },
      { day: 'Sat', high: 30, low: 19, emoji: '☀️' },
      { day: 'Sun', high: 29, low: 18, emoji: '🌤️' },
    ],
  },
  tenali: {
    city: 'Tenali (Andhra Pradesh)',
    country: 'India',
    lat: 16.2435,
    lon: 80.6401,
    temp: 29.5,
    feelsLike: 32.1,
    humidity: 68,
    windSpeed: 9.8,
    condition: 'Sunny & Warm',
    emoji: '🌞',
    forecast: [
      { day: 'Wed', high: 32, low: 23, emoji: '🌞' },
      { day: 'Thu', high: 33, low: 24, emoji: '☀️' },
      { day: 'Fri', high: 31, low: 22, emoji: '⛅' },
      { day: 'Sat', high: 32, low: 23, emoji: '🌤️' },
      { day: 'Sun', high: 33, low: 24, emoji: '☀️' },
    ],
  },
};

export const LiveWeatherSimulator: React.FC = () => {
  const [selectedCityKey, setSelectedCityKey] = useState<string>('bangalore');
  const [customInput, setCustomInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const currentWeather = PRESET_CITIES[selectedCityKey] || PRESET_CITIES.bangalore;

  const handleSelectCity = (key: string) => {
    playTechClick(800);
    setLoading(true);
    setTimeout(() => {
      setSelectedCityKey(key);
      setLoading(false);
      playSuccessChime();
    }, 300);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#070b18]/95 border border-cyan-500/30 p-6 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
            <CloudRain className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
              <span>Weather Microservice Live Tester</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                DRF + Open-Meteo
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Live meteorological geocoding, WMO serialization, and rate-limiting cache (30 req/min).
            </p>
          </div>
        </div>

        {/* City Switcher */}
        <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {Object.entries(PRESET_CITIES).map(([key, val]) => (
            <button
              key={key}
              onClick={() => handleSelectCity(key)}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                selectedCityKey === key
                  ? 'bg-cyan-500 text-black font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {val.city.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Glassmorphic Weather Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Left: Main Metrics */}
        <div className="md:col-span-6 p-5 rounded-2xl bg-slate-950/80 border border-cyan-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold text-white">{currentWeather.city}</span>
              <span className="text-xs font-mono text-slate-400">({currentWeather.country})</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
              CACHE HIT (180ms)
            </span>
          </div>

          <div className="flex items-baseline space-x-4">
            <span className="text-5xl font-extrabold font-mono text-white tracking-tighter">
              {currentWeather.temp}°C
            </span>
            <span className="text-4xl">{currentWeather.emoji}</span>
            <span className="text-sm font-medium text-cyan-300">{currentWeather.condition}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
            <div className="p-2 rounded-lg bg-black/50 border border-slate-800/80">
              <div className="text-slate-500 text-[10px]">FEELS LIKE</div>
              <div className="text-slate-200 font-semibold">{currentWeather.feelsLike}°C</div>
            </div>
            <div className="p-2 rounded-lg bg-black/50 border border-slate-800/80">
              <div className="text-slate-500 text-[10px]">HUMIDITY</div>
              <div className="text-slate-200 font-semibold">{currentWeather.humidity}%</div>
            </div>
            <div className="p-2 rounded-lg bg-black/50 border border-slate-800/80">
              <div className="text-slate-500 text-[10px]">WIND SPEED</div>
              <div className="text-slate-200 font-semibold">{currentWeather.windSpeed} km/h</div>
            </div>
          </div>
        </div>

        {/* Right: 5-Day Forecast Grid */}
        <div className="md:col-span-6 space-y-2">
          <div className="text-xs font-mono text-slate-400">5-DAY METEOROLOGICAL FORECAST:</div>
          <div className="grid grid-cols-5 gap-2">
            {currentWeather.forecast.map((fc, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center space-y-1.5"
              >
                <div className="text-[11px] font-mono text-slate-400">{fc.day}</div>
                <div className="text-2xl">{fc.emoji}</div>
                <div className="text-xs font-mono font-bold text-white">{fc.high}°</div>
                <div className="text-[10px] font-mono text-slate-500">{fc.low}°</div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Coordinates: {currentWeather.lat}°N, {currentWeather.lon}°E</span>
            <span className="text-cyan-400">Rate Limit: 30 req/min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

