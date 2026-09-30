const db = require("./db/db.js");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const path = require("path");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const midd = require("./middleware/middel.js");
const userlogincheck=require("./middleware/userauth.js");
const { Stats } = require("fs");
const { error } = require("console");
require("dotenv").config();
let PORT=process.env.PORT || 3100
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/owner", require("./routes/medicalshop.js"));
app.use("/user", require("./routes/user.js"));
app.use("/start",require("./routes/loadplaces.js"));
app.get("/",userlogincheck,(req,res)=>{
    return res.sendFile(__dirname,"public","index.html")
}); 
app.get("/userpage",userlogincheck,(req,res)=>{
    if(req.access==1){
        return res.sendFile(path.join(__dirname,"user.html"));
    }    return res.redirect("/");  
});

app.get("/shoprequest",(req,res)=>{
    db.query("select * from shoprequest",(err,result)=>{
        if(err){
            return res.json({
                status:0,
                error:err
            })
        }
        console.log(result);
        return res.json(result);
    })
})
app.get("/entershop",(req,res)=>{
    let token=req.cookies.sessioncookie;
    
    if(!token){
        return res.redirect("/");
    }
    res.sendFile(path.join(__dirname,"shop.html"));
})
app.get("/getshoplogindata",(req,res)=>{
    let token=req.cookies.sessioncookie;
    
    if(!token){
        return res.redirect("/");
    }
    let decoded=jwt.verify(token,process.env.SECRETKEY);
    let shopcookiek=decoded;
    return res.json(shopcookiek);
})

app.get("/shopmedicalstock/:id/:limit",(req,res)=>{
    let id=req.params.id;
    let limit=req.params.limit;
    db.query("select * from medicine_stock where medical_store_id=? and medicine_stock<=?",[id,limit],(error,result)=>{
        if(error){
            res.json({
                status:0,
                err:error
            });
        }
        return res.json(result);
    })
})



app.post("/shoplogin",(req,res)=>{
    console.log("got request");
    let data=req.body;
    db.query("select * from medical_shop where   mobile_number=?  and medical_shop_name=?",[ data.mobile_number,data.medical_shop_name],(error , result)=>{
        if(error || result.length==0){
            console.log(error || "no data");
            res.json({
                Status:0
            });
        }
        else{
            console.log(result[0]);
            if(result[0].password==data.password){
                let token=jwt.sign({
                    shopname:result[0].medical_shop_name,
                    ownername:result[0].owner_name,
                    placename:result[0].place_name,
                    mobilenumber:result[0].mobile_number,
                    shopid:result[0].id
                },
                process.env.SECRETKEY,
                {
                    expiresIn:"2m"
                }
                );
                res.cookie("sessioncookie",token,{
                httpOnly:true,
                secure:false,
                sameSite:"lax",
                maxAge: 1 * 60 * 1000
                });
                return res.json({
                    status:1,
                    msg:"success login"
                })
            }
            res.json({
                status:1,
                msg:"wrong password"
            });
        }
    })
})
app.get("/logout",(req,res)=>{
    res.clearCookie("sessioncookie");
    res.send("loggedout");
})

app.listen(PORT,"0.0.0.0",()=>{
    console.log(`http://localhost:${PORT}/`);
});