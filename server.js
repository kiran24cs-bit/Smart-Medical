const db = require("./db/db.js");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const path = require("path");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const midd = require("./middleware/middel.js");
const userlogincheck=require("./middleware/userauth.js");
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.use("/owner", require("./routes/medicalshop.js"));
app.use("/user", require("./routes/user.js"));
app.use("/start",require("./routes/loadplaces.js"));
app.get("/",(req,res)=>{
    return res.sendFile(__dirname,"public","index.html")
});
app.get("/userpage",userlogincheck,(req,res)=>{
    if(req.access==1){
        return res.sendFile(path.join(__dirname,"user.html"));
    }
    console.log("access = 0");
    return res.redirect("/");  
});



app.get("/logout",(req,res)=>{
    res.clearCookie("sessioncookie");
    res.send("loggedout");
})



app.listen(3100,()=>{
    console.log("http://localhost:3100/");
});