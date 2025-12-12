import React, { createContext, useState, useContext, useEffect } from 'react';
import { Heart, Camera, Video, Music, BookOpen } from 'lucide-react';

const MemoryContext = createContext();

export const useMemory = () => useContext(MemoryContext);

const initialMemories = {
  photos: [
    {
      id: 1,
      title: 'Momen Pertama',
      description: 'Hari pertama kita bersama',
      date: '2024-11-01',
      url: '/memories/foto-1.jpg',
      likes: 24,
      comments: 3,
      tags: ['pertama', 'spesial']
    }
  ],
  videos: [
    {
      id: 1,
      title: 'Video Jadian',
      description: 'Hari spesial kita',
      date: '2024-11-01',
      url: '/memories/video-1.mp4',
      duration: '2:45',
      views: 42
    }
  ],
  notes: [
    {
      id: 1,
      title: 'Surat Cinta Pertama',
      content: 'Hari ini adalah hari terindah...',
      date: '2024-11-01',
      isPrivate: false,
      favorite: true
    }
  ],
  music: [
    {
      id: 1,
      title: 'Lagu Kita',
      artist: 'Elga & Nikita',
      duration: '3:30',
      date: '2024-11-01'
    }
  ]
};

export const MemoryProvider = ({ children }) => {
  const [memories, setMemories] = useState(initialMemories);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Stats
  const stats = {
    totalPhotos: memories.photos.length,
    totalVideos: memories.videos.length,
    totalNotes: memories.notes.length,
    totalMusic: memories.music.length,
    totalMemories: memories.photos.length + memories.videos.length + memories.notes.length + memories.music.length,
    daysTogether: Math.floor((new Date() - new Date('2024-11-01')) / (1000 * 60 * 60 * 24))
  };

  // Add new memory
  const addMemory = (type, data) => {
    setMemories(prev => ({
      ...prev,
      [type]: [...prev[type], { id: Date.now(), ...data }]
    }));
  };

  // Update memory
  const updateMemory = (type, id, data) => {
    setMemories(prev => ({
      ...prev,
      [type]: prev[type].map(item => 
        item.id === id ? { ...item, ...data } : item
      )
    }));
  };

  // Delete memory
  const deleteMemory = (type, id) => {
    setMemories(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
  };

  // Toggle favorite
  const toggleFavorite = (type, id) => {
    const favIndex = favorites.findIndex(fav => fav.type === type && fav.id === id);
    
    if (favIndex > -1) {
      // Remove from favorites
      setFavorites(prev => prev.filter((_, index) => index !== favIndex));
    } else {
      // Add to favorites
      const memory = memories[type].find(item => item.id === id);
      if (memory) {
        setFavorites(prev => [...prev, { type, id, ...memory }]);
      }
    }
  };

  // Get memory by ID
  const getMemory = (type, id) => {
    return memories[type].find(item => item.id === id);
  };

  // Search memories
  const searchMemories = (query) => {
    const results = [];
    Object.keys(memories).forEach(type => {
      memories[type].forEach(item => {
        if (
          item.title?.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase()) ||
          item.content?.toLowerCase().includes(query.toLowerCase()) ||
          item.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        ) {
          results.push({ type, ...item });
        }
      });
    });
    return results;
  };

  // Get recent memories
  const getRecentMemories = (limit = 6) => {
    const allMemories = [];
    Object.keys(memories).forEach(type => {
      memories[type].forEach(item => {
        allMemories.push({
          type,
          date: item.date,
          ...item
        });
      });
    });
    
    return allMemories
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  };

  const value = {
    memories,
    favorites,
    stats,
    loading,
    addMemory,
    updateMemory,
    deleteMemory,
    toggleFavorite,
    getMemory,
    searchMemories,
    getRecentMemories
  };

  return (
    <MemoryContext.Provider value={value}>
      {children}
    </MemoryContext.Provider>
  );
};
