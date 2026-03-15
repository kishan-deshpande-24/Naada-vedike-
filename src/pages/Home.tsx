import React from 'react';
import { motion } from 'framer-motion';
import { Play, Video, Users, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
        <img 
          src="https://picsum.photos/seed/hampi/1200/600" 
          alt="Hampi" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-red via-transparent to-transparent flex flex-col justify-end p-8 md:p-16">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Uttara Karnataka <br />
            <span className="text-gold">Samskrutiya Siri</span>
          </motion.h1>
          <p className="text-white/80 max-w-xl mb-8">
            Experience the rich heritage, music, and innovation of North Karnataka in one digital platform.
          </p>
          <div className="flex gap-4">
            <button className="bg-gold text-deep-red px-8 py-3 rounded-full font-bold hover:scale-105 transition">
              Explore Now
            </button>
            <button className="bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold hover:bg-white/30 transition">
              Join Debate
            </button>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-gold rounded-full"></span>
          Explore Our Culture
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Play />, title: "Music", desc: "Classical & Folk", color: "bg-blue-600", count: "1.2k+ Songs" },
            { icon: <Video />, title: "Creators", desc: "Local Talent", color: "bg-red-600", count: "450+ Artists" },
            { icon: <Users />, title: "Debate", desc: "Real-time Discussions", color: "bg-green-600", count: "12 Active Rooms" },
            { icon: <MapPin />, title: "Heritage", desc: "Historical Sites", color: "bg-orange-600", count: "85 Locations" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card p-5 flex flex-col items-center text-center gap-3 cursor-pointer group"
            >
              <div className={`${item.color} p-3 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform`}>
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-[10px] text-deep-red/60 uppercase font-bold tracking-wider">{item.desc}</p>
              </div>
              <div className="mt-2 px-3 py-1 bg-deep-red/5 rounded-full text-[10px] font-bold text-deep-red/40">
                {item.count}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending News/Events Section to fill space */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-gold rounded-full"></span>
            Trending in North Karnataka
          </h2>
          <div className="space-y-4">
            {[
              { title: "Hampi Utsav 2026: Dates Announced", date: "Mar 20, 2026", category: "Events", img: "https://picsum.photos/seed/hampi2/400/200" },
              { title: "The Rise of Hubli-Dharwad Startup Ecosystem", date: "Mar 18, 2026", category: "Startups", img: "https://picsum.photos/seed/hubli/400/200" }
            ].map((news, i) => (
              <div key={i} className="glass-card overflow-hidden flex flex-col sm:flex-row gap-4 group cursor-pointer">
                <div className="sm:w-48 h-32 overflow-hidden">
                  <img src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </div>
                <div className="p-4 flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-gold bg-deep-red px-2 py-0.5 rounded-full w-fit mb-2">{news.category}</span>
                  <h3 className="font-bold text-lg leading-tight mb-2">{news.title}</h3>
                  <p className="text-xs text-deep-red/60">{news.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-gold rounded-full"></span>
            Top Debaters
          </h2>
          <div className="glass-card p-6 space-y-4">
            {[1, 2, 3, 4].map(id => (
              <div key={id} className="flex items-center gap-3">
                <img src={`https://picsum.photos/seed/user${id}/40/40`} alt="User" className="w-10 h-10 rounded-full border-2 border-gold" />
                <div className="flex-1">
                  <p className="text-sm font-bold">Basavaraj K.</p>
                  <div className="w-full bg-gray-200 h-1 rounded-full mt-1">
                    <div className="bg-gold h-full rounded-full" style={{ width: `${90 - id * 10}%` }} />
                  </div>
                </div>
                <span className="text-xs font-bold text-gold">LVL {10 - id}</span>
              </div>
            ))}
            <button className="w-full mt-4 py-2 border-2 border-dashed border-gold/30 rounded-xl text-xs font-bold text-deep-red/40 hover:bg-gold/5 transition">
              View Leaderboard
            </button>
          </div>
        </div>
      </section>

      {/* Featured Songs */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-gold rounded-full"></span>
          Featured Songs
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <div key={id} className="min-w-[180px] glass-card p-4 group cursor-pointer hover:bg-white/40 transition-colors">
              <div className="relative overflow-hidden rounded-xl mb-3 aspect-square">
                <img src={`https://picsum.photos/seed/song${id}/200/200`} alt="Song" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <Play className="text-white" fill="white" />
                </div>
              </div>
              <p className="font-bold truncate text-sm">Janapada Geete {id}</p>
              <p className="text-[10px] text-deep-red/60 font-bold">Traditional Folk</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Creators Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="w-2 h-6 bg-gold rounded-full"></span>
            Rising Stars
          </h2>
          <button className="text-xs font-bold text-deep-red hover:text-gold transition">View All Creators</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <motion.div 
              key={id}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <div className="relative">
                <img src={`https://picsum.photos/seed/creator${id}/100/100`} alt="Creator" className="w-16 h-16 rounded-full border-2 border-gold shadow-md" />
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white" />
              </div>
              <p className="text-xs font-bold text-center">Artist {id}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
