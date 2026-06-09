import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiMessageSquare, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast'; // Removed Toaster from import
import { contactFormFields } from '../../assets/dummydata';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', dish: '', query: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `
*New Query for Mealzy!* 🍽️
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Address:* ${formData.address}
*Favorite Dish:* ${formData.dish}
*Query:* ${formData.query}
    `;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '918299431275';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    // Trigger the toast notification
    toast.success('Opening WhatsApp...', {
      style: {
        border: '1px solid #e2e8f0',
        padding: '16px',
        color: '#0f172a',
        background: '#fff',
      },
      iconTheme: { primary: '#f43f5e', secondary: '#fff' },
    });

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setFormData({ name: '', phone: '', email: '', address: '', dish: '', query: '' });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Connect With Mealzy<span className="text-rose-500">.</span>
          </h1>
          <p className="text-lg text-slate-500">
            Have a craving or a question? We're just a message away.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left Column: Contact Information */}
          <div className="space-y-6">
            
            {/* Address Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-5 hover:shadow-md transition-shadow">
              <div className="p-3 bg-rose-50 text-rose-500 rounded-xl">
                <FiMapPin className="text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Our Headquarters</h3>
                <p className="text-slate-500">Janakpuri,Delhi</p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-5 hover:shadow-md transition-shadow">
              <div className="p-3 bg-rose-50 text-rose-500 rounded-xl">
                <FiPhone className="text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Contact Numbers</h3>
                <p className="text-slate-500">+91 88888888888</p>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-5 hover:shadow-md transition-shadow">
              <div className="p-3 bg-rose-50 text-rose-500 rounded-xl">
                <FiMail className="text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Email Addresses</h3>
                <p className="text-slate-500 break-words">mealzy@gmail.com</p>
              </div>
            </div>
            
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {contactFormFields.map(({ label, name, type, placeholder, pattern, Icon }) => (
                <div key={name}>
                  <label className="block text-slate-700 text-sm font-semibold mb-2">{label}</label>
                  <div className="relative">
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      pattern={pattern}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all placeholder-slate-400"
                      required
                    />
                  </div>
                </div>
              ))}

              {/* Textarea for Query */}
              <div>
                <label className="block text-slate-700 text-sm font-semibold mb-2">Your Query</label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-4 top-4 text-slate-400 text-lg" />
                  <textarea
                    rows="4"
                    name="query"
                    value={formData.query}
                    onChange={handleChange}
                    placeholder="Type your message here..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all placeholder-slate-400 resize-none"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Submit Query via WhatsApp</span>
                <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;