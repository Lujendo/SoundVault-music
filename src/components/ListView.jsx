import { motion } from 'framer-motion';
import { MoreVertical } from 'lucide-react';

const ListView = ({ 
  data, 
  columns, 
  onRowClick, 
  onMenuClick, 
  className = "" 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: columns.map(col => col.width || '1fr').join(' ') + ' auto' }}>
          {columns.map((column, index) => (
            <div key={index} className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              {column.header}
            </div>
          ))}
          <div className="w-8"></div> {/* Space for menu button */}
        </div>
      </div>

      {/* Body */}
      <div className="divide-y divide-gray-200">
        {data.map((item, index) => (
          <motion.div
            key={item.id || index}
            variants={rowVariants}
            className="grid gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 group"
            style={{ gridTemplateColumns: columns.map(col => col.width || '1fr').join(' ') + ' auto' }}
            onClick={() => onRowClick && onRowClick(item)}
          >
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="flex items-center">
                {column.render ? column.render(item) : (
                  <span className="text-sm text-gray-900">
                    {item[column.key]}
                  </span>
                )}
              </div>
            ))}
            <div className="flex items-center justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMenuClick && onMenuClick(item);
                }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 opacity-0 group-hover:opacity-100"
              >
                <MoreVertical className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {data.length === 0 && (
        <div className="px-6 py-12 text-center">
          <p className="text-gray-500 text-sm">No data available</p>
        </div>
      )}
    </motion.div>
  );
};

export default ListView;
