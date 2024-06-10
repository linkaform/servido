let tables={}

const columsData1 = [
	{ title:"Opciones", field: "actions" , hozAlign: "left", resizable:false,width:180,
		formatter: (cell, formatterParams) => {
			//----Button Trash
			let folio = cell.getData().folio ? cell.getData().folio : 0;
			let divActions = '<div class="row d-flex">';
			divActions += `<button class="btn-table-bitacora" onClick="setModal('Tools',${folio})"><i class="fa-solid fa-hammer"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="setModal('Cars',${folio})" ><i class="fa-solid fa-car"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="setModal('Card',${folio})"><i class="fa-solid fa-address-card"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="alertSalida(${folio})" ><i class="fa-solid fa-arrow-right-from-bracket"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="setModal('Data',${folio})" ><i class="fa-solid fa-user"></i></button>`;
			divActions += '</div>';
			return divActions;
			//`<button  class="btn-table-bitacora" onClick="setModal('Tools',${folio})"><i class="fa-solid fa-car"></i></button> `;
		},
	},
	{ title:"Folio", field:'folio',hozAlign:"left",headerFilter:true,width:80},
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
			divActions += `<button class="btn-table-bitacora" onClick="alertGafete(${folio})"><i class="fa-solid fa-address-card"></i></button>`;
			divActions += `<button class="btn-table-bitacora" id="buttonClick" onClick="printTable('tableSalidas')"><i class="fa-solid fa-print"></i></button>`;
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


const dataTablePersonal = [
	{'folio':'1263451','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True', 'salida':''},
	{'folio':'1263452','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True', 'salida':''},
	{'folio':'1263453','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True', 'salida':''},
	{'folio':'1263454','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True', 'salida':''},
	{'folio':'1263455','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True', 'salida':''},
	{'folio':'1263456','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True', 'salida':''},
	{'folio':'1263457','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True', 'salida':''},
	{'folio':'1263458','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True', 'salida':''},
	{'folio':'1263459','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True', 'salida':''},
	{'folio':'1263410','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True', 'salida':''},
	{'folio':'1263411','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True', 'salida':''},
	{'folio':'1263412','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True', 'salida':''},
	{'folio':'1263413','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True', 'salida':''},
	{'folio':'1263414','planta':'PLanta 1','visitante':'Javier Garcia','contratista':'LINKAFORM SA DE CV','visita':'Juan Perez','area':'Refrigeración','tipo':'Nuevo','entrada':'25/02/2024 08:30','comentario':'Entra temprano con autorización','estado':'Dentro','credentials':'True', 'salida':''},
]

const dataTableLocker = [
	{'folio':'1','locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
	{'folio':'2','locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
	{'folio':'3','locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
	{'folio':'4','locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
	{'folio':'5','locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
	{'folio':'6','locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
	{'folio':'7','locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
	{'folio':'8','locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
	{'folio':'9','locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
	{'folio':'10','locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
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
    tables[id]=table;
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

