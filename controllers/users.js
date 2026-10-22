 
const User = require("../models/User");

module.exports.renderSignupForm=(req, res) => {
  res.render("users/signup");
};
 
 module.exports.signup=async (req, res) => {
     try {
       let {username, email, password} = req.body;
       const newUser = new User({email, username});
       const registereduser = await User.register(newUser, password);
       console.log(registereduser);
       req.login(registereduser, (err) => {
         if(err){
             return next(err);
             
         }
          req.flash(
       "success",
       "Welcome to Wanderlust! you have logged in successfully",
     );
     res.redirect("/listings");
       });
     } catch (e) {
       req.flash("error", e.message);
       res.redirect("/signup");
     }
   };



   module.exports.renderLoginForm= (req, res) => {
  res.render("users/login");
};


module.exports.login=async (req, res) => {
    req.flash( "success","Welcome to Wanderlust! you have logged in successfully",);
    let redirecturl = res.locals.redirectUrl || "/listings";
    res.redirect(redirecturl);
  };



  module.exports.logout= (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have been logged out!");
    res.redirect("/listings");
  })
};