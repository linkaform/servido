let tables={}
let idScriptC=119197;

let dataTableListNotas = [ { status: 'abierta', name: 'Juan Pérez', fechaHoraApertura: '2024-05-14 09:30', fechaHoraCierre: '2024-05-14 09:30',  note: 'Este es un registro de ejemplo',folio:1, fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Sin comentarios' },
  { status: 'cerrada', name: 'María Rodríguez', fechaHoraApertura: '2024-05-10 14:45', fechaHoraCierre: '2024-05-10 14:45', note: 'Otro registro para ilustrar',folio:2, fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Se resolvió satisfactoriamente' },
  { status: 'abierta', name: 'Pedro Gómez', fechaHoraApertura: '2024-05-12 11:20', fechaHoraCierre: '2024-05-12 11:20',  note: 'Tercer registro',folio:3,fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'En proceso' },
  { status: 'cerrada', name: 'Ana López', fechaHoraApertura: '2024-05-08 08:00', fechaHoraCierre: '2024-05-08 08:00', note: 'Cuarto registro',folio:4,fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Cerrada por falta de acción' },
  { status: 'abierta', name: 'David Martínez', fechaHoraApertura: '2024-05-13 15:10', fechaHoraCierre: '2024-05-13 15:10',  note: 'Quinto registro',folio:5,fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Requiere atención urgente' },
  { status: 'cerrada', name: 'Laura Ramírez', fechaHoraApertura: '2024-05-09 10:30', fechaHoraCierre: '2024-05-09 10:30',  note: 'Sexto registro',folio:6, fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Resuelto con éxito' },
  { status: 'abierta', name: 'Carlos Sánchez', fechaHoraApertura: '2024-05-11 16:50', fechaHoraCierre: '2024-05-11 16:50', note: 'Séptimo registro',folio:7, fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'En espera de confirmación' },
  { status: 'cerrada', name: 'Elena García', fechaHoraApertura: '2024-05-07 12:15', fechaHoraCierre: '2024-05-07 12:15',  note: 'Octavo registro',folio:8,  fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Cerrada por duplicidad' },
  { status: 'abierta', name: 'Sofía Hernández', fechaHoraApertura: '2024-05-15 09:00', fechaHoraCierre: '2024-05-15 09:00',  note: 'Noveno registro',folio:9, fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Pendiente de revisión' },
  { status: 'cerrada', name: 'Mario Castillo', fechaHoraApertura: '2024-05-06 13:40', fechaHoraCierre: '2024-05-06 13:40',  note: 'Décimo registro',folio:10, fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Resuelto por el equipo de soporte' }];

const columnsTableListNotas = [
	{ title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:180,
		formatter: (cell, formatterParams) => {
			//----Button Trash
			let data = cell.getData();
			let folio = cell.getData().folio ? cell.getData().folio : 0;
			let divActions = '<div class="row d-flex">';
			divActions += `<button class="btn-table-bitacora" onClick="cerrarNotaAlert('${data.name}', '${data.note}', ${folio},'${data.status}')"><i class="fa-regular fa-circle-check"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="verNotasAlert('${data.name}', '${data.note}', ${folio}, '${data.status}', '${data.fotos}', '${data.archivos}')" ><i class="fa-regular fa-eye"></i></button>`;
			divActions += `<button class="btn-table-bitacora" data-bs-toggle="modal" data-bs-target="#editarNotasModal" id="buttonEditarNotas"  ><i class="fa-regular fa-edit"></i></button>`;
			divActions += '</div>';
			return divActions;
			//`<button  class="btn-table-bitacora" onClick="setModal('Tools',${folio})"><i class="fa-solid fa-car"></i></button> `;
		},
	},
	{ title:"Estatus", field:'status',hozAlign:"left",headerFilter:true,width:100},
	{ title:"Empleado", field:'name',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Fecha y Hora apertura", field:'fechaHoraApertura',hozAlign:"left",headerFilter:true,width:150},
	{ title:"Fecha y Hora cierre", field:'fechaHoraCierre',hozAlign:"left",headerFilter:true,width:150},
	{ title:"Nota", field:'note',hozAlign:"left",headerFilter:true,width:330},
	{ title:"Archivo", field:'archivo',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Fotografia", field:'fotografia',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Comentarios", field:'comentarios',hozAlign:"left",headerFilter:true,width:290},
];




window.onload = function(){
    setValueUserLocation('notas');
    
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

    
    let user = getCookie("userId");
    let jw = getCookie("userJwt");
    console.log("HERLLO", user, jw);
    if(user !='' && jw!=''){
    	drawTableNotas('tableListNotas',columnsTableListNotas, dataTableListNotas );
    } else{
		redirectionUrl('login',false);
	}

}
function editarNota(){
	let name= $("inputNotaEditar").val();
	fetch(url + urlScripts, {
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
        Swal.fire({
	      title: "Confirmación",
	      text: "La nota se ha editado correctamente.",
	      type: "success"
	      });  

	      $("#editarNotasModal").modal("hide");
    	} 
    	
  })

}
function cerrarNotaAlert(name, note, folio, status){
	console.log(status , 'saefdsa')
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
            let selectedNote = dataTableListNotas.find(nota => nota.folio === folio);
            if (selectedNote) {
              selectedNote.status = "cerrada";
                tables["tableListNotas"].setData(dataTableListNotas);
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

function enviarNota(){
    let fotosArray=[]
    let archivosArray=[]
    let nota= $("#commentTextarea").val(); console.log("NOTA", nota)
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
        dataTableListNotas.push( 
        	 { status: 'abierta', name: 'Carlos Sánchez', fechaHoraApertura: '2024-05-11 16:50', fechaHoraCierre: '2024-05-11 16:50', note: nota,folio:7, fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: comentario })
        tables["tableListNotas"].setData(dataTableListNotas);
        
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


//---Close Sesión
function setCloseSession(argument) {
	closeSession();
	redirectionUrl('login',false);
}

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