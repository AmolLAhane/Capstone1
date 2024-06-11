const express = require("express");
require('dotenv').config();
const { USERID, MANGODBPASSWORD } = process.env;

//server created
const app = express();

const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const { connect } = require("http2");
//app.use is a middleware
app.use(express.json());
const dbUrl = `mongodb+srv://${USERID}:${MANGODBPASSWORD}@cluster0.cv4da56.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const { UserModel } = require("./userModel");
const { log } = require("console");

mongoose
  .connect(dbUrl)
  .then((connection) => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

const {sanityMiddleware}=require("./middlewares/sanityOfPayload");
const {getAllUsers,createUser,deleteUser,updateUser,getUserById}=require("./controller/userController");

//get information to server
app.get("/api/users",getAllUsers);

//send information to server
app.post("/api/user", sanityMiddleware, createUser);

app.patch("/api/user/:id",updateUser);

app.delete("/api/user/:id", deleteUser);
//to get specific user//
app.get("/api/user/:userid",getUserById );

app.listen(3000, function (req, res) {
  console.log("App is listening to the port 3000");
});



