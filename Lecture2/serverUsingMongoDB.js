const express = require("express");
const fs = require("fs");

//server created
const app = express();
const userDataDB = JSON.parse(fs.readFileSync("./dev-data.json", "utf-8"));
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const { connect } = require("http2");
//app.use is a middleware
app.use(express.json());
const dbUrl =
  "mongodb+srv://amollahane123:ojfa0vOmoh6felXD@cluster0.cv4da56.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const { UserModel } = require("./userModel");

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
app.use(function (req, res, next) {
  console.log("req received ");
  next();
});

//get data
app.get("/api/users", (req, res) => {
  try {
    console.log("send data of all the users");
    res.status(200).json({
      message: "user data list",
      data: userDataDB,
    });
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

    // let id= uuidv4();
    // newUser.id=id;
    // //add the new user to DB
    // userDataDB.push(newUser);
    // fs.writeFileSync("./dev-data.json",JSON.stringify(userDataDB));
    //result with success message
    res.status(200).json({ message: "user added successfylly", user });
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
app.get("/api/user/:userid", (req, res) => {
  try {
    let { userid } = req.params;
    //search my Db for id//
    let user = userDataDB.find((userObj) => {
      return userObj.id == userid;
    });
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
// find 
// findById