require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { recipeRouter } = require('./routes/recipe.js');
const userRoutes = require('../routes/users');
const shareRecipeRoutes = require('../routes/recipes');
const commentRoutes = require('../routes/comments');
const rateRoutes = require('../routes/ratings');
const path = require('path');
const { sequelize } = require('./helpers/database');
const { isLoggedIn } = require('../middleware');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('../passportConfig')(passport);
const User = require('../models/models');
const { Session } = require('../models/models');
const pgSession = require('connect-pg-simple')(session);

// Connect to PostgreSQL database
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync the Session model with the database to create the 'session' table
    await Session.sync();
    console.log('Session table synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Instead of using hardcoded value read port from .env file
const port = process.env.PORT;
const app = express();

app.use(cors({
  origin: ['http://localhost:3001', 'https://tastopia.azurewebsites.net'],
  credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

const sessionConfig = {
  name: 'session',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
  store: new pgSession({
    conString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    tableName: 'session',
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }),
  unset: "destroy"
};

app.use(session(sessionConfig));
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', recipeRouter);
app.use('/', userRoutes);
app.use('/', shareRecipeRoutes);
app.use('/', commentRoutes);
app.use('/', rateRoutes);

app.get('/profile', isLoggedIn, (req, res) => {
  res.send('This is a protected profile page.');
});

app.get('/api/check-login', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isLoggedIn: true });
  } else {
    res.json({ isLoggedIn: false });
  }
});

// --- GLOBAL ERROR HANDLING ---

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// General error handler
app.use((err, req, res, next) => {
  console.error('🔥 Error caught:', err.stack || err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
