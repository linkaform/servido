
document.addEventListener("DOMContentLoaded", (event) => {
	


})

window.onload = function(){
    console.log("hi")
	
	setValueUserLocation('incidencias');

	changeButtonColor();

	fillCatalogs();

	setValueUserLocation('incidencias');
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
	setSpinner(true, 'divSpinner');
	let user = getCookie("userId");
	let jw = getCookie("userJwt");
	if(user !='' && jw!=''){
		drawTable('tableIncidencias', columsData1, dataTable1);
		drawTable('tableFallas', columsData2, dataTable2);

	}else{
		redirectionUrl('login',false)
	}



}



function fetchOnChangeLocation(){
    //INFO: al momento de seleccionar una nueva location se manda la informacion junto con el 
    //resultado de la fetch a la pagina que lo esta solicitando
    let selectLocation= document.getElementById("selectLocation")
    let selectCaseta= document.getElementById("selectCaseta")
    let response=
    {"data":{
         "caseta":{
            "name": selectLocation.value,
            "location": selectCaseta.value,
            "visitsDay":15,
            "personalInside":75,
            "vehiclesInside":25,
            "ouputs":30
        }
    }};

    //FETCH AQUI 
      fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_id: idScript,
            option: 'get_caseta_information',
            email : 'guardia1@linkaform.com'
        }),
        headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+jw

            },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            //INFO: Obtener la informacion y formatear los arrays para poder mandarlos como respuesta de esta funcion
        } 
    });
    return response
}







//-----MODALS
function setModal(type = 'none',id){
	if(type == 'NewIncident'){
		$('#newIncidentModal').modal('show');
	}else if(type == 'EditIncident'){
		$('#editIncidentModal').modal('show');
	}else if(type == 'ViewIncident'){
		$('#viewIncidentModal').modal('show');
	}else if(type == 'NewFail'){
		$('#newFailModal').modal('show');
	}else if(type == 'EditFail'){
		$('#editFailModal').modal('show');
	}else if(type == 'ViewFail'){
		$('#viewFailModal').modal('show');
	}else if(type == 'SuccessFail'){
		$('#successResolveFailModal').modal('show');
	}
}