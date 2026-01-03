const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");

//this convert req.body from json to object
app.use(express.json());

//signup API
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
        res.status(400).send("Something went wrong"+ err.message);
    }
});

//Get User By EmailID
app.get("/GetUserByEmailID", async (req,res)=>{
    const userEmail = req.body.emailID;

    try{
        const user = await User.find({emailID: userEmail});
        if(user.length){
            res.send(user);
        }
        else{
            res.status(404).send(`No user found for ${userEmail}`);
        }
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
});

//Get User by ID
app.get("/GetUserById", async (req,res)=>{
    const userId = req.body._id;
    if(!userId){
        return res.status(400).send("_id is required in request body");
    }
    try{
        const user = await User.findById(userId);
        if(user){
            res.send(user);
        }
        else{
            res.status(404).send("User not found");
        }
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
});

//Get Feed for user, i.e.Get all user
app.get("/GetFeed", async(req,res)=>{

    try{
        const user = await User.find({});
        if(user.length){
            res.send(user);
        }
        else{
            res.status(404).send("No user found");
        }
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
});

//delete user by id
app.delete("/DeleteUserById",async (req,res)=>{
    const userId = req.body.userId;

    try{
        const user = await User.findByIdAndDelete(userId);
        if(user){
            res.send(`${user} deleted successfully`);
        }
        else{
            res.status(404).send(`User not found`);
        }
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
});

//Update user by ID
app.patch("/UpdateUser", async (req,res)=>{
    const userId = req.body.userId;
    const updateData = req.body;
    try{
        const user = await User.findByIdAndUpdate(userId, updateData);
        if(user){
            res.send(`User Updated Successfully`);
        }
        else{
            res.status(404).send("No user found");
        }
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
});


connectDB().then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
        console.log("Server started successfully");

    });

}).catch((err) => {
    console.log("Cannot connect to Database");

})

