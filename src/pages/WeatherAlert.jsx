import { useState, useEffect, useCallback } from 'react';
import {
  FiMapPin, FiSearch, FiRefreshCw, FiClock, FiWind,
  FiDroplet, FiThermometer, FiAlertTriangle, FiCheckCircle,
  FiNavigation, FiChevronDown, FiChevronUp, FiShield
} from 'react-icons/fi';
import axios from 'axios';
import Footer from '../components/Footer';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

/* ─── severity config ─────────────────────────────────────── */
const severityConfig = {
  high: {
    bg: 'from-red-50 to-rose-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-700',
    glow: 'shadow-red-100',
    pulse: 'bg-red-500',
    label: '🔴 High Alert',
  },
  medium: {
    bg: 'from-amber-50 to-yellow-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-700',
    glow: 'shadow-amber-100',
    pulse: 'bg-amber-500',
    label: '🟡 Medium Alert',
  },
  low: {
    bg: 'from-emerald-50 to-green-50',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-700',
    glow: 'shadow-emerald-100',
    pulse: 'bg-emerald-500',
    label: '🟢 All Clear',
  },
};

/* ─── sub-components ──────────────────────────────────────── */
function WeatherStatCard({ icon, label, value, unit, sub, color }) {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-all">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-gray-800">
          {value}<span className="text-sm font-normal text-gray-400 ml-1">{unit}</span>
        </p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function AlertCard({ alert }) {
  const [expanded, setExpanded] = useState(true);
  const cfg = severityConfig[alert.severity] || severityConfig.low;

  const etaText =
    alert.eta_minutes === 0
      ? 'Now (In Progress)'
      : alert.eta_minutes != null
        ? `⏱ Expected in ~${alert.eta_minutes} min`
        : null;

  return (
    <div className={`rounded-2xl border-2 ${cfg.border} bg-gradient-to-br ${cfg.bg} shadow-lg ${cfg.glow} overflow-hidden transition-all duration-300`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 p-5">
        <div className="flex items-start gap-3 flex-1">
          {/* Pulse dot */}
          <div className="relative mt-1 shrink-0">
            {alert.severity !== 'low' && (
              <span className={`absolute inline-flex h-3 w-3 rounded-full ${cfg.pulse} opacity-75 animate-ping`} />
            )}
            <span className={`relative inline-flex rounded-full h-3 w-3 ${cfg.pulse}`} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xl">{alert.icon}</span>
              <h3 className="font-bold text-gray-800 text-lg">{alert.title}</h3>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.badge}`}>
                {cfg.label}
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{alert.message}</p>
            {etaText && (
              <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-white/70 rounded-full text-xs font-semibold text-gray-700 border border-white/60">
                <FiClock size={12} className="text-sky-500" />
                {etaText}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="shrink-0 p-2 rounded-xl bg-white/60 hover:bg-white transition-colors text-gray-500"
          aria-label="Toggle actions"
        >
          {expanded ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
        </button>
      </div>

      {/* Actions */}
      {expanded && alert.actions?.length > 0 && (
        <div className="border-t border-white/50 px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
            <FiShield size={12} /> Preventive Actions
          </p>
          <ul className="space-y-2">
            {alert.actions.map((action, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-white/80 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                  {i + 1}
                </span>
                {action}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─── MAIN PAGE ───────────────────────────────────────────── */
export default function WeatherAlert() {
  const [cityInput, setCityInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);

  /* fetch weather */
  const fetchWeather = useCallback(async (lat, lon) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_BASE_URL}/api/weather`, {
        params: { lat, lon },
        timeout: 15000,
      });
      setWeather(res.data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  /* auto-refresh every 5 min */
  useEffect(() => {
    if (!selectedLocation) return;
    const id = setInterval(() => fetchWeather(selectedLocation.lat, selectedLocation.lon), 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [selectedLocation, fetchWeather]);

  /* city autocomplete */
  useEffect(() => {
    if (cityInput.length < 2) { setSuggestions([]); return; }
    const t = setTimeout(async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/geocode`, {
          params: { city: cityInput },
          timeout: 8000,
        });
        setSuggestions(res.data?.results || []);
      } catch {
        setSuggestions([]);
      }
    }, 400);
    return () => clearTimeout(t);
  }, [cityInput]);

  const selectSuggestion = (s) => {
    const loc = { name: `${s.name}, ${s.country}`, lat: s.latitude, lon: s.longitude };
    setSelectedLocation(loc);
    setCityInput(loc.name);
    setSuggestions([]);
    fetchWeather(loc.lat, loc.lon);
  };

  /* browser geolocation */
  const detectLocation = () => {
    if (!navigator.geolocation) { setError('Geolocation is not supported by your browser.'); return; }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        const loc = { name: `My Location (${lat.toFixed(2)}, ${lon.toFixed(2)})`, lat, lon };
        setSelectedLocation(loc);
        setCityInput(loc.name);
        setGeoLoading(false);
        fetchWeather(lat, lon);
      },
      () => {
        setError('Unable to retrieve your location. Please enter a city name.');
        setGeoLoading(false);
      }
    );
  };

  /* WMO weather code → label & emoji */
  const wmoInfo = (code) => {
    if (code === 0) return { label: 'Clear Sky', emoji: '☀️' };
    if (code <= 3) return { label: 'Partly Cloudy', emoji: '⛅' };
    if (code <= 49) return { label: 'Foggy', emoji: '🌫️' };
    if (code <= 67) return { label: 'Rainy', emoji: '🌧️' };
    if (code <= 77) return { label: 'Snowy', emoji: '🌨️' };
    if (code <= 82) return { label: 'Rain Showers', emoji: '🌦️' };
    return { label: 'Thunderstorm', emoji: '⛈️' };
  };

  const c = weather?.current;
  const wmo = wmoInfo(c?.weathercode ?? 0);

  const highestSeverity = weather?.alerts?.some(a => a.severity === 'high')
    ? 'high'
    : weather?.alerts?.some(a => a.severity === 'medium')
      ? 'medium'
      : 'low';

  return (
    <div className="-mx-4 -mt-8">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 text-white">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-20 text-center">
          <span className="inline-block bg-white/15 backdrop-blur-sm text-sm font-medium px-4 py-1.5 rounded-full mb-5">
            🌦️ AI Weather Alert System
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Weather Early Warning
            <br />
            <span className="text-sky-200">for Smart Farmers</span>
          </h1>
          <p className="text-sky-100 max-w-xl mx-auto mb-8 text-lg leading-relaxed">
            Get real-time weather alerts with AI-driven preventive actions — at least 30 minutes before conditions turn dangerous.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto relative">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="city-search"
                  type="text"
                  value={cityInput}
                  onChange={e => setCityInput(e.target.value)}
                  placeholder="Enter city or village name…"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-300 shadow-lg"
                />
                {/* Dropdown suggestions */}
                {suggestions.length > 0 && (
                  <ul className="absolute top-full mt-1 left-0 right-0 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                    {suggestions.map((s, i) => (
                      <li key={i}>
                        <button
                          onClick={() => selectSuggestion(s)}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-sky-50 flex items-center gap-2 transition-colors"
                        >
                          <FiMapPin className="text-sky-400 shrink-0" size={14} />
                          <span><b>{s.name}</b>, {s.admin1 || ''} {s.country}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                onClick={detectLocation}
                disabled={geoLoading}
                title="Detect my location"
                className="px-4 py-3.5 bg-white/20 hover:bg-white/30 rounded-xl transition-all border border-white/30 backdrop-blur-sm disabled:opacity-60"
              >
                {geoLoading
                  ? <FiRefreshCw className="animate-spin" size={20} />
                  : <FiNavigation size={20} />}
              </button>
            </div>
          </div>
        </div>

        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 60" fill="none">
          <path d="M0 60h1440V20c-240 25-480 38-720 34S240 22 0 38v22z" fill="#f9fafb" />
        </svg>
      </section>

      {/* ── CONTENT ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        {/* Prompt to search */}
        {!weather && !loading && !error && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🌤️</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-3">Search for Your Location</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Enter your city name above or click the location icon to auto-detect your position and get instant weather alerts.
            </p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="text-center py-20">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-sky-200" />
              <div className="absolute inset-0 rounded-full border-4 border-sky-500 border-t-transparent animate-spin" />
              <span className="absolute inset-0 flex items-center justify-center text-3xl">⛅</span>
            </div>
            <p className="text-gray-500 font-medium">Fetching weather data…</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-lg mx-auto">
            <FiAlertTriangle className="mx-auto text-red-400 mb-3" size={32} />
            <p className="text-red-700 font-medium">{error}</p>
            <button
              onClick={() => selectedLocation && fetchWeather(selectedLocation.lat, selectedLocation.lon)}
              className="mt-4 px-5 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl text-sm font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Weather data */}
        {weather && !loading && (
          <>
            {/* Location header + refresh */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
              <div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FiMapPin className="text-sky-500" />
                  <span className="font-semibold text-lg">{selectedLocation?.name}</span>
                </div>
                {lastUpdated && (
                  <p className="text-xs text-gray-400 mt-0.5 ml-6">
                    Last updated: {lastUpdated.toLocaleTimeString()} · Auto-refreshes every 5 min
                  </p>
                )}
              </div>
              <button
                onClick={() => fetchWeather(selectedLocation.lat, selectedLocation.lon)}
                className="flex items-center gap-2 px-4 py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-xl text-sm font-semibold transition-all border border-sky-200"
              >
                <FiRefreshCw size={14} /> Refresh Now
              </button>
            </div>

            {/* Current conditions */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📡 Current Conditions</h2>

              <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl mb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sky-200 text-sm font-medium mb-1">{wmo.label}</p>
                    <div className="flex items-end gap-2">
                      <span className="text-6xl font-extrabold">{Math.round(c?.temperature_2m ?? 0)}°C</span>
                      <span className="text-sky-200 mb-2">Feels like {Math.round(c?.apparent_temperature ?? 0)}°C</span>
                    </div>
                  </div>
                  <div className="text-6xl">{wmo.emoji}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <WeatherStatCard icon="💧" label="Rainfall" value={(c?.precipitation ?? 0).toFixed(1)} unit="mm/hr" sub="Current precipitation" color="bg-blue-50" />
                <WeatherStatCard icon="💨" label="Wind Speed" value={Math.round(c?.windspeed_10m ?? 0)} unit="km/h" sub="At 10 m height" color="bg-sky-50" />
                <WeatherStatCard icon="🌡️" label="Temperature" value={Math.round(c?.temperature_2m ?? 0)} unit="°C" sub={`Feels like ${Math.round(c?.apparent_temperature ?? 0)}°C`} color="bg-orange-50" />
                <WeatherStatCard icon="💦" label="Humidity" value={Math.round(c?.relativehumidity_2m ?? 0)} unit="%" sub="Relative humidity" color="bg-teal-50" />
              </div>
            </div>

            {/* Alert cards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">🚨 Weather Alerts &amp; Early Warnings</h2>
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${severityConfig[highestSeverity].badge}`}>
                  {weather.alerts.length} Alert{weather.alerts.length !== 1 ? 's' : ''} Detected
                </span>
              </div>

              {/* Overall status banner */}
              {highestSeverity === 'low' ? (
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6">
                  <FiCheckCircle className="text-emerald-500 shrink-0" size={22} />
                  <div>
                    <p className="font-semibold text-emerald-800">Excellent farming conditions right now!</p>
                    <p className="text-emerald-600 text-sm">No hazardous weather detected in the next 6 hours.</p>
                  </div>
                </div>
              ) : (
                <div className={`flex items-center gap-3 border rounded-2xl p-4 mb-6 ${highestSeverity === 'high' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                  <FiAlertTriangle className={highestSeverity === 'high' ? 'text-red-500' : 'text-amber-500'} size={22} />
                  <div>
                    <p className={`font-semibold ${highestSeverity === 'high' ? 'text-red-800' : 'text-amber-800'}`}>
                      {highestSeverity === 'high'
                        ? 'High-severity weather detected — take action immediately!'
                        : 'Moderate weather advisory — monitor conditions closely.'}
                    </p>
                    <p className={`text-sm ${highestSeverity === 'high' ? 'text-red-600' : 'text-amber-600'}`}>
                      Follow the preventive actions below to protect your crops.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {weather.alerts.map((alert, i) => (
                  <AlertCard key={i} alert={alert} />
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-10 bg-gray-50 rounded-2xl p-5 border border-gray-200 text-center">
              <p className="text-gray-400 text-xs leading-relaxed">
                Weather data powered by{' '}
                <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">
                  Open-Meteo
                </a>{' '}
                (free &amp; open-source). Alerts are generated by Smart Krishi's AI condition engine.
                Always cross-check with your local meteorology department for official forecasts.
              </p>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
