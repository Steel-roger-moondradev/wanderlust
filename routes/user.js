const express=require("express")
const router = express.Router({ mergeParams: true });
const User=require("../models/User");
const {signupSchema}=require("../schema.js");
const ExpressError=require("../util/ExpressError.js");
const passport=require("passport");
const { nextUrl } = require("../middlewares"); 
const {validateuser}=require("../middlewares.js");
const usercontrollers=require("../controllers/user.js")

router.route("/signup")
.get((req,res)=>{
    res.render("user/signup");
})
.post(validateuser,usercontrollers.signUpRoute);

router.route("/login")
.get((req,res)=>{
    res.render("user/login");
})
.post(nextUrl,passport.authenticate('local',{failureRedirect:"/login",failureFlash:true}),
usercontrollers.loginRoute);

router.route("/logout")
.get(usercontrollers.logoutRoute);
module.exports=router;
