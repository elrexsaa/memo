import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, MapPin, Gift, Star, Coffee, Plane, Home } from 'lucide-react';

const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const timelineEvents = [
    {
      id: 1,
      date: '01 Nov 2024',
      title: 'Awal Kisah Cinta',
      description: 'Hari pertama kami resmi menjadi pasangan. Semua dimulai dengan perasaan yang tulus dan hati yang berdebar.',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      location: 'Restoran Romantis',
      tags: ['Pertama Kali', 'Jadian', 'Spesial']
    },
    {
      id: 2,
      date: '15 Nov 2024',
      title: 'Kencan Pertama',
      description: 'Malam pertama kita pergi berdua saja. Bicara dari hati ke hati sampai larut malam.',
      icon: Coffee,
      color: 'from-purple-500 to-pink-500',
      location: 'Kafe Tepi Kota',
      tags: ['Kencan', 'Romantis', 'Malam Indah']
    },
    {
      id: 3,
      date: '01 Des 2024',
      title: 'Ulang Bulanan Pertama',
      description: 'Satu bulan bersama terasa seperti seminggu. Waktu begitu cepat ketika bahagia.',
      icon: Gift,
      color: 'from-blue-500 to-purple-500',
      location: 'Taman Bunga',
      tags: ['Ulang Bulanan', 'Hadiah', 'Celebration']
    },
    {
      id: 4,
      date: '15 Des 2024',
      title: 'Liburan Bersama',
      description: 'Petualangan pertama kita ke pantai. Matahari terbenam yang tak terlupakan.',
      icon: Plane,
      color: 'from-green-500 to-blue-500',
      location: 'Pantai Indah',
      tags: ['Liburan', 'Petualangan', 'Pantai']
    },
    {
      id: 5,
      date: '25 Des 2024',
      title: 'Natal Pertama',
      description: 'Merayakan Natal bersama keluarga besar. Momen berharga dengan orang-orang tercinta.',
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      location: 'Rumah Keluarga',
      tags: ['Natal', 'Keluarga', 'Perayaan']
    },
    {
      id: 6,
      date: '01 Jan 2025',
      title: 'Tahun Baru Bersama',
      description: 'Menyambut tahun baru dengan harapan dan cita-cita bersama. Janji untuk selalu bersama.',
      icon: Home,
      color: 'from-red-500 to-pink-500',
      location: 'Apartemen',
      tags: ['Tahun Baru', 'Janji', 'Harapan']
    }
  ];

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-pink-200 via-rose-200 to-purple-200 hidden lg:block" />

      {/* Timeline Events */}
      <div className="space-y-12">
        {timelineEvents.map((event, index) => {
          const Icon = event.icon;
          const isLeft = index % 2 === 0;
          
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative ${isLeft ? 'lg:pr-1/2 lg:pl-0' : 'lg:pl-1/2 lg:pr-0'}`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 z-10 hidden lg:block">
                <div className={`w-full h-full rounded-full bg-gradient-to-r ${event.color} border-4 border-white shadow-xl ${activeIndex === index ? 'scale-125' : ''} transition-transform duration-300`} />
              </div>

              {/* Event Card */}
              <div className={`
                relative bg-white rounded-2xl shadow-xl overflow-hidden
                ${isLeft ? 'lg:mr-12' : 'lg:ml-12'}
                hover:shadow-2xl transition-all duration-500
                ${activeIndex === index ? 'scale-105' : ''}
              `}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${event.color} opacity-5`} />

                {/* Card Content */}
                <div className="relative p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${event.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{event.date}</span>
                          <MapPin className="w-4 h-4 text-gray-400 ml-2" />
                          <span className="text-gray-600">{event.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Date Badge */}
                    <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${event.color} text-white text-sm font-bold`}>
                      {event.date.split(' ')[0]}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {event.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                    <div className={`w-full h-full bg-gradient-to-br ${event.color} rounded-full blur-2xl`} />
                  </div>

                  {/* Hover Indicator */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${event.color} transform scale-x-0 ${activeIndex === index ? 'scale-x-100' : ''} transition-transform duration-500`} />
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-pink-300 rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-rose-300 rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-pink-300 rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-rose-300 rounded-br-xl" />
              </div>

              {/* Connecting Line (Mobile) */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-pink-200 to-rose-200 lg:hidden" 
                style={{ top: '100%' }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Timeline End */}
      <div className="relative lg:hidden">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-6 bg-gradient-to-b from-purple-200 to-transparent" />
      </div>

      {/* Progress Indicator */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-4">
          <div className="text-sm text-gray-600">Perjalanan cinta kita</div>
          <div className="flex items-center gap-1">
            {timelineEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${activeIndex === index ? 'bg-pink-500 w-6' : 'bg-pink-200'}`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-600">
            {activeIndex + 1} / {timelineEvents.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
