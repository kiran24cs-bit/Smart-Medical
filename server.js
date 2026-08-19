const db=require("./db/db.js");
const express=require("express");
const app=express(); 
const path=require("path");
const bcrypt=require("bcrypt");
app.use(express.json());
app.use(express.static("public"));
app.use("/owner",require("./routes/medicalshop.js"));
app.use("/user",require("./routes/user.js"));
const midd=require("./middleware/middel.js");
app.use(midd);
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"index.html");
})
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
            res.json({
                status:11
            });
            
        }
        else{
            res.json({
                status:1

            })
        }
    })
});
app.get("/userpage",(req,res)=>{
    res.sendFile(path.join(__dirname, "user.html"));
});
app.listen(3100,()=>{
    console.log("successfully running at 3100");
});