const listing =require("./models/listing.js");
const {Schema,reviewSchema,signupSchema}=require("./schema.js");
const ExpressError=require("./util/ExpressError.js");
const Review=require("./models/review.js");

module.exports.isloggedin=(req,res,next)=>{
    if(!(req.isAuthenticated())){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","Login first");
        return res.redirect("/user/login");
    }
    next();
}
module.exports.nextUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
        delete req.session.redirectUrl; 
    }
    next();
}
module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params;
        const data=await listing.findById(id);
        if(!data){
            req.flash("error","data is not found");
            return res.redirect(`/index/${id}`);
        }
        if(!(data.owner.equals(req.user._id))){
            req.flash("error","you can't edit this list");
            return res.redirect(`/index/${id}`);
        }
        next();
}

//middleware for validating 

module.exports.validateListing=(req,res,next)=>{
    const {error}=Schema.validate(req.body.listing);
    if(error){
        throw new ExpressError(400,error.message);
    }
   next();
}

//for validating review
module.exports.validatereview=(req,res,next)=>{
    const{error}=reviewSchema.validate(req.body.review);
    if(error){
        throw new ExpressError(400,error.message);
    }
    next();
}

//for validating user
module.exports.validateuser=(req,res,next)=>{
    const{error}=signupSchema.validate(req.body.user);
    if(error){
        throw new ExpressError(400,error.message);
    }
    next();
}
//middleware for reviews authors
module.exports.isAuthor=async (req,res,next)=>{
    let {id,index_id}=req.params;

        const data=await Review.findById(id);
        if(!data){
            req.flash("error","data is not found");
            return res.redirect(`/review/${id}`);
        }
        if(!(data.author.equals(req.user._id))){
            req.flash("error","you can't edit this list");
            return res.redirect(`/index/${index_id}`);
        }
        next();
}