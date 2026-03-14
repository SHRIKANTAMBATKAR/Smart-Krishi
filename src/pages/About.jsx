import { FaReact, FaPython, FaBrain } from 'react-icons/fa';
import { SiTensorflow, SiFlask, SiTailwindcss } from 'react-icons/si';
import Footer from '../components/Footer';

const techStack = [
    { icon: <FaReact size={28} />, name: 'React', color: 'text-cyan-500' },
    { icon: <SiTailwindcss size={28} />, name: 'Tailwind CSS', color: 'text-sky-500' },
    { icon: <FaPython size={28} />, name: 'Python', color: 'text-yellow-500' },
    { icon: <SiFlask size={28} />, name: 'Flask', color: 'text-gray-600' },
    { icon: <SiTensorflow size={28} />, name: 'TensorFlow', color: 'text-orange-500' },
    { icon: <FaBrain size={28} />, name: 'CNN Model', color: 'text-purple-500' },
];

const benefits = [
    {
        emoji: '⚡',
        title: 'Instant Detection',
        desc: 'Get disease predictions within seconds using state-of-the-art AI technology.',
    },
    {
        emoji: '💰',
        title: 'Save Costs',
        desc: 'Early detection helps farmers avoid crop loss and reduce unnecessary pesticide usage.',
    },
    {
        emoji: '📱',
        title: 'Easy to Use',
        desc: 'Simple interface designed for farmers — just upload an image and get results.',
    },
    {
        emoji: '🌱',
        title: 'Promote Organic Farming',
        desc: 'Provides natural farming techniques and organic treatment recommendations.',
    },
];

function About() {
    return (
        <div className="-mx-4 -mt-8 animate-fade-in">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary-50 via-emerald-50 to-white py-20">
                <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                    <span className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                        ℹ️ About the Project
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
                        Empowering Farmers with{' '}
                        <span className="gradient-text">AI Technology</span>
                    </h1>
                    <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
                        Smart Krishi was born from the idea that technology should serve those who
                        feed the world. Our mission is to make crop disease detection accessible,
                        fast, and affordable for every farmer.
                    </p>
                </div>
            </section>

            {/* Motivation */}
            <section className="max-w-4xl mx-auto px-4 md:px-8 py-16">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Why we built <span className="gradient-text">Smart Krishi</span>
                        </h2>
                        <p className="text-gray-500 leading-relaxed mb-4">
                            Crop diseases cause billions of dollars in losses for farmers every year.
                            Many farmers lack access to agricultural experts or laboratories that can
                            quickly identify diseases.
                        </p>
                        <p className="text-gray-500 leading-relaxed">
                            With smartphone cameras and AI, we can bring expert-level diagnosis
                            directly to the farm. Our Convolutional Neural Network (CNN) model is
                            trained on thousands of crop leaf images to accurately identify diseases
                            and recommend treatments.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-primary-100 to-emerald-100 rounded-3xl p-8 text-center">
                        <div className="text-6xl mb-4">🌾</div>
                        <p className="text-primary-800 font-semibold text-lg">
                            "Technology for those who feed the world"
                        </p>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <h2 className="section-title">
                        Benefits for <span className="gradient-text">Farmers</span>
                    </h2>
                    <p className="section-subtitle">
                        Making agriculture smarter, one leaf at a time.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((b) => (
                            <div key={b.title} className="card text-center">
                                <div className="text-4xl mb-4">{b.emoji}</div>
                                <h3 className="font-bold text-gray-800 mb-2">{b.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <h2 className="section-title">
                    Technology <span className="gradient-text">Stack</span>
                </h2>
                <p className="section-subtitle">
                    Built with modern, reliable, and scalable technologies.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                    {techStack.map((t) => (
                        <div
                            key={t.name}
                            className="card flex flex-col items-center gap-3 py-6"
                        >
                            <span className={t.color}>{t.icon}</span>
                            <span className="text-sm font-medium text-gray-700">{t.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default About;
