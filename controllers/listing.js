const listing=require("../models/listing")

module.exports.index= async (req, res) => {
    const lists = await listing.find({});
    res.render('index.ejs', { 
        lists, 
        currentCategory: 'all' // Add this line
    });
}


module.exports.getNewFile=(req,res)=>{
    res.render("new.ejs");
};
module.exports.renderNewFile=async(req,res,next)=>{
     const list = new listing(req.body.listing);
    list.owner = req.user._id;

    if (req.file) {
        list.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }
    if(list){
        await list.save();
        req.flash("success","listing is created successfully");
    }
     
    res.redirect("/index");
};
module.exports.getEditFile=async(req,res,next)=>{
    let {id}=req.params;
    let list=await listing.findById(id);
    let originalurl = list.image.url;
originalurl = originalurl.replace("/upload", "/upload/h_300,w_250");
    res.render("edit.ejs",{list,originalurl});
};
module.exports.editRoute=async(req,res,next)=>{
    let{id}=req.params;
    let list=req.body.listing;
     if(req.file){
        list.image = {
            url: req.file.path,
            filename: req.file.filename
        }}
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
