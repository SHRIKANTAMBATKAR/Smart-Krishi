import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FiLock, FiArrowRight, FiCheckCircle, FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import axios from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) setError('Invalid reset link. Please request a new one.');
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }

    setLoading(true);
    setError('');
    try {
      await axios.post(`${API_BASE_URL}/api/reset-password`, { token, password });
      setSuccess(true);
      setTimeout(() => navigate('/login', { state: { message: 'Password reset! Please log in.' } }), 3000);
    } catch (err) {
      setError(err?.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-primary-500/10 border border-green-100 p-8 sm:p-10 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary-100 to-emerald-100 rounded-full blur-2xl opacity-50" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-teal-100 to-green-100 rounded-full blur-2xl opacity-50" />

        <div className="relative z-10 text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20 mb-6">
            <FaLeaf className="text-white text-3xl" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-1">Set New Password</h2>
          <p className="text-sm text-gray-500">Enter a strong new password below</p>
        </div>

        {/* Success state */}
        {success && (
          <div className="relative z-10 flex flex-col items-center gap-4 py-6 text-center">
            <FiCheckCircle className="text-emerald-500" size={48} />
            <p className="text-emerald-700 font-semibold text-lg">Password reset successfully!</p>
            <p className="text-gray-500 text-sm">Redirecting you to login in 3 seconds…</p>
            <Link to="/login" className="mt-2 text-primary-600 font-semibold text-sm hover:underline">
              Go to Login now
            </Link>
          </div>
        )}

        {/* Error with no token */}
        {!success && !token && (
          <div className="relative z-10 text-center py-6">
            <FiAlertCircle className="mx-auto text-red-400 mb-3" size={40} />
            <p className="text-red-600 font-medium mb-4">{error}</p>
            <Link to="/login" className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-50 text-primary-700 rounded-xl font-semibold text-sm hover:bg-primary-100 transition-colors">
              Back to Login
            </Link>
          </div>
        )}

        {/* Form */}
        {!success && token && (
          <form className="relative z-10 space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 border border-red-100 rounded-xl p-3 text-sm text-center">
                {error}
              </div>
            )}

            {/* New password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="new-password">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="new-password"
                  type={showPass ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  disabled={loading}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl bg-gray-50 placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirm-password">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="confirm-password"
                  type={showPass ? 'text' : 'password'}
                  required
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="Re-enter your new password"
                  disabled={loading}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
            </div>

            {/* Strength indicator */}
            {password && (
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[...Array(4)].map((_, i) => {
                    const strength = password.length >= 12 ? 4 : password.length >= 8 ? 3 : password.length >= 6 ? 2 : 1;
                    return (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all ${
                          i < strength
                            ? strength === 1 ? 'bg-red-400'
                            : strength === 2 ? 'bg-amber-400'
                            : strength === 3 ? 'bg-yellow-400'
                            : 'bg-emerald-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    );
                  })}
                </div>
                <p className="text-xs text-gray-400">
                  {password.length < 6 ? 'Too short' : password.length < 8 ? 'Weak' : password.length < 12 ? 'Good' : 'Strong'}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center gap-2 py-3 px-4 text-sm font-semibold rounded-xl text-white ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary-600 to-emerald-600 hover:from-primary-700 hover:to-emerald-700 hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-primary-500/30'
              } transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
            >
              {loading ? 'Updating…' : 'Reset Password'}
              {!loading && <FiArrowRight />}
            </button>

            <p className="text-center text-sm text-gray-500">
              Remember your password?{' '}
              <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
                Sign in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
