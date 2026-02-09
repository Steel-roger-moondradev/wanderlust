const mongoose=require("mongoose");
const listing=require("../models/listing");
const {data}=require("./data");
async function main(){
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
  await initdb()
  .then((res)=>console.log("insertion successfull"))
  .catch((err)=>{console.log(err)});

};
main().then(() => console.log('Connected!'))
  .catch((err)=>console.log(err));

async function initdb(){
  await listing.deleteMany({});
  await listing.insertMany(data);
}