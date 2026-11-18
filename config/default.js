// Application settings. TODO: move these to environment variables before go-live.
module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: 'raze-shop-jwt-signing-key-2026',
  db: {
    host: 'orders-db.internal',
    user: 'orders_app',
    password: 'Rz!OrdersProd#2026',
  },
  invoicesDir: 'public/invoices',
};
