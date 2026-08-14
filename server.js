const db=require("./db/db.js");
const express=require("express");
const app=express(); 
app.use(express.json());
app.use(express.static("public"));
app.use("/owner",require("./routes/medicalshop.js"));




app.get("/",(req,res)=>{
    res.send("success");
});

app.listen(3100,()=>{
    console.log("successfully running at 3100");
});