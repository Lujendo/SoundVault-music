import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Tag, 
  Search,
  Plus,
  Filter,
  MoreVertical,
  MapPin,
  Calendar,
  Users,
  Disc3,
  TrendingUp
} from 'lucide-react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import ListView from '../components/ListView';
import Modal from '../components/Modal';

const Labels = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [view, setView] = useState('list');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);

  // Mock data for labels
  const labels = [
    {
      id: 1,
      name: "Atlantic Records",
      type: "Major Label",
      founded: "1947",
      location: "New York, NY",
      artists: 234,
      releases: 1567,
      monthlyStreams: "45.2M",
      logo: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
      genres: ["Pop", "Rock", "Hip-Hop"],
      status: "Active"
    },
    {
      id: 2,
      name: "Def Jam Recordings",
      type: "Major Label",
      founded: "1984",
      location: "Los Angeles, CA",
      artists: 156,
      releases: 892,
      monthlyStreams: "38.7M",
      logo: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=100&h=100&fit=crop",
      genres: ["Hip-Hop", "R&B", "Rap"],
      status: "Active"
    },
    {
      id: 3,
      name: "Indie Folk Records",
      type: "Independent",
      founded: "2015",
      location: "Portland, OR",
      artists: 45,
      releases: 234,
      monthlyStreams: "2.1M",
      logo: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
      genres: ["Folk", "Indie", "Alternative"],
      status: "Active"
    },
    {
      id: 4,
      name: "Electronic Vibes",
      type: "Independent",
      founded: "2018",
      location: "Berlin, Germany",
      artists: 67,
      releases: 345,
      monthlyStreams: "5.8M",
      logo: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=100&h=100&fit=crop",
      genres: ["Electronic", "Techno", "House"],
      status: "Active"
    }
  ];

  const handleLabelClick = (label) => {
    setSelectedLabel(label);
    setShowDetailModal(true);
  };

  // Define columns for ListView
  const labelColumns = [
    {
      key: 'name',
      header: 'Label',
      width: '2fr',
      render: (label) => (
        <div className="flex items-center space-x-3">
          <img
            src={label.logo}
            alt={label.name}
            className="w-8 h-8 rounded-lg object-cover"
          />
          <div>
            <div className="font-medium text-gray-900">{label.name}</div>
            <div className="text-sm text-gray-500">{label.type}</div>
          </div>
        </div>
      )
    },
    {
      key: 'location',
      header: 'Location',
      width: '1fr',
      render: (label) => (
        <span className="text-sm text-gray-600">{label.location}</span>
      )
    },
    {
      key: 'founded',
      header: 'Founded',
      width: '100px',
      render: (label) => (
        <span className="text-sm text-gray-600">{label.founded}</span>
      )
    },
    {
      key: 'artists',
      header: 'Artists',
      width: '80px',
      render: (label) => (
        <span className="text-sm font-medium text-gray-900">{label.artists}</span>
      )
    },
    {
      key: 'releases',
      header: 'Releases',
      width: '80px',
      render: (label) => (
        <span className="text-sm font-medium text-gray-900">{label.releases}</span>
      )
    },
    {
      key: 'monthlyStreams',
      header: 'Monthly Streams',
      width: '120px',
      render: (label) => (
        <span className="text-sm font-semibold text-blue-600">{label.monthlyStreams}</span>
      )
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

  return (
    <Layout
      title="Record Labels"
      subtitle="Manage record labels and their artist rosters."
      icon={Tag}
    >
      <div className="space-y-6">
        {/* Search and Filters */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search labels..."
          onFilter={() => console.log('Filter clicked')}
          onAdd={() => setShowAddModal(true)}
          addButtonText="Add Label"
          view={view}
          setView={setView}
        />

        {/* Labels Display */}
        {view === 'list' ? (
          <ListView
            data={labels}
            columns={labelColumns}
            onRowClick={handleLabelClick}
            onMenuClick={(label) => console.log('Menu clicked for', label.name)}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {labels.map((label, index) => (
              <Card
                key={label.id}
                index={index}
                onClick={() => handleLabelClick(label)}
                onMenuClick={() => console.log('Menu clicked for', label.name)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={label.logo}
                      alt={label.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {label.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {label.type}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          {label.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>Founded {label.founded}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{label.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {label.genres.map((genre, idx) => (
                      <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-4 w-4 text-gray-500 mr-1" />
                    </div>
                    <p className="text-gray-900 font-semibold">{label.artists}</p>
                    <p className="text-gray-500 text-xs">Artists</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Disc3 className="h-4 w-4 text-gray-500 mr-1" />
                    </div>
                    <p className="text-gray-900 font-semibold">{label.releases}</p>
                    <p className="text-gray-500 text-xs">Releases</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <TrendingUp className="h-4 w-4 text-gray-500 mr-1" />
                    </div>
                    <p className="text-gray-900 font-semibold">{label.monthlyStreams}</p>
                    <p className="text-gray-500 text-xs">Monthly</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Add Label Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add New Label"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Label Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter label name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Major Label</option>
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
                Add Label
              </button>
            </div>
          </div>
        </Modal>

        {/* Label Detail Modal */}
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title={selectedLabel?.name || "Label Details"}
          size="lg"
        >
          {selectedLabel && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedLabel.logo}
                  alt={selectedLabel.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedLabel.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                      {selectedLabel.type}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                      {selectedLabel.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Information</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Founded {selectedLabel.founded}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedLabel.location}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Statistics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Artists:</span>
                      <span className="font-medium">{selectedLabel.artists}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Releases:</span>
                      <span className="font-medium">{selectedLabel.releases}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Streams:</span>
                      <span className="font-medium text-blue-600">{selectedLabel.monthlyStreams}</span>
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

export default Labels;
