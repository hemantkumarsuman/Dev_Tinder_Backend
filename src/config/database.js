const mongoose = require("mongoose");

// mongodb+srv://hemantkumar1699_db_user:UblwwiriG5lYyPuJ@nodejs.0y7dsfa.mongodb.net/

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://hemantkumar1699_db_user:UblwwiriG5lYyPuJ@nodejs.0y7dsfa.mongodb.net/devTinder")
}

module.exports = connectDB;