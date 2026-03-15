import React, { useState } from 'react';
import { MapPin, Info, Filter } from 'lucide-react';

export default function Heritage() {
  const [filter, setFilter] = useState("All");
  const locations = ["All", "Hampi", "Badami", "Pattadakal", "Vijayapura", "Kalaburagi"];

  const sites = [
    { name: "Hampi", loc: "Vijayanagara", desc: "The capital of the Vijayanagara Empire, a UNESCO World Heritage site known for its stunning ruins and temples.", img: "https://picsum.photos/seed/hampi/600/400" },
    { name: "Badami", loc: "Bagalkot", desc: "Famous for its rock-cut structural temples and the beautiful Agastya Lake.", img: "https://picsum.photos/seed/badami/600/400" },
    { name: "Pattadakal", loc: "Bagalkot", desc: "A complex of 7th and 8th century CE Hindu and Jain temples, showcasing Chalukyan architecture.", img: "https://picsum.photos/seed/pattadakal/600/400" },
    { name: "Gol Gumbaz", loc: "Vijayapura", desc: "The tomb of Mohammed Adil Shah, featuring the second largest dome in the world.", img: "https://picsum.photos/seed/bijapur/600/400" },
    { name: "Kalaburagi Fort", loc: "Kalaburagi", desc: "A massive fort with 15 towers, representing the Bahmani Sultanate's architectural grandeur.", img: "https://picsum.photos/seed/gulbarga/600/400" }
  ];

  const filteredSites = filter === "All" ? sites : sites.filter(s => s.name === filter || s.loc === filter);

  return (
    <div className="space-y-12 pb-20">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold">Cultural Heritage</h1>
        <p className="text-deep-red/60 italic">Discover the timeless beauty and historical grandeur of North Karnataka.</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-2 text-deep-red/60">
          <Filter size={18} /> <span className="text-sm font-bold uppercase tracking-wider">Filter by Location:</span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {locations.map(loc => (
            <button 
              key={loc}
              onClick={() => setFilter(loc)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition ${filter === loc ? 'bg-gold text-deep-red shadow-md scale-105' : 'bg-white/50 text-deep-red hover:bg-white'}`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-16">
        {filteredSites.map((site, i) => (
          <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
            <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl h-[400px]">
              <img src={site.img} alt={site.name} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="flex items-center gap-2 text-gold font-bold">
                <MapPin size={20} /> {site.loc}
              </div>
              <h2 className="text-4xl font-bold">{site.name}</h2>
              <p className="text-lg leading-relaxed text-deep-red/80">{site.desc}</p>
              <button className="flex items-center gap-2 bg-deep-red text-gold px-8 py-3 rounded-full font-bold hover:scale-105 transition">
                <Info size={20} /> Learn More
              </button>
            </div>
          </div>
        ))}
        {filteredSites.length === 0 && (
          <div className="text-center py-20 bg-white/20 rounded-3xl">
            <p className="text-deep-red/60 italic">No heritage sites found for this location.</p>
          </div>
        )}
      </div>
    </div>
  );
}
