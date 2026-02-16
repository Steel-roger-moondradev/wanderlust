const Review=require("../models/review");
const listing=require("../models/listing");

module.exports.createReview=async(req,res)=>{
    let review_input=new Review(req.body.review);
    review_input.author=req.user._id;
    let list=await listing.findById(req.params.index_id);
    if(list){
            req.flash("success","your review is updated successfully");
        }

    await review_input.save();
    list.reviews.push(review_input._id);
    await list.save();
    await list.populate("reviews");
    res.redirect(`/index/${req.params.index_id}`);
};

module.exports.destroyReview=async(req,res)=>{
    let {index_id,id}=req.params;
    if(index_id&&id){
            req.flash("success","your review is deleted successfully");
        }
    await listing.findByIdAndUpdate(index_id,{$pull:{reviews:id}});
    await Review.findByIdAndDelete(id);
    res.redirect(`/index/${index_id}`);
};