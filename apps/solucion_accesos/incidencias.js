//-----Variables
const columsData1 = [
	{ title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:180,
		formatter: (cell, formatterParams) => {
			//----Button Trash
			let folio = cell.getData().folio ? cell.getData().folio : 0;
			let divActions = '<div class="row d-flex">';
			divActions += ` <input class="form-check-input ms-3 mt-1" style="height:15px !important;width:2px;" type="checkbox">`;
			divActions += `<button class="btn-table-bitacora" onClick="setModal('ViewIncident',${folio})"><i class="fa-solid fa-eye"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="setModal('EditIncident',${folio})"><i class="fa-solid fa-pen"></i></button>`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-trash"></i></button>`;
			divActions += '</div>';
			return divActions;
		},
	},
	{ title:"Fecha ", field:'date',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Hora ", field:'time',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Ubicación", field:'location',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Lugar del incidente", field:'place_accident',hozAlign:"left",headerFilter:true,width:250},
	{ title:"incidente", field:'incident',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Comentarios", field:'comment',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Reporta", field:'report',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Departamento", field:'dept',hozAlign:"left",headerFilter:true,width:250},
];

const columsData2 = [
	{ title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:180,
		formatter: (cell, formatterParams) => {
			//----Button Trash
			let folio = cell.getData().folio ? cell.getData().folio : 0;
			let divActions = '<div class="row d-flex">';
			divActions += ` <input class="form-check-input ms-3 mt-1" style="height:15px !important;width:2px;" type="checkbox">`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-eye" onClick="setModal('ViewFail',${folio})"></i></button>`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-circle-check" onClick="setModal('SuccessFail',${folio})"></i></button>`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-pen" onClick="setModal('EditFail',${folio})"></i></button>`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-trash"></i></button>`;
			divActions += '</div>';
			return divActions;
		},
	},
	{ title:"Fecha ", field:'date',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Hora ", field:'time',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Ubicación", field:'location',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Lugar del fallo", field:'place_accident',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Fallo", field:'incident',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Comentarios", field:'comment',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Reporta", field:'report',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Departamento", field:'dept',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Responsable", field:'responsable',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Estado", field:'state',hozAlign:"left",headerFilter:true,width:250},
];

const dataTable1 = [
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
]

const dataTable2 = [
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Resuelto'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Resuelto'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Resuelto'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Resuelto'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Resuelto'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Resuelto'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Resuelto'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Resuelto'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Resuelto'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Resuelto'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Resuelto'},
	{'date':'16/04/2024','time':'12:00','location':'Planta Sur','place_accident':'Caseta de vigilancia Sur','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Resuelto'},
]

document.addEventListener("DOMContentLoaded", (event) => {
	


})

window.onload = function(){
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