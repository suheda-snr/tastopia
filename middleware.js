const { sequelize } = require('./database/database');
const db = require("./database/db.js");

module.exports.isLoggedIn = (req,res,next) => { 
    if(!req.isAuthenticated()){
      req.flash("error", "You must be signed in to perform this action");
      return res.redirect("/login") //the return statemnt is necessary otherwise the code below would still run
  }
  next();
}



