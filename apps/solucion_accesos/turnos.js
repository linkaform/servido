let userJwt ="";
let urlLinkaform='https://app.linkaform.com/api/';
let userTurnCookie=''
let idScr=117936
let caseta=""
let ubicacion=""
let tables={}
let guardiasApoyo={}
let arraySelectedGuardias=[]
let img="https://static.vecteezy.com/system/resources/previews/007/468/567/non_2x/colorful-simple-flat-of-security-guard-icon-or-symbol-people-concept-illustration-vector.jpg";

var dataTableGuardiasApoyo = [];
var dataTableNotas = [];
var dataTableCambiarCaseta = [
    {name:"Caseta 1 Poniente", ubi:"Cumbres", status: 'Disponible', guard:'Juan Ecobedo' },{name:"Caseta 1 Sur", ubi:"Santa Catarina", status: 'Disponible', guard:'Francisco Flores', comment:'soy uncoment'},
    {name:"Caseta 4 Poniente", ubi:"Monterrey", status: 'No disponible', guard:'Javier Almanza' },{name:"Caseta 3 Sur", ubi:"Escobedo", status: 'No disponible', guard:'Valeria Alvarado',comment:'comentando squi'},
    {name:"Caseta 6 Poniente", ubi:"San Jeronimo", status: 'Disponible', guard:'Erika Ruiz'},{name:"Caseta 6 Sur", ubi:"Monterrey", status: 'No disponible', guard:'Daniela Cepeda',comment:'comentsario de ejemplot' }];

var dataTableAgregarGuardiaApoyo = [  
    { name: 'Juan Pérez Gomez', status: 'Disponible' , img: 'https://img.favpng.com/1/10/3/computer-icons-child-avatar-png-favpng-1KY4gtPN1Fab6LrVpVM8AjtnH.jpg', folio:20}, 
    { name: 'María Rodríguez Herandez', status: 'Disponible' , img:'https://img.favpng.com/11/2/11/child-computer-icons-avatar-png-favpng-5T7pGsVsca4MQcwET3VPe0X2n.jpg', folio:21}, 
    { name: 'Pedro Gómez Flores', status: 'Disponible' , img:'https://img.favpng.com/10/24/16/avatar-child-youtube-computer-icons-png-favpng-PTMFwE8vBZBUGaNtVmMJGxrdc.jpg', folio:22}, 
    { name: 'Ana López Rosales', status: 'Disponible' , img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStDHIGgUTPEb7gYe0oKLLp_AfrnvRgPcCkI2icqmuSU7OIQsrnVLxlRygPK1hn-Za8dlY&usqp=CAU', folio:23},
    { name: 'David Martínez Alvarado', status: 'Disponible' , img:'https://www.shareicon.net/data/512x512/2016/06/25/786530_people_512x512.png', folio:24}, 
    { name: 'Laura Ramírez LLanes', status: 'Disponible', img:'https://p7.hiclipart.com/preview/203/105/230/girl-computer-icons-avatar-child-boy-girl-face.jpg', folio:25 }, 
    { name: 'Carlos Sánchez Espinosa', status: 'Disponible' ,img:'https://www.shareicon.net/data/512x512/2016/06/25/786525_people_512x512.png', folio:26}, 
    { name: 'Elena García Garcia', status: ' Disponible' ,img:'https://cdn-icons-png.freepik.com/512/163/163813.png', folio:27}, 
    { name: 'Sofía Hernández Campos', status: 'Disponible' , img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDAdo0KjHLNxkRXKlav2OfZ7KUlwFjyY6WJTH7LrFyfD6rfeBepm5ybnFBwM_Cd7prl0s&usqp=CAU', folio:28}, 
    { name: 'Mario Castillo Hernandez', status: ' Disponible' , img:"https://www.shareicon.net/data/512x512/2016/06/25/786541_people_512x512.png", folio:29}

];

const columsDataNotas = [
    {title:"Guardia", field:"name", width:160, responsive:0}, //never hide this column
    {title:"Nota", field:"note", width:250, resizable:true, tooltip:true},
    {title:"Estatus", field:"status", width:110, resizable:true, tooltip:true},
    {title:"Imagen", field:"img", width:140, resizable:true, tooltip:true},
    { title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:110,
         formatter: (cell, formatterParams) => {
            //----Button Trash
            let data = cell.getData();
            let folio = cell.getData().folio ? cell.getData().folio : 0;
            let divActions = '<div class="row d-flex">';
            divActions += `<button class="btn-table-bitacora" onclick="cerrarNotaAlert('${data.name}', '${data.note}', ${folio},'${data.status}')" ><i class="fa-regular fa-circle-check"></i></button>`;
            divActions += `<button class="btn-table-bitacora" onclick="verNotasAlert('${data.name}', '${data.note}', ${folio}, '${data.status}', '${data.fotos}', '${data.archivos}')" > <i class="fa-regular fa-eye"></i></button>`;
            divActions += '</div>';
            return divActions;
        },
    },
];

const columsCambiarCaseta = [
    {title:"Caseta", field:"name", width:180, responsive:0}, //never hide this column
    {title:"Ubicación", field:"ubi", width:180, resizable:true, tooltip:true},
    {title:"Estatus", field:"status", width:180, resizable:true, tooltip:true},
    {title:"Guardia en turno", field:"guard", width:180, resizable:true, tooltip:true},

];

const columsAgregarGuardiaApoyo = [
    {title:"Nombre", field:"name", width:240, responsive:0}, //never hide this column
    {title:"Estatus", field:"status", width:330, resizable:true, tooltip:true},

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
            let divActions = '<div class="row d-flex justify-content-center" id="inf2'+data.folio +'">';
            divActions += `<input class="form-check-input customInputCheckout" type="checkbox" id="inp-${folio}" onClick="selectCheckboxGuardia(${data.folio });" value='${data.folio}' style="border-color:darkgray;">`;
            divActions += `<button class="btn-table-bitacora mt-3 customButtonCheckout" id="btn-${folio}" onclick="eliminarGuardia(${folio}, '${data.name}')" > <i class="fa solid fa-door-open"></i> </button>`;
            divActions += '</div>';
            return divActions;
        },
    },
    
];

function changeImageGuard(){
    document.getElementById("changeImageInputFile").click();

    /* fetch(urlLinkaform + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_id: idScr,
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
    });*/
}

document.getElementById("changeImageInputFile").addEventListener("change", function() {
    let archivoSeleccionado = event.target.files[0]; 
    if (archivoSeleccionado) {
        var lector = new FileReader(); // Crear un objeto FileReader
        lector.onload = function(event) {
            let urlImagen = event.target.result; // Obtener la URL de datos (data URL) de la imagen cargada
            localStorage.setItem("imagenURL", String(urlImagen));
            let imagenMostrada = document.getElementById("imgProfilePic");
            imagenMostrada.src = urlImagen;
            imagenMostrada.style.display = "block"; // Mostrar la imagen
            //setCookie('userImg',String(urlImagen),7)
            let imagenMostradaNavbar = document.getElementById("imageUserNavbar");
            imagenMostradaNavbar.src= urlImagen;
            imagenMostradaNavbar.style.display = "block";
        };
        lector.readAsDataURL(archivoSeleccionado);
    }
})

function getAllData(){
    fetch(urlLinkaform + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_id: idScr,
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
    console.log("que pasa",urlLinkaform + urlScripts)
    fetch(urlLinkaform + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_id: 117935,
            option: 'location_guard',
            email : 'guardia1@linkaform.com'
        }),
        headers:{
                'Content-Type': 'application/json',

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
            
            }
           
        } 

    });

        caseta="Caseta 1 Sur";
                ubicacion='Monterrey';
                $("#textCuidad").text('Apodaca')
                $("#textEstado").text('Nuevo Leon')
                $("#textDireccion").text("Colonia Las Puentes 2do Sector")
                setCookie('userCaseta', caseta,7)
                setCookie('userLocation',ubicacion,7)
                $("#textCaseta").text(getCookie('userCaseta'))
                $("#textUbicacion").text(getCookie('userLocation'))

                setCookie('userCasetaStatus', 'No disponible',7)
                setCookie('userCasetaGuard','Juan Rios',7)
                 $("#textGuardiaEnTurno").text(getCookie('userCasetaGuard'));
                 $("#textEstatusCaseta").text(getCookie('userCasetaStatus'));
                 $("#textEstatusCaseta").removeClass();
                 $("#textEstatusCaseta").addClass(getCookie('userCasetaStatus') !== 'No disponible'? "text-success":  "text-danger");
                 if(getCookie('userCasetaStatus') =="Disponible" ){
                    $("#buttonForzarCierre").hide();
                 }else{
                     $("#buttonForzarCierre").show();
                 }
                if(!getCookie('userTurn')){
                    setCookie("userTurn", 'turno_abierto' , 7);
                }
                changeStatusTurn(false)





 fetch(urlLinkaform + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_id: idScr,
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

   

             /*
            if(res.response.data.length > 0){
                for(guardia of res.response.data){
                    dataTableGuardiasApoyo.push({name: guardia.name_guard, status: "Disponible", image: guardia.img_url})
                }
            }else{
               
            }
            */
       
        } 
    });

   dataTableGuardiasApoyo.push(
                    {name:"María Fernanda García", status: "Disponible", image: "https://w7.pngwing.com/pngs/298/171/png-transparent-avatar-face-girl-female-woman-profile-happy-avatar-icon.png", fechaInicio: "31 Enero 2024", folio:1},
                    {name:"Juan Carlos Rodríguez", status: "Disponible", image: "https://w7.pngwing.com/pngs/900/441/png-transparent-avatar-face-man-boy-male-profile-smiley-avatar-icon.png",fechaInicio: "28 Enero 2024",folio:2},
                    {name:"Laura Pérez Martínez", status: "Disponible", image: "https://w7.pngwing.com/pngs/210/236/png-transparent-avatar-face-girl-female-woman-profile-happy-avatar-icon.png",fechaInicio: "12 Febrero 2024",folio:3},
                    {name:"Alejandro López Sánchez", status: "Disponible", image: "https://cdn.icon-icons.com/icons2/2859/PNG/512/avatar_face_man_boy_male_profile_smiley_happy_people_icon_181657.png",fechaInicio: "12 Febrero 2024",folio:4},
                    {name:"Ana María González Ruiz", status: "Disponible", image: "https://cdn.icon-icons.com/icons2/2859/PNG/512/avatar_face_man_boy_male_profile_smiley_happy_people_icon_181661.png",fechaInicio: "10 Marzo 2024",folio:5})

        if(user !='' && userJwt!=''){
             drawTableNotas('tableGuardiasApoyo',columsDataGuardiasApoyo,dataTableGuardiasApoyo, "420px");
             drawTableSelect('tableCambiarCaseta',columsCambiarCaseta, dataTableCambiarCaseta ,"360px",1);
             drawTableSelect('tableAgregarGuardiaApoyo',columsAgregarGuardiaApoyo, dataTableAgregarGuardiaApoyo,"360px",1000);
            }
        fetch(urlLinkaform + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_id: idScr,
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
          if(res.response.data.length>0){
                for(nota of res.response.data){
                    dataTableNotas.push({name: nota.catalogo_guardia_nombre, note: nota.notas_nota, status: nota.notas_status, img: "no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg", check: "red", view:"14/04/1984", edit:"", folio:1,fotos:["foto.png","foto.jpg"], archivos:["archivo1.pdf", "archivo2.pdf"]}) 
                }
            }else{
               
            }
           
        } 
          
    });
     dataTableNotas.push(
                    {name: "María Fernanda García", note: "No cerraron bien la puerta al salir", status: "abierta", img: "no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg", check: "red", view:"14/04/1984", edit:"", folio:1,fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"]},
                    {name: "Juan Carlos Rodríguez", note: "Favor de revisar sus cosas antes de salir y no dejar toppers o cubiertos en el area comun", status: "cerrada", img: "no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg", check: "red", view:"14/04/1984", edit:"", folio:2,fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"]},
                    {name: "Laura Pérez Martínez", note: "No paso la basura favor de apoyarme temprano con eso", status: "abierta" ,img: "no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg", check: "red", view:"14/04/1984", edit:"", folio:3,fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"]},
                    //{name: "Alejandro López Sánchez", note: "no cerraron bien la puerta al salir", status: "cerrada", img: "no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg", check: "red", view:"14/04/1984", edit:"", folio:4},
                    //{name: "Ana María González Ruiz", note:"Favor de revisar sus cosas antes de salir y no dejar toppers o cubiertos en el area comun", status: "abierta", img: "no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg", check: "red", view:"14/04/1984", edit:"", folio:5},
                    )
      if(user !='' && userJwt!=''){
                 drawTableNotas('tableNotas',columsDataNotas, dataTableNotas ,"180px");}  
}

window.onload = function(){
    user = getCookie("userId");
    userJwt = getCookie("userJwt");
    userTurnCookie= getCookie("userTurn");
 
    setValueUserLocation('turnos');

    changeButtonColor();
    getGuardLocationListGuardsNotes()

   
   customNavbar(getValueUserLocation(), getStatusTurn());
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
    $("#imgProfilePic").attr("src", localStorage.getItem("imagenURL") /*getCookie('userImg')*/);
    $("#textUbicacion").html();
}

function setAddArchivo(){
    let randomID = Date.now();
    //---Structure HTML
    let newItem=`
                <div class="mb-3 col-12 archivo-div div-archivo-`+randomID+`">
                                <label class="form-label">Cargar un archivo *</label>
                                <input type="file" class="form-control-file" id="fileInputArchivo">
                                <button type="button" class="btn btn-success button-add-register" onclick="setAddArchivo();return false;">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                                <button type="button" class="btn btn-danger button-delete-register"  onclick="setDeleteArchivo(`+randomID+`);return false;">
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                </div>
    `;
    $('#archivo-input-form').append(newItem);
}
function setDeleteArchivo(id){
    const elements = document.querySelectorAll('.archivo-div');
    console.log("ELEMENTOS", elements)
    const count = elements.length;
    console.log(elements, count, "saefdasd")
    if(count > 1){
        const elements = document.getElementsByClassName('div-archivo-'+id);
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}
function setAddFoto(){
    let randomID = Date.now();
    //---Structure HTML
    let newItem=`
            <div class="mb-3 col-12 foto-div div-foto-`+randomID+`">
                        <label class="form-label">Fotografia *</label>
                        <input type="file" class="form-control-file" id="fileInputFotografia">
                        <div class="col-3">
                        <button type="button" class="btn btn-success button-add-register" onclick="setAddFoto();return false;">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                        <button type="button" class="btn btn-danger button-delete-register"  onclick="setDeleteFoto(`+randomID+`);return false;">
                           <i class="fa-solid fa-minus"></i>
                        </button>
             </div>
    `;
    $('#foto-input-form').append(newItem)
  
}
function setDeleteFoto(id){

    const elements = document.querySelectorAll('.foto-div');
    const count = elements.length;
    if(count > 1){
        const elements = document.getElementsByClassName('div-foto-'+id);
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}

function AlertAndActionChangeStatusTurn(){
    if((getCookie("userCasetaStatus")== 'Disponible' && getCookie("userTurn")== 'turno_cerrado' )   || (getCookie("userCasetaStatus")== 'No disponible') && getCookie("userTurn")== 'turno_abierto' 
        || (getCookie("userCasetaStatus")== 'Disponible'&&  getCookie("userTurn")== 'turno_abierto')){
      
         let arrGuard=[];
                for(guardia of arraySelectedGuardias){
                    arrGuard.push(guardia.name);
                }

                console.log('aswda',arraySelectedGuardias.length,arraySelectedGuardias.length === 0 )
                let guardiaText= arraySelectedGuardias.length === 0 ? `?`:`, con los siguientes guardias: <b>`+ arrGuard.flat()+`? </b> ` ;


                Swal.fire({
                  title:'Confirmación',
                  html:getCookie("userTurn")== 'turno_cerrado' ?`
                ¿Seguro que quieres iniciar el turno en <b>`+ getCookie('userCaseta')+`</b>,
                en la ubicación <b>`+ getCookie('userLocation')+`</b>`+guardiaText : ` ¿Seguro que quieres cerrar el turno en <b>`+ getCookie('userCaseta')+`</b>,
                en la ubicación <b>`+ getCookie('userLocation')+`</b>` + guardiaText,
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
    }else{
        Swal.fire({
            title: "Caseta no disponible!",
            text: "La caseta no se encuentra disponible, puedes forzar el cierre para continuar.",
            type: "warning"
        });
    }
     
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
        setCookie('userCasetaStatus', 'Disponible',7);
        $("#textEstatusCaseta").text(getCookie('userCasetaStatus'));
        $('#textFechaInicioCaseta').value('01/12/2024 01:23:2024')
        $("#textEstatusCaseta").removeClass();
        $("#textEstatusCaseta").addClass(getCookie('userCasetaStatus') !== 'No disponible'? "text-success":  "text-danger");

         if(getCookie('userCasetaStatus') =="Disponible" ){
            $("#buttonForzarCierre").hide();
            }else{
            $("#buttonForzarCierre").show();
         }
      }
    });
}


function changeStatusTurn(buttonClick){
    let idGuardiasEnTurno=[]
    let allGuardiasEnTurno=[]
    console.log("GUARDIAS SELECIONADOS INICIALMENTE",arraySelectedGuardias,dataTableGuardiasApoyo)
    for(g of arraySelectedGuardias){
        idGuardiasEnTurno.push("inp-"+g.folio)
        idGuardiasEnTurno.push("btn-"+g.folio)
    }
    console.log("idGuardiasEnTurno",idGuardiasEnTurno)
    userTurnCookie= getCookie("userTurn");
    const hour = new Date().toLocaleTimeString();
     let td = $("#statusTurnText");
        if (td.length > 0) {
            td.find(".text-danger").remove();
            td.find(".text-success").remove();
        }
     let elementos = document.querySelectorAll('.form-check-input');
     for(e of elementos){
        let id=e.getAttribute("id")
         allGuardiasEnTurno.push(id)
         allGuardiasEnTurno.push("btn-"+id.slice(4)) 
     }
     
     let idGuardiasRestantes=allGuardiasEnTurno.filter(e => !idGuardiasEnTurno.includes(e))
     //INFO : idGuardiasRestantes para poder saber que guardias estan en la tabla "Guardias de apoyo" PERO QUE NO INICIARON TURNO
     //INFO : idGuardiasEnTurno para saber que guardias de los que estan en la tabla "Guardias de apoyo" INICIARON TURNO

     //INFO : aqui fetch para modificar el status , meter estos dos if en el response del fetch
    if(userTurnCookie == 'turno_abierto' && buttonClick ){  
        setCookie("userTurn", "turno_cerrado",7)   
        $('#statusTurnText').append($('<div class="text-danger" id="statusOff"> Turno Cerrado </div>'));
        $('#buttonChangeStatusTurn').text('Iniciar Turno').removeClass('btn-danger').addClass('btn-success');
           $('#buttonAgregarGuardiaApoyo').attr("disabled", true);
            $('#buttonCambiarCaseta').attr("disabled", false);
             $('#buttonForzarCierre').attr("disabled", false);
             $('#textInfActualCaseta').text('Información actual de la caseta:')
         customNavbar(getValueUserLocation(), getCookie('userTurn'))

         for (g of idGuardiasRestantes){ 
            if(g.includes("inp-")){
                $("#"+g).show();
            } else if(g.includes("btn-")){
                $("#"+g).hide();
            }
         }
        for (g of idGuardiasEnTurno){
            if(g.includes("inp-")){
                $("#"+g).show();
            } else if(g.includes("btn-")){
                $("#"+g).hide();
            }
         }
    }else if (userTurnCookie == 'turno_cerrado' && buttonClick){
        setCookie("userTurn", "turno_abierto",7); console.log("ENTRNADOsdfsdf");
        $("#todayHourText").html(hour)
        $('#statusTurnText').append($('<div class="text-success" id="statusOn"> Turno Iniciado</div>'));
        $('#buttonChangeStatusTurn').text('Cerrar Turno').removeClass('btn-success').addClass('btn-danger');
            $('#buttonAgregarGuardiaApoyo').attr("disabled", false);
        $('#buttonCambiarCaseta').attr("disabled", true);
         $('#buttonForzarCierre').attr("disabled", true);
        $('#textInfActualCaseta').text('Información:');
        customNavbar(getValueUserLocation(), getCookie('userTurn'))
    
        for (g of idGuardiasRestantes){ 
            if(g.includes("inp-")){
                $("#"+g).hide();
            } else if(g.includes("btn-")){
                $("#"+g).hide();
            }
         }
        for (g of idGuardiasEnTurno){
            if(g.includes("inp-")){
                $("#"+g).hide();
            } else if(g.includes("btn-")){
                $("#"+g).show();
            }
         }
    } else if(buttonClick== false){
        // CODE : aqui agregar fetch para cambiar el turno del guardia
        /*
        fetch(urlLinkaform + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_id: idScr,
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
            console.log("NO CLICK CARGA SOLO 1")
            $('#buttonChangeStatusTurn').text('Iniciar Turno').addClass('btn-success')
             $('#buttonAgregarGuardiaApoyo').attr("disabled", true);
            $('#buttonCambiarCaseta').attr("disabled", false);
            $('#textInfActualCaseta').text('Información actual de la caseta:')
            $('#statusTurnText').append($('<div class="text-danger" id="statusOff"> Turno Cerrado</div>'))
            $('#buttonForzarCierre').attr("disabled", false);
             
            for (g of idGuardiasRestantes){ 
                console.log(g.includes("inp-"))
                if(g.includes("inp-")){
                    console.log("hello")
                    $("#"+g).show();
                } else if(g.includes("btn-")){
                    console.log("hello")
                    $("#"+g).hide();
                }
           }
            for (g of idGuardiasEnTurno){
                if(g.includes("inp-")){
                    $("#"+g).hide();
                } else if(g.includes("btn-")){
                    $("#"+g).hide();
                }
             }
           /* let elementos = document.querySelectorAll('.form-check-input');
            elementos.forEach(function(elemento) {
                elemento.style.display = "block";
            });
            let elementosB = document.querySelectorAll('.customButtonCheckout');
            elementosB.forEach(function(elemento) {
                console.log("ELEMENTOS", elementosB)
                elemento.style.display="none";
            });*/

        }else if(userTurnCookie=='turno_abierto'){
            console.log("NO CLICK CARGA SOLO 2")
            $('#buttonChangeStatusTurn').text('Cerrar Turno').addClass('btn-danger');
            $('#statusTurnText').append($('<div class="text-success" id="statusOn"> Turno Iniciado</div>'));
            $('#buttonAgregarGuardiaApoyo').attr("disabled", false);
            $('#buttonCambiarCaseta').attr("disabled", true);
            $('#buttonForzarCierre').attr("disabled", true);
            $('#textInfActualCaseta').text('Información:');

            for (g of idGuardiasRestantes){
            if(g.includes("inp-")){
                $("#"+g).hide();
                } else if(g.includes("btn-")){
                    $("#"+g).hide();
                }
            }
            for (g of idGuardiasEnTurno){
                if(g.includes("inp-")){
                    $("#"+g).hide();
                } else if(g.includes("btn-")){
                    $("#"+g).show();
                }
             }
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
        let index = dataTableGuardiasApoyo.findIndex(guardia => guardia.folio === folio);
        console.log("index",index, folio, name, )
        if (index !== -1) {
            console.log("emm hola")
            dataTableGuardiasApoyo.splice(index, 1);
        }
        console.log(dataTableGuardiasApoyo)
        tables["tableGuardiasApoyo"].setData(dataTableGuardiasApoyo);
        changeStatusTurn(false)
        Swal.fire({
          title: "Check out!",
          text: "Se ha realizado el check out correctamente.",
          type: "success"
        });
      }
    });
}

function cerrarNotaAlert(name, note, folio, status){
    if(status=="abierta"){
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
          if (result.value) {
            let selectedNote = dataTableNotas.find(nota => nota.folio === folio);
            if (selectedNote) {
              selectedNote.status = "cerrada";
                tables["tableNotas"].setData(dataTableNotas);
            }
          }
        });
    }else{
         Swal.fire({
          title: "Acción Completada!",
          text: "Esta nota ya se encuentra cerrada.",
          type: "warning"
        });
    }
   
}

function verNotasAlert(name, note, folio, status, fotos, archivos){
    let fotosArray = fotos.split(',');
    let archivosArray = archivos.split(',');
    let fotosItem=``;
    let archivosItem=``;
    for(let url of fotosArray){
        fotosItem+=`
        <div class='m-2'> 
            <img src="`+url+`" height="145px"style="object-fit: contain;"></td> </tr>
        </div>`;
    }
    let htmlFotos=`
        <h6>Fotografias</h6>
        <div class='d-flex flex-row'>
            `+fotosItem+`
        </div>`;


    for(let url of archivosArray){
        archivosItem+=`
        <div><a href="https://www.turnerlibros.com/wp-content/uploads/2021/02/ejemplo.pdf" target="_blank">`+url+`</a>
        </div>
        `;
    }
    let htmlArchivos=`
        <h6>Archivos</h6>
        <div class='d-flex flex-column'>
            `+archivosItem+`
        </div>`;
    Swal.fire({
      title: "Nota",
      text: "Escoje una caseta para continuar...",
      html: ` <div class="d-flex justify-content-center mt-2" id="tableCambiarCaseta"></div>
      
        <table class='table table-borderless customShadow' style=' font-size: .8em; background-color: lightgray !important;'>
        <tbody> <tr> <td><b>Nombre:</b></td> <td> <span > `+ name +`</span></td> </tr>
        <tr> <td><b>Nota:</b></td> <td> <span > `+ note+`</span></td> </tr> 
        <tr> <td><b>Estatus:</b></td> <td> <span > `+ status+`</span></td> </tr> 
        <tr> <td><b>Fecha y hora de creacion:</b></td> <td> <span > 25/02/24 18:00:00 hrs</span></td> </tr>
        <tr> <td><b>Estatus:</b></td> <td> <span > `+ status+`</span></td> </tr> 
        <tr> <td><b>Comentarios:</b></td> <td> <span> Este el comentario de prueba de la nota</span> </tr>
        <tr> <td><b>Fecha y hora de cierre:</b></td> <td> <span>  26/02/24 19:31:00 hrs</span> </tr>
        <tr> <td><b>Guardia que cierra:</b></td> <td> <span>  Pancracio Felipe</span> </tr>
        </tbody> </table>` + htmlFotos + htmlArchivos,
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

function drawTableSelect(id, columnsData, tableData, height, select){
  var  table = new Tabulator("#" + id, {
    layout:"fitDataStretch",
    height:height,
    data:tableData,
    textDirection:"ltr",
    columns:columnsData,
    pagination:true, 
    selectableRows:select,
    paginationSize:40,
  });
  tables[id]=table;
}


function selectCheckboxGuardia(folio){
     let checkboxes = document.querySelectorAll('.form-check-input');
    arraySelectedGuardias=[]
      checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            for(guardia of dataTableGuardiasApoyo){
                if(guardia.folio ==checkbox.value)
                arraySelectedGuardias.push(guardia)
            }
        }
    });
}     


function enviarNota(){
    let fotosArray=[]
    let archivosArray=[]
    let nota= $("#inputTextNota").val();
    let archivo= $("#fileInputArchivo").val();
    let elements = document.querySelectorAll('.archivo-div');
    console.log("ELEMETOS",elements)
    for (div of elements){
        console.log("ELEMENTOS",div.value);
        
    }
    let divArchivo = document.getElementById("archivo-input-form");
    let inputsE = divArchivo.querySelectorAll('.archivo-div');
    inputsE.forEach(function(input) {
        fotosArray.push(input.value);
    });
    let divFoto = document.getElementById("foto-input-form");
    let inputsF = divFoto.querySelectorAll('.foto-div');
    inputsF.forEach(function(input) {
        archivosArray.push(input.value);
    });

    let fotografia= $("#fileInputFotografia").val();
    let comentario=$("#inputComentarioNota").val();
    let fileNameFoto = fotografia.substring(fotografia.lastIndexOf('\\') + 1);

    let randomFolio = Date.now();
        

        //INFO: Agregar la fetch aqui lo que sigue abajo agregarlo en el response del fetch
        //se enviaran todas las variables y los arrays de fotos y archivos


    if(nota!==""){
        dataTableNotas.push( 
            {name: getCookie("userName"), note: nota, status: "abierta", img: fileNameFoto, check: "red", view:"14/04/1984", edit:"", folio:randomFolio})
        tables["tableNotas"].setData(dataTableNotas);
        
        $('#agregarNotasModal').modal('hide');
        $("#inputTextNota").val('');
        inputsE.forEach(function(input) {
            input.value=''
        });
        inputsF.forEach(function(input) {
            input.value=''
        });
        $("#fileInputFotografia").val('');
        $("#inputComentarioNota").val('');
    }else{
          Swal.fire({
          title: "Faltan datos por llenar",
          text: "Completa la información requerida.",
          type: "warning"
        });
    }
}

function cambiarCaseta(value){
     let selectedRow = tables["tableCambiarCaseta"].getSelectedData()[0]; // El [0] es para obtener solo la primera fila si hay varias seleccionadas
     setCookie('userCaseta', selectedRow.name)
     setCookie('userLocation', selectedRow.ubi)
     setCookie('userCasetaStatus', selectedRow.status)
     setCookie('userCasetaGuard', selectedRow.guard)
     $("#textUbicacion").text(getCookie('userLocation'));
     $("#textCaseta").text(getCookie('userCaseta'));
     $("#textEstatusCaseta").text(getCookie('userCasetaStatus'));
     $("#textGuardiaEnTurno").text(getCookie('userCasetaGuard'));
     $("#textEstatusCaseta").removeClass();
     $("#textEstatusCaseta").addClass(getCookie('userCasetaStatus') !== 'No disponible'? "text-success":  "text-danger");


     $('#cambiarCasetaModal').modal('hide');
}

function agregarNuevoGuardiaApoyo(){
   
    let selectedRow = tables["tableAgregarGuardiaApoyo"].getSelectedData(); 
    let exclude=[]
    for(newGuard of selectedRow){
        let randomFolio = Date.now()+ Math.random();
        dataTableGuardiasApoyo.push( 
            {name:newGuard.name, status: newGuard.status, image: newGuard.img, fechaInicio: "31 Enero 2024", folio:randomFolio})
        exclude.push(newGuard.folio)
    }
    let newDataTableAgregarGuardiaApoyo = dataTableAgregarGuardiaApoyo.filter(function(guardia) {
    return !exclude.includes(guardia.folio);
    });
    dataTableAgregarGuardiaApoyo= newDataTableAgregarGuardiaApoyo
    tables["tableAgregarGuardiaApoyo"].setData(dataTableAgregarGuardiaApoyo);
    tables["tableGuardiasApoyo"].setData(dataTableGuardiasApoyo);
    $('#agregarGuardiaApoyoModal').modal('hide');
}
// INFO: FUNCIONES GENERALES

function setModal(type = 'none',id){
    if(type == 'cambiarCasetaModal'){
        $('#cambiarCasetaModal').modal('show');
    }

}
