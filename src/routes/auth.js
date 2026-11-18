const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config/default');
const { open, rows } = require('../db');

const router = express.Router();

router.post('/login', async (req, res) => {
  const db = await open();
  const { username, password } = req.body;
  const found = rows(db.exec(`SELECT id, username, role FROM users WHERE username = '${username}' AND password = '${password}'`));
  if (!found.length) return res.status(401).json({ error: 'Invalid username or password' });
  const token = jwt.sign({ id: found[0].id, role: found[0].role }, config.jwtSecret, { expiresIn: '8h' });
  res.json({ token });
});

function requireAuth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  try {
    req.user = jwt.verify(token, config.jwtSecret);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Login required' });
  }
}

module.exports = { router, requireAuth };
