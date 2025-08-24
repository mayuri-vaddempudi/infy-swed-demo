const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const SECRET = 'demo-secret';

function roleFromEmail(email) {
  if (email.endsWith('@admin.com')) return 'Admin';
  if (email.endsWith('@manager.com')) return 'Manager';
  if (email.endsWith('@agent.com')) return 'Agent';
  return 'Customer';
}

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || password !== '123456') return res.status(401).json({ message: 'Invalid credentials' });
  const role = roleFromEmail(email);
  const token = jwt.sign({ email, role }, SECRET, { expiresIn: '15m' });
  res.json({ token, email, role });
});

function auth(req, res, next) {
  const token = (req.headers.authorization || '').split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });
  try { req.user = jwt.verify(token, SECRET); next(); }
  catch { res.status(401).json({ message: 'Invalid or expired token' }); }
}

app.get('/api/verify', auth, (req, res) => {
  res.json({ email: req.user.email, role: req.user.role });
});

// --- serve Angular build in prod ---
const DIST = path.join(__dirname, 'dist', 'infy-swed-demo', 'browser');
app.use(express.static(DIST));

// SPA fallback for non-API routes (Express 5-friendly)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(DIST, 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
