import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight, FiX, FiCheckCircle } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import { loginUser } from '../services/api';
import axios from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

/* ─── Forgot Password Modal ─────────────────────────────────── */
function ForgotPasswordModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post(`${API_BASE_URL}/api/forgot-password`, { email });
      setSent(true);
    } catch (err) {
      setError(err?.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 relative animate-slide-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <FiX size={20} />
        </button>

        {!sent ? (
          <>
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto bg-gradient-to-br from-primary-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20 mb-4">
                <FiMail className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-1">Forgot Password?</h3>
              <p className="text-sm text-gray-500">
                Enter your registered email and we'll send you a reset link valid for 30 minutes.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-3 text-sm text-center mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    id="forgot-email"
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    disabled={loading}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center gap-2 py-3 px-4 text-sm font-semibold rounded-xl text-white ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-600 to-emerald-600 hover:from-primary-700 hover:to-emerald-700 hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-primary-500/30'
                } transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
              >
                {loading ? 'Sending…' : 'Send Reset Link'}
                {!loading && <FiArrowRight />}
              </button>
            </form>
          </>
        ) : (
          /* Success state */
          <div className="text-center py-4">
            <FiCheckCircle className="mx-auto text-emerald-500 mb-4" size={52} />
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Check Your Email</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              If <span className="font-semibold text-gray-700">{email}</span> is registered,
              a password reset link has been sent. Check your inbox (and spam folder).
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-primary-50 text-primary-700 rounded-xl font-semibold text-sm hover:bg-primary-100 transition-colors"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Login Page ─────────────────────────────────────────────── */
function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForgot, setShowForgot] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(formData.email, formData.password);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}

      <div className="min-h-screen flex">
        {/* Left – decorative panel (hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 animated-gradient flex-col items-center justify-center relative overflow-hidden p-12 text-white">
          {/* Blobs */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 animate-morph blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-500/10 animate-morph blur-3xl pointer-events-none" style={{ animationDelay: '3s' }} />

          {/* Floating icons */}
          {['🌾', '🌿', '🍃', '🌱', '🌻', '🌽'].map((em, i) => (
            <div
              key={i}
              className="absolute text-3xl opacity-20 animate-float"
              style={{
                top: `${10 + (i * 14) % 80}%`,
                left: `${5 + (i * 17) % 85}%`,
                animationDelay: `${i * 1.1}s`,
                animationDuration: `${5 + i}s`,
              }}
            >{em}</div>
          ))}

          <div className="relative z-10 text-center animate-fade-in">
            <div className="w-24 h-24 mx-auto bg-white/15 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 border border-white/20 animate-float">
              <FaLeaf className="text-white text-5xl" />
            </div>
            <h2 className="text-4xl font-black mb-4 leading-tight">Smart Krishi</h2>
            <p className="text-green-200 text-lg leading-relaxed max-w-xs">
              AI-powered crop disease detection and farming guidance — built for every farmer.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-10">
              {[['38+', 'Diseases'], ['95%', 'Accuracy'], ['10K+', 'Farmers'], ['3s', 'Analysis']].map(([val, lbl]) => (
                <div key={lbl} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                  <div className="text-2xl font-black text-white">{val}</div>
                  <div className="text-green-200 text-xs font-medium">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right – form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-8 lg:px-12 bg-gradient-to-br from-green-50/60 via-white to-emerald-50/40 py-12">
          <div className="w-full max-w-md">
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl shadow-primary-500/10 border border-green-100 relative overflow-hidden animate-scale-in">
              {/* Subtle corner decorations */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary-100 to-emerald-100 rounded-full blur-2xl opacity-60" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-teal-100 to-green-100 rounded-full blur-2xl opacity-60" />

              <div className="relative z-10 text-center mb-8">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-xl shadow-primary-500/25 mb-5 animate-pulse-glow">
                  <FaLeaf className="text-white text-3xl" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-1">Welcome Back</h2>
                <p className="text-sm text-gray-500">Sign in to your Smart Krishi account</p>
              </div>

              {successMessage && (
                <div className="relative z-10 bg-green-50 text-green-700 p-3 rounded-xl text-sm text-center border border-green-100 mb-4 animate-slide-up-fast">
                  ✅ {successMessage}
                </div>
              )}

              {error && (
                <div className="relative z-10 bg-red-50 text-red-600 p-3 rounded-xl text-sm text-center border border-red-100 mb-4 animate-slide-up-fast">
                  ⚠️ {error}
                </div>
              )}

              <form className="relative z-10 space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      id="email" name="email" type="email" autoComplete="email" required
                      className="block w-full pl-11 pr-3 py-3.5 border-2 border-gray-100 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10 sm:text-sm transition-all duration-200"
                      placeholder="you@example.com"
                      value={formData.email} onChange={handleChange} disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="password">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <FiLock className="text-gray-400" />
                    </div>
                    <input
                      id="password" name="password" type="password" autoComplete="current-password" required
                      className="block w-full pl-11 pr-3 py-3.5 border-2 border-gray-100 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10 sm:text-sm transition-all duration-200"
                      placeholder="••••••••"
                      value={formData.password} onChange={handleChange} disabled={loading}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input id="remember-me" name="remember-me" type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer" />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <button type="button" onClick={() => setShowForgot(true)}
                    className="text-sm font-semibold text-primary-600 hover:text-primary-500 transition-colors hover:underline">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit" disabled={loading}
                  className={`w-full flex justify-center items-center gap-2 py-3.5 px-4 text-sm font-bold rounded-xl text-white transition-all duration-300 ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary-600 to-emerald-600 hover:from-primary-700 hover:to-emerald-700 hover:-translate-y-0.5 active:scale-95 shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50'
                  } focus:outline-none focus:ring-4 focus:ring-primary-500/20`}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                  {!loading && <FiArrowRight className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>

              <div className="relative z-10 mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-bold text-primary-600 hover:text-primary-500 transition-colors">Sign up free</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
