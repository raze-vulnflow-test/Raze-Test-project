// In-memory SQLite (sql.js) with a few sample rows, so the API runs without a database server.
const initSqlJs = require('sql.js');

let db;

async function open() {
  if (db) return db;
  const SQL = await initSqlJs();
  db = new SQL.Database();
  db.run(`
    CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, role TEXT);
    CREATE TABLE orders (id INTEGER PRIMARY KEY, customer TEXT, product TEXT, amount REAL, status TEXT);
    INSERT INTO users VALUES (1, 'admin', 'admin123', 'admin'), (2, 'ayse', 'ayse2026', 'user');
    INSERT INTO orders VALUES
      (1, 'ayse', 'Laptop stand', 51.25, 'shipped'),
      (2, 'mehmet', 'USB-C hub', 34.90, 'pending'),
      (3, 'ayse', 'Monitor arm', 89.00, 'pending');
  `);
  return db;
}

function rows(result) {
  if (!result.length) return [];
  const { columns, values } = result[0];
  return values.map((v) => Object.fromEntries(columns.map((c, i) => [c, v[i]])));
}

module.exports = { open, rows };
