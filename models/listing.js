const mongoose=require("mongoose");
const { Schema } = mongoose;
const Review=require("./review");
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
      url:String,
      filename:String,
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
   owner:{
      type:Schema.Types.ObjectId,
      ref:"User"
   },
  category: {
        type: String,
        enum: [
            'trending',
            'all',
            'lake',
            'design',
            'desert',
            'view',
            'historic',
            'pool',
            'mountain',
            'forest',
            'beach',
            'snow',
            'camping',
            'city'
        ],
        required: true
    },
});

//deletion of review before index deletion
ListingSchema.post("findOneAndDelete",async function (doc){
    if(doc){
        await Review.deleteMany({_id:{$in:doc.reviews}});
    }
})

module.exports=mongoose.model("listing",ListingSchema);