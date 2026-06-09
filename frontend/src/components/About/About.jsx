import React from 'react';
import { FaXTwitter, FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa6';
import { features, stats, teamMembers } from '../../assets/dummydata';

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            About Mealzy<span className="text-rose-500">.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed">
            We are revolutionizing the way you experience food. Fast delivery, fresh ingredients, and gourmet quality—straight to your door.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="h-56 bg-slate-100 overflow-hidden relative">
                  <img 
                    src={feature.img} 
                    alt={feature.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-8 flex-grow">
                  <div className="mb-5 inline-flex items-center justify-center w-12 h-12 bg-rose-50 text-rose-500 rounded-xl">
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{feature.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 my-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="p-4">
                <div className="flex justify-center mb-4 text-rose-500">
                  <Icon className="text-4xl" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              The Minds Behind <span className="text-rose-500">Mealzy</span>
            </h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">
              Meet the dedicated professionals working behind the scenes to make every meal perfect.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="h-72 bg-slate-100 overflow-hidden">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow text-center">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-rose-500 font-medium mb-4">{member.role}</p>
                  <p className="text-slate-500 flex-grow mb-6 leading-relaxed">{member.bio}</p>
                  
                 
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;