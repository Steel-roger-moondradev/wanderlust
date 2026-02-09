const express=require("express");
const app=express();
const mongoose=require("mongoose");
const listing =require("./models/listing.js");
const path=require("path");
const methodOverride =require("method-override");
const engine=require("ejs-mate");
const wrapasync= require("./util/WrapAsync.js");
const ExpressError=require("./util/ExpressError.js");
const {reviewSchema,Schema}=require("./schema.js");
const Review=require("./models/review.js");

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

//function for validating 
const validateListing=(req,res,next)=>{
    const {error}=Schema.validate(req.body.listing);
    if(error){
        throw new ExpressError(400,error.message);
    }
   next();
}

//for validating review
const validatereview=(req,res,next)=>{
    const{error}=reviewSchema.validate(req.body.review);
    if(error){
        throw new ExpressError(400,error.message);
    }
    next();
}

//deletion of review before index deletion


//index route
app.get("/index",wrapasync(async(req,res,next)=>{
    const lists=await listing.find({});
    res.render("index.ejs",{lists});
}));
//individual route
app.get("/index/:id",wrapasync(async(req,res,next)=>{
    let {id}=req.params;
    let list=await listing.findById(id).populate("reviews");
    
    res.render("individual.ejs",{list});
}))
//new route
app.get("/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/new",validateListing,wrapasync(async(req,res,next)=>{
    let list=new listing(req.body.listing);
     await list.save();
    res.redirect("/index");
}))
//edit route
app.get("/edit/:id",wrapasync(async(req,res,next)=>{
    let {id}=req.params;
    let list=await listing.findById(id);
    res.render("edit.ejs",{list});
}))
app.patch("/:id",validateListing,wrapasync(async(req,res,next)=>{
    let {id}=req.params;
    let list=req.body.listing;
    if(!req.body.listing){
        throw new ExpressError(400,"enter valid data");
    }
    await listing.findByIdAndUpdate(id,list);
    res.redirect(`/index/${id}`);
}))
//delete route
app.delete("/:id",wrapasync(async(req,res,next)=>{
    let {id}=req.params;

    await listing.findByIdAndDelete(id);
    res.redirect(`/index`);
}))
//review view route
app.post("/index/:indexid/review",validatereview,wrapasync(async(req,res)=>{
    let review_input=new Review(req.body.review);

    let list=await listing.findById(req.params.indexid);

    await review_input.save();
    list.reviews.push(review_input._id);
    await list.save();
    await list.populate("reviews");
    res.render("individual.ejs",{list});

}))
//deleting the review
app.delete("/index/:index_id/review/:review_id",wrapasync(async(req,res)=>{
    let {index_id,review_id}=req.params;

    await listing.findByIdAndUpdate(index_id,{$pull:{reviews:review_id}});
    await Review.findByIdAndDelete(review_id);
    res.redirect(`/index/${index_id}`);
}))


app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
})
app.use((err,req,res,next)=>{
    let{status=500,message="Something went wrong"}=err;
    res.status(status).render("error.ejs",{message});
});

app.listen("8080",()=>{console.log("listening")});

