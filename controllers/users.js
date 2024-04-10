const {User} = require('../models/models');
const db = require('../server/helpers/db.js');
const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res) => {
	try {
  
	  const { email, username, password } = req.body;
  
	  // Create a new user using the Sequelize model. The 'beforeCreate' hook will handle password hashing.
	  const newUser = await User.create({
		Email: email,
		Username: username,
		Passwordhash: password, // The 'beforeCreate' hook will hash this password
		CreateDate: new Date() // Set the creation date
	  });
  
	  // Sequelize automatically logs the user in after registration
	  req.login(newUser, (err) => {
		if (err) {
		  throw err;
		}
		req.flash('success', 'Successfully registered and logged in.');
		res.redirect('/');
	  });
	} catch (e) {
	  console.error(e); // Log the error for debugging purposes
	  req.flash('error', e.message);
	  res.redirect('/register');
	}
  };
  


module.exports.renderRegister = (req, res) => {
	res.sendFile(path.join(__dirname, '../', 'signup.html'));
  };

module.exports.login = (req,res) => {
  req.flash("success", "Login Successful");
  res.redirect('/')
}

module.exports.renderLogin = (req, res) => {
	const errorMessage = req.flash('error');
	const url = errorMessage.length > 0 
	  ? `/login.html?error=${encodeURIComponent(errorMessage[0])}` 
	  : '/login.html';
	res.redirect(url);
  };

module.exports.logout = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Logout Successful');
    res.redirect('/');
  });
};
