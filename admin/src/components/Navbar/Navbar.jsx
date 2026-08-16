// src/components/AdminNavbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiPlusSquare, FiList, FiClipboard } from 'react-icons/fi';
import { GiChefToque } from 'react-icons/gi';

/**
 * Mealzy — Admin Navbar
 * -----------------------------------------------------------------
 * Admin panel uses a dark "back of house" variant of the same
 * kitchen-ticket system used on the customer-facing pages (same
 * forest/saffron/brick palette and fonts, just inverted — dark
 * surface, ivory text) so it still feels like Mealzy, not a
 * generic admin dashboard template.
 *
 * This no longer reads `styles` / `navLinks` from dummyadmin.js —
 * everything needed is self-contained here. Paths match this app's
 * own router (App.js): "/" = Add Item, "/list" = Manage Menu,
 * "/orders" = Orders.
 */

const navLinks = [
  { name: 'Add Item', href: '/', icon: <FiPlusSquare /> },
  { name: 'Manage Menu', href: '/list', icon: <FiList /> },
  { name: 'Orders', href: '/orders', icon: <FiClipboard /> },
];

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#22332A] border-b border-[#F7F3E8]/10 sticky top-0 z-50">
      <style>{`
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-body { font-family: 'Work Sans', system-ui, sans-serif; }
        .font-ticket { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-18 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <GiChefToque className="text-2xl text-[#E7A73E]" />
          <span className="font-ticket text-xs uppercase tracking-[0.2em] text-[#F7F3E8]">
            Mealzy &mdash; Admin Panel
          </span>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-[#F7F3E8] p-2 text-xl"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `font-body flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#E7A73E]/15 text-[#E7A73E]'
                    : 'text-[#B8C4BB] hover:bg-[#F7F3E8]/5 hover:text-[#F7F3E8]'
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-1 border-t border-[#F7F3E8]/10 pt-3">
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `font-body flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#E7A73E]/15 text-[#E7A73E]'
                    : 'text-[#B8C4BB] hover:bg-[#F7F3E8]/5'
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;