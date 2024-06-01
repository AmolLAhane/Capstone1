const express= require("express");
const fs=require("fs");

//server created
const app=express();
const userDataDB=fs.readFileSync("./dev-data.json","utf-8");
console.log(userDataDB);

const updateUser=()=>{
    console.log("user profile updated");
}
const deleteUser=()=>{
    console.log("user profile deleted");
}

app.get("/user",(req,res)=>{
    console.log("send data of all the users");
    res.status(200).json({
        message:"user data list",
        data:userDataDB
    })    
});
app.post("/user",(req,res)=>{
    console.log("user profile added ");
    res.status(201).json({
        message:"user data added",
        data:userDataDB
    })    
});
app.put("/user",updateUser);
app.delete("/user",deleteUser);


//this function catches any request that comes to the server
app.use(function(req,res){
    res.json({
        "message":"Response from servers"
    })
 console.log(" Received request");
})
app.listen(3000,function(req,res){
    console.log("App is listening to the port 3000");
 
    
})