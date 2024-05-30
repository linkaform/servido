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

