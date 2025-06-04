#!/usr/bin/env node

/**
 * JWT Secret Generator for SoundVault
 * Generates a cryptographically secure random string for JWT signing
 */

import crypto from 'crypto';

// Generate a secure 64-byte random string
const generateJWTSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

// Generate multiple options
console.log('🔐 SoundVault JWT Secret Generator');
console.log('=====================================');
console.log('');
console.log('Choose one of these secure JWT secrets for your production deployment:');
console.log('');

for (let i = 1; i <= 3; i++) {
  const secret = generateJWTSecret();
  console.log(`Option ${i}:`);
  console.log(`JWT_SECRET=${secret}`);
  console.log('');
}

console.log('📋 Instructions:');
console.log('1. Copy one of the JWT_SECRET values above');
console.log('2. Add it to your Sevalla environment variables');
console.log('3. Keep this secret secure and never commit it to version control');
console.log('');
console.log('🔒 Security Notes:');
console.log('- Each secret is 128 characters long (512 bits)');
console.log('- Generated using cryptographically secure random bytes');
console.log('- Suitable for production use');
console.log('- Never share or expose this secret');
