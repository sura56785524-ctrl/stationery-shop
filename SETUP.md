# InkSpire Full-Stack Setup Guide

This project now runs with:
- Frontend: HTML/CSS/JS (root files)
- Backend: Node.js + Express + MongoDB (`backend/`)
- Auth: JWT

## 1) Install dependencies

```bash
npm install
```

## 2) Configure environment variables

Create `.env` in the project root based on `.env.example`:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=inkspire_shop
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
```

## 3) Seed database (adds 10+ products per category)

```bash
npm run seed
```

## 3b) Make a user admin (so Admin Panel works)

1) Register/login at `register.html` / `login.html`
2) Promote by email:

```bash
npm run make-admin -- youremail@example.com
```

## 4) Start app

```bash
npm start
```

App runs on `http://localhost:3000`.

## 5) Render deployment

Create a Render Web Service:
- Build command: `npm install`
- Start command: `npm start`
- Add environment variables from `.env.example`
- Ensure `MONGODB_URI` points to your production MongoDB.

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/products`
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)
- `GET /api/users` (admin)
- `PUT /api/users/:id`
- `GET /api/orders`
- `POST /api/orders`
- `PATCH /api/orders/:id/status` (admin)
- `GET /api/cart`
- `PUT /api/cart`
- `DELETE /api/cart`