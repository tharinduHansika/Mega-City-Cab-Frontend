import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { HeroSection } from './components/user/HeroSection'
import { AuthModal } from './components/user/AuthModal'
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthModalClose = () => setIsAuthModalOpen(false);
  const handleHeroSectionNextClick = () => setIsAuthModalOpen(true);

  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
  };

  
  // const categories = [
  //   { id: "1", name: "Sedan", price: "25" },
  //   { id: "2", name: "SUV", price: "35" },
  //   { id: "3", name: "Luxury", price: "50" },
  // ];

  return (
    <div className="w-screen bg-gray-100 items-start">
      {/* Header */}
      <Header />
      
      <Routes>
          <Route path="/" element={<HeroSection onNextClick={handleHeroSectionNextClick} />} />
          <Route path="/admin/*" element={<AdminDashboard/>} />
      </Routes>
      
      {/* <HeroSection onNextClick={handleHeroSectionNextClick} /> */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleAuthModalClose}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />

      <Footer />
    </div>
  );
}

export default App;

