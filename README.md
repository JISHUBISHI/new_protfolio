# Agnik Bishi Portfolio

A modern, responsive portfolio website with a functional contact form.

## Features

- **Responsive Design**: Works on all devices
- **Dark/Light Mode**: Toggle between themes
- **Contact Form**: Functional with validation and notifications
- **Firebase Integration**: Messages stored in Firestore (with memory fallback)
- **Email Notifications**: Automatic email alerts
- **PDF Resume**: Downloadable resume
- **Social Links**: Integrated social media links

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Visit your portfolio:**
   ```
   http://localhost:3000
   ```

## Configuration

### Email Setup (Optional)
1. Enable 2FA on Gmail
2. Generate App Password
3. Update `config.js` with your credentials

### Firebase Setup (Optional)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Get API key and update `index.html`

## Project Structure

```
├── index.html              # Portfolio website
├── server.js               # Express server
├── config.js               # Configuration
├── service-account.json    # Firebase credentials
├── agnik.pdf              # Resume
└── package.json           # Dependencies
```

## API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/contact-messages` - View messages
- `GET /` - Portfolio homepage

## Deployment

Deploy to Heroku, Vercel, or Firebase Hosting. The contact form works with both Firebase and memory storage.

## License

MIT License
