let userJwt ="";
let user="";
//let urlLinkaform='https://app.linkaform.com/api/';
// let urlLinkaform='http://192.168.0.25:8000/api/';
let urlScripts='infosync/scripts/run/';
let idScript= 117926;
let userTurnCookie=''
let caseta=""
let ubicacion=""
let tables={}


let img="https://static.vecteezy.com/system/resources/previews/007/468/567/non_2x/colorful-simple-flat-of-security-guard-icon-or-symbol-people-concept-illustration-vector.jpg";

var dataTableGuardiasApoyo = [];
var dataTableNotas = [];
var dataTableCambiarCaseta = [
    {name:"Caseta 1 Poniente", ubi:"Cumbres"},{name:"Caseta 1 Sur", ubi:"Santa Catarina"},
    {name:"Caseta 4 Poniente", ubi:"Monterrey"},{name:"Caseta 3 Sur", ubi:"Escobedo"},
    {name:"Caseta 6 Poniente", ubi:"San Jeronimo"},{name:"Caseta 6 Sur", ubi:"Monterrey"}];

const columsDataNotas = [
    {title:"Guardia", field:"name", width:160, responsive:0}, //never hide this column
    {title:"Nota", field:"note", width:330, resizable:true, tooltip:true},
    { title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:110,
         formatter: (cell, formatterParams) => {
            //----Button Trash
            let data = cell.getData();
            let folio = cell.getData().folio ? cell.getData().folio : 0;
            let divActions = '<div class="row d-flex">';
            divActions += `<button class="btn-table-bitacora" onclick="cerrarNotaAlert('${data.name}', '${data.note}', ${folio})" ><i class="fa-regular fa-circle-check"></i></button>`;
            divActions += `<button class="btn-table-bitacora" onclick="verNotasAlert('${data.name}', '${data.note}')" > <i class="fa-regular fa-eye"></i></button>`;
            divActions += '</div>';
            return divActions;
        },
    },
];

const columsCambiarCaseta = [
    {title:"Caseta", field:"name", width:240, responsive:0}, //never hide this column
    {title:"Ubicacion", field:"ubi", width:330, resizable:true, tooltip:true},

];



const columsDataGuardiasApoyo = [
    { title:"Guardias de Apoyo", field:'name',hozAlign:"left",headerFilter:true,width:390,
         formatter: (cell, formatterParams) => {
            let data = cell.getData();
            let folio = cell.getData().folio ? cell.getData().folio : 0;

            let divActions = '<div id="inf'+data.folio +'"><div class="d-flex flex-row" id="listOfGuards">';
            divActions+= '<div col-sm-12 col-md-12 col-lg-6 col-xl-6> <img id="imgGuardiaApoyo" height="60" width="60" src="'
            + data.image + '"> </div > <div col-sm-12 col-md-12 col-lg-6 col-xl-6 class="flex-column ms-3"> <div> <b>'
            + data.name +'</b> </div><div id="idStatusGuardia"> '+ data.status +'</div> <div> Fecha de inicio: '+ data.fechaInicio +'</div> </div>';
            divActions += '</div> </div>';
            return divActions;
        },
    },
    { title: "", field: "actions" , hozAlign: "left", resizable:false,width:10,
        formatter: (cell, formatterParams) => {
            let data = cell.getData();
            //----Button Trash
            let folio = cell.getData().folio ? cell.getData().folio : 0;
            let divActions = '<div class="row d-flex justify-content-center ml-0" id="inf2'+data.folio +'">';
            divActions += `<button class="btn-table-bitacora buttonTrash" onClick="eliminarGuardia('${folio}', '${data.name}');">
            <i class="fa-solid fa-door-open"></i></button>`;
            divActions += '</div>';
            return divActions;
        },
    },
    
];

function changeImageGuard(){
     fetch(url + urlScripts, {
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

function getAllData(){
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_id: idScript,
            option: 'get_all_catalogs',
            email : 'guardia1@linkaform.com',
            booth : 'Caseta Vigilancia Poniente 7',
            location : 'Planta Monterrey'
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
        let allcatalogs={
            notes_guard:{

            },
            location_guard:{

            },
            list_chiken_guards:{

            },
        };
    });

}
function getGuardLocationListGuardsNotes(){

    fetch(url + urlScripts, {
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
            if(booth || location|| folio||  status){
                caseta=booth;
                ubicacion=location;
                $("#textUbicacion").text();
                $("#textCuidad").text('')
                $("#textEstado").text('')
                $("#textDireccion").text('')
                $("#textUbicacion").text(location)
                $("#textCaseta").text(booth)
                setCookie("userTurn", status , 7);
                changeStatusTurn(false)
            }else{
                caseta="Caseta 1";
                ubicacion='Monterrey';
                $("#textCuidad").text('Apodaca')
                $("#textEstado").text('Nuevo Leon')
                $("#textDireccion").text("Colonia Las Puentes 2do Sector")
                $("#textUbicacion").text("Caseta 1")
                $("#textCaseta").text('Monterrey')
                if(!getCookie('userTurn')){
                    setCookie("userTurn", 'turno_abierto' , 7);
                }
                changeStatusTurn(false)
            }
           
        } 
    });

 fetch(url + urlScripts, {
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
            if(res.response.data.length > 0){
                for(guardia of res.response.data){
                    dataTableGuardiasApoyo.push({name: guardia.name_guard, status: "Disponible", image: guardia.img_url})
                }
            }else{
                dataTableGuardiasApoyo.push(
                    {name:"María Fernanda García", status: "Disponible", image: "https://w7.pngwing.com/pngs/298/171/png-transparent-avatar-face-girl-female-woman-profile-happy-avatar-icon.png", fechaInicio: "31 Enero 2024", folio:1},
                    {name:"Juan Carlos Rodríguez", status: "Disponible", image: "https://w7.pngwing.com/pngs/900/441/png-transparent-avatar-face-man-boy-male-profile-smiley-avatar-icon.png",fechaInicio: "28 Enero 2024",folio:2},
                    {name:"Laura Pérez Martínez", status: "Disponible", image: "https://w7.pngwing.com/pngs/210/236/png-transparent-avatar-face-girl-female-woman-profile-happy-avatar-icon.png",fechaInicio: "12 Febrero 2024",folio:3},
                    {name:"Alejandro López Sánchez", status: "Disponible", image: "https://cdn.icon-icons.com/icons2/2859/PNG/512/avatar_face_man_boy_male_profile_smiley_happy_people_icon_181657.png",fechaInicio: "12 Febrero 2024",folio:4},
                    {name:"Ana María González Ruiz", status: "Disponible", image: "https://cdn.icon-icons.com/icons2/2859/PNG/512/avatar_face_man_boy_male_profile_smiley_happy_people_icon_181661.png",fechaInicio: "10 Marzo 2024",folio:5})
            }
            

        if(user !='' && userJwt!=''){
            drawTableNotas('tableGuardiasApoyo',columsDataGuardiasApoyo,dataTableGuardiasApoyo, "420px");
             drawTableNotas('tableCambiarCaseta',columsCambiarCaseta, dataTableCambiarCaseta ,"360px");
            }
        } 
    });


 fetch(url + urlScripts, {
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
             for(nota of res.response.data){
                dataTableNotas.push({name: nota.catalogo_guardia_nombre, note: nota.notas_nota, check: "red", view:"14/04/1984", edit:""})
                
            }
            if(user !='' && userJwt!=''){
                 drawTableNotas('tableNotas',columsDataNotas, dataTableNotas ,"180px");}  
        } 
    });
}

window.onload = function(){
    user = getCookie("userId_soter");
    userJwt = getCookie("userJwt_soter");
    userTurnCookie= getCookie("userTurn");
    setValueUserLocation('portal_turnos');
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
    $("#textName").html(getCookie('userName_soter'));
    $("#textPosition").text(getCookie('userPosition'));
    $("#textEmail").text(getCookie('userEmail'));
    $("#imgProfilePic").attr("src", getCookie('userImg'));
    $("#textUbicacion").html();
}

function AlertAndActionChangeStatusTurn(){
    let arrGuard=[];
    for(guardia of dataTableGuardiasApoyo){
        arrGuard.push(guardia.name);
    }
    Swal.fire({
      title:'Confirmación',
      html:getCookie("userTurn")== 'turno_cerrado' ?`
    ¿Seguro que quieres iniciar el turno en <b>`+ caseta+`</b>,
    en la ubicación <b>`+ ubicacion+`</b>,
    con los siguientes guardias: <b>`+ arrGuard.flat()+`? </b> ` : ` ¿Seguro que quieres cerrar el turno en <b>`+ caseta+`</b>,
    en la ubicación <b>`+ ubicacion+`</b>,
    con los siguientes guardias: <b>`+ arrGuard.flat()+`? </b> `,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Si",
      heightAuto:false,
    }).then((result) => {
      if (result.value) {
         changeStatusTurn(true);
      }
    });
}

function AlertForzarCierre(name){
    Swal.fire({
      title:'Confirmación',
      html:`
    La caseta actual no esta disponible. Fue abierta por el guardia <b>`+ name +` el día 10 de Mayo a las 11:03 horas.</b> ¿Desea proceder con el cierre forzado
    de la caseta? <b>Tenga en cuenta que una vez confirmado, esta accion no podrá deshacerse.</b>` ,
      type: "warning",
      showCancelButton: true,
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
      heightAuto:false,
    }).then((result) => {
      if (result.value) {
         //changeStatusTurn(true);
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
        $('#statusTurnText').append($('<div class="text-danger" id="statusOff"> Turno Cerrado </div>'));
        $('#buttonChangeStatusTurn').text('Iniciar Turno').removeClass('btn-danger').addClass('btn-success');
           $('#buttonAgregarGuardiaApoyo').attr("disabled", true);
            $('#buttonCambiarCaseta').attr("disabled", false);
             $('#buttonForzarCierre').attr("disabled", false);
             $('#textInfActualCaseta').text('Información actual de la caseta:')
         customNavbar(getValueUserLocation(), getCookie('userTurn'))


    }else if (userTurnCookie == 'turno_cerrado' && buttonClick){
        setCookie("userTurn", "turno_abierto",7)
        $("#todayHourText").html(hour)
        $('#statusTurnText').append($('<div class="text-success" id="statusOn"> Turno Iniciado</div>'));
        $('#buttonChangeStatusTurn').text('Cerrar Turno').removeClass('btn-success').addClass('btn-danger');
            $('#buttonAgregarGuardiaApoyo').attr("disabled", false);
        $('#buttonCambiarCaseta').attr("disabled", true);
         $('#buttonForzarCierre').attr("disabled", true);
        $('#textInfActualCaseta').text('Información:');
        customNavbar(getValueUserLocation(), getCookie('userTurn'))
    

    } else if(buttonClick== false){
        // CODE : aqui agregar fetch para cambiar el turno del guardia
        /*
        fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_id: idScript,
            location : 'Planta Puebla',
            option: 'change_turn',
            status : getCookie('userTurn')== 'turno_abierto' ? 'cerrar_turno' : 'turno_abierto'
        }),
        headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+userJwt,

            },
            })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    console.log('se ha ceerado el turno')
                    }
                } 
            });
            */
        $("#todayHourText").html(hour)
        if(userTurnCookie=='turno_cerrado'){ 
            $('#buttonChangeStatusTurn').text('Iniciar Turno').addClass('btn-success')
             $('#buttonAgregarGuardiaApoyo').attr("disabled", true);
            $('#buttonCambiarCaseta').attr("disabled", false);
            $('#textInfActualCaseta').text('Información actual de la caseta:')
            $('#statusTurnText').append($('<div class="text-danger" id="statusOff"> Turno Cerrado</div>'))
            $('#buttonForzarCierre').attr("disabled", false);
        }else if(userTurnCookie=='turno_abierto'){
            $('#buttonChangeStatusTurn').text('Cerrar Turno').addClass('btn-danger');
            $('#statusTurnText').append($('<div class="text-success" id="statusOn"> Turno Iniciado</div>'));
            $('#buttonAgregarGuardiaApoyo').attr("disabled", false);
            $('#buttonCambiarCaseta').attr("disabled", true);
            $('#buttonForzarCierre').attr("disabled", true);
            $('#textInfActualCaseta').text('Información:');
        }
         customNavbar(getValueUserLocation(), getCookie('userTurn'))
    }
}

function eliminarGuardia(folio, name){
    Swal.fire({
      title: "Check out",
      text:"¿Seguro que quieres realizar el check out al guardia de apoyo "+name+" ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {

        let divEliminar = document.getElementById("inf"+folio);
        let divEliminar2 = document.getElementById("inf2"+folio);
        divEliminar.parentNode.removeChild(divEliminar);
        divEliminar2.parentNode.removeChild(divEliminar2);
        if (tables["tableGuardiasApoyo"]) {
            tables["tableGuardiasApoyo"].redraw(); // Ejemplo de cómo usar la instancia de la primera tabla
        }
        Swal.fire({
          title: "Check out!",
          text: "Se ha realizado el checko out correctamente.",
          type: "success"
        });
      }
    });
}

function cerrarNotaAlert(name, note, folio){
    Swal.fire({
      title: "Confirmación",
      type: 'warning',
      html: ` <div class="d-flex justify-content-center mt-2" id="tableCambiarCaseta"></div>
                <div class="mb-4"><h5>¿Estás seguro que deseas cerrar esta nota?</h5></div>
        <table class='table table-borderless customShadow' style=' font-size: .8em; background-color: lightgray !important;'>
        <tbody> <tr> <td><b>Nombre:</b></td> <td> <span > `+ name +`</span></td> </tr>
        <tr> <td><b>Nota:</b></td> <td> <span > `+ note+`</span></td> </tr> </tbody> </table> `,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
      }
    });
}

function verNotasAlert(name, note){
    Swal.fire({
      title: "Nota",
      text: "Escoje una caseta para continuar...",
      html: ` <div class="d-flex justify-content-center mt-2" id="tableCambiarCaseta"></div>
      
        <table class='table table-borderless customShadow' style=' font-size: .8em; background-color: lightgray !important;'>
        <tbody> <tr> <td><b>Nombre:</b></td> <td> <span > `+ name +`</span></td> </tr>
        <tr> <td><b>Nota:</b></td> <td> <span > `+ note+`</span></td> </tr> </tbody> </table> `,
      showCancelButton: true,
      showConfirmButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cerrar"
    }).then((result) => {
      if (result.isConfirmed) {
        
      }
    });
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
  tables[id]=table;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires+"; SameSite=Strict";
}

//-----MODALS
function setModal(type = 'none',id){
    if(type == 'cambiarCasetaModal'){
        $('#cambiarCasetaModal').modal('show');
    }
}

