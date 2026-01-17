const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validate");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");
const app = express();
app.use(express.json());  
app.use(cookieParser()); 


//signup API
app.post("/signup", async (req, res) => {
    console.log(req);
    const { firstName, lastName, emailID, password } = req.body;
    //Validate signup data
    validateSignUpData(req);

    //encrypt password    
    const passwordHash = await bcrypt.hash(password, 10); //returns promise

    //creating a new instance of User model
    const userObj = {
        firstName,
        lastName,
        emailID,
        password: passwordHash
    };
    const user = new User(userObj);
    //save data in database
    try {
        await user.save();
        res.send("User added successfully");
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

//login API
app.post("/login", async (req, res) => {
    
    try {
        const { emailID, password } = req.body;
        if (!validator.isEmail(emailID)) {
            throw new Error("Enter valid EMAILID");
        }

        //check whether emailID is present is DB
        const user = await User.findOne({ emailID: emailID });

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                //create JWT token
                const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790");

                console.log(token);
                //Add token to cookie and res back to user
                res.cookie("token", token);

                res.send("Login Successfull!!!");
            }
            else {
                throw new Error("InValid Password...");
            }
        }
        else {
            throw new Error("Enter Valid registered EmailId");
        }
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})

//Get profile of logged in user
app.get("/GetProfile", userAuth, async (req, res) => {
    try {
        
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send(err.message); 
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

