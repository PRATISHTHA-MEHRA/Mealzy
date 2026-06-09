import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiBook,
  FiStar,
  FiPhone,
  FiShoppingCart,
  FiLogOut,
  FiUser,
  FiPackage,
  FiMenu,
  FiX
} from 'react-icons/fi';
import Login from '../Login/Login';
import { useCart } from '../../CartContext/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('loginData'))
  );
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Show modal if the route is /login, otherwise hide it
    setShowLoginModal(location.pathname === '/login');
    setIsAuthenticated(Boolean(localStorage.getItem('loginData')));
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/', icon: <FiHome /> },
    { name: 'Menu', href: '/menu', icon: <FiBook /> },
    { name: 'About', href: '/about', icon: <FiStar /> },
    { name: 'Contact', href: '/contact', icon: <FiPhone /> },
    ...(isAuthenticated ? [{ name: 'My Orders', href: '/myorder', icon: <FiPackage /> }] : [])
  ];

  const handleLoginSuccess = () => {
    localStorage.setItem('loginData', JSON.stringify({ loggedIn: true }));
    setIsAuthenticated(true);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setIsAuthenticated(false);
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <NavLink to="/" className="flex-shrink-0 flex items-center gap-1 group">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight transition-transform group-hover:scale-105">
              Mealzy<span className="text-rose-500">.</span>
            </h1>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `px-4 py-2 flex items-center space-x-2 rounded-full font-medium transition-colors
                  ${isActive 
                    ? 'bg-rose-50 text-rose-600' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-rose-500'}`
                }
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Desktop Actions (Cart + Auth) */}
          <div className="hidden lg:flex items-center space-x-6">
            <NavLink
              to="/cart"
              className="relative p-2 text-slate-600 hover:text-rose-500 transition-colors"
            >
              <FiShoppingCart className="text-2xl" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </NavLink>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-semibold transition-colors flex items-center space-x-2"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-semibold transition-colors shadow-sm flex items-center space-x-2"
              >
                <FiUser />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-4">
            <NavLink to="/cart" className="relative p-2 text-slate-600">
              <FiShoppingCart className="text-2xl" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </NavLink>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-rose-500 p-2 focus:outline-none"
            >
              {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg absolute w-full">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors
                  ${isActive ? 'bg-rose-50 text-rose-600' : 'text-slate-600 hover:bg-slate-50'}`
                }
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.name}</span>
              </NavLink>
            ))}
            
            <div className="pt-4 mt-2 border-t border-slate-100">
              {isAuthenticated ? (
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              ) : (
                <button
                  onClick={() => { navigate('/login'); setIsOpen(false); }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-rose-500 text-white rounded-xl font-semibold"
                >
                  <FiUser />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Simplified Clean Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md relative shadow-2xl">
            <button
              onClick={() => navigate('/')}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl transition-colors"
            >
              &times;
            </button>
            <Login onLoginSuccess={handleLoginSuccess} onClose={() => navigate('/')} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;