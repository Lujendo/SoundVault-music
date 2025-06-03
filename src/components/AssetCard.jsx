import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Heart, 
  Share2, 
  MoreVertical,
  TrendingUp,
  Clock
} from 'lucide-react';

const AssetCard = ({ asset, index }) => {
  const [isPlaying, setIsPlaying] = useState(asset.isPlaying);
  const [isLiked, setIsLiked] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5
      }
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start space-x-4">
        {/* Album Cover */}
        <div className="relative">
          <img
            src={asset.cover}
            alt={asset.title}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <motion.button
            onClick={handlePlayPause}
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 text-white" />
            ) : (
              <Play className="h-6 w-6 text-white ml-1" />
            )}
          </motion.button>
        </div>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-300">
                {asset.title}
              </h3>
              <p className="text-gray-600 text-sm">{asset.artist}</p>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 opacity-0 group-hover:opacity-100">
              <MoreVertical className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          {/* Genre and Duration */}
          <div className="flex items-center space-x-4 mb-3">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              {asset.genre}
            </span>
            <div className="flex items-center space-x-1 text-gray-500 text-sm">
              <Clock className="h-3 w-3" />
              <span>{asset.duration}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-gray-500 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>{asset.streams} streams</span>
              </div>
              <div className="text-green-600 font-semibold text-sm">
                {asset.revenue}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                onClick={handleLike}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isLiked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </motion.button>
              <motion.button
                className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share2 className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Playing Indicator */}
      {isPlaying && (
        <motion.div
          className="mt-4 flex items-center space-x-2"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="flex space-x-1">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-blue-500 rounded-full"
                animate={{
                  height: [4, 16, 4],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
          <span className="text-blue-500 text-sm font-medium">Now Playing</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AssetCard;
