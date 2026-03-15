import React, { useState } from 'react';
import { Search, MapPin, ExternalLink, Phone } from 'lucide-react';

export default function StartupDirectory() {
  const [filter, setFilter] = useState("All");
  const districts = ["All", "Dharwad", "Belagavi", "Hubballi", "Kalaburagi", "Vijayapura"];

  const startups = [
    { id: 1, name: "AgroTech Hub", founder: "Kiran Patil", district: "Dharwad", desc: "Smart irrigation solutions for local farmers.", category: "AgriTech" },
    { id: 2, name: "Saree Digital", founder: "Deepa Hegde", district: "Belagavi", desc: "E-commerce platform for Ilkal and Handloom sarees.", category: "E-commerce" },
    { id: 3, name: "North Foodies", founder: "Ravi Kumar", district: "Hubballi", desc: "Cloud kitchen delivering authentic North Karnataka meals.", category: "FoodTech" },
    { id: 4, name: "Heritage VR", founder: "Anil Deshpande", district: "Vijayapura", desc: "Virtual reality tours of historical sites.", category: "EdTech" }
  ];

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-4xl font-bold">Startup Directory</h1>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2">
          {districts.map(d => (
            <button 
              key={d}
              onClick={() => setFilter(d)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${filter === d ? 'bg-gold text-deep-red' : 'bg-white/50 text-deep-red hover:bg-white'}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.filter(s => filter === "All" || s.district === filter).map(startup => (
          <div key={startup.id} className="glass-card p-6 space-y-4 flex flex-col">
            <div className="flex justify-between items-start">
              <div className="bg-gold/20 text-deep-red px-3 py-1 rounded-full text-xs font-bold">
                {startup.category}
              </div>
              <MapPin size={18} className="text-gold" />
            </div>
            
            <div className="flex-1 space-y-2">
              <h3 className="text-2xl font-bold">{startup.name}</h3>
              <p className="text-sm font-medium text-deep-red/80">Founder: {startup.founder}</p>
              <p className="text-xs text-deep-red/60 italic">{startup.district}, Karnataka</p>
              <p className="text-sm leading-relaxed">{startup.desc}</p>
            </div>

            <div className="pt-4 flex gap-2">
              <button className="flex-1 bg-deep-red text-gold py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                <ExternalLink size={16} /> Website
              </button>
              <button className="p-2 border border-deep-red/20 rounded-xl hover:bg-white transition">
                <Phone size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
