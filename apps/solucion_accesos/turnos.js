let userJwt ="";
let idScr=119197
let caseta="" // caseta actual al iniciar sesion en turnos
let ubicacion="" // ubicacion actual al iniciar sesion en turnos
let date=""
let guardiasApoyo={}
let img="https://static.vecteezy.com/system/resources/previews/007/468/567/non_2x/colorful-simple-flat-of-security-guard-icon-or-symbol-people-concept-illustration-vector.jpg";
let tables={}
let idGuardiasEnTurno=[]
let guardiasEnTurno=[] 
let arraySelectedGuardias=[]
let supportGuards=[]
let checkInId=""
let thisUserCheckInId=""
//FUNCION para cambiar la imagen del localstorage de imagen de perfil imagenURL en todas las pantallas


//FUNCION para abrir modales
function setModal(type = 'none',id){
    if(type == 'cambiarCaseta'){
        loadBooths();
    }
}


window.onload = function(){
    user = getCookie("userId");
    userJwt = getCookie("userJwt");
    setValueUserLocation('turnos');
    getAllData();
    changeButtonColor();
    customNavbar(getValueUserLocation(), getStatusTurn());
    date = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
    $('#todayDateText').append($('<div class="myDateClass"> '+ date +'</div>'));
    $("#textName").html(getCookie('userName'));
    $("#textPosition").text(getCookie('userPosition'));
    $("#textEmail").text(getCookie('userEmail'));
    $("#imgProfilePic").attr("src", localStorage.getItem("imagenURL") /*getCookie('userImg')*/);
    $("#textUbicacion").html();
    $("#buttonCambiarCaseta").show();
    $("#loadingButtonCaseta").hide();
}




function changeImageGuard(){
    let userId= getCookie('userId')
    let input = document.getElementById('changeImageInputFile');
    input.click();
    
    input.onchange = function() {
        let file = event.target.files[0]; 
        let fileName=event.target.files[0].name
        let urlImagen=""
        console.log("QUE ES ESTO", file,fileName)
        if (file) {
            let lector = new FileReader(); 
            lector.onload = function(event) {
                urlImagen  = event.target.result;
                localStorage.setItem("imagenURL", String(urlImagen));
                let imagenMostrada = document.getElementById("imgProfilePic");
                imagenMostrada.src = urlImagen;
                imagenMostrada.style.display = "block"; // Mostrar la imagen
                //setCookie('userImg',String(urlImagen),7)
                let imagenMostradaNavbar = document.getElementById("imageUserNavbar");
                imagenMostradaNavbar.src= urlImagen;
                imagenMostradaNavbar.style.display = "block";
                
                let formData = new FormData();

                let blob = new Blob([event.target.result], { type: file.type });

                formData.append('name', 'profile_picture');
                formData.append('profile_picture', blob, fileName);
                console.log("FD",formData)
                let urlChangeImage= `https://app.linkaform.com/api/infosync/user_admin/${userId}/profile_picture/`
                 fetch(urlChangeImage, {
                    method: 'POST',
                    body: formData,
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+userJwt
                    },
                })
                .then(res => res.json())
                .then(res => {
                    console.log("++++++++++++++++++ CAMBIAR IMAGEN USER RESPONSE +++++++++++++++++++", res);
                })
            };
            lector.readAsDataURL(file);
        }
    };
}

//FUNCION hace el fetch que trae toda la informacion inicial que se llenara en la pantalla de turnos
function getAllData(){
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name:'script_turnos.py',
            option:'load_shift',
        }),
        headers:
        {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+userJwt
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            console.log("+++++++++++++++++++++++  res DATA TURNOS   +++++++++++++++++++++++++++",res)
            let data=res.response.data
            let loc= data.location
            let guard= data.guard
            let notes= data.notes
            supportGuards= data.support_guards
            inicializarPagina(loc, notes, guard, data.booth_status, data.booth_stats);
            if(user !='' && userJwt!=''){
                if(data.support_guards.length > 0){
                    for(let guard of data.support_guards){
                        dataTableGuardiasApoyo.push({name:guard.employee, status: '', img: guard.picture? guard.picture[0].file_url :'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1', fechaInicio: '', id:guard.user_id})
                    }  
                }else{
                    dataTableGuardiasApoyo = []
                }
                let userName=getCookie('userName')
                if(notes.length > 0){
                    for(let note of notes){
                        dataTableNotas.push({name:userName, note: note.note, status: note.status, img:"", check:"",view:"", edit:"", fotos: [], archivos:[], folio:note.folio})
                    }
                }else{
                    dataTableNotas = []
                }
                drawTableNotas('tableGuardiasApoyo',columsDataGuardiasApoyo,dataTableGuardiasApoyo, "420px");
                guardiasApoyoValidateOptions()
                drawTableNotas('tableNotas',columsDataNotas, dataTableNotas ,"180px");
                dataTableCambiarCaseta=[]
                drawTableSelect('tableCambiarCaseta',columsCambiarCaseta, dataTableCambiarCaseta ,"300px",1);
                drawTableSelect('tableAgregarGuardiaApoyo',columsAgregarGuardiaApoyo, dataTableAgregarGuardiaApoyo,"360px",1000);
                tables["tableCambiarCaseta"].on("rowSelectionChanged", function(data, rows){
                    if (rows.length > 0) {
                        cambiarCaseta(data[0])
                    }
                });
            }
        }
    });
}


function loadBooths(){
    $("#buttonCambiarCaseta").hide();
    $("#loadingButtonCaseta").show();
    fetch(url + urlScripts, {
    method: 'POST',
    body: JSON.stringify({
        script_name: 'script_turnos.py',
        option:'get_user_booths'
    }),
    headers:
        {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+jw
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log("RESS",res)
        if (res.success) {
            if(user !='' && userJwt!=''){
                dataTableCambiarCaseta=[]
                let userBooths=res.response.data
                 if(userBooths.length>0){
                    for(let booth of userBooths){
                        console.log("ESTUS DE BOOTH",booth)
                        dataTableCambiarCaseta.push({name:booth.area, ubi:booth.location, status:booth.status , guard: booth.employee, folio: booth.folio})
                        arrayUserBoothsLocations.push({name:booth.area, ubi:booth.location, status:booth.status , guard: booth.employee, folio: booth.folio})
                    }
                }else{
                    dataTableCambiarCaseta=[]
                }
                tables["tableCambiarCaseta"].setData(dataTableCambiarCaseta);
                $('#cambiarCasetaModal').modal('show');
                $("#buttonCambiarCaseta").show();
                $("#loadingButtonCaseta").hide();
                
            }
        }
    });
}


//FUNCION Toda la inciializacion de cookies y variables necesarias para el funcionamiento de la pantalla
function inicializarPagina(loc, notes, guard,booth_status, booth_stats){
    caseta=loc.area;
    ubicacion=loc.name;
    $("#textCuidad").text(loc.city)
    $("#textEstado").text(loc.state)
    $("#textDireccion").text(loc.address)
    setCookie('userCaseta',getCookie('userCaseta')|| caseta,7)
    setCookie('userLocation',getCookie('userLocation')|| ubicacion,7)
    $("#textCaseta").text(getCookie('userCaseta'))
    $("#textUbicacion").text(getCookie('userLocation'))
    setCookie('userCasetaStatus', booth_status.status,7)
    setCookie('userCasetaGuard',booth_status.guard_on_dutty,7)
    setCookie('checkInId', booth_status.checkin_id,7)
    checkInId= booth_status.checkin_id || ""
    
    if(booth_status.guard_on_dutty== ''){
        $("#headGuardiaEnTurno").text("")
        $("#headFechaInicioTurno").text("")
    }else{
        $("#headGuardiaEnTurno").text("Guardia en turno: ")
        $("#headFechaInicioTurno").text("Fecha de inicio de turno: ")
    }
    
     $("#textGuardiaEnTurno").text(getCookie('userCasetaGuard'));
     $("#textEstatusCaseta").text(getCookie('userCasetaStatus'));
     $("#textFechaInicioCaseta").text(booth_status.stated_at);

     $("#textPersonalDentro").text(booth_stats.in_invitees);
     $("#textArticulosConsesionados").text(booth_stats.articulos_concesionados);
     $("#textIncidentesPendientes").text(booth_stats.incidentes_pendites);
     $("#textVehiculosEstacionados").text(booth_stats.vehiculos_estacionados);
     $("#textGafetesPendientes").text(booth_stats.gefetes_pendientes);
    $("#textEstatusCaseta").removeClass();
    $("#textEstatusCaseta").addClass(getCookie('userCasetaStatus') !== casetaNoDisponible? "text-success":  "text-danger");
    setCookie("userTurn",guard.status_turn, 7);

    if(getCookie('userCasetaStatus') ==casetaDisponible ){
        $("#buttonForzarCierre").hide();
    } else{
        $("#buttonForzarCierre").show();
    }
    changeStatusTurn(false)
    $("#statusTurnText").text(guard.status)
    $("#statusTurnText").removeClass();
    $("#statusTurnText").addClass(getCookie("userTurn") !== userTurnCerrado? "text-success":  "text-danger");
}


//FUNCION para agregar nuevo input de archivo al momento de crear una nueva nota
function setAddArchivo(){
    let randomID = Date.now();
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


//FUNCION para eliminar un input de archivo al momento de crear una nueva nota
function setDeleteArchivo(id){
    const elements = document.querySelectorAll('.archivo-div');
    const count = elements.length;
    if(count > 1){
        const elements = document.getElementsByClassName('div-archivo-'+id);
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}


//FUNCION para agregar nuevo input de imagen al momento de crear una nueva nota
function setAddFoto(){
    let randomID = Date.now();
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


//FUNCION para eliminar un input de imagen al momento de crear una nueva nota
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


//FUNCION forzar el cierre de la caseta cuando tiene estado No disponible, para que otro guardia pueda iniciar turno
function AlertForzarCierre(name){
    console.log("NOMBREE",name)
    let statusCaseta = $("#textEstatusCaseta").text()
    let inputSelectedGuards=[]
    if(statusCaseta == casetaNoDisponible){
        Swal.fire({
            title:'Confirmación',
            html:`
                La caseta actual no esta disponible. Fue abierta por el guardia <b>`+ name +` el día 10 de Mayo a las 11:03 horas.</b> ¿Desea proceder con el cierre forzado
                de la caseta? <b>Tenga en cuenta que una vez confirmado, esta accion no podrá deshacerse.</b>
            ` ,
            type: "warning",
            showCancelButton: true,
            cancelButtonColor: "#dc3545",
            confirmButtonText: "Si",
            cancelButtonText: "Cancelar",
            heightAuto:false,
        })
        .then((result) => {
            if (result.value) {
            fetch(url + urlScripts, {
                method: 'POST',
                body: JSON.stringify({
                script_name: 'script_turnos.py',
                option: 'checkout',
                location: ubicacion,
                area: caseta,
                checkin_id:checkInId
            }),
            headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+jw
                },
            })
            .then(res => res.json())
            .then(res => {
                  console.log("Response CHECKOUT",res)
                if (res.success) {
                    casetaActualizarEstatus(turnoCerrado, casetaDisponible)
                    setCookie('userCasetaStatus',casetaDisponible,7)
                    setCookie('userTurn',turnoCerrado,7)
                    turnoCerrado(idGuardiasEnTurno)
                    //setCookie('userCasetaStatus', 'Disponible',7);
                    $("#textEstatusCaseta").text(getCookie('userCasetaStatus'));
                    $("#textFechaInicioCaseta").val('01/12/2024 01:23:2024')
                    $("#textEstatusCaseta").removeClass();
                    $("#textEstatusCaseta").addClass(getCookie('userCasetaStatus') !== casetaNoDisponible? "text-success":  "text-danger");
                    if(getCookie('userCasetaStatus') =="Disponible" ) {
                        $("#buttonForzarCierre").hide();
                    } else {
                        $("#buttonForzarCierre").show();
                    }
                } 
            })
                
            }
        });
    }
}


//FUNCION para cambiar el estatus del turno y hacer las validaciones correspondientes al dar click al boton, al iniciar la aplicacion, o al refrescar
function changeStatusTurn(buttonClick){
    //INFO : idGuardiasEnTurno para saber que guardias de los que estan en la tabla "Guardias de apoyo" INICIARON TURNO
    //INFO : aqui poner fetch para modificar el status , meter estos este if en el response del fetch
    let estatusActual=getCookie('userTurn');
    let inputSelectedGuards=[];

    if(buttonClick){
        for(g of arraySelectedGuardias){
            guardiasEnTurno = guardiasEnTurno.concat(dataTableGuardiasApoyo.filter(e => e.id == g.user_id))
            idGuardiasEnTurno.push("inp-"+ g.user_id)
            idGuardiasEnTurno.push("btn-"+ g.user_id)
            inputSelectedGuards.push({"username":guardia.username,"user_id": guardia.user_id })
        } 
        //FETCH PARA CMABIAR ESTUS DEL GUARDIA AQUI
        if(estatusActual == userTurnAbierto ){
            console.log("DATAA QUE TENEMOS CHECK OUT",estatusActual)
            fetch(url + urlScripts, {
                method: 'POST',
                body: JSON.stringify({
                script_name: 'script_turnos.py',
                option: 'checkout',
                checkin_id: thisUserCheckInId,
                location: ubicacion,
                area: caseta,
            }),
            headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+jw
                },
            })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    casetaActualizarEstatus(turnoCerrado, casetaDisponible)
                    setCookie('userCasetaStatus',casetaDisponible,7)
                    setCookie('userTurn',turnoCerrado,7)
                    turnoCerrado(idGuardiasEnTurno)
                    console.log("CHECKOUTTTTTT ",res)
                } 
            })
            
        }
        else {
            fetch(url + urlScripts, {
                method: 'POST',
                body: JSON.stringify({
                script_name: 'script_turnos.py',
                option: 'checkin',
                location: ubicacion,
                area: caseta,
                employee_list:inputSelectedGuards
            }),
            headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+jw
                },
            })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setCookie('userCasetaStatus',casetaNoDisponible,7)
                    setCookie('userTurn',turnoAbierto,7)
                    casetaActualizarEstatus(turnoAbierto, casetaNoDisponible)
                    turnoAbierto(idGuardiasEnTurno)
                    $("#textGuardiaEnTurno").text(res.response.data.json.boot_status.guard_on_duty)
                    $("#textFechaInicioCaseta").text(res.response.data.json.created_at)
                    thisUserCheckInId=res.response.data.json.id
                    console.log("thisUserCheckInId",thisUserCheckInId, res.response.data.json.boot_status.guard_on_duty)
                }
            })
            
        } 
    }
    else if(!buttonClick){
        // INFO : aqui agregar fetch para cambiar el turno del guardia
        if(estatusActual==userTurnCerrado){
            turnoCerrado(idGuardiasEnTurno)
        } 
        else {
            turnoAbierto(idGuardiasEnTurno)
        }
    }
    customNavbar(getValueUserLocation(), getCookie('userTurn'))
}


//FUNCION que muestra un alert de confirmacion y las validaciones necesarias ANTES de cambiar el estatus del turno y despues llama a la funcion changeStatusTurn
function AlertAndActionChangeStatusTurn(){
    console.log(getCookie("userCasetaStatus"),getCookie("userTurn"))
    if(getCookie("userCasetaStatus")== casetaDisponible && getCookie("userTurn")== userTurnCerrado 
    || getCookie("userCasetaStatus")== casetaNoDisponible && getCookie("userTurn")== userTurnAbierto 
    || getCookie("userCasetaStatus")== casetaDisponible &&  getCookie("userTurn")== userTurnAbierto){

        let arrGuard=[];
        for(guardia of arraySelectedGuardias){
            arrGuard.push(guardia.employee);
            
        }
        let guardiaText= arraySelectedGuardias.length === 0 ? `?`:`, con los siguientes guardias: <b>`+ arrGuard.flat()+`? </b> ` ;
        Swal.fire({
            title:'Confirmación',
            html:getCookie("userTurn")== userTurnCerrado ?`
            ¿Seguro que quieres iniciar el turno en <b>`+ getCookie('userCaseta')+`</b>,
            en la ubicación <b>`+ getCookie('userLocation')+`</b>`+guardiaText : ` ¿Seguro que quieres cerrar el turno en <b>`+ getCookie('userCaseta')+`</b>,
            en la ubicación <b>`+ getCookie('userLocation')+`</b>` + guardiaText,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#dc3545",
            confirmButtonText: "Si",
            heightAuto:false,
        })
        .then((result) => {
            if (result.value) {
                changeStatusTurn(true);
            } 

        });
    } else {
        Swal.fire({
            title: "Caseta no disponible!",
            text: "La caseta no se encuentra disponible, puedes forzar el cierre para continuar.",
            type: "warning"
        });
    }    
}


//FUNCION muestra un alert de confirmacion para cambiar el estatus de la nota a cerrado
function cerrarNotaAlert(name, note, folio, status){
    if(status=="Abierta"){
        Swal.fire({
            title: "Confirmación",
            type: 'warning',
            html: ` 
                <div class="d-flex justify-content-center mt-2" id="tableCambiarCaseta"></div>
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
                    selectedNote.status = "Cerrada";
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

//FUNCTION muestra un alert con el detalle de la nota al hacer click
function verNotasAlert(name, note, folio, status, fotos, archivos){
    let fotosArray = fotos.split(',');
    let archivosArray = archivos.split(',');
    let fotosItem=``;
    let archivosItem=``;
    for(let url of fotosArray){
        fotosItem+=`
            <div class='m-2'> 
                <img src="`+url+`" height="145px"style="object-fit: contain;"></td> </tr>
            </div>
        `;
    }
    let htmlFotos=`
        <h6>Fotografias</h6>
        <div class='d-flex flex-row'>
            `+fotosItem+`
        </div>
    `;
    for(let url of archivosArray){
        archivosItem+=`
            <div>
                <a href="https://www.turnerlibros.com/wp-content/uploads/2021/02/ejemplo.pdf" target="_blank">`+url+`</a>
            </div>
        `;
    }
    let htmlArchivos=`
        <h6>Archivos</h6>
        <div class='d-flex flex-column'>
            `+archivosItem+`
        </div>
    `;
    Swal.fire({
        title: "Nota",
        text: "Escoje una caseta para continuar...",
        html: ` 
            <div class="d-flex justify-content-center mt-2" id="tableCambiarCaseta"></div>
            <table class='table table-borderless customShadow' style=' font-size: .8em; background-color: lightgray !important;'>
                <tbody> 
                    <tr> <td><b>Nombre:</b></td> <td> <span > `+ name +`</span></td> </tr>
                    <tr> <td><b>Nota:</b></td> <td> <span > `+ note+`</span></td> </tr> 
                    <tr> <td><b>Estatus:</b></td> <td> <span > `+ status+`</span></td> </tr> 
                    <tr> <td><b>Fecha y hora de creacion:</b></td> <td> <span > 25/02/24 18:00:00 hrs</span></td> </tr>
                    <tr> <td><b>Estatus:</b></td> <td> <span > `+ status+`</span></td> </tr> 
                    <tr> <td><b>Comentarios:</b></td> <td> <span> Este el comentario de prueba de la nota</span> </tr>
                    <tr> <td><b>Fecha y hora de cierre:</b></td> <td> <span>  26/02/24 19:31:00 hrs</span> </tr>
                    <tr> <td><b>Guardia que cierra:</b></td> <td> <span>  Pancracio Felipe</span> </tr>
                </tbody> 
            </table>
        ` + htmlFotos + htmlArchivos,
        showCancelButton: true,
        showConfirmButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "Cerrar"
    })
    .then((result) => {
        if (result.isConfirmed) {        
        }
    });
}


//FUNCION para guardar en un array los guardias que fueron seleccionados para iniciar turno
function selectCheckboxGuardia(id){
    let checkboxes = document.querySelectorAll('.form-check-input');
    arraySelectedGuardias=[]
    checkboxes.forEach(function(checkbox) {

        if (checkbox.checked) {
            for(guardia of supportGuards){
                if(guardia.user_id == checkbox.value)
                arraySelectedGuardias.push(guardia)
            }
        }
    });
}     


//FUNCION para enviar la nueva notra creada
function enviarNota(){
    let fotosArray=[]
    let archivosArray=[]
    let nota= $("#inputTextNota").val();
    let archivo= $("#fileInputArchivo").val();
    let elements = document.querySelectorAll('.archivo-div');
    let divArchivo = document.getElementById("archivo-input-form");
    let inputsE = divArchivo.querySelectorAll('.archivo-div');
    inputsE.forEach(function(input) {
        fotosArray.push(input.value);
    });
    console.log("TURNOSSS",fotosArray)
    let divFoto = document.getElementById("foto-input-form");
    let inputsF = divFoto.querySelectorAll('.foto-div');
    inputsF.forEach(function(input) {
        archivosArray.push(input.value);
    });

    console.log("tuirnosss archivosArray",archivosArray)
    let fotografia= $("#fileInputFotografia").val();
    let comentario=$("#inputComentarioNota").val();
    let fileNameFoto = fotografia.substring(fotografia.lastIndexOf('\\') + 1);
    let randomFolio = Date.now();
    //INFO: Agregar la fetch aqui lo que sigue abajo agregarlo en el response del fetch
    //se enviaran todas las variables y los arrays de fotos y archivos
    if(nota!==""){
        dataTableNotas.push({name: getCookie("userName"), note: nota, status: "abierta", img: fileNameFoto, check: "red", view:"14/04/1984", edit:"", folio:randomFolio})
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
    } 
    else {
        Swal.fire({
            title: "Faltan datos por llenar",
            text: "Completa la información requerida.",
            type: "warning"
        });
    }
}


//FUNCION cambiar la cookie de caseta al selecionar una en el modal 
function cambiarCaseta(selectedRow){
    console.log("cambiarCaseta",selectedRow)
    setCookie('userCaseta', selectedRow.name)
    setCookie('userLocation', selectedRow.ubi)
    setCookie('userCasetaStatus', selectedRow.status)
    setCookie('userCasetaGuard', selectedRow.guard)
    $("#textUbicacion").text(getCookie('userLocation'));
    $("#textCaseta").text(getCookie('userCaseta'));
    $("#textEstatusCaseta").text(getCookie('userCasetaStatus') ||"");
    if(getCookie('userCasetaStatus') == casetaDisponible){
        $("#textGuardiaEnTurno").text("");
        $("#textFechaInicioCaseta").text("")
    }else if(getCookie('userCasetaStatus')== casetaNoDisponible){
        $("#textGuardiaEnTurno").text(getCookie('userCasetaGuard'));
         $("#textFechaInicioCaseta").text("")
    }
    $("#textEstatusCaseta").removeClass();
    $("#textEstatusCaseta").addClass(getCookie('userCasetaStatus') !== casetaNoDisponible? "text-success":  "text-danger");
    $('#cambiarCasetaModal').modal('hide');
}


//FUNCION muestra un alert para hacer checkout de un guardia cuando se encuentra en turno iniciado
function eliminarGuardia(id, name){
    Swal.fire({
        title:"Check out",
        text:"¿Seguro que quieres realizar el check out al guardia de apoyo "+name+" ?",
        type:"warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "Cancelar",
    })
    .then((result) => {
        if (result.value) {
             
            let index = dataTableAgregarGuardiaApoyo.findIndex(guardia => guardia.id === id);
            if (index !== -1) {
                dataTableAgregarGuardiaApoyo.splice(index, 1);
            }
            let arrGuardiaTurno = idGuardiasEnTurno.filter(e => !e.includes("inp-"+id) && !e.includes("btn-"+id));
            idGuardiasEnTurno=arrGuardiaTurno
            let arrayGuard= guardiasEnTurno.filter(e => e.id !== id);
            guardiasEnTurno=arrayGuard
            let arrSelectedGuardias = arraySelectedGuardias.filter(e => parseInt(e.id) !== parseInt(id))
            arraySelectedGuardias=arrSelectedGuardias
            changeStatusTurn(false)
            Swal.fire({
                title: "Check out!",
                text: "Se ha realizado el check out correctamente.",
                type: "success"
            });
        }
    });
}


//FUNCION para agregar nuevo guardia de apoyo cuando tenemos el turno iniciado
function agregarNuevoGuardiaApoyo(){
    let selectedRow = tables["tableAgregarGuardiaApoyo"].getSelectedData(); 
    let exclude=[]
    for(newGuard of selectedRow){
        arraySelectedGuardias.push({name:newGuard.name, status: newGuard.status, img: newGuard.img, fechaInicio: "31 Enero 2024", id:newGuard.id})
        exclude.push(newGuard.id)
        guardiasEnTurno.push(newGuard)
        idGuardiasEnTurno.push("inp-"+ newGuard.id)
        idGuardiasEnTurno.push("btn-"+ newGuard.id)
    }
    //INFO: Eliminar los selecionados (en el modal) de la tabla "agregar guardias de apoyo" para que no se puedan
    //volver a agregar
    let newDataTableAgregarGuardiaApoyo = dataTableAgregarGuardiaApoyo.filter(function(guardia) { return !exclude.includes(guardia.id); });
    dataTableAgregarGuardiaApoyo= newDataTableAgregarGuardiaApoyo
    tables["tableAgregarGuardiaApoyo"].setData(dataTableAgregarGuardiaApoyo);

    // INFO: Actualizar la tabla guardias de apoyo
    tables["tableGuardiasApoyo"].setData(guardiasEnTurno);
    guardiasApoyoValidateOptions()
    $('#agregarGuardiaApoyoModal').modal('hide');  
}


//FUNCION que tiene las validaciones necesarias al iniciar turno
function turnoAbierto(idGuardiasEnTurno){
    if(guardiasEnTurno.length > 0){
        tables["tableGuardiasApoyo"].setData(guardiasEnTurno);
    }else{
        //tables["tableGuardiasApoyo"].setData([]);
    }
    setCookie("userTurn", userTurnAbierto,7);
    $("#todayHourText").html(new Date().toLocaleTimeString())
    $('#buttonChangeStatusTurn').text('Cerrar Turno').addClass('btn-danger');
    $('#statusTurnText').empty();
    $('#statusTurnText').append($('<div class="text-success" id="statusOn"> Turno Iniciado</div>'));
    $('#buttonGuardiaApoyoModal').attr("disabled", false);
    $('#buttonCambiarCaseta').attr("disabled", true);
    $('#buttonForzarCierre').attr("disabled", true);
    $('#textInfActualCaseta').text('Información:');
    $('#agregarGuardiasApoyoButton').attr("disabled", false);
    guardiasApoyoValidateOptions()
}


//FUNCION que tiene las validaciones necesarias al cerrar turno
function turnoCerrado(idGuardiasEnTurno){
    setCookie("userTurn", userTurnCerrado,7) 
    $("#todayHourText").html(new Date().toLocaleTimeString())
    $('#statusTurnText').empty();
    $('#statusTurnText').append($('<div class="text-danger" id="statusOff"> Turno Cerrado</div>'))
    $('#buttonChangeStatusTurn').text('Iniciar Turno').removeClass('btn-danger').addClass('btn-success');
    $('#buttonGuardiaApoyoModal').attr("disabled", true);
    $('#buttonCambiarCaseta').attr("disabled", false);
    $('#textInfActualCaseta').text('Información actual de la caseta:')
    $('#buttonForzarCierre').attr("disabled", false);
    $('#agregarGuardiasApoyoButton').attr("disabled", true);
    idGuardiasEnTurno=[]
    guardiasEnTurno=[] 
    arraySelectedGuardias=[]
    guardiasApoyoValidateOptions()
}


//FUNCION para actualizar los estatus 
function casetaActualizarEstatus(userTurn, userCasetaStatus){
    $("#textEstatusCaseta").removeClass();
    console.log(userCasetaStatus, casetaNoDisponible , userCasetaStatus!== casetaNoDisponible)
    $("#textEstatusCaseta").addClass( userCasetaStatus!== casetaNoDisponible? "text-success":  "text-danger");
    //setCookie("userTurn",userCasetaStatus == casetaDisponible? userTurnCerrado : userTurnAbierto , 7);

    if(userCasetaStatus== casetaDisponible){
         console.log("ACTUALIZARRR  TURNO ABIERTO",userCasetaStatus, casetaDisponible)
        $("#textEstatusCaseta").text(casetaDisponible);
        $("#headGuardiaEnTurno").text("")
        $("#headFechaInicioTurno").text("")
        $("#buttonForzarCierre").hide();
        $("#textGuardiaEnTurno").text("");
        $("#textFechaInicioCaseta").text("");

    }else if (userCasetaStatus== casetaNoDisponible){
         console.log("ACTUALIZARRR  TURNO ABIERTO",userCasetaStatus,casetaNoDisponible)
        $("#textEstatusCaseta").text(casetaNoDisponible);
        $("#headGuardiaEnTurno").text("Guardia en turno: ");
        $("#headFechaInicioTurno").text("Fecha de inicio de turno: ");
        $("#buttonForzarCierre").show();
    }
    if(userTurn== userTurnAbierto && userCasetaStatus== casetaNoDisponible){
        console.log("ACTUALIZARRR  TURNO ABIERTO")
        $("#textGuardiaEnTurno").text(getCookie('userCasetaGuard'));
        $("#textEstatusCaseta").text(getCookie('userCasetaStatus'));
        $("#textFechaInicioCaseta").text(booth_status.stated_at);

    }else if (userTurn== userTurnCerrado && userCasetaStatus== casetaDisponible){
        console.log("ACTUALIZAR TURNO CERRADOOOO")
        $("#textGuardiaEnTurno").text(getCookie('userCasetaGuard'));
        $("#textEstatusCaseta").text(getCookie('userCasetaStatus'));
        $("#textFechaInicioCaseta").text(booth_status.stated_at);
    }
}


//FUNCION con validaciones para ocultar botones de guardias de apoyo dependiendo del estatus del turno
function guardiasApoyoValidateOptions(){
    if (getCookie('userTurn') == userTurnCerrado){

        if(idGuardiasEnTurno.length==0){
            $(document).ready(function() {
                for(obj of dataTableGuardiasApoyo){
                    $("#inp-"+obj.id).show();
                    $("#btn-"+obj.id).hide();
                }
            })
        }
        for (g of idGuardiasEnTurno){
            if(g.includes("inp-")){
                $("#"+g).show();
            } 
            else if(g.includes("btn-")){
                $("#"+g).hide();
            }
        }
    }
    else if(getCookie('userTurn') == userTurnAbierto){
        for (g of idGuardiasEnTurno){
            if(g.includes("inp-")){
                $("#"+g).hide();
            } 
            else if(g.includes("btn-")){
                $("#"+g).show();
            }
        }
    }   
}


//FUNCION para dibujar las tablas de la pagina y guardar su instancia en el obj tables
function drawTableNotas(id, columnsData, tableData, height){
    let  table = new Tabulator("#" + id, {
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


//FUNCION para dibujar las tablas con opcion select de la pagina y guardar su instancia en el obj tables
function drawTableSelect(id, columnsData, tableData, height, select){
    let  table = new Tabulator("#" + id, {
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
