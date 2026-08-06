import React, { useState, useEffect } from 'react';
import { FaStar, FaHeart } from 'react-icons/fa';
import { useCart } from '../../CartContext/CartContext';

import { cardData, additionalData } from '../../assets/dummydata';

/**
 * Mealzy — Special Offers
 * -----------------------------------------------------------------
 * Same system as OurMenu.jsx / CartPage.jsx — cards use the same
 * ticket-stub treatment so an item looks the same here, on the menu,
 * and in the cart. Data normalization and cart logic unchanged.
 */

const SpecialOffer = () => {
  const [showAll, setShowAll] = useState(false);
  const [items, setItems] = useState([]);
  const { addToCart, updateQuantity, removeFromCart, cartItems: rawCart } = useCart();

  const cartItems = rawCart.filter(ci => ci.item);

  useEffect(() => {
    const localItems = [...cardData, ...additionalData];

    const normalizedItems = localItems.map(item => {
      const cleanPrice = typeof item.price === 'string'
        ? Number(item.price.replace('₹', ''))
        : item.price;

      return {
        _id: item.id.toString(),
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
    <section className="bg-[#F7F3E8] py-16 px-4">
      <style>{`
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-body { font-family: 'Work Sans', system-ui, sans-serif; }
        .font-ticket { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-ticket inline-block text-xs uppercase tracking-[0.2em] text-[#B84A32] mb-3">
            Today&apos;s specials
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-[#20261F]">
            Off the pass <span className="text-[#2F4A3C]">today</span>
          </h2>
          <p className="font-body text-lg text-[#4A6154] max-w-2xl mx-auto mt-3">
            Culinary masterpieces crafted to perfection, priced for today only.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
          {displayList.map((item) => {
            const cartItem = cartItems.find(ci => ci.item?._id === item._id);
            const qty = cartItem?.quantity ?? 0;
            const cartId = cartItem?._id;

            return (
              <div
                key={item._id}
                className="group bg-white rounded-sm overflow-hidden border border-[#20261F]/10 hover:border-[#2F4A3C]/40 transition-colors duration-300 flex flex-col"
              >
                {/* Image Container with Badges */}
                <div className="relative h-48 bg-[#F7F3E8] flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute top-3 left-3 flex gap-2">
                    {item.rating && (
                      <span className="font-ticket flex items-center gap-1 bg-[#20261F]/80 text-[#F7F3E8] text-xs font-semibold px-2 py-1 rounded-sm">
                        <FaStar className="text-[#E7A73E] text-xs" /> {item.rating}
                      </span>
                    )}
                    {item.hearts && (
                      <span className="font-ticket flex items-center gap-1 bg-[#20261F]/80 text-[#F7F3E8] text-xs font-semibold px-2 py-1 rounded-sm">
                        <FaHeart className="text-[#B84A32] text-xs" /> {item.hearts}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content & Cart Controls */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-display font-bold text-lg text-[#20261F] mb-1">
                    {item.name}
                  </h3>
                  <p className="font-body text-[#4A6154] text-sm mb-5 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-ticket text-lg font-semibold text-[#20261F]">
                      &#8377;{item.price.toFixed(2)}
                    </span>

                    <div>
                      {qty > 0 ? (
                        <div className="flex items-center gap-3 bg-[#F7F3E8] border border-[#20261F]/10 rounded-full px-2 py-1">
                          <button
                            onClick={() =>
                              qty > 1
                                ? updateQuantity(cartId, qty - 1)
                                : removeFromCart(cartId)
                            }
                            className="w-7 h-7 rounded-full bg-white border border-[#20261F]/10 flex items-center justify-center hover:text-[#2F4A3C] hover:border-[#2F4A3C] transition-colors"
                          >
                            <span className="text-sm font-bold">-</span>
                          </button>
                          <span className="font-ticket w-4 text-center font-medium text-[#20261F]">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQuantity(cartId, qty + 1)}
                            className="w-7 h-7 rounded-full bg-white border border-[#20261F]/10 flex items-center justify-center hover:text-[#2F4A3C] hover:border-[#2F4A3C] transition-colors"
                          >
                            <span className="text-sm font-bold">+</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="font-ticket bg-[#B84A32]/10 px-5 py-2 rounded-full text-[#B84A32] font-medium text-sm uppercase tracking-wide hover:bg-[#B84A32] hover:text-[#F7F3E8] transition-colors"
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
              className="font-body px-8 py-3 bg-white border border-[#20261F]/15 text-[#20261F] font-medium rounded-full hover:border-[#2F4A3C] hover:text-[#2F4A3C] transition-colors"
            >
              {showAll ? 'Show less' : 'View all offers'}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default SpecialOffer;