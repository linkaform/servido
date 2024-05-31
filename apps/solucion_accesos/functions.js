var userActualPage=''; 
var userStatusTurn=''; 

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