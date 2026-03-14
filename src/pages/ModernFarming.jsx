import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiCheckCircle, FiMapPin, FiPlay } from 'react-icons/fi';
import Footer from '../components/Footer';

const techniques = [
    {
        icon: '🎯',
        title: 'Precision Farming',
        tagline: 'Data-driven agriculture for maximum efficiency',
        description:
            'Uses sensors, GPS, drones and data analytics to optimize every aspect of farming — from seeding to harvesting.',
        howItWorks: [
            'Soil moisture sensors collect real-time data from the field',
            'Drones monitor crop health using aerial imaging',
            'AI systems recommend optimal fertilizer and irrigation schedules',
        ],
        benefits: [
            '30–40% fertilizer saving',
            'Significant water conservation',
            'Higher crop yield and quality',
        ],
        indiaStatus:
            'Currently adopted mostly by large farms and agri-tech startups. Government is promoting it through Digital Agriculture Mission.',
        color: 'from-blue-500 to-cyan-500',
        bgLight: 'from-blue-50 to-cyan-50',
    },
    {
        icon: '💧',
        title: 'Hydroponic Farming',
        tagline: 'Grow crops without soil using nutrient-rich water',
        description:
            'Plants are grown in water-based nutrient solutions instead of soil, enabling farming in controlled indoor environments.',
        howItWorks: [
            'Plant roots are suspended in nutrient-rich water solution',
            'Nutrients are delivered directly through the water',
            'Indoor farming becomes possible with controlled lighting',
        ],
        benefits: [
            '90% less water usage compared to traditional farming',
            'Faster crop growth cycles',
            'Farming possible in very small spaces',
        ],
        indiaStatus:
            'Growing rapidly in urban areas. Startups in Bangalore, Pune, and Delhi NCR are leading adoption.',
        color: 'from-teal-500 to-emerald-500',
        bgLight: 'from-teal-50 to-emerald-50',
    },
    {
        icon: '🏢',
        title: 'Vertical Farming',
        tagline: 'Multi-layer indoor farming for urban areas',
        description:
            'Crops are grown in stacked vertical layers, using controlled environments with LED lighting and soilless techniques.',
        howItWorks: [
            'LED grow lights provide optimal light spectrum for each crop',
            'Temperature, humidity and CO₂ levels are precisely controlled',
            'Hydroponics or aeroponics deliver nutrients efficiently',
        ],
        benefits: [
            'Massive land saving — grow more in less space',
            'Year-round farming regardless of weather',
            'Enables fresh produce in urban areas',
        ],
        indiaStatus:
            'Very limited adoption currently. A few pilot projects in metro cities are showing promising results.',
        color: 'from-purple-500 to-violet-500',
        bgLight: 'from-purple-50 to-violet-50',
    },
    {
        icon: '🚁',
        title: 'Drone Farming',
        tagline: 'Aerial crop monitoring and precision spraying',
        description:
            'Agricultural drones are used for crop health monitoring, mapping, and automated pesticide/fertilizer spraying.',
        howItWorks: [
            'Drones with NDVI cameras detect crop health and stress areas',
            'Automated spraying systems apply pesticides uniformly',
            'Aerial mapping creates detailed field maps for planning',
        ],
        benefits: [
            'Huge time saving on large farmlands',
            'Uniform and precise pesticide application',
            'Ideal for large-scale farming operations',
        ],
        indiaStatus:
            'Government actively promoting through subsidies. DGCA has released drone operation guidelines for agriculture.',
        color: 'from-orange-500 to-amber-500',
        bgLight: 'from-orange-50 to-amber-50',
    },
    {
        icon: '📡',
        title: 'IoT Smart Irrigation',
        tagline: 'Automated water management with sensors',
        description:
            'IoT sensors and mobile apps work together to automatically control irrigation based on real-time soil moisture data.',
        howItWorks: [
            'Soil moisture sensors monitor water levels in real-time',
            'Data is sent to a central system or mobile app',
            'System automatically controls water supply valves',
        ],
        benefits: [
            'Up to 50% water saving',
            'Eliminates over-irrigation and waterlogging',
            'Higher productivity with optimal water delivery',
        ],
        indiaStatus:
            'Being promoted under PMKSY (Pradhan Mantri Krishi Sinchayee Yojana). Adoption growing in water-scarce regions.',
        color: 'from-sky-500 to-blue-600',
        bgLight: 'from-sky-50 to-blue-50',
    },
];

const videos = [
    {
        id: 'EhAemz1v7dQ',
        title: 'What is Precision Agriculture?',
        description: 'Explore how GPS, sensors and AI are revolutionizing modern farming practices.',
        gradient: 'from-blue-500 to-cyan-500',
    },
    {
        id: 'jR0gBgDIcHM',
        title: 'Hydroponics Farming Explained',
        description: 'Complete guide to growing crops without soil using hydroponic systems.',
        gradient: 'from-teal-500 to-emerald-500',
    },
    {
        id: 'I_SuMfOBGzc',
        title: 'Inside a Vertical Farm',
        description: 'See how vertical farms grow food in stacked layers with LED lights and no soil.',
        gradient: 'from-purple-500 to-violet-500',
    },
    {
        id: 'PLyBaFdWPaU',
        title: 'Drones in Agriculture',
        description: 'How agricultural drones are transforming crop monitoring and spraying.',
        gradient: 'from-orange-500 to-amber-500',
    },
    {
        id: 'w8yLRqFr5s0',
        title: 'Smart Irrigation with IoT',
        description: 'Learn how IoT sensors automate irrigation for massive water savings.',
        gradient: 'from-sky-500 to-blue-600',
    },
    {
        id: 'DPNK7bc2qvI',
        title: 'Agri-Tech Revolution in India',
        description: 'How Indian startups and government initiatives are modernizing agriculture.',
        gradient: 'from-green-500 to-teal-500',
    },
];

function TechCard({ tech }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="card overflow-hidden group">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
                <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-2xl shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                >
                    {tech.icon}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800">{tech.title}</h3>
                    <p className="text-sm text-gray-400">{tech.tagline}</p>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
                {tech.description}
            </p>

            {/* Toggle */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="text-primary-600 text-sm font-semibold flex items-center gap-1 hover:text-primary-700 transition-colors"
            >
                {expanded ? 'Show Less' : 'Learn More'}
                {expanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
            </button>

            {/* Expanded Details */}
            {expanded && (
                <div className="mt-5 space-y-5 animate-fade-in">
                    {/* How it works */}
                    <div className={`rounded-xl p-4 bg-gradient-to-br ${tech.bgLight} border border-gray-100`}>
                        <h4 className="font-semibold text-gray-700 mb-3 text-sm">⚙️ How It Works</h4>
                        <ul className="space-y-2">
                            {tech.howItWorks.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                    <span className="mt-1 w-5 h-5 rounded-full bg-white text-xs flex items-center justify-center font-bold text-gray-500 flex-shrink-0 shadow-sm">
                                        {i + 1}
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-3 text-sm">✅ Benefits</h4>
                        <ul className="space-y-2">
                            {tech.benefits.map((b, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                    <FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} />
                                    {b}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* India Status */}
                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                        <h4 className="font-semibold text-amber-800 mb-1 text-sm flex items-center gap-1">
                            <FiMapPin size={14} />
                            Status in India
                        </h4>
                        <p className="text-sm text-amber-700 leading-relaxed">{tech.indiaStatus}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

function ModernFarming() {
    return (
        <div className="-mx-4 -mt-8 animate-fade-in">
            {/* Hero */}
            <section className="bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full blur-3xl animate-bounce-slow" />

                <div className="relative max-w-4xl mx-auto px-4 md:px-8 py-20 md:py-28 text-center">
                    <span className="inline-block bg-white/15 backdrop-blur-sm text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                        🚀 Future of Agriculture
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5">
                        Modern Farming
                        <br />
                        <span className="text-cyan-200">Techniques</span>
                    </h1>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
                        Explore cutting-edge technologies that are transforming agriculture
                        — from precision farming to IoT-powered smart irrigation.
                    </p>
                </div>

                <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 80" fill="none">
                    <path d="M0 80h1440V30c-240 35-480 50-720 45S240 30 0 50v30z" fill="#f9fafb" />
                </svg>
            </section>

            {/* Cards Grid */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {techniques.map((tech) => (
                        <TechCard key={tech.title} tech={tech} />
                    ))}
                </div>
            </section>

            {/* YouTube Videos Section */}
            <section className="bg-gradient-to-b from-gray-50 to-white py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                            <FiPlay size={14} /> Video Resources
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                            Watch & <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Learn</span>
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto">
                            Curated videos on cutting-edge farming technologies to help you understand and adopt modern techniques.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {videos.map((video) => (
                            <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                                <div className="relative aspect-video w-full">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${video.id}`}
                                        title={video.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className={`inline-block w-8 h-1 rounded-full bg-gradient-to-r ${video.gradient} mb-2`} />
                                    <h3 className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                                        {video.title}
                                    </h3>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        {video.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default ModernFarming;
