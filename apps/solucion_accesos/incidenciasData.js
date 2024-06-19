let tables={}

const columsData1 = [
    {formatter:"rowSelection", field:'checkboxColumn',titleFormatter:"rowSelection", width:10,hozAlign:"center", headerSort:false, cellClick:function(e, cell){
        cell.getRow().toggleSelect();
      }},
	{ title: "Opciones", field: "actions" , hozAlign: "left", 
		formatter: (cell, formatterParams) => {
			//----Button Trash
            let data=cell.getData()
			let folio = cell.getData().folio ? cell.getData().folio : 0;
			let divActions = '<div class="row d-flex">';
	
			divActions += `<button class="btn-table-bitacora" onClick="alertViewIncident(${folio},'${data.date}', '${data.time}', '${data.location}', '${data.place_accident}', '${data.incident}', '${data.comment}', '${data.report}' ,'${data.dept}')"><i class="fa-solid fa-eye"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="editarIncidenciaModal(${folio},'${data.date}', '${data.time}', '${data.location}', '${data.place_accident}', '${data.incident}', '${data.comment}', '${data.report}' ,'${data.dept}')"><i class="fa-solid fa-pen"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="alertEliminar(${folio}, 'incidencias')"><i class="fa-solid fa-trash" ></i></button>`;
			divActions += '</div>';
			return divActions;
		},
	},
	{ title:"Fecha ", field:'date',hozAlign:"left", headerFilter:"date", headerFilterFunc:dateFilter, headerFilterParams:{ min: new Date(""), max: new Date("") }},
	{ title:"Ubicación", field:'location',hozAlign:"left",headerFilter:true},
	{ title:"Lugar del incidente", field:'place_accident',hozAlign:"left",headerFilter:true},
	{ title:"incidente", field:'incident',hozAlign:"left",headerFilter:true},
	{ title:"Comentarios", field:'comment',hozAlign:"left",headerFilter:true,width:350},
	{ title:"Reporta", field:'report',hozAlign:"left",headerFilter:true},
	{ title:"Departamento", field:'dept',hozAlign:"left",headerFilter:true},
];

const columsData2 = [
     {formatter:"rowSelection", field:'checkboxColumn',titleFormatter:"rowSelection", width:10,hozAlign:"center", headerSort:false, cellClick:function(e, cell){
        cell.getRow().toggleSelect();
      }},
	{ title: "Opciones", field: "actions" , hozAlign: "left", 
		formatter: (cell, formatterParams) => {
			//----Button Trash
            let data= cell.getData()
			let folio = cell.getData().folio ? cell.getData().folio : 0;
			let divActions = '<div class="row d-flex">';
			divActions += `<button class="btn-table-bitacora" onClick="alertViewFalla(${folio},'${data.date}', '${data.time}', '${data.location}', '${data.place_accident}', 
            '${data.incident}','${data.descripcion}', '${data.comment}', '${data.report}' ,'${data.dept}','${data.responsable}')"> <i class="fa-solid fa-eye"> </i> </button>`;
			divActions += `<button class="btn-table-bitacora" onClick="alertFallaResuelta(${folio},'${data.state}')"> <i class="fa-solid fa-circle-check"> </i> </button>`;
			divActions += `<button class="btn-table-bitacora" onClick="editarFallaModal(${folio},'${data.date}', '${data.time}', '${data.location}', '${data.place_accident}', 
            '${data.incident}','${data.descripcion}', '${data.comment}', '${data.report}' ,'${data.dept}','${data.responsable}')">
                <i class="fa-solid fa-pen"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="alertEliminar(${folio}, 'fallas')"><i class="fa-solid fa-trash"> </i> </button>`;
			divActions += '</div>';
			return divActions;
		},
	},
	{ title:"Fecha ", field:'date',hozAlign:"left",headerFilter:true , headerFilter:"date", headerFilterFunc:dateFilter, headerFilterParams:{ min: new Date(""), max: new Date("") }},
	{ title:"Ubicación", field:'location',hozAlign:"left",headerFilter:true },
	{ title:"Lugar del fallo", field:'place_accident',hozAlign:"left",headerFilter:true},
	{ title:"Fallo", field:'incident',hozAlign:"left",headerFilter:true },
	{ title:"Comentarios", field:'comment',hozAlign:"left",headerFilter:true, width:350},
	{ title:"Reporta", field:'report',hozAlign:"left",headerFilter:true},
	{ title:"Departamento", field:'dept',hozAlign:"left",headerFilter:true},
	{ title:"Responsable", field:'responsable',hozAlign:"left",headerFilter:true},
	{ title:"Estado", field:'state',hozAlign:"left",headerFilter:true}
];

let dataTable1 = [
	{'folio':1, 'date':'01-06-2024 14:24','time':'','location':'Cumbres','place_accident':'Caseta 1 Poniente','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'folio':2, 'date':'01-06-2024 14:24','time':'','location':'Cumbres','place_accident':'Caseta 1 Poniente','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'folio':3, 'date':'01-06-2024 14:24','time':'','location':'Cumbres','place_accident':'Caseta 1 Poniente','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'folio':4, 'date':'01-06-2024 14:24','time':'','location':'Cumbres','place_accident':'Caseta 1 Poniente','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'folio':5, 'date':'02-06-2024 14:24','time':'','location':'Cumbres','place_accident':'Caseta 1 Poniente','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'folio':6, 'date':'01-01-2024 14:24','time':'','location':'Cumbres','place_accident':'Caseta 1 Poniente','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'folio':7, 'date':'04-01-2024 14:24','time':'','location':'Cumbres','place_accident':'Caseta 1 Poniente','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'folio':8, 'date':'11-05-2024 14:24','time':'','location':'Monterrey','place_accident':'Caseta 1 Poniente','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'folio':9, 'date':'01-05-2024 14:24','time':'','location':'Monterrey','place_accident':'Caseta 1 Poniente','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'folio':10, 'date':'01-05-2024 14:24','time':'','location':'Monterrey','place_accident':'Caseta 1 Poniente','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'folio':11, 'date':'22-03-2024 14:24','time':'','location':'Monterrey','place_accident':'Caseta 1 Poniente','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'folio':12, 'date':'22-03-2024 14:24','time':'','location':'Monterrey','place_accident':'Caseta 2 Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'folio':13, 'date':'22-03-2024 14:24','time':'','location':'Monterrey','place_accident':'Caseta 2 Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'folio':14, 'date':'22-03-2024 14:24','time':'','location':'Monterrey','place_accident':'Caseta 2 Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'folio':15, 'date':'22-03-2024 14:24','time':'','location':'Monterrey','place_accident':'Caseta 2 Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'folio':16, 'date':'22-03-2024 14:24','time':'','location':'Monterrey','place_accident':'Caseta 2 Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'folio':17, 'date':'01-05-2024 14:24','time':'','location':'Monterrey','place_accident':'Caseta 2 Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'folio':18, 'date':'01-05-2024 14:24','time':'','location':'Monterrey','place_accident':'Caseta 2 Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'folio':19, 'date':'01-05-2024 14:24','time':'','location':'Monterrey','place_accident':'Caseta 2 Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
	{'folio':20, 'date':'01-05-2024 14:24','time':'','location':'Monterrey','place_accident':'Caseta 2 Sur','incident':'Acceso no autorizado','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad'},
]

let dataTable2 = [
	{'folio':21, 'date':'25-07-2024 14:24','time':'12:00','location':'Monterrey','place_accident':'Caseta 2 Sur','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Abierto', 'descripcion':'esta es una descrp'},
	{'folio':22, 'date':'25-07-2024 14:24','time':'12:12','location':'Monterrey','place_accident':'Caseta 2 Sur','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Abierto', 'descripcion':'esta es una descrp'},
	{'folio':23, 'date':'25-07-2024 14:24','time':'19:13','location':'Monterrey','place_accident':'Caseta 2 Sur','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Abierto', 'descripcion':'esta es una descrp'},
	{'folio':24, 'date':'25-07-2024 14:24','time':'13:14','location':'Monterrey','place_accident':'Caseta 2 Sur','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Abierto', 'descripcion':'esta es una descrp'},
	{'folio':25, 'date':'25-07-2024 14:24','time':'13:15','location':'San Jeronimo','place_accident':'Caseta 2 Sur','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Abierto', 'descripcion':'esta es una descrp'},
	{'folio':26, 'date':'25-05-2024 14:24','time':'13:26','location':'San Jeronimo','place_accident':'Caseta 2 Sur','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Abierto', 'descripcion':'esta es una descrp'},
	{'folio':27, 'date':'01-02-2024 14:24','time':'13:23','location':'San Jeronimo','place_accident':'Caseta 2 Sur','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Abierto', 'descripcion':'esta es una descrp'},
	{'folio':28, 'date':'01-02-2024 14:24','time':'19:21','location':'San Jeronimo','place_accident':'Caseta 2 Sur','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Abierto', 'descripcion':'esta es una descrp'},
	{'folio':29, 'date':'13-02-2024 14:24','time':'19:23','location':'San Jeronimo','place_accident':'Caseta 2 Sur','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Abierto', 'descripcion':'esta es una descrp'},
	{'folio':30, 'date':'13-02-2024 14:24','time':'12:02','location':'San Jeronimo','place_accident':'Caseta 3 Poniente','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Abierto', 'descripcion':'esta es una descrp'},
	{'folio':31, 'date':'13-05-2024 14:24','time':'22:03','location':'San Jeronimo','place_accident':'Caseta 3 Poniente','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Abierto', 'descripcion':'esta es una descrp'},
	{'folio':32, 'date':'13-05-2024 14:24','time':'22:04','location':'San Jeronimo','place_accident':'Caseta 3 Poniente','incident':'Fallo de energia','comment':'El visitante noestaba autorizado','report':'Miguel Perez','dept':'Seguridad','responsable':'Jose Patricio','state':'Abierto', 'descripcion':'esta es una descrp'},
]


//-----TABLES
function drawTable(id, columnsData, tableData){
    var  table = new Tabulator("#" + id, {
	    layout:"fitColumns",
	    data:tableData,
	    textDirection:"ltr",
	    columns:columnsData,
	    pagination:true, 
	    paginationSize:40,
        responsiveLayout: "fitDataFill",
    });
    tables[id]=table;
}

