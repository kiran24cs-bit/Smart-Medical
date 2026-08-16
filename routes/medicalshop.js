const express=require("express");
const router=express.Router();
const db=require("../db/db.js");
const bcrypt=require("bcrypt");
router.post("/addshop",async (req,res)=>{
    const { owner_name , mobile_number, medical_shop_name , place_id , password , longitude , latitude}=req.body;
    const query="insert into medical_shop (owner_name , mobile_number, medical_shop_name , place_id , password , longitude , latitude) values(?,?,?,?,?,?,?)";
    db.query(query,[owner_name , mobile_number, medical_shop_name , place_id , password , longitude , latitude],(error , result)=>{
        if(error){
            res.json({
                status:0,
                reason:error.errno
            });
            return ;
        }
        res.json({
            status:1,
            id:result.insertId
        });
    });
});

router.post("/shopregister",async (req,res)=>{
    let data=req.body;
    let hashedpassword=await bcrypt.hash(data.password,10);
    let query="insert into shoprequest(owner_name,mobile_number,medical_shop_name,place_name,password,longitude,latitude) values(?,?,?,?,?,?,?)";
    db.query(query,[data.owner_name,data.mobile_number,data.medical_shop_name,data.place_name,hashedpassword,data.longitude,data.latitude],(error,result)=>{
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