const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await
         mongoose.connect("mongodb+srv://mahikumari2020aapril_db_user:ssmm123@cluster0.dkkcxrc.mongodb.net/secureauth");
        
        console.log(" MongoDB connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;