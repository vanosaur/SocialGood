# Harvesta Deployment Guide

## 🚀 Deploying to Production

### Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- Railway account (sign up at railway.app)

---

## Part 1: Deploy Frontend to Vercel

### Step 1: Push Code to GitHub

1. **Initialize Git** (if not already done)
```bash
cd /Users/vanirudra/Desktop/SocialGood/frontend
git init
git add .
git commit -m "Initial commit - Harvesta platform"
```

2. **Create GitHub Repository**
- Go to github.com
- Click "New Repository"
- Name: `harvesta-frontend`
- Click "Create Repository"

3. **Push to GitHub**
```bash
git remote add origin https://github.com/YOUR_USERNAME/harvesta-frontend.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Go to Vercel**
- Visit: https://vercel.com
- Click "Sign Up" (use GitHub account)

2. **Import Project**
- Click "Add New Project"
- Select "Import Git Repository"
- Choose `harvesta-frontend`

3. **Configure Build Settings**
- Framework Preset: **Next.js**
- Root Directory: `./` (leave as is)
- Build Command: `npm run build`
- Output Directory: `.next`

4. **Add Environment Variables**
Click "Environment Variables" and add:
```
DATABASE_URL=mongodb+srv://vanirudra0914_db_user:vani._.14@cluster0.shnisch.mongodb.net/harvesta?appName=Cluster0
GEMINI_API_KEY=AIzaSyBXv2seqthhlah2kuJygPZHM7XyLWJNp4A
NEXT_PUBLIC_OPENWEATHER_API_KEY=b75cd6b9401b1b958bae8465f697d716
ML_SERVICE_URL=https://your-backend-url.railway.app
```
(We'll update ML_SERVICE_URL after deploying backend)

5. **Deploy**
- Click "Deploy"
- Wait 2-3 minutes
- You'll get a URL like: `https://harvesta-frontend.vercel.app`

---

## Part 2: Deploy Backend to Railway

### Step 1: Prepare Backend for Deployment

1. **Create requirements.txt**
```bash
cd /Users/vanirudra/Desktop/SocialGood/backend
pip freeze > requirements.txt
```

2. **Create Procfile** (tells Railway how to run your app)
```bash
echo "web: uvicorn main:app --host 0.0.0.0 --port \$PORT" > Procfile
```

3. **Push Backend to GitHub**
```bash
git init
git add .
git commit -m "Initial commit - ML backend"
```

Create new GitHub repo: `harvesta-backend`
```bash
git remote add origin https://github.com/YOUR_USERNAME/harvesta-backend.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Railway

1. **Go to Railway**
- Visit: https://railway.app
- Sign up with GitHub

2. **Create New Project**
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose `harvesta-backend`

3. **Configure**
- Railway auto-detects Python
- Click "Deploy"

4. **Get Backend URL**
- After deployment, click "Settings" → "Domains"
- Click "Generate Domain"
- Copy URL (e.g., `https://harvesta-backend-production.up.railway.app`)

### Step 3: Update Frontend Environment Variable

1. **Go back to Vercel**
- Open your project
- Go to "Settings" → "Environment Variables"
- Edit `ML_SERVICE_URL`
- Set to: `https://your-backend-url.railway.app`
- Click "Save"

2. **Redeploy Frontend**
- Go to "Deployments"
- Click "..." on latest deployment
- Click "Redeploy"

---

## Part 3: Verify Deployment

### Test Your Live App

1. **Visit Your Frontend URL**
```
https://harvesta-frontend.vercel.app
```

2. **Test Features**
- ✅ Dashboard loads
- ✅ AI Chat works (Gemini API)
- ✅ Weather shows (OpenWeather API)
- ✅ Crop recommendations work (ML backend)
- ✅ Database operations (add schedule, fertilizer, observation)

3. **Check Backend**
Visit: `https://your-backend-url.railway.app`
Should show: `{"message": "Crop Recommendation ML Service is Running!"}`

---

## 🎉 You're Live!

Your Harvesta platform is now deployed and accessible worldwide!

**Share these URLs:**
- Frontend: `https://harvesta-frontend.vercel.app`
- Backend API: `https://harvesta-backend.railway.app`

---

## 📝 Post-Deployment

### Update README.md
Add live demo link:
```markdown
## 🌐 Live Demo
Visit: https://harvesta-frontend.vercel.app
```

### Monitor Usage
- **Vercel Dashboard**: View traffic, errors
- **Railway Dashboard**: Monitor backend uptime
- **MongoDB Atlas**: Check database usage

### Free Tier Limits
- **Vercel**: Unlimited bandwidth, 100GB/month
- **Railway**: 500 hours/month (enough for 24/7)
- **MongoDB Atlas**: 512MB storage (plenty for demo)

---

## 🔧 Troubleshooting

### Frontend Issues
**Problem:** Page shows 500 error
**Solution:** Check Vercel logs, verify environment variables

### Backend Issues
**Problem:** ML recommendations don't work
**Solution:** 
1. Check Railway logs
2. Verify `crop_recommendation_model.pkl` is in repo
3. Check CORS settings in `main.py`

### Database Issues
**Problem:** Data not saving
**Solution:** Verify `DATABASE_URL` in Vercel environment variables

---

## 🚀 Next Steps

1. **Custom Domain** (optional)
   - Buy domain (e.g., harvesta.com)
   - Add to Vercel: Settings → Domains

2. **Analytics** (optional)
   - Add Google Analytics
   - Track user behavior

3. **Monitoring** (optional)
   - Set up error tracking (Sentry)
   - Uptime monitoring (UptimeRobot)

---

**Congratulations! Your Harvesta platform is now live! 🎉**
