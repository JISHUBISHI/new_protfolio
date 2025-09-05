const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const path = require('path');
const config = require('./config');

const app = express();
const PORT = config.port;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Initialize Firebase Admin SDK
let db = null;
let firebaseInitialized = false;

try {
    const serviceAccount = require('./service-account.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: config.firebase.projectId
    });
    db = admin.firestore();
    firebaseInitialized = true;
    console.log('✅ Firebase connected');
} catch (error) {
    console.warn('⚠️  Firebase unavailable, using memory storage');
}

// In-memory fallback storage
let contactMessages = [];

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        let messageId = null;

        // Try Firebase first, fallback to memory
        if (firebaseInitialized && db) {
            try {
                const docRef = await db.collection('contactMessages').add({
                    name,
                    email,
                    message,
                    timestamp: admin.firestore.FieldValue.serverTimestamp(),
                    read: false
                });
                messageId = docRef.id;
            } catch (firebaseError) {
                firebaseInitialized = false;
            }
        }

        // Fallback to memory storage
        if (!firebaseInitialized || !messageId) {
            const messageData = {
                id: Date.now().toString(),
                name,
                email,
                message,
                timestamp: new Date().toISOString(),
                read: false
            };
            contactMessages.push(messageData);
            messageId = messageData.id;
        }

        // Send email notification
        try {
            await transporter.sendMail({
                from: config.email.user,
                to: 'agnikbishi28@gmail.com',
                subject: `New Contact Form Submission from ${name}`,
                html: `
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                `
            });
        } catch (emailError) {
            console.warn('Email notification failed:', emailError.message);
        }

        res.json({ 
            success: true, 
            message: 'Message sent successfully',
            id: messageId
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all contact messages
app.get('/api/contact-messages', async (req, res) => {
    try {
        if (firebaseInitialized && db) {
            const snapshot = await db.collection('contactMessages')
                .orderBy('timestamp', 'desc')
                .get();
            
            const messages = [];
            snapshot.forEach(doc => {
                messages.push({ id: doc.id, ...doc.data() });
            });
            res.json(messages);
        } else {
            res.json(contactMessages);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve portfolio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Portfolio Server running on http://localhost:${PORT}`);
    console.log(`📧 Contact API: http://localhost:${PORT}/api/contact`);
    console.log(`💾 Storage: ${firebaseInitialized ? 'Firebase' : 'Memory'}`);
    console.log(`📧 Email: ${config.email.pass === 'your-app-password-here' ? 'Not configured' : 'Ready'}`);
});
