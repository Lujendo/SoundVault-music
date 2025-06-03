import { motion } from 'framer-motion';
import Sidebar from './Sidebar';

const Layout = ({ children, title, subtitle, icon: Icon, actions }) => {
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
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6 lg:p-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    {Icon && <Icon className="h-8 w-8 text-gray-700" />}
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="text-gray-600 text-lg">
                      {subtitle}
                    </p>
                  )}
                </div>
                {actions && (
                  <div className="flex gap-3">
                    {actions}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Content */}
            <motion.div variants={itemVariants}>
              {children}
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
