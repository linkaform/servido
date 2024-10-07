let colors = getPAlleteColors(12,0)
let dataCatalogs= {}
let scriptName="accesos_turnos.py"
let selectedRowFolio=""
let selectedIncidencias=[]
let selectedFallas=[]
let arrayResponses=[]
let selectLocIncidencias=""
let selectLocFallas=""
let catalogsData= ""
let arraySuccessFoto=[]
let arraySuccessArchivo=[]

window.onload = function(){
	user= getCookie("userId");
	setValueUserLocation('incidencias');
    customNavbar(getValueUserLocation(), getCookie('userTurn'))
    getAllDataIncidencias();

    getAllDataFallas();
	changeButtonColor();

    fillCatalogs();
    //getInfoAndCatalogos();
    let checkboxCasetas = document.getElementById('checkboxTodasLasCasetas');
    checkboxCasetas.checked = true; 

	selectLocation= document.getElementById("selectLocation")
	selectLocation.onchange = async function() {
        let response = fetchOnChangeLocation(selectLocation.value )
        console.log("BUSCANDO EN TODO", selectCaseta.value, selectLocation.value)
        let response2 = await fetchOnChangeCaseta('incidencias.py', 'get_incidences', selectCaseta.value, selectLocation.value)
        reloadTableIncidencias(response2.response.data, selectCaseta.value)
        let response3 = await fetchOnChangeCaseta('fallas.py', 'get_failures', selectCaseta.value, selectLocation.value, status=statusFallaAbierto.toLowerCase())
        reloadTableFallas(response3.response.data)
    };
    selectCaseta= document.getElementById("selectCaseta")
    selectCaseta.onchange = async function() {
        let response = await fetchOnChangeCaseta('incidencias.py', 'get_incidences', selectCaseta.value, selectLocation.value)
        reloadTableIncidencias(response.response.data)
        let response2 = await fetchOnChangeCaseta('fallas.py', 'get_failures', selectCaseta.value, selectLocation.value, status=statusFallaAbierto.toLowerCase())
        reloadTableFallas(response2.response.data)
    };
	setSpinner(true, 'divSpinner');
   if(getValueUserLocation()=='incidencias'){
         $(document).ready(function() {
            $('#divTodasLasCasetas').show();
            $('#labelGuardiaDeApoyo').remove();
        })
    }
    selectCaseta.value=""
    selectCaseta.disabled=true


         const buttons = document.querySelectorAll('.time-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            alert(`Hora seleccionada: ${button.textContent}:${document.getElementById('minutes').value}`);
        });
    });

    iniciarSelectHora('horaNuevoFalla','minNuevoFalla', 'ampmNuevoFalla')
    iniciarSelectHora('horaEditarFalla','minEditarFalla', 'ampmEditarFalla1')
}



//FUNCION para mostrar los modales
function setModal(type = 'none',id){
    if(type == 'NewIncident'){
        limpiarModal("contentNuevoIncidencia", "nuevo")
        abrirModalNuevaEditarIncidencia(null,"Nuevo")
    }else if(type == 'EditIncident'){
        limpiarModal("contentEditarIncidencia", "editar")
        abrirModalNuevaEditarIncidencia(id,"Editar")
    }else if(type == 'ViewIncident'){
        verIncidencia(id)
    }else if(type == 'NewFail'){
        limpiarModal("contentNuevoFalla", "nuevo")
        abrirModalNuevaEditarFalla(null, "Nuevo")
    }else if(type == 'EditFail'){
        limpiarModal("contentEditarFalla", "editar")
        abrirModalNuevaEditarFalla(id, "Editar")
    }else if (type =='cerrarFallaModal'){
        limpiarModal("seguimientoFalla", "editar")
        cerrarFallaModal(id)
    }else if(type == 'fallaVer'){
        console.log("COBERRR",type)
        verFallaModal(id)
    }else if(type == 'SuccessFail'){
        $('#successResolveFailModal').modal('show');
    }else if(type == 'filtros'){
        modalFiltros('tableIncidencias','incidenciasFiltersModal')
    }
}

function verFallaModal(folio){
    let selected= dataTableFallas.find(x => x.folio == folio)
    $('#fallaVista').text(selected.falla);
    $('#objetoAfectadoVista').text(selected.falla_objeto_afectado);
    $('#ubicacionVista').text(selected.falla_ubicacion);
    $('#areaVista').text(selected.falla_caseta);
    $('#estatusVista').text(selected.falla_estatus);
    $('#comentarioVista').text(selected.falla_comentarios);
    $('#fechaFallaVista').text(selected.falla_fecha_hora);
    $('#reportaVista').text(selected.falla_reporta_nombre);
    $('#folioVista').text(selected.falla_folio_accion_correctiva);
    $('#comentarioSolucionVista').text(selected.falla_comentario_solucion);
    $('#fechaSolucionVista').text(selected.falla_fecha_hora_solucion);
    $('#responsableVista').text(selected.falla_responsable_solucionar_nombre)

    let divFotos = document.getElementById("evidenciaFalla")
    divFotos.innerHTML=""
    let fotos=""
    if(selected.hasOwnProperty('falla_evidencia')){
        for(let foto of selected.falla_evidencia){
            fotos += `<img src="`+foto.file_url+`" style="object-fit: contain;"  class="me-2">`
        }
    }
    divFotos.innerHTML = fotos
    let divDoc = document.getElementById("documentosFalla")
    divDoc.innerHTML=""
    let doc=""
    if(selected.hasOwnProperty('falla_documento')){
        console.log('holi')
        for(let file of selected.falla_documento){
            doc += `<a href="`+file.file_url+`" target="_blank" class="me-2">`+file.file_name+`</a>`

        }
    }
    divDoc.innerHTML = doc

    let divFotos2 = document.getElementById("evidenciaSolucionFalla")
    divFotos2.innerHTML=""
    let fotos2=""
    if(selected.hasOwnProperty('falla_evidencia_solucion') && selected.falla_evidencia_solucion!==undefined){
        for(let foto of selected.falla_evidencia_solucion){
            fotos2 += `<img src="`+foto.file_url+`" style="object-fit: contain;"  class="me-2">`
        }
    }
    divFotos2.innerHTML = fotos2
    let divDoc2 = document.getElementById("documentosSolucionFalla")
    divDoc2.innerHTML=""
    let doc2=""
    if(selected.hasOwnProperty('falla_documento_solucion') && selected.falla_documento_solucion!==undefined){
        for(let file of selected.falla_documento_solucion){
            doc2 += `<a href="`+file.file_url+`" target="_blank" class="me-2">`+file.file_name+`</a>`

        }
    }

    divDoc2.innerHTML = doc2
    $('#fallaVer').modal('show');
}

function cerrarFallaModal(folio){
    selectedRowFolio=folio
    let selected= dataTableFallas.find(x => x.folio == folio)
    if(selected.falla_estatus== statusFallaResuelto.toLowerCase()){
        successMsg("Esta falla ya se encuentra resuelta.", 'Validación', 'warning')
    }else{
        $('#cerrarFallaModal').modal('show');
    }
}


function verIncidencia(folio){
    let selectedIncidencia = dataTableIncidencias.find(x => x.folio == folio)
    $("#fechaHoraIncidencia").text(capitalizeFirstLetter(selectedIncidencia.fecha_hora_incidencia ||""))
    $("#ubicacionIncidencia").text(capitalizeFirstLetter(selectedIncidencia.ubicacion_incidencia ||""))
    $("#areaIncidencia").text(capitalizeFirstLetter(selectedIncidencia.area_incidencia ||""))
    $("#incidenciaIncidencia").text(capitalizeFirstLetter(selectedIncidencia.incidencia ||""))
    $("#comentarioIncidencia").text(selectedIncidencia.comentario_incidencia ||"")
    $("#prioridadIncidencia").text(capitalizeFirstLetter(selectedIncidencia.prioridad_incidencia ||""))
    // $("#tipoIncidencia").text(capitalizeFirstLetter(selectedIncidencia.tipo_incidencia ||""))
    $("#tipoDanoIncidencia").text(capitalizeFirstLetter(selectedIncidencia.tipo_dano_incidencia[0] ||""))
    $("#danoIncidencia").text(capitalizeFirstLetter(selectedIncidencia.dano_incidencia ||""))
    $("#notificacionIncidencia").text(capitalizeFirstLetter(selectedIncidencia.notificacion_incidencia ||""))

    let divFotos = document.getElementById("evidenciaIncidencia")
    divFotos.innerHTML=""
    let fotos=""
    if(selectedIncidencia.hasOwnProperty('evidencia_incidencia')){
        for(let foto of selectedIncidencia.evidencia_incidencia){
            fotos += `<img src="`+foto.file_url+`" style="object-fit: contain;"  class="me-2">`
        }
    }
    divFotos.innerHTML = fotos
    let divDoc = document.getElementById("documentosIncidencia")
    divDoc.innerHTML=""
    let doc=""
    if(selectedIncidencia.hasOwnProperty('documento_incidencia')){
        for(let file of selectedIncidencia.documento_incidencia){
            doc += `<a href="`+file.file_url+`" target="_blank" class="me-2">`+file.file_name+`</a>`

        }
    }
    divDoc.innerHTML = doc
    $('#viewIncidentModal').modal('show');
}

$("#checkboxTodasLasCasetas").on("click",async function()  {
    if ($(this).is(':checked')) {
        selectCaseta.value=""
        selectCaseta.disabled=true
        let response = await fetchOnChangeCaseta('incidencias.py', 'get_incidences','', selectLocation.value)
        reloadTableIncidencias(response.response.data)
        //let response2 = await fetchOnChangeCaseta('script_turnos.py', 'get_lockers', '', selectLocation.value)
        //reloadTableLockers(response2.response.data)
    } else {
        selectCaseta.disabled=false
    }
})

window.addEventListener('storage', function(event) {
    if (event.key === 'cerrarSesion') {
        let protocol = window.location.protocol;
        let host = window.location.host;
        window.location.href =`${protocol}//${host}/solucion_accesos/login.html`;
    }
});


function reloadTableIncidencias(data){
    dataTableIncidencias = []
    if(user !='' && userJwt!=''){
        let incidencias=data
        if(incidencias.length >0){
            for(let incidencia of incidencias){
                let dateFormat= incidencia.fecha_hora_incidencia.slice(0,-3)
                    dataTableIncidencias.push({
                        folio:incidencia.folio, 
                        reporta_incidencia: incidencia.reporta_incidencia,
                        fecha_hora_incidencia:incidencia.fecha_hora_incidencia,
                        ubicacion_incidencia: incidencia.ubicacion_incidencia,
                        area_incidencia: incidencia.area_incidencia,
                        incidencia: incidencia.incidencia,
                        tipo_incidencia: incidencia.tipo_incidencia,
                        comentario_incidencia: incidencia.comentario_incidencia,
                        tipo_dano_incidencia: incidencia.tipo_dano_incidencia,
                        dano_incidencia:incidencia.dano_incidencia,
                        personas_involucradas_incidencia:incidencia.personas_involucradas_incidencia,
                        acciones_tomadas_incidencia:incidencia.acciones_tomadas_incidencia,
                        evidencia_incidencia:incidencia.evidencia_incidencia,
                        documento_incidencia:incidencia.documento_incidencia,
                        prioridad_incidencia:incidencia.prioridad_incidencia,
                        notificacion_incidencia:incidencia.notificacion_incidencia
                    })
            }
        }else{
            dataTableIncidencias = []
        }
        if(tables['tableIncidencias']){
            tables['tableIncidencias'].setData(dataTableIncidencias)
        }else{
            drawTable('tableIncidencias', columsData1, dataTableIncidencias);
        }
        $("#descargarIncidencias").on("click", function() {
            descargarExcel(tables, 'tableIncidencias')
        });
        let selectedIncidencias = getActiveCheckBoxs(tables,'tableIncidencias')
        let buttonEliminarIncidencias=document.getElementById('buttonEliminarIncidencias');
        if(selectedIncidencias.length>0) buttonEliminarIncidencias.display= 'none'
    } else{
        redirectionUrl('login',false);
    }
}

function reloadTableFallas(data){
    dataTableFallas=[]
    if(user !='' && userJwt!=''){
        let fallas= data
        if(fallas.length >0){
            for(let falla of fallas){
                let dateFormat=""
                let dateFormat2=""
                if(falla.hasOwnProperty('falla_fecha_hora')&& falla.falla_fecha_hora !=="" ){
                    dateFormat= falla.falla_fecha_hora.slice(0,-3)
                }
                if(falla.hasOwnProperty('falla_fecha_hora_solucion')&& falla.falla_fecha_hora_solucion !=="" ){
                    dateFormat2= falla.falla_fecha_hora_solucion.slice(0,-3)
                }
                dataTableFallas.push({
                    'folio': falla.folio,
                    'falla_estatus': falla.falla_estatus,
                    'falla_fecha_hora': dateFormat,
                    'falla_reporta_nombre': falla.falla_reporta_nombre,
                    'falla_reporta_departamento': falla.falla_reporta_departamento,
                    'falla_ubicacion': falla.falla_ubicacion,
                    'falla_caseta':falla.falla_caseta,
                    'falla':falla.falla,
                    'falla_objeto_afectado':falla.falla_objeto_afectado,
                    'falla_comentarios':falla.falla_comentarios,
                    'falla_evidencia': falla.falla_evidencia,
                    'falla_documento':falla.falla_documento,
                    'falla_responsable_solucionar_nombre':falla.falla_responsable_solucionar_nombre,
                    'falla_responsable_solucionar_documento':falla.falla_responsable_solucionar_documento,
                    'falla_comentario_solucion':falla.falla_comentario_solucion,
                    'falla_folio_accion_correctiva':falla.falla_folio_accion_correctiva,
                    'falla_evidencia_solucion':falla.falla_evidencia_solucion,
                    'falla_documento_solucion':falla.falla_documento_solucion,
                    'falla_fecha_hora_solucion':dateFormat2,
                })
            }
        }else{
            dataTableFallas = []
        }
        if(tables['tableFallas']){
            tables['tableFallas'].setData(dataTableFallas)
        }else{
            drawTable('tableFallas', columsData2, dataTableFallas);
        }
        $("#descargarFallas").on("click", function() {
            descargarExcel(tables, 'tableFallas')
        });     
        let selectedFallas = getActiveCheckBoxs(tables,'tableFallas')
        let buttonEliminarFallas=document.getElementById('buttonEliminarFallas');
        if(selectedFallas.length>0) buttonEliminarFallas.display= 'none'
    } else{
        redirectionUrl('login',false);
    }
}

//FUNCION para limpiar el modal de agregar nota
function limpiarModal(classInput, editAdd){
    arrayResponses=[]
    arraySuccessFoto=[]
    arraySuccessArchivo=[]
    let elements = document.getElementsByClassName(classInput)
    for (let i = 0; i < elements.length; i++) {
        elements[i].value='';
    }
    
    let divFoto = document.getElementById("foto-input-form-"+editAdd);
    const elementsFoto = divFoto.querySelectorAll('.foto-div-'+editAdd);
    elementsFoto.forEach(function(input) {
        if(input.id !== "fileInputFotografia-"+editAdd){
            input.parentElement.parentElement.remove();
        }
    });
    let divArchivo = document.getElementById("archivo-input-form-"+editAdd);
    const elementsArchivo = divArchivo.querySelectorAll('.archivo-div-'+editAdd);
    elementsArchivo.forEach(function(input) {
        if(input.id !== "fileInputArchivo-"+editAdd){
            input.parentElement.parentElement.remove();
        }
    });
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

   let divEvidenciaF = document.getElementById("evidenciaF-input-form-"+editAdd);
    const elementsEvidenciaF = divEvidenciaF.querySelectorAll('.evidenciaF-div-'+editAdd);
    elementsEvidenciaF.forEach(function(input) {
        if(input.id !== "evidenciaF-"+editAdd){
            input.parentElement.parentElement.remove();
        }
    });
    let divDocumentoF = document.getElementById("documentoF-input-form-"+editAdd);
    const elementsDocumentoF = divDocumentoF.querySelectorAll('.documentoF-div-'+editAdd);
    elementsDocumentoF.forEach(function(input) {
        if(input.id !== "documentoF-"+editAdd){
            input.parentElement.parentElement.remove();
        }
    });

    if(editAdd =='Editar'){
        let divEvidenciaFS = document.getElementById("evidenciaFS-input-form-"+editAdd);
        const elementsEvidenciaFS = divEvidenciaFS.querySelectorAll('.evidenciaFS-div-'+editAdd);
        elementsEvidenciaFS.forEach(function(input) {
            if(input.id !== "evidenciaFS-"+editAdd){
                input.parentElement.parentElement.remove();
            }
        });
        let divDocumentoFS = document.getElementById("documentoFS-input-form-"+editAdd);
        const elementsDocumentoFS = divDocumentoFS.querySelectorAll('.documentoFS-div-'+editAdd);
        elementsDocumentoFS.forEach(function(input) {
            if(input.id !== "documentoFS-"+editAdd){
                input.parentElement.parentElement.remove();
            }
        });
    }
}

function reemplazarConVacio(obj) {
  for (let key in obj) {
    if (obj[key] === null) {
      obj[key] = ""; // Reemplazar null por cadena vacía
    } else if (typeof obj[key] === 'object') {
      replaceNullWithEmpty(obj[key]); // Llamar recursivamente si el valor es un objeto
    }
  }
}

//FUNCION que trae la informacion de carga
function getAllDataIncidencias(){
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name:'incidencias.py',
            option:'get_incidences',
            location: getCookie('userLocation'),
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
                    let incidencias=res.response.data
                    if(incidencias.length >0){
                        for(let incidencia of incidencias){
                            let dateFormat= incidencia.fecha_hora_incidencia.slice(0,-3)
                            dataTableIncidencias.push({
                                folio:incidencia.folio, 
                                reporta_incidencia: incidencia.reporta_incidencia ||"",
                                fecha_hora_incidencia:incidencia.fecha_hora_incidencia||"",
                                ubicacion_incidencia: incidencia.ubicacion_incidencia||"",
                                area_incidencia: incidencia.area_incidencia||"",
                                incidencia: incidencia.incidencia||"",
                                //tipo_incidencia: incidencia.tipo_incidencia||"",
                                comentario_incidencia: incidencia.comentario_incidencia||"",
                                tipo_dano_incidencia: incidencia.tipo_dano_incidencia||"",
                                dano_incidencia:incidencia.dano_incidencia||"",
                                personas_involucradas_incidencia:incidencia.personas_involucradas_incidencia||"",
                                acciones_tomadas_incidencia:incidencia.acciones_tomadas_incidencia||"",
                                evidencia_incidencia:incidencia.evidencia_incidencia||"",
                                documento_incidencia:incidencia.documento_incidencia||"",
                                prioridad_incidencia:incidencia.prioridad_incidencia||"",
                                notificacion_incidencia:incidencia.notificacion_incidencia||""
                            })
                        }
                    }else{
                        dataTableIncidencias = []
                    }
                   
                    drawTable('tableIncidencias', columsData1, dataTableIncidencias);
                    $("#descargarIncidencias").on("click", function() {
                        descargarExcel(tables, 'tableIncidencias')
                    });
                    let selectedIncidencias = getActiveCheckBoxs(tables,'tableIncidencias')
                    let buttonEliminarIncidencias=document.getElementById('buttonEliminarIncidencias');
                    if(selectedIncidencias.length>0) buttonEliminarIncidencias.display= 'none'
            } else{
                redirectionUrl('login',false);
            }
        }
    })
}

function getAllDataFallas(){
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name:'fallas.py',
            option:'get_failures',
            location: getCookie('userLocation'),
            area: getCookie('userCaseta'),
            status: statusFallaAbierto.toLowerCase()
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
                    let fallas= res.response.data
                    if(fallas.length >0){
                        for(let falla of fallas){
                            let dateFormat=""
                            let dateFormat2=""
                            if(falla.hasOwnProperty('falla_fecha_hora')&& falla.falla_fecha_hora !=="" ){
                                dateFormat= falla.falla_fecha_hora.slice(0,-3)
                            }
                            if(falla.hasOwnProperty('falla_fecha_hora_solucion')&& falla.falla_fecha_hora_solucion !=="" ){
                                dateFormat2= falla.falla_fecha_hora_solucion.slice(0,-3)
                            }
                            dataTableFallas.push({
                                'folio': falla.folio,
                                'falla_estatus': falla.falla_estatus,
                                'falla_fecha_hora': dateFormat,
                                'falla_reporta_nombre': falla.falla_reporta_nombre,
                                'falla_reporta_departamento': falla.falla_reporta_departamento,
                                'falla_ubicacion': falla.falla_ubicacion,
                                'falla_caseta':falla.falla_caseta,
                                'falla':falla.falla,
                                'falla_objeto_afectado':falla.falla_objeto_afectado,
                                'falla_comentarios':falla.falla_comentarios,
                                'falla_evidencia': falla.falla_evidencia,
                                'falla_documento':falla.falla_documento,
                                'falla_responsable_solucionar_nombre':falla.falla_responsable_solucionar_nombre,
                                'falla_responsable_solucionar_documento':falla.falla_responsable_solucionar_documento,
                                'falla_comentario_solucion':falla.falla_comentario_solucion,
                                'falla_folio_accion_correctiva':falla.falla_folio_accion_correctiva,
                                'falla_evidencia_solucion':falla.falla_evidencia_solucion,
                                'falla_documento_solucion':falla.falla_documento_solucion,
                                'falla_fecha_hora_solucion':dateFormat2,
                            })
                        }
                    }else{
                        dataTableFallas = []
                    }
                    drawTable('tableFallas', columsData2, dataTableFallas);
                    $("#descargarFallas").on("click", function() {
                        descargarExcel(tables, 'tableFallas')
                    });     
                    let selectedFallas = getActiveCheckBoxs(tables,'tableFallas')
                    let buttonEliminarFallas=document.getElementById('buttonEliminarFallas');
                    if(selectedFallas.length>0) buttonEliminarFallas.display= 'none'
            } else{
                redirectionUrl('login',false);
            }
        }
    })
}

function onChangeFiltroEstadoFalla(){
    loadingService()
    let estadoEscogido= $('#filtroEstadoFalla').val()
    fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name:'fallas.py',
                option:'get_failures',
                location: selectLocation.value,
                status:estadoEscogido
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
                errorAlert(res)
            }else{
                Swal.close()
                reloadTableFallas(data)
            }
        }else{
            errorAlert(res)
        }
    })
}

//FUNCION traer toda la informacion de los inicial y la de los catalogos
function getInfoAndCatalogos(){
    //INFO: poner aqui FETCH para traer los catalogos y lo sig agregarlo dentro del response

    if(getCookie("arrayUserBoothsLocations") == ""){
        fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: 'script_turnos.py',
            option:'get_user_booths'
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
                if(user !='' && userJwt!=''){
                    arrayUserBoothsLocations=[]
                    let userBooths=res.response.data
                    if(userBooths.length>0){
                        for(let booth of userBooths){
                            arrayUserBoothsLocations.push({name:booth.area, ubi:booth.location, status:booth.status , guard: booth.employee, folio: booth.folio})
                        }
                    }else{
                        arrayUserBoothsLocations=[]
                    }
                }
                //INFO: los array que estan en el archivo incidencias data se llenaran desde esta fetch

                /*dataCatalogs={
                    "location":["Cumbres", "Monterrey", "San Jeronimo"],
                    "incident_location":["Caseta 1 Poniente","Caseta 2 Sur","Caseta 3 Poniente"],
                    "incident":["Acceso no autorizado", "Fallo de energia", "Incidencia 3"],
                    "report":["Jacinto Sánchez Hil", "Jacinto Sánchez Hil"],
                    "department":["Seguridad","Departamento 2","Departamento 3"],
                    "responsable":["Jacinto Sánchez Hil","Jacinto Sánchez Hil"]
                }*/
                /*initializeCatalogsIncidencias(dataCatalogs, arrayUserBoothsLocations)
                initializeCatalogsFallas(dataCatalogs,arrayUserBoothsLocations)
                dataCatalogs.location.forEach(function(e, i){
                    $("#idUbicacionIncidencias").append($('<option></option>').val(e).text(e));
                    $("#idUbicacionFallas").append($('<option></option>').val(e).text(e))
                    $("#idUbicacionIncidencias").val("")
                    $("#idUbicacionFallas").val("")
                });*/
            }else{
                errorAlert(res)
            }
        });   
    }
}

function onChangeLocation(location, idCaseta){
    loadCatCaseta(location,JSON.parse(getCookie('arrayUserBoothsLocations')).length>0? JSON.parse(getCookie('arrayUserBoothsLocations')): arrayUserBoothsLocations, idCaseta)
    let selectCaseta= document.getElementById(idCaseta)
    selectCaseta.value = ""
}

function loadCatUbicacion(arrayUserBoothsLocations, idCaseta, idLocation ){
    console.log("ENTRADO",arrayUserBoothsLocations, idCaseta, idLocation )
    let selectCaseta= document.getElementById(idCaseta)
    selectCaseta.innerHTML = "";

    let locationsUnique = new Set();
    arrayUserBoothsLocations.forEach(function(booth) {
        locationsUnique.add(booth.ubi);
    });
    let ubicacionesUnique = Array.from(locationsUnique);

    let selectLocation= document.getElementById(idLocation)
    selectLocation.innerHTML=""; 
    for (let obj of ubicacionesUnique){
            selectLocation.innerHTML += '<option value="'+obj+'">'+obj+'</option>';
    }
    selectLocation.value = "";
}

function loadCatCaseta(location ,arrayUserBoothsLocations, idCaseta){
    let selectCaseta= document.getElementById(idCaseta)
    if(location==""){
        selectCaseta.innerHTML += '<option disabled> Escoge una ubicación </option>';
    }else{
        let opcionesCaseta = arrayUserBoothsLocations.filter(booth => {
            return booth.ubi == location ;
        });
        console.log("CASETAAA", opcionesCaseta)
        selectCaseta.innerHTML=""; 
        for (let obj of opcionesCaseta){
                selectCaseta.innerHTML += '<option value="'+obj.name+'">'+obj.name+'</option>';
        }
        selectCaseta.value = getCookie('userCaseta')
        if(getValueUserLocation()=='accesos'){
            selectCaseta.disabled=true
        }
    }
}

//FUNCION una vez traida la informacion llenar todos los catalogso correspondientes
function initializeCatalogsIncidencias(dataCatalogs,boothsLocations){
    boothsLocations.forEach(function(e, i){
        $("#ubicacionEditIncidencia").append($('<option></option>').val(e.ubi).text(e.ubi));
        $("#ubicacionNuevaIncidencia").append($('<option></option>').val(e.ubi).text(e.ubi));
        $("#ubicacionNuevaIncidencia").val("")
    });
    boothsLocations.forEach(function(e, i){
        $("#lugarEditIncidencia").append($('<option></option>').val(e.name).text(e.name));
        $("#lugarNuevaIncidencia").append($('<option></option>').val(e.name).text(e.name));
        $("#lugarNuevaIncidencia").val("")
    });
    dataCatalogs.incident.forEach(function(e, i){
        $("#incidenciaEditIncidencia").append($('<option></option>').val(e).text(e));
        $("#incidenciaNuevaIncidencia").append($('<option></option>').val(e).text(e));
        $("#incidenciaNuevaIncidencia").val("")
    });
    dataCatalogs.report.forEach(function(e, i){
        $("#guardEditIncidencia").append($('<option></option>').val(e).text(e));
        $("#reportaNuevaIncidencia").append($('<option></option>').val(e).text(e));
        $("#reportaNuevaIncidencia").val("")
    });
    dataCatalogs.department.forEach(function(e, i){
        $("#departamentoEditIncidencia").append($('<option></option>').val(e).text(e));
        $("#departamentoNuevaIncidencia").append($('<option></option>').val(e).text(e));
        $("#departamentoNuevaIncidencia").val("");
    });
}


//FUNCION una vez traida la informacion llenar todos los catalogso correspondientes
function initializeCatalogsFallas(dataCatalogs,boothsLocations){
    boothsLocations.forEach(function(e, i){
        $("#ubicacionEditFalla").append($('<option></option>').val(e.ubi).text(e.ubi));
        $("#ubicacionNuevaFalla").append($('<option></option>').val(e.ubi).text(e.ubi));
        $("#ubicacionNuevaFalla").val("")
    });
    boothsLocations.forEach(function(e, i){
        $("#lugarEditFalla").append($('<option></option>').val(e.name).text(e.name));
        $("#lugarNuevaFalla").append($('<option></option>').val(e.name).text(e.name));
        $("#lugarNuevaFalla").val("")
    });
    dataCatalogs.incident.forEach(function(e, i){
        $("#fallaEditFalla").append($('<option></option>').val(e).text(e));
        $("#fallaNuevaFalla").append($('<option></option>').val(e).text(e));
        $("#fallaNuevaFalla").val("")
    });
    dataCatalogs.report.forEach(function(e, i){
        $("#reportaEditFalla").append($('<option></option>').val(e).text(e));
        $("#reportaNuevaFalla").append($('<option></option>').val(e).text(e));
        $("#reportaNuevaFalla").val("")
    });
    dataCatalogs.department.forEach(function(e, i){
        $("#departamentoEditFalla").append($('<option></option>').val(e).text(e));
        $("#departamentoNuevaFalla").append($('<option></option>').val(e).text(e));
        $("#departamentoNuevaFalla").val("");
    });
    dataCatalogs.responsable.forEach(function(e, i){
        $("#responsableEditFalla").append($('<option></option>').val(e).text(e));
        $("#responsableNuevaFalla").append($('<option></option>').val(e).text(e));
        $("#responsableNuevaFalla").val("");
    });
}

async function abrirModalNuevaEditarIncidencia(folio=null,nuevoEditar='Nuevo'){
    selectedRowFolio=folio
    cleanCatalag(['ubicacion'+nuevoEditar+'Incidencia','area'+nuevoEditar+'Incidencia', 
        'reporta'+nuevoEditar+'Incidencia','incidencia'+nuevoEditar+'Incidencia'])
    let selectIncidencia= document.getElementById('incidencia'+nuevoEditar+'Incidencia')
    let selectUbicacion = document.getElementById('ubicacion'+nuevoEditar+'Incidencia')
    let selectArea = document.getElementById('area'+nuevoEditar+'Incidencia')
    let selectReporta = document.getElementById('reporta'+nuevoEditar+'Incidencia')
    let selectedIncidencia =""
    if(nuevoEditar=="Editar"){selectedIncidencia = dataTableIncidencias.find(x => x.folio == folio) }
    try {
        let requests=[{script_name:'incidencias.py',option:'catalogo_area_empleado'},
                    {script_name:'incidencias.py',option:'catalogo_incidencias'}]
        catalogsData = await cargarCatalogos(requests);
    } catch (error) {
        console.error('Error al cargar los catálogos, ', error);
    }
    if(catalogsData.format.length>0){
        for(let obj of catalogsData.format){
            if (obj.objBody.option=="catalogo_area_empleado"){
                //obj.data=['Emiliano Zapata', 'Pedro Parmo']
                for(let name of obj.data){
                    selectReporta.innerHTML += '<option value="'+name+'">'+name+'</option>';
                }
                selectReporta.value="";
            }else if(obj.objBody.option =='catalogo_incidencias') {
                //obj.data=['Otro','Accidentes laborales, como resbalones, tropiezos o caídas']
                for(let inc of obj.data){
                    selectIncidencia.innerHTML += '<option value="'+inc+'">'+inc+'</option>';
                }
                selectIncidencia.value=""
            }
        }
    } 
    let locationsUnique = new Set();
    if(getCookie("arrayUserBoothsLocations")==""){
        getInfoAndCatalogos()
    }else{
        arrayUserBoothsLocations=JSON.parse(getCookie('arrayUserBoothsLocations'))
    }
    arrayUserBoothsLocations.forEach(function(booth) {
        locationsUnique.add(booth.ubi);
    });

    optionsLocation = Array.from(locationsUnique);
    for(let ubi of optionsLocation){
        selectUbicacion.innerHTML += '<option value="'+ubi+'">'+ubi+'</option>';
    }

    selectArea.innerHTML += '<option disabled> Selecciona una ubicación... </option>';
    selectArea.value="";
    onChangeCatalogoIncidencia('ubicacion'+nuevoEditar+'Incidencia', nuevoEditar)
    selectArea.value= selectCaseta.value||""
    if(nuevoEditar == 'Nuevo'){
        $('#newIncidentModal').modal('show');
    }else{
        llenarEditarIncidencia(selectArea,selectedIncidencia,selectUbicacion,selectIncidencia)
    }
}

function llenarEditarIncidencia(selectArea,selectedIncidencia,selectUbicacion,selectIncidencia){
    selectIncidencia.value= selectedIncidencia.incidencia
    selectUbicacion.value=selectedIncidencia.ubicacion_incidencia;
     let optionsCaseta = arrayUserBoothsLocations.filter(booth => {
        return booth.ubi == selectedIncidencia.ubicacion_incidencia;
    });
    selectArea.innerHTML=""; 
    for (let obj of optionsCaseta){
        selectArea.innerHTML += '<option value="'+obj.name.toString()+'">'+obj.name+'</option>';
    }
    $('#ubicacionEditarIncidencia').val(selectedIncidencia.ubicacion_incidencia)
    $('#areaEditarIncidencia').val(selectedIncidencia.area_incidencia)
    $('#fechaHoraEditarIncidencia').val(selectedIncidencia.fecha_hora_incidencia)
    $('#reportaEditarIncidencia').val(selectedIncidencia.reporta_incidencia)
    $('#incidenciaEditarIncidencia').val(selectedIncidencia.incidencia)
    $('#importanciaEditarIncidencia').val(selectedIncidencia.prioridad_incidencia)
    $('#tipoIncidenciaEditarIncidencia').val(selectedIncidencia.tipo_incidencia)
    $('#comentarioEditarIncidencia').val(selectedIncidencia.comentario_incidencia)
    $('#tipoDanoEditarIncidencia').val(selectedIncidencia.tipo_dano_incidencia[0])
    $('#danoEditarIncidencia').val(selectedIncidencia.dano_incidencia)
    $('#notificacionEditarIncidencia').val(selectedIncidencia.notificacion_incidencia)
    $('#editIncidentModal').modal('show');
}

async function onChangeCatalogoIncidencia(catalog, abrirEditar){
    if(catalog =='ubicacion'+abrirEditar+'Incidencia'){
        let optionsCaseta = new Set();
        cleanCatalag(['area'+abrirEditar+'Incidencia'])
        let selectUbicacion = document.getElementById(catalog)
        let selectArea = document.getElementById('area'+abrirEditar+'Incidencia')
        optionsCaseta = arrayUserBoothsLocations.filter(booth => {
        return booth.ubi == selectUbicacion.value ;
        });
        selectArea.innerHTML=""; 
        for (let obj of optionsCaseta){
                selectArea.innerHTML += '<option value="'+obj.name+'">'+obj.name+'</option>';
        }
        selectArea.value=""
    }else if (catalog =='ubicacion'+abrirEditar+'Falla'){
        let optionsCaseta = new Set();
        cleanCatalag(['area'+abrirEditar+'Falla'])
        let selectUbicacion = document.getElementById(catalog)
        let selectArea = document.getElementById('area'+abrirEditar+'Falla')
        optionsCaseta = arrayUserBoothsLocations.filter(booth => {
        return booth.ubi == selectUbicacion.value ;
        });
        selectArea.innerHTML=""; 
        for (let obj of optionsCaseta){
                selectArea.innerHTML += '<option value="'+obj.name+'">'+obj.name+'</option>';
        }
        selectArea.value=""
    }
}

async function abrirModalNuevaEditarFalla(folio=null,nuevoEditar='Nuevo'){
    selectedRowFolio=folio
    cleanCatalag(['ubicacion'+nuevoEditar+'Falla','area'+nuevoEditar+'Falla', 
        'reporta'+nuevoEditar+'Falla', 'objetoAfectado'+nuevoEditar+'Falla','falla'+nuevoEditar+'Falla',
        'responsable'+nuevoEditar+'Falla'])

    let selectUbicacion = document.getElementById('ubicacion'+nuevoEditar+'Falla')
    let selectArea = document.getElementById('area'+nuevoEditar+'Falla')
    let selectFalla= document.getElementById('falla'+nuevoEditar+'Falla')
    let selectObjetoAfectado= document.getElementById('objetoAfectado'+nuevoEditar+'Falla')
    let selectReporta= document.getElementById('reporta'+nuevoEditar+'Falla')
    let selectResponsable= document.getElementById('responsable'+nuevoEditar+'Falla')
    let selectedFalla =""
    if(nuevoEditar=="Editar"){selectedFalla = dataTableFallas.find(x => x.folio == folio) }
    try {
        let requests=[{script_name:'incidencias.py',option:'catalogo_area_empleado'},
                    {script_name:'fallas.py',option:'catalogo_fallas'},
                    {script_name:'fallas.py',option:'catalogo_area_empleado_apoyo'}]
        catalogsData = await cargarCatalogos(requests);
    } catch (error) {
        console.error('Error al cargar los catálogos, ', error);
    }
    console.log(catalogsData)
    if(catalogsData.format.length>0){
        for(let obj of catalogsData.format){
            if (obj.objBody.option=="catalogo_area_empleado"){
                for(let name of obj.data){
                    selectReporta.innerHTML += '<option value="'+name+'">'+name+'</option>';
                }
                selectReporta.value="";
            }else if(obj.objBody.option =='catalogo_fallas') {
                for(let falla of obj.data){
                    selectFalla.innerHTML += '<option value="'+falla+'">'+falla+'</option>';
                }
                selectFalla.value=""
            }else if(obj.objBody.option =='catalogo_area_empleado_apoyo') {
                for(let name of obj.data){
                    if(name!==null){
                        selectResponsable.innerHTML += '<option value="'+name+'">'+name+'</option>';
                    }
                }
                selectResponsable.value=""
            }
        }
    } 
    let locationsUnique = new Set();
    if(getCookie("arrayUserBoothsLocations")==""){
        getInfoAndCatalogos()
    }else{
        arrayUserBoothsLocations=JSON.parse(getCookie('arrayUserBoothsLocations'))
    }
    arrayUserBoothsLocations.forEach(function(booth) {
        locationsUnique.add(booth.ubi);
    });

    optionsLocation = Array.from(locationsUnique);
    for(let ubi of optionsLocation){
        selectUbicacion.innerHTML += '<option value="'+ubi+'">'+ubi+'</option>';
    }

    selectArea.innerHTML += '<option disabled> Selecciona una ubicación... </option>';
    selectArea.value="";
    selectObjetoAfectado.innerHTML += '<option disabled> Selecciona una falla... </option>';
    selectObjetoAfectado.value="";
    onChangeCatalogoFalla('ubicacion'+nuevoEditar+'Falla', nuevoEditar)
    selectArea.value= selectCaseta.value||""
    if(nuevoEditar == 'Nuevo'){
        $('#newFailModal').modal('show');
    }else{
        llenarEditarFalla(selectArea,selectedFalla,selectUbicacion,selectFalla)
    }
}

function llenarEditarFalla(selectArea,selectedFalla,selectUbicacion,selectFalla){
    console.log("CONTENIDOO", selectedFalla)
    selectFalla.value= selectedFalla.falla
    //selectUbicacion.value=selectedFalla.falla_ubicacion;
     let optionsCaseta = arrayUserBoothsLocations.filter(booth => {
        return booth.ubi == selectedFalla.falla_ubicacion;
    });
    selectArea.innerHTML=""; 
    for (let obj of optionsCaseta){
        selectArea.innerHTML += '<option value="'+obj.name.toString()+'">'+obj.name+'</option>';
    }
    $('#ubicacionEditarFalla').val(selectedFalla.falla_ubicacion)
    $('#areaEditarFalla').val(selectedFalla.falla_caseta)
    $('#fallaEditarFalla').val(selectedFalla.falla)
    $('#objetoAfectadoEditarFalla').val(selectedFalla.falla_objeto_afectado)
    $('#reportaEditarFalla').val(selectedFalla.falla_reporta_nombre)
    $('#responsableEditarFalla').val(selectedFalla.falla_responsable_solucionar_nombre)
    $('#comentariosEditarFalla').val(selectedFalla.falla_comentarios)
    
    if(selectedFalla.hasOwnProperty('falla_fecha_hora') && selectedFalla.falla_fecha_hora!==""){
        let partsDate1 = selectedFalla.falla_fecha_hora.split(' ');
        let hour1= partsDate1[1].split(':')
        $('#fechaEditarFalla').val(partsDate1[0])
        $('#horaEditarFalla').val(hour1[0])
        $('#minEditarFalla').val(hour1[1])
        onChangeAmpmLabel('horaEditarFalla','ampmEditarFalla1')
    }

    if(selectedFalla.hasOwnProperty('falla_fecha_hora_solucion') && selectedFalla.falla_fecha_hora_solucion!==""){
        let partsDate2 = selectedFalla.falla_fecha_hora_solucion.split(' ');
        let hour2= partsDate2[1].split(':')
        $('#fechaResolucionEditarFalla').val(partsDate2[0])
        $('#horaResolucionEditarFalla').val(hour2[0])
        $('#minResolucionEditarFalla').val(hour2[1])
        onChangeAmpmLabel('horaResolucionEditarFalla','ampmEditarFalla')
    }

    onChangeCatalogoFalla('fallaEditarFalla', 'Editar',selectedFalla)
    
}

async function onChangeCatalogoFalla(catalog, abrirEditar, selectedFalla={}){
    if(catalog =='ubicacion'+abrirEditar+'Falla'){
        console.log("HII")
        let optionsCaseta = new Set();
        cleanCatalag(['area'+abrirEditar+'Falla'])
        let selectUbicacion = document.getElementById(catalog)
        let selectArea = document.getElementById('area'+abrirEditar+'Falla')
        optionsCaseta = arrayUserBoothsLocations.filter(booth => {
        return booth.ubi == selectUbicacion.value ;
        });
        selectArea.innerHTML=""; 
        for (let obj of optionsCaseta){
                selectArea.innerHTML += '<option value="'+obj.name+'">'+obj.name+'</option>';
        }
        selectArea.value=""
    } else if (catalog =='falla'+abrirEditar+'Falla'){
        console.log("FALLA")
        cleanCatalag(['objetoAfectado'+abrirEditar+'Falla'])
        let selectFalla = document.getElementById(catalog)
        console.log("FALLA SECLECIOPNADA",selectFalla)
        let selectObjetoAfectado = document.getElementById('objetoAfectado'+abrirEditar+'Falla')
        let data = await cargarCatalogos([{script_name:'fallas.py',option:'catalogo_fallas',tipo:selectFalla.value}], true)
        const dataSinNulos = data.format[0].data.filter(element => element !== null);
        for(let obj of dataSinNulos){
            if(obj !==null){
                selectObjetoAfectado.innerHTML += '<option value="'+obj+'">'+obj+'</option>';
            }
        }
        if(dataSinNulos.length==0){
            selectObjetoAfectado.innerHTML += '<option disabled> No hay registros disponibles... </option>';
            selectObjetoAfectado.value="";
        }else{
            selectObjetoAfectado.value=""
            selectObjetoAfectado.value=selectedFalla.falla_objeto_afectado
            if(abrirEditar =="Editar"){
                $('#editFailModal').modal('show');
            }
        }
    }
}

//FUNCION para cerrar modales de vista
function cerrarModal(id){
    $('#'+ id).modal('hide');
}


//FUNCION para elimiinar un registro desde la tabla
function alertEliminar(folio, type){
    let bodyInf={}
    if(type=='fallas'){
        bodyInf={script_name:"fallas.py", option:"delete_failure",folio:folio}
    }else{
        bodyInf={script_name:"incidencias.py", option:"delete_incidence", folio:folio}
    }
    Swal.fire({
        title:'¿Estas seguro de querer eliminar el registro?',
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
            loadingService()
            fetch(url + urlScripts, {
                method: 'POST',
                body: JSON.stringify({
                    script_name: bodyInf.script_name,
                    option: bodyInf.option,
                    folio: [bodyInf.folio]
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
                    }else if(data.status_code==202 ||data.status_code==201 ){
                        Swal.close();
                        Swal.fire({
                            title: "Success",
                            text: "Se elimino la incidenci correctamente.",
                            type: "success",
                            showConfirmButton:false,
                            timer:1200
                        });
                        if(type=='fallas'){
                            let dataFiltered = dataTableFallas.filter(x => x.folio !== folio);
                            dataTableFallas = dataFiltered
                            tables["tableFallas"].setData(dataTableFallas);
                        }else{
                            let dataFiltered = dataTableIncidencias.filter(x => x.folio !== folio);
                            dataTableIncidencias = dataFiltered
                            tables["tableIncidencias"].setData(dataTableIncidencias);
                        }
                    }
                }else{
                    Swal.fire({
                        title: "Error",
                        text: res.error.msg,
                        type: res.error.type
                    });
                }
            });
        }
    });
}


//FUNCION para eliminar todos los registros seleccionados
function alertEliminarCheckbox(type){
    let selected=""
    let bodyInf={}
    if(type=='fallas'){
        bodyInf={script_name:"fallas.py", option:"delete_failure"}
    }else{
        bodyInf={script_name:"incidencias.py", option:"delete_incidence" }
    }
    Swal.fire({
        title:'¿Estas seguro de querer eliminar los registros selecionados?',
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
        //INFO: mandar llamar la FETCH aqui para eliminar esos registros y en el response traer la data actualizada y actualizar la tabla
        if (result.value) {
            if(type=="fallas"){
                loadingService()
                selected= getActiveCheckBoxs(tables, 'tableFallas')
                let ids=[]
                for (d of selected){
                    ids.push(d.folio)
                }
                fetch(url + urlScripts, {
                    method: 'POST',
                    body: JSON.stringify({
                        script_name: bodyInf.script_name,
                        option: bodyInf.option,
                        folio: ids
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
                            Swal.close();
                            successMsg('Confirmación', 'Incidencias borradas correctamente')
                            for (d of selectedFallas){
                                ids.push(d.folio)
                            }
                            dataTableFallas = dataTableFallas.filter(function(objeto) {
                                return !ids.includes(objeto.folio); // Retorna verdadero para mantener el objeto, falso para eliminarlo
                            });
                            tables["tableFallas"].setData(dataTableFallas);
                        }
                    }else{
                        errorAlert(res)
                    }
                });
            }else{
                loadingService()
                selected= getActiveCheckBoxs(tables, 'tableIncidencias')
                let ids=[]
                for (d of selected){
                    ids.push(d.folio)
                }
                fetch(url + urlScripts, {
                    method: 'POST',
                    body: JSON.stringify({
                        script_name: bodyInf.script_name,
                        option: bodyInf.option,
                        folio: ids
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
                            Swal.close();
                            successMsg('Confirmación', 'Incidencias borradas correctamente')
                            dataTableIncidencias = dataTableIncidencias.filter(function(objeto) {
                                return !ids.includes(objeto.folio); // Retorna verdadero para mantener el objeto, falso para eliminarlo
                            });
                            tables["tableIncidencias"].setData(dataTableIncidencias);
                        }
                    }else{
                        errorAlert(res)
                    }
                });
                    
            }
        }
    });
}


//FUNCION para cerrar un fallla de manera individual desde la tabla
function alertFallaResuelta(folio, state){
    console.log(folio, state,statusFallaAbierto.toLowerCase())
    if(state== statusFallaAbierto.toLowerCase()){
        Swal.fire({
            title:'¿Estas seguro de que la falla fue resulta?',
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
                let data_failure_update={
                    'falla_status':'cerrado',
                    'falla_fecha_solucion':getTodayDateTime()
                }
                 fetch(url + urlScripts, {
                    method: 'POST',
                    body: JSON.stringify({
                        script_name:"fallas.py",
                        option:"update_failure",
                        data_failure_update:data_failure_update,
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
                                let fallaSelected = dataTableFallas.find(n => n.folio == folio);
                                for (let key in data_failure_update){
                                    if(key=='data_failure_update'|| key=='falla_status'){
                                        let formatDate= data_failure_update[key].slice(0,-3)
                                        data_failure_update[key]= formatDate
                                    }
                                    fallaSelected[key]= data_failure_update[key]
                                }
                                tables["tableFallas"].setData(dataTableFallas);
                                Swal.fire({
                                    title: "Success",
                                    text: "La falla fue cerrada correctamente",
                                    type: "success",
                                    showConfirmButton:false,
                                    timer:1200
                                });
                            }
                        }
                    } else{
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
            title: "Acción Completada!",
            text: "Esta falla ya se encuentra cerrada.",
            type: "warning"
        });
    }
}


//FUNCION editar incidencia llenar el modal con la informacion
function editarIncidenciaModal(folio, fecha, ubicacion, area, incidente, comentarios, guard ){
    $('#editIncidentModal').modal('show');
    selectedRowFolio= folio
    let fechaHora = fecha.split(" ")
    let formatDate= fechaHora[0]+'T'+fechaHora[1]
    $("#dateEditIncidencia").val(formatDate)
    $("#ubicacionEditIncidencia").val(ubicacion)
    $("#lugarEditIncidencia").val(area)
    $("#incidenciaEditIncidencia").val(incidente)
    $("#comentariosEditIncidencia").val(comentarios)
    $("#guardEditIncidencia").val(guard)
}


//FUNCION editar falla modal llenar el modal con la informacion
function editarFallaModal(folio, fecha, ubicacion, area, falla, comentarios, guard , responsable, status){
    $('#editFailModal').modal('show');
    selectedRowFolio= folio
    $("#fechaEditFalla").val(fecha)
    $("#ubicacionEditFalla").val(ubicacion)
    $("#lugarEditFalla").val(area)
    $("#fallaEditFalla").val(falla)
    $("#comentariosEditFalla").val(comentarios)
    $("#guardEditFalla").val(guard)
    $("#responsableEditFalla").val(responsable)
}


function verInputsDeposito(){
    let selectedOption= document.getElementById('incidenciaNuevoIncidencia')
    if(selectedOption.value =="Deposito"){
        console.log('asdf')
        $('#depositos-inputs').show();
    }else{
        $('#depositos-inputs').hide();
    }
}

//FUNCION editar y validar la informacion al editar un incidencia
function editarIncidencia(){
    $("#buttonEditarIncidencia").hide();
    $("#loadingButtonEditarIncidencia").show();

    let personas= getDataGrupoRepetitivo('persona-input-form-editar','.persona-div-editar' , 2)
    let acciones= getDataGrupoRepetitivo('dano-input-form-editar','.dano-div-editar' , 2)
    arrayResponses = arrayResponses.filter(obj => !obj.hasOwnProperty('error'));
    let selected=''
    for(d of dataTableIncidencias){
        if(d.folio == selectedRowFolio)
            selected = d
    }
    for(let obj of arrayResponses){
        if( obj.hasOwnProperty('file_name') && obj.isImage==true){
            let { isImage, file_name, file  } = obj;
            arraySuccessFoto.push({file_name: file_name, file_url: file});
        } else if( obj.hasOwnProperty('file_name') && obj.isImage==false){
            let { isImage, file_name, file } = obj;
            arraySuccessArchivo.push({file_name: file_name, file_url: file});
        }
    }
    let data = getInputsValueByClass("contentEditarIncidencia")
    let data_incidence_update ={
        'reporta_incidencia': data.reportaEditarIncidencia,
        'fecha_hora_incidencia':formatDateToService(data.fechaHoraEditarIncidencia),
        'ubicacion_incidencia': data.ubicacionEditarIncidencia,
        'area_incidencia': data.areaEditarIncidencia,
        'incidencia': data.incidenciaEditarIncidencia,
        'comentario_incidencia': data.comentarioEditarIncidencia,
        'tipo_dano_incidencia': [data.tipoDanoEditarIncidencia],
        'dano_incidencia':data.danoEditarIncidencia,
        'personas_involucradas_incidencia':personas,
        'acciones_tomadas_incidencia':acciones,
        'evidencia_incidencia':arraySuccessFoto,
        'documento_incidencia':arraySuccessArchivo,
        'prioridad_incidencia':data.importanciaEditarIncidencia,
        'notificacion_incidencia':data.notificacionEditarIncidencia
    };

    let cleanSelected = (({ actions, checkboxColumn, folio,...rest }) => rest)(selected);
    let validateObj = encontrarCambios(cleanSelected,data_incidence_update)
    for(let o of selected.evidencia_incidencia){
        validateObj.evidencia_incidencia.unshift(o)
    }
    for(let o of selected.documento_incidencia){
        validateObj.documento_incidencia.unshift(o)
    }
    for(let o of selected.personas_involucradas_incidencia){
        validateObj.personas_involucradas_incidencia.unshift(o)
    }
    for(let o of selected.acciones_tomadas_incidencia){
        validateObj.acciones_tomadas_incidencia.unshift(o)
    }
    /*console.log(ERR)*/
    let noOptional = (({ acciones_tomadas_incidencia, personas_involucradas_incidencia, documento_incidencia, evidencia_incidencia, reporta_incidencia,
        tipo_dano_incidencia, view,check,...rest  }) => rest)(data_incidence_update);
    if(!validarObjeto(noOptional)){
        successMsg("Validación","Faltan campos por llenar, los campos marcados con asterisco son obligatorios.", "warning");
        $("#loadingButtonEditarIncidencia").hide();
        $("#buttonEditarIncidencia").show();
    }else{
        if(validateObj.evidencia_incidencia.length==0){
            delete validateObj.evidencia_incidencia
        }
        if(validateObj.documento_incidencia.length==0){
            delete validateObj.documento_incidencia
        }
        if(validateObj.personas_involucradas_incidencia.length==0){
            delete validateObj.personas_involucradas_incidencia
        }
        if(validateObj.acciones_tomadas_incidencia.length==0){
            delete validateObj.acciones_tomadas_incidencia
        }

        if(Object.keys(validateObj).length == 0){
            Swal.fire({
                title: "Validación",
                text: "Edita algo para actualizar la información.",
                type: "warning"
            });
            console.log("VALIDAR OBJ", validateObj)
        } else {
            fetch(url + urlScripts, {
                method: 'POST',
                body: JSON.stringify({
                    script_name: "incidencias.py",
                    option:"update_incidence",
                    data_incidence_update:validateObj,
                    folio: selected.folio
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
                        $("#buttonEditarIncidencia").show();
                        $("#loadingButtonEditarIncidencia").hide();
                    }else if(data.status_code==202){
                        successMsg("Confirmación", "Incidencia actualizada correctamente.")
                        let selectedIncidencia = dataTableIncidencias.find(x => x.folio === selected.folio);
                        for (let key in validateObj){
                            if(key=='fecha_hora_incidencia'){
                            let formatDate= data_incidence_update[key].slice(0,-3)
                            selectedIncidencia[key]= formatDate
                            }else if(key=='falla_evidencia'){
                                if(data_incidence_update.falla_evidencia.length>0){
                                    for (let d of data_incidence_update.falla_evidencia){
                                        selectedIncidencia.falla_evidencia.unshift(d)
                                    }
                                }
                            }else if(key=='evidencia_incidencia'){
                                if(data_incidence_update.evidencia_incidencia.length>0){
                                    for (let d of data_incidence_update.evidencia_incidencia){
                                        selectedIncidencia.evidencia_incidencia.unshift(d)
                                    }
                                }
                            }else if(key=='documento_incidencia'){
                                if(data_incidence_update.documento_incidencia.length>0){
                                    for (let d of data_incidence_update.documento_incidencia){
                                        selectedIncidencia.documento_incidencia.unshift(d)
                                    }
                                }
                            }else if(key=='personas_involucradas_incidencia'){
                                if(data_incidence_update.personas_involucradas_incidencia.length>0){
                                    for (let d of data_incidence_update.personas_involucradas_incidencia){
                                        selectedIncidencia.personas_involucradas_incidencia.unshift(d)
                                    }
                                }
                            }else if(key=='acciones_tomadas_incidencia'){
                                if(data_incidence_update.acciones_tomadas_incidencia.length>0){
                                    for (let d of data_incidence_update.acciones_tomadas_incidencia){
                                        selectedIncidencia.acciones_tomadas_incidencia.unshift(d)
                                    }
                                }
                            }else{
                                selectedIncidencia[key]= data_incidence_update[key]
                            }
                        }
                        tables["tableIncidencias"].setData(dataTableIncidencias);
                        $("#editIncidentModal").modal('hide')
                        $("#buttonEditarIncidencia").show();
                        $("#loadingButtonEditarIncidencia").hide();
                    }
                       
                }else{
                    errorAlert(res)
                    $("#buttonEditarIncidencia").show();
                    $("#loadingButtonEditarIncidencia").hide();
                }
            });       
        }
    }
}




function getDataGrupoRepetitivo(divPadre,inputsHijos , cantidadInputs){
    let divP = document.getElementById(divPadre);
    let inputs = divP.querySelectorAll(inputsHijos);
    let array=[]
    for (let i = 0; i < inputs.length; i += cantidadInputs) { // Incrementar de dos en dos
        const datoInput1 = inputs[i].value; // Input
        const dataInput2 = inputs[i + 1].value; // Select
        let objTemporal={}
        if (datoInput1 && dataInput2) { // Verificar que el input no esté vacío
            if(inputsHijos=='.persona-div-nuevo'|| inputsHijos=='.persona-div-editar'){
                objTemporal.nombre_completo= datoInput1;
                objTemporal.tipo_persona= dataInput2;
            }else if(inputsHijos=='.dano-div-nuevo' ||inputsHijos=='.dano-div-editar'){
                objTemporal.responsable_accion= datoInput1;
                objTemporal.acciones_tomadas= dataInput2;
            }
            array.push(objTemporal); // Agregar el objeto al array
        }
    }
    return array
}

//FUNCION crear nueva incidencia y validar la informacion
function nuevaIncidencia(){
    $("#loadingButtonAgregarIncidencia").show();
    $("#buttonAgregarIncidencia").hide();

    let personas= getDataGrupoRepetitivo('persona-input-form-nuevo','.persona-div-nuevo' , 2)
    let acciones= getDataGrupoRepetitivo('dano-input-form-nuevo','.dano-div-nuevo' , 2)
    arrayResponses = arrayResponses.filter(obj => !obj.hasOwnProperty('error'));
    for(let obj of arrayResponses){
        if( obj.hasOwnProperty('file_name') && obj.isImage==true){
            let { isImage, file_name, file  } = obj;
            arraySuccessFoto.push({file_name: file_name, file_url: file});
        } else if( obj.hasOwnProperty('file_name') && obj.isImage==false){
            let { isImage, file_name, file } = obj;
            arraySuccessArchivo.push({file_name: file_name, file_url: file});
        }
    }
    let data = getInputsValueByClass("contentNuevoIncidencia")
    let data_incidence ={
        'reporta_incidencia': data.reportaNuevoIncidencia,
        'fecha_hora_incidencia':formatDateToService(data.fechaHoraNuevoIncidencia)+':00',
        'ubicacion_incidencia': data.ubicacionNuevoIncidencia,
        'area_incidencia': data.areaNuevoIncidencia,
        'incidencia': data.incidenciaNuevoIncidencia,
        'comentario_incidencia': data.comentarioNuevoIncidencia,
        'tipo_dano_incidencia': [data.tipoDanoNuevoIncidencia],
        'dano_incidencia':data.danoNuevoIncidencia,
        'personas_involucradas_incidencia':personas,
        'acciones_tomadas_incidencia':acciones,
        'evidencia_incidencia':arraySuccessFoto,
        'documento_incidencia':arraySuccessArchivo,
        'prioridad_incidencia':data.importanciaNuevoIncidencia,
        'notificacion_incidencia':data.notificacionNuevoIncidencia,
        'total_deposito_incidencia':data.totalDepositoNuevoIncidencia,
        'datos_deposito_incidencia': [{'tipo_deposito': data.tipoDepositoNuevoIncidencia, 'cantidad': data.cantidadNuevoIncidencia}]
    };

    console.log("DATA INCIDENCIA", data_incidence)
    let noOptional = (({ acciones_tomadas_incidencia, personas_involucradas_incidencia, documento_incidencia, evidencia_incidencia, reporta_incidencia,
        tipo_dano_incidencia, total_deposito_incidencia, datos_deposito_incidencia,view,check,...rest }) => rest)(data_incidence);
    console.log("NO OPCIONAL", noOptional)
    if(!validarObjeto(noOptional)){
        Swal.fire({
            title: "Validación",
            text: "Faltan campos por llenar, los campos marcados con asterisco son obligatorios.",
            type: "warning"
        });
        $("#loadingButtonAgregarIncidencia").hide();
        $("#buttonAgregarIncidencia").show();
    } else {
        let go=false
        if(data.incidenciaNuevoIncidencia =='Deposito'){
            if(tienePropiedadesVacias({vacio:data.notificacionNuevoIncidencia}) || tienePropiedadesVacias(data.totalDepositoNuevoIncidencia)){
                errorAlert("Faltan datos por llenar", 'Validación', 'warning')
            }else{
                go=true
            }
        }else {
            go=true
            delete data_incidence.total_deposito_incidencia;
            delete data_incidence.datos_deposito_incidencia;
        }
        if (go){
            fetch(url + urlScripts, {
                method: 'POST',
                body: JSON.stringify({
                    script_name: "incidencias.py",
                    option:"nueva_incidencia",
                    data_incidence: data_incidence
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
                    let data=res.response.data
                    if(data.status_code==400 || data.status_code==401){
                        let errores=[]
                        for(let err in data.json){
                            errores.push(data.json[err].label+': '+data.json[err].msg)
                        }
                        Swal.fire({
                            title: "Error",
                            text: errores.flat(),
                            type: "error"
                        });
                        $("#loadingButtonAgregarIncidencia").hide();
                        $("#buttonAgregarIncidencia").show();
                    }else if(data.status_code==202 || data.status_code==201){
                        successMsg("Confirmación", "Nueva incidencia creada correctamente.")
                        if(data_incidence.ubicacion_incidencia == selectLocation.value){
                            //Solo lo agrega a la tabla si estan en la misma ubicacion y caseta, en case de no seleccionar caseta
                            // y tener la misma ubicacion la agrega
                            if((selectCaseta.value !== "" && data_incidence.area_incidencia == selectCaseta.value) || (selectCaseta.value == "" )){
                                data_incidence.folio= data.json.folio ? data.json.folio :''
                                dataTableIncidencias.unshift(data_incidence);
                            }
                        }
                        tables["tableIncidencias"].setData(dataTableIncidencias);
                        $("#loadingButtonAgregarIncidencia").hide();
                        $("#buttonAgregarIncidencia").show();
                        $("#newIncidentModal").modal('hide');
                    }
                }else{
                     errorAlert(res)
                    $("#loadingButtonAgregarIncidencia").hide();
                    $("#buttonAgregarIncidencia").show();
                }
            });
        }
    }
}

//FUNCION crear nueva incidencia y validar la informacion
function nuevaFalla(){
    $("#loadingButtonAgregarFalla").show();
    $("#buttonAgregarFalla").hide();

    arrayResponses = arrayResponses.filter(obj => !obj.hasOwnProperty('error'));
    for(let obj of arrayResponses){
        if( obj.hasOwnProperty('file_name') && obj.isImage==true){
            let { isImage, file_name, file  } = obj;
            arraySuccessFoto.push({file_name: file_name, file_url: file});
        } else if( obj.hasOwnProperty('file_name') && obj.isImage==false){
            let { isImage, file_name, file } = obj;
            arraySuccessArchivo.push({file_name: file_name, file_url: file});
        }
    }
    let data = getInputsValueByClass("contentNuevoFalla")
    let fecha1= data.fechaNuevoFalla+' '+data.horaNuevoFalla+':'+data.minNuevoFalla+":00"
    let data_failure={
        'falla_estatus': statusFallaAbierto.toLowerCase(),
        'falla_fecha_hora': fecha1,
        'falla_reporta_nombre': data.reportaNuevoFalla,
        'falla_ubicacion': data.ubicacionNuevoFalla,
        'falla_caseta':data.areaNuevoFalla,
        'falla':data.fallaNuevoFalla,
        'falla_objeto_afectado':data.objetoAfectadoNuevoFalla,
        'falla_comentarios':data.comentariosNuevoFalla,
        'falla_evidencia':arraySuccessFoto,
        'falla_documento':arraySuccessArchivo,
        'falla_responsable_solucionar_nombre':data.responsableNuevoFalla,
    }
    console.log("DATATA PARA ENVIAR", data_failure)
    if(data_failure.falla_estatus ==""|| data_failure.falla_fecha_hora==""|| data_failure.falla_ubicacion ==""
       || data_failure.falla_comentarios ==""|| data_failure.falla_reporta_nombre ==""){
        Swal.fire({
            title: "Validación",
            text: "Faltan campos por llenar, los campos marcados con asterisco son obligatorios.",
            type: "warning"
        });
        $("#loadingButtonAgregarFalla").hide();
        $("#buttonAgregarFalla").show();
    } else { 
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name: "fallas.py",
                option:"new_failure",
                data_failure:data_failure
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
                    $("#loadingButtonAgregarFalla").hide();
                    $("#buttonAgregarFalla").show();
                }else if(data.status_code==202 || data.status_code==201){
                    successMsg("Confirmación", 'Nueva falla creada correctamente')
                    let selectedFalla = {}
                    selectedFalla.folio = data.json.folio
                    for (let key in data_failure){
                        if(key == 'falla_fecha_hora'){
                            let formatDate= data_failure[key].slice(0,-3)
                            data_failure[key]= formatDate
                            selectedFalla[key]=data_failure[key]
                        }else{
                            selectedFalla[key]= data_failure[key]
                        }
                    }
                    dataTableFallas.unshift(selectedFalla)
                    tables["tableFallas"].setData(dataTableFallas);
                    $("#newFailModal").modal('hide')
                    $("#loadingButtonAgregarFalla").hide();
                    $("#buttonAgregarFalla").show();
                }
            }else{
                errorAlert(res)
                $("#loadingButtonAgregarFalla").hide();
                $("#buttonAgregarFalla").show();
            }
        });
   }
}

//FUNCION editar y validar la informacion al editar un falla
function editarFalla(){
    $("#loadingButtonEditarFalla").show();
    $("#buttonEditarFalla").hide();
    let data = getInputsValueByClass("contentEditarFalla")
    let selected=''
    for(d of dataTableFallas){
        if(d.folio == selectedRowFolio)
            selected = d
    }

    for(let obj of arrayResponses){
        if( obj.hasOwnProperty('file_name') && obj.isImage==true){
            let { isImage, file_name, file  } = obj;
            arraySuccessFoto.push({file_name: file_name, file_url: file});
        } else if( obj.hasOwnProperty('file_name') && obj.isImage==false){
            let { isImage, file_name, file } = obj;
            arraySuccessArchivo.push({file_name: file_name, file_url: file});
        }
    }
    let fecha1= data.fechaEditarFalla+' '+data.horaEditarFalla+':'+data.minEditarFalla+":00"
    let data_failure_update={
        'falla_estatus': statusFallaAbierto.toLowerCase(),
        'falla_fecha_hora': fecha1,
        'falla_reporta_nombre': data.reportaEditarFalla,
        'falla_ubicacion': data.ubicacionEditarFalla,
        'falla_caseta':data.areaEditarFalla,
        'falla':data.fallaEditarFalla,
        'falla_objeto_afectado':data.objetoAfectadoEditarFalla,
        'falla_comentarios':data.comentariosEditarFalla,
        'falla_evidencia':arraySuccessFoto,
        'falla_documento':arraySuccessArchivo,
        'falla_responsable_solucionar_nombre':data.responsableEditarFalla,
    }

    //let cleanSelected = (({ actions, checkboxColumn, folio,...rest }) => rest)(selected);
    //console.log("LALALALALA",cleanSelected, data_failure_update)
    //let validateObj = encontrarCambios(cleanSelected,data_failure_update)
    if(data_failure_update.falla_estatus ==""|| data_failure_update.falla_fecha_hora==""|| data_failure_update.falla_ubicacion ==""
       || data_failure_update.falla_comentarios ==""|| data_failure_update.falla_reporta_nombre ==""){
        Swal.fire({
            title: "Validación",
            text: "Faltan campos por llenar, los campos marcados con asterisco son obligatorios.",
            type: "warning"
        });
        $("#loadingButtonEditarFalla").hide();
        $("#buttonEditarFalla").show();
    } else {
        if(data_failure_update.falla_evidencia.length==0){
            delete data_failure_update.falla_evidencia
        }
        if(data_failure_update.falla_documento.length==0){
            delete data_failure_update.falla_documento
        }
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name: "fallas.py",
                option:"update_failure",
                data_failure_update: data_failure_update,
                folio:selected.folio
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
                    $("#loadingButtonEditarFalla").hide();
                    $("#buttonEditarFalla").show();
                }else if(data.status_code==202 || data.status_code==201){
                    successMsg('Confirmación', 'Falla editada correctamente.')
                    let selectedFalla = dataTableFallas.find(x => x.folio === selected.folio);
                    for (let key in data_failure_update){
                        if(key=='falla_fecha_hora'){
                            let formatDate= data_failure_update[key].slice(0,-3)
                            selectedFalla[key]= formatDate
                        }else if(key=='falla_evidencia'){
                            if(data_failure_update.falla_evidencia.length>0){
                                for (let d of data_failure_update.falla_evidencia){
                                    selectedFalla.falla_evidencia.unshift(d)
                                }
                            }
                        }else if(key=='falla_evidencia_solucion'){
                            if(data_failure_update.falla_evidencia_solucion.length>0){
                                for (let d of data_failure_update.falla_evidencia_solucion){
                                    selectedFalla.falla_evidencia_solucion.unshift(d)
                                }
                            }
                        }else if(key=='falla_documento'){
                            if(data_failure_update.falla_documento.length>0){
                                for (let d of data_failure_update.falla_documento){
                                    selectedFalla.falla_documento.unshift(d)
                                }
                            }
                        }else if(key=='falla_documento_solucion'){
                            if(data_failure_update.falla_documento_solucion.length>0){
                                for (let d of data_failure_update.falla_documento_solucion){
                                    selectedFalla.falla_documento_solucion.unshift(d)
                                }
                            }
                        }else{
                            selectedFalla[key]= data_failure_update[key]
                        }
                    }
                    tables["tableFallas"].setData(dataTableFallas);
                    $("#editFailModal").modal('hide')
                    $("#loadingButtonEditarFalla").hide();
                    $("#buttonEditarFalla").show();
                }
            }else{
                errorAlert(res)
                $("#loadingButtonEditarFalla").hide();
                $("#buttonEditarFalla").show();
            }
        });
    }
}


function funcionSeguimientoFalla(){
    $("#loadingButtonSeguimientoFalla").show();
    $("#buttonSeguimientoFalla").hide();
    let data = getInputsValueByClass("seguimientoFalla")
    let selected=''
    for(d of dataTableFallas){
        if(d.folio == selectedRowFolio)
            selected = d
    }
    for(let obj of arrayResponses){
        if( obj.hasOwnProperty('file_name') && obj.isImage==true){
            let { isImage, file_name, file  } = obj;
            arraySuccessFoto.push({file_name: file_name, file_url: file});
        } else if( obj.hasOwnProperty('file_name') && obj.isImage==false){
            let { isImage, file_name, file } = obj;
            arraySuccessArchivo.push({file_name: file_name, file_url: file});
        }
    }
    let data_failure_update={
        'falla_estatus': statusFallaResuelto.toLowerCase(),
        'falla_folio_accion_correctiva': data.folioAccionSeguimientoFalla,
        'falla_comentario_solucion': data.comentarioSeguimientoFalla,
        'falla_evidencia_solucion': arraySuccessFoto,
        'falla_documento_solucion': arraySuccessArchivo
    }
    if(data_failure_update.falla_evidencia_solucion.length==0){
        delete data_failure_update.falla_evidencia_solucion
    }
    if(data_failure_update.falla_documento_solucion.length==0){
        delete data_failure_update.falla_documento_solucion
    }
    console.log("DATAA",data_failure_update, selected.folio)
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: "fallas.py",
            option:"update_failure",
            data_failure_update: data_failure_update,
            folio:selected.folio
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
                $("#loadingButtonSeguimientoFalla").hide();
                $("#buttonSeguimientoFalla").show();
            }else if(data.status_code==202 || data.status_code==201){
                successMsg('Confirmación', 'Falla resulta correctamente.')
                console.log("FALLA", selected.folio)
                let selectedFalla = dataTableFallas.find(x => x.folio === selected.folio);
                let formatDate= data.json.falla_fecha_hora_solucion.slice(0,-3)
                selectedFalla.falla_fecha_hora_solucion= formatDate
                for (let key in data_failure_update){
                    if(key=='falla_evidencia_solucion'){
                        selectedFalla.falla_evidencia_solucion=[]
                        if(data_failure_update.falla_evidencia_solucion.length>0){
                            for (let d of data_failure_update.falla_evidencia_solucion){
                                console.log("FALLAS EVIDENCIA SOL")
                                selectedFalla.falla_evidencia_solucion.unshift(d)
                            }
                        }
                    }else if(key=='falla_documento_solucion'){
                        selectedFalla.falla_documento_solucion=[]
                        if(data_failure_update.falla_documento_solucion.length>0){
                            for (let d of data_failure_update.falla_documento_solucion){
                                selectedFalla.falla_documento_solucion.unshift(d)
                            }
                        }
                    }else{
                        selectedFalla[key]= data_failure_update[key]
                    }
                }
                tables["tableFallas"].setData(dataTableFallas);
                $("#cerrarFallaModal").modal('hide')
                $("#loadingButtonSeguimientoFalla").hide();
                $("#buttonSeguimientoFalla").show();
            }
        }else{
            errorAlert(res)
            $("#loadingButtonSeguimientoFalla").hide();
            $("#buttonSeguimientoFalla").show();
        }
    });
}
//FUNCION validar un objeto vacio
function validarObjeto(objeto) {
    return Object.values(objeto).every(valor => valor !== undefined && valor !== null && valor !== '');
}


//FUNCION obtener todos los inputs
function getInputsValueByClass(classInput){
    let data = {};
    let elements = document.getElementsByClassName(classInput)
    for (let i = 0; i < elements.length; i++) {
        let id = elements[i].id;
        let value = elements[i].value;
        let type = elements[i].type;
        if(type == 'radio'){
            let valueCheck = elements[i].checked;
            if(valueCheck){
                data[id] = value || "";
            }
        }else{
            data[id] = value|| "";
        }
    }
    return data
}


//FUNCION cerrar una falla de de forma individual desde la tabla 
function alertCerrarFalla(status){
}


//FUNCION ver una falla
function alertViewFalla(folio, fecha, ubicacion, area, falla, comentarios, guardiaReporta, guardiaResponsable){
       Swal.fire({
        title: "Falla",
        text: "Escoje una caseta para continuar...",
        html: ` 
            <table class='table table-borderless customShadow ' style=' font-size: .8em; background-color: lightgray !important;'>
                <tbody> 
                    <tr> <td><b>Fecha y hora:</b></td> <td> <span > `+ fecha +`</span></td> </tr>
                    <tr> <td><b>Ubicación:</b></td> <td> <span >`+ubicacion+`</span></td> </tr>
                    <tr> <td><b>Lugar del Incidente:</b></td> <td> <span > `+ area+` </span></td> </tr> 
                    <tr> <td><b>Falla:</b></td> <td> <span > `+ falla+`</span></td> </tr> 
                    <tr> <td><b>Comentarios:</b></td> <td> <span> `+comentarios+`</span> </tr>
                </tbody> 
            </table>
            <h5>Información del personal involucrado</h5>
            <table class='table table-borderless customShadow ' style=' font-size: .8em; background-color: lightgray !important;'>
                <tbody> 
                    <tr> <td><b>Reporta:</b></td> <td> <span>`+ guardiaReporta +`</span> </tr>
                     <tr> <td><b>Responsable:</b></td> <td> <span>`+ guardiaResponsable +`</span> </tr>
                </tbody> 
            </table>
            `,
            showCancelButton: true,
            showConfirmButton:false,
            cancelButtonColor: colors[0],
            cancelButtonText: "Cerrar",
            confirmButtonColor: colors[1],
            confirmButtonText: "Si",
            heightAuto:false,
            reverseButtons: true
    })
    .then((result) => {
        if (result.isConfirmed) {        
        }
    });
}


//FUNCION ver incidente
function alertViewIncident(folio, fecha, ubicacion, area, incidente, comentarios, guardiaReporta){
    Swal.fire({
        title: "Incidencia",
        text: "Escoje una caseta para continuar...",
        html: ` 
            <table class='table table-borderless customShadow ' style=' font-size: .8em; background-color: lightgray !important;'>
                <tbody> 
                    <tr> <td><b>Fecha:</b></td> <td> <span > `+ fecha +`</span></td> </tr>
                    <tr> <td><b>Lugar del Incidente:</b></td> <td> <span > `+ area+` </span></td> </tr> 
                    <tr> <td><b>Ubicación:</b></td> <td> <span >`+ubicacion+`</span></td> </tr>
                    <tr> <td><b>Incidente:</b></td> <td> <span > `+ incidente+`</span></td> </tr> 
                    <tr> <td><b>Comentarios:</b></td> <td> <span> `+comentarios+`</span> </tr>
                </tbody> 
            </table>
            <h5>Información del personal involucrado</h5>
            <table class='table table-borderless customShadow ' style=' font-size: .8em; background-color: lightgray !important;'>
                <tbody> 
                    <tr> <td><b>Reporta:</b></td> <td> <span>`+ guardiaReporta +`</span> </tr>
                </tbody> 
            </table>
            `,
            showCancelButton: true,
            showConfirmButton:false,
            cancelButtonColor: colors[0],
            cancelButtonText: "Cerrar",
            confirmButtonColor: colors[1],
            confirmButtonText: "Si",
            heightAuto:false,
            reverseButtons: true
    })
    .then((result) => {
        if (result.isConfirmed) {        
        }
    });
}


//FUNCION aplicar los filtros
function aplicarFiltros(){
    $('#notasFiltersModal').modal('hide');
    let columnas= $("#idFiltrosColumna").val()
    let tipo= $("#idFiltrosTipo").val()
    let valor= $("#idFiltrosValor").val();
    /*
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: 'turnos',
            option: "apply_filters",
            columnas,
            tipo,
            valor,
            id: 2,
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
    }) */

    Swal.fire({
        title: "Confirmación",
        text: "Filtros aplicados correctamente.",
        type: "success"
    });
    let selectTipo= document.getElementById("idFiltrosTipo")
    selectTipo.value=""
}


//FUNCION rellenar los catalogos de los filtros
function modalFiltros(table,modal){
    $('#'+ modal).modal('show');
    let columnas = tables[table].getColumns();
    let nombresColumnas = columnas.map(function(columna) {
        return columna.getField(); // getField() retorna el nombre del campo o field
    });
    let selectTipo= document.getElementById("idFiltrosTipo")
    let selectColumna= document.getElementById("idFiltrosColumna")
    selectColumna.innerHTML=""; 
    for (let col of nombresColumnas){
            selectColumna.innerHTML += '<option value="'+col+'">'+col+'</option>';
    }
    selectColumna.value=""
    selectTipo.value=""
}

//FUNCION para guardar los archivos en el server 
async function guardarArchivos(id, isImage){
    loadingService()
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

//FUNCION para agregar foto en el modal de agregar nota
function setAddPersona(editAdd ="nueva"){
    let randomID = Date.now();
    let newItem=`
        <div class="d-flex mb-3 div-persona-`+editAdd+`-`+randomID+`" id="div-persona-`+randomID+`">
            <div class="flex-grow-1">
                <label class="form-label">Personas Involucradas: </label>
                <input type="text" class="form-control persona-div-`+editAdd+` mb-2" 
                id="repPersona`+editAdd+`Incidencia-`+randomID+`" placeholder="Nombre completo">
                    <select class="form-select persona-div-`+editAdd+`" id="repTipoDano`+editAdd+`Incidencia-`+randomID+`">
                        <option value="afectado">Afectado</option>
                        <option value="testigo">Testigo</option>
                    </select>
            </div>
            <div>
                <button type="button" class="btn btn-danger button-delete-register"  onclick="setDeletePersona('`+editAdd+`',`+randomID+`);return false;">
                    <i class="fa-solid fa-minus"></i>
                </button>
            </div>
        </div>
    `;
    $('#persona-input-form-'+editAdd).append(newItem) 
}


//FUNCION para elimar foto en el modal de agregar nota
function setDeletePersona(editAdd ="nuevo",id){
    const elements = document.querySelectorAll('.persona-div-'+editAdd);
    const count = elements.length;
    if(count > 1){
        const elements = document.getElementsByClassName('div-persona-'+editAdd+'-'+id);
        while(elements.length > 0 && id !==123){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}

//FUNCION para agregar foto en el modal de agregar nota
function setAddDaño(editAdd ="nueva"){
    let randomID = Date.now();
    let newItem=`
        <div class="d-flex mb-3 div-dano-`+editAdd+`-`+randomID+`" id="div-dano-`+randomID+`">
            <div class="flex-grow-1">
                <label class="form-label">Acciones Tomadas: </label>
                <input type="text" class="form-control dano-div-`+editAdd+` mb-2" 
                id="repResponsable`+editAdd+`Incidencia-`+randomID+`" placeholder="Responsable de la accion">
                <textarea class="form-control dano-div-`+editAdd+`" rows="2" id="repAccion`+editAdd+`Incidencia-`+randomID+`" placeholder="Acciones tomadas"></textarea>
            </div>
            <div>
                <button type="button" class="btn btn-danger button-delete-register"  onclick="setDeleteDaño('`+editAdd+`',`+randomID+`);return false;">
                    <i class="fa-solid fa-minus"></i>
                </button>
            </div>
        </div>

    `;
    $('#dano-input-form-'+editAdd).append(newItem) 
}


//FUNCION para elimar foto en el modal de agregar nota
function setDeleteDaño(editAdd ="nuevo",id){
    const elements = document.querySelectorAll('.dano-div-'+editAdd);
    const count = elements.length;
    if(count > 1){
        const elements = document.getElementsByClassName('div-dano-'+editAdd+'-'+id);
        while(elements.length > 0 && id !==123){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}


//FUNCION para agregar foto en el modal de agregar nota
function setAddFoto(editAdd ="nuevo", classNam){
    let randomID = Date.now();
    let newItem=`
        <div class="d-flex mb-3 col-12  div-`+classNam+`-`+editAdd+`-`+randomID+`" id="id-`+classNam+`-div-`+randomID+`">
            <div class="flex-grow-1">
                <label class="form-label">Evidencia:  </label>
                <input type="file" class="form-control-file `+classNam+`-div-`+editAdd+`" 
                onchange="guardarArchivos('`+classNam+`-`+editAdd+`-`+randomID+`', true);" 
                id="`+classNam+`-`+editAdd+`-`+randomID+`">
            </div>
            <div>
                <button type="button" class="btn btn-danger button-delete-register"  onclick="setDeleteFoto('`+editAdd+`',`+randomID+`,'`+classNam+`');return false;">
                   <i class="fa-solid fa-minus"></i>
                </button>
            </div>
        </div>
    `;
    $(`#`+classNam+`-input-form-`+editAdd).append(newItem) 
}


//FUNCION para elimar foto en el modal de agregar nota
function setDeleteFoto(editAdd ="nuevo", id, classNam){
    const elements = document.querySelectorAll(`.`+classNam+`-div-`+editAdd);
    const count = elements.length;
    if(count > 1){
        const elements = document.getElementsByClassName(`div-`+classNam+`-`+editAdd+`-`+id);
        while(elements.length > 0 && id !==123){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}

//FUNCION para eliminar archivo en el modal de agregar nota
function setAddArchivo(editAdd ="nueva", classNam){
    console.log("editAdd",editAdd,classNam)
    let randomID = Date.now();
    let newItem=`
        <div class="d-flex mb-3 col-12 div-`+classNam+`-`+editAdd+`-`+randomID+`" id="id-`+classNam+`-div-`+randomID+`">
            <div class="flex-grow-1">
                <label class="form-label">Documento:  </label>
                <input type="file" class="form-control-file `+classNam+`-div-`+editAdd+`" 
                onchange="guardarArchivos('`+classNam+`-`+editAdd+`-`+randomID+`', false);" 
                id="`+classNam+`-`+editAdd+`-`+randomID+`">
            </div>
            <div>
                <button type="button" class="btn btn-danger button-delete-register"  onclick="setDeleteArchivo('`+editAdd+`',`+randomID+`, '`+classNam+`');return false;">
                    <i class="fa-solid fa-minus"></i>
                </button>
            </div>
        </div>
    `;
    $(`#`+classNam+`-input-form-`+editAdd).append(newItem);
}


//FUNCION para agregar archivo en el modal de agregar nota
function setDeleteArchivo(editAdd ="nuevo", id , classNam){
    const elements = document.querySelectorAll(`.`+classNam+`-div-`+editAdd);
    const count = elements.length;
    if(count > 1){
        const elements = document.getElementsByClassName(`div-`+classNam+`-`+editAdd+`-`+id);
        while(elements.length > 0 && id !==123){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}

