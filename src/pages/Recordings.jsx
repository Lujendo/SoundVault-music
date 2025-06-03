import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Disc3, 
  Search,
  Plus,
  Filter,
  MoreVertical,
  Play,
  Pause,
  Clock,
  Calendar,
  User,
  Music,
  Headphones
} from 'lucide-react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import ListView from '../components/ListView';
import Modal from '../components/Modal';

const Recordings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [playingId, setPlayingId] = useState(null);
  const [view, setView] = useState('list');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRecording, setSelectedRecording] = useState(null);

  // Mock data for recordings
  const recordings = [
    {
      id: 1,
      title: "Midnight Dreams",
      artist: "Luna Rodriguez",
      album: "Nocturnal Vibes",
      duration: "3:42",
      recordedDate: "2024-01-15",
      genre: "Pop",
      bpm: 120,
      key: "C Major",
      producer: "Alex Thompson",
      studio: "Abbey Road Studios",
      status: "Mastered",
      streams: "2.4M",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Electric Pulse",
      artist: "The Neon Collective",
      album: "Digital Dreams",
      duration: "4:15",
      recordedDate: "2024-02-08",
      genre: "Electronic",
      bpm: 128,
      key: "A Minor",
      producer: "Sarah Chen",
      studio: "Electric Lady Studios",
      status: "Mixed",
      streams: "1.8M",
      cover: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=300&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Acoustic Sunrise",
      artist: "James Mitchell",
      album: "Morning Light",
      duration: "2:58",
      recordedDate: "2024-01-22",
      genre: "Folk",
      bpm: 85,
      key: "G Major",
      producer: "Emma Wilson",
      studio: "Sunset Sound",
      status: "Recording",
      streams: "892K",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Bass Revolution",
      artist: "DJ Spectrum",
      album: "Underground Beats",
      duration: "5:23",
      recordedDate: "2024-02-14",
      genre: "EDM",
      bpm: 140,
      key: "F# Minor",
      producer: "Mike Johnson",
      studio: "Sound City",
      status: "Mastered",
      streams: "3.2M",
      cover: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=300&h=300&fit=crop"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const handlePlayPause = (id) => {
    setPlayingId(playingId === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Recording': return 'bg-yellow-100 text-yellow-700';
      case 'Mixed': return 'bg-blue-100 text-blue-700';
      case 'Mastered': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleRecordingClick = (recording) => {
    setSelectedRecording(recording);
    setShowDetailModal(true);
  };

  // Define columns for ListView
  const recordingColumns = [
    {
      key: 'title',
      header: 'Track',
      width: '2fr',
      render: (recording) => (
        <div className="flex items-center space-x-3">
          <img
            src={recording.cover}
            alt={recording.title}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div>
            <div className="font-medium text-gray-900">{recording.title}</div>
            <div className="text-sm text-gray-500">{recording.artist}</div>
          </div>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      width: '100px',
      render: (recording) => (
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(recording.status)}`}>
          {recording.status}
        </span>
      )
    },
    {
      key: 'duration',
      header: 'Duration',
      width: '80px',
      render: (recording) => (
        <span className="text-sm text-gray-600">{recording.duration}</span>
      )
    },
    {
      key: 'genre',
      header: 'Genre',
      width: '100px',
      render: (recording) => (
        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
          {recording.genre}
        </span>
      )
    },
    {
      key: 'streams',
      header: 'Streams',
      width: '100px',
      render: (recording) => (
        <span className="text-sm font-medium text-gray-900">{recording.streams}</span>
      )
    }
  ];

  return (
    <Layout
      title="Recordings"
      subtitle="Manage your music recordings and production pipeline."
      icon={Disc3}
    >
      <div className="space-y-6">
        {/* Search and Filters */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search recordings..."
          onFilter={() => console.log('Filter clicked')}
          onAdd={() => setShowAddModal(true)}
          addButtonText="New Recording"
          view={view}
          setView={setView}
        />

        {/* Recordings Display */}
        {view === 'list' ? (
          <ListView
            data={recordings}
            columns={recordingColumns}
            onRowClick={handleRecordingClick}
            onMenuClick={(recording) => console.log('Menu clicked for', recording.title)}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recordings.map((recording, index) => (
              <Card
                key={recording.id}
                index={index}
                onClick={() => handleRecordingClick(recording)}
                onMenuClick={() => console.log('Menu clicked for', recording.title)}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={recording.cover}
                      alt={recording.title}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayPause(recording.id);
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {playingId === recording.id ? (
                        <Pause className="h-6 w-6 text-white" />
                      ) : (
                        <Play className="h-6 w-6 text-white ml-1" />
                      )}
                    </button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {recording.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{recording.artist}</p>
                      <p className="text-gray-500 text-xs">{recording.album}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(recording.status)}`}>
                        {recording.status}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        {recording.genre}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{recording.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(recording.recordedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Music className="h-4 w-4" />
                    <span>{recording.key}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Headphones className="h-4 w-4" />
                    <span>{recording.bpm} BPM</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-xs">Producer</p>
                      <p className="text-gray-900 text-sm font-medium">{recording.producer}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-xs">Streams</p>
                      <p className="text-gray-900 text-sm font-medium">{recording.streams}</p>
                    </div>
                  </div>
                </div>

                {/* Playing Indicator */}
                {playingId === recording.id && (
                  <div className="mt-4 flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-4 bg-blue-500 rounded-full animate-pulse"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                    <span className="text-blue-600 text-sm font-medium">Now Playing</span>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Add Recording Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add New Recording"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Track Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter track title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Artist
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter artist name"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Add Recording
              </button>
            </div>
          </div>
        </Modal>

        {/* Recording Detail Modal */}
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title={selectedRecording?.title || "Recording Details"}
          size="lg"
        >
          {selectedRecording && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedRecording.cover}
                  alt={selectedRecording.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedRecording.title}</h3>
                  <p className="text-gray-600">{selectedRecording.artist}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedRecording.status)}`}>
                      {selectedRecording.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Track Information</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{selectedRecording.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Genre:</span>
                      <span className="font-medium">{selectedRecording.genre}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Key:</span>
                      <span className="font-medium">{selectedRecording.key}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>BPM:</span>
                      <span className="font-medium">{selectedRecording.bpm}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Production</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Producer:</span>
                      <span className="font-medium">{selectedRecording.producer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Studio:</span>
                      <span className="font-medium">{selectedRecording.studio}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Streams:</span>
                      <span className="font-medium text-blue-600">{selectedRecording.streams}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default Recordings;
