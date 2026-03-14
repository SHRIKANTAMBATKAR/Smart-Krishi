import { Link } from 'react-router-dom';
import {
  FiUpload,
  FiShield,
  FiBookOpen,
  FiArrowRight,
  FiSun,
  FiMessageSquare,
  FiUsers,
} from 'react-icons/fi';
import Footer from '../components/Footer';

const features = [
  {
    icon: <FiUpload size={24} />,
    title: 'Crop Disease Detection',
    desc: 'Upload crop leaf images to detect diseases using artificial intelligence.',
    color: 'from-green-400 to-emerald-500',
    path: '/detect',
  },
  {
    icon: <FiShield size={24} />,
    title: 'Treatment Recommendation',
    desc: 'Get instant suggestions for treating crop diseases effectively.',
    color: 'from-blue-400 to-cyan-500',
    path: '/detect',
  },
  {
    icon: <FiBookOpen size={24} />,
    title: 'Natural Farming Guide',
    desc: 'Learn organic and sustainable farming techniques for better yields.',
    color: 'from-amber-400 to-orange-500',
    path: '/natural-farming',
  },
  {
    icon: <FiSun size={24} />,
    title: 'Modern Farming Guide',
    desc: 'Discover modern methodologies and technology for smart agriculture.',
    color: 'from-fuchsia-400 to-purple-500',
    path: '/modern-farming',
  },
  {
    icon: <FiMessageSquare size={24} />,
    title: 'AI Chatbot',
    desc: 'Chat with our AI assistant to get instant answers to your farming questions.',
    color: 'from-pink-400 to-rose-500',
    path: '/chatbot',
  },
  {
    icon: <FiUsers size={24} />,
    title: 'About Smart Krishi',
    desc: 'Learn about our mission to empower farmers with advanced technology.',
    color: 'from-indigo-400 to-violet-500',
    path: '/about',
  },
];

const steps = [
  {
    step: '01',
    title: 'Upload Image',
    desc: 'Take a photo of the affected crop leaf and upload it to our platform.',
  },
  {
    step: '02',
    title: 'AI Analysis',
    desc: 'Our AI model analyzes the image to identify potential diseases.',
  },
  {
    step: '03',
    title: 'Get Results',
    desc: 'Receive disease prediction and treatment recommendations instantly.',
  },
];

function Home() {
  return (
    <div className="-mx-4 -mt-8">
      {/* ─── HERO ────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-emerald-600 to-teal-700 text-white">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-bounce-slow" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-36 text-center">
          <span className="inline-block bg-white/15 backdrop-blur-sm text-sm font-medium px-4 py-1.5 rounded-full mb-6 animate-fade-in">
            🌾 AI-Powered Farming
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-slide-up">
            Smart Krishi
            <br />
            <span className="text-green-200">AI Powered Farming Assistant</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-green-100 leading-relaxed mb-10 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            An AI-powered platform that helps farmers detect crop diseases
            and get treatment recommendations instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/detect"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-primary-700 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Detect Crop Disease
              <FiArrowRight />
            </Link>
            <Link
              to="/natural-farming"
              className="w-full sm:w-auto px-8 py-3.5 bg-white/15 backdrop-blur-sm text-white border border-white/30 rounded-xl font-semibold hover:bg-white/25 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Learn Natural Farming
            </Link>
          </div>
        </div>

        {/* Wave divider */}
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 80" fill="none">
          <path d="M0 80h1440V30c-240 35-480 50-720 45S240 30 0 50v30z" fill="#f9fafb" />
        </svg>
      </section>

      {/* ─── FEATURES ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <h2 className="section-title">
          Why <span className="gradient-text">Smart Krishi?</span>
        </h2>
        <p className="section-subtitle">
          Empowering farmers with technology to grow healthier crops and earn more.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <Link
              to={f.path}
              key={f.title}
              className="card text-center group block hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className={`w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all`}
              >
                {f.icon}
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-primary-600 transition-colors">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────── */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="section-title">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="section-subtitle">
            Detect crop diseases in three simple steps.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200" />

            {steps.map((s, i) => (
              <div key={s.step} className="relative text-center" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-gradient-to-br from-primary-500 to-emerald-500 text-white flex items-center justify-center text-lg font-bold shadow-lg shadow-primary-500/20 relative z-10">
                  {s.step}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="bg-gradient-to-br from-primary-600 to-emerald-600 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
            Ready to protect your crops?
          </h2>
          <p className="text-green-100 mb-8 max-w-lg mx-auto relative z-10">
            Upload a crop leaf image and let our AI diagnose diseases in seconds.
          </p>
          <Link
            to="/detect"
            className="relative z-10 inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary-700 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all"
          >
            Get Started Free
            <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────── */}
      <Footer />
    </div>
  );
}

export default Home;
