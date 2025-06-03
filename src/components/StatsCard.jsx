import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, change, icon: Icon, color }) => {
  const isPositive = change.startsWith('+');
  
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group"
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${color} bg-opacity-10`}>
          <Icon className="h-6 w-6 text-gray-700" />
        </div>
        <div className={`flex items-center space-x-1 text-sm font-medium ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span>{change}</span>
        </div>
      </div>

      <div>
        <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
        <p className="text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
          {value}
        </p>
      </div>
    </motion.div>
  );
};

export default StatsCard;
