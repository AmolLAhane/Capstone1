const express = require("express");
require('dotenv').config();
console.log(process.env);

//server created
const app = express();

const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const { connect } = require("http2");
//app.use is a middleware
app.use(express.json());
const dbUrl = "mongodb+srv://:@cluster0.cv4da56.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

//sanityMiddleware used for authentication
const sanityMiddleware = (req, res, next) => {
  try {
    console.log("in sanitary MiddleWare");
    let user = req.body;
    let isEmpty = Object.keys(user).length == 0;
    if (isEmpty) {
      res.status(400).json({
        status: "fail",
        message: "user is not present",
      });
    } else next();
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
//this is a middle ware


//get data
app.get("/api/users", async (req, res) => {
  try {
    console.log("send data of all the users");
    let allUsers = await UserModel.find({});
    if (allUsers.length != 0) {
      res.status(200).json({
        message: "user data list",
        data: allUsers,
      })
    } else {
      res.status(400).json({
        message: "No user found"
      })
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//send information to server
app.post("/api/user", sanityMiddleware, async (req, res) => {
  try {
    //console.log(req.body);
    //get the new user
    let newUser = req.body;
    const user = await UserModel.create(newUser);
    if (user) res.status(200).json({
      message: "user added successfylly",
      user
    });
    else res.status(400).json({
      message: "user could not be registered",
      user
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//app.patch("/api/user",updateUser);
//app.put("/api/user",updateUser);

app.delete("/api/user/:id", (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    //search my DB  for id
    let idx = userDataDB.findIndex((userObj) => {
      return userObj.id == id;
    });
    //delete if user is found
    if (idx == -1) {
      res.status(400).json({
        message: "user not found",
      });
    } else {
      //delete the user
      userDataDB.splice(idx, 1);
      fs.writeFileSync("./dev-data.json", JSON.stringify(userDataDB));
      //result with success message
      res.status(200).json({ message: "user deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//to get specific user//
app.get("/api/user/:userid", async (req, res) => {
  try {
    let { userid } = req.params;
    //search my Db for id//
    const user = await UserModel.findById(userid);
    console.log(user);
    //return if user is found//
    if (!user) {
      res.status(400).json({
        message: "user not found",
      });
    } else {
      //return the user
      //res with suceess message//
      res.status(200).json({ data: user });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//this function catches any request that comes to the server
app.use(function (req, res) {
  console.log(" Received request");
});
app.listen(3000, function (req, res) {
  console.log("App is listening to the port 3000");
});

//methods//

// findByIdAndUpdate
// findByIdAndDelete


