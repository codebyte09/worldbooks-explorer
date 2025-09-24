# 🚀 Render Deployment Guide - Fix Database Connection

## ❌ Current Issue
Your deployment is failing because the app can't connect to the database. The error shows:
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

This means the app is trying to connect to `localhost` instead of your Render database.

## ✅ SOLUTION: Set Environment Variables

### Step 1: Get Database Connection Details

1. **Go to your Render dashboard**
2. **Find your database service** (`worldbooks-explorer-db`)
3. **Click on the database service**
4. **Go to "Info" tab**
5. **Copy the connection details:**

```
External Database URL: postgresql://worldbooks_user:password@dpg-xxxxx-a.oregon-postgres.render.com:5432/worldbooks
```

### Step 2: Set Environment Variables in Your Web Service

1. **Go to your web service** (`worldbooks-explorer`)
2. **Click "Environment" tab**
3. **Add these environment variables:**

```env
NODE_ENV=production
DB_SYNC=false
SCRAPE_DELAY=3000
PORT=3000
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Step 3: Set Database Variables

**From your database service info, extract and set:**

```env
DB_HOST=dpg-xxxxx-a.oregon-postgres.render.com
DB_USER=worldbooks_user
DB_PASS=your-actual-password
DB_NAME=worldbooks
DB_PORT=5432
```

### Step 4: Manual Deploy

1. **Click "Manual Deploy"**
2. **Select "Deploy latest commit"**
3. **Wait for deployment**

## 🔧 Alternative: Use Database URL

If the individual variables don't work, try using the full database URL:

1. **Add this environment variable:**
```env
DATABASE_URL=postgresql://worldbooks_user:password@dpg-xxxxx-a.oregon-postgres.render.com:5432/worldbooks
```

2. **Update the app.module.ts to use DATABASE_URL:**

```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/worldbooks',
  // ... rest of config
})
```

## 🆘 Quick Fix Commands

### Option 1: Update Environment Variables in Render Dashboard
1. Go to your web service
2. Environment tab
3. Add all the DB_* variables from your database service
4. Manual deploy

### Option 2: Delete and Recreate Service
1. Delete current web service
2. Create new web service
3. Connect to GitHub
4. Use `backend/render-simple.yaml` configuration
5. Set environment variables during creation

## 📋 Environment Variables Checklist

Make sure these are set in your web service:

- ✅ `NODE_ENV=production`
- ✅ `DB_HOST=` (from database service)
- ✅ `DB_USER=` (from database service)
- ✅ `DB_PASS=` (from database service)
- ✅ `DB_NAME=worldbooks`
- ✅ `DB_PORT=5432`
- ✅ `DB_SYNC=false`
- ✅ `SCRAPE_DELAY=3000`

## 🔍 Troubleshooting

### If still failing:

1. **Check database is running:**
   - Database service should show "Available"

2. **Check environment variables:**
   - All DB_* variables must be set
   - No typos in variable names

3. **Check logs:**
   - Look for specific connection errors
   - Verify the host/port being used

4. **Try database URL approach:**
   - Use single `DATABASE_URL` variable instead

## 📞 Need Help?

If you're still having issues:
1. Check the Render logs for specific errors
2. Verify your database service is running
3. Double-check all environment variable names and values
4. Try the DATABASE_URL approach as fallback

The key is getting the correct database connection details from your database service and setting them as environment variables in your web service!
