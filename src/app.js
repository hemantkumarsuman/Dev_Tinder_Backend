const express = require("express");

const app = express();

app.get("/user",(req,res)=>{
    res.send({firstName: "Hemant", lastName: "Kumar"})
});

app.post("/user",(req,res)=>{
    console.log("Save data to DB");;
    res.send("Data saved Successfully");    
})

app.delete("/user",(req,res)=>{
    res.send("Data deleted Successfully");    
})

app.use("/test",(req,res)=>{
    res.send("Hello from server using nodemon");
})

app.listen(3000, ()=>{
    console.log("Server started successfully");
    
});