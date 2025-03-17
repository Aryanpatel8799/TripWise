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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/user', userRoutes);

module.exports = app;