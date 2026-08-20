let username;
let userplace;
console.log("3 script reached");
let editprofile=document.getElementById("editprofile");
window.addEventListener("load",async ()=>{
    let data=await fetch("/getuserlogindata");
    data=await data.json();
    username=data.name;
    userplace=data.place;
    document.getElementById("username").innerText=username;
    document.getElementById("userplace").innerText=userplace;
    editprofile.innerText=username[0];
    console.log("10 userpagescript");
}
)

document.getElementById("logoutbtn").addEventListener("click",async ()=>{
    console.log("logout clicked");
    let res=await fetch("/logout");
    window.location.href="/";
})
