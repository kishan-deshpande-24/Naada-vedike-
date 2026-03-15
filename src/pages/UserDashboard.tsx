import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Music, Video, MessageSquare, CreditCard, Heart, LayoutDashboard, Crown, Zap, ArrowRight } from 'lucide-react';

export default function UserDashboard() {
  const user = { name: "Kishan Deshpande", email: "kishan@example.com", isPremium: true, role: 'creator', plan: 'Pro' };

  return (
    <div className="space-y-8 pb-20">
      <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center text-deep-red text-4xl font-bold">
          KD
        </div>
        <div className="text-center md:text-left space-y-1">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-deep-red/60">{user.email}</p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {user.isPremium && (
              <span className="bg-gold text-deep-red px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Crown size={12} /> {user.plan} Member
              </span>
            )}
            {user.role === 'creator' && (
              <Link to="/creator-dashboard" className="bg-deep-red text-gold px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 hover:scale-105 transition">
                <LayoutDashboard size={12} /> Creator Dashboard
              </Link>
            )}
          </div>
        </div>
        <button className="md:ml-auto bg-white/50 p-3 rounded-full hover:bg-white transition">
          <Settings size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subscription Card */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 space-y-6 bg-gradient-to-br from-gold/20 to-transparent border-gold/30">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Zap className="text-gold" /> Subscription
              </h2>
              <span className="text-[10px] font-bold uppercase bg-gold text-deep-red px-2 py-0.5 rounded">Active</span>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-deep-red/60">Current Plan</p>
              <p className="text-2xl font-bold">{user.plan} Plan</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-deep-red/60">Next billing date</span>
                <span className="font-bold">April 15, 2026</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-deep-red/60">Amount</span>
                <span className="font-bold">₹199/mo</span>
              </div>
            </div>

            <Link 
              to="/subscribe" 
              className="flex items-center justify-center gap-2 w-full py-3 bg-deep-red text-gold rounded-xl font-bold hover:scale-105 transition shadow-lg"
            >
              Manage Plan <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { icon: <Music />, title: "Saved Songs", count: 12 },
            { icon: <Video />, title: "My Uploads", count: 4 },
            { icon: <MessageSquare />, title: "Debates Joined", count: 8 },
            { icon: <Heart />, title: "Followed Creators", count: 25 },
          ].map((item, i) => (
            <div key={i} className="glass-card p-6 flex items-center gap-4 hover:scale-105 transition cursor-pointer">
              <div className="bg-deep-red text-gold p-3 rounded-xl">
                {item.icon}
              </div>
              <div>
                <p className="text-sm text-deep-red/60">{item.title}</p>
                <p className="text-xl font-bold">{item.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
