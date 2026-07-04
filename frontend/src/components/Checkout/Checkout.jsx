import React, { useState } from 'react';
import { useCart } from '../../CartContext/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';

const CheckoutPage = () => {
  const { totalAmount, cartItems: rawCart, clearCart } = useCart();
  const cartItems = rawCart.filter(ci => ci.item);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '',
    email: '', address: '', city: '', zipCode: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Grab token from localStorage
  const token = localStorage.getItem('authToken');
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Calculate pricing
    const subtotal = Number(totalAmount.toFixed(2));
    const tax = Number((subtotal * 0.05).toFixed(2));
    const total = Number((subtotal + tax).toFixed(2));

    const payload = {
      ...formData,
      paymentMethod: 'cod', 
      subtotal,
      tax,
      total,
      items: cartItems.map(({ item, quantity }) => ({
        name: item.name,
        price: item.price,
        quantity,
        imageUrl: item.imageUrl || ''
      }))
    };

    try {
      // Directly create the order on the backend
      const { data } = await axios.post(
        'http://localhost:4000/api/orders',
        payload,
        { headers: authHeaders }
      );
      
      // Clear cart and go to orders page
      clearCart();
      navigate('/myorder', { state: { order: data.order } });
      
    } catch (err) {
      console.error('Order submission error:', err);
      setError(err.response?.data?.message || 'Failed to submit order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <Link to="/cart" className="inline-flex items-center gap-2 text-slate-500 hover:text-rose-500 font-medium mb-8 transition-colors">
          <FaArrowLeft className="text-sm" /> Back to Cart
        </Link>
        
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Checkout<span className="text-rose-500">.</span>
          </h1>
          <p className="text-slate-500 mt-2">Complete your delivery details below.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left Column: Personal Info */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Delivery Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                <div className="md:col-span-2">
                  <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="md:col-span-2">
                  <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} />
                </div>
                <div className="md:col-span-2">
                  <Input label="Full Delivery Address" name="address" value={formData.address} onChange={handleInputChange} />
                </div>
                <Input label="City" name="city" value={formData.city} onChange={handleInputChange} />
                <Input label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

              {/* Order Items List */}
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
                {cartItems.map(({ _id, item, quantity }) => (
                  <div key={_id} className="flex justify-between items-center bg-slate-50 border border-slate-100 p-4 rounded-xl">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 line-clamp-1">{item.name}</p>
                      <p className="text-slate-500 text-sm mt-0.5">Qty: {quantity}</p>
                    </div>
                    <span className="font-bold text-slate-900 ml-4">
                      ₹{(item.price * quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <PaymentSummary totalAmount={totalAmount} />

              {/* Fixed Payment Method Display */}
              <div className="mt-8 mb-8 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-slate-500 text-sm font-semibold mb-1">Payment Method</p>
                <p className="text-slate-900 font-bold flex items-center gap-2">
                   Cash on Delivery (COD)
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || cartItems.length === 0}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-2 transition-colors shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <FaCheckCircle className="text-lg" /> 
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Extracted Input Component
const Input = ({ label, name, type = 'text', value, onChange }) => (
  <div>
    <label className="block text-slate-700 text-sm font-semibold mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all placeholder-slate-400"
    />
  </div>
);

// Extracted Payment Summary Component
const PaymentSummary = ({ totalAmount }) => {
  const subtotal = Number(totalAmount.toFixed(2));
  const tax = Number((subtotal * 0.05).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));
  
  return (
    <div className="space-y-3 pt-4 border-t border-slate-100">
      <div className="flex justify-between text-slate-600 font-medium">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-slate-600 font-medium">
        <span>Tax (5%)</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center border-t border-slate-200 pt-4 mt-2">
        <span className="text-lg font-bold text-slate-900">Total</span>
        <span className="text-2xl font-bold text-rose-500">₹{total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CheckoutPage;