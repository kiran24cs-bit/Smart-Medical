const db=require("./db/db.js");
const express=require("express");
const app=express(); 
app.use(express.json());
app.use(express.static("public"));
app.use("/owner",require("./routes/medicalshop.js"));


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