const db = require("./db/db.js");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const path = require("path");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.use("/owner", require("./routes/medicalshop.js"));
app.use("/user", require("./routes/user.js"));

const midd = require("./middleware/middel.js");
app.use(midd);
app.get("/",(req,res)=>{
    let token=req.cookies.sessioncookie;
    if(token){
        console.log("21");
        return res.redirect("/userpage");
    }
    return;
});
app.get("/places",(req,res)=>{
    db.query("select * from places order by place_name",[],(error,result)=>{
        if(error){
            res.json({
                status:0
            });
            return;
        }
        res.json(result);
    });
});
app.post("/userlogin",async (req,res)=>{
    let {mobile_number , password }=req.body;
    db.query("select * from users where mobile_number=?",[mobile_number],async (error,result)=>{
        if(error){
            return res.status(500).json({
                status:0
            });
        }
        if(result.length==0){
            res.json({
                status:0
            });
            return ;
        }
        let match=await bcrypt.compare(password,result[0].password);
        if(match){
            let token=jwt.sign(
                {
                    id:result[0].id,
                    name:result[0].name,
                    place:result[0].place_name
                },
                process.env.SECRETKEY,
                {
                    expiresIn: "2m"
                }
            );
            res.cookie("sessioncookie",token,{
                httpOnly:true,
                secure:false,
                sameSite:"lax"
            });
            return res.json({
                access:1
            });   
        }
        else{
            return  res.json({
                access:0
            })
        }
    })
});
app.get("/userpage",(req,res)=>{
    let token=req.cookies.sessioncookie;
    if(!token){
        return res.redirect("/");
    }
    try{
        console.log("has cookie");
        let decoded=jwt.verify(token,process.env.SECRETKEY);
        let usercookiek=decoded;
        console.log(decoded);
        res.sendFile(path.join(__dirname, "user.html"));
    }
    catch{
        res.clearCookie("sessioncookie");
        return res.redirect("/");
    }


});
app.get("/getuserlogindata",(req,res)=>{
    console.log("103 server");
    let token=req.cookies.sessioncookie;
    if(!token){
        return res.redirect("/");
    }
    try{
        console.log("has cookie");
        let decoded=jwt.verify(token,process.env.SECRETKEY);
        let usercookiek=decoded;
        console.log(usercookiek);
        return res.json(usercookiek);
    }
    catch{
        res.clearCookie("sessioncookie");
        return res.redirect("/");
    }
    
})







app.listen(3100,()=>{
    console.log("http://localhost:3100/");
});