async function midd(req,res,next){
    console.log("hello from middel ware ");
    next();
}
module.exports=midd;