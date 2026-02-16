const User=require("../models/User");


module.exports.signUpRoute=async(req,res)=>{
    let {user}=req.body;
    let {password,...userdata}=user;
    try{
        const registeredUser=await User.register(userdata,password);
        req.login(registeredUser,(err)=>{
            if(err){
                next(err);
            }
            req.flash("success","welcome to wanderlust");
            res.redirect("/index");
        })
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/index");
    }
    
};

module.exports.loginRoute=async (req,res)=>{
    req.flash("success","Login successfull");
    if(res.locals.redirectUrl){
        res.redirect(res.locals.redirectUrl);
    }
    else{
        res.redirect("/index");
    }
    
};
module.exports.logoutRoute=(req,res)=>{
    req.logout((err)=>{
        if(err){
            req.flash("error","There is something wrong");
            return res.redirect("/index");
        }
        else{
            req.flash("success","You have been logged out");
            res.redirect("/index");
        }
    })
};
