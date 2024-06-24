    const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//i will set cookies here
app.get("/", function (req, res) {
    res.cookie("prevpage", "home", {
        //life of cookies
        maxAge: 24 * 60 * 60 * 1000,
        //your cookie can not be tampered by client site scripts
        httpOnly: true,
        //secure:true
    })
    res.status(200).json({
        message: "thank you for the visit"
    })

})

// i wil check whether the user visiting the first time or has already visited
app.get("/product", function (req, res) {
    //getting  all the cookies wrt hostname
    let messageStr = "";
    if (req.cookies && req.cookies.prevpage) {
        messageStr = `you have already  visited ${req.cookies.prevpage}`
    }
    res.status(200).json({
        message: messageStr
    })
})


//clear the cookies
app.get("/clearCookies", function (req, res) {
    res.clearCookie("prevpage", { path: "/" });
    res.status(200).json({
        message: "i have cleared the cookie"
    })
})

app.listen(3001, function () {
    console.log(`server is listening to  port 3001`);
})