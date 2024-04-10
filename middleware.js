const { sequelize } = require('./server/helpers/database');
const db = require("./server/helpers/db");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // Directly include the message in the JSON response
    return res.status(401).json({ 
      success: false, 
      redirectUrl: "/login",
      message: "You must be signed in to perform this action" // This message can now be handled by client-side JS
    });
  }
  next();
};
/*module.exports.isLoggedIn = (req,res,next) => { 
    if(!req.isAuthenticated()){
      req.flash("error", "You must be signed in to perform this action");
      return res.redirect("/login") //the return statemnt is necessary otherwise the code below would still run
  }
  next();
}*/
