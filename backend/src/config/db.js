  const mongoose = require('mongoose');

const URL = 'mongodb://localhost:27017/nepastic';

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected successfully to "nepastic" database');
})
.catch((err) => {
    console.log('MongoDB connection error:', err);
});

module.exports = mongoose;
