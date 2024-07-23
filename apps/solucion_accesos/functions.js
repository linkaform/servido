var userActualPage=''; 
var userStatusTurn=''; 
var arrayUserBoothsLocations=[];
let userJwt = getCookie("userJwt");


function setValueUserLocation(txt){
	userActualPage=txt;
}

function getValueUserLocation(){
	return userActualPage;
}

function getStatusTurn(){
	return userStatusTurn;
}
function setStatusTurn(txt){
	userStatusTurn= txt;
}

//-----TABLES
function drawTable(id, columnsData, tableData,){
    var  table = new Tabulator("#" + id, {
        layout:"fitDataTable",
        data:tableData,
        textDirection:"ltr",
        columns:columnsData,
        pagination:true, 
        paginationSize:40,
  });
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires+"; SameSite=Strict";
}

function loadBoothsLocations(){
    fetch(url + urlScripts, {
    method: 'POST',
    body: JSON.stringify({
        script_name: 'script_turnos.py',
        option:'get_user_booths'
    }),
    headers:
        {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+userJwt
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            if(user !='' && userJwt!=''){
                arrayUserBoothsLocations=[]
                let userBooths=res.response.data
                if(userBooths.length>0){
                    for(let booth of userBooths){
                        arrayUserBoothsLocations.push({name:booth.area, ubi:booth.location, status:booth.status , guard: booth.employee, folio: booth.folio})
                    }
                }else{
                    arrayUserBoothsLocations=[]
                }
            }
        }
    });
}
