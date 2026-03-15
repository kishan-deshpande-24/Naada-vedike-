import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, ThumbsUp, MessageSquare, Users, TrendingUp, ArrowUpRight, Play, Loader2, CheckCircle2, AlertCircle, Clock, BarChart3, ChevronDown, ChevronUp, Eye, Share2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell } from 'recharts';

const data = [
  { name: 'Mon', views: 4000, likes: 2400, comments: 400 },
  { name: 'Tue', views: 3000, likes: 1398, comments: 300 },
  { name: 'Wed', views: 2000, likes: 9800, comments: 2000 },
  { name: 'Thu', views: 2780, likes: 3908, comments: 1200 },
  { name: 'Fri', views: 1890, likes: 4800, comments: 800 },
  { name: 'Sat', views: 2390, likes: 3800, comments: 600 },
  { name: 'Sun', views: 3490, likes: 4300, comments: 900 },
];

export default function CreatorDashboard() {
  const [expandedVideo, setExpandedVideo] = useState<number | null>(null);

  const stats = [
    { label: "Total Views", value: "1.2M", change: "+12%", icon: <Play /> },
    { label: "Subscribers", value: "45.2K", change: "+5%", icon: <Users /> },
    { label: "Total Likes", value: "890K", change: "+18%", icon: <ThumbsUp /> },
    { label: "Comments", value: "12.4K", change: "+2%", icon: <MessageSquare /> }
  ];

  const videos = [
    { id: 1, title: "Exploring Hampi Ruins", views: "450K", likes: "32K", comments: "1.2K", shares: "800", date: "2 days ago", status: 'Published' },
    { id: 2, title: "North Karnataka Food Tour", views: "210K", likes: "15K", comments: "800", shares: "450", date: "1 week ago", status: 'Published' },
    { id: 3, title: "Traditional Folk Dance", views: "120K", likes: "8K", comments: "450", shares: "200", date: "2 weeks ago", status: 'Published' },
    { id: 4, title: "Ilkal Saree Making Process", views: "0", likes: "0", comments: "0", shares: "0", date: "Just now", status: 'Uploading', progress: 65 },
    { id: 5, title: "Dharwad Pedha Secret Recipe", views: "0", likes: "0", comments: "0", shares: "0", date: "5 mins ago", status: 'Processing' },
    { id: 6, title: "Badami Cave Temples Vlog", views: "0", likes: "0", comments: "0", shares: "0", date: "10 mins ago", status: 'Failed' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Uploading': return <Loader2 className="animate-spin text-blue-500" size={16} />;
      case 'Processing': return <Clock className="text-gold" size={16} />;
      case 'Published': return <CheckCircle2 className="text-green-500" size={16} />;
      case 'Failed': return <AlertCircle className="text-red-500" size={16} />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Uploading': return 'text-blue-500 bg-blue-50';
      case 'Processing': return 'text-gold bg-gold/10';
      case 'Published': return 'text-green-600 bg-green-50';
      case 'Failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8 pb-24 px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">Creator Dashboard</h1>
          <p className="text-deep-red/60 text-sm">Manage your content and track performance</p>
        </div>
        <button className="w-full sm:w-auto bg-deep-red text-gold px-6 py-3 rounded-2xl font-bold hover:scale-105 transition shadow-lg flex items-center justify-center gap-2">
          <Video size={20} /> Upload Video
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4 sm:p-6 space-y-2 sm:space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="bg-deep-red/10 text-deep-red p-2 sm:p-3 rounded-xl">
                {stat.icon}
              </div>
              <span className="text-green-600 text-[10px] sm:text-xs font-bold flex items-center gap-1">
                {stat.change} <ArrowUpRight size={12} />
              </span>
            </div>
            <div>
              <p className="text-[10px] sm:text-sm text-deep-red/60 font-medium uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-4 sm:p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2">
              <TrendingUp size={20} className="text-gold" /> Viewership Trends
            </h3>
            <select className="bg-transparent text-xs font-bold text-deep-red/60 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B0000" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B0000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="views" stroke="#8B0000" fillOpacity={1} fill="url(#colorViews)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-4 sm:p-6 space-y-4">
          <h3 className="font-bold flex items-center gap-2">
            <BarChart3 size={20} className="text-gold" /> Engagement Breakdown
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: '12px' }}
                />
                <Bar dataKey="likes" fill="#FFD700" radius={[4, 4, 0, 0]} />
                <Bar dataKey="comments" fill="#8B0000" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Video Management */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 sm:p-6 border-b bg-white/50 flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
            <Video size={20} /> My Content
          </h2>
          <div className="flex gap-2">
            <button className="text-xs font-bold bg-deep-red/5 px-3 py-1 rounded-full">Recent</button>
            <button className="text-xs font-bold text-deep-red/40 px-3 py-1 rounded-full">Popular</button>
          </div>
        </div>
        <div className="divide-y divide-gold/10">
          {videos.map(video => (
            <div key={video.id} className="flex flex-col">
              <div 
                className="p-4 flex items-center justify-between hover:bg-white/20 transition cursor-pointer"
                onClick={() => setExpandedVideo(expandedVideo === video.id ? null : video.id)}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-16 sm:w-24 h-10 sm:h-14 bg-gray-200 rounded-xl overflow-hidden relative flex-shrink-0">
                    <img src={`https://picsum.photos/seed/vid${video.id}/100/60`} className="w-full h-full object-cover" alt="Thumb" />
                    {video.status === 'Uploading' && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Loader2 className="animate-spin text-white" size={16} />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm sm:text-base truncate max-w-[150px] sm:max-w-xs">{video.title}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] sm:text-xs text-deep-red/60">{video.date}</p>
                      <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold ${getStatusColor(video.status)}`}>
                        {getStatusIcon(video.status)}
                        {video.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-8">
                  <div className="hidden sm:block text-center">
                    <p className="font-bold">{video.views}</p>
                    <p className="text-[10px] text-deep-red/40 uppercase">Views</p>
                  </div>
                  {expandedVideo === video.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              <AnimatePresence>
                {expandedVideo === video.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-deep-red/5 border-t border-gold/10"
                  >
                    <div className="p-4 sm:p-6 space-y-6">
                      {video.status === 'Uploading' ? (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold text-blue-500">
                            <span>Uploading to servers...</span>
                            <span>{video.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${video.progress}%` }}
                              className="h-full bg-blue-500"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-white p-3 rounded-2xl shadow-sm space-y-1">
                              <p className="text-[10px] text-deep-red/40 uppercase font-bold">Views</p>
                              <p className="text-lg font-bold flex items-center gap-2"><Eye size={16} className="text-gold" /> {video.views}</p>
                            </div>
                            <div className="bg-white p-3 rounded-2xl shadow-sm space-y-1">
                              <p className="text-[10px] text-deep-red/40 uppercase font-bold">Likes</p>
                              <p className="text-lg font-bold flex items-center gap-2"><ThumbsUp size={16} className="text-gold" /> {video.likes}</p>
                            </div>
                            <div className="bg-white p-3 rounded-2xl shadow-sm space-y-1">
                              <p className="text-[10px] text-deep-red/40 uppercase font-bold">Comments</p>
                              <p className="text-lg font-bold flex items-center gap-2"><MessageSquare size={16} className="text-gold" /> {video.comments}</p>
                            </div>
                            <div className="bg-white p-3 rounded-2xl shadow-sm space-y-1">
                              <p className="text-[10px] text-deep-red/40 uppercase font-bold">Shares</p>
                              <p className="text-lg font-bold flex items-center gap-2"><Share2 size={16} className="text-gold" /> {video.shares}</p>
                            </div>
                          </div>
                          
                          <div className="h-40 w-full bg-white p-4 rounded-2xl shadow-sm">
                            <p className="text-xs font-bold mb-4 text-deep-red/60 uppercase">Engagement Over Time</p>
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={data.slice(0, 5)}>
                                <Line type="monotone" dataKey="likes" stroke="#FFD700" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="views" stroke="#8B0000" strokeWidth={2} dot={false} />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
