let tables={}
let idScriptC=119197;
let selectLocation=""
let selectCaseta=""
let arraySuccessFoto=[]
let arraySuccessArchivo=[]
let arrayResponses=[]
let loadingButton=''
let colors = getPAlleteColors(12,0)
let selectedRowFolio=""
let selectedRowNota=""
let selectedNotaActualizado=""

window.onload = function(){
    userJwt = getCookie("userJwt");
    setValueUserLocation('notas');
    customNavbar(getValueUserLocation(), getCookie('userTurn'))
	
    selectLocation= document.getElementById("selectLocation")
    selectCaseta= document.getElementById("selectCaseta")

    selectLocation.onchange = function() {
        let response = fetchOnChangeLocation(selectLocation.value)
    };
    selectCaseta.onchange = async function() {
        let response = await fetchOnChangeCaseta('notes.py', 'get_notes', selectCaseta.value, '')
        reloadTableNotas(response.response.data)
    };
    fillCatalogs();
    getAllData();
    let user = getCookie("userId");
    
    $("#descargarListNotas").on("click", function() {
        descargarExcel(tables, 'tableNotas')
    });
    $("#idLoadingButtonArchivos").hide();
    $("#idLoadingButtonEnviarNota").hide();
}

function reloadTableNotas(data){
    dataTableNotas=[]
    if(user !='' && userJwt!=''){
        if(data.length > 0){
            for(let note of data){
                let dateFormatOpen= note.note_open_date.slice(0,-3)
                let dateFormatClose=""
                if(note.hasOwnProperty('note_close_date')){
                    dateFormatClose= note.note_close_date.slice(0,-3)
                }
                dataTableNotas.push({folio:note.folio, note_status: note.note_status, created_by_name:note.created_by_name, 
                    note_open_date: dateFormatOpen, 
                    note_close_date:dateFormatClose,  note: note.note, 
                    note_pic: note.hasOwnProperty('note_pic') && note.note_pic.length>0 ? note.note_pic  : [], 
                    note_file: note.hasOwnProperty('note_file') &&note.note_file.length>0 ? note.note_file : [], 
                    note_comments: note.hasOwnProperty('note_comments') && note.note_comments.length>0 ? note.note_comments: [], 
                    check:"",view:"", edit:""})
            }
        }else{
            dataTableNotas = []
        }
        if(tables["tableNotas"]){
            tables["tableNotas"].setData(dataTableNotas);
        }else{
            drawTableNotas('tableNotas',columnsTableNotas, dataTableNotas );
        }
    } else{
        redirectionUrl('login',false);
    }
}


function getAllData(){
    console.log("VASE",selectCaseta.value,selectLocation.value)
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name:"notes.py",
            option:"get_notes",
            area: selectCaseta.value,
            location: selectLocation.value
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
                        dataTableNotas.push({folio:note.folio, note_status: note.note_status, created_by_name:note.created_by_name !== null && note.created_by_name !== undefined ? note.created_by_name : "", 
                            note_open_date: dateFormatOpen, 
                            note_close_date:dateFormatClose,  note: note.note, 
                            note_pic: note.hasOwnProperty('note_pic') && note.note_pic.length>0 ? note.note_pic  : [], 
                            note_file: note.hasOwnProperty('note_file') &&note.note_file.length>0 ? note.note_file : [], 
                            note_comments: note.hasOwnProperty('note_comments') && note.note_comments.length>0 ? note.note_comments: [], 
                            check:"",view:"", edit:""})
                    }
                }else{
                    dataTableNotas = []
                }
                drawTableNotas('tableNotas',columnsTableNotas, dataTableNotas );
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
        modalFiltros('tableNotas','notasFiltersModal')
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


//FUNCION editar un articuloc consesionado
function editarNotaCargarInfo(folio){
    let selectedNota = dataTableNotas.find(x => x.folio == folio);
    if(selectedNota){
        selectedRowFolio= folio
        selectedRowNota=JSON.parse(JSON.stringify(selectedNota));
        //selectedNotaActualizado= JSON.parse(JSON.stringify(selectedRowNota));

        $('#editarNotasModal').modal('show');
        $("#notaEditNota").val(selectedRowNota.note)
        drawArchivosEditNota(selectedRowNota, selectedRowFolio)
        drawFotosEditNota(selectedRowNota, selectedRowFolio)
        drawComentariosEditNota(selectedRowNota, selectedRowFolio)
    }else{
        successMsg("Validación","No se encontro el folio", "warning")
    }
}

function agregarNuevaNota(){
    $("#idLoadingButtonEnviarNota").show();
    $("#idButtonEnviarNota").hide();
    let nota= $("#textAreaNuevaNotaNota").val(); 
    let archivo= $("#fileInputArchivo").val(); 
    //let status= $("#nuevaNotaEstatusSelect").val(); 
    //let fecha= $("#fechaNuevaNota").val(); 
    //let formatDate= fecha.split("T")[0]+' '+fecha.split("T")[1]
    let comments=[]
    let divComentario = document.getElementById("comment-input-form-nueva");
    let inputsG = divComentario.querySelectorAll('.comment-div-nueva');
    inputsG.forEach(function(input) {
        if(input.value!==""){
            comments.push(input.value)
        }
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
    console.log("getCookie('userName')",getCookie('userName'))
    let data_notes={
        'note_status': statusAbierto,
        'note':nota,
        'note_booth':getCookie('userCaseta'),
        //'created_by_name':getCookie('userName'),
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
                data_notes:data_notes,
                location: getCookie('userLocation'),
                area: getCookie('userCaseta')
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
                        $('#agregarNotasModalTurnos').modal('hide');
                        $("#inputTextNota").val('');
                        inputsG.forEach(function(input) {
                            input.value=''
                        });
                        let divArchivo = document.getElementById("archivo-input-form-nueva");
                        let inputsE = divArchivo.querySelectorAll('.archivo-div-nueva');
                        inputsE.forEach(function(input) {
                            input.value=''
                        });
                        
                        let divFoto = document.getElementById("foto-input-form-nueva");
                        let inputsF = divFoto.querySelectorAll('.foto-div-nueva');
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
                        dataTableNotas.unshift({folio:data.json.folio, note_status: data_notes.note_status, created_by_name:getCookie('userName'), 
                            note_open_date: note_open_date, 
                            note_close_date:"",  note: data_notes.note, 
                            note_pic: data_notes.hasOwnProperty('note_pic') && data_notes.note_pic.length>0 ? data_notes.note_pic  : [], 
                            note_file: data_notes.hasOwnProperty('note_file') && data_notes.note_file.length>0 ? data_notes.note_file : [], 
                            note_comments: data_notes.hasOwnProperty('note_comments') && data_notes.note_comments.length > 0 ? data_notes.note_comments: [], 
                            check:"",view:"", edit:""})

                        tables["tableNotas"].setData(dataTableNotas);
                        console.log("data tableee")
                        $("#idLoadingButtonEnviarNota").hide();
                        $("#idButtonEnviarNota").show();
                        $('#agregarNotasModal').modal('hide');
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


//FUNCION para enviar una nueva nota y actualizar la tabla
function editarNota(){
    $("#idLoadingButtonEditarNota").show();
    $("#idButtonEditarNota").hide();
    let nota= $("#notaEditNota").val(); 

    let comments=[]
    let divComentario = document.getElementById("comment-input-form-editar");
    selectedRowNota.note_pic.forEach(item => {
        delete item.id;
    });
    selectedRowNota.note_file.forEach(item => {
        delete item.id;
    });
    selectedRowNota.note_comments.forEach(item => {
        delete item.id;
        comments.push(item['6647fb38da07bf430e273ea2'])
    });

    let inputsG = divComentario.querySelectorAll('.comment-div-editar');
    inputsG.forEach(function(input) {
        if(input.value!==""){
            comments.push(input.value)
        }
    });
    console.log("COMENTARIOS",comments)
    for(let obj of arrayResponses){
        if( obj.hasOwnProperty('file_name') && obj.isImage==true){
            let { isImage, file_name, file  } = obj;
            //arraySuccessFoto.push({file_name: file_name, file_url: file});
            selectedRowNota.note_pic.push({file_name: file_name, file_url: file})
        }
    }

    for(let obj of arrayResponses){
        if( obj.hasOwnProperty('file_name') && obj.isImage==false){
            let { isImage, file_name, file } = obj;
            //arraySuccessArchivo.push({file_name: file_name, file_url: file});
            selectedRowNota.note_file.push({file_name: file_name, file_url: file})
        }
    }
    //let selected=

    /*for(d of dataTableNotas){
        if(d.folio == selectedRowFolio)
            selected = d
    } */
    let originalNote = dataTableNotas.find(x => x.folio == selectedRowNota.folio);
    let cleanSelected = (({ actions, checkboxColumn, folio, edit,view,check,...rest }) => rest)(originalNote);
    let edit_notes={
        'created_by_name':selectedRowNota.created_by_name,
        'note':nota,
        'note_close_date': selectedRowNota.note_close_date,
        'note_comments':comments, 
        'note_file': selectedRowNota.note_file,
        'note_open_date': selectedRowNota.note_open_date,
        'note_pic':selectedRowNota.note_pic,
        'note_status': selectedRowNota.note_status
    } 
      console.log("cleanSelected",cleanSelected)
      console.log("edittt",edit_notes)
    //let data_update = encontrarCambios(cleanSelected,edit_notes)
    let validateObj = encontrarCambios(cleanSelected,edit_notes)
    console.log("OBJETOS QUE SE MANDARAN A LA PETICION",validateObj)
    if(Object.keys(validateObj).length == 0){
        Swal.fire({
            title: "Validación",
            text: "Edita algo para actualizar la información.",
            type: "warning"
        });
    } else {

    }
/*

    let data_notes={
        "created_by_name": "Efcsd", 
        "note":"",
        "note_close_date":"",
        "note_comments":"",
        "note_file":"",
        "note_open":"",
        "note_pic":"",
        "note_status":""
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

    
    let data_notes={
        'note_status': selectedRowNota.note_status,
        'note':selectedRowNota.note,
        'note_booth':selectedRowNota,
        'note_guard':selectedRowNota.note_guard,
        'note_guard_close':'', //este dato no viene en la lista principal...
        'note_pic':selectedRowNota,
        'note_file':selectedRowNota,
        'note_comments':selectedRowNota, //note_comments_group no esta igual que en la lista
    } 
    */
    if(nota!==""){
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name:"notes.py",
                option:"update_note",
                data_update:validateObj,
                folio: selectedRowFolio
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
                    if (data.status_code==400 ||data.status_code==401){
                        let errores=[]
                        for(let err in data.json){
                            errores.push(data.json[err].label+': '+data.json[err].msg)
                        }
                        Swal.fire({
                            title: "Error",
                            text: errores.flat(),
                            type: "error"
                        });
                        $("#idLoadingButtonEditarNota").hide();
                        $("#idButtonEditarNota").show();
                    } else if(data.status_code==202 ||data.status_code==201){
                        let date= convertDate(data.json.created_at, data.json.timezone)
                        Swal.fire({
                            title: "Confirmación",
                            text: "La nota se ha editado correctamente.",
                            type: "success",
                            showConfirmButton:false,
                            timer:1200
                        });
                        $("#inputTextNota").val('');
                        inputsG.forEach(function(input) {
                            input.value=''
                        });
                        let divArchivo = document.getElementById("archivo-input-form-editar");
                        let inputsE = divArchivo.querySelectorAll('.archivo-div-editar');
                        inputsE.forEach(function(input) {
                            input.value=''
                        });
                        
                        let divFoto = document.getElementById("foto-input-form-editar");
                        let inputsF = divFoto.querySelectorAll('.foto-div-editar');
                        inputsF.forEach(function(input) {
                            input.value=''
                        });
                        for (let key in edit_notes){
                            if(key=='note_open_date'/*|| key=='note_close_date'*/){
                                let formatDate= edit_notes[key].slice(0,-3)
                                edit_notes[key]= formatDate
                            }
                        }
                        let selecNota = dataTableNotas.find(x => x.folio === selectedRowNota.folio);
                        for (let key in validateObj){
                            selecNota[key]= validateObj[key]
                        }
                        tables["tableNotas"].setData(dataTableNotas);
                        $("#idLoadingButtonEditarNota").hide();
                        $("#idButtonEditarNota").show();
                        $('#editarNotasModal').modal('hide');
                    }
            } else{
                errorAlert(res)
                $("#idLoadingButtonEditarNota").hide();
                $("#idButtonEditarNota").show();
            }
        })
    } else{
        Swal.fire({
            title: "Faltan datos por llenar",
            text: "Completa la información requerida.",
            type: "warning"
        });
        $("#idLoadingButtonEditarNota").hide();
        $("#idButtonEditarNota").show();
    }
}


function drawArchivosEditNota(selectedRowNota,selectedRowFolio){
    let cargarArchivosEditNotaDiv = document.getElementById('cargarArchivosEditNotaDiv')
    cargarArchivosEditNotaDiv.innerHTML=''
    let archivos=""
    if(selectedRowNota.note_file.length>0){
        for(archivo of selectedRowNota.note_file){
            let randomID = uniqueID()
            console.log("CAMBIO ID")
            archivo.id= randomID.toString()
            archivos+= `
            <div class="d-flex align-items-start">
                <a href="`+archivo.file_url+`" target="_blank">
                <span>`+archivo.file_name+`</span></a>
                <button type="button" class="btn-close m-2 mt-0" aria-label="Close" onClick="deleteItemCargado('`+archivo.id+`','note_file')" ></button>
            </div>`;
        }
        cargarArchivosEditNotaDiv.innerHTML = `
            <h6> Archivos Cargados </h6>
            <div class="cargarArchivosEditNota">
                <div class="d-flex flex-wrap">`+ archivos +` </div> <hr>
            </div>`;
    }else {
        cargarArchivosEditNotaDiv.innerHTML =""
    }
}



function drawFotosEditNota(selectedRowNota,selectedRowFolio){
    let cargarFotosEditNotaDiv = document.getElementById('cargarFotosEditNotaDiv')
    cargarFotosEditNotaDiv.innerHTML=''
    let fotos=""
    if(selectedRowNota.note_pic.length>0){
        for(pic of selectedRowNota.note_pic){
            let randomID = uniqueID()
            pic.id= randomID.toString()
            fotos+= `
            <div class="d-flex align-items-start">
                <img src="`+pic.file_url+`" height="130px"style="object-fit: contain;">
                <button type="button" class="btn-close m-2 mt-0" aria-label="Close" onClick="deleteItemCargado('`+pic.id+`','note_pic')" ></button>
            </div>`;
        }
        cargarFotosEditNotaDiv.innerHTML = `
            <h6> Fotos Cargadas </h6>
            <div class="cargarFotosEditNota">
                <div class="d-flex flex-wrap">`+ fotos +` </div> <hr>
            </div>`;
    }else {
        cargarFotosEditNotaDiv.innerHTML =""
    }
}



function drawComentariosEditNota(selectedRowNota,selectedRowFolio){
    let cargarComentariosEditNotaDiv = document.getElementById('cargarComentariosEditNotaDiv')
    cargarComentariosEditNotaDiv.innerHTML=''
    let comentarios=""
    if(selectedRowNota.note_comments.length>0){
        for(comm of selectedRowNota.note_comments){
            let comentario= ""
            if(typeof comm ==='string'){
                comentario= comm
            }else{
                comentario= comm['6647fb38da07bf430e273ea2']
            }
            let randomID = uniqueID()
            comm.id= randomID.toString()
            comentarios+= `
            <div class="d-flex align-items-start" id=`+randomID+`>
                <span>`+comentario+`</span>
                <button type="button" class="btn-close m-2 mt-0" aria-label="Close" onClick="deleteItemCargado('`+comm.id+`','note_comments')"></button>
            </div>`;
        }
        cargarComentariosEditNotaDiv.innerHTML = `
            <h6> Comentarios Cargados </h6>
            <div class="cargarComentariosEditNota">
                <div class="d-flex flex-wrap">`+ comentarios +` </div> <hr>
            </div>`;
    }else {
        cargarComentariosEditNotaDiv.innerHTML =""
    }
}

//FUNCION simplicada para eliminar elementos
function deleteItemCargado(id, prop){
    let filtered= selectedRowNota[prop].filter(x => x.id !== id );
    selectedRowNota[prop] = filtered
    console.log(prop,selectedRowNota[prop])
    if(prop == 'note_file'){
        drawArchivosEditNota(selectedRowNota, selectedRowNota.folio)
    } else if (prop == 'note_pic'){
        drawFotosEditNota(selectedRowNota, selectedRowNota.folio)
    } else if (prop == 'note_comments'){
        drawComentariosEditNota(selectedRowNota, selectedRowNota.folio) 
    }
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
                                let selectedNote = dataTableNotas.find(nota => nota.folio == folio);
                                for (let key in data_update){
                                    if(key=='note_close_date'){
                                        let formatDate= data_update[key].slice(0,-3)
                                        data_update[key]= formatDate
                                    }
                                    selectedNote[key]= data_update[key]
                                }
                                    selectedNote.note_status = data_update.note_status
                                    tables["tableNotas"].setData(dataTableNotas);
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
//FUNCION para mostrar alert con detalle de la nota
function verNotasAlert(folio){
    let selectedNota = dataTableNotas.find(x => x.folio == folio);
    let fotosItem=``;
    let archivosItem=``;
    let commentsItem=``;

    let comments = selectedNota.note_comments.filter(objeto => !tienePropiedadesVacias(objeto));
    for(let com in comments){
        if(selectedNota.note_comments[com].hasOwnProperty(['6647fb38da07bf430e273ea2'])){
            commentsItem+=`
            <tr> <td> <span > `+selectedNota.note_comments[com]['6647fb38da07bf430e273ea2']+`</span > </td> </tr>`;
        }else{
            commentsItem+=`
           <tr> <td> <span > `+selectedNota.note_comments[com]+`</span > </td> </tr>`;
        }
    }
    let htmlComments = comments.length>0 ? `
        <h6>Comentarios</h6>
        <table class='table table-borderless customShadow' style=' font-size: .8em; background-color: lightgray !important;'>
            `+commentsItem+` 
        </table>`: "";

    for(let pic of selectedNota.note_pic){
        fotosItem+=`
        <div class="m-1 mr-0"> <img src="`+pic.file_url+`" height="145px"style="object-fit: contain;"></div> `;
    }
    let htmlFotos=selectedNota.note_pic.length>0 ? `
        <h6>Fotografias</h6>
        <div class="d-flex flex-wrap">
            `+fotosItem+`
        </div>`:"";

    for(let file of selectedNota.note_file){
        archivosItem+=`
        <tr> <td> <a href=`+file.file_url+` target="_blank">`+file.file_name+`</td> </tr>`;
    }
    let htmlArchivos=selectedNota.note_file.length>0 ? `
        <h6>Archivos</h6>
        <table class='table table-borderless customShadow' style=' font-size: .8em; background-color: lightgray !important;'>
            `+archivosItem+`
        </table> <br>`: "";

    Swal.fire({
        title: "Nota",
        text: "Escoje una caseta para continuar...",
        html: ` <div class="d-flex justify-content-center mt-2" id="tableCambiarCaseta"></div>
            <table class='table table-borderless customShadow' style=' font-size: .8em; background-color: lightgray !important;'>
                <tbody> 
                    <tr> <td><b>Nombre:</b></td> <td> <span > `+ selectedNota.created_by_name +`</span></td> </tr>
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

/*
function setAddComentario(){
    console.log("setAddComentario")
    let randomID = Date.now();
    let newItem=`
        <div class="d-flex mb-3 div-comment-`+randomID+`" id="div-comment-`+randomID+`">
            <div class="flex-grow-1">
                <label class="form-label">Comentario </label>
                <textarea class="form-control comment-div" id="inputComentarioNota-`+randomID+`"" rows="3" placeholder="Escribe algo..."></textarea>
            </div>
            <div>
                <button type="button" class="btn btn-success button-add-register " onclick="setAddComentario();return false;">
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
    console.log("setAddArchivo")
    let randomID = Date.now();
    let newItem=`
        <div class="d-flex mb-3 col-12  div-archivo-`+randomID+`" id="id-archivo-div-`+randomID+`">
            <div class="flex-grow-1">
                <label class="form-label">Cargar un archivo </label>
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
    console.log("setAddFoto")
    let randomID = Date.now();
    let newItem=`
        <div class="d-flex mb-3 col-12  div-foto-`+randomID+`" id="id-foto-div-`+randomID+`">
            <div class="flex-grow-1">
                <label class="form-label">Fotografia </label>
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

*/

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


function limpiarEnviaNotaModal(editAdd="nueva"){
    arraySuccessFoto=[]
    arraySuccessArchivo=[]
    arrayResponses=[]
    //$("#idButtonCargarArchivos").show();
    $("#textAreaNuevaNotaNota").val("")
    //$("#inputComentarioNota").val("")
    $("#comentarioNuevaNota").val("")
    let divArchivo = document.getElementById("archivo-input-form-"+editAdd);
    let divFoto = document.getElementById("foto-input-form-"+editAdd);
    let divComment = document.getElementById("comment-input-form-"+editAdd);

    const elementsArchivo = divArchivo.querySelectorAll('.archivo-div-'+editAdd);
    elementsArchivo.forEach(function(input) {
        if(input.id!=="fileInputArchivo-"+editAdd){
            input.parentElement.parentElement.remove();
        }
    });
    const elementsFoto = divFoto.querySelectorAll('.foto-div-'+editAdd);
    elementsFoto.forEach(function(input) {
        if(input.id!=="fileInputFotografia-"+editAdd){
            input.parentElement.parentElement.remove();
        }
    });
    const elementsComment = divComment.querySelectorAll('.comment-div-'+editAdd);
    elementsComment.forEach(function(input) {
        if(input.id!=="comentarioNuevaNota-"+editAdd){
            input.parentElement.parentElement.remove();
        }
    });

    let inputsE = divArchivo.querySelectorAll('.archivo-div-'+editAdd);
    inputsE.forEach(function(input) {
        input.value=''
    });

    let inputsF = divFoto.querySelectorAll('.foto-div-'+editAdd);
    inputsF.forEach(function(input) {
        input.value=''
    });
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
            loadingService();
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
                            let dataFiltered = dataTableNotas.filter(x => x.folio !== folio);
                            dataTableNotas = dataFiltered
                            tables["tableNotas"].setData(dataTableNotas);
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


function setAddComentario(editAdd ="nueva"){
     let randomID = Date.now();
    let newItem=`
        <div class="d-flex mb-3 div-comment-`+editAdd+`-`+randomID+`" id="div-comment-`+randomID+`">
            <div class="flex-grow-1">
                <label class="form-label">Comentario </label>
                <textarea class="form-control comment-div-`+editAdd+`" id="inputComentario-`+randomID+`" rows="3" placeholder="Escribe algo..."></textarea>
            </div>
            <div>
                <button type="button" class="btn btn-danger button-delete-register"  onclick="setDeleteComentario('`+editAdd+`',`+randomID+`);return false;">
                    <i class="fa-solid fa-minus"></i></button>
            </div>
        </div>
    `;
    $('#comment-input-form-'+editAdd).append(newItem);
}


function setDeleteComentario(editAdd ="nueva",id){
    console.log("HAY ERORRES?")
    const elements = document.querySelectorAll('.comment-div-'+editAdd);
    const count = elements.length;
    if(count > 1){
        const elements = document.getElementsByClassName('div-comment-'+editAdd+'-'+id);
        while(elements.length > 0&& id !==123){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}


//FUNCION para eliminar archivo en el modal de agregar nota
function setAddArchivo(editAdd ="nueva"){
    console.log("editAdd",editAdd)
    let randomID = Date.now();
    let newItem=`
        <div class="d-flex mb-3 col-12 div-archivo-`+editAdd+`-`+randomID+`" id="id-archivo-div-`+randomID+`">
            <div class="flex-grow-1">
                <label class="form-label">Cargar un archivo </label>
                <input type="file" class="form-control-file archivo-div-`+editAdd+`" onchange="guardarArchivos('fileInputArchivo-`+editAdd+`-`+randomID+`', false);" id="fileInputArchivo-`+editAdd+`-`+randomID+`">
            </div>
            <div>
                <button type="button" class="btn btn-danger button-delete-register"  onclick="setDeleteArchivo('`+editAdd+`',`+randomID+`);return false;">
                    <i class="fa-solid fa-minus"></i>
                </button>
            </div>
        </div>
    `;
    $('#archivo-input-form-'+editAdd).append(newItem);
}


//FUNCION para agregar archivo en el modal de agregar nota
function setDeleteArchivo(editAdd ="nueva", id ){
    const elements = document.querySelectorAll('.archivo-div-'+editAdd);
    const count = elements.length;
    if(count > 1){
        const elements = document.getElementsByClassName('div-archivo-'+editAdd+'-'+id);
        while(elements.length > 0 && id !==123){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}


//FUNCION para agregar foto en el modal de agregar nota
function setAddFoto(editAdd ="nueva"){
    let randomID = Date.now();
    let newItem=`
        <div class="d-flex mb-3 col-12  div-foto-`+editAdd+`-`+randomID+`" id="id-foto-div-`+randomID+`">
            <div class="flex-grow-1">
                <label class="form-label">Fotografia </label>
                <input type="file" class="form-control-file foto-div-`+editAdd+`" onchange="guardarArchivos('fileInputFotografia-`+editAdd+`-`+randomID+`', true);" id="fileInputFotografia-`+editAdd+`-`+randomID+`">
            </div>
            <div>
                <button type="button" class="btn btn-danger button-delete-register"  onclick="setDeleteFoto('`+editAdd+`',`+randomID+`);return false;">
                   <i class="fa-solid fa-minus"></i>
                </button>
            </div>
        </div>
    `;
    $('#foto-input-form-'+editAdd).append(newItem) 
}


//FUNCION para elimar foto en el modal de agregar nota
function setDeleteFoto(editAdd ="nueva",id){
    const elements = document.querySelectorAll('.foto-div-'+editAdd);
    const count = elements.length;
    if(count > 1){
        const elements = document.getElementsByClassName('div-foto-'+editAdd+'-'+id);
        while(elements.length > 0 && id !==123){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}
