import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md p-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-deep-red/60">Join the cultural revolution of North Karnataka</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-deep-red/40" size={20} />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 border border-gold/20 focus:outline-none focus:border-gold"
                placeholder="Your Name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-deep-red/40" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 border border-gold/20 focus:outline-none focus:border-gold"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-deep-red/40" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 border border-gold/20 focus:outline-none focus:border-gold"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button className="w-full bg-deep-red text-gold py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition active:scale-95">
            Sign Up <ArrowRight size={20} />
          </button>
        </form>

        <p className="text-center text-sm">
          Already have an account? <Link to="/login" className="text-gold font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
