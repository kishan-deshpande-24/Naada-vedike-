import React from 'react';
import { Check, X, AlertCircle, BarChart2, Users, FileText, MessageSquare } from 'lucide-react';

export default function AdminPanel() {
  const pendingApprovals = [
    { id: 1, type: "Video", title: "Hampi Drone View", creator: "Akash" },
    { id: 2, type: "Startup", title: "Dharwad Pedha Online", founder: "Suresh" },
    { id: 3, type: "Video", title: "Folk Dance Tutorial", creator: "Megha" }
  ];

  return (
    <div className="space-y-8 pb-20">
      <h1 className="text-4xl font-bold">Admin Panel</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: "12.5K", icon: <Users /> },
          { label: "Revenue", value: "₹45,000", icon: <BarChart2 /> },
          { label: "Active Debates", value: "18", icon: <MessageSquare /> },
          { label: "Pending Tasks", value: "3", icon: <AlertCircle /> }
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 space-y-2">
            <div className="text-deep-red/40">{stat.icon}</div>
            <p className="text-sm text-deep-red/60">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Approvals */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b bg-white/50 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FileText size={20} /> Pending Approvals
          </h2>
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">3 New</span>
        </div>
        <div className="divide-y divide-gold/10">
          {pendingApprovals.map(item => (
            <div key={item.id} className="p-4 flex items-center justify-between hover:bg-white/20 transition">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-gold/20 px-2 py-0.5 rounded text-deep-red">
                  {item.type}
                </span>
                <p className="font-bold">{item.title}</p>
                <p className="text-xs text-deep-red/60">Submitted by: {item.creator || item.founder}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition">
                  <Check size={20} />
                </button>
                <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">
                  <X size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
