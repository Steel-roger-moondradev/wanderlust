const express=require("express")
const router = express.Router({ mergeParams: true });

const listing =require("../models/listing.js");
const wrapasync= require("../util/WrapAsync.js");
const ExpressError=require("../util/ExpressError.js");
const {reviewSchema,Schema}=require("../schema.js");
const Review=require("../models/review.js");
const{validatereview,isAuthor,isloggedin}=require("../middlewares.js");
const reviewcontrollers=require("../controllers/review.js");

//review view route
router.post("/",isloggedin,validatereview,wrapasync(reviewcontrollers.createReview));
//deleting the review
router.delete("/:id",isloggedin,isAuthor,wrapasync(reviewcontrollers.destroyReview));

module.exports=router;