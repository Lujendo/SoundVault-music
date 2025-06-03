import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Plus,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Music
} from 'lucide-react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import Modal from '../components/Modal';
import ListView from '../components/ListView';

const Publishers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [view, setView] = useState('list'); // Default to list view

  // Mock data for publishers
  const publishers = [
    {
      id: 1,
      name: "Universal Music Publishing Group",
      type: "Major Publisher",
      location: "Los Angeles, CA",
      email: "contact@umpg.com",
      phone: "+1 (310) 235-4700",
      website: "www.universalmusicpublishing.com",
      artists: 1247,
      songs: 8934,
      revenue: "$2.4M",
      logo: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "Sony Music Publishing",
      type: "Major Publisher",
      location: "New York, NY",
      email: "info@sonymusic.com",
      phone: "+1 (212) 833-8000",
      website: "www.sonymusicpub.com",
      artists: 892,
      songs: 6721,
      revenue: "$1.8M",
      logo: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      name: "Warner Chappell Music",
      type: "Major Publisher",
      location: "Nashville, TN",
      email: "contact@warnerchappell.com",
      phone: "+1 (615) 321-4000",
      website: "www.warnerchappell.com",
      artists: 634,
      songs: 4567,
      revenue: "$1.2M",
      logo: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop"
    },
    {
      id: 4,
      name: "Independent Music Publishers",
      type: "Independent",
      location: "Austin, TX",
      email: "hello@indiemusic.com",
      phone: "+1 (512) 555-0123",
      website: "www.indiemusic.com",
      artists: 156,
      songs: 892,
      revenue: "$340K",
      logo: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=100&h=100&fit=crop"
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

  const handlePublisherClick = (publisher) => {
    setSelectedPublisher(publisher);
    setShowDetailModal(true);
  };

  // Define columns for ListView
  const publisherColumns = [
    {
      key: 'name',
      header: 'Publisher',
      width: '2fr',
      render: (publisher) => (
        <div className="flex items-center space-x-3">
          <img
            src={publisher.logo}
            alt={publisher.name}
            className="w-8 h-8 rounded-lg object-cover"
          />
          <div>
            <div className="font-medium text-gray-900">{publisher.name}</div>
            <div className="text-sm text-gray-500">{publisher.type}</div>
          </div>
        </div>
      )
    },
    {
      key: 'location',
      header: 'Location',
      width: '1fr',
      render: (publisher) => (
        <span className="text-sm text-gray-600">{publisher.location}</span>
      )
    },
    {
      key: 'artists',
      header: 'Artists',
      width: '80px',
      render: (publisher) => (
        <span className="text-sm font-medium text-gray-900">{publisher.artists}</span>
      )
    },
    {
      key: 'songs',
      header: 'Songs',
      width: '80px',
      render: (publisher) => (
        <span className="text-sm font-medium text-gray-900">{publisher.songs}</span>
      )
    },
    {
      key: 'revenue',
      header: 'Revenue',
      width: '100px',
      render: (publisher) => (
        <span className="text-sm font-semibold text-green-600">{publisher.revenue}</span>
      )
    }
  ];

  return (
    <Layout
      title="Publishers"
      subtitle="Manage your music publishing partners and relationships."
      icon={Building2}
    >
      <div className="space-y-6">
        {/* Search and Filters */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search publishers..."
          onFilter={() => console.log('Filter clicked')}
          onAdd={() => setShowAddModal(true)}
          addButtonText="Add Publisher"
          view={view}
          setView={setView}
        />

        {/* Publishers Display */}
        {view === 'list' ? (
          <ListView
            data={publishers}
            columns={publisherColumns}
            onRowClick={handlePublisherClick}
            onMenuClick={(publisher) => console.log('Menu clicked for', publisher.name)}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {publishers.map((publisher, index) => (
              <Card
                key={publisher.id}
                index={index}
                onClick={() => handlePublisherClick(publisher)}
                onMenuClick={() => console.log('Menu clicked for', publisher.name)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={publisher.logo}
                      alt={publisher.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {publisher.name}
                      </h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {publisher.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{publisher.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 text-sm">
                    <Mail className="h-4 w-4" />
                    <span>{publisher.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 text-sm">
                    <Globe className="h-4 w-4" />
                    <span>{publisher.website}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-4 w-4 text-gray-500 mr-1" />
                    </div>
                    <p className="text-gray-900 font-semibold">{publisher.artists}</p>
                    <p className="text-gray-500 text-xs">Artists</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Music className="h-4 w-4 text-gray-500 mr-1" />
                    </div>
                    <p className="text-gray-900 font-semibold">{publisher.songs}</p>
                    <p className="text-gray-500 text-xs">Songs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-green-600 font-semibold">{publisher.revenue}</p>
                    <p className="text-gray-500 text-xs">Revenue</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Add Publisher Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add New Publisher"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publisher Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter publisher name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Major Publisher</option>
                  <option>Independent</option>
                  <option>Boutique</option>
                </select>
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
                Add Publisher
              </button>
            </div>
          </div>
        </Modal>

        {/* Publisher Detail Modal */}
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title={selectedPublisher?.name || "Publisher Details"}
          size="lg"
        >
          {selectedPublisher && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedPublisher.logo}
                  alt={selectedPublisher.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedPublisher.name}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                    {selectedPublisher.type}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedPublisher.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{selectedPublisher.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <span>{selectedPublisher.website}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Statistics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Artists:</span>
                      <span className="font-medium">{selectedPublisher.artists}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Songs:</span>
                      <span className="font-medium">{selectedPublisher.songs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Revenue:</span>
                      <span className="font-medium text-green-600">{selectedPublisher.revenue}</span>
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

export default Publishers;
