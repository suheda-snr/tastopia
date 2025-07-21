require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pgSession = require('connect-pg-simple')(session);

const { recipeRouter } = require('./routes/recipe.js');
const userRoutes = require('../routes/users');
const shareRecipeRoutes = require('../routes/recipes');
const commentRoutes = require('../routes/comments');
const rateRoutes = require('../routes/ratings');

const { sequelize } = require('./helpers/database');
const { isLoggedIn } = require('../middleware');
const User = require('../models/models');
const { Session } = require('../models/models');

require('../passportConfig')(passport);

// Log env configuration
console.log('Starting server with the following configuration:');
console.log(`PORT: ${process.env.PORT}`);
console.log(`DB_HOST: ${process.env.DB_HOST}`);
console.log(`DB_NAME: ${process.env.DB_NAME}`);
console.log(`DB_USER: ${process.env.DB_USER}`);
console.log(`DB_PORT: ${process.env.DB_PORT}`);

// Connect to PostgreSQL database
(async () => {
  try {
    console.log('Attempting to authenticate with the database...');
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    console.log('Synchronizing session table...');
    await Session.sync();
    console.log('Session table synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// App setup
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:3001', 'https://tastopia.azurewebsites.net'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..')));

// Session configuration
const sessionConfig = {
  name: 'session',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
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
  unset: 'destroy'
};

console.log('Setting up session middleware...');
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

console.log('Middleware setup complete.');

// Route handlers
app.use('/', recipeRouter);
app.use('/', userRoutes);
app.use('/', shareRecipeRoutes);
app.use('/', commentRoutes);
app.use('/', rateRoutes);

app.get('/profile', isLoggedIn, (req, res) => {
  console.log('👤 Profile route accessed.');
  res.send('This is a protected profile page.');
});

app.get('/api/check-login', (req, res) => {
  console.log(`Login check: user is ${req.isAuthenticated() ? '' : 'not '}authenticated.`);
  res.json({ isLoggedIn: req.isAuthenticated() });
});

// Catch 404
app.use((req, res, next) => {
  console.warn(`404 Not Found - ${req.originalUrl}`);
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error caught by global handler:', err.stack || err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
