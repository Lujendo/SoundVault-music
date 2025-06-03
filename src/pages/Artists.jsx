import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Filter,
  Plus,
  Play,
  Pause,
  Music,
  Calendar,
  MapPin,
  Mail,
  Globe,
  TrendingUp,
  Award,
  Headphones
} from 'lucide-react';

import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import ListView from '../components/ListView';
import Modal from '../components/Modal';
import apiService from '../services/api';

const Artists = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [playingId, setPlayingId] = useState(null);
  const [view, setView] = useState('list'); // Default to list view
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch artists data from API
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const response = await apiService.getArtists({
          search: searchTerm,
          limit: 50 // Get more records for better UX
        });
        setArtists(response.data || []);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch artists:', err);
        setError('Failed to load artists. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [searchTerm]);

  const handlePlayPause = (artistId) => {
    setPlayingId(playingId === artistId ? null : artistId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Recording': return 'bg-blue-100 text-blue-700';
      case 'Touring': return 'bg-purple-100 text-purple-700';
      case 'Inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleArtistClick = (artist) => {
    setSelectedArtist(artist);
    setShowDetailModal(true);
  };

  // Define columns for ListView
  const artistColumns = [
    {
      key: 'name',
      header: 'Artist',
      width: '2fr',
      render: (artist) => (
        <div className="flex items-center space-x-3">
          <img
            src={artist.image_url || "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e5?w=400&h=400&fit=crop&crop=face"}
            alt={artist.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-medium text-gray-900">{artist.name}</div>
            <div className="text-sm text-gray-500">{artist.stage_name}</div>
          </div>
        </div>
      )
    },
    {
      key: 'nationality',
      header: 'Nationality',
      width: '120px',
      render: (artist) => (
        <span className="text-sm text-gray-600">{artist.nationality}</span>
      )
    },
    {
      key: 'genres',
      header: 'Genres',
      width: '1fr',
      render: (artist) => {
        const genres = artist.genres ? JSON.parse(artist.genres) : [];
        return (
          <div className="flex flex-wrap gap-1">
            {genres.slice(0, 2).map((genre, idx) => (
              <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                {genre}
              </span>
            ))}
            {genres.length > 2 && (
              <span className="text-xs text-gray-500">+{genres.length - 2}</span>
            )}
          </div>
        );
      }
    },
    {
      key: 'song_count',
      header: 'Songs',
      width: '80px',
      render: (artist) => (
        <span className="text-sm font-medium text-gray-900">{artist.song_count || 0}</span>
      )
    },
    {
      key: 'release_count',
      header: 'Releases',
      width: '80px',
      render: (artist) => (
        <span className="text-sm font-medium text-blue-600">{artist.release_count || 0}</span>
      )
    },
    {
      key: 'total_revenue',
      header: 'Revenue',
      width: '100px',
      render: (artist) => (
        <span className="text-sm font-semibold text-green-600">
          ${parseFloat(artist.total_revenue || 0).toLocaleString()}
        </span>
      )
    }
  ];

  return (
    <Layout
      title="Artists"
      subtitle="Manage your artist roster and track their performance."
      icon={Users}
    >
      <div className="space-y-6">
        {/* Search and Filters */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search artists..."
          onFilter={() => console.log('Filter clicked')}
          onAdd={() => setShowAddModal(true)}
          addButtonText="Add Artist"
          view={view}
          setView={setView}
        />

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading artists...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Artists Display */}
        {!loading && !error && (
          <>
            {view === 'list' ? (
              <ListView
                data={artists}
                columns={artistColumns}
                onRowClick={handleArtistClick}
                onMenuClick={(artist) => console.log('Menu clicked for', artist.name)}
              />
            ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {artists.map((artist, index) => (
              <Card
                key={artist.id}
                index={index}
                onClick={() => handleArtistClick(artist)}
                onMenuClick={() => console.log('Menu clicked for', artist.name)}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={artist.image_url || "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e5?w=400&h=400&fit=crop&crop=face"}
                      alt={artist.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayPause(artist.id);
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {playingId === artist.id ? (
                        <Pause className="h-5 w-5 text-white" />
                      ) : (
                        <Play className="h-5 w-5 text-white ml-0.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {artist.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{artist.stage_name}</p>
                      <p className="text-gray-500 text-xs">{artist.nationality}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      {artist.genres && JSON.parse(artist.genres).slice(0, 2).map((genre, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600 text-sm">
                    <Mail className="h-4 w-4" />
                    <span>{artist.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{artist.nationality}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Music className="h-4 w-4 text-gray-500 mr-1" />
                    </div>
                    <p className="text-gray-900 font-semibold">{artist.song_count || 0}</p>
                    <p className="text-gray-500 text-xs">Songs</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Headphones className="h-4 w-4 text-gray-500 mr-1" />
                    </div>
                    <p className="text-gray-900 font-semibold">{artist.release_count || 0}</p>
                    <p className="text-gray-500 text-xs">Releases</p>
                  </div>
                  <div className="text-center">
                    <p className="text-green-600 font-semibold">${parseFloat(artist.total_revenue || 0).toLocaleString()}</p>
                    <p className="text-gray-500 text-xs">Revenue</p>
                  </div>
                </div>

                {/* Playing Indicator */}
                {playingId === artist.id && (
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
          </>
        )}

        {/* Add Artist Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add New Artist"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Artist Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter artist name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Genre
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Pop</option>
                  <option>Hip-Hop</option>
                  <option>Rock</option>
                  <option>Electronic</option>
                  <option>Indie</option>
                  <option>R&B</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter location"
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
                Add Artist
              </button>
            </div>
          </div>
        </Modal>

        {/* Artist Detail Modal */}
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title={selectedArtist?.name || "Artist Details"}
          size="lg"
        >
          {selectedArtist && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedArtist.image_url || "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e5?w=400&h=400&fit=crop&crop=face"}
                  alt={selectedArtist.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedArtist.name}</h3>
                  <p className="text-gray-600">{selectedArtist.stage_name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {selectedArtist.genres && JSON.parse(selectedArtist.genres).map((genre, idx) => (
                      <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedArtist.nationality}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{selectedArtist.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{selectedArtist.birth_date ? new Date(selectedArtist.birth_date).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Performance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Songs:</span>
                      <span className="font-medium">{selectedArtist.song_count || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Releases:</span>
                      <span className="font-medium">{selectedArtist.release_count || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Revenue:</span>
                      <span className="font-medium text-green-600">${parseFloat(selectedArtist.total_revenue || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              {selectedArtist.bio && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Biography</h4>
                  <p className="text-sm text-gray-600">{selectedArtist.bio}</p>
                </div>
              )}
              {selectedArtist.social_media && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Social Media</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(JSON.parse(selectedArtist.social_media)).map(([platform, handle]) => (
                      <span key={platform} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {platform}: {handle}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default Artists;
