const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');
const cors = require('cors');

console.log("Server is starting...");

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Bağlantısı
mongoose.connect('YOUR MONGODB CONNECTION STRING!!', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

// API Routes
app.use('/todos', todoRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});