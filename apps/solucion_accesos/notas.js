let tables={}
let idScriptC=119197;


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


//FUNCION para enviar una nueva nota y actualizar la tabla
function enviarNota(){
    console.log("ELEMETOS")
    let fotosArray=[]
    let archivosArray=[]
    let nota= $("#commentTextarea").val(); console.log("NOTA", nota)
    let archivo= $("#fileInputArchivo").val();
    let elements = document.querySelectorAll('.archivo-div');
    
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
