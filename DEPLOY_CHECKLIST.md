# 🚀 Deployment Checklist

## Pre-Deployment

- [ ] **Code is ready** - All files committed to Git
- [ ] **Firebase configured** - API key updated in index.html
- [ ] **Email setup** - Gmail app password ready
- [ ] **Firestore enabled** - Database created in Firebase Console

## Deploy to Render

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add Docker configuration for Render deployment"
git push origin main
```

### Step 2: Connect to Render
1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository

### Step 3: Configure Service
- **Name:** `agnik-portfolio`
- **Environment:** `Docker`
- **Dockerfile Path:** `./Dockerfile`
- **Plan:** `Free`
- **Region:** `Oregon (US West)`

### Step 4: Set Environment Variables
```
NODE_ENV=production
PORT=3000
EMAIL_USER=agnikbishi28@gmail.com
EMAIL_PASS=your-gmail-app-password
```

### Step 5: Deploy
- Click "Create Web Service"
- Wait for deployment (5-10 minutes)
- Your portfolio will be live!

## Post-Deployment

- [ ] **Test the website** - Visit your Render URL
- [ ] **Test contact form** - Submit a test message
- [ ] **Check Firebase** - Verify messages are stored
- [ ] **Test email** - Check if notifications work
- [ ] **Update DNS** - Point custom domain (optional)

## Your Portfolio URL
After deployment, your portfolio will be available at:
`https://agnik-portfolio.onrender.com`

## Quick Commands

```bash
# Build Docker image locally (optional)
npm run docker:build

# Run Docker container locally (optional)
npm run docker:run

# Deploy to Render
git push origin main
```

## Support
- **Render Docs:** https://render.com/docs
- **Docker Docs:** https://docs.docker.com
- **Firebase Docs:** https://firebase.google.com/docs
