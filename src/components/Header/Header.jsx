import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { AuthModal } from '../../components/user/AuthModal'; // Import the AuthModal component

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false); // State to control AuthModal visibility
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register forms

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUsername(userData.name); // Set the username after successful login
    setShowAuthModal(false); // Close the modal
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('token'); // Clear the token from localStorage
    localStorage.removeItem('email'); // Clear the email from localStorage
    localStorage.removeItem('role'); // Clear the role from localStorage
  };

  return (
    <header className="w-full bg-yellow-500 text-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Mega City Cab</h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="/admin" className="hover:underline">
                Admin Dashboard
              </a>
            </li>
            <li>
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <FaUserCircle className="text-2xl" />
                  <span>{username}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-white hover:bg-gray-300 text-black font-bold py-1 px-2 rounded"
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Render the AuthModal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        onLoginSuccess={handleLoginSuccess} // Pass a callback for successful login
      />
    </header>
  );
}