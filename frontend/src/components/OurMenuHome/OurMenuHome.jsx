import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../../CartContext/CartContext';
import { FaMinus, FaPlus } from 'react-icons/fa';

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Mexican', 'Italian', 'Desserts', 'Drinks'];

const OurMenuHome = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [menuData, setMenuData] = useState({});
  const { cartItems: rawCart, addToCart, updateQuantity, removeFromCart } = useCart();

  const cartItems = rawCart.filter(ci => ci.item);

  useEffect(() => {
    axios.get('http://localhost:4000/api/items')
      .then(res => {
        const grouped = res.data.reduce((acc, item) => {
          acc[item.category] = acc[item.category] || [];
          acc[item.category].push(item);
          return acc;
        }, {});
        setMenuData(grouped);
      })
      .catch(console.error);
  }, []);

  // Find cart entry by product ID
  const getCartEntry = id => cartItems.find(ci => ci.item?._id === id);
  const getQuantity = id => getCartEntry(id)?.quantity ?? 0;
  
  // Only display 4 items for the homepage preview
  const displayItems = (menuData[activeCategory] || []).slice(0, 4);

  return (
    <div className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Popular Right Now<span className="text-rose-500">.</span>
          </h2>
          <p className="text-slate-500 mt-2">
            A quick taste of our most loved dishes.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-rose-500 hover:text-rose-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid Preview (4 items max) */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {displayItems.map((item) => {
            const qty = getQuantity(item._id);
            const cartEntry = getCartEntry(item._id);

            return (
              <div
                key={item._id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Image */}
                <div className="h-48 bg-slate-50 flex items-center justify-center p-4">
                  <img
                    src={item.imageUrl || item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain drop-shadow-sm"
                  />
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Price & Cart Controls */}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-slate-900">
                      ₹{Number(item.price).toFixed(2)}
                    </span>

                    <div>
                      {qty > 0 ? (
                        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-2 py-1">
                          <button
                            onClick={() =>
                              qty > 1
                                ? updateQuantity(cartEntry?._id, qty - 1)
                                : removeFromCart(cartEntry._id)
                            }
                            className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:text-rose-500 hover:border-rose-500 transition-colors"
                          >
                            <FaMinus className="text-xs" />
                          </button>
                          <span className="w-4 text-center font-medium text-slate-700">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQuantity(cartEntry._id, qty + 1)}
                            className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:text-rose-500 hover:border-rose-500 transition-colors"
                          >
                            <FaPlus className="text-xs" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="bg-rose-50 px-4 py-2 rounded-full text-rose-600 font-medium text-sm hover:bg-rose-500 hover:text-white transition-colors"
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

        {/* Explore Full Menu Button */}
        <div className="flex justify-center">
          <Link
            to="/menu"
            className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-700 font-medium rounded-full hover:border-rose-500 hover:text-rose-500 transition-colors"
          >
            Explore Full Menu
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default OurMenuHome;