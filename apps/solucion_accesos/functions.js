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


function applyFilters(table, classFilter){
    tables[table].setData([]);
    let page= getValueUserLocation()
    let data= getInputsValueByClass(classFilter)
    if(table== 'tableArticles'){
        let resultadosFiltrados = dataTableArticles.filter(function(item) {
            let rangoFechaDesde = !(data.idFechaDesdeArticles != '' && data.idFechaHastaArticles != '') || (item.date >= data.idFechaDesdeArticles  && item.date <= data.idFechaHastaArticles);
            let rangoUbicacion= !(data.idUbicacionArticles != '') || (item.location.toLowerCase() ===  data.idUbicacionArticles.toLowerCase());
            return rangoFechaDesde && rangoUbicacion;
        });
        dataTable1 = resultadosFiltrados;
        tables[table].setData(dataTable1);
    } else {
        let resultadosFiltrados = dataTableArticlesLose.filter(function(item) {
            let rangoFechaDesde = !(data.idFechaDesdeArticlesLose != '' && data.idFechaHastaArticlesLose != '') || (item.date >= data.idFechaDesdeArticlesLose  && item.date <= data.idFechaHastaArticlesLose);
            let rangoUbicacion= !(data.idUbicacionArticlesLose != '') || (item.location.toLowerCase() ===  data.idUbicacionArticlesLose.toLowerCase());
            return rangoFechaDesde && rangoUbicacion;
        });
        dataTable2 = resultadosFiltrados;
        tables[table].setData(dataTable2);
    }
  
}