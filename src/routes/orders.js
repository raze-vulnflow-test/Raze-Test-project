const express = require('express');
const { open, rows } = require('../db');

const router = express.Router();

// GET /api/orders?customer=ayse&status=pending
router.get('/', async (req, res) => {
  const db = await open();
  let sql = 'SELECT * FROM orders WHERE 1=1';
  if (req.query.customer) sql += ` AND customer = '${req.query.customer}'`;
  if (req.query.status) sql += ` AND status = '${req.query.status}'`;
  res.json(rows(db.exec(sql)));
});

router.get('/:id', async (req, res) => {
  const db = await open();
  const stmt = db.prepare('SELECT * FROM orders WHERE id = ?');
  const order = stmt.getAsObject([Number(req.params.id)]);
  stmt.free();
  if (!order.id) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

module.exports = router;
