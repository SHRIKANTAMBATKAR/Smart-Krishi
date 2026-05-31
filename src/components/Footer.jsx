import { Link } from 'react-router-dom';
import { FaLeaf, FaGithub, FaEnvelope, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { FiArrowRight, FiHeart } from 'react-icons/fi';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Disease Detection', path: '/detect' },
  { name: 'Natural Farming', path: '/natural-farming' },
  { name: 'Modern Farming', path: '/modern-farming' },
  { name: 'Weather Alert', path: '/weather-alert' },
  { name: 'About', path: '/about' },
];

function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1f0f 0%, #0f2d17 40%, #0d1f2d 100%)' }}>
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-900/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-teal-900/20 rounded-full blur-2xl pointer-events-none" />

      {/* Top wave */}
      <div className="w-full leading-none" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0 0h1440v30c-240-25-480-30-720-25S240 25 0 30V0z" fill="#f9fafb" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand column */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 group-hover:shadow-primary-500/50 transition-all duration-300">
                <FaLeaf className="text-white text-base" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Smart Krishi</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-6 max-w-xs">
              An AI-powered platform helping farmers detect crop diseases and get instant treatment recommendations using advanced machine learning.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: <FaGithub size={16} />, href: 'https://github.com/SHRIKANTAMBATKAR', label: 'GitHub' },
                { icon: <FaEnvelope size={16} />, href: 'mailto:shrikantambatkar8@gmail.com', label: 'Email' },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-600/30 hover:border-primary-500/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    <FiArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-gray-400 mb-6">
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <FaEnvelope className="text-primary-400" size={13} />
                </span>
                <span>shrikantambatkar8@gmail.com</span>
              </li>
              <li>
                <a
                  href="https://github.com/SHRIKANTAMBATKAR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary-400 transition-colors duration-200 group"
                >
                  <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary-600/20 transition-colors">
                    <FaGithub className="text-primary-400" size={13} />
                  </span>
                  GitHub Repository
                </a>
              </li>
            </ul>

            {/* Status pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/40 border border-emerald-700/40 text-xs text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All systems operational
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Smart Krishi. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <FiHeart className="text-red-400 animate-pulse" /> for farmers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
