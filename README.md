# InkSpire Shop

HTML/CSS/JS storefront + Node/Express API + MongoDB.

## Run locally

1. Create `.env` (see `.env.example`)
2. Install deps:

```bash
npm install
```

3. Start:

```bash
npm start
```

Open `http://localhost:3000`.

## Deploy on Render

### Prerequisites

- A MongoDB database (recommended: MongoDB Atlas). You need a connection string for `MONGODB_URI`.
- A strong `JWT_SECRET` (32+ chars).

### Steps

1. Put this project in a GitHub repo (Render deploys from Git).
2. In Render: **New +** → **Web Service** → connect the repo.
3. Render will detect `render.yaml`. Confirm:
   - **Build Command**: `npm ci`
   - **Start Command**: `npm start`
4. In Render → **Environment**, set:
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = long random string
   - (optional) `GEMINI_API_KEY` and/or `OPENAI_API_KEY` for the AI assistant
5. Deploy. Your public URL will look like `https://<service-name>.onrender.com`.

