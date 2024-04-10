const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('./models/models');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'Email' },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ where: { Email: email } });

          if (!user) {
            return done(null, false, { message: 'Incorrect Email.' });
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            return done(null, false, { message: 'Incorrect password.' });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

  