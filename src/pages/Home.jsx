import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  FiUpload, FiShield, FiBookOpen, FiArrowRight,
  FiSun, FiMessageSquare, FiCloudRain, FiTrendingUp,
  FiUsers, FiAward, FiCheckCircle,
} from 'react-icons/fi';
import { FaLeaf, FaSeedling, FaRobot } from 'react-icons/fa';
import Footer from '../components/Footer';
import { useScrollReveal, useParticles, useCountUp } from '../hooks/useAnimations';

/* ── Data ─────────────────────────────────────────────────── */
const features = [
  { icon: <FiUpload size={22} />, title: 'Crop Disease Detection', desc: 'Upload crop leaf images to detect diseases using AI in seconds.', color: 'from-emerald-400 to-green-600', path: '/detect', glow: 'shadow-emerald-500/30' },
  { icon: <FiShield size={22} />, title: 'Treatment Recommendation', desc: 'Get instant expert suggestions for treating crop diseases effectively.', color: 'from-blue-400 to-cyan-600', path: '/detect', glow: 'shadow-blue-500/30' },
  { icon: <FiBookOpen size={22} />, title: 'Natural Farming Guide', desc: 'Learn organic and sustainable farming techniques for better yields.', color: 'from-amber-400 to-orange-600', path: '/natural-farming', glow: 'shadow-amber-500/30' },
  { icon: <FiSun size={22} />, title: 'Modern Farming Guide', desc: 'Discover modern methodologies and technology for smart agriculture.', color: 'from-fuchsia-400 to-purple-600', path: '/modern-farming', glow: 'shadow-fuchsia-500/30' },
  { icon: <FiMessageSquare size={22} />, title: 'AI Chatbot Assistant', desc: 'Chat with our AI to get instant answers to your farming questions.', color: 'from-pink-400 to-rose-600', path: '/chatbot', glow: 'shadow-pink-500/30' },
  { icon: <FiCloudRain size={22} />, title: 'Weather Alert System', desc: 'Get AI-powered early warnings 30 min before harmful weather hits.', color: 'from-sky-400 to-blue-600', path: '/weather-alert', glow: 'shadow-sky-500/30' },
];

const steps = [
  { step: '01', title: 'Upload Image', desc: 'Take a photo of the affected crop leaf and upload it.', icon: <FiUpload size={20} /> },
  { step: '02', title: 'AI Analysis', desc: 'Our CNN model analyses the image to detect potential diseases.', icon: <FaRobot size={20} /> },
  { step: '03', title: 'Get Results', desc: 'Receive disease prediction and treatment recommendations instantly.', icon: <FiCheckCircle size={20} /> },
];

const stats = [
  { value: 38, suffix: '+', label: 'Diseases Detected', icon: <FiShield size={20} /> },
  { value: 95, suffix: '%', label: 'Detection Accuracy', icon: <FiAward size={20} /> },
  { value: 10000, suffix: '+', label: 'Farmers Helped', icon: <FiUsers size={20} /> },
  { value: 3, suffix: 's', label: 'Avg. Response Time', icon: <FiTrendingUp size={20} /> },
];

const testimonials = [
  { name: 'Ramesh Patil', region: 'Maharashtra', text: 'Smart Krishi helped me save my entire tomato crop by identifying early blight in time!', avatar: '👨‍🌾' },
  { name: 'Sunita Devi', region: 'Punjab', text: 'The AI chatbot answers all my questions about organic farming — like having an expert 24/7.', avatar: '👩‍🌾' },
  { name: 'Arjun Sharma', region: 'Karnataka', text: 'The weather alert saved me from a hailstorm last month. I moved my crops just in time.', avatar: '🧑‍🌾' },
];

/* ── Particle Hero Canvas ─────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useParticles(40);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

/* ── Animated Stat ────────────────────────────────────────── */
function StatItem({ value, suffix, label, icon }) {
  const numRef = useCountUp(value, 1800);
  return (
    <div className="stat-badge group cursor-default">
      <div className="text-white/70 mb-2 group-hover:text-white transition-colors duration-300">{icon}</div>
      <div className="flex items-end gap-0.5">
        <span ref={numRef} className="text-3xl md:text-4xl font-extrabold text-white tabular-nums">0</span>
        <span className="text-xl font-bold text-green-300 mb-0.5">{suffix}</span>
      </div>
      <p className="text-green-200 text-xs font-medium mt-1 text-center">{label}</p>
    </div>
  );
}

/* ── Feature Card with Tilt ───────────────────────────────── */
function FeatureCard({ f, delay }) {
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-8px)`;
  };
  const handleLeave = () => {
    const el = cardRef.current;
    if (el) el.style.transform = 'perspective(700px) rotateY(0) rotateX(0) translateY(0)';
  };

  return (
    <Link
      to={f.path}
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="reveal reveal-scale group block relative bg-white rounded-2xl p-6 text-center
                 border border-gray-100 shadow-lg hover:shadow-2xl transition-shadow duration-500
                 cursor-pointer overflow-hidden"
      style={{ animationDelay: `${delay}s`, transitionProperty: 'box-shadow', transitionDuration: '500ms' }}
    >
      {/* Hover gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

      {/* Icon */}
      <div className={`icon-box bg-gradient-to-br ${f.color} shadow-xl ${f.glow} mb-5`}>
        {f.icon}
      </div>

      {/* Ripple ring on hover */}
      <div className={`absolute top-8 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-20 group-hover:scale-[2.5] transition-all duration-700`} />

      <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-primary-700 transition-colors duration-300">
        {f.title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>

      <div className="mt-4 flex items-center justify-center gap-1 text-xs font-semibold text-primary-600 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        Learn more <FiArrowRight size={12} />
      </div>
    </Link>
  );
}

/* ── Testimonial Card ─────────────────────────────────────── */
function TestimonialCard({ t, delay }) {
  return (
    <div
      className="reveal reveal-scale card-glass p-6 relative overflow-hidden"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
      <div className="text-4xl mb-4">{t.avatar}</div>
      <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
      <div>
        <p className="font-bold text-gray-800 text-sm">{t.name}</p>
        <p className="text-xs text-primary-600 font-medium">{t.region}</p>
      </div>
      {/* Quote mark decoration */}
      <div className="absolute bottom-4 right-5 text-6xl text-primary-100 font-serif leading-none select-none">"</div>
    </div>
  );
}

/* ── Typewriter Hook ──────────────────────────────────────── */
function useTypewriter(words, speed = 80, pause = 2200) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, display.length + 1));
        if (display.length + 1 === word.length) setTimeout(() => setDeleting(true), pause);
      } else {
        setDisplay(word.slice(0, display.length - 1));
        if (display.length - 1 === 0) {
          setDeleting(false);
          setWordIdx((i) => (i + 1) % words.length);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [display, deleting, wordIdx, words, speed, pause]);

  return display;
}

/* ── HOME PAGE ───────────────────────────────────────────── */
function Home() {
  useScrollReveal();
  const typeText = useTypewriter(['Crop Diseases', 'Yield Loss', 'Farming Risks', 'Weather Damage'], 85, 2000);

  return (
    <div className="-mx-4 -mt-8 page-enter">

      {/* ─── HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden animated-gradient text-white min-h-[90vh] flex items-center">
        <ParticleCanvas />

        {/* Morphing blobs */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-white/5 animate-morph blur-2xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 animate-morph blur-3xl pointer-events-none" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 animate-morph blur-3xl pointer-events-none" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 text-center w-full">

          {/* Pill badge */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-sm font-semibold px-5 py-2 rounded-full mb-8 border border-white/20 shadow-lg">
              <FaLeaf className="text-green-300" />
              🌾 AI-Powered Farming Platform
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.1] mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <span className="block">Smart Krishi</span>
            <span className="block text-green-200 text-4xl sm:text-5xl md:text-6xl font-bold mt-2">
              AI Farming Assistant
            </span>
          </h1>

          {/* Typewriter */}
          <div className="text-2xl sm:text-3xl font-bold mb-6 animate-fade-in h-10" style={{ animationDelay: '0.4s' }}>
            <span className="text-green-200">Detect </span>
            <span className="text-white border-r-2 border-green-300 pr-0.5">{typeText}</span>
            <span className="text-green-200"> Instantly</span>
          </div>

          <p className="max-w-2xl mx-auto text-lg text-green-100 leading-relaxed mb-10 animate-slide-up" style={{ animationDelay: '0.35s' }}>
            An AI-powered platform that helps farmers detect crop diseases, get treatment recommendations, and protect yields — powered by deep learning.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <Link to="/detect"
              className="group w-full sm:w-auto px-8 py-4 bg-white text-primary-700 rounded-2xl font-bold shadow-2xl shadow-black/20 hover:shadow-white/20 hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 text-base"
            >
              <FaSeedling className="text-primary-500 group-hover:animate-bounce" />
              Detect Crop Disease
              <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link to="/natural-farming"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-2xl font-semibold hover:bg-white/20 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 text-base"
            >
              <FiBookOpen /> Explore Farming Guides
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.7s' }}>
            {stats.map((s) => <StatItem key={s.label} {...s} />)}
          </div>
        </div>

        {/* Wave divider */}
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 90" fill="none" preserveAspectRatio="none">
          <path d="M0 90h1440V35c-200 40-480 55-720 50S200 35 0 55V90z" fill="#f9fafb" />
        </svg>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-24">
        <div className="reveal text-center mb-4">
          <span className="pill bg-primary-100 text-primary-700">✨ Features</span>
        </div>
        <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>
          Why <span className="gradient-text">Smart Krishi?</span>
        </h2>
        <p className="section-subtitle reveal" style={{ transitionDelay: '0.2s' }}>
          Empowering farmers with cutting-edge technology to grow healthier crops and earn more.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={f.title} f={f} delay={i * 0.08} />
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-emerald-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          <div className="reveal text-center mb-4">
            <span className="pill bg-emerald-100 text-emerald-700">🔬 Process</span>
          </div>
          <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="section-subtitle reveal" style={{ transitionDelay: '0.2s' }}>
            Detect crop diseases in three simple steps.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-500 to-primary-200 animate-gradient-shift bg-[size:200%]" />

            {steps.map((s, i) => (
              <div
                key={s.step}
                className="reveal reveal-scale relative text-center group"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                {/* Step circle */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-primary-500/30 relative z-10 group-hover:scale-110 group-hover:shadow-primary-500/50 transition-all duration-500 animate-pulse-glow">
                  <span className="text-2xl font-black">{s.step}</span>
                  {/* Ripple */}
                  <span className="absolute inset-0 rounded-full border-2 border-primary-400 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700" />
                </div>

                <div className="flex items-center justify-center gap-2 mb-2 text-primary-600">
                  {s.icon}
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-emerald-700 to-teal-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          <div className="reveal text-center mb-4">
            <span className="pill bg-white/15 text-white border border-white/20">💬 Testimonials</span>
          </div>
          <h2 className="section-title text-white reveal" style={{ transitionDelay: '0.1s' }}>
            Trusted by <span className="text-green-200">Real Farmers</span>
          </h2>
          <p className="section-subtitle text-green-200 reveal" style={{ transitionDelay: '0.2s' }}>
            Hear from the farmers who use Smart Krishi every day.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} t={t} delay={i * 0.12} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="reveal-scale gradient-border overflow-hidden rounded-3xl">
          <div className="bg-gradient-to-br from-primary-600 via-emerald-600 to-teal-600 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-2xl animate-float pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-xl animate-float-delayed pointer-events-none" />

            {/* Orbiting leaf */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none">
              <div className="animate-orbit text-2xl opacity-30 select-none">🌿</div>
            </div>

            <FaLeaf className="text-5xl text-white/20 mx-auto mb-6 animate-float" />
            <h2 className="text-3xl md:text-5xl font-black mb-4 relative z-10">
              Ready to protect your crops?
            </h2>
            <p className="text-green-100 mb-10 max-w-lg mx-auto relative z-10 text-lg">
              Upload a crop leaf image and let our AI diagnose diseases in seconds. Free for all farmers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center relative z-10">
              <Link to="/detect"
                className="group inline-flex items-center gap-2 px-10 py-4 bg-white text-primary-700 rounded-2xl font-bold shadow-2xl shadow-black/20 hover:shadow-white/30 hover:-translate-y-1 active:scale-95 transition-all duration-300 text-base"
              >
                Get Started Free
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-white rounded-2xl font-semibold hover:bg-white/20 active:scale-95 transition-all duration-300 text-base"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
