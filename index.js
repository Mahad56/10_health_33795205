const express = require('express');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

const session = require('express-session');
app.use(session({
    secret: 'mysecretkey123',
    resave: false,
    saveUninitialized: false
}));

// Database connection
const db = mysql.createConnection({
  host: process.env.HEALTH_HOST,
  user: process.env.HEALTH_USER,
  password: process.env.HEALTH_PASSWORD,
  database: process.env.HEALTH_DATABASE
});

db.connect(err => {
  if (err) console.log("Database not ready yet.");
  else console.log("Connected to health DB.");
});

// Make session available in EJS
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// ROUTES
// ROUTES
const authRoutes = require('./routes/auth')(db);
app.use('/', authRoutes);

const activityRoutes = require('./routes/activities')(db);
app.use('/', activityRoutes);

const searchRoutes = require('./routes/search')(db);
app.use('/', searchRoutes);

app.get('/error-test', (req, res, next) => {
    next(new Error("Intentional test error"));
});

// Basic pages
app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => res.render('about'));


const errorHandler = require('./middleware/error');
app.use(errorHandler);

// Start server
app.listen(8000, () => console.log("Running on port 8000"));
