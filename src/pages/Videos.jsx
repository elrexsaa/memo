import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Video, Play, Pause, Volume2, VolumeX, Maximize, Heart, Calendar, Clock } from 'lucide-react';

const VideosPage = () => {
  const [playingVideo, setPlayingVideo] = useState(null);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRefs = useRef({});

  const videos = [
    {
      id: 1,
      title: 'Momen Jadian',
      description: 'Video spesial hari pertama kita bersama',
      date: '01 Nov 2024',
      duration: '2:45',
      thumbnail: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 24,
      tags: ['spesial', 'pertama']
    },
    {
      id: 2,
      title: 'Liburan ke Pantai',
      description: 'Petualangan indah di tepi laut',
      date: '15 Nov 2024',
      duration: '4:20',
      thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 18,
      tags: ['liburan', 'pantai']
    },
    {
      id: 3,
      title: 'Kencan Malam',
      description: 'Malam romantis dengan cahaya lilin',
      date: '20 Nov 2024',
      duration: '3:15',
      thumbnail: 'https://images.unsplash.com/photo-1529254479751-fbacb4c7a587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 32,
      tags: ['romantis', 'malam']
    },
    {
      id: 4,
      title: 'Kejutan Ulang Bulan',
      description: 'Kejutan manis untuk ulang bulan pertama',
      date: '01 Des 2024',
      duration: '5:10',
      thumbnail: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 28,
      tags: ['kejutan', 'spesial']
    },
    {
      id: 5,
      title: 'Masak Bersama',
      description: 'Momen seru memasak makan malam',
      date: '10 Des 2024',
      duration: '6:30',
      thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 21,
      tags: ['masak', 'seru']
    },
    {
      id: 6,
      title: 'Hiking Pertama',
      description: 'Petualangan mendaki gunung bersama',
      date: '25 Des 2024',
      duration: '8:45',
      thumbnail: 'https://images.unsplash.com/photo-1516487200032-8532cb603261?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 19,
      tags: ['petualangan', 'hiking']
    }
  ];

  const handlePlayPause = (videoId) => {
    if (playingVideo === videoId) {
      videoRefs.current[videoId].pause();
      setPlayingVideo(null);
    } else {
      if (playingVideo) {
        videoRefs.current[playingVideo].pause();
      }
      videoRefs.current[videoId].play();
      setPlayingVideo(videoId);
    }
  };

  const handleTimeUpdate = (videoId) => {
    const video = videoRefs.current[videoId];
    if (video) {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (playingVideo) {
      videoRefs.current[playingVideo].volume = newVolume;
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
    if (playingVideo) {
      videoRefs.current[playingVideo].muted = !muted;
    }
  };

  const toggleFullscreen = (videoId) => {
    const video = videoRefs.current[videoId];
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
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
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Video <span className="gradient-text">Kenangan</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kenangan yang hidup dan bergerak. Setiap video adalah cerita yang bisa diputar ulang.
          </p>
        </motion.div>

        {/* Featured Video */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl"
        >
          <div className="aspect-video bg-gradient-to-br from-purple-900 to-pink-900 relative">
            {/* Video Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                  <Play className="w-12 h-12 text-white ml-2" />
                </div>
                <p className="text-white text-2xl font-bold">Video Spesial Elga & Nikita</p>
              </div>
            </div>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Video Unggulan</h3>
                  <p className="text-white/80">Kumpulan momen terbaik bulan ini</p>
                </div>
                <div className="flex items-center gap-4">
                  <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30">
                    <Heart className="w-6 h-6" />
                  </button>
                  <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30">
                    <Maximize className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-2/3" />
                </div>
                <div className="flex items-center justify-between mt-2 text-white/80 text-sm">
                  <span>2:15</span>
                  <span>3:30</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all">
                {/* Video Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => handlePlayPause(video.id)}
                      className="p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                    >
                      {playingVideo === video.id ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                      )}
                    </button>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white rounded-full text-sm">
                    {video.duration}
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg mb-2">{video.title}</h3>
                      <div className="flex items-center gap-4 text-gray-600 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{video.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{video.duration}</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-pink-50 rounded-lg">
                      <Heart className="w-5 h-5 text-gray-400 group-hover:text-pink-500" />
                    </button>
                  </div>

                  <p className="text-gray-600 mb-4">{video.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mt-6 pt-6 border-t">
                    <div className="text-sm text-gray-500">
                      {video.views} kali ditonton
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Maximize className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Video className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hidden Video Elements for Playback */}
        {videos.map((video) => (
          <video
            key={video.id}
            ref={(el) => videoRefs.current[video.id] = el}
            className="hidden"
            onTimeUpdate={() => handleTimeUpdate(video.id)}
            onEnded={() => setPlayingVideo(null)}
          >
            <source src={`/videos/${video.id}.mp4`} type="video/mp4" />
          </video>
        ))}
      </div>

      {/* Volume Control (Fixed) */}
      <div className="fixed bottom-24 right-6 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {muted ? (
              <VolumeX className="w-5 h-5 text-gray-600" />
            ) : (
              <Volume2 className="w-5 h-5 text-gray-600" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 accent-pink-500"
          />
        </div>
      </div>

      {/* Upload Section */}
      <div className="max-w-6xl mx-auto mt-20">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white text-center">
          <Video className="w-16 h-16 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">Ada Video Kenangan Baru?</h3>
          <p className="mb-8 max-w-2xl mx-auto">
            Bagikan momen spesial Anda melalui video. Login sebagai admin untuk mengupload video kenangan baru.
          </p>
          <button className="px-8 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100">
            Upload Video Baru
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
