/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import MusicPlayer from './components/MusicPlayer.tsx';
import Chatbot from './components/Chatbot.tsx';
import Home from './pages/Home.tsx';
import Music from './pages/Music.tsx';
import Creators from './pages/Creators.tsx';
import DebateRoom from './pages/DebateRoom.tsx';
import Heritage from './pages/Heritage.tsx';
import StartupDirectory from './pages/StartupDirectory.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import UserDashboard from './pages/UserDashboard.tsx';
import AdminPanel from './pages/AdminPanel.tsx';
import CreatorDashboard from './pages/CreatorDashboard.tsx';
import Subscription from './pages/Subscription.tsx';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        {/* Top Ilkal Border */}
        <div className="ilkal-border sticky top-0 z-[60]" />

        <div className="flex flex-1 relative">
          {/* Left Temple Pillar */}
          <div className="temple-pillar" />

          {/* Main Content */}
          <main className="flex-1 max-w-7xl mx-auto px-4 py-8 md:px-8">
            <Navbar />
            <div className="mt-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/music" element={<Music />} />
                <Route path="/creators" element={<Creators />} />
                <Route path="/debate" element={<DebateRoom />} />
                <Route path="/heritage" element={<Heritage />} />
                <Route path="/startups" element={<StartupDirectory />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/creator-dashboard" element={<CreatorDashboard />} />
                <Route path="/subscribe" element={<Subscription />} />
              </Routes>
            </div>
          </main>

          {/* Right Temple Pillar */}
          <div className="temple-pillar" />
        </div>

        {/* Bottom Ilkal Border */}
        <div className="ilkal-border mt-auto" />

        {/* Global Components */}
        <MusicPlayer />
        <Chatbot />
      </div>
    </Router>
  );
}
