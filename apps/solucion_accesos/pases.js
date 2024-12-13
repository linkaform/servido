// let colors = getPAlleteColors(12,0)
const tabs = document.querySelectorAll('.nav-link');

// let account_id=''
let selectedGlobalPase =""

window.onload = function(){
    setValueUserLocation('pases');
    let userA = getCookie("userId_soter");
    userJwt = getCookie("userJwt_soter");
    validSession(user, userJwt);
    if(userA !='' && userJwt!=''){
        drawTable('tableListTodos',columnsTableListPendientes, dataTableListTodos );
    }

    $("#locCard").hide()
    changeButtonColor();
    customNavbar(getValueUserLocation(), getCookie('userTurn'))
	
    selectLocation= getCookie("userLocation") //document.getElementById("selectLocation")
    selectCaseta= getCookie("userCaseta")//document.getElementById("selectCaseta")

    // selectLocation.onchange = function() {
    //     let response = fetchOnChangeLocation(selectLocation.value)
    // };
    // selectCaseta.onchange = async function() {
    //     let response = await fetchOnChangeCaseta('notes.py', 'get_notes', selectCaseta.value, selectLocation.value)
    //     reloadTableNotas(response.response.data)
    // };
    account_id=getCookie('userId_soter')
    // fillCatalogs();
    // getAllData();
    getAllDataPases()
}

function setModal(type = 'none',id ="", nombre='', email=''){
    if(type== "favoritos"){
        modalFavoritos(id)
    }else if(type== "ver"){
        selectedGlobalPase=id
        modalVerPase2(id)
    }else if(type== "editar"){
        selectedGlobalPase=id
        modalEditarPase(id)
    }else if(type== "reenviar"){
        modalReenviarPase(id)
    }
}

tabs.forEach(tab => {
    tab.addEventListener('shown.bs.tab', function (event) {
        const activeTab = event.target;
        const previousTab = event.relatedTarget; 
        onTabChange(activeTab.id, previousTab ? previousTab.id : null);
    });
});

function onTabChange(activeTabId, previousTabId) {
    switch (activeTabId) {
        case 'nav-todos-tab':
            getAllDataPases('Todos');
            break;
        case 'nav-favoritos-tab':
            getAllDataPases('Favoritos')
            break;
        case 'nav-activos-tab':
            getAllDataPases('Activos')
            break;
        case 'nav-vencidos-tab':
            getAllDataPases('Vencidos')
            break;
        default:
            getAllDataPases('Todos');
    }
}

function getAllDataPases(tab_status='Todos'){
    // loadingService()
    dataTableListTodos=[]
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name:'pase_de_acceso.py',
            option:'get_my_pases',
            tab_status:tab_status
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
            Swal.close()
            if(user !='' && userJwt!=''){
                    let pases=res.response.data
                    if(pases.length >0){
                        for(let pase of pases){
                            // let dateFormat= pase.fecha_hora_pase.slice(0,-3)
                            dataTableListTodos.push({
                                folio:pase.folio, 
                                _id: pase._id,
                                nombre_pase: pase.nombre ||"",
                                email_pase:pase.email||"",
                                telefono_pase: pase.telefono||"",
                                fecha_desde_hasta:pase.fecha_desde_hasta,
                                fecha_desde_visita:pase.fecha_desde_visita,
                                tipo_de_pase:pase.tipo_de_pase,
                                motivo_visita: pase.motivo_visita ||"",
                                status_pase:pase.estatus ||"",
                                tema_cita:pase.tema_cita ||"",
                                descripcion:pase.descripcion ||"",
                                visita_a: pase.visita_a ||[],
                                ubicacion:pase.ubicacion||"",
                                walkin_fotografia: pase.foto||[],
                                walkin_identificacion:pase.identificacion||[],
                                enviar_correo_pre_registro: pase.enviar_correo_pre_registro||[],
                                enviar_correo: pase.enviar_correo ||[],
                                config_dia_de_acceso:pase.config_dia_de_acceso ||"",
                                tipo_fechas_pase:pase.tipo_fechas_pase||"",
                                tipo_visita : pase.tipo_visita ||"",
                                limite_de_acceso:pase.limite_de_acceso||"",
                                grupo_instrucciones_pase: pase.grupo_instrucciones_pase||[],  
                                grupo_vehiculos:pase.grupo_vehiculos ||[],  
                                grupo_equipos:pase.grupo_equipos ||[],  
                                grupo_areas_acceso :pase.grupo_areas_acceso ||[],
                                limitado_a_dias :pase.limitado_a_dias||[],  
                                qr_pase:pase.qr_pase||[],
                                archivo_invitacion:pase.archivo_invitacion ||[]
                            })
                        }
                    }else{
                        dataTableListTodos = []
                    }
                    tab(tab_status,columnsTableListPendientes, dataTableListTodos)
            } else{
                redirectionUrl('login',false);
            }
        }else{
            errorAlert(res)
        }
    })
}


function tab(tab_status,columnsTableListPendientes, dataTableListTodos){
    switch (tab_status) {
        case 'Todos':
            drawTable('tableListTodos', columnsTableListPendientes, dataTableListTodos);
            break;
        case 'Favoritos':
            drawTable('tableListFavoritos', columnsTableListPendientes, dataTableListTodos);
            break;
        case 'Activos':
            drawTable('tableListActivos', columnsTableListPendientes, dataTableListTodos);
            break;
        case 'Vencidos':
            drawTable('tableListVencidos', columnsTableListPendientes, dataTableListTodos);
            break;
        default:
            drawTable('tableListTodos', columnsTableListPendientes, dataTableListTodos);
    }
}


function modalFavoritos(folio){
    let selectedPase = dataTableListTodos.find(x => x._id == folio);
    let access_pass={}
    let resultSwal=false
    let titleSwal="" 
    let confirmText=""
    let bodyInf = {script_name:"pase_de_acceso.py", option:"update_pass", folio:folio}
    let fav =""
    if(selectedPase.favoritos instanceof Array ){
        fav= selectedPase.favoritos[0]
    }else{
        fav=selectedPase.favoritos
    }
    
    if(capitalizeFirstLetter(fav)==''){
        titleSwal='¿Estas seguro de querer agregar a favoritos?';
        access_pass = {'favoritos': 'si' }
        resultSwal=true
        confirmText= 'Se agregó a favoritos correctamente.';
    }else if ( capitalizeFirstLetter(fav)=='Si'){
        titleSwal='¿Estas seguro de querer eliminar de favoritos?';
        access_pass = {'favoritos': '' }
        resultSwal=true
        confirmText= 'Se eliminó de favoritos correctamente.';
    }
    Swal.fire({
            title:titleSwal,
            html:``,
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
                actualizarFavorito(bodyInf,access_pass, folio,resultSwal,confirmText,selectedPase._id)
            }
        })

}

function cerrarSwal(){
    Swal.close()
}


// CUANDO SE LE DA CLICK AL OJITO
function modalVerPase2(id){ 
    let data = dataTableListTodos.filter(x => x._id == id).pop();

    $("#nombrePase").text(data.nombre_pase)
    console.log('data.status_pase',data.status_pase, capitalizeFirstLetter(data.status_pase))
    $("#statusPaseVer").text(capitalizeFirstLetter(data.status_pase))
    $("#emailPase").text(data.email_pase)
    $("#telefonoPase").text(data.telefono_pase)
    $("#ubicacionPase").text(data.ubicacion)
    $("#temaPase").text(data.tema_cita)
    $("#descripcionPase").text(data.descripcion)
    let fotoP = data.walkin_fotografia.length > 0 ? data.walkin_fotografia[0].file_url : "" 
    $("#fotoPase").prop('src', fotoP);
    let identificacionP = data.walkin_identificacion.length > 0 ? data.walkin_identificacion[0].file_url : "" 
    $("#identificacionPase").prop('src',identificacionP); 
    //let data= getInputsValueByClass('paseEntradaNuevo')
    // let comentarios= getDataGrupoRepetitivo('com-input-form-nuevo','.com-div-nuevo' , 0)
    // let arrComentarios= document.getElementsByClassName('com-div-nuevo')
    let arrComentarios=[]
    let comentarios=data.grupo_instrucciones_pase
    for(let c of arrComentarios){
        if(c.id.includes("instruccionComentario-") && c.comentario_pase !== ""){
            comentarios.push({tipo_de_comentario:"Pase", comentario_pase: c.comentario_pase})
        }
    }
    // let areas= getDataGrupoRepetitivo('area-input-form-nuevo','.area-div-nuevo' , 2)
    let areas= data.grupo_areas_acceso
    let areasTr=""
    for (let s of areas){
        areasTr +=  
        `<tr>
            <td>`+s.note_booth+`</td>
            <td>`+s.commentario_area+`</td>
        </tr>`
    }
    let comTr=""
    for (let c in comentarios){
        comTr +=    
        `<tr>
            <td>`+comentarios[c].tipo_de_comentario+` </td>
            <td>`+comentarios[c].comentario_pase+`</td>
        </tr>`
    }
    let mainAccesos=""
    if(areasTr){
        mainAccesos=`<table class="table table-borderless" >
                        <thead>
                            <tr>
                                <th style=" text-align:left !important;"><h5><b> Areas de acceso</b></h5></th>
                                <th > </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>Area: </b></td>
                                <td><b>Comentario:</b></td>
                            </tr>
                            `+areasTr+`
                        </tbody>
                    </table>`
    }
    let mainComentarios=""
    if(comTr){
        mainComentarios=`<table  class="table table-borderless">
                            <thead>
                                <tr>
                                    <th style=" text-align:left !important;" class="m-0"><h5><b> Comentarios/Instrucciones </b></h5></th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><b> Tipo de comentario:</b></td>
                                    <td><b>Comentario</b></td>
                                </tr>
                                `+comTr+`
                            </tbody>
                        </table>`
    }

    let fechaVisitaMain = ""
    let fechaHastaMain = ""
    let selectedRadioDias = ""
    let selectedRadioDiasAcceso = ""
    let hayFechaVisita = data.fecha_desde_visita//$("#radioFechaFija").is(':checked') && data.fechaVisita !== ""
    let hayFechaHasta = data.fecha_desde_hasta//$("#radioRangoFechas").is(':checked')
    if(hayFechaVisita){
        // let formatMin = formatNumber(data.minNuevoPase)
        // let formatHor = formatNumber(data.horaNuevoPase)
        fechaVisitaMain= data.fecha_desde_visita //`${data.fechaVisita} ${formatHor}:${formatMin}:00`
    }
    if (hayFechaHasta){
        fechaHastaMain= data.fecha_desde_hasta
        // if(data.fechaVisitaOA !== ""){
        //     let formatHor= formatNumber(data.horaNuevoRangoVisita)
        //     let formatMin= formatNumber(data.minNuevoRangoVisita)
        //     fechaVisitaMain= `${data.fechaVisitaOA} 00:00:00`
        // }
        // if(data.fechaHastaOA!==""){
        //     let formatHor2= formatNumber(data.horaNuevoRangoHasta)
        //     let formatMin2= formatNumber(data.minNuevoRangoHasta)
        //     fechaHastaMain= `${data.fechaHastaOA} 00:00:00`
        // }
        selectedRadioDias = $('input[name="diasAcceso"]:checked');
        selectedRadioDiasAcceso=  data.config_dia_de_acceso//selectedRadioDias[0].id
        // let fechaActual= new Date()
        // let fecha1= fechaVisitaMain.replace(" ", "t")
        // let fecha2= fechaHastaMain.replace(" ", "t")
        // if(fecha1 < fechaActual || fecha2 < fechaActual){
        //     $("#fechaVisitaOA").val("")
        //     $("#fechaHastaOA").val("")
        // }
    }
    let diasArr=data.limitado_a_dias
    // let checkboxes = document.querySelectorAll('input[name="diasPase"]');
    // checkboxes.forEach(function(checkbox) {
    //     if (checkbox.checked) {
    //         diasArr.push(checkbox.value)
    //     }
    // });

    let arrayEquipos=[]
    let htmlAppendEquipos=""
    let listInputsEquipo= data.grupo_equipos
    for (let equipo of listInputsEquipo) {
        if(equipo.value!==""){
            htmlAppendEquipos +="<div class='col-sm-12 col-md-12 col-lg-6 col-xl-5'>"
            htmlAppendEquipos +="<table class='table table-borderless customShadow' style=' font-size: .8em; background-color: lightgray !important;'>"
            htmlAppendEquipos +="<tbody> <tr> <td><b>Tipo de Equipo:</b></td> <td> <span > "+ equipo.tipo_equipo +"</span></td> </tr>"
            htmlAppendEquipos +="<tr> <td><b>Nombre:</b></td> <td> <span > "+ equipo.nombre_articulo +"</span></td> </tr>"   
            htmlAppendEquipos +="<tr> <td><b>Marca:</b></td> <td> <span > "+ equipo.marca_articulo +"</span></td> </tr>"
            htmlAppendEquipos +="<tr> <td><b>Modelo:</b></td> <td> <span > "+ "" +"</span></td> </tr>"
            htmlAppendEquipos +="<tr> <td><b>No. Serie:</b></td> <td> <span > "+ equipo.numero_serie +"</span></td> </tr>"
            htmlAppendEquipos +="<tr> <td><b>Color:</b></td> <td> <span > "+ equipo.color_articulo +"</span></td> </tr>"
            htmlAppendEquipos +="</tbody> </table>  </div>";
            let objEquipo={
                'nombre':equipo.nombre_articulo,
                'modelo':"",
                'marca':equipo.marca_articulo,
                'color':equipo.color_articulo,
                'tipo':equipo.tipo_equipo,
                'serie':equipo.numero_serie ,
            }
            arrayEquipos.push(objEquipo)
        }   
    }
    let htmlAppendEquiposTitulo=""
    if(arrayEquipos.length>0){
        htmlAppendEquiposTitulo+=`
        <div class="d-flex flex-column justify-content-start ms-2 mt-3" style="color:#171717">
            <h5><b>Equipos:</b></h5>
            <div class="d-flex flex-row flex-wrap gap-4"> 
                `+htmlAppendEquipos+`
            </div>
        </div>`
    }
    let arrayVehiculos=[]
    let listInputsVehicule= data.grupo_vehiculos
    let htmlAppendVehiculos=""
    for (let vehiculo of listInputsVehicule) {
        if(vehiculo.value !==""){
            htmlAppendVehiculos +="<div class='col-sm-12 col-md-12 col-lg-6 col-xl-5'>"
            htmlAppendVehiculos +="<table class='table table-borderless customShadow' style='border: none; font-size: .8em; background-color: lightgray!important;'>"
            htmlAppendVehiculos +="<tbody> <tr> <td><b>Tipo de Vehiculo:</b></td> <td><span>"+ vehiculo.tipo_vehiculo +"</span></td> </tr>"
            htmlAppendVehiculos +="<tr> <td><b>Marca:</b></td> <td><span > "+ vehiculo.marca_vehiculo +"</span></td> </tr>"
            htmlAppendVehiculos +="<tr> <td><b>Modelo:</b></td> <td><span > "+ vehiculo.modelo_vehiculo +"</span></td> </tr>"
            htmlAppendVehiculos +="<tr> <td><b>Matricula:</b></td> <td><span > "+ vehiculo.placas_vehiculo +"</span></td> </tr>"
            htmlAppendVehiculos +="<tr> <td><b>Estado:</b></td> <td><span > "+ vehiculo.state +"</span></td> </tr>"
            htmlAppendVehiculos +="<tr> <td> <b> Color: </b></td> <td><span > "+ vehiculo.color_vehiculo +"</span></td> </tr> </tbody> </table> </div>";
            let objVehiculo={ 
                'tipo':vehiculo.tipo_vehiculo,
                'marca':vehiculo.marca_vehiculo,
                'modelo':vehiculo.modelo_vehiculo,
                'estado':vehiculo.state,
                'placas':vehiculo.placas_vehiculo,
                'color':vehiculo.color_vehiculo
            }
            arrayVehiculos.push(objVehiculo)
        }
    }
    let htmlAppendVehiculosTitulo=""
    if(arrayVehiculos.length>0){
        htmlAppendVehiculosTitulo+=`
        <div class="d-flex flex-column justify-content-start ms-2 mt-3" style="color:#171717">
            <h5><b>Vehiculos:</b></h5>
            <div class="d-flex flex-row flex-wrap gap-4"> 
                `+htmlAppendVehiculos+`
            </div>
        </div>`
    }


    let checkPregistro=[]
    let correoSms = document.querySelectorAll('input[name="enviarCorreoSms"]');
    correoSms.forEach(function(checkbox) {
        if (checkbox.checked) {
            checkPregistro.push(checkbox.value)
        }
    });

    let checkDocSeleccionados= []
    $('input[name="AgregarFotoIdent"]:checked').each(function() {
        checkDocSeleccionados.push($(this).val()); 
    });
    let buttonDays=""
    if(diasArr.length>0){
        buttonDays=`
        <div class="d-flex justify-content-start mt-2 ms-2">
                        <h5><b>Dias de acceso:</b></h5>
                    </div>
        <div class="d-flex justify-content-start ms-2">
            <button type="button" class="btn btn-outline-success btn-custom week me-3" id="lunes">L</button>
            <button type="button" class="btn btn-outline-success btn-custom week me-3" id="martes">M</button>
            <button type="button" class="btn btn-outline-success btn-custom week me-3" id="miércoles">M</button>
            <button type="button" class="btn btn-outline-success btn-custom week me-3" id="jueves">J</button>
            <button type="button" class="btn btn-outline-success btn-custom week me-3" id="viernes">V</button>
            <button type="button" class="btn btn-outline-success btn-custom week me-3" id="sábado">S</button>
            <button type="button" class="btn btn-outline-success btn-custom week me-3" id="domingo">D</button>
        </div>`
    }
    let fechaVisitaDiv=""
    if(fechaVisitaMain){
        fechaVisitaDiv=`<div class="d-flex flex-wrap ms-2">
                            <div>
                                <i class="fa-regular fa-calendar"></i>
                            </div>
                            <div class="ms-3">
                                Fecha y hora de visita: `+data.fecha_desde_visita+`
                            </div>
                        </div>`
    }
    let fechaHastaDiv=""
    if(fechaHastaMain){
        fechaHastaDiv=` <div class="d-flex mt-3 ms-2">
                            <div>
                                <i class="fa-regular fa-calendar"></i>
                            </div>
                            <div class="ms-3">
                                Fecha y hora de hasta: `+data.fecha_desde_hasta+`
                            </div>
                        </div>`
    }
    let tituloVigencia=""
    if(fechaHastaMain || fechaVisitaMain){
        tituloVigencia=`<div class="d-flex justify-content-start mt-3 ms-2">
                            <h5><b>Vigencia y acceso:</b></h5>
                        </div>`
    }
    let tituloDias=""
    if(true){
        tituloDias=``
    }
    let limiteEntradasTexto=""
    if(data.limite_de_acceso!==""){
        limiteEntradasTexto=`
            <div class="d-flex justify-content-start mt-3 ms-2">
                <p><span class="me-2"><b>Limite de entradas:</b></span>`+ data.limite_de_acceso+`</p>
            </div>
        `
    }
    let numValid = true //iti.isValidNumber()
    let numeroConLada = ""
    if(numValid){
        numeroConLada = data.telefono_pase//iti.getNumber();
    }
    let html = []//getListVehiculosEquipos(location, caseta, name, company, visit, motivo)
    let foto= data.walkin_fotografia.length>0?data.walkin_fotografia[0].file_url:""
    let identificacion= data.walkin_identificacion.length>0?data.walkin_identificacion[0].file_url:""
   
    let htmlPase= mainAccesos+``+mainComentarios+``+tituloVigencia+``+fechaVisitaDiv+``+fechaHastaDiv+``+tituloDias+``+limiteEntradasTexto+``+buttonDays
    +``+htmlAppendEquiposTitulo+``+htmlAppendVehiculosTitulo

    
                
    //       // ,
    //       //   confirmButtonColor: "#28a745",
    //       //   showCancelButton: false,
    //       //   showConfirmButton: false,
    //       //   cancelButtonColor: "#dc3545",
    //       //   confirmButtonText:'Cerrar',
    //       //   cancelButtonText:'Cerrar',
    //       //   heightAuto:false,
    //       //   reverseButtons: true,
    //       //   width:750,
    //         // preConfirm: () => 
    //         // {
    //         //     // Obtener los estados de los checkboxes
    //         //     const enviarMensajeChecked = document.getElementById('cerrar').checked;
    //         //     const enviarCorreoChecked = document.getElementById('enviarCorreo').checked;
    //         //     const descargarPdfChecked = true //document.getElementById('descargarPdfCheck').checked;
    //         //     return {
    //         //         enviarMsj: enviarMensajeChecked,
    //         //         enviarCorreo: enviarCorreoChecked,
    //         //         descargarPdf:descargarPdfChecked
    //         //     };
    //         // }
    
    // .then((result) => {
    //     if (result.value) {
    //        Swal.close()
    //     }
    // });
    let miDiv = document.getElementById('addHTML');
    miDiv.innerHTML = htmlPase

    if(diasArr.length>0){
        for(let d of diasArr){
            $("#"+d+"").removeClass('btn-outline-success');
            $("#"+d+"").addClass('bg-dark');
            $("#"+d+"").addClass('color-white');
        }
    }
    $("#verPaseModal").modal('show')
}

function cerrarModalPase(id){
    $("#"+id).modal("hide")
}

async function enviarCorreoPaseE(qr="") {
    if(qr){
        selectedGlobalPase=qr
    }
    let data = dataTableListTodos.filter(x => x._id == selectedGlobalPase).pop();
    if(data.status_pase.toLowerCase()=='activo'){
        if(data.email_pase!==""){
            loadingService('Enviando correo...')
            let bodyPost={
                script_name: "pase_de_acceso.py",
                folio:data._id,
                account_id:parseInt(getCookie('userId_soter'))||""
            }
            console.log('VISIT A', data)
            data_for_msj = {
                email_to: data.email_pase,
                asunto: data.tema_cita,
                email_from: data.visita_a.length>0 ? data.visita_a[0].email[0] :'',
                nombre: data.nombre_pase,
                nombre_organizador: data.visita_a.length>0 ? data.visita_a[0].nombre :'',
                ubicacion: data.ubicacion,
                fecha: {desde: data.fecha_desde_visita, hasta: data.fecha_desde_hasta},
                descripcion: data.descripcion,
            }
            bodyPost.data_msj= data_for_msj
            bodyPost.option= "enviar_correo"
            await enviarCorreoPase(bodyPost)
            $("#modalEmail").modal('hide')
            $("#verPaseModal").modal('hide')
        }else{
            $("#modalEmail").modal('show')
        }
    }else{
        successMsg("Validación", 'El pase de entrada debe haber sido completado por el visitante con anterioridad para poder enviar el correo ', 'warning')
    }
}

async function enviarSmsPaseE(qr="") {
    if(qr){
        selectedGlobalPase=qr
    }
    let data = dataTableListTodos.filter(x => x._id == selectedGlobalPase).pop();
    if(data.status_pase.toLowerCase()=='activo'){
        if(data.telefono_pase!==""){
            loadingService('Obteniendo pase...')
            let pdf = await get_pdf(selectedGlobalPase)
            let bodyPost={
                    script_name: "pase_de_acceso.py",
                    folio:data._id,
                    account_id:parseInt(getCookie('userId_soter'))||""
                }
            let msj=""
            if(data.fecha_desde_visita !==""){
                msj=`el día ${data.fecha_desde_visita}`
            }else if (data.fecha_desde_hasta !=="" && data.fecha_desde_visita !==""){
                msj= `apartir del `+data.fecha_desde_visita+` hasta el `+data.fecha_desde_hasta+`.`
            }
            data_for_msj_tel={
                mensaje: `Estimado ${data.nombre_pase} 😁, ${data.visita_a.length>0 ? data.visita_a[0].nombre :''}, te esta invitando a: ${data.ubicacion}, `+msj+` Descarga tu pase 💳 en: ${pdf.download_url}`,
                numero: data.telefono_pase
            }
            bodyPost.data_cel_msj= data_for_msj_tel
            bodyPost.option= "enviar_msj"
            await enviarSmsPase(bodyPost)
        }else{
            $("#modalSMS").modal('show')
        }
    }else{
        successMsg("Validación", 'El pase de entrada debe haber sido completado por el visitante con anterioridad para poder enviar el SMS ', 'warning')
    }
    
}

async function saveTelSendSms() {
    let tel=$("#telefono2").val()
    let telefonoInput = document.getElementById('telefono2');
    if (telefonoInput.classList.contains('is-invalid')|| tel == "" ) {
        successMsg("Validación", 'Escribe un teléfono válido', 'warning')
    } else {
        let data = dataTableListTodos.filter(x => x._id == selectedGlobalPase).pop();
        if(data.telefono_pase!==""){
            enviarSmsPaseE()
        }else{
            let numValid = iti2.isValidNumber()
            let numeroConLada = ""
            if(numValid){
                numeroConLada = iti2.getNumber();
            }
            let access_pass={
                'telefono_pase':numeroConLada
            }
            let res=""
            try{
                loadingService('Válidando telefono...')
                res = await update_pass(access_pass, data._id)
            }catch{
                Swal.close()
            }
            data.telefono_pase = access_pass.telefono_pase
            if(res.response.data.status_code==202){
                await enviarSmsPaseE(data._id)
                $("#modalSMS").modal('hide')
                $("#verPaseModal").modal('hide')
            }
        }
    }
}

async function saveEmailSendEmail() {
    let correo=$("#email2").val()
    let correoInput = document.getElementById('email2');
    if (correoInput.classList.contains('is-invalid')|| correo == "" ) {
        successMsg("Validación", 'Escribe un correo válido', 'warning')
    } else {
        let data = dataTableListTodos.filter(x => x._id == selectedGlobalPase).pop();
        if(data.email_pase!==""){
            enviarCorreoPaseE()
        }else{
            let access_pass={
                'email_pase':correo
            }
            let res=""
            try{
                loadingService('Válidando correo...')
                res = await update_pass(access_pass, data._id)
            }catch{
                Swal.close()
            }
            data.email_pase = access_pass.email_pase
            if(res.response.data.status_code==202){
                await enviarCorreoPaseE(data._id)
                $("#modalEmail").modal('hide')
                $("#verPaseModal").modal('hide')
            }
        }
    }
}


async function update_pass(access_pass, qr_code){
    let data=""
    await fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name:'pase_de_acceso.py',
            option:'update_pass',
            access_pass:access_pass,
            folio:qr_code
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
            Swal.close()
            data=res
        }else{
            Swal.close()
            errorAlert(res)
        }
    })
    return data
}

async function descargarPdfPaseE() {
    loadingService('Descargando pdf...')
    let pdf = await get_pdf(selectedGlobalPase)
    await descargarPdfPase(pdf.download_url)
    $("#verPaseModal").modal('hide')
}

async function modalEditarPase(id){
    limpiarInputsPorClase('paseEntradaEdit')
    // $("#com-input-form-nuevo div").not("#id-com-div-123").remove();
    // $("#miContenedor div").not("#123").remove();
    let divs = document.querySelectorAll('div[id*="id-com-div-"]');
    if(divs.length>0){
        divs.forEach(function(div) {
            if (div.id !== 'id-com-div-123') {
                div.remove();
            }
        });
    }
    let divs2 = document.querySelectorAll('div[id*="id-area-div-"]');
    if(divs2.length>0){
        divs2.forEach(function(div) {
            if (div.id !== 'id-area-div-123') {
                div.remove();
            }
        });
    }

    let selectedPase = dataTableListTodos.filter(x => x._id == id).pop();
    console.log("PASE SELECCIONADO")
    let selectedGlobalPase = selectedPase
    onChangeOpcionesAvanzadas('checkOpcionesAvanzadas')
    iniciarSelectHora('horaNuevoPase','minNuevoPase', 'ampmNuevoPase')
    
    try {
        const resultado = await catalogoAreaByLocation(getCookie('userLocation'))
       $("#paseEntradaEditar").modal('show')
      } catch (error) {
        console.error('Error al cargar el catálogo o abrir el modal:', error);
      }
    $(document).ready(function() {
        $('#nombreCompleto').val(selectedPase.nombre_pase)
        $('#statusPase').text(capitalizeFirstLetter(selectedPase.status_pase))
        $('#email').val(selectedPase.email_pase)
        $('#telefono').val(selectedPase.telefono_pase)
        $('#ubicacion').val(selectedPase.ubicacion)
        $('#temaCita').val(selectedPase.tema_cita)
        $('#descripcion').val(selectedPase.descripcion)
        $('#ubicacion').prop('value', selectedPase.ubicacion);
    })
    console.log("LARGO",selectedPase.grupo_areas_acceso.length,selectedPase.grupo_instrucciones_pase.length )
    for (let i=0; i< selectedPase.grupo_areas_acceso.length-1; i++){
        setAddArea('nuevo', 'area');
    }
    for (let i=0; i < selectedPase.grupo_instrucciones_pase.length-1; i++){
        setAddCom('nuevo', 'com');
    }
    const inputsTipoArea = $("select[id^='tipoArea-']");
    if (inputsTipoArea.length > 0) {
        inputsTipoArea.each(function(index) {
            const inputId = $(this).attr('id');
            const key = Object.keys(selectedPase.grupo_areas_acceso)[index];
            if (key) {
                $(`#${inputId}`).val(selectedPase.grupo_areas_acceso[key].note_booth)
            }
        });
    }

    const inputsComments = $("textarea[id^='comentario-']");
    if (inputsComments.length > 0) {
        inputsComments.each(function(index) {
            const inputId = $(this).attr('id');
            const key = Object.keys(selectedPase.grupo_areas_acceso)[index];
            if (key) {
                $(`#${inputId}`).val(selectedPase.grupo_areas_acceso[key].commentario_area)
            }
        });
    }

    const inputsInstruc = $("textarea[id^='instruccionComentario-']");
    if (inputsInstruc.length > 0) {
        inputsInstruc.each(function(index) {
            const inputId = $(this).attr('id');
            const key = Object.keys(selectedPase.grupo_instrucciones_pase)[index];
            if (key) {
                $(`#${inputId}`).val(selectedPase.grupo_instrucciones_pase[key].comentario_pase)
            }
        });
    } 

    for(let i of selectedPase.enviar_correo_pre_registro){
        if(i =='enviar_correo_pre_registro'){
            $("#enviar_correo_pre_registro").prop('checked', true);
        }
        if(i == "enviar_sms_pre_registro"){
            $("#enviar_sms_pre_registro").prop('checked', true);
        }
    }
    if(selectedPase.tipo_fechas_pase=="rango_de_fechas"){
        $("#checkOpcionesAvanzadas").prop('checked', true);
        $("#radioRangoFechas").prop('checked', true);
        onChangeOpcionesAvanzadas('checkOpcionesAvanzadas')
        let date= selectedPase.fecha_desde_visita.split(" ")
        $("#fechaVisitaOA").val(date[0])
        let date1= selectedPase.fecha_desde_hasta.split(" ")
        $("#fechaHastaOA").val(date1[0])
    }else{
        $("#radioFechaFija").prop('checked', true);
        let date =selectedPase.fecha_desde_visita.split(" ")
        $("#fechaVisita").val(date[0])
        let date1 =date[1].split(":")
        $("#horaNuevoPase").val(date1[0])
        $("#minNuevoPase").val(date1[1])
    }
    if (selectedPase.limite_de_acceso){
         $("#limiteEntradas").val(selectedPase.limite_de_acceso)
    }
    if(selectedPase.config_dia_de_acceso=="limitar_días_de_acceso"){
        $("#radioLimitarDias").prop('checked', true);
        $("#diasAccesoDivDias").show()
        if(selectedPase.limitado_a_dias.length>0){
            for(let i of selectedPase.limitado_a_dias){
                $("#"+i).prop('checked', true);
            }
        }
    }else if (selectedPase.config_dia_de_acceso=="cualquier_día"){
        $("#radioCualquierDia").prop('checked', true);
        $("#diasAccesoDivDias").hide()
    }
}

function limpiarGruposRepetitivos(){
    let divPersona = document.getElementById("persona-input-form-"+editAdd);
    const elementsPersona = divPersona.querySelectorAll('.persona-div-'+editAdd);
    elementsPersona.forEach(function(input) {
        if(input.id !== "repPersona"+capitalizeFirstLetter(editAdd)+"Incidencia" && input.id !== "repTipoDano"+capitalizeFirstLetter(editAdd)+"Incidencia"){
            input.parentElement.parentElement.remove();
        }
    });
    let divAccion = document.getElementById("dano-input-form-"+editAdd);
    const elementsAccion = divAccion.querySelectorAll('.dano-div-'+editAdd);
    elementsAccion.forEach(function(input) {
        if(input.id !== "repResponsable"+capitalizeFirstLetter(editAdd)+"Incidencia" && input.id !== "repAccion"+capitalizeFirstLetter(editAdd)+"Incidencia" ){
            input.parentElement.parentElement.remove();
        }
    });
}

async function modalReenviarPase(folio){
    let selectedPase = dataTableListTodos.find(x => x._id == folio);
    let fechasSonValidas= validarFechasConHora(selectedPase.fecha_desde_visita, selectedPase.fecha_desde_hasta)
    if(selectedPase.status_pase.toLowerCase() !== "vencido"){
        let pdf = await get_pdf(selectedPase._id);
        let bodyInf={}
        bodyInf={script_name:"pase_de_acceso.py", option:"update_pass", folio:folio}
        let access_pass={'favoritos': ['Agregar a favoritos'], }
        Swal.fire({
            title:'¿Estas seguro de querer reenviar el pase?',
            html:`Al reenviar el pase el visitante recibira un correo con los datos correspondientes de la visita.
             <div class="d-flex flex-column justify-content-center align-items-center">
                <div class="d-flex  flex-column align-items-start justify-content-start mt-2">
                    <div class="m-0 p-0">
                        <label>
                            <input type="checkbox" name="opcionesCorreoMsj" id="enviarMensaje" value="enviarMensaje">
                            <i class="fa-solid fa-comment-sms ms-2"></i> <b>Enviar mensaje</b>
                        </label><br>
                    </div>
                    <div class="m-0 p-0 mt-1">
                        <label>
                            <input type="checkbox" name="opcionesCorreoMsj" id="enviarCorreo" value="enviarCorreo">
                            <i class="fa-solid fa-envelope ms-2"></i> <b>Enviar correo</b>
                        </label><br>
                    </div>
                </div>
            </div>
            `,
            type: "warning",
            showCancelButton: true,
            cancelButtonColor: colors[0],
            cancelButtonText: "Cancelar",
            confirmButtonColor: colors[1],
            confirmButtonText: "Si",
            heightAuto:false,
            reverseButtons: true,
            preConfirm: () => {
                const enviarMensajeChecked = document.getElementById('enviarMensaje').checked;
                const enviarCorreoChecked = document.getElementById('enviarCorreo').checked;
                const descargarPdfChecked = true //document.getElementById('descargarPdfCheck').checked;
                return {
                    enviarMsj: enviarMensajeChecked,
                    enviarCorreo: enviarCorreoChecked,
                    descargarPdf:descargarPdfChecked
                };
            }
        })
        .then((result) => {
            if (result.value ) {
                if(result.value.enviarCorreo || result.value.enviarMsj){
                    loadingService()
                    let data_for_msj = {}
                    let data_for_msj_tel={}
                    
                    if(result.value.enviarMsj){
                        let bodyPost={
                            script_name: "pase_de_acceso.py",
                            account_id:account_id
                        }
                        let msj=""
                        if(selectedPase.fecha_desde_visita !==""){
                            msj=`el día ${selectedPase.fecha_desde_visita}`
                        }else if (selectedPase.fecha_desde_hasta !=="" && selectedPase.fecha_desde_visita !==""){
                            msj= `apartir del `+selectedPase.fecha_desde_visita+` hasta el `+selectedPase.fecha_desde_hasta+`.`
                        }
                        data_for_msj_tel={
                            mensaje: `Estimado ${selectedPase.nombre} 😁, ${selectedPase.visita_a[0].nombre}, te esta invitando a: ${selectedPase.ubicacion}, `+msj+
                            ` Descarga tu pase 💳 en: ${pdf.download_url}`,
                            numero: selectedPase.telefono_pase
                        }
                        bodyPost.data_cel_msj= data_for_msj_tel
                        bodyPost.option= "enviar_msj"
                        enviarSmsPase(bodyPost)
                    }
                    if(result.value.enviarCorreo){
                        
                        let bodyPost={
                            script_name: "pase_de_acceso.py",
                            folio:selectedPase._id,
                            account_id:account_id
                        }
                        data_for_msj = {
                            email_to: selectedPase.email_pase,
                            asunto: selectedPase.tema_cita,
                            email_from: getCookie("userEmail"),
                            nombre: selectedPase.nombre,
                            nombre_organizador: selectedPase.visita_a[0].nombre,
                            ubicacion: selectedPase.ubicacion,
                            fecha: {desde: selectedPase.fecha_desde_visita, hasta: selectedPase.fecha_desde_hasta},
                            descripcion: selectedPase.descripcion,
                        }
                        bodyPost.data_msj= data_for_msj
                        bodyPost.option= "enviar_correo"
                        enviarCorreoPase(bodyPost)
                    }
                    if(result.value.descargarPdf){
                        descargarPdfPase(pdf.download_url)
                    }
                }else{
                    successMsg('Validación', 'Selecciona una opción para continuar.', 'warning')
                }   
            }
        });
    }else{
        successMsg("Validación", "El pase ha vencido, modifica las fechas para continuar.", 'warning')
    }
    
}

function actualizarFavorito(bodyInf,access_pass, folio,resultSwal , textModal, idStar){
     if (resultSwal){
        loadingService()
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name: bodyInf.script_name,
                option: bodyInf.option,
                access_pass: access_pass,
                folio:folio,
                account_id: parseInt(getCookie('userId_soter'))
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
                    errorAlert(data)
                }else if(data.status_code==202 ||data.status_code==201 ){
                    actualizarEstrella(access_pass, idStar)
                    Swal.close();
                    successMsg('Confirmación',textModal , 'success')
                    dataTableListTodos.forEach(element => {
                        if (element._id == folio) {
                            element.favoritos = access_pass.favoritos;
                        }
                    });

                }
            }else{
                errorAlert(res)
            }
        });
    }
}

function actualizarEstrella(access_pass, idStar) {
    let starr= $('#' + idStar);
    if (access_pass.favoritos !== "") {
        starr.removeClass('fa-regular').addClass('fa-solid');
    } else {
        starr.removeClass('fa-solid').addClass('fa-regular');
    }
}

async function get_pdf(qr_code){
    let pdf=""
    // loadingService()
    await fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name:'pase_de_acceso.py',
                option:'get_pdf',
                qr_code:qr_code
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
                Swal.close()
                pdf=res.response.data.data
            }else{
                Swal.close()
                errorAlert(res)
            }
        })
    return pdf
}

function validarTel(input){
    removeNonNumeric(input)
    let numValid = iti.isValidNumber()
    let numeroConLada = ""
    if(numValid){
        numeroConLada = iti.getNumber();
    }
    $('#telefono').removeClass('is-invalid');
    if(!numValid){
        $('#telefono').addClass('is-invalid');
        let inputTel = document.getElementById("telefono")
        inputTel.value = ""
    }
}


function crearConfirmacionEditar() {
    let paseSelected = dataTableListTodos.filter(x => x._id == selectedGlobalPase).pop();
    const paseSelectedCopy = JSON.parse(JSON.stringify(paseSelected));
    let enviarPreSmsChecked = document.getElementById('enviar_sms_pre_registro').checked;

    let data = getInputsValueByClass('paseEntradaEdit')
    // let comentarios= getDataGrupoRepetitivo('com-input-form-nuevo','.com-div-nuevo' , 0)
    let arrComentarios= document.getElementsByClassName('com-div-nuevo')
    let comentarios=[]
    for(let c of arrComentarios){
        if(c.id.includes("instruccionComentario-") && c.value !== ""){
            comentarios.push({tipo_comentario:"Pase", comentario_pase: c.value})
        }
    }
    let areas= getDataGrupoRepetitivo('area-input-form-nuevo','.area-div-nuevo' , 2)
    let areasTr=""
    for (let s of areas){
        areasTr +=  
        `<tr>
            <td>`+s.nombre_area+`</td>
            <td>`+s.commentario_area+`</td>
        </tr>`
    }
    let comTr=""
    for (let c in comentarios){
        comTr +=    
        `<tr>
            <td>`+comentarios[c].tipo_comentario+` </td>
            <td>`+comentarios[c].comentario_pase+`</td>
        </tr>`
    }
    let mainAccesos=""
    if(areasTr){
        mainAccesos=`<table class="table table-borderless" >
                        <thead>
                            <tr>
                                <th style=" text-align:left !important;"><h5><b> Areas de acceso</b></h5></th>
                                <th > </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>Area: </b></td>
                                <td><b>Comentario:</b></td>
                            </tr>
                            `+areasTr+`
                        </tbody>
                    </table>`
    }
    let mainComentarios=""
    if(comTr){
        mainComentarios=`<table  class="table table-borderless">
                            <thead>
                                <tr>
                                    <th style=" text-align:left !important;" class="m-0"><h5><b> Comentarios/Instrucciones </b></h5></th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><b> Tipo de comentario:</b></td>
                                    <td><b>Comentario</b></td>
                                </tr>
                                `+comTr+`
                            </tbody>
                        </table>`
    }

    let fechaVisitaMain = ""
    let fechaHastaMain = ""
    let selectedRadioDias = ""
    let selectedRadioDiasAcceso = ""
    let hayFechaVisita = $("#radioFechaFija").is(':checked') && data.fechaVisita !== ""
    let hayFechaHasta = $("#radioRangoFechas").is(':checked')
    if(hayFechaVisita){
        let formatMin = formatNumber(data.minNuevoPase)
        let formatHor = formatNumber(data.horaNuevoPase)
        fechaVisitaMain= `${data.fechaVisita} ${formatHor}:${formatMin}:00`
    }else if (hayFechaHasta){
        if(data.fechaVisitaOA !== ""){
            let formatHor= formatNumber(data.horaNuevoRangoVisita)
            let formatMin= formatNumber(data.minNuevoRangoVisita)
            fechaVisitaMain= `${data.fechaVisitaOA} 00:00:00`
        }
        if(data.fechaHastaOA!==""){
            let formatHor2= formatNumber(data.horaNuevoRangoHasta)
            let formatMin2= formatNumber(data.minNuevoRangoHasta)
            fechaHastaMain= `${data.fechaHastaOA} 00:00:00`
        }
        selectedRadioDias = $('input[name="diasAcceso"]:checked');
        selectedRadioDiasAcceso=selectedRadioDias[0].id
        let fechaActual= new Date()
        let fecha1= fechaVisitaMain.replace(" ", "t")
        let fecha2= fechaHastaMain.replace(" ", "t")
        if(fecha1 < fechaActual || fecha2 < fechaActual){
            $("#fechaVisitaOA").val("")
            $("#fechaHastaOA").val("")
        }
    }
    let diasArr=[]
    let checkboxes = document.querySelectorAll('input[name="diasPase"]');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            console.log("checkbox",checkbox)
            diasArr.push(checkbox.id)
        }
    });

    let checkPregistro=[]
    let correoSms = document.querySelectorAll('input[name="enviarCorreoSms"]');
    correoSms.forEach(function(checkbox) {
        if (checkbox.checked) {
            checkPregistro.push(checkbox.id)
        }
    });

    let checkDocSeleccionados= []
    // $('input[name="AgregarFotoIdent"]:checked').each(function() {
    //     checkDocSeleccionados.push($(this).val()); 
    // });
    let docsCheck = document.querySelectorAll('input[name="AgregarFotoIdent"]');
    docsCheck.forEach(function(checkbox) {
        if (checkbox.checked) {
            checkDocSeleccionados.push(checkbox.id)
        }
    });
    let buttonDays=""
    if(diasArr.length>0){
        buttonDays=`
        <div class="d-flex justify-content-start mt-4 ms-2">
                        <h5><b>Dias de acceso:</b></h5>
                    </div>
        <div class="d-flex justify-content-start ms-2">
            <button type="button" class="btn btn-outline-success btn-custom week me-3" id="lunesv">L</button>
            <button type="button" class="btn btn-outline-success btn-custom week me-3" id="martesv">M</button>
            <button type="button" class="btn btn-outline-success btn-custom week me-3" id="miércolesv">M</button>
            <button type="button" class="btn btn-outline-success btn-custom week me-3" id="juevesv">J</button>
            <button type="button" class="btn btn-outline-success btn-custom week me-3" id="viernesv">V</button>
            <button type="button" class="btn btn-outline-success btn-custom week me-3" id="sábadov">S</button>
            <button type="button" class="btn btn-outline-success btn-custom week me-3" id="domingov">D</button>
        </div>`
    }
    let fechaVisitaDiv=""
    if(fechaVisitaMain){
        fechaVisitaDiv=`<div class="d-flex flex-wrap ms-2">
                            <div>
                                <i class="fa-regular fa-calendar"></i>
                            </div>
                            <div class="ms-3">
                                Fecha y hora de visita: `+fechaVisitaMain+`
                            </div>
                        </div>`
    }
    let fechaHastaDiv=""
    if(fechaHastaMain){
        fechaHastaDiv=` <div class="d-flex mt-3 ms-2">
                            <div>
                                <i class="fa-regular fa-calendar"></i>
                            </div>
                            <div class="ms-3">
                                Fecha y hora de hasta: `+fechaHastaMain+`
                            </div>
                        </div>`
    }
    let tituloVigencia=""
    if(fechaHastaMain || fechaVisitaMain){
        tituloVigencia=`<div class="d-flex justify-content-start mt-3 ms-2">
                            <h5><b>Vigencia y acceso:</b></h5>
                        </div>`
    }
    let tituloDias=""
    if(true){
        tituloDias=``
    }

    let limiteEntradasTexto=""
    if(data.limiteEntradas!==""){
        limiteEntradasTexto=`
            <div class="d-flex justify-content-start mt-3 ms-2">
                <p><span class="me-2"><b>Limite de entradas:</b></span>`+ data.limiteEntradas+`</p>
            </div>
        `
    }
    let numValid = iti.isValidNumber()
    let numeroConLada = ""
    if(numValid){
        numeroConLada = iti.getNumber();
    }
    let selectedOpcionFechas = $('input[name="opcionesAvanzadas"]:checked');
    let html = []//getListVehiculosEquipos(location, caseta, name, company, visit, motivo)
    let tieneEmailTel = data.email !== "" || data.telefono !== ""
    if(data.nombreCompleto!=="" && tieneEmailTel==true){
            if(enviarPreSmsChecked){
                enviarPreSmsChecked = {
                    "from": "enviar_pre_sms",
                    "mensaje": "",
                    "numero": numeroConLada
                }
            }
            Swal.fire({
                title:'Confirmación',
                html:`
                    <div>
                        <table class="table table-borderless" >
                            <thead>
                                <tr>
                                    <th  style=" text-align:left !important;" > <h5> <b>Sobre la visita</b></h5> </th>
                                    <th > </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><b>Tipo de pase:</b></td>
                                    <td><b>Estatus:</b></td>
                                </tr>
                                <tr>
                                    <td>Visita General</td>
                                    <td><span > Proceso </span></td>
                                </tr>
                                <tr>
                                    <td><b>Nombre completo:</b></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>`+data.nombreCompleto+`</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><b>Email:</b></td>
                                    <td><span ><b>Teléfono:</b></span></td>
                                </tr>
                                <tr>
                                    <td> `+data.email+`</td>
                                    <td><span > `+numeroConLada+`</span></td>
                                </tr>
                                <tr>
                                    <td><b>Ubicación:</b></td>
                                    <td><span ><b>Tema de la cita:</b></span></td>
                                </tr>
                                <tr>
                                    <td> `+data.ubicacion+`</td>
                                    <td><span > `+data.temaCita+`</span></td>
                                </tr>
                                 <tr>
                                    <td><b>Descripción:</b></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>`+data.descripcion+`</td>
                                    <td> </td>
                                </tr>
                            </tbody>
                        </table>
                        <hr>
                        `+mainAccesos+`
                        `+mainComentarios+`
                        `+tituloVigencia+`
                        `+fechaVisitaDiv+`
                        `+fechaHastaDiv+`
                        `+tituloDias+`
                        `+limiteEntradasTexto+`
                        `+buttonDays+`
                    </div>
            
              `,
                confirmButtonColor: "#28a745",
                showCancelButton: true,
                cancelButtonColor: "#dc3545",
                confirmButtonText:'Actualizar pase',
                cancelButtonText:'Cancelar',
                heightAuto:false,
                reverseButtons: true,
                width:750,
            })
            .then((result) => {
                if (result.value) {
                    loadingService("Actualizando pase de entrada...")
                    let protocol = window.location.protocol;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                    let host = window.location.host;
                    // delete paseSelected.actions;
                    // delete paseSelected.motivo_visita;
                    // delete paseSelected.folio;
                    // delete paseSelected._id;
                    // delete paseSelected.;
                    // delete obj.b;
                    let access_pass={}
                    // access_pass=paseSelected
                    // let access_pass={
                    //     nombre_pase: data.nombreCompleto,
                    //     email_pase:data.email,
                    //     /*areas: areas,
                    //     comentarios:comentarios,*/
                    //     config_limitar_acceso: parseInt(data.limiteEntradas),
                    //     ubicacion:data.ubicacion,
                    //     tema_cita: data.temaCita,
                    //     descripcion: data.descripcion,
                    //     perfil_pase:"Visita General",
                    //     status_pase:'Proceso',
                    //     visita_a: getCookie("userName_soter"),
                    //     // custom:true,
                    //     link:{
                    //         "link":`${protocol}//${host}/solucion_accesos/pase.html`,
                    //         "docs": checkDocSeleccionados,
                    //         "creado_por_id": getCookie("userId_soter"),
                    //         "creado_por_email":getCookie("userEmail")
                    //     },
                    // }
                    console.log("PASE QR", access_pass)
                    // if(!access_pass.qr_pase){
                    //     access_pass.qr_pase = [
                    //         {
                    //             "file": paseSelected.qr_pase.file,
                    //             "file_name": paseSelected.qr_pase.file_name,
                    //             "file_url": paseSelected.qr_pase.file_url
                    //         }
                    //     ] 
                    // }
                    access_pass.qr_pase = paseSelected.qr_pase // se mandara vacia para que el flujo lo vuelva a generar
                    access_pass.tipo_visita= "alta_de_nuevo_visitante" || ""
                    access_pass.nombre_pase = data.nombreCompleto || ""
                    access_pass.email_pase = data.email || ""
                    access_pass.telefono_pase = numeroConLada || ""
                    console.log("DIAS DE selectedOpcionFechas",selectedOpcionFechas[0].id)
                    if(selectedOpcionFechas[0].id== 'radioRangoFechas'){
                        access_pass.tipo_visita_pase= 'rango_de_fechas'
                    }else if(selectedOpcionFechas[0].id=='radioFechaFija'){
                        access_pass.tipo_visita_pase= 'fecha_fija'
                    }
                    
                    if(fechaVisitaMain){
                        access_pass.fecha_desde_visita=fechaVisitaMain.slice(0, -3) +':00';
                    }else{
                        access_pass.fecha_desde_visita=""
                    }
                    if(fechaHastaMain){
                        access_pass.fecha_desde_hasta=fechaHastaMain.slice(0, -3) +':00';
                    }else{
                        access_pass.fecha_desde_hasta=""
                    }
                    console.log("DIAS DE ACCESO",selectedRadioDiasAcceso, selectedRadioDiasAcceso == 'radioLimitarDias', selectedRadioDiasAcceso == 'radioCualquierDia')
                    if(selectedRadioDiasAcceso == 'radioLimitarDias'){
                        access_pass.config_dia_de_acceso= "limitar_días_de_acceso" 
                    }else if (selectedRadioDiasAcceso == 'radioCualquierDia'){
                        access_pass.config_dia_de_acceso= "cualquier_día" 
                    }
                    
                    if(diasArr.length>0){
                        access_pass.config_dias_acceso = diasArr 
                    }else{
                         access_pass.config_dias_acceso = []
                    }
                    access_pass.config_limitar_acceso = parseInt(data.limiteEntradas)
                    access_pass.status_pase = "proceso"
                    access_pass.visita_a = getCookie("userName_soter")
                    if(paseSelected.grupo_vehiculos.length>0){
                        access_pass.grupo_vehiculos = paseSelected.grupo_vehiculos
                    }else{
                        access_pass.grupo_vehiculos =[]
                    }
                    if(paseSelected.grupo_equipos.length>0){
                        access_pass.grupo_equipos = paseSelected.grupo_equipos
                    }else{
                         access_pass.grupo_equipos =[]
                    }
                    if(areas.length>0){
                        access_pass.grupo_areas_acceso = areas
                    }else{
                        access_pass.grupo_areas_acceso = []
                    }
                    access_pass.ubicacion = data.ubicacion
                    access_pass.autorizado_por= getCookie("userName_soter")
                    access_pass.perfil_pase = "Visita General"
                    // access_pass.pase_a_nombre_de: {} //visita autorizada
                    if(paseSelected.walkin_fotografia.length>0){
                        access_pass.walkin_fotografia = paseSelected.walkin_fotografia
                    }else{
                        access_pass.walkin_fotografia = []
                    }
                    if(paseSelected.walkin_identificacion.length>0){
                        access_pass.walkin_identificacion = paseSelected.walkin_identificacion
                    }else{
                        access_pass.walkin_identificacion =[]
                    }
                    access_pass.tema_cita = data.temaCita
                    access_pass.descripcion = data.descripcion
                    access_pass.enviar_correo = [] // enviar correo pre registro se borrara para que cuando el user vuelva a completar el pase escoga si recibir o no correo
                    if(checkPregistro.length>0){
                        access_pass.enviar_correo_pre_registro = checkPregistro
                    }else{
                        access_pass.enviar_correo_pre_registro = []
                    }
                    access_pass.link={
                            "link":`${protocol}//${host}/solucion_accesos/pase.html`,
                            "docs": checkDocSeleccionados,
                            'qr_code':paseSelected._id,
                            "creado_por_id": getCookie("userId_soter"),
                            "creado_por_email":getCookie("userEmail")
                        }
                    if(comentarios.length>0){
                        access_pass.grupo_instrucciones_pase = comentarios
                    }
                    fetch(url + urlScripts, {
                        method: 'POST',
                        body: JSON.stringify({
                            script_name: "pase_de_acceso.py",
                            option: 'update_full_pass',
                            location:getCookie('userLocation'),
                            access_pass: access_pass,
                            // enviar_pre_sms: enviarPreSmsChecked,
                            folio: paseSelected.folio,
                            qr_code: paseSelected._id
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
                            if(data.status_code==400 || data.status_code==401){
                                Swal.close()
                                errorAlert(data)
                            }else if(data.status_code==202 || data.status_code==201){

                                let protocol = window.location.protocol;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                                let host = window.location.host;
                                let docs = ""
                                
                                let linkk=`${protocol}//${host}/solucion_accesos/pase.html?id=`+data.json.id+`&user=`+getCookie("userId_soter")+ `&docs=`+ checkDocSeleccionados



                                Swal.close()
                                Swal.fire({
                                    type:"success",
                                    text: "Tu informacion se ha guardado correctamente.",
                                    html:`
                                        <div class="mb-3 mt-2" style="font-weight: bold; font-size: 1.1em; color:#8ebd73 !important;"> Pase de entrada generado </div>
                                        <div class="d-flex flex-column justify-content-center align-items-center">
                                            <div class='align-items-start m-2'>
                                                El pase de entrada se ha generado correctamente. Por favor, copie el siguiente enlace y compartalo con el visitante para
                                                completar el proceso.
                                                <input type="text" class="form-control fill paseEntradaNuevo mt-3" id="nombreCompleto" aria-describedby="emailHelp" value="${linkk}">
                                            </div>
                                        </div>`,
                                    showCancelButton:false,
                                    showConfirmButton:true,
                                    confirmButtonText: "Copiar Link"
                             }).then((result)=>{
                                if (result.value) {
                                    let link= copyLinkPase(data.json.id, access_pass.nombre, access_pass.email, access_pass.telefono, checkDocSeleccionados, getCookie("userId_soter"), getCookie('userEmail'));
                                    location.reload();
                                    /*loadingService()
                                    fetch(url + urlScripts, {
                                        method: 'POST',
                                        body: JSON.stringify({
                                            script_name: "pase_de_acceso.py",
                                            option: 'update_pass',
                                            location:getCookie('userLocation'),
                                            access_pass: {
                                                link:link
                                            },
                                            folio: data.json.id
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
                                            
                                            successMsg("Confirmación", "Informacion enviada, el link esta listo para compartir")
                                        }else{
                                            errorAlert(res)
                                        }
                                    })*/
                                }else{
                                    location.reload();
                                }
                             })
                        }
                        }else{
                            Swal.close()
                            errorAlert(res)
                        }
                    });


                    
                }
            });

            console.log("DIAS",diasArr)
            if(diasArr.length>0){
                for(let d of diasArr){
                    console.log("QUE PASA",$("#"+d+""))
                    $("#"+d+"v").removeClass('btn-outline-success');
                    $("#"+d+"v").addClass('bg-dark');
                    $("#"+d+"v").addClass('color-white');
                }
            }
    }else{
        successMsg("Validación", "Faltan datos por llenar", "warning")  
        // }
    }
}
