let userJwt ="";
let user="";
let urlLinkaform='https://app.linkaform.com/api/';
let urlScripts='infosync/scripts/run/';
let idScript= 117936;
let userTurnCookie=''
let caseta=""
let ubicacion=""
let tables={}

let img="https://static.vecteezy.com/system/resources/previews/007/468/567/non_2x/colorful-simple-flat-of-security-guard-icon-or-symbol-people-concept-illustration-vector.jpg";

var dataTableGuardiasApoyo = [];

var dataTableNotas = [];

const columsDataNotas = [
    {title:"Guardia", field:"name", width:160, responsive:0}, //never hide this column
    {title:"Nota", field:"note", width:330, resizable:true, tooltip:true},
    { title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:110,
         formatter: (cell, formatterParams) => {
            //----Button Trash
            let folio = cell.getData().folio ? cell.getData().folio : 0;
            let divActions = '<div class="row d-flex">';
            divActions += `<button class="btn-table-bitacora" onClick="setModal('Cars',${folio})" ><i class="fa-regular fa-circle-check"></i></button>`;
            divActions += `<button class="btn-table-bitacora" onClick="setModal('Tools',${folio})" ><i class="fa-regular fa-eye"></i></button>`;
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
            divActions += `<button class="btn-table-bitacora buttonTrash" onClick="eliminarGuardia('${folio}', '${data.name}');"><i class="fa fa-trash"></i></button>`;
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

function getAllData(){
    fetch(urlLinkaform + urlScripts, {
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
        console.log("reemplazar en front")
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
        console.log("res", res.response)
        if (res.success) {
            let { booth, location, folio, status} = res.response.data
            if(booth || location|| folio||  status){
                caseta=booth;
                ubicacion=location;
                console.log("LOCATION INFO", res.response.data)
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
                    console.log('sedfw')
                    setCookie("userTurn", 'turno_abierto' , 7);
                }
                changeStatusTurn(false)
            }
           
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
            console.log("RESPUESTA EN GFUARDIAS DE APOYOI",res.response.data)
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
                
            }
            if(user !='' && userJwt!=''){
                 drawTableNotas('tableNotas',columsDataNotas, dataTableNotas ,"180px");}  
        } 
    });
}

window.onload = function(){
    user = getCookie("userId");
    userJwt = getCookie("userJwt");
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
    $("#textName").html(getCookie('userName'));
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
        console.log("VALOR FORZAR CIERRE", result.value)
         //changeStatusTurn(true);
      }
    });
}


function changeStatusTurn(buttonClick){
    userTurnCookie= getCookie("userTurn");
    console.log("asda", getCookie("userTurn"))
    const hour = new Date().toLocaleTimeString();
     let td = $("#statusTurnText");
        if (td.length > 0) {
            td.find(".text-danger").remove();
            td.find(".text-success").remove();
        }
        
        // CODE : aqui fetch para modificar el status , meter estos dos if en el response del fetch
    if(userTurnCookie == 'turno_abierto' && buttonClick ){  
        setCookie("userTurn", "turno_cerrado",7)   
        console.log("aqui esotyyy")
        $('#statusTurnText').append($('<div class="text-danger" id="statusOff"> Turno Cerrado </div>'));
        $('#buttonChangeStatusTurn').text('Iniciar Turno').removeClass('btn-danger').addClass('btn-success');
         customNavbar(getValueUserLocation(), getCookie('userTurn'))

    }else if (userTurnCookie == 'turno_cerrado' && buttonClick){
        setCookie("userTurn", "turno_abierto",7)
        $("#todayHourText").html(hour)
        $('#statusTurnText').append($('<div class="text-success" id="statusOn"> Turno Iniciado</div>'));
        $('#buttonChangeStatusTurn').text('Cerrar Turno').removeClass('btn-success').addClass('btn-danger');
        customNavbar(getValueUserLocation(), getCookie('userTurn'))

    } else if(buttonClick== false){
                console.log("aqui esotyyy");
        // CODE : aqui agregar fetch para cambiar el turno del guardia
        /*
        fetch(urlLinkaform + urlScripts, {
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
        console.log('reponses',userTurnCookie)
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
  tables[id]=table;
}



function eliminarGuardia(folio, name){
    console.log("helo");
    Swal.fire({
      title: "Eliminar",
      text:"¿Seguro que quieres eliminar a "+name+" guardia de apoyo?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then((result) => {
           console.log("DIV A ELDFSEDFWAE", result, folio);
      if (result.value) {

        let divEliminar = document.getElementById("inf"+folio);
        let divEliminar2 = document.getElementById("inf2"+folio);
        divEliminar.parentNode.removeChild(divEliminar);
        divEliminar2.parentNode.removeChild(divEliminar2);
        console.log(tables, "a,jsnda")
        if (tables["tableGuardiasApoyo"]) {
            tables["tableGuardiasApoyo"].redraw(); // Ejemplo de cómo usar la instancia de la primera tabla
        }
        console.log("DIV A ELIMINAR", divEliminar);
        Swal.fire({
          title: "Eliminado!",
          text: "El guardia ha sido eliminado.",
          type: "success"
        });
      }
    });
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires+"; SameSite=Strict";
}


