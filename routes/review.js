const express=require("express")
const router = express.Router({ mergeParams: true });

const listing =require("../models/listing.js");
const wrapasync= require("../util/WrapAsync.js");
const ExpressError=require("../util/ExpressError.js");
const {reviewSchema,Schema}=require("../schema.js");
const Review=require("../models/review.js");


//for validating review
const validatereview=(req,res,next)=>{
    const{error}=reviewSchema.validate(req.body.review);
    if(error){
        throw new ExpressError(400,error.message);
    }
    next();
}

//review view route
router.post("/",validatereview,wrapasync(async(req,res)=>{
    let review_input=new Review(req.body.review);

    let list=await listing.findById(req.params.index_id);
    if(list){
            req.flash("success","your review is updated successfully");
        }

    await review_input.save();
    list.reviews.push(review_input._id);
    await list.save();
    await list.populate("reviews");
    res.redirect(`/index/${req.params.index_id}`);

}))
//deleting the review
router.delete("/:review_id",wrapasync(async(req,res)=>{
    let {index_id,review_id}=req.params;
    if(index_id&&review_id){
            req.flash("success","your review is deleted successfully");
        }
    await listing.findByIdAndUpdate(index_id,{$pull:{reviews:review_id}});
    await Review.findByIdAndDelete(review_id);
    res.redirect(`/index/${index_id}`);
}))

module.exports=router;