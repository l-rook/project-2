require('dotenv').config();
const path = require('path');
const port = process.env.PORT ? process.env.PORT : 3000
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const Character = require('./models/Character');
const User = require('./models/User');
const characterRoutes = require('./controllers/characters'); // Updated
const authRoutes = require('./controllers/auth'); // Updated

const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.use('/', authRoutes);
app.use('/characters', characterRoutes);

app.listen(port, () => {
    console.log('Server is running on http://localhost:3000');
});
