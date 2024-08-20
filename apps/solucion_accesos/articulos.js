let scriptName=''
let articulosPerdidos=[]
let articulosConcesionados=[]
let colors = getPAlleteColors(12,0)
let selectedRowFolio=""
let arrayResponses=[]
let flagVideoCard = false;
let flagVideoUser = false;
let selectCaseta=""
let selectLocation=""

window.onload = function(){
	setValueUserLocation('articulos');
    customNavbar(getValueUserLocation(), getCookie('userTurn'))
	let user = getCookie("userId");
    selectLocation= document.getElementById("selectLocation");
    selectLocation.onchange = async function(){
        let response = fetchOnChangeLocation(selectLocation.value)
        if($("#checkboxTodasLasCasetas").is(':checked')){
            let response2 = await fetchOnChangeCaseta('articulos_consecionados.py', 'get_articles',selectCaseta.value, selectLocation.value)
            reloadTableArticulosCon(response2.response.data, selectCaseta.value)
            let response3 = await fetchOnChangeCaseta('articulos_perdidos.py', 'get_articles', selectCaseta.value, selectLocation.value)
            reloadTableArticulosPer(response3.response.data)
        }
    };

    selectCaseta= document.getElementById("selectCaseta")
    selectCaseta.onchange = async function() {
        let response = await fetchOnChangeCaseta('articulos_consecionados.py', 'get_articles',selectCaseta.value, selectLocation.value)
        reloadTableArticulosCon(response.response.data, selectCaseta.value)
        let response2 = await fetchOnChangeCaseta('articulos_perdidos.py', 'get_articles', selectCaseta.value, selectLocation.value)
        reloadTableArticulosPer(response2.response.data)
    };
    changeButtonColor();
    getInfoCatalogs();
    fillCatalogs();

    allDataArticulosCon();
    allDataArticulosPer();
	
	setSpinner(true, 'divSpinner');
	
	
    document.querySelector("#tableArticles").addEventListener("scroll", function(){
        var scrollLeft = this.scrollLeft;
        document.querySelector("#table-header").scrollLeft = scrollLeft;
    });
    $("#descargarArticles").on("click", function() {
        descargarExcel(tables, 'tableArticles')
    });

    $("#descargarArticlesLose").on("click", function() {
    descargarExcel(tables, 'tableArticlesLose')
    });

    let fileInput = document.getElementById('editArticleFoto');
    let imagen = document.getElementById('editArticleConFoto');
    fileInput.addEventListener('change', function(event) {
        let file = event.target.files[0]; 
        if (file) {
            let imageUrl = URL.createObjectURL(file);
            imagen.src = imageUrl;
        }
    });
     if(getValueUserLocation()=='articulos'){
         $(document).ready(function() {
            $('#divTodasLasCasetas').show();
            $('#labelGuardiaDeApoyo').remove();
        })
    }
    $("#checkboxTodasLasCasetas").on("click",async function()  {
         if ($(this).is(':checked')) {
            selectCaseta.value=""
            selectCaseta.disabled=true
            let response = await fetchOnChangeCaseta('articulos_consecionados.py', 'get_articles','', selectLocation.value)
            reloadTableArticulosCon(response.response.data, selectCaseta.value)
            let response2 = await fetchOnChangeCaseta('articulos_perdidos.py', 'get_articles', '', selectLocation.value)
            reloadTableArticulosPer(response2.response.data)
        } else {
            selectCaseta.disabled=false
        }
    })
}

window.addEventListener('storage', function(event) {
    if (event.key === 'cerrarSesion') {
        let protocol = window.location.protocol;
        let host = window.location.host;
        window.location.href =`${protocol}//${host}/solucion_accesos/login.html`;
    }
});

function reloadTableArticulosCon(data,caseta){
    dataTableArticles=[]
    if(user !='' && userJwt!=''){
        if(data.length >0){
            for(let articulo of data){
                let dateFormat= articulo.fecha_concesion.slice(0,-3)
                let dateFormat2=''
                if(articulo.hasOwnProperty('fecha_devolucion_concesion')){
                    dateFormat2= articulo.fecha_devolucion_concesion.slice(0,-3)
                }
                if(articulo.caseta_concesion == caseta){
                    dataTableArticles.push({folio:articulo.folio,ubicacion_concesion:articulo.ubicacion_concesion||"",
                    equipo_concesion:articulo.equipo_concesion||"", fecha_concesion:dateFormat||"",caseta_concesion:articulo.caseta_concesion||"",
                    area_concesion:articulo.area_concesion||"", solicita_concesion: articulo.solicita_concesion,
                    observacion_concesion:articulo.observacion_concesion||"", nombre_concesion:articulo.nombre_concesion||"",fecha_devolucion_concesion:dateFormat2,
                    status_concesion:articulo.status_concesion})
                }
            }
        }else{
            dataTableArticles = []
        }
        if(tables['tableArticles']){
            tables['tableArticles'].setData(dataTableArticles)
        }else{
            drawTable('tableArticles', columsDataArticles, dataTableArticles);
        }
        $("#descargarIncidencias").on("click", function() {
            descargarExcel(tables, 'tableArticles')
        });
        let selectedIncidencias = getActiveCheckBoxs(tables,'tableArticles')
        let buttonEliminarIncidencias=document.getElementById('buttonEliminarIncidencias');
        if(selectedIncidencias.length>0) buttonEliminarIncidencias.display= 'none'
    } else{
        redirectionUrl('login',false);
    }
}
function reloadTableArticulosPer(data){
    dataTableArticlesLose=[]
    if(user !='' && userJwt!=''){
        if(data.length >0){
            for(let articulo of data){
                let dateFormat= articulo.date_hallazgo_perdido.slice(0,-3)
                dataTableArticlesLose.push({folio:articulo.folio,ubicacion_perdido:articulo.ubicacion_perdido||"",
                articulo_perdido:articulo.articulo_perdido||"", date_hallazgo_perdido:dateFormat||"",type_perdido:"",
                photo_perdido: articulo.photo_perdido, guard_perdido: articulo.guard_perdido ,area_perdido:articulo.area_perdido||"", 
                comments_perdido:articulo.comments_perdido||"", guard_perdido:articulo.guard_perdido||"",updated_at:articulo.updated_at,
                status_perdido:articulo.status_perdido})
            }
        }else{
            dataTableArticlesLose = []
        }
        if(tables['tableArticlesLose']){
            tables['tableArticlesLose'].setData(dataTableArticlesLose)
        }else{
            drawTable('tableArticlesLose',  columsDataArticlesLose, dataTableArticlesLose);
        }
        $("#buttonEliminarArticulosCon").on("click", function() {
            descargarExcel(tables, 'tableArticlesLose')
        });
        let selectedArticulosCons = getActiveCheckBoxs(tables,'tableArticlesLose')
        let buttonEliminarIncidencias=document.getElementById('buttonEliminarArticulosLose');
        if(selectedArticulosCons.length>0) buttonEliminarIncidencias.display= 'none'
} else{
    redirectionUrl('login',false);
}
}
function allDataArticulosPer(){
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name:'articulos_perdidos.py',
            option:'get_articles',
            location: selectLocation.value,
            area: selectCaseta.value
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
                    let data=res.response.data
                    if(data.length >0){
                        for(let articulo of data){
                            let dateFormat= articulo.date_hallazgo_perdido.slice(0,-3)
                            dataTableArticlesLose.push({folio:articulo.folio,ubicacion_perdido:articulo.ubicacion_perdido||"",
                            articulo_perdido:articulo.articulo_perdido||"", date_hallazgo_perdido:dateFormat||"",type_perdido:"",
                            photo_perdido: articulo.photo_perdido, guard_perdido: articulo.guard_perdido ,area_perdido:articulo.area_perdido||"", 
                            comments_perdido:articulo.comments_perdido||"", guard_perdido:articulo.guard_perdido||"",updated_at:articulo.updated_at,
                            status_perdido:articulo.status_perdido})
                        }
                    }else{
                        dataTableArticlesLose = []
                    }
                   
                    drawTable('tableArticlesLose',  columsDataArticlesLose, dataTableArticlesLose);
                    $("#buttonEliminarArticulosCon").on("click", function() {
                        descargarExcel(tables, 'tableArticlesLose')
                    });

                    
                    let selectedArticulosCons = getActiveCheckBoxs(tables,'tableArticlesLose')
                    let buttonEliminarIncidencias=document.getElementById('buttonEliminarArticulosLose');
                    if(selectedArticulosCons.length>0) buttonEliminarIncidencias.display= 'none'
            } else{
                redirectionUrl('login',false);
            }
        }
    })
}
function allDataArticulosCon(){
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name:'articulos_consecionados.py',
            option:'get_articles',
            location: getCookie('userLocation'),
            area:selectCaseta.value
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
                    let data=res.response.data
                    if(data.length >0){
                        for(let articulo of data){
                            let dateFormat= articulo.fecha_concesion.slice(0,-3)
                            let dateFormat2=''
                            if(articulo.hasOwnProperty('fecha_devolucion_concesion')){
                                dateFormat2= articulo.fecha_devolucion_concesion.slice(0,-3)
                            }
                            if(articulo.caseta_concesion == selectCaseta.value){
                                dataTableArticles.push({folio:articulo.folio,ubicacion_concesion:articulo.ubicacion_concesion||"",
                                equipo_concesion:articulo.equipo_concesion||"", fecha_concesion:dateFormat||"",caseta_concesion:articulo.caseta_concesion||"",
                                area_concesion:articulo.area_concesion||"", solicita_concesion: articulo.solicita_concesion,
                                observacion_concesion:articulo.observacion_concesion||"", nombre_concesion:articulo.nombre_concesion||"",fecha_devolucion_concesion:dateFormat2,
                                status_concesion:articulo.status_concesion})
                            }
                        }
                    }else{
                        dataTableArticles = []
                    }
                   
                    drawTable('tableArticles', columsDataArticles, dataTableArticles);
                    $("#descargarIncidencias").on("click", function() {
                        descargarExcel(tables, 'tableArticles')
                    });
                    let selectedIncidencias = getActiveCheckBoxs(tables,'tableArticles')
                    let buttonEliminarIncidencias=document.getElementById('buttonEliminarIncidencias');
                    if(selectedIncidencias.length>0) buttonEliminarIncidencias.display= 'none'
            } else{
                redirectionUrl('login',false);
            }
        }
    })
}


//FUNCION Otener informacion inciia
function getInfoCatalogs(){
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

                     dataCatalogs={
                        "persona_nombre_concesion":["Fernando Sntibañez", "Jacinto Sánchez Hil"],
                        "guard_perdido":["Fernando Sntibañez", "Jacinto Sánchez Hil"],
                        //"department":["Seguridad","Departamento 2","Departamento 3"],
                        "solicita_concesion":["compartida", "persona", "area"],
                        "articulos":{"concession_articles": 15,"lost_articles":20},
                        "area_concesion":["Recursos eléctricos","Recursos eléctricos"],
                        "area_perdido":["Recursos eléctricos","Recursos eléctricos"]
                    }
                    initializeCatalogsArticulosCon(dataCatalogs,arrayUserBoothsLocations)
                    initializeCatalogsArticulosLose(dataCatalogs,arrayUserBoothsLocations)
                }else{
                    arrayUserBoothsLocations=[]
                }
            }
        }
    })
	//INFO: poner aqui FETCH para traer los catalogos y la informacion de las tablas y lo sig agregarlo dentro del response
    //INFO: los array que estan en el archivo incidencias data se llenaran desde esta fetch
    //al igual aqui se llenara la iformacion de la tablas, dataTableArticle y dataTableArticleLose
}


function initializeCatalogsArticulosCon(dataCatalogs,arrayUserBoothsLocations){
    let idsSet = new Set();
    let uniqueItems = [];
    arrayUserBoothsLocations.forEach(item => {
        // Verifica si el ID del objeto ya está en el Set
        if (!idsSet.has(item.ubi)) {
            uniqueItems.push(item); // Añade el objeto al array único
            idsSet.add(item.ubi);    // Añade el ID al Set
        }
    });
    console.log("uniqueItems",uniqueItems)


    uniqueItems.forEach(function(e, i){
        $("#idUbicacionArticles").append($('<option></option>').val(e.ubi).text(e.ubi));
        $("#idNuevoArticuloUbicacion").append($('<option></option>').val(e.ubi).text(e.ubi));
        $("#idEditArticuloUbicacion").append($('<option></option>').val(e.ubi).text(e.ubi));
        $("#idEditArticuloUbicacion").val("")
        $("#idEditArticuloLugar").val("")

        $("#idUbicacionArticlesLose").append($('<option></option>').val(e.ubi).text(e.ubi));
        $("#editArticleConUbicacion").append($('<option></option>').val(e.ubi).text(e.ubi));
        $("#editArticleConUbicacionA").append($('<option></option>').val(e.ubi).text(e.ubi));

        $("#editArticleConUbicacionA").val("")
        $("#editArticleConUbicacion").val("")
        $("#idUbicacionArticles").val("")
        $("#idUbicacionArticlesLose").val("")
        $("#idNuevoArticuloUbicacion").val("")
        $("#idNuevoArticuloLugar").val("")
    });
    arrayUserBoothsLocations.forEach(function(e, i){
        $("#idEditArticuloLugar").append($('<option></option>').val(e.name).text(e.name));
        $("#idNuevoArticuloLugar").append($('<option></option>').val(e.name).text(e.name));
    });

    dataCatalogs.solicita_concesion.forEach(function(e, i){
        $("#idNuevoArticuloTipo").append($('<option></option>').val(e).text(e))
        $("#editArticleConTipo").append($('<option></option>').val(e).text(e));
        $("#editArticleConTipo").val("")
        $("#idNuevoArticuloTipo").val("")
        $("#idEditArticuloTipo").append($('<option></option>').val(e).text(e));
        $("#idEditArticuloTipo").val("")
    });
    dataCatalogs.persona_nombre_concesion.forEach(function(e, i){
        $("#idEditArticuloRecibe").append($('<option></option>').val(e).text(e));
        $("#idNuevoArticuloRecibe").append($('<option></option>').val(e).text(e));
        $("#idEditArticuloRecibe").val("")
        $("#idNuevoArticuloRecibe").val("")

    });
    dataCatalogs.area_concesion.forEach(function(e, i){
        $("#idNuevoArticuloArea").append($('<option></option>').val(e).text(e));
        $("#idNuevoArticuloArea").val("")
        $("#idEditArticuloArea").append($('<option></option>').val(e).text(e));
        $("#idEditArticuloArea").val("")
    });

    $("#textConcessionArticles").text(dataCatalogs.articulos.concession_articles)
    $("#textLostArticles").text(dataCatalogs.articulos.lost_articles)
}


function initializeCatalogsArticulosLose(dataCatalogs,arrayUserBoothsLocations){
    let idsSet = new Set();
    let uniqueItems = [];
    arrayUserBoothsLocations.forEach(item => {
        // Verifica si el ID del objeto ya está en el Set
        if (!idsSet.has(item.ubi)) {
            uniqueItems.push(item); // Añade el objeto al array único
            idsSet.add(item.ubi);    // Añade el ID al Set
        }
    });
    console.log("uniqueItems",uniqueItems)
    
    uniqueItems.forEach(function(e, i){
        $("#idUbicacionNuevoArticuloLose").append($('<option></option>').val(e.ubi).text(e.ubi));
        $("#idUbicacionNuevoArticuloLose").val("")
        $("#idUbicacionEditArticuloLose").append($('<option></option>').val(e.ubi).text(e.ubi));
        $("#idUbicacionEditArticuloLose").val("")
    });
    dataCatalogs.guard_perdido.forEach(function(e, i){
        $("#idGuardiaNuevoArticuloLose").append($('<option></option>').val(e).text(e))
        $("#idGuardiaNuevoArticuloLose").val("")
        $("#idGuardiaEditArticuloLose").append($('<option></option>').val(e).text(e))
        $("#idGuardiaEditArticuloLose").val("")
    });
    dataCatalogs.area_perdido.forEach(function(e, i){
        $("#idAreaNuevoArticuloLose").append($('<option></option>').val(e).text(e));
        $("#idAreaNuevoArticuloLose").val("")
        $("#idAreaEditArticuloLose").append($('<option></option>').val(e).text(e));
        $("#idAreaEditArticuloLose").val("")
    });
    $("#textConcessionArticles").text(dataCatalogs.articulos.concession_articles)
    $("#textLostArticles").text(dataCatalogs.articulos.lost_articles)
}

//FUNCION para agregar foto en el modal de agregar nota
function setAddFoto(){
    let randomID = Date.now();
    let newItem=`
        <div class="d-flex mb-3 col-12  div-foto-`+randomID+`" id="id-foto-div-`+randomID+`">
            <div class="flex-grow-1">
                <label class="form-label">Fotografia *</label>
                <input type="file" class="form-control-file foto-div" onchange="guardarArchivos('fileInputFotografia-`+randomID+`')" id="fileInputFotografia-`+randomID+`"">
                
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



//funcion Escojer modales
function setModal(type = 'none',id){
	if(type == 'NewArticleCon'){
		$('#newArticleConModal').modal('show');
	}else if(type == 'EditArticleCon'){
		$('#editArticleConModal').modal('show');
	}else if(type == 'ViewArticleCon'){
		$('#viewArticleConModal').modal('show');
	}else if(type == 'OutArticleCon'){
		$('#outArticleConModal').modal('show');
	}else if(type == 'NewArticleLose'){
		$('#newArticleLoseModal').modal('show');
	}else if(type == 'ViewArticleLose'){
		$('#viewArticleLoseModal').modal('show');
	}else if(type == 'EditArticleLose'){
		$('#editArticleLoseModal').modal('show');
	}else if(type == 'OutArticleLose'){
        selectedRowFolio=id
		$('#outArticleLoseModal').modal('show');
	}else if(type== 'filtros'){
        $('#articleFiltersModal').modal('show');
    }
}


//FUNCION obtener los valores de los inputs de un modal
function getInputsValueByClass(classInput){
    let data = {};
    let elements = document.getElementsByClassName(classInput)
    for (let i = 0; i < elements.length; i++) {
        let id = elements[i].id;
        let value = elements[i].value;
        let type = elements[i].type;
        let tag = elements[i].tagName.toLowerCase()
        if(type == 'radio'){
            let valueCheck = elements[i].checked;
            if(valueCheck){
                data[id] = value;
            }
        } else if(tag == 'img'){
            data[id]=elements[i].src
            

        }
        else{
            data[id] = value;
        }
    }
    return data
}


//FUNCION agregar nuevo articulo
function nuevoArticulo(type){
    $("#loadingButtonNuevoArticuloCon").show();
    $("#buttonNuevoArticuloCon").hide();
    let data = getInputsValueByClass("contentNuevoArticulo")

    let data_article = {
        'status_concesion':data.idNuevoArticuloEstatus,
        'ubicacion_concesion':data.idNuevoArticuloUbicacion,
        'solicita_concesion':data.idNuevoArticuloTipo,
        'persona_nombre_concesion':data.idNuevoArticuloRecibe,
        'caseta_concesion':data.idNuevoArticuloLugar,
        'fecha_concesion':data.idNuevoArticuloFecha +" "+ data.idNuevoArticuloHora+":00",
        'area_concesion':data.idNuevoArticuloArea,
        'equipo_concesion':data.idNuevoArticuloNombre,
        'observacion_concesion':data.idNuevoArticuloObservaciones,
        'fecha_devolucion_concesion':'', 
    }

    if(!validarObjeto(data)){
        Swal.fire({
            title: "Validación",
            text: "Faltan campos por llenar, los campos marcados con asterisco son obligatorios.",
            type: "warning"
        });
        $("#loadingButtonNuevoArticuloCon").hide();
        $("#buttonNuevoArticuloCon").show();
    } else {
        //INFO: Poner FETCH AQUI para enviar el nuevo registro de incidencia
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name:"articulos_consecionados.py",
                option:"new_article",
                data_article: data_article
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
                    $("#loadingButtonNuevoArticuloCon").hide();
                    $("#buttonNuevoArticuloCon").show();
                }else if(data.status_code==202 || data.status_code==201){
                    Swal.fire({
                        title: "Confirmación",
                        text: "Articulo consesionado creado correctamente.",
                        type: "success"
                    });
                    
                    let formatDate= data_article.fecha_concesion.slice(0,-3)
                    data_article.fecha_concesion= formatDate

                    dataTableArticles.push({folio:data.json.folio,ubicacion_concesion:data_article.ubicacion_concesion||"",
                            equipo_concesion:data_article.equipo_concesion||"", fecha_concesion:data_article.fecha_concesion||"",
                            area_concesion:data_article.area_concesion||"", 
                            observacion_concesion:data_article.observacion_concesion||"", 
                            nombre_concesion:data_article.nombre_concesion||"",fecha_devolucion_concesion:data_article.fecha_devolucion_concesion||"",
                            status_concesion:data_article.status_concesion})
                    tables["tableArticles"].setData(dataTableArticles);
                    $("#newArticleConModal").modal('hide')
                    $("#loadingButtonNuevoArticuloCon").hide();
                    $("#buttonNuevoArticuloCon").show();
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

//FUNCION agregar nuevo articulo
function nuevoArticuloLose(type){
    $("#loadingButtonNuevoArticuloLose").show();
    $("#buttonNuevoArticuloLose").hide();
    let data = getInputsValueByClass("contentNuevoArticulo")

    let data_article = {
        'status_perdido':data.idNuevoArticuloEstatus,
        'date_hallazgo_perdido':data.idNuevoArticuloUbicacion,
        'ubicacion_perdido':data.idNuevoArticuloTipo,
        'area_perdido':data.idNuevoArticuloRecibe,
        'articulo_perdido':data.idNuevoArticuloLugar,
        'photo_perdido':[],
        'comments_perdido':data.idNuevoArticuloArea,
        'guard_perdido':data.idNuevoArticuloNombre,
    }

    if(!validarObjeto(data)){
        Swal.fire({
            title: "Validación",
            text: "Faltan campos por llenar, los campos marcados con asterisco son obligatorios.",
            type: "warning"
        });
        $("#loadingButtonNuevoArticuloCon").hide();
        $("#buttonNuevoArticuloCon").show();
    } else {
        //INFO: Poner FETCH AQUI para enviar el nuevo registro de incidencia
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name:"articulos_consecionados.py",
                option:"new_article",
                data_article: data_article
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
                    $("#loadingButtonNuevoArticuloCon").hide();
                    $("#buttonNuevoArticuloCon").show();
                }else if(data.status_code==202 || data.status_code==201){
                    Swal.fire({
                        title: "Confirmación",
                        text: "Articulo consesionado creado correctamente.",
                        type: "success"
                    });
                    
                    let formatDate= data_article.fecha_concesion.slice(0,-3)
                    data_article.fecha_concesion= formatDate

                    dataTableArticles.push({folio:data.json.folio,ubicacion_concesion:data_article.ubicacion_concesion||"",
                            equipo_concesion:data_article.equipo_concesion||"", fecha_concesion:data_article.fecha_concesion||"",
                            area_concesion:data_article.area_concesion||"", 
                            observacion_concesion:data_article.observacion_concesion||"", 
                            nombre_concesion:data_article.nombre_concesion||"",fecha_devolucion_concesion:data_article.fecha_devolucion_concesion||"",
                            status_concesion:data_article.status_concesion, caseta_conses})
                    tables["tableArticles"].setData(dataTableArticles);
                    $("#newArticleConModal").modal('hide')
                    $("#loadingButtonNuevoArticuloCon").hide();
                    $("#buttonNuevoArticuloCon").show();
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


//FUNCION validar si un objeto esta vacio
function validarObjeto(objeto) {
    return Object.values(objeto).every(valor => valor !== undefined && valor !== null && valor !== '');
}


//FUNCION editar un articuloc consesionado
function editarArticuloCon(folio){
    $('#editArticleConModal').modal('show');
    selectedRowFolio= folio
    $("#editArticleConUbicacion").val(location)
    $("#editArticleConFecha").val(date)
    $("#editArticleConHora").val(time)
    $("#editArticleConArticulo").val(equipo_concesion)
    $("#editArticleConTipo").val(type)
    $("#editArticleConFoto").attr('src', img);
    $("#editArticleConNoSerie").val(num_serie)
    $("#editArticleConReporta").val(nombre_concesion)
    $("#editArticleConComentarios").val(comment)
}


//FUNCION obtener los checkbox seleccionados 
function selectCheckboxArticulos(folio){
    let checkboxes = document.querySelectorAll('.checkbox-articulos');
    articulosConcesionados=[]
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            for(d of dataTableArticles){
                if(parseInt(d.folio) === parseInt(checkbox.value)){
                    articulosConcesionados= articulosConcesionados.concat(d)
                }
            }
        }
    });
} 


//FUNCION obtener los checkbox seleccionados 
function selectCheckboxArticulosLose(folio){
    let checkboxes = document.querySelectorAll('.checkbox-articulosLose');
    articulosPerdidos=[]
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            for(d of dataTableArticlesLose){
                if(parseInt(d.folio) === parseInt(checkbox.value)){
                    articulosPerdidos = articulosPerdidos.concat(d)
                }
            }
        }
    });
} 


//
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
            if(type=="articles"){
                articulosConcesionados= getActiveCheckBoxs(tables, 'tableArticles')
                let ids=[]
                for (d of articulosConcesionados){
                    ids.push(d.folio)
                }
                dataTableArticles = dataTableArticles.filter(function(objeto) {
                    return !ids.includes(objeto.folio); // Retorna verdadero para mantener el objeto, falso para eliminarlo
                });
                tables["tableArticles"].setData(dataTableArticles);
            }else{
                articulosPerdidos= getActiveCheckBoxs(tables, 'tableArticlesLose')
                let ids=[]
                for (d of articulosPerdidos){
                    ids.push(d.folio)
                }
                dataTableArticlesLose = dataTableArticlesLose.filter(function(objeto) {
                    return !ids.includes(objeto.folio); // Retorna verdadero para mantener el objeto, falso para eliminarlo
                });
                tables["tableArticlesLose"].setData(dataTableArticlesLose);
            }
            
        }
    });
}


//FUNCION eliminar el registro desde la tabla
function alertEliminarTable(folio, type){
     let bodyInf={}
    if(type=='articlesLose'){
        bodyInf={script_name:"articulos_perdidos.py", option:"delete_article",folio:folio}
    }else{
        bodyInf={script_name:"articulos_consecionados.py", option:"delete_article", folio:folio}
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
                    }else if(data.status_code==202 ||data.status_code==201){
                        Swal.close();
                        Swal.fire({
                            title: "Success",
                            text: "Se elimino el articulo correctamente.",
                            type: "success",
                            showConfirmButton:false,
                            timer:1200
                        });
                        if(type=='articlesLose'){
                            let dataFiltered = dataTableArticlesLose.filter(x => x.folio !== folio);
                            dataTableArticlesLose = dataFiltered
                            tables["tableArticlesLose"].setData(dataTableArticlesLose);
                        }else{
                            let dataFiltered = dataTableArticles.filter(x => x.folio !== folio);
                            dataTableArticles = dataFiltered
                            tables["tableArticles"].setData(dataTableArticles);
                        }
                    }
                }else{
                    if(res.error.hasOwnProperty('msg')){
                         Swal.fire({
                            title: "Error",
                            text: res.error.msg.msg,
                            type: res.error.msg.type
                        });
                    }else{
                        Swal.fire({
                            title: "Error",
                            text: res.error,
                            type: 'error'
                        });
                    }
                }
            });
        }
    });
}


//FUNCION ver el articulo consesionado desde la tabla
function alertVerArticuloCon(folio){
    let selectedArt = dataTableArticles.find(e => e.folio == folio)
    Swal.fire({
        title:'Articulo Consesionado',
        html:`
        <table class='table table-borderless customShadow ' style=' font-size: .8em; background-color: lightgray !important;'>
                <tbody> 
                    <tr> <td><b>Tipo:</b></td> <td> <span> `+selectedArt.type+`</span></td> </tr>
                    <tr> <td><b>Fotografía:</b></td> <td> <img src="https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65779777beef423c6264ac04.jpg" width="220" height="150">    </td> </tr> 
                </tbody> 
            </table>
            <h5>Información del hallazgo</h5>
            <table class='table table-borderless customShadow ' style=' font-size: .8em; background-color: lightgray !important;'>
                <tbody> 
                    <tr> <td><b>Fecha y hora del hallazgo:</b></td> <td> <span > `+selectedArt.date+' '+selectedArt.time+`</span></td> </tr> 
                    <tr> <td><b>Ubicación:</b></td> <td> <span>`+selectedArt.location+`</span></td> </tr>
                    <tr> <td><b>Reporta:</b></td> <td> <span>`+ selectedArt.reporta+`</span></td> </tr> 
                    <tr> <td><b>Comentario:</b></td> <td> <span>`+selectedArt.comment+`</span> </tr>
                </tbody> 
            </table>
            <h5>Información de la entrega</h5>
            <table class='table table-borderless customShadow ' style=' font-size: .8em; background-color: lightgray !important;'>
                <tbody> 
                    <tr> <td><b>Recibe:</b></td> <td> <span>`+selectedArt.recibe+`</span> </tr>
                    <tr> <td><b>Fecha y hora de la entrega:</b></td> <td> <span>`+selectedArt.date_out+`</span> </tr>
                    <tr> <td><b>Estado:</b></td> <td> <span> </span> `+selectedArt.status+`</tr>
                </tbody> 
            </table>
        `,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonColor: colors[0],
        cancelButtonText: "Cerrar",
        heightAuto:false,
        reverseButtons: true
    })
    .then((result) => {
        if (result.value) {
        }
    });
}

function loadArticuloConModal(folio){
    let selectedArticleCons = dataTableArticles.find(x => x.folio === folio);
    selectedRowFolio= folio
    let formatDate1=""
    let formatDate2=""
    if(selectedArticleCons.fecha_concesion){
        let fechaHora = selectedArticleCons.fecha_concesion.split(" ")
        formatDate1= fechaHora[0]+'T'+fechaHora[1]+":00"
    }
    if(selectedArticleCons.fecha_devolucion_concesion){
        let fechaHora = selectedArticleCons.fecha_devolucion_concesion.split(" ")
        formatDate2= fechaHora[0]+'T'+fechaHora[1]+":00"
    }
    
    $('#editArticleConModal').modal('show');
    $("#idEditArticuloUbicacion").val(selectedArticleCons.ubicacion_concesion )
    $("#idEditArticuloLugar").val(selectedArticleCons.caseta_concesion)
    $("#idEditArticuloEstatus").val(selectedArticleCons.status_concesion)
    $("#idEditArticuloFecha").val(formatDate1)
    $("#idEditArticuloTipo").val(selectedArticleCons.solicita_concesion)
    $("#idEditArticuloNombre").val(selectedArticleCons.equipo_concesion)
    $("#idEditArticuloArea").val(selectedArticleCons.area_concesion)
    $("#idEditArticuloRecibe").val(selectedArticleCons.nombre_concesion)
    $("#idEditArticuloObservaciones").val(selectedArticleCons.observacion_concesion)
    $("#idEditArticuloFechaDevolucion").val(formatDate2)
}


//FUNCION para guardar los archivos en el server 
async function guardarArchivos(id){
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
    formData.append('File', file);
    formData.append('field_id', '63e65029c0f814cb466658a2');
    formData.append('is_image', true);
    formData.append('form_id', 95435);

    const options = {
      method: 'POST', 
      body: formData
    };
    let respuesta = await fetch('https://app.linkaform.com/api/infosync/cloud_upload/', options);
    data = await respuesta.json(); //Obtenemos los datos de la respuesta 
    arrayResponses.push(data); //Agregamos los datos al arreglo
    if(data){
        Swal.fire({
            title: "Acción Completada",
            text: "Los archivos fueron guardados correctamente.",
            type: "success",
            showConfirmButton:false,
            timer:1100
        });
    }
}

//FUNCION editar el articulo consesionado
function editarArticuloConModal(){
    $("#loadingButtonEditArticuloCon").show();
    $("#buttonEditArticuloCon").hide();

    let data = getInputsValueByClass('contentEditArticulo')
    let selected=''
    for(d of dataTableArticles){
        if(d.folio == selectedRowFolio)
            selected = d
    }

    let data_incidence_update={
        'status_concesion':data.idEditArticuloEstatus,
        'ubicacion_concesion':data.idEditArticuloUbicacion,
        'solicita_concesion':data.idEditArticuloTipo,
        'persona_nombre_concesion':data.idEditArticuloRecibe,
        'caseta_concesion':data.idEditArticuloLugar,
        'fecha_concesion':data.idEditArticuloFecha=="" ? "" :data.idEditArticuloFecha+":00",
        'area_concesion':data.idEditArticuloArea,
        'equipo_concesion':data.idEditArticuloNombre,
        'observacion_concesion':data.idEditArticuloObservaciones,
        'fecha_devolucion_concesion':data.idEditArticuloFechaDevolucion=="" ? "" :data.idEditArticuloFechaDevolucion+":00"
    }

    let cleanSelected = (({ actions, checkboxColumn, folio,foto_concesion,recibe_concesion,...rest }) => rest)(selected);
    if(cleanSelected.fecha_concesion){

        let partes=cleanSelected.fecha_concesion.split(" ")
        let date = partes[0]+'T'+partes[1]+":00"
        cleanSelected.fecha_concesion= date
     }
    if(cleanSelected.fecha_devolucion_concesion){
        let partes=cleanSelected.fecha_devolucion_concesion.split(" ")
        let date = partes[0]+'T'+partes[1]+":00"
        cleanSelected.fecha_devolucion_concesion = date
    } 
    let validateObj = encontrarCambios(cleanSelected,data_incidence_update)
    if(Object.keys(validateObj).length == 0){
        Swal.fire({
            title: "Validación",
            text: "Edita algo para actualizar la información.",
            type: "warning"
        });
        $("#loadingButtonEditArticuloCon").hide();
        $("#buttonEditArticuloCon").show();
    } else {
        if(validateObj.hasOwnProperty('fecha_concesion')){
            let formatValue= validateObj.fecha_concesion.split('T')
            validateObj.fecha_concesion=formatValue[0]+' '+formatValue[1]
        }
        if(validateObj.hasOwnProperty('fecha_devolucion_concesion')){
            let formatValue= validateObj.fecha_devolucion_concesion.split('T')
            validateObj.fecha_devolucion_concesion=formatValue[0]+' '+formatValue[1]
        }
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name:"articulos_consecionados.py",
                option:"update_article",
                data_article_update: validateObj,
                folio: selected.folio
            }),
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ userJwt
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
                    $("#loadingButtonEditArticuloCon").hide();
                    $("#buttonEditArticuloCon").show();
                }else if(data.status_code==202 && data.json.objects[0][selected.folio].success){
                     Swal.fire({
                        title: "Confirmación",
                        text: "Articulo actualizado correctamente.",
                        type: "success"
                    });
                    let selectedArt = dataTableArticles.find(x => x.folio === selected.folio);
                    for (let key in validateObj){
                        if(key=='fecha_devolucion_concesion' || key=='fecha_concesion' ){
                            let formatDate= validateObj[key].slice(0,-3)
                            validateObj[key]= formatDate
                        }
                        selectedArt[key]= validateObj[key]
                    }
                    tables["tableArticles"].setData(dataTableArticles);
                    $("#editArticleConModal").modal('hide')
                    $("#loadingButtonEditArticuloCon").hide();
                    $("#buttonEditArticuloCon").show();
                }
            }else{
                Swal.fire({
                    title: "Error",
                    text: res.error,
                    type: "Error"
                });
                $("#loadingButtonEditArticuloCon").hide();
                $("#buttonEditArticuloCon").show();
            }
        });
    }
}


//FUNCION devolver el articulo desde la tabla
function devolucionArticulo(type){
    if(type =='article'){
        let data= getInputsValueByClass('outArticleCon')
        let selectedArt = dataTableArticles.find(e => e.folio == selectedRowFolio)
        selectedArt.date = data.outArticleFecha
        selectedArt.time = data.outArticleHora
        selectedArt.recibe = data.outArticleRecibe
        selectedArt.status = data.hasOwnProperty("outArticleEstado2") ? 'Cerrado': 'Abierto'
        tables["tableArticles"].setData(dataTableArticles);
        $("#outArticleModal").modal('hide')
    }else {
        let data= getInputsValueByClass('outArticle')
        let selectedArtLose = dataTableArticlesLose.find(e => e.folio == selectedRowFolio)
        selectedArtLose.date = data.outArticleFecha
        selectedArtLose.time = data.outArticleHora
        selectedArtLose.recibe = data.outArticleRecibe
        selectedArtLose.status = data.hasOwnProperty("outArticleEstado2") ? 'Cerrado': 'Abierto'
        tables["tableArticlesLose"].setData(dataTableArticlesLose);
        $("#outArticleConModal").modal('hide')
    }
}


//FUNCION devolver todos los articulos selecionados
function devolucionArticuloAll(){
    let selectedArt =getActiveCheckBoxs(tables, 'tableArticles')
    let selectedArtLose =getActiveCheckBoxs(tables, 'tableArticlesLose')
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
            if(type=='articlesLose'){
                let dataFiltered = dataTableArticlesLose.filter(x => x.folio !== folio);
                dataTableArticlesLose = dataFiltered
                tables["tableArticlesLose"].setData(dataTableArticlesLose);
            }else{
                let dataFiltered = dataTableArticles.filter(x => x.folio !== folio);
                dataTableArticles = dataFiltered
                tables["tableArticles"].setData(dataTableArticles);
            }
        }
    });
}


//FUNCION filtros en el modal
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


//FUNCION obtener la imagen del canvas
function getScreenUser(){
    //-----Save Photo
    if(!flagVideoUser){
        flagVideoUser = true;
   
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                let video = document.createElement('video');
                video.style.width = '200px';
                video.style.height = '125px';
                document.getElementById('containerUser').appendChild(video);
                video.srcObject = stream;
                video.play();
                let canvas = document.getElementById('canvasPhotoUser');
                let context = canvas.getContext('2d');
                //----Take
                $("#buttonTakeUser").attr('disabled','disabled');
                $("#buttonTakeUser").hide();
                $("#buttonSaveUser").show();
                document.getElementById('buttonSaveUser').addEventListener('click', function() {
                    setTranslateImageUser(context, video, canvas);
                });
            })
            .catch(function(error) {
                console.error('Error al acceder a la cámara:', error);
            });
        } else {
            alert('Lo siento, tu dispositivo no soporta acceso a la cámara.');
        }
    }
}

//FUNCION obtener la imagen del canvas parte2
function setTranslateImageUser(context, video, canvas){
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let photoCard = document.getElementById('imgUser');
    photoCard.src = canvas.toDataURL('image/png');
    photoCard.style.display = 'block';
    video.pause();
    video.srcObject.getTracks().forEach(function(track) {
        track.stop();
    });
    video.style.display = 'none';
    ///-- Save Input
    canvas.toBlob( (blob) => {
        const file = new File( [ blob ], "imageUser.png" );
        const dT = new DataTransfer();
        dT.items.add( file );
        document.getElementById("inputFileUser").files = dT.files;
    } );
    //-----Rquest Photo
    const flagBlankUser = isCanvasBlank(document.getElementById('canvasPhotoUser'));
    if(!flagBlankUser){
        setTimeout(() => {
            setRequestFileImg('inputUser');
        }, "1000");
    }
    //-----Clean ELement
    $("#buttonSaveUser").hide();
}

//FUNCION validar que el canvas este limpio
function isCanvasBlank(canvas) {
    const context = canvas.getContext('2d');
    const pixelBuffer = new Uint32Array(
        context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );
    return !pixelBuffer.some(color => color !== 0);
}

//FUNCION obtener la url de la imagen despues de gurdarla
function setRequestFileImg(type) {
    let idInput = '';
    if(type == 'inputCard'){
        idInput = 'inputFileCard';
    }else if(type == 'inputUser'){
        idInput = 'inputFileUser';
    }
    const fileInput = document.getElementById(idInput);
    const file = fileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('File', file);
        formData.append('field_id', '660459dde2b2d414bce9cf8f');
        formData.append('is_image', true);
        formData.append('form_id', 116852);
        fetch('https://app.linkaform.com/api/infosync/cloud_upload/', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(res => {
            if(res.file !== undefined && res.file !== null){
                if(type == 'inputCard'){
                    urlImgCard = res.file;
                    //----Clean Canvas
                    var canvas = document.getElementById('canvasPhoto');
                    var ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }else if(type == 'inputUser'){
                    urlImgUser = res.file;
                    //----Clean Canvas
                    var canvas = document.getElementById('canvasPhotoUser');
                    var ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
            }else{
                console.log('Error aqui 2');
                return 'Error';
            }
        })
        .catch(error => {
            console.log('Error aqui 3');
            return 'Error';
        });
    }else{
        return 'Error';
    }
}