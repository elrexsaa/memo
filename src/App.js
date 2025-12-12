import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Music, Camera, Video, BookOpen, Lock, Home, Star } from 'lucide-react';

// Components
import Navigation from './components/Navigation';
import CinematicIntro from './components/CinematicIntro';
import LoveCounter from './components/LoveCounter';

// Pages
import HomePage from './pages/Home';
import PhotosPage from './pages/Photos';
import VideosPage from './pages/Videos';
import MusicPage from './pages/Music';
import NotesPage from './pages/Notes';
import MemoriesPage from './pages/Memories';
import AdminPage from './pages/Admin';

// Context
import { MemoryProvider } from './contexts/MemoryContext';
import { AuthProvider } from './contexts/AuthContext';

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
    <AuthProvider>
      <MemoryProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-pink-300 rounded-full"
                  initial={{ y: -100, x: Math.random() * window.innerWidth }}
                  animate={{
                    y: window.innerHeight + 100,
                    x: Math.random() * window.innerWidth - 100,
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </div>

            <Navigation />
            
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/photos" element={<PhotosPage />} />
                <Route path="/videos" element={<VideosPage />} />
                <Route path="/music" element={<MusicPage />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/memories" element={<MemoriesPage />} />
                <Route 
                  path="/admin" 
                  element={
                    isAuthenticated ? <AdminPage /> : <Navigate to="/" />
                  } 
                />
              </Routes>
            </AnimatePresence>

            {/* Floating Love Counter */}
            <div className="fixed bottom-6 right-6 z-50">
              <LoveCounter startDate="2024-11-01" />
            </div>

            {/* Romantic Quote Footer */}
            <footer className="mt-20 py-8 px-4 text-center text-pink-600/70">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="max-w-2xl mx-auto"
              >
                <Heart className="w-6 h-6 mx-auto mb-4 animate-pulse" />
                <p className="text-lg italic font-light">
                  "Cinta kita bukan tentang berapa banyak hari telah berlalu, 
                  tetapi tentang setiap detik yang membuat kita semakin dekat."
                </p>
                <p className="mt-4 text-sm">— Elga & Nikita, sejak 1 November 2024 —</p>
              </motion.div>
            </footer>
          </div>
        </Router>
      </MemoryProvider>
    </AuthProvider>
  );
}

export default App;
