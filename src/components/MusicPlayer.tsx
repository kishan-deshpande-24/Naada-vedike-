import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, ChevronDown, ChevronUp, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ 
        height: isCollapsed ? '48px' : 'auto',
        y: isPlaying ? 0 : 200
      }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl text-white border-t border-white/10 z-40 overflow-hidden shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Song Info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative group">
              <img 
                src="https://picsum.photos/seed/song/50/50" 
                alt="Song" 
                className={`rounded-lg transition-all duration-500 ${isCollapsed ? 'w-8 h-8' : 'w-12 h-12'}`} 
              />
              {isPlaying && !isCollapsed && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                  <div className="flex gap-0.5 items-end h-4">
                    <motion.div animate={{ height: [4, 12, 6, 10] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-gold" />
                    <motion.div animate={{ height: [8, 4, 12, 6] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-gold" />
                    <motion.div animate={{ height: [6, 10, 4, 12] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-gold" />
                  </div>
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className={`font-bold truncate transition-all ${isCollapsed ? 'text-xs' : 'text-sm'}`}>Mallige Hoovu</p>
              {!isCollapsed && <p className="text-xs text-gray-400 truncate">Classical Folk • North Karnataka</p>}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 md:gap-8">
            {!isCollapsed && (
              <div className="hidden sm:flex items-center gap-6">
                <SkipBack size={18} className="cursor-pointer hover:text-gold transition-colors" />
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-gold text-deep-red p-2.5 rounded-full hover:scale-110 active:scale-95 transition shadow-lg"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
                </button>
                <SkipForward size={18} className="cursor-pointer hover:text-gold transition-colors" />
              </div>
            )}

            {/* Mobile Play/Pause when collapsed */}
            {isCollapsed && (
              <button 
                onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                className="text-gold p-1"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
              </button>
            )}

            <div className="flex items-center gap-4">
              {!isCollapsed && (
                <div className="hidden md:flex items-center gap-3 w-32">
                  <Volume2 size={18} className="text-gray-400" />
                  <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '60%' }}
                      className="h-full bg-gold" 
                    />
                  </div>
                </div>
              )}
              
              <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                title={isCollapsed ? "Expand" : "Collapse"}
              >
                {isCollapsed ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar (Only visible when expanded) */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3"
            >
              <div className="flex items-center gap-3 text-[10px] font-mono text-gray-400">
                <span>1:24</span>
                <div className="relative flex-1 h-1 bg-white/10 rounded-full cursor-pointer group">
                  <div className="absolute top-0 left-0 h-full bg-gold rounded-full w-[40%] group-hover:bg-white transition-colors" />
                  <div className="absolute top-1/2 left-[40%] -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span>3:45</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
