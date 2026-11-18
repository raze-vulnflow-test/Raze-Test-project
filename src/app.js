const express = require('express');
const config = require('../config/default');
const auth = require('./routes/auth');

const app = express();
app.use(express.json());

app.use('/api/auth', auth.router);
app.use('/api/orders', auth.requireAuth, require('./routes/orders'));
app.use('/api/files', auth.requireAuth, require('./routes/files'));
app.use('/api/reports', auth.requireAuth, require('./routes/reports'));
app.use('/profile', require('./routes/profile'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(config.port, () => console.log(`Raze Test Project listening on http://localhost:${config.port}`));
