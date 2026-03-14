import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import DiseaseDetection from './pages/DiseaseDetection';
import Result from './pages/Result';
import NaturalFarming from './pages/NaturalFarming';
import About from './pages/About';
import ModernFarming from './pages/ModernFarming';
import ChatbotPage from './pages/ChatbotPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white font-sans">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detect" element={<DiseaseDetection />} />
            <Route path="/result" element={<Result />} />
            <Route path="/natural-farming" element={<NaturalFarming />} />
            <Route path="/modern-farming" element={<ModernFarming />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;