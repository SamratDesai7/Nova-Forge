
router.get('/logout' , (req , res , next) => {
  req.logout((err) => {
    if(err){
      next(err);
    }
    req.flash("success", "You are logout now");
    res.redirect("/listing");
  })
})










