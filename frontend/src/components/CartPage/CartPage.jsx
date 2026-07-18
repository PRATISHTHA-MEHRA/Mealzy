import React, { useState } from 'react';
import { useCart } from '../../CartContext/CartContext';
import { Link } from 'react-router-dom';
import { FaMinus, FaPlus, FaTrash, FaTimes } from 'react-icons/fa';

// Base URL for serving uploaded images
const API_URL = 'http://localhost:4000';

/**
 * Mealzy — Cart page
 * -----------------------------------------------------------------
 * Same system as Menu/About/Contact/Navbar/Footer. Cards restyled as
 * ticket stubs matching OurMenu.jsx so a product looks the same
 * whether it's on the menu grid or in the cart. Logic (quantity
 * controls, removeFromCart, image modal, totals) is unchanged.
 */

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();
  const [selectedImage, setSelectedImage] = useState(null);

  const buildImageUrl = (path) => {
    if (!path) return '';
    return path.startsWith('http')
      ? path
      : `${API_URL}/uploads/${path.replace(/^\/uploads\//, '')}`;
  };

  return (
    <div className="min-h-screen bg-[#F7F3E8] py-16 px-4 sm:px-6 lg:px-8">
      <style>{`
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-body { font-family: 'Work Sans', system-ui, sans-serif; }
        .font-ticket { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      `}</style>

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-ticket inline-block text-xs uppercase tracking-[0.2em] text-[#B84A32] mb-3">
            Order No. 005
          </span>
          <h1 className="font-display font-black text-4xl md:text-5xl text-[#20261F] tracking-tight">
            Your cart<span className="text-[#2F4A3C]">.</span>
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center bg-white rounded-sm p-12 border border-[#20261F]/10">
            <p className="font-body text-[#4A6154] text-xl mb-6 font-medium">
              Your cart is currently empty.
            </p>
            <Link
              to="/menu"
              className="font-body inline-flex items-center px-8 py-3 bg-[#B84A32] hover:bg-[#9E3E29] text-[#F7F3E8] font-medium rounded-full transition-colors"
            >
              Browse our menu
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {cartItems
                .filter(ci => ci.item)
                .map(({ _id, item, quantity }) => (
                  <div
                    key={_id}
                    className="bg-white p-5 rounded-sm border border-[#20261F]/10 hover:border-[#2F4A3C]/40 transition-colors flex flex-col items-center gap-4 group"
                  >
                    {/* Image */}
                    <div
                      className="w-32 h-32 flex-shrink-0 cursor-pointer relative overflow-hidden rounded-sm bg-[#F7F3E8] p-2"
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
                      <h3 className="font-display font-bold text-lg text-[#20261F]">
                        {item.name}
                      </h3>
                      <p className="font-ticket text-[#4A6154] mt-1">
                        &#8377;{Number(item.price).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-[#F7F3E8] border border-[#20261F]/10 rounded-full px-2 py-1">
                      <button
                        onClick={() => updateQuantity(_id, Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-full bg-white border border-[#20261F]/10 flex items-center justify-center hover:text-[#2F4A3C] hover:border-[#2F4A3C] transition-colors"
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="font-ticket w-6 text-center font-bold text-[#20261F]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(_id, quantity + 1)}
                        className="w-8 h-8 rounded-full bg-white border border-[#20261F]/10 flex items-center justify-center hover:text-[#2F4A3C] hover:border-[#2F4A3C] transition-colors"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>

                    {/* Remove & Subtotal */}
                    <div className="flex items-center justify-between w-full mt-2 pt-4 border-t border-dashed border-[#20261F]/15">
                      <button
                        onClick={() => removeFromCart(_id)}
                        className="font-body text-[#4A6154] hover:text-[#B84A32] flex items-center gap-1.5 text-sm font-semibold transition-colors"
                      >
                        <FaTrash className="text-xs" />
                        Remove
                      </button>
                      <p className="font-ticket font-bold text-[#20261F]">
                        &#8377;{(Number(item.price) * quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Total & Checkout Section */}
            <div className="mt-12 pt-8 border-t border-[#20261F]/10">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6 bg-white p-6 rounded-sm border border-[#20261F]/10">

                <Link
                  to="/menu"
                  className="font-body px-8 py-3 bg-[#F7F3E8] border border-[#20261F]/15 text-[#20261F] font-medium rounded-full hover:border-[#2F4A3C] hover:text-[#2F4A3C] transition-colors w-full sm:w-auto text-center"
                >
                  Continue shopping
                </Link>

                <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                  <h2 className="font-display font-bold text-2xl text-[#20261F]">
                    Total:{' '}
                    <span className="font-ticket text-[#B84A32]">
                      &#8377;{totalAmount.toFixed(2)}
                    </span>
                  </h2>
                  <Link
                    to="/checkout"
                    className="font-body px-8 py-3 bg-[#B84A32] hover:bg-[#9E3E29] text-[#F7F3E8] font-semibold rounded-full transition-colors w-full sm:w-auto text-center"
                  >
                    Checkout now
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#20261F]/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-full max-h-full bg-white p-2 rounded-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Full view"
              className="max-w-[90vw] max-h-[80vh] rounded-sm object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 bg-white border border-[#20261F]/10 rounded-full p-2 text-[#4A6154] hover:text-[#B84A32] hover:border-[#B84A32] shadow-lg transition-colors"
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