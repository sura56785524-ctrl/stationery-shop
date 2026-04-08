# Deploy InkSpire on Render (Public + Searchable)

Follow these steps to make your site public on all devices.

## 1) Push project to GitHub

1. Create a GitHub repository.
2. Upload this whole project (except secrets like `.env`).

## 2) Create MongoDB Atlas database (recommended)

1. Create a free cluster in MongoDB Atlas.
2. Create a database user and allow IP `0.0.0.0/0` (or restrict later).
3. Copy the connection string (`MONGODB_URI`).

## 3) Create Web Service on Render

1. Go to Render dashboard -> **New** -> **Web Service**.
2. Connect your GitHub repo.
3. Use:
   - Build Command: `npm install`
   - Start Command: `npm start`

## 4) Add environment variables in Render

Set these in Render -> Environment:

- `PORT` = `10000`
- `MONGODB_URI` = your Atlas URI
- `MONGODB_DB` = `inkspire_shop`
- `JWT_SECRET` = long random secret
- `JWT_EXPIRES_IN` = `7d`

## 5) Deploy

Click **Create Web Service**.  
Render gives you a public URL like:
`https://your-app-name.onrender.com`

## 6) Make the site searchable (SEO basics)

1. After deploy, open your site and test all pages.
2. Add your domain (optional) in Render custom domains.
3. Submit your public URL to Google Search Console.
4. Keep page titles/descriptions clean and unique.
5. Make sure the site stays online and crawlable.

## 7) Payment methods now configured

Checkout now supports:
- CBE Transfer: `1000583706187`
- Telebirr: `0956785524`
- Cash on Delivery

