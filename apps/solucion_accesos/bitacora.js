let selectLocation;

window.onload = function(){
	setValueUserLocation('bitacora');
	console.log(getValueUserLocation())
	changeButtonColor();
	fillCatalogs();
	selectLocation= document.getElementById("selectLocation")
	selectLocation.onchange = function() {
        let response = fetchOnChangeLocation()
    };
 	selectCaseta= document.getElementById("selectCaseta")
    selectCaseta.onchange = function() {
        let response = fetchOnChangeLocation()
    };
	let user = getCookie("userId");
	let jw = getCookie("userJwt");
	if(user !='' && jw!=''){
		drawTable('tableEntradas',columsData1,dataTable1);
		drawTable('tableSalidas',columsData2,dataTable2);
	}else{
		redirectionUrl('login',false);
	}
}


//FUNCION para abrir modales
function setModal(type = 'none',id){
	if(type == 'Tools'){
		$('#itemsModal').modal('show');
	}else if(type == 'Cars'){
		$('#carsModal').modal('show');
	}else if(type == 'Card'){
		$('#cardModal').modal('show');
	}else if(type == 'Out'){
		$('#outModal').modal('show');
	}else if(type == 'Data'){
		$('#dataModal').modal('show');
	}else if(type == 'Delivery'){
		$('#deliverModal').modal('show');
	}
}


//---Cerrar Sesión
function setCloseSession(argument) {
	closeSession();
	redirectionUrl('login',false);
}