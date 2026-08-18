const db=require("./db/db.js");
const express=require("express");
const app=express(); 
const bcrypt=require("bcrypt");
app.use(express.json());
app.use(express.static("public"));
app.use("/owner",require("./routes/medicalshop.js"));
app.use("/user",require("./routes/user.js"));
const midd=require("./middleware/middel.js");
app.use(midd);

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
app.listen(3100,()=>{
    console.log("successfully running at 3100");
});