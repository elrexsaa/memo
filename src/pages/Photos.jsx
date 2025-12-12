import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Filter, Grid, List, Heart, Download, Share2, Calendar } from 'lucide-react';
import MemoryGallery from '../components/MemoryGallery';

const PhotosPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedYear, setSelectedYear] = useState('all');
  const [favorites, setFavorites] = useState(new Set());

  const photos = [
    {
      id: 1,
      type: 'photo',
      title: 'Momen Pertama',
      date: '01 Nov 2024',
      description: 'Hari pertama kita bersama',
      image: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      year: '2024',
      location: 'Restoran Romantis',
      tags: ['pertama', 'spesial']
    },
    {
      id: 2,
      type: 'photo',
      title: 'Senja Bersama',
      date: '05 Nov 2024',
      description: 'Menikmati matahari terbenam',
      image: 'https://images.unsplash.com/photo-1516487200032-8532cb603261?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      year: '2024',
      location: 'Pantai',
      tags: ['senja', 'romantis']
    },
    {
      id: 3,
      type: 'photo',
      title: 'Tertawa Bersama',
      date: '10 Nov 2024',
      description: 'Momen canda tawa yang tak terlupakan',
      image: 'https://images.unsplash.com/photo-1529254479751-fbacb4c7a587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      year: '2024',
      location: 'Taman Kota',
      tags: ['bahagia', 'canda']
    },
    {
      id: 4,
      type: 'photo',
      title: 'Kencan Malam',
      date: '15 Nov 2024',
      description: 'Malam yang penuh bintang',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      year: '2024',
      location: 'Rooftop',
      tags: ['malam', 'bintang']
    },
    {
      id: 5,
      type: 'photo',
      title: 'Liburan Pertama',
      date: '20 Nov 2024',
      description: 'Petualangan indah bersama',
      image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      year: '2024',
      location: 'Gunung',
      tags: ['liburan', 'petualangan']
    },
    {
      id: 6,
      type: 'photo',
      title: 'Momen Kejutan',
      date: '25 Nov 2024',
      description: 'Kejutan manis yang tak terlupakan',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      year: '2024',
      location: 'Kafe',
      tags: ['kejutan', 'manis']
    }
  ];

  const years = ['all', '2024', '2025'];
  const tags = ['semua', 'pertama', 'romantis', 'bahagia', 'liburan'];

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="pt-24 pb-20 px-4">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Galeri <span className="gradient-text">Foto Kenangan</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Setiap foto adalah cerita, setiap momen adalah kenangan. 
            Jelajahi koleksi foto spesial Elga & Nikita.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Foto', value: photos.length, color: 'from-pink-500 to-rose-500' },
            { label: 'Favorit', value: favorites.size, color: 'from-purple-500 to-pink-500' },
            { label: 'Tahun 2024', value: photos.filter(p => p.year === '2024').length, color: 'from-blue-500 to-purple-500' },
            { label: 'Lokasi', value: new Set(photos.map(p => p.location)).size, color: 'from-green-500 to-blue-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-xl`}
            >
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl ${viewMode === 'grid' ? 'bg-pink-100 text-pink-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl ${viewMode === 'list' ? 'bg-pink-100 text-pink-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex gap-2">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-full ${selectedYear === year ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {year === 'all' ? 'Semua Tahun' : year}
                </button>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-sm hover:bg-pink-100"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Grid/List */}
      <div className="max-w-6xl mx-auto">
        {viewMode === 'grid' ? (
          <MemoryGallery memories={photos} />
        ) : (
          <div className="space-y-6">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="flex">
                  <div className="w-64 h-64 flex-shrink-0">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{photo.title}</h3>
                        <div className="flex items-center gap-4 text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{photo.date}</span>
                          </div>
                          <span>•</span>
                          <span>{photo.location}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFavorite(photo.id)}
                        className="p-2 hover:bg-pink-50 rounded-lg"
                      >
                        <Heart className={`w-5 h-5 ${favorites.has(photo.id) ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`} />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-6">{photo.description}</p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100">
                        <Share2 className="w-4 h-4" />
                        Bagikan
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                        <Download className="w-4 h-4" />
                        Unduh
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Section (for admin) */}
      <div className="max-w-6xl mx-auto mt-20">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 text-white text-center">
          <Camera className="w-16 h-16 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">Ingin Menambah Kenangan?</h3>
          <p className="mb-8 max-w-2xl mx-auto">
            Login sebagai admin untuk menambahkan foto kenangan baru. 
            Setiap momen berharga patut untuk diabadikan.
          </p>
          <button className="px-8 py-3 bg-white text-pink-600 rounded-xl font-bold hover:bg-gray-100">
            Login sebagai Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotosPage;
