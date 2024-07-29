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
let arrayResponses=[]
let arraySuccessArchivo=[]
let arraySuccessFoto=[]
let colors = getPAlleteColors(12,0)
//FUNCION para cambiar la imagen del localstorage de imagen de perfil imagenURL en todas las pantallas


//FUNCION para abrir modales
function setModal(type = 'none',id){
    if(type == 'cambiarCaseta'){
        loadBooths();
    }else if(type == 'addNota'){
        limpiarEnviaNotaModal()
        $("#agregarNotasModal").modal('show');
    }
}


window.onload = function(){
    user = getCookie("userId");
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


function getNotes(){
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name:"notes.py",
            option:"get_notes",
            area: getCookie('userCaseta')
        }),
        headers:
        {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+userJwt
        },
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){
            if(user !='' && userJwt!=''){
                let notas=res.response.data
                dataTableNotas=[]
                if(notas.length > 0){
                    for(let note of notas){
                        let dateFormatOpen= note.note_open_date.slice(0,-3)
                        let dateFormatClose=""
                        if(note.hasOwnProperty('note_close_date')){
                            dateFormatClose= note.note_close_date.slice(0,-3)
                        }
                        //FALTA EL COMENTARIOO CAMBIAR EL ID ESE POR LETRA
                        dataTableNotas.push({folio:note.folio, note_status: note.note_status, note_guard:note.note_guard, 
                            note_open_date: dateFormatOpen, 
                            note_close_date:dateFormatClose,  note: note.note, 
                            note_pic: note.hasOwnProperty('note_pic') && note.note_pic.length>0 ? note.note_pic  : [], 
                            note_file: note.hasOwnProperty('note_file') &&note.note_file.length>0 ? note.note_file : [], 
                            note_comments: note.hasOwnProperty('note_comments') && note.note_comments.length>0 ? note.note_comments: [], 
                            check:"",view:"", edit:""})
                    }
                }else{
                    dataTableNotas = []
                }
                if(tables["tableNotas"]){
                    tables["tableNotas"].setData(dataTableNotas);
                }else{
                    drawTableNotas('tableNotas',columsDataNotas, dataTableNotas );
                }
            } else{
                redirectionUrl('login',false);
            }
        }else{
            errorAlert(res)
        }
    })
}


function changeImageGuard(){
    let userId= getCookie('userId')
    userJwt=getCookie('userJwt')
    let input = document.getElementById('inputFileUser');
    input.click();
    
    input.onchange =  function() {
        let file = event.target.files[0]; 
        let fileName=event.target.files[0].name
        let urlImagen=""
        if (file) {
            let lector = new FileReader(); 
            lector.onload =  function(event) {
                
                let urlChangeImage= `https://preprod.linkaform.com/api/infosync/user_admin/${userId}/profile_picture/`
                loadingService()

                let formData = new FormData();
                formData.append('name', 'profile_picture');
                formData.append('profile_picture', file);
               
                fetch(urlChangeImage, {
                    method: 'POST',
                    body: formData,
                    headers:
                    {
                        'Authorization': 'Bearer '+userJwt
                    },
                })
                .then(res => res.json())
                .then(async res => {
                    if (res.hasOwnProperty('thumb')){
                        let body={
                            method:'PATCH',
                            body: JSON.stringify({
                                thumb: res.thumb
                            }),
                            headers: { 'Authorization': 'Bearer '+userJwt },
                        }
                        let responseData = await fetch(url + `infosync/user_admin/${userId}/`,body)
                        let data = await responseData.json(); 
                        console.log("RESPUESTA",data)
                        if(data.hasOwnProperty('error_message')){
                            console.log("traemos ewrirrees")
                            errorAlert(data.error_message)
                        } else{
                            urlImagen  = event.target.result;
                            localStorage.setItem("imagenURL", String(urlImagen));
                            let imagenMostrada = document.getElementById("imgProfilePic");
                            imagenMostrada.src = urlImagen;
                            imagenMostrada.style.display = "block"; // Mostrar la imagen
                            //setCookie('userImg',String(urlImagen),7)
                            let imagenMostradaNavbar = document.getElementById("imageUserNavbar");
                            imagenMostradaNavbar.src= urlImagen;
                            imagenMostradaNavbar.style.display = "block";
                            Swal.close();
                        }
                    }else{
                        errorAlert(res)
                    }
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
            let data=res.response.data
            if(res.response){
                let loc= data.location
                let guard= data.guard
                let notes= data.notes
                supportGuards= data.support_guards
                thisUserCheckInId=data.guard._id
                inicializarPagina(loc, notes, guard, data.booth_status, data.booth_stats);
                if(user !='' && userJwt!=''){
                    if(data.support_guards.length > 0){
                        for(let guard of data.support_guards){
                            if(guard.user_id.toString() !==  getCookie('userId').toString())
                            dataTableGuardiasApoyo.push({name:guard.name, status: '', img: guard.picture? guard.picture.file_url :'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1', fechaInicio: '', id:guard.user_id})
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
                    getNotes();
                }
            }
        } else{
            //errorAlert(res)
            drawTableNotas('tableGuardiasApoyo',columsDataGuardiasApoyo,[], "420px");
            drawTableNotas('tableNotas',columsDataNotas, [] ,"180px");
            errorLoginTurnos(res)
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
            'Authorization': 'Bearer '+ userJwt
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            if(user !='' && userJwt!=''){
                dataTableCambiarCaseta=[]
                let userBooths=res.response.data
                 if(userBooths.length>0){
                    for(let booth of userBooths){
                        if(booth.status == casetaDisponible){
                            dataTableCambiarCaseta.push({name:booth.area, ubi:booth.location, status:booth.status , guard: booth.employee, folio: booth.folio, address: booth.address, city:booth.city})
                            arrayUserBoothsLocations.push({name:booth.area, ubi:booth.location, status:booth.status , guard: booth.employee, folio: booth.folio, address: booth.address, city:booth.city})
                        }
                    }
                }else{
                    dataTableCambiarCaseta=[]
                    arrayUserBoothsLocations=[]
                }
                tables["tableCambiarCaseta"].setData(dataTableCambiarCaseta);
                $('#cambiarCasetaModal').modal('show');
                $("#buttonCambiarCaseta").show();
                $("#loadingButtonCaseta").hide();
                
            }
        }else{
            errorAlert(res)
        }
    });
}


//FUNCION Toda la inciializacion de cookies y variables necesarias para el funcionamiento de la pantalla
function inicializarPagina(loc, notes, guard,booth_status, booth_stats){
    caseta=guard.area;
    ubicacion=guard.location;
    $("#textCuidad").text(loc.city)
    $("#textEstado").text(loc.state)
    $("#textDireccion").text(loc.address)
    $("#textPosition").text(guard.checkin_position)

    setCookie('userCaseta',getCookie('userCaseta') ? getCookie('userCaseta'): caseta ,7)
    setCookie('userLocation',getCookie('userLocation') ? getCookie('userLocation'):ubicacion ,7)
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
                    'Authorization': 'Bearer '+userJwt
                },
            })
            .then(res => res.json())
            .then(res => {
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
        Swal.fire({
            title: 'Cargando...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
           }
        });
        console.log("dataTableGuardiasApoyo",dataTableGuardiasApoyo)
        for(g of arraySelectedGuardias){
            guardiasEnTurno = guardiasEnTurno.concat(dataTableGuardiasApoyo.filter(e => e.id == g.user_id))
            idGuardiasEnTurno.push("inp-"+ g.user_id)
            idGuardiasEnTurno.push("btn-"+ g.user_id)
            inputSelectedGuards.push({"name":g.name,"user_id": g.user_id })
        } 
        //FETCH PARA CMABIAR ESTUS DEL GUARDIA AQUI
        if(estatusActual == userTurnAbierto ){
            fetch(url + urlScripts, {
                method: 'POST',
                body: JSON.stringify({
                script_name: 'script_turnos.py',
                option: 'checkout',
                checkin_id: thisUserCheckInId,
                location: ubicacion,
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
                    let data=res.response.data
                    console.log("GUARDIAS SELECIONADOS", inputSelectedGuards)
                    if (data.status_code==400|| data.status_code==401){
                        let errores=[]
                        for(let err in data.json){
                            errores.push(data.json[err].label+': '+data.json[err].msg)
                        }
                        Swal.fire({
                            title: "Error",
                            text: errores.flat(),
                            type: "error"
                        });
                    }else{
                        casetaActualizarEstatus(turnoCerrado, casetaDisponible)
                        customNavbar(getValueUserLocation(), userTurnCerrado);
                        setCookie('userCasetaStatus',casetaDisponible,7)
                        setCookie('userTurn',turnoCerrado,7)
                        turnoCerrado(idGuardiasEnTurno)
                        Swal.fire({
                            title: "Success",
                            text: "Turno cerrado correctamente",
                            type: "success",
                            showConfirmButton:false,
                            timer:1200
                        });
                    }
                } else{
                    errorAlert(res)
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
                area: getCookie("userCaseta"),
                employee_list:inputSelectedGuards
            }),
            headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ userJwt
                },
            })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                       let data=res.response.data
                    if (data.status_code==400|| data.status_code==401){
                        let errores=[]
                        for(let err in data.json){
                            errores.push(data.json[err].label+': '+data.json[err].msg)
                        }
                        Swal.fire({
                            title: "Error",
                            text: errores.flat(),
                            type: "error"
                        });
                    }else{
                        setCookie('userCasetaStatus',casetaNoDisponible,7)
                        setCookie('userTurn',turnoAbierto,7)
                        customNavbar(getValueUserLocation(),userTurnAbierto);
                        casetaActualizarEstatus(turnoAbierto, casetaNoDisponible)
                        turnoAbierto(idGuardiasEnTurno)
                        $("#textGuardiaEnTurno").text(res.response.data.json.boot_status.guard_on_duty)
                        $("#textFechaInicioCaseta").text(res.response.data.json.created_at)
                        thisUserCheckInId=res.response.data.json.id
                        Swal.fire({
                            title: "Success",
                            text: "Truno iniciado correctamente",
                            type: "success",
                            showConfirmButton:false,
                            timer:1200
                        });
                    }
                } else{
                    errorAlert(res)
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


//FUNCION para mostrar alert para cerrar un nota en caso que tenga esta abierto
function cerrarNotaAlert(name, note, folio, status){
    if(status == statusAbierto){
        Swal.fire({
            title: "Confirmación",
            type: 'warning',
            html: ` 
                <div class="d-flex justify-content-center mt-2" id="tableCambiarCaseta"></div>
                <div class="mb-4"><h5>¿Estás seguro que deseas cerrar esta nota?</h5></div>
                <table class='table table-borderless customShadow' style=' font-size: .8em; background-color: lightgray !important;'>
                    <tbody> 
                        <tr> <td><b>Nombre:</b></td> <td> <span > `+ name +`</span></td> </tr>
                        <tr> <td><b>Nota:</b></td> <td> <span > `+ note+`</span></td> </tr> 
                    </tbody> 
                </table> 
            `,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "Cancelar"
        })
        .then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Cargando...',
                    allowOutsideClick: false,
                    onBeforeOpen: () => {
                        Swal.showLoading();
                   }
                });
                let data_update={
                    'note_status':'cerrado',
                    'note_close_date': getTodayDateTime()
                }
                 fetch(url + urlScripts, {
                    method: 'POST',
                    body: JSON.stringify({
                        script_name:"notes.py",
                        option:"update_note",
                        data_update:data_update,
                        folio:folio
                    }),
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+userJwt
                    },
                })
                .then(res => res.json())
                .then(res => {
                    if(res.success){
                        let data = res.response.data
                        if (data.status_code==400){
                            let errores=[]
                            for(let err in data.json){
                                errores.push(data.json[err].label+': '+data.json[err].msg)
                            }
                            Swal.fire({
                                title: "Error",
                                text: errores.flat(),
                                type: "error"
                            });
                        } else if(data.status_code==202 ||data.status_code==201){
                        
                            if(user !='' && userJwt!=''){
                                let selectedNote = dataTableNotas.find(nota => nota.folio == folio);
                                for (let key in data_update){
                                    if(key=='note_close_date'){
                                        let formatDate= data_update[key].slice(0,-3)
                                        data_update[key]= formatDate
                                    }
                                    selectedNote[key]= data_update[key]
                                }
                                    selectedNote.note_status = data_update.note_status
                                    tables["tableNotas"].setData(dataTableNotas);
                                Swal.fire({
                                    title: "Success",
                                    text: "La nota fue cerrada correctamente",
                                    type: "success",
                                    showConfirmButton:false,
                                    timer:1200
                                });
                            }
                        }
                        
                    }else{
                        Swal.fire({
                            title: "Error",
                            text: res.error,
                            type: "error"
                        });
                    }
                })
            }
        });
    }else{
        Swal.fire({
            title: "Validación",
            text: "Esta nota ya se encuentra cerrada.",
            type: "warning"
        });
    }
}


//FUNCION para mostrar alert con detalle de la nota
function verNotasAlert(folio){
    let selectedNota = dataTableNotas.find(x => x.folio == folio);
    let fotosItem=``;
    let archivosItem=``;
    let commentsItem=``;

    let comments = selectedNota.note_comments.filter(objeto => !tienePropiedadesVacias(objeto));
    for(let com in comments){
        commentsItem+=`
        <div class='m-2 '> 
            <span style='font-size: .8em;'>`+selectedNota.note_comments[com]['6647fb38da07bf430e273ea2']+`</span> 
        </div>`;
    }
    let htmlComments = comments.length>0 ? `
        <h6>Comentarios</h6>
        <div class='d-flex  flex-column '>
            `+commentsItem+` 
        </div>`: "";

    for(let pic of selectedNota.note_pic){
        fotosItem+=`
        <div class='m-2'> 
            <img src="`+pic.file_url+`" height="145px"style="object-fit: contain;"></td> </tr> 
        </div>`;
    }
    let htmlFotos=selectedNota.note_pic.length>0 ? `
        <h6>Fotografias</h6>
        <div class='d-flex  flex-row'>
            `+fotosItem+`
        </div>`:"";

    for(let file of selectedNota.note_file){
        archivosItem+=`
        <div><a href=`+file.file_url+` target="_blank">`+file.file_name+`</a>
        </div>
        `;
    }
    let htmlArchivos=selectedNota.note_file.length>0 ? `
        <h6>Archivos</h6>
        <div class='d-flex flex-column'>
            `+archivosItem+`
        </div> <br>`: "";

    Swal.fire({
        title: "Nota",
        text: "Escoje una caseta para continuar...",
        html: ` <div class="d-flex justify-content-center mt-2" id="tableCambiarCaseta"></div>
            <table class='table table-borderless customShadow' style=' font-size: .8em; background-color: lightgray !important;'>
                <tbody> 
                    <tr> <td><b>Nombre:</b></td> <td> <span > `+ selectedNota.note_guard +`</span></td> </tr>
                    <tr> <td><b>Nota:</b></td> <td> <span > `+ selectedNota.note+`</span></td> </tr> 
                    <tr> <td><b>Estatus:</b></td> <td> <span > `+ selectedNota.note_status+`</span></td> </tr> 
                    <tr> <td><b>Fecha y hora de creacion:</b></td> <td> <span > `+ selectedNota.note_open_date.slice(0,-3)+` hrs</span></td> </tr>
                    <tr> <td><b>Fecha y hora de cierre:</b></td> <td> <span>  `+ selectedNota.note_close_date.slice(0,-3)+` hrs</span> </tr>
                </tbody> 
            </table>` + htmlComments + htmlArchivos + htmlFotos,
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
                if(guardia.user_id == checkbox.value){
                    arraySelectedGuardias.push(guardia)
                }
            }
        }
    });
}     

function limpiarEnviaNotaModal(){
    arraySuccessFoto=[]
    arraySuccessArchivo=[]
    arrayResponses=[]
    //$("#idButtonCargarArchivos").show();
    $("#textAreaNuevaNotaNota").val("")
    //$("#inputComentarioNota").val("")
    $("#comentarioNuevaNota").val("")
    let divArchivo = document.getElementById("archivo-input-form");
    let divFoto = document.getElementById("foto-input-form");
    let divComment = document.getElementById("comment-input-form");

    const elementsArchivo = divArchivo.querySelectorAll('.archivo-div');
    elementsArchivo.forEach(function(input) {
        if(input.id!=="fileInputArchivo"){
            input.parentElement.parentElement.remove();
        }
    });
    const elementsFoto = divFoto.querySelectorAll('.foto-div');
    elementsFoto.forEach(function(input) {
        if(input.id!=="fileInputFotografia"){
            input.parentElement.parentElement.remove();
        }
    });
    const elementsComment = divComment.querySelectorAll('.comment-div');
    elementsComment.forEach(function(input) {
        if(input.id!=="comentarioNuevaNota"){
            input.parentElement.parentElement.remove();
        }
    });

    let inputsE = divArchivo.querySelectorAll('.archivo-div');
    inputsE.forEach(function(input) {
        input.value=''
    });

    let inputsF = divFoto.querySelectorAll('.foto-div');
    inputsF.forEach(function(input) {
        input.value=''
    });
}

//FUNCION para enviar la nueva notra creada
function enviarNota(){
    console.log("ESTAMOS ENTRANDO")
    $("#idLoadingButtonEnviarNota").show();
    $("#idButtonEnviarNota").hide();
    let nota= $("#textAreaNuevaNotaNota").val(); 
    let archivo= $("#fileInputArchivo").val(); 
    //let status= $("#nuevaNotaEstatusSelect").val(); 
    //let fecha= $("#fechaNuevaNota").val(); 
    //let formatDate= fecha.split("T")[0]+' '+fecha.split("T")[1]
    let comments=[]
    let divComentario = document.getElementById("comment-input-form");
    let inputsG = divComentario.querySelectorAll('.comment-div');
    inputsG.forEach(function(input) {
        if(input.value!==""){
            comments.push(input.value)
        }
    });
    for(let obj of arrayResponses){
        if( obj.hasOwnProperty('file_name') && obj.isImage==true){
            let { isImage, file_name, file  } = obj;
            arraySuccessFoto.push({file_name: file_name, file_url: file});
        }
    }

    for(let obj of arrayResponses){
        if( obj.hasOwnProperty('file_name') && obj.isImage==false){
            let { isImage, file_name, file } = obj;
            arraySuccessArchivo.push({file_name: file_name, file_url: file});
        }
    }
    let data_notes={
        'note_status': statusAbierto,
        'note':nota,
        'note_booth':getCookie('userCaseta'),
        'note_guard':getCookie('userName'),
        'note_guard_close':'', //este dato no viene en la lista principal...
        'note_pic':arraySuccessFoto ,
        'note_file':arraySuccessArchivo ,
        'note_comments':comments, //note_comments_group no esta igual que en la lista
    } 
    if(nota!==""){
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name:"notes.py",
                option:"new_notes",
                data_notes:data_notes
            }),
            headers:{
               'Content-Type': 'application/json',
               'Authorization': 'Bearer '+userJwt
            },
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                let data = res.response.data
                    if (data.status_code==400){
                        let errores=[]
                        for(let err in data.json){
                            errores.push(data.json[err].label+': '+data.json[err].msg)
                        }
                        Swal.fire({
                            title: "Error",
                            text: errores.flat(),
                            type: "error"
                        });
                        $("#idLoadingButtonEnviarNota").hide();
                        $("#idButtonEnviarNota").show();
                    } else if(data.status_code==202 ||data.status_code==201){
                        let date= convertDate(data.json.created_at, data.json.timezone)
                        Swal.fire({
                            title: "Confirmación",
                            text: "La nota se ha creado correctamente.",
                            type: "success",
                            showConfirmButton:false,
                            timer:1200
                        });
                        $('#agregarNotasModal').modal('hide');
                        $("#inputTextNota").val('');
                        inputsG.forEach(function(input) {
                            input.value=''
                        });
                        let divArchivo = document.getElementById("archivo-input-form");
                        let inputsE = divArchivo.querySelectorAll('.archivo-div');
                        inputsE.forEach(function(input) {
                            input.value=''
                        });
                        
                        let divFoto = document.getElementById("foto-input-form");
                        let inputsF = divFoto.querySelectorAll('.foto-div');
                        inputsF.forEach(function(input) {
                            input.value=''
                        });
                        for (let key in data_notes){
                            if(key=='note_open_date'/*|| key=='note_close_date'*/){
                                let formatDate= data_notes[key].slice(0,-3)
                                data_notes[key]= formatDate
                            }
                        }
                        let note_open_date= convertDate(data.json.created_at, data.json.timezone)
                        dataTableNotas.unshift({folio:data.json.folio, note_status: data_notes.note_status, note_guard:data_notes.note_guard, 
                            note_open_date: note_open_date, 
                            note_close_date:"",  note: data_notes.note, 
                            note_pic: data_notes.hasOwnProperty('note_pic') && data_notes.note_pic.length>0 ? data_notes.note_pic  : [], 
                            note_file: data_notes.hasOwnProperty('note_file') && data_notes.note_file.length>0 ? data_notes.note_file : [], 
                            note_comments: data_notes.hasOwnProperty('note_comments') && data_notes.note_comments.length > 0 ? data_notes.note_comments: [], 
                            check:"",view:"", edit:""})

                        tables["tableNotas"].setData(dataTableNotas);
                        $("#idLoadingButtonEnviarNota").hide();
                        $("#idButtonEnviarNota").show();

                    }
            } else{
                Swal.fire({
                    title: "Error",
                    text: res.error,
                    type: "Error"
                });
                $("#idLoadingButtonEnviarNota").hide();
                $("#idButtonEnviarNota").show();
            }
        })
    } else{
        Swal.fire({
            title: "Faltan datos por llenar",
            text: "Completa la información requerida.",
            type: "warning"
        });
        $("#idLoadingButtonEnviarNota").hide();
        $("#idButtonEnviarNota").show();
    }
}


function alertEliminarNota(folio){
    Swal.fire({
        title:'¿Estas seguro de querer eliminar la nota?',
        html:`
        <div class="m-2"> Esta accion no se puede deshacer. </div>`,
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
            Swal.fire({
                title: 'Cargando...',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading();
               }
            });
            fetch(url + urlScripts, {
                method: 'POST',
                body: JSON.stringify({
                    script_name: "notes.py",
                    option: "delete_note",
                    folio: [folio]
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
                    let data=res.response.data
                    if(data.status_code==400){
                        let errores=[]
                        for(let err in data.json){
                            errores.push(data.json[err].label+': '+data.json[err].msg)
                        }
                        Swal.fire({
                            title: "Error",
                            text: errores.flat(),
                            type: "error"
                        });
                    }else if(data.status_code==202 ||data.status_code==201){
                        Swal.close();
                        Swal.fire({
                            title: "Success",
                            text: "Se elimino la nota correctamente.",
                            type: "success",
                            showConfirmButton:false,
                            timer:1200
                        });
                            let dataFiltered = dataTableNotas.filter(x => x.folio !== folio);
                            dataTableNotas = dataFiltered
                            tables["tableNotas"].setData(dataTableNotas);
                    }
                }else{
                    Swal.fire({
                        title: "Error",
                        text: res.error.msg.msg,
                        type: res.error.msg.type
                    });
                }
            });
        }
    });
}

//FUNCION cambiar la cookie de caseta al selecionar una en el modal 
function cambiarCaseta(selectedRow){
    setCookie('userCaseta', selectedRow.name)
    setCookie('userLocation', selectedRow.ubi)
    setCookie('userCasetaStatus', selectedRow.status)
    setCookie('userCasetaGuard', selectedRow.guard)
    $("#textUbicacion").text(getCookie('userLocation'));
    $("#textCaseta").text(getCookie('userCaseta'));
    $("#textDireccion").text(selectedRow.address[0]);
    $("#textCuidad").text(selectedRow.city[0])

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
    getNotes()
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
            loadingService()
            fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name:"script_turnos.py",
                option:"checkout",
                guards:[id]
            }),
            headers:{
               'Content-Type': 'application/json',
               'Authorization': 'Bearer '+userJwt
            },
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                let data = res.response.data
                    if (data.status_code==400 || data.status_code==401 ){
                        errorAlert(data)
                    }else{
                        console.log("salidaaa",dataTableAgregarGuardiaApoyo,id)
                        let index = dataTableAgregarGuardiaApoyo.findIndex(guardia => guardia.id === id);
                        if (index !== -1) {
                            dataTableAgregarGuardiaApoyo.splice(index, 1);
                        }
                        console.log("idGuardiasEnTurno",idGuardiasEnTurno)
                        let arrGuardiaTurno = idGuardiasEnTurno.filter(e => {
                            console.log("VALIDACION 1 ",e.includes("inp-"+id) || e.includes("btn-"+id))
                            console.log("VALOR DE E",e)
                            console.log("VALOR DE E","inp-"+id, "btn-"+id)
                            if(e.includes("inp-"+id) || e.includes("btn-"+id)){
                                return e
                            }
                        });
                        idGuardiasEnTurno=arrGuardiaTurno
                        console.log("arrGuardiaTurno",arrGuardiaTurno)

                        console.log("guardiasEnTurno",idGuardiasEnTurno)
                                                console.log("guardiasEnTurno",guardiasEnTurno)

                        let arrayGuard= guardiasEnTurno.filter(e => e.id !== id);
                        guardiasEnTurno=arrayGuard
                        let arrSelectedGuardias = arraySelectedGuardias.filter(e => parseInt(e.id) !== parseInt(id))
                        arraySelectedGuardias=arrSelectedGuardias
                        //tbale["tableAgregarGuardiaApoyo"].setData([])
                        changeStatusTurn(false)
                        Swal.fire({
                            title: "Check out!",
                            text: "Se ha realizado el check out correctamente.",
                            type: "success"
                        });
                    }
            }else{
                errorAlert(res)
            }
        })



            
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
    $("#textEstatusCaseta").addClass( userCasetaStatus!== casetaNoDisponible? "text-success":  "text-danger");
    //setCookie("userTurn",userCasetaStatus == casetaDisponible? userTurnCerrado : userTurnAbierto , 7);

    if(userCasetaStatus== casetaDisponible){
        $("#textEstatusCaseta").text(casetaDisponible);
        $("#headGuardiaEnTurno").text("")
        $("#headFechaInicioTurno").text("")
        $("#buttonForzarCierre").hide();
        $("#textGuardiaEnTurno").text("");
        $("#textFechaInicioCaseta").text("");

    }else if (userCasetaStatus== casetaNoDisponible){
        $("#textEstatusCaseta").text(casetaNoDisponible);
        $("#headGuardiaEnTurno").text("Guardia en turno: ");
        $("#headFechaInicioTurno").text("Fecha de inicio de turno: ");
        $("#buttonForzarCierre").show();
    }
    if(userTurn== userTurnAbierto && userCasetaStatus== casetaNoDisponible){
        $("#textGuardiaEnTurno").text(getCookie('userCasetaGuard'));
        $("#textEstatusCaseta").text(getCookie('userCasetaStatus'));
        $("#textFechaInicioCaseta").text(booth_status.stated_at);

    }else if (userTurn== userTurnCerrado && userCasetaStatus== casetaDisponible){
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


function setAddComentario(){
     let randomID = Date.now();
    let newItem=`
        <div class="d-flex mb-3 div-comment-`+randomID+`" id="div-comment-`+randomID+`">
            <div class="flex-grow-1">
                <label class="form-label">Comentario *</label>
                <textarea class="form-control comment-div" id="inputComentarioNota-`+randomID+`"" rows="3" placeholder="Escribe algo..."></textarea>
            </div>
            <div>
                <button type="button" class="btn btn-success button-add-register " onclick="setAddComentario();return false;">
                    <i class="fa-solid fa-plus"></i>
                </button>
                <button type="button" class="btn btn-danger button-delete-register "  onclick="setDeleteComentario(`+randomID+`);return false;">
                    <i class="fa-solid fa-minus"></i></button>
            </div>
        </div>
    `;
    $('#comment-input-form').append(newItem);
}


function setDeleteComentario(id){
    const elements = document.querySelectorAll('.comment-div');
    const count = elements.length;
    if(count > 1){
        const elements = document.getElementsByClassName('div-comment-'+id);
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}

//FUNCION para eliminar archivo en el modal de agregar nota
function setAddArchivo(){
    let randomID = Date.now();
    let newItem=`
        <div class="d-flex mb-3 col-12  div-archivo-`+randomID+`" id="id-archivo-div-`+randomID+`">
            <div class="flex-grow-1">
                <label class="form-label">Cargar un archivo *</label>
                <input type="file" class="form-control-file archivo-div" onchange="guardarArchivos('fileInputArchivo-`+randomID+`', false);" id="fileInputArchivo-`+randomID+`">
            </div>
            <div>
                <button type="button" class="btn btn-success button-add-register" onclick="setAddArchivo();return false;">
                    <i class="fa-solid fa-plus"></i>
                </button>
                <button type="button" class="btn btn-danger button-delete-register"  onclick="setDeleteArchivo(`+randomID+`);return false;">
                    <i class="fa-solid fa-minus"></i>
                </button>
            </div>
        </div>
    `;
    $('#archivo-input-form').append(newItem);
}


//FUNCION para agregar archivo en el modal de agregar nota
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


//FUNCION para agregar foto en el modal de agregar nota
function setAddFoto(){
    let randomID = Date.now();
    let newItem=`
        <div class="d-flex mb-3 col-12  div-foto-`+randomID+`" id="id-foto-div-`+randomID+`">
            <div class="flex-grow-1">
                <label class="form-label">Fotografia *</label>
                <input type="file" class="form-control-file foto-div" onchange="guardarArchivos('fileInputFotografia-`+randomID+`', true);" id="fileInputFotografia-`+randomID+`">
                
            </div>
            <div>
                <button type="button" class="btn btn-success button-add-register" onclick="setAddFoto();return false;">
                    <i class="fa-solid fa-plus"></i>
                </button>
                <button type="button" class="btn btn-danger button-delete-register"  onclick="setDeleteFoto(`+randomID+`);return false;">
                   <i class="fa-solid fa-minus"></i>
                </button>
            </div>
        </div>
    `;
    $('#foto-input-form').append(newItem) 
}


//FUNCION para elimar foto en el modal de agregar nota
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


//FUNCION para guardar los archivos en el server 
async function guardarArchivos(id, isImage){
    Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
       }
    });
    const fileInput = document.getElementById(id);
    const file = fileInput.files[0]; // Obtener el archivo seleccionado

    if (!file) {
        alert('Selecciona un archivo para subir');
        return;
    }
    let data=""
    let formData = new FormData();
    if(isImage){
        formData.append('File', file);
        formData.append('field_id', '63e65029c0f814cb466658a2');
        formData.append('is_image', true);
        formData.append('form_id', 95435);
    }else{
        formData.append('File[0]', file);
        formData.append('field_id', '63e65029c0f814cb466658a2');
        formData.append('form_id', 95435);

    }

    const options = {
      method: 'POST', 
      body: formData,
    };
    let respuesta = await fetch('https://app.linkaform.com/api/infosync/cloud_upload/', options);
    data = await respuesta.json(); //Obtenemos los datos de la respuesta 
    data.isImage=isImage
    arrayResponses.push(data); //Agregamos los datos al arreglo
    if(data.hasOwnProperty('error')){
        Swal.fire({
            title: "Error",
            text: data.error,
            type: "error",
            showConfirmButton:false,
            timer:1100
        });
        
    }else{
        let text= isImage? 'Las imagenes fueron guardadas correctamente.': 'Los archivos fueron guardados correctamente.';
        Swal.fire({
            title: "Acción Completada",
            text: text,
            type: "success",
            showConfirmButton:false,
            timer:1100
        });
    }
}



//FUNCION para dibujar las tablas de la pagina y guardar su instancia en el obj tables
function drawTableNotas(id, columnsData, tableData, height){
    var  table = new Tabulator("#" + id, {
        layout:"fitDataStretch",
        height:height,
        data:tableData,
        textDirection:"ltr",
        columns:columnsData,
        pagination:true, 
        paginationSize:40,
        placeholder: "No hay registros disponibles", 
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
        placeholder: "No hay registros disponibles", 
    });
    tables[id]=table;
}