let tables={}
let idScriptC=119197;
let selectLocation=""
let selectCaseta=""
let arraySuccessFoto=[]
let arraySuccessArchivo=[]
let arrayResponses=[]
let loadingButton=''
let colors = getPAlleteColors(12,0)

window.onload = function(){
    userJwt = getCookie("userJwt");
    setValueUserLocation('notas');
    customNavbar(getValueUserLocation(), getCookie('userTurn'))
	fillCatalogs();
    getAllData();
    selectLocation= document.getElementById("selectLocation")
    selectCaseta= document.getElementById("selectCaseta")

    selectLocation.onchange = function() {
        let response = fetchOnChangeLocation(selectLocation.value)
    };
    selectCaseta.onchange = async function() {
        let response = await fetchOnChangeCaseta('notes.py', 'get_notes', selectCaseta.value, '')
        reloadTableNotas(response.response.data)
    };
    let user = getCookie("userId");
    
    $("#descargarListNotas").on("click", function() {
        descargarExcel(tables, 'tableListNotas')
    });
    $("#idLoadingButtonArchivos").hide();
    $("#idLoadingButtonEnviarNota").hide();
}

function reloadTableNotas(data){
    dataTableListNotas=[]
    if(user !='' && userJwt!=''){
        if(data.length > 0){
            for(let note of data){
                let dateFormatOpen= note.note_open_date.slice(0,-3)
                let dateFormatClose=""
                if(note.hasOwnProperty('note_close_date')){
                    dateFormatClose= note.note_close_date.slice(0,-3)
                }
                dataTableListNotas.push({folio:note.folio, note_status: note.note_status, note_guard:note.note_guard, 
                    note_open_date: dateFormatOpen, 
                    note_close_date:dateFormatClose,  note: note.note, 
                    note_pic: note.hasOwnProperty('note_pic') && note.note_pic.length>0 ? note.note_pic  : [], 
                    note_file: note.hasOwnProperty('note_file') &&note.note_file.length>0 ? note.note_file : [], 
                    note_comments: note.hasOwnProperty('note_comments') && note.note_comments.length>0 ? note.note_comments: [], 
                    check:"",view:"", edit:""})
            }
        }else{
            dataTableListNotas = []
        }
        if(tables["tableListNotas"]){
            console.log("no hay notas")
            tables["tableListNotas"].setData(dataTableListNotas);
        }else{
            drawTableNotas('tableListNotas',columnsTableListNotas, dataTableListNotas );
        }
    } else{
        redirectionUrl('login',false);
    }
}



function getAllData(){
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
                if(notas.length > 0){
                    for(let note of notas){
                        let dateFormatOpen= note.note_open_date.slice(0,-3)
                        let dateFormatClose=""
                        if(note.hasOwnProperty('note_close_date')){
                            dateFormatClose= note.note_close_date.slice(0,-3)
                        }
                        //FALTA EL COMENTARIOO CAMBIAR EL ID ESE POR LETRA
                        dataTableListNotas.push({folio:note.folio, note_status: note.note_status, note_guard:note.note_guard, 
                            note_open_date: dateFormatOpen, 
                            note_close_date:dateFormatClose,  note: note.note, 
                            note_pic: note.hasOwnProperty('note_pic') && note.note_pic.length>0 ? note.note_pic  : [], 
                            note_file: note.hasOwnProperty('note_file') &&note.note_file.length>0 ? note.note_file : [], 
                            note_comments: note.hasOwnProperty('note_comments') && note.note_comments.length>0 ? note.note_comments: [], 
                            check:"",view:"", edit:""})
                    }
                }else{
                    dataTableListNotas = []
                }
                drawTableNotas('tableListNotas',columnsTableListNotas, dataTableListNotas );
            } else{
                redirectionUrl('login',false);
            }
        }
    })
}

//FUNCION para abrir modales
function setModal(type = 'none',id){
    if(type == 'Tools'){
        $('#itemsModal').modal('show');
    }else if(type == 'filtros'){
        modalFiltros('tableListNotas','notasFiltersModal')
    }
    else if(type == 'addNota'){
        limpiarEnviaNotaModal()
        $("#nuevaNotaEstatusSelect").val("abierto"); 
        $('#agregarNotasModal').modal('show');
    }
    else if(type == 'editNota'){
        limpiarEnviaNotaModal()
        $('#agregarNotasModal').modal('show');
    }
}


//FUNCION para mostrar alert para cerrar un nota en caso que tenga esta abierto
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
           'Authorization': 'Bearer '+userJwt
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


//FUNCION editar un articuloc consesionado
function editarNotaCargarInfo(folio){
    let selectedNota = dataTableListNotas.find(x => x.folio == folio);
    if(selectedNota){
        selectedRowFolio= folio
    }else{
        successMsg("Validación","No se encontro el folio", "warning")
    }
    console.log("NOTA SELECIONADA",selectedNota)
    $('#notaEditNota').modal('show');
    //$("#fechaHoraEditNota").val(selectedNota.note_status)
    $("#comentarioEditNota").val(selectedNota.no)
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
                            errorAlert(data)
                            /*let errores=[]
                            for(let err in data.json){
                                let length=objLength(err, data.json)
                                console.log("LARGOOO", data.json[err].hasOwnProperty('label'))
                                errores.push(data.json[err].label+': '+data.json[err].msg)
                            }
                            Swal.fire({
                                title: "Error",
                                text: errores.flat(),
                                type: "error"
                            }); */
                        } else if(data.status_code==202 ||data.status_code==201){
                            if(user !='' && userJwt!=''){
                                let selectedNote = dataTableListNotas.find(nota => nota.folio == folio);
                                for (let key in data_update){
                                    if(key=='note_close_date'){
                                        let formatDate= data_update[key].slice(0,-3)
                                        data_update[key]= formatDate
                                    }
                                    selectedNote[key]= data_update[key]
                                }
                                    selectedNote.note_status = data_update.note_status
                                    tables["tableListNotas"].setData(dataTableListNotas);
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
    let selectedNota = dataTableListNotas.find(x => x.folio == folio);
    let fotosItem=``;
    let archivosItem=``;
    let commentsItem=``;

    for(let com in selectedNota.note_comments){
        commentsItem+=`
        <div class='m-2 '> 
            <span style='font-size: .8em;'>`+selectedNota.note_comments[com]['6647fb38da07bf430e273ea2']+`</span> 
        </div>`;
    }
    let htmlComments=`
        <h6>Comentarios</h6>
        <div class='d-flex  flex-column '>
            `+commentsItem+` 
        </div>`;

    for(let pic of selectedNota.note_pic){
        fotosItem+=`
        <div class='m-2'> 
            <img src="`+pic.file_url+`" height="145px"style="object-fit: contain;"></td> </tr> 
        </div>`;
    }
    let htmlFotos=`
        <h6>Fotografias</h6>
        <div class='d-flex  flex-row'>
            `+fotosItem+`
        </div>`;
    for(let file of selectedNota.note_file){
        archivosItem+=`
        <div><a href=`+file.file_url+` target="_blank">`+file.file_name+`</a>
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


function setAddComentario(){
     let randomID = Date.now();
    let newItem=`
        <div class="d-flex mb-3 div-comment-`+randomID+`" id="div-comment-`+randomID+`">
            <div class="flex-grow-1">
                <label class="form-label">Comentario *</label>
                <textarea class="form-control comment-div" id="inputComentarioNota-`+randomID+`"" rows="3" placeholder="Escribe algo..."></textarea>
            </div>
            <div>
                <button type="button" class="btn btn-success button-add-register " onclick="setAddComment();return false;">
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


//FUNCION para limpiar el modal de agregar nota
function limpiarEnviaNotaModal(){
    arraySuccessFoto=[]
    arraySuccessArchivo=[]
    arrayResponses=[]
    $("#idButtonCargarArchivos").show();
    $("#commentTextarea").val("")
    $("#inputComentarioNota").val("")
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


//FUNCION para enviar una nueva nota y actualizar la tabla
function enviarNota(){
    $("#idLoadingButtonEnviarNota").show();
    $("#idButtonEnviarNota").hide();
    let nota= $("#commentTextarea").val(); 
    let archivo= $("#fileInputArchivo").val(); 
    //let status= $("#nuevaNotaEstatusSelect").val(); 
    //let fecha= $("#fechaNuevaNota").val(); 
    //let formatDate= fecha.split("T")[0]+' '+fecha.split("T")[1]
    let comments=[]
    let divComentario = document.getElementById("comment-input-form");
    let inputsG = divComentario.querySelectorAll('.comment-div');
    inputsG.forEach(function(input) {
        comments.push(input.value)
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
                        dataTableListNotas.unshift({folio:data.json.folio, note_status: data_notes.note_status, note_guard:data_notes.note_guard, 
                            note_open_date: note_open_date, 
                            note_close_date:"",  note: data_notes.note, 
                            note_pic: data_notes.hasOwnProperty('note_pic') && data_notes.note_pic.length>0 ? data_notes.note_pic  : [], 
                            note_file: data_notes.hasOwnProperty('note_file') && data_notes.note_file.length>0 ? data_notes.note_file : [], 
                            note_comments: data_notes.hasOwnProperty('note_comments') && data_notes.note_comments.length > 0 ? data_notes.note_comments: [], 
                            check:"",view:"", edit:""})

                        tables["tableListNotas"].setData(dataTableListNotas);
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



//FUNCION FILTROS MODAL
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


//FUNCION FILTROS MODAL
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
                            let dataFiltered = dataTableListNotas.filter(x => x.folio !== folio);
                            dataTableListNotas = dataFiltered
                            tables["tableListNotas"].setData(dataTableListNotas);
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

