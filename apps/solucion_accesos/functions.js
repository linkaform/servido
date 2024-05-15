var userActualPage=''; //nombres de las paginas
var userStatusTurn=''; //'on', 'off'

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