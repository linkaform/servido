//-----Variables
let listItemsData = []
let listVehiculesData = []

let listNewVehicules = []
let listNewItems = []
let idScriptCatalog=117935;
let opScriptCatalog='catalog_brands';
let dataCatalogs="";
let listUserActives = [];
let urlImgCard = '';
let urlImgUser = '';
let flagVideoCard = false;
let flagVideoUser = false;
let codeUserVisit=""
let urlLinkaform = 'https://app.linkaform.com/api/infosync/scripts/run/';
let userJwt = getCookie("userJwt");

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
    setValueUserLocation('accesos');

    changeButtonColor();

    fillCatalogs();

    selectLocation= document.getElementById("selectLocation")
    selectLocation.onchange = function() {
        let response = fetchOnChangeLocation()
    };
   selectCaseta= document.getElementById("selectCaseta")
    selectCaseta.onchange = function() {
        let response = fetchOnChangeLocation()
    };
    selectLocation.disabled=true
    selectCaseta.disabled=true

    setHideElements('dataHide');
    setSpinner(true, 'divSpinner');
    let user = getCookie("userId");
    let jw = getCookie("userJwt");
    if(user !='' && jw!=''){
        //----QUery
        setDataInformation('alerts',data = {})
        getDataListUser();
    }else{
        redirectionUrl('login',false)
    }
    
    customNavbar(getValueUserLocation(), getCookie('userTurn'));

    getCatalogs()
}

function asignarNuevaVisita(){
    let nombre=$("#inputNombreNV").val();
    let razonSocial=$("#inputRazonSocialNV").val();
    let areaQueVisita=$("#inputAreaVisitaNV").val();
    let visitaA=$("#selectVisitaNV").val();
    let motivoVisita=$("#inputMotivoVisitaNV").val();
    if(nombre!=='' , razonSocial!=='', areaQueVisita!=='', visitaA!=='', motivoVisita!==''){
        console.log("asignar nueva visita",nombre, razonSocial,areaQueVisita, visitaA, motivoVisita);
        fetch(urlLinkaform, {
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
                'Authorization': 'Bearer '+jw

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

function limpiar(){

}
function agregaEquipo(){
    let nombre=$("#inputNombreNV").val();
    let razonSocial=$("#inputRazonSocialNV").val();
    let areaQueVisita=$("#inputAreaVisitaNV").val();
    let visitaA=$("#selectVisitaNV").val();
    let motivoVisita=$("#inputMotivoVisitaNV").val();
    if(nombre!=='' , razonSocial!=='', areaQueVisita!=='', visitaA!=='', motivoVisita!==''){
        console.log("asignar nuevo equipo",nombre, razonSocial,areaQueVisita, visitaA, motivoVisita);
        fetch(urlLinkaform, {
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
                'Authorization': 'Bearer '+jw

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
    }else{
         Swal.fire({
          title: "Validación",
          text: "Faltan campos por llenar, completa los campos marcados con asterisco",
          type: "warning"
        });
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



//---Close Sesión
function setCloseSession() {
    closeSession();
    redirectionUrl('login',false);
}

//-----Function Get Data
function getDataAlert() {
    
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
    //----Val
    let codeUser  = $("#inputCodeUser").val();
    //----Cookie 
    let urlLinkaform = 'https://app.linkaform.com/api/infosync/scripts/run/';
    let userJwt = getCookie("userJwt");
    fetch(urlLinkaform, {
        method: 'POST',
        body: JSON.stringify({
            script_id: 116097,
            option: 'get_users_information',
            curp: codeUser,
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
            
            setDataInformation('informatioUser',data)
            setTimeout(() => {
               
            }, "1000");
        } 
    })
    setHideElements('buttonsModal');
    $("#divSpinner").hide();
    setHideElements('dataShow');
}

function getDataListUser(){
    let urlLinkaform = 'https://app.linkaform.com/api/infosync/scripts/run/';
    let userJwt = getCookie("userJwt");
    fetch(urlLinkaform, {
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
            let data = res.response.json;
            listUserActives = data;
            setDataInformation('listUsers',data)
        } 
    })
}


//-----Function Set Data
function setDataUser(){
    //----Val
    let codeUser  = $("#inputCodeUser").val();
    $("#buttonIn").hide();
    $("#buttonOut").hide();
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
            curp: codeUser,
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
                title   : "Exito!",
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

function setDataGafete(data = {}){
    //----Val
    let codeUser  = $("#inputCodeUser").val();
    //----Cookie 
    let urlLinkaform = 'https://app.linkaform.com/api/infosync/scripts/run/';
    let userJwt = getCookie("userJwt");
    //----Fetch
    fetch(urlLinkaform, {
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
                    newRow.append('</tr>');
                    $('#tableItems').append(newRow);
                }
            }
            
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
                    newRow.append('</tr>');
                    $('#tableCars').append(newRow);
                }
            }
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
            if(listLocations.length == 0){
                var newRow = $('<tr>');
                newRow.append($('<td colspan="3">').text('No existen Vehiculos'));
                newRow.append('</tr>');
                $('#tableModalInstructions').append(newRow);
            }
        }
    }else if(option == 'listUsers'){
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
    }else if(option == 'checkOtro'){
        let checkboxMarcado = document.getElementById("checkOtro").checked;
        if (checkboxMarcado) {
            $('#inputOtroDescCard').show();
            $('#inputOtroDescCard').addClass("form-gafete");
        }else{
            $('#inputOtroDescCard').hide();
            $('#inputOtroDescCard').removeClass("form-gafete");
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
        console.log('OCULTAR')

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
    $('#tipoPaseText').text('')
    $('#name').text('')
    $('#rfc').text('')
    $('#validity').text('')
    $('#status').text('')
    $('#motivo').text('')
    $('#visit').text('')
    $('#authorizePase').text('')
    $('#authorizePhone').text('')

}

//----Function Search Data
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
    let tipo= $("#selectTipoEquipo-123").val();
    let nombre=$("#inputNombreEquipo-123").val();
    let marca=$("#inputMarcaItem").val();
    let modelo=$("#inputModeloItem").val();
    let noserie=$("#inputSerieItem").val();
    let color=$("#inputColorItem").val();

    console.log('console',tipo, nombre)
    if(tipo==''|| nombre=='' ){
        validation=true
    }
    if(!validation){
            fetch(urlLinkaform, {
        method: 'POST',
        body: JSON.stringify({
            script_id: idScript,
            option: 'add_new_equip',

        }),
        headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+jw

            },
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                //CODE una vez resulta la imagen, cargarla en front
                dicData={ data: {}}
                console.log("RESPONSE", data)
            } 
        });


        listNewItems.push({ marca_item: marca, type_item: tipo, model_item: modelo, color_item:color });
        let newRow = $('<tr>');
        newRow.append($('<td>').text(tipo));
        newRow.append($('<td>').text(marca));
        newRow.append($('<td>').text(color));
        newRow.append('</tr>');
        console.log("apend", $('#tableAddItemsModal'))
        $('#tableItems').append(newRow);
         let newRow2 = $('<tr>');
        newRow2.append($('<td>').text(tipo));
        newRow2.append($('<td>').text(marca));
        newRow2.append($('<td>').text(modelo));
        newRow2.append($('<td>').text(noSerie));
        newRow2.append($('<td>').text(color));
        newRow2.append('</tr>');
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

function getSaveCar(){
    let dicData = {};
    let validation = false;
    let tipoVehiculo= $('#selectTipoVehiculo-123').val();
    let marca= $('#selectCatalogMarca-123').val();
    let modelo= $('#selectModeloVehiculo-123').val();
    let matricula= $('#inputMatriculaVehiculo-123').val();
    let color= $('#inputColor-123').val();
      if(tipoVehiculo==''){
        validation=true
    }
    if(!validation){
        let newRow = $('<tr>');
        newRow.append($('<td>').text(marca));
        newRow.append($('<td>').text(matricula));
        newRow.append($('<td>').text(color));
        newRow.append('</tr>');
        console.log("apend", $('#tableAddItemsModal'))
        $('#tableCars').append(newRow);

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
        console.log('sefswedfs',listItemsData)
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

//-----Search List
function setCurpSearch(curp){
    $("#inputCodeUser").empty();
    $("#inputCodeUser").val(curp);
    $('#listModal').modal('hide');
    getDataUser();
}

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
    }else{
        $("#alert_gafete_modal").show();
    }
}


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

function getCatalogs(){
    $("#selectTipoVehiculo-123").prop( "disabled", true );
    $("#divCatalogMarca123").hide();
    $("#divCatalogModelo123").hide();
    fetch(urlLinkaform, {
        method: 'POST',
        body: JSON.stringify({
            script_id: idScriptCatalog,
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
            dataCatalogs = res.response.data;
            console.log('dataaaa', dataCatalogs)
            $("#selectTipoVehiculo-123").prop( "disabled", false );
            $("#spinnerTipoVehiculo").css("display", "none");
            dataCatalogs.types_cars.forEach(function(e, i){
            $("#datalistOptionsTipo").append($('<option></option>').val(e).text(e));
            });
        } 
    })
}

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


//INFO: TOMAR FOTO EN MODAL NUEVA VISITA

function isCanvasBlank(canvas) {
  const context = canvas.getContext('2d');
  const pixelBuffer = new Uint32Array(
    context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
  );
  return !pixelBuffer.some(color => color !== 0);
}

function getScreenCard(){
    console.log("HELLOO")
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

function setTranslateImageUser(context, video, canvas){
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let photoCard = document.getElementById('imgUser');
    console.log("PHOTOSS",photoCard)
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

//------FUNCTION IMG
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
