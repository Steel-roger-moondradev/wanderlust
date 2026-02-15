const express=require("express")
const router = express.Router({ mergeParams: true });
const listing =require("../models/listing.js");
const wrapasync= require("../util/WrapAsync.js");
const ExpressError=require("../util/ExpressError.js");
const {reviewSchema,Schema}=require("../schema.js");
const Review=require("../models/review.js");
const {isloggedin}=require("../middlewares.js");

//function for validating 

const validateListing=(req,res,next)=>{
    const {error}=Schema.validate(req.body.listing);
    if(error){
        throw new ExpressError(400,error.message);
    }
   next();
}

//index route
router.get("/",wrapasync(async(req,res,next)=>{
    const lists=await listing.find({});
    res.render("index.ejs",{lists});
}));

//new route
router.get("/new",isloggedin,(req,res)=>{
    res.render("new.ejs");
})

router.post("/new",isloggedin,validateListing,wrapasync(async(req,res,next)=>{
    let list=new listing(req.body.listing);
    list.owner=req.user._id;
    if(list){
        req.flash("success","listing is created successfully");
        await list.save();
    }
     
    res.redirect("/index");
}))

//edit route
router.get("/edit/:id",isloggedin,wrapasync(async(req,res,next)=>{
    let {id}=req.params;
    let list=await listing.findById(id);
    res.render("edit.ejs",{list});
}))

router.patch("/:id",isloggedin,validateListing,wrapasync(async(req,res,next)=>{
    let {id}=req.params;
    let list=req.body.listing;
     if(list&&id){
        req.flash("success","your list is edited successfully");
    }
    if(!req.body.listing){
        throw new ExpressError(400,"enter valid data");
    }
    await listing.findByIdAndUpdate(id,list);
    res.redirect(`/index/${id}`);
}))
//delete route
router.delete("/:id",isloggedin,wrapasync(async(req,res,next)=>{
    let {id}=req.params;
    if(id){
        req.flash("success","your list is deleted successfully");
        await listing.findByIdAndDelete(id);
    }
    
    res.redirect(`/index`);
}))
//individual route
router.get("/:id",wrapasync(async(req,res,next)=>{
    let {id}=req.params;
    let list=await listing.findById(id).populate("reviews").populate("owner");
    if(!list){
        req.flash("error","list does not exist");
        res.redirect("/index");
    }
    else{
    res.render("individual.ejs",{list});
    }
}))

module.exports=router;