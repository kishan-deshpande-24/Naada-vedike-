import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Music, Video, MessageSquare, Briefcase } from 'lucide-react';

export default function BottomNavigation() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-deep-red text-gold flex justify-around p-3 border-t border-gold/30 z-50">
      <NavLink to="/" className={({ isActive }) => isActive ? "text-white scale-110" : "opacity-70"}>
        <Home size={24} />
      </NavLink>
      <NavLink to="/music" className={({ isActive }) => isActive ? "text-white scale-110" : "opacity-70"}>
        <Music size={24} />
      </NavLink>
      <NavLink to="/creators" className={({ isActive }) => isActive ? "text-white scale-110" : "opacity-70"}>
        <Video size={24} />
      </NavLink>
      <NavLink to="/debate" className={({ isActive }) => isActive ? "text-white scale-110" : "opacity-70"}>
        <MessageSquare size={24} />
      </NavLink>
      <NavLink to="/startups" className={({ isActive }) => isActive ? "text-white scale-110" : "opacity-70"}>
        <Briefcase size={24} />
      </NavLink>
    </div>
  );
}
