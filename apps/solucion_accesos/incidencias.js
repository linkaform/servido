let colors = getPAlleteColors(12,0)
let dataCatalogs= {}
let scriptName="accesos_turnos.py"
let selectedRowFolio=""
let selectedIncidencias=[]
let selectedFallas=[]
let userJwt=''
window.onload = function(){
	user= getCookie("userId");
	userJwt = getCookie("userJwt");
    
	setValueUserLocation('incidencias');
    customNavbar(getValueUserLocation(), getCookie('userTurn'))
    getAllDataIncidencias();

    getAllDataFallas();
	changeButtonColor();

    fillCatalogs();
    getInfoAndCatalogos();

	selectLocation= document.getElementById("selectLocation")
	selectLocation.onchange = function() {
        let response = fetchOnChangeLocation()
    };
    selectCaseta= document.getElementById("selectCaseta")
    selectCaseta.onchange = function() {
        let response = fetchOnChangeLocation()
    };
	setSpinner(true, 'divSpinner');
	/*
    if(arrayUserBoothsLocations.length<=0){
        loadBoothsLocations();
    }*/
}

//FUNCION para limpiar el modal de agregar nota
function limpiarModal(classInput){
    let elements = document.getElementsByClassName(classInput)
    console.log("ELEMENTOSSS",elements)
    for (let i = 0; i < elements.length; i++) {
        console.log("ELEMENTOSSS",elements[i])
        elements[i].value='';
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
    console.log( url + urlScripts)
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
                            let dateFormat= incidencia.date_incidence.slice(0,-3)
                            dataTableIncidencias.push({folio:incidencia.folio, date_incidence:dateFormat||"",
                                ubicacion_incidence:incidencia.ubicacion_incidence||"", area_incidence:incidencia.area_incidence||"", 
                                incidence:incidencia.incidence||"",comments_incidence:incidencia.comments_incidence||"",guard_incident:incidencia.guard_incident||""})
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
            locacion: getCookie('userLocation'),
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
                    let fallas= res.response.data
                    console.log("listado de fallas", fallas)
                    if(fallas.length >0){
                        for(let falla of fallas){
                            let dateFormat= falla.falla_fecha.slice(0,-3)
                            dataTableFallas.push({folio:falla.folio, falla_fecha:dateFormat,
                                falla_ubicacion:falla.falla_ubicacion, falla_area:falla.falla_area, 
                                falla:falla.falla, falla_comments:falla.falla_comments, 
                                falla_guard:falla.falla_guard, falla_guard_solution:falla.falla_guard_solution, 
                                falla_status:falla.falla_status})
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


//FUNCION al momento de cambiar la caseta o la locacion para traer el resto de informacion sobre la caseta
function fetchOnChangeLocation(){
    //INFO: al momento de seleccionar una nueva location se manda la informacion junto con el 
    //resultado de la fetch a la pagina que lo esta solicitando
    let selectLocation= document.getElementById("selectLocation")
    let selectCaseta= document.getElementById("selectCaseta")
    let response={ 
        "data":{
            "caseta":{
                "name": selectLocation.value,
                "location": selectCaseta.value,
                "visitsDay":15,
                "personalInside":75,
                "vehiclesInside":25,
                "ouputs":30
            }
        }
    };

    //FETCH AQUI 
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_id: idScript,
            option: 'get_caseta_information',
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
            //INFO: Obtener la informacion y formatear los arrays para poder mandarlos como respuesta de esta funcion
        } 
    });
    return response
}


//FUNCION traer toda la informacion de los inicial y la de los catalogos
function getInfoAndCatalogos(){
    //INFO: poner aqui FETCH para traer los catalogos y lo sig agregarlo dentro del response
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

            dataCatalogs={
                "location":["Cumbres", "Monterrey", "San Jeronimo"],
                "incident_location":["Caseta 1 Poniente","Caseta 2 Sur","Caseta 3 Poniente"],
                "incident":["Acceso no autorizado", "Fallo de energia", "Incidencia 3"],
                "report":["Jacinto Sánchez Hil", "Jacinto Sánchez Hil"],
                "department":["Seguridad","Departamento 2","Departamento 3"],
                "responsable":["Jacinto Sánchez Hil","Jacinto Sánchez Hil"]
            }
            initializeCatalogsIncidencias(dataCatalogs, arrayUserBoothsLocations)
            initializeCatalogsFallas(dataCatalogs,arrayUserBoothsLocations)
            dataCatalogs.location.forEach(function(e, i){
                $("#idUbicacionIncidencias").append($('<option></option>').val(e).text(e));
                $("#idUbicacionFallas").append($('<option></option>').val(e).text(e))
                $("#idUbicacionIncidencias").val("")
                $("#idUbicacionFallas").val("")
            });
        }
    });   
}


//FUNCION una vez traida la informacion llenar todos los catalogso correspondientes
function initializeCatalogsIncidencias(dataCatalogs,boothsLocations){
    console.log("DAWAW",dataCatalogs)
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


//FUNCION para mostrar los modales
function setModal(type = 'none',id){
	if(type == 'NewIncident'){
        limpiarModal("contentNuevaIncidencia")
		$('#newIncidentModal').modal('show');
	}else if(type == 'EditIncident'){
		$('#editIncidentModal').modal('show');
	}else if(type == 'ViewIncident'){
		$('#viewIncidentModal').modal('show');
	}else if(type == 'NewFail'){
		$('#newFailModal').modal('show');
	}else if(type == 'EditFail'){
		$('#editFailModal').modal('show');
	}else if(type == 'ViewFail'){
		$('#viewFailModal').modal('show');
	}else if(type == 'SuccessFail'){
		$('#successResolveFailModal').modal('show');
	}else if(type == 'filtros'){
        modalFiltros('tableIncidencias','incidenciasFiltersModal')
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
                            console.log(dataFiltered)
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
                selectedFallas= getActiveCheckBoxs(tables, 'tableFallas')
                let ids=[]
                for (d of selectedFallas){
                    ids.push(d.folio)
                }
                dataTableFallas = dataTableFallas.filter(function(objeto) {
                    return !ids.includes(objeto.folio); // Retorna verdadero para mantener el objeto, falso para eliminarlo
                });
                tables["tableFallas"].setData(dataTableFallas);
            }else{
                selectedIncidencias= getActiveCheckBoxs(tables, 'tableIncidencias')
                let ids=[]
                for (d of selectedIncidencias){
                    ids.push(d.folio)
                }
                dataTableIncidencias = dataTableIncidencias.filter(function(objeto) {
                    return !ids.includes(objeto.folio); // Retorna verdadero para mantener el objeto, falso para eliminarlo
                });
                tables["tableIncidencias"].setData(dataTableIncidencias);
            }
            
        }
    });
}


//FUNCION para cerrar un fallla de manera individual desde la tabla
function alertFallaResuelta(folio, state){
    if(state== statusAbierto){
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
                            if(user !='' && jw!=''){
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


//FUNCION editar y validar la informacion al editar un incidencia
function editarIncidencia(){
    $("#buttonEditarIncidencia").hide();
    $("#loadingButtonEditarIncidencia").show();
    let data = getInputsValueByClass("contentEditIncidencia")

    let selected=''
    for(d of dataTableIncidencias){
        if(d.folio == selectedRowFolio)
            selected = d
    }
    
    let cleanSelected = (({ actions, checkboxColumn, folio,...rest }) => rest)(selected);
    let partes=cleanSelected.date_incidence.split(" ")
    let date = partes[0]+'T'+partes[1]
    cleanSelected.date_incidence= date

    let data_incidence_update={
        area_incidence: data.lugarEditIncidencia,
        comments_incidence: data.comentariosEditIncidencia,
        date_incidence: data.dateEditIncidencia,
        incidence: data.incidenciaEditIncidencia,
        ubicacion_incidence: data.ubicacionEditIncidencia,
        guard_incident: data.guardEditIncidencia
    }

    let validateObj = encontrarCambios(cleanSelected,data_incidence_update)
    if(Object.keys(validateObj).length == 0){
        Swal.fire({
            title: "Validación",
            text: "Edita algo para actualizar la información.",
            type: "warning"
        });
    } else {
        if(validateObj.hasOwnProperty('date_incidence')){
            let formatValue= validateObj.date_incidence.split('T')
            validateObj.date_incidence=formatValue[0]+' '+formatValue[1]+':00'
        }
        //validateObj.ubicacion_incidence=233
        console.log("ESTA ES LA FECHA",validateObj)
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
                    let errores=[]
                    for(let err in data.json){
                        console.log("ERORREEE",err)
                        errores.push(data.json[err].label+': '+data.json[err].msg)
                    }
                    Swal.fire({
                        title: "Error",
                        text: errores.flat(),
                        type: "error"
                    });
                }else if(data.status_code==202 && data.json.objects[0][selected.folio].success){
                     Swal.fire({
                        title: "Confirmación",
                        text: "Incidencia actualizada correctamente.",
                        type: "success"
                    });
                    let selectedIncidencia = dataTableIncidencias.find(x => x.folio === selected.folio);
                    for (let key in validateObj){
                        if(key=='date_incidence'){
                            let formatDate= validateObj[key].slice(0,-3)
                            validateObj[key]= formatDate
                        }
                        selectedIncidencia[key]= validateObj[key]
                    }
                    tables["tableIncidencias"].setData(dataTableIncidencias);
                    $("#editIncidentModal").modal('hide')
                    $("#buttonEditarIncidencia").show();
                    $("#loadingButtonEditarIncidencia").hide();
                }
                   
            }else{
                Swal.fire({
                    title: "Error",
                    text: res.error,
                    type: "Error"
                });
                $("#buttonEditarIncidencia").show();
                $("#loadingButtonEditarIncidencia").hide();
            }
        });

        
        
    }
}


//FUNCION editar y validar la informacion al editar un falla
function editarFalla(){
    $("#loadingButtonEditarFalla").show();
    $("#buttonEditarFalla").hide();
    let data = getInputsValueByClass("contentEditFalla")

    let selected=''
    for(d of dataTableFallas){
        if(d.folio == selectedRowFolio)
            selected = d
    }
    let data_failure_update={
        'falla_status':data.estatusEditFalla,
        'falla_fecha':data.fechaEditFalla+':00',
        'falla_ubicacion':data.ubicacionEditFalla,
        'falla_area':data.lugarEditFalla,
        'falla':data.fallaEditFalla,
        'falla_comments':data.comentariosEditFalla,
        'falla_guard':data.reportaEditFalla,
        'falla_guard_solution':data.responsableEditFalla,
        'falla_fecha_solucion':data.fechaResolucionEditFalla+':00',
    }

    let cleanSelected = (({ actions, checkboxColumn, folio,...rest }) => rest)(selected);
    if(cleanSelected.falla_fecha){
        let partes=cleanSelected.falla_fecha.split(" ")
        let date = partes[0]+'T'+partes[1]
        cleanSelected.falla_fecha= date
    }
    if(cleanSelected.falla_fecha_solucion){
        let partesS= cleanSelected.falla_fecha_solucion.split(" ")
        let dateS = partesS[0]+'T'+partesS[1]
        cleanSelected.falla_fecha_solucion= dateS
    }
    let validateObj = encontrarCambios(cleanSelected,data_failure_update)
    if(Object.keys(validateObj).length == 0){
        Swal.fire({
            title: "Validación",
            text: "Edita algo para actualizar la información.",
            type: "warning"
        });
    } else {
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name: "fallas.py",
                option:"update_failure",
                data_failure_update: validateObj,
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
                    let errores=[]
                    for(let err in data.json){
                        errores.push(data.json[err].label+': '+data.json[err].msg)
                    }
                    Swal.fire({
                        title: "Error",
                        text: errores.flat(),
                        type: "error"
                    });
                    $("#loadingButtonEditarFalla").hide();
                    $("#buttonEditarFalla").show();
                }else if(data.status_code==202 && data.json.objects[0][selected.folio].success){
                    Swal.fire({
                        title: "Confirmación",
                        text: "Falla actualizada correctamente.",
                        type: "success"
                    });
                    let selectedFalla = dataTableFallas.find(x => x.folio === selected.folio);
                    for (let key in validateObj){
                        if(key=='falla_fecha_solucion' || key=='falla_fecha'){
                            let formatDate= validateObj[key].slice(0,-3)
                            validateObj[key]= formatDate
                        }
                        selectedFalla[key]= validateObj[key]
                    }
                    tables["tableFallas"].setData(dataTableFallas);
                    $("#editFailModal").modal('hide')
                    $("#loadingButtonEditarFalla").hide();
                    $("#buttonEditarFalla").show();
                }
            }else{
                Swal.fire({
                    title: "Error",
                    text: res.error,
                    type: "Error"
                });
                $("#loadingButtonEditarFalla").hide();
                $("#buttonEditarFalla").show();
            }
        });
    }
}


//FUNCION crear nueva incidencia y validar la informacion
function nuevaIncidencia(){
    $("#loadingButtonAgregarIncidencia").show();
    $("#buttonAgregarIncidencia").hide();
    let data = getInputsValueByClass("contentNuevaIncidencia")
    let data_incidence ={
        'date_incidence':data.fechaNuevaIncidencia+' '+data.timeNuevaIncidencia+':00',
        'ubicacion_incidence':data.ubicacionNuevaIncidencia,
        'area_incidence':data.lugarNuevaIncidencia,
        'incidence':data.incidenciaNuevaIncidencia,
        'guard_incident':data.reportaNuevaIncidencia,
        'comments_incidence':data.comentariosNuevaIncidencia,
    };

    if(!validarObjeto(data)){
        Swal.fire({
            title: "Validación",
            text: "Faltan campos por llenar, los campos marcados con asterisco son obligatorios.",
            type: "warning"
        });
    } else {
        console.log("data_incidence",data_incidence)
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name: "incidencias.py",
                option:"new_incidence",
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
                if(data.status_code==400){
                    let errores=[]
                    for(let err in data.json){
                        errores.push(data.json[err].label+': '+data.json[err].msg)
                    }
                    console.log(res.response.data.json.msg)
                    Swal.fire({
                        title: "Error",
                        text: errores.flat(),
                        type: "error"
                    });
                    $("#loadingButtonAgregarIncidencia").hide();
                    $("#buttonAgregarIncidencia").show();
                }else if(data.status_code==202 || data.status_code==201){
                    Swal.fire({
                        title: "Confirmación",
                        text: "Incidencia creada correctamente.",
                        type: "success"
                    });
                    
                    let formatDate= data_incidence.date_incidence.slice(0,-3)
                    data_incidence.date_incidence= formatDate
                    dataTableIncidencias = dataTableIncidencias.concat({"comments_incidence": data_incidence.comentariosNuevaIncidencia, 
                        "date_incidence": data_incidence.date_incidence,
                        "folio": data.json.folio, "incidence": data_incidence.incidence, 
                        "ubicacion_incidence": data_incidence.ubicacion_incidence, "area_incidence": data_incidence.area_incidence, 
                        "guard_incident": data_incidence.guard_incident});
                    tables["tableIncidencias"].setData(dataTableIncidencias);
                    $("#newIncidentModal").modal('hide');
                    $("#loadingButtonAgregarIncidencia").hide();
                    $("#buttonAgregarIncidencia").show();
                }
            }else{
                 Swal.fire({
                    title: "Error",
                    text: res.error,
                    type: "error"
                });
                $("#loadingButtonAgregarIncidencia").hide();
                $("#buttonAgregarIncidencia").show();
            }
        });

        
    }
}


//FUNCION crear nueva incidencia y validar la informacion
function nuevaFalla(){
    $("#loadingButtonAgregarFalla").show();
    $("#buttonAgregarFalla").hide();
    let data = getInputsValueByClass("contentNuevaFalla")
    let data_failure={
        'falla_status':data.estatusNuevaFalla,
        'falla_fecha':data.fechaNuevaFalla+':00',
        'falla_ubicacion':data.ubicacionNuevaFalla,
        'falla_area':data.lugarNuevaFalla,
        'falla':data.fallaNuevaFalla,
        'falla_comments':data.comentariosNuevaFalla,
        'falla_guard':data.reportaNuevaFalla,
        'falla_guard_solution':data.responsableNuevaFalla,
        'falla_fecha_solucion':data.fechaResolucionNuevaFalla+':00',
    }

    let partes=data_failure.falla_fecha.split("T")
    let date = partes[0]+' '+partes[1]
    data_failure.falla_fecha= date

    let partes2=data_failure.falla_fecha_solucion.split("T")
    let date2 = partes2[0]+' '+partes2[1]
    data_failure.falla_fecha_solucion= date2

    console.log(validarObjeto(data_failure), data)
    if(!validarObjeto(data_failure)){
        Swal.fire({
            title: "Validación",
            text: "Faltan campos por llenar, los campos marcados con asterisco son obligatorios.",
            type: "warning"
        });
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
            console.log("RESPUESTA PURA", res)
            if (res.success) {
                let data=res.response.data
                if(data.status_code==400){
                    let errores=[]
                    for(let err in data.json){
                        errores.push(data.json[err].label+': '+data.json[err].msg)
                    }
                    console.log(res.response.data.json.msg)
                    Swal.fire({
                        title: "Error",
                        text: errores.flat(),
                        type: "error"
                    });
                }else if(data.status_code==202 || data.status_code==201){
                    let formatDate= data_failure.falla_fecha.slice(0,-3)
                    data_failure.date_incidence= formatDate
                    let formatDate2=data_failure.falla_fecha_solucion.slice(0,-3)
                    data_failure.falla_fecha_solucion= formatDate2

                    Swal.fire({
                        title: "Confirmación",
                        text: "Falla creada correctamente.",
                        type: "success"
                    });
                    dataTableFallas = dataTableFallas.concat({folio: data.json.folio,falla_fecha: data_failure.falla_fecha, 
                        falla_ubicacion: data_failure.falla_ubicacion, falla_area: data_failure.falla_area, falla:data_failure.falla,
                        falla_comments: data_failure.falla_comments, falla_guard: data_failure.reportaNuevaFalla,
                        falla_guard_solution: data_failure.falla_guard_solution,
                        falla_status: data_failure.falla_status});

                    tables["tableFallas"].setData(dataTableFallas);
                    $("#newFailModal").modal('hide')
                    $("#loadingButtonAgregarFalla").hide();
                    $("#buttonAgregarFalla").show();
                }
            }else{
                 Swal.fire({
                    title: "Error",
                    text: res.error,
                    type: "error"
                });
                $("#loadingButtonAgregarFalla").hide();
                $("#buttonAgregarFalla").show();
            }
        });

        
    }
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