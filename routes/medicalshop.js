const express=require("express");
const router=express.Router();
const db=require("../db/db.js");
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





module.exports=router;