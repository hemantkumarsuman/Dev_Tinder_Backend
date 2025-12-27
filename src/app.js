const express = require("express");

const app = express();

const {adminAuth} = require("./middlewares/auth")

//how to use middleware and route handler

//WITHOUT MIDDLEWARE

// app.get("/admin/GetAllData",(req,res)=>{
//     //logic to chk request is authorized or not->If yes then Get all data
//     const token = "xyz";
//     const isAdmin = token === "xyz";
//     if(isAdmin){
//         res.send("Get all data")
//     }
//     else{
//         res.status(401).send("unauthorized request");
//     }
// });

// app.get("/admin/deleteUser",(req,res)=>{

//     //logic to chk request is authorized or not->If yes then Delete user
//     const token = "xyz";
//     const isAdmin = token === "xyz";
//     if(isAdmin){
//         res.send("Delete user data")
//     }
//     else{
//         res.status(401).send("unauthorized request");
//     }
// })

app.use("/admin",adminAuth);

app.get("/admin/getalluser",(req,res,next)=>{
    res.send("Get all user");
})

app.get("/admin/deleteuser",(req,res,next)=>{
    res.send("deleted user");
})

app.listen(3000, ()=>{
    console.log("Server started successfully");
    
});