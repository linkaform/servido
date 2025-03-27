let selectLocation;
let colors = getPAlleteColors(12,0)
let selectedEquipos=[]
let selectedVehiculos=[]
let idNuevoEquipoVehiculo=""
let seleccionadoBitacora={}

window.onload = function(){
	setValueUserLocation('bitacoras');
    user= getCookie("userId_soter");
    userJwt=getCookie('userJwt_soter');
    validSession(user, userJwt);
    
	changeButtonColor();
    fillCatalogs();

	//getCatalogs();

    let checkboxCasetas = document.getElementById('checkboxTodasLasCasetas');
    checkboxCasetas.checked = true; 
    
    customNavbar(getValueUserLocation(), getCookie('userTurn'))
	selectLocation= document.getElementById("selectLocation")
	selectLocation.onchange = function() {
        getBitacoraByLocation(selectLocation.value)
    };
 	selectCaseta= document.getElementById("selectCaseta")
    selectCaseta.onchange = async function() {
        let response = await fetchOnChangeCaseta('script_turnos.py', 'list_bitacora', selectCaseta.value, selectLocation.value,prioridades=['entrada'])
        reloadTableBitacoras(response.response.data)
    };
	// let user = getCookie("userId");
	// let userJwt = getCookie("userJwt");
    loadDataTables();
    getStats(getCookie("userCaseta"),getCookie("userLocation"),false);

    $("#descargarEntradas").on("click", function() {
        descargarExcel(tables, 'tableEntradas')
    });
    $("#descargarSalidas").on("click", function() {
        descargarExcel(tables, 'tableSalidas')
    });
    if(getValueUserLocation()=='bitacoras'){
         $(document).ready(function() {
            $('#divTodasLasCasetas').show();
            $('#labelGuardiaDeApoyo').remove();
        })
    }
    // let boothStats = load_shift_json_log.booth_stats.log
    // $("#textVisitasEnElDia").text(boothStats.visits_per_day);
    // $("#textPersonalDentro").text(boothStats.staff_indoors);
    // $("#textVehiculosDentro").text(boothStats.vehicles_inside);
    // $("#textSalidasRegistradas").text(boothStats.registered_exits);

    if(getValueUserLocation()=='bitacora'){
         $(document).ready(function() {
            $('#divTodasLasCasetas').show();
            $('#labelGuardiaDeApoyo').remove();
        })
    }

    selectCaseta.value=""
    selectCaseta.disabled=true

}

$("#checkboxTodasLasCasetas").on("click",async function()  {
    if ($(this).is(':checked')) {
        selectCaseta.value=""
        selectCaseta.disabled=true
        let response = await fetchOnChangeCaseta('script_turnos.py', 'list_bitacora','', selectLocation.value)
        reloadTableBitacoras(response.response.data)
        let response2 = await fetchOnChangeCaseta('script_turnos.py', 'get_lockers', '', selectLocation.value)
        reloadTableLockers(response2.response.data)
    } else {
        selectCaseta.disabled=false
    }
})

function getStats(area = "", location = "", loading = false) {
    if (loading) {
        loadingService();
    }

    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: 'get_stats.py',
            option: 'get_stats',
            area: area,
            location: location,
            page: 'Bitacoras'
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userJwt
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(res => {
        if (res.success) {
            const data = res.response.data;

            console.log('Datos obtenidos:', data);
            // Actualización de valores en el DOM
            $("#textVisitasEnElDia").text(data.visitas_en_dia);
            $("#textPersonalDentro").text(data.personal_dentro);
            $("#textVehiculosDentro").text(data.total_vehiculos_dentro);
            $("#textSalidasRegistradas").text(data.salidas_registradas);
        } else {
            console.error('Error en los datos recibidos:', res.error);
            alert('Hubo un problema al obtener los datos: ' + res.error);
        }
    })
    .catch(error => {
        console.error('Error en fetch:', error.message || error);
    })
    .finally(() => {
        if (loading) {
            Swal.close(); // Cierra el servicio de carga si estaba activo
        }
    });
}

//FUNCION para abrir modales
function setModal(type = 'none',id=0, folio=0){
    if(type == 'Tools'){
        $('#itemsModal').modal('show');
    }else if(type == 'Cars'){
        $('#carsModal').modal('show');
    }else if(type == 'Card'){
        abrirGafeteModal(id)
    }else if(type == 'Out'){
        $('#outModal').modal('show');
    }else if(type == 'Data'){
        openDataModal(id)
    }else if(type == 'Delivery'){
        $('#deliverModal').modal('show');
    }else if(type == 'equiposModal'){
        showAgregarEquipo(id, folio)
    }else if(type == 'vehiculosModal'){
        showAgregarVehiculo(id, folio)
    }
}

window.addEventListener('storage', function(event) {
    if (event.key === 'cerrarSesion') {
        let protocol = window.location.protocol;
        let host = window.location.host;
        window.location.href =`${protocol}//${host}/login.html`;
    }
});


async function onChangeFiltroEstadoBitacora(){
    let prioridades = document.querySelectorAll('input[name="estadoBitacora"]:checked');
    let values = Array.from(prioridades).map(checkbox => checkbox.value);
    let response2 = await fetchOnChangeCaseta('script_turnos.py', 'list_bitacora', selectCaseta.value, selectLocation.value, prioridades= values)
    reloadTableBitacoras(response2.response.data, selectCaseta.value)
}

function abrirGafeteModal(folio){
    loadingService()
    seleccionadoBitacora= dataTableBitacora.find(x => x.folio == folio);
    $("#selectGafete").val("")
    $("#selectLocker").val("")
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: "gafetes_lockers.py",
            option: 'get_lockers',
            location: selectLocation.value,
            area: selectCaseta.value,
            status: statusDisponible
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+userJwt
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            Swal.close();
            $('#cardModal').modal('show');
            let data= res.response.data
            let selectGaf= document.getElementById("selectLocker") 
            selectGaf.innerHTML=""; 
            for(let loc of data){
                    selectGaf.innerHTML += '<option value="'+loc.locker_id+'">'+loc.locker_id+'</option>';
            }
            if(data.length==0){
                 selectGaf.innerHTML += '<option disabled> No hay gafetes disponibles </option>';
            }
            selectGaf.value=""
        } 
    });

    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: "gafetes_lockers.py",
            option: 'get_gafetes',
            location: selectLocation.value,
            area: selectCaseta.value,
            status: statusDisponible
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+userJwt
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            Swal.close();
            $('#cardModal').modal('show');
            let data= res.response.data
            let selectGaf= document.getElementById("selectGafete") 
            selectGaf.innerHTML=""; 
            for(let gaf of data){
                    selectGaf.innerHTML += '<option value="'+gaf.gafete_id+'">'+gaf.gafete_id+'</option>';
            }
            if(data.length==0){
                 selectGaf.innerHTML += '<option disabled> No hay gafetes disponibles </option>';
            }
            selectGaf.value=""
        } 
    });
}


function limpiarModalEquipos(){
    idNuevoEquipoVehiculo=""
    $("#selectTipoEquipo").val("")
    $("#inputNombreEquipo").val("")
    $("#inputMarcaEquipo").val("")
    $("#inputModeloEquipo").val("")
    $("#inputSerieEquipo").val("")
    $("#inputColorEquipo").val("")
}

function limpiarModalVehiculos(){
    idNuevoEquipoVehiculo=""
    let selectVehiculosMarca= document.getElementById("selectVehiculosMarca")
    selectVehiculosMarca.innerHTML=""
    selectVehiculosMarca.innerHTML = '<option disabled>Escoge un tipo de vehiculo...</option>';
    selectVehiculosMarca.value=""

    let selectVehiculosModelo= document.getElementById("selectVehiculosModelo")
    selectVehiculosModelo.innerHTML=""
    selectVehiculosModelo.innerHTML = '<option disabled>Escoge una marca...</option>';
    selectVehiculosModelo.value=""
    let inputMarca= document.getElementById("selectVehiculos");
    inputMarca.innerHTML =""
    inputMarca.value=""
    $("#inputMatriculaVehiculo").val("");
    $("#inputColor").val("");
}

//FUNCION rellenar catalogos al momento de escojer una opcion
async function onChangeCatalog(type, id){
    if(type == "vehiculo"){
        let inputMarca= document.getElementById("selectVehiculos");
        const options = {
            method: 'POST', 
            body: JSON.stringify({
                script_name:'script_turnos.py',
                option:'vehiculo_tipo',
                tipo:inputMarca.value
            }),
             headers:{ 'Content-Type': 'application/json','Authorization': 'Bearer '+ userJwt}
        };
        loadingService();
        let respuesta = await fetch(url + urlScripts, options);
        let data = await respuesta.json();
        if(data.error){
            errorAlert(data)
        }else{
            Swal.close();
            let list =data.response.data
            let selectVehiculosMarca= document.getElementById("selectVehiculosMarca")
            selectVehiculosMarca.innerHTML=""; 
            for (let obj in list){
                selectVehiculosMarca.innerHTML += '<option value="'+list[obj]+'">'+list[obj]+'</option>';
            }
            selectVehiculosMarca.value=""
        }
    }else if (type == "marca"){
        let inputTipo= document.getElementById("selectVehiculos");
        let inputMarca= document.getElementById("selectVehiculosMarca");
        const options = {
            method: 'POST', 
            body: JSON.stringify({
                script_name:'script_turnos.py',
                option:'vehiculo_tipo',
                tipo:inputTipo.value,
                marca: inputMarca.value
            }),
             headers:{ 'Content-Type': 'application/json','Authorization': 'Bearer '+ userJwt}
        };
        loadingService();
        let respuesta = await fetch(url + urlScripts, options);
        let data = await respuesta.json();
        if(data.error){
            errorAlert(data)
        }else{
            Swal.close();
            let list =data.response.data
            let selectVehiculosModelo= document.getElementById("selectVehiculosModelo")
            selectVehiculosModelo.innerHTML=""; 
            for (let obj in list){
                selectVehiculosModelo.innerHTML += '<option value="'+list[obj]+'">'+list[obj]+'</option>';
            }
            selectVehiculosModelo.value=""
        }
    }
}

function showAgregarEquipo(id, folio){
    limpiarModalEquipos()
    idNuevoEquipoVehiculo=id
    seleccionadoBitacora= dataTableBitacora.find(x => x.folio == folio);
    let selectColor= document.getElementById("selectColorEquipo")
    for(let color of coloresArray){
        selectColor.innerHTML+= '<option value="'+color+'">'+color+'</option>';
    }
    selectColor.value=""
    $('#equiposModal').modal('show');
}

function showAgregarVehiculo(id,folio){
    loadingService()
    limpiarModalVehiculos()
    idNuevoEquipoVehiculo=id
    seleccionadoBitacora= dataTableBitacora.find(x => x.folio == folio);
    $("#idLoadingButtonVehiculos").show();
    $("#idButtonVehiculos").hide();

    let selectColor= document.getElementById("selectColor")
    for(let color of coloresArray){
        selectColor.innerHTML+= '<option value="'+color+'">'+color+'</option>';
    }
    selectColor.value=""

    fetch(url + urlScripts, {
    method: 'POST',
    body: JSON.stringify({
        script_name: "script_turnos.py",
        option: "vehiculo_tipo",
    }),
    headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+userJwt,
    },
    }).then(res => res.json())
    .then(res => {
        if(res.success){
            let data= res.response.data
            if(data.status_code ==400 || data.status_code==401){
                errorAlert(res)
            }else{
                Swal.close()
                let selectVehiculos= document.getElementById("selectVehiculos");
                let list = data
                for (let obj in list){
                    selectVehiculos.innerHTML += '<option value="'+list[obj]+'">'+list[obj]+'</option>';
                    selectVehiculos.value=""
                }
                Swal.close()
                $('#vehiculosModal').modal('show');
            }
        }else{
            errorAlert(res)
        }
    })
}

//FUNCION para guardar equipos entas con checkbox
function agregarEquipo(){
    loadingService()
    $('#equiposModal').modal('hide');
    let dicData = {};
    let validation = false;
    let tipo= $("#selectTipoEquipo").val() ;
    let nombre=$("#inputNombreEquipo").val();
    let marca=$("#inputMarcaEquipo").val();
    let modelo=$("#inputModeloEquipo").val();
    let noserie=$("#inputSerieEquipo").val();
    let color=$("#selectColorEquipo").val();

    let equipo={
        color_articulo: color, 
        numero_serie: noserie, 
        modelo_articulo: modelo, 
        marca_articulo: marca, 
        tipo_equipo: tipo, 
        nombre_articulo:nombre
    }

    if(tipo==''|| nombre=='' ){
        validation=true
    }
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            option: "update_bitacora_entrada",
            script_name:"script_turnos.py",
            equipo: equipo, 
            record_id: idNuevoEquipoVehiculo,
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+userJwt,
        },
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){
            let data= res.response.data
            if(data.status_code ==400 || data.status_code==401){
                    errorAlert(res)
            }else{
                seleccionadoBitacora.equipos.push(equipo)
                tables["tableEntradas"].setData(dataTableBitacora);
                successMsg("Confirmación", "Vehículo agregado correctamente.")
            }
        }else{
            errorAlert(res)
        }

    })
    /*
    if(!validation){
        let id= Math.floor(Math.random() * 1000000)
        let checked='checked'
        selectedEquipos.push(id);
        listItemsData.push({ marca_articulo: marca, tipo_equipo: tipo, modelo_articulo: modelo, color_articulo:color , numero_serie:noserie, id: id, check:checked});
        //let selectedItems= listItemsData.filter(elemento => selectedEquipos.includes(elemento.id));
        let newRow2 = $('<tr>');
        newRow2.append($('<td>').text(tipo));
        newRow2.append($('<td>').text(marca));
        newRow2.append($('<td>').text(modelo));
        newRow2.append($('<td>').text(noserie));
        newRow2.append($('<td>').text(color));
        newRow2.append('<td ><input class="form-check-input checkboxGroupEquipos" type="checkbox" id='+id+' '+checked+'></td>');
        newRow2.append('</tr>');
        $('#listAddItemsModal').append(newRow2);
        //successMsg("Success", "Equipo agregado correctamente, da click en la lista para ver tus equipos agregados.")
        limpiarModalEquipos();
        successMsg("Confirmación","Equipo agregado correctamente, da click en la lista para ver todos los equipos selecionados." )
        $('#equiposModal').modal('hide');
    }else{
        Swal.fire({
            title: "Validación",
            text: "Faltan campos por llenar, completa los campos marcados con asterisco",
            type: "warning"
        });
    } */
}

//FUNCION para saber que vehiculos estan con checkbox
function agregarVehiculo(){
    loadingService()
    let dicData = {};
    let validation = false;
    let tipoVehiculo= $('#selectVehiculos').val();
    let marca= $('#selectVehiculosMarca').val();
    let modelo= $('#selectVehiculosModelo').val();
    let matricula= $('#inputMatriculaVehiculo').val();
    let color= $('#selectColor').val();
    if(tipoVehiculo==''){
        validation=true
    }
    let vehiculo={
        "tipo": tipoVehiculo, 
        "modelo_vehiculo": modelo, 
        "color": color, 
        "placas": matricula, 
        "marca_vehiculo": tipoVehiculo, 
        "nombre_estado": ""
    }
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            option: "update_bitacora_entrada",
            script_name:"script_turnos.py",
            vehiculo: vehiculo, 
            record_id: idNuevoEquipoVehiculo,
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+userJwt,
        },
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){
            let data= res.response.data
            if(data.status_code ==400 || data.status_code==401){
                    errorAlert(res)
            }else{
                $('#vehiculosModal').modal('hide');
                seleccionadoBitacora.vehiculos.push(vehiculo)
                //dataTableBitacora
                //seleccionadoBitacora= dataTableBitacora.find(x => x.folio == folio);
                //vehiculos.push(vehiculo)
                tables["tableEntradas"].setData(dataTableBitacora);
                successMsg("Confirmación", "Vehículo agregado correctamente.")
            }
        }else{
            errorAlert(res)
        }

    })
    /*
    if(!validation){
        let id= Math.floor(Math.random() * 1000000)
        let checked='checked'
        selectedVehiculos.push(id);
        listVehiculesData.push({"tipo_vehiculo":tipoVehiculo ,"marca_vehiculo":marca , "placas_vehiculo":matricula, "color_vehiculo":color, "modelo_vehiculo": modelo, id: id, check: checked})
        let newRow2 = $('<tr>');
        newRow2.append($('<td>').text(tipoVehiculo));
        newRow2.append($('<td>').text(marca));
        newRow2.append($('<td>').text(matricula));
        newRow2.append($('<td>').text(color));
        newRow2.append($('<td>').text(modelo));
        newRow2.append('<td><input class="form-check-input radioGroupItems" type="radio"  name="groupCarList" id='+id+' '+checked+'></td>');
        newRow2.append('</tr>');
        $('#tableCars').append(newRow2);

        limpiarModalVehiculos()
        $("#vehiculosModal").modal('hide');
    }else{
        Swal.fire({
            title: "Validación",
            text: "Faltan campos por llenar, completa los campos marcados con asterisco",
            type: "warning"
        });

    }*/
}

function reloadTableBitacoras(data){
    if(data){
        dataTableBitacora=[]
       //dataTableLocker=[]
        if(user !='' && userJwt!=''){
            let lista= data
            if(lista.length>0){
                for (let bitacora of lista){
                    dataTableBitacora.push({
                    folio:bitacora.folio ,
                    fecha_entrada:bitacora.fecha_entrada ,
                    nombre_visitante:bitacora.nombre_visitante, 
                    perfil_visita:bitacora.perfil_visita,
                    contratista:bitacora.contratista,
                    status_gafete:bitacora.status_gafete, 
                    visita_a:bitacora.visita_a, 
                    caseta_entrada:bitacora.caseta_entrada,
                    caseta_salida:bitacora.nombre_area_salida, 
                    fecha_salida:bitacora.fecha_salida,
                    comentarios:bitacora.comentarios||[] , 
                    equipos: bitacora.equipos, 
                    vehiculos: bitacora.vehiculos, 
                    foto: bitacora.foto, 
                    identificacion: bitacora.identificacion, 
                    documento: bitacora.documento||"" , 
                    visita_a: bitacora.visita_a||"" , 
                    perfil_visita: bitacora.perfil_visita||"" ,
                    id: bitacora._id, 
                    motivo_visita:bitacora.motivo_visita, 
                    grupo_areas_acceso:bitacora.grupo_areas_acceso, 
                    codigo_qr: bitacora.codigo_qr , 
                    status_visita:bitacora.status_visita,
                    id_gafet:bitacora.id_gafet
                })
                }
            }
            console.log("LKAROGOO", dataTableBitacora.length)
            if(tables['tableEntradas']){
                tables['tableEntradas'].setData(dataTableBitacora)
            }else{
                drawTable('tableEntradas',columsData1,dataTableBitacora);
            }
            /*
            if(tables['tableSalidas']){
                tables['tableSalidas'].setData(dataTableLocker)
            }else{
                drawTable('tableSalidas',columsData2,dataTableLocker);
            }*/
        }else{
            redirectionUrl('login',false);
        }
    }
}

function reloadTableLockers(data){
    //dataTableBitacora=[]
    dataTableLocker=[]
    if(user !='' && userJwt!=''){
        let lista= data
        if(lista>0){
            for (bitacora of lista){
                dataTableLocker.push({})
            }
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
                let lista= res.response.data
                for (bitacora of lista){
                    dataTableBitacora.push({folio:bitacora.folio ,
                    fecha_entrada:bitacora.fecha_entrada ,
                    nombre_visitante:bitacora.nombre_visitante, 
                    perfil_visita:bitacora.perfil_visita,
                    contratista:bitacora.contratista,
                    status_gafete:bitacora.status_gafete, 
                    visita_a:bitacora.visita_a, 
                    caseta_entrada:bitacora.caseta_entrada,
                    caseta_salida:bitacora.nombre_area_salida || '', 
                    fecha_salida:bitacora.fecha_salida || '',
                    comentarios:bitacora.comentarios||[] , 
                    equipos: bitacora.equipos, 
                    vehiculos: bitacora.vehiculos, 
                    foto: bitacora.foto, 
                    foto_url: bitacora.foto_url || '', 
                    identificacion_url: bitacora.file_url || '',
                    identificacion: bitacora.identificacion, 
                    documento: bitacora.documento||"" , 
                    visita_a: bitacora.visita_a||"" , 
                    perfil_visita: bitacora.perfil_visita||"" ,
                    id: bitacora._id, 
                    motivo_visita:bitacora.motivo_visita, 
                    grupo_areas_acceso:bitacora.grupo_areas_acceso , 
                    codigo_qr: bitacora.codigo_qr, 
                    status_visita:bitacora.status_visita,
                    id_gafet:bitacora.id_gafet
                })
                }
                drawTable('tableEntradas',columsData1,dataTableBitacora);
                drawTable('tableSalidas',columsData2,dataTableLocker);
            }else{
                redirectionUrl('login',false);
            }
        } 
    });
}

function openDataModal(folio){
    $('#documento').text('')
    /*
    fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name:"script_turnos.py",
                option:"get_detail_user",
                curp_code:"JDUC78946456464"
            }),
            headers:{
               'Content-Type': 'application/json',
               'Authorization': 'Bearer '+userJwt
            },
        })
        .then(res => res.json())
        .then(res => {
        })
    */

    let registroSeleccionado = dataTableBitacora.find(x => x.folio == folio);
    $("#nombredevisitante").text(registroSeleccionado.nombre_visitante ||"")
    $("#motivodevisita").text(registroSeleccionado.motivo_visita||"" )
    registroSeleccionado.foto = registroSeleccionado.foto_url || ''
    registroSeleccionado.identificacion = registroSeleccionado.identificacion_url || ''
    if(registroSeleccionado.documento !==""){
        $("#tituloDocumento").show()
        $("#documento").text(registroSeleccionado.documento ||"")
    }else{
        $("#tituloDocumento").hide()
    }

     if(registroSeleccionado.a_quien_visita !==""){
        $("#tituloaquienvisita").show()
        $("#aquienvisita").text(registroSeleccionado.a_quien_visita||"" )
    }else{
        $("#tituloaquienvisita").hide()
    }

    if(registroSeleccionado.hasOwnProperty('foto')){
        if(registroSeleccionado.foto !== null && registroSeleccionado.foto !== undefined &&  registroSeleccionado.foto.length>0){
            $("#imgUser").attr('src',registroSeleccionado.foto_url);
        }else{
            $("#imgUser").attr('src',"https://f001.backblazeb2.com/file/app-linkaform/public-client-20/None/5ea35de83ab7dad56c66e045/64eccb863340ee1053751c1f.png");
        }
    }
    if(registroSeleccionado.hasOwnProperty('identificacion')){
        if(registroSeleccionado.identificacion !== null && registroSeleccionado.identificacion !== undefined && registroSeleccionado.identificacion.length>0){
            $("#imgIdentificacion").attr('src',registroSeleccionado.identificacion_url);
        }else{
            $("#imgIdentificacion").attr('src',"https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65dd1061092cd19498857933.jpg");
        }
    }
    let listaAccesos=[]
    let listaComentarios=[]
    //let listaDocumentos=[]
    let listaEquipos=[]
    let listaVehiculos=[]
    /*
    let tableDocumentos = document.getElementById("tableDocumentos");
    let tbody5 = tableDocumentos.getElementsByTagName("tbody")[0];
    tbody5.innerHTML="";*/

    let tableComentarios = document.getElementById("tableComentarios");
    let tbody1 = tableComentarios.getElementsByTagName("tbody")[0];
    tbody1.innerHTML="";

    let tableAccesos = document.getElementById("tableAccesos");
    let tbody2 = tableAccesos.getElementsByTagName("tbody")[0];
    tbody2.innerHTML="";

    let tableEquipos = document.getElementById("tableEquipos");
    let tbody3 = tableEquipos.getElementsByTagName("tbody")[0];
    tbody3.innerHTML="";

    let tableVehiculos = document.getElementById("tableVehiculos");
    let tbody4 = tableVehiculos.getElementsByTagName("tbody")[0];
    tbody4.innerHTML="";

    $('#tableComentarios').innerHTML=""
    $('#tableAccesos').innerHTML=""
    $('#tableEquipos').innerHTML=""
    $('#tableVehiculos').innerHTML=""
    //$('#tableDocumentos').innerHTML=""

//tabla comentarios
    /*let docu=""
    if(registroSeleccionado.hasOwnProperty('documento')){
        docu = registroSeleccionado.documento !==""? registroSeleccionado.documento : ""
    }
    if(docu==""){
        let newRow = $('<tr>');
        newRow.append($('<td>').text("No existen documentos"));
        newRow.append('</tr>');
        $('#tableDocumentos').append(newRow);
    }else{
        let newRow1 = $('<tr>');
        newRow1.append($('<td>').text(docu));
        newRow1.append('</tr>');
        $('#tableDocumentos').append(newRow1);
    }
    */
    //tabla comentarios
    if(registroSeleccionado.hasOwnProperty('comentarios')){
        console.log("REGISTRO SELECIONADO", registroSeleccionado)
        tableComentarios = registroSeleccionado.comentarios.length > 0 ? registroSeleccionado.comentarios  : [];
    }
    for (var i = 0; i < tableComentarios.length; i++) {
            let newRow = $('<tr>');
            newRow.append($('<td>').text(tableComentarios[i].comentario));
            newRow.append($('<td>').text(tableComentarios[i].tipo_comentario));
            newRow.append('</tr>');
            $('#tableComentarios').append(newRow);
    }
    if(tableComentarios.length==0){
        let newRow = $('<tr>');
        newRow.append($('<td>').text("No existen comentarios"));
        newRow.append($('<td>'));
        newRow.append('</tr>');
        $('#tableComentarios').append(newRow);
    }

    //tabla accesos
    if(registroSeleccionado.hasOwnProperty('grupo_areas_acceso')){
        listaAccesos = registroSeleccionado.grupo_areas_acceso.length > 0 ? registroSeleccionado.grupo_areas_acceso: [];
    }
    console.log("REVISAR",listaAccesos)
    for (let i = 0; i < listaAccesos.length; i++) {
        let newRow = $('<tr>');
        newRow.append($('<td>').text(listaAccesos[i].note_booth||""));
        newRow.append('</tr>');
        $('#tableAccesos').append(newRow);
    }
    if(listaAccesos.length==0){
        let newRow = $('<tr>');
        newRow.append($('<td>').text("No existen accesos permitidos"));
        newRow.append('</tr>');
        $('#tableAccesos').append(newRow);
    }

    //tabla equipo
    if(registroSeleccionado.hasOwnProperty('equipos')){
        listaEquipos = registroSeleccionado.equipos.length > 0 ? registroSeleccionado.equipos: [];
    }
    for (var i = 0; i < listaEquipos.length; i++) {
        var newRow = $('<tr>');
        newRow.append($('<td>').text(listaEquipos[i].tipo_equipo));
        newRow.append($('<td>').text(listaEquipos[i].nombre_articulo));
        newRow.append($('<td>').text(listaEquipos[i].marca_articulo));
        newRow.append($('<td>').text(listaEquipos[i].modelo_articulo));
        newRow.append($('<td>').text(listaEquipos[i].numero_serie));
        newRow.append($('<td>').text(listaEquipos[i].color_articulo));
        newRow.append('</tr>');
        $('#tableEquipos').append(newRow);
    }
    if(listaEquipos.length==0){
        let newRow = $('<tr>');
        newRow.append($('<td>').text("No existen equipos"));
        newRow.append($('<td>'));
        newRow.append($('<td>'));
        newRow.append($('<td>'));
        newRow.append($('<td>'));
        newRow.append($('<td>'));
        newRow.append('</tr>');
        $('#tableEquipos').append(newRow);
    }

    //tabla vehiculos
    if(registroSeleccionado.hasOwnProperty('vehiculos')){
        listaVehiculos = registroSeleccionado.vehiculos.length > 0 ? registroSeleccionado.vehiculos: [];
    }
    for (let i = 0; i < listaVehiculos.length; i++) {
        let newRow = $('<tr>');
        newRow.append($('<td>').text(listaVehiculos[i].tipo));
        newRow.append($('<td>').text(listaVehiculos[i].marca_vehiculo));
        newRow.append($('<td>').text(listaVehiculos[i].modelo_vehiculo));
        newRow.append($('<td>').text(listaVehiculos[i].color));
        newRow.append($('<td>').text(listaVehiculos[i].placas));
        newRow.append('</tr>');
        $('#tableVehiculos').append(newRow);
    }
    if(listaVehiculos.length==0){
        let newRow = $('<tr>');
        newRow.append($('<td>').text("No existen vehiculos"));
        newRow.append($('<td>'));
        newRow.append($('<td>'));
        newRow.append($('<td>'));
        newRow.append($('<td>'));
        newRow.append('</tr>');
        $('#tableVehiculos').append(newRow);
    }

    $("#nombreDelJefe").text("")
    $("#vigencia").text("")
    $("#status").text("")
    $("#motivoDeVisita").text("")
    $("#aQuienVisita").text("")
    $("#autorizadoPor").text("")
    $("#telefono").text("")

    $('#dataModal').modal('show');
}

function llenarTablasInfoUsuario(){

}

//FUNCION confirmar la salida a un registro individual desde la tabla
function alertSalida(folio, status_visita){
    let statusTurno = getCookie('userTurn')
    if(statusTurno == 'Turno Cerrado' || !statusTurno){
        errorAlert("¡Debes iniciar turno antes de registrar una salida!","Validación","warning" )
        return
    }
    console.log(status_visita, statusVisitaEntrada)
    console.log('Valor de casetaaaa',selectCaseta.value)
    const outLocation = getCookie('userLocation')
    const outCaseta = getCookie('userCaseta')
    if(status_visita== statusVisitaEntrada){
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
                loadingService('Registrando la salida...')
            console.log("SDFSS",result)
                fetch(url + urlScripts, {
                    method: 'POST',
                    body: JSON.stringify({
                        script_name: 'script_turnos.py',
                        option: 'do_out',
                        qr_code: folio,
                        location: outLocation,
                        area: outCaseta
                    }),
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+userJwt
                    },
                })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        let selectedBitacora = dataTableBitacora.find(x => x.codigo_qr === folio);
                        let formatDate = new Intl.DateTimeFormat('sv-SE', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: false
                        }).format(new Date()).replace(',', '');
                        selectedBitacora.fecha_salida = formatDate
                        selectedBitacora.caseta_salida = outCaseta
                        tables["tableEntradas"].setData(dataTableBitacora);
                        let modal = bootstrap.Modal.getInstance(document.getElementById('fallaVer'));
                        Swal.close();
                        successMsg('Confirmación', "Salida confirmada correctamente.", "success")
                        // var table = Tabulator.findTable("#tableEntradas")[0]; 
                        // table.clearData();
                    }else{
                        errorAlert(res)
                    }
                });

                let selectedSalida = dataTableBitacora.find(n => n.folio == parseInt(folio));
               
                if (selectedSalida) {
                    let fecha=  new Date()
                    let año = fecha.getFullYear();
                    let mes = fecha.getMonth() + 1;
                    let dia = fecha.getDate();
                    let horaFormateada = fecha.getHours() + ':' + fecha.getMinutes();
                    let fechaFormateada = dia + '/' + mes + '/' + año + ' ' + horaFormateada;
                    selectedSalida.salida = fechaFormateada;
                    tables["tableEntradas"].setData(dataTableBitacora);
                }
    	    }
    	});
    }else{
        successMsg("Validación", "Este ya registro ya tiene registrada la salida", "warning")
    }
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
//FUNCION rellenar catalogos al momento de escojer una opcion
/*
async function onChangeCatalog(type, id){
    if(type == "vehiculo"){
        let inputMarca= document.getElementById("selectVehiculos");
        const options = {
            method: 'POST', 
            body: JSON.stringify({
                script_name:'script_turnos.py',
                option:'vehiculo_tipo',
                tipo:inputMarca.value
            }),
             headers:{ 'Content-Type': 'application/json','Authorization': 'Bearer '+ userJwt}
        };
        loadingService();
        let respuesta = await fetch(url + urlScripts, options);
        let data = await respuesta.json();
        if(data.error){
            errorAlert(data)
        }else{
            Swal.close();
            let list =data.response.data
            let selectVehiculosMarca= document.getElementById("selectVehiculosMarca")
            selectVehiculosMarca.innerHTML=""; 
            for (let obj in list){
                selectVehiculosMarca.innerHTML += '<option value="'+list[obj]+'">'+list[obj]+'</option>';
            }
            selectVehiculosMarca.value=""
        }
    }else if (type == "marca"){
        let inputTipo= document.getElementById("selectVehiculos");
        let inputMarca= document.getElementById("selectVehiculosMarca");
        const options = {
            method: 'POST', 
            body: JSON.stringify({
                script_name:'script_turnos.py',
                option:'vehiculo_tipo',
                tipo:inputTipo.value,
                marca: inputMarca.value
            }),
             headers:{ 'Content-Type': 'application/json','Authorization': 'Bearer '+ userJwt}
        };
        loadingService();
        let respuesta = await fetch(url + urlScripts, options);
        let data = await respuesta.json();
        if(data.error){
            errorAlert(data)
        }else{
            Swal.close();
            let list =data.response.data
            let selectVehiculosModelo= document.getElementById("selectVehiculosModelo")
            selectVehiculosModelo.innerHTML=""; 
            for (let obj in list){
                selectVehiculosModelo.innerHTML += '<option value="'+list[obj]+'">'+list[obj]+'</option>';
            }
            selectVehiculosModelo.value=""
        }
    }
}
*/

//FUNCION obtener data para rellenar los catalogos
function getCatalogs(){
   /* $("#selectTipoVehiculo-123").prop( "disabled", true );
    $("#divCatalogMarca123").hide();
    $("#divCatalogModelo123").hide();
    
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
    })
    
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
    });*/
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
function asignarGafete(){
    $("#idLoadingButtonAsignarGafete").show();
    $("#idButtonAsignarGafete").hide();
    let numGafete= $("#selectGafete").val();
    console.log("VALOR GAFFF",numGafete)
    let otroDoc= $("#inputOtroDescCard").val();
    //let nombre= $("#nameUserInf").text();
    
    let radios = document.getElementsByName('radioOptionsDocument');
    let radioSeleccionado = "";
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            radioSeleccionado = radios[i];
            break; 
        }
    }
    let data_gafete={
        'status_gafete':'asignar_gafete',
        'ubicacion_gafete':selectLocation.value,
        'caseta_gafete':selectCaseta.value,
        'visita_gafete':seleccionadoBitacora.nombre_visitante,
        'id_gafete':numGafete,
        'documento_gafete':[radioSeleccionado.value],
    }
    console.log(data_gafete)
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: "gafetes_lockers.py",
            option: "new_badge",
            data_gafete: data_gafete,
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
            let data = res.response.data;
            if(data.status_code==400){
                errorAlert(data)
                $("#idLoadingButtonAsignarGafete").hide();
                $("#idButtonAsignarGafete").show();
            }
            else if(data.status_code==201){
                successMsg("Gafete Entregado", "El gafete a sido entregado correctamente.")
                $("#idLoadingButtonAsignarGafete").hide();
                $("#idButtonAsignarGafete").show();
                $("#alert_gafete_modal").hide();
                $("#cardModal").modal('hide')
            }
        }else{
            errorAlert(res)
            $("#idLoadingButtonAsignarGafete").hide();
            $("#idButtonAsignarGafete").show();
        } 
    })

    /*let flaginput = false;
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
    }*/
}


//FUNCION para asignar un nuevo gafete
function setDataGafete(data = {}){
    let codeUser  = $("#inputCodeUser").val();
    let urlLinkaform = 'https://app.linkaform.com/api/infosync/scripts/run/';
    let userJwt = getCookie("userJwt_soter");
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

async function getBitacoraByLocation(location, area){
    loadingService()
    try{
        const res = await fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name: "script_turnos.py",
                option: "list_bitacora",
                location: location,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userJwt
            }
        })
        const data = await res.json()
        if (data.success){
            reloadTableBitacoras(data.response.data)
            loadCatalogsCaseta(location,JSON.parse(getCookie('arrayUserBoothsLocations')).length>0? JSON.parse(getCookie('arrayUserBoothsLocations')): arrayUserBoothsLocations )
            let selectCaseta= document.getElementById("selectCaseta")
            selectCaseta.value = ""
            Swal.close()
        }else{
            Swal.fire({
                title: 'Aviso',
                text: 'Hubo un error al obtener la bitacora',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
    }catch(e){
        throw new Error('Error in lkf', e)
    }
}