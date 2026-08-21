const db=require("../db/db.js");
const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { registeruserfun , loginuserfun , userdetail }=require("../controller/contuser.js");
const userlogincheck=require("../middleware/userauth.js");
router.get("/getmedical",(req,res)=>{
    const id  =req.query.id;
    console.log("called");
    let query=`SELECT 
    u.place_name,
    m.owner_name,
    m.mobile_number,
    m.medical_shop_name,
    m.longitude,
    m.latitude,
    s.medicine_name,
    s.medicine_stock,
    s.Price
FROM users u
JOIN medical_shop m 
    ON u.place_name = m.place_name
JOIN medicine_stock s 
    ON m.id = s.medical_store_id
WHERE u.id = ?
    order by s.Price asc`;
    db.query(query,[id],(error , result)=>{
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
router.post("/userlogin",loginuserfun);
router.get("/getuserlogindata",userdetail);

module.exports=router;