import { Link } from 'react-router-dom';
import { FaLeaf, FaGithub, FaEnvelope } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-emerald-400 rounded-xl flex items-center justify-center">
                                <FaLeaf className="text-white text-sm" />
                            </div>
                            <span className="text-lg font-bold text-white">Smart Krishi</span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-400">
                            An AI-powered platform helping farmers detect crop diseases and get instant
                            treatment recommendations using advanced machine learning technology.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Disease Detection', path: '/detect' },
                                { name: 'Natural Farming', path: '/natural-farming' },
                                { name: 'About', path: '/about' },
                            ].map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="hover:text-primary-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <FaEnvelope className="text-primary-400" />
                                <span>smartkrishi@example.com</span>
                            </li>
                            <li>
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 hover:text-primary-400 transition-colors"
                                >
                                    <FaGithub className="text-primary-400" />
                                    <span>GitHub Repository</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} Smart Krishi. Built with ❤️ for farmers.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
