import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTrash2, FiStar, FiHeart } from 'react-icons/fi';
import AdminNavbar from '../Navbar/Navbar';

/**
 * Mealzy — Admin: Manage Menu
 * -----------------------------------------------------------------
 * Same dark admin variant as AdminNavbar.jsx / AddItems.jsx. No
 * longer reads `styles` from dummyadmin.js. Fetch and delete logic
 * unchanged.
 */

const ListItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/items');
        setItems(data);
      } catch (err) {
        console.error('Error fetching items:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`http://localhost:4000/api/items/${itemId}`);
      setItems(prev => prev.filter(item => item._id !== itemId));
      console.log('Deleted item ID:', itemId);
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`text-lg ${i < rating ? 'text-[#E7A73E] fill-current' : 'text-[#F7F3E8]/20'}`}
      />
    ));

  const sharedFontStyles = (
    <style>{`
      .font-display { font-family: 'Fraunces', Georgia, serif; }
      .font-body { font-family: 'Work Sans', system-ui, sans-serif; }
      .font-ticket { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
    `}</style>
  );

  if (loading) {
    return (
      <>
        <AdminNavbar />
        {sharedFontStyles}
        <div className="min-h-screen bg-[#22332A] flex items-center justify-center font-body text-[#B8C4BB]">
          Loading menu&hellip;
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-[#22332A] py-12 px-4 sm:px-6 lg:px-8">
        {sharedFontStyles}
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1A271F]/60 border border-[#F7F3E8]/10 rounded-sm p-6 sm:p-8">
            <span className="font-ticket block text-xs uppercase tracking-[0.2em] text-[#B84A32] mb-2">
              Order No. 008
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#F7F3E8] mb-8">
              Manage menu items
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-[#F7F3E8]/10">
                  <tr>
                    <th className="font-ticket p-4 text-left text-xs uppercase tracking-wide text-[#B8C4BB]">Image</th>
                    <th className="font-ticket p-4 text-left text-xs uppercase tracking-wide text-[#B8C4BB]">Name</th>
                    <th className="font-ticket p-4 text-left text-xs uppercase tracking-wide text-[#B8C4BB]">Category</th>
                    <th className="font-ticket p-4 text-left text-xs uppercase tracking-wide text-[#B8C4BB]">Price (&#8377;)</th>
                    <th className="font-ticket p-4 text-left text-xs uppercase tracking-wide text-[#B8C4BB]">Rating</th>
                    <th className="font-ticket p-4 text-left text-xs uppercase tracking-wide text-[#B8C4BB]">Hearts</th>
                    <th className="font-ticket p-4 text-center text-xs uppercase tracking-wide text-[#B8C4BB]">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item._id} className="border-b border-dashed border-[#F7F3E8]/10 hover:bg-[#F7F3E8]/5 transition-colors">
                      <td className="p-4">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-sm"
                        />
                      </td>
                      <td className="p-4 max-w-[220px]">
                        <p className="font-body text-[#F7F3E8]">{item.name}</p>
                        <p className="font-body text-[#B8C4BB] text-sm truncate">{item.description}</p>
                      </td>
                      <td className="font-ticket p-4 text-[#B8C4BB] text-sm">{item.category}</td>
                      <td className="font-ticket p-4 text-[#F7F3E8]">&#8377;{item.price}</td>
                      <td className="p-4">
                        <div className="flex gap-1">{renderStars(item.rating)}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-[#B84A32] font-ticket">
                          <FiHeart className="text-lg" />
                          <span>{item.hearts}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-[#B8C4BB] hover:text-[#B84A32] transition-colors"
                        >
                          <FiTrash2 className="text-xl" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {items.length === 0 && (
              <div className="font-body text-center py-12 text-[#B8C4BB] text-xl">
                No items found in the menu
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListItems;