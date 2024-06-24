const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
var jwt = require('jsonwebtoken');
const util = require("util");
const promisify = util.promisify;
const promisifiedJWTsign = promisify(jwt.sign);
const promisifiedJWTverify = promisify(jwt.verify);


//i will set cookies here
app.use(cookieParser());
const SECRET = "qewrdhgbyw5ywetyeruww";
const payload = '23434f';

app.get("/sign", async function (req, res) {
    try {
        var authtoken = await promisifiedJWTsign({ payload }, SECRET, { algorithm: "HS256" });

        res.cookie("jwt", authtoken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        res.status(200).json({
            message: "signed the jwt and sending it in cookie",
            authtoken
        });
    }
    catch (err) {
        console.log("err", err.message);
        res.status(400).json({
            message: err.message,
            status: "fail"
        })
    }
})

app.get("/verify", async function (req, res) {
    try {
        let jwt = req.cookies.jwt;
        if (jwt) {
            const decryptedToken = await promisifiedJWTverify(jwt, SECRET);
            res.status(200).json({
                message:"jwt is verified",
                decryptedToken
            }); 
        }else{
            res.status(400).json({
                message:"no jwt found"
            });
        }
    } catch (err) {
       console.log("err",err);
       res.status(400).json({
        message:err.message,
        status:"fail"
    
       })
    }
})



app.listen(3001, function () {
    console.log(`server is listening to  port 3001`);
});



