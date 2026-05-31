import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar, { NavbarSpacer } from './components/Navbar';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import DiseaseDetection from './pages/DiseaseDetection';
import Result from './pages/Result';
import NaturalFarming from './pages/NaturalFarming';
import About from './pages/About';
import ModernFarming from './pages/ModernFarming';
import ChatbotPage from './pages/ChatbotPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import ContactExpert from './pages/ContactExpert';
import WeatherAlert from './pages/WeatherAlert';
import ProtectedRoute from './components/ProtectedRoute';

// Pages where Navbar, Chatbot & ContactExpert should be hidden
const AUTH_PATHS = ['/login', '/register', '/reset-password'];

function AppLayout() {
  const location = useLocation();
  const isAuthPage = AUTH_PATHS.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white font-sans">
      {!isAuthPage && <Navbar />}
      {!isAuthPage && <NavbarSpacer />}
      <main className={isAuthPage ? '' : 'container mx-auto px-4 py-8'}>
        <Routes>
          {/* Public auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* All other routes require login */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/detect" element={<DiseaseDetection />} />
            <Route path="/result" element={<Result />} />
            <Route path="/natural-farming" element={<NaturalFarming />} />
            <Route path="/modern-farming" element={<ModernFarming />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/weather-alert" element={<WeatherAlert />} />
          </Route>

          {/* Catch-all → login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
      {!isAuthPage && <Chatbot />}
      {!isAuthPage && <ContactExpert />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
