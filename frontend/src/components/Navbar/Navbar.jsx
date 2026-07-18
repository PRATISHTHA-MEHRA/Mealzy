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

/**
 * Mealzy — Navbar
 * -----------------------------------------------------------------
 * Same palette as About.jsx / Contact.jsx: forest green (#2F4A3C) as
 * the primary interactive color, brick (#B84A32) reserved for the
 * cart badge and the primary CTA, so it still pops against the green.
 * Logic (auth, cart count, login modal) is unchanged — only classes
 * moved off rose-*.
 */

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
    <nav className="bg-[#F7F3E8] border-b border-[#20261F]/10 sticky top-0 z-50">
      <style>{`
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-body { font-family: 'Work Sans', system-ui, sans-serif; }
        .font-ticket { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      `}</style>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo Section */}
          <NavLink to="/" className="flex-shrink-0 flex items-center gap-1 group">
            <h1 className="font-display text-3xl font-bold text-[#20261F] tracking-tight transition-transform group-hover:scale-105">
              Mealzy<span className="text-[#B84A32]">.</span>
            </h1>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `font-body px-4 py-2 flex items-center space-x-2 rounded-full font-medium transition-colors
                  ${isActive
                    ? 'bg-[#2F4A3C]/10 text-[#2F4A3C]'
                    : 'text-[#4A6154] hover:bg-[#2F4A3C]/5 hover:text-[#2F4A3C]'}`
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
              className="relative p-2 text-[#4A6154] hover:text-[#2F4A3C] transition-colors"
            >
              <FiShoppingCart className="text-2xl" />
              {totalItems > 0 && (
                <span className="font-ticket absolute top-0 right-0 bg-[#B84A32] text-[#F7F3E8] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#F7F3E8]">
                  {totalItems}
                </span>
              )}
            </NavLink>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="font-body px-5 py-2.5 bg-[#20261F]/5 hover:bg-[#20261F]/10 text-[#20261F] rounded-full font-semibold transition-colors flex items-center space-x-2"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="font-body px-5 py-2.5 bg-[#B84A32] hover:bg-[#9E3E29] text-[#F7F3E8] rounded-full font-semibold transition-colors flex items-center space-x-2"
              >
                <FiUser />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-4">
            <NavLink to="/cart" className="relative p-2 text-[#4A6154]">
              <FiShoppingCart className="text-2xl" />
              {totalItems > 0 && (
                <span className="font-ticket absolute top-0 right-0 bg-[#B84A32] text-[#F7F3E8] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#F7F3E8]">
                  {totalItems}
                </span>
              )}
            </NavLink>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#4A6154] hover:text-[#2F4A3C] p-2 focus:outline-none"
            >
              {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#F7F3E8] border-t border-[#20261F]/10 shadow-lg absolute w-full">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `font-body flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors
                  ${isActive ? 'bg-[#2F4A3C]/10 text-[#2F4A3C]' : 'text-[#4A6154] hover:bg-[#20261F]/5'}`
                }
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.name}</span>
              </NavLink>
            ))}

            <div className="pt-4 mt-2 border-t border-[#20261F]/10">
              {isAuthenticated ? (
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="font-body w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#20261F]/5 text-[#20261F] rounded-xl font-semibold"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              ) : (
                <button
                  onClick={() => { navigate('/login'); setIsOpen(false); }}
                  className="font-body w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#B84A32] text-[#F7F3E8] rounded-xl font-semibold"
                >
                  <FiUser />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-[#20261F]/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#F7F3E8] rounded-sm p-6 w-full max-w-md relative shadow-2xl border border-[#20261F]/10">
            <button
              onClick={() => navigate('/')}
              className="absolute top-4 right-4 text-[#4A6154] hover:text-[#20261F] text-2xl transition-colors"
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