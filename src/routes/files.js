const express = require('express');
const path = require('path');
const config = require('../../config/default');

const router = express.Router();

// GET /api/files/invoice?name=sample.txt
router.get('/invoice', (req, res) => {
  const file = path.join(process.cwd(), config.invoicesDir, req.query.name);
  res.sendFile(file);
});

module.exports = router;
