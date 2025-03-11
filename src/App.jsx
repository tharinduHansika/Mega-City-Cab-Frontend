import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { HeroSection } from './components/user/HeroSection'
import { AuthModal } from './components/user/AuthModal'
import AdminDashboard from './pages/AdminDashboard';
import 'antd/dist/reset.css'; 


function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthModalClose = () => setIsAuthModalOpen(false);
  const handleHeroSectionNextClick = () => setIsAuthModalOpen(true);

  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
  };

  // Get the current location using useLocation hook
  const location = useLocation();

  return (
    <div className="w-screen bg-gray-100 items-start">
      {/* Header */}
      <Header />
      
      <Routes>
          <Route path="/" element={<HeroSection onNextClick={handleHeroSectionNextClick} />} />
          <Route path="/admin/*" element={<AdminDashboard/>} />
      </Routes>
      
      {/* Conditionally render Footer based on the route */}
      {location.pathname === '/' && <Footer />}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleAuthModalClose}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
    </div>
  );
}

export default App;