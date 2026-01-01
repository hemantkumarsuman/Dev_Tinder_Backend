const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");

//this convert req.body from json to object
app.use(express.json());

app.post("/signup", async (req, res) => {
    console.log(req);
    
    //here we were hardcoding userObj but we need to make this dynamic->we will use req.data
    const userObj = req.body;
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

