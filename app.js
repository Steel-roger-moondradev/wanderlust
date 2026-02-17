if(process.env.NODE_ENV!="production"){
require('dotenv').config();
}


const express=require("express");
const app=express();
const mongoose=require("mongoose");
const session = require('express-session')
const flash=require("connect-flash");
const path=require("path");
const methodOverride =require("method-override");
const engine=require("ejs-mate");
const ExpressError=require("./util/ExpressError.js");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/User.js");


const indexrouter=require("./routes/index.js");
const reviewsrouter=require("./routes/review.js");
const userrouter=require("./routes/user.js");


app.use(express.static(path.join(__dirname,"public")));
app.engine('ejs',engine);
app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{
    httpOnly:true,
    expires:Date.now()+60*60*1000,
    maxAge:60*60*1000,
  }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


async function main(){
   await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};
main()
.then((res)=>{console.log("connection successfull");})
.catch((err)=>{console.log(err);
    console.log(err);
});


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.curruser=req.user;
     res.locals.loggedin = req.isAuthenticated();
    next();
})

app.use("/index/:index_id/review",reviewsrouter);
app.use("/index",indexrouter);
app.use("/user",userrouter);

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
})
app.use((err,req,res,next)=>{
    let{status=500,message="Something went wrong"}=err;
    res.status(status).render("error.ejs",{message});
});

app.listen("8080",()=>{console.log("listening")});