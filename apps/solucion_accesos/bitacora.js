//-----Variables
let selectLocation;
const columsData1 = [
	{ title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:180,
		formatter: (cell, formatterParams) => {
			//----Button Trash
			let folio = cell.getData().folio ? cell.getData().folio : 0;
			let divActions = '<div class="row d-flex">';
			divActions += `<button class="btn-table-bitacora" onClick="setModal('Tools',${folio})"><i class="fa-solid fa-hammer"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="setModal('Cars',${folio})" ><i class="fa-solid fa-car"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="setModal('Card',${folio})"><i class="fa-solid fa-address-card"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="setModal('Out',${folio})" ><i class="fa-solid fa-arrow-right-from-bracket"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="setModal('Data',${folio})" ><i class="fa-solid fa-user"></i></button>`;
			divActions += '</div>';
			return divActions;
			//`<button  class="btn-table-bitacora" onClick="setModal('Tools',${folio})"><i class="fa-solid fa-car"></i></button> `;
		},
	},
	{ title:"Folio", field:'folio',hozAlign:"left",headerFilter:true,width:50},
	{ title:"Visitante", field:'visitante',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Contratista", field:'contratista',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Visita a", field:'visita',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Areá de acceso", field:'area',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Tipo", field:'tipo',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Entrada", field:'entrada',hozAlign:"left",headerFilter:true,width:200},
	{ title:"Salida", field:'salida',hozAlign:"left",headerFilter:true,width:200},
	{ title:"Estado", field:'estado',hozAlign:"left",headerFilter:true,width:200},
	{ title:"Punto de acceso", field:'location_access',hozAlign:"left",headerFilter:true,width:200},
	{ title:"Gafete", field:'credentials',hozAlign:"left",headerFilter:true,width:200},
];

const columsData2 = [
	{ title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:180,
		formatter: (cell, formatterParams) => {
			//----Button Trash
			let folio = cell.getData().folio ? cell.getData().folio : 0;
			let divActions = '<div class="row d-flex">';
			divActions += `<button class="btn-table-bitacora" onClick="setModal('Delivery',${folio})"><i class="fa-solid fa-address-card"></i></button>`;
			divActions += `<button class="btn-table-bitacora" ><i class="fa-solid fa-print"></i></button>`;
			divActions += '</div>';
			return divActions;
		},
	},
	{ title:"Locker", field:'locker',hozAlign:"left",headerFilter:true,width:200},
	{ title:"Estatus del locker", field:'status',hozAlign:"left",headerFilter:true,width:200},
	{ title:"Visitante", field:'visit',hozAlign:"left",headerFilter:true,width:300},
	{ title:"Documento", field:'document',hozAlign:"left",headerFilter:true,width:200},
	{ title:"Número Gafete", field:'num_access',hozAlign:"left",headerFilter:true,width:200},
	{ title:"Planta", field:'location',hozAlign:"left",headerFilter:true,width:200},
];


const dataTable1 = [
	{'folio':'1263456','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True'},
	{'folio':'1263456','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True'},
	{'folio':'1263456','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True'},
	{'folio':'1263456','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True'},
	{'folio':'1263456','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True'},
	{'folio':'1263456','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True'},
	{'folio':'1263456','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True'},
	{'folio':'1263456','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True'},
	{'folio':'1263456','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True'},
	{'folio':'1263456','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True'},
	{'folio':'1263456','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True'},
	{'folio':'1263456','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True'},
	{'folio':'1263456','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True'},
	{'folio':'1263456','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True'},
]

const dataTable2 = [
	{'locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
	{'locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
	{'locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
	{'locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
	{'locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
	{'locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
	{'locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
	{'locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
	{'locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
	{'locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
]

document.addEventListener("DOMContentLoaded", (event) => {
	setValueUserLocation('bitacora');

	selectLocation= document.getElementById("selectLocation")
	selectLocation.onchange = function() {
        console.log("La selección ha cambiado");
        let response = fetchOnChangeLocation()
        console.log(response.data)
    };
})

window.onload = function(){
	let user = getCookie("userId");
	let jw = getCookie("userJwt");
	if(user !='' && jw!=''){
		drawTable('tableEntradas',columsData1,dataTable1);
		drawTable('tableSalidas',columsData2,dataTable2);
	}else{
		redirectionUrl('login',false);
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

//----Function Redirection
function redirectionUrl(type = 'null',blank = true){
    let urlNew =  '';
    let protocol = window.location.protocol;
    let host = window.location.host;
    if(type == 'users'){
    	urlNew = `${protocol}//${host}/solucion_accesos/portal_registro_v2.html`
    }else if(type == 'bitacora'){
    	urlNew = `${protocol}//${host}/solucion_accesos/portal_bitacora_v2.html`
    }else if(type == 'incidencias'){
    	urlNew = `${protocol}//${host}/solucion_accesos/portal_incidencias_v2.html`
    }else if(type == 'articulos'){
    	urlNew = `${protocol}//${host}/solucion_accesos/portal_articulos_v2.html`
    }else if(type == 'login'){
    	urlNew = `${protocol}//${host}/solucion_accesos/login.html`
    }
    //----Validation
    if(urlNew !='' && blank){
    	Object.assign(document.createElement('a'), {
        target: '_blank',
        rel: 'noopener noreferrer',
        href: urlNew,
    	}).click();
    }else if(urlNew !='' && !blank){
    	Object.assign(document.createElement('a'), {
        rel: 'noopener noreferrer',
        href: urlNew,
    	}).click();
    }
    
}


//---Close Sesión
function setCloseSession(argument) {
	closeSession();
	redirectionUrl('login',false);
}