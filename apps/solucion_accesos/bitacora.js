//-----Variables
let selectLocation;

document.addEventListener("DOMContentLoaded", (event) => {
	
})

window.onload = function(){
    console.log("hi")
	
	setValueUserLocation('bitacora');
	console.log(getValueUserLocation())
	changeButtonColor();

	fillCatalogs();

	selectLocation= document.getElementById("selectLocation")
	selectLocation.onchange = function() {
        console.log("La selección ha cambiado");
        let response = fetchOnChangeLocation()
        console.log(response.data)
    };
 selectCaseta= document.getElementById("selectCaseta")
    selectCaseta.onchange = function() {
        console.log("La selección ha cambiado");
        let response = fetchOnChangeLocation()
        console.log('hiii',response.data)
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



//-----MODALS
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




//---Close Sesión
function setCloseSession(argument) {
	closeSession();
	redirectionUrl('login',false);
}