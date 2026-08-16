import React, { useState, useEffect } from 'react';
import { FiUser, FiBox, FiClock, FiTruck, FiCheckCircle } from 'react-icons/fi';
import axios from 'axios';
import AdminNavbar from '../Navbar/Navbar';

/**
 * Mealzy — Admin: Order Management
 * -----------------------------------------------------------------
 * Same dark admin variant as AdminNavbar.jsx / AddItems.jsx /
 * ListItems.jsx. No longer reads statusStyles / paymentMethodDetails /
 * tableClasses / layoutClasses / iconMap from dummyadmin.js — those
 * are inlined below using the same color mapping as the customer-
 * facing order history page, so a "Delivered" badge means the same
 * color everywhere in the app. Fetch and status-update logic
 * unchanged.
 */

const statusStyles = {
  processing: { color: 'text-[#B87F1D]', bg: 'bg-[#E7A73E]/15', icon: <FiClock className="text-lg" />, label: 'Processing' },
  outForDelivery: { color: 'text-[#5B94A8]', bg: 'bg-[#5B94A8]/15', icon: <FiTruck className="text-lg" />, label: 'Out for Delivery' },
  delivered: { color: 'text-[#7FA98E]', bg: 'bg-[#7FA98E]/15', icon: <FiCheckCircle className="text-lg" />, label: 'Delivered' },
  pending: { color: 'text-[#B87F1D]', bg: 'bg-[#E7A73E]/15', icon: <FiClock className="text-lg" />, label: 'Payment Pending' },
  succeeded: { color: 'text-[#7FA98E]', bg: 'bg-[#7FA98E]/15', icon: <FiCheckCircle className="text-lg" />, label: 'Completed' },
};

const paymentMethodDetails = {
  cod: { label: 'COD', class: 'bg-[#E7A73E]/10 text-[#E7A73E] border-[#E7A73E]/30' },
  card: { label: 'Credit/Debit Card', class: 'bg-[#5B94A8]/10 text-[#5B94A8] border-[#5B94A8]/30' },
  upi: { label: 'UPI Payment', class: 'bg-[#B84A32]/10 text-[#B84A32] border-[#B84A32]/30' },
  default: { label: 'Online', class: 'bg-[#7FA98E]/10 text-[#7FA98E] border-[#7FA98E]/30' },
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          'http://localhost:4000/api/orders/getall',
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );

        const formatted = response.data.map(order => ({
          ...order,
          address: order.address ?? order.shippingAddress?.address ?? '',
          city: order.city ?? order.shippingAddress?.city ?? '',
          zipCode: order.zipCode ?? order.shippingAddress?.zipCode ?? '',
          phone: order.phone ?? '',
          items: order.items?.map(e => ({ _id: e._id, item: e.item, quantity: e.quantity })) || [],
          createdAt: new Date(order.createdAt).toLocaleDateString('en-IN', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
          }),
        }));

        setOrders(formatted);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:4000/api/orders/getall/${orderId}`, { status: newStatus });
      setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order status');
    }
  };

  const sharedFontStyles = (
    <style>{`
      .font-display { font-family: 'Fraunces', Georgia, serif; }
      .font-body { font-family: 'Work Sans', system-ui, sans-serif; }
      .font-ticket { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
    `}</style>
  );

  if (loading) return (
    <>
      <AdminNavbar />
      {sharedFontStyles}
      <div className="min-h-screen bg-[#22332A] flex items-center justify-center">
        <div className="font-body text-[#E7A73E] text-xl">Loading orders...</div>
      </div>
    </>
  );

  if (error) return (
    <>
      <AdminNavbar />
      {sharedFontStyles}
      <div className="min-h-screen bg-[#22332A] flex items-center justify-center">
        <div className="font-body text-[#B84A32] text-xl">{error}</div>
      </div>
    </>
  );

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-[#22332A] py-12 px-4 sm:px-6 lg:px-8">
        {sharedFontStyles}
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1A271F]/60 border border-[#F7F3E8]/10 rounded-sm p-6 sm:p-8">
            <span className="font-ticket block text-xs uppercase tracking-[0.2em] text-[#B84A32] mb-2">
              Order No. 009
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#F7F3E8] mb-8">
              Order management
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-[#F7F3E8]/10">
                  <tr>
                    {['Order ID', 'Customer', 'Address', 'Items', 'Total Items', 'Price', 'Payment', 'Status'].map(h => (
                      <th
                        key={h}
                        className={`font-ticket p-4 text-left text-xs uppercase tracking-wide text-[#B8C4BB] ${h === 'Total Items' ? 'text-center' : ''}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => {
                    const totalItems = order.items.reduce((s, i) => s + i.quantity, 0);
                    const totalPrice = order.total ?? order.items.reduce((s, i) => s + i.item.price * i.quantity, 0);
                    const payMethod = paymentMethodDetails[order.paymentMethod?.toLowerCase()] || paymentMethodDetails.default;
                    const payStatusStyle = statusStyles[order.paymentStatus] || statusStyles.processing;
                    const stat = statusStyles[order.status] || statusStyles.processing;

                    return (
                      <tr key={order._id} className="border-b border-dashed border-[#F7F3E8]/10 hover:bg-[#F7F3E8]/5 transition-colors">
                        <td className="font-ticket p-4 text-sm text-[#F7F3E8]">#{order._id.slice(-8)}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <FiUser className="text-[#E7A73E]" />
                            <div>
                              <p className="font-body text-[#F7F3E8]">{order.user?.name || order.firstName + ' ' + order.lastName}</p>
                              <p className="font-ticket text-sm text-[#B8C4BB]">{order.user?.phone || order.phone}</p>
                              <p className="font-ticket text-sm text-[#B8C4BB]">{order.user?.email || order.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-body text-[#B8C4BB] text-sm max-w-[200px]">{order.address}, {order.city} - {order.zipCode}</div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1 max-h-52 overflow-auto">
                            {order.items.map((itm, idx) => (
                              <div key={idx} className="flex items-center gap-3 p-2 rounded-sm">
                                <img src={`http://localhost:4000${itm.item.imageUrl}`} alt={itm.item.name} className="w-10 h-10 object-cover rounded-sm" />
                                <div className="flex-1">
                                  <span className="font-body text-[#F7F3E8] text-sm block truncate">{itm.item.name}</span>
                                  <div className="font-ticket flex items-center gap-2 text-xs text-[#B8C4BB]">
                                    <span>&#8377;{itm.item.price.toFixed(2)}</span><span>&bull;</span><span>x{itm.quantity}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <FiBox className="text-[#E7A73E]" /><span className="font-ticket text-[#F7F3E8] text-lg">{totalItems}</span>
                          </div>
                        </td>
                        <td className="font-ticket p-4 text-[#F7F3E8] text-lg">&#8377;{totalPrice.toFixed(2)}</td>
                        <td className="p-4">
                          <div className="flex flex-col gap-2">
                            <div className={`${payMethod.class} font-ticket px-3 py-1.5 rounded-sm border text-xs`}>{payMethod.label}</div>
                            <div className={`${payStatusStyle.color} font-body flex items-center gap-2 text-sm`}>{payStatusStyle.icon}<span>{payStatusStyle.label}</span></div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className={`${stat.color} text-xl`}>{stat.icon}</span>
                            <select
                              value={order.status}
                              onChange={e => handleStatusChange(order._id, e.target.value)}
                              className={`font-ticket px-4 py-2 rounded-sm ${stat.bg} ${stat.color} border border-[#F7F3E8]/10 text-xs cursor-pointer`}
                            >
                              {Object.entries(statusStyles).filter(([k]) => k !== 'succeeded' && k !== 'pending').map(([key, sty]) => (
                                <option key={key} value={key} className="bg-[#1A271F] text-[#F7F3E8]">{sty.label}</option>
                              ))}
                            </select>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {orders.length === 0 && <div className="font-body text-center py-12 text-[#B8C4BB] text-xl">No orders found</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;