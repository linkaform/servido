let selectLocation;
let colors = getPAlleteColors(12,0)


window.onload = function(){
	setValueUserLocation('bitacora');
	changeButtonColor();
    fillCatalogs();

	getCatalogs();
    customNavbar(getValueUserLocation(), getCookie('userTurn'))
	selectLocation= document.getElementById("selectLocation")
	selectLocation.onchange = function() {
        let response = fetchOnChangeLocation(selectLocation.value)
    };
 	selectCaseta= document.getElementById("selectCaseta")
    selectCaseta.onchange = async function() {
        let response = await fetchOnChangeCaseta('script_turnos.py', 'list_bitacora', selectCaseta.value, selectLocation.value)
        reloadTableBitacoras(response.response.data)
    };
	let user = getCookie("userId");
	let userJwt = getCookie("userJwt");
    loadDataTables();

    $("#descargarEntradas").on("click", function() {
        descargarExcel(tables, 'tableEntradas')
    });
    $("#descargarSalidas").on("click", function() {
        descargarExcel(tables, 'tableSalidas')
    });

    let boothStats = load_shift_json_log.booth_stats.log
    $("#textVisitasEnElDia").text(boothStats.visits_per_day);
    $("#textPersonalDentro").text(boothStats.staff_indoors);
    $("#textVehiculosDentro").text(boothStats.vehicles_inside);
    $("#textSalidasRegistradas").text(boothStats.registered_exits);
}

function reloadTableBitacoras(data){
    dataTablePersonal=[]
   //dataTableLocker=[]
    if(user !='' && userJwt!=''){
        let bit= data
        for (i of bit){
            dataTablePersonal.push({folio:i.folio ,visitante:i.nombre_visita ,contratista:'LINKAFORM SA DE CV',visita:i.nombre_visita,
            area:i.caseta_entrada,tipo:i.status_visita, entrada:i.bitacora_entrada, salida:i.bitacora_salida,estado:'', 
            punto_acceso:'',credentials:i.gafete,comentario:'',planta:''})
        }
        
        if(tables['tableEntradas']){
            tables['tableEntradas'].setData(dataTablePersonal)
        }else{
            drawTable('tableEntradas',columsData1,dataTablePersonal);
        }

        if(tables['tableSalidas']){
            tables['tableSalidas'].setData(dataTableLocker)
        }else{
            drawTable('tableSalidas',columsData2,dataTableLocker);
        }
    }else{
        redirectionUrl('login',false);
    }

}

function loadDataTables(){
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: 'script_turnos.py',
            option: 'list_bitacora',
            location: getCookie('userLocation'),
            area: getCookie('userCaseta'),
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+userJwt
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            if(user !='' && userJwt!=''){
                let bit= res.response.data
                for (i of bit){
                    dataTablePersonal.push({folio:i.folio ,visitante:i.nombre_visita ,contratista:'LINKAFORM SA DE CV',visita:i.nombre_visita,
                    area:i.caseta_entrada,tipo:i.status_visita, entrada:i.bitacora_entrada, salida:i.bitacora_salida,estado:'', 
                    punto_acceso:'',credentials:i.gafete,comentario:'',planta:''})
                }
                drawTable('tableEntradas',columsData1,dataTablePersonal);
                drawTable('tableSalidas',columsData2,dataTableLocker);
            }else{
                redirectionUrl('login',false);
            }
        } 
    });
}

//FUNCION para abrir modales
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

//FUNCION confirmar la salida a un registro individual desde la tabla
function alertSalida(folio){
		Swal.fire({
	    title:'¿Estas seguro de confirmar la salida?',
	    html:`
	    <div class="m-2"> La salida no puede ser confirmada en este momento. Aún hay documentos 
	    en el locker correspondiente que deben ser desocupados antes de proceder. </div>`,
	    type: "warning",
	    showCancelButton: true,
	    cancelButtonColor: colors[0],
        cancelButtonText: "Cancelar",
        confirmButtonColor: colors[1],
	    confirmButtonText: "Si",
	    heightAuto:false,
        reverseButtons: true
	})
	.then((result) => {
	    if (result.value) {
            let selectedSalida = dataTablePersonal.find(n => n.folio == parseInt(folio));
           
            if (selectedSalida) {
                let fecha=  new Date()
                let año = fecha.getFullYear();
                let mes = fecha.getMonth() + 1;
                let dia = fecha.getDate();
                let horaFormateada = fecha.getHours() + ':' + fecha.getMinutes();
                let fechaFormateada = dia + '/' + mes + '/' + año + ' ' + horaFormateada;
                selectedSalida.salida = fechaFormateada;
                tables["tableEntradas"].setData(dataTablePersonal);
            }
	    }
	});
}


//FUNCION entregar gafete a un registro individual desde la tabla
function alertGafete(folio){
    let selectedSalida = dataTableLocker.find(n => n.folio == parseInt(folio));
    if(selectedSalida.status !='Libre'){
        Swal.fire({
            title:'¿Está seguro de entregar gafete?',
            html:`
            <div class="m-1"> Al entregar el gafete, se desocupara el espacio donde se almacenaba y se retiraran los documentos pertienentes </div>`,
            type: "warning",
            showCancelButton: true,
            cancelButtonColor: colors[0],
            cancelButtonText: "Cancelar",
            confirmButtonColor: colors[1],
            confirmButtonText: "Si",
            heightAuto:false,
            reverseButtons: true
        })
        .then((result) => {
            if (result.value) {
                let selectedSalida = dataTableLocker.find(n => n.folio == parseInt(folio));
                if (selectedSalida) {
                    selectedSalida.status = 'Libre';
                    selectedSalida.visit = '';
                    selectedSalida.document = '';
                    selectedSalida.location = '';
                    tables["tableSalidas"].setData(dataTableLocker);
                }
            }
        });
    }else{
         Swal.fire({
            title: "Acción Completada!",
            text: "Esta locker ya se encuentra liberado.",
            type: "warning"
        });
    }
}


//FUNCION rellenar catalogos al momento de escojer una opcion
function onChangeCatalog(type, id){
    if(type == "vehiculo"){
        $("#divCatalogMarca"+id+"").show();
        let inputMarca= document.getElementById("selectCatalogMarca-"+id+"");
        inputMarca.value="";
        let datalistMarca= document.getElementById("datalistOptionsMarca"+id+"");
        datalistMarca.innerHTML=""; 
        let inputModelo= document.getElementById("selectCatalogModelo-"+id+"");
        inputModelo.value="";
        let datalistModelo= document.getElementById("datalistOptionsModelo"+id+"");
        datalistModelo.innerHTML=""; 

        let selectedValue = $( "#selectTipoVehiculo-"+id+"" ).val();
        let catalogMarca = filterCatalogBy('type', selectedValue);
        for (let obj in catalogMarca){
            $("#datalistOptionsMarca"+id+"").append($('<option></option>').val(catalogMarca[obj].brand).text(catalogMarca[obj].brand));
        }
    }else if (type == "marca"){
        $("#divCatalogModelo"+id+"").show();
        let inputModelo= document.getElementById("selectCatalogModelo-"+id+"");
        inputModelo.value="";
        let datalistModelo= document.getElementById("datalistOptionsModelo"+id+"");
        datalistModelo.innerHTML=""; 
        let selectedValue = $( "#selectCatalogMarca-"+id+"" ).val();
        let catalogMarca = filterCatalogBy('brand', selectedValue);
        for (let obj in catalogMarca){
            $("#datalistOptionsModelo"+id+"").append($('<option></option>').val(catalogMarca[obj].model).text(catalogMarca[obj].model));
        }
    }
}


//FUNCION obtener data para rellenar los catalogos
function getCatalogs(){
    $("#selectTipoVehiculo-123").prop( "disabled", true );
    $("#divCatalogMarca123").hide();
    $("#divCatalogModelo123").hide();
    /*
    fetch(url + urlScripts ,{
        method: 'POST',
        body: JSON.stringify({
            script_id: idScript,
            option: "get_catalogs",
        }),
        headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+userJwt
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
        } 
    })*/
    
    let cat={
        "brands_cars": [
            {"type": "motocicleta", "brand": ["vento"]},
            {"type": "carro", "brand": ["nissan"]},
            {"type": "trailer", "brand": ["volvo"]},
        ],
        "model_cars": [
            {"brand": "vento", "model": ["35WFAS"]},
            {"brand":"suzuki", "model":["veloxs3"]},
            {"brand":"indian","model": ["model345"]},
            {"brand":"nissan", "model":["beliocks"]},
            {"brand":"chevrolet", "model":["345ref"]},
            {"brand":"ford", "model":["magic44"]},
            {"brand":"volvo", "model":["ref564"]},
            {"brand":"mercedes", "model":["mobre45"]},
            {"brand":"kenworth", "model":["cam213"]},
        ],
        "types_cars": ["motocicleta", "carro", "trailer"],
    }
    //dataCatalogs = res.response.data ==''? cat : res.response.data;
    dataCatalogs=cat
    $("#selectTipoVehiculo-123").prop( "disabled", false );
    $("#spinnerTipoVehiculo").css("display", "none");
    dataCatalogs.types_cars.forEach(function(e, i){
    $("#datalistOptionsTipo").append($('<option></option>').val(e).text(e));
    });
}


//FUNCION para guardar equipos entas con checkbox
function getSaveItem(){
    let dicData = {};
    let validation = false;
    let tipo= $("#selectTipoEquipo-123").val();
    let nombre=$("#inputNombreEquipo-123").val();
    let marca=$("#inputMarcaItem").val();
    let modelo=$("#inputModeloItem").val();
    let noserie=$("#inputSerieItem").val();
    let color=$("#inputColorItem").val();

    if(tipo==''|| nombre=='' ){
        validation=true
    }
    if(!validation){
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_id: idScript,
                option: 'add_new_equip',

            }),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+userJwt
            },
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                //CODE una vez resulta la imagen, cargarla en front
                dicData={ data: {}}
            } 
        });
       /* listNewItems.push({ marca_item: marca, type_item: tipo, model_item: modelo, color_item:color , noserie_item:noserie});
        let newRow = $('<tr>');
        newRow.append($('<td>').text(tipo));
        newRow.append($('<td>').text(marca));
        newRow.append($('<td>').text(modelo));
        newRow.append($('<td>').text(noserie));
        newRow.append($('<td>').text(color));
        newRow.append('</tr>');
        $('#tableItems').append(newRow);
         let newRow2 = $('<tr>');
        newRow2.append($('<td>').text(tipo));
        newRow2.append($('<td>').text(marca));
        newRow2.append($('<td>').text(modelo));
        newRow2.append($('<td>').text(noserie));
        newRow2.append($('<td>').text(color));
        newRow2.append('</tr>');
        $('#tableAddItemsModal').append(newRow2); */

        $("#selectTipoEquipo-123").val('');
        $("#inputNombreEquipo-123").val('');
        $("#inputMarcaItem").val('');
        $("#inputModeloItem").val('');
        $("#inputSerieItem").val('');
        $("#inputColorItem").val('');
        $("#alertItemModal").hide();
        $('#itemsModal').modal('hide');
        Swal.fire({
            title: "Confirmación",
            text: "El equipo fue agregado correctamente",
            type: "success"
        });
    }else{
        Swal.fire({
            title: "Validación",
            text: "Faltan campos por llenar, completa los campos marcados con asterisco",
            type: "warning"
        });
        //$("#alertItemModal").show();
    }
}


//FUNCION para saber que vehiculos estan con checkbox
function getSaveCar(){
    let dicData = {};
    let validation = false;
    let tipoVehiculo= $('#selectTipoVehiculo-123').val();
    let marca= $('#selectCatalogMarca-123').val();
    let modelo= $('#selectCatalogModelo-123').val();
    let matricula= $('#inputMatriculaVehiculo-123').val();
    let color= $('#inputColor-123').val();
    if(tipoVehiculo==''){
        validation=true
    }
    if(!validation){
    	/*
        let newRow = $('<tr>');
        newRow.append($('<td>').text(marca));
        newRow.append($('<td>').text(matricula));
        newRow.append($('<td>').text(color));
        newRow.append($('<td>').text(modelo));
        newRow.append('</tr>');
        $('#tableCars').append(newRow);
        listVehiculesData.push({"marca":marca , "matricula":matricula, "color":color, "modelo": modelo})
        let newRow2 = $('<tr>');
        newRow2.append($('<td>').text(marca));
        newRow2.append($('<td>').text(matricula));
        newRow2.append($('<td>').text(color));
        newRow2.append($('<td>').text(modelo));
        newRow2.append('</tr>');
        $('#tableAddCarsModal').append(newRow2);
        */

        $("#selectTipoVehiculo-123").val('');
        $("#selectCatalogMarca-123").val('');
        $("#selectModeloVehiculo-123").val('');
        $("#selectMatriculaVehiculo-123").val('');
        $("#selectColorVehiculo-123").val('');
        $("#carsModal").modal('hide');
         Swal.fire({
            title: "Confirmación",
            text: "El vehiculo fue agregado correctamente",
            type: "success"
        });
    }else{
        Swal.fire({
            title: "Validación",
            text: "Faltan campos por llenar, completa los campos marcados con asterisco",
            type: "warning"
        });

    }
}


//FUNCION filtrar los la data de catalogos
function filterCatalogBy(key, value ){
    /*INFO: 
    key: podemos filtrar por 'type' (marca) o 'brand' (modelo)
    value: valor de type o model segun corresponda
    */
    let dataCatalogChild="";
    if(key == 'type'){
        dataCatalogChild = dataCatalogs.brands_cars.filter(obj => obj.type == value);
    }else{
        dataCatalogChild = dataCatalogs.model_cars.filter(obj => obj.brand == value);
    }
    return dataCatalogChild;
}


//FUNCION ver el modal de gafete
function getFormGafete(){
    let flaginput = false;
    let flagcheck = true;
    let dicData = {};
    let elements = document.getElementsByClassName('form-gafete');
    for (let i = 0; i < elements.length; i++) {
        let id = elements[i].id;
        let value = elements[i].value;
        let type = elements[i].type;
        if(type == 'radio'){
            let valueCheck = elements[i].checked;
            if(valueCheck){
                flagcheck = false;
                dicData[id] = value;
            }
        }else{
            if(value !=''){
                dicData[id] = value;
            }else{
                flaginput = true;
            }
        }
    }
    if(!flaginput && !flagcheck){
        setDataGafete(dicData);
        for(e of elements){
        	e.value=''
        }
        Swal.fire({
        	title: "Gafete Entregado",
            text: "El gafete a sido entregado correctamente.",
            type: "success"
        });
        //$("#alert_gafete_modal").hide();
        $("#cardModal").modal('hide')
    }else{
    	Swal.fire({
            title: "Validación",
            text: "Faltan datos por llenar.",
            type: "warning"
        });
        //$("#alert_gafete_modal").show();
    }
}


//FUNCION para asignar un nuevo gafete
function setDataGafete(data = {}){
    let codeUser  = $("#inputCodeUser").val();
    let urlLinkaform = 'https://app.linkaform.com/api/infosync/scripts/run/';
    let userJwt = getCookie("userJwt");
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_id: 116097,
            option: 'set_movement_users',
            curp: codeUser,
            dataGafete: data,
            location: 'Planta Monterrey',
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
        } 
    })
}


//FUNCION print button imprimir tbala
function printTable(table){
    let tab = tables[table]
    tab.print(false, true);
}


//---Cerrar Sesión
function setCloseSession(argument) {
    closeSession();
    redirectionUrl('login',false);
}