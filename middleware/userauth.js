async function userlogincheck(req,res,next){
    let token=req.cookies.sessioncookie;
        if(!token){
            return res.redirect("/");
        }
        try{
            console.log("7 middleware userauth.js");
            let decoded=jwt.verify(token,process.env.SECRETKEY);
            req.usercookiek=decoded;
            console.log(req.usercookiek);
            res.sendFile(path.join(__dirname, "user.html"));
        }
        catch{
            res.clearCookie("sessioncookie");
            return res.redirect("/");
        }
    next();

}

module.exports=userlogincheck;