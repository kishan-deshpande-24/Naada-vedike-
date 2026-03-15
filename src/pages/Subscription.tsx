import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, ShieldCheck, Music, Video, MessageSquare, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';

const tiers = [
  {
    name: "Free",
    price: 0,
    priceDisplay: "₹0",
    description: "Explore the culture of North Karnataka",
    features: [
      "Access to public debate rooms",
      "Standard quality music streaming",
      "Follow your favorite creators",
      "Basic heritage directory access"
    ],
    buttonText: "Current Plan",
    highlight: false,
    icon: <Music className="text-deep-red" />
  },
  {
    name: "Pro",
    price: 199,
    priceDisplay: "₹199",
    period: "/month",
    description: "For the true culture enthusiasts",
    features: [
      "Ad-free music & video experience",
      "Lossless audio quality",
      "Exclusive creator content",
      "Priority in debate room queues",
      "Offline downloads"
    ],
    buttonText: "Upgrade to Pro",
    highlight: true,
    icon: <Zap className="text-gold" />
  },
  {
    name: "Patron",
    price: 499,
    priceDisplay: "₹499",
    period: "/month",
    description: "Support the preservation of our heritage",
    features: [
      "All Pro features included",
      "Direct support to local artists",
      "Patron badge on profile",
      "Early access to heritage tours",
      "Exclusive virtual meetups"
    ],
    buttonText: "Become a Patron",
    highlight: false,
    icon: <Crown className="text-gold" />
  }
];

export default function Subscription() {
  const [loading, setLoading] = useState<string | null>(null);

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (tier: typeof tiers[0]) => {
    if (tier.price === 0) return;
    
    setLoading(tier.name);
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setLoading(null);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const orderRes = await axios.post('/api/subscriptions/create-order', {
        planName: tier.name,
        amount: tier.price
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { amount, id: order_id, currency } = orderRes.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_YOUR_KEY_HERE",
        amount: amount.toString(),
        currency: currency,
        name: "Naada Vedike",
        description: `${tier.name} Subscription`,
        image: "/logo.svg",
        order_id: order_id,
        handler: async (response: any) => {
          try {
            const verifyRes = await axios.post('/api/subscriptions/verify', {
              ...response,
              planName: tier.name
            }, {
              headers: { Authorization: `Bearer ${token}` }
            });

            if (verifyRes.data.success) {
              alert("Subscription successful! Welcome to the premium community.");
              window.location.href = '/dashboard';
            }
          } catch (err) {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
        },
        theme: {
          color: "#8B0000",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert("Failed to initiate payment.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-12 pb-24">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-soil"
        >
          Choose Your Journey
        </motion.h1>
        <p className="text-deep-red/60 italic">
          Support the artists, creators, and heritage of North Karnataka while unlocking premium features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative glass-card p-8 flex flex-col h-full ${tier.highlight ? 'ring-2 ring-gold scale-105 z-10' : ''}`}
          >
            {tier.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-deep-red px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                Most Popular
              </div>
            )}

            <div className="space-y-6 flex-1">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-deep-red/5 rounded-2xl">
                  {tier.icon}
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">{tier.priceDisplay}</p>
                  <p className="text-xs text-deep-red/40 font-bold uppercase">{tier.period || 'forever'}</p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold">{tier.name}</h3>
                <p className="text-sm text-deep-red/60 mt-1">{tier.description}</p>
              </div>

              <ul className="space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <div className="mt-1 bg-green-500/10 p-0.5 rounded-full">
                      <Check size={14} className="text-green-600" />
                    </div>
                    <span className="text-deep-red/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => handlePayment(tier)}
              disabled={loading !== null || tier.price === 0}
              className={`mt-8 w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                tier.highlight 
                  ? 'bg-deep-red text-gold shadow-xl hover:scale-105' 
                  : tier.price === 0 
                    ? 'bg-gray-100 text-gray-400 cursor-default'
                    : 'bg-white/50 text-deep-red hover:bg-white'
              }`}
            >
              {loading === tier.name ? <Loader2 className="animate-spin" /> : tier.buttonText}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="max-w-4xl mx-auto pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="flex justify-center"><ShieldCheck className="text-gold" size={32} /></div>
            <h4 className="font-bold">Secure Payments</h4>
            <p className="text-xs text-deep-red/60">Encrypted transactions via local gateways</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-center"><Star className="text-gold" size={32} /></div>
            <h4 className="font-bold">Artist Support</h4>
            <p className="text-xs text-deep-red/60">70% of revenue goes directly to creators</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-center"><Zap className="text-gold" size={32} /></div>
            <h4 className="font-bold">Cancel Anytime</h4>
            <p className="text-xs text-deep-red/60">No long-term contracts or hidden fees</p>
          </div>
        </div>
      </div>
    </div>
  );
}
