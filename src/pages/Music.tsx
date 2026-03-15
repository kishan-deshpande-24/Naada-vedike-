import React from 'react';
import { Search, Play, Heart, Download, MoreVertical } from 'lucide-react';

export default function Music() {
  return (
    <div className="space-y-8 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-4xl font-bold">Music Platform</h1>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-deep-red/40" size={20} />
          <input 
            type="text" 
            placeholder="Search songs, artists..." 
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white/50 border border-gold/20 focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Playlists */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold">Recommended for You</h2>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <div key={id} className="flex items-center justify-between p-3 hover:bg-white/40 rounded-xl transition group cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className="text-deep-red/40 w-4">{id}</span>
                  <img src={`https://picsum.photos/seed/music${id}/50/50`} className="rounded-md" alt="Thumb" />
                  <div>
                    <p className="font-bold">North Karnataka Folk {id}</p>
                    <p className="text-xs text-deep-red/60">Basavaraj Rajguru</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition">
                  <Heart size={18} className="hover:text-red-500" />
                  <Download size={18} className="hover:text-gold" />
                  <MoreVertical size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Top Artists</h2>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((id) => (
              <div key={id} className="glass-card p-4 text-center space-y-2">
                <img src={`https://picsum.photos/seed/artist${id}/100/100`} className="rounded-full mx-auto" alt="Artist" />
                <p className="font-bold text-sm">Artist Name {id}</p>
                <button className="text-xs bg-deep-red text-gold px-3 py-1 rounded-full">Follow</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
