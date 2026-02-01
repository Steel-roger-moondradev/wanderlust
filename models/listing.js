const mongoose=require("mongoose");


const ListingSchema=new mongoose.Schema({
   title:{
      type:String,
      required:true
   },
   description:{
      type:String,
      required:true,
   },
   price:{
      type:Number
   },
   country:{
      type:String
   },
   image:{
      filename:{
         type:String,
         default:"listingimage"
      },
      url:{
         type:String,
         default:"https://unsplash.com/photos/a-house-with-a-blue-front-door-and-a-brown-front-door-xaqsFfoEq3o",
         set:(v)=> v===""?"https://unsplash.com/photos/a-house-with-a-blue-front-door-and-a-brown-front-door-xaqsFfoEq3o":v
      }
      
   },
   location :{
      type:String,
      required:true
   }
});
module.exports=mongoose.model("listing",ListingSchema);