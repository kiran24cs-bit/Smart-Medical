let role=document.getElementById("role");
let userregisterdiv=document.getElementById("userregisterdiv");
let userlogindiv=document.getElementById("userlogindiv");
let shopregisterdiv=document.getElementById("shopregisterdiv");
let shoplogindiv=document.getElementById("shoplogindiv");
let locationdiv=document.getElementById("locationdiv");
let findlocationbtn=document.getElementById("findlocationbtn");
let placesdata;
loadplaces();
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
async function loadplaces(){
    let data=await fetch("/places",{
        method:"GET"
    });
    placesdata=await data.json();
    if(placesdata.status==0){
        alert("unable to load places");
        return;
    }
}
async function loaduserregister(){
    initial();
    userregisterdiv.style.display="block";
    let select=document.getElementById("userregisterplace");
    for(let place of placesdata){
        let option=document.createElement("option");
        option.value=place.place_name;
        option.innerText=place.place_name;
        select.appendChild(option);
    }
}
async function loadshopregister(){
    initial();
    shopregisterdiv.style.display="block";
    findlocationbtn.innerText="Find Location";
    let select=document.getElementById("shopregisterplace");
    for(let place of placesdata){
        let option=document.createElement("option");
        option.value=place.id;
        option.innerText=place.place_name;
        select.appendChild(option);
    }
}
function showlocationdiv(){
    locationdiv.style.display="block";
}
function findlocation() {
    findlocationbtn.innerText="Locating...";
    if (!navigator.geolocation) {
        findlocation.innerText="Geolocation is not supported by your browser";
        return;
    }
    navigator.geolocation.getCurrentPosition(
        function(position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            showlocationdiv();
            document.getElementById("shopregisterlatitude").value = latitude;
            document.getElementById("shopregisterlongitude").value = longitude;
            findlocationbtn.innerText="Location Found";
            
        },
        function(error) {

            if (error.code === 1) {
                alert("Location permission denied.");
            } 
            else if (error.code === 2) {
                alert("Location unavailable.");
            } 
            else if (error.code === 3) {
                alert("Location request timed out.");
            } 
            else {
                alert("Unable to find your location.");
            }

        }
    );
}
function locateonmap(){
    let latitude=document.getElementById("shopregisterlatitude").value ;
    let longitude=document.getElementById("shopregisterlongitude").value ;
    if(!latitude || !longitude ){
        alert("Enter longitude and latitude");
        return;
    }
    let mapurl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(mapurl, "_blank");
}



async function getmedical(x) {
    let mobile_number="1";
    let url=`/user/getmedical?mobile_number=${x}`;
    let data=await fetch(url);
    let response=await data.json();
    console.log(response);
}
