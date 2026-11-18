const express = require('express');
const _ = require('lodash');

const router = express.Router();
const settings = { theme: 'light', language: 'tr' };

// GET /profile/welcome?name=Ayse
router.get('/welcome', (req, res) => {
  res.send(`<h1>Hoş geldin ${req.query.name}</h1><p>Siparişlerini buradan takip edebilirsin.</p>`);
});

// POST /profile/settings  { "theme": "dark" }
router.post('/settings', (req, res) => {
  _.merge(settings, req.body);
  res.json(settings);
});

module.exports = router;
