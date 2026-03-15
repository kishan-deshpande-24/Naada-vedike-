import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Music, Video, MessageSquare, Map, Briefcase, User, LogIn, LayoutDashboard } from 'lucide-react';

const CulturalLogo = () => (
  <svg width="50" height="50" viewBox="0 0 100 100" className="fill-gold">
    {/* Stylized Stone Chariot Wheel (Hampi) */}
    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="4" />
    <circle cx="50" cy="50" r="8" fill="currentColor" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
      <rect 
        key={angle}
        x="48" y="15" width="4" height="25" 
        fill="currentColor" 
        transform={`rotate(${angle} 50 50)`} 
      />
    ))}
    {/* Outer decorative dots */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(angle => (
      <circle 
        key={angle}
        cx={50 + Math.cos(angle * Math.PI / 180) * 45}
        cy={50 + Math.sin(angle * Math.PI / 180) * 45}
        r="2"
        fill="currentColor"
      />
    ))}
  </svg>
);

export default function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/music', label: 'Music', icon: <Music size={20} /> },
    { path: '/creators', label: 'Creators', icon: <Video size={20} /> },
    { path: '/debate', label: 'Debate', icon: <MessageSquare size={20} /> },
    { path: '/heritage', label: 'Heritage', icon: <Map size={20} /> },
    { path: '/startups', label: 'Startups', icon: <Briefcase size={20} /> },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-deep-red text-gold p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-4 group">
            <CulturalLogo />
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight group-hover:text-white transition">Naada Vedike</span>
              <div className="flex items-center gap-2">
                <div className="h-[1px] w-4 bg-gold/50" />
                <span className="text-[10px] font-medium text-gold/80 uppercase tracking-[0.2em] whitespace-nowrap">
                  ಉತ್ತರ ಕರ್ನಾಟಕದ ಉಸಿರು
                </span>
                <div className="h-[1px] w-4 bg-gold/50" />
              </div>
            </div>
          </Link>
        </div>
        
        <div className="hidden md:flex gap-6 font-medium">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`hover:text-white transition ${isActive(item.path) ? 'text-white border-b-2 border-gold' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="hover:text-white transition">
            <LogIn size={20} />
          </Link>
          <Link to="/dashboard" className="hover:text-white transition">
            <User size={24} />
          </Link>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-deep-red text-gold border-t border-gold/20 z-[100] flex justify-around items-center h-16 px-2">
        {navItems.slice(0, 5).map(item => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`flex flex-col items-center gap-1 transition-all ${isActive(item.path) ? 'text-white scale-110' : 'opacity-60'}`}
          >
            {item.icon}
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </Link>
        ))}
        <Link 
          to="/dashboard" 
          className={`flex flex-col items-center gap-1 transition-all ${isActive('/dashboard') ? 'text-white scale-110' : 'opacity-60'}`}
        >
          <User size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
        </Link>
      </nav>
    </>
  );
}
