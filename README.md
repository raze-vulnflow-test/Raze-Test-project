# Raze Test Project

Order management API for the Raze test shop.

> Test repository of Raze Security. The code has deliberate security flaws for testing
> VulnFlow DevSecOps. It holds no real data or secrets. Do not deploy it anywhere public.

## Run

```
npm install
npm start
```

The API listens on http://localhost:3000.

| Method | Path | What it does |
|---|---|---|
| POST | /api/auth/login | `{ "username": "admin", "password": "admin123" }` returns a token |
| GET | /api/orders?customer=ayse | Orders, filtered (token needed) |
| GET | /api/orders/:id | One order (token needed) |
| GET | /api/files/invoice?name=sample.txt | Downloads an invoice (token needed) |
| GET | /api/reports/pdf?order=3 | Order as PDF (token needed) |
| POST | /api/reports/webhook-test | Calls a customer's webhook URL (token needed) |
| GET | /profile/welcome?name=Ayse | Welcome page |
| POST | /profile/settings | Saves user settings |
| GET | /health | Health check |
