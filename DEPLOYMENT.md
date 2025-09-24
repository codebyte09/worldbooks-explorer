# Deployment Guide

## 🚀 Quick Deployment Fix

Your deployment is failing because of Playwright browser installation. Here's how to fix it:

### Option 1: Simple Deployment (Recommended for now)

1. **In Render Dashboard:**
   - Go to your `worldbooks-explorer` service
   - Click "Settings" tab
   - Update the **Build Command** to:
     ```bash
     npm install --production && npm run build
     ```
   - Update the **Start Command** to:
     ```bash
     npm run start:prod
     ```
   - Set environment variables (if not already set):
     ```
     NODE_ENV=production
     DB_SYNC=false
     SCRAPE_DELAY=3000
     ```

2. **Database Connection:**
   - Make sure your database environment variables are set:
     - `DB_HOST` - from your database service
     - `DB_USER` - from your database service  
     - `DB_PASS` - from your database service
     - `DB_NAME` - from your database service

3. **Manual Deploy:**
   - Click "Manual Deploy" → "Deploy latest commit"

### Option 2: Using render.yaml (Advanced)

1. **Delete current service** and recreate using the `render-simple.yaml`:
   ```bash
   # Use the simplified configuration
   cp backend/render-simple.yaml backend/render.yaml
   ```

2. **Push changes** and connect to Render

## 🔧 Environment Variables Setup

### Required Environment Variables:

```env
# Database (from your database service)
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASS=your-db-password
DB_NAME=worldbooks

# Application
NODE_ENV=production
PORT=3000
DB_SYNC=false
SCRAPE_DELAY=3000

# CORS
FRONTEND_URL=https://your-frontend-url.vercel.app
```

## 🐛 Common Issues & Solutions

### Issue 1: Playwright Installation Fails
**Solution:** The app now has fallback data, so it will work without Playwright

### Issue 2: Database Connection Fails
**Solution:** 
1. Check database is running (should show "Available")
2. Copy connection details from database service
3. Set environment variables correctly

### Issue 3: Build Fails
**Solution:**
1. Use the simple build command: `npm install --production && npm run build`
2. Make sure all dependencies are in `dependencies`, not `devDependencies`

### Issue 4: Port Issues
**Solution:** Render automatically sets PORT, but make sure your app uses `process.env.PORT`

## 📝 Step-by-Step Deployment

### 1. Backend Deployment (Render)

1. **Create Web Service:**
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the repository: `worldbooks-explorer`

2. **Configure Service:**
   - **Name:** `worldbooks-backend`
   - **Environment:** `Node`
   - **Build Command:** `cd backend && npm install --production && npm run build`
   - **Start Command:** `cd backend && npm run start:prod`
   - **Root Directory:** Leave empty (will use root)

3. **Set Environment Variables:**
   ```
   NODE_ENV=production
   DB_SYNC=false
   SCRAPE_DELAY=3000
   ```

4. **Database Connection:**
   - Go to your database service
   - Copy the connection details
   - Set in environment variables:
     ```
     DB_HOST=dpg-xxxxx-a.oregon-postgres.render.com
     DB_USER=worldbooks_user
     DB_PASS=your-password
     DB_NAME=worldbooks
     ```

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete

### 2. Frontend Deployment (Vercel)

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select `worldbooks-explorer`

2. **Configure:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

3. **Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
   ```

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete

## ✅ Verification

After deployment:

1. **Backend Health Check:**
   - Visit: `https://your-backend-url.onrender.com/api`
   - Should see Swagger documentation

2. **Frontend Check:**
   - Visit: `https://your-frontend-url.vercel.app`
   - Should see the homepage with navigation

3. **API Test:**
   - Visit: `https://your-backend-url.onrender.com/api/navigation`
   - Should return navigation data

## 🆘 If Still Failing

1. **Check Render Logs:**
   - Go to your service
   - Click "Logs" tab
   - Look for error messages

2. **Try Manual Build:**
   ```bash
   cd backend
   npm install --production
   npm run build
   npm run start:prod
   ```

3. **Contact Support:**
   - Render support: support@render.com
   - Include logs and error messages
