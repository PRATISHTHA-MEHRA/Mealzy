import React from 'react';
import { Link } from 'react-router-dom';
import { aboutfeature } from '../../assets/dummydata';

/**
 * Mealzy — Homepage "About" teaser
 * -----------------------------------------------------------------
 * Same kitchen-ticket system as About.jsx / Contact.jsx / Navbar.jsx /
 * SimpleBanner.jsx. Everything that lived in abouthome.css (fonts,
 * glow/3d shadows) is gone — this section only needed the shared
 * Fraunces / Work Sans / IBM Plex Mono trio, added inline below, so
 * you can delete abouthome.css entirely.
 */

const AboutHome = () => {
  return (
    <section className="bg-[#F7F3E8] py-16 px-4">
      <style>{`
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-body { font-family: 'Work Sans', system-ui, sans-serif; }
        .font-ticket { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      `}</style>

      <div className="max-w-4xl mx-auto text-center">

        {/* Header */}
        <span className="font-ticket inline-block text-xs uppercase tracking-[0.2em] text-[#B84A32] mb-4">
          Mealzy Kitchen &mdash; Order No. 003
        </span>
        <h2 className="font-display font-black text-3xl md:text-4xl text-[#20261F] mb-4 leading-tight">
          Redefining food delivery with{' '}
          <span className="text-[#2F4A3C]">Mealzy.</span>
        </h2>
        <p className="font-body text-lg text-[#4A6154] mb-12 leading-relaxed max-w-2xl mx-auto">
          Experience the authentic taste of your favorite Indian dishes
          without the wait. We connect you with top-rated local chefs
          and kitchens for a premium dining experience right at home.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left mb-12">
          {aboutfeature.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex items-start gap-4 p-6 bg-white rounded-sm border border-[#20261F]/10 transition-colors duration-300 hover:border-[#2F4A3C]/40"
              >
                <div className="text-2xl mt-1 text-[#2F4A3C] transition-transform duration-300 group-hover:scale-110">
                  <Icon />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#20261F]">
                    {item.title}
                  </h3>
                  <p className="font-body text-[#4A6154] mt-1 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <Link
          to="/about"
          className="font-body inline-block bg-[#B84A32] text-[#F7F3E8] font-semibold px-8 py-3.5 rounded-sm transition-all duration-300 hover:bg-[#9E3E29] hover:-translate-y-0.5 active:scale-95"
        >
          Learn more about us
        </Link>

      </div>
    </section>
  );
};

export default AboutHome;