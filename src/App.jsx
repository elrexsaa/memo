import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Music, Camera, Video, BookOpen, Lock, Home, Star } from 'lucide-react';

// Import components yang SESUAI
import Navigation from './components/Navigation';
import CinematicIntro from './components/CinematicIntro';
import LoveCounter from './components/LoveCounter';

// Import pages
import HomePage from './pages/Home';
import PhotosPage from './pages/Photos';
import VideosPage from './pages/Videos';
import MusicPage from './pages/Music';
import NotesPage from './pages/Notes';
import AdminPage from './pages/Admin';

// Import styles
import './styles/main.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (showIntro) {
    return <CinematicIntro onComplete={() => setShowIntro(false)} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <Navigation />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/photos" element={<PhotosPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/music" element={<MusicPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route 
              path="/admin" 
              element={
                isAuthenticated ? <AdminPage /> : <Navigate to="/" />
              } 
            />
          </Routes>
        </AnimatePresence>

        <LoveCounter startDate="2024-11-01" />
      </div>
    </Router>
  );
}

export default App;
