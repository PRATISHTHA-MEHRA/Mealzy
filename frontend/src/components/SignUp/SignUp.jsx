// frontend/src/components/SignUp.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';

const url = 'http://localhost:4000';

const SignUp = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  
  // Simplified state for handling both success and error messages
  const [message, setMessage] = useState({ text: '', type: '' }); 
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' }); // Clear previous messages

    try {
      const res = await axios.post(`${url}/api/user/register`, formData);

      if (res.data.success && res.data.token) {
        localStorage.setItem('authToken', res.data.token);
        
        // Show success message and redirect after a short delay
        setMessage({ text: 'Sign up successful! Redirecting...', type: 'success' });
        setTimeout(() => navigate('/login'), 1500);
        return;
      }

      throw new Error(res.data.message || 'Registration failed.');
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Registration failed.';
      setMessage({ text: errMsg, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
          <p className="text-slate-500">Join us to order fast & fresh food.</p>
        </div>

        {/* Clean, inline feedback message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg text-sm font-medium border ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border-green-200' 
              : 'bg-red-50 text-red-700 border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
              required
            />
          </div>
          
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-rose-500 transition-colors"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl transition-colors shadow-md hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-slate-500 hover:text-rose-500 font-medium transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Login
          </Link>
        </div>
        
      </div>
    </div>
  );
}

export default SignUp;