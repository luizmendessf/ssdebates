import express from 'express';
import generateBullets from './api/generateBullets.js';
import analyze from './api/analyze.js';

const app = express();
const PORT = 3001;

app.use(express.json({ limit: '25mb' }));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'development' });
});

app.post('/api/generateBullets', (req, res) => {
  return generateBullets(req, res);
});

app.post('/api/analyze', (req, res) => {
  return analyze(req, res);
});

app.listen(PORT, () => {
  console.log(`[api] listening on http://localhost:${PORT}`);
});