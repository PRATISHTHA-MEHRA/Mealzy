import React, { useState, useEffect } from 'react';
import { useCart } from '../../CartContext/CartContext';
import { FaMinus, FaPlus } from 'react-icons/fa';
// Import local menu arrays from your dummydata file
import { cardData, additionalData } from '../../assets/dummydata';

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Mexican', 'Italian', 'Desserts', 'Drinks'];

const OurMenu = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [menuData, setMenuData] = useState({});
  const { cartItems: rawCart, addToCart, updateQuantity, removeFromCart } = useCart();

  const cartItems = rawCart.filter(ci => ci.item);

  useEffect(() => {
    // Combine both arrays from your dummydata
    const localItems = [...cardData, ...additionalData];
    const normalizedItems = [];

    // Distribute and repeat items to ensure all 7 categories have content
    localItems.forEach((item) => {
      const cleanPrice = typeof item.price === 'string' 
        ? Number(item.price.replace('₹', '')) 
        : item.price;

      const baseItem = {
        _id: item.id.toString(),
        name: item.title,
        description: item.description,
        price: cleanPrice,
        image: item.image,
      };

      // 1. BREAKFAST POPULATION
      if (item.title === 'Mysore Masala Dosa') {
        normalizedItems.push({ ...baseItem, _id: `${item.id}-bf`, category: 'Breakfast' });
      }

      // 2. LUNCH POPULATION
      if (item.title === 'Lucknowi Kebab' || item.title === 'Amritsari Paneer Tikka' || item.title === 'Desi Street Chowmein') {
        normalizedItems.push({ ...baseItem, _id: `${item.id}-lh`, category: 'Lunch' });
      }

      // 3. DINNER POPULATION
      if (item.title === 'Punjabi Chicken Tikka' || item.title === 'Dhaba Style Palak Paneer' || item.title === 'Lahori Chargha') {
        normalizedItems.push({ ...baseItem, _id: `${item.id}-dn`, category: 'Dinner' });
      }

      // 4. MEXICAN FUSION POPULATION (Repeating/modifying items to fit context)
      if (item.title === 'Lucknowi Kebab') {
        normalizedItems.push({ 
          ...baseItem, 
          _id: `${item.id}-mex`, 
          name: 'Kebab Loaded Quesadilla', 
          description: 'Spicy minced meat folded in a crisp tortilla with cheese',
          category: 'Mexican' 
        });
      }

      // 5. ITALIAN FUSION POPULATION
      if (item.title === 'Amritsari Paneer Tikka') {
        normalizedItems.push({ 
          ...baseItem, 
          _id: `${item.id}-ita`, 
          name: 'Tandoori Paneer Pizza Chunks', 
          description: 'Paneer tikka tossed in classic Italian herbs and cheese sauce',
          category: 'Italian' 
        });
      }
      if (item.title === 'Desi Street Chowmein') {
        normalizedItems.push({ 
          ...baseItem, 
          _id: `${item.id}-ita2`, 
          name: 'Spicy Street Arabbiata Pasta Noodles', 
          description: 'Indo-Italian fusion noodles cooked with local garlic and chili spices',
          category: 'Italian' 
        });
      }

      // 6. DESSERTS POPULATION
      if (item.title === 'Saffron Gulab Jamun') {
        normalizedItems.push({ ...baseItem, _id: `${item.id}-des`, category: 'Desserts' });
      }

      // 7. DRINKS POPULATION
      if (item.title === 'Saffron Gulab Jamun') {
        normalizedItems.push({ 
          ...baseItem, 
          _id: `${item.id}-drk`, 
          name: 'Premium Saffron Masala Lassi', 
          description: 'Thick, refreshing traditional yogurt drink infused with saffron strands',
          price: 80,
          category: 'Drinks' 
        });
      }
    });

    // Group everything cleanly into the categorized object structure
    const byCategory = normalizedItems.reduce((acc, item) => {
      const cat = item.category;
      acc[cat] = acc[cat] || [];
      acc[cat].push(item);
      return acc;
    }, {});

    setMenuData(byCategory);
  }, []);

  // Helper: find cart entry by product ID
  const getCartEntry = id => cartItems.find(ci => ci.item?._id === id);

  // Items to display in active category
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
            Fresh, fast, and authentic dishes right to your doorstep.
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
          {displayItems.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-400 font-medium">
              No items available in this category yet.
            </div>
          ) : (
            displayItems.map((item) => {
              const cartEntry = getCartEntry(item._id);
              const quantity = cartEntry?.quantity || 0;

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  {/* Image Container */}
                  <div className="h-48 bg-slate-50 flex items-center justify-center p-4 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain drop-shadow-sm transition-transform duration-500 hover:scale-105"
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
                        ₹{item.price.toFixed(2)}
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
                              className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:text-rose-500 hover:border-rose-500 transition-colors shadow-sm"
                            >
                              <FaMinus className="text-xs" />
                            </button>
                            <span className="w-4 text-center font-medium text-slate-700">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(cartEntry._id, quantity + 1)}
                              className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:text-rose-500 hover:border-rose-500 transition-colors shadow-sm"
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
            })
          )}
        </div>
        
      </div>
    </div>
  );
};

export default OurMenu;