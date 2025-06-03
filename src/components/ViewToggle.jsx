import { motion } from 'framer-motion';
import { Grid3X3, List } from 'lucide-react';

const ViewToggle = ({ view, setView, className = "" }) => {
  const toggleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div
      variants={toggleVariants}
      initial="hidden"
      animate="visible"
      className={`flex items-center bg-gray-100 rounded-lg p-1 ${className}`}
    >
      <button
        onClick={() => setView('list')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          view === 'list'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <List className="h-4 w-4" />
        List
      </button>
      <button
        onClick={() => setView('card')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          view === 'card'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Grid3X3 className="h-4 w-4" />
        Card
      </button>
    </motion.div>
  );
};

export default ViewToggle;
