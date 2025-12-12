import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Music } from 'lucide-react';

const CinematicIntro = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const sequences = [
      () => new Promise(resolve => setTimeout(() => {
        setStep(1);
        resolve();
      }, 1500)),
      () => new Promise(resolve => setTimeout(() => {
        setStep(2);
        resolve();
      }, 2000)),
      () => new Promise(resolve => setTimeout(() => {
        setShowContent(true);
        resolve();
      }, 1500)),
      () => new Promise(resolve => setTimeout(() => {
        onComplete();
        resolve();
      }, 3000)),
    ];

    sequences.reduce((promise, sequence) => 
      promise.then(sequence), Promise.resolve()
    );
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 z-50 overflow-hidden">
      {/* Animated Stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Cinematic Lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent" />

      <AnimatePresence>
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/4 left-0 right-0 text-center"
          >
            <Sparkles className="w-12 h-12 mx-auto text-yellow-300 mb-4" />
            <p className="text-rose-200 text-lg font-light tracking-widest">
              SEBUAH KISAH CINTA
            </p>
          </motion.div>
        )}

        {showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity 
              }}
              className="mb-8"
            >
              <Heart className="w-24 h-24 mx-auto fill-rose-500 text-rose-500" />
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                Elga
              </span>
              <span className="text-white mx-4">&</span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Nikita
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl text-rose-200 mb-12"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Sejak 1 November 2024
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center justify-center space-x-6"
            >
              <Music className="w-6 h-6 text-rose-300 animate-pulse" />
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
              <p className="text-rose-300 text-sm tracking-widest">MEMORIES</p>
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
              <Music className="w-6 h-6 text-pink-300 animate-pulse" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Bar */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"
        />
        <p className="text-center text-rose-300 text-sm mt-2">
          Memuat kenangan indah...
        </p>
      </div>
    </div>
  );
};

export default CinematicIntro;
