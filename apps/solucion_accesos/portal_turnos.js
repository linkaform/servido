let userJwt ="";
let user="";
let urlLinkaform='https://app.linkaform.com/api/';
let urlScripts='infosync/scripts/run/';
let idScript= 117936;
let userTurnCookie=''

let img="https://static.vecteezy.com/system/resources/previews/007/468/567/non_2x/colorful-simple-flat-of-security-guard-icon-or-symbol-people-concept-illustration-vector.jpg";

var dataTableGuardiasApoyo = [];

var dataTableNotas = [];

const columsDataNotas = [
    {title:"Guardia", field:"name", width:160, responsive:0}, //never hide this column
    {title:"Nota", field:"note", width:330,tooltip:true},
    { title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:110,
         formatter: (cell, formatterParams) => {
            //----Button Trash
            let folio = cell.getData().folio ? cell.getData().folio : 0;
            let divActions = '<div class="row d-flex">';
            divActions += `<button class="btn-table-bitacora" onClick="setModal('Cars',${folio})" ><i class="fa-regular fa-circle-check"></i></button>`;
            divActions += `<button class="btn-table-bitacora" onClick="setModal('Tools',${folio})" ><i class="fa-regular fa-eye"></i></button>`;
            divActions += `<button class="btn-table-bitacora" onClick="setModalEditNotes('Card',${folio})" data-toggle="modal" data-target="#modalEditNotes"><i class="fa-solid fa-pen"></i></button>`;
            divActions += '</div>';
            return divActions;
        },
    },
];

const columsDataGuardiasApoyo = [
    { title:"Guardias de Apoyo", field:'name',hozAlign:"left",headerFilter:true,width:390,
         formatter: (cell, formatterParams) => {
            let data = cell.getData();
            let folio = cell.getData().folio ? cell.getData().folio : 0;

            let divActions = '<div class="d-flex flex-row" id="listOfGuards">';
            divActions+= '<div col-sm-12 col-md-12 col-lg-6 col-xl-6 > <img id="imgGuardiaApoyo" height="60" width="60" src="'
            + data.image + '"> </div > <div col-sm-12 col-md-12 col-lg-6 col-xl-6 class="flex-column ms-3"> <div> <b>'
            + data.name +'</b> </div><div> '+data.status+'</div> <div id='+ data.folio +'></div> </div>';
            divActions += '</div>';
            return divActions;
        },
    },
    { title: "", field: "actions" , hozAlign: "left", resizable:false,width:10,
        formatter: (cell, formatterParams) => {
            let data = cell.getData();
            //----Button Trash
            let folio = cell.getData().folio ? cell.getData().folio : 0;
            let divActions = '<div class="row d-flex justify-content-center ml-0">';
            divActions += ` <input class="form-check-input" style="height:15px !important; width:2px;" type="checkbox">`;
            divActions += '</div>';
            return divActions;
        },
    },
    
];

function changeImageGuard(){
     fetch(urlLinkaform + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_id: idScript,
            option: 'change_image_guard',
            email : 'guardia1@linkaform.com'
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
        } 
    });
}


function getGuardLocationListGuardsNotes(){

    fetch(urlLinkaform + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_id: idScript,
            option: 'location_guard',
            email : 'guardia1@linkaform.com'
        }),
        headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+userJwt

            },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            let { booth, location, folio, status} = res.response.data
            console.log("LOCATION INFO", res.response.data)
            $("#textUbicacion").text();
            $("#textCuidad").text('')
            $("#textEstado").text('')
            $("#textDireccion").text('')
            $("#textUbicacion").text(location)
            $("#textCaseta").text(booth)
            setCookie("userTurn", status , 7);
            changeStatusTurn(false)
        } 
    });

 fetch(urlLinkaform + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_id: idScript,
            option: 'list_chiken_guards',
            booth : 'Caseta Vigilancia Poniente 7',
            location : 'Planta Monterrey'
        }),
        headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+userJwt,

            },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            for(guardia of res.response.data){
                dataTableGuardiasApoyo.push({name: guardia.name_guard, status: "Disponible", image: guardia.img_url})
                  if(user !='' && userJwt!=''){
                     drawTableNotas('tableGuardiasApoyo',columsDataGuardiasApoyo,dataTableGuardiasApoyo, "475px");}
            }


        } 
    });


 fetch(urlLinkaform + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_id: idScript,
            location : 'Planta Puebla',
            option: 'notes_guard',
            booth : 'Caseta Vigilancia Norte 8'
        }),
        headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+userJwt,

            },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            console.log("NOTES GUARDS", res.response.data)
             for(nota of res.response.data){
                dataTableNotas.push({name: nota.catalogo_guardia_nombre, note: nota.notas_nota, check: "red", view:"14/04/1984", edit:""})
                  if(user !='' && userJwt!=''){
                     drawTableNotas('tableNotas',columsDataNotas, dataTableNotas ,"180px");}
            }
        } 
    });
}

window.onload = function(){
    user = getCookie("userId");
    userJwt = getCookie("userJwt");
    userTurnCookie= getCookie("userTurn");

    setValueUserLocation('portal_turns');
    customNavbar(getValueUserLocation(), getStatusTurn());
    changeStatusTurn(false)
    getGuardLocationListGuardsNotes()

    if(user !='' && userJwt!=''){
       drawTableNotas('tableNotas',columsDataNotas, dataTableNotas ,"180px");
       drawTableNotas('tableGuardiasApoyo',columsDataGuardiasApoyo,dataTableGuardiasApoyo, "475px");
    } else{
        redirectionUrl('login',false);
    }
    const date = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
    const hour = new Date().toLocaleTimeString();

    $('#todayDateText').append($('<div class="myDateClass"> '+ date +'</div>'));
    $("#textName").html(getCookie('userName'));
    $("#textPosition").text(getCookie('userPosition'));
    $("#textEmail").text(getCookie('userEmail'));
    $("#imgProfilePic").attr("src", getCookie('userImg'));
    $("#textUbicacion").html();
}

function AlertAndActionChangeStatusTurn(){
    Swal.fire({
      title:'Confirmación',
      text:  getCookie("userTurn")== 'turno_cerrado'? "¿Seguro que quieres iniciar el turno?": "¿Seguro que quieres cerrar el turno?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.value) {
         changeStatusTurn(true);
      }
    });
}

function changeStatusTurn(buttonClick){
    userTurnCookie= getCookie("userTurn");
    const hour = new Date().toLocaleTimeString();
     let td = $("#statusTurnText");
        if (td.length > 0) {
            td.find(".text-danger").remove();
            td.find(".text-success").remove();
        }
        
        // CODE : aqui fetch para modificar el status , meter estos dos if en el response del fetch
    if(userTurnCookie == 'turno_abierto' && buttonClick ){  
        setCookie("userTurn", "turno_cerrado",7)   

        $('#statusTurnText').append($('<div class="text-danger" id="statusOff"> Turno Cerrado</div>'));
        $('#buttonChangeStatusTurn').text('Iniciar Turno').removeClass('btn-danger').addClass('btn-success');
         customNavbar(getValueUserLocation(), getCookie('userTurn'))

    }else if (userTurnCookie == 'turno_cerrado' && buttonClick){
        setCookie("userTurn", "turno_abierto",7)
        $("#todayHourText").html(hour)
        $('#statusTurnText').append($('<div class="text-success" id="statusOn"> Turno Iniciado</div>'));
        $('#buttonChangeStatusTurn').text('Cerrar Turno').removeClass('btn-success').addClass('btn-danger');
        customNavbar(getValueUserLocation(), getCookie('userTurn'))

    } else if(buttonClick== false){
        // CODE : aqui agregar fetch para obtener el turno del guardia
        $("#todayHourText").html(hour)
        userTurnCookie == 'turno_cerrado'? $('#buttonChangeStatusTurn').text('Iniciar Turno').addClass('btn-success'): 
        $('#buttonChangeStatusTurn').text('Cerrar Turno').addClass('btn-danger');
        userTurnCookie == 'turno_cerrado'? $('#statusTurnText').append($('<div class="text-danger" id="statusOff"> Turno Cerrado</div>')):
        $('#statusTurnText').append($('<div class="text-success" id="statusOn"> Turno Iniciado</div>'));
         customNavbar(getValueUserLocation(), getCookie('userTurn'))
    }
}



//-----TABLES
function drawTableNotas(id, columnsData, tableData, height){
  var  table = new Tabulator("#" + id, {
    layout:"fitDataStretch",
    height:height,
    data:tableData,
    textDirection:"ltr",
    columns:columnsData,
    pagination:true, 
    paginationSize:40,
  });
}




function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires+"; SameSite=Strict";
}


