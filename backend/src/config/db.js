 const mongoose = require('mongoose');

// MongoDB Atlas URI as a string
const url = `mongodb+srv://toakash920_db_user:Sagarbhai%4075@cluster0.qnq47f3.mongodb.net/nepastic?retryWrites=true&w=majority
`;

// Fallback to local DB if env variable or Atlas URI not available
const URL = url || 'mongodb://localhost:27017/nepastic';

// Connect to MongoDB
mongoose.connect(URL)
    .then(() => {
        console.log(`✅ MongoDB connected successfully to "${URL.includes('mongodb+srv') ? 'Atlas cluster' : 'nepastic'}"`);
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
    });

module.exports = mongoose;
