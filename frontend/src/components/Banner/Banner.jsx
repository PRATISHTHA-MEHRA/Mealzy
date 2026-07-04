import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SimpleBanner = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="bg-slate-50 py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        
        {/* Left Content */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
            Fast & Fresh <br />
            <span className="text-rose-500">Food Delivery</span>
          </h1>

          <p className="text-lg text-slate-600 max-w-xl mx-auto md:mx-0">
            Discover the best local restaurants. Hot, tasty food delivered right to your door in under 60 minutes.
          </p>

          {/*Search Bar */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto md:mx-0 pt-4">
            <div className="flex items-center bg-white rounded-full border border-slate-200 shadow-sm overflow-hidden p-1 focus-within:ring-2 focus-within:ring-rose-200 focus-within:border-rose-400 transition-all">
              <div className="pl-4 pr-2">
                <FaSearch className="text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What are you craving?"
                className="w-full py-3 px-2 outline-none text-slate-700 bg-transparent placeholder-slate-400"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-full transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Simple Action Links */}
          <div className="flex gap-4 justify-center md:justify-start pt-2">
            <button className="px-2 py-3 text-slate-500 font-medium hover:text-rose-500 transition-colors">
              Download the App &rarr;
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 w-full max-w-md mx-auto">
          {/* Replace this URL with your actual bannerImage prop if preferred */}
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800"
            alt="Delicious food spread"
            className="w-full h-auto object-cover rounded-3xl shadow-xl border-4 border-white"
          />
        </div>

      </div>
    </div>
  );
};

export default SimpleBanner;