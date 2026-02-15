module.exports.isloggedin=(req,res,next)=>{
    if(!(req.isAuthenticated())){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","Login first");
        return res.redirect("/user/login");
    }
    next();
}
module.exports.nextUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
        delete req.session.redirectUrl; 
    }
    next();
}