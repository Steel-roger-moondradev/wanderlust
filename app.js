const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride =require("method-override");
const engine=require("ejs-mate");
const ExpressError=require("./util/ExpressError.js");

const index=require("./routes/index.js");
const reviews=require("./routes/review.js");

app.use(express.static(path.join(__dirname,"public")));
app.engine('ejs',engine);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

async function main(){
   await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};
main()
.then((res)=>{console.log("connection successfull");})
.catch((err)=>{console.log(err);
    console.log(err);
});


app.use("/index/:index_id/review",reviews);
app.use("/index",index);


app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
})
app.use((err,req,res,next)=>{
    let{status=500,message="Something went wrong"}=err;
    res.status(status).render("error.ejs",{message});
});

app.listen("8080",()=>{console.log("listening")});

