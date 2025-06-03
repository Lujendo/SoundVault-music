import { motion } from 'framer-motion';
import { Search, Filter, Plus } from 'lucide-react';
import ViewToggle from './ViewToggle';

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  placeholder = "Search...",
  onFilter,
  onAdd,
  addButtonText = "Add New",
  showFilter = true,
  showAdd = true,
  view,
  setView,
  showViewToggle = true
}) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        <div className="flex items-center gap-3">
          {showViewToggle && view && setView && (
            <ViewToggle view={view} setView={setView} />
          )}
          {showFilter && (
            <motion.button
              onClick={onFilter}
              className="flex items-center gap-2 px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-200 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Filter className="h-4 w-4" />
              Filter
            </motion.button>
          )}
          {showAdd && (
            <motion.button
              onClick={onAdd}
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="h-4 w-4" />
              {addButtonText}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SearchBar;
