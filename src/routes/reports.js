const express = require('express');
const { exec } = require('child_process');
const axios = require('axios');

const router = express.Router();

// GET /api/reports/pdf?order=3  -> renders the order page to a PDF with wkhtmltopdf
router.get('/pdf', (req, res) => {
  exec(`wkhtmltopdf http://localhost:3000/orders/${req.query.order} /tmp/order-${req.query.order}.pdf`, (err) => {
    if (err) return res.status(500).json({ error: 'Report could not be created' });
    res.download(`/tmp/order-${req.query.order}.pdf`);
  });
});

// POST /api/reports/webhook-test { "url": "https://..." }  -> lets a customer test their webhook
router.post('/webhook-test', async (req, res) => {
  try {
    const r = await axios.get(req.body.url, { timeout: 5000 });
    res.json({ status: r.status });
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

module.exports = router;
