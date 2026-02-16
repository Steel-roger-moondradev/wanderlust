const listing=require("../models/listing")

module.exports.index=async(req,res,next)=>{
    const lists=await listing.find({});
    res.render("index.ejs",{lists});
};
module.exports.getNewFile=(req,res)=>{
    res.render("new.ejs");
};
module.exports.renderNewFile=async(req,res,next)=>{
    let list=new listing(req.body.listing);
    list.owner=req.user._id;
    if(list){
        req.flash("success","listing is created successfully");
        await list.save();
    }
     
    res.redirect("/index");
};
module.exports.getEditFile=async(req,res,next)=>{
    let {id}=req.params;
    let list=await listing.findById(id);
    res.render("edit.ejs",{list});
};
module.exports.editRoute=async(req,res,next)=>{
    let{id}=req.params;
    let list=req.body.listing;
        await listing.findByIdAndUpdate(id,list);
        req.flash("success","Your list has been edited");
        return res.redirect(`/index/${id}`);
};
module.exports.destroyRoute=async(req,res,next)=>{
    let {id}=req.params;
    if(id){
        req.flash("success","your list is deleted successfully");
        await listing.findByIdAndDelete(id);
    }
    
    res.redirect(`/index`);
};
module.exports.individualRoute=async(req,res,next)=>{
    let {id}=req.params;
    let list=await listing.findById(id).populate("owner").populate({
        path:"reviews",
        populate:{
            path:"author"
        }
    });
    if(!list){
        req.flash("error","list does not exist");
        res.redirect("/index");
    }
    else{
    res.render("individual.ejs",{list});
    }
};
