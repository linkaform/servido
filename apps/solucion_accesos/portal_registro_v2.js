//-----Variables
let listItemsData = []
let listVehiculesData = []

let listNewVehicules = []
let listNewItems = []


const columsData1 = [
	{ title:"Tipo", field:'type',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Marca", field:'marca',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Modelo", field:'modelo',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Serie", field:'serie',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Color", field:'color',hozAlign:"left",headerFilter:true,width:250},
	{ title: "Seleccionar", field: "actions" , hozAlign: "left", resizable:false,
		formatter: (cell, formatterParams) => {
			//----Button Trash
			let modelo = cell.getData().modelo ? cell.getData().modelo : 0;
			let component = '<div class="d-flex">';
			component += '  <input class="form-check-input " type="checkbox" id="checkbox'+modelo+'" value="">';
			component += '</div>';
			return component;
		},
	}
];

const columsData2 = [
	{ title:"Marca", field:'marca',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Modelo", field:'modelo',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Color", field:'color',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Placas", field:'placas',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Estado", field:'estado',hozAlign:"left",headerFilter:true,width:250},
	{ title: "Seleccionar", field: "actions" , hozAlign: "left", resizable:false,
		formatter: (cell, formatterParams) => {
			//----Button Trash
			let modelo = cell.getData().modelo ? cell.getData().modelo : 0;
			let component = '<div>';
			component += '  <input class="form-check-input " type="checkbox" id="checkbox'+modelo+'" value="">';
			component += '</div>';
			return component;
		},
	}
];

const dataTable1 = [
	{'type':'Computo','marca':'Dell','modelo':'ThinkPd X1 Yoga','serie':'DELL5820-12-3452','color':'Negro','check':'True'},
	{'type':'Computo','marca':'Dell','modelo':'ThinkPd X1 Yoga','serie':'DELL5820-12-3452','color':'Negro','check':'True'},
	{'type':'Computo','marca':'Dell','modelo':'ThinkPd X1 Yoga','serie':'DELL5820-12-3452','color':'Negro','check':'True'},
	{'type':'Computo','marca':'Dell','modelo':'ThinkPd X1 Yoga','serie':'DELL5820-12-3452','color':'Negro','check':'True'},
	{'type':'Computo','marca':'Dell','modelo':'ThinkPd X1 Yoga','serie':'DELL5820-12-3452','color':'Negro','check':'True'},
	{'type':'Computo','marca':'Dell','modelo':'ThinkPd X1 Yoga','serie':'DELL5820-12-3452','color':'Negro','check':'True'},
	{'type':'Computo','marca':'Dell','modelo':'ThinkPd X1 Yoga','serie':'DELL5820-12-3452','color':'Negro','check':'True'},
]


const dataTable2 = [
	{'marca':'Nissan','modelo':'Kicsk','color':'Blanco','placas':'PRC-1265','estado':'Nuevo León'},
	{'marca':'Nissan','modelo':'Kicsk','color':'Blanco','placas':'PRC-1265','estado':'Nuevo León'},
	{'marca':'Nissan','modelo':'Kicsk','color':'Blanco','placas':'PRC-1265','estado':'Nuevo León'},
	{'marca':'Nissan','modelo':'Kicsk','color':'Blanco','placas':'PRC-1265','estado':'Nuevo León'},
	{'marca':'Nissan','modelo':'Kicsk','color':'Blanco','placas':'PRC-1265','estado':'Nuevo León'},
	{'marca':'Nissan','modelo':'Kicsk','color':'Blanco','placas':'PRC-1265','estado':'Nuevo León'},
]


window.onload = function(){
	setHideElements('dataHide');
	setSpinner(true, 'divSpinner');
	let user = getCookie("userId");
	let jw = getCookie("userJwt");
	if(user !='' && jw!=''){
		//----QUery
		setDataInformation('alerts',data = {})
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
function setCloseSession() {
	closeSession();
	redirectionUrl('login',false);
}

//-----Function Get Data
function getDataAlert() {
	let urlLinkaform = 'https://app.linkaform.com/api/infosync/scripts/run/';
	let userJwt = getCookie("userJwt");
	fetch(urlLinkaform, {
		method: 'POST',
		body: JSON.stringify({
			script_id: 116097,
			option: 'query_alerts',
		}),
		headers:{
	      'Content-Type': 'application/json',
	      'Authorization': 'Bearer '+userJwt,
	      'Access-Control-Request-Headers':'*'
	    },
	})
	.then(res => res.json())
	.then(res => {
		if (res.success) {
			let data = res.response.json;
			setDataInformation('alerts',data)
		} 
	})
}

function getDataUser() {
	//---Css
	$("#divSpinner").show();
	setHideElements('dataHide');
	setHideElements('buttonsOptions');
	//----Cookie 
	let urlLinkaform = 'https://app.linkaform.com/api/infosync/scripts/run/';
	let userJwt = getCookie("userJwt");
	fetch(urlLinkaform, {
		method: 'POST',
		body: JSON.stringify({
			script_id: 116097,
			option: 'get_users_information',
			curp: 'JERJ127',
		}),
		headers:{
	      'Content-Type': 'application/json',
	      'Authorization': 'Bearer '+userJwt,
	      'Access-Control-Request-Headers':'*'
	    },
	})
	.then(res => res.json())
	.then(res => {
		if (res.success) {
			let data = res.response.json;
			setHideElements('buttonsModal');
			setDataInformation('informatioUser',data)
			setTimeout(() => {
				$("#divSpinner").hide();
				setHideElements('dataShow');
			}, "1000");
		} 
	})
}

//-----Function Set Data
function setDataUser(){
	//----Cookie 
	let urlLinkaform = 'https://app.linkaform.com/api/infosync/scripts/run/';
	let userJwt = getCookie("userJwt");
	let dataItem = {'listItemsData':listItemsData,'listNewItems':listNewItems}
	let dataVehicule = {'listVehiculesData':listVehiculesData,'listNewVehicules':listNewVehicules}
	fetch(urlLinkaform, {
		method: 'POST',
		body: JSON.stringify({
			script_id: 116097,
			option: 'set_movement_users',
			curp: 'JERJ127',
			dataItem: dataItem,
			dataVehicule: dataVehicule,
		}),
		headers:{
	      'Content-Type': 'application/json',
	      'Authorization': 'Bearer '+userJwt,
	      'Access-Control-Request-Headers':'*'
	    },
	})
	.then(res => res.json())
	.then(res => {
		if (res.success) {
			let data = res.response.json;
			setHideElements('buttonsModal');
			setDataInformation('informatioUser',data)
			Swal.fire({
				title	: "Exito!",
				text: "Movimiento de usuario registrado",
				icon: "success"
			});
			setCleanData();
			setHideElements('dataHide');
			setHideElements('buttonsOptions');
			setHideElements('buttonNew');
		} 
	})
}

//----Functions Css
function setDataInformation(option, data = {}){
	if(option == 'alerts'){
		let count_in = data.count_in ? count_in : 10;
		let count_out = data.count_out ? count_out : 70;
		let count_cars_in = data.count_cars_in ? count_cars_in : 20;
		let count_out_register = data.count_out_register ? count_out_register : 30;
		$("#textAlert1").text(count_in);
		$("#textAlert2").text(count_out);
		$("#textAlert3").text(count_cars_in);
		$("#textAlert4").text(count_out_register);
	}else if(option == 'informatioUser'){
		if(data.hasOwnProperty('data_user') && data.hasOwnProperty('movement') && data.hasOwnProperty('bitacora')){
			//---Variables
			let dataUser = data.data_user;
			let dataMovement = data.movement;
			let dataBitacora = data.bitacora;
			//---Movement
			if(dataMovement.type == 'in'){
				$("#buttonIn").show();
				$("#textIn").show();
			}else if(dataMovement.type == 'out'){
				$("#buttonOut").show();
				$("#textOut").show();
			}
			$("#buttonNew").hide();
			$("#buttonCard").show();
			$("#buttonClean").show();
			//---Bitacora
			
			let listBitacora = dataBitacora.length > 0 ? dataBitacora: [];
			for (var i = 0; i < listBitacora.length; i++) {
				if(i < 3){
					var newRow = $('<tr>');
					newRow.append($('<td>').text(listBitacora[i].visita ? listBitacora[i].visita : ''));
					newRow.append($('<td>').text(listBitacora[i].acceso ? listBitacora[i].acceso : ''));
					newRow.append($('<td>').text(listBitacora[i].duration ? listBitacora[i].duration : ''));
					newRow.append('</tr>');
					$('#tableBitacora').append(newRow);
				}
			}
			if(listBitacora.length > 3){
				$("#buttonBitacoraModal").show();
				for (var i = 0; i < listBitacora.length; i++) {
					var newRow = $('<tr>');
					newRow.append($('<td>').text(listBitacora[i].visita ? listBitacora[i].visita : ''));
					newRow.append($('<td>').text(listBitacora[i].acceso ? listBitacora[i].acceso : ''));
					newRow.append($('<td>').text(listBitacora[i].duration ? listBitacora[i].duration : ''));
					newRow.append('</tr>');
					$('#tableBitacoraModal').append(newRow);
				}
			}
			if(listBitacora.length == 0){
				var newRow = $('<tr>');
				newRow.append($('<td colspan="3">').text('No existen Registros Recientes'));
				newRow.append('</tr>');
				$('#tableBitacora').append(newRow);
			}
			//---Information user
			let imgUser = dataUser.img != '' ? dataUser.img: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-20/None/5ea35de83ab7dad56c66e045/64eccb863340ee1053751c1f.png';
			$('#imgUser').attr('src', imgUser); 
			let imgCard = dataUser.card != '' ? dataUser.card: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65dd1061092cd19498857933.jpg';
			$('#imgCard').attr('src', imgCard); 
			let nameUser = dataUser.name != '' ? dataUser.name: '';
			$('#name').text(nameUser); 
			let rfc = dataUser.rfc != '' ? dataUser.rfc: '';
			$('#rfc').text(rfc);
			let validity = dataUser.validity != '' ? dataUser.validity: '';
			$('#validity').text(validity);
			let status = dataUser.status != '' ? dataUser.status: '';
			$('#status').text(status);
			//----Visiti
			let motivo = dataUser.motivo != '' ? dataUser.motivo: '';
			$('#motivo').text(motivo);
			let visit = dataUser.visit_name != '' ? dataUser.visit_name: '';
			$('#visit').text(visit);
			let authorizePase = dataUser.authorize_pase != '' ? dataUser.authorize_pase: '';
			$('#authorizePase').text(authorizePase);
			let authorizePhone = dataUser.authorize_phone != '' ? dataUser.authorize_phone: '';
			$('#authorizePhone').text(authorizePhone);
			//----Table INstructions
			let listInstructions = dataUser.list_instrucctions.length > 0 ? dataUser.list_instrucctions: [];
			for (var i = 0; i < listInstructions.length; i++) {
				if(i < 3){
					var newRow = $('<tr>');
					newRow.append($('<td>').text(listInstructions[i]));
					newRow.append('</tr>');
					$('#tableInstructions').append(newRow);
				}
			}
			if(listInstructions.length > 3){
				$("#buttonCommentsModal").show();
				for (var i = 0; i < listInstructions.length; i++) {
					var newRow = $('<tr>');
					newRow.append($('<td>').text(listInstructions[i]));
					newRow.append('</tr>');
					$('#tableModalInstructions').append(newRow);
				}
			}
			if(listInstructions.length == 0){
				var newRow = $('<tr>');
				newRow.append($('<td>').text('No existen Instrucciones'));
				newRow.append('</tr>');
				$('#tableModalInstructions').append(newRow);
			}
			//----Table INstructions
			let listAccess = dataUser.list_access.length > 0 ? dataUser.list_access: [];
			for (var i = 0; i < listAccess.length; i++) {
				if(i < 3){
					let nameAccess = listAccess[i].name_access;
					let statusAccess = listAccess[i].status_access;
					var newRow = $('<tr>');
					newRow.append($('<td>').text(nameAccess));
					newRow.append($('<td>').text(statusAccess));
					newRow.append('</tr>');
					$('#tableAccess').append(newRow);
				}
			}
			if(listAccess.length > 3){
				$("#buttonAccessModal").show();
				for (var i = 0; i < listInstructions.length; i++) {
					var newRow = $('<tr>');
					newRow.append($('<td>').text(nameAccess));
					newRow.append($('<td>').text(statusAccess));
					newRow.append('</tr>');
					$('#tableModalAccess').append(newRow);
				}
			}
			if(listAccess.length == 0){
				var newRow = $('<tr>');
				newRow.append($('<td colspan="2">').text('No existen Accesos Recientes'));
				newRow.append('</tr>');
				$('#tableModalInstructions').append(newRow);
			}
			//----Table Locations
			let listLocations = dataUser.list_locations.length > 0 ? dataUser.list_locations: [];
			for (var i = 0; i < listLocations.length; i++) {
				if(i < 3){
					var newRow = $('<tr>');
					newRow.append($('<td>').text(listLocations[i]));
					newRow.append('</tr>');
					$('#tableLocations').append(newRow);
				}
			}
			if(listLocations.length > 3){
				$("#buttonLocationsModal").show();
				for (var i = 0; i < listInstructions.length; i++) {
					var newRow = $('<tr>');
					newRow.append($('<td>').text(listLocations[i]));
					newRow.append('</tr>');
					$('#tableModalAccess').append(newRow);
				}
			}
			if(listLocations.length == 0){
				var newRow = $('<tr>');
				newRow.append($('<td>').text('No existen Accesos'));
				newRow.append('</tr>');
				$('#tableModalAccess').append(newRow);
			}
			//----Table Items
			let listItems = dataUser.list_items.length > 0 ? dataUser.list_items: [];
			listItems.forEach(function(dic) {
			    dic.id = Math.floor(Math.random() * 1000000);;
			});
			listItemsData = listItems;
			listItemsData.forEach(function(dic) {
			    dic.check = false;
			});

			for (var i = 0; i < listItems.length; i++) {
				if(i < 3){
					let typeItem = listItems[i].type_item;
					let modelItem = listItems[i].model_item;
					let colorItem = listItems[i].color_item;
					let id = listItems[i].id;
					var newRow = $('<tr>');
					newRow.append($('<td>').text(typeItem));
					newRow.append($('<td>').text(modelItem));
					newRow.append($('<td>').text(colorItem));
					newRow.append('<td><input class="form-check-input" type="checkbox"  onChange="setCheckItem('+id+')"></td>');
					newRow.append('</tr>');
					$('#tableItems').append(newRow);
				}
			}
			
			if(listItems.length > 3){
				$("#buttonItemsModal").show();
				for (var i = 0; i < listItems.length; i++) {
					let typeItem = listItems[i].type_item;
					let modelItem = listItems[i].model_item;
					let colorItem = listItems[i].color_item;
					let id = listItems[i].id;
					var newRow = $('<tr>');
					newRow.append($('<td>').text(typeItem));
					newRow.append($('<td>').text(modelItem));
					newRow.append($('<td>').text(colorItem));
					newRow.append('<td><input class="form-check-input" type="checkbox"  onChange="setCheckItem('+id+')"></td>');
					newRow.append('</tr>');
					$('#tableModalItems').append(newRow);
				}
			}
			if(listLocations.length == 0){
				var newRow = $('<tr>');
				newRow.append($('<td colspan="3">').text('No existen Equipos'));
				newRow.append('</tr>');
				$('#tableModalInstructions').append(newRow);
			}
			//----Table Cars
			let listCars = dataUser.list_cars.length > 0 ? dataUser.list_cars: [];
			listCars.forEach(function(dic) {
			    dic.id = Math.floor(Math.random() * 1000000);;
			});
			listVehiculesData = listCars;
			listVehiculesData.forEach(function(dic) {
			    dic.check = false;
			});


			for (var i = 0; i < listCars.length; i++) {
				if(i < 3){
					let typeCar = listCars[i].type_car;
					let serie_car = listCars[i].serie_car[0];
					let colorCar = listCars[i].color_car;
					let id = listCars[i].id;
					var newRow = $('<tr>');
					newRow.append($('<td>').text(typeCar));
					newRow.append($('<td>').text(serie_car));
					newRow.append($('<td>').text(colorCar));
					newRow.append('<td><input type="radio" name="groupCarList" onChange="setCheckVehicule('+id+')"></td>');
					newRow.append('</tr>');
					$('#tableCars').append(newRow);
				}
			}
			if(listCars.length > 3){
				$("#buttonCarsModal").show();
				for (var i = 0; i < listCars.length; i++) {
					let typeCar = listCars[i].type_car;
					let serie_car = listCars[i].serie_car[0];
					let colorCar = listCars[i].color_car;
					let id = listCars[i].id;
					var newRow = $('<tr>');
					newRow.append($('<td>').text(typeCar));
					newRow.append($('<td>').text(serie_car));
					newRow.append($('<td>').text(colorCar));
					newRow.append('<td><input type="radio"  name="groupCarList" onChange="setCheckVehicule('+id+')"></td>');
					newRow.append('</tr>');
					$('#tableCarsModal').append(newRow);
				}
			}
			if(listLocations.length == 0){
				var newRow = $('<tr>');
				newRow.append($('<td colspan="3">').text('No existen Vehiculos'));
				newRow.append('</tr>');
				$('#tableModalInstructions').append(newRow);
			}
		}
	}
}

function setHideElements(option){
	if (option == 'buttonsModal') {
		$("#buttonCommentsModal").hide();
		$("#buttonBitacoraModal").hide();
		$("#buttonAccessModal").hide();
		$("#buttonLocationsModal").hide();
		$("#buttonItemsModal").hide();
		$("#buttonCarsModal").hide();
	}else if(option == 'buttonsOptions'){
		$("#buttonIn").hide();
		$("#buttonOut").hide();
		$("#buttonNew").hide();
		$("#buttonCard").hide();
		$("#buttonClean").hide();
	}else if(option == 'buttonNew'){
		$("#buttonNew").show();
	}else if(option =='dataHide'){
		$("#textOut").hide();
		$("#textIn").hide();
		var elements = document.getElementsByClassName('section-data');
		for (var i = 0; i < elements.length; i++) {
	    	elements[i].style.display = 'none';
		}
	}else if(option =='dataShow'){
		var elements = document.getElementsByClassName('section-data');
		for (var i = 0; i < elements.length; i++) {
	    	elements[i].style.display = 'block';
		}
	}
}

function setCleanData(){
	let tbody = document.querySelector('#tableBitacora tbody');
	tbody.innerHTML = '';

	tbody = document.querySelector('#tableBitacoraModal tbody');
	tbody.innerHTML = '';

	tbody = document.querySelector('#tableInstructions tbody');
	tbody.innerHTML = '';

	tbody = document.querySelector('#tableModalInstructions tbody');
	tbody.innerHTML = '';

	tbody = document.querySelector('#tableAccess tbody');
	tbody.innerHTML = '';

	tbody = document.querySelector('#tableModalAccess tbody');
	tbody.innerHTML = '';

	tbody = document.querySelector('#tableModalInstructions tbody');
	tbody.innerHTML = '';

	tbody = document.querySelector('#tableLocations tbody');
	tbody.innerHTML = '';

	tbody = document.querySelector('#tableModalAccess tbody');
	tbody.innerHTML = '';

	tbody = document.querySelector('#tableItems tbody');
	tbody.innerHTML = '';

	tbody = document.querySelector('#tableModalItems tbody');
	tbody.innerHTML = '';

	tbody = document.querySelector('#tableModalInstructions tbody');
	tbody.innerHTML = '';

	tbody = document.querySelector('#tableCars tbody');
	tbody.innerHTML = '';

	tbody = document.querySelector('#tableCarsModal tbody');
	tbody.innerHTML = '';

	tbody = document.querySelector('#tableModalInstructions tbody');
	tbody.innerHTML = '';


	$('#imgUser').attr('src', 'https://f001.backblazeb2.com/file/app-linkaform/public-client-20/None/5ea35de83ab7dad56c66e045/64eccb863340ee1053751c1f.png'); 
	$('#imgCard').attr('src', 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65dd1061092cd19498857933.jpg'); 

	$('#name').text('')
	$('#rfc').text('')
	$('#validity').text('')
	$('#status').text('')
	$('#motivo').text('')
	$('#visit').text('')
	$('#authorizePase').text('')
	$('#authorizePhone').text('')
}



//----Add data
function setCheckVehicule(id = 0) {
	if(listNewVehicules.length == 0){
		for (var i = 0; i < listVehiculesData.length; i++) {
			let item = listVehiculesData[i];
			let idItem = item.id ? item.id : 0;
			if(idItem == id){
				item.check = true;
			}else{
				item.check = false;
			}
		}
		listNewVehicules = [];

	}else{
		$('input[name="groupCarList"]').prop('checked', false);
	}
}

function setCheckItem(id = 0) {
	var element = listItemsData.find(function(item) {
        return item.id === id;
    });
    if (element) {
        element.check = !element.check;
    }
}

function getSaveItem(){
	let dicData = {};
	let validation = false;
	$('.form-item').each(function() {
	    let id = $(this).attr('id');
	    let valor = $(this).val();
	    if(valor != ''){
	    	dicData[id] = valor;
	    }else{
	    	validation = true;
	    }
	});

	if(!validation){
		listNewItems.push(dicData);
		$("#buttonAddCarModal").hide();
		$("#alertItemModal").hide();
		$('#equipmentModal').modal('hide');
		
	}else{
		$("#alertItemModal").show();
	}
}

function getSaveCar(){
	let dicData = {};
	let validation = false;
	$('.form-car').each(function() {
	    let id = $(this).attr('id');
	    let valor = $(this).val();
	    if(valor != ''){
	    	dicData[id] = valor;
	    }else{
	    	validation = true;
	    }
	});
	if(!validation){
		//----Clean 
		for (var i = 0; i < listVehiculesData.length; i++) {
			let item = listVehiculesData[i];
			item.check = false;
		}
		$('.form-car').each(function() {
	    	let id = $(this).attr('id');
			$("#"+id).val('');
		});
		$('input[name="groupCarList"]').prop('checked', false);
		//---Css
		listNewVehicules.push(dicData);
		$("#alert_car_modal").hide();
		$('#carModal').modal('hide');
		
	}else{
		$("#alert_car_modal").show();
	}
}

function setViewModalCard(){
	$('#listAddCarsModal').modal('show');
	var tbody = document.querySelector('#tableAddCarsModal tbody');
	tbody.innerHTML = '';
	if(listVehiculesData.length>0 || listNewVehicules.length>0 ){
		let flag = false;
		for (var i = 0; i < listVehiculesData.length; i++) {
			let check = listVehiculesData[i].check;
			if(check){
				let typeCar = listVehiculesData[i].type_car;
				let serie_car = listVehiculesData[i].serie_car[0];
				let colorCar = listVehiculesData[i].color_car;
				var newRow = $('<tr>');
				newRow.append($('<td>').text(typeCar));
				newRow.append($('<td>').text(serie_car));
				newRow.append($('<td>').text(colorCar));
				newRow.append('</tr>');
				$('#tableAddCarsModal').append(newRow);
			}
		}

		for (var i = 0; i < listNewVehicules.length; i++) {
			let typeCar = listNewVehicules[i].inputTipoCar;
			let serie_car = listNewVehicules[i].inputPlacasCar;
			let colorCar = listNewVehicules[i].inputColorCar;
			var newRow = $('<tr>');
			newRow.append($('<td>').text(typeCar));
			newRow.append($('<td>').text(serie_car));
			newRow.append($('<td>').text(colorCar));
			newRow.append('</tr>');
			$('#tableAddCarsModal').append(newRow);
		}
	}else{
		var newRow = $('<tr>');
		newRow.append($('<td colspan="3">').text('No existen Vehiculos Seleccionados o añadidos'));
		newRow.append('</tr>');
		$('#tableAddCarsModal').append(newRow);
	}
}

function setViewModalItem(){
	$('#listAddItemsModal').modal('show');
	if(listItemsData.length>0 || listNewItems.length>0){
		for (var i = 0; i < listItemsData.length; i++) {
			let check = listItemsData[i].check;
			if(check){
				let typeItem = listItemsData[i].type_item;
				let modelItem = listItemsData[i].model_item;
				let colorItem = listItemsData[i].color_item;
				var newRow = $('<tr>');
				newRow.append($('<td>').text(typeItem));
				newRow.append($('<td>').text(modelItem));
				newRow.append($('<td>').text(colorItem));
				newRow.append('</tr>');
				$('#tableAddItemsModal').append(newRow);
			}
		}
		for (var i = 0; i < listNewItems.length; i++) {
			let typeItem = listNewItems[i].inputTipoItem;
			let modelItem = listNewItems[i].inputModeloItem;
			let colorItem = listNewItems[i].inputColorItem;
			var newRow = $('<tr>');
			newRow.append($('<td>').text(typeItem));
			newRow.append($('<td>').text(modelItem));
			newRow.append($('<td>').text(colorItem));
			newRow.append('</tr>');
			$('#tableAddItemsModal').append(newRow);
		}
	}else{
		var newRow = $('<tr>');
		newRow.append($('<td colspan="3">').text('No existen Equipo Seleccionados o añadidos'));
		newRow.append('</tr>');
		$('#tableAddItemsModal').append(newRow);
	}
}

