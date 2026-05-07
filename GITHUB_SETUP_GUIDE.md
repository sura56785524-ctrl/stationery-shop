# GitHub Setup Guide for InkSpire Stationery Shop

## Prerequisites
1. Install Git on your system: https://git-scm.com/downloads
2. Create a GitHub account if you don't have one
3. Install GitHub CLI (optional): https://cli.github.com/

## Method 1: Using Git Commands

### Step 1: Initialize Git Repository
```bash
cd C:\Users\IT1\CascadeProjects\stationery-shop-main
git init
```

### Step 2: Add Remote Repository
```bash
git remote add origin git@github.com:sura56785524-ctrl/stationery-shop.git
```

### Step 3: Add All Files
```bash
git add .
```

### Step 4: Create Initial Commit
```bash
git commit -m "Initial commit: Enhanced InkSpire Stationery Shop

✨ Features Added:
- Changed currency from USD to ETB (Ethiopian Birr)
- Fixed functional wishlist/like buttons on product cards
- Added Amharic language support with RTL layout
- Enhanced AI assistant with Groq API integration
- Improved dark mode with better readability and attractiveness
- Enhanced background visibility while maintaining text readability

🔧 Technical Improvements:
- Bilingual support (English/Amharic) with i18n system
- Multiple AI provider fallbacks (Groq → Gemini → OpenAI)
- Professional dark theme with proper contrast ratios
- Functional wishlist management with localStorage
- Responsive RTL support for Amharic text
- Enhanced UI/UX with subtle background overlays"
```

### Step 5: Push to GitHub
```bash
git branch -M main
git push -u origin main
```

## Method 2: Using GitHub Desktop (GUI)

1. Download and install GitHub Desktop: https://desktop.github.com/
2. Open GitHub Desktop
3. Click "File" → "Add Local Repository"
4. Navigate to `C:\Users\IT1\CascadeProjects\stationery-shop-main`
5. Click "Add Repository"
6. Click "Publish repository" in the top right
7. Enter repository name: `stationery-shop`
8. Select owner: `sura56785524-ctrl`
9. Check "Keep this code private" (if you want it private)
10. Click "Publish repository"

## Method 3: Using GitHub Web Interface

1. Go to https://github.com/sura56785524-ctrl/stationery-shop
2. If repository doesn't exist, create it first
3. Click "Add file" → "Upload files"
4. Drag and drop all files from the project folder
5. Add commit message (same as above)
6. Click "Commit changes"

## Important Files to Include

### Core Files:
- `index.html` - Main homepage
- `products.html` - Products page
- `cart.html` - Shopping cart
- `checkout.html` - Checkout process
- `login.html` / `register.html` - Authentication
- `about.html` - About page
- `admin.html` - Admin dashboard

### JavaScript Files:
- `js/app.js` - Main application controller
- `js/products.js` - Product management
- `js/cart.js` - Shopping cart functionality
- `js/auth.js` - Authentication system
- `js/i18n.js` - Internationalization (NEW)
- `js/toast.js` - Toast notifications

### CSS Files:
- `css/style.css` - Main stylesheet (Enhanced)

### Backend Files:
- `backend/server.js` - Node.js server
- `backend/controllers/assistantController.js` - AI assistant (Enhanced)
- `backend/data/seed.js` - Database seeding (Updated for ETB)

### Configuration Files:
- `package.json` - Dependencies
- `.env.example` - Environment variables template
- `README.md` - Project documentation

## Environment Variables Required

Create a `.env` file in the backend directory with:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key

# AI Assistant (Choose one or more)
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
AI_PROVIDER=groq

# Admin Auto-Creation (Optional)
AUTO_ADMIN_EMAIL=admin@example.com
AUTO_ADMIN_PASSWORD=admin123
AUTO_ADMIN_NAME=Admin
```

## After Pushing to GitHub

1. **Deploy to Render** (if using):
   - Connect your GitHub repository to Render
   - Set environment variables in Render dashboard
   - Deploy the application

2. **Run Locally**:
   ```bash
   cd C:\Users\IT1\CascadeProjects\stationery-shop-main
   npm install
   npm start
   ```
   Visit: http://localhost:3000

## Features Showcase

### 🌍 Bilingual Support
- Language switcher in navigation (EN/አማ)
- RTL layout for Amharic text
- Translated UI elements

### 🌙 Enhanced Dark Mode
- Professional dark theme
- Better contrast and readability
- Smooth transitions

### 💰 ETB Currency
- All prices displayed in Ethiopian Birr
- Updated shipping thresholds
- AI assistant responses in ETB

### ❤️ Functional Wishlist
- Add/remove items from wishlist
- Visual feedback with heart icons
- Persistent storage

### 🤖 Enhanced AI Assistant
- Groq API integration
- Multiple provider fallbacks
- Better customer responses

### 🎨 Visual Improvements
- Subtle background overlays
- Enhanced card designs
- Better visual hierarchy

## Troubleshooting

### Git Issues:
- Make sure Git is installed and in PATH
- Check SSH keys for GitHub access
- Verify repository URL is correct

### Deployment Issues:
- Check environment variables
- Verify MongoDB connection
- Ensure all dependencies are installed

### UI Issues:
- Clear browser cache
- Check CSS file loading
- Verify JavaScript console for errors

## Support

If you encounter any issues:
1. Check this guide first
2. Review error messages carefully
3. Ensure all files are included in the commit
4. Verify environment variables are set correctly

Happy coding! 🚀
