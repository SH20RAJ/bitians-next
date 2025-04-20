// This script helps check the authentication configuration
require('dotenv').config({ path: '.env.local' });

console.log('Checking authentication configuration...');

// Check environment variables
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'Set' : 'Not set');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not set');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not set');

// Print the correct redirect URI
const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
console.log('\nCorrect Google OAuth Redirect URI:');
console.log(`${baseUrl}/api/auth/callback/google`);

console.log('\nPlease make sure this redirect URI is configured in your Google OAuth credentials.');
console.log('Go to https://console.cloud.google.com/apis/credentials and update your OAuth client.');
