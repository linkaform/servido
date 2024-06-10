let tables={}

const columsDataArticles = [
	{ title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:180,
		formatter: (cell, formatterParams) => {
			//----Button Trash
			let folio = cell.getData().folio ? cell.getData().folio : 0;
			let divActions = '<div class="row d-flex">';
			divActions += ` <input class="form-check-input ms-3 checkbox-articulos" style="height:15px !important;width:2px;" type="checkbox" value='${folio}' onClick="selectCheckboxArticulos(${folio})">`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-eye" onClick="setModal('ViewArticle',${folio})"></i></button>`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-clock" onClick="setModal('OutArticle',${folio})"></i></button>`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-pen" onClick="setModal('EditArticle',${folio})"></i></button>`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-trash" onClick='alertEliminarTable(${folio}, 'articles')'></i></button>`;
			divActions += '</div>';
			return divActions;
		},
	},
	{ title:"Ubicación", field:'location',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Fecha", field:'date',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Hora", field:'time',hozAlign:"left",headerFilter:true,width:120},
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

const columsDataArticlesLose = [
	{ title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:180,
		formatter: (cell, formatterParams) => {
			//----Button Trash
			let folio = cell.getData().folio ? cell.getData().folio : 0;
			let divActions = '<div class="row d-flex">';
			divActions += ` <input class="form-check-input ms-3 checkbox-articulosLose" style="height:15px !important;width:2px;" type="checkbox" value='${folio}' onClick="selectCheckboxArticulosLose(${folio})">`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-eye" onClick="setModal('ViewArticleConse',${folio})"></i></button>`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-clock" onClick="setModal('OutArticleConse',${folio})"></i></button>`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-pen" onClick="setModal('EditArticleConse',${folio})"></i></button>`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-trash" onClick="alertEliminarTable(${folio}, 'articlesLose')"></i></button>`;
			divActions += '</div>';
			return divActions;
		},
	},
	{ title:"Ubicación", field:'location',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Fecha", field:'date',hozAlign:"left",headerFilter:true,width:120},
	{ title:"Hora", field:'time',hozAlign:"left",headerFilter:true,width:250},
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

let dataTableArticles = [
	{'folio':1,'location':'Estacionamiento','date':'2024-02-01','time':'05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Edificio','status':'Abierto'},
	{'folio':2,'location':'Estacionamiento','date':'2024-06-02','time':'05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16/04/2024 06:00','location':'Edificio','status':'Abierto'},
	{'folio':3,'location':'Estacionamiento','date':'2024-06-02','time':'05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Edificio','status':'Abierto'},
	{'folio':4,'location':'Estacionamiento','date':'2024-06-04','time':'05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16/04/2024 06:00','location':'Edificio','status':'Abierto'},
	{'folio':5,'location':'Estacionamiento','date':'2024-02-05','time':'05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Edificio','status':'Abierto'},
	{'folio':6,'location':'Edificio','date':'2024-02-06','time':'05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16/04/2024 06:00','location':'Edificio','status':'Abierto'},
	{'folio':7,'location':'Edificio','date':'2024-02-07','time':'05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Edificio','status':'Abierto'},
	{'folio':8,'location':'Edificio','date':'2024-02-08','time':'05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'01/04/2024 08:00','location':'Edificio','status':'Abierto'},
	{'folio':9,'location':'Edificio','date':'2024-02-09','time':'05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'03/04/2024 06:00','location':'Edificio','status':'Abierto'},
	{'folio':10,'location':'Edificio','date':'2024-02-10','time':'05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Casa','status':'Abierto'},
	{'folio':11,'location':'Estacionamiento','date':'2024-02-05','time':'05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16/04/2024 06:00','location':'Casa','status':'Abierto'},
	{'folio':12,'location':'Estacionamiento','date':'2024-02-05','time':'05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Casa','status':'Abierto'},
	{'folio':13,'location':'Estacionamiento','date':'2024-02-05','time':'05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Casa','status':'Abierto'},
	{'folio':14,'location':'Estacionamiento','date':'2024-02-05','time':'05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Casa','status':'Abierto'},
	{'folio':15,'location':'Estacionamiento','date':'2024-02-05','time':'05:00','type':'Articulo sin categoria','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/63f790e5ed1d1d0df47b59bb.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Casa','status':'Abiertod'}
]

let dataTableArticlesLose = [
	{'folio':16,'location':'Estacionamiento','date':'2024-02-10','time':'05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Casa','status':'Abierto'},
	{'folio':17,'location':'Estacionamiento','date':'2024-02-11','time':'05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16/04/2024 06:00','location':'Casa','status':'Abierto'},
	{'folio':18,'location':'Casa','date':'2024-02-12','time':'05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Casa','status':'Abierto'},
	{'folio':19,'location':'Casa','date':'2024-02-13','time':'05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16/04/2024 06:00','location':'Casa','status':'Abierto'},
	{'folio':20,'location':'Casa','date':'2024-02-14','time':'05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Casa','status':'Abierto'},
	{'folio':21,'location':'Casa','date':'2024-02-15','time':'05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16/04/2024 06:00','location':'Casa','status':'Abierto'},
	{'folio':22,'location':'Casa','date':'2024-02-16','time':'05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Casa','status':'Abierto'},
	{'folio':23,'location':'Estacionamiento','date':'2024-02-17','time':'05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'01/04/2024 08:00','location':'Casa','status':'Abierto'},
	{'folio':24,'location':'Estacionamiento','date':'2024-02-18','time':'05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'03/04/2024 06:00','location':'Estacionamiento','status':'Abierto'},
	{'folio':25,'location':'Edificio','date':'2024-02-19','time':'05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estacionamiento','status':'Abierto'},
	{'folio':26,'location':'Edificio','date':'2024-02-20','time':'05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16/04/2024 06:00','location':'Estacionamiento','status':'Abierto'},
	{'folio':27,'location':'Edificio','date':'2024-02-21','time':'05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estacionamiento','status':'Abierto'},
	{'folio':28,'location':'Edificio','date':'2024-06-22','time':'05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estacionamiento','status':'Abierto'},
	{'folio':29,'location':'Estacionamiento','date':'2024-06-22','time':'05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estacionamiento','status':'Abierto'},
	{'folio':30,'location':'Estacionamiento','date':'2024-06-22','time':'05:00','type':'Entrega de llaves','img':'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estacionamiento','status':'Abiertod'}
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
  tables[id]=table;
}
