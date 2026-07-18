import React, { useState, useEffect } from 'react';
import { FiTruck, FiCheckCircle, FiClock, FiArrowLeft, FiUser, FiMapPin, FiBox } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';



const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/orders', {
          params: { email: user?.email },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        const formattedOrders = response.data.map(order => ({
          ...order,
          items: order.items?.map(entry => ({
            _id: entry._id,
            item: {
              ...entry.item,
              imageUrl: entry.item.imageUrl,
            },
            quantity: entry.quantity
          })) || [],
          createdAt: new Date(order.createdAt).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          paymentStatus: order.paymentStatus?.toLowerCase() || 'pending'
        }));
        setOrders(formattedOrders);
        setError(null);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.response?.data?.message || 'Failed to load orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email]);

  const statusStyles = {
    processing: {
      color: 'text-[#B87F1D]',
      bg: 'bg-[#E7A73E]/10',
      icon: <FiClock className="text-lg" />,
      label: 'Processing'
    },
    outForDelivery: {
      color: 'text-[#3E5C6B]',
      bg: 'bg-[#3E5C6B]/10',
      icon: <FiTruck className="text-lg" />,
      label: 'Out for Delivery'
    },
    delivered: {
      color: 'text-[#2F4A3C]',
      bg: 'bg-[#2F4A3C]/10',
      icon: <FiCheckCircle className="text-lg" />,
      label: 'Delivered'
    },
    pending: {
      color: 'text-[#B87F1D]',
      bg: 'bg-[#E7A73E]/10',
      icon: <FiClock className="text-lg" />,
      label: 'Payment Pending'
    },
    succeeded: {
      color: 'text-[#2F4A3C]',
      bg: 'bg-[#2F4A3C]/10',
      icon: <FiCheckCircle className="text-lg" />,
      label: 'Completed'
    }
  };

  const getPaymentMethodDetails = (method) => {
    switch (method.toLowerCase()) {
      case 'cod':
        return { label: 'COD', class: 'bg-[#E7A73E]/10 text-[#B87F1D] border-[#E7A73E]/40' };
      case 'card':
        return { label: 'Credit/Debit Card', class: 'bg-[#3E5C6B]/10 text-[#3E5C6B] border-[#3E5C6B]/30' };
      case 'upi':
        return { label: 'UPI Payment', class: 'bg-[#B84A32]/10 text-[#B84A32] border-[#B84A32]/30' };
      default:
        return { label: 'Online', class: 'bg-[#2F4A3C]/10 text-[#2F4A3C] border-[#2F4A3C]/30' };
    }
  };

  const sharedFontStyles = (
    <style>{`
      .font-display { font-family: 'Fraunces', Georgia, serif; }
      .font-body { font-family: 'Work Sans', system-ui, sans-serif; }
      .font-ticket { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
    `}</style>
  );

  if (error) return (
    <div className="min-h-screen bg-[#F7F3E8] flex flex-col items-center justify-center text-[#B84A32] text-xl gap-4">
      {sharedFontStyles}
      <p className="font-body">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="font-body flex items-center gap-2 text-[#2F4A3C] hover:text-[#20261F]"
      >
        <FiArrowLeft className="text-xl" />
        <span>Try Again</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F7F3E8] py-12 px-4 sm:px-6 lg:px-8">
      {sharedFontStyles}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="font-body flex items-center gap-2 text-[#2F4A3C] hover:text-[#20261F] transition-colors">
            <FiArrowLeft className="text-xl" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <span className="font-ticket text-[#4A6154] text-sm">
            {user?.email}
          </span>
        </div>

        <div className="bg-white rounded-sm p-8 border border-[#20261F]/10">
          <span className="font-ticket block text-center text-xs uppercase tracking-[0.2em] text-[#B84A32] mb-2">
            Order No. 006
          </span>
          <h2 className="font-display font-black text-3xl mb-8 text-[#20261F] text-center">
            Order history
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[#20261F]/10">
                <tr>
                  <th className="font-ticket p-4 text-left text-[#4A6154] text-xs uppercase tracking-wide">Order ID</th>
                  <th className="font-ticket p-4 text-left text-[#4A6154] text-xs uppercase tracking-wide">Customer</th>
                  <th className="font-ticket p-4 text-left text-[#4A6154] text-xs uppercase tracking-wide">Address</th>
                  <th className="font-ticket p-4 text-left text-[#4A6154] text-xs uppercase tracking-wide">Items</th>
                  <th className="font-ticket p-4 text-left text-[#4A6154] text-xs uppercase tracking-wide">Total Items</th>
                  <th className="font-ticket p-4 text-left text-[#4A6154] text-xs uppercase tracking-wide">Price</th>
                  <th className="font-ticket p-4 text-left text-[#4A6154] text-xs uppercase tracking-wide">Payment</th>
                  <th className="font-ticket p-4 text-left text-[#4A6154] text-xs uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
                  const totalPrice = order.total ?? order.items.reduce(
                    (sum, item) => sum + (item.item.price * item.quantity),
                    0
                  );
                  const paymentMethod = getPaymentMethodDetails(order.paymentMethod);
                  const status = statusStyles[order.status] || statusStyles.processing;
                  const paymentStatus = statusStyles[order.paymentStatus] || statusStyles.pending;

                  return (
                    <tr
                      key={order._id}
                      className="border-b border-dashed border-[#20261F]/10 hover:bg-[#F7F3E8] transition-colors"
                    >
                      <td className="font-ticket p-4 text-[#20261F] text-sm">#{order._id?.slice(-8)}</td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <FiUser className="text-[#2F4A3C]" />
                          <div>
                            <p className="font-body text-[#20261F]">{order.firstName} {order.lastName}</p>
                            <p className="font-ticket text-sm text-[#4A6154]">{order.phone}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <FiMapPin className="text-[#2F4A3C] shrink-0" />
                          <div className="font-body text-[#4A6154] text-sm max-w-[200px]">
                            {order.address}, {order.city} - {order.zipCode}
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div
                              key={`${order._id}-${index}`}
                              className="flex items-center gap-3 p-2 bg-[#F7F3E8] rounded-sm"
                            >
                              <img
                                src={`http://localhost:4000${item.item.imageUrl}`}
                                alt={item.item.name}
                                className="w-10 h-10 object-cover rounded-sm"
                              />
                              <div className="flex-1">
                                <span className="font-body text-[#20261F] text-sm block">
                                  {item.item.name}
                                </span>
                                <div className="font-ticket flex items-center gap-2 text-xs text-[#4A6154]">
                                  <span>&#8377;{item.item.price}</span>
                                  <span className="mx-1">&bull;</span>
                                  <span>x{item.quantity}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <FiBox className="text-[#2F4A3C]" />
                          <span className="font-ticket text-[#20261F] text-lg">{totalItems}</span>
                        </div>
                      </td>

                      <td className="font-ticket p-4 text-[#20261F] text-lg">&#8377;{totalPrice.toFixed(2)}</td>

                      <td className="p-4">
                        <div className="flex flex-col gap-2">
                          <div className={`${paymentMethod.class} font-ticket px-3 py-1.5 rounded-sm border text-xs`}>
                            {paymentMethod.label}
                          </div>
                          <div className={`${paymentStatus.color} font-body flex items-center gap-2 text-sm`}>
                            {paymentStatus.icon}
                            <span>{paymentStatus.label}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className={`${status.color} text-xl`}>{status.icon}</span>
                          <span className={`font-ticket px-3 py-2 rounded-sm ${status.bg} ${status.color} text-xs`}>
                            {status.label}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="font-body text-center py-12 text-[#4A6154] text-xl">
              No orders found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrdersPage;