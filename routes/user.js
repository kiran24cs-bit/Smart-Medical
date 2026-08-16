const db=require("../db/db.js");
const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt");

router.get("/getmedical",(req,res)=>{
    const mobile_number  =req.query.mobile_number;
    console.log("called");
    let query=`SELECT 
    u.place_name,
    m.owner_name,
    m.mobile_number,
    m.medical_shop_name,
    m.longitude,
    m.latitude,
    s.medicine_name,
    s.medicine_stock
FROM users u
JOIN medical_shop m 
    ON u.place_name = m.place_name
JOIN medicine_stock s 
    ON m.id = s.medical_store_id
WHERE u.mobile_number = ?`;
    db.query(query,[mobile_number],(error , result)=>{
        if(error){
            res.json({
                status:0
            });
            return;
        }
        res.json(result);
    });
});

router.post("/userregister",async (req,res)=>{
    let data=req.body;
    let hashedpassword=await bcrypt.hash(data.password,10);
    let query="insert into users(mobile_number,name,place_name,password) values(?,?,?,?)";
    db.query(query,[data.mobile_number,data.name,data.place_name,hashedpassword],(error,result)=>{
        if(error){
            res.json({
                status:0,
                err:error.errno
            });
            return;
        }
        res.json({
            status:1,
            id:result.insertId
        });
    })
});

module.exports=router;