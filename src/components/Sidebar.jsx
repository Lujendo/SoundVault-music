import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Music,
  LayoutDashboard,
  Library,
  Users,
  TrendingUp,
  DollarSign,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Building2,
  Tag,
  Disc3,
  Album
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/dashboard',
      active: location.pathname === '/dashboard'
    },
    {
      icon: Library,
      label: 'Asset Library',
      path: '/library',
      active: location.pathname === '/library'
    },
    {
      icon: Building2,
      label: 'Publishers',
      path: '/publishers',
      active: location.pathname === '/publishers'
    },
    {
      icon: Tag,
      label: 'Labels',
      path: '/labels',
      active: location.pathname === '/labels'
    },
    {
      icon: Users,
      label: 'Artists',
      path: '/artists',
      active: location.pathname === '/artists'
    },
    {
      icon: Disc3,
      label: 'Recordings',
      path: '/recordings',
      active: location.pathname === '/recordings'
    },
    {
      icon: Album,
      label: 'Releases',
      path: '/releases',
      active: location.pathname === '/releases'
    },
    {
      icon: TrendingUp,
      label: 'Analytics',
      path: '/analytics',
      active: location.pathname === '/analytics'
    },
    {
      icon: DollarSign,
      label: 'Royalties',
      path: '/royalties',
      active: location.pathname === '/royalties'
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/settings',
      active: location.pathname === '/settings'
    }
  ];

  const sidebarVariants = {
    expanded: {
      width: '280px',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    collapsed: {
      width: '80px',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      variants={sidebarVariants}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      className="bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col shadow-sm"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3"
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <Music className="h-8 w-8 text-gray-800" />
            {!isCollapsed && (
              <span className="text-xl font-bold text-gray-800">SoundVault</span>
            )}
          </motion.div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.path}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  item.active
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <item.icon className={`h-5 w-5 ${item.active ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
                <motion.span
                  animate={{ opacity: isCollapsed ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  className={`font-medium ${isCollapsed ? 'hidden' : 'block'}`}
                >
                  {item.label}
                </motion.span>
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <span className="text-white font-semibold">A</span>
          </div>
          <motion.div
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className={isCollapsed ? 'hidden' : 'block'}
          >
            <p className="text-gray-900 font-medium">Alex Johnson</p>
            <p className="text-gray-500 text-sm">Music Publisher</p>
          </motion.div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 group"
        >
          <LogOut className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
          <motion.span
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className={`font-medium ${isCollapsed ? 'hidden' : 'block'}`}
          >
            Sign Out
          </motion.span>
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
