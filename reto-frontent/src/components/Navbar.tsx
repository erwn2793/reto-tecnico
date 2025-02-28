import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, ShoppingBag, User } from 'lucide-react';

interface NavbarProps {
  title?: string;
}

const Navbar: React.FC<NavbarProps> = ({ title = 'Gourmet Reserve' }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center space-x-2">
          <ShoppingBag className="w-6 h-6 text-orange-500" />
          <span>{title}</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          {currentUser ? (
            <>
              <Link 
                to="/dashboard" 
                className="hover:text-orange-400 transition-colors flex items-center space-x-1"
              >
                <User className="w-5 h-5" />
                <span>{currentUser.name || 'Dashboard'}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-orange-400 transition-colors flex items-center space-x-1"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="hover:text-orange-400 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-orange-600 px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;