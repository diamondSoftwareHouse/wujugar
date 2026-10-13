import 'server-only';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not configured');
}

const globalForPg = globalThis as unknown as {
  pool?: Pool;
};

export const pool =
  globalForPg.pool ??
  new Pool({
    connectionString,
    max: 5,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    keepAlive: true,
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPg.pool = pool;
}
