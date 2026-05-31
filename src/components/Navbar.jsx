import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiBell, FiWind, FiRefreshCw, FiAlertTriangle, FiCheckCircle, FiExternalLink } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import axios from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Disease Detection', path: '/detect' },
  { name: 'Weather Alert', path: '/weather-alert' },
  { name: 'Chat Bot', path: '/chatbot' },
  { name: 'Natural Farming', path: '/natural-farming' },
  { name: 'Modern Farming', path: '/modern-farming' },
  { name: 'About', path: '/about' },
];

/* ─── severity helpers ─────────────────────────────────────── */
const severityStyle = {
  high:   { dot: 'bg-red-500',    badge: 'bg-red-100 text-red-700',    ring: 'ring-red-200'   },
  medium: { dot: 'bg-amber-500',  badge: 'bg-amber-100 text-amber-700',ring: 'ring-amber-200' },
  low:    { dot: 'bg-emerald-500',badge: 'bg-emerald-100 text-emerald-700', ring: 'ring-emerald-200' },
};

/* ─── Notification Bell ─────────────────────────────────────── */
function NotificationBell() {
  const [alerts, setAlerts]     = useState([]);       // weather alerts array
  const [loading, setLoading]   = useState(false);
  const [locLabel, setLocLabel] = useState('');
  const [open, setOpen]         = useState(false);
  const [lastFetch, setLastFetch] = useState(null);
  const dropdownRef = useRef(null);

  /* fetch weather using geolocation */
  const fetchAlerts = useCallback(async () => {
    if (!navigator.geolocation) return;
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        setLocLabel(`${lat.toFixed(1)}°N, ${lon.toFixed(1)}°E`);
        try {
          const res = await axios.get(`${API_BASE_URL}/api/weather`, {
            params: { lat, lon },
            timeout: 12000,
          });
          setAlerts(res.data?.alerts || []);
          setLastFetch(new Date());
        } catch {
          // Silently fail — no error in navbar
        } finally {
          setLoading(false);
        }
      },
      () => setLoading(false),
      { timeout: 8000 }
    );
  }, []);

  /* Initial fetch + auto-refresh every 10 min */
  useEffect(() => {
    fetchAlerts();
    const id = setInterval(fetchAlerts, 10 * 60 * 1000);
    return () => clearInterval(id);
  }, [fetchAlerts]);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Badge count = only high + medium alerts (not safe/clear) */
  const badgeAlerts = alerts.filter(a => a.severity === 'high' || a.severity === 'medium');
  const badgeCount  = badgeAlerts.length;
  const highestSev  = alerts.some(a => a.severity === 'high') ? 'high'
                    : alerts.some(a => a.severity === 'medium') ? 'medium'
                    : 'low';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell button */}
      <button
        id="notification-bell"
        onClick={() => setOpen(!open)}
        aria-label="Weather notifications"
        className={`relative p-2.5 rounded-xl transition-all duration-200 ${
          open ? 'bg-sky-100 text-sky-600' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-800'
        }`}
      >
        {/* Animated bell */}
        <FiBell
          size={20}
          className={badgeCount > 0 ? 'animate-[wiggle_1s_ease-in-out]' : ''}
        />

        {/* Badge */}
        {badgeCount > 0 && (
          <span className={`absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold text-white flex items-center justify-center ${
            highestSev === 'high' ? 'bg-red-500' : 'bg-amber-500'
          }`}>
            {badgeCount > 9 ? '9+' : badgeCount}
          </span>
        )}

        {/* Pulsing ring for high alert */}
        {highestSev === 'high' && (
          <span className="absolute inset-0 rounded-xl ring-2 ring-red-400 animate-ping opacity-40 pointer-events-none" />
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[999] overflow-hidden animate-slide-down">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white">
            <div className="flex items-center gap-2">
              <FiBell size={16} />
              <span className="font-semibold text-sm">Weather Alerts</span>
              {locLabel && (
                <span className="text-sky-200 text-xs">· {locLabel}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); fetchAlerts(); }}
                disabled={loading}
                aria-label="Refresh weather"
                className="p-1 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-60"
              >
                <FiRefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="p-1 rounded-lg hover:bg-white/20 transition-colors"
              >
                <FiX size={14} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="max-h-[400px] overflow-y-auto">
            {loading && alerts.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-10 text-gray-400">
                <FiRefreshCw className="animate-spin" size={28} />
                <p className="text-sm">Fetching weather data…</p>
              </div>
            ) : alerts.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-10 text-gray-400">
                <FiBell size={32} />
                <p className="text-sm text-center px-4">
                  {navigator.geolocation
                    ? 'Allow location access to receive weather alerts.'
                    : 'Geolocation not supported in your browser.'}
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-50">
                {alerts.map((alert, i) => {
                  const sty = severityStyle[alert.severity] || severityStyle.low;
                  return (
                    <li key={i} className="px-4 py-3.5 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        {/* Dot */}
                        <div className="relative mt-1 shrink-0">
                          {alert.severity !== 'low' && (
                            <span className={`absolute inline-flex h-3 w-3 rounded-full ${sty.dot} opacity-60 animate-ping`} />
                          )}
                          <span className={`relative inline-flex h-3 w-3 rounded-full ${sty.dot}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <span className="text-base leading-none">{alert.icon}</span>
                            <span className="font-semibold text-gray-800 text-sm">{alert.title}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sty.badge}`}>
                              {alert.severity === 'high' ? '🔴 High' : alert.severity === 'medium' ? '🟡 Medium' : '🟢 Clear'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{alert.message}</p>
                          {alert.eta_minutes != null && (
                            <p className="text-[11px] text-sky-600 font-medium mt-1">
                              {alert.eta_minutes === 0 ? '⏱ In progress now' : `⏱ Expected in ~${alert.eta_minutes} min`}
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {lastFetch
                ? `Updated ${lastFetch.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                : 'Not yet fetched'}
            </span>
            <Link
              to="/weather-alert"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
            >
              Full Weather Dashboard <FiExternalLink size={11} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── NAVBAR ────────────────────────────────────────────────── */
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate  = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try { setUser(JSON.parse(storedUser)); }
      catch { setUser(null); }
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 transition-all duration-500 ${
      scrolled
        ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-100'
        : 'bg-white/70 backdrop-blur-lg border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/50 group-hover:scale-105 transition-all duration-300 animate-pulse-glow">
            <FaLeaf className="text-white text-lg group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <span className="text-xl font-bold gradient-text hidden sm:block tracking-tight">Smart Krishi</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-4">
          <ul className="flex items-center gap-0.5">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-primary-700 font-semibold'
                      : 'text-gray-600 hover:text-primary-700'
                  }`}
                >
                  {link.name}
                  {/* Animated active underline */}
                  <span className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-primary-500 to-emerald-500 transition-all duration-300 ${
                    isActive(link.path) ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`} />
                  {/* Hover bg */}
                  <span className="absolute inset-0 rounded-lg bg-primary-50 opacity-0 hover:opacity-100 transition-opacity duration-200 -z-10" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right section: Bell + user controls */}
          <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
            {/* 🔔 Notification Bell */}
            {user && <NotificationBell />}

            {user ? (
              <>
                <span className="text-sm font-semibold text-gray-700">Hi, {user.name || 'User'}</span>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 bg-red-50 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-100 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-gray-700 hover:text-primary-600 transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-primary-500/20 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile: Bell + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          {user && <NotificationBell />}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-2 pb-3 animate-slide-down">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="px-4 py-2 mt-2 border-t border-gray-100 flex flex-col gap-2">
              {user ? (
                <>
                  <span className="block text-center py-2.5 text-sm font-semibold text-gray-700">
                    Hi, {user.name || 'User'}
                  </span>
                  <button
                    onClick={() => { setMobileOpen(false); handleLogout(); }}
                    className="block w-full text-center py-2.5 rounded-xl text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block text-center py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="block text-center py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-emerald-600 shadow-md shadow-primary-500/20 transition-all hover:shadow-lg"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

/* Spacer to offset fixed navbar height — drop this below <Navbar /> in your layout */
export function NavbarSpacer() {
  return <div className="h-[64px]" aria-hidden="true" />;
}

export default Navbar;
