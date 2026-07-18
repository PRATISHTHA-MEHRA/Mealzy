import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

/**
 * Mealzy — Homepage banner
 * -----------------------------------------------------------------
 * Same system as About / Contact / Navbar. The stock Unsplash photo
 * is gone — replaced with a self-contained "order slip" visual built
 * from HTML/CSS, so it can't clash or go stale/broken like a hotlinked
 * image, and it reinforces the ticket motif instead of looking like
 * generic delivery-app stock photography.
 */

const SimpleBanner = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="bg-[#F7F3E8] py-16 px-4 sm:px-8">
      <style>{`
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-body { font-family: 'Work Sans', system-ui, sans-serif; }
        .font-ticket { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        .dotted-leader {
          border-bottom: 2px dotted #20261F33;
          flex: 1;
          margin: 0 10px;
          height: 0;
        }
      `}</style>

      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">

        {/* Left Content */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <span className="font-ticket inline-block text-xs uppercase tracking-[0.2em] text-[#B84A32]">
            Mealzy Kitchen &mdash; Open Now
          </span>

          <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-[#20261F] leading-[1.05]">
            Fast &amp; fresh,<br />
            <span className="text-[#2F4A3C]">straight from the kitchen.</span>
          </h1>

          <p className="font-body text-lg text-[#4A6154] max-w-xl mx-auto md:mx-0 leading-relaxed">
            Discover the best local kitchens near you. Hot, honest food,
            delivered to your door in under 60 minutes.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto md:mx-0 pt-4">
            <div className="flex items-center bg-white rounded-sm border border-[#20261F]/15 overflow-hidden p-1 focus-within:border-[#2F4A3C] focus-within:ring-2 focus-within:ring-[#2F4A3C]/15 transition-all">
              <div className="pl-4 pr-2">
                <FaSearch className="text-[#4A6154]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What are you craving?"
                className="font-body w-full py-3 px-2 outline-none text-[#20261F] bg-transparent placeholder-[#4A6154]/60"
              />
              <button
                type="submit"
                className="font-body px-6 py-3 bg-[#B84A32] hover:bg-[#9E3E29] text-[#F7F3E8] font-medium rounded-sm transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Simple Action Links */}
          <div className="flex gap-4 justify-center md:justify-start pt-2">
            <button className="font-body px-2 py-3 text-[#4A6154] font-medium hover:text-[#2F4A3C] transition-colors">
              Download the app &rarr;
            </button>
          </div>
        </div>

        {/* Right — order slip visual (no stock photo) */}
        <div className="flex-1 w-full max-w-md mx-auto">
          <div className="bg-white rounded-sm border border-[#20261F]/10 shadow-sm p-8 rotate-[-1.5deg]">
            <div className="flex items-center justify-between font-ticket text-xs uppercase tracking-[0.15em] text-[#4A6154] mb-6">
              <span>Mealzy</span>
              <span>No. 4471</span>
            </div>

            <div className="space-y-4 mb-6">
              {[
                ['1x', 'Butter Chicken Bowl', '\u20b9260'],
                ['2x', 'Garlic Naan', '\u20b980'],
                ['1x', 'Cold Coffee', '\u20b9110'],
              ].map(([qty, item, price]) => (
                <div key={item} className="flex items-baseline">
                  <span className="font-ticket text-xs text-[#B84A32] w-6 shrink-0">{qty}</span>
                  <span className="font-body text-sm text-[#20261F] whitespace-nowrap">{item}</span>
                  <span className="dotted-leader" />
                  <span className="font-ticket text-sm text-[#20261F]">{price}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-[#20261F]/20 pt-4 flex items-baseline justify-between">
              <span className="font-ticket text-xs uppercase tracking-[0.15em] text-[#4A6154]">
                Arriving in
              </span>
              <span className="font-display font-bold text-2xl text-[#2F4A3C]">28 min</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SimpleBanner;