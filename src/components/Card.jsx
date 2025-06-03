import { motion } from 'framer-motion';
import { MoreVertical } from 'lucide-react';

const Card = ({ 
  children, 
  onClick, 
  onMenuClick, 
  className = "",
  index = 0,
  showMenu = true 
}) => {
  return (
    <motion.div
      className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group cursor-pointer ${className}`}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
    >
      <div className="relative">
        {children}
        {showMenu && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMenuClick && onMenuClick();
            }}
            className="absolute top-0 right-0 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 opacity-0 group-hover:opacity-100"
          >
            <MoreVertical className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
