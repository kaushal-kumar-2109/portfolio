// ------------------------------ requireing the packages ------------------------------
const mongoose = require("mongoose");


// ------------------------------ initializing the mongo db path variables ------------------------------
const mongo_path = process.env.MONGODB_URL_COMPRESSION || process.env.MONGODB_SRV_URL_COMPRESSION || process.env.MONGODB_URL || process.env.MONGODB_SRV_URL;


// ------------------------------ connecting the mongodb database ------------------------------
const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongo_path);
        console.log("Successfully connected to the MongoDB Database");
    } catch (error) {
        console.error("There is an error in connnecting the mongodb database => ");
        console.error(error);
        process.exit(1); // it means exit the server 
    }
};
connectToDatabase();