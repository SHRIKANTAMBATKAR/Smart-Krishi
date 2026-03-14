import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Disease Detection', path: '/detect' },
  { name: 'Chat Bot', path: '/chatbot' },
  { name: 'Natural Farming', path: '/natural-farming' },
  { name: 'Modern Farming', path: '/modern-farming' },
  { name: 'About', path: '/about' },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow">
            <FaLeaf className="text-white text-lg" />
          </div>
          <span className="text-xl font-bold gradient-text hidden sm:block">
            Smart Krishi
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.path)
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
            <Link to="/login" className="text-sm font-semibold text-gray-700 hover:text-primary-600 transition-colors">
              Login
            </Link>
            <Link to="/register" className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-primary-500/20 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
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
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.path)
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="px-4 py-2 mt-2 border-t border-gray-100 flex flex-col gap-2">
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
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
