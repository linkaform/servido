let idScriptC=119197;

let dataTableListPendientes = [ 
  { status: 'abierto', nameGuard: 'Juan Pérez', dateHourStart: '2024-05-14 09:30', dateHourFin: '2024-05-14 09:30',  ubi: 'Este es un registro de ejemplo',folio:1, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'María Rodríguez', dateHourStart: '2024-05-10 14:45', dateHourFin: '2024-05-10 14:45', ubi: 'Otro registro para ilustrar',folio:2, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'Soy una ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Pedro Gómez', dateHourStart: '2024-05-12 11:20', dateHourFin: '2024-05-12 11:20',  ubi: 'Tercer registro',folio:3 ,nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Ana López', dateHourStart: '2024-05-08 08:00', dateHourFin: '2024-05-08 08:00', ubi: 'Cuarto registro',folio:4, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'David Martínez', dateHourStart: '2024-05-13 15:10', dateHourFin: '2024-05-13 15:10',  ubi: 'Quinto registro',folio:5 ,nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Laura Ramírez', dateHourStart: '2024-05-09 10:30', dateHourFin: '2024-05-09 10:30',  ubi: 'Sexto registro',folio:6, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Carlos Sánchez', dateHourStart: '2024-05-11 16:50', dateHourFin: '2024-05-11 16:50', ubi: 'Séptimo registro',folio:7, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Elena García', dateHourStart: '2024-05-07 12:15', dateHourFin: '2024-05-07 12:15',  ubi: 'Octavo registro',folio:8,  nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Sofía Hernández', dateHourStart: '2024-05-15 09:00', dateHourFin: '2024-05-15 09:00',  ubi: 'Noveno registro',folio:9, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Mario Castillo', dateHourStart: '2024-05-06 13:40', dateHourFin: '2024-05-06 13:40',  ubi: 'Décimo registro',folio:10, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'}];


let dataTableListPendientes2 = [ 
  { status: 'cerrado', nameGuard: 'Luisa Martínez', dateHourStart: '2024-05-14 09:30', dateHourFin: '2024-05-14 09:30',  ubi: 'Este es un registro de ejemplo',folio:1, nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Roberto Gómez', dateHourStart: '2024-05-10 14:45', dateHourFin: '2024-05-10 14:45', ubi: 'Otro registro para ilustrar',folio:2, nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'nombre de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Carmen Pérez', dateHourStart: '2024-05-12 11:20', dateHourFin: '2024-05-12 11:20',  ubi: 'Tercer registro',folio:3 ,nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Diego García', dateHourStart: '2024-05-08 08:00', dateHourFin: '2024-05-08 08:00', ubi: 'Cuarto registro',folio:4, nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Valentina Martínez', dateHourStart: '2024-05-13 15:10', dateHourFin: '2024-05-13 15:10',  ubi: 'Quinto registro',folio:5 ,nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Javier Ramírez', dateHourStart: '2024-05-09 10:30', dateHourFin: '2024-05-09 10:30',  ubi: 'Sexto registro',folio:6, nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Isabella Sánchez', dateHourStart: '2024-05-11 16:50', dateHourFin: '2024-05-11 16:50', ubi: 'Séptimo registro',folio:7, nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Andrés López', dateHourStart: '2024-05-07 12:15', dateHourFin: '2024-05-07 12:15',  ubi: 'Octavo registro',folio:8,  nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Daniela Hernández', dateHourStart: '2024-05-15 09:00', dateHourFin: '2024-05-15 09:00',  ubi: 'Noveno registro',folio:9, nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Héctor Castillo', dateHourStart: '2024-05-06 13:40', dateHourFin: '2024-05-06 13:40',  ubi: 'Décimo registro',folio:10, nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'}
];

let dataTableListPendientes3 = [ 
  { status: 'abierto', nameGuard: 'Paola Pérez', dateHourStart: '2024-05-14 09:30', dateHourFin: '2024-05-14 09:30',  ubi: 'Este es un registro de ejemplo',folio:1, nameRoute:'recorrido casa grande',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Manuel Rodríguez', dateHourStart: '2024-05-10 14:45', dateHourFin: '2024-05-10 14:45', ubi: 'Otro registro para ilustrar',folio:2, nameRoute:'recorrido matutino',pointsRoute:'puntos d ela una ruta',observations:'Soy una ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Gabriela Gómez', dateHourStart: '2024-05-12 11:20', dateHourFin: '2024-05-12 11:20',  ubi: 'Tercer registro',folio:3 ,nameRoute:'recorrido nocturno',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Ricardo López', dateHourStart: '2024-05-08 08:00', dateHourFin: '2024-05-08 08:00', ubi: 'Cuarto registro',folio:4, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'}]


let dataTableListPendientes4 = [ 
  { status: 'cerrado', nameGuard: 'Raul Pérez', dateHourStart: '2024-05-14 09:30', dateHourFin: '2024-05-14 09:30',  ubi: 'Este es un registro de ejemplo',folio:1, nameRoute:'Soy una ruta',pointsRoute:'puntos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Carla Rodríguez', dateHourStart: '2024-05-10 14:45', dateHourFin: '2024-05-10 14:45', ubi: 'Otro registro para ilustrar',folio:2, nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'Soy una ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Pablo Gómez', dateHourStart: '2024-05-12 11:20', dateHourFin: '2024-05-12 11:20',  ubi: 'Tercer registro',folio:3 ,nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Laura López', dateHourStart: '2024-05-08 08:00', dateHourFin: '2024-05-08 08:00', ubi: 'Cuarto registro',folio:4, nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Diego Martínez', dateHourStart: '2024-05-13 15:10', dateHourFin: '2024-05-13 15:10',  ubi: 'Quinto registro',folio:5 ,nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Liliana Ramírez', dateHourStart: '2024-05-09 10:30', dateHourFin: '2024-05-09 10:30',  ubi: 'Sexto registro',folio:6, nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Marcos Sánchez', dateHourStart: '2024-05-11 16:50', dateHourFin: '2024-05-11 16:50', ubi: 'Séptimo registro',folio:7, nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Patricia López', dateHourStart: '2024-05-07 12:15', dateHourFin: '2024-05-07 12:15',  ubi: 'Octavo registro',folio:8,  nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Alejandro Hernández', dateHourStart: '2024-05-15 09:00', dateHourFin: '2024-05-15 09:00',  ubi: 'Noveno registro',folio:9, nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Giselle Castillo', dateHourStart: '2024-05-06 13:40', dateHourFin: '2024-05-06 13:40',  ubi: 'Décimo registro',folio:10, nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'}
];


const columnsTableListPendientes = [
    { title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:180,
        formatter: (cell, formatterParams) => {
            //----Button Trash
            let data = cell.getData();
            let folio = cell.getData().folio ? cell.getData().folio : 0;
            let divActions = '<div class="row d-flex">';
            divActions += ` <input class="form-check-input ms-3 mt-1" style="height:15px !important;width:2px;" type="checkbox">`;
            divActions += `<button class="btn-table-bitacora" onClick=" alertVerRecorrido('ver',${folio}, '${data.nameGuard}', '${data.status}', '${data.dateHourStart}', '${data.dateHourFin}', 
            '${data.ubi}','${data.nameRoute}','${data.pointsRoute}','${data.observations}','${data.evidence}', '${data.durationRoute}' )"><i class="fa-regular fa-eye"></i></button>`;
            divActions += `<button class="btn-table-bitacora" onClick="setModal('bandera',${folio})" ><i class="fa-regular fa-flag"></i></button>`;
            divActions += `<button class="btn-table-bitacora" onClick="setModal('edit',${folio})" ><i class="fa-regular fa-edit"></i></button>`;
             divActions += `<button class="btn-table-bitacora" onClick="setModal('cancelar',${folio})" ><i class="fa-solid fa-ban"></i></button>`;
            divActions += '</div>';
            return divActions;
            //`<button  class="btn-table-bitacora" onClick="setModal('Tools',${folio})"><i class="fa-solid fa-car"></i></button> `;
        },
    },
    { title:"Estado", field:'status',hozAlign:"left",headerFilter:true,width:100,headerTooltip:true},
    { title:"Ubicación", field:'ubi',hozAlign:"left",headerFilter:true,width:250,headerTooltip:true},
    { title:"Nombre del Guardia", field:'nameGuard',hozAlign:"left",headerFilter:true,width:150,headerTooltip:true},
    { title:"Fecha y hora de inicio", field:'dateHourStart',hozAlign:"left",headerFilter:true,width:150,headerTooltip:true},
    { title:"Fecha y Hora de finalizacion", field:'dateHourFin',hozAlign:"left",headerFilter:true,width:150,headerTooltip:true},
    { title:"Nombre del Recorrido", field:'nameRoute',hozAlign:"left",headerFilter:true,width:330,headerTooltip:true},
    { title:"Puntos del Recorrido", field:'pointsRoute',hozAlign:"left",headerFilter:true,width:250,headerTooltip:true},
    { title:"Observaciones", field:'observations',hozAlign:"left",headerFilter:true,width:250},
    { title:"Evidencias", field:'evidence',hozAlign:"left",headerFilter:true,width:290},
    { title:"Duracion del recorrido", field:'durationRoute',hozAlign:"left",headerFilter:true,width:290,headerTooltip:true},
];

window.onload = function(){
    setValueUserLocation('rondines');

    changeButtonColor();

    fillCatalogs();

    selectLocation= document.getElementById("selectLocation")
    selectLocation.onchange = function() {
        console.log("La selección ha cambiado");
        let response = fetchOnChangeLocation()
        console.log(response.data)
    };
     selectCaseta= document.getElementById("selectCaseta")
    selectCaseta.onchange = function() {
        console.log("La selección ha cambiado");
        let response = fetchOnChangeLocation()
        console.log('hiii',response.data)
    };
    if(user !='' && jw!=''){
            drawTable('tableListPendientes',columnsTableListPendientes, dataTableListPendientes );
            drawTable('tableListRealizados',columnsTableListPendientes, dataTableListPendientes2 );
            drawTable('tableListCancelados',columnsTableListPendientes, dataTableListPendientes3 );
            drawTable('tableListTodos',columnsTableListPendientes, dataTableListPendientes4 );

    } else{
		redirectionUrl('login',false);
	}

}

function onCLickEditarRecorrido(){
    let ubicacion= $("#inputUbicacionEdit").val();
    let fecha= $("#inputDateEdit").val();
    let hora= $("#inputHourEdit").val(); 
    let nombreGuardia= $("#inputNombreGuardiaEdit").val(); 
    let puntoRecorrido= $("#inputPuntoRecorrido").val();

    console.log("DATOS",ubicacion,fecha,hora,nombreGuardia, nombreGuardia,puntoRecorrido)

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

function onCLickFinalizarRecorrido(){
    let fecha= $("#inputDateFinalizarRecorrido").val();
    let hora= $("#inputHoraFinalizarRecorrido").val(); 
    let comentarios= $("#inputComentarioFinalizarRecorrido").val(); 
    let firmaGuardia= $("#inputPuntoRecorrido").val();

    console.log("DATOS",fecha,hora,comentarios,firmaGuardia)

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
            Swal.fire({
              title: "Confirmación",
              text: "Recorrido finalizado correctamente",
              type: "success"
            });
            $('#modalFinalizarRecorrido').modal('hide');
            
        } 
    })
}

//-----MODALS
function setModal(type = 'none',id){
    if(type == 'edit'){
        $('#modalEditarRecorrido').modal('show');
    }else if(type == 'bandera'){
        $('#modalFinalizarRecorrido').modal('show');
    }else if(type == 'ver'){
      
    }else if(type == 'cancelar'){
        alertCancelarRecorrido()
    }
}

function alertCancelarRecorrido(){
    Swal.fire({
      title: "Confirmación",
      text: "Seguro que quieres cancelar este recorrido?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {

        fetch(urlLinkaform + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_id: idScriptC,
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
      }
    });
}


function alertVerRecorrido(folio,  nameGuard,  status,  dateHourStart,  dateHourFin, 
             ubi, nameRoute, pointsRoute, observations, evidence,  durationRoute){
    console.log('asfa',folio,  nameGuard,  status,  dateHourStart,  dateHourFin, 
             ubi, nameRoute, pointsRoute, observations, evidence,  durationRoute)
    $('#modalVerRecorrido').modal('show')
    Swal.fire({
      title: "",
       html: ` 
        <h4 class='mb-4'> Informacion de inicio del Recorrido<h4>
        <table class='table table-borderless customShadow' style=' font-size: .7em; background-color: lightgray !important;'>
        <tbody> <tr> <td><b>Fecha y Hora de inicio del recorrido:</b></td> <td>`+ dateHourStart+` </td> </tr>
        <tr> <td><b>Guardia Responsable:</b></td> <td> `+nameGuard+` </td> </tr> 
        <tr> <td><b>Ubicacion:</b></td> <td> `+ubi+`</td> </tr> 
        <tr> <td><b>Area que revisa:</b></td> <td> `+nameRoute+`</td> </tr>
        </tbody> </table>

        <hr>
        <table class='table table-borderless customShadow' style=' font-size: .7em; background-color: lightgray !important;'>
        <tbody> <tr> <td><b>Fecha y Hora de inicio de finalizacion:</b></td> <td> `+dateHourFin+` </td> </tr>
        <tr> <td><b>Duracion del recorrido:</b></td> <td>   50 min</td> </tr> 
        <tr> <td><b>Incidencias/Observaciones:</b></td> <td> `+observations+` </td> </tr> 
        <tr> <td><b>Firma del Guardia:</b></td> <td><img src='https://www.saumb.org.ar/assets/img/firmas/391.gif' height="70px" width="90px"></td> </tr>
        <tr> <td><b>Estado:</b></td> <td> `+status+` </td> </tr> 
        </tbody> </table>

        `,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
}



//---Close Sesión
function setCloseSession(argument) {
	closeSession();
	redirectionUrl('login',false);
}