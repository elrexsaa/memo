import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, 
  Upload, 
  Image, 
  Video, 
  Music, 
  FileText,
  Users,
  Settings,
  BarChart,
  LogOut,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Trash2,
  Edit,
  Plus,
  Shield,
  Bell,
  Database,
  Calendar
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const { user, logout, updateCredentials } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [credentials, setCredentials] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Statistics
  const [stats, setStats] = useState({
    totalMemories: 124,
    newThisMonth: 24,
    favorites: 56,
    storageUsed: '2.4 GB',
    visitors: 842,
    lastBackup: '2 hari lalu'
  });

  // Recent Activities
  const [activities, setActivities] = useState([
    { id: 1, action: 'Upload foto baru', user: 'Elga', time: '10 menit lalu', type: 'photo' },
    { id: 2, action: 'Edit catatan cinta', user: 'Nikita', time: '1 jam lalu', type: 'note' },
    { id: 3, action: 'Upload video kenangan', user: 'Elga', time: '3 jam lalu', type: 'video' },
    { id: 4, action: 'Tambah lagu baru', user: 'Nikita', time: '1 hari lalu', type: 'music' },
    { id: 5, action: 'Backup database', user: 'System', time: '2 hari lalu', type: 'system' }
  ]);

  // Upload States
  const [uploadForm, setUploadForm] = useState({
    type: 'photo',
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    tags: '',
    isPrivate: false
  });

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleChangePassword = () => {
    if (credentials.newPassword !== credentials.confirmPassword) {
      alert('Password baru tidak cocok!');
      return;
    }

    if (credentials.newPassword.length < 6) {
      alert('Password minimal 6 karakter!');
      return;
    }

    const result = updateCredentials(user.username, credentials.newPassword);
    if (result.success) {
      alert('Password berhasil diubah!');
      setShowChangePassword(false);
      setCredentials({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  const simulateUpload = () => {
    if (!uploadForm.title || !uploadForm.description) {
      alert('Harap isi judul dan deskripsi!');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Add to activities
          const newActivity = {
            id: activities.length + 1,
            action: `Upload ${uploadForm.type} baru: ${uploadForm.title}`,
            user: user.name,
            time: 'Baru saja',
            type: uploadForm.type
          };
          
          setActivities(prev => [newActivity, ...prev]);
          
          // Update stats
          setStats(prev => ({
            ...prev,
            totalMemories: prev.totalMemories + 1,
            newThisMonth: prev.newThisMonth + 1
          }));

          // Reset form
          setUploadForm({
            type: 'photo',
            title: '',
            description: '',
            date: new Date().toISOString().split('T')[0],
            tags: '',
            isPrivate: false
          });

          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDeleteActivity = (id) => {
    setActivities(prev => prev.filter(activity => activity.id !== id));
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'photo': return <Image className="w-5 h-5 text-blue-500" />;
      case 'video': return <Video className="w-5 h-5 text-purple-500" />;
      case 'music': return <Music className="w-5 h-5 text-pink-500" />;
      case 'note': return <FileText className="w-5 h-5 text-green-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Admin Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600">Kelola website kenangan Elga & Nikita</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-600">Terakhir login: {new Date(user.loginTime).toLocaleTimeString('id-ID')}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl font-medium hover:shadow-lg flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/4"
          >
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-24">
              <nav className="space-y-2">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: BarChart },
                  { id: 'upload', label: 'Upload Konten', icon: Upload },
                  { id: 'photos', label: 'Kelola Foto', icon: Image },
                  { id: 'videos', label: 'Kelola Video', icon: Video },
                  { id: 'music', label: 'Kelola Lagu', icon: Music },
                  { id: 'notes', label: 'Kelola Catatan', icon: FileText },
                  { id: 'users', label: 'Pengguna', icon: Users },
                  { id: 'settings', label: 'Pengaturan', icon: Settings }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id 
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Quick Stats */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="font-bold text-gray-800 mb-4">Statistik Cepat</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Memori</span>
                    <span className="font-bold text-gray-800">{stats.totalMemories}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Bulan Ini</span>
                    <span className="font-bold text-green-600">+{stats.newThisMonth}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Penyimpanan</span>
                    <span className="font-bold text-gray-800">{stats.storageUsed}</span>
                  </div>
                </div>
              </div>

              {/* Security Status */}
              <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-green-700">Aman</span>
                </div>
                <p className="text-sm text-green-600">Website dalam keadaan aman dan terlindungi</p>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { label: 'Total Kenangan', value: stats.totalMemories, icon: Database, color: 'from-blue-500 to-cyan-500' },
                    { label: 'Favorit', value: stats.favorites, icon: Heart, color: 'from-pink-500 to-rose-500' },
                    { label: 'Pengunjung', value: stats.visitors, icon: Users, color: 'from-purple-500 to-pink-500' },
                    { label: 'Upload Bulan Ini', value: stats.newThisMonth, icon: Upload, color: 'from-green-500 to-emerald-500' },
                    { label: 'Penyimpanan', value: stats.storageUsed, icon: Database, color: 'from-orange-500 to-amber-500' },
                    { label: 'Backup Terakhir', value: stats.lastBackup, icon: Calendar, color: 'from-indigo-500 to-purple-500' }
                  ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-xl`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-3xl font-bold mb-2">{stat.value}</div>
                            <div className="text-sm opacity-90">{stat.label}</div>
                          </div>
                          <Icon className="w-8 h-8 opacity-80" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Aktivitas Terbaru</h2>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      Lihat Semua
                    </button>
                  </div>

                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-white rounded-lg">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{activity.action}</p>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <span>Oleh: {activity.user}</span>
                              <span>•</span>
                              <span>{activity.time}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteActivity(activity.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-8 text-white">
                    <h3 className="text-xl font-bold mb-4">Backup Data</h3>
                    <p className="mb-6 opacity-90">Backup terakhir: {stats.lastBackup}</p>
                    <button className="px-6 py-3 bg-white text-pink-600 rounded-xl font-bold hover:bg-gray-100">
                      Backup Sekarang
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 text-white">
                    <h3 className="text-xl font-bold mb-4">Analytics</h3>
                    <p className="mb-6 opacity-90">Lihat statistik pengunjung website</p>
                    <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100">
                      Lihat Analytics
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-3xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Upload Konten Baru</h2>

                <div className="space-y-8">
                  {/* Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Jenis Konten
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { value: 'photo', label: 'Foto', icon: Image, color: 'from-blue-500 to-cyan-500' },
                        { value: 'video', label: 'Video', icon: Video, color: 'from-purple-500 to-pink-500' },
                        { value: 'music', label: 'Lagu', icon: Music, color: 'from-green-500 to-emerald-500' },
                        { value: 'note', label: 'Catatan', icon: FileText, color: 'from-orange-500 to-amber-500' }
                      ].map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setUploadForm({ ...uploadForm, type: type.value })}
                            className={`p-6 rounded-2xl text-center ${uploadForm.type === type.value 
                              ? `bg-gradient-to-br ${type.color} text-white` 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <Icon className="w-8 h-8 mx-auto mb-3" />
                            <span className="font-medium">{type.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Upload Form */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Judul
                      </label>
                      <input
                        type="text"
                        value={uploadForm.title}
                        onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Judul kenangan..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal
                      </label>
                      <input
                        type="date"
                        value={uploadForm.date}
                        onChange={(e) => setUploadForm({ ...uploadForm, date: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Deskripsi
                      </label>
                      <textarea
                        value={uploadForm.description}
                        onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[120px]"
                        placeholder="Deskripsi kenangan..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags (pisahkan dengan koma)
                      </label>
                      <input
                        type="text"
                        value={uploadForm.tags}
                        onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="cinta, kenangan, spesial"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        File
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Drag & drop file di sini</p>
                        <p className="text-sm text-gray-500">atau</p>
                        <button className="mt-4 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                          Pilih File
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Settings */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      {uploadForm.isPrivate ? (
                        <Lock className="w-5 h-5 text-gray-600" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-600" />
                      )}
                      <div>
                        <p className="font-medium text-gray-800">
                          {uploadForm.isPrivate ? 'Konten Pribadi' : 'Konten Publik'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {uploadForm.isPrivate 
                            ? 'Hanya bisa dilihat oleh admin' 
                            : 'Bisa dilihat oleh semua orang'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setUploadForm({ ...uploadForm, isPrivate: !uploadForm.isPrivate })}
                      className={`px-4 py-2 rounded-lg font-medium ${uploadForm.isPrivate 
                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' 
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      {uploadForm.isPrivate ? 'Ubah ke Publik' : 'Ubah ke Pribadi'}
                    </button>
                  </div>

                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-medium text-gray-800">Mengupload...</span>
                        <span className="font-bold text-blue-600">{uploadProgress}%</span>
                      </div>
                      <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-4">
                        Jangan tutup halaman ini selama proses upload
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={simulateUpload}
                      disabled={isUploading}
                      className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUploading ? 'Mengupload...' : 'Upload Konten'}
                    </button>
                    <button
                      onClick={() => {
                        setUploadForm({
                          type: 'photo',
                          title: '',
                          description: '',
                          date: new Date().toISOString().split('T')[0],
                          tags: '',
                          isPrivate: false
                        });
                      }}
                      className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200"
                    >
                      Reset Form
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-3xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Pengaturan</h2>

                <div className="space-y-8">
                  {/* Change Password */}
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">Keamanan Akun</h3>
                        <p className="text-gray-600">Ubah password admin untuk keamanan</p>
                      </div>
                      <button
                        onClick={() => setShowChangePassword(!showChangePassword)}
                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg"
                      >
                        {showChangePassword ? 'Batal' : 'Ubah Password'}
                      </button>
                    </div>

                    {showChangePassword && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password Saat Ini
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={credentials.currentPassword}
                              onChange={(e) => setCredentials({ ...credentials, currentPassword: e.target.value })}
                              className="w-full px-4 py-3 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                              placeholder="Masukkan password saat ini"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5 text-gray-400" />
                              ) : (
                                <Eye className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password Baru
                          </label>
                          <input
                            type="password"
                            value={credentials.newPassword}
                            onChange={(e) => setCredentials({ ...credentials, newPassword: e.target.value })}
                            className="w-full px-4 py-3 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Password baru minimal 6 karakter"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Konfirmasi Password Baru
                          </label>
                          <input
                            type="password"
                            value={credentials.confirmPassword}
                            onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
                            className="w-full px-4 py-3 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Ulangi password baru"
                          />
                        </div>

                        <button
                          onClick={handleChangePassword}
                          className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:shadow-lg"
                        >
                          Simpan Password Baru
                        </button>
                      </motion.div>
                    )}
                  </div>

                  {/* Website Settings */}
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Pengaturan Website</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nama Website
                        </label>
                        <input
                          type="text"
                          defaultValue="Kenangan Elga & Nikita"
                          className="w-full px-4 py-3 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Deskripsi Website
                        </label>
                        <textarea
                          defaultValue="Website kenangan cinta Elga dan Nikita sejak 1 November 2024"
                          className="w-full px-4 py-3 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[100px]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Warna Tema
                        </label>
                        <div className="flex gap-3">
                          {['pink', 'purple', 'blue', 'green'].map((color) => (
                            <button
                              key={color}
                              className={`w-10 h-10 rounded-full bg-${color}-500 border-2 border-white shadow-lg`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="p-6 bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border border-red-200">
                    <h3 className="text-xl font-bold text-red-800 mb-4">Zona Berbahaya</h3>
                    <p className="text-red-600 mb-6">
                      Tindakan ini tidak dapat dibatalkan. Hapus semua data dengan hati-hati.
                    </p>
                    <div className="space-y-4">
                      <button className="w-full py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600">
                        Hapus Semua Data
                      </button>
                      <button className="w-full py-3 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600">
                        Reset Website
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Other Tabs Placeholder */}
            {!['dashboard', 'upload', 'settings'].includes(activeTab) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-3xl shadow-xl p-8"
              >
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                    {activeTab === 'photos' && <Image className="w-10 h-10 text-white" />}
                    {activeTab === 'videos' && <Video className="w-10 h-10 text-white" />}
                    {activeTab === 'music' && <Music className="w-10 h-10 text-white" />}
                    {activeTab === 'notes' && <FileText className="w-10 h-10 text-white" />}
                    {activeTab === 'users' && <Users className="w-10 h-10 text-white" />}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {activeTab === 'photos' && 'Kelola Foto'}
                    {activeTab === 'videos' && 'Kelola Video'}
                    {activeTab === 'music' && 'Kelola Lagu'}
                    {activeTab === 'notes' && 'Kelola Catatan'}
                    {activeTab === 'users' && 'Kelola Pengguna'}
                  </h2>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Fitur ini sedang dalam pengembangan. Akan segera tersedia!
                  </p>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="mt-6 px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold hover:shadow-lg"
                  >
                    Upload Konten
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
