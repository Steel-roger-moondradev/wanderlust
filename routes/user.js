const express=require("express")
const router = express.Router({ mergeParams: true });
const User=require("../models/User");
const {signupSchema}=require("../schema.js");
const ExpressError=require("../util/ExpressError.js");
const passport=require("passport");
const { nextUrl } = require("../middlewares"); 
const {validateuser}=require("../middlewares.js");
const usercontrollers=require("../controllers/user.js")

router.get("/signup",(req,res)=>{
    res.render("user/signup");
})

router.post("/signup",validateuser,usercontrollers.signUpRoute);

router.get("/login",(req,res)=>{
    res.render("user/login");
})
router.post("/login",nextUrl,passport.authenticate('local',{failureRedirect:"/login",failureFlash:true}),
usercontrollers.loginRoute);

router.get("/logout",usercontrollers.logoutRoute);
module.exports=router;
