let selectLocation;
let scriptName=''
let articulosPerdidos=[]
let articulosConcesionados=[]
let colors = getPAlleteColors(12,0)
let selectedRowFolio=""
let userJwt=""


window.onload = function(){
	setValueUserLocation('articulos');
	let user = getCookie("userId");
    userJwt = getCookie("userJwt");
    changeButtonColor();
	getInfoCatalogs();
    fillCatalogs();

    allDataArticulosCon();
    allDataArticulosPer();
	selectLocation= document.getElementById("selectLocation");
	selectLocation.onchange = function(){
    let response = fetchOnChangeLocation()
  };
    selectCaseta= document.getElementById("selectCaseta")
    selectCaseta.onchange = function() {
        let response = fetchOnChangeLocation()
    };
	setSpinner(true, 'divSpinner');
	
	
    document.querySelector("#tableArticles").addEventListener("scroll", function(){
        var scrollLeft = this.scrollLeft;
        console.log("SCROOOL",scrollLeft)
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
}


function allDataArticulosPer(){
    console.log("DQTTOS", getCookie('userCaseta'), getCookie('userLocation'),userJwt )
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name:'articulos_perdidos.py',
            option:'get_articles',
            location: getCookie('userLocation'),
            area: getCookie('userCaseta'),
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
                           console.log('ascfa', articulo)
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
                            
                        }
                    }else{
                        dataTablearticulosCon = []
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
	 //INFO: poner aqui FETCH para traer los catalogos y la informacion de las tablas y lo sig agregarlo dentro del response
     fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: scriptName,
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
        }
    });
    //INFO: los array que estan en el archivo incidencias data se llenaran desde esta fetch
    //al igual aqui se llenara la iformacion de la tablas, dataTableArticle y dataTableArticleLose
    dataCatalogs={
        "location":["Estacionamiento", "Edificio", "Casa"],
        "entrega":["Miguel Perez","Manuel Gonzales","Erik Lopez","Lucia Carvajal"],
        "department":["Seguridad","Departamento 2","Departamento 3"],
        "recibe":["Jose Patricio","Josue de Jesus","Karina Moreno"],
        "articulos":{"concession_articles": 15,"lost_articles":20},
        "type":["Electrodomesticos","Eletronicos","Ropa", "Alimentos", "Hogar y Jardin", "Jugetes y juegos","Articulo sin categoria"]
    }
	dataCatalogs.location.forEach(function(e, i){
        $("#idUbicacionArticles").append($('<option></option>').val(e).text(e));
        $("#idUbicacionArticlesLose").append($('<option></option>').val(e).text(e));
        $("#editArticleConUbicacion").append($('<option></option>').val(e).text(e));
        $("#editArticleConUbicacionA").append($('<option></option>').val(e).text(e));
        $("#editArticleConUbicacionA").val("")
        $("#editArticleConUbicacion").val("")
        $("#idUbicacionArticles").val("")
        $("#idUbicacionArticlesLose").val("")
    });
    dataCatalogs.type.forEach(function(e, i){
        $("#editArticleConTipo").append($('<option></option>').val(e).text(e));
        $("#editArticleConTipo").val("")
    });
    dataCatalogs.entrega.forEach(function(e, i){
        $("#editArticleConReporta").append($('<option></option>').val(e).text(e));
        $("#editArticleConReporta").val("")
    });

    $("#textConcessionArticles").text(dataCatalogs.articulos.concession_articles)
    $("#textLostArticles").text(dataCatalogs.articulos.lost_articles)
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
    $("#loadingButtonAgregarArticleLose").show();
    $("#buttonAgregarArticleLose").hide();
    let data = getInputsValueByClass("contentNuevoArticulo")
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
                script_name: 'articulos_consesionados.py',
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
                //INFO devolverme la informacion actualizada o simplemente actualizar el array ya que tenemos response success
            }
        });

        Swal.fire({
            title: "Confirmación",
            text: "Incidencia creada correctamente.",
            type: "success"
        });
        let folioRandom = Date.now();
        dataTableArticles = dataTableArticles.concat({"location": data.idNuevoArticuloUbicacion, "date": data.idNuevoArticuloFecha, "time": data.idNuevoArticuloHora, 
        "folio": folioRandom, "type": data.idNuevoArticuloTipo, "img": data.idNuevoArticuloFoto, "num_serie": data.idNuevoArticuloSerie, 
        "reporta": data.idNuevoArticuloEntrega, "comment": data.idNuevoArticuloComentarios, "recibe":data.idNuevoArticuloRecibe, "date_out":data.idNuevoArticuloFecha, 
        "location":data.idNuevoArticuloUbicacion, "status":"Abierto"});

        tables["tableArticles"].setData(dataTableArticles);
        $("#newArticleModal").modal('hide')
    }
}


//FUNCION validar si un objeto esta vacio
function validarObjeto(objeto) {
    return Object.values(objeto).every(valor => valor !== undefined && valor !== null && valor !== '');
}


//FUNCION editar un articuloc consesionado
function editarArticuloCon(folio, location, date, equipo_concesion, type, img, num_serie, nombre_concesion, comment){
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
        bodyInf={script_name:"articulos_consesionados.py", option:"delete_article", folio:folio}
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
                console.log("RESPONSE LIOMPSSSS", res)
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


//FUNCION editar el articulo consesionado
function editarArticuloConModal(){
    let data = getInputsValueByClass('articleCon-edit')
    let selected=''
    for(d of dataTableArticles){
        if(d.folio == parseInt(selectedRowFolio))
            selected = d
    }
    if( data.editArticleConArticulo == selected.name && data.editArticleConComentarios == selected.comment && data.editArticleConFecha == selected.date &&
        data.editArticleConFoto == selected.img && data.editArticleConHora == selected.time && data.editArticleConNoSerie == selected.num_serie &&
        data.editArticleConReporta == selected.reporta && data.editArticleConTipo == selected.type && data.editArticleConUbicacion== selected.location 
      ){
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
        let selectedArt = dataTableArticles.find(x => x.folio === selected.folio);
        if (selectedArt) {
            selected.name =  data.editArticleConArticulo
            selected.comment = data.editArticleConComentarios
            selected.date = data.editArticleConFecha
            selected.img = data.editArticleConFoto 
            selected.time = data.editArticleConHora 
            selected.num_serie = data.editArticleConNoSerie 
            selected.reporta = data.editArticleConReporta 
            selected.type = data.editArticleConTipo 
            selected.location = data.editArticleConUbicacion 
            tables["tableArticles"].setData(dataTableArticles);
        }
        $("#editArticleConModal").modal('hide')
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
    console.log(columnas,tipo, valor)
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