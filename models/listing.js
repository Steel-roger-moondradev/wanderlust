const mongoose=require("mongoose");
const { Schema } = mongoose;

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
         default:"https://i.pinimg.com/736x/c7/7e/d7/c77ed723a0f0f4e9375b5e05af9489db.jpg",
         set:(v)=> v===""?"https://i.pinimg.com/736x/c7/7e/d7/c77ed723a0f0f4e9375b5e05af9489db.jpg":v
      }
      
   },
   location :{
      type:String,
      required:true
   },
   reviews:[
      {
      type:Schema.Types.ObjectId,
      ref:"Review",
      }
   ],
});
module.exports=mongoose.model("listing",ListingSchema);