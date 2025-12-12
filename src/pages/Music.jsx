import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Music, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Heart, 
  ListMusic,
  Shuffle,
  Repeat,
  Clock,
  Calendar
} from 'lucide-react';

const MusicPage = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const audioRef = useRef(null);

  const songs = [
    {
      id: 1,
      title: 'Lagu Pertama Kita',
      artist: 'Elga & Nikita',
      album: 'Kenangan Awal',
      duration: '3:45',
      date: '01 Nov 2024',
      description: 'Lagu yang pertama kali kita dengar bersama',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 2,
      title: 'Melodi Cinta',
      artist: 'Elga & Nikita',
      album: 'Momen Spesial',
      duration: '4:20',
      date: '10 Nov 2024',
      description: 'Lagu yang selalu mengingatkan pada senyummu',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: 'Harmoni Bersama',
      artist: 'Elga & Nikita',
      album: 'Kebersamaan',
      duration: '3:15',
      date: '20 Nov 2024',
      description: 'Lagu yang menemani perjalanan kita',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 4,
      title: 'Ritme Hati',
      artist: 'Elga & Nikita',
      album: 'Perasaan',
      duration: '5:10',
      date: '01 Des 2024',
      description: 'Lagu yang menggambarkan perasaan kita',
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 5,
      title: 'Nada Kenangan',
      artist: 'Elga & Nikita',
      album: 'Memories',
      duration: '4:30',
      date: '15 Des 2024',
      description: 'Lagu yang membawa kita ke masa lalu',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 6,
      title: 'Symphony Cinta',
      artist: 'Elga & Nikita',
      album: 'Forever',
      duration: '6:00',
      date: '25 Des 2024',
      description: 'Lagu untuk masa depan kita',
      color: 'from-red-500 to-pink-500'
    }
  ];

  const favorites = [1, 3, 5];

  useEffect(() => {
    const audio = audioRef.current;
    
    const updateProgress = () => {
      if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        setProgress(progress);
        
        // Format current time
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60);
        setCurrentTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        
        // Format duration
        const durMinutes = Math.floor(audio.duration / 60);
        const durSeconds = Math.floor(audio.duration % 60);
        setDuration(`${durMinutes}:${durSeconds.toString().padStart(2, '0')}`);
      }
    };

    const handleEnded = () => {
      if (repeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextSong();
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [repeat]);

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    let nextIndex;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * songs.length);
      while (nextIndex === currentSong) {
        nextIndex = Math.floor(Math.random() * songs.length);
      }
    } else {
      nextIndex = (currentSong + 1) % songs.length;
    }
    setCurrentSong(nextIndex);
    setIsPlaying(true);
    
    // Simulate playing
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, 100);
  };

  const prevSong = () => {
    let prevIndex;
    if (shuffle) {
      prevIndex = Math.floor(Math.random() * songs.length);
      while (prevIndex === currentSong) {
        prevIndex = Math.floor(Math.random() * songs.length);
      }
    } else {
      prevIndex = (currentSong - 1 + songs.length) % songs.length;
    }
    setCurrentSong(prevIndex);
    setIsPlaying(true);
    
    // Simulate playing
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, 100);
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = offsetX / width;
    
    if (audioRef.current) {
      audioRef.current.currentTime = percentage * audioRef.current.duration;
      setProgress(percentage * 100);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="pt-24 pb-20 px-4">
      {/* Main Player Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
              <Music className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Lagu <span className="gradient-text">Kenangan</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Setiap lagu memiliki cerita, setiap nada membawa kenangan. 
            Dengarkan musik yang menemani perjalanan cinta Elga & Nikita.
          </p>
        </motion.div>

        {/* Now Playing Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12"
        >
          <div className="md:flex">
            {/* Album Art */}
            <div className={`md:w-2/5 bg-gradient-to-br ${songs[currentSong].color} p-12 flex items-center justify-center`}>
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-8 relative">
                  {/* Vinyl Record */}
                  <div className="absolute inset-0 rounded-full border-8 border-white/20 animate-spin-slow" />
                  <div className="absolute inset-4 rounded-full border-4 border-white/30 animate-spin-slow animation-delay-1000" />
                  <div className="absolute inset-8 rounded-full border-2 border-white/40 animate-spin-slow animation-delay-2000" />
                  
                  {/* Center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Music className="w-16 h-16 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white">{songs[currentSong].album}</h3>
                <p className="text-white/80">Album Kenangan</p>
              </div>
            </div>

            {/* Player Controls */}
            <div className="md:w-3/5 p-8 md:p-12">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">SEDANG DIPUTAR</div>
                    <h2 className="text-3xl font-bold text-gray-800">{songs[currentSong].title}</h2>
                    <p className="text-gray-600">{songs[currentSong].artist}</p>
                  </div>
                  <button className="p-3 hover:bg-pink-50 rounded-full">
                    <Heart className={`w-6 h-6 ${favorites.includes(songs[currentSong].id) ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`} />
                  </button>
                </div>

                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{songs[currentSong].date}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{songs[currentSong].duration}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div 
                  className="h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>{currentTime}</span>
                  <span>{duration}</span>
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShuffle(!shuffle)}
                    className={`p-3 rounded-full ${shuffle ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    <Shuffle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={prevSong}
                    className="p-3 text-gray-700 hover:bg-gray-100 rounded-full"
                  >
                    <SkipBack className="w-6 h-6" />
                  </button>
                </div>

                <button
                  onClick={playPause}
                  className="p-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:shadow-xl transition-shadow"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={nextSong}
                    className="p-3 text-gray-700 hover:bg-gray-100 rounded-full"
                  >
                    <SkipForward className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setRepeat(!repeat)}
                    className={`p-3 rounded-full ${repeat ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    <Repeat className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-gray-500" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 accent-blue-500"
                />
                <span className="text-sm text-gray-600 w-12">{Math.round(volume * 100)}%</span>
              </div>

              {/* Song Description */}
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <p className="text-gray-700">{songs[currentSong].description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Playlist */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Daftar Lagu</h2>
            <p className="text-gray-600">{songs.length} lagu kenangan</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ListMusic className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-gray-500">|</span>
            <span className="text-sm text-gray-600">
              {favorites.length} lagu favorit
            </span>
          </div>
        </div>

        {/* Songs List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-6 text-gray-500 font-medium">#</th>
                  <th className="text-left p-6 text-gray-500 font-medium">Judul Lagu</th>
                  <th className="text-left p-6 text-gray-500 font-medium">Album</th>
                  <th className="text-left p-6 text-gray-500 font-medium">Tanggal</th>
                  <th className="text-left p-6 text-gray-500 font-medium">Durasi</th>
                  <th className="text-left p-6 text-gray-500 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {songs.map((song, index) => (
                  <motion.tr
                    key={song.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border-b hover:bg-gray-50 cursor-pointer ${currentSong === index ? 'bg-blue-50' : ''}`}
                    onClick={() => {
                      setCurrentSong(index);
                      setIsPlaying(true);
                    }}
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600">{index + 1}</span>
                        {currentSong === index && isPlaying ? (
                          <div className="loading-wave">
                            {[...Array(4)].map((_, i) => (
                              <div key={i} className="loading-bar" />
                            ))}
                          </div>
                        ) : (
                          <Play className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </td>
                    <td className="p-6">
                      <div>
                        <div className="font-medium text-gray-800">{song.title}</div>
                        <div className="text-sm text-gray-600">{song.artist}</div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="text-gray-700">{song.album}</div>
                    </td>
                    <td className="p-6">
                      <div className="text-gray-700">{song.date}</div>
                    </td>
                    <td className="p-6">
                      <div className="text-gray-700">{song.duration}</div>
                    </td>
                    <td className="p-6">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Heart className={`w-5 h-5 ${favorites.includes(song.id) ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Lagu Favorit</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {songs.filter(song => favorites.includes(song.id)).map((song) => (
              <div
                key={song.id}
                className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${song.color}`}>
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{song.title}</h4>
                    <p className="text-sm text-gray-600">{song.artist}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4">{song.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{song.date}</span>
                  <Heart className="w-5 h-5 fill-pink-500 text-pink-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={`/music/${songs[currentSong].id}.mp3`}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Upload Section */}
      <div className="max-w-6xl mx-auto mt-20">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-8 text-white text-center">
          <Music className="w-16 h-16 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">Ingin Menambah Lagu?</h3>
          <p className="mb-8 max-w-2xl mx-auto">
            Setiap lagu memiliki cerita sendiri. Login sebagai admin untuk menambahkan lagu kenangan baru.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100">
            Tambah Lagu Baru
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
