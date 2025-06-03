#!/bin/bash

# SoundVault Sevalla Deployment Script
# This script helps deploy the application to Sevalla using Docker

set -e  # Exit on any error

echo "🚀 SoundVault Sevalla Deployment Script"
echo "======================================="

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    echo "❌ Error: .env.production file not found!"
    echo "Please copy .env.production.example and configure it with your Sevalla credentials."
    exit 1
fi

# Load environment variables
source .env.production

echo "📋 Deployment Configuration:"
echo "- Environment: $NODE_ENV"
echo "- Database Host: $DB_HOST"
echo "- Frontend URL: $FRONTEND_URL"
echo ""

# Function to build and deploy with Docker
deploy_docker() {
    echo "🐳 Starting Docker deployment..."
    
    # Build images
    echo "📦 Building Docker images..."
    docker-compose -f docker-compose.production.yml build
    
    # Start services
    echo "🚀 Starting services..."
    docker-compose -f docker-compose.production.yml up -d
    
    # Wait for services to be ready
    echo "⏳ Waiting for services to start..."
    sleep 30
    
    # Run database migrations
    echo "🗄️ Running database migrations..."
    docker-compose -f docker-compose.production.yml exec backend npm run migrate
    docker-compose -f docker-compose.production.yml exec backend npm run seed
    
    echo "✅ Docker deployment completed!"
}

# Function to deploy via Git (for Sevalla Git deployment)
deploy_git() {
    echo "📂 Preparing Git deployment..."
    
    # Build frontend
    echo "📦 Building frontend..."
    npm run build:prod
    
    # Build backend (if needed)
    echo "📦 Preparing backend..."
    cd backend
    npm install --production
    cd ..
    
    echo "✅ Git deployment preparation completed!"
    echo "📤 Push to your Git repository and deploy via Sevalla control panel."
}

# Function to test deployment
test_deployment() {
    echo "🧪 Testing deployment..."
    
    # Test backend health
    echo "🔍 Testing backend health..."
    if curl -f http://localhost:3001/api/health; then
        echo "✅ Backend is healthy"
    else
        echo "❌ Backend health check failed"
        return 1
    fi
    
    # Test database connection
    echo "🔍 Testing database connection..."
    if curl -f http://localhost:3001/api/health/db; then
        echo "✅ Database connection is healthy"
    else
        echo "❌ Database connection failed"
        return 1
    fi
    
    # Test frontend (if running on port 80)
    echo "🔍 Testing frontend..."
    if curl -f http://localhost/health; then
        echo "✅ Frontend is healthy"
    else
        echo "⚠️ Frontend health check failed (may be normal if not running locally)"
    fi
    
    echo "✅ Deployment tests completed!"
}

# Main deployment logic
case "${1:-docker}" in
    "docker")
        deploy_docker
        test_deployment
        ;;
    "git")
        deploy_git
        ;;
    "test")
        test_deployment
        ;;
    "stop")
        echo "🛑 Stopping Docker services..."
        docker-compose -f docker-compose.production.yml down
        echo "✅ Services stopped!"
        ;;
    *)
        echo "Usage: $0 [docker|git|test|stop]"
        echo ""
        echo "Commands:"
        echo "  docker  - Deploy using Docker (default)"
        echo "  git     - Prepare for Git-based deployment"
        echo "  test    - Test current deployment"
        echo "  stop    - Stop Docker services"
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment script completed!"
echo "📊 Check your Sevalla control panel for deployment status."
