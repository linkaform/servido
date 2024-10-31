let listItemsData = []
let listVehiculesData = []
let listNewVehicules = []
let listNewItems = []
let idScr=119197;
let opScriptCatalog='catalog_brands';
let colors = getPAlleteColors(12,0)
let dataCatalogs="";
let listUserActives = [];
let urlImgCard = '';
let urlImgUser = '';
let flagVideoCard = false;
let flagVideoUser = false;
let codeUserVisit=""
//let userJwt = getCookie("userJwt");
let selectedEquipos=[]
let selectedVehiculos=[]
let comentariosPase=[]
let comentariosAcceso=[]
let fullData=""
let selectLocation= ""
let selectCaseta =""
let codeUser =""
let listInstructions = []
let tipoMovimiento=""
let fotosNuevaVisita={foto:[], identificacion:[]}
let paseDeAccesoScript= "pase_de_acceso.py"
let gafeteRegistroIngreso={}
let gafeteId=""
let currentStream = null;
let data_for_msj={}


window.onload = function(){
    setValueUserLocation('accesos');
    changeButtonColor(); 
    fillCatalogs();
    getInitialData();
    selectLocation= document.getElementById("selectLocation")
    selectCaseta= document.getElementById("selectCaseta")
    setHideElements('dataHide');
    setSpinner(true, 'divSpinner');
    let user = getCookie("userId");
    if(user !='' && userJwt!=''){
        setDataInformation('alerts',data = {})
    }else{
        redirectionUrl('login',false)
    }
    customNavbar(getValueUserLocation(), getCookie('userTurn'));
    //$("#mainSection1").hide()
    $("#cartaUser").hide()
    $('#mainSection2').show()
}

window.addEventListener('storage', function(event) {
    if (event.key === 'cerrarSesion') {
        let protocol = window.location.protocol;
        let host = window.location.host;
        window.location.href =`${protocol}//${host}/solucion_accesos/login.html`;
    }
});

//funcion Escojer modales
function setModal(type = 'none',id ="", nombre='', email=''){
    if(type == 'comentarioPaseModal'){
        $("#idComentarioPase").val("")
        $('#commentarioPaseModal').modal('show');
    }else if(type == 'comentarioAccesoModal'){
        $("#idComentarioAcceso").val("")
        $('#commentarioAccesoModal').modal('show');
    }else if(type == 'equiposModal'){
        abrirAgregarEquipo()
    }else if(type == 'vehiculosModal'){
        abrirAgregarVehiculo()
    }else if(type== "listaPases"){
        verListaPasesActivos()
    }else if(type=="nuevaVisitaModal"){
        limpiarTomarFoto('User')
        limpiarTomarFoto('Card')
        abrirModalNuevaVisita()
    }else if(type=="gafeteModal"){
        abrirAsignarGafeteModal()
    }else if(type=="recibirGafete"){
        abrirRecibirGafeteModal()
    }else if(type== "listaPasesTemporales"){
        $("#cartaUser").hide();
        verListaPasesTemporales()
    }else if (type== "phoneModal"){
        verModalPhone(nombre, email)
    }else if (type== "messageModal"){
        verModalMessageModal(nombre,email)
    }
     
}

function verModalPhone(nombre, email){
    $("#phoneModal").modal("show")
    if(email){
        successMsg("Validación", "El email no ha sido configurado para esta persona.","warning")
    }else{

    }
}


function enviarMensaje(){
    loadingService()
    data_for_msj.mensaje= $("#msj").val()
    data_for_msj.titulo= $("#titulo").val()
    data_for_msj.email_from= getCookie('userEmail')
    if(data_for_msj.mensaje=="" && data_for_msj.titulo!=="" && data_for_msj.email_from!=="" && data_for_msj.email_to!==""){
        successMsg("Validación", "Faltan campos por llenar", "warning")
    }else{
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name: "script_turnos.py",
                option: 'enviar_msj',
                data_msj: data_for_msj
            }),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+userJwt
            },
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                Swal.close()
                successMsg('Confirmación', "Correo enviado correctamente.", "success")
                $("#messageModal").modal("hide")
            } else{
                errorAlert(res)
            }
        });
    }
}

function verModalMessageModal(nombre, email){
    data_for_msj={nombre: nombre, email_to: email, mensaje:''}
    $("#textMsjNombre").text(nombre)
    $("#textMsjCorreo").text(email)
    $("#msj").val("")
    $("#messageModal").modal("show")
}

function limpiarTomarFoto(id){
    $("#container"+id+" video").remove()
    if(id=="User"){
        flagVideoUser=false
        fotosNuevaVisita.foto = []
    }else if(id=="Card"){
        flagVideoCard=false
        fotosNuevaVisita.identificacion = []
    }
    currentStream=null
    $('#buttonTake'+id).show();
    $('#buttonTake'+id).prop('disabled', false);
    $('#buttonSave'+id).hide();
    $('#img'+id).hide();
    $('#img'+id).attr('src', '');
    $('#inputFile'+id).val('');
}

function limpiarSeleccion(type, id=""){
    if(type =='vehiculos'){
        $('table input[name="groupCarList"]').prop('checked', false); 
    }else{
        if(id!==""){
            $(`#`+id).prop('checked', false);
        }else{
            $('table input[name="equipoCheckGroup"]').prop('checked', false); 
        }
    }
}

function verListaPasesTemporales(){
    setCleanData()
    loadingService()
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: "script_turnos.py",
            option: 'lista_pases',
            caseta: selectCaseta.value,
            location: selectLocation.value,
            inActive:"true"
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
            let listPases = res.response.data
            let formatedList=[]
            console.log()
            for(let obj of listPases){
                formatedList.push({nombre: obj.nombre, folio: obj.folio, qr_code: obj.qr_code, ubicacion: obj.ubicacion, foto: obj.foto})
            }

            if(user!="" && userJwt!=""){
                drawTableSelect('tableListaPases',columsListaPases, formatedList,"500px",1);
                $("#listaPasesTitulo").text("Lista de Pases Temporales")
                $("#listModal").modal('show');
            }

            tables["tableListaPases"].on("rowSelectionChanged", function(data, rows){
                if (rows.length > 0) {
                    $("#inputCodeUser").val(data[0].qr_code);
                    if(data[0].qr_code!==""){
                        //setSpinner(true, 'divSpinner');
                        $("#divSpinner").show();
                        buscarPaseEntrada();
                    }
                    $("#listModal").modal('hide');
                }
            });
        } 
    });
}


function abrirRecibirGafeteModal(){
    //let selectedSalida = dataTableLocker.find(n => n.folio == parseInt(folio));
    Swal.fire({
        title:'¿Está seguro de recibir gafete?',
        html:`
        <div class="m-1"> Al recibir el gafete, se desocupara el gafete y el locker y se retiraran los documentos pertienentes </div>`,
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
            gafeteId= $("#gafete").text()
            successMsg("Confirmación", "Gafete recibido correctamente.", "success")
        }
    })
}


function abrirNuevaVisita(){
}


function abrirAsignarGafeteModal(){
    loadingService()
    $('input[name="radioOptionsDocument"]').each(function() {
        if ($(this).val() === gafeteRegistroIngreso.documento_garantia) {
            $(this).prop('checked', true);
        } else {
            $(this).prop('checked', false); // Opcional: para deseleccionar otros
        }
    });
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            option: "get_lockers",
            script_name: "gafetes_lockers.py",
            location: selectLocation.value,
            area: selectCaseta.value,
            status: statusDisponible,
            tipo_locker:"Identificaciones"
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
            let data= res.response.data
            let selectLockers= document.getElementById("selectLocker") 
            selectLockers.innerHTML=""; 
            for(let loc of data){ 
                    selectLockers.innerHTML += '<option value="'+loc.locker_id  +'">'+loc.locker_id+'</option>';
            }
            if(data.length==0){
                 selectLockers.innerHTML += '<option disabled> No hay lockers disponibles </option>';
            }
            selectLockers.value = gafeteRegistroIngreso.locker_id
        } 
    });


// lkf_api.update_catalog_multi_record( {'647fd66741b60713bacded7e': days}, 102885, record_id=[record_catalog['_id']])
// self.lkf_api.search_catalog( self.GAFETES_CAT_ID, mango_query)
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
            $("#gafeteModal").modal("show")
            let data= res.response.data
            let selectGaf= document.getElementById("selectGafete") 
            selectGaf.innerHTML=""; 
            for(let gaf of data){
                    selectGaf.innerHTML += '<option value="'+gaf.gafete_id+'">'+gaf.gafete_id+'</option>';
            }
            if(data.length==0){
                 selectGaf.innerHTML += '<option disabled> No hay gafetes disponibles </option>';
            }
            selectGaf.value=gafeteRegistroIngreso.gafete_id
        } 
    });
}

function abrirModalNuevaVisita(){
    loadingService()
    $("#inputNombreNV").val("")
    $("#selectVisitaNV").val("")
    $("#inputAreaVisitaNV").val("")
    $("#selectMotivoVisitaNV").val("")
    $("#imgUser").val("")
    $("#imgCard").val("")
    $("#selectVisitaNV").val("")
    $("#inputFileCard").val("")
    $("#inputFileUser").val("")
    $("#buttonTakeCard").show()
    $("#buttonTakeUser").show()
    $("#buttonTakeCard").prop('disabled', false);
    $("#buttonTakeUser").prop('disabled', false);
    //$("#imgCard").val()
    //$("#imgUser").val()
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: "script_turnos.py",
            option: "assets_access_pass",
            location: selectLocation.value
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+userJwt,
        },
        }).then(res => res.json())
        .then(res => {
            if(res.success){
                let data= res.response.data
                Swal.close()
                $("#newVisitModal").modal('show');
                let selectVisita= document.getElementById("selectVisitaNV");
                let selectAreaVisita= document.getElementById("inputAreaVisitaNV");
                let selectMotivo= document.getElementById("selectMotivoVisitaNV");
                for (let str of data.Visita_a){
                    selectVisita.innerHTML += '<option value="'+str+'">'+str+'</option>';
                }
                selectVisita.value=""
                for (let str of data.Areas){
                    selectAreaVisita.innerHTML += '<option value="'+str+'">'+str+'</option>';
                }
                selectAreaVisita.value=""
                for (let str of data.Perfiles){
                    selectMotivo.innerHTML += '<option value="'+str+'">'+str+'</option>';
                }
                selectMotivo.value=""
            }else{
                errorAlert(res)
            }
        })
}


function verListaPasesActivos(){
    setCleanData()
    loadingService()
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: "script_turnos.py",
            option: 'lista_pases',
            caseta: selectCaseta.value,
            location: selectLocation.value,
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
            let listPases = res.response.data
            let formatedList=[]
            for(let obj of listPases){
                formatedList.push({nombre: obj.nombre, folio: obj.folio, qr_code: obj.qr_code, ubicacion: obj.ubicacion, foto: obj.foto})
            }

            if(user!="" && userJwt!=""){
                drawTableSelect('tableListaPases',columsListaPases, formatedList,"500px",1);
                $("#listaPasesTitulo").text("Lista de Pases Activos")
                $("#listModal").modal('show');
            }

            tables["tableListaPases"].on("rowSelectionChanged", function(data, rows){
                if (rows.length > 0) {
                    $("#inputCodeUser").val(data[0].qr_code);
                    if(data[0].qr_code!==""){
                        //setSpinner(true, 'divSpinner');
                        $("#divSpinner").show();
                        buscarPaseEntrada();
                    }
                    $("#listModal").modal('hide');
                }
            });
        } 
    });
}


function limpiarModalVehiculos(){
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

function limpiarModalEquipos(){
    $("#selectTipoEquipo").val("")
    $("#inputNombreEquipo").val("")
    $("#inputMarcaEquipo").val("")
    $("#inputModeloEquipo").val("")
    $("#inputSerieEquipo").val("")
    $("#inputColorEquipo").val("")
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


function abrirAgregarVehiculo(){
    limpiarModalVehiculos()
    let selectColores = document.getElementById("inputColor")
    for(let color of coloresArray){
        selectColores.innerHTML += '<option value="'+capitalizeFirstLetter(color.toLowerCase()) +'">'+color+'</option>';
    }
    selectColores.value=""
    $("#idLoadingButtonVehiculos").show();
    $("#idButtonVehiculos").hide();

     fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: "script_turnos.py",
            option: "catalog_estado",
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
                    $("#idLoadingButtonVehiculos").hide();
                    $("#idButtonVehiculos").show();
                }else{
                    let selectEstadoVehiculos= document.getElementById("selectEstadoVehiculo");
                    let list = data
                    for (let obj in list){
                        selectEstadoVehiculos.innerHTML += '<option value="'+list[obj]+'">'+list[obj]+'</option>';
                    }
                    selectEstadoVehiculos.value=""
                }
            }else{
                errorAlert(res)
                $("#idLoadingButtonVehiculos").hide();
                $("#idButtonVehiculos").show();
            }
        })

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
                    $("#idLoadingButtonVehiculos").hide();
                    $("#idButtonVehiculos").show();
                }else{
                    //Swal.close()
                    $('#vehiculosModal').modal('show');
                    $("#idLoadingButtonVehiculos").hide();
                    $("#idButtonVehiculos").show();
                    let selectVehiculos= document.getElementById("selectVehiculos");
                    let list = data
                    for (let obj in list){
                        selectVehiculos.innerHTML += '<option value="'+list[obj]+'">'+list[obj]+'</option>';
                    }
                    selectVehiculos.value=""
                }
            }else{
                errorAlert(res)
                $("#idLoadingButtonVehiculos").hide();
                $("#idButtonVehiculos").show();
            }
        })
}


function abrirAgregarEquipo(){
    limpiarModalEquipos()
    $('#equiposModal').modal('show');
    let selectColores = document.getElementById("inputColorEquipo")
    for(let color of coloresArray){
        selectColores.innerHTML += '<option value="'+color.toLowerCase()+'">'+color+'</option>';
    }
    selectColores.value=""
}
//FUNCION para saber que vehiculos estan con checkbox
function agregarVehiculo(){
    let dicData = {};
    let validation = false;
    let tipoVehiculo= $('#selectVehiculos').val();
    let marca= $('#selectVehiculosMarca').val();
    let modelo= $('#selectVehiculosModelo').val();
    let matricula= $('#inputMatriculaVehiculo').val();
    let color= $('#inputColor').val();
    let nombreEstado= $("#selectEstadoVehiculo").val();
    if(tipoVehiculo==''){
        validation=true
    }
    if(!validation){
        let id= Math.floor(Math.random() * 1000000)
        let checked='checked'
        selectedVehiculos.push(id);
        listVehiculesData.push({"tipo_vehiculo":tipoVehiculo ,"marca_vehiculo":marca , "placas_vehiculo":matricula, 
            "color_vehiculo":color, "modelo_vehiculo": modelo, "nombre_estado": nombreEstado, id: id, check: checked})
        if(listVehiculesData.length==1){
            let tbody = document.querySelector('#tableCars tbody');
            tbody.innerHTML = '';
        }
        let newRow2 = $('<tr>');
        newRow2.append($('<td>').text(tipoVehiculo));
        newRow2.append($('<td>').text(marca));
        newRow2.append($('<td>').text(matricula));
        newRow2.append($('<td>').text(color));
        newRow2.append($('<td>').text(modelo));
        newRow2.append('<td><input class="form-check-input radioGroupItems" style="margin: auto!important; display: block!important;" type="radio"  name="groupCarList" id='+id+' '+checked+'></td>');
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

    }
}

//FUNCION para guardar equipos entas con checkbox
function agregarEquipo(){
    let dicData = {};
    let validation = false;
    let tipo= $("#selectTipoEquipo").val() ;
    let nombre=$("#inputNombreEquipo").val();
    let marca=$("#inputMarcaEquipo").val();
    let modelo=$("#inputModeloEquipo").val();
    let noserie=$("#inputSerieEquipo").val();
    let color=$("#inputColorEquipo").val();
    if(tipo==''|| nombre=='' ){
        validation=true
    }
    if(!validation){
        let id= Math.floor(Math.random() * 1000000)
        let checked='checked'
        selectedEquipos.push(id);
        listItemsData.push({ marca_articulo: marca, nombre_articulo: nombre, tipo_equipo: tipo, modelo_articulo: modelo, color_articulo:color , numero_serie:noserie, id: id, check:checked});
        //let selectedItems= listItemsData.filter(elemento => selectedEquipos.includes(elemento.id));
        if(listItemsData.length==1){
            let tbodyEq = document.querySelector('#tableEquipos tbody');
            tbodyEq.innerHTML = '';
        }
        let newRow2 = $('<tr>');
        newRow2.append($('<td>').text(tipo));
        newRow2.append($('<td>').text(nombre));
        newRow2.append($('<td>').text(marca));
        newRow2.append($('<td>').text(modelo));
        newRow2.append($('<td>').text(noserie));
        newRow2.append($('<td>').text(color));
        newRow2.append('<td><input class="form-check-input checkboxGroupEquipos" name="equipoCheckGroup" style="margin: auto !important; display: block !important;" type="checkbox" id='+id+' '+checked+'></td>');
        newRow2.append('</tr>');
        $('#listAddItemsModal').append(newRow2);
        $("#tableEquipos").append(newRow2)
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
    }
}

function borrarEquipoAgregado(){

}

function borrarVehiculoSeleccionado(tableId, objId=""){
    if(tableId=='tableAddCarsModal'){
        let tabla = document.getElementById(tableId);
        let tbody = tabla.getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';
        limpiarSeleccion('vehiculos')
        verListaDeEquiposAgregados(false)
    }else{
        limpiarSeleccion('equipos', objId)
        verListaDeEquiposAgregados(false)
    }
}


function verListaDeEquiposAgregados(showModal=true){
    selectedEquipos=[]
    getSelectedCheckbox('tableEquipos', 'checkboxGroupEquipos', selectedEquipos)
    let selectedItems= listItemsData.filter(elemento => selectedEquipos.includes(elemento.id));
    if(showModal){$('#listAddItemsModal').modal('show')};
    let tabla = document.getElementById('tableAddItemsModal');
    let tbody = tabla.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    if(selectedItems.length>0 ){
        for (var i = 0; i < selectedItems.length; i++) {
            let tipoCar = selectedItems[i].tipo_equipo;
            let nombreEquipo = selectedItems[i].nombre_articulo;
            let marcaCar = selectedItems[i].marca_articulo;
            let modeloCar = selectedItems[i].modelo_articulo;
            let numeroSerie = selectedItems[i].numero_serie;
            let colorCar = selectedItems[i].color_articulo;
            var newRow = $('<tr>');
            newRow.append($('<td>').text(tipoCar));
            newRow.append($('<td>').text(nombreEquipo));
            newRow.append($('<td>').text(marcaCar));
            newRow.append($('<td>').text(modeloCar));
            newRow.append($('<td>').text(numeroSerie));
            newRow.append($('<td>').text(colorCar));
            newRow.append(`  
                <td >
                <button class="btn" style="margin: auto !important; display: block !important; background-color: transparent; 
                color: black; border: none;" onclick="borrarVehiculoSeleccionado('tableAddItemsModal', '${selectedItems[i].id}' )">
                    <i class="fas fa-trash"></i>
                </button>
            </td></td >`)
            newRow.append('</tr>');
            $('#tableAddItemsModal').append(newRow)
        }
    } else if(selectedItems.length==0){
        var newRow = $('<tr>');
        newRow.append($('<td colspan="3">').text('No existen equipos seleccionados.'));
        newRow.append('</tr>');
        
        $('#tableAddItemsModal').append(newRow)
    }
    if(showModal){$("#listAddItemsModal").modal('show')}
}

function verListaDeVehiculosAgregados(showModal=true){
    selectedVehiculos=[]
    getSelectedCheckbox('tableCars', 'radioGroupItems', selectedVehiculos)
    let selectedVehiculo= listVehiculesData.filter(elemento => selectedVehiculos.includes(elemento.id));
    if(showModal){$('#listAddCarsModal').modal('show');}
    let tabla = document.getElementById('tableAddCarsModal');
    let tbody = tabla.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    if(selectedVehiculo.length>0 ){
        for (var i = 0; i < selectedVehiculo.length; i++) {
            let tipoCar = selectedVehiculo[i].tipo_vehiculo;
            let marcaCar = selectedVehiculo[i].marca_vehiculo;
            let modeloCar = selectedVehiculo[i].modelo_vehiculo;
            let matriculaCar = selectedVehiculo[i].placas_vehiculo;
            let colorCar = selectedVehiculo[i].color_vehiculo;
            var newRow = $('<tr>');
            newRow.append($('<td>').text(tipoCar));
            newRow.append($('<td>').text(marcaCar));
            newRow.append($('<td>').text(modeloCar));
            newRow.append($('<td>').text(matriculaCar));
            newRow.append($('<td>').text(colorCar));
            newRow.append(`  
                <td >
                <button class="btn" style="margin: auto !important; display: block !important; background-color: transparent; color: black; border: none;" onclick="borrarVehiculoSeleccionado('tableAddCarsModal')">
                    <i class="fas fa-trash"></i>
                </button>
            </td></td >`)
            newRow.append('</tr>');
            $('#tableAddCarsModal').append(newRow);
        }
    } else if(selectedVehiculo.length==0){
        var newRow = $('<tr>');
        newRow.append($('<td colspan="3">').text('No hay vehículo seleccionado.'));
        newRow.append('</tr>');
        $('#tableAddCarsModal').append(newRow);
    }
    if(showModal){$("#listAddCarsModal").modal('show');}
}


function getSelectedCheckbox(tableId, classCheckbox, checkboxesSeleccionados){
    let group= document.querySelectorAll('.'+classCheckbox)
    group.forEach(checkbox => {
        if(checkbox.checked){
            checkboxesSeleccionados.push(parseInt(checkbox.id))
        }
  });
    //return checkboxesSeleccionados
}

function agregarComentarioPaseAcceso(type){  
    if(type== "acceso"){
        let comentario = $("#idComentarioAcceso").val()
        comentariosAcceso.push({comentario_pase:comentario ,tipo_de_comentario:tipoMovimiento})
        let tabla = document.getElementById("tableComentariosAcceso");
        let tbody = tabla.getElementsByTagName("tbody")[0];
        tbody.innerHTML="";
        
        for (var i = 0; i < comentariosAcceso.length; i++) {
            var newRow = $('<tr>');
            newRow.append($('<td>').text(comentariosAcceso[i].comentario_pase));
            newRow.append($('<td>').text(comentariosAcceso[i].tipo_de_comentario));
            newRow.append('</tr>');
            $('#tableComentariosAcceso').append(newRow);
        }
        
        $("#commentarioAccesoModal").modal('hide')
        successMsg("Confirmación", "Comentario listo para agregar al registro de ingreso")
    }else{
        let comentario = $("#idComentarioPase").val()
        let tabla = document.getElementById("tableInstructions");
        let tbody = tabla.getElementsByTagName("tbody")[0];
        tbody.innerHTML="";

        for (var i = 0; i < listInstructions.length; i++) {
            var newRow = $('<tr>');
            newRow.append($('<td>').text(listInstructions[i].comentario_pase));
            newRow.append($('<td>').text(listInstructions[i].tipo_de_comentario));
            newRow.append('</tr>');
            $('#tableInstructions').append(newRow);
        }
        comentariosPase.push({comentario_pase:comentario ,tipo_de_comentario:tipoMovimiento})
        for (let i = 0; i < comentariosPase.length; i++) {
            let newRow = $('<tr>');
            newRow.append($('<td>').text(comentariosPase[i].comentario_pase));
            newRow.append($('<td>').text(comentariosPase[i].tipo_de_comentario));
            newRow.append('</tr>');
            $('#tableInstructions').append(newRow);
        }
        if(comentariosPase.length == 0){
            var newRow = $('<tr>');
            newRow.append($('<td>').text('No existen comentarios/ instrucciones'));
            newRow.append($('<td>'));
            newRow.append('</tr>');
            $('#tableInstructions').append(newRow);
        }
        $("#commentarioPaseModal").modal('hide')
        successMsg("Confirmación", "Comentario listo para agregar al registro de ingreso")
    }
}

function showCommentarioAccesoModal(){
    loadingService()
    fetch(url + urlScripts ,{
        method: 'POST',
        body: JSON.stringify({
            script_name: "script_turnos.py",
            option: "vehiculo_tipo",
            tipo :"Automóvil",
            //marca :"CHEVROLET"
        }),
        headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+userJwt
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {

        } else{
            errorAlert(res)
        }
    })
}
 
function showCommentarioPaseModal(){
    loadingService()   
}

//FUNCION Obtener data inicial informacion de la caseta
function getInitialData(){
    let valueCaseta = getCookie('userCaseta')
    let valueLocation =  getCookie('userLocation')
    /*
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_id: idScr,
            option: 'get_initialData',
            caseta: valueCaseta,
            location: valueLocation
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
    });*/
    let boothStats = load_shift_json.booth_stats.access
    $("#textVisitasEnElDia").text(boothStats.visits_per_day);
    $("#textPersonalDentro").text(boothStats.staff_indoors);
    $("#textVehiculosDentro").text(boothStats.vehicles_inside);
    $("#textSalidasRegistradas").text(boothStats.registered_exits);
}


//FUNCION para asignar nueva visita
function crearNuevaVisita(){
    loadingService()
    let nombre=$("#inputNombreNV").val();
    let empresa=$("#inputRazonSocialNV").val();
    let areaQueVisita=$("#inputAreaVisitaNV").val();
    let visitaA=$("#selectVisitaNV").val();
    let motivoVisita=$("#selectMotivoVisitaNV").val();
    if(nombre!=='' , empresa!=='', areaQueVisita!=='', visitaA!=='', motivoVisita!==''){
        let access_pass={
            nombre: nombre,
            perfil_pase:"Walkin",
            telefono: "",
            visita_a:visitaA,
            email: getCookie("userEmail"),
            empresa: empresa,
            foto:fotosNuevaVisita.foto,
            identificacion: fotosNuevaVisita.identificacion,
            //area_que_visita:areaQueVisita,
            //motivo_visita:motivoVisita,
        }
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name: paseDeAccesoScript,
                option: 'create_access_pass',
                location:selectLocation.value,
                access_pass: access_pass
            }),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+userJwt
            },
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                let data= res.response.data
                if(data.status_code ==400 || data.status_code==401){
                    errorAlert(res)
                    //$("#idLoadingButtonVehiculos").hide();
                    //$("#idButtonVehiculos").show();
                }else{
                    Swal.close()
                    Swal.fire({
                        title: "Validación",
                        text: "NUeva visita registrada",
                        type: "success"
                    });
                    successMsg("Confirmación","Nueva visita registrada exitosamente" )
                    codeUserVisit= Date.now();
                    let inputCode = document.getElementById("inputCodeUser");
                    $("#inputCodeUser").val(data.json.id);
                    if(data.json.id!==""){
                        //setSpinner(true, 'divSpinner');
                        $("#divSpinner").show();
                        buscarPaseEntrada();
                    }
                    //$("#listModal").modal('hide');
                    //inputCode.value= codeUserVisit
                    $("#newVisitModal").modal('hide')
                }
                    //
                //CODE una vez resulta la imagen, cargarla en front                
            } 
        });
        
    }else{
        Swal.fire({
            title: "Validación",
            text: "Faltan campos por llenar, completa los campos marcados con asterisco",
            type: "warning"
        });
    }
}
                                                                                                                                         
//FUNCION para obtener la informacion del usuario
function buscarPaseEntrada() {
    setCleanData()
    $("#mainSection1").hide()
    gafeteId=""
    gafeteRegistroIngreso={}
    $(document).ready(function() {
        $("#buttonBuscarPaseEntrada").prop('disabled', true);
        $("#buttonNew").prop('disabled', true);
        $("#pasesTemporales").prop('disabled', true);
        $("#pasesActivos").prop('disabled', true);
    })
    codeUser = $("#inputCodeUser").val();
    if(codeUser ==""){
        successMsg("Validación", "Escribe un codigo para continuar", "warning")
        $(document).ready(function() {
            $("#buttonBuscarPaseEntrada").prop('disabled', false);
            $("#buttonNew").prop('disabled', false);
            $("#pasesTemporales").prop('disabled', false);
            $("#pasesActivos").prop('disabled', false);
        })
    }else{
        $("#divSpinner").show();
        $("#mainSection1").hide();

        //setHideElements('dataHide');
        //setHideElements('buttonsOptions');
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name: "script_turnos.py",
                option: 'search_access_pass',
                location: selectLocation.value,
                area: selectCaseta.value,
                qr_code: codeUser
            }),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+userJwt,
            },
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                fullData= res.response.data
                Swal.close()
                $("#cartaUser").show(); 
                setDataInformation('informatioUser', res.response.data);
                setHideElements('buttonsModal');
                setHideElements('dataShow');
                setHideElements(fullData.tipo_movimiento) //Oculta o muestra los botones correspondientes dependiendo de si es Entrada o Salida
            }else{
                errorAlert(res)
                setCleanData();
                setHideElements('dataHide');
                $("#buttonNew").show();
                $("#divSpinner").hide();
                $("#inputCodeUser").val("")
                $("#idComentarioPase").val('')
                $("#idComentarioAcceso").val('')
                $("#buttonBuscarPaseEntrada").prop('disabled', false);
                $("#buttonNew").prop('disabled', false);
                $("#pasesTemporales").prop('disabled', false);
                $("#mainSection1").show();
                $("#pasesActivos").prop('disabled', false);
                /*$("#pasesTemporales").show();*/
            }
        })
    }
}

//FUNCION para obtener la lista de usuario
function getDataListUser(){
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_id: 116097,
            option: 'get_list_users',
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
        } 
    })
    let data = {};
    listUserActives = data;
    setDataInformation('listUsers',data)
}

//FUNCION para setear la informacion en la pantalla principal y mostrar botones parte 1
function registrarIngreso(){
    loadingService()
    $("#buttonIn").hide();
    $("#buttonOut").hide();
    
    let location= selectLocation.value
    let area=selectCaseta.value 

    getSelectedCheckbox('tableEquipos', 'checkboxGroupEquipos', selectedEquipos);
    let selectedEq= listItemsData.filter(elemento => selectedEquipos.includes(elemento.id)).map(({ check, id, ...rest }) => rest)

    getSelectedCheckbox('tableEquipos', 'radioGroupItems', selectedVehiculos)
    let selectedVe= listVehiculesData.filter(elemento => selectedVehiculos.includes(elemento.id)).map(({ check, id, ...rest }) => rest);
       


    //let dataItem = {'listItemsData':listItemsData,'listNewItems':listNewItems}
    //let dataVehicule = {'listVehiculesData':listVehiculesData,'listNewVehicules':listNewVehicules}
    let comPase=[]
    let comAcc=[]
    for (let comP of comentariosPase ){
        comPase.push(comP.comentario_pase)
    }
    for (let comA of comentariosAcceso ){
        comAcc.push("a", comA.comentario_pase)
    }
    for (let veh of selectedVe){
        veh.color_vehiculo= veh.color_vehiculo.toLowerCase();
        veh.nombre_estado= veh.nombre_estado.toLowerCase();
    }
    for (let eq of selectedEq){
        eq.color_articulo= eq.color_articulo.toLowerCase();
    }
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: 'script_turnos.py',
            option: 'do_access',
            qr_code: codeUser,
            location: location,
            area: area,
            vehiculo: selectedVe,
            equipo: selectedEq,
            comentario_pase: comentariosPase,
            comentario_acceso: comentariosAcceso,
            gafete:gafeteRegistroIngreso,
            visita_a:fullData.visita_a
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+userJwt,
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            let data = {};
            setHideElements('buttonsModal');
            setDataInformation('informatioUser',data)
            Swal.fire({
                title   :"Exito!",
                text: "Movimiento de usuario registrado",
                icon: "success"
            });

            setCleanData();
            setHideElements('dataHide');
            setHideElements('buttonsOptions');
            setHideElements('buttonNew');
            //$("#buttonAsignarGafete").show();
            //$("#buttonClean").show();
            //$("#buttonOut").show();
            $("#buttonNew").show();
            $("#inputCodeUser").val('');
            $("#buttonAddCommentarioAccesoModal").hide();
        }else{
            errorAlert(res)
            setCleanData();
            setHideElements('dataHide');
            $("#inputCodeUser").val("");
            $("#buttonNew").show();
            $("#buttonAddCommentarioAccesoModal").hide();
        }
    }).catch(error => {
        errorAlert(res)
        console.error(error)
        setCleanData();
        setHideElements('dataHide');
        $("#inputCodeUser").val('');
        $("#buttonNew").show();
        $("#buttonAddCommentarioAccesoModal").hide();
    });
}

function registrarSalida(){
    let location= selectLocation.value
    let area=selectCaseta.value 
    let tieneGafeteLocker= fullData.gafete_id !==null || fullData.locker_id !==null
    let salida=false
    if(gafeteId=="" &&  tieneGafeteLocker == true){
        salida=false
    }else if(gafeteId !=="" && tieneGafeteLocker == true){
        salida=true
    }else if (gafeteId =="" && tieneGafeteLocker == false){
        salida=true
    }

    if(!salida){
        errorAlert("¡Debes recibir el gafete antes de registrar la salida!","Validación","warning" )
    } else{
        loadingService()
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name: 'script_turnos.py',
                option: 'do_out',
                qr_code: codeUser,
                location: location,
                area: area,
                gafete_id: gafeteId 
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
                let data = {};
                setHideElements('buttonsModal');
                setDataInformation('informatioUser',data)
                Swal.fire({
                    title: "Exito!",
                    text: "Salida registrada correctamente",
                    icon: "success"
                });
                setCleanData();
                setHideElements('dataHide');
                setHideElements('buttonsOptions');
                setHideElements('buttonNew');
                $("#inputCodeUser").val('');
                $("#buttonAddCommentarioAccesoModal").hide();
                //setHideElements(fullData.tipo_movimiento)
                $("#buttonRecibirGafete").hide()
            }else{
                errorAlert(res)
                $("#buttonOut").show();
                $("#inputCodeUser").val('');
                $("#buttonAddCommentarioAccesoModal").hide();
            }
        }).catch(error => {

            $("#inputCodeUser").val('');
            $("#buttonAddCommentarioAccesoModal").hide();
        });
    }
}

//FUNCION para asignar un nuevo gafete
function entregarGafete(){
    $("#idLoadingButtonAsignarGafete").show();
    $("#idButtonAsignarGafete").hide();
    let codeUser = $("#inputCodeUser").val();
    let numGafete = $("#selectGafete").val();
    let otroDoc = $("#inputOtroDescCard").val();
    let nombre = $("#nameUserInf").text();
    let locker = $("#selectLocker").val();
    let radios = document.getElementsByName('radioOptionsDocument');
    let radioSeleccionado = "";
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            radioSeleccionado = radios[i];
            break; 
        }
    }
    if(numGafete !== "" && radioSeleccionado.value !== "" && locker !== ""){
        gafeteRegistroIngreso = {
            "gafete_id":numGafete,
            "documento_garantia": radioSeleccionado.value, // Opciones "licencia_de_conducir","carnet_de_identidad", "ine"
            "locker_id":locker
            /*'status_gafete':'asignar_gafete',
            'ubicacion_gafete':selectLocation.value,
            'caseta_gafete':selectCaseta.value,
            'visita_gafete':nombre,
            'gafete_id':numGafete,
            'documento_gafete':[radioSeleccionado.value],*/
        }

        let tieneGafete=false
        let tieneLocker=false
        if(gafeteRegistroIngreso.hasOwnProperty("gafete_id")){
            if(gafeteRegistroIngreso.gafete_id==''|| gafeteRegistroIngreso.gafete_id==null || gafeteRegistroIngreso.gafete_id==undefined){
                $("#gafeteText").hide()
                $("#divGafete").hide()
                
            }else{
                $("#gafeteText").show()
                $("#divGafete").show()
                $("#gafeteText").show();
                $("#gafete").text(gafeteRegistroIngreso.gafete_id);
                tieneGafete=true
            }
        }else{
            $("#gafeteText").hide()
            $("#divGafete").hide()
            
        }
        if(gafeteRegistroIngreso.hasOwnProperty("locker_id")){
            if(gafeteRegistroIngreso.locker_id=='' || gafeteRegistroIngreso.locker_id==null || gafeteRegistroIngreso.locker_id==undefined){
                $("#lockerText").hide()
                $("#divLocker").hide()
               
            }else{
                $("#lockerText").show()
                $("#divLocker").show()
                $("#lockerText").show();
                $("#locker").text(gafeteRegistroIngreso.locker_id)

                tieneLocker=true
            }
        }else{
            $("#lockerText").hide()
            $("#divLocker").hide()
            
        }
        if(tieneGafete || tieneLocker){
                $(document).ready(function() {
                    $("#hrGafeteLocker").show()
                })
           }else{
                $(document).ready(function() {
                    $("#hrGafeteLocker").hide()
                })
           }
        $("#gafeteModal").modal('hide')
        successMsg("Gafete Entregado", "El gafete asignado para el registro de ingreso.")
        $("#idLoadingButtonAsignarGafete").hide();
        $("#idButtonAsignarGafete").show();
        $("#alert_gafete_modal").hide();
    }else{
        successMsg("Validación", "Faltan datos por llenar")
        $("#idLoadingButtonAsignarGafete").hide();
        $("#idButtonAsignarGafete").show();
    }
    /*fetch(url + urlScripts, {
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
    }) */
}

//FUNCION para setear la informacion en la pantalla principal y mostrar botones parte 2
function setDataInformation(option, data = {}){
    /*
   data={
        "data_user":{
            "name":"Josue de Jesus Ramires",
            "rfc":"FCS24334353",
            "validity": "Si",
            "status": "Activo",
            "motivo": "verificaciones",
            "visit_name": "un nombre",
            "authorize_pase":"Si",
            "authorize_phone":"81203495",
            "list_instrucctions":["Comentario e instrucciones de ejemplo", "Este es un ejemplo de comentario"],
            "list_access":[{"name_access":"Puerta principal","status_access":"aprobado"}, {"name_access":"Puerta Trasera","status_access":"aprobado"}],
            "list_locations":["Monterrey", "Guadalajara"],
            "list_items":[],
            "list_cars":[],

        },
        "movement":{"type":'in'},
        "bitacora":[]
    } */
    if(option == 'alerts'){
        optionAlerts(data);
    }else if(option == 'informatioUser'){
        optionInformationUser(data);
    }else if(option == 'listUsers'){
        optionListUsers(data)
    }else if(option == 'checkOtro'){
        optionCheckOtro()
    }
}

//FUNCION al pedir la opcion check otro user al setear la data
function optionCheckOtro(){
    let checkboxMarcado = document.getElementById("checkOtro").checked;
    if (checkboxMarcado) {
        $('#inputOtroDescCard').show();
        $('#inputOtroDescCard').addClass("form-gafete");
    }else{
        $('#inputOtroDescCard').hide();
        $('#inputOtroDescCard').removeClass("form-gafete");
    }
}

//FUNCION al pedir la opcion information user al setear la informacion del usuario
function dataUserInf(dataUser){
    
    $("#folio").text(dataUser.folio !==""? dataUser.folio: "")

    let imgUser ="https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1"
    if(dataUser.hasOwnProperty('foto')){
        if(dataUser.foto.length>0){
            imgUser = dataUser.foto[0].file_url !== '' ? 
            dataUser.foto[0].file_url : 'https://f001.backblazeb2.com/file/app-linkaform/public-client-20/None/5ea35de83ab7dad56c66e045/64eccb863340ee1053751c1f.png';
        }else{
            imgUser= "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
        }
    }
    $('#imgUser1').attr('src', imgUser);

    let imgCard="https://www.creativefabrica.com/wp-content/uploads/2018/12/Id-card-icon-by-rudezstudio-5-580x386.jpg"

    if(dataUser.hasOwnProperty('identificacion')){
        if(dataUser.identificacion.length>0){
            imgCard= dataUser.identificacion[0].file_url !==  '' ? 
            dataUser.identificacion[0].file_url : "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
        }else{
            imgCard= "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
        }
        
    }
    $('#imgCard1').attr('src', imgCard); 

    let nameUser = ""
    if(dataUser.hasOwnProperty("nombre")){
        nameUser=dataUser.nombre !==  '' ? dataUser.nombre : '';
    }
    $('#nameUserInf').text(nameUser);
    $("#ubicacion").text(dataUser.ubicacion||"")
    /*let rfc=""
    if(dataUser.portador.hasOwnProperty('rfc')){
        rfc=dataUser.portador.rfc[0]
    }
    $('#rfc').text(rfc);*/

    let empres = ""
    if(dataUser.hasOwnProperty('empresa')){
        empres= dataUser.empresa !==  '' ? dataUser.empresa : '';
    }
    $('#contratista').text(empres);

    let validity = ""
    if(dataUser.hasOwnProperty('fecha_de_caducidad')){
        validity= dataUser.fecha_de_caducidad !==  '' ? dataUser.fecha_de_caducidad : '';
    }
    $('#validity').text(validity.slice(0,-3) + ' hrs');

    $("#textDiasAcceso").text("")
    $('#diasAcceso').text("")

    let btns = document.getElementsByClassName('week')
    for(let b of btns){ 
        $("#"+b.id).addClass('btn-outline-success')
        $("#"+b.id).removeClass('bg-dark')
        $("#"+b.id).removeClass('color-white')
    }
    let diasAcceso = ""
    if(dataUser.hasOwnProperty('config_dia_de_acceso')){
        if(dataUser.config_dia_de_acceso =="limitar días de acceso"){
            if(dataUser.limitado_a_acceso!==""){
                $("#textDiasAcceso").text("Limitado a :")
                diasAcceso= dataUser.limitado_a_acceso !==  '' ? dataUser.limitado_a_acceso : '';
                $('#diasAcceso').text(diasAcceso + " accesos");
            }else{
                
                $("#textDiasAcceso").text("")
                $('#diasAcceso').text("")
            }
            let dias= dataUser.limitado_a_dias
            if(dias.length>0){
                for(let d of dias){
                    $("#"+d+"").removeClass('btn-outline-success');
                    $("#"+d+"").addClass('bg-dark');
                    $("#"+d+"").addClass('color-white');
                }
            }
        }else{
            $("#textDiasAcceso").text("Días de acceso :")
            diasAcceso= 'Cualquier día';
            $('#diasAcceso').text(diasAcceso)
        }
        
    }
    





    let status = ""
    if(dataUser.hasOwnProperty('estatus')){
        if(dataUser.estatus !=="" || dataUser.estatus !==null|| dataUser.estatus !==undefined ){
            $("#divEstatus").show()
            $("#hrEstatus").show()
            status=dataUser.estatus !=="" ? dataUser.estatus: '';
        }else{
            status=""
            $("#divEstatus").hide()
            $("#hrEstatus").hide()
        }
    }else{
        $("#divEstatus").hide()
        $("#hrEstatus").hide()
    }
    $('#status').text(capitalizeFirstLetter(status) );
    
    let tipoDePase = ""
    if(dataUser.hasOwnProperty("tipo_de_pase")){
        tipoDePase= dataUser.tipo_de_pase !==  '' ? dataUser.tipo_de_pase: '';
    }
    $('#tipoPaseText').text(tipoDePase);

    let motivo =""
    if(dataUser.hasOwnProperty('motivo_visita')){
        motivo=dataUser.motivo_visita !==  '' ? dataUser.motivo_visita: '';
    }
    $('#motivo').text(motivo);
    
    let visit=""
    let listaVisitas= document.getElementById('listaVisitas')
    let listaVisitasPadre= document.getElementById('listaVisitasPadre')

    if(dataUser.hasOwnProperty('visita_a')){
        if(dataUser.visita_a.length>0){
            listaVisitasPadre.style.display="block"
            listaVisitas.innerHTML=""
            listaVisitas.innerHTML=`
            <div>
                <p class="m-0 p-0"><span class="text-gray">Visita a:</span>&nbsp;&nbsp; <br></p>
            </div>`;
            for(let v of dataUser.visita_a){
                let nom= v.nombre || ""
                let em= v.email || ""
                let randomID=Math.floor(Math.random() * 1000000);
                visit +=`
                    <div class="d-flex flex-row justify-content-between align-items-start">
                        <div class="col-10"> <p><span id="visita-`+randomID+`">`+v.nombre+` </span></p></div>
                        <div class="col-2 d-flex justify-content-start p-0" >
                            <button type="button" class="btn btn-primary btn-sm m-1" onclick="setModal('phoneModal', '', '${nom}', '${em}');">
                                <i class="fa-solid fa-phone"></i>
                            </button>
                            <button type="button" class="btn btn-primary btn-sm m-1" onclick="setModal('messageModal', '' , '${nom}', '${em}');">
                                <i class="fa-solid fa-message"></i> 
                            </button>
                        </div>
                    </div>`;
            }
            listaVisitas.innerHTML += visit
        }else {
            listaVisitasPadre.style.display="none"
            listaVisitas.innerHTM=""
        }
    }else{
        listaVisitas.innerHTML=""
        listaVisitasPadre.style.display="none"
    }
    //$('#visita').text(visit);
    


    /*let authorizePase =""
    if(dataUser.hasOwnProperty("authorize_pase")){
        authorizePase=dataUser.authorize_pase !==  '' ? dataUser.authorize_pase: '';
    }
    $('#authorizePase').text(authorizePase);*/

    let authorizePhone=""
    if(dataUser.hasOwnProperty('telefono')){
        if(dataUser.telefono.length>0){
            authorizePhone=dataUser.telefono.length>0 ? dataUser.telefono[0]:''
        }else{
            authorizePhone=""
        }
    }
    $('#authorizePhone').text(authorizePhone);
}


//FUNCION al pedir la opcion information user al setear la info de las tablas
function tableFill(dataUser){
    //TABLE COMENTARIOS ACCESOS
    if(comentariosAcceso.length == 0){
        let tabla = document.getElementById("tableComentariosAcceso");
        let tbody = tabla.getElementsByTagName("tbody")[0];
        tbody.innerHTML="";
        let newRow = $('<tr>');
        newRow.append($('<td>').text('No existen comentarios'));
        newRow.append($('<td>'));
        newRow.append('</tr>');
        $('#tableComentariosAcceso').append(newRow);
    }
    //TABLA COMENTARIOS
    if(dataUser.hasOwnProperty('grupo_instrucciones_pase')){
        listInstructions = dataUser.grupo_instrucciones_pase.length > 0 ? dataUser.grupo_instrucciones_pase: [];
    }
    for (var i = 0; i < listInstructions.length; i++) {
        //if(i < 3){
            var newRow = $('<tr>');
            newRow.append($('<td>').text(listInstructions[i].comentario_pase));
            newRow.append($('<td>').text(capitalizeFirstLetter(listInstructions[i].tipo_de_comentario)));
            newRow.append('</tr>');
            $('#tableInstructions').append(newRow);
        //}
    }
    /*
    if(listInstructions.length > 3){
        $("#buttonCommentsModal").show();
        for (var i = 0; i < listInstructions.length; i++) {
            var newRow = $('<tr>');
            newRow.append($('<td>').text(listInstructions[i].msg));
            newRow.append('</tr>');
            $('#tableModalInstructions').append(newRow);
        }
    }*/
    if(listInstructions.length == 0){
        var newRow = $('<tr>');
        newRow.append($('<td>').text('No existen comentarios/ instrucciones'));
        newRow.append($('<td>'));
        newRow.append('</tr>');
        $('#tableInstructions').append(newRow);
    }
    //----TABLA ACCESOS PERMITIDOS

    let listAccess = []
    if(dataUser.hasOwnProperty('grupo_areas_acceso')){
        let accesos = dataUser.grupo_areas_acceso.filter(objeto => !tienePropiedadesVacias(objeto));
        listAccess = accesos.length > 0 ? accesos: [];
    }
    for (var i = 0; i < listAccess.length; i++) {
            let nombre = listAccess[i].nombre_area;
            let status = listAccess[i].status;
            let comentario = listAccess[i]['66af1a77d703592958dca5eb'];
            var newRow = $('<tr>');
            newRow.append($('<td>').text(nombre));
            newRow.append($('<td>').text(status));
            newRow.append($('<td>').text(comentario));
            newRow.append('</tr>');
            $('#tableAccess').append(newRow);
    }
    /*if(listAccess.length > 3){
        $("#buttonAccessModal").show();
        for (var i = 0; i < listInstructions.length; i++) {
            let nombre = listAccess[i].nombre;
            let status = listAccess[i].status;
            var newRow = $('<tr>');
            newRow.append($('<td>').text(nombre));
            newRow.append($('<td>').text(status));
            newRow.append('</tr>');
            $('#tableModalAccess').append(newRow);
        }
    }*/
    if(listAccess.length == 0){
        var newRow = $('<tr>');
        newRow.append($('<td >').text('No existen accesos permitidos'));
        newRow.append($('<td>'));
        newRow.append($('<td>'));
        newRow.append('</tr>');
        $('#tableAccess').append(newRow);
    }
    //----Table CERTIFICACIONES
    let listCertificaciones = []
    if(dataUser.hasOwnProperty('certificaciones')){
        listCertificaciones = dataUser.certificaciones.length > 0 ? dataUser.certificaciones: [];
    }

    for (var i = 0; i < listCertificaciones.length; i++) {
        //if(i < 1000){
            var newRow = $('<tr>');
            newRow.append($('<td>').text(listCertificaciones[i].nombre_certificacion/*.nombre*/));
            newRow.append($('<td>').text(listCertificaciones[i].status));
            newRow.append('</tr>');
            $('#tableLocations').append(newRow);
        //}
    }
    /*
    if(listCertificaciones.length > 3){
        $("#buttonLocationsModal").show();
        for (var i = 0; i < listInstructions.length; i++) {
            var newRow = $('<tr>');
            newRow.append($('<td>').text(listCertificaciones[i]));
            newRow.append('</tr>');
            $('#tableModalAccess').append(newRow);
        }
    } 
    */
    if(listCertificaciones.length == 0){
        var newRow = $('<tr>');
        newRow.append($('<td>').text('No existen Accesos/ Certificaciones'));
        newRow.append($('<td>'))
        newRow.append('</tr>');
        $('#tableLocations').append(newRow);
    }
    return listCertificaciones
}


//FUNCION llenar tabla de equipos en la primera carga
function tableFillEquipos(dataUser){
    let listItems = dataUser.grupo_equipos.length > 0 ? dataUser.grupo_equipos: [];
    listItems.forEach(function(dic) {
        dic.id = Math.floor(Math.random() * 1000000);
    });
    listItemsData = listItems;
    listItemsData.forEach(function(dic) {
        dic.check = true;
    });
    //$("#buttonItemsModal").show();
    $("#tableEquipos").innerHTML="";
    for (let i = 0; i < listItems.length; i++) {
        let tipoItem = listItems[i].tipo_equipo;
        let nombreItem = listItems[i].nombre_articulo;
        let marcaItem = listItems[i].marca_articulo;
        let modeloItem = listItems[i].modelo_articulo;
        let serieItem = listItems[i].numero_serie;
        let colorItem = listItems[i].color_articulo;
        let id = listItems[i].id;
        let newRow = $('<tr>');
        newRow.append($('<td>').text(tipoItem));
        newRow.append($('<td>').text(nombreItem));
        newRow.append($('<td>').text(marcaItem));
        newRow.append($('<td>').text(modeloItem));
        newRow.append($('<td>').text(serieItem));
        newRow.append($('<td>').text(colorItem));
        //dataUser.tipo_movimiento == 'Entrada'
       
        let isChecked= listItems[i].check == true || listItems[i].check == "checked" ? 'checked' : '';
        newRow.append('<td ><input class="form-check-input checkboxGroupEquipos" style="margin: auto!important; display: block!important;" type="checkbox" name="equipoCheckGroup" id='+id+' '+isChecked+'></td>');
        newRow.append('</tr>');
        $('#tableEquipos').append(newRow);
        if(dataUser.tipo_movimiento =="Entrada"){
            $('#'+id).prop('disabled', false);
            $("#idButtonEquipoNota").prop('disabled', false);
            $("#buttonVerListaVehiculos").prop('disabled', false)
            $("#buttonVerBorradorVehiculos").prop('disabled', false)
            $("#buttonVerListaEquipos").prop('disabled', false)
            $("#buttonVerBorradorEquipos").prop('disabled', false)
        }else{
            $("#idButtonEquipoNota").prop('disabled', true);
            $('#'+id).prop('disabled', true);
            $("#idButtonVehiculos").prop('disabled', true)
            $("#buttonVerListaVehiculos").prop('disabled', true)
            $("#buttonVerBorradorVehiculos").prop('disabled', true)
            $("#buttonVerListaEquipos").prop('disabled', true)
            $("#buttonVerBorradorEquipos").prop('disabled', true)
        }
    }
    if(listItems.length == 0){
        $("#tableEquipos").innerHTML="";
        let newRow = $('<tr>');
        newRow.append($('<td >').text('No existen Equipos'));
        newRow.append($('<td>'));
        newRow.append($('<td>'));
        newRow.append($('<td>'));
        newRow.append($('<td>'));
        newRow.append($('<td>'));
        newRow.append($('<td>'));
        newRow.append('</tr>');
        $('#tableEquipos').append(newRow);
    }
}


//FUNCION llenar tabla de vehiculos en la primera carga
function tableFillVehiculos(dataUser){
    let listCars = dataUser.grupo_vehiculos.length > 0 ? dataUser.grupo_vehiculos: [];
    listCars.forEach(function(dic) {
        dic.id = Math.floor(Math.random() * 1000000);;
    });
    listVehiculesData = listCars;
    listVehiculesData.forEach(function(dic) {
        dic.check = true;
    });

    $("#buttonCarsModal").show();
    let tbody = document.querySelector('#tableBitacora tbody');
    tbody.innerHTML = '';
    $("#tableCars").innerHTML="";
    for (var i = 0; i < listCars.length; i++) {
        let tipoCar = listCars[i].tipo_vehiculo;
        let marcaCar = listCars[i].marca_vehiculo;
        let modeloCar = listCars[i].modelo_vehiculo;
        let matriculaCar = listCars[i].placas_vehiculo;
        let colorCar = capitalizeFirstLetter(listCars[i].color_vehiculo);
        let id = listCars[i].id;
        var newRow = $('<tr>');
        newRow.append($('<td>').text(tipoCar));
        newRow.append($('<td>').text(marcaCar));
        newRow.append($('<td>').text(modeloCar));
        newRow.append($('<td>').text(matriculaCar));
        newRow.append($('<td>').text(colorCar)); 
        let isChecked= listCars[i].check == true ? 'checked' : '';
        newRow.append('<td ><input class="form-check-input radioGroupItems" style="margin: auto !important; display: block !important;" type="radio" name="groupCarList" id='+id+' '+isChecked+'></td>');
        newRow.append('</tr>');
        $('#tableCars').append(newRow);
        if(dataUser.tipo_movimiento =="Entrada"){
            $('#'+id).prop('disabled', false);
            $("#idButtonVehiculos").prop('disabled', false);
            $("#idButtonEquipoNota").prop('disabled', false);
        }else{
            $("#idButtonVehiculos").prop('disabled', true);
            $("#idButtonEquipoNota").prop('disabled', true);
            $('#'+id).prop('disabled', true);
        }
    }
    if(listCars.length == 0){
        $("#tableCars").innerHTML="";
        var newRow = $('<tr>');
        newRow.append($('<td>').text('No existen Vehiculos'));
        newRow.append($('<td>'));
        newRow.append($('<td>'));
        newRow.append($('<td>'));
        newRow.append($('<td>'));
        newRow.append($('<td>'));
        newRow.append('</tr>');
        $('#tableCars').append(newRow);
    }
}

//FUNCION al pedir la opcion information user al setear la data
function optionInformationUser(data){
    let { ultimo_acceso }= data
    if(data.hasOwnProperty('ultimo_acceso')){
        //---Movement
        //data.tipo_movimiento="Salida"
        let tieneGafete=false
        let tieneLocker=false
        if(data.hasOwnProperty("gafete_id")){
            if(data.gafete_id==''|| data.gafete_id==null || data.gafete_id==undefined){
                $("#gafeteText").hide()
                $("#divGafete").hide()
                
            }else{
                $("#gafeteText").show()
                $("#divGafete").show()
                tieneGafete=true
            }
        }else{
            $("#gafeteText").hide()
            $("#divGafete").hide()
            
        }
        if(data.hasOwnProperty("locker_id")){
            if(data.locker_id=='' || data.locker_id==null || data.locker_id==undefined){
                $("#lockerText").hide()
                $("#divLocker").hide()
               
            }else{
                $("#lockerText").show()
                $("#divLocker").show()
                tieneLocker=true
            }
        }else{
            $("#lockerText").hide()
            $("#divLocker").hide()
            
        }
        if(data.tipo_movimiento == 'Entrada'){
            tipoMovimiento="Entrada" 
           $("#buttonIn").show();
           $("#buttonAddCommentarioAccesoModal").show()
           $("#textIn").show();
           if(tieneGafete || tieneLocker){
                $(document).ready(function() {
                    $("#buttonAsignarGafete").hide()
                    $("#hrGafeteLocker").show()
                })
           }else{
                $(document).ready(function() {
                    $("#buttonAsignarGafete").show()
                    $("#hrGafeteLocker").hide()
                })
           }
        }else if(data.tipo_movimiento == 'Salida'){
            tipoMovimiento="Salida" 
            $("#buttonOut").show();
            $("#buttonAddCommentarioAccesoModal").hide()
            $("#textOut").show();
            if(tieneGafete || tieneLocker){
                $("#buttonRecibirGafete").show()
                $("#hrGafeteLocker").show()
            }else{
                $(document).ready(function() {
                    $("#buttonRecibirGafete").hide()
                    $("#hrGafeteLocker").hide()
                })
            }
        } 
        
        /*if(data.gafete_info)*/


        $("#gafete").text(data.gafete_id !== null ? data.gafete_id : "")
        $("#locker").text(data.locker_id !== null ? data.locker_id : "")
        $("#buttonNew").hide();
        $("#buttonAsignarGafete").show();
        $("#buttonClean").show();
        $(document).ready(function() {
            //---Bitacora TABLA ULTIMOS ACCESOS
            let listBitacora = ultimo_acceso.length > 0 ? ultimo_acceso: [];
            for (let i = 0; i < listBitacora.length; i++) {
                //if(i < 3){
                    //let duration=segundosAHoras(listBitacora[i].duration)
                    let newRow = $('<tr>');
                    newRow.append($('<td>').text(listBitacora[i].visita_a.length>0 ? listBitacora[i].visita_a[0].nombre ||"": ''));
                    newRow.append($('<td>').text(listBitacora[i].fecha ? listBitacora[i].fecha : ''));
                    newRow.append($('<td>').text(listBitacora[i].duration ? listBitacora[i].duration.slice(0,-3) +' hrs': '00:00 hrs'));
                    if(listBitacora[i].hasOwnProperty('comentarios')){
                        if(listBitacora[i].comentarios.length>0){
                            let stringArray= encodeURIComponent(JSON.stringify(listBitacora[i].comentarios))
                            newRow.append(`<td ><button style="border:none; background-color:transparent;" onclick="mostrarComentarioUltimoAcceso(decodeURIComponent('${stringArray}'));"> <i class="fa-solid fa-message"></i> </button> </td>`);
                        }else{
                            newRow.append('<td > </td>');
                        }
                    }else{
                        newRow.append('<td > </td>');
                    }
                    newRow.append('</tr>');
                    $('#tableBitacora').append(newRow);
                //}
            }
            /*
            if(listBitacora.length > 3){
                $("#buttonBitacoraModal").show();
                for (var i = 0; i < listBitacora.length; i++) {
                    let duration=segundosAHoras(listBitacora[i].duration)
                    var newRow = $('<tr>');
                    newRow.append($('<td>').text(listBitacora[i].nombre_visita ? listBitacora[i].visita_a : ''));
                    newRow.append($('<td>').text(listBitacora[i].location ? listBitacora[i].location : ''));
                    newRow.append($('<td>').text(duration ? duration : ''));
                    newRow.append('</tr>');
                    $('#tableBitacoraModal').append(newRow);
                }
            }*/
        

            if(listBitacora.length == 0){
                let newRow = $('<tr>');
                newRow.append($('<td colspan="3">').text('No existen registros recientes'));
                newRow.append($('<td>'));
                newRow.append('</tr>');
                $('#tableBitacora').append(newRow);
            }
            
        })
        // Information User
        dataUserInf(data);

        // Table INstructions
        let listLocations= tableFill(data);

        // Table Items
        tableFillEquipos(data);

        // Table Cars
        tableFillVehiculos(data);
    }
}

function mostrarComentarioUltimoAcceso(comentarios){
    let comentariosArray=JSON.parse(comentarios)
    let objCom=""
    for(let com of comentariosArray){
        objCom +=`<tr>
                    <td>${com.comentario}</td>
                    <td>${com.tipo_comentario}</td>
                </tr>`

    }
    Swal.fire({
        text: "Comentarios",
        title: `<h4 style="color:black;">Comentarios</h4>`,
        html: ` 
        <table class="table table-borderless table-striped" style="border: none !important; font-size:0.9em; font-weight:normal;" id="tableComentariosUltimosAccesos" >
                    <thead class="table-warning">
                <th class="headerColor">Comentario</th>
                <th class="headerColor">Tipo</th>
            </thead>
            <tbody>
                ${objCom}
            </tbody>
        </table>
           `,
        showCancelButton: true,
        showConfirmButton:false,
        cancelButtonColor: colors[0],
        cancelButtonText: "Cerrar",
        heightAuto:false,
        reverseButtons: true
    })
    .then((result) => {
        if (result.isConfirmed) {
            
        }
    });
}


//convertir segundos a horas
function segundosAHoras(segundos) {
    var horas = Math.floor(segundos / 3600);
    var minutos = Math.floor((segundos % 3600) / 60);
    var segundosRestantes = segundos % 60;
    let horaText="hora";
    let horasText="horas"
    let minutoText="minuto";
    let minutosText="minutos";
    return horas + " horas, " + minutos + " minutos" ;
}


//FUNCION al pedir la opcion alerts al setear la data
function optionAlerts(data){
    let count_in = data.count_in ? count_in : 10;
    let count_out = data.count_out ? count_out : 70;
    let count_cars_in = data.count_cars_in ? count_cars_in : 20;
    let count_out_register = data.count_out_register ? count_out_register : 30;
    $("#textAlert1").text(count_in);
    $("#textAlert2").text(count_out);
    $("#textAlert3").text(count_cars_in);
    $("#textAlert4").text(count_out_register);
}


//FUNCION al pedir la opcion optionListUsers al setear la data
function optionListUsers(data){
    for (var i = 0; i < data.length; i++) {
        let nameUser = data[i].name_user ? data[i].name_user: '';
        let curpUser = data[i].curp_user ? data[i].curp_user: '';
        let element = '<li class="list-group-item d-flex justify-content-between align-items-start">';
        element += '<div class="ms-2 me-auto">';
        element += '<div class="fw-bold">'+curpUser+'</div>';
        element += nameUser;
        element += '</div>';
        element += '<span class="badge text-bg-primary rounded-pill cursor-pointer" onClick="setCurpSearch(`'+curpUser+'`);return false;"> ';
        element += 'Seleccionar ';
        element += '</span>';
        element += '</li>';
        $("#listPasaportActive").append(element);
    }
}


//FUNCION para ocultar mostrar elementos
function setHideElements(option){
    if (option == 'buttonsModal') {
        $("#buttonCommentsModal").hide();
        $('#buttonBitacoraModal').hide();
        $("#buttonAccessModal").hide();
        $("#buttonLocationsModal").hide();
        $("#buttonItemsModal").hide();
        $("#buttonCarsModal").hide();
    }else if(option == 'buttonsOptions'){
        $("#buttonNew").hide()
        $("#buttonIn").hide();
        $("#buttonOut").hide();
        $("#buttonNew").hide();
        $("#buttonAsignarGafete").hide();
        $("#buttonClean").hide();
        //$("#pasesTemporales").hide()
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
    }else if(option==statusVisitaEntrada || option == statusVisitaSalida){
        $("#divSpinner").hide();
        $("#inputCodeUser").val("")
        $("#idComentarioPase").val('')
        $("#idComentarioAcceso").val('')
        $("#buttonBuscarPaseEntrada").prop('disabled', false);
        $("#buttonNew").prop('disabled', false);
        $("#pasesTemporales").prop('disabled', false);
        $("#pasesActivos").prop('disabled', false);
        $("#buttonNew").hide()
        if(option==statusVisitaEntrada){
            $("#buttonAsignarGafete").show()
            $("#buttonRecibirGafete").hide()
        }else{
            $("#buttonAsignarGafete").hide()
            $("#buttonRecibirGafete").show()
        }
    }
}


//FUNCION para limpiar la vista completa
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

    tbody = document.querySelector('#tableEquipos tbody');
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

    /*$('#imgUser1').attr('src', 'https://f001.backblazeb2.com/file/app-linkaform/public-client-20/None/5ea35de83ab7dad56c66e045/64eccb863340ee1053751c1f.png'); 
    $('#imgCard1').attr('src', 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65dd1061092cd19498857933.jpg'); 
  */  $('#tipoPaseText').text('')
    $('#name').text('')
    $('#rfc').text('')
    $('#validity').text('')
    $('#status').text('')
    $('#motivo').text('')
    $('#visit').text('')
    $('#authorizePase').text('')
    $('#authorizePhone').text('')
    $("#folio").text("")
    $("#idComentarioPase").val('')
    $("#idComentarioAcceso").val('')

    $("#lunes").addClass('btn-outline-success');
    $("#martes").addClass('btn-outline-success');
    $("#miércoles").addClass('btn-outline-success');
    $("#jueves").addClass('btn-outline-success');
    $("#viernes").addClass('btn-outline-success');
    $("#sábado").addClass('btn-outline-success');
    $("#domingo").addClass('btn-outline-success');

    $("#lunes").removeClass('btn-success');
    $("#martes").removeClass('btn-success');
    $("#miércoles").removeClass('btn-success');
    $("#jueves").removeClass('btn-success');
    $("#viernes").removeClass('btn-success');
    $("#sábado").removeClass('btn-success');
    $("#domingo").removeClass('btn-success');

    let btns = document.getElementsByClassName('week')
    for(let b of btns){ 
        $("#"+b.id).addClass('btn-outline-success')
        $("#"+b.id).removeClass('bg-dark')
        $("#"+b.id).removeClass('color-white')
    }

    $("#buttonAddCommentarioAccesoModal").hide()
    selectedEquipos=[]
    selectedVehiculos=[]
    comentariosPase=[]
    comentariosAcceso=[]
    tipoMovimiento=""
    gafeteId=""
    gafeteRegistroIngreso={}
    $("#cartaUser").hide(); 
    $("#buttonAsignarGafete").hide()
    $("#buttonRecibirGafete").hide()
    $("#idButtonEquipoNota").prop('disabled', false);
    $("#idButtonVehiculos").prop('disabled', false);
    $("#cartaUser").hide();
    $("#mainSection1").show();
   // $("#pasesTemporales").prop('disabled', false);
   // $("#pasesTemporales").show();
    setHideElements('dataHide');
    setHideElements('buttonsOptions');
    setHideElements('buttonNew');
}


function setCleanData2(){
    setCleanData();
    $("#inputCodeUser").val('');
}

//FUNCION para setear la informacion en la pantalla principal
function functionSearchList(event) {
    let textSearch = event.target.value.replace(/\s/g, '').toLowerCase();
    if(textSearch !== ''){
        let listUsersSearch = listUserActives.filter((object) => 
            object.name_user.replace(/\s/g, '').toLowerCase().includes(textSearch) ||
            object.curp_user.replace(/\s/g, '').toLowerCase().includes(textSearch) 
        )
        $("#listPasaportActive").empty();
        setDataInformation('listUsers',listUsersSearch)
    }else{
        $("#listPasaportActive").empty();
        setDataInformation('listUsers',listUserActives)
    }
}


//FUNCION para saber que vehiculos entas con checkbox
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


//FUNCION para agregar equipos al modal
function setCheckItem(id = 0) {
    var element = listItemsData.find(function(item) {
        return item.id === id;
    });
    if (element) {
        element.check = !element.check;
    }
}


//FUNCION buscar curp
function setCurpSearch(curp){
    $("#inputCodeUser").empty();
    $("#inputCodeUser").val(curp);
    $('#listModal').modal('hide');
    buscarPaseEntrada();
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
        entregarGafete(dicData);
          Swal.fire({
            title: "Gafete Entregado",
            text: "El gafete a sido entregado correctamente.",
            type: "success"
        });
        $("#alert_gafete_modal").hide();
        $("#cardModal").modal('hide')
    }else{
        $("#alert_gafete_modal").show();
    }
}




//FUNCION obtener data para rellenar los catalogos
function getCatalogs(){
    fetch(url + urlScripts ,{
        method: 'POST',
        body: JSON.stringify({
            script_name: "script_turnos.py",
            option: "vehiculo_tipo",
            tipo :"Automóvil",
            //marca :"CHEVROLET"
        }),
        headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+userJwt
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {

        } else{
            errorAlert(res)
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
    //$("#selectTipoVehiculo-123").prop( "disabled", false );
    //$("#spinnerTipoVehiculo").css("display", "none");
    dataCatalogs.types_cars.forEach(function(e, i){
    $("#datalistOptionsTipo").append($('<option></option>').val(e).text(e));
    });
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


//FUNCION validar que el canvas esta vacio
function isCanvasBlank(canvas) {
    const context = canvas.getContext('2d');
    const pixelBuffer = new Uint32Array(
        context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );
  return !pixelBuffer.some(color => color !== 0);
}


function stopStream(stream) {
    if(stream!==null){
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }
}

//FUNCION obtener la imagen del canvas
function getScreenCard(){
    //-----Save Photo
    if(!flagVideoCard){
        flagVideoCard = true;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }})
            .then(function(stream) {
                let video = document.createElement('video');
                video.style.width = '150px';
                video.style.height = '150px';
                document.getElementById('containerCard').appendChild(video);
                video.srcObject = stream;
                video.play();
                let canvas = document.getElementById('canvasPhoto');
                let context = canvas.getContext('2d');
                //----Take Photo
                $("#buttonTakeCard").attr('disabled','disabled');
                $("#buttonTakeCard").hide();
                $("#buttonSaveCard").show();
                document.getElementById('buttonSaveCard').addEventListener('click', function() {
                    setTranslateImageCard(context, video, canvas)
                });
                 // Añadir código para detener el stream si es necesario
                window.addEventListener('beforeunload', function() {
                    stopStream(stream);
                });
                // Manejo del evento de cierre del modal o botón de cancelar
                document.getElementById('cancelVideo').addEventListener('click', function() {
                    stopStream(currentStream);
                    currentStream = null;  // Limpia la referencia al stream
                    flagVideoUser = false; // Resetea el flag si es necesario
                });
            })
            .catch(function(error) {
                console.error('Error al acceder a la cámara:', error);
            });
        } else {
            alert('Lo siento, tu dispositivo no soporta acceso a la cámara.');
        }
    }
}


//FUNCION obtener la imagen del canvas
function getScreenUser(){
    //-----Save Photo
    if(!flagVideoUser){
        flagVideoUser = true;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                $("#containerUser video").remove()
                let video = document.createElement('video');
                video.style.width = '180px';
                video.style.height = '150px';
                document.getElementById('containerUser').appendChild(video);
                video.srcObject = stream;
                video.play();
                let canvas = document.getElementById('canvasPhotoUser');
                let context = canvas.getContext('2d');
                //----Take
                $("#buttonTakeUser").attr('disabled','disabled');
                $("#buttonTakeUser").hide();
                $("#buttonSaveUser").show();
                document.getElementById('buttonSaveUser').addEventListener('click', function() {
                    setTranslateImageUser(context, video, canvas);
                });
               // Evento para detener el stream al cerrar el modal o al cancelar
                /*document.getElementById('buttonCancel').addEventListener('click', function() {
                    stopStream(currentStream);
                    currentStream = null;
                    flagVideoUser = false;
                });*/

                // Enviar un mensaje a otras pestañas para que sepan que el stream está en uso
                localStorage.setItem('cameraInUse', 'true');
            })
            .catch(function(error) {
                console.error('Error al acceder a la cámara:', error);
            });
        } else {
            alert('Lo siento, tu dispositivo no soporta acceso a la cámara.');
        }
    }
}


//FUNCION obtener la imagen del canvas
function setTranslateImageUser(context, video, canvas){
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let photoCard = document.getElementById('imgUser');
    photoCard.src = canvas.toDataURL('image/png');
    photoCard.style.display = 'block';
    video.pause();
    video.srcObject.getTracks().forEach(function(track) {
        track.stop();
    });
    video.style.display = 'none';
    //sdjkfns
    ///-- Save Input
    canvas.toBlob( (blob) => {
        const file = new File( [ blob ], "imageUser.png" );
        const dT = new DataTransfer();
        dT.items.add( file );
        document.getElementById("inputFileUser").files = dT.files;
    } );
    //-----Rquest Photo
    const flagBlankUser = isCanvasBlank(document.getElementById('canvasPhotoUser'));
    if(!flagBlankUser){
        setTimeout(() => {
            setRequestFileImg('inputUser');
        }, "1000");
    }
    //-----Clean ELement
    $("#buttonSaveUser").hide();
}


//FUNCION obtener la imagen del canvas
function setTranslateImageCard(context, video, canvas){
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let photoCard = document.getElementById('imgCard');
    photoCard.src = canvas.toDataURL('image/png');
    photoCard.style.display = 'block';
    video.pause();
    video.srcObject.getTracks().forEach(function(track) {
        track.stop();
    });
    video.style.display = 'none';
    ///-- Save Input
    canvas.toBlob( (blob) => {
        const file = new File( [ blob ], "imageCard.png" );
        const dT = new DataTransfer();
        dT.items.add( file );
        document.getElementById("inputFileCard").files = dT.files;
    } );
    //-----Rquest Photo
    const flagBlankCard = isCanvasBlank(document.getElementById('canvasPhoto'));
    if(!flagBlankCard){
        setTimeout(() => {
            setRequestFileImg('inputCard');
        }, "1000");
    }
    //-----Clean ELement
    $("#buttonSaveCard").hide();
}


//FUNCION obtener la url de la imagen que se subio
function setRequestFileImg(type) {
    let idInput = '';
    if(type == 'inputCard'){
        idInput = 'inputFileCard';
    }else if(type == 'inputUser'){
        idInput = 'inputFileUser';
    }
    const fileInput = document.getElementById(idInput);
    const file = fileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('File', file);
        formData.append('field_id', '660459dde2b2d414bce9cf8f');
        formData.append('is_image', true);
        formData.append('form_id', 116852);
        fetch('https://app.linkaform.com/api/infosync/cloud_upload/', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(res => {
            if(res.file !== undefined && res.file !== null){
                if(type == 'inputCard'){
                    urlImgCard = res.file;
                    fotosNuevaVisita.identificacion.push({"file_name":res.file_name, "file_url":res.file})
                    //----Clean Canvas
                    let canvas = document.getElementById('canvasPhoto');
                    let ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    let imgC =document.getElementById('imgCard')
                    imgC.css('display', 'block');
                    imgC.attr('src', urlImgCard);
                }else if(type == 'inputUser'){
                    urlImgUser = res.file;
                    fotosNuevaVisita.foto.push({"file_name":res.file_name, "file_url":res.file})
                    //----Clean Canvas
                    let canvas = document.getElementById('canvasPhotoUser');
                    let ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    let imgU =document.getElementById('imgUser')
                    imgU.css('display', 'block');
                    imgU.attr('src', urlImgUser);
                }
            }else{
                return 'Error';
            }
        })
        .catch(error => {
            errorAlert(error)
            return 'Error';
        });
    }else{
        return 'Error';
    }
}


//---Cerrar Sesión
function setCloseSession() {
    closeSession();
    redirectionUrl('login',false);
}
