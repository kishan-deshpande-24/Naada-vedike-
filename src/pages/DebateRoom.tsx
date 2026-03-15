import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Users, Shield, Send, Mic, MicOff, UserMinus, Flag, Settings, Volume2, VolumeX, ArrowLeft } from 'lucide-react';
import { io } from 'socket.io-client';

const socket = io();

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const messageVariants = {
  initial: { opacity: 0, scale: 0.8, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } }
};

export default function DebateRoom() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [isModerator, setIsModerator] = useState(true);
  const [mutedUsers, setMutedUsers] = useState(new Set());
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentSpeaker, setCurrentSpeaker] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [seats, setSeats] = useState({});
  const chatEndRef = useRef(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (activeRoom) {
      socket.emit("join-debate", activeRoom.id);

      socket.on("receive-message", (data) => {
        setMessages(prev => [...prev, data]);
      });

      socket.on("speaker-changed", (socketId) => {
        setCurrentSpeaker(socketId);
        if (socketId === socket.id) {
          setIsSpeaking(true);
          startRecording();
        } else {
          setIsSpeaking(false);
          stopRecording();
        }
      });

      const mediaSource = new MediaSource();
      const audio = new Audio();
      audio.src = URL.createObjectURL(mediaSource);
      let sourceBuffer: SourceBuffer | null = null;
      const queue: ArrayBuffer[] = [];

      mediaSource.addEventListener('sourceopen', () => {
        sourceBuffer = mediaSource.addSourceBuffer('audio/webm; codecs=opus');
        sourceBuffer.addEventListener('updateend', () => {
          if (queue.length > 0 && sourceBuffer && !sourceBuffer.updating) {
            sourceBuffer.appendBuffer(queue.shift()!);
          }
        });
      });

      socket.on("receive-audio", async (data) => {
        // data: { userId, audioBlob }
        const arrayBuffer = await data.audioBlob.arrayBuffer();
        if (sourceBuffer && !sourceBuffer.updating) {
          sourceBuffer.appendBuffer(arrayBuffer);
          if (audio.paused) audio.play().catch(e => console.error("Playback error:", e));
        } else {
          queue.push(arrayBuffer);
        }
      });

      socket.on("seats-updated", (updatedSeats) => {
        setSeats(updatedSeats);
      });

      socket.on("user-muted", (userId) => {
        setMutedUsers(prev => new Set(prev).add(userId));
      });

      socket.on("user-unmuted", (userId) => {
        setMutedUsers(prev => {
          const next = new Set(prev);
          next.delete(userId);
          return next;
        });
      });

      return () => {
        socket.off("receive-message");
        socket.off("speaker-changed");
        socket.off("receive-audio");
        socket.off("user-muted");
        socket.off("user-unmuted");
        stopRecording();
      };
    }
  }, [activeRoom]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    const data = {
      roomId: activeRoom.id,
      message: input,
      user: "Me",
      team: "A"
    };
    socket.emit("send-message", data);
    setInput("");
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm; codecs=opus' });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && activeRoom) {
          socket.emit("audio-data", {
            roomId: activeRoom.id,
            audioBlob: event.data
          });
        }
      };

      mediaRecorder.start(200); // Send chunks every 200ms
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      mediaRecorderRef.current = null;
    }
  };

  const toggleSpeaking = () => {
    const isSeated = Object.values(seats).includes(socket.id);
    if (!isSeated) {
      alert("You must take a seat to speak!");
      return;
    }

    if (isSpeaking) {
      socket.emit("stop-speaking", activeRoom.id);
    } else {
      if (!currentSpeaker) {
        socket.emit("request-to-speak", activeRoom.id);
      }
    }
  };

  const handleTakeSeat = (seatIndex) => {
    socket.emit("take-seat", { roomId: activeRoom.id, seatIndex });
  };

  const handleLeaveSeat = () => {
    socket.emit("leave-seat", activeRoom.id);
  };

  const rooms = [
    { id: 1, topic: "Development vs Heritage Preservation in Hampi", participants: 18, teamA: "Pro", teamB: "Cons" },
    { id: 2, topic: "The Future of Agriculture in North Karnataka", participants: 12, teamA: "Modern Tech", teamB: "Traditional" },
    { id: 3, topic: "Promoting North Karnataka Tourism", participants: 24, teamA: "Global Focus", teamB: "Local Focus" }
  ];

  const RoundTable = () => {
    const members = [
      ...Array(5).fill(null).map((_, i) => ({ id: i, team: 'A', name: `Pro ${i+1}` })),
      ...Array(5).fill(null).map((_, i) => ({ id: i + 5, team: 'B', name: `Cons ${i+1}` }))
    ];

    return (
      <div className="relative w-full aspect-square max-w-[440px] mx-auto flex items-center justify-center">
        {/* The Table - Enhanced with texture and depth */}
        <motion.div 
          initial={{ scale: 0, rotate: -180, x: "-50%", y: "-50%" }}
          animate={{ scale: 1, rotate: 0, x: "-50%", y: "-50%" }}
          transition={{ type: "spring", damping: 15 }}
          className="absolute top-1/2 left-1/2 w-1/2 h-1/2 rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-8 border-gold/20 flex items-center justify-center z-10 overflow-hidden"
          style={{ 
            background: 'radial-gradient(circle at center, #8B4513 0%, #5D2E0A 100%)',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5), 0 20px 50px rgba(139,0,0,0.3)'
          }}
        >
          {/* Wood Grain Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-radial-gradient(circle, transparent, transparent 10px, rgba(0,0,0,0.2) 10px, rgba(0,0,0,0.2) 11px)' }} />
          
          <div className="relative z-10 text-gold font-bold text-[10px] md:text-xs text-center px-6 uppercase tracking-[0.2em] leading-tight drop-shadow-lg">
            {activeRoom.topic.split(' ').slice(0, 3).join(' ')}
            <div className="h-[2px] w-8 bg-gold/30 mx-auto mt-2 rounded-full" />
          </div>
          
          {/* Table Glow */}
          <div className="absolute inset-0 rounded-full bg-gold/5 blur-2xl animate-pulse" />
        </motion.div>

        {/* Decorative Floor Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full border border-gold/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] rounded-full border border-gold/5 pointer-events-none" />

        {/* Members */}
        {members.map((member, i) => {
          const angle = (i / members.length) * 2 * Math.PI;
          const radius = 36; // Adjusted radius to be closer to the table
          const xPos = Math.cos(angle) * radius;
          const yPos = Math.sin(angle) * radius;
          
          const occupantId = seats[member.id];
          const isUserSpeaking = currentSpeaker === occupantId;
          const isMe = occupantId === socket.id;

          return (
            <motion.div
              key={member.id}
              className="absolute z-20"
              style={{ 
                left: `${50 + xPos}%`, 
                top: `${50 + yPos}%`,
                x: "-50%",
                y: "-50%"
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: 0.5 + i * 0.05, 
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
            >
              <div className="relative flex flex-col items-center group">
                {isUserSpeaking && (
                  <>
                    <motion.div 
                      className="absolute inset-0 -m-3 rounded-full border-2 border-gold/30"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                    <motion.div 
                      className="absolute inset-0 -m-5 rounded-full border border-gold/10"
                      animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0, 0.2] }}
                      transition={{ repeat: Infinity, duration: 2.5 }}
                    />
                  </>
                )}
                <motion.button 
                  onClick={() => !occupantId && handleTakeSeat(member.id)}
                  whileHover={{ scale: occupantId ? 1.05 : 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all shadow-xl relative overflow-hidden ${
                    occupantId 
                      ? (member.team === 'A' ? 'border-blue-500 bg-blue-50' : 'border-red-500 bg-red-50')
                      : 'border-dashed border-gold/30 bg-white/5 hover:bg-gold/10'
                  } ${isUserSpeaking ? 'ring-4 ring-gold ring-offset-4 ring-offset-sand' : ''} ${isMe ? 'ring-2 ring-deep-red ring-offset-2' : ''}`}
                >
                  {occupantId ? (
                    <div className="flex flex-col items-center">
                      <Users size={24} className={member.team === 'A' ? 'text-blue-600' : 'text-red-600'} />
                      <div className={`absolute bottom-0 left-0 right-0 h-1 ${member.team === 'A' ? 'bg-blue-500' : 'bg-red-500'}`} />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-0.5 opacity-40">
                      <div className="w-1 h-1 bg-gold rounded-full" />
                      <span className="text-[7px] font-black text-gold uppercase tracking-tighter">Seat {member.id + 1}</span>
                    </div>
                  )}
                  
                  {isUserSpeaking && (
                    <motion.div 
                      className="absolute top-1 right-1 bg-gold rounded-full p-1 shadow-lg z-30"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <Volume2 size={10} className="text-deep-red animate-pulse" />
                    </motion.div>
                  )}
                </motion.button>
                <motion.div 
                  layout
                  className={`mt-2 px-3 py-0.5 rounded-full shadow-md whitespace-nowrap border ${
                    isMe 
                      ? 'bg-gold text-deep-red border-gold font-black' 
                      : occupantId 
                        ? 'bg-white text-deep-red border-gold/20 font-bold' 
                        : 'bg-black/20 text-gold/50 border-transparent text-[8px]'
                  } transition-all`}
                >
                  <span className="text-[9px] uppercase tracking-wider">
                    {isMe ? 'You' : occupantId ? `Debater ${member.id + 1}` : 'Available'}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <AnimatePresence mode="wait">
      {activeRoom ? (
        <motion.div 
          key="room"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          className="h-[88vh] flex flex-col gap-4"
        >
          <div className="flex justify-between items-center px-2">
            <motion.button 
              whileHover={{ x: -5 }}
              onClick={() => setActiveRoom(null)} 
              className="text-deep-red font-black flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white rounded-2xl transition-all shadow-sm border border-gold/20"
            >
              <ArrowLeft size={18} /> 
              <span className="text-sm uppercase tracking-widest">Exit Studio</span>
            </motion.button>
            <div className="flex gap-3">
              <div className="bg-deep-red text-gold px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-3 shadow-lg border border-gold/30">
                <div className="relative">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping absolute inset-0" />
                  <div className="w-2 h-2 bg-red-600 rounded-full relative" />
                </div>
                <span className="tracking-widest uppercase">{activeRoom.participants} Watching</span>
              </div>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
            {/* Left: Animation & Controls */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              <div className="glass-card flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden bg-gradient-to-br from-sand via-white/40 to-sand/80 border-2 border-gold/10">
                {/* Studio Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#8B0000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-sm rotate-45" />
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Affirmative</span>
                  </div>
                  <div className="h-[2px] w-24 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
                </div>
                
                <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em]">Opposition</span>
                    <div className="w-3 h-3 bg-red-500 rounded-sm rotate-45" />
                  </div>
                  <div className="h-[2px] w-24 bg-gradient-to-l from-red-500 to-transparent rounded-full" />
                </div>

                <RoundTable />

                <div className="mt-10 flex flex-col items-center gap-6 w-full max-w-2xl">
                  <div className="text-center space-y-2">
                    <motion.h2 
                      layoutId={`topic-${activeRoom.id}`}
                      className="text-2xl md:text-3xl font-black text-soil leading-tight tracking-tight px-4"
                    >
                      {activeRoom.topic}
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4">
                      <div className="h-[1px] w-12 bg-gold/30" />
                      <p className="text-[10px] font-black text-deep-red/40 uppercase tracking-[0.4em]">Live Studio Session</p>
                      <div className="h-[1px] w-12 bg-gold/30" />
                    </div>
                  </div>

                  <div className="flex items-center gap-10 bg-white/30 backdrop-blur-md p-6 rounded-[32px] border border-white/50 shadow-inner">
                    {Object.values(seats).includes(socket.id) && (
                      <motion.button 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={handleLeaveSeat}
                        className="bg-white/80 text-deep-red px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-sm border border-deep-red/10 active:scale-95"
                      >
                        Leave Seat
                      </motion.button>
                    )}
                    
                    <div className="relative">
                      {isSpeaking && (
                        <motion.div 
                          className="absolute inset-0 rounded-full bg-red-500/20"
                          animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                      )}
                      <motion.button 
                        whileHover={{ scale: 1.1, rotate: isSpeaking ? 0 : 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleSpeaking}
                        disabled={currentSpeaker && currentSpeaker !== socket.id}
                        className={`w-24 h-24 rounded-full flex flex-col items-center justify-center gap-1 transition-all shadow-2xl relative z-10 border-4 ${
                          isSpeaking 
                            ? 'bg-red-600 text-white border-white/20' 
                            : currentSpeaker 
                              ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                              : 'bg-gold text-deep-red border-white/20'
                        }`}
                      >
                        <div className="flex flex-col items-center">
                          {isSpeaking ? <MicOff size={32} /> : <Mic size={32} />}
                          <span className="text-[10px] font-black uppercase tracking-tighter mt-1">{isSpeaking ? 'Stop' : 'Talk'}</span>
                        </div>
                      </motion.button>
                    </div>
                    
                    <div className="flex flex-col gap-3 min-w-[160px]">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className={`w-3 h-3 rounded-full ${currentSpeaker ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
                          {currentSpeaker && <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-50" />}
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-deep-red">
                          {currentSpeaker ? 'Mic Active' : 'Floor Open'}
                        </span>
                      </div>
                      <AnimatePresence mode="wait">
                        {currentSpeaker ? (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-deep-red text-gold px-3 py-2 rounded-xl border border-gold/20 shadow-md"
                          >
                            <p className="text-[8px] font-black uppercase opacity-60 mb-0.5">Current Speaker</p>
                            <p className="text-[10px] font-black tracking-wider">
                              {currentSpeaker === socket.id ? 'YOU ARE LIVE' : 'DEBATER ' + (Object.keys(seats).find(k => seats[k] === currentSpeaker) || 'X')}
                            </p>
                          </motion.div>
                        ) : (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[9px] font-bold text-deep-red/40 italic"
                          >
                            Waiting for next speaker...
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Chat - Enhanced with better bubbles */}
            <div className="glass-card flex flex-col overflow-hidden bg-white/90 border-2 border-gold/10 shadow-2xl">
              <div className="p-5 border-b bg-soil text-gold flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare size={20} />
                  <h3 className="font-black text-xs uppercase tracking-[0.2em]">Live Feed</h3>
                </div>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
              <div className="flex-1 p-5 overflow-y-auto space-y-6 no-scrollbar bg-sand/5">
                <AnimatePresence initial={false}>
                  {messages.map((msg, i) => (
                    <motion.div 
                      key={i} 
                      variants={messageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className={`flex flex-col ${msg.user === 'Me' ? 'items-end' : 'items-start'}`}
                    >
                      <div className={`flex items-center gap-2 mb-1 px-2 ${msg.user === 'Me' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black ${msg.team === 'A' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'}`}>
                          {msg.user[0]}
                        </div>
                        <span className="text-[9px] font-black text-deep-red/40 uppercase tracking-tighter">{msg.user}</span>
                      </div>
                      <div className={`p-4 rounded-2xl text-xs max-w-[90%] shadow-md relative ${
                        msg.user === 'Me' 
                          ? 'bg-soil text-gold rounded-tr-none' 
                          : msg.team === 'A' 
                            ? 'bg-white text-blue-900 border-l-4 border-blue-500 rounded-tl-none' 
                            : 'bg-white text-red-900 border-r-4 border-red-500 rounded-tl-none'
                      }`}>
                        {msg.message}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {messages.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-deep-red/20 py-32"
                  >
                    <div className="relative inline-block">
                      <MessageSquare size={48} className="mx-auto mb-4 opacity-10" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-gold rounded-full animate-ping" />
                      </div>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em]">Awaiting Arguments</p>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>
              <div className="p-4 border-t bg-white flex gap-3">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="State your point..." 
                  className="flex-1 p-3 text-xs border-2 border-sand rounded-2xl focus:outline-none focus:ring-2 focus:ring-soil bg-sand/20 font-bold placeholder:text-deep-red/30" 
                />
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendMessage} 
                  className="bg-soil text-gold p-3 rounded-2xl shadow-xl hover:bg-deep-red transition-all"
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          key="list"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -20 }}
          className="space-y-8 pb-20"
        >
          <div className="flex justify-between items-center">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl font-bold text-soil">Debate Rooms</h1>
              <p className="text-deep-red/60">Join the conversation, shape the future.</p>
            </motion.div>
            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-soil text-gold px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-deep-red transition-colors"
            >
              Create Topic
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map(room => (
              <motion.div 
                key={room.id} 
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(139,0,0,0.1)" }}
                className="glass-card p-6 space-y-4 transition-all cursor-pointer group relative overflow-hidden" 
                onClick={() => setActiveRoom(room)}
              >
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <MessageSquare size={80} />
                </div>
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-1.5 h-1.5 bg-green-500 rounded-full"
                    />
                    {room.participants} Online
                  </div>
                  <div className="text-soil/20 group-hover:text-soil transition-colors">
                    <Shield size={24} />
                  </div>
                </div>

                <motion.h3 
                  layoutId={`topic-${room.id}`}
                  className="text-xl font-bold leading-tight group-hover:text-soil transition-colors relative z-10"
                >
                  {room.topic}
                </motion.h3>

                <div className="flex items-center gap-3 relative z-10">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <motion.div 
                        key={i} 
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                      >
                        <img src={`https://picsum.photos/seed/user${i}/24/24`} alt="User" />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-xs text-deep-red/40 font-medium">Joined by 10+ debaters</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gold/10 relative z-10">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-blue-600">Pro</span>
                    <span className="text-xs font-bold">{room.teamA}</span>
                  </div>
                  <span className="text-xs text-gray-300 italic">vs</span>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase font-bold text-red-600">Cons</span>
                    <span className="text-xs font-bold">{room.teamB}</span>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-soil text-gold py-3 rounded-2xl font-bold shadow-md group-hover:bg-deep-red transition-colors relative z-10"
                >
                  Enter Room
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
