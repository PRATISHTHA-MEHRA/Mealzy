// src/components/AddItems.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { FiUpload, FiHeart, FiStar } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';
import AdminNavbar from '../Navbar/Navbar';

/**
 * Mealzy — Admin: Add Item
 * -----------------------------------------------------------------
 * Same dark admin variant as AdminNavbar.jsx. No longer reads
 * `styles` from dummyadmin.js — all classes are inline below.
 * Form state, image upload, and the POST to /api/items are unchanged.
 */

const AddItems = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    rating: 0,
    hearts: 0,
    total: 0,
    image: null,
    preview: ''
  });
  const [categories] = useState([
    'Breakfast', 'Lunch', 'Dinner', 'Mexican', 'Italian', 'Desserts', 'Drinks'
  ]);
  const [hoverRating, setHoverRating] = useState(0);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file)
      }));
    }
  };

  const handleRating = rating =>
    setFormData(prev => ({ ...prev, rating }));

  const handleHearts = () =>
    setFormData(prev => ({ ...prev, hearts: prev.hearts + 1 }));

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (key === 'preview') return;
        payload.append(key, val);
      });
      const res = await axios.post(
        'http://localhost:4000/api/items',
        payload,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log('Created Item:', res.data);
      setFormData({
        name: '', description: '', category: '',
        price: '', rating: 0, hearts: 0,
        total: 0, image: null, preview: ''
      });
    } catch (err) {
      console.error('Error uploading item:', err.response || err.message);
    }
  };

  const inputField =
    'w-full px-4 py-3 bg-[#1A271F] border border-[#F7F3E8]/15 rounded-sm text-[#F7F3E8] placeholder-[#B8C4BB]/50 focus:outline-none focus:border-[#E7A73E] focus:ring-1 focus:ring-[#E7A73E] transition-colors font-body';

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-[#22332A] py-12 px-4 sm:px-6 lg:px-8">
        <style>{`
          .font-display { font-family: 'Fraunces', Georgia, serif; }
          .font-body { font-family: 'Work Sans', system-ui, sans-serif; }
          .font-ticket { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        `}</style>

        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1A271F]/60 border border-[#F7F3E8]/10 rounded-sm p-6 sm:p-10">
            <span className="font-ticket block text-xs uppercase tracking-[0.2em] text-[#B84A32] mb-2">
              Order No. 007 &mdash; New Item
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#F7F3E8] mb-8">
              Add new menu item
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Image Upload */}
              <label className="flex items-center justify-center h-48 sm:h-56 border-2 border-dashed border-[#F7F3E8]/20 rounded-sm cursor-pointer hover:border-[#E7A73E]/50 transition-colors overflow-hidden bg-[#22332A]/50">
                {formData.preview ? (
                  <img
                    src={formData.preview}
                    alt="Preview"
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <div className="text-center p-4">
                    <FiUpload className="text-3xl text-[#E7A73E] mx-auto mb-2" />
                    <p className="font-body text-[#B8C4BB] text-sm">
                      Click to upload product image
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  required
                />
              </label>

              <div className="space-y-6">
                <div>
                  <label className="font-ticket block mb-2 text-xs uppercase tracking-wide text-[#E7A73E]">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={inputField}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div>
                  <label className="font-ticket block mb-2 text-xs uppercase tracking-wide text-[#E7A73E]">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={inputField + ' h-32 sm:h-40 resize-none'}
                    placeholder="Enter product description"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-ticket block mb-2 text-xs uppercase tracking-wide text-[#E7A73E]">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={inputField}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(c => (
                        <option key={c} value={c} className="bg-[#1A271F]">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-ticket block mb-2 text-xs uppercase tracking-wide text-[#E7A73E]">
                      Price (&#8377;)
                    </label>
                    <div className="relative">
                      <FaRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8C4BB]" />
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className={inputField + ' pl-10'}
                        placeholder="Enter price"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-ticket block mb-2 text-xs uppercase tracking-wide text-[#E7A73E]">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="text-2xl sm:text-3xl transition-transform hover:scale-110"
                        >
                          <FiStar
                            className={
                              star <= (hoverRating || formData.rating)
                                ? 'text-[#E7A73E] fill-current'
                                : 'text-[#F7F3E8]/20'
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="font-ticket block mb-2 text-xs uppercase tracking-wide text-[#E7A73E]">
                      Popularity
                    </label>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <button
                        type="button"
                        onClick={handleHearts}
                        className="text-2xl sm:text-3xl text-[#B84A32] hover:text-[#9E3E29] transition-colors"
                      >
                        <FiHeart />
                      </button>
                      <input
                        type="number"
                        name="hearts"
                        value={formData.hearts}
                        onChange={handleInputChange}
                        className={inputField}
                        placeholder="Enter Likes"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="font-body w-full bg-[#B84A32] hover:bg-[#9E3E29] text-[#F7F3E8] font-semibold py-3.5 rounded-sm transition-colors"
                >
                  Add to Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItems;