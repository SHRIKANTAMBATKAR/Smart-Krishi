import { FaReact, FaPython, FaBrain } from 'react-icons/fa';
import { SiTensorflow, SiFlask, SiTailwindcss } from 'react-icons/si';
import { FiZap, FiDollarSign, FiSmartphone, FiSun } from 'react-icons/fi';
import Footer from '../components/Footer';
import { useScrollReveal, useCountUp } from '../hooks/useAnimations';

const techStack = [
    { icon: <FaReact size={32} />, name: 'React', color: 'text-cyan-400', bg: 'from-cyan-500/10 to-cyan-600/5', border: 'border-cyan-500/20' },
    { icon: <SiTailwindcss size={32} />, name: 'Tailwind CSS', color: 'text-sky-400', bg: 'from-sky-500/10 to-sky-600/5', border: 'border-sky-500/20' },
    { icon: <FaPython size={32} />, name: 'Python', color: 'text-yellow-400', bg: 'from-yellow-500/10 to-yellow-600/5', border: 'border-yellow-500/20' },
    { icon: <SiFlask size={32} />, name: 'Flask', color: 'text-gray-300', bg: 'from-gray-500/10 to-gray-600/5', border: 'border-gray-500/20' },
    { icon: <SiTensorflow size={32} />, name: 'TensorFlow', color: 'text-orange-400', bg: 'from-orange-500/10 to-orange-600/5', border: 'border-orange-500/20' },
    { icon: <FaBrain size={32} />, name: 'CNN Model', color: 'text-purple-400', bg: 'from-purple-500/10 to-purple-600/5', border: 'border-purple-500/20' },
];

const benefits = [
    { icon: <FiZap size={22} />, emoji: '⚡', title: 'Instant Detection', desc: 'Get disease predictions within seconds using state-of-the-art AI technology.', color: 'from-yellow-400 to-amber-500', glow: 'shadow-amber-500/20' },
    { icon: <FiDollarSign size={22} />, emoji: '💰', title: 'Save Costs', desc: 'Early detection helps farmers avoid crop loss and reduce unnecessary pesticide usage.', color: 'from-green-400 to-emerald-600', glow: 'shadow-emerald-500/20' },
    { icon: <FiSmartphone size={22} />, emoji: '📱', title: 'Easy to Use', desc: 'Simple interface designed for farmers — just upload an image and get results.', color: 'from-blue-400 to-cyan-600', glow: 'shadow-cyan-500/20' },
    { icon: <FiSun size={22} />, emoji: '🌱', title: 'Organic Farming', desc: 'Provides natural farming techniques and organic treatment recommendations.', color: 'from-teal-400 to-green-600', glow: 'shadow-teal-500/20' },
];

function MissionStat({ value, suffix, label }) {
    const ref = useCountUp(value, 1500);
    return (
        <div className="text-center reveal-scale">
            <div className="text-4xl md:text-5xl font-black gradient-text">
                <span ref={ref}>0</span>{suffix}
            </div>
            <p className="text-gray-500 text-sm mt-1 font-medium">{label}</p>
        </div>
    );
}

function About() {
    useScrollReveal();

    return (
        <div className="-mx-4 -mt-8 page-enter">

            {/* ── Hero ────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-emerald-700 to-teal-800 text-white py-28">
                {/* Decorative blobs */}
                <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none animate-float" />
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none animate-float-delayed" />

                <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
                    <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-sm font-semibold px-5 py-2 rounded-full mb-8 border border-white/20 animate-fade-in">
                        ℹ️ About Smart Krishi
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        Empowering Farmers with{' '}
                        <span className="text-green-200">AI Technology</span>
                    </h1>
                    <p className="text-green-100 text-lg leading-relaxed max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.25s' }}>
                        Smart Krishi was born from the idea that technology should serve those who feed the world. Our mission is to make crop disease detection accessible, fast, and affordable for every farmer.
                    </p>
                </div>

                {/* Wave */}
                <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
                    <path d="M0 80h1440V30c-240 35-480 50-720 45S240 30 0 50v30z" fill="#f9fafb" />
                </svg>
            </section>

            {/* ── Mission Stats ──────────────────────────── */}
            <section className="max-w-5xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <MissionStat value={38} suffix="+" label="Crop Diseases Detected" />
                    <MissionStat value={95} suffix="%" label="Model Accuracy" />
                    <MissionStat value={10000} suffix="+" label="Farmers Helped" />
                    <MissionStat value={3} suffix="s" label="Average Response Time" />
                </div>
            </section>

            {/* ── Why We Built This ──────────────────────── */}
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-5xl mx-auto px-4 md:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="reveal-left">
                            <span className="pill bg-primary-100 text-primary-700 mb-4 inline-flex">🌾 Our Story</span>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-5 leading-tight">
                                Why we built <span className="gradient-text">Smart Krishi</span>
                            </h2>
                            <p className="text-gray-500 leading-relaxed mb-4 text-base">
                                Crop diseases cause billions of dollars in losses for farmers every year. Many farmers lack access to agricultural experts or laboratories that can quickly identify diseases.
                            </p>
                            <p className="text-gray-500 leading-relaxed text-base">
                                With smartphone cameras and AI, we can bring expert-level diagnosis directly to the farm. Our Convolutional Neural Network (CNN) model is trained on thousands of crop leaf images to accurately identify diseases and recommend treatments.
                            </p>
                        </div>

                        <div className="reveal-right">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-emerald-400 rounded-3xl blur-xl opacity-20 animate-pulse-slow" />
                                <div className="relative bg-gradient-to-br from-primary-600 to-emerald-600 rounded-3xl p-10 text-center text-white overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                                    <div className="text-7xl mb-5 animate-float">🌾</div>
                                    <p className="text-white font-bold text-xl leading-tight mb-2 relative z-10">
                                        "Technology for those who feed the world"
                                    </p>
                                    <p className="text-green-200 text-sm relative z-10">— Smart Krishi Mission</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Benefits ───────────────────────────────── */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="reveal text-center mb-4">
                        <span className="pill bg-emerald-100 text-emerald-700">🏆 Benefits</span>
                    </div>
                    <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>
                        Benefits for <span className="gradient-text">Farmers</span>
                    </h2>
                    <p className="section-subtitle reveal" style={{ transitionDelay: '0.2s' }}>
                        Making agriculture smarter, one leaf at a time.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((b, i) => (
                            <div
                                key={b.title}
                                className="reveal-scale card group text-center"
                                style={{ transitionDelay: `${i * 0.1}s` }}
                            >
                                <div className={`w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${b.color} shadow-xl ${b.glow} flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                    {b.icon}
                                </div>
                                <h3 className="font-bold text-gray-800 mb-3 text-lg group-hover:text-primary-600 transition-colors">{b.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Tech Stack ─────────────────────────────── */}
            <section className="py-20" style={{ background: 'linear-gradient(135deg, #0a1f0f 0%, #0f2d17 60%, #0d1f2d 100%)' }}>
                <div className="max-w-5xl mx-auto px-4 md:px-8">
                    <div className="reveal text-center mb-4">
                        <span className="pill bg-white/10 text-white border border-white/20">⚙️ Stack</span>
                    </div>
                    <h2 className="section-title text-white reveal" style={{ transitionDelay: '0.1s' }}>
                        Technology <span className="text-green-300">Stack</span>
                    </h2>
                    <p className="section-subtitle text-gray-400 reveal" style={{ transitionDelay: '0.2s' }}>
                        Built with modern, reliable, and scalable technologies.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {techStack.map((t, i) => (
                            <div
                                key={t.name}
                                className={`reveal-scale group flex flex-col items-center gap-3 py-7 px-3 rounded-2xl bg-gradient-to-b ${t.bg} border ${t.border} hover:-translate-y-2 hover:shadow-xl transition-all duration-500 cursor-default`}
                                style={{ transitionDelay: `${i * 0.08}s` }}
                            >
                                <span className={`${t.color} group-hover:scale-125 transition-transform duration-300`}>{t.icon}</span>
                                <span className="text-xs font-semibold text-gray-300 text-center">{t.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default About;
