let scriptName=''
let articulosPerdidos=[]
let articulosConcesionados=[]
let colors = getPAlleteColors(12,0)
let selectedRowFolio=""
let flagVideoCard = false;
let flagVideoUser = false;
let selectCaseta=""
let selectLocation=""
let currentStream=null;
let catalogsData={}
let arrayResponses=[]
let arraySuccessFoto=[]
let urlImgCard = '';
let urlImgUser = '';
let fotosNuevoArticulo={foto:[], identificacion:[]}
let fotosDevolucion={userRecibe:[], userRecibeCard:[]}

window.onload = function(){
	setValueUserLocation('articulos');
    user= getCookie("userId");
    userJwt=getCookie('userJwt');
    validSession(user, userJwt);
    
    customNavbar(getValueUserLocation(), getCookie('userTurn'))
	// let user = getCookie("userId");
    let checkboxCasetas = document.getElementById('checkboxTodasLasCasetas');
    checkboxCasetas.checked = true; 

    selectLocation= document.getElementById("selectLocation");
    selectLocation.onchange = async function(){
        let response = fetchOnChangeLocation(selectLocation.value)
        if($("#checkboxTodasLasCasetas").is(':checked')){
            console.log("BUSCANDO EN TODO", selectCaseta.value, selectLocation.value)
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
    //getInfoCatalogs();
    fillCatalogs();
    allDataArticulosCon();
    allDataArticulosPer();
	
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
    /*/fileInput.addEventListener('change', function(event) {
        let file = event.target.files[0]; 
        if (file) {
            let imageUrl = URL.createObjectURL(file);
            imagen.src = imageUrl;
        }
    }); */
    if(getValueUserLocation()=='articulos'){
         $(document).ready(function() {
            $('#divTodasLasCasetas').show();
            $('#labelGuardiaDeApoyo').remove();
        })
    }
    selectCaseta.value=""
    selectCaseta.disabled=true
}

$("#checkboxTodasLasCasetas").on("click",async function()  {
    if ($(this).is(':checked')) {
        selectCaseta.value=""
        selectCaseta.disabled=true
        let response = await fetchOnChangeCaseta('articulos_perdidos.py', 'get_articles','', selectLocation.value)
        reloadTableArticulosPer(response.response.data)
        //let response2 = await fetchOnChangeCaseta('script_turnos.py', 'get_lockers', '', selectLocation.value)
        //reloadTableLockers(response2.response.data)
    } else {
        console.log("NO SRIVE")
        selectCaseta.value=''
        selectCaseta.disabled=false
    }
})

window.addEventListener('storage', function(event) {
    if (event.key === 'cerrarSesion') {
        let protocol = window.location.protocol;
        let host = window.location.host;
        window.location.href =`${protocol}//${host}/solucion_accesos/login.html`;
    }
});

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
        limpiarArticuloLose()
        abrirNuevoEditarArticuloPerdido(null,"Nuevo")
    }else if(type == 'ViewArticleLose'){
        verArticuloPerdido(id)
    }else if(type == 'EditArticleLose'){
        limpiarArticuloLose('Editar')
        abrirNuevoEditarArticuloPerdido(id,"Editar")
    }else if(type == 'OutArticleLose'){
        selectedRowFolio=id
        modalDevolucionArticuloPerdido(id)
    }else if(type== 'filtros'){
        $('#articleFiltersModal').modal('show');
    }
}


function onChangeFiltroEstadoPerdido(){
    loadingService()
    let estadoEscogido= $('#filtroEstadoPerdido').val()
    fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name:'articulos_perdidos.py',
                option:'get_articles',
                location: selectLocation.value,
                status:estadoEscogido
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
                errorAlert(res)
            }else{
                Swal.close()
                reloadTableArticulosPer(data)
            }
        }else{
            errorAlert(res)
        }
    })
}


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
                dataTableArticlesLose.push({
                    folio:articulo.folio,ubicacion_perdido:articulo.ubicacion_perdido ||"",
                    articulo_perdido:articulo.articulo_perdido!==""&&articulo.articulo_perdido!==undefined? articulo.area_perdido:"", 
                    date_hallazgo_perdido:dateFormat||"",type_perdido:"",
                    foto_perdido: articulo.foto_perdido , 
                    guard_perdido: articulo.guard_perdido ,
                    area_perdido:articulo.area_perdido||"", 
                    comentario_perdido:articulo.comentario_perdido||"", 
                    guard_perdido:articulo.guard_perdido||"",
                    updated_at:articulo.updated_at,
                    estatus_perdido :articulo.estatus_perdido, 
                    locker_perdido: articulo.locker_perdido ||"", 
                    color_perdido: articulo.color_perdido ||"",
                    descripcion :articulo.descripcion||"", 
                    reporta_perdido: articulo.quien_entrega_interno ? articulo.quien_entrega_interno: articulo.quien_entrega_externo,
                    quien_entrega_externo: articulo.quien_entrega_externo||"",
                    quien_entrega_interno: articulo.quien_entrega_interno||"",
                    area_perdido: articulo.area_perdido ||"",
                    ubicacion_perdido: articulo.ubicacion_perdido ||"", 
                    tipo_articulo_perdido:articulo.tipo_articulo_perdido ||"",
                    quien_entrega: articulo.quien_entrega ||"",
                    articulo_seleccion: articulo.articulo_seleccion ||"",
                    recibe_perdido:articulo.recibe_perdido||"",
                    telefono_recibe_perdido:articulo.telefono_recibe_perdido||"",
                    identificacion_recibe_perdido:articulo.identificacion_recibe_perdido||"",
                    foto_recibe_perdido:articulo.foto_recibe_perdido||"",
                    date_entrega_perdido:articulo.date_entrega_perdido||"",
                })
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
    let checkboxCasetas = document.getElementById('checkboxTodasLasCasetas');
    let body={
        script_name:'articulos_perdidos.py',
        option:'get_articles',
        location: selectLocation.value,
        status:"pendiente"
    }
    if(!checkboxCasetas.checked){
        body.area= selectCaseta.value
    }
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify(body),
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
                            let dateFormat2= articulo.date_entrega_perdido? articulo.date_entrega_perdido.slice(0,-3):''
                            console.log("PERDIDOOO",articulo.articulo_perdido )
                            dataTableArticlesLose.push({
                                folio:articulo.folio,ubicacion_perdido:articulo.ubicacion_perdido ||"",
                                articulo_perdido:articulo.articulo_perdido!==""&&articulo.articulo_perdido!==undefined? articulo.articulo_perdido:'', 
                                date_hallazgo_perdido:dateFormat||"",type_perdido:"",
                                foto_perdido: articulo.foto_perdido , 
                                guard_perdido: articulo.guard_perdido ,
                                area_perdido:articulo.area_perdido||"", 
                                comentario_perdido:articulo.comentario_perdido||"", 
                                guard_perdido:articulo.guard_perdido||"",
                                updated_at:articulo.updated_at,
                                estatus_perdido :articulo.estatus_perdido, 
                                locker_perdido: articulo.locker_perdido ||"", 
                                color_perdido: articulo.color_perdido ||"",
                                descripcion :articulo.descripcion||"", 
                                reporta_perdido: articulo.quien_entrega_interno ? articulo.quien_entrega_interno: articulo.quien_entrega_externo,
                                quien_entrega_externo: articulo.quien_entrega_externo||"",
                                quien_entrega_interno: articulo.quien_entrega_interno||"",
                                area_perdido: articulo.area_perdido ||"",
                                ubicacion_perdido: articulo.ubicacion_perdido ||"", 
                                tipo_articulo_perdido:articulo.tipo_articulo_perdido ||"",
                                quien_entrega: articulo.quien_entrega ||"",
                                articulo_seleccion: articulo.articulo_seleccion ||"",
                                recibe_perdido:articulo.recibe_perdido||"",
                                telefono_recibe_perdido:articulo.telefono_recibe_perdido||"",
                                identificacion_recibe_perdido:articulo.identificacion_recibe_perdido||"",
                                foto_recibe_perdido:articulo.foto_recibe_perdido||"",
                                date_entrega_perdido:dateFormat2||"",
                            })
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
        }else{
            errorAlert(res)
        }
    })
}

function allDataArticulosCon(){
    let checkboxCasetas = document.getElementById('checkboxTodasLasCasetas');
   
    let body={
        script_name:'articulos_consecionados.py',
        option:'get_articles',
        location: getCookie('userLocation'),
    }

    if(!checkboxCasetas.checked){
        body.area= selectCaseta.value
    }

    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify(body),
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
                    $("#descargarArticles").on("click", function() {
                        descargarExcel(tables, 'tableArticles')
                    });
                    //let selectedIncidencias = getActiveCheckBoxs(tables,'tableArticles')
            } else{
                redirectionUrl('login',false);
            }
        }
    })
}

function verArticulosPerdidosAlert(folio){
    console.log("folio",folio)
    let selectedArticle = dataTableArticlesLose.find(x => x.folio == folio);
    let fotosItem=``;
    let archivosItem=``;
    let commentsItem=``;

    if(selectedArticle.hasOwnProperty('comments_perdido')){
         commentsItem+=`
            <tr> <td> <span > `+selectedArticle.comments_perdido+`</span > </td> </tr>`;
    }
    let htmlComments = selectedArticle.comments_perdido !== "" ? `
        <h6>Comentarios</h6>
        <table class='table table-borderless customShadow' style=' font-size: .8em; background-color: lightgray !important;'>
            `+commentsItem+` 
        </table>`: "";

    for(let pic of selectedArticle.photo_perdido){
        fotosItem+=`
        <div class="m-1 mr-0"> <img src="`+pic.file_url+`" height="150px"style="object-fit: contain;"></div> `;
    }
    let htmlFotos=selectedArticle.photo_perdido.length>0 ? `
        <h6>Fotografias</h6>
        <div class="d-flex flex-wrap">
            `+fotosItem+`
        </div>`:"";

    Swal.fire({
        title: "Artículo",
        text: "Escoje una caseta para continuar...",
        html: ` <div class="d-flex justify-content-center mt-2" id="tableCambiarCaseta"></div> `+htmlFotos+`
            <table class='table table-borderless customShadow mt-3' style='font-size: .8em; background-color: lightgray !important; '>
                <tbody> 
                    <tr> <td><b>Articulo:</b></td> <td> <span > `+ selectedArticle.articulo_perdido +`</span></td> </tr>
                    <tr> <td><b>Estatus:</b></td> <td> <span > `+ selectedArticle.status_perdido+`</span></td> </tr> 
                    <tr> <td><b>Color:</b></td> <td> <span > `+ selectedArticle.color+`</span></td> </tr> 
                    <tr> <td><b>Categoria:</b></td> <td> <span > `+` hrs</span></td> </tr>
                    <tr> <td><b>Locker:</b></td> <td> <span>  `+` hrs</span> </tr>
                </tbody> 
            </table>` + htmlComments,
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

//FUNCION Otener informacion inciia
function getInfoCatalogs(){
    if(getCookie('arrayUserBoothsLocations')==''){
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
    }else{
        arrayUserBoothsLocations= JSON.parse(getCookie('arrayUserBoothsLocations'))
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
    }
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
    /*dataCatalogs.categoria.forEach(function(e, i){
        $("#idCategoriaArticuloLose").append($('<option></option>').val(e).text(e))
        $("#idCategoriaArticuloLose").val("")
        $("#idCategoriaEditArticuloLose").append($('<option></option>').val(e).text(e))
        $("#idCategoriaEditArticuloLose").val("")
    });*/
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

async function onChangeCatalogoArticulo(catalog, abrirEditar){
    if(catalog =='selectUbicacion'+abrirEditar+'ArticuloLose'){
        cleanCatalag(['selectArea'+abrirEditar+'ArticuloLose'])
        let selectUbicacion = document.getElementById(catalog)
        let selectArea = document.getElementById('selectArea'+abrirEditar+'ArticuloLose')
        optionsCaseta = arrayUserBoothsLocations.filter(booth => {
        return booth.ubi == selectUbicacion.value ;
        });
        selectArea.innerHTML=""; 
        for (let obj of optionsCaseta){
                selectArea.innerHTML += '<option value="'+obj.name+'">'+obj.name+'</option>';
        }
        selectArea.value=""
    } else if (catalog =='tipoArticulo'+abrirEditar+'ArticuloLose'){
        cleanCatalag(['selectArticulo'+abrirEditar+'ArticuloLose'])
        let selectTipoArticulo = document.getElementById(catalog)
        let selectArticulo = document.getElementById('selectArticulo'+abrirEditar+'ArticuloLose')
        let data = await cargarCatalogos([{script_name:'articulos_perdidos.py',option:'catalogo_tipo_articulo',tipo:selectTipoArticulo.value}])
        for(let obj of data.format[0].data){
            selectArticulo.innerHTML += '<option value="'+obj.toLowerCase()+'">'+obj+'</option>';
        }
        selectArticulo.value=""
    }
}

function onChangeRadioEntrega(type, nuevoEditar="Nuevo", limpiar=true){
    if(limpiar){
        $('#entregaInterno'+nuevoEditar+'ArticuloLose').val('');
        $('#entregaExterno'+nuevoEditar+'ArticuloLose').val('');
    }
    if(type == 'externo'){
        $('#divEntregaInterno'+nuevoEditar+'ArtLose').hide();
        $('#divEntregaExterno'+nuevoEditar+'ArtLose').show();
    }else{
        $('#divEntregaInterno'+nuevoEditar+'ArtLose').show();
        $('#divEntregaExterno'+nuevoEditar+'ArtLose').hide();
    }
}

async function abrirNuevoEditarArticuloPerdido(folio = null, nuevoEditar = "Nuevo"){
    selectedRowFolio=folio
    cleanCatalag(['color'+nuevoEditar+'ArticuloLose','tipoArticulo'+nuevoEditar+'ArticuloLose', 'locker'+nuevoEditar+'ArticuloLose', 
        'selectUbicacion'+nuevoEditar+'ArticuloLose','selectArticulo'+nuevoEditar+'ArticuloLose', 'selectArea'+nuevoEditar+'ArticuloLose',
        'entregaInterno'+nuevoEditar+'ArticuloLose'])
    let selectColores = document.getElementById('color'+nuevoEditar+'ArticuloLose')
    let selectTipoArticulo = document.getElementById('tipoArticulo'+nuevoEditar+'ArticuloLose')
    let selectLocker = document.getElementById('locker'+nuevoEditar+'ArticuloLose')
    let selectUbicacion = document.getElementById('selectUbicacion'+nuevoEditar+'ArticuloLose')
    let selectArticulo = document.getElementById('selectArticulo'+nuevoEditar+'ArticuloLose')
    let selectArea= document.getElementById('selectArea'+nuevoEditar+'ArticuloLose')
    let selectEntregaI = document.getElementById('entregaInterno'+nuevoEditar+'ArticuloLose')
    let selectEntregaE = document.getElementById('entregaExterno'+nuevoEditar+'ArticuloLose')
    let selectedArticulo =""


    for(let color of coloresArray){
        selectColores.innerHTML += '<option value="'+capitalizeFirstLetter(color.toLowerCase()) +'">'+color+'</option>';
    }
    selectColores.value=""
    if(nuevoEditar=="Editar"){selectedArticulo = dataTableArticlesLose.find(x => x.folio == folio) }
    try {
        let requests=[{script_name:'gafetes_lockers.py',option:'get_lockers',status:'Disponible',location: selectLocation.value /*, tipo_locker:"Objetos Perdidos",*/},
                    {script_name:'articulos_perdidos.py',option:'catalogo_area_empleado'},
                    {script_name:'articulos_perdidos.py',option:'catalogo_tipo_articulo'}]

        if(selectedArticulo.hasOwnProperty('tipo_articulo_perdido')){
            if (selectedArticulo.tipo_articulo_perdido !== null && selectedArticulo.tipo_articulo_perdido !== ''){
                requests.push({script_name:'articulos_perdidos.py',option:'catalogo_tipo_articulo', tipo:selectedArticulo.tipo_articulo_perdido })
            }
        }
        catalogsData = await cargarCatalogos(requests);
    } catch (error) {
        console.error('Error al cargar los catálogos, ', error);
    }
    if(catalogsData.format.length>0){
        for(let obj of catalogsData.format){
            if(obj.objBody.option=="catalogo_tipo_articulo"){
                console.log()
                for(let tipo of obj.data){
                    selectTipoArticulo.innerHTML += '<option value="'+tipo+'">'+tipo+'</option>';
                }
                selectTipoArticulo.value="";
            } else if (obj.objBody.option=="get_lockers"){
                for(let locker of obj.data){
                    console.log("locker.locker_id", locker.locker_id.toString())
                    selectLocker.innerHTML += '<option value="'+locker.locker_id.toString()+'">'+locker.locker_id+'</option>';
                }
                selectLocker.value="";
            }else if(obj.objBody.option =='catalogo_area_empleado') {
                for(let nombre of obj.data){
                    selectEntregaI.innerHTML += '<option value="'+nombre+'">'+nombre+'</option>';
                }
                selectEntregaI.value=""
            }
        }
    } 

        let locationsUnique = new Set();
        if(getCookie("arrayUserBoothsLocations")==""){
            getInfoAndCatalogos()
        }else{
            arrayUserBoothsLocations=JSON.parse(getCookie('arrayUserBoothsLocations'))
        }
        arrayUserBoothsLocations.forEach(function(booth) {
            locationsUnique.add(booth.ubi);
        });
        optionsLocation = Array.from(locationsUnique);

        for(let ubi of optionsLocation){
            selectUbicacion.innerHTML += '<option value="'+ubi+'">'+ubi+'</option>';
        }
        selectUbicacion.value="";

        selectArticulo.innerHTML += '<option disabled> Selecciona un tipo de artículo... </option>';
        selectArticulo.value="";

        selectArea.innerHTML += '<option disabled> Selecciona una ubicación... </option>';
        selectArea.value="";

        if(nuevoEditar=="Nuevo"){
            $('#newArticleLoseModal').modal('show');
            }else{
                llenarVistaEditarArticuloPerdido(folio, catalogsData,selectArea, selectedArticulo, selectTipoArticulo,selectArticulo ,selectLocker,
                    selectUbicacion,selectEntregaI, selectEntregaE)
        }
    if (catalogsData.failedRequests.length > 0){
        errorAlert("Error al intentar cargar los catalogos, "+ catalogsData.failedRequests.flat(), "Error", "warning")
    }
}

function llenarVistaEditarArticuloPerdido(folio, catalogsData,selectArea,selectedArticulo, selectTipoArticulo ,selectArticulo,selectLocker,selectUbicacion,
    selectEntregaI, selectEntregaE){
    selectUbicacion.value=selectedArticulo.ubicacion_perdido;
    selectTipoArticulo.value=""
    selectTipoArticulo.value=selectedArticulo.tipo_articulo_perdido;
    console.log("APPP",selectedArticulo.quien_entrega_interno);
    let optionsCaseta = arrayUserBoothsLocations.filter(booth => {
        return booth.ubi == selectedArticulo.ubicacion_perdido;
    });
    selectArea.innerHTML=""; 
    for (let obj of optionsCaseta){
        selectArea.innerHTML += '<option value="'+obj.name.toString()+'">'+obj.name+'</option>';
    }
    if(catalogsData.format.length>0){
        for(let obj of catalogsData.format){
            if(obj.objBody.option=="catalogo_tipo_articulo" &&  !obj.objBody.hasOwnProperty('tipo')){
                for(let tipo of obj.data){
                    selectTipoArticulo.innerHTML += '<option value="'+tipo+'">'+tipo+'</option>';
                }
                console.log(selectedArticulo)
            }else if(obj.objBody.option=="catalogo_tipo_articulo" &&  obj.objBody.hasOwnProperty('tipo')){
                for(let tipo of obj.data){
                    selectArticulo.innerHTML += '<option value="'+tipo+'">'+tipo+'</option>';
                }
            } 
        }
    } 
    $(document).ready(function() {
        console.log("NOS EVEEE",selectedArticulo.quien_entrega_interno)
        selectArea.value= selectedArticulo.area_perdido.toString()||"";
        selectArticulo.value=selectedArticulo.articulo_seleccion.toString()||"";
        selectLocker.value=selectedArticulo.locker_perdido.toString()||"";
        selectEntregaI.value= selectedArticulo.quien_entrega_interno||""
        selectEntregaE.value= selectedArticulo.quien_entrega_externo||""
        selectTipoArticulo.value= selectedArticulo.tipo_articulo_perdido||""
    })
    if(selectedArticulo.quien_entrega=='externo'){
        document.getElementById('externoEditarArticuloLose').checked = true;
        onChangeRadioEntrega('externo', 'Editar',false)
    }else{
        document.getElementById('internoEditarArticuloLose').checked = true;
        onChangeRadioEntrega('interno', 'Editar', false)

    }
    console.log("PORQUE NOS E VEE ",capitalizeFirstLetter(selectedArticulo.comentario_perdido ||""))
    $("#idFechaEditarArticuloLose").val(selectedArticulo.date_hallazgo_perdido||"");
    $("#idNombreEditarArticuloLose").val(capitalizeFirstLetter(selectedArticulo.articulo_perdido ||""));
    $("#tipoArticuloEditarArticuloLose").val(capitalizeFirstLetter(selectedArticulo.tipo_articulo_perdido ||""));
    $("#colorEditarArticuloLose").val(capitalizeFirstLetter(selectedArticulo.color_perdido ||""));
    $("#entregaEditarArticuloLose").text(capitalizeFirstLetter(selectedArticulo.quien_entrega_externo ||""));
    $("#lockerEditarArticuloLose").val(capitalizeFirstLetter(selectedArticulo.locker_perdido ||""));
    $("#descripcionEditarArticuloLose").val(capitalizeFirstLetter(selectedArticulo.descripcion ||""));
    $("#comentarioEditarArticuloLose").val(capitalizeFirstLetter(selectedArticulo.comentario_perdido ||""));
    $('#editArticleLoseModal').modal('show');
}

function modalDevolucionArticuloPerdido(folio){
    limpiarArticuloLose('devolucion')
    $('#outArticleLoseModal').modal('show');
}

function verArticuloPerdido(folio){
    let selectedArticulo = dataTableArticlesLose.find(x => x.folio == folio);
    console.log("sadsa", selectedArticulo)
    let reporta=selectedArticulo.quien_entrega_externo
    if(selectedArticulo.quien_entrega.toLowerCase()=="interno"){
        reporta = selectedArticulo.quien_entrega_externo ||""
    }else {
        reporta = selectedArticulo.quien_entrega ||""
    }

    $("#nombreArticuloPerdido").text(capitalizeFirstLetter(selectedArticulo.articulo_perdido ||""))
    $("#colorArticuloPerdido").text(capitalizeFirstLetter(selectedArticulo.color_perdido ||""))
    $("#categoriaArticuloPerdido").text(capitalizeFirstLetter(selectedArticulo.categoria_perdido ||""))
    $("#estadoArticuloPerdido").text(capitalizeFirstLetter(selectedArticulo.estatus_perdido ||""))
    $("#fechaHallazgoArticuloPerdido").text(selectedArticulo.date_hallazgo_perdido ||"")
    $("#ubicacionArticuloPerdido").text(capitalizeFirstLetter(selectedArticulo.ubicacion_perdido ||""))
    $("#reportaArticuloPerdido").text(capitalizeFirstLetter(reporta ||""))
    $("#departamentoArticuloPerdido").text(capitalizeFirstLetter(selectedArticulo.dep ||""))
    $("#comentarioArticuloPerdido").text(capitalizeFirstLetter(selectedArticulo.comentario_perdido ||""))
    $("#recibeArticuloPerdido").text(capitalizeFirstLetter(selectedArticulo.recibe_perdido ||""))
    $("#fechaEntregaArticuloPerdido").text(selectedArticulo.date_entrega_perdido ||"")

    let divFotos = document.getElementById("verFotosArticuloPerdido")
    divFotos.innerHTML=""
    let fotos=""
    if(selectedArticulo.hasOwnProperty('foto_perdido')){
        for(let foto of selectedArticulo.foto_perdido){
            fotos += `<img id="imgArticuloPerdido" src="`+foto.file_url+`" style="object-fit: contain;"  class="me-2">`
        }
    }
    divFotos.innerHTML = fotos
    if(selectedArticulo.foto_perdido.length>0){
        $("#imgArticuloPerdido").attr('src',selectedArticulo.foto_perdido[0].file_url)
    }else{
        $("#imgArticuloPerdido").attr('src',"https://crossfirecontracts.com/img/default.png")
    }
    $("#viewArticleLoseModal").modal('show');
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

function limpiarArticuloLose(editAdd="Nuevo"){
    arraySuccessFoto=[]
    arrayResponses=[]
    if(editAdd == 'devolucion'){
        $('input[name="outArticleLoseModalEstatusDev"]').prop('checked', false);
        $('outArticleLoseModalRecibe').val('')
        $('outArticleLoseModalTel').val('')
        flagVideoUser=false
            currentStream=null
            $('#buttonTakeUserRecibe').show();
            $('#buttonTakeUserRecibe').prop('disabled', false);
            $('#buttonSaveUserRecibe').hide();
            $('#imgUserRecibe').hide();
            $('#imgUserRecibe').attr('src', '');
            $('#inputFileUserRecibe').val('');
        
            $('#buttonTakeUserRecibeCard').show();
            $('#buttonTakeUserRecibeCard').prop('disabled', false);
            $('#buttonSaveUserRecibeCard').hide();
            $('#imgUserRecibeCard').hide();
            $('#imgUserRecibeCard').attr('src', '');
            $('#inputFileUserRecibeCard').val('');

    }else{
        $("#color"+editAdd+"ArticuloLose").val("")
        $("#comentario"+editAdd+"ArticuloLose").val("")
        $("#descripcion"+editAdd+"ArticuloLose").val("")
        $("#entrega"+editAdd+"ArticuloLose").val("")
        $("#idFecha"+editAdd+"ArticuloLose").val("")
        $("#idNombre"+editAdd+"ArticuloLose").val("")
        $("#locker"+editAdd+"ArticuloLose").val("")
        $("#selectArea"+editAdd+"ArticuloLose").val("")
        $("#selectArticulo"+editAdd+"ArticuloLose").val("")
        $("#selectUbicacion"+editAdd+"ArticuloLose").val("")
        $("#tipoArticulo"+editAdd+"ArticuloLose").val("")

        if(editAdd=="Editar"){
            flagVideoUser=false
            currentStream=null
            $('#buttonTakeUser').show();
            $('#buttonTakeUser').prop('disabled', false);
            $('#buttonSaveUser').hide();
            $('#imgUser').hide();
            $('#imgUser').attr('src', '');
            $('#inputFileUser').val('');
        }else{
            flagVideoCard=false
            currentStream=null
            $('#buttonTakeCard').show();
            $('#buttonTakeCard').prop('disabled', false);
            $('#buttonSaveCard').hide();
            $('#imgCard').hide();
            $('#imgCard').attr('src', '');
            $('#inputFileCard').val('');
        }
    }
   
}

function limpiarDevolver(){
    flagVideoUser=false
    currentStream=null
    $('#buttonSaveUserRecibe').show();
    $('#buttonTakeUserRecibe').prop('disabled', false);
    $('#buttonSaveUserRecibe').hide();
    $('#imgUserRecibe').hide();
    $('#imgUserRecibe').attr('src', '');
    $('#inputFileUserRecibe').val('');
    $('#buttonTakeUserRecibeCard').show();
    $('#buttonTakeUserRecibeCard').prop('disabled', false);
    $('#buttonSaveUserRecibeCard').hide();
    $('#imgUserRecibeCard').hide();
    $('#imgUserRecibeCard').attr('src', '');
    $('#inputFileUserRecibeCard').val('');
    $('input[name="outArticleLoseModalEstatus"]').prop('checked', false);
    $('#outArticleLoseModalRecibe').val('')
    $('#outArticleLoseModalTel').val('')
}

function formatDate(isoDateStr){
    const dateObj = new Date(isoDateStr);
    if(dateObj!==""){
        let formattedDateStr
        try {
            formattedDateStr = dateObj.toISOString().replace('T', ' ').substring(0, 16);
        }catch{
            errorAlert("Selecciona una fecha y hora válida.","Validación", "warning")
            $("#loadingButtonNuevoArticuloLose").hide();
            $("#buttonNuevoArticuloLose").show();
        }
        return formattedDateStr;
    }
}

//FUNCION agregar nuevo articulo
function nuevoArticuloLose(){
    //limpiarArticuloLose()
    $("#loadingButtonNuevoArticuloLose").show();
    $("#buttonNuevoArticuloLose").hide();
    let data = getInputsValueByClass("contentNuevoArticuloLose")
    console.log("DATAAAAAAAA",data)
    let data_article = {
        'estatus_perdido':'pendiente',
        'foto_perdido': fotosNuevoArticulo.identificacion,
        'date_hallazgo_perdido':formatDate(data.idFechaNuevoArticuloLose)+':00',
        'ubicacion_perdido':data.selectUbicacionNuevoArticuloLose,
        'area_perdido':data.selectAreaNuevoArticuloLose,
        'comentario_perdido':data.comentarioNuevoArticuloLose,
        'tipo_articulo_perdido': data.tipoArticuloNuevoArticuloLose,
        'articulo_seleccion':data.selectArticuloNuevoArticuloLose,
        'articulo_perdido':data.idNombreNuevoArticuloLose,
        'color_perdido':data.colorNuevoArticuloLose,
        'descripcion':data.descripcionNuevoArticuloLose,
        'quien_entrega':data.externoNuevoArticuloLose || data.internoNuevoArticuloLose,
        'quien_entrega_interno':data.entregaInternoNuevoArticuloLose||"",
        'quien_entrega_externo':data.entregaExternoNuevoArticuloLose||"",
        'locker_perdido':data.lockerNuevoArticuloLose
    }
    console.log("QUE ONDA",data_article)
    if(data_article.ubicacion_perdido==""||data_article.tipo_articulo_perdido=="" || data_article.articulo_seleccion ==""||data_article.locker_perdido==""
     ||data_article.color_perdido=="" ||data_article.quien_entrega==''){
        successMsg("Validación", "Faltan campos por llenar, los campos marcados con asterisco son obligatorios.", "warning")
        $("#loadingButtonNuevoArticuloLose").hide();
        $("#buttonNuevoArticuloLose").show();
    } else {
        //INFO: Poner FETCH AQUI para enviar el nuevo registro de incidencia
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name:"articulos_perdidos.py",
                option:"nuevo_articulo",
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
                    $("#loadingButtonNuevoArticuloLose").hide();
                    $("#buttonNuevoArticuloLose").show();
                    errorAlert(data)
                }else if(data.status_code==202 || data.status_code==201){
                    successMsg("Confirmación", "Artículo perdido registrado correctamente.", type = "success")
                    let selectedArticle = {}
                    selectedArticle.folio = data.json.folio
                    for (let key in data_article){
                        if(key == 'date_hallazgo_perdido'){
                            let formatDate= data_article[key].slice(0,-3)
                            data_article[key]= formatDate
                            selectedArticle[key]=data_article[key]
                        }else{
                            console.log("nuevoooo", key, data_article[key])
                            selectedArticle[key]= data_article[key]
                        }
                    }
                    data_article.reporta_perdido=""
                    if(data_article.hasOwnProperty('quien_entrega_interno')){
                        if(data_article.quien_entrega_interno!=="" && data_article.quien_entrega_interno!==undefined){
                            selectedArticle.reporta_perdido= data_article.quien_entrega_interno
                        }else{
                            selectedArticle.reporta_perdido=""
                        }
                    }else if(data_article.hasOwnProperty('quien_entrega_externo')){
                        if(data_article.quien_entrega_externo!=="" && data_article.quien_entrega_externo!==undefined){
                            selectedArticle.reporta_perdido= data_article.quien_entrega_externo
                        }else{
                            selectedArticle.reporta_perdido=""
                        }
                    }
                    dataTableArticlesLose.unshift(selectedArticle)
                    tables["tableArticlesLose"].setData(dataTableArticlesLose);
                    $("#newArticleLoseModal").modal('hide')
                    $("#loadingButtonNuevoArticuloLose").hide();
                    $("#buttonNuevoArticuloLose").show();
                }
            }else{
                errorAlert(res)
                $("#loadingButtonNuevoArticuloLose").hide();
                $("#buttonNuevoArticuloLose").show();
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
    console.log("folio", folio)
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
async function guardarArchivos(id, isImage){
    loadingService()
    const fileInput = document.getElementById(id);
    const file = fileInput.files[0]; // Obtener el archivo seleccionado
    console.log("FILEEE", fileInput, file)
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

//FUNCION editar el articulo consesionado
function editarArticuloLoseModal(){
    //limpiarArticuloLose('Editar')
    $("#loadingButtonEditarArticuloLose").show();
    $("#buttonEditarArticuloLose").hide();
    let data = getInputsValueByClass('contentEditarArticuloLose')
    console.log("Informaciond e edicion",data)
    let selected=''
    for(d of dataTableArticlesLose){
        if(d.folio == selectedRowFolio)
            selected = d
    }
    console.log("FOOT",fotosNuevoArticulo.foto)
    let data_article_update={
        'estatus_perdido':'pendiente',
        'foto_perdido': fotosNuevoArticulo.foto,
        'date_hallazgo_perdido':formatDate(data.idFechaEditarArticuloLose)+':00',
        'ubicacion_perdido':data.selectUbicacionEditarArticuloLose,
        'area_perdido':data.selectAreaEditarArticuloLose,
        'comentario_perdido':data.comentarioEditarArticuloLose,
        'tipo_articulo_perdido': data.tipoArticuloEditarArticuloLose,
        'articulo_seleccion':data.selectArticuloEditarArticuloLose,
        'articulo_perdido':data.idNombreEditarArticuloLose,
        'color_perdido':data.colorEditarArticuloLose,
        'descripcion':data.descripcionEditarArticuloLose,
        'quien_entrega':data.externoEditarArticuloLose !=="" ? data.externoEditarArticuloLose : data.internoEditarArticuloLose ||"",
        'quien_entrega_interno':data.entregaInternoEditarArticuloLose||"",
        'quien_entrega_externo':data.entregaEditarArticuloLose!==""? data.entregaEditarArticuloLose :"",
        'locker_perdido':data.lockerEditarArticuloLose
    }
    console.log("perddo",data_article_update.foto_perdido )
    let cleanSelected = (({ actions, checkboxColumn, folio,foto_concesion,recibe_concesion,updated_at, type_perdido, 
        date_entrega_perdido,foto_recibe_perdido,identificacion_recibe_perdido,recibe_perdido,reporta_perdido,
        telefono_recibe_perdido,guard_perdido,...rest }) => rest)(selected);

    if(data_article_update.foto_perdido==0){
        for(let d of cleanSelected.foto_perdido){
            data_article_update.foto_perdido.unshift(d)
        }
    }
    console.log("OBJWERO",data_article_update.foto_perdido )
    if(cleanSelected.date_hallazgo_perdido){
        let partes=cleanSelected.date_hallazgo_perdido.split(" ")
        let date = partes[0]+' '+partes[1]+":00"
        cleanSelected.date_hallazgo_perdido= date
     }
    if(cleanSelected.date_entrega_perdido){
        let partes=cleanSelected.date_entrega_perdido.split(" ")
        let date = partes[0]+' '+partes[1]+":00"
        cleanSelected.date_entrega_perdido = date
    } 

    let validateObj = encontrarCambios(cleanSelected,data_article_update)
    if(Object.keys(validateObj).length == 0){
        Swal.fire({
            title: "Validación",
            text: "Edita algo para actualizar la información.",
            type: "warning"
        });
        $("#loadingButtonEditarArticuloLose").hide();
        $("#buttonEditarArticuloLose").show();
    } else {
        if(data_article_update.foto_perdido.length ==0){
            delete data_article_update.foto_perdido
        }
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name:"articulos_perdidos.py",
                option:"update_article",
                data_article_update: data_article_update,
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
                    errorAlert(data)
                    $("#loadingButtonEditarArticuloLose").hide();
                    $("#buttonEditarArticuloLose").show();
                }else if(data.status_code==202 || data.status_code==201 ){
                    successMsg("Confirmación","Articulo actualizado correctamente.", "success")
                    let selectedArt = dataTableArticlesLose.find(x => x.folio === selected.folio);
                    for (let key in data_article_update){
                        if(key=='date_hallazgo_perdido' || key=='date_entrega_perdido' ){
                            let formatDate= data_article_update[key].slice(0,-3)
                            data_article_update[key]= formatDate
                            selectedArt[key]= data_article_update[key]
                        }else if(key=='articulo_seleccion'){
                            data_article_update[key]= data_article_update.articulo_seleccion!=="" ? data_article_update.articulo_seleccion: data_article_update.quien_entrega_externo;
                            selectedArt[key]= data_article_update[key]
                        }else if (key=='articulo_perdido'){
                            data_article_update[key]=data_article_update.articulo_perdido!==""&&data_article_update.articulo_perdido!==undefined? data_article_update.articulo_perdido: "";
                            selectedArt[key]= data_article_update[key]
                        }else if(key=='reporta_perdido'){
                            if(data_article_update.hasOwnProperty('quien_entrega_interno')){
                                if(data_article_update.quien_entrega_interno!=="" && data_article_update.quien_entrega_interno!==undefined){
                                    selectedArt[key]= data_article_update.quien_entrega_interno
                                }else{
                                    selectedArt[key]=""
                                }
                            }else if(data_article_update.hasOwnProperty('quien_entrega_externo')){
                                if(data_article_update.quien_entrega_externo!=="" && data_article_update.quien_entrega_externo!==undefined){
                                    selectedArt[key]= data_article_update.quien_entrega_externo
                                }else{
                                    selectedArt[key]=""
                                }
                            }
                        }else if(key=='foto_perdido'){
                            console.log("FOTOOO",data_article_update.foto_perdido)
                            if(data_article_update.foto_perdido.length>0){
                                data_article_update.foto_perdido.unshift(data_article_update.foto_perdido)
                            }else{
                                data_article_update[key]= data_article_update.foto_perdido
                            }
                            selectedArt[key]= data_article_update[key]
                        }
                        else{
                            selectedArt[key]= data_article_update[key]
                        }
                        
                    }

                    data_article_update.reporta_perdido=""
                    if(data_article_update.hasOwnProperty('quien_entrega_interno')){
                        if(data_article_update.quien_entrega_interno!=="" && data_article_update.quien_entrega_interno!==undefined){
                            selectedArt.reporta_perdido= data_article_update.quien_entrega_interno
                        }else{
                            selectedArt.reporta_perdido=""
                        }
                    }else if(data_article_update.hasOwnProperty('quien_entrega_externo')){
                        if(data_article_update.quien_entrega_externo!=="" && data_article_update.quien_entrega_externo!==undefined){
                            selectedArt.reporta_perdido= data_article_update.quien_entrega_externo
                        }else{
                            selectedArt.reporta_perdido=""
                        }
                    }
                    tables["tableArticlesLose"].setData(dataTableArticlesLose);
                    $("#editArticleLoseModal").modal('hide');
                    $("#loadingButtonEditarArticuloLose").hide();
                    $("#buttonEditarArticuloLose").show();
                }
            }else{
                errorAlert(res)
                $("#loadingButtonEditarArticuloLose").hide();
                $("#buttonEditarArticuloLose").show();
            }
        });
    }
}

//FUNCION devolver el articulo desde la tabla
function verDevolucionArticulo(folio, type){
    console.log("HII")
    if(type =='article'){
        let data= getInputsValueByClass('outArticleCon')
        let selectedArt = dataTableArticles.find(e => e.folio == folio)
        selectedArt.date = data.outArticleFecha
        selectedArt.time = data.outArticleHora
        selectedArt.recibe = data.outArticleRecibe
        selectedArt.status = data.hasOwnProperty("outArticleEstado2") ? 'Cerrado': 'Abierto'
        tables["tableArticles"].setData(dataTableArticles);
        $("#outArticleModal").modal('show')

    }else if(type == 'articleLose') {
        
        let selectedArticleLose = dataTableArticlesLose.find(e => e.folio == folio)
        selectedRowFolio=selectedArticleLose.folio
        if(selectedArticleLose.date_entrega_perdido!=="" && selectedArticleLose.date_entrega_perdido!==undefined){
            successMsg("Validación", "Este artículo ya fue entregado.", "warning")
        }else{
            $("#outArticleLoseModal").modal('show')
        }
    }
}

function devolucionArticulo(){
    loadingService()
     let selectedArticleLose = dataTableArticlesLose.find(e => e.folio == selectedRowFolio)
     let data= getInputsValueByClass('outArticleLose')
     console.log("IMAGENESSS Y DATAA", data,fotosDevolucion )
     let data_article_update={
            'recibe_perdido':data.outArticleLoseModalRecibe,
            'telefono_recibe_perdido':data.outArticleLoseModalTel,
            'identificacion_recibe_perdido':fotosDevolucion.userRecibeCard,
            'foto_recibe_perdido':fotosDevolucion.userRecibe,
            'estatus_perdido':data.statusDonated ||data.statusDelivered 
        }
     if(tienePropiedadesVacias(data_article_update) || tienePropiedadesVacias(fotosDevolucion.userRecibe[0]) 
        || tienePropiedadesVacias(fotosDevolucion.userRecibeCard[0])){
        successMsg("Validación", "Faltan campos por llenar", "warning")
     }else{
        fetch(url + urlScripts, {
                method: 'POST',
                body: JSON.stringify({
                    script_name:"articulos_perdidos.py",
                    option:"update_article",
                    data_article_update: data_article_update,
                    folio: selectedArticleLose.folio
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
                        errorAlert(data);
                        //Swal.close()
                    }else if (data.status_code==202 || data.status_code==202){
                        for(let key in data_article_update){
                            selectedArticleLose[key]= data_article_update[key]
                        }
                        if(data.json.hasOwnProperty('date_entrega_perdido')){
                            let formatDate= data.json.date_entrega_perdido.slice(0,-3)
                            selectedArticleLose.date_entrega_perdido= formatDate
                        }else{
                            selectedArticleLose.date_entrega_perdido= ""
                        }
                        console.log("DATAA", selectedArticleLose)
                        Swal.close()
                        tables["tableArticlesLose"].setData(dataTableArticlesLose);
                        successMsg("Confirmación", "Artículo entregado correctamente.", "success")
                        $("#outArticleLoseModal").modal('hide')
                        //location.reload()
                    }
                }else{
                    errorAlert(res)
                    //Swal.close()
                }
            })
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

function stopStream(stream) {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }
}

//FUNCION obtener la imagen del canvas
function getScreenCard(){
    if(!flagVideoCard){
        flagVideoCard = true;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }})
            .then(function(stream) {
                let video = document.createElement('video');
                video.style.width = '200px';
                video.style.height = '125px';
                document.getElementById('containerCard').appendChild(video);
                video.srcObject = stream;
                video.play();
                let canvas = document.getElementById('canvasPhoto');
                let context = canvas.getContext('2d');
                //----Take Photo
                $("#buttonTakeCard").attr('disabled','disabled');
                $("#buttonTakeCard").hide();
                $("#buttonSaveCard").show();
                document.getElementById('buttonSaveCard').addEventListener('click', function() {
                    setTranslateImageCard(context, video, canvas)
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

//FUNCION obtener la imagen del canvas
function getScreenUser(id="User", flagVideoUser){
    console.log("flagVideoUser",flagVideoUser)
    if(!flagVideoUser){
        flagVideoUser = true;
        console.log("111111111111111111")
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }})
            .then(function(stream) {
                 console.log("dentroo")
                let video = document.createElement('video');
                video.style.width = '200px';
                video.style.height = '125px';
                console.log(document.getElementById('container'+id))
                document.getElementById('container'+id).appendChild(video);
                video.srcObject = stream;
                video.play();
                let canvas = document.getElementById('canvasPhoto'+id);
                let context = canvas.getContext('2d');
                //----Take Photo
                //$("#buttonTake"+id).attr('disabled','disabled');
                $("#buttonTake"+id).hide();
                $("#buttonSave"+id).show();
                document.getElementById('buttonSave'+id).addEventListener('click', function() {
                    setTranslateImageUser(context, video, canvas, id)
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

// Limpia el estado del stream cuando la pestaña se cierra o se cancela el modal
window.addEventListener('beforeunload', function() {
    localStorage.setItem('cameraInUse', 'false');
});

//FUNCION obtener la imagen del canvas parte2
function setTranslateImageUser(context, video, canvas, id){
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let photoCard = document.getElementById('img'+id);
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
        document.getElementById("inputFile"+id).files = dT.files;
    } );
    //-----Rquest Photo
    const flagBlankUser = isCanvasBlank(document.getElementById('canvasPhoto'+id));
    if(!flagBlankUser){
        setTimeout(() => {
            setRequestFileImg('input'+id);
        }, "1000");
    }
    //-----Clean ELement
    $("#buttonSave"+id).hide();
}

//FUNCION obtener la imagen del canvas parte2
function setTranslateImageCard(context, video, canvas){
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let photoCard = document.getElementById('imgCard');
    photoCard.src = canvas.toDataURL('image/png');
    photoCard.style.display = 'block';
    video.pause();
    video.srcObject.getTracks().forEach(function(track) {
        track.stop();
    });
    video.style.display = 'none';
    ///-- Save Input
    canvas.toBlob( (blob) => {
        const file = new File( [ blob ], "imageCard.png" );
        const dT = new DataTransfer();
        dT.items.add( file );
        document.getElementById("inputFileCard").files = dT.files;
    } );
    //-----Rquest Photo
    const flagBlankCard = isCanvasBlank(document.getElementById('canvasPhoto'));
    if(!flagBlankCard){
        setTimeout(() => {
            setRequestFileImg('inputCard');
        }, "1000");
    }
    //-----Clean ELement
    $("#buttonSaveCard").hide();
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
    loadingService()
    let idInput = '';
    if(type == 'inputCard'){
        idInput = 'inputFileCard';
    }else if(type == 'inputUser'){
        idInput = 'inputFileUser';
    }else if(type == 'inputUserRecibeCard'){
        idInput = 'inputFileUserRecibeCard';
    }else if(type == 'inputUserRecibe'){
        idInput = 'inputFileUserRecibe';
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
            Swal.close()
            console.log("aaaaa",res)
            if(res.file !== undefined && res.file !== null){
                console.log("HELLLo",type)
                if(type == 'inputCard'){
                    urlImgCard = res.file;
                    fotosNuevoArticulo.identificacion.push({"file_name":res.file_name, "file_url":res.file})
                    var canvas = document.getElementById('canvasPhoto');
                    var ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                }else if(type == 'inputUser'){
                    urlImgUser = res.file;
                    fotosNuevoArticulo.foto.push({"file_name":res.file_name, "file_url":res.file})
                    var canvas = document.getElementById('canvasPhotoUser');
                    var ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                }else if(type == 'inputUserRecibeCard'){
                    urlImgUser = res.file;
                    fotosDevolucion.userRecibeCard.push({"file_name":res.file_name, "file_url":res.file})
                    var canvas = document.getElementById('canvasPhotoUserRecibeCard');
                    var ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                }else if(type == 'inputUserRecibe'){
                    urlImgUser = res.file;
                    fotosDevolucion.userRecibe.push({"file_name":res.file_name, "file_url":res.file})
                    var canvas = document.getElementById('canvasPhotoUserRecibe');
                    var ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
            }else{
                Swal.close()
                console.log('Error aqui 2');
                return 'Error';
            }
        })
        .catch(error => {
            Swal.close()
            console.log('Error aqui 3',error);
            return 'Error';
        });
    }else{
        return 'Error';
    }
}