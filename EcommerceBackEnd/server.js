const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const {userRouter}=require("./routes/userRouter");
const {productRouter}=require("./routes/productRouter");
const { USERID, MANGODBPASSWORD,PORT } = process.env;
const app = express();
//app.use is a middleware
app.use(express.json());
//let mongoClient= await mongoose.connect(dbUrl);
const dbUrl = `mongodb+srv://${USERID}:${MANGODBPASSWORD}
@cluster0.cv4da56.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
 mongoose.connect(dbUrl)
 .then(()=>{
  console.log("db Connected")
 }).catch((err)=>{
  console.log(err.message)
 });

 //app.use
app.use("/api/user",userRouter);
app.use("/api/product",productRouter);


app.listen(PORT, function (req, res) {
  console.log(`App is listening to the ${PORT}`);
});



