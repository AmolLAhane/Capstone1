const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
var jwt = require('jsonwebtoken');
const util = require("util");
const promisify = util.promisify;
const path = require("path");
dotenv.config({ path: path.join("../", "../", ".env") });
const { PORT, MANGODBPASSWORD, USERID, JWT_SECRET } = process.env;
console.log(PORT);
const promisifiedJWTsign = promisify(jwt.sign);
const promisifiedJWTverify = promisify(jwt.verify);

const dbUrl = `mongodb+srv://${USERID}:${MANGODBPASSWORD}@cluster0.cv4da56.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(dbUrl)
    .then(function (connection) {
        console.log("connected to db");
    }).catch(err => console.log(err))
const UserModel = require("../../models/userModel");
const exp = require("constants");

const app = express();
app.use(express.json());

app.use(cookieParser());




const signUpController = async (req, res) => {
    try {
        const userDetails = req.body;
        const user = await UserModel.create(userDetails);
        res.status(201).json({
            message: "user created",
            newUser: user
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
        message:err.message,
        status:"fail"
})
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "email and password is required"
            })
        }
        const user = await UserModel.findOne({ email }).lean();
        if (!user) {
            return res.status(400).json({
                message: "user not found"
            })
        }
        if (user.password != password) {
            return res.status(400).json({
                message: "email/password is incorrect"
            })
        }
        const authToken = await promisifiedJWTsign({ id: user["_id"] }, JWT_SECRET);
        res.cookie("jwt", authToken, { maxAge: 900000, httpOnly: true });
        res.status(201).json({
            message: "user logged in",
            user,
            authToken
        })
    } catch (err) {

    }
}

const protectRouteMiddleWare = async (req, res) => {
    try {

        let jwt = req.cookies.jwt;
        if (!jwt) {
            res.status(400).json({
                message: "please login first",
            })
        }

        const decryptedToken = await promisifiedJWTverify(jwt, JWT_SECRET);
        const userId = decryptedToken.id;
        req.userId = userId;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:err.message,
            status:"error while login"
        })
    }

}
 const getUserData=async (req,res)=>{
    try{
        const id=req.userId;
        const userProfile=await UserModel.findById(id);
        res.status(200).json({
            userProfile,
            stattus:"success"
        })
         
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:err.message,
            status:"user does not exist"
        })
    }
 }

app.post("/signup", signUpController);
app.post("/login", loginController);
app.get("/allowIfLoggedIn", protectRouteMiddleWare, getUserData);

