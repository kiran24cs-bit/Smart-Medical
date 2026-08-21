require("dotenv").config();
const jwt=require("jsonwebtoken");
async function userlogincheck(req,res,next){
    let token=req.cookies.sessioncookie;
        if(!token){
            req.status=0;
            req.access=0;
            return next();
        }
        try{
            let decoded=jwt.verify(token,process.env.SECRETKEY);
            req.usercookiek=decoded;
            req.status=1;
            req.access=1;
            next();
        }
        catch(error){
            res.clearCookie("sessioncookie");
            req.status=1;
            req.access=0;
            next();
        }
    
}
module.exports=userlogincheck;