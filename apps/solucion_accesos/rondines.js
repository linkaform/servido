let idScriptC=119197;
let selectedRondin=""

window.onload = function(){    
    setValueUserLocation('rondines');
    changeButtonColor();
    fillCatalogs();
    selectLocation= document.getElementById("selectLocation")
    selectLocation.onchange = function() {
        let response = fetchOnChangeLocation()
    };
    selectCaseta= document.getElementById("selectCaseta")
    selectCaseta.onchange = function() {
        let response = fetchOnChangeLocation()
    };
    if(user !='' && jw!=''){
        drawTable('tableListPendientes',columnsTableListPendientes, dataTableListPendientes );
        drawTable('tableListRealizados',columnsTableListPendientes, dataTableListPendientes2 );
        drawTable('tableListCancelados',columnsTableListPendientes, dataTableListPendientes3 );
        drawTable('tableListTodos',columnsTableListPendientes, dataTableListPendientes4 );

    } else{
		redirectionUrl('login',false);
	}
    $("#descargarSalidas").on("click", function() {
        descargarExcel(tables, 'tableSalidas')
    });
}


//FUNCION editar un recorrido y actualizar la tabla
function onCLickEditarRecorrido(){
    let ubicacion= $("#inputUbicacionEdit").val();
    let fecha= $("#inputDateEdit").val();
    let hora= $("#inputHourEdit").val(); 
    let nombreGuardia= $("#inputNombreGuardiaEdit").val(); 
    let puntoRecorrido= $("#inputPuntoRecorrido").val();
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
        script_id: idScriptC,
        option: "edit_recorrido",
    }),
    headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+jw
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            $('#modalEditarRecorrido').modal('hide');
            Swal.fire({
                title: "Confirmación",
                text: "El registro a ha sido editado",
                icon: "success"
            });
        } 
    })
}


//FUNCION finalizar un recorrido y actualizar la tabla
function onClickFinalizarRecorrido(){
    $('#modalFinalizarRecorrido').modal('show');
    let fecha= $("#inputDateFinalizarRecorrido").val();
    let hora= $("#inputHoraFinalizarRecorrido").val(); 
    let comentarios= $("#inputComentarioFinalizarRecorrido").val(); 
    let firmaGuardia= $("#inputPuntoRecorrido").val();

    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
        script_id: idScriptC,
        option: "finalizar_recorrido",
    }),
    headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+jw
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {

        } 
    })
    let selected = dataTableListPendientes.find(x => x.folio === selectedRondin);
        if (selected) {
            let fechaFormat= fecha.split("-")[2] +"-"+ fecha.split("-")[1] +"-"+ fecha.split("-")[0]
            selected.dateHourFin = fechaFormat+" "+hora;
            selected.observations = comentarios;
            tables["tableListPendientes"].setData(dataTableListPendientes);
        }

    Swal.fire({
        title: "Confirmación",
        text: "Recorrido finalizado correctamente",
        type: "success"
    });
    $('#modalFinalizarRecorrido').modal('hide');
}


//FUNCION para abrir los modales
function setModal(type = 'none',id){
    selectedRondin=id
    if(type == 'edit'){
        $('#modalEditarRecorrido').modal('show');
    }else if(type == 'bandera'){
        $('#modalFinalizarRecorrido').modal('show');
    }else if(type == 'filtros'){
          $('#rondinesFiltersModal').modal('show');
    }else if(type == 'cancelar'){
        alertCancelarRecorrido(id)
    }
}


//FUNCION para cancelar un recorrido y actualizar la tabla
function alertCancelarRecorrido(folio, status){
    let dataFiltered = dataTableListPendientes.filter(x => x.folio == folio);
 
    if(status){
        Swal.fire({
            title: "Confirmación",
            text: "Seguro que quieres cancelar este recorrido?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "Cancelar"
        })
        .then((result) => {
            if (result.value) {
                /*
                fetch(urlLinkaform + urlScripts, {
                method: 'POST',
                body: JSON.stringify({
                    script_name: idScriptC,
                    option: "cancelar_recorrido",
                    id: 2,
                }),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+jw
                    },
                })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                       
                    } 
                })
                Swal.fire({
                    title: "Confirmación",
                    text: "El registro a ha sido cancelado",
                    icon: "success"
                }); 

                */
                if (dataFiltered) {
                    dataFiltered[0].status = false;
                    tables["tableListPendientes"].setData(dataTableListPendientes);
                }
            }
        });
    }else{
        Swal.fire({
            title: "Acción Completada",
            text: "Este recorrido ya se encuentra cerrado",
            type: "success"
        });
    }
}


//FUNCION ver el detalle de un recorrido y actualizar la tabla
function alertVerRecorrido(folio,  nameGuard,  status,  dateHourStart,  dateHourFin, ubi, nameRoute, pointsRoute, observations, evidence,  durationRoute){
    $('#modalVerRecorrido').modal('show')
    Swal.fire({
        title: "",
        html: ` 
            <h4 class='mb-4'> Informacion de inicio del Recorrido<h4>
            <table class='table table-borderless customShadow' style=' font-size: .7em; background-color: lightgray !important;'>
                <tbody> 
                    <tr> <td><b>Fecha y Hora de inicio del recorrido:</b></td> <td>`+ dateHourStart+` </td> </tr>
                    <tr> <td><b>Guardia Responsable:</b></td> <td> `+nameGuard+` </td> </tr> 
                    <tr> <td><b>Ubicacion:</b></td> <td> `+ubi+`</td> </tr> 
                    <tr> <td><b>Area que revisa:</b></td> <td> `+nameRoute+`</td> </tr>
                </tbody> 
                </table>
                    <hr>
                <table class='table table-borderless customShadow' style=' font-size: .7em; background-color: lightgray !important;'>
                <tbody> 
                    <tr> <td><b>Fecha y Hora de inicio de finalizacion:</b></td> <td> `+dateHourFin+` </td> </tr>
                    <tr> <td><b>Duracion del recorrido:</b></td> <td>   50 min</td> </tr> 
                    <tr> <td><b>Incidencias/Observaciones:</b></td> <td> `+observations+` </td> </tr> 
                    <tr> <td><b>Firma del Guardia:</b></td> <td><img src='https://www.saumb.org.ar/assets/img/firmas/391.gif' height="70px" width="90px"></td> </tr>
                    <tr> <td><b>Estado:</b></td> <td> `+status+` </td> </tr> 
                </tbody> 
            </table>
        `,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "Cancelar"
    })
    .then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
}


//FUNCION agregar u nuevo recorrido
function nuevoRecorrido(){
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


//FUNCION FILTROS MODAL
function aplicarFiltros(){
    $('#rondinesFiltersModal').modal('hide');
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
           'Authorization': 'Bearer '+jw
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