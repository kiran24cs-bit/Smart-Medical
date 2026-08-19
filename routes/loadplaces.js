const db=require("../db/db.js");
const express=require("express");
const router=express.Router();
router.get("/places",(req,res)=>{
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

module.exports=router;