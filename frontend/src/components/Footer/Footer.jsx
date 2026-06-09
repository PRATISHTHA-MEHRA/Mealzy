import React, { useState } from 'react';
import { socialIcons } from '../../assets/dummydata';

const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Menu', link: '/menu' },
  { name: 'About Us', link: '/about' },
  { name: 'Contact', link: '/contact' },
];

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for subscribing! We'll send updates to ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand & Newsletter */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Mealzy<span className="text-rose-500">.</span>
            </h2>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Bringing your favorite local flavors straight to your door. Fast, fresh, and always delicious.
            </p>
            
            <form onSubmit={handleSubmit} className="flex pt-4 max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full px-4 py-3 bg-slate-800 text-slate-100 rounded-l-xl border border-slate-700 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors placeholder-slate-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-r-xl transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Navigation Links */}
          <div className="md:justify-self-center">
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.link} 
                    className="hover:text-rose-400 transition-colors font-medium"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="md:justify-self-end">
            <h3 className="text-lg font-semibold text-white mb-6">Connect With Us</h3>
            <div className="flex space-x-5">
              {socialIcons.map(({ icon: Icon, link }, idx) => (
                <a
                  key={idx}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800 rounded-full text-slate-300 hover:bg-rose-500 hover:text-white transition-all duration-300"
                  aria-label="Social Link"
                >
                  <Icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>
          
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {new Date().getFullYear()} Mealzy. All rights reserved.</p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;