import React from 'react';
import {
  FaBolt,
  FaLeaf,
  FaUtensils,
  FaTruckFast,
} from 'react-icons/fa6';

/**
 * Mealzy — About page
 * -----------------------------------------------------------------
 * Design direction: "kitchen order ticket"
 * - Ivory paper + deep forest ink + saffron/brick accents (no cream+terracotta,
 *   no dark+neon default palette)
 * - Ticket / receipt motifs (perforated edges, dotted leaders, order numbers)
 *   carry real information — they label actual sections, not decoration
 * - Team roster uses monogram badges instead of photos, so there's no risk
 *   of a stock photo not matching the name/role next to it
 *
 * Fonts: add these once in index.html <head> (or swap for fonts already
 * in your project) —
 * <link rel="preconnect" href="https://fonts.googleapis.com">
 * <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700;900&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap" rel="stylesheet">
 */

const features = [
  {
    id: 1,
    no: '01',
    icon: FaLeaf,
    title: 'Sourced same-day',
    text: 'We call our partner farms and markets before sunrise. Nothing sits in a warehouse — it goes from crate to kitchen the same morning.',
  },
  {
    id: 2,
    no: '02',
    icon: FaTruckFast,
    title: 'Kitchen to door, under 30',
    text: 'Orders route to the nearest partner kitchen, not the cheapest one. Shorter trip, hotter food, less packaging waste.',
  },
  {
    id: 3,
    no: '03',
    icon: FaUtensils,
    title: 'Menus, not menus-by-committee',
    text: 'Every dish on Mealzy is signed off by the chef who wrote it. We don\u2019t flatten recipes to fit a delivery box.',
  },
];

const stats = [
  { label: 'Meals delivered', value: '120,000+' },
  { label: 'Partner kitchens', value: '65' },
  { label: 'Cities served', value: '42' },
  { label: 'Avg. delivery time', value: '28 min' },
];

const team = [
  {
    initials: 'AT',
    name: 'Akash Trivedi',
    role: 'Regional Cuisine Lead',
    bio: 'Runs our South Indian coastal program — spice blends and technique, sourced and tested in-house.',
    color: '#2F4A3C',
  },
  {
    initials: 'RM',
    name: 'Riya Mehta',
    role: 'Head of Delivery Ops',
    bio: 'Builds the routing that gets a hot plate from kitchen to door in under 30 minutes, city by city.',
    color: '#B84A32',
  },
  {
    initials: 'SK',
    name: 'Sameer Kulkarni',
    role: 'Culinary R&D',
    bio: 'Tests every recipe for how it travels, not just how it tastes on the pass.',
    color: '#E7A73E',
  },
  {
    initials: 'NP',
    name: 'Nandini Pillai',
    role: 'Founder & CEO',
    bio: 'Started Mealzy after one too many soggy delivery boxes. Still tastes every new menu herself.',
    color: '#3E5C6B',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-[#F7F3E8] text-[#20261F] pb-24">
      <style>{`
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-body { font-family: 'Work Sans', system-ui, sans-serif; }
        .font-ticket { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

        .perforated {
          position: relative;
        }
        .perforated::before {
          content: '';
          position: absolute;
          top: -1px;
          left: 0;
          right: 0;
          height: 1px;
          background-image: radial-gradient(circle, #F7F3E8 1.5px, transparent 1.6px);
          background-size: 10px 3px;
          background-repeat: repeat-x;
        }
        .ticket-notch {
          position: relative;
        }
        .ticket-notch::before,
        .ticket-notch::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          background: #F7F3E8;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
        }
        .ticket-notch::before { left: -10px; }
        .ticket-notch::after { right: -10px; }

        .dotted-leader {
          border-bottom: 2px dotted #4A6154;
          flex: 1;
          margin: 0 12px;
          height: 0;
        }
      `}</style>

      {/* Hero — order ticket header */}
      <section className="pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="ticket-notch bg-white rounded-sm shadow-sm border border-[#20261F]/10 px-8 sm:px-14 py-12 sm:py-16">
            <div className="flex items-center justify-between font-ticket text-xs uppercase tracking-[0.2em] text-[#4A6154] mb-8">
              <span>Mealzy Kitchen</span>
              <span>Order No. 001 &mdash; About</span>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6">
              We cook it close.<br />We send it fast.
            </h1>
            <p className="font-body text-lg sm:text-xl text-[#4A6154] leading-relaxed max-w-xl">
              Mealzy pairs your order with the nearest partner kitchen and
              gets it to you while it&apos;s still hot &mdash; no fleet of
              freezers, no menu built for a warehouse.
            </p>
          </div>
          <div className="perforated max-w-4xl mx-auto" />
        </div>
      </section>

      {/* Features — ticket stubs */}
      <section className="pt-16 pb-4 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-white rounded-sm border border-[#20261F]/10 hover:border-[#20261F]/25 transition-colors p-8 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-ticket text-xs tracking-[0.2em] text-[#B84A32]">
                    ITEM {feature.no}
                  </span>
                  <Icon className="text-xl text-[#2F4A3C]" />
                </div>
                <h3 className="font-display font-bold text-xl mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-[#4A6154] leading-relaxed">
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats — receipt strip */}
      <section className="py-16 px-4 my-8">
        <div className="max-w-3xl mx-auto bg-[#2F4A3C] text-[#F7F3E8] rounded-sm px-8 sm:px-12 py-10">
          <div className="flex items-center gap-2 mb-8">
            <FaBolt className="text-[#E7A73E]" />
            <span className="font-ticket text-xs uppercase tracking-[0.2em] text-[#E7A73E]">
              Mealzy, by the numbers
            </span>
          </div>
          <div className="space-y-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline">
                <span className="font-body text-sm sm:text-base text-[#D8E0D3] whitespace-nowrap">
                  {stat.label}
                </span>
                <span className="dotted-leader" />
                <span className="font-ticket font-semibold text-lg sm:text-xl">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team — kitchen roster, monogram badges instead of photos */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="font-ticket text-xs uppercase tracking-[0.2em] text-[#B84A32]">
              The roster
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl mt-2">
              The people behind the pass
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white border border-[#20261F]/10 rounded-sm p-7 flex gap-5 hover:border-[#20261F]/25 transition-colors"
              >
                <div
                  className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-ticket font-semibold text-[#F7F3E8] text-lg"
                  style={{ backgroundColor: member.color }}
                >
                  {member.initials}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg leading-tight">
                    {member.name}
                  </h3>
                  <p className="font-ticket text-xs uppercase tracking-wide text-[#B84A32] mt-1 mb-3">
                    {member.role}
                  </p>
                  <p className="font-body text-[#4A6154] text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;