let urlImgCard=""
let urlImgUser=""
let arrayAreas=[]
let arrayDias=[]
window.onload = function(){
	setValueUserLocation('pase');
	customNavbar(getValueUserLocation(), getCookie('userTurn'))
	changeButtonColor();
	onChangeOpcionesAvanzadas('checkOpcionesAvanzadas')
	iniciarSelectHora('horaNuevoPase','minNuevoPase', 'ampmNuevoPase')
	iniciarSelectHora('horaNuevoRangoVisita','minNuevoRangoVisita', 'ampmNuevoRangoVisita')
	iniciarSelectHora('horaNuevoRangoHasta','minNuevoRangoHasta', 'ampmNuevoRangoHasta')
	catalogoAreaByLocation(getCookie('userLocation'))
	$("#tipoComentario").val("")
}

function catalogoAreaByLocation(location){
	loadingService()
	fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: "pase_de_acceso.py",
            option:"area_by_location",
            location:location
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
        	Swal.close()
        	arrayAreas= res.response.data
        	for(let i of arrayAreas){
        		$("#tipoArea").append($('<option></option>').val(i).text(i));
        		$("#tipoArea").val("")
        	}
        	if(arrayAreas.length==0){
        		let tipoArea= document.getElementById("tipoArea")
        		tipoArea.innerHTML=""
        		$("#tipoArea").append($('<option disabled></option>').val("").text("No hay registros para mostrar..."));
        		$("#tipoArea").val("")
        	}
        }else{
        	errorAlert(res)
        }
    })
}

//FUNCION para agregar foto en el modal de agregar nota
function setAddCom(editAdd ="nuevo", classNam){
    let randomID = Date.now();
    let newItem=`
        <div class="d-flex mb-3 col-12  div-`+classNam+`-`+editAdd+`-`+randomID+`" id="id-`+classNam+`-div-`+randomID+`">
            <div class="flex-grow-1 d-flex">
                	<div class="col-sm-10 col-md-10 col-lg-5 col-xl-6">
		                <label for="exampleInputPassword1">Tipo de comentario: </label>
		                <select type="select" class="form-select fill paseEntradaNuevo com-div-nuevo" id="tipoComentario-`+randomID+`" >
		                	<option id="pase">Pase</option>
					        <option id="caseta">Caseta</option>
		                </select>
		            </div>
                   <div class="col-sm-10 col-md-10 col-lg-5 col-xl-6">
		                <label for="exampleInputPassword1">Instruccion o comentario: </label>
		                <textarea type="text" class="form-control fill paseEntradaNuevo com-div-nuevo" rows="1" id="telefono" placeholder=""></textarea>
		            </div>
            </div>
            <div>
                <button type="button" class="btn btn-danger button-delete-register"  onclick="setDeleteCom('`+editAdd+`',`+randomID+`,'`+classNam+`');return false;">
                   <i class="fa-solid fa-minus"></i>
                </button>
            </div>
        </div>
    `;
    $(`#`+classNam+`-input-form-`+editAdd).append(newItem) 
    $(`#tipoComentario-${randomID}`).val("")
}


//FUNCION para elimar foto en el modal de agregar nota
function setDeleteCom(editAdd ="nuevo", id, classNam){
    const elements = document.querySelectorAll(`.`+classNam+`-div-`+editAdd);
    const count = elements.length;
    if(count > 1){
        const elements = document.getElementsByClassName(`div-`+classNam+`-`+editAdd+`-`+id);
        while(elements.length > 0 && id !==123){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}//FUNCION para agregar foto en el modal de agregar nota
function setAddArea(editAdd ="nuevo", classNam){
    let randomID = Date.now();
    let newItem=`
        <div class="d-flex mb-3 col-12  div-`+classNam+`-`+editAdd+`-`+randomID+`" id="id-`+classNam+`-div-`+randomID+`">
            <div class="flex-grow-1 d-flex">
                <div class="col-sm-10 col-md-10 col-lg-5 col-xl-6">
	                <label for="exampleInputPassword1">Area: </label>
	                <select type="select" class="form-select fill paseEntradaNuevo area-div-nuevo" id="tipoArea-`+randomID+`">
	                	
	                </select>
	            </div>
               <div class="col-sm-10 col-md-10 col-lg-5 col-xl-6">
	                <label for="exampleInputPassword1">Comentario: </label>
	                <textarea type="text" class="form-control fill paseEntradaNuevo area-div-nuevo" rows="1" id="comentario" placeholder=""></textarea>
	            </div>
            </div>
            <div>
                <button type="button" class="btn btn-danger button-delete-register"  onclick="setDeleteArea('`+editAdd+`',`+randomID+`,'`+classNam+`');return false;">
                   <i class="fa-solid fa-minus"></i>
                </button>
            </div>
        </div>
    `;
    $(`#`+classNam+`-input-form-`+editAdd).append(newItem) 
    if(arrayAreas.length>0){
		for(let i of arrayAreas){
			$(`#tipoArea-${randomID}`).append($('<option></option>').val(i).text(i));
			$(`#tipoArea-${randomID}`).val("")
		}
    }else{
    	let tipoArea= document.getElementById(`"tipoArea-`+randomID+`"`)
		tipoArea.innerHTML=""
		$(`#tipoArea-${randomID}`).append($('<option disabled></option>').val("").text("No hay registros para mostrar..."));
		$(`#tipoArea-${randomID}`).val("")
    }
}


//FUNCION para elimar foto en el modal de agregar nota
function setDeleteArea(editAdd ="nuevo", id, classNam){
    const elements = document.querySelectorAll(`.`+classNam+`-div-`+editAdd);
	console.log("ELEMENTOS", elements)
    const count = elements.length;
    if(count > 1){
        const elements = document.getElementsByClassName(`div-`+classNam+`-`+editAdd+`-`+id);
        while(elements.length > 0 && id !==123){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}


function onChangeOpcionesAvanzadas(type){
	if(type=="checkOpcionesAvanzadas"){
		console.log($("#checkOpcionesAvanzadas").is(':checked'))
		if($("#checkOpcionesAvanzadas").is(':checked')){
			$(".opcionesAvanzadasDiv").show();
			onChangeOpcionesAvanzadas('radioRangoFechas')
		}else{
			$(".opcionesAvanzadasDiv").hide();
			$("#radioFechaFija").prop('checked', true);
		}
	}else if (type == "radioRangoFechas" || type=="radioFechaFija"){
		let selected = $('input[name="opcionesAvanzadas"]:checked');
		let radioRangoFechas = document.getElementById('radioRangoFechas');
		if(selected[0].id == 'radioRangoFechas'){
			$("#fechaVisitaDiv").addClass('d-flex');
			$("#fechaHastaDiv").addClass('d-flex');
			$("#fechaVisitaDiv").show()
			$("#fechaHastaDiv").show()
			$("#diasAccesoDiv").show()
			$("#radioCualquierDia").prop('checked', true);
			onChangeOpcionesAvanzadas('radioCualquierDia')
		}else if(selected[0].id == 'radioFechaFija'){
			$("#fechaVisitaDiv").removeClass('d-flex');
			$("#fechaHastaDiv").removeClass('d-flex');
			$("#fechaVisitaDiv").hide()
			$("#fechaHastaDiv").hide()
			$("#diasAccesoDiv").hide()
		}
	}else if (type == "radioCualquierDia" || type=="radioLimitarDias"){
		let selected = $('input[name="diasAcceso"]:checked');
		console.log("RANGO FECHAS",selected[0].id)
		if(selected[0].id == 'radioCualquierDia'){
			$("#diasAccesoDivDias").hide()
			
		}else if(selected[0].id == 'radioLimitarDias'){
			$("#diasAccesoDivDias").show()
		}
	}
}

function onChangeRangoFechas(){

}


function getSelectedCheckRAdio(name=""){
	 const seleccionados = $('input[name="'+name+'"]:checked');
	 let arraySelected=[]
	 console.log("SEWLEDIONADOS", seleccionados)
	 for (let i of seleccionados){
	 	arraySelected.push(i.id)
	 }
}

function copyLinkPase(id){
	console.log("data.json.id",id)
	navigator.clipboard.writeText(`https://app.linkaform.com/#/records/detail/`+id);
}

function crearConfirmacion() {
	let data= getInputsValueByClass('paseEntradaNuevo')
	let comentarios= getDataGrupoRepetitivo('com-input-form-nuevo','.com-div-nuevo' , 2)
	let areas= getDataGrupoRepetitivo('area-input-form-nuevo','.area-div-nuevo' , 2)
	console.log("DFATAAA", data)
	let areasTr=""
	for (let s of areas){
		areasTr +=	
		`<tr>
			<td>`+s.area+`</td>
			<td>`+s.comentario+`</td>
		</tr>`
	}
	let comTr=""
	for (let c of comentarios){
		comTr +=	
		`<tr>
			<td>`+c.tipo_comentario+`</td>
			<td>`+c.comentario+`</td>
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
									<td><b>	Tipo de comentario:</b></td>
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
		fechaVisitaMain= `${data.fechaVisita} ${formatHor}:${formatMin} hrs`
	}else if (hayFechaHasta){
		if(data.fechaVisitaOA !== ""){
			let formatHor= formatNumber(data.horaNuevoRangoVisita)
			let formatMin= formatNumber(data.minNuevoRangoVisita)
			fechaVisitaMain= `${data.fechaVisitaOA} ${formatHor}:${formatMin} hrs`
		}
		if(data.fechaHastaOA!==""){
			let formatHor2= formatNumber(data.horaNuevoRangoHasta)
			let formatMin2= formatNumber(data.minNuevoRangoHasta)
			fechaHastaMain= `${data.fechaHastaOA} ${formatHor2}:${formatMin2} hrs`
		}
		selectedRadioDias = $('input[name="diasAcceso"]:checked');
		console.log("RADIO DIAS",selectedRadioDias)
		selectedRadioDiasAcceso=selectedRadioDias[0].id
	}

	
	let diasSeleccionados= $('input[name="diasPase"]:checked')
	let diasArr=[]
	for (let d of diasSeleccionados){
		diasArr.push(d.value)
	}

	let buttonDays=""
	if(data.diasArr){
		buttonDays=`
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
		tituloDias=`<div class="d-flex justify-content-start mt-4 ms-2">
						<h5><b>Dias de acceso:</b></h5>
					</div>`
	}



	let html = []//getListVehiculosEquipos(location, caseta, name, company, visit, motivo)
	if(data.nombreCompleto=="" ||data.email=="" || data.telefono==""){
		successMsg("Validación", "Faltan datos por llenar", "warning")
	}else{
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
								<td><span > `+data.telefono+`</span></td>
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
					<div class="d-flex justify-content-start ms-2">
						<button type="button" class="btn btn-outline-success btn-custom week me-3" id="lunes">L</button>
						<button type="button" class="btn btn-outline-success btn-custom week me-3" id="martes">M</button>
						<button type="button" class="btn btn-outline-success btn-custom week me-3" id="miércoles">M</button>
						<button type="button" class="btn btn-outline-success btn-custom week me-3" id="jueves">J</button>
						<button type="button" class="btn btn-outline-success btn-custom week me-3" id="viernes">V</button>
						<button type="button" class="btn btn-outline-success btn-custom week me-3" id="sábado">S</button>
						<button type="button" class="btn btn-outline-success btn-custom week me-3" id="domingo">D</button>
					</div>
				</div>
		
	      `,
	        showCancelButton: true,
	        confirmButtonColor: "#28a745",
	        cancelButtonColor: "#dc3545",
	        confirmButtonText: "Generar link",
	        heightAuto:false,
	        width:750,
	    })
	    .then((result) => {
	        if (result.value) {
	        	loadingService()
		        let access_pass={
		            nombre: data.nombreCompleto,
		            email:data.email,
		            telefono: data.telefono,
		            areas: areas,
		            comentarios:comentarios,
            		perfil_pase:"visita general",
            		estatus:'Proceso',

            		custom:true
		        }
		        if(areas.length>0){
					access_pass.comentarios = comentarios
		        }
		        if(comentarios.length>0){
		        	access_pass.areas = areas
		        }
		        if(hayFechaHasta){
		        	access_pass.tipo_visita_pase= "rango_de_fechas" 
		        }else{
		        	access_pass.tipo_visita_pase= "fecha_fija"
		        }
		        if(fechaVisitaMain){
		        	access_pass.fecha_desde_visita=fechaVisitaMain.slice(0, -4) +':00';
		        }
		        if(fechaHastaMain){
		        	access_pass.fecha_desde_hasta=fechaHastaMain.slice(0, -4) +':00';
		        }
		        if(selectedRadioDiasAcceso=='radioCualquierDia'){
		        	access_pass.config_dia_de_acceso='cualquier_día'
		        }else{
		        	access_pass.config_dia_de_acceso='limitar_días_de_acceso'
		        }
		        if(diasArr.length>0){
		        	access_pass.config_dias_acceso = diasArr 
		        }
	        	fetch(url + urlScripts, {
			        method: 'POST',
			        body: JSON.stringify({
			            script_name: "pase_de_acceso.py",
		                option: 'create_access_pass',
		                location:getCookie('userLocation'),
		                access_pass: access_pass
			        }),
			        headers:{
			            'Content-Type': 'application/json',
			            'Authorization': 'Bearer '+userJwt
			        },
			    })
			    .then(res => res.json())
			    .then(res => {
			        if (res.success) {
			        	let data=res.response.data
			        	if(data.status_code==400 || data.status_code==401){
                        let errores=[]
                        for(let err in data.json){
                            errores.push(data.json[err].label+': '+data.json[err].msg)
                        }
                        Swal.fire({
                            title: "Error",
                            text: errores.flat(),
                            type: "error"
                        });
                    }else if(data.status_code==202 || data.status_code==201){
			        	Swal.close()
			        	Swal.fire({
				      		imageUrl: "https://f001.backblazeb2.com/file/lkf-media/company_pictures/company_pic_10.png",
				      		text: "Tu informacion se ha guardado correctamente.",
						    html:`
						      	<div class="mb-3 mt-2" style="font-weight: bold; font-size: 1.1em; color:#8ebd73 !important; "> Pase de entrada generado. </div>
						        <div class="d-flex flex-column justify-content-center align-items-center">
			    			      	<div class='align-items-start m-2'>
			    			      	  	El pase de entrada se ha generado correctamente. Por favor, copie el siguiente enlace y compartalo con el visitante para
			    			      	  	completar el proceso.
			    			    	</div>
						        </div>`,
						    showCancelButton:false,
						    showConfirmButton:true,
						    confirmButtonText: "Copiar Link"
						 }).then((result)=>{
						 	if (result.value) {
						 		copyLinkPase(data.json.id);
						 	}
						 })
                    }
			        }else{
						Swal.close()
						errorAlert(res)
			        }
			    });


		      	
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
}