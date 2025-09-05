// Configuration file for the portfolio server
module.exports = {
    // Email Configuration
    email: {
        user: process.env.EMAIL_USER || 'agnikbishi28@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password-here'
    },
    
    // Server Configuration
    port: process.env.PORT || 3000,
    
    // Firebase Configuration
    firebase: {
        projectId: 'portfolio-new-de5f5'
    }
};
