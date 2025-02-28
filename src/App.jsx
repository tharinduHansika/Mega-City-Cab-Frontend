import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import { HeroSection } from './components/user/HeroSection'
import { AuthModal } from './components/user/AuthModal'

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthModalClose = () => setIsAuthModalOpen(false);
  const handleHeroSectionNextClick = () => setIsAuthModalOpen(true);

  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
  };

  
  const categories = [
    { id: "1", name: "Sedan", price: "25" },
    { id: "2", name: "SUV", price: "35" },
    { id: "3", name: "Luxury", price: "50" },
  ];

  return (
    <div className="w-screen bg-gray-100 items-start">
      {/* Header */}
      <Header />
      <HeroSection onNextClick={handleHeroSectionNextClick} />
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

