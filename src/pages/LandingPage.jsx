import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Music, Play, TrendingUp, Users, Award, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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

  const features = [
    {
      icon: Music,
      title: "Asset Management",
      description: "Organize and manage your entire music catalog with advanced metadata and tagging"
    },
    {
      icon: TrendingUp,
      title: "Analytics & Insights",
      description: "Track performance, royalties, and market trends with real-time analytics"
    },
    {
      icon: Users,
      title: "Artist Relations",
      description: "Manage artist contracts, collaborations, and revenue sharing seamlessly"
    },
    {
      icon: Award,
      title: "Rights Management",
      description: "Handle licensing, publishing rights, and copyright protection efficiently"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <motion.nav 
        className="relative z-10 flex justify-between items-center p-6 lg:px-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-2">
          <Music className="h-8 w-8 text-white" />
          <span className="text-2xl font-bold text-white">SoundVault</span>
        </div>
        <motion.button
          onClick={() => navigate('/dashboard')}
          className="glass px-6 py-2 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Dashboard
        </motion.button>
      </motion.nav>

      {/* Hero Section */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <h1 className="text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Your Music,
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {" "}Amplified
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The ultimate platform for music publishers to manage assets, track royalties, 
            and grow their catalog with cutting-edge technology.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <motion.button
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started <ArrowRight className="h-5 w-5" />
          </motion.button>
          <motion.button
            className="glass text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="h-5 w-5" /> Watch Demo
          </motion.button>
        </motion.div>

        {/* Floating music notes animation */}
        <motion.div
          className="absolute top-1/4 left-1/4 text-white opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Music className="h-12 w-12" />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-1/4 text-white opacity-20"
          animate={{
            y: [0, -30, 0],
            rotate: [0, -15, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Music className="h-8 w-8" />
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="relative z-10 px-6 lg:px-12 pb-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 
          variants={itemVariants}
          className="text-4xl lg:text-5xl font-bold text-white text-center mb-16"
        >
          Powerful Features for Modern Publishers
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 group"
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <feature.icon className="h-12 w-12 text-white mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
