import React, { useState, useEffect } from 'react';
import { FaStar, FaHeart } from 'react-icons/fa';
import { HiMinus, HiPlus } from 'react-icons/hi'; 
import { HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi2'; 
import { useCart } from '../../CartContext/CartContext';

import { cardData, additionalData } from '../../assets/dummydata';

const SpecialOffer = () => {
  const [showAll, setShowAll] = useState(false);
  const [items, setItems] = useState([]);
  const { addToCart, updateQuantity, removeFromCart, cartItems: rawCart } = useCart();


  const cartItems = rawCart.filter(ci => ci.item);

  // Load and normalize dummy data
  useEffect(() => {
    const localItems = [...cardData, ...additionalData];

    const normalizedItems = localItems.map(item => {
      // Clean price string (e.g., "₹240" -> 240)
      const cleanPrice = typeof item.price === 'string' 
        ? Number(item.price.replace('₹', '')) 
        : item.price;

      return {
        _id: item.id.toString(), // Match database ID format string
        name: item.title,
        description: item.description,
        price: cleanPrice,
        image: item.image,
        rating: item.rating,
        hearts: item.hearts
      };
    });

    setItems(normalizedItems);
  }, []);

  const displayList = Array.isArray(items) ? items.slice(0, showAll ? 8 : 4) : [];

  return (
    <section className="bg-slate-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            Today's <span className="text-rose-500">Special</span> Offers
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Savor the extraordinary with our culinary masterpieces crafted to perfection.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {displayList.map((item) => {
            const cartItem = cartItems.find(ci => ci.item?._id === item._id);
            const qty = cartItem?.quantity ?? 0;
            const cartId = cartItem?._id;

            return (
              <div
                key={item._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Image Container with Absolute Badges */}
                <div className="relative h-48 bg-slate-50 flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Rating & Likes Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {item.rating && (
                      <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                        <FaStar className="text-yellow-400 text-xs" /> {item.rating}
                      </span>
                    )}
                    {item.hearts && (
                      <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                        <FaHeart className="text-rose-400 text-xs" /> {item.hearts}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content & Cart Controls */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-rose-500 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-slate-500 text-sm mb-5 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-slate-900">
                      ₹{item.price.toFixed(2)}
                    </span>

                    <div>
                      {qty > 0 ? (
                        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-2 py-1">
                          <button
                            onClick={() =>
                              qty > 1
                                ? updateQuantity(cartId, qty - 1)
                                : removeFromCart(cartId)
                            }
                            className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:text-rose-500 hover:border-rose-500 transition-colors shadow-sm"
                          >
                            <span className="text-sm font-bold">-</span>
                          </button>
                          <span className="w-4 text-center font-medium text-slate-700">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQuantity(cartId, qty + 1)}
                            className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:text-rose-500 hover:border-rose-500 transition-colors shadow-sm"
                          >
                            <span className="text-sm font-bold">+</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="bg-rose-50 px-5 py-2 rounded-full text-rose-600 font-medium text-sm hover:bg-rose-500 hover:text-white transition-colors"
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More / Show Less Button */}
        {items.length > 4 && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-700 font-medium rounded-full hover:border-rose-500 hover:text-rose-500 transition-colors shadow-sm hover:shadow-md"
            >
              {showAll ? 'Show Less' : 'View All Offers'}
            </button>
          </div>
        )}
        
      </div>
    </section>
  );
};

export default SpecialOffer;