module.exports.loggedIn = (req,res,next) => {
    if (!req.isAuthenticated()) {
      req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create listings!")
        res.redirect("/login");
      } 
      next();
}

module.exports.saveRedirect = (req ,res,next) => {
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

