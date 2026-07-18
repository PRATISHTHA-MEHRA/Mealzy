import React, { useState } from 'react';
import { socialIcons } from '../../assets/dummydata';

/**
 * Mealzy — Footer
 * -----------------------------------------------------------------
 * Same system as the rest of the site. Dark surface is now the brand
 * forest green (#22332A, a darker step of #2F4A3C) instead of generic
 * slate-900, so the footer still reads as "Mealzy" and not as a
 * default Tailwind dark section. Logic unchanged.
 */

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
    <footer className="bg-[#22332A] text-[#B8C4BB] py-16 px-4 sm:px-8">
      <style>{`
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-body { font-family: 'Work Sans', system-ui, sans-serif; }
        .font-ticket { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand & Newsletter */}
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-bold text-[#F7F3E8] tracking-tight">
              Mealzy<span className="text-[#E7A73E]">.</span>
            </h2>
            <p className="font-body text-[#B8C4BB] max-w-sm leading-relaxed">
              Bringing your favorite local flavors straight to your door.
              Fast, fresh, and always delicious.
            </p>

            <span className="font-ticket block text-xs uppercase tracking-[0.2em] text-[#E7A73E] pt-2">
              Join the mailing list
            </span>
            <form onSubmit={handleSubmit} className="flex max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="font-body w-full px-4 py-3 bg-[#1A271F] text-[#F7F3E8] rounded-sm border border-[#F7F3E8]/15 focus:outline-none focus:border-[#E7A73E] focus:ring-1 focus:ring-[#E7A73E] transition-colors placeholder-[#B8C4BB]/50"
                required
              />
              <button
                type="submit"
                className="font-body px-6 py-3 bg-[#B84A32] hover:bg-[#9E3E29] text-[#F7F3E8] font-medium rounded-sm ml-2 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Navigation Links */}
          <div className="md:justify-self-center">
            <span className="font-ticket block text-xs uppercase tracking-[0.2em] text-[#E7A73E] mb-6">
              Quick links
            </span>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.link}
                    className="font-body hover:text-[#E7A73E] transition-colors font-medium"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="md:justify-self-end">
            <span className="font-ticket block text-xs uppercase tracking-[0.2em] text-[#E7A73E] mb-6">
              Connect with us
            </span>
            <div className="flex space-x-4">
              {socialIcons.map(({ icon: Icon, link }, idx) => (
                <a
                  key={idx}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#1A271F] rounded-full text-[#B8C4BB] hover:bg-[#B84A32] hover:text-[#F7F3E8] transition-all duration-300"
                  aria-label="Social Link"
                >
                  <Icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="font-ticket text-xs uppercase tracking-wide border-t border-[#F7F3E8]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Mealzy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;