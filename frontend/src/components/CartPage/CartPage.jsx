import React, { useState } from 'react';
import { useCart } from '../../CartContext/CartContext';
import { Link } from 'react-router-dom';
import { FaMinus, FaPlus, FaTrash, FaTimes } from 'react-icons/fa';

// Base URL for serving uploaded images
const API_URL = 'http://localhost:4000';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();
  const [selectedImage, setSelectedImage] = useState(null);

  // Helper to construct full image URL
  const buildImageUrl = (path) => {
    if (!path) return '';
    return path.startsWith('http')
      ? path
      : `${API_URL}/uploads/${path.replace(/^\/uploads\//, '')}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-2">
            Your Cart<span className="text-rose-500">.</span>
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center bg-white rounded-3xl p-12 border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-xl mb-6 font-medium">Your cart is currently empty.</p>
            <Link
              to="/menu"
              className="inline-flex items-center px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-full transition-colors shadow-sm hover:shadow-md"
            >
              Browse Our Menu
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cartItems
                .filter(ci => ci.item)
                .map(({ _id, item, quantity }) => (
                  <div
                    key={_id}
                    className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-4 group"
                  >
                    {/* Image */}
                    <div
                      className="w-32 h-32 flex-shrink-0 cursor-pointer relative overflow-hidden rounded-xl bg-slate-50 p-2 transition-transform duration-300 group-hover:scale-105"
                      onClick={() => setSelectedImage(buildImageUrl(item.imageUrl || item.image))}
                    >
                      <img
                        src={buildImageUrl(item?.imageUrl || item?.image)}
                        alt={item?.name || 'Item'}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Title & Price */}
                    <div className="w-full text-center">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-500 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-slate-500 font-medium mt-1">
                        ₹{Number(item.price).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-2 py-1">
                      <button
                        onClick={() => updateQuantity(_id, Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:text-rose-500 hover:border-rose-500 transition-colors shadow-sm"
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="w-6 text-center font-bold text-slate-700">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(_id, quantity + 1)}
                        className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:text-rose-500 hover:border-rose-500 transition-colors shadow-sm"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>

                    {/* Remove & Subtotal */}
                    <div className="flex items-center justify-between w-full mt-2 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => removeFromCart(_id)}
                        className="text-slate-400 hover:text-rose-500 flex items-center gap-1.5 text-sm font-semibold transition-colors"
                      >
                        <FaTrash className="text-xs" />
                        Remove
                      </button>
                      <p className="font-bold text-slate-900">
                        ₹{(Number(item.price) * quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Total & Checkout Section */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                
                <Link
                  to="/menu"
                  className="px-8 py-3 bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-full hover:border-rose-500 hover:text-rose-500 transition-colors w-full sm:w-auto text-center"
                >
                  Continue Shopping
                </Link>
                
                <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Total: <span className="text-rose-500">₹{totalAmount.toFixed(2)}</span>
                  </h2>
                  <Link
                    to="/checkout"
                    className="px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-full transition-colors shadow-sm hover:shadow-md w-full sm:w-auto text-center"
                  >
                    Checkout Now
                  </Link>
                </div>

              </div>
            </div>
          </>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-full max-h-full bg-white p-2 rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Full view"
              className="max-w-[90vw] max-h-[80vh] rounded-xl object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 bg-white border border-slate-200 rounded-full p-2 text-slate-500 hover:text-rose-500 hover:border-rose-500 shadow-lg transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;