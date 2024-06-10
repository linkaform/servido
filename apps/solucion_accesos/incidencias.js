let colors = getPAlleteColors(12,0)
let dataCatalogs= {}
let scriptName="accesos_turnos.py"
let selectedRowFolio=""
let selectedIncidencias=[]
let selectedFallas=[]


window.onload = function(){
	setValueUserLocation('incidencias');
	changeButtonColor();
    getInfoAndCatalogos();
	setValueUserLocation('incidencias');
	selectLocation= document.getElementById("selectLocation")
	selectLocation.onchange = function() {
        let response = fetchOnChangeLocation()
    };
    selectCaseta= document.getElementById("selectCaseta")
    selectCaseta.onchange = function() {
        let response = fetchOnChangeLocation()
    };
	setSpinner(true, 'divSpinner');
	let user = getCookie("userId");
	let jw = getCookie("userJwt");
	if(user !='' && jw!=''){
		drawTable('tableIncidencias', columsData1, dataTable1);
		drawTable('tableFallas', columsData2, dataTable2);
	}else{
		redirectionUrl('login',false)
	}
}



function selectCheckboxIncidencias(folio){
    let checkboxes = document.querySelectorAll('.checkbox-incidencias');
    selectedIncidencias=[]
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            for(d of dataTable1){
                if(parseInt(d.folio) === parseInt(checkbox.value)){
                    selectedIncidencias= selectedIncidencias.concat(d)
                }
            }
        }
    });
} 

function selectCheckboxFallas(folio){
    let checkboxes = document.querySelectorAll('.checkbox-fallas');
    selectedFallas=[]
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            for(d of dataTable2){
                if(parseInt(d.folio) === parseInt(checkbox.value)){
                    selectedFallas = selectedFallas.concat(d)
                }
            }
        }
    });
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
            'Authorization': 'Bearer '+jw
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



function getInfoAndCatalogos(){
    //INFO: poner aqui FETCH para traer los catalogos y lo sig agregarlo dentro del response
     fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: scriptName,
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
        }
    });
    //INFO: los array que estan en el archivo incidencias data se llenaran desde esta fetch

    dataCatalogs={
        "location":["Cumbres", "Monterrey", "San Jeronimo"],
        "incident_location":["Caseta 1 Poniente","Caseta 2 Sur","Caseta 3 Poniente"],
        "incident":["Acceso no autorizado", "Fallo de energia", "Incidencia 3"],
        "report":["Miguel Perez","Manuel Gonzales","Erik Lopez"],
        "department":["Seguridad","Departamento 2","Departamento 3"],
        "responsable":["Jose Patricio","Josue de Jesus","Karina Moreno"]
    }
    initializeCatalogsIncidencias(dataCatalogs)
    initializeCatalogsFallas(dataCatalogs)
    dataCatalogs.location.forEach(function(e, i){
        $("#idUbicacionIncidencias").append($('<option></option>').val(e).text(e));
        $("#idUbicacionFallas").append($('<option></option>').val(e).text(e))
        $("#idUbicacionIncidencias").val("")
        $("#idUbicacionFallas").val("")
    });
}



function initializeCatalogsIncidencias(dataCatalogs){
    dataCatalogs.location.forEach(function(e, i){
        $("#ubicacionEditIncidencia").append($('<option></option>').val(e).text(e));
        $("#ubicacionNuevaIncidencia").append($('<option></option>').val(e).text(e));
        $("#ubicacionNuevaIncidencia").val("")
    });
    dataCatalogs.incident_location.forEach(function(e, i){
        $("#lugarEditIncidencia").append($('<option></option>').val(e).text(e));
        $("#lugarNuevaIncidencia").append($('<option></option>').val(e).text(e));
        $("#lugarNuevaIncidencia").val("")
    });
    dataCatalogs.incident.forEach(function(e, i){
        $("#incidenciaEditIncidencia").append($('<option></option>').val(e).text(e));
        $("#incidenciaNuevaIncidencia").append($('<option></option>').val(e).text(e));
        $("#incidenciaNuevaIncidencia").val("")
    });
    dataCatalogs.report.forEach(function(e, i){
        $("#reportaEditIncidencia").append($('<option></option>').val(e).text(e));
        $("#reportaNuevaIncidencia").append($('<option></option>').val(e).text(e));
        $("#reportaNuevaIncidencia").val("")
    });
    dataCatalogs.department.forEach(function(e, i){
        $("#departamentoEditIncidencia").append($('<option></option>').val(e).text(e));
        $("#departamentoNuevaIncidencia").append($('<option></option>').val(e).text(e));
        $("#departamentoNuevaIncidencia").val("");
    });
}


function initializeCatalogsFallas(dataCatalogs){
    dataCatalogs.location.forEach(function(e, i){
        $("#ubicacionEditFalla").append($('<option></option>').val(e).text(e));
        $("#ubicacionNuevaFalla").append($('<option></option>').val(e).text(e));
        $("#ubicacionNuevaFalla").val("")
    });
    dataCatalogs.incident_location.forEach(function(e, i){
        $("#lugarEditFalla").append($('<option></option>').val(e).text(e));
        $("#lugarNuevaFalla").append($('<option></option>').val(e).text(e));
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
	}
}


//Funcion para modales de vista
function cerrarModal(id){
    $('#'+ id).modal('hide');
}



function alertEliminar(folio, type){
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
            if(type=='fallas'){
                let dataFiltered = dataTable2.filter(x => x.folio !== folio);
                dataTable2 = dataFiltered
                tables["tableFallas"].setData(dataTable2);
            }else{
                let dataFiltered = dataTable1.filter(x => x.folio !== folio);
                dataTable1 = dataFiltered
                tables["tableIncidencias"].setData(dataTable1);
            }
            
        }
    });
}



function alertEliminarCheckbox(type){
    console.log(type)
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
                     console.log("FALALS")
                let ids=[]
                for (d of selectedFallas){
                    ids.push(d.folio)
                }
                dataTable2 = dataTable2.filter(function(objeto) {
                    return !ids.includes(objeto.folio); // Retorna verdadero para mantener el objeto, falso para eliminarlo
                });
                tables["tableFallas"].setData(dataTable2);
            }else{
                console.log("INCIDENCIASD")
                let ids=[]
                for (d of selectedIncidencias){
                    ids.push(d.folio)
                }
                dataTable1 = dataTable1.filter(function(objeto) {
                    return !ids.includes(objeto.folio); // Retorna verdadero para mantener el objeto, falso para eliminarlo
                });
                tables["tableIncidencias"].setData(dataTable1);
            }
            
        }
    });
}



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
                let fallaSelected = dataTable2.find(n => n.folio === folio);
                if (fallaSelected) {
                    fallaSelected.state = "Cerrado";
                    tables["tableFallas"].setData(dataTable2);
                }
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



function editarIncidenciaModal(folio, fecha, hora, ubicacion, lugar, incidente, comentarios, reporta ,departamento){
    $('#editIncidentModal').modal('show');
    selectedRowFolio= folio
    $("#fechaEditIncidencia").val(fecha)
    $("#timeEditIncidencia").val(hora)
    $("#ubicacionEditIncidencia").val(ubicacion)
    $("#lugarEditIncidencia").val(lugar)
    $("#incidenciaEditIncidencia").val(incidente)
    $("#comentariosEditIncidencia").val(comentarios)
    $("#reportaEditIncidencia").val(reporta)
    $("#departamentoEditIncidencia").val(departamento)
}



function editarFallaModal(folio, fecha, hora, ubicacion, lugar, falla, descripcion, comentarios, reporta ,departamento, responsable){
    $('#editFailModal').modal('show');
    selectedRowFolio= folio
    $("#fechaEditFalla").val(fecha)
    $("#timeEditFalla").val(hora)
    $("#ubicacionEditFalla").val(ubicacion)
    $("#lugarEditFalla").val(lugar)
    $("#fallaEditFalla").val(falla)
    $("#descripcionEditFalla").val(descripcion)
    $("#comentariosEditFalla").val(comentarios)
    $("#reportaEditFalla").val(reporta)
    $("#departamentoEditFalla").val(departamento)
    $("#responsableEditFalla").val(responsable)
}



function editarIncidencia(){
    let fecha= $("#fechaEditIncidencia").val()
    let hora= $("#timeEditIncidencia").val()
    let ubicacion= $("#ubicacionEditIncidencia").val()
    let lugar= $("#lugarEditIncidencia").val()
    let incidente= $("#incidenciaEditIncidencia").val()
    let comentarios= $("#comentariosEditIncidencia").val()
    let reporta= $("#reportaEditIncidencia").val()
    let departamento= $("#departamentoEditIncidencia").val()

    let selected=''
    for(d of dataTable1){
        if(d.folio == parseInt(selectedRowFolio))
            selected = d
    }
    console.log(" BEAMOSSS", selected)

    if(selected.date == fecha && selected.time == hora && selected.location == ubicacion &&
        selected.place_accident == lugar && selected.incident == incidente && selected.comment == comentarios &&
        selected.report == reporta && selected.dept == departamento ){
        Swal.fire({
            title: "Validación",
            text: "Edita algo para actualizar la información.",
            type: "warning"
        });
    } else {
        //INFO: Poner FETCH AQUI para enviar los nuevos en caso de que sean diferentes a los existentes
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name: scriptName,
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
                //INFO devolverme la informacion actualizada o simplemente actualizar el array ya que tenemos response success
            }
        });

        Swal.fire({
            title: "Confirmación",
            text: "Incidencia actualizada correctamente.",
            type: "success"
        });
        let selectedIncidencia = dataTable1.find(x => x.folio === selected.folio);
        if (selectedIncidencia) {
            selected.date = fecha
            selected.time = hora
            selected.location = ubicacion
            selected.place_accident = lugar 
            selected.incident = incidente 
            selected.comment = comentarios 
            selected.report = reporta 
            selected.dept = departamento 

            tables["tableIncidencias"].setData(dataTable1);
        }
        $("#editIncidentModal").modal('hide')
    }
}



function editarFalla(){
    let fecha= $("#fechaEditFalla").val()
    let hora= $("#timeEditFalla").val()
    let ubicacion= $("#ubicacionEditFalla").val()
    let lugar= $("#lugarEditFalla").val()
    let falla= $("#fallaEditFalla").val()
    let descripcion= $("#descripcionEditFalla").val()
    let comentarios= $("#comentariosEditFalla").val()
    let reporta= $("#reportaEditFalla").val()
    let departamento= $("#departamentoEditFalla").val()
    let responsable= $("#responsableEditFalla").val()

    let selected=''
    for(d of dataTable2){
        if(d.folio == parseInt(selectedRowFolio))
            selected = d
    }
    if(selected.date == fecha && selected.time == hora && selected.location == ubicacion &&
        selected.place_accident == lugar && selected.incident == falla && selected.comment == comentarios && selected.descripcion == descripcion &&
        selected.report == reporta && selected.dept == departamento && selected.responsable == responsable ){
        Swal.fire({
            title: "Validación",
            text: "Edita algo para actualizar la información.",
            type: "warning"
        });
    } else {
        //INFO: Poner FETCH AQUI para enviar los nuevos en caso de que sean diferentes a los existentes
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name: scriptName,
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
                //INFO devolverme la informacion actualizada o simplemente actualizar el array ya que tenemos response success
            }
        });

        Swal.fire({
            title: "Confirmación",
            text: "Falla actualizada correctamente.",
            type: "success"
        });
        let selectedFalla = dataTable2.find(x => x.folio === selected.folio);
        if (selectedFalla) {

            selected.date = fecha
            selected.time = hora
            selected.location = ubicacion
            selected.place_accident = lugar 
            selected.incident = falla 
            selected.comment = comentarios 
            selected.report = reporta 
            selected.dept = departamento 
            selected.descripcion = descripcion
            selected.responsable= responsable 

            tables["tableFallas"].setData(dataTable2);
        }
        $("#editFailModal").modal('hide')
    }
}



function nuevaIncidencia(){
    let data = getInputsValueByClass("contentNuevaIncidencia")
   
    if(!validarObjeto(data)){
        Swal.fire({
            title: "Validación",
            text: "Faltan campos por llenar, los campos marcados con asterisco son obligatorios.",
            type: "warning"
        });
    } else {
        //INFO: Poner FETCH AQUI para enviar el nuevo registro de incidencia
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name: scriptName,
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
                //INFO devolverme la informacion actualizada o simplemente actualizar el array ya que tenemos response success
            }
        });

        Swal.fire({
            title: "Confirmación",
            text: "Incidencia creada correctamente.",
            type: "success"
        });
        let folioRandom = Date.now();
        dataTable1 = dataTable1.concat({"comment": data.comentariosNuevaIncidencia, "date": data.fechaNuevaIncidencia, "dept": data.departamentoNuevaIncidencia, 
        "folio": folioRandom, "incident": data.incidenciaNuevaIncidencia, "location": data.ubicacionNuevaIncidencia, "place_accident": data.lugarNuevaIncidencia, 
        "report": data.reportaNuevaIncidencia, "time": data.timeNuevaIncidencia});

        tables["tableIncidencias"].setData(dataTable1);
        $("#newIncidentModal").modal('hide')
    }
}

function nuevaFalla(){
    let data = getInputsValueByClass("contentNuevaFalla")
    if(!validarObjeto(data)){
        Swal.fire({
            title: "Validación",
            text: "Faltan campos por llenar, los campos marcados con asterisco son obligatorios.",
            type: "warning"
        });
    } else {
        //INFO: Poner FETCH AQUI para enviar el nuevo registro de incidencia
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name: scriptName,
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
                //INFO devolverme la informacion actualizada o simplemente actualizar el array ya que tenemos response success
            }
        });

        Swal.fire({
            title: "Confirmación",
            text: "Falla creada correctamente.",
            type: "success"
        });
        let folioRandom = Date.now();
        dataTable2 = dataTable2.concat({"comment": data.comentariosNuevaFalla, "date": data.fechaNuevaFalla, "dept": data.departamentoNuevaFalla, 
        "folio": folioRandom, "incident": data.incidenciaNuevaFalla, "location": data.ubicacionNuevaFalla, "place_accident": data.lugarNuevaFalla, 
        "report": data.reportaNuevaFalla, "time": data.timeNuevaFalla});

        tables["tableFallas"].setData(dataTable2);
        $("#newFailModal").modal('hide')
    }
}

function validarObjeto(objeto) {
    return Object.values(objeto).every(valor => valor !== undefined && valor !== null && valor !== '');
}



function getInputsValueByClass(classInput){
    let data = {};
    let elements = document.getElementsByClassName(classInput)
    console.log("ELEMENTOS",elements)
    for (let i = 0; i < elements.length; i++) {
        let id = elements[i].id;
        let value = elements[i].value;
        let type = elements[i].type;
        if(type == 'radio'){
            let valueCheck = elements[i].checked;
            if(valueCheck){
                data[id] = value;
            }
        }else{
            data[id] = value;
        }
    }
    return data
}



function alertCerrarFalla(status){
}



function descargarExcel(table) {
    let columns = tables[table].getColumns();
  /*  for(c in columns) {
        let nombreCOlumnas=""
        let keys = Object.keys(columns);
        for (e in columns){
            console.log("GEELKSN",columns[e])
            if (e !== keys[keys.length - 1]) {
                nombreCOlumnas += columns[e] + "\n";
            }
            else{
               nombreCOlumnas += columns[e] + "\t" 
            }
        }
        console.log("nombreCOlumnasAA", nombreCOlumnas)
        excelContent += nombreCOlumnas
    };*/


    let nombresColumnas = columns.map(function(column) {
        return column.getField(); // O puedes usar column.getTitle() para obtener los títulos de las columnas
    }); 
    // Crear un archivo Excel básico
    let excelContent = nombresColumnas+"\n"; // Cabecera
    tables[table].getData().forEach(function(row) {
        let fila=""
        let keys = Object.keys(row);
        for (e in row){
            if (e !== keys[keys.length - 1]) {
                fila += row[e] + "\n";
            }
            else{
               fila += row[e] + "\t"; 
            }
        }
        excelContent += fila 
    });
    // Crear un enlace de descarga y simular clic
    let blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = table +'.xlsx';
    link.click(); 
}

function alertViewFalla(folio, fecha, hora, ubicacion, lugar, falla, descripcion, comentarios, reporta ,departamento, responsable){
       Swal.fire({
        title: "Falla",
        text: "Escoje una caseta para continuar...",
        html: ` 
            <table class='table table-borderless customShadow ' style=' font-size: .8em; background-color: lightgray !important;'>
                <tbody> 
                    <tr> <td><b>Fecha:</b></td> <td> <span > `+ fecha +`</span></td> </tr>
                    <tr> <td><b>Hora:</b></td> <td> <span > `+ hora+` hrs</span></td> </tr> 
                    <tr> <td><b>Lugar del Incidente:</b></td> <td> <span > `+ lugar+` </span></td> </tr> 
                    <tr> <td><b>Ubicación:</b></td> <td> <span >`+ubicacion+`</span></td> </tr>
                    <tr> <td><b>Incidente:</b></td> <td> <span > `+ falla+`</span></td> </tr> 
                    <tr> <td><b>Descripcion:</b></td> <td> <span > `+ descripcion+`</span></td> </tr> 
                    <tr> <td><b>Comentarios:</b></td> <td> <span> `+comentarios+`</span> </tr>
                </tbody> 
            </table>
            <h5>Información del personal involucrado</h5>
            <table class='table table-borderless customShadow ' style=' font-size: .8em; background-color: lightgray !important;'>
                <tbody> 
                    <tr> <td><b>Reporta:</b></td> <td> <span>`+ reporta +`</span> </tr>
                    <tr> <td><b>Departamento:</b></td> <td> <span>` + departamento+ `</span> </tr>
                     <tr> <td><b>Responsable:</b></td> <td> <span>`+ responsable +`</span> </tr>
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

function alertViewIncident(folio, fecha, hora, ubicacion, lugar, incidente, comentarios, reporta ,departamento){
    Swal.fire({
        title: "Incidencia",
        text: "Escoje una caseta para continuar...",
        html: ` 
            <table class='table table-borderless customShadow ' style=' font-size: .8em; background-color: lightgray !important;'>
                <tbody> 
                    <tr> <td><b>Fecha:</b></td> <td> <span > `+ fecha +`</span></td> </tr>
                    <tr> <td><b>Hora:</b></td> <td> <span > `+ hora+` hrs</span></td> </tr> 
                    <tr> <td><b>Lugar del Incidente:</b></td> <td> <span > `+ lugar+` </span></td> </tr> 
                    <tr> <td><b>Ubicación:</b></td> <td> <span >`+ubicacion+`</span></td> </tr>
                    <tr> <td><b>Incidente:</b></td> <td> <span > `+ incidente+`</span></td> </tr> 
                    <tr> <td><b>Comentarios:</b></td> <td> <span> `+comentarios+`</span> </tr>
                </tbody> 
            </table>
            <h5>Información del personal involucrado</h5>
            <table class='table table-borderless customShadow ' style=' font-size: .8em; background-color: lightgray !important;'>
                <tbody> 
                    <tr> <td><b>Reporta:</b></td> <td> <span>`+ reporta +`</span> </tr>
                    <tr> <td><b>Departamento:</b></td> <td> <span>` + departamento+ `</span> </tr>
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

function resetFilters(table){
    let page= getValueUserLocation()
    console.log("REESTABLECER FILTROS", table)
}

function applyFilters(table, classFilter){
    tables[table].setData([]);
    let page= getValueUserLocation()
    let data= getInputsValueByClass(classFilter)

    if(page=='incidencias'){
        if(table == 'tableIncidencias'){
            let resultadosFiltrados = dataTable1.filter(function(item) {
                let rangoFechaDesde = !(data.idFechaDesdeIncidencias != '' && data.idFechaHastaIncidencias != '') || (item.date >= data.idFechaDesdeIncidencias  && item.date <= data.idFechaHastaIncidencias);
                let rangoUbicacion= !(data.idUbicacionIncidencias != '') || (item.location.toLowerCase() ===  data.idUbicacionIncidencias.toLowerCase());
                return rangoFechaDesde && rangoUbicacion;
            });
            dataTable1 = resultadosFiltrados;
            tables[table].setData(dataTable1);
        }else{
            let resultadosFiltrados = dataTable2.filter(function(item) {
                let rangoFechaDesde = !(data.idFechaDesdeFallas != '' && data.idFechaHastaFallas != '') || (item.date >= data.idFechaDesdeFallas  && item.date <= data.idFechaHastaFallas);
                let rangoUbicacion= !(data.idUbicacionFallas != '') || (item.location.toLowerCase() ===  data.idUbicacionFallas.toLowerCase());
                return rangoFechaDesde && rangoUbicacion;
            });
            dataTable2 = resultadosFiltrados;
            tables[table].setData(dataTable2);
        }
    }
}