const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
    const userObj = {
        firstName: "Zoro",
        lastName: "swordman",
        emailID: "zoro@gmail.com",
        password: "zoro16"
    }
    //creating a new instance of User model
    const user = new User(userObj);
    //save data in database
    try {
        await user.save();
        res.send("User added successfully");
    }
    catch (err) {
        res.status(400).send("Something went wrong");
    }
})

connectDB().then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
        console.log("Server started successfully");

    });

}).catch((err) => {
    console.log("Cannot connect to Database");

})

