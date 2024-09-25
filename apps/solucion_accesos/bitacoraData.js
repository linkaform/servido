let tables={}
let dataTableBitacora=[]
let dataTableLocker=[]

const columsData1 = [
	{ title:"Opciones", field: "actions" , hozAlign: "left", resizable:false,width:180,
		formatter: (cell, formatterParams) => {
			//----Button Trash
			let data=cell.getData()
			let folio = cell.getData().folio ? cell.getData().folio : 0;
			console.log("DATAAA", data.status_visita)
			let divActions = '<div class="row d-flex">';
			divActions += `<button class="btn-table-bitacora" onClick="setModal('Data','${folio}')" ><i class="fa-solid fa-user"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="setModal('Card','${folio}')"><i class="fa-solid fa-address-card"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="setModal('equiposModal','${data.id}', '${folio}')"><i class="fa-solid fa-hammer"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="setModal('vehiculosModal','${data.id}', '${folio}')" ><i class="fa-solid fa-car"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="alertSalida('${data.codigo_qr}', '${data.status_visita}')" ><i class="fa-solid fa-arrow-right-from-bracket"></i></button>`;
			divActions += '</div>';
			return divActions;
			//`<button  class="btn-table-bitacora" onClick="setModal('Tools',${folio})"><i class="fa-solid fa-car"></i></button> `;
		},
	},
	{ title:"Folio", field:'folio',hozAlign:"left",headerFilter:true,},
	{ title:"Entrada", field:'fecha_entrada',hozAlign:"left", headerFilter:"date", headerFilterFunc:dateFilter, headerFilterParams:{ min: new Date(""), max: new Date("") }},
	{ title:"Visitante", field:'nombre_visitante',hozAlign:"left",headerFilter:true},
	{ title:"Tipo", field:'perfil_visita',hozAlign:"left",headerFilter:true},
	{ title:"Contratista", field:'contratista',hozAlign:"left",headerFilter:true},
	{ title:"Gafete", field:'status_gafete',hozAlign:"left",headerFilter:true},
	{ title:"Visita a", field:'visita_a',hozAlign:"left",headerFilter:true},
	{ title:"Caseta Entrada", field:'caseta_entrada',hozAlign:"left",headerFilter:true},
	{ title:"Caseta Salida", field:'caseta_salida',hozAlign:"center",tooltip:true},
	{ title:"Salida", field:'fecha_salida',hozAlign:"left",headerFilter:"date", headerFilterFunc:dateFilter, headerFilterParams:{ min: new Date(""), max: new Date("") }},
	{ title:"Comentarios", field:'comentarios',hozAlign:"left",headerFilter:true ,
	formatter: function(cell) {
  		let comment=""
  		let tipo=""
        let data = cell.getData();
        let arrayComentarios=[]
        if(data.hasOwnProperty('comentarios')){
        	console.log("valorerr",data)
        	if(data.comentarios.length>0){
				arrayComentarios = data.comentarios
        	}else{
        		arrayComentarios=[]
        	}
        }
        let html=""

        if( arrayComentarios.length > 0 ){
        	for(let com of arrayComentarios){
            	comment= com.comentario
            	tipo= com.tipo_comentario
            	html+= `<li>`+ capitalizeFirstLetter(tipo)+`: `+comment+` </li>`
        	}
        }
   		let base=`<div class="lista-container" style="max-height: 100px; overflow-y: auto;">
					<ul class="scrollable-list">
						`+html+`
					</ul>
				</div>
		`;
        return base
	    }
	},
     
];

const columsData2 = [
	{ title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,
		formatter: (cell, formatterParams) => {
			//----Button Trash
			let folio = cell.getData().folio ? cell.getData().folio : 0;
			let divActions = '<div class="row d-flex">';
			divActions += `<button class="btn-table-bitacora" onClick="alertGafete(${folio})"><i class="fa-solid fa-address-card"></i></button>`;
			divActions += `<button class="btn-table-bitacora" id="buttonClick" onClick="printTable('tableSalidas')"><i class="fa-solid fa-print"></i></button>`;
			divActions += '</div>';
			return divActions;
		},
	},
	{ title:"Locker", field:'locker',hozAlign:"left",headerFilter:true},
	{ title:"Libre", field:'status',hozAlign:"center",tooltip:true,maxWidth:100, formatter:"tickCross",  headerFilter:"tickCross",  headerFilterParams:{'Libre':true, 'Ocupado': false}, headerFilterEmptyCheck:function(value){return value === null}},
	{ title:"Visitante", field:'visit',hozAlign:"left",headerFilter:true},
	{ title:"Documento", field:'document',hozAlign:"left",headerFilter:true,tooltip:true,},
	{ title:"Número Gafete", field:'num_access',hozAlign:"left",headerFilter:true},
	{ title:"Planta", field:'location',hozAlign:"left",headerFilter:true},
];

/*
dataTableBitacora = [
	{folio:1263451,visitante:'Javier Garcia',contratista:'LINKAFORM SA DE CV',visita:'Juan Perez',area:'Refrigeración',tipo:'Nuevo',entrada:'20-06-2024 08:30',salida:'',estado:true, punto_acceso:'',credentials:'Si',comentario:'Entra temprano con autorización',planta:'PLanta 1'},
	{folio:1263452,visitante:'Javier Garcia',contratista:'LINKAFORM SA DE CV',visita:'Juan Perez',area:'Refrigeración',tipo:'Nuevo',entrada:'20-06-2024 08:00',salida:'',estado:true, punto_acceso:'',credentials:'Si',comentario:'Entra temprano con autorización',planta:'PLanta 1'},
	{folio:1263453,visitante:'Javier Garcia',contratista:'LINKAFORM SA DE CV',visita:'Juan Perez',area:'Refrigeración',tipo:'Nuevo',entrada:'22-07-2024 08:30',salida:'',estado:true, punto_acceso:'',credentials:'Si',comentario:'Entra temprano con autorización',planta:'PLanta 1'},
	{folio:1263454,visitante:'Javier Garcia',contratista:'LINKAFORM SA DE CV',visita:'Juan Perez',area:'Refrigeración',tipo:'Nuevo',entrada:'23-07-2024 08:30',salida:'',estado:true, punto_acceso:'',credentials:'Si',comentario:'Entra temprano con autorización',planta:'PLanta 1'},
	{folio:1263455,visitante:'Javier Garcia',contratista:'LINKAFORM SA DE CV',visita:'Juan Perez',area:'Refrigeración',tipo:'Nuevo',entrada:'24-07-2024 08:30',salida:'',estado:true, punto_acceso:'',credentials:'Si',comentario:'Entra temprano con autorización',planta:'PLanta 1'},
	{folio:1263456,visitante:'Javier Garcia',contratista:'LINKAFORM SA DE CV',visita:'Juan Perez',area:'Refrigeración',tipo:'Nuevo',entrada:'25-07-2024 08:30',salida:'',estado:true, punto_acceso:'',credentials:'Si',comentario:'Entra temprano con autorización',planta:'PLanta 1'},
	{folio:1263457,visitante:'Javier Garcia',contratista:'LINKAFORM SA DE CV',visita:'Juan Perez',area:'Refrigeración',tipo:'Nuevo',entrada:'25-07-2024 08:30',salida:'',estado:true, punto_acceso:'',credentials:'Si',comentario:'Entra temprano con autorización',planta:'PLanta 1'},
	{folio:1263458,visitante:'Javier Garcia',contratista:'LINKAFORM SA DE CV',visita:'Juan Perez',area:'Refrigeración',tipo:'Nuevo',entrada:'26-07-2024 08:30',salida:'',estado:false, punto_acceso:'',credentials:'Si',comentario:'Entra temprano con autorización',planta:'PLanta 1'},
	{folio:1263459,visitante:'Javier Garcia',contratista:'LINKAFORM SA DE CV',visita:'Juan Perez',area:'Refrigeración',tipo:'Nuevo',entrada:'27-06-2024 08:30',salida:'',estado:true, punto_acceso:'',credentials:'Si',comentario:'Entra temprano con autorización',planta:'PLanta 1'},
	{folio:1263410,visitante:'Javier Garcia',contratista:'LINKAFORM SA DE CV',visita:'Juan Perez',area:'Refrigeración',tipo:'Nuevo',entrada:'28-06-2024 08:30',salida:'',estado:true, punto_acceso:'',credentials:'Si',comentario:'Entra temprano con autorización',planta:'PLanta 1'},
	{folio:1263411,visitante:'Javier Garcia',contratista:'LINKAFORM SA DE CV',visita:'Juan Perez',area:'Refrigeración',tipo:'Nuevo',entrada:'29-06-2024 08:30',salida:'',estado:false, punto_acceso:'',credentials:'Si',comentario:'Entra temprano con autorización',planta:'PLanta 1'},
	{folio:1263412,visitante:'Javier Garcia',contratista:'LINKAFORM SA DE CV',visita:'Juan Perez',area:'Refrigeración',tipo:'Nuevo',entrada:'30-02-2024 08:30',salida:'',estado:false, punto_acceso:'',credentials:'Si',comentario:'Entra temprano con autorización',planta:'PLanta 1'},
	{folio:1263413,visitante:'Javier Garcia',contratista:'LINKAFORM SA DE CV',visita:'Juan Perez',area:'Refrigeración',tipo:'Nuevo',entrada:'31-02-2024 08:30',salida:'',estado:true, punto_acceso:'',credentials:'Si',comentario:'Entra temprano con autorización',planta:'PLanta 1'},
	{folio:1263414,visitante:'Javier Garcia',contratista:'LINKAFORM SA DE CV',visita:'Juan Perez',area:'Refrigeración',tipo:'Nuevo',entrada:'32-02-2024 08:30',salida:'',estado:false, punto_acceso:'',credentials:'Si',comentario:'Entra temprano con autorización',planta:'PLanta 1'},
] */

dataTableLocker = [
	{folio:1,locker:'Locker 1',status:false,visit:'Rodolfo Peña Gonzales',document:'INE',num_access:'A58',location:'PLanta 1'},
	{folio:2,locker:'Locker 1',status:true,visit:'Rodolfo Peña Gonzales',document:'INE',num_access:'A58',location:'PLanta 1'},
	{folio:3,locker:'Locker 1',status:false,visit:'Rodolfo Peña Gonzales',document:'INE',num_access:'A58',location:'PLanta 1'},
	{folio:4,locker:'Locker 1',status:true,visit:'Rodolfo Peña Gonzales',document:'Pasaporte',num_access:'A58',location:'PLanta 1'},
	{folio:5,locker:'Locker 1',status:true,visit:'Rodolfo Peña Gonzales',document:'INE',num_access:'A58',location:'PLanta 1'},
	{folio:6,locker:'Locker 1',status:true,visit:'Rodolfo Peña Gonzales',document:'Pasaporte',num_access:'A58',location:'PLanta 1'},
	{folio:7,locker:'Locker 1',status:false,visit:'Rodolfo Peña Gonzales',document:'INE',num_access:'A58',location:'PLanta 1'},
	{folio:8,locker:'Locker 1',status:false,visit:'Rodolfo Peña Gonzales',document:'Pasaporte',num_access:'A58',location:'PLanta 1'},
	{folio:9,locker:'Locker 1',status:false,visit:'Rodolfo Peña Gonzales',document:'INE',num_access:'A58',location:'PLanta 1'},
	{folio:10,locker:'Locker 1',status:false,visit:'Rodolfo Peña Gonzales',document:'INE',num_access:'A58',location:'PLanta 1'},
]


//-----TABLES
function drawTable(id, columnsData, tableData,){
    var  table = new Tabulator("#" + id, {
	    layout:"fitDataStretch",
	    data:tableData,
	    textDirection:"ltr",
	    columns:columnsData,
	    pagination:true, 
	    paginationSize:40,
        placeholder: "No hay registros disponibles", 
    });
    tables[id]=table;
}


let load_shift_json_log={
	"booth":"Caseta 1",
	"location":"Monterrey",
	"booth_stats":{
		"guard_on_duty": {
			"name":"Juan Alvarez",
			"id":100
		},
		"support_guard":{
			"name":"Guardia Soporte 1",
			"id":101
		},
		"log":{
			"visits_per_day": 8,
			"staff_indoors":20,
			"vehicles_inside":36,
			"registered_exits":14,
		}
	}
}


/*
	<!-- Modal Equipo-->
	<div class="modal fade" id="itemsModal" tabindex="-1"  aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5">Equipo</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="mb-3 col-6">
							<label class="form-label">Tipo de Equipo *</label>
							<select class="form-select" aria-label="Default select example">
								<option selected>Open this select menu</option>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
							</select>
						</div>
						<div class="mb-3 col-6">
							<label class="form-label">Marca *</label>
							<input type="text" class="form-control"  placeholder="Marca">
						</div>
						<div class="mb-3 col-6">
							<label class="form-label">Modelo *</label>
							<input type="text" class="form-control"  placeholder="Modelo">
						</div>
						<div class="mb-3 col-6">
							<label class="form-label">Numero de Serie *</label>
							<input type="text" class="form-control"  placeholder="Serie">
						</div>
						<div class="mb-3 col-6">
							<label class="form-label">Color *</label>
							<input type="color" class="form-control">
						</div>
					</div>
					
					<small class="text-black-50 mt-3">** Campos son obligatorios</small>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
					<button type="button" class="btn btn-primary">Enviar</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal Car-->
	<div class="modal fade" id="carsModal" tabindex="-1"  aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5">Vehiculo</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="mb-3 col-12">
							<label class="form-label">Tipo de Equipo *</label>
							<select class="form-select" aria-label="Default select example">
								<option selected>Open this select menu</option>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
							</select>
						</div>
						<div class="mb-3 col-6">
							<label class="form-label">Marca *</label>
							<div class="input-group mb-3">
								<select class="form-select" aria-label="Default select example">
									<option selected>Option</option>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
								</select>
							</div>
						</div>
						<div class="mb-3 col-6">
							<label class="form-label">Modelo *</label>
							<select class="form-select" aria-label="Default select example">
								<option selected>Open this select menu</option>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
							</select>
						</div>
						<div class="mb-3 col-4">
							<label class="form-label">Color *</label>
							<input type="color" class="form-control">
						</div>
						<div class="mb-3 col-4">
							<label class="form-label">Estado *</label>
							<select class="form-select" aria-label="Default select example">
								<option selected>Open this select menu</option>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
							</select>
						</div>
						<div class="mb-3 col-4">
							<label class="form-label">Numero de placas *</label>
							<input type="text" class="form-control"  placeholder="Placas">
						</div>
					</div>
					<small class="text-black-50 mt-3">** Campos son obligatorios</small>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
					<button type="button" class="btn btn-primary">Enviar</button>
				</div>
			</div>
		</div>
	</div>

		<!-- Modal Card-->
	<div class="modal fade" id="cardModal" tabindex="-1"  aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5">Gafete</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="mb-3 col-12">
							<label class="form-label">Numero de gafete *</label>
							<select class="form-select">
								<option selected>--Seleccione--</option>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
							</select>
						</div>
						<div class="mb-3 col-12">
							<label class="form-label">Tipo de documento de garantía *</label>
							<br>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="inlineRadioOptions" id="checkIne" value="optionIne">
								<label class="form-check-label" for="checkIne">Ine</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="inlineRadioOptions" id="checkLicencia" value="optionLicencia">
								<label class="form-check-label" for="checkLicencia">Licencia de Conducir</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="inlineRadioOptions" id="checkPase" value="optionPase">
								<label class="form-check-label" for="checkPase">Pase de estacionamiento</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="inlineRadioOptions" id="checkOtro" value="optionOtro">
								<label class="form-check-label" for="checkOtro">Otro</label>
							</div>
							
						</div>
						<div class="mb-3 col-12">
							<input type="text" class="form-control"  placeholder="Otro">
						</div>
						<div class="mb-3 col-12">
							<label class="form-label">Locker de Seguridad *</label>
							<input type="text" class="form-control"  placeholder="Espacio Designado">
						</div>
					</div>


					<small class="text-black-50 mt-3">** Campos son obligatorios</small>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
					<button type="button" class="btn btn-primary" onclick="getFormGafete()" >Asignar</button>
				</div>
			</div> 
		</div>
	</div>
*/

