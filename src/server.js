import express from 'express';
import pg from 'pg';

const { Pool } = pg;
const app = express();
const port = Number(process.env.PORT || 3000);
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('Falta configurar DATABASE_URL. Copia .env.example a .env.');

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 10000,
});
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.get('/', (_req, res) => res.json({ nombre: 'API Películas de Dragon Ball', endpoints: ['/health', '/api/peliculas', '/api/peliculas/:id'] }));
app.get('/health', async (_req, res) => {
  try { await pool.query('SELECT 1'); res.json({ status: 'ok', database: 'connected' }); }
  catch { res.status(503).json({ status: 'error', database: 'disconnected' }); }
});
app.get('/api/peliculas', async (req, res, next) => {
  const anio = req.query.anio ? Number(req.query.anio) : null;
  if (anio !== null && !Number.isInteger(anio)) return res.status(400).json({ error: 'El año debe ser un entero.' });
  try {
    const { rows } = await pool.query(
      'SELECT id, titulo, titulo_original, anio, saga FROM peliculas WHERE ($1::integer IS NULL OR anio = $1) ORDER BY anio, id',
      [anio],
    );
    res.json(rows);
  } catch (error) { next(error); }
});
app.get('/api/peliculas/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'El id debe ser un entero positivo.' });
  try {
    const { rows } = await pool.query('SELECT id, titulo, titulo_original, anio, saga FROM peliculas WHERE id = $1', [id]);
    if (!rows.length) return res.status(404).json({ error: 'Película no encontrada.' });
    res.json(rows[0]);
  } catch (error) { next(error); }
});
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: 'Error interno del servidor.' });
});
const server = app.listen(port, '0.0.0.0', () => console.log(`API escuchando en el puerto ${port}`));
async function shutdown() { server.close(); await pool.end(); process.exit(0); }
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
