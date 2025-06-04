#!/usr/bin/env node

/**
 * SoundVault Server Startup Script
 * Ensures backend dependencies are installed and starts the server
 */

import { spawn } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting SoundVault Server...');
console.log('📁 Working directory:', process.cwd());
console.log('📍 Script location:', __dirname);

// Check if backend directory exists
const backendPath = path.join(__dirname, 'backend');
const serverPath = path.join(backendPath, 'src', 'server.js');

if (!existsSync(backendPath)) {
  console.error('❌ Backend directory not found:', backendPath);
  process.exit(1);
}

if (!existsSync(serverPath)) {
  console.error('❌ Server file not found:', serverPath);
  process.exit(1);
}

console.log('✅ Backend directory found:', backendPath);
console.log('✅ Server file found:', serverPath);

// Check if backend node_modules exists
const backendNodeModules = path.join(backendPath, 'node_modules');
if (!existsSync(backendNodeModules)) {
  console.log('📦 Installing backend dependencies...');
  
  const installProcess = spawn('npm', ['install'], {
    cwd: backendPath,
    stdio: 'inherit',
    shell: true
  });

  installProcess.on('close', (code) => {
    if (code !== 0) {
      console.error('❌ Failed to install backend dependencies');
      process.exit(1);
    }
    console.log('✅ Backend dependencies installed');
    startServer();
  });

  installProcess.on('error', (error) => {
    console.error('❌ Error installing dependencies:', error);
    process.exit(1);
  });
} else {
  console.log('✅ Backend dependencies already installed');
  startServer();
}

function startServer() {
  console.log('🚀 Starting SoundVault API Server...');
  
  const serverProcess = spawn('node', ['src/server.js'], {
    cwd: backendPath,
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      NODE_ENV: process.env.NODE_ENV || 'production'
    }
  });

  serverProcess.on('close', (code) => {
    console.log(`🛑 Server process exited with code ${code}`);
    process.exit(code);
  });

  serverProcess.on('error', (error) => {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  });

  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    console.log('📡 Received SIGTERM, shutting down gracefully...');
    serverProcess.kill('SIGTERM');
  });

  process.on('SIGINT', () => {
    console.log('📡 Received SIGINT, shutting down gracefully...');
    serverProcess.kill('SIGINT');
  });
}
