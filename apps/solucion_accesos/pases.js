// let colors = getPAlleteColors(12,0)
const tabs = document.querySelectorAll('.nav-link');
// let account_id=''
let selectedGlobalPase =""

window.onload = function(){
    let userA = getCookie("userId");
    userJwt = getCookie("userJwt");
    if(userA !='' && userJwt!=''){
        drawTable('tableListTodos',columnsTableListPendientes, dataTableListTodos );
        drawTable('tableListFavoritos',columnsTableListPendientes, dataTableListFavoritos );
        drawTable('tableListActivos',columnsTableListPendientes, dataTableListActivos );
        drawTable('tableListVencidos',columnsTableListPendientes, dataTableListVencidos );
    }else{
        setCloseSession();
    }

    setValueUserLocation('pases');
    $("#locCard").hide()
    changeButtonColor();
    customNavbar(getValueUserLocation(), getCookie('userTurn'))
	
    selectLocation= document.getElementById("selectLocation")
    selectCaseta= document.getElementById("selectCaseta")

    selectLocation.onchange = function() {
        let response = fetchOnChangeLocation(selectLocation.value)
    };
    selectCaseta.onchange = async function() {
        let response = await fetchOnChangeCaseta('notes.py', 'get_notes', selectCaseta.value, selectLocation.value)
        reloadTableNotas(response.response.data)
    };
    account_id=getCookie('userId')
    fillCatalogs();
    // getAllData();
    getAllDataPases()
}

function setModal(type = 'none',id ="", nombre='', email=''){
    if(type== "favoritos"){
        modalFavoritos(id)
    }else if(type== "ver"){
        modalVerPase(id)
    }else if(type== "editar"){
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
    loadingService()
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
                                nombre: pase.nombre ||"",
                                email:pase.email||"",
                                telefono: pase.telefono||"",
                                fecha_desde_hasta:pase.fecha_desde_hasta,
                                fecha_desde_visita:pase.fecha_desde_visita,
                                tipo_de_pase:pase.tipo_de_pase,
                                motivo_visita: pase.motivo_visita ||"",
                                estatus:pase.estatus ||"",
                                tema_cita:pase.tema_cita ||"",
                                descripcion:pase.descripcion ||"",
                                favoritos: pase.favoritos,
                                visita_a: pase.visita_a ||[],
                                ubicacion:pase.ubicacion||"",
                                foto: pase.foto||[],
                                identificacion:pase.identificacion||[],
                                enviar_correo_pre_registro: pase.enviar_correo_pre_registro||[],
                                enviar_correo: pase.enviar_correo ||[],
                                config_dia_de_acceso:pase.config_dia_de_acceso ||"",
                                tipo_fechas_pase:pase.tipo_fechas_pase||"",
                                tipo_visita : pase.tipo_visita ||"",
                                limite_de_acceso:pase.limite_de_acceso||"",
                            })
                        }
                    }else{
                        dataTableListTodos = []
                    }
                    
                    console.log("PASESS", dataTableListTodos)
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
            console.log('Se activó la pestaña Todos');
            drawTable('tableListTodos', columnsTableListPendientes, dataTableListTodos);
            break;
        case 'Favoritos':
            console.log('Se activó la pestaña Favoritos');
            drawTable('tableListFavoritos', columnsTableListPendientes, dataTableListTodos);
            break;
        case 'Activos':
            console.log('Se activó la pestaña Activos');
            drawTable('tableListActivos', columnsTableListPendientes, dataTableListTodos);
            break;
        case 'Vencidos':
            console.log('Se activó la pestaña Vencidos');
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
    
    console.log("FAVORITIOS",fav)
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

function modalVerPase(id){
    //CAMBIAS LOS ID PARA ADAPTAR EL MODAL

    let data = dataTableListTodos.filter(x => x._id == id).pop();
    //let data= getInputsValueByClass('paseEntradaNuevo')
    // let comentarios= getDataGrupoRepetitivo('com-input-form-nuevo','.com-div-nuevo' , 0)
    // let arrComentarios= document.getElementsByClassName('com-div-nuevo')
    console.log("INFO DE DATA",data,id)
    let arrComentarios=[]
    let comentarios=[]
    for(let c of arrComentarios){
        if(c.id.includes("instruccionComentario-") && c.value !== ""){
            comentarios.push({tipo_comentario:"Pase", comentario_pase: c.value})
        }
    }
    // let areas= getDataGrupoRepetitivo('area-input-form-nuevo','.area-div-nuevo' , 2)
    let areas= []
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
        selectedRadioDiasAcceso=  data.dias_acceso//selectedRadioDias[0].id
        // let fechaActual= new Date()
        // let fecha1= fechaVisitaMain.replace(" ", "t")
        // let fecha2= fechaHastaMain.replace(" ", "t")
        // if(fecha1 < fechaActual || fecha2 < fechaActual){
        //     console.log("RANGO DE FECHAS INVALIDO")
        //     $("#fechaVisitaOA").val("")
        //     $("#fechaHastaOA").val("")
        // }
    }
    let diasArr=[]
    let checkboxes = document.querySelectorAll('input[name="diasPase"]');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            diasArr.push(checkbox.value)
        }
    });

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
        <div class="d-flex justify-content-start mt-4 ms-2">
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
    if(data.limiteEntradas!==""){
        limiteEntradasTexto=`
            <div class="d-flex justify-content-start mt-3 ms-2">
                <p><span class="me-2"><b>Limite de entradas:</b></span>`+ data.limiteEntradas+`</p>
            </div>
        `
    }
    let numValid = true //iti.isValidNumber()
    let numeroConLada = ""
    if(numValid){
        numeroConLada = data.telefono//iti.getNumber();
    }
    let html = []//getListVehiculosEquipos(location, caseta, name, company, visit, motivo)
    let foto= data.foto.length>0?data.foto[0].file_url:""
    let identificacion= data.identificacion.length>0?data.identificacion[0].file_url:""
    Swal.fire({
            title:'Pase de entrada',
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
                                <td>`+data.nombre+`</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><b>Email:</b></td>
                                <td><span ><b>Teléfono:</b></span></td>
                            </tr>
                            <tr>
                                <td> `+data.email+`</td>
                                <td><span > `+data.telefono+`</span></td>
                            </tr>
                            <tr>
                                <td><b>Ubicación:</b></td>
                                <td><span ><b>Tema de la cita:</b></span></td>
                            </tr>
                            <tr>
                                <td> `+data.ubicacion+`</td>
                                <td><span > `+data.tema_cita+`</span></td>
                            </tr>
                             <tr>
                                <td><b>Descripción:</b></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>`+data.descripcion+`</td>
                                <td> </td>
                            </tr>
                            <tr>
                                <td><b>Foto:</b></td>
                                <td><span><b>Identificación:</b></span></td>
                            </tr>
                            <tr>
                                <td><img src="`+foto+`" alt="No hay imagen disponible" style="object-fit:cover;" width="220" height="150"> </td>
                                <td><img src="`+identificacion+`" alt="No hay imagen disponible" style="object-fit:cover;" width="220" height="150"> </td>
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
            showConfirmButton: false,
            cancelButtonColor: "#dc3545",
            confirmButtonText:'Cerrar',
            cancelButtonText:'Cerrar',
            heightAuto:false,
            reverseButtons: true,
            width:750,
    })
    .then((result) => {
        if (result.value) {
           Swal.close()
        }
    });

    if(diasArr.length>0){
        for(let d of diasArr){
            $("#"+d+"").removeClass('btn-outline-success');
            $("#"+d+"").addClass('bg-dark');
            $("#"+d+"").addClass('color-white');
        }
    }
}

async function modalEditarPase(id){
    let selectedPase = dataTableListTodos.filter(x => x._id == id).pop();
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
        $('#nombreCompleto').val(selectedPase.nombre)
        $('#email').val(selectedPase.email)
        $('#telefono').val(selectedPase.telefono)
        $('#ubicacion').val(selectedPase.ubicacion)
        $('#temaCita').val(selectedPase.tema_cita)
        $('#descripcion').val(selectedPase.descripcion)
        $('#ubicacion').prop('value', selectedPase.ubicacion);
    })
    for(let i of selectedPase.enviar_correo_pre_registro){
        console.log("HOLA", i)
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
        if(selectedPase.config_dia_de_acceso=="limitar_días_de_acceso"){
            $("#radioLimitarDias").prop('checked', true);
        }else{
            $("#radioCualquierDia").prop('checked', true);
        }
        onChangeOpcionesAvanzadas('checkOpcionesAvanzadas')
        let date= selectedPase.fecha_desde_visita.split(" ")
        $("#fechaVisitaOA").val(date[0])
        let date1= selectedPase.fecha_desde_hasta.split(" ")
        $("#fechaHastaOA").val(date1[0])
        console.log("FEWHCASSS ",date, date1)
    }else{
        $("#radioFechaFija").prop('checked', true);
        let date =selectedPase.fecha_desde_visita.split(" ")
        $("#fechaVisita").val(date[0])
        let date1 =date[1].split(":")
        $("#horaNuevoPase").val(date1[0])
        $("#minNuevoPase").val(date1[1])
        console.log("FEWHCASSS 222",date, date1)
    }
    if (selectedPase.limite_de_acceso){
         $("#limiteEntradas").val(selectedPase.limite_de_acceso)
    }
}

async function modalReenviarPase(folio){
    let selectedPase = dataTableListTodos.find(x => x._id == folio);
    console.log("PASE",selectedPase)
    let fechasSonValidas= validarFechasConHora(selectedPase.fecha_desde_visita, selectedPase.fecha_desde_hasta)
    console.log("SON FECHAS VALIDAS",fechasSonValidas)
    // if(fechasSonValidas.valido==true){
        let pdf = await get_pdf(selectedPase._id);
        console.log(pdf)
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
                            numero: selectedPase.telefono
                        }
                        console.log("PASE data_for_msj_tel", data_for_msj_tel)
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
                            email_to: selectedPase.email,
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
                        console.log("PASE data_for_msj_tel", data_for_msj)
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
    // }else{
    //     successMsg("Validación", "El pase ha vencido, modifica las fechas para continuar.", 'warning')
    // }
    
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
                account_id: parseInt(getCookie('userId'))
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
    loadingService()
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
                console.log(res)
                pdf=res.response.data.data
            }else{
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

function editarPaseEntrada(){
    let data = getInputsValueByClass("paseEntradaEdit")
    console.log("DATA ANTIGUA", data)
    // let selectedGlobalPase=''
    
}

