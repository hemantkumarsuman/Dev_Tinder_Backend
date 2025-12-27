const express = require("express");

const app = express();

app.use("/user",(req,res,next)=>{
    console.log("User Route");
    next();    
},
(req, res,next)=>{
    console.log("2nd route");
    //res.send("2nd response");
    next()
},
(req,res,next)=>{
    console.log("3rd route");
    //res.send("3rd response");
    next()
},
(req,res,next)=>{
    console.log("4th route");
    // res.send("4th response")
    //next()
}
)

app.listen(3000, ()=>{
    console.log("Server started successfully");
    
});