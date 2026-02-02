const express=require("express");
const app=express();
const mongoose=require("mongoose");
const listing =require("./models/listing.js");
const path=require("path");
const methodOverride =require("method-override");
const engine=require("ejs-mate");

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

//index route
app.get("/index",async(req,res)=>{
    const lists=await listing.find({});
    res.render("index.ejs",{lists});
    
});
//individual route
app.get("/index/:id",async(req,res)=>{
    let {id}=req.params;
    let list=await listing.findById(id);
    res.render("individual.ejs",{list});
})
app.get("/new",(req,res)=>{
    res.render("new.ejs");
})
//new route
app.post("/new",async(req,res)=>{
    let list=new listing(req.body.listing);
     await list.save();
    res.redirect("/index");
})
app.get("/edit/:id",async(req,res)=>{
    let {id}=req.params;
    let list=await listing.findById(id);
    res.render("edit.ejs",{list});
})
app.patch("/:id",async(req,res)=>{
    let {id}=req.params;
    let list=req.body.listing;
    await listing.findByIdAndUpdate(id,list);
    res.redirect(`/index/${id}`);
})
app.delete("/:id",async(req,res)=>{
    let {id}=req.params;

    await listing.findByIdAndDelete(id);
    res.redirect(`/index`);
})
app.listen("8080",()=>{console.log("listening")});

