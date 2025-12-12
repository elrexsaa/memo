import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Calendar, MapPin, Download, Share2, Maximize2 } from 'lucide-react';

const MemoryGallery = ({ memories }) => {
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredMemories = memories.filter(memory => {
    if (filter === 'all') return true;
    return memory.type === filter;
  });

  const handleImageClick = (memory) => {
    setSelectedMemory(memory);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedMemory(null);
    document.body.style.overflow = 'auto';
  };

  const downloadImage = (url, filename) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {['all', 'photo', 'video', 'note'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${filter === type 
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg' 
              : 'bg-white text-gray-600 hover:bg-pink-50'
            }`}
          >
            {type === 'all' && 'Semua'}
            {type === 'photo' && 'Foto'}
            {type === 'video' && 'Video'}
            {type === 'note' && 'Catatan'}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
        <AnimatePresence>
          {filteredMemories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05 }}
              layout
              className="memory-card mb-6 break-inside-avoid"
            >
              {/* Memory Card */}
              <div 
                className="relative overflow-hidden rounded-2xl cursor-pointer group"
                onClick={() => handleImageClick(memory)}
              >
                {/* Memory Content */}
                {memory.type === 'photo' && (
                  <div className="relative">
                    <img
                      src={memory.image}
                      alt={memory.title}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}

                {memory.type === 'video' && (
                  <div className="relative">
                    <div className="w-full h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                      <div className="relative">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1" />
                        </div>
                        <div className="absolute inset-0 bg-white/10 rounded-full animate-ping" />
                      </div>
                    </div>
                    {memory.thumbnail && (
                      <img
                        src={memory.thumbnail}
                        alt={memory.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                      />
                    )}
                  </div>
                )}

                {memory.type === 'note' && (
                  <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 flex flex-col justify-center">
                    <div className="text-5xl mb-4">{memory.icon || '💌'}</div>
                    <div className="text-2xl font-bold text-gray-800 mb-2">{memory.title}</div>
                    <p className="text-gray-600">{memory.description}</p>
                  </div>
                )}

                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{memory.title}</h3>
                      <p className="text-sm opacity-90">{memory.description}</p>
                    </div>
                    <Heart className="w-5 h-5 fill-white/20" />
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{memory.date}</span>
                    </div>
                    {memory.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{memory.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70"
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadImage(memory.image, `${memory.title}.jpg`);
                    }}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button 
                    className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageClick(memory);
                    }}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    memory.type === 'photo' ? 'bg-pink-500 text-white' :
                    memory.type === 'video' ? 'bg-purple-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {memory.type === 'photo' ? '📸 Foto' :
                     memory.type === 'video' ? '🎥 Video' : '📝 Catatan'}
                  </div>
                </div>
              </div>

              {/* Memory Footer */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800">{memory.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{memory.date}</p>
                  </div>
                  <button className="p-2 hover:bg-pink-50 rounded-lg transition-colors">
                    <Heart className="w-5 h-5 text-gray-400 hover:text-pink-500" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No Memories Message */}
      {filteredMemories.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center">
            <Heart className="w-12 h-12 text-pink-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Belum ada kenangan</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {filter === 'all' 
              ? 'Masih belum ada kenangan yang tersimpan. Mulai tambahkan kenangan indah Anda!' 
              : `Belum ada ${filter === 'photo' ? 'foto' : filter === 'video' ? 'video' : 'catatan'} kenangan.`}
          </p>
        </motion.div>
      )}

      {/* Modal for Selected Memory */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="absolute top-0 left-0 right-0 z-10 p-6 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent">
                <div className="text-white">
                  <h2 className="text-2xl font-bold">{selectedMemory.title}</h2>
                  <p className="text-white/80">{selectedMemory.date}</p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="max-h-[80vh] overflow-y-auto">
                {selectedMemory.type === 'photo' && (
                  <img
                    src={selectedMemory.image}
                    alt={selectedMemory.title}
                    className="w-full h-auto"
                  />
                )}

                {selectedMemory.type === 'video' && (
                  <div className="aspect-video bg-black">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                          <div className="w-0 h-0 border-t-12 border-b-12 border-l-20 border-transparent border-l-white ml-2" />
                        </div>
                        <p className="text-white text-xl">Video: {selectedMemory.title}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedMemory.type === 'note' && (
                  <div className="p-12 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-[400px] flex items-center justify-center">
                    <div className="max-w-2xl text-center">
                      <div className="text-8xl mb-8">{selectedMemory.icon || '💌'}</div>
                      <h3 className="text-4xl font-bold text-gray-800 mb-6">{selectedMemory.title}</h3>
                      <p className="text-xl text-gray-600 leading-relaxed">{selectedMemory.description}</p>
                    </div>
                  </div>
                )}

                {/* Memory Details */}
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-4">Detail Kenangan</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-600">{selectedMemory.date}</span>
                        </div>
                        {selectedMemory.location && (
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600">{selectedMemory.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-3">
                          <Heart className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-600">Kenangan spesial</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-800 mb-4">Deskripsi</h4>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedMemory.description || 'Kenangan indah yang tak terlupakan.'}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 mt-8 pt-8 border-t">
                    <button className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:shadow-lg transition-shadow">
                      <Heart className="w-5 h-5 inline mr-2" />
                      Simpan ke Favorit
                    </button>
                    <button className="flex-1 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                      <Share2 className="w-5 h-5 inline mr-2" />
                      Bagikan
                    </button>
                    {selectedMemory.type === 'photo' && (
                      <button 
                        onClick={() => downloadImage(selectedMemory.image, `${selectedMemory.title}.jpg`)}
                        className="flex-1 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                      >
                        <Download className="w-5 h-5 inline mr-2" />
                        Unduh
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MemoryGallery;
