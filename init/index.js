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
  const newdata=data.map((obj)=>({...obj,owner:"69919f1b7b97dd5c484206f8"}));
  await listing.insertMany(newdata);
}