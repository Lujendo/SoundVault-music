# SoundVault Deployment Guide

## 🚀 Sevalla Deployment Methods

This guide covers two deployment methods for the SoundVault music publishing management system.

### 📋 Prerequisites

1. **Sevalla Account** with hosting plan
2. **Domain** configured in Sevalla
3. **MariaDB Database** set up in Sevalla
4. **Git Repository** (GitHub/GitLab) for Method 1

---

## 🔧 Method 1: Git Repository Deployment

### Step 1: Database Setup
1. Create MariaDB database in Sevalla control panel
2. Note down database credentials:
   - Host
   - Username
   - Password
   - Database name

### Step 2: Repository Setup
1. Push code to GitHub/GitLab repository: **SoundVault-music**
2. Connect repository to Sevalla
3. Set deployment branch (main/master)

### Step 3: Environment Configuration
1. Copy `backend/.env.production.example` to `backend/.env.production`
2. Update with your Sevalla database credentials
3. Set CORS_ORIGIN to your frontend domain
4. Configure JWT_SECRET with secure random string

### Step 4: Build Configuration
- **Frontend**: Vite build (npm run build)
- **Backend**: Node.js application (npm start)
- **Database**: Run migration and seed scripts

---

## 🐳 Method 2: Docker Deployment

### Step 1: Docker Setup
1. Ensure Docker is available on Sevalla
2. Use provided docker-compose.yml
3. Configure environment variables

### Step 2: Database Configuration
- Use Sevalla MariaDB or Docker MariaDB
- Update connection strings in docker-compose.yml

### Step 3: Container Deployment
```bash
docker-compose up -d
```

---

## 🗄️ Database Migration

### Initial Setup
```bash
cd backend
npm run migrate
npm run seed
```

### Production Migration
```sql
-- Run these SQL commands in Sevalla phpMyAdmin or MySQL client
-- (Migration scripts are in backend/src/scripts/)
```

---

## 🌐 Frontend Configuration

### Build Settings
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18+

### Environment Variables
- **VITE_API_URL**: Backend API URL
- **VITE_APP_NAME**: SoundVault

---

## 🔧 Backend Configuration

### Runtime Settings
- **Start Command**: `npm start`
- **Node Version**: 18+
- **Port**: 3001

### Required Environment Variables
- DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
- JWT_SECRET
- CORS_ORIGIN
- NODE_ENV=production

---

## 🔍 Testing Deployment

### Health Checks
1. **Frontend**: Check if app loads at your domain
2. **Backend**: Test API endpoints
3. **Database**: Verify data is accessible
4. **CORS**: Ensure frontend can call backend

### API Endpoints to Test
- GET /api/artists
- GET /api/publishers
- GET /api/recordings
- GET /api/releases

---

## 🛠️ Troubleshooting

### Common Issues
1. **CORS Errors**: Check CORS_ORIGIN configuration
2. **Database Connection**: Verify credentials and host
3. **Build Failures**: Check Node.js version compatibility
4. **API 500 Errors**: Check backend logs and environment variables

### Logs Location
- **Frontend**: Browser console
- **Backend**: Server logs in Sevalla control panel
- **Database**: MariaDB error logs

---

## 📊 Monitoring

### Key Metrics
- **Response Times**: API endpoint performance
- **Database Connections**: Connection pool usage
- **Error Rates**: 4xx/5xx HTTP responses
- **Resource Usage**: CPU, Memory, Disk

### Health Endpoints
- **Backend Health**: GET /api/health
- **Database Health**: GET /api/health/db
