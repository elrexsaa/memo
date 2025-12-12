import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Clock, Sparkles } from 'lucide-react';
import { format, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';

const LoveCounter = ({ startDate }) => {
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate);
      const now = new Date();
      
      const days = differenceInDays(now, start);
      const hours = differenceInHours(now, start) % 24;
      const minutes = differenceInMinutes(now, start) % 60;
      const seconds = Math.floor((now.getTime() - start.getTime()) / 1000) % 60;

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  const anniversaryDate = format(new Date(startDate), 'dd MMMM yyyy');

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      className="relative group"
    >
      <div className="relative bg-gradient-to-br from-white to-pink-50 rounded-2xl p-6 shadow-2xl shadow-pink-500/20 border border-pink-200">
        {/* Decorative Elements */}
        <div className="absolute -top-2 -right-2">
          <Sparkles className="w-5 h-5 text-yellow-500 animate-spin-slow" />
        </div>
        
        <div className="absolute -bottom-2 -left-2">
          <Heart className="w-4 h-4 text-rose-400 animate-pulse" />
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Hari Bersama</h3>
            <p className="text-sm text-pink-600">Sejak {anniversaryDate}</p>
          </div>
        </div>

        {/* Time Display */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-pink-50 rounded-xl">
            <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              {timeTogether.days}
            </div>
            <div className="text-xs text-gray-600 mt-1">Hari</div>
          </div>
          
          <div className="text-center p-3 bg-rose-50 rounded-xl">
            <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
              {timeTogether.hours}
            </div>
            <div className="text-xs text-gray-600 mt-1">Jam</div>
          </div>
          
          <div className="text-center p-3 bg-pink-50 rounded-xl">
            <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              {timeTogether.minutes}
            </div>
            <div className="text-xs text-gray-600 mt-1">Menit</div>
          </div>
          
          <div className="text-center p-3 bg-rose-50 rounded-xl">
            <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
              {timeTogether.seconds}
            </div>
            <div className="text-xs text-gray-600 mt-1">Detik</div>
          </div>
        </div>

        {/* Real-time Indicator */}
        <div className="flex items-center justify-center gap-2 text-sm text-pink-600">
          <Clock className="w-4 h-4" />
          <span>Real-time update</span>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(timeTogether.seconds / 60) * 100}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
            />
          </div>
          <p className="text-xs text-center text-gray-500 mt-2">
            Setiap detik berarti ❤️
          </p>
        </div>

        {/* Hover Effect - Hidden Message */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <p className="text-pink-600 font-semibold text-sm">
            Semakin lama semakin cinta
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoveCounter;
