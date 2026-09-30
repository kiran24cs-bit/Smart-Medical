shopname=document.getElementById("shopname");
ownername=document.getElementById("ownername");
shopmobile=document.getElementById("shopmobile");
shopProfileId=document.getElementById("shopProfileId");
window.addEventListener("load",async ()=>{
    let data=await fetch("/getshoplogindata");
    data=await data.json();
    console.log(data);
    shopname.innerText=data.shopname ;
    ownername.innerText="Name : "+data.ownername;
    shopmobile.innerText="Tel : "+data.mobilenumber;
    shopProfileId.innerText=data.shopid;
    allmedicine(10000);
}
)
async function allmedicine(limit){
    console.log(limit);
    let data= await fetch(`/shopmedicalstock/${shopProfileId.innerText}/${limit}`);
    let response=await data.json();
    displaymedicine(response);
}




addmedicinediv=document.getElementById("addmedicinediv");
medicineStockEditor=document.getElementById("medicineStockEditor");
shopProfileDiv=document.getElementById("shopProfileDiv");

function hidediv(){
    addmedicinediv.style.display="none";
    medicineStockEditor.style.display="none";
    shopProfileDiv.style.display="none";
}
hidediv();
function showdiv(curdiv){
    hidediv();
    curdiv.style.display="block"
}
updatestockbtn=document.getElementById("updatestockbtn");
addmedicinebtn=document.getElementById("addmedicinebtn");
medicineAlertButton=document.getElementById("medicineAlertButton");
profilebtn=document.getElementById("profilebtn");
profilebtn.addEventListener("click",()=>{
    showdiv(shopProfileDiv);
})
updatestockbtn.addEventListener("click",()=>{
    showdiv(medicineStockEditor);
})
addmedicinebtn.addEventListener("click",()=>{
    showdiv(addmedicinediv);
})
medicineAlertButton.addEventListener("click",()=>{
    allmedicine(56);
})


function displaymedicine(res){
    let medicinetablebody=document.getElementById("medicinetablebody");
    medicinetablebody.innerHTML = "";

    for (let  medicine of res){
        let medicinetablebody=document.getElementById("medicinetablebody");
        let trow=document.createElement("tr");
        let id=document.createElement("td");
        let medicine_name=document.createElement("td");
        let medicine_stock=document.createElement("td");
        let Price=document.createElement("td");
        id.innerText=medicine.id;
        medicine_name.innerText=medicine.medicine_name;
        medicine_stock.innerText=medicine.medicine_stock;
        Price.innerText=medicine.Price;
        trow.appendChild(id);
        trow.appendChild(medicine_name);
        trow.appendChild(medicine_stock);
        trow.appendChild(Price);
        medicinetablebody.appendChild(trow);
    }
}


