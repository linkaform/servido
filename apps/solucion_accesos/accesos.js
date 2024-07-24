let listItemsData = []
let listVehiculesData = []
let listNewVehicules = []
let listNewItems = []
let idScr=119197;
let opScriptCatalog='catalog_brands';
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
let fullData=""
let selectLocation= ""
let selectCaseta =""
window.onload = function(){
    setValueUserLocation('accesos');
    changeButtonColor();
    
    fillCatalogs();
    //initializeCatalogs();
    getInitialData();
    selectLocation= document.getElementById("selectLocation")
    selectCaseta= document.getElementById("selectCaseta")
    /*
    selectLocation.onchange = function() {
        let response = fetchOnChangeLocation()
    };
    selectCaseta.onchange = function() {
        let response = fetchOnChangeLocation()
    };*/
    //selectLocation.value=getCookie("userLocation")
    //selectCaseta.value=getCookie("userCaseta")
    //selectLocation.disabled=true
    //selectCaseta.disabled=true
    //selectLocation.disabled=true
    //selectCaseta.disabled=true
    

    setHideElements('dataHide');
    setSpinner(true, 'divSpinner');
    let user = getCookie("userId");
    if(user !='' && userJwt!=''){
        setDataInformation('alerts',data = {})
        //getDataListUser();
    }else{
        redirectionUrl('login',false)
    }
    customNavbar(getValueUserLocation(), getCookie('userTurn'));
    getCatalogs()
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
function asignarNuevaVisita(){
    let nombre=$("#inputNombreNV").val();
    let razonSocial=$("#inputRazonSocialNV").val();
    let areaQueVisita=$("#inputAreaVisitaNV").val();
    let visitaA=$("#selectVisitaNV").val();
    let motivoVisita=$("#inputMotivoVisitaNV").val();
    if(nombre!=='' , razonSocial!=='', areaQueVisita!=='', visitaA!=='', motivoVisita!==''){
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_id: idScript,
                option: 'add_new_visit',
                nombre: nombre,
                razonSocial:razonSocial,
                areaQueVisita:areaQueVisita,
                visitaA:visitaA,
                motivoVisita:motivoVisita,

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
                let data={ data: {}}
                console.log("RESPONSE", data)
            } 
        });
        Swal.fire({
            title: "Validación",
            text: "NUeva visita registrada",
            type: "success"
        });
        codeUserVisit= Date.now();
        let inputCode = document.getElementById("inputCodeUser");
        inputCode.value= codeUserVisit
        $("#newVisitModal").modal('hide')
    }else{
        Swal.fire({
            title: "Validación",
            text: "Faltan campos por llenar, completa los campos marcados con asterisco",
            type: "warning"
        });
    }
}


//FUNCION para agregar un nuevo equipo
function agregaEquipo(){
    let nombre=$("#inputNombreNV").val();
    let razonSocial=$("#inputRazonSocialNV").val();
    let areaQueVisita=$("#inputAreaVisitaNV").val();
    let visitaA=$("#selectVisitaNV").val();
    let motivoVisita=$("#inputMotivoVisitaNV").val();
    if(nombre!=='' , razonSocial!=='', areaQueVisita!=='', visitaA!=='', motivoVisita!==''){
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_id: idScript,
                option: 'add_new_equip',
                nombre: nombre,
                razonSocial:razonSocial,
                areaQueVisita:areaQueVisita,
                visitaA:visitaA,
                motivoVisita:motivoVisita,

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
                let data={ data: {}}
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
function getDataUser() {
    setCleanData();
    $("#divSpinner").show();
    setHideElements('dataHide');
    setHideElements('buttonsOptions');
    let codeUser = $("#inputCodeUser").val();
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: "script_turnos.py",
            option: 'search_access_pass',
            location: selectLocation.value,
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
            
            //setCookie('userLocation', res.response.data.ubicacion)
            setDataInformation('informatioUser', res.response.data)
            setHideElements('buttonsModal');
            $("#divSpinner").hide();
            setHideElements('dataShow');
        } 
    }) 
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
function setDataUser(){
    console.log("=================REGISTRAR INGRESO============================")
    let codeUser  = $("#inputCodeUser").val();
    $("#buttonIn").hide();
    $("#buttonOut").hide();
    
    let location= 'Planta Monterrey'//getCookie('userLocation') 
    let area='Caseta Vigilancia Norte 3' //getCookie('userCaseta')

    getSelectedCheckbox('tableItems', 'checkboxGroupEquipos', selectedEquipos);
    let selectedEq= listItemsData.filter(elemento => selectedEquipos.includes(elemento.id));

    getSelectedCheckbox('tableItems', 'radioGroupItems', selectedVehiculos)
    let selectedVe= listVehiculesData.filter(elemento => selectedVehiculos.includes(elemento.id));

    console.log("location area codeuser", location,area,codeUser)
    console.log("SELECTED EQUIOPOS YU VEHCIULOSS",selectedEq, selectedVe)

    //let dataItem = {'listItemsData':listItemsData,'listNewItems':listNewItems}
    //let dataVehicule = {'listVehiculesData':listVehiculesData,'listNewVehicules':listNewVehicules}
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
                title   : "Exito!",
                text: "Movimiento de usuario registrado",
                icon: "success"
            });
            setCleanData();
            setHideElements('dataHide');
            setHideElements('buttonsOptions');
            setHideElements('buttonNew');
        }else{
            Swal.fire({
                title: "Error",
                text: res.error.msg.msg,
                type: res.error.msg.type
            });
            $("#buttonOut").show();
        }
    }).catch(error => {
        console.error(error)
    });
}


function registrarSalida(){
    console.log("=================REGISTRAR INGRESO============================")
    let codeUser  = $("#inputCodeUser").val();
   
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: 'script_turnos.py',
            option: 'do_out',
            qr_code: codeUser,
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+userJwt,
            'Access-Control-Request-Headers':'*'
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log("RESPONSE",res)
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
        }else{
            Swal.fire({
                title: "Error",
                text: res.error.msg.msg,
                type: res.error.msg.type
            });
            $("#buttonOut").show();
        }
    }).catch(error => {
        console.error(error)
    });
}



//FUNCION para asignar un nuevo gafete
function setDataGafete(){
    $("#idLoadingButtonAsignarGafete").show();
    $("#idButtonAsignarGafete").hide();
    let codeUser  = $("#inputCodeUser").val();
    let numGafete= $("#numCard").val();
    let otroDoc= $("#inputOtroDescCard").val();
    let nombre= $("#nameUserInf").val();
    
    let radios = document.getElementsByName('radioOptionsDocument');
    console.log("radios selected",radios)
    let radioSeleccionado = null;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            radioSeleccionado = radios[i];
            break; 
        }
    }
    if (radioSeleccionado) {
        console.log('El radio seleccionado es:', radioSeleccionado.value);
    } else {
        console.log('No hay radio seleccionado');
    }
    let data_gafete={
        'status_gafete':'asignar_gafete',
        'ubicacion_gafete':selectLocation.value,
        'caseta_gafete':selectCaseta.value,
        'visita_gafete':nombre,
        'id_gafete':numGafete,
        'documento_gafete':['INE'],
    }
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
        console.log("RESPONSE", res)
        if (res.success) {
            let data = res.response.data;
            if(data.status_code==201){
                Swal.fire({
                    title: "Gafete Entregado",
                    text: "El gafete a sido entregado correctamente.",
                    type: "success"
                });
                $("#idLoadingButtonAsignarGafete").hide();
                $("#idButtonAsignarGafete").show();
                $("#alert_gafete_modal").hide();
                $("#cardModal").modal('hide')
            }
        }else{
            Swal.fire({
                title: "Error",
                text: res.error,
                type: "Error"
            });
            $("#idLoadingButtonAsignarGafete").hide();
            $("#idButtonAsignarGafete").show();
        } 
    })
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
    let imgUser = dataUser.portador.foto[0].file_url != '' ? dataUser.portador.foto[0].file_url: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-20/None/5ea35de83ab7dad56c66e045/64eccb863340ee1053751c1f.png';
    $('#imgUser').attr('src', imgUser); 
    let imgCard = dataUser.portador.identificacion_pase[0].file_url != '' ? dataUser.portador.identificacion_pase[0].file_url: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65dd1061092cd19498857933.jpg';
    $('#imgCard').attr('src', imgCard); 
    let nameUser = dataUser.portador.nombre_visita != '' ? dataUser.portador.nombre_visita: '';
    $('#nameUserInf').text(nameUser); 
    let rfc = dataUser.portador.rfc[0] != '' ? dataUser.portador.rfc[0]: ''; // EL OBJ NO TRAE EL RFC
    $('#rfc').text(rfc);
    let validity = dataUser.pass.fecha_expiracion != '' ? dataUser.pass.fecha_expiracion : '';
    $('#validity').text(validity);
    let status = dataUser.portador.status_visita[0] != '' ? dataUser.portador.status_visita[0]: '';
    $('#status').text(status);
    let tipoPase = dataUser.pass.tipo != '' ? dataUser.pass.tipo: '';
    $('#tipoPaseText').text(tipoPase);
    //----Visiti
    let motivo = dataUser.portador.motivo != '' ? dataUser.portador.motivo: '';
    $('#motivo').text(motivo);
    let visit = dataUser.portador.nombre_visita != '' ? dataUser.portador.nombre_visita: '';
    $('#visit').text(visit);
    let authorizePase = dataUser.authorize_pase != '' ? dataUser.authorize_pase: '';
    $('#authorizePase').text(authorizePase);
    let authorizePhone = dataUser.portador.telefono[0] != '' ? dataUser.portador.telefono[0]: '';
    $('#authorizePhone').text(authorizePhone);
}


//FUNCION al pedir la opcion information user al setear la info de las tablas
function tableFill(dataUser){
    //TABLA COMENTARIOS
    let listInstructions = dataUser.comentarios.length > 0 ? dataUser.comentarios: [];
    for (var i = 0; i < listInstructions.length; i++) {
        //if(i < 3){
            var newRow = $('<tr>');
            newRow.append($('<td>').text(listInstructions[i]));
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
        newRow.append($('<td>').text('No existen Instrucciones'));
        newRow.append('</tr>');
        $('#tableModalInstructions').append(newRow);
    }
    //----TABLA ACCESOS PERMITIDOS
    let listAccess = dataUser.accesos.length > 0 ? dataUser.accesos: [];
    for (var i = 0; i < listAccess.length; i++) {
            let nombre = listAccess[i].area;
            let status = listAccess[i].status;
            var newRow = $('<tr>');
            newRow.append($('<td>').text(nombre));
            newRow.append($('<td>').text(status));
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
        newRow.append($('<td colspan="2">').text('No existen Accesos permitidos'));
        newRow.append('</tr>');
        $('#tableAccess').append(newRow);
    }
    //----Table CERTIFICACIONES
    let listLocations = dataUser.portador.certificacion_pase.length > 0 ? dataUser.portador.certificacion_pase: [];

    for (var i = 0; i < listLocations.length; i++) {
        //if(i < 1000){
            var newRow = $('<tr>');
            newRow.append($('<td>').text(listLocations[i]/*.nombre*/));
            newRow.append($('<td>').text('dato dummy'));
            newRow.append('</tr>');
            $('#tableLocations').append(newRow);
        //}
    }
    /*
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
    }*/
    return listLocations
}


//FUNCION llenar tabla de equipos en la primera carga
function tableFillEquipos(dataUser){
    let listItems = dataUser.equipo.length > 0 ? dataUser.equipo: [];
    listItems.forEach(function(dic) {
        dic.id = Math.floor(Math.random() * 1000000);
    });
    listItemsData = listItems;
    listItemsData.forEach(function(dic) {
        dic.check = false;
    });
    console.log("LISTA DE EQUIPOSSS",listItems)
    /*
    for (var i = 0; i < listItems.length; i++) {
        if(i < 3){
            let tipoItem = listItems[i].tipo;
            let marcaItem = listItems[i].marca;
            let modeloItem = listItems[i].modelo;
            let serieItem = listItems[i].serie;
            let colorItem = listItems[i].color;
            let id = listItems[i].id;
            var newRow = $('<tr>');
            newRow.append($('<td>').text(tipoItem));
            newRow.append($('<td>').text(marcaItem));
            newRow.append($('<td>').text(modeloItem));
            newRow.append($('<td>').text(serieItem));
            newRow.append($('<td>').text(colorItem));
            newRow.append('</tr>');
            $('#tableModalItems').append(newRow);
        }
    }*/
    $("#buttonItemsModal").show();
    console.log("tama;o de lista de equipo",listItems.length)
    for (var i = 0; i < listItems.length; i++) {
        let tipoItem = listItems[i].tipo;
        let marcaItem = listItems[i].marca;
        let modeloItem = listItems[i].modelo;
        let serieItem = listItems[i].serie;
        let colorItem = listItems[i].color;
        let id = listItems[i].id;
        var newRow = $('<tr>');
        newRow.append($('<td>').text(tipoItem));
        newRow.append($('<td>').text(marcaItem));
        newRow.append($('<td>').text(modeloItem));
        newRow.append($('<td>').text(serieItem));
        newRow.append($('<td>').text(colorItem));
        let isChecked= listItems[i].check == true ? 'checked' : '';
        newRow.append('<td ><input class="form-check-input checkboxGroupEquipos" type="checkbox" id='+id+' '+isChecked+'></td>');
        newRow.append('</tr>');
        $('#tableItems').append(newRow);
    }
    if(listItems.length == 0){
        var newRow = $('<tr>');
        newRow.append($('<td colspan="3">').text('No existen Equipos'));
        newRow.append('</tr>');
        $('#tableItems').append(newRow);
    }
}

function registrarIngreso(){
    
    /* fetch(url + urlScripts, {
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
    }); */

}

//FUNCION llenar tabla de vehiculos en la primera carga
function tableFillVehiculos(dataUser){
    
    let listCars = dataUser.vehiculos.length > 0 ? dataUser.vehiculos: [];
    listCars.forEach(function(dic) {
        dic.id = Math.floor(Math.random() * 1000000);;
    });
    listVehiculesData = listCars;
    listVehiculesData.forEach(function(dic) {
        dic.check = false;
    });

    $("#buttonCarsModal").show();
    console.log("LISTA DE CARROS", listCars.length)
    for (var i = 0; i < listCars.length; i++) {
        let tipoCar = listCars[i].tipo;
        let marcaCar = listCars[i].marca;
        let modeloCar = listCars[i].modelo;
        let matriculaCar = listCars[i].placa;
        let colorCar = listCars[i].color;
        let id = listCars[i].id;
        var newRow = $('<tr>');
        newRow.append($('<td>').text(tipoCar));
        newRow.append($('<td>').text(marcaCar));
        newRow.append($('<td>').text(modeloCar));
        newRow.append($('<td>').text(matriculaCar));
        newRow.append($('<td>').text(colorCar)); 
        let isChecked= listCars[i].check == true ? 'checked' : '';
        newRow.append('<td><input class="form-check-input radioGroupItems" type="radio"  name="groupCarList" id='+id+' '+isChecked+'></td>');
        newRow.append('</tr>');
        $('#tableCars').append(newRow);
    }
    if(listCars.length == 0){
        var newRow = $('<tr>');
        newRow.append($('<td colspan="3">').text('No existen Vehiculos'));
        newRow.append('</tr>');
        $('#tableCars').append(newRow);
    }
}


function getSelectedCheckbox(tableId, classCheckbox, checkboxesSeleccionados){
    let group= document.querySelectorAll('.'+classCheckbox)
    group.forEach(checkbox => {
        if(checkbox.checked){
            checkboxesSeleccionados.push(parseInt(checkbox.id))
        }
  });
    console.log("INFOO",checkboxesSeleccionados)
    //return checkboxesSeleccionados
}

//FUNCION al pedir la opcion information user al setear la data
function optionInformationUser(data){
    let { portador,ultimo_acceso, vehiculos, equipo, validaciones}= data
    if(data.hasOwnProperty('portador') && data.hasOwnProperty('validaciones') && data.hasOwnProperty('ultimo_acceso')){
        //---Movement
        if(validaciones.accion_ingreso == 'Entrada'){
            $("#buttonIn").show();
            $("#textIn").show();
        }else if(validaciones.accion_ingreso == 'Salida'){
            $("#buttonOut").show();
            $("#textOut").show();
        }
        $("#buttonNew").hide();
        $("#buttonCard").show();
        $("#buttonClean").show();

        //---Bitacora TABLA ULTIMOS ACCESOS

        let listBitacora = ultimo_acceso.length > 0 ? ultimo_acceso: [];
        for (var i = 0; i < listBitacora.length; i++) {
            //if(i < 3){
                let duration=segundosAHoras(listBitacora[i].duration)
                var newRow = $('<tr>');
                newRow.append($('<td>').text(listBitacora[i].nombre_visita ? listBitacora[i].nombre_visita : ''));
                newRow.append($('<td>').text(listBitacora[i].location ? listBitacora[i].location : ''));
                newRow.append($('<td>').text(duration? duration : ''));
                newRow.append('</tr>');
                $('#tableBitacora').append(newRow);
            //}
        }
        if(listBitacora.length > 3){
            $("#buttonBitacoraModal").show();
            for (var i = 0; i < listBitacora.length; i++) {
                let duration=segundosAHoras(listBitacora[i].duration)
                var newRow = $('<tr>');
                newRow.append($('<td>').text(listBitacora[i].nombre_visita ? listBitacora[i].nombre_visita : ''));
                newRow.append($('<td>').text(listBitacora[i].location ? listBitacora[i].location : ''));
                newRow.append($('<td>').text(duration ? duration : ''));
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
    $('#tipoPaseText').text('')
    $('#name').text('')
    $('#rfc').text('')
    $('#validity').text('')
    $('#status').text('')
    $('#motivo').text('')
    $('#visit').text('')
    $('#authorizePase').text('')
    $('#authorizePhone').text('')

    setHideElements('dataHide');
    setHideElements('buttonsOptions');
    setHideElements('buttonNew');
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

//FUNCION para guardar equipos entas con checkbox
function agregarEquipoAModal(){
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
        listNewItems.push({ marca_item: marca, type_item: tipo, model_item: modelo, color_item:color , noserie_item:noserie});
        let newRow2 = $('<tr>');
        newRow2.append($('<td>').text(tipo));
        newRow2.append($('<td>').text(marca));
        newRow2.append($('<td>').text(modelo));
        newRow2.append($('<td>').text(noserie));
        newRow2.append($('<td>').text(color));
        newRow2.append('</tr>');
        console.log("NEW ROWWW",newRow2)
        $('#tableAddItemsModal').append(newRow2);

        $("#selectTipoEquipo-123").val('');
        $("#inputNombreEquipo-123").val('');
        $("#inputMarcaItem").val('');
        $("#inputModeloItem").val('');
        $("#inputSerieItem").val('');
        $("#inputColorItem").val('');
        $("#alertItemModal").hide();
        $('#equipmentModal').modal('hide');
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
    console.log("SAVE CAR")
    if(!validation){
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
        $("#selectTipoVehiculo-123").val('');
        $("#selectCatalogMarca-123").val('');
        $("#selectModeloVehiculo-123").val('');
        $("#selectMatriculaVehiculo-123").val('');
        $("#selectColorVehiculo-123").val('');
        $("#carModal").modal('hide');
    }else{
        Swal.fire({
            title: "Validación",
            text: "Faltan campos por llenar, completa los campos marcados con asterisco",
            type: "warning"
        });

    }
}


//FUNCION ver modal para agregar vehiculos
function setViewModalCard(){
    selectedVehiculos=[]
    getSelectedCheckbox('tableItems', 'radioGroupItems', selectedVehiculos)
    let selectedItems= listVehiculesData.filter(elemento => selectedVehiculos.includes(elemento.id));
    $('#listAddCarsModal').modal('show');
    let tabla = document.getElementById('tableAddCarsModal');
    let tbody = tabla.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    if(selectedItems.length>0 ){
        for (var i = 0; i < selectedItems.length; i++) {
            let tipoCar = selectedItems[i].tipo;
            let marcaCar = selectedItems[i].marca;
            let modeloCar = selectedItems[i].modelo;
            let matriculaCar = selectedItems[i].placa;
            let colorCar = selectedItems[i].color;
            var newRow = $('<tr>');
            newRow.append($('<td>').text(tipoCar));
            newRow.append($('<td>').text(marcaCar));
            newRow.append($('<td>').text(modeloCar));
            newRow.append($('<td>').text(matriculaCar));
            newRow.append($('<td>').text(colorCar));
            newRow.append('</tr>');
            $('#tableAddCarsModal').append(newRow);
        }
    } else{
        var newRow = $('<tr>');
        newRow.append($('<td colspan="3">').text('No existen Vehiculos Seleccionados o añadidos'));
        newRow.append('</tr>');
        $('#tableAddCarsModal').append(newRow);
    }
}


//FUNCION ver modal para agregar equipos
function setViewModalItem(){
    selectedEquipos=[]
    getSelectedCheckbox('tableItems', 'checkboxGroupEquipos', selectedEquipos)
    let selectedItems= listItemsData.filter(elemento => selectedEquipos.includes(elemento.id));
    console.log("MODAL EQUIPOS", listItemsData, selectedItems)
    $('#listAddItemsModal').modal('show');
    let tabla = document.getElementById('tableAddItemsModal');
    let tbody = tabla.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    if(selectedItems.length>0){
        for (var i = 0; i < selectedItems.length; i++) {
            let tipoItem = selectedItems[i].tipo;
            let marcaItem = selectedItems[i].marca;
            let modeloItem = selectedItems[i].modelo;
            let serieItem = selectedItems[i].serie;
            let colorItem = selectedItems[i].color;
            var newRow = $('<tr>');
            newRow.append($('<td>').text(tipoItem));
            newRow.append($('<td>').text(marcaItem));
            newRow.append($('<td>').text(modeloItem));
            newRow.append($('<td>').text(serieItem));
            newRow.append($('<td>').text(colorItem));
            newRow.append('</tr>');
            $('#tableAddItemsModal').append(newRow);
        }
    }else{
        var newRow = $('<tr>');
        newRow.append($('<td colspan="3">').text('No existen equipos seleccionados'));
        newRow.append('</tr>');
        $('#tableAddItemsModal').append(newRow);
    }
}


//FUNCION buscar curp
function setCurpSearch(curp){
    $("#inputCodeUser").empty();
    $("#inputCodeUser").val(curp);
    $('#listModal').modal('hide');
    getDataUser();
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
            option: opScriptCatalog,
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


//FUNCION obtener la imagen del canvas
function getScreenCard(){
    //-----Save Photo
    if(!flagVideoCard){
        flagVideoCard = true;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }})
            .then(function(stream) {
                let video = document.createElement('video');
                video.style.width = '200px';
                video.style.height = '125px';
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
                let video = document.createElement('video');
                video.style.width = '200px';
                video.style.height = '125px';
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
    console.log("is BLACNK",flagBlankCard)
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
                    console.log("URLLLLLL",urlImgCard)
                    //----Clean Canvas
                    var canvas = document.getElementById('canvasPhoto');
                    var ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    let imgC =document.getElementById('imgCard')
                    imgC.src=urlImgCard
                }else if(type == 'inputUser'){
                    urlImgUser = res.file;
                    //----Clean Canvas
                    var canvas = document.getElementById('canvasPhotoUser');
                    var ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    let imgU =document.getElementById('imgUser')
                    imgU.src=urlImgCard
                }
            }else{
                console.log('Error aqui 2');
                return 'Error';
            }
        })
        .catch(error => {
            console.log('Error aqui 3');
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
