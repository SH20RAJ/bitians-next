export default {
  schema: './src/lib/db/schema.js',
  out: './drizzle',
  driver: 'libsql',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
};
