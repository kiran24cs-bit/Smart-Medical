const db=require("../db/db.js");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

async  function registeruserfun(req,res)
{
    console.log(req.ip);
    let data=req.body;
    let hashedpassword=await bcrypt.hash(data.password,10);
    let query="insert into users(mobile_number,name,place_name,password) values(?,?,?,?)";
    db.query(query,[data.mobile_number,data.name,data.place_name,hashedpassword],(error,result)=>
    {
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
    });
}
async function  loginuserfun(req,res){
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
            let token=jwt.sign(
                {
                    id:result[0].id,
                    name:result[0].name,
                    place:result[0].place_name
                },
                process.env.SECRETKEY,
                {
                    expiresIn: "2m"
                }
            );
            res.cookie("sessioncookie",token,{
                httpOnly:true,
                secure:false,
                sameSite:"lax",
                maxAge: 1 * 60 * 1000
            });
            return res.json({
                access:1
            });   
        }
        else{
            return  res.json({
                access:0
            })
        }
    })
}
async function userdetail(req,res){
    let token=req.cookies.sessioncookie;
    let decoded=jwt.verify(token,process.env.SECRETKEY);
    let usercookiek=decoded;
    return res.json(usercookiek);
}
async function searchmedicine(req,res) {
    const id  =req.query.id;
    const medname=req.query.medname;
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
and 
medicine_name like ?
    order by s.Price asc`;
    db.query(query,[id,`%${medname}%`],(error , result)=>{
        if(error){
            console.log(" error");
            res.json({
                status:0
            });
            return;
        }
        res.json(result);
    });
}
module.exports={ registeruserfun , loginuserfun ,userdetail,searchmedicine };