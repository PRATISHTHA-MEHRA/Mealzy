import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiMessageSquare, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { contactFormFields } from '../../assets/dummydata';

/**
 * Mealzy — Contact page
 * -----------------------------------------------------------------
 * Same "kitchen order ticket" system as About.jsx: ivory paper, forest
 * green + saffron/brick accents, mono ticket labels, dotted receipt
 * leaders. Contact details read like a receipt; the form reads like
 * an order slip.
 *
 * Requires the same fonts as About.jsx (Fraunces / Work Sans / IBM
 * Plex Mono) — see the note there if you haven't added them yet.
 */

const contactDetails = [
  { icon: FiMapPin, label: 'Headquarters', value: 'Janakpuri, Delhi' },
  { icon: FiPhone, label: 'Contact number', value: '+91 88888888888' },
  { icon: FiMail, label: 'Email', value: 'mealzy@gmail.com' },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', dish: '', query: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `
*New Query for Mealzy!* 🍽️
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Address:* ${formData.address}
*Favorite Dish:* ${formData.dish}
*Query:* ${formData.query}
    `;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '918299431275';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    toast.success('Opening WhatsApp...', {
      style: {
        border: '1px solid #20261F1A',
        padding: '16px',
        color: '#20261F',
        background: '#F7F3E8',
      },
      iconTheme: { primary: '#B84A32', secondary: '#F7F3E8' },
    });

    window.open(whatsappUrl, '_blank');

    setFormData({ name: '', phone: '', email: '', address: '', dish: '', query: '' });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-[#F7F3E8] text-[#20261F] py-20 px-4 sm:px-6 lg:px-8">
      <style>{`
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-body { font-family: 'Work Sans', system-ui, sans-serif; }
        .font-ticket { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

        .dotted-leader {
          border-bottom: 2px dotted #20261F33;
          flex: 1;
          margin: 0 12px;
          height: 0;
        }
        .ticket-input {
          background: #F7F3E8;
          border: 1px solid #20261F26;
        }
        .ticket-input:focus {
          outline: none;
          border-color: #2F4A3C;
          box-shadow: 0 0 0 3px #2F4A3C1F;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">

        {/* Header — ticket stub */}
        <div className="max-w-4xl mx-auto mb-14">
          <div className="bg-white rounded-sm shadow-sm border border-[#20261F]/10 px-8 sm:px-14 py-10 sm:py-12">
            <div className="flex items-center justify-between font-ticket text-xs uppercase tracking-[0.2em] text-[#4A6154] mb-6">
              <span>Mealzy Kitchen</span>
              <span>Order No. 002 &mdash; Contact</span>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl leading-[1.05] mb-4">
              Tell us what you&apos;re craving.
            </h1>
            <p className="font-body text-lg text-[#4A6154] leading-relaxed max-w-xl">
              Send it over and it lands straight in our kitchen&apos;s
              WhatsApp &mdash; a real person reads it, not a ticket queue.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Left Column — contact info as a receipt */}
          <div>
            <div className="bg-[#2F4A3C] text-[#F7F3E8] rounded-sm px-8 sm:px-10 py-10">
              <span className="font-ticket text-xs uppercase tracking-[0.2em] text-[#E7A73E] block mb-8">
                Reach us directly
              </span>
              <div className="space-y-7">
                {contactDetails.map(({ icon: Icon, label, value }) => (
                  <div key={label}>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="text-[#E7A73E] text-lg shrink-0" />
                      <span className="font-body text-sm text-[#D8E0D3]">{label}</span>
                      <span className="dotted-leader" style={{ borderColor: '#F7F3E833' }} />
                    </div>
                    <p className="font-ticket text-lg break-words pl-8">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="font-body text-sm text-[#4A6154] mt-6 px-2 leading-relaxed">
              Prefer WhatsApp? Fill out the form and it opens a message
              pre-filled with everything you typed &mdash; nothing to
              copy or retype.
            </p>
          </div>

          {/* Right Column — order slip form */}
          <div className="bg-white rounded-sm border border-[#20261F]/10 p-8 sm:p-10">
            <span className="font-ticket text-xs uppercase tracking-[0.2em] text-[#B84A32] block mb-6">
              Order slip
            </span>
            <form onSubmit={handleSubmit} className="space-y-5">

              {contactFormFields.map(({ label, name, type, placeholder, pattern, Icon }) => (
                <div key={name}>
                  <label className="block font-ticket text-xs uppercase tracking-wide text-[#4A6154] mb-2">
                    {label}
                  </label>
                  <div className="relative">
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A6154] text-lg" />
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      pattern={pattern}
                      className="ticket-input w-full pl-12 pr-4 py-3 rounded-sm font-body text-[#20261F] placeholder-[#4A6154]/60 transition-all"
                      required
                    />
                  </div>
                </div>
              ))}

              {/* Textarea for Query */}
              <div>
                <label className="block font-ticket text-xs uppercase tracking-wide text-[#4A6154] mb-2">
                  Your query
                </label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-4 top-4 text-[#4A6154] text-lg" />
                  <textarea
                    rows="4"
                    name="query"
                    value={formData.query}
                    onChange={handleChange}
                    placeholder="Type your message here..."
                    className="ticket-input w-full pl-12 pr-4 py-3 rounded-sm font-body text-[#20261F] placeholder-[#4A6154]/60 transition-all resize-none"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#B84A32] hover:bg-[#9E3E29] text-[#F7F3E8] font-ticket font-semibold text-sm uppercase tracking-wide py-3.5 px-6 rounded-sm transition-colors flex items-center justify-center gap-2 group"
              >
                <span>Send via WhatsApp</span>
                <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;