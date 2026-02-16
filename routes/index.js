const express=require("express")
const router = express.Router({ mergeParams: true });
const listing =require("../models/listing.js");
const wrapasync= require("../util/WrapAsync.js");
const ExpressError=require("../util/ExpressError.js");
const {reviewSchema,Schema}=require("../schema.js");
const Review=require("../models/review.js");
const {isloggedin,isOwner,validateListing}=require("../middlewares.js");
const listcontrollers=require("../controllers/listing.js");
//index route
router.get("/",wrapasync(listcontrollers.index));

//new route
router.get("/new",isloggedin,listcontrollers.getNewFile);

router.post("/new",isloggedin,validateListing,wrapasync(listcontrollers.renderNewFile))

//edit route
router.get("/edit/:id",isloggedin,isOwner,wrapasync(listcontrollers.getEditRoute));

router.patch("/:id",isloggedin,isOwner,validateListing,wrapasync(listcontrollers.editRoute));
//delete route
router.delete("/:id",isloggedin,isOwner,wrapasync(listcontrollers.destroyRoute));
//individual route
router.get("/:id",wrapasync(listcontrollers.individualRoute));

module.exports=router;