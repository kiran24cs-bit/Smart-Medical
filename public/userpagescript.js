let username;
let userplace;
let userid;
let timeout;
let search=document.getElementById("medicinesearch");
search.addEventListener("keyup",getmedicinebyname);
let editprofile=document.getElementById("editprofile");
window.addEventListener("load",async ()=>{
    let data=await fetch("/user/getuserlogindata");
    data=await data.json();
    console.log(data);
    username=data.name;
    userplace=data.place;
    userid=data.id;
    document.getElementById("username").innerText=username;
    document.getElementById("userplace").innerText=userplace;
    editprofile.innerText=username[0];
    getmedical(data.id);
}
)
document.getElementById("logoutbtn").addEventListener("click",async ()=>{
    let res=await fetch("/logout");
    //window.close();
    window.location.href="/";
})

async function getmedical(id) {
    console.log(id);
    let url=`/user/getmedical?id=${id}`;
    let data=await fetch(url);
    let response=await data.json();
    createtable(response);
    
}

async function getmedicinebyname(){
    let medicinename=search.value;
    clearTimeout(timeout);
    timeout=setTimeout(async ()=>{
        console.log(medicinename)
        let response=await fetch(`/user/searchmedicine?id=${userid}&medname=${medicinename}`);
        response=await response.json();
        if(response.status==0){
            alert("unable to load medicine");
            return;
        }
        createtable(response);
    },500);
}

function createtable(response){
    let table = document.getElementById("medicinetable");
    while (table.children.length > 1) {
        table.removeChild(table.children[1]);
    }
    for(let medicine of response){
        let table=document.getElementById("medicinetable");
        let row=document.createElement("tr");
        let shop=document.createElement("td");
        let number=document.createElement("td");
        let medicinename=document.createElement("td");
        let stock=document.createElement("td");
        let price=document.createElement("td");
        let address=document.createElement("td");
        let distance=document.createElement("td");
        let map=document.createElement("td");
        shop.innerText=medicine.medical_shop_name;
        number.innerText=medicine.mobile_number;
        medicinename.innerText=medicine.medicine_name;
        stock.innerText=medicine.medicine_stock;
        price.innerText=medicine.Price;
        address.innerText="ADDRESS";
        distance.innerText="0.2 Km";
        let locate=document.createElement("a");
        locate.href=`https://www.google.com/maps?q=${medicine.latitude},${medicine.longitude}`;
        locate.innerText="Locate Medical Shop";
        locate.target="_blank";
        map.appendChild(locate);
        row.appendChild(shop);
        row.appendChild(number);
        row.appendChild(medicinename);
        row.appendChild(stock);
        row.appendChild(price);
        row.appendChild(address);
        row.appendChild(distance);
        row.appendChild(map);
        table.appendChild(row);
    }
}