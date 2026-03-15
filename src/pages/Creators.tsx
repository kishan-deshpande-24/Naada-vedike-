import React from 'react';
import { Play, ThumbsUp, MessageSquare, Share2, UserPlus } from 'lucide-react';

export default function Creators() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Creators Hub</h1>
        <button className="bg-deep-red text-gold px-6 py-2 rounded-full font-bold hover:scale-105 transition">
          Upload Video
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Video Player Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative group">
            <img src="https://picsum.photos/seed/video/1200/800" className="w-full h-full object-cover opacity-80" alt="Video" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gold text-deep-red p-6 rounded-full scale-125 cursor-pointer hover:scale-150 transition">
                <Play size={32} fill="currentColor" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Exploring the Hidden Temples of Badami</h2>
            <div className="flex flex-wrap justify-between items-center gap-4 border-b border-gold/20 pb-4">
              <div className="flex items-center gap-3">
                <img src="https://picsum.photos/seed/user/50/50" className="rounded-full" alt="User" />
                <div>
                  <p className="font-bold">Karnataka Explorer</p>
                  <p className="text-xs text-deep-red/60">1.2M Subscribers</p>
                </div>
                <button className="bg-deep-red text-gold px-4 py-1.5 rounded-full text-sm font-bold ml-4 flex items-center gap-2">
                  <UserPlus size={16} /> Subscribe
                </button>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full hover:bg-white/80 transition">
                  <ThumbsUp size={18} /> 45K
                </button>
                <button className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full hover:bg-white/80 transition">
                  <Share2 size={18} /> Share
                </button>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Comments (1.2K)</h3>
            <div className="flex gap-4">
              <img src="https://picsum.photos/seed/me/40/40" className="rounded-full h-10 w-10" alt="Me" />
              <div className="flex-1 space-y-2">
                <input type="text" placeholder="Add a comment..." className="w-full bg-transparent border-b border-gold/30 p-2 focus:outline-none focus:border-gold" />
                <div className="flex justify-end">
                  <button className="bg-deep-red text-gold px-4 py-1.5 rounded-full text-sm">Comment</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Sidebar */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Recommended Videos</h3>
          {[1, 2, 3, 4, 5].map((id) => (
            <div key={id} className="flex gap-3 group cursor-pointer">
              <div className="w-40 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img src={`https://picsum.photos/seed/vid${id}/200/120`} className="w-full h-full object-cover group-hover:scale-110 transition" alt="Thumb" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-sm line-clamp-2">Traditional North Karnataka Cooking {id}</p>
                <p className="text-xs text-deep-red/60">Savi Ruchi</p>
                <p className="text-[10px] text-deep-red/40">120K views • 2 days ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
