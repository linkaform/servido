let tables={}
let columsDataArticles = [
    /*{formatter:"rowSelection", field:'checkboxColumn',titleFormatter:"rowSelection",hozAlign:"center", headerSort:false, cellClick:function(e, cell){
        cell.getRow().toggleSelect();
      }},*/
	{ title: "Opciones", field: "actions" , formatter:"rowSelection",hozAlign: "left", resizable:false,minWidth:140,
		formatter: (cell, formatterParams) => {
			let data = cell.getData()
			let folio = cell.getData().folio ? cell.getData().folio : 0;
			let divActions = '<div class="row d-flex">';
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-eye" onClick="alertVerArticuloCon('${folio}')"></i></button>`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-clock" onClick="setModal('OutArticleCon', '${folio}')"></i></button>`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-pen" onClick="loadArticuloConModal('${folio}')"></i></button>`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-trash" onClick="alertEliminarTable('${folio}', 'articles')"></i></button>`;
			divActions += '</div>';
			return divActions;
		},
	},
	//{ title:"Ubicación", field:'ubicacion_concesion',hozAlign:"left",headerFilter:true},
	//{ title:"Caseta", field:'caseta_concesion',hozAlign:"left",headerFilter:true},
	{ title:"Artículo", field:'equipo_concesion',hozAlign:"left",headerFilter:true},
	{ title:"Fecha", field:'fecha_concesion',hozAlign:"left",headerFilter:true,headerFilter:"date", headerFilterFunc:dateFilter, headerFilterParams:{ min: new Date(""), max: new Date("") }},
	{ title:"Tipo", field:'solicita_concesion',hozAlign:"left",headerFilter:true, width:200},
	//{ title:"Fotografía", field:'foto_concesion',hozAlign:"left",formatter:"image", width:200 , formatterParams:{height:"120px",width:"180px"}},
		
	{ title:"No. Serie", field:'folio',hozAlign:"left",headerFilter:true},
	{ title:"Reporta", field:'nombre_concesion',hozAlign:"left",headerFilter:true},
	{ title:"Observaciones", field:'observacion_concesion',hozAlign:"left",headerFilter:true},
	{ title:"Recibe", field:'recibe_concesion',hozAlign:"left",headerFilter:true},
	{ title:"Devolución", field:'fecha_devolucion_concesion',hozAlign:"left",headerFilter:true,headerFilter:"date", headerFilterFunc:dateFilter, headerFilterParams:{ min: new Date(""), max: new Date("") }},
	{ title:"Estado", field:'status_concesion',hozAlign:"left",headerFilter:true},
	{ title:"Area", field:'area_concesion',hozAlign:"left",headerFilter:true},
];

let columsDataArticlesLose = [
    /*{formatter:"rowSelection", field:'checkboxColumn',titleFormatter:"rowSelection",hozAlign:"center", headerSort:false, cellClick:function(e, cell){
        cell.getRow().toggleSelect();
      }},*/
	{ title: "Opciones", field: "actions" ,formatter:"rowSelection",hozAlign: "left", resizable:false ,
		formatter: (cell, formatterParams) => {
			let folio = cell.getData().folio ? cell.getData().folio : 0;
			let divActions = '<div class="row d-flex">';
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-eye" onClick="setModal('ViewArticleLose','${folio}')"></i></button>`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-right-left" onClick="verDevolucionArticulo('${folio}', 'articleLose')"></i></button>`;
			divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-pen" onClick="setModal('EditArticleLose','${folio}')"></i></button>`;
			//divActions += `<button class="btn-table-bitacora"><i class="fa-solid fa-trash" onClick="alertEliminarTable('${folio}', 'articlesLose')"></i></button>`;
			divActions += '</div>';
			return divActions;
		},
	},
	//{ title:"Ubicación", field:'ubicacion_perdido',hozAlign:"left",headerFilter:true},
	{ title:"Nombre", field:'articulo_perdido',hozAlign:"left",headerFilter:true},
	{ title:"Artículo", field:'articulo_seleccion',hozAlign:"left",headerFilter:true},
	//{ title:"Articulo", field:'tipo_perdido',hozAlign:"left",headerFilter:true},
	{ title:"Fotografía", field:'foto_perdido',hozAlign:"left",formatter:"image", formatterParams:{height:"150px",width:"200px"},
		formatter: function(cell) {
		            let data = cell.getData();
		            return `<img src="${data.foto_perdido.length>0 ? data.foto_perdido[0].file_url : ""}" alt="Imagen" style="width:120px;height:120px; object-fit:cover;" class="img-cell"/>`;
		        }},
    { title:"Color", field:'color_perdido',hozAlign:"left",headerFilter:true},
	{ title:"Categoría", field:'tipo_articulo_perdido',hozAlign:"left",headerFilter:true},
    { title:"Fecha del hallazgo", field:'date_hallazgo_perdido',hozAlign:"left",headerFilter:true,headerFilter:"date", headerFilterFunc:dateFilter, headerFilterParams:{ min: new Date(""), max: new Date("") }},
	{ title:"Area de resguardo", field:'locker_perdido',hozAlign:"left",headerFilter:true},
	{ title:"Reporta", field:'reporta_perdido',hozAlign:"left",headerFilter:true},
	{ title:"Fecha Devolución", field:'date_entrega_perdido',hozAlign:"left",headerFilter:true,headerFilter:"date", headerFilterFunc:dateFilter, headerFilterParams:{ min: new Date(""), max: new Date("") }},
	/*{ title:"Recibe", field:'recibe_perdido',hozAlign:"left",formatter:"image", formatterParams:{height:"120px",width:"120px"},
		formatter: function(cell) {
            let data = cell.getData();
            if(data.hasOwnProperty('photo_recibe')){
	            if(data.photo_recibe.length>0){
	            	return `<img src="${data.photo_perdido.length>0 ? data.photo_perdido[0].file_url : ""}" alt="Imagen" style="width:120px;height:120px; object-fit:cover;" class="img-cell"/>`;
	            }
            }
        }},*/

	{ title:"Comentarios", field:'comentario_perdido',hozAlign:"left"},
];

let dataTableArticles = []
 

 /*
 {'folio':1,'location':'Estacionamiento','name':'bocina','date':'01-02-2024 05:00','type':'Articulo sin categoria','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Edificio','status':'Abierto'},
	{'folio':2,'location':'Estacionamiento','name':'lapiz','date':'02-06-2024 05:00','type':'Articulo sin categoria','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16-06-2024 06:00','location':'Edificio','status':'Abierto'},
	{'folio':3,'location':'Estacionamiento','name':'unarticulo','date':'02-06-2024 05:00','type':'Articulo sin categoria','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Edificio','status':'Abierto'},
	{'folio':4,'location':'Estacionamiento','name':'bocina','date':'02-06-2024 05:00','type':'Articulo sin categoria','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16-06-2024 06:00','location':'Edificio','status':'Abierto'},
	{'folio':5,'location':'Estacionamiento','name':'bocina','date':'02-06-2024 05:00','type':'Articulo sin categoria','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Edificio','status':'Abierto'},
	{'folio':6,'location':'Edificio','name':'bardfgdfgdfgdfgdfbie','date':'02-06-2024 05:00','type':'Articulo sin categoria','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16-06-2024 06:00','location':'Edificio','status':'Abierto'},
	{'folio':7,'location':'Edificio','name':'algo','date':'02-06-2024 05:00','type':'Articulo sin categoria','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'awsdawdawdawedawda sdvsadvasdfasdf asdas','date_out':'','location':'Edificio','status':'Abierto'},
	{'folio':8,'location':'Edificio','name':'bocina','date':'02-06-2024 05:00','type':'Articulo sin categoria','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'01-06-2024 08:00','location':'Edificio','status':'Abierto'},
	{'folio':9,'location':'Edificio','name':'bocina','date':'02-06-2024 05:00','type':'Articulo sin categoria','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'03-06-2024 06:00','location':'Edificio','status':'Abierto'},
	{'folio':10,'location':'Edificio','name':'bocina','date':'02-06-2024 05:00','type':'Articulo sin categoria','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Casa','status':'Abierto'},
	{'folio':11,'location':'Estacionamiento','name':'bocina','date':'03-06-2024 05:00','type':'Articulo sin categoria','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16-06-2024 06:00','location':'Casa','status':'Abierto'},
	{'folio':12,'location':'Estacionamiento','name':'bocina','date':'04-06-2024 05:00','type':'Articulo sin categoria','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Casa','status':'Abierto'},
	{'folio':13,'location':'Estacionamiento','name':'bocina','date':'05-06-2024 05:00','type':'Articulo sin categoria','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Casa','status':'Abierto'},
	{'folio':14,'location':'Estacionamiento','name':'bocina','date':'06-06-2024 05:00','type':'Articulo sin categoria','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Casa','status':'Abierto'},
	{'folio':15,'location':'Estacionamiento','name':'bocina','date':'02-06-2024 05:00','type':'Articulo sin categoria','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Casa','status':'Abiertod'}*/
let dataTableArticlesLose = []

/*{'folio':16,'location':'Estacionamiento','name':'unerdfgdfgdfgdfgdfacosa','date':'10-02-2024 05:00','type':'Entrega de llaves','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Casa','status':'Abierto'},
	{'folio':17,'location':'Estacionamiento','name':'unacosa','date':'10-02-2024 05:00','type':'Entrega de llaves','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16-06-2024 06:00','location':'Casa','status':'Abierto'},
	{'folio':18,'location':'Casa','name':'unacosa','date':'10-02-2024 05:00','type':'Entrega de llaves','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Casa','status':'Abierto'},
	{'folio':19,'location':'Casa','name':'unacosa','date':'10-02-2024 05:00','type':'Entrega de llaves','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16-06-2024 06:00','location':'Casa','status':'Abierto'},
	{'folio':20,'location':'Casa','name':'unacosa','date':'10-02-202410-02-2024 05:00','type':'Entrega de llaves','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Casa','status':'Abierto'},
	{'folio':21,'location':'Casa','name':'unacosa','date':'10-02-2024 05:00','type':'Entrega de llaves','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16-06-2024 06:00','location':'Casa','status':'Abierto'},
	{'folio':22,'location':'Casa','name':'unacosa','date':'10-02-2024 05:00','type':'Entrega de llaves','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Casa','status':'Abierto'},
	{'folio':23,'location':'Estacionamiento','name':'unacosa','date':'10-02-2024 05:00','type':'Entrega de llaves','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'01-06-2024 08:00','location':'Casa','status':'Abierto'},
	{'folio':24,'location':'Estacionamiento','name':'unacosa','date':'10-02-2024 05:00','type':'Entrega de llaves','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'03-06-2024 06:00','location':'Estacionamiento','status':'Abierto'},
	{'folio':25,'location':'Edificio','name':'unacosa','date':'10-02-2024 05:00','type':'Entrega de llaves','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estacionamiento','status':'Abierto'},
	{'folio':26,'location':'Edificio','name':'unacosa','date':'10-02-2024 05:00','type':'Entrega de llaves','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'16-06-2024 06:00','location':'Estacionamiento','status':'Abierto'},
	{'folio':27,'location':'Edificio','name':'unacosa','date':'10-02-2024 05:00','type':'Entrega de llaves','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estacionamiento','status':'Abierto'},
	{'folio':28,'location':'Edificio','name':'unacosa','date':'10-02-2024 05:00','type':'Entrega de llaves','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estacionamiento','status':'Abierto'},
	{'folio':29,'location':'Estacionamiento','name':'unacosa','date':'10-02-2024 05:00','type':'Entrega de llaves','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estacionamiento','status':'Abierto'},
	{'folio':30,'location':'Estacionamiento','name':'unacosa','date':'10-02-2024 05:00','type':'Entrega de llaves','img':'https://www.prensalibre.com/wp-content/uploads/2020/01/A54I3220.jpg?quality=82','num_serie':'12244','reporta':'Lucia Carvajal','comment':'Cecilia Gonzales','recibe':'','date_out':'','location':'Estacionamiento','status':'Abiertod'}*/

//-----TABLES
function drawTable(id, columnsData, tableData){
    let  table = new Tabulator("#" + id, {
        layout:"fitDataStretch",
        data:tableData,
        textDirection:"ltr",
        columns:columnsData,
        pagination:true, 
        paginationSize:40,
        headerVisible: true,
        placeholder: "No hay registros disponibles", 
    });
    tables[id]=table;
}
