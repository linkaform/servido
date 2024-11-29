let colors = getPAlleteColors(12,0)

window.onload = function(){
    let userA = getCookie("userId");
    userJwt = getCookie("userJwt");
    if(userA !='' && userJwt!=''){
        drawTable('tableListTodos',columnsTableListPendientes, dataTableListTodos );
        drawTable('tableListFavoritos',columnsTableListPendientes, dataTableListFavoritos );
        drawTable('tableListActivos',columnsTableListPendientes, dataTableListActivos );
        drawTable('tableListVencidos',columnsTableListPendientes, dataTableListVencidos );
    }else{
        setCloseSession();
    }

    setValueUserLocation('pases');
    $("#locCard").hide()
    changeButtonColor();
    customNavbar(getValueUserLocation(), getCookie('userTurn'))
	
    selectLocation= document.getElementById("selectLocation")
    selectCaseta= document.getElementById("selectCaseta")

    selectLocation.onchange = function() {
        let response = fetchOnChangeLocation(selectLocation.value)
    };
    selectCaseta.onchange = async function() {
        let response = await fetchOnChangeCaseta('notes.py', 'get_notes', selectCaseta.value, selectLocation.value)
        reloadTableNotas(response.response.data)
    };
    fillCatalogs();
    // getAllData();
    getAllDataPases()
}

function setModal(type = 'none',id ="", nombre='', email=''){
    if(type== "favoritos"){
        modalFavoritos(id)
    }else if(type== "ver"){
        modalVerPase()
    }else if(type== "editar"){
        modalEditarPase()
    }else if(type== "reenviar"){
        modalReenviarPase()
    }
}


function getAllDataPases(){
    loadingService()
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name:'pase_de_acceso.py',
            option:'get_my_pases',
            tab_status:'Todos'
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
            Swal.close()
            if(user !='' && userJwt!=''){
                    let incidencias=res.response.data
                    if(incidencias.length >0){
                        for(let incidencia of incidencias){
                            // let dateFormat= incidencia.fecha_hora_incidencia.slice(0,-3)
                            dataTableListTodos.push({
                                folio:incidencia.folio, 
                                _id: incidencia._id,
                                nombre: incidencia.reporta_incidencia ||"",
                                email:incidencia.fecha_hora_incidencia||"",
                                phone: incidencia.ubicacion_incidencia||"",
                                fechaCreacion:"",
                                vigencia:"",
                                visitante:incidencia.nombre,
                                tipoPase:'Visita General',
                                motivo: '',
                                estado:''
                            })
                        }
                    }else{
                        dataTableListTodos = []
                    }
                   
                    drawTable('tableListTodos', columnsTableListPendientes, dataTableListTodos);
                    /*$("#descargarIncidencias").on("click", function() {
                        descargarExcel(tables, 'tableIncidencias')
                    });*/
                    /*let selectedIncidencias = getActiveCheckBoxs(tables,'tableIncidencias')
                    let buttonEliminarIncidencias=document.getElementById('buttonEliminarIncidencias');
                    if(selectedIncidencias.length>0) buttonEliminarIncidencias.display= 'none'*/
            } else{
                redirectionUrl('login',false);
            }
        }
    })
}

function modalFavoritos(folio){
    //TERMINANDO REVISAR QUE FUNCIONE Y CORREGIR ERORRES
    console.log("folio", folio)
    let bodyInf={}
    bodyInf={script_name:"pase_de_acceso.py", option:"update_pass", folio:folio}
    let access_pass={'favoritos': ['si'], }
    Swal.fire({
        title:'¿Estas seguro de querer agregar a favoritos?',
        html:``,
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
            loadingService()
            fetch(url + urlScripts, {
                method: 'POST',
                body: JSON.stringify({
                    script_name: bodyInf.script_name,
                    option: bodyInf.option,
                    access_pass: access_pass,
                    folio:folio,
                    account_id: parseInt(getCookie('userId'))
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
                    }else if(data.status_code==202 ||data.status_code==201 ){
                        Swal.close();
                        Swal.fire({
                            title: "Success",
                            text: "Se agrego a favoritos correctamente.",
                            type: "success",
                            showConfirmButton:false,
                            timer:1200
                        });
                        /*let dataFiltered = dataTableIncidencias.filter(x => x.folio !== folio);
                        dataTableIncidencias = dataFiltered
                        tables["tableIncidencias"].setData(dataTableIncidencias);*/
                    }
                }else{
                    errorAlert(res)
                }
            });
        }
    });
}

function modalVerPase(folio){
    //CAMBIAS LOS ID PARA ADAPTAR EL MODAL

    let data = dataPases.filter(x => x.folio !== folio);
    //let data= getInputsValueByClass('paseEntradaNuevo')
    // let comentarios= getDataGrupoRepetitivo('com-input-form-nuevo','.com-div-nuevo' , 0)
    let arrComentarios= document.getElementsByClassName('com-div-nuevo')
    let comentarios=[]
    for(let c of arrComentarios){
        if(c.id.includes("instruccionComentario-") && c.value !== ""){
            comentarios.push({tipo_comentario:"Pase", comentario_pase: c.value})
        }
    }
    let areas= getDataGrupoRepetitivo('area-input-form-nuevo','.area-div-nuevo' , 2)
    let areasTr=""
    for (let s of areas){
        areasTr +=  
        `<tr>
            <td>`+s.nombre_area+`</td>
            <td>`+s.commentario_area+`</td>
        </tr>`
    }
    let comTr=""
    for (let c in comentarios){
        comTr +=    
        `<tr>
            <td>`+comentarios[c].tipo_comentario+` </td>
            <td>`+comentarios[c].comentario_pase+`</td>
        </tr>`
    }
    let mainAccesos=""
    if(areasTr){
        mainAccesos=`<table class="table table-borderless" >
                        <thead>
                            <tr>
                                <th style=" text-align:left !important;"><h5><b> Areas de acceso</b></h5></th>
                                <th > </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>Area: </b></td>
                                <td><b>Comentario:</b></td>
                            </tr>
                            `+areasTr+`
                        </tbody>
                    </table>`
    }
    let mainComentarios=""
    if(comTr){
        mainComentarios=`<table  class="table table-borderless">
                            <thead>
                                <tr>
                                    <th style=" text-align:left !important;" class="m-0"><h5><b> Comentarios/Instrucciones </b></h5></th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><b> Tipo de comentario:</b></td>
                                    <td><b>Comentario</b></td>
                                </tr>
                                `+comTr+`
                            </tbody>
                        </table>`
    }

    let fechaVisitaMain = ""
    let fechaHastaMain = ""
    let selectedRadioDias = ""
    let selectedRadioDiasAcceso = ""
    let hayFechaVisita = $("#radioFechaFija").is(':checked') && data.fechaVisita !== ""
    let hayFechaHasta = $("#radioRangoFechas").is(':checked')
    if(hayFechaVisita){
        let formatMin = formatNumber(data.minNuevoPase)
        let formatHor = formatNumber(data.horaNuevoPase)
        fechaVisitaMain= `${data.fechaVisita} ${formatHor}:${formatMin}:00`
        console.log("UHNA SOLA FECHAA", new Date(),fechaVisitaMain.replace(" ", "t"))
    }else if (hayFechaHasta){
        if(data.fechaVisitaOA !== ""){
            let formatHor= formatNumber(data.horaNuevoRangoVisita)
            let formatMin= formatNumber(data.minNuevoRangoVisita)
            fechaVisitaMain= `${data.fechaVisitaOA} 00:00:00`
        }
        if(data.fechaHastaOA!==""){
            let formatHor2= formatNumber(data.horaNuevoRangoHasta)
            let formatMin2= formatNumber(data.minNuevoRangoHasta)
            fechaHastaMain= `${data.fechaHastaOA} 00:00:00`
        }
        selectedRadioDias = $('input[name="diasAcceso"]:checked');
        selectedRadioDiasAcceso=selectedRadioDias[0].id
        let fechaActual= new Date()
        let fecha1= fechaVisitaMain.replace(" ", "t")
        let fecha2= fechaHastaMain.replace(" ", "t")
        if(fecha1 < fechaActual || fecha2 < fechaActual){
            console.log("RANGO DE FECHAS INVALIDO")
            $("#fechaVisitaOA").val("")
            $("#fechaHastaOA").val("")
        }
        console.log("RANGO9 DE FECHAS", fechaActual, fecha1, fecha2 )
    }
    let diasArr=[]
    let checkboxes = document.querySelectorAll('input[name="diasPase"]');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            diasArr.push(checkbox.value)
        }
    });

    let checkPregistro=[]
    let correoSms = document.querySelectorAll('input[name="enviarCorreoSms"]');
    correoSms.forEach(function(checkbox) {
        if (checkbox.checked) {
            checkPregistro.push(checkbox.value)
        }
    });

    let checkDocSeleccionados= []
    $('input[name="AgregarFotoIdent"]:checked').each(function() {
        checkDocSeleccionados.push($(this).val()); 
    });
    let buttonDays=""
    if(diasArr.length>0){
        buttonDays=`
        <div class="d-flex justify-content-start mt-4 ms-2">
                        <h5><b>Dias de acceso:</b></h5>
                    </div>
        <div class="d-flex justify-content-start ms-2">
            <button type="button" class="btn btn-outline-success btn-custom week me-3" id="lunes">L</button>
            <button type="button" class="btn btn-outline-success btn-custom week me-3" id="martes">M</button>
            <button type="button" class="btn btn-outline-success btn-custom week me-3" id="miércoles">M</button>
            <button type="button" class="btn btn-outline-success btn-custom week me-3" id="jueves">J</button>
            <button type="button" class="btn btn-outline-success btn-custom week me-3" id="viernes">V</button>
            <button type="button" class="btn btn-outline-success btn-custom week me-3" id="sábado">S</button>
            <button type="button" class="btn btn-outline-success btn-custom week me-3" id="domingo">D</button>
        </div>`
    }
    let fechaVisitaDiv=""
    if(fechaVisitaMain){
        fechaVisitaDiv=`<div class="d-flex flex-wrap ms-2">
                            <div>
                                <i class="fa-regular fa-calendar"></i>
                            </div>
                            <div class="ms-3">
                                Fecha y hora de visita: `+fechaVisitaMain+`
                            </div>
                        </div>`
    }
    let fechaHastaDiv=""
    if(fechaHastaMain){
        fechaHastaDiv=` <div class="d-flex mt-3 ms-2">
                            <div>
                                <i class="fa-regular fa-calendar"></i>
                            </div>
                            <div class="ms-3">
                                Fecha y hora de hasta: `+fechaHastaMain+`
                            </div>
                        </div>`
    }
    let tituloVigencia=""
    if(fechaHastaMain || fechaVisitaMain){
        tituloVigencia=`<div class="d-flex justify-content-start mt-3 ms-2">
                            <h5><b>Vigencia y acceso:</b></h5>
                        </div>`
    }
    let tituloDias=""
    if(true){
        tituloDias=``
    }
    let limiteEntradasTexto=""
    if(data.limiteEntradas!==""){
        limiteEntradasTexto=`
            <div class="d-flex justify-content-start mt-3 ms-2">
                <p><span class="me-2"><b>Limite de entradas:</b></span>`+ data.limiteEntradas+`</p>
            </div>
        `
    }
    let numValid = iti.isValidNumber()
    let numeroConLada = ""
    if(numValid){
        numeroConLada = iti.getNumber();
    }
    let html = []//getListVehiculosEquipos(location, caseta, name, company, visit, motivo)
    Swal.fire({
            title:'Confirmación',
            html:`
                <div>
                    <table class="table table-borderless" >
                        <thead>
                            <tr>
                                <th  style=" text-align:left !important;" > <h5> <b>Sobre la visita</b></h5> </th>
                                <th > </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>Tipo de pase:</b></td>
                                <td><b>Estatus:</b></td>
                            </tr>
                            <tr>
                                <td>Visita General</td>
                                <td><span > Proceso </span></td>
                            </tr>
                            <tr>
                                <td><b>Nombre completo:</b></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>`+data.nombreCompleto+`</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><b>Email:</b></td>
                                <td><span ><b>Teléfono:</b></span></td>
                            </tr>
                            <tr>
                                <td> `+data.email+`</td>
                                <td><span > `+numeroConLada+`</span></td>
                            </tr>
                            <tr>
                                <td><b>Ubicación:</b></td>
                                <td><span ><b>Tema de la cita:</b></span></td>
                            </tr>
                            <tr>
                                <td> `+data.ubicacion+`</td>
                                <td><span > `+data.temaCita+`</span></td>
                            </tr>
                             <tr>
                                <td><b>Descripción:</b></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>`+data.descripcion+`</td>
                                <td> </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr>
                    `+mainAccesos+`
                    `+mainComentarios+`
                    `+tituloVigencia+`
                    `+fechaVisitaDiv+`
                    `+fechaHastaDiv+`
                    `+tituloDias+`
                    `+limiteEntradasTexto+`
                    `+buttonDays+`
                </div>
        
          `,
            confirmButtonColor: "#28a745",
            showCancelButton: false,
            cancelButtonColor: "#dc3545",
            confirmButtonText:'',
            cancelButtonText:'Cerrar',
            heightAuto:false,
            reverseButtons: true,
            width:750,
    })
    .then((result) => {
        if (result.value) {
           Swal.close()
        }
    });

    if(diasArr.length>0){
        for(let d of diasArr){
            $("#"+d+"").removeClass('btn-outline-success');
            $("#"+d+"").addClass('bg-dark');
            $("#"+d+"").addClass('color-white');
        }
    }
}

function modalEditarPase(){
    $("#paseEntradaEditar").modal('show')
}

function modalReenviarPase(folio){
     //TERMINANDO REVISAR QUE FUNCIONE Y CORREGIR ERORRES
    console.log("folio", folio)
    let bodyInf={}
    bodyInf={script_name:"pase_de_acceso.py", option:"update_pass", folio:folio}
    let access_pass={'favoritos': ['Agregar a favoritos'], }
    Swal.fire({
        title:'¿Estas seguro de querer reenviar el pase?',
        html:`Al reenviar el pase el visitante recibira un correo con los datos correspondientes de la visita.`,
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
            loadingService()
            fetch(url + urlScripts, {
                method: 'POST',
                body: JSON.stringify({
                    script_name: bodyInf.script_name,
                    option: bodyInf.option,
                    access_pass: access_pass,
                    folio:folio,
                    account_id: parseInt(getCookie('userId'))
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
                    }else if(data.status_code==202 ||data.status_code==201 ){
                        Swal.close();
                        Swal.fire({
                            title: "Success",
                            text: "Se agrego a favoritos correctamente.",
                            type: "success",
                            showConfirmButton:false,
                            timer:1200
                        });
                        /*let dataFiltered = dataTableIncidencias.filter(x => x.folio !== folio);
                        dataTableIncidencias = dataFiltered
                        tables["tableIncidencias"].setData(dataTableIncidencias);*/
                    }
                }else{
                    errorAlert(res)
                }
            });
        }
    });
}