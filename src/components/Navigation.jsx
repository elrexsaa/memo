import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Camera, 
  Video, 
  Music, 
  BookOpen, 
  Heart, 
  Lock,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home, color: 'text-rose-500' },
    { path: '/photos', label: 'Foto', icon: Camera, color: 'text-pink-500' },
    { path: '/videos', label: 'Video', icon: Video, color: 'text-purple-500' },
    { path: '/music', label: 'Lagu', icon: Music, color: 'text-indigo-500' },
    { path: '/notes', label: 'Catatan', icon: BookOpen, color: 'text-blue-500' },
    { path: '/memories', label: 'Kenangan', icon: Heart, color: 'text-red-500' },
    { path: '/admin', label: 'Admin', icon: Lock, color: 'text-amber-500' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="hidden md:flex fixed top-6 left-1/2 transform -translate-x-1/2 z-40"
      >
        <div className="flex items-center gap-2 px-6 py-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-pink-500/20 border border-pink-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`relative px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-pink-50 to-rose-50' : 'hover:bg-pink-50'}`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center"
                >
                  <div className="relative">
                    <Icon className={`w-5 h-5 ${item.color}`} />
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -top-1 -right-1"
                      >
                        <Sparkles className="w-3 h-3 text-yellow-500" />
                      </motion.div>
                    )}
                  </div>
                  <span className={`text-xs mt-1 font-medium ${isActive ? 'text-rose-600' : 'text-gray-600'}`}>
                    {item.label}
                  </span>
                </motion.div>

                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-t-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </NavLink>
            );
          })}
        </div>
      </motion.nav>

      {/* Mobile Navigation Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-6 right-6 z-50 p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl shadow-2xl shadow-pink-500/30"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="md:hidden fixed inset-y-0 right-0 z-40 w-64 bg-gradient-to-b from-pink-50 to-rose-50 backdrop-blur-xl border-l border-pink-200"
          >
            <div className="p-8">
              <div className="flex items-center gap-3 mb-10">
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    Elga & Nikita
                  </h2>
                  <p className="text-sm text-pink-600">Menu Navigasi</p>
                </div>
              </div>

              <div className="space-y-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${isActive ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg' : 'hover:bg-white/50 text-gray-700'}`}
                    >
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-white/80'}`}>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : item.color}`} />
                      </div>
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <Sparkles className="w-4 h-4 ml-auto text-yellow-300" />
                      )}
                    </NavLink>
                  );
                })}
              </div>

              <div className="mt-12 p-4 bg-white/50 rounded-xl">
                <p className="text-sm text-pink-600 text-center">
                  "Setiap klik adalah kenangan baru"
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
        />
      )}
    </>
  );
};

export default Navigation;
