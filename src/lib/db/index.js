import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

// Check if we're on the server side
const isServer = typeof window === 'undefined';

// Only create the client on the server side
let client;
let db;

if (isServer) {
  // Ensure environment variables are defined
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    console.error('Turso database environment variables are not defined');
  } else {
    // Create a client instance
    client = createClient({
      url,
      authToken,
    });

    // Create a drizzle instance
    db = drizzle(client, { schema });
  }
}

export { db };
