let selectLocation;
let colors = getPAlleteColors(12,0)
let selectedEquipos=[]
let selectedVehiculos=[]
let idNuevoEquipoVehiculo=""
window.onload = function(){
	setValueUserLocation('bitacora');
	changeButtonColor();
    fillCatalogs();

	//getCatalogs();
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
        openDataModal(id)
    }else if(type == 'Delivery'){
        $('#deliverModal').modal('show');
    }else if(type == 'equiposModal'){
        showAgregarEquipo(id)
    }else if(type == 'vehiculosModal'){
        showAgregarVehiculo(id)
    }
}

window.addEventListener('storage', function(event) {
    if (event.key === 'cerrarSesion') {
        let protocol = window.location.protocol;
        let host = window.location.host;
        window.location.href =`${protocol}//${host}/solucion_accesos/login.html`;
    }
});

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
    console.log("cambio de catalogo")
    if(type == "vehiculo"){
     console.log("VWEHICULO")
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
        console.log("DATAA RESPONSEE",data)

        if(data.error){
            errorAlert(data)
        }else{
            Swal.close();
            let list =data.response.data
            let selectVehiculosMarca= document.getElementById("selectVehiculosMarca")
            selectVehiculosMarca.innerHTML=""; 
            for (let obj in list){
                console.log("MARCAAAA", list[obj].key[1])
                selectVehiculosMarca.innerHTML += '<option value="'+list[obj].key[1]+'">'+list[obj].key[1]+'</option>';
            }
            selectVehiculosMarca.value=""
        }
    }else if (type == "marca"){
        let inputTipo= document.getElementById("selectVehiculos");
        let inputMarca= document.getElementById("selectVehiculosMarca");
        console.log("DETALLES",inputTipo.value, inputMarca.value)
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
                console.log("MODELOSSS",list[obj].key[2])
                selectVehiculosModelo.innerHTML += '<option value="'+list[obj].key[2]+'">'+list[obj].key[2]+'</option>';
            }
            selectVehiculosModelo.value=""
        }
    }
}

function showAgregarEquipo(id){
    limpiarModalEquipos()
    idNuevoEquipoVehiculo=id
    $('#equiposModal').modal('show');
}

function showAgregarVehiculo(id){
    loadingService()
    limpiarModalVehiculos()
    idNuevoEquipoVehiculo=id
    $("#idLoadingButtonVehiculos").show();
    $("#idButtonVehiculos").hide();

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
                    console.log("OBJ",list[obj].key[0])
                    selectVehiculos.innerHTML += '<option value="'+list[obj].key[0]+'">'+list[obj].key[0]+'</option>';
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
    let color=$("#inputColorEquipo").val();

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
    console.log("el iddd",idNuevoEquipoVehiculo)
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            option: "update_bitacora_entrada",
            record_id: idNuevoEquipoVehiculo,
            script_name:"script_turnos.py",
            action:"create", // create or edit
            vehiculo: {}, 
            equipo: equipo, 
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
        console.log("AGREGAR", listItemsData)
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
    let color= $('#inputColor').val();
    if(tipoVehiculo==''){
        validation=true
    }
    let vehiculo={
        tipo: tipoVehiculo, 
        modelo_vehiculo: modelo, 
        color: color, 
        placas: matricula, 
        marca_vehiculo: tipoVehiculo, 
        nombre_estado: ""
    }
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            option: "update_bitacora_entrada",
            record_id: idNuevoEquipoVehiculo,
            script_name:"script_turnos.py",
            action:"create", // create or edit
            vehiculo: vehiculo, 
            equipo:{}, 
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
    dataTableBitacora=[]
   //dataTableLocker=[]
    if(user !='' && userJwt!=''){
        let bit= data
        for (i of bit){
            dataTableBitacora.push({folio:i.folio ,visitante:i.nombre_visita ,contratista:'LINKAFORM SA DE CV',visita:i.nombre_visita,
            area:i.caseta_entrada,tipo:i.status_visita, entrada:i.bitacora_entrada, salida:i.bitacora_salida,estado:'', 
            punto_acceso:'',credentials:i.gafete,comentario:'',planta:''})
        }
        
        if(tables['tableEntradas']){
            tables['tableEntradas'].setData(dataTableBitacora)
        }else{
            drawTable('tableEntradas',columsData1,dataTableBitacora);
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
                    dataTableBitacora.push({folio:bitacora.folio ,fecha_entrada:bitacora.fecha_entrada ,nombre_visitante:bitacora.nombre_visitante, perfil_visita:bitacora.perfil_visita,
                    contratista:bitacora.contratista,status_gafete:bitacora.status_gafete, visita_a:bitacora.visita_a, caseta_entrada:bitacora.caseta_entrada,caseta_salida:bitacora.caseta_salida, 
                    fecha_salida:bitacora.fecha_salida,comentarios:bitacora.comentarios, equipos: bitacora.equipos, vehiculos: bitacora.vehiculos, foto: bitacora.foto, 
                    identificacion: bitacora.identificacion, documento: bitacora.documento||"" , a_quien_visita: bitacora.a_quien_visita||"" , perfil_visita: bitacora.perfil_visita||"" ,
                    id: bitacora._id, motivo_visita:bitacora.motivo_visita, grupo_areas_acceso:bitacora.grupo_areas_acceso })
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
            console.log("RESPUESTAAA", res)
        })
    */

    let registroSeleccionado = dataTableBitacora.find(x => x.folio == folio);
    console.log("registroSeleccionado",registroSeleccionado.a_quien_visita, registroSeleccionado)
    $("#nombredevisitante").text(registroSeleccionado.nombre_visitante ||"")
    $("#motivodevisita").text(registroSeleccionado.motivo_visita||"" )
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
            $("#imgUser").attr('src',registroSeleccionado.foto[0].file_url);
        }else{
            $("#imgUser").attr('src',"https://f001.backblazeb2.com/file/app-linkaform/public-client-20/None/5ea35de83ab7dad56c66e045/64eccb863340ee1053751c1f.png");
        }
    }
    if(registroSeleccionado.hasOwnProperty('identificacion')){
        if(registroSeleccionado.identificacion !== null && registroSeleccionado.identificacion !== undefined && registroSeleccionado.identificacion.length>0){
            $("#imgIdentificacion").attr('src',registroSeleccionado.identificacion[0].file_url);
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
    console.log("listaAccesos",listaAccesos)
    for (let i = 0; i < listaAccesos.length; i++) {
        let newRow = $('<tr>');
        newRow.append($('<td>').text(listaAccesos[i].nombre_area||""));
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
        console.log("AL CAMBIO",type, id)
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
        console.log("DETALLES",inputTipo.value, inputMarca.value)
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
                console.log("OBJ",list[obj])
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