const db=require("../db/db.js");
const bcrypt=require("bcrypt");

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
module.exports=registeruserfun;