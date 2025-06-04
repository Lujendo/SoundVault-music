import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Import routes
import publishersRoutes from './routes/publishers.js';
import labelsRoutes from './routes/labels.js';
import artistsRoutes from './routes/artists.js';
import recordingsRoutes from './routes/recordings.js';
import releasesRoutes from './routes/releases.js';
import analyticsRoutes from './routes/analytics.js';
import royaltiesRoutes from './routes/royalties.js';
import authRoutes from './routes/auth.js';
import healthRoutes from './routes/health.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(limiter);
app.use(cors({
  origin: process.env.FRONTEND_URL || process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
    message: 'SoundVault API is running'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'SoundVault Music Publishing API',
    version: '1.0.0',
    status: 'running',
    port: PORT,
    endpoints: {
      health: '/health',
      api: '/api',
      artists: '/api/artists',
      publishers: '/api/publishers'
    }
  });
});

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/publishers', publishersRoutes);
app.use('/api/labels', labelsRoutes);
app.use('/api/artists', artistsRoutes);
app.use('/api/recordings', recordingsRoutes);
app.use('/api/releases', releasesRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/royalties', royaltiesRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 SoundVault API Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
  console.log(`🔧 PORT environment variable: ${process.env.PORT ? 'SET by Sevalla' : 'NOT SET (using fallback)'}`);
  console.log(`📡 Server listening on 0.0.0.0:${PORT}`);
});

export default app;
