const express=require("express")
const router = express.Router({ mergeParams: true });
const listing =require("../models/listing.js");
const wrapasync= require("../util/WrapAsync.js");
const ExpressError=require("../util/ExpressError.js");
const {reviewSchema,Schema}=require("../schema.js");
const Review=require("../models/review.js");
const {isloggedin,isOwner,validateListing}=require("../middlewares.js");
const listcontrollers=require("../controllers/listing.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const { db } = require("../models/User.js");
const upload = multer({ storage });

//index route
router.get("/",wrapasync(listcontrollers.index));

//new route
router.route("/new")
.get(isloggedin,listcontrollers.getNewFile)
.post(
    isloggedin,
    upload.single('listing[image]'),
    validateListing,
    wrapasync(listcontrollers.renderNewFile)
);


//edit route
router.get("/edit/:id",isloggedin,isOwner,wrapasync(listcontrollers.getEditFile));
router.get("/search",listcontrollers.rendersearchfile);


router.route("/:id")
.patch(isloggedin,isOwner,upload.single('listing[image]'),validateListing,wrapasync(listcontrollers.editRoute))
.delete(isloggedin,isOwner,wrapasync(listcontrollers.destroyRoute))
.get(wrapasync(listcontrollers.individualRoute));


router.get('/icon/:category',listcontrollers.renderfilebyicon);

module.exports=router;