const db=require("../db/db.js");
const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt");
const registeruserfun=require("../controller/contuser.js");
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

router.post("/userregister", registeruserfun);

module.exports=router;