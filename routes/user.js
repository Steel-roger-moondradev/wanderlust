const express=require("express")
const router = express.Router({ mergeParams: true });
const User=require("../models/User");
const {signupSchema}=require("../schema.js");
const ExpressError=require("../util/ExpressError.js");
const passport=require("passport");
const { nextUrl } = require("../middlewares"); 

//for validating user
const validateuser=(req,res,next)=>{
    const{error}=signupSchema.validate(req.body.user);
    if(error){
        throw new ExpressError(400,error.message);
    }
    next();
}

router.get("/signup",(req,res)=>{
    res.render("user/signup");
})

router.post("/signup",validateuser,async(req,res)=>{
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
    
})
router.get("/login",(req,res)=>{
    res.render("user/login");
})
router.post("/login",nextUrl,passport.authenticate('local',{failureRedirect:"/login",failureFlash:true}),
async (req,res)=>{
    req.flash("success","Login successfull");
    if(res.locals.redirectUrl){
        res.redirect(res.locals.redirectUrl);
    }
    else{
        res.redirect("/index");
    }
    
})
router.get("/logout",(req,res)=>{
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
})
module.exports=router;
