const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./DataBase/DB_Connect');
dotenv.config();
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');

connectDB();

// Middleware
app.use(cors());
app.use(cookieParser());
// Increase payload size limits
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/user', userRoutes);

module.exports = app;