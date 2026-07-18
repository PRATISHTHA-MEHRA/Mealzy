import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../../CartContext/CartContext';
import { FaMinus, FaPlus } from 'react-icons/fa';

/**
 * Mealzy — Menu page
 * -----------------------------------------------------------------
 * Same kitchen-ticket system as the rest of the site — this replaces
 * the old dark amber/"fine dining" theme (Cinzel + Dancing Script,
 * gold gradients) that didn't match anywhere else in the app.
 * Om.css is no longer needed; everything (fonts, entrance animation,
 * scrollbar) lives in the inline <style> tag below.
 * Data fetching and cart logic are untouched.
 */

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

  const getCartEntry = id => cartItems.find(ci => ci.item?._id === id);
  const getQuantity = id => getCartEntry(id)?.quantity ?? 0;

  const displayItems = (menuData[activeCategory] ?? []).slice(0, 12);

  return (
    <div className="bg-[#F7F3E8] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <style>{`
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-body { font-family: 'Work Sans', system-ui, sans-serif; }
        .font-ticket { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

        @keyframes cardEntrance {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .menu-grid > div {
          animation: cardEntrance 0.5s ease-out forwards;
          opacity: 0;
          animation-delay: calc(var(--index) * 0.06s);
        }

        ::-webkit-scrollbar { width: 8px; background: #F7F3E8; }
        ::-webkit-scrollbar-thumb { background: #2F4A3C; border-radius: 4px; }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="text-center mb-12">
          <span className="font-ticket inline-block text-xs uppercase tracking-[0.2em] text-[#B84A32] mb-3">
            Mealzy Kitchen &mdash; Full Menu
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-[#20261F]">
            What&apos;s cooking today
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-ticket px-5 py-2 rounded-full border text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#2F4A3C] border-[#2F4A3C] text-[#F7F3E8]'
                  : 'bg-white border-[#20261F]/15 text-[#4A6154] hover:border-[#2F4A3C]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="menu-grid grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {displayItems.map((item, i) => {
            const cartEntry = getCartEntry(item._id);
            const quantity = cartEntry?.quantity || 0;

            return (
              <div
                key={item._id}
                className="bg-white rounded-sm overflow-hidden border border-[#20261F]/10 flex flex-col transition-colors duration-300 hover:border-[#2F4A3C]/40"
                style={{ '--index': i }}
              >
                {/* Image */}
                <div className="relative h-48 sm:h-52 flex items-center justify-center bg-[#F7F3E8]">
                  <img
                    src={item.imageUrl || item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                  />
                  <span className="font-ticket absolute top-3 left-3 bg-[#20261F]/80 text-[#F7F3E8] text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm">
                    {item.category || activeCategory}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-display font-bold text-lg text-[#20261F] mb-1">
                    {item.name}
                  </h3>
                  <p className="font-body text-[#4A6154] text-sm mb-4 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {/* Price & Cart Controls */}
                  <div className="mt-auto flex items-center gap-3 justify-between">
                    <span className="font-ticket text-lg font-semibold text-[#20261F]">
                      &#8377;{Number(item.price).toFixed(2)}
                    </span>
                    <div className="flex items-center gap-2">
                      {quantity > 0 ? (
                        <>
                          <button
                            onClick={() =>
                              quantity > 1
                                ? updateQuantity(cartEntry?._id, quantity - 1)
                                : removeFromCart(cartEntry._id)
                            }
                            className="w-8 h-8 rounded-full bg-[#F7F3E8] border border-[#20261F]/15 flex items-center justify-center hover:border-[#2F4A3C]/50 transition-colors"
                          >
                            <FaMinus className="text-[#20261F] text-xs" />
                          </button>
                          <span className="font-ticket w-6 text-center text-[#20261F]">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(cartEntry._id, quantity + 1)}
                            className="w-8 h-8 rounded-full bg-[#F7F3E8] border border-[#20261F]/15 flex items-center justify-center hover:border-[#2F4A3C]/50 transition-colors"
                          >
                            <FaPlus className="text-[#20261F] text-xs" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="font-ticket bg-[#B84A32] hover:bg-[#9E3E29] text-[#F7F3E8] px-4 py-1.5 rounded-full text-xs uppercase tracking-widest transition-colors"
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
      </div>
    </div>
  );
};

export default OurMenu;