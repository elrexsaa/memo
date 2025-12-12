import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Heart, 
  Edit, 
  Trash2, 
  Calendar, 
  Lock, 
  Unlock, 
  Plus,
  Search,
  Filter,
  Star,
  Mail,
  Paperclip
} from 'lucide-react';

const NotesPage = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Surat Cinta Pertama',
      content: 'Hari ini adalah hari yang paling bahagia dalam hidupku. Memiliki kamu sebagai pasangan membuat setiap detik berarti. Aku berjanji akan selalu menyayangimu sepenuh hati.',
      date: '01 Nov 2024',
      color: 'bg-gradient-to-br from-pink-50 to-rose-50',
      border: 'border-pink-200',
      isPrivate: false,
      tags: ['cinta', 'pertama', 'janji'],
      favorite: true
    },
    {
      id: 2,
      title: 'Kenangan Senja',
      content: 'Saat matahari terbenam bersamamu, aku menyadari bahwa kebahagiaan sejati adalah saat kita bersama. Senja itu mengajarkan bahwa akhir yang indah akan selalu datang.',
      date: '05 Nov 2024',
      color: 'bg-gradient-to-br from-orange-50 to-yellow-50',
      border: 'border-orange-200',
      isPrivate: true,
      tags: ['senja', 'bahagia', 'bersama'],
      favorite: true
    },
    {
      id: 3,
      title: 'Janji di Bawah Bintang',
      content: 'Di bawah langit bertabur bintang, kita berjanji untuk selalu bersama. Bintang-bintang menjadi saksi bisu cinta kita yang abadi.',
      date: '10 Nov 2024',
      color: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      border: 'border-blue-200',
      isPrivate: false,
      tags: ['bintang', 'janji', 'malam'],
      favorite: false
    },
    {
      id: 4,
      title: 'Hujan dan Kenangan',
      content: 'Hujan yang turun membasahi bumi mengingatkanku pada tetesan air mata bahagia. Bersamamu, bahkan hujan terasa romantis.',
      date: '15 Nov 2024',
      color: 'bg-gradient-to-br from-cyan-50 to-blue-50',
      border: 'border-cyan-200',
      isPrivate: false,
      tags: ['hujan', 'romantis', 'kenangan'],
      favorite: true
    },
    {
      id: 5,
      title: 'Pelajaran Cinta',
      content: 'Cinta mengajarkan kesabaran, pengertian, dan komitmen. Bersamamu, aku belajar menjadi pribadi yang lebih baik setiap harinya.',
      date: '20 Nov 2024',
      color: 'bg-gradient-to-br from-green-50 to-emerald-50',
      border: 'border-green-200',
      isPrivate: true,
      tags: ['pelajaran', 'tumbuh', 'bersama'],
      favorite: false
    },
    {
      id: 6,
      title: 'Impian Bersama',
      content: 'Aku bermimpi tentang masa depan kita. Rumah kecil, kebun bunga, dan tawa yang selalu mengisi setiap sudut. Bersamamu, semua impian terasa mungkin.',
      date: '25 Nov 2024',
      color: 'bg-gradient-to-br from-purple-50 to-pink-50',
      border: 'border-purple-200',
      isPrivate: false,
      tags: ['impian', 'masa depan', 'bahagia'],
      favorite: true
    }
  ]);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedNote, setSelectedNote] = useState(null);
  const [isWriting, setIsWriting] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    isPrivate: false,
    tags: []
  });

  const filteredNotes = notes.filter(note => {
    // Search filter
    const searchMatch = note.title.toLowerCase().includes(search.toLowerCase()) ||
                       note.content.toLowerCase().includes(search.toLowerCase()) ||
                       note.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    
    // Privacy filter
    if (filter === 'private' && !note.isPrivate) return false;
    if (filter === 'public' && note.isPrivate) return false;
    if (filter === 'favorites' && !note.favorite) return false;
    
    return searchMatch;
  });

  const toggleFavorite = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, favorite: !note.favorite } : note
    ));
  };

  const togglePrivacy = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isPrivate: !note.isPrivate } : note
    ));
  };

  const deleteNote = (id) => {
    if (window.confirm('Yakin ingin menghapus catatan ini?')) {
      setNotes(notes.filter(note => note.id !== id));
      if (selectedNote?.id === id) {
        setSelectedNote(null);
      }
    }
  };

  const handleAddNote = () => {
    if (newNote.title && newNote.content) {
      const note = {
        id: notes.length + 1,
        ...newNote,
        date: new Date().toLocaleDateString('id-ID', { 
          day: 'numeric', 
          month: 'short', 
          year: 'numeric' 
        }),
        color: 'bg-gradient-to-br from-pink-50 to-rose-50',
        border: 'border-pink-200',
        tags: newNote.tags.length > 0 ? newNote.tags : ['baru']
      };
      
      setNotes([note, ...notes]);
      setNewNote({ title: '', content: '', isPrivate: false, tags: [] });
      setIsWriting(false);
    }
  };

  const addTag = (tag) => {
    if (!newNote.tags.includes(tag)) {
      setNewNote({ ...newNote, tags: [...newNote.tags, tag] });
    }
  };

  const removeTag = (tagToRemove) => {
    setNewNote({ ...newNote, tags: newNote.tags.filter(tag => tag !== tagToRemove) });
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
            <div className="p-3 bg-gradient-to-r from-rose-500 to-red-500 rounded-xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Catatan <span className="gradient-text">Cinta</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kata-kata yang tertulis adalah kenangan yang abadi. 
            Baca dan tulis perasaanmu di sini.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Catatan', value: notes.length, icon: BookOpen, color: 'from-rose-500 to-red-500' },
            { label: 'Catatan Pribadi', value: notes.filter(n => n.isPrivate).length, icon: Lock, color: 'from-purple-500 to-pink-500' },
            { label: 'Favorit', value: notes.filter(n => n.favorite).length, icon: Heart, color: 'from-pink-500 to-rose-500' },
            { label: 'Tag', value: new Set(notes.flatMap(n => n.tags)).size, icon: Paperclip, color: 'from-blue-500 to-purple-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-xl`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
                <stat.icon className="w-8 h-8 opacity-80" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
          {/* Search */}
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari catatan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex gap-2">
              {['all', 'favorites', 'private', 'public'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full ${filter === f ? 'bg-gradient-to-r from-rose-500 to-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {f === 'all' && 'Semua'}
                  {f === 'favorites' && 'Favorit'}
                  {f === 'private' && 'Pribadi'}
                  {f === 'public' && 'Publik'}
                </button>
              ))}
            </div>
          </div>

          {/* Add Note Button */}
          <button
            onClick={() => setIsWriting(true)}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold hover:shadow-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Catatan Baru
          </button>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                layout
                className={`${note.color} ${note.border} rounded-2xl p-6 border-2 shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
                onClick={() => setSelectedNote(note)}
              >
                {/* Note Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg mb-2">{note.title}</h3>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{note.date}</span>
                      {note.isPrivate && (
                        <>
                          <span>•</span>
                          <Lock className="w-4 h-4" />
                          <span>Pribadi</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(note.id);
                      }}
                      className="p-2 hover:bg-white/50 rounded-lg"
                    >
                      <Star className={`w-5 h-5 ${note.favorite ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'}`} />
                    </button>
                  </div>
                </div>

                {/* Note Preview */}
                <p className="text-gray-700 mb-6 line-clamp-3">
                  {note.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/50 text-gray-700 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/50">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePrivacy(note.id);
                      }}
                      className="p-2 hover:bg-white/50 rounded-lg"
                    >
                      {note.isPrivate ? (
                        <Unlock className="w-4 h-4 text-gray-600" />
                      ) : (
                        <Lock className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Edit functionality
                      }}
                      className="p-2 hover:bg-white/50 rounded-lg"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(note.id);
                      }}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredNotes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-rose-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Belum ada catatan</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {search ? 'Tidak ada catatan yang sesuai dengan pencarian' : 'Mulai tulis catatan cinta pertama Anda!'}
            </p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="mt-4 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Hapus Pencarian
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Write New Note Modal */}
      <AnimatePresence>
        {isWriting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsWriting(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">Tulis Catatan Baru</h2>
                  <button
                    onClick={() => setIsWriting(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Plus className="w-6 h-6 rotate-45 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Judul
                    </label>
                    <input
                      type="text"
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Judul catatan..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Konten
                    </label>
                    <textarea
                      value={newNote.content}
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[200px]"
                      placeholder="Tulis perasaanmu di sini..."
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={newNote.isPrivate}
                          onChange={(e) => setNewNote({ ...newNote, isPrivate: e.target.checked })}
                          className="w-5 h-5 rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                        />
                        <span className="text-gray-700">Catatan Pribadi</span>
                      </label>
                    </div>

                    <div className="flex items-center gap-2">
                      {['cinta', 'kenangan', 'spesial', 'bahagia'].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => addTag(tag)}
                          className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm hover:bg-pink-200"
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Tags */}
                  {newNote.tags.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tag Terpilih
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {newNote.tags.map((tag) => (
                          <div
                            key={tag}
                            className="flex items-center gap-1 px-3 py-1 bg-pink-500 text-white rounded-full text-sm"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 hover:text-pink-200"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 pt-8 border-t">
                    <button
                      onClick={() => setIsWriting(false)}
                      className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleAddNote}
                      disabled={!newNote.title || !newNote.content}
                      className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Simpan Catatan
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Note Detail Modal */}
      <AnimatePresence>
        {selectedNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedNote(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`relative w-full max-w-2xl rounded-3xl overflow-hidden ${selectedNote.color} ${selectedNote.border} border-2`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedNote.title}</h2>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-5 h-5" />
                        <span>{selectedNote.date}</span>
                      </div>
                      {selectedNote.isPrivate && (
                        <div className="flex items-center gap-1">
                          <Lock className="w-5 h-5" />
                          <span>Catatan Pribadi</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFavorite(selectedNote.id)}
                      className="p-2 hover:bg-white/50 rounded-lg"
                    >
                      <Star className={`w-6 h-6 ${selectedNote.favorite ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}`} />
                    </button>
                    <button
                      onClick={() => setSelectedNote(null)}
                      className="p-2 hover:bg-white/50 rounded-lg"
                    >
                      <Plus className="w-6 h-6 rotate-45 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedNote.content}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedNote.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-white/50 text-gray-700 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-8 border-t border-white/50">
                  <button className="flex-1 py-3 bg-white/50 text-gray-700 rounded-xl font-medium hover:bg-white/70 flex items-center justify-center gap-2">
                    <Edit className="w-5 h-5" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Yakin ingin menghapus catatan ini?')) {
                        deleteNote(selectedNote.id);
                      }
                    }}
                    className="flex-1 py-3 bg-red-500/10 text-red-600 rounded-xl font-medium hover:bg-red-500/20 flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-5 h-5" />
                    Hapus
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inspiration Section */}
      <div className="max-w-6xl mx-auto mt-20">
        <div className="bg-gradient-to-r from-rose-500 to-red-500 rounded-3xl p-8 text-white text-center">
          <Mail className="w-16 h-16 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">Bagikan Perasaanmu</h3>
          <p className="mb-8 max-w-2xl mx-auto">
            Setiap kata memiliki makna, setiap perasaan layak untuk diceritakan. 
            Tuliskan isi hatimu di sini.
          </p>
          <button
            onClick={() => setIsWriting(true)}
            className="px-8 py-3 bg-white text-rose-600 rounded-xl font-bold hover:bg-gray-100"
          >
            Tulis Catatan Baru
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
