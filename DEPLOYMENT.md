# Deployment Guide

## Deploy to Render

### Option 1: Using Render Dashboard (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add Docker configuration"
   git push origin main
   ```

2. **Connect to Render:**
   - Go to [render.com](https://render.com)
   - Sign up/Login with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure Service:**
   - **Name:** `agnik-portfolio`
   - **Environment:** `Docker`
   - **Dockerfile Path:** `./Dockerfile`
   - **Plan:** `Free`
   - **Region:** `Oregon (US West)`

4. **Set Environment Variables:**
   ```
   NODE_ENV=production
   PORT=3000
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Your portfolio will be live at: `https://agnik-portfolio.onrender.com`

### Option 2: Using render.yaml (Automatic)

1. **Push with render.yaml:**
   ```bash
   git add render.yaml
   git commit -m "Add Render configuration"
   git push origin main
   ```

2. **Deploy:**
   - Render will automatically detect the `render.yaml` file
   - Follow the prompts to create the service
   - Set environment variables in the dashboard

## Local Docker Testing

### Build and Run Locally

```bash
# Build the Docker image
npm run docker:build

# Run the container
npm run docker:run

# Or use Docker directly
docker build -t agnik-portfolio .
docker run -p 3000:3000 agnik-portfolio
```

### Test the Container

```bash
# Test the application
curl http://localhost:3000

# Test the contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

## Environment Variables

### Required for Production

- `NODE_ENV=production`
- `PORT=3000` (Render sets this automatically)

### Optional

- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASS` - Gmail app password

## Firebase Configuration

1. **Get Firebase API Key:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select project: `portfolio-new-de5f5`
   - Go to Project Settings → General
   - Copy the web app configuration

2. **Update index.html:**
   - Replace the placeholder API key with your real key
   - Update the app ID

3. **Enable Firestore:**
   - Go to Firestore Database
   - Create database in test mode
   - Deploy security rules

## Troubleshooting

### Common Issues

1. **Build Fails:**
   - Check Dockerfile syntax
   - Ensure all files are in the repository
   - Verify package.json is correct

2. **App Won't Start:**
   - Check environment variables
   - Verify PORT is set to 3000
   - Check logs in Render dashboard

3. **Contact Form Not Working:**
   - Verify Firebase configuration
   - Check if Firestore is enabled
   - Test API endpoint directly

### Render Logs

```bash
# View logs in Render dashboard
# Or check locally with Docker
docker logs <container-id>
```

## Performance Tips

1. **Enable Caching:**
   - Add cache headers in server.js
   - Use CDN for static assets

2. **Optimize Images:**
   - Compress images before deployment
   - Use WebP format when possible

3. **Monitor Performance:**
   - Use Render's built-in monitoring
   - Set up error tracking

## Security

1. **Environment Variables:**
   - Never commit sensitive data
   - Use Render's secure environment variables

2. **Firebase Rules:**
   - Update Firestore rules for production
   - Restrict access to authenticated users

3. **HTTPS:**
   - Render provides HTTPS automatically
   - Update any hardcoded HTTP URLs

## Custom Domain

1. **Add Custom Domain:**
   - Go to Render dashboard
   - Click on your service
   - Go to Settings → Custom Domains
   - Add your domain

2. **Update DNS:**
   - Point your domain to Render's servers
   - Wait for SSL certificate

## Backup

1. **Database Backup:**
   - Export Firestore data regularly
   - Use Firebase backup tools

2. **Code Backup:**
   - Keep GitHub repository updated
   - Tag releases for easy rollback
