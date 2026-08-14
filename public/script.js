let role=document.getElementById("role");
let userregisterdiv=document.getElementById("userregisterdiv");
let userlogindiv=document.getElementById("userlogindiv");
let shopregisterdiv=document.getElementById("shopregisterdiv");
let shoplogindiv=document.getElementById("shoplogindiv");
let locationdiv=document.getElementById("locationdiv");
function initial(){
    locationdiv.style.display="none";
    userregisterdiv.style.display="none";
    userlogindiv.style.display="none";
    shopregisterdiv.style.display="none";
    shoplogindiv.style.display="none";
}
window.addEventListener("load",initial);
function loadrole(){
    initial();
    role.style.display="flex";
}
async function loadshopform() {
    role.style.display="none";
    initial();
    shoplogindiv.style.display="block";
}
async function loaduserform() {
    role.style.display="none";
    initial();
    userlogindiv.style.display="block";
}
async function loaduserregister(){
    initial();
    userregisterdiv.style.display="block";
}
async function loadshopregister(){
    initial();
    shopregisterdiv.style.display="block";
}
function showlocationdiv(){
    locationdiv.style.display="block";
}