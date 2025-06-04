# 🎵 SoundVault - Music Publishing Management System

A comprehensive full-stack application for managing music publishing assets, built with React, Node.js, and MariaDB.

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
npm install
cd backend && npm install && cd ..

# Start development servers
npm run dev          # Frontend (port 5174)
cd backend && npm run dev  # Backend (port 3001)

# Start database
docker-compose up -d mariadb phpmyadmin
```

### Production Deployment to Sevalla
```bash
# Method 1: Docker Deployment
./deploy-sevalla.sh docker

# Method 2: Git Deployment (Repository: SoundVault-music)
./deploy-sevalla.sh git
```

## 📋 Features

- **Artists Management** - Complete artist profiles with social media
- **Publishers & Labels** - Music industry relationships
- **Recordings & Releases** - Track songs and album releases
- **Revenue Tracking** - Royalties and financial metrics
- **Real-time Dashboard** - Analytics and performance metrics
- **Responsive Design** - Modern UI with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, JWT Authentication
- **Database**: MariaDB with phpMyAdmin
- **Deployment**: Docker, Sevalla hosting

## 📖 Deployment Guides

- **[SEVALLA-CONNECTED-APPS.md](./SEVALLA-CONNECTED-APPS.md)** - Sevalla Connected Applications setup (Recommended)
- **[SEVALLA-DEPLOYMENT.md](./SEVALLA-DEPLOYMENT.md)** - General Sevalla deployment guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Universal deployment instructions
