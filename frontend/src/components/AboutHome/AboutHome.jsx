import React from 'react';
import { Link } from 'react-router-dom';
import { aboutfeature } from '../../assets/dummydata';

const AboutHome = () => {
  return (
    <section className="bg-slate-50 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 transition-colors duration-300 hover:text-rose-500 cursor-default">
          Redefining food delivery with <span className="text-rose-500">Mealzy.</span>
        </h2>
        <p className="text-lg text-slate-600 mb-12">
          Experience the authentic taste of your favorite Indian dishes without the wait. 
          We connect you with top-rated local chefs and restaurants for a premium dining 
          experience right at home.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left mb-12">
          {aboutfeature.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="group flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-rose-200 cursor-pointer"
              >
                <div className="text-3xl mt-1 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon className={item.color} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-rose-500">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 mt-1">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <Link 
          to="/about" 
          className="inline-block bg-rose-500 text-white font-medium px-8 py-3.5 rounded-full transition-all duration-300 hover:bg-rose-600 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
        >
          Learn More About Us
        </Link>
        
      </div>
    </section>
  );
};

export default AboutHome;