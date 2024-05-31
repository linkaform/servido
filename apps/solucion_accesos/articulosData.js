const columsData1 = [
	{ title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:180,
		formatter: (cell, formatterParams) => {
			//----Button Trash
			let folio = cell.getData().folio ? cell.getData().folio : 0;
			let divActions = '<div class="row d-flex">';
			divActions += ` <input class="form-check-input ms-3" style="height:15px !important;width:2px;" type="checkbox">`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-eye" onClick="setModal('ViewArticle',${folio})"></i></button>`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-clock" onClick="setModal('OutArticle',${folio})"></i></button>`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-pen" onClick="setModal('EditArticle',${folio})"></i></button>`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-trash"></i></button>`;
			divActions += '</div>';
			return divActions;
		},
	},
	{ title:"Ubicación", field:'location',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Fecha y Hora", field:'date',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Tipo", field:'type',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Fotografía", field:'img',hozAlign:"left",formatter:"image", formatterParams:{
    	height:"150px",
    	width:"200px",
	},width:250},
	{ title:"Numero Seríe", field:'num_serie',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Reporta", field:'reporta',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Comentarios", field:'comment',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Recibe", field:'recibe',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Fecha y Hora devolución", field:'date_out',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Ubicación del artículo", field:'location',hozAlign:"left",headerFilter:true,width:200},
	{ title:"Estado", field:'status',hozAlign:"left",headerFilter:true,width:200},
];

const columsData2 = [
	{ title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:180,
		formatter: (cell, formatterParams) => {
			//----Button Trash
			let folio = cell.getData().folio ? cell.getData().folio : 0;
			let divActions = '<div class="row d-flex">';
			divActions += ` <input class="form-check-input ms-3" style="height:15px !important;width:2px;" type="checkbox">`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-eye" onClick="setModal('ViewArticleConse',${folio})"></i></button>`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-clock" onClick="setModal('OutArticleConse',${folio})"></i></button>`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-pen" onClick="setModal('EditArticleConse',${folio})"></i></button>`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-trash"></i></button>`;
			divActions += '</div>';
			return divActions;
		},
	},
	{ title:"Ubicación", field:'location',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Fecha y Hora", field:'date',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Articulo", field:'type',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Fotografía", field:'img',hozAlign:"left",formatter:"image", formatterParams:{
    	height:"150px",
    	width:"200px",
	},width:250},
	{ title:"Numero Seríe", field:'num_serie',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Reporta", field:'reporta',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Comentarios", field:'comment',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Recibe", field:'recibe',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Fecha y Hora devolución", field:'date_out',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Ubicación del artículo", field:'location',hozAlign:"left",headerFilter:true,width:200},
	{ title:"Estado", field:'status',hozAlign:"left",headerFilter:true,width:200},
];

const dataTable1 = [
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16/04/2024 06:00','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16/04/2024 06:00','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16/04/2024 06:00','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'01/04/2024 08:00','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'03/04/2024 06:00','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16/04/2024 06:00','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estaciónamiento','status':'Abiertod'}
]

const dataTable2 = [
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16/04/2024 06:00','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16/04/2024 06:00','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16/04/2024 06:00','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'01/04/2024 08:00','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'03/04/2024 06:00','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16/04/2024 06:00','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estaciónamiento','status':'Abierto'},
	{'location':'PLanta Sur','date':'14/03/2024 05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estaciónamiento','status':'Abiertod'}
]


//-----TABLES
function drawTable(id, columnsData, tableData){
  var  table = new Tabulator("#" + id, {
    layout:"fitDataTable",
    data:tableData,
    textDirection:"ltr",
    columns:columnsData,
    pagination:true, 
    paginationSize:40,
  });
}
