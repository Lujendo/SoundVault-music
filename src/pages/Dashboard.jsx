import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Music,
  TrendingUp,
  DollarSign,
  Users,
  LayoutDashboard
} from 'lucide-react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import StatsCard from '../components/StatsCard';
import AssetCard from '../components/AssetCard';
import ListView from '../components/ListView';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [view, setView] = useState('card'); // Default to card view for dashboard

  // Mock data for demonstration
  const stats = [
    {
      title: "Total Assets",
      value: "2,847",
      change: "+12%",
      icon: Music,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Monthly Revenue",
      value: "$47,892",
      change: "+8.2%",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Active Artists",
      value: "156",
      change: "+5.1%",
      icon: Users,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Streams This Month",
      value: "1.2M",
      change: "+15.3%",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500"
    }
  ];

  const recentAssets = [
    {
      id: 1,
      title: "Midnight Dreams",
      artist: "Luna Rodriguez",
      genre: "Pop",
      duration: "3:42",
      streams: "847K",
      revenue: "$2,340",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      isPlaying: false
    },
    {
      id: 2,
      title: "Electric Pulse",
      artist: "The Neon Collective",
      genre: "Electronic",
      duration: "4:15",
      streams: "1.2M",
      revenue: "$3,890",
      cover: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=300&h=300&fit=crop",
      isPlaying: true
    },
    {
      id: 3,
      title: "Acoustic Sunrise",
      artist: "James Mitchell",
      genre: "Folk",
      duration: "2:58",
      streams: "523K",
      revenue: "$1,670",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      isPlaying: false
    },
    {
      id: 4,
      title: "Bass Revolution",
      artist: "DJ Spectrum",
      genre: "EDM",
      duration: "5:23",
      streams: "2.1M",
      revenue: "$5,230",
      cover: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=300&h=300&fit=crop",
      isPlaying: false
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

  // Define columns for ListView
  const assetColumns = [
    {
      key: 'title',
      header: 'Track',
      width: '2fr',
      render: (asset) => (
        <div className="flex items-center space-x-3">
          <img
            src={asset.cover}
            alt={asset.title}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div>
            <div className="font-medium text-gray-900">{asset.title}</div>
            <div className="text-sm text-gray-500">{asset.artist}</div>
          </div>
        </div>
      )
    },
    {
      key: 'genre',
      header: 'Genre',
      width: '100px',
      render: (asset) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
          {asset.genre}
        </span>
      )
    },
    {
      key: 'duration',
      header: 'Duration',
      width: '80px',
      render: (asset) => (
        <span className="text-sm text-gray-600">{asset.duration}</span>
      )
    },
    {
      key: 'streams',
      header: 'Streams',
      width: '100px',
      render: (asset) => (
        <span className="text-sm font-medium text-gray-900">{asset.streams}</span>
      )
    },
    {
      key: 'revenue',
      header: 'Revenue',
      width: '100px',
      render: (asset) => (
        <span className="text-sm font-semibold text-green-600">{asset.revenue}</span>
      )
    }
  ];

  return (
    <Layout
      title="Welcome back, Alex! 👋"
      subtitle="Here's what's happening with your music catalog today."
      icon={LayoutDashboard}
    >
      <div className="space-y-6">

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Search and Filters */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search assets, artists, or genres..."
          onFilter={() => console.log('Filter clicked')}
          onAdd={() => console.log('Add asset clicked')}
          addButtonText="Add Asset"
          view={view}
          setView={setView}
        />

        {/* Recent Assets */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Assets</h2>
          {view === 'list' ? (
            <ListView
              data={recentAssets}
              columns={assetColumns}
              onRowClick={(asset) => console.log('Asset clicked:', asset.title)}
              onMenuClick={(asset) => console.log('Menu clicked for:', asset.title)}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recentAssets.map((asset, index) => (
                <AssetCard key={asset.id} asset={asset} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
