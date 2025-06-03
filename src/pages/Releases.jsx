import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Album, 
  Search,
  Plus,
  Filter,
  MoreVertical,
  Calendar,
  Music,
  TrendingUp,
  DollarSign,
  Globe,
  Play,
  Pause
} from 'lucide-react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import ListView from '../components/ListView';
import Modal from '../components/Modal';

const Releases = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [playingId, setPlayingId] = useState(null);
  const [view, setView] = useState('list');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState(null);

  // Mock data for releases
  const releases = [
    {
      id: 1,
      title: "Nocturnal Vibes",
      artist: "Luna Rodriguez",
      type: "Album",
      releaseDate: "2024-03-15",
      label: "Atlantic Records",
      tracks: 12,
      totalDuration: "42:18",
      platforms: ["Spotify", "Apple Music", "YouTube Music"],
      status: "Released",
      streams: "15.2M",
      revenue: "$45,670",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      genres: ["Pop", "Electronic"]
    },
    {
      id: 2,
      title: "Digital Dreams",
      artist: "The Neon Collective",
      type: "EP",
      releaseDate: "2024-04-02",
      label: "Indie Folk Records",
      tracks: 6,
      totalDuration: "24:35",
      platforms: ["Spotify", "Bandcamp", "SoundCloud"],
      status: "Pre-Release",
      streams: "0",
      revenue: "$0",
      cover: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=300&h=300&fit=crop",
      genres: ["Electronic", "Ambient"]
    },
    {
      id: 3,
      title: "Morning Light",
      artist: "James Mitchell",
      type: "Single",
      releaseDate: "2024-02-28",
      label: "Independent",
      tracks: 1,
      totalDuration: "3:42",
      platforms: ["Spotify", "Apple Music", "Amazon Music"],
      status: "Released",
      streams: "2.8M",
      revenue: "$8,340",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      genres: ["Folk", "Acoustic"]
    },
    {
      id: 4,
      title: "Underground Beats Vol. 1",
      artist: "DJ Spectrum",
      type: "Compilation",
      releaseDate: "2024-03-22",
      label: "Electronic Vibes",
      tracks: 15,
      totalDuration: "68:45",
      platforms: ["Beatport", "Spotify", "Apple Music"],
      status: "Released",
      streams: "8.7M",
      revenue: "$23,890",
      cover: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=300&h=300&fit=crop",
      genres: ["EDM", "House", "Techno"]
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
      case 'Pre-Release': return 'bg-yellow-100 text-yellow-700';
      case 'Released': return 'bg-green-100 text-green-700';
      case 'Scheduled': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Album': return 'bg-purple-100 text-purple-700';
      case 'EP': return 'bg-blue-100 text-blue-700';
      case 'Single': return 'bg-green-100 text-green-700';
      case 'Compilation': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleReleaseClick = (release) => {
    setSelectedRelease(release);
    setShowDetailModal(true);
  };

  // Define columns for ListView
  const releaseColumns = [
    {
      key: 'title',
      header: 'Release',
      width: '2fr',
      render: (release) => (
        <div className="flex items-center space-x-3">
          <img
            src={release.cover}
            alt={release.title}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div>
            <div className="font-medium text-gray-900">{release.title}</div>
            <div className="text-sm text-gray-500">{release.artist}</div>
          </div>
        </div>
      )
    },
    {
      key: 'type',
      header: 'Type',
      width: '100px',
      render: (release) => (
        <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(release.type)}`}>
          {release.type}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      width: '100px',
      render: (release) => (
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(release.status)}`}>
          {release.status}
        </span>
      )
    },
    {
      key: 'releaseDate',
      header: 'Release Date',
      width: '120px',
      render: (release) => (
        <span className="text-sm text-gray-600">
          {new Date(release.releaseDate).toLocaleDateString()}
        </span>
      )
    },
    {
      key: 'streams',
      header: 'Streams',
      width: '100px',
      render: (release) => (
        <span className="text-sm font-medium text-gray-900">{release.streams}</span>
      )
    },
    {
      key: 'revenue',
      header: 'Revenue',
      width: '100px',
      render: (release) => (
        <span className="text-sm font-semibold text-green-600">{release.revenue}</span>
      )
    }
  ];

  return (
    <Layout
      title="Releases"
      subtitle="Manage music releases and distribution across platforms."
      icon={Album}
    >
      <div className="space-y-6">
        {/* Search and Filters */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search releases..."
          onFilter={() => console.log('Filter clicked')}
          onAdd={() => setShowAddModal(true)}
          addButtonText="New Release"
          view={view}
          setView={setView}
        />

        {/* Releases Display */}
        {view === 'list' ? (
          <ListView
            data={releases}
            columns={releaseColumns}
            onRowClick={handleReleaseClick}
            onMenuClick={(release) => console.log('Menu clicked for', release.title)}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {releases.map((release, index) => (
              <Card
                key={release.id}
                index={index}
                onClick={() => handleReleaseClick(release)}
                onMenuClick={() => console.log('Menu clicked for', release.title)}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={release.cover}
                      alt={release.title}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayPause(release.id);
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {playingId === release.id ? (
                        <Pause className="h-6 w-6 text-white" />
                      ) : (
                        <Play className="h-6 w-6 text-white ml-1" />
                      )}
                    </button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {release.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{release.artist}</p>
                      <p className="text-gray-500 text-xs">{release.label}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(release.status)}`}>
                        {release.status}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(release.type)}`}>
                        {release.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(release.releaseDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Music className="h-4 w-4" />
                    <span>{release.tracks} tracks</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>{release.streams} streams</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    <span>{release.revenue}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {release.genres.map((genre, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Platforms</p>
                      <div className="flex items-center space-x-1">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900 text-sm">{release.platforms.length} platforms</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-xs">Duration</p>
                      <p className="text-gray-900 text-sm font-medium">{release.totalDuration}</p>
                    </div>
                  </div>
                </div>

                {/* Playing Indicator */}
                {playingId === release.id && (
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
                    <span className="text-blue-600 text-sm font-medium">Preview Playing</span>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Add Release Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add New Release"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Release Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter release title"
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Album</option>
                  <option>EP</option>
                  <option>Single</option>
                  <option>Compilation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Release Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                Add Release
              </button>
            </div>
          </div>
        </Modal>

        {/* Release Detail Modal */}
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title={selectedRelease?.title || "Release Details"}
          size="lg"
        >
          {selectedRelease && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedRelease.cover}
                  alt={selectedRelease.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedRelease.title}</h3>
                  <p className="text-gray-600">{selectedRelease.artist}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedRelease.status)}`}>
                      {selectedRelease.status}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(selectedRelease.type)}`}>
                      {selectedRelease.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Release Information</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Release Date:</span>
                      <span className="font-medium">{new Date(selectedRelease.releaseDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Label:</span>
                      <span className="font-medium">{selectedRelease.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tracks:</span>
                      <span className="font-medium">{selectedRelease.tracks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{selectedRelease.totalDuration}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Performance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Streams:</span>
                      <span className="font-medium">{selectedRelease.streams}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Revenue:</span>
                      <span className="font-medium text-green-600">{selectedRelease.revenue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platforms:</span>
                      <span className="font-medium">{selectedRelease.platforms.length}</span>
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

export default Releases;
