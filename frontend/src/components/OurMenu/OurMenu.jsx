import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../../CartContext/CartContext';
import { FaMinus, FaPlus } from 'react-icons/fa';

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Mexican', 'Italian', 'Desserts', 'Drinks'];

const OurMenu = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [menuData, setMenuData] = useState({});
  const { cartItems: rawCart, addToCart, updateQuantity, removeFromCart } = useCart();

  const cartItems = rawCart.filter(ci => ci.item);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/items');
        const byCategory = res.data.reduce((acc, item) => {
          const cat = item.category || 'Uncategorized';
          acc[cat] = acc[cat] || [];
          acc[cat].push(item);
          return acc;
        }, {});
        setMenuData(byCategory);
      } catch (err) {
        console.error('Failed to load menu items:', err);
      }
    };
    fetchMenu();
  }, []);

  // helper: find cart entry by product ID
  const getCartEntry = id => cartItems.find(ci => ci.item?._id === id);

  // items to display in active category
  const displayItems = (menuData[activeCategory] ?? []).slice(0, 12);

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Our Menu<span className="text-rose-500">.</span>
          </h2>
          <p className="text-slate-500 mt-3 text-lg">
            Discover your next favorite meal.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-rose-500 hover:text-rose-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {displayItems.map((item) => {
            const cartEntry = getCartEntry(item._id);
            const quantity = cartEntry?.quantity || 0;

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
                      {quantity > 0 ? (
                        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-2 py-1">
                          <button
                            onClick={() =>
                              quantity > 1
                                ? updateQuantity(cartEntry?._id, quantity - 1)
                                : removeFromCart(cartEntry._id)
                            }
                            className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:text-rose-500 hover:border-rose-500 transition-colors"
                          >
                            <FaMinus className="text-xs" />
                          </button>
                          <span className="w-4 text-center font-medium text-slate-700">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(cartEntry._id, quantity + 1)}
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
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
};

export default OurMenu;