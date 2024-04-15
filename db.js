const mongoose = require('mongoose'); 


const connectDB = async (mongoURI) => {
    try {
        const conn = await mongoose.connect(mongoURI, {
            dbName: "mastery_hub",
        });
        return conn;
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}


module.exports = connectDB;