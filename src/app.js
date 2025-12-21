const express = require("express");

const app = express();

// app.use((req,res)=>{
//     res.send("Hello from server");
// })

app.use("/test",(req,res)=>{
    res.send("Hello from server using nodemon");
})

app.listen(3000, ()=>{
    console.log("Server started successfully");
    
});