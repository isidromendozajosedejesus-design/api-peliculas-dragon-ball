import { readFile } from 'node:fs/promises';
import pg from 'pg';

const { Pool } = pg;
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('Falta configurar DATABASE_URL.');

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 10000,
});

try {
  const sql = await readFile(new URL('../db/init.sql', import.meta.url), 'utf8');
  await pool.query(sql);
  console.log('Esquema de películas creado y catálogo cargado.');
} finally {
  await pool.end();
}
