const express=require("express")
const router = express.Router({ mergeParams: true });
const User=require("../models/User");
const {signupSchema}=require("../schema.js");
const ExpressError=require("../util/ExpressError.js");
const passport=require("passport");
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
        await User.register(userdata,password);
        req.flash("success","welcome to wanderlust");
        res.redirect("/index");
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/index");
    }
    
})
router.get("/login",(req,res)=>{
    res.render("user/login");
})
router.post("/login",passport.authenticate('local',{failureRedirect:"/login",failureFlash:true}),
async (req,res)=>{
    req.flash("success","Login successfull");
    res.redirect("/index");
})
module.exports=router;
