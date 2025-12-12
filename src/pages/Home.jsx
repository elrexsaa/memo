import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Camera, 
  Video, 
  Music, 
  BookOpen, 
  Sparkles, 
  ArrowRight,
  Quote
} from 'lucide-react';

import MemoryGallery from '../components/MemoryGallery';
import Timeline from '../components/Timeline';

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('story');

  const featuredMemories = [
    {
      id: 1,
      type: 'photo',
      title: 'Pertama Kali Ketemu',
      date: '01 Nov 2024',
      description: 'Hari dimana semuanya dimulai',
      image: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      type: 'video',
      title: 'Liburan Pertama',
      date: '15 Des 2024',
      description: 'Petualangan indah bersama',
      thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      type: 'note',
      title: 'Surat Cinta Pertama',
      date: '20 Des 2024',
      description: 'Kata-kata yang tak terlupakan',
      icon: '❤️'
    }
  ];

  const loveQuotes = [
    "Cintamu membuat setiap hari terasa seperti mimpi indah",
    "Bersamamu, setiap momen menjadi kenangan terindah",
    "Kamu adalah jawaban dari semua doaku",
    "Cinta kita tumbuh lebih kuat setiap harinya"
  ];

  return (
    <div className="relative pt-24 pb-20 px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mb-20"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="inline-block mb-6"
          >
            <div className="p-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl shadow-2xl shadow-pink-500/30">
              <Heart className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 bg-clip-text text-transparent">
              Kisah Cinta
            </span>
            <br />
            <span className="text-gray-800">Elga & Nikita</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Sebuah perjalanan indah yang dimulai pada 1 November 2024. 
            Setiap momen bersama adalah harta yang tak ternilai.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Camera, value: '24+', label: 'Foto Indah' },
              { icon: Video, value: '8+', label: 'Video Kenangan' },
              { icon: BookOpen, value: '12+', label: 'Catatan Cinta' },
              { icon: Music, value: '5+', label: 'Lagu Spesial' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100"
              >
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <stat.icon className="w-6 h-6 text-pink-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Memories */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Kenangan Unggulan</h2>
              <p className="text-gray-600">Momen-momen spesial yang selalu dikenang</p>
            </div>
            <Link
              to="/memories"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg hover:shadow-pink-500/30 transition-all"
            >
              Lihat Semua
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <MemoryGallery memories={featuredMemories} />
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <h2 className="text-3xl font-bold text-gray-800">Lini Masa Cinta</h2>
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="text-gray-600">Setiap babak dalam perjalanan indah kita</p>
          </div>

          <Timeline />
        </div>
      </motion.section>

      {/* Love Quotes Carousel */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 shadow-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(20)].map((_, i) => (
                <Heart
                  key={i}
                  className="absolute w-8 h-8"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 360}deg)`
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Quote className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Kata-kata Cinta</h3>
              </div>

              <div className="space-y-6">
                {loveQuotes.map((quote, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                  >
                    <p className="text-white text-lg italic">"{quote}"</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full" />
                        <span className="text-white/80 text-sm">Elga & Nikita</span>
                      </div>
                      <Heart className="w-5 h-5 text-white/60 fill-white/20" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quick Access Cards */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Jelajahi Kenangan Kita
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Galeri Foto',
                description: 'Momen indah yang tertangkap kamera',
                icon: Camera,
                color: 'from-pink-500 to-rose-500',
                link: '/photos'
              },
              {
                title: 'Video Kenangan',
                description: 'Kenangan hidup yang bergerak',
                icon: Video,
                color: 'from-purple-500 to-pink-500',
                link: '/videos'
              },
              {
                title: 'Lagu Kita',
                description: 'Melodi yang menemani cinta kita',
                icon: Music,
                color: 'from-blue-500 to-purple-500',
                link: '/music'
              },
              {
                title: 'Catatan Cinta',
                description: 'Kata-kata dari hati ke hati',
                icon: BookOpen,
                color: 'from-rose-500 to-red-500',
                link: '/notes'
              }
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link
                  to={card.link}
                  className={`block bg-gradient-to-br ${card.color} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-white/20 rounded-xl">
                      <card.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{card.title}</h3>
                  </div>
                  <p className="text-white/90 mb-6">{card.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">Klik untuk melihat</span>
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
