


const mongoose = require("mongoose");
const data = require("./data.js"); // Imported as "data"
const Listing = require("../models/listing.js");
const user =require("../models/User.js");

const Mongo_url = "mongodb://127.0.0.1:27017/wanderLust" ;

// 1. Connect to the database first
main()
    .then(async () => {
        console.log("connected to DB");
        // 2. Only run initialization AFTER connection is successful
        await initDB(); 
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(Mongo_url);
}



const initDB = async () => {
  await Listing.deleteMany({});
  data.data=data.data.map((obj)=>({...obj, owner: "6ac61e5d73e607294e19e4a5" })); // 2. Added owner field to each object
  // 3. Changed init.data to data.data to match your require statement
  await Listing.insertMany(data.data); 
  console.log("data was initialized");
};
