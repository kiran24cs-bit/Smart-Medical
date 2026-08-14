const mysql=require("mysql2");
require("dotenv").config();
const db=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASS,
    database:process.env.DB
});
db.connect((error)=>{
    if(error){
        console.log("unalbe to connect");
    }
    else{
        console.log("no error");
    }
})
module.exports=db;