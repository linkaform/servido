let urlImgCard=""
let urlImgUser=""
let arrayAreas=[]
let arrayDias=[]
let flagVideoCard = false;
let flagVideoUser = false;
let colors = getPAlleteColors(12,0)
let nombre=""
let email=""
let tel=""
let id=""
let dataCatalogs=[]
let catEstados=[]
let qr_code=""
window.onload = function(){
	setValueUserLocation('pase');
	customNavbar(getValueUserLocation(), getCookie('userTurn'))
	changeButtonColor();
	const valores = window.location.search;
	const urlParams = new URLSearchParams(valores);

	id = urlParams.get('id') !== null ? urlParams.get('id') :'' ;
	nombre = urlParams.get('nombre') !== null ? urlParams.get('nombre') :'' ;
	email = urlParams.get('email') !== null ? urlParams.get('email') :'' ;
	tel = urlParams.get('tel') !== null ? urlParams.get('tel') :'' ;
	if(id){
		console.log("OCUUILTAR LA IFNORMACION", nombre, email, tel)
        customNavbar(getValueUserLocation(), userTurnCerrado)
		$("#paseEntradaInf1").hide()
		$("#paseEntradaInf2").hide()
		$("#paseEntradaInf3").hide()
		$("#paseEntradaInf4").hide()
		$("#paseEntradaInf5").show()
		$("#paseEntradaInf6").show()
		$("#nombreText").text(nombre)
		$("#emailText").text(email)
		$("#telefonoText").text(tel)
		getCatalogsIngreso()
		onChangeOpcionesAvanzadas('agregarVehiculoEquipo')
		$("#selectTipoEquipo-123").val("")
		$("#inputColorVehiculo-123").val("")
        $("#inputColorEquipo-123").val("")
		//onChangeCatalog('vehiculo', "")
	}else{
		$("#paseEntradaInf1").show()
		$("#paseEntradaInf2").show()
		$("#paseEntradaInf3").show()
		$("#paseEntradaInf4").show()
		$("#paseEntradaInf5").hide()
		$("#paseEntradaInf6").hide()
		onChangeOpcionesAvanzadas('checkOpcionesAvanzadas')
		iniciarSelectHora('horaNuevoPase','minNuevoPase', 'ampmNuevoPase')
		// iniciarSelectHora('horaNuevoRangoVisita','minNuevoRangoVisita', 'ampmNuevoRangoVisita')
		// iniciarSelectHora('horaNuevoRangoHasta','minNuevoRangoHasta', 'ampmNuevoRangoHasta')
		catalogoAreaByLocation(getCookie('userLocation'))
		
	}
}

//FUNCION para obtener los catalogos
function getCatalogsIngreso(){
	loadingService()
	fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: "get_vehiculos.py",
            option: "catalago_vehiculo",
            //account_id:10
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+userJwt
        },
        }).then(res => res.json())
        .then(res => {
            if(res.success){
                let data= res.response.data
                if(data.status_code ==400 || data.status_code==401){
                    errorAlert(res)
                }else{
                    let selectVehiculos= document.getElementById("selectTipoVehiculo-123")
                    selectVehiculos.innerHTML="";
                    dataCatalogs.types_cars=data 
                    for (let obj of data){
                        selectVehiculos.innerHTML += '<option value="'+obj+'">'+obj+'</option>';
                    }
                    selectVehiculos.value=""
                } 
            }else{
                errorAlert(res)
            }
        })
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: "get_vehiculos.py",
            option: "catalago_estados"
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+userJwt
        },
        }).then(res => res.json())
        .then(res => {
            if(res.success){
                Swal.close()
                let data= res.response.data
                if(data.status_code ==400 || data.status_code==401){
                    errorAlert(res)
                }else{
                    let selectVehiculos= document.getElementById("inputEstadoVehiculo-123")
                    selectVehiculos.innerHTML="";
                    catEstados=data 
                    for (let obj of data){
                        selectVehiculos.innerHTML += '<option value="'+obj+'">'+obj+'</option>';
                    }
                    selectVehiculos.value=""
                } 
            }else{
                errorAlert(res)
            }
        })
  
    $("#selectTipoVehiculo-123").prop( "disabled", false );
    $("#spinnerTipoVehiculo").css("display", "none");
}

//FUNCION rellenar catalogos al momento de escojer una opcion
async function onChangeCatalog(type, id){
    if(type == "vehiculo"){
        let inputMarca= document.getElementById("selectTipoVehiculo-"+id);
        const options = {
            method: 'POST', 
            body: JSON.stringify({
                script_name:'get_vehiculos.py',
                tipo:inputMarca.value
            }),
             headers:{ 'Content-Type': 'application/json','Authorization': 'Bearer '+userJwt}
        };
        loadingService();
        let respuesta = await fetch(url + urlScripts, options);
        let data = await respuesta.json();
        if(data.error){
            errorAlert(data)
        }else{
            Swal.close();
            let list =data.response.data
            let selectVehiculosMarca= document.getElementById("selectCatalogMarca-"+id)
            selectVehiculosMarca.innerHTML=""; 
            for (let obj in list){
                selectVehiculosMarca.innerHTML += '<option value="'+list[obj]+'">'+list[obj]+'</option>';
            }
            selectVehiculosMarca.value=""
        }
    }else if (type == "marca"){
        let inputTipo= document.getElementById("selectTipoVehiculo-"+id);
        let inputMarca= document.getElementById("selectCatalogMarca-"+id);
        const options = {
            method: 'POST', 
            body: JSON.stringify({
                script_name:'script_turnos.py',
                option:'vehiculo_tipo',
                tipo:inputTipo.value,
                marca: inputMarca.value
            }),
             headers:{ 'Content-Type': 'application/json','Authorization': 'Bearer '+ userJwt}
        };
        loadingService();
        let respuesta = await fetch(url + urlScripts, options);
        let data = await respuesta.json();
        if(data.error){
            errorAlert(data)
        }else{
            Swal.close();
            let list =data.response.data
            let selectVehiculosModelo= document.getElementById("selectCatalogModelo-"+id)
            selectVehiculosModelo.innerHTML=""; 
            for (let obj in list){
                selectVehiculosModelo.innerHTML += '<option value="'+list[obj]+'">'+list[obj]+'</option>';
            }
            selectVehiculosModelo.value=""
        }
    }
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
		                <select type="select" class="form-select fill paseEntradaNuevo com-div-nuevo" id="tipoComentario-`+randomID+`" disabled>
		                	<option id="pase" selected>Pase</option>
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
}
//FUNCION para agregar foto en el modal de agregar nota
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
    const count = elements.length;
    if(count > 1){
        const elements = document.getElementsByClassName(`div-`+classNam+`-`+editAdd+`-`+id);
        while(elements.length > 0 && id !==123){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}

//FUNCION rellenar catalogos al momento de escojer una opcion
async function onChangeCatalog(type, id){
    if(type == "vehiculo"){
        console.log("AL CAMBIO",type, id)
        let inputMarca= document.getElementById("selectTipoVehiculo-"+id);
        const options = {
            method: 'POST', 
            body: JSON.stringify({
                script_name:'get_vehiculos.py',
                option: "catalago_vehiculo",
                tipo: inputMarca.value
            }),
             headers:{ 'Content-Type': 'application/json',
             'Authorization': 'Bearer '+userJwt}
        };
        loadingService();
        let respuesta = await fetch(url + urlScripts, options);
        let data = await respuesta.json();
        if(data.error){
            errorAlert(data)
        }else{
            Swal.close();
            let list =data.response.data
            let selectVehiculosMarca= document.getElementById("selectCatalogMarca-"+id)
            selectVehiculosMarca.innerHTML=""; 
            for (let obj in list){
            console.log(list[obj])

                selectVehiculosMarca.innerHTML += '<option value="'+list[obj]+'">'+list[obj]+'</option>';
            }
            selectVehiculosMarca.value=""
        }
    }else if (type == "marca"){
        let inputTipo= document.getElementById("selectTipoVehiculo-"+id);
        let inputMarca= document.getElementById("selectCatalogMarca-"+id);
        console.log("DETALLES",inputTipo.value, inputMarca.value)
        const options = {
            method: 'POST', 
            body: JSON.stringify({
                script_name:'get_vehiculos.py',
                option: "catalago_vehiculo",
                tipo:inputTipo.value,
                marca: inputMarca.value
            }),
             headers:{ 'Content-Type': 'application/json','Authorization': 'Bearer '+ userJwt}
        };
        loadingService();
        let respuesta = await fetch(url + urlScripts, options);
        let data = await respuesta.json();
        if(data.error){
            errorAlert(data)
        }else{
            Swal.close();
            let list =data.response.data
            let selectVehiculosModelo= document.getElementById("selectCatalogModelo-"+id)
            selectVehiculosModelo.innerHTML=""; 
                console.log("OBJ",selectVehiculosModelo.value)
            for (let obj in list){
                selectVehiculosModelo.innerHTML += '<option value="'+list[obj]+'">'+list[obj]+'</option>';
            }
            selectVehiculosModelo.value=""
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
	}else if (type == "agregarVehiculoEquipo"){
		if($("#agregarVehiculoEquipo").is(':checked')){
			$("#div-equipo").show()
			$("#div-vehiculo").show()
            let selectColores1= document.getElementById("inputColorVehiculo-123")
            $(document).ready(function() {
                for(let color of coloresArray){
                    selectColores1.innerHTML += '<option value="'+capitalizeFirstLetter(color.toLowerCase()) +'">'+color+'</option>';
                }
            });
            selectColores1.value=""
			let selectColores= document.getElementById("inputColorEquipo-123")
			$(document).ready(function() {
				for(let color of coloresArray){
			        selectColores.innerHTML += '<option value="'+capitalizeFirstLetter(color.toLowerCase()) +'">'+color+'</option>';
			    }
			});
			selectColores.value=""
		}else{
			$("#div-equipo").hide()
			$("#div-vehiculo").hide()
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

function copyLinkPase(id, nombre, email, tel){
	console.log("data.json.id",id, nombre, email, tel)
	let protocol = window.location.protocol;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    let host = window.location.host;
	navigator.clipboard.writeText(`${protocol}//${host}/solucion_accesos/pase.html?id=`+id +`&nombre=`+nombre+`&email=`+email+`&tel=`+tel);
}

function crearConfirmacionMini() {
	let data= getInputsValueByClass('paseEntradaUser')
	let listInputsVehicule={};
	let listInputsEquipo={};
	let arrayEquipos=[]
	let arrayVehiculos=[]
	let divVehiculos = document.getElementById("div-vehiculo");
    let inputsV = divVehiculos.querySelectorAll('.group-vehiculo');
    console.log("QUE TENEMOS AQUI",inputsV)
    inputsV.forEach(function(input) {
    var idV = input.id.split('-')[1];
        if (!listInputsVehicule[idV]) {
            listInputsVehicule[idV] = [];
        }
        listInputsVehicule[idV].push(input);
    });
    let divEquipo = document.getElementById("div-equipo");
    let inputsE = divEquipo.querySelectorAll('.group-equipo');
    inputsE.forEach(function(input) {
    let idE = input.id.split('-')[1];
        if (!listInputsEquipo[idE]) {
            listInputsEquipo[idE] = [];
        }
        listInputsEquipo[idE].push(input);
    });
    let htmlAppendEquipos=""
  
    for (let equipo in listInputsEquipo) {
		if(listInputsEquipo[equipo][1].value!==""){
			htmlAppendEquipos +="<div class='col-sm-12 col-md-12 col-lg-6 col-xl-6'>"
			htmlAppendEquipos +="<table class='table table-borderless customShadow' style=' font-size: .8em; background-color: lightgray !important;'>"
			htmlAppendEquipos +="<tbody> <tr> <td><b>Tipo de Equipo:</b></td> <td> <span > "+ listInputsEquipo[equipo][0].value +"</span></td> </tr>"
			htmlAppendEquipos +="<tr> <td><b>Nombre:</b></td> <td> <span > "+ listInputsEquipo[equipo][1].value +"</span></td> </tr>"	
			htmlAppendEquipos +="<tr> <td><b>Marca:</b></td> <td> <span > "+ listInputsEquipo[equipo][2].value +"</span></td> </tr>"
			htmlAppendEquipos +="<tr> <td><b>Modelo:</b></td> <td> <span > "+ listInputsEquipo[equipo][4].value +"</span></td> </tr>"
			htmlAppendEquipos +="<tr> <td><b>No. Serie:</b></td> <td> <span > "+ listInputsEquipo[equipo][3].value +"</span></td> </tr>"
		    htmlAppendEquipos +="<tr> <td><b>Color:</b></td> <td> <span > "+ listInputsEquipo[equipo][5].value +"</span></td> </tr>"
			htmlAppendEquipos +="</tbody> </table>	</div>";
		    let objEquipo={
	            'nombre':listInputsEquipo[equipo][1].value,
                'modelo':listInputsEquipo[equipo][4].value,
	            'marca':listInputsEquipo[equipo][2].value,
	            'color':listInputsEquipo[equipo][5].value,
	            'tipo':listInputsEquipo[equipo][0].value,
	            'serie':listInputsEquipo[equipo][3].value ,
	        }
		    arrayEquipos.push(objEquipo)
		}	
	}
	 let htmlAppendEquiposTitulo=""
    if(arrayEquipos.length>0){
		htmlAppendEquiposTitulo+=`<div class="d-flex justify-content-start ms-2" style="color:#171717"><h5><b>Equipos:</b></h5></div>`
	}
	let htmlAppendVehiculos=""
	for (let vehiculo in listInputsVehicule) {
    console.log("listInputsVehicule",listInputsVehicule[vehiculo])
		if(listInputsVehicule[vehiculo][0].value !==""){
			htmlAppendVehiculos +="<div class='col-sm-12 col-md-12 col-lg-6 col-xl-6'>"
			htmlAppendVehiculos +="<table class='table table-borderless customShadow' style='border: none; font-size: .8em; background-color: lightgray!important;'>"
			htmlAppendVehiculos +="<tbody> <tr> <td><b>Tipo de Vehiculo:</b></td> <td><span > "+ listInputsVehicule[vehiculo][0].value +"</span></td> </tr>"
			htmlAppendVehiculos +="<tr> <td><b>Marca:</b></td> <td><span > "+ listInputsVehicule[vehiculo][1].value +"</span></td> </tr>"
			htmlAppendVehiculos +="<tr> <td><b>Modelo:</b></td> <td><span > "+ listInputsVehicule[vehiculo][2].value +"</span></td> </tr>"
			htmlAppendVehiculos +="<tr> <td><b>Matricula:</b></td> <td><span > "+ listInputsVehicule[vehiculo][3].value +"</span></td> </tr>"
            htmlAppendVehiculos +="<tr> <td><b>Estado:</b></td> <td><span > "+ listInputsVehicule[vehiculo][4].value +"</span></td> </tr>"
			htmlAppendVehiculos +="<tr> <td> <b> Color: </b></td> <td><span > "+ listInputsVehicule[vehiculo][5].value +"</span></td> </tr> </tbody> </table> </div>";
			let objVehiculo={ 
				'tipo':listInputsVehicule[vehiculo][0].value,
	            'marca':listInputsVehicule[vehiculo][1].value,
	            'modelo':listInputsVehicule[vehiculo][2].value,
	            'estado':listInputsVehicule[vehiculo][4].value,
	            'placas':listInputsVehicule[vehiculo][3].value,
	            'color':listInputsVehicule[vehiculo][5].value
		    }
			arrayVehiculos.push(objVehiculo)
		}
	}
	let htmlAppendVehiculosTitulo=""
	if(arrayVehiculos.length>0){
		htmlAppendVehiculosTitulo+=`<div class="d-flex justify-content-start ms-2" style="color:#171717"><h5><b>Vehiculos:</b></h5></div>`
	}
    console.log("PASEE", arrayVehiculos, arrayEquipos)
    let motivoHtml=""
	let html = []//getListVehiculosEquipos(location, caseta, name, company, visit, motivo)
	if(urlImgUser=="" || urlImgCard==""){
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
								<td>`+nombre+`</td>
								<td></td>
							</tr>
							<tr>
								<td><b>Email:</b></td>
								<td><span ><b>Teléfono:</b></span></td>
							</tr>
							<tr>
								<td> `+email+`</td>
								<td><span > `+tel+`</span></td>
							</tr>
							<tr>
								<td><b>Foto:</b></td>
								<td><span><b>Identificación:</b></span></td>
							</tr>
							<tr>
								<td><img src="`+urlImgUser+`" alt="description" style="object-fit:cover;" width="220" height="150"> </td>
								<td><img src="`+urlImgCard+`" alt="description" style="object-fit:cover;" width="220" height="150"> </td>
							</tr>
						</tbody>
					</table>
					<hr>
					`+motivoHtml+`
					`+htmlAppendEquiposTitulo+`
					`+htmlAppendEquipos+`
					`+htmlAppendVehiculosTitulo+`
					`+htmlAppendVehiculos+`
				</div>
		
	      `,
	        showCancelButton: true,
	        confirmButtonColor: "#28a745",
	        cancelButtonColor: "#dc3545",
	        confirmButtonText: "Completar pase",
	        heightAuto:false,
	        reverseButtons:true,
	        width:750,
	    })
	    .then((result) => {
	        if (result.value) {
	        	loadingService()
		        let access_pass={
		            walkin_fotografia:[{file_name:"foto.png",file_url:urlImgUser}],
		            walkin_identificacion:[{file_name:"indentificacion.png",file_url:urlImgCard}],
		            grupo_vehiculos:arrayVehiculos,
		            grupo_equipos:arrayEquipos,

		        }
	        	fetch(url + urlScripts, {
			        method: 'POST',
			        body: JSON.stringify({
			            script_name: "pase_de_acceso.py",
		                option: 'update_pass',
		                access_pass: access_pass,
		                folio:id,
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
                    	qr_code=data.json.id
			        	Swal.close()
			        	Swal.fire({
				      		text: "Tu informacion se ha guardado correctamente.",
						    html:`
						      	<div class="mb-3 mt-2" style=" font-size: 1.2em;  ">  <h4>Pase de entrada generado.</h4> </div>
						        <div class="d-flex flex-column justify-content-center align-items-center">
			    			      	<div class='align-items-start m-2'>
			    			      	  	El pase de entrada se ha generado correctamente. Por favor, selecciona alguna de las siguientes opciones.
			    			    	</div>
			    			    	<div class="d-flex  flex-column align-items-start justify-content-start mt-2">
			    			    		<div class="m-0 p-0">
				    			    		<label>
								            	<input type="checkbox" name="opcionesCorreoMsj" id="enviarMensaje">
								            	<b>Enviar recordatorio por mensaje</b>
									        </label><br>
									    </div>
								        <div class="m-0 p-0">
								        	<label>
								            	<input type="checkbox" name="opcionesCorreoMsj" id="enviarCorreo">
								            	<b>Enviar recordatorio por correo</b>
								        	</label><br>
								        </div>
			    			    	</div>
			    			    	<img class="mt-1" alt="Código QR" id="codigo" width=250 height=250 src=${data.json.qr_pase[0].file_url}>
						        </div>`,
						         
					      	icon: "success",
						    showCancelButton:true,
						    showConfirmButton:true,
						    reverseButtons:true,
						    cancelButtonColor: colors[0],
						    cancelButtonText:'Cerrar',
						    confirmButtonText: "Aceptar y Descargar"
						 }).then((result)=>{
						 	if (result.value) {
						 		Swal.close()
						 		loadingService()
						 		let data_for_msj = {}
								let data_for_msj_tel={}
						 		let selected = $('input[name="opcionesCorreoMsj"]:checked');
								for (let sel of selected){
									if(sel.id == 'enviarMensaje'){
										data_for_msj_tel={
											mensaje: "Se ha creado un nuevo pase de entrada",
											numero: data.json.telefono
										}
									}
									if (sel.id=="enviarCorreo"){
										data_for_msj = {
											mensaje: "Se ha creado un nuevo pase de entrada",
	    									titulo: "Pase de entreda generado correctamente",
	    									email_from: data.json.enviar_de,
	    									email_to: data.json.enviar_a,
										}
									}
								}
								fetch(url + urlScripts, {
							        method: 'POST',
							        body: JSON.stringify({
							            script_name: "pase_de_acceso.py",
						                option: 'send_qr',
						                email: data_for_msj,
						                msj: data_for_msj_tel,
							        }),
							        headers:{
							            'Content-Type': 'application/json',
							            'Authorization': 'Bearer '+userJwt
							        },
							    })
							    .then(res => res.json())
							    .then(res => {
							        if (res.success) {
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
					                    	successMsg("Confirmación", "Informacion enviada correctamente.", "success")
					                    	
								            fetch(data.json.qr_pase[0].file_url)
							                .then(response => {
							                    if (!response.ok) {
							                        throw new Error('Error al descargar la imagen');
							                    }
							                    return response.blob();
							                })
							                .then(blob => {
							                    const url = URL.createObjectURL(blob);
							                    const link = document.createElement('a');
							                    link.href = url;
							                    link.download = 'mi-imagen.jpg'; // Nombre con el que se descargará la imagen
							                    document.body.appendChild(link);
							                    link.click();
							                    document.body.removeChild(link);
							                    URL.revokeObjectURL(url); // Libera el objeto URL
							                })
							                .catch(error => {
							                    console.error('Error:', error);
							                });
					                    }
							        }else{
							        	errorAlert(res)
							        }
							    })
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
	}
}


function crearConfirmacion() {
	let data= getInputsValueByClass('paseEntradaNuevo')
	let comentarios= getDataGrupoRepetitivo('com-input-form-nuevo','.com-div-nuevo' , 2)
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
	for (let c of comentarios){
		comTr +=	
		`<tr>
			<td>`+c.tipo_comentario+`</td>
			<td>`+c.comentario_pase+`</td>
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
		fechaVisitaMain= `${data.fechaVisita} ${formatHor}:${formatMin}:00`
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
	        confirmButtonColor: "#28a745",
	        showCancelButton: true,
	        cancelButtonColor: "#dc3545",
	        confirmButtonText:'Crear pase',
	        cancelButtonText:'Cancelar',
	        heightAuto:false,
	        reverseButtons: true,
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
                    visita_a: getCookie("userName"),
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
						 		copyLinkPase(data.json.id, access_pass.nombre, access_pass.email, access_pass.telefono);
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



function limpiarTomarFoto(id){
    flagVideoUser=false
    currentStream=null
    $('#buttonTake' + id).show();
    $('#buttonTake' + id).prop('disabled', false);
    $('#buttonSave' + id).hide();
    $('#img' + id).hide();
    $('#img' + id).attr('src', '');
    $('#inputFile' + id).val('');

    fotosNuevoIncidenteEditar={}
    fotosNuevoIncidente={}
    fotoNuevaFalla={}
}

//FUNCION eliminar un set repetitivo de vehiculo
function setDeleteVehiculo(id) {
	const element = document.getElementById('div-vehiculo-item-'+id);
	if(element && id!=123){
		element.remove()
	}
}


//FUNCION eliminar set repetitivo de vehiculo
function setAddVehiculo() {
	let randomID = Date.now();
	//---Structure HTML
    let newItem=`
    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12  mb-1 row div-main-vehiculo" id="div-vehiculo-item-`+randomID+`">
    	<div class="col-9 div-vehiculo-row-1 div-row-vehiculo-`+randomID+`" >
			<div class="div-vehiculo-row-1 div-row-vehiculo-`+randomID+`">
				<label class="form-label">Tipo de Vehiculo: </label>
				<select class="form-select group-vehiculo" aria-label="Default select example" id="selectTipoVehiculo-`+randomID+`" onChange='onChangeCatalog("vehiculo",`+randomID+`)'>
				</select>
			</div>
		</div>
		<div class="col-3 pt-4 mt-2 div-vehiculo-row-`+randomID+`">
			<button type="button" class="btn btn-success button-add-register" onclick="setAddVehiculo();return false;">
				<i class="fa-solid fa-plus"></i>
			</button>
			<button type="button" class="btn btn-danger button-delete-register"  onclick="setDeleteVehiculo(`+randomID+`);return false;">
				<i class="fa-solid fa-minus"></i>
			</button>
		</div>
		<div class="col-9 div-vehiculo-row-1 div-row-vehiculo-`+randomID+`">
			<div id='divCatalogMarca123'>
				<label class="form-label">Marca: </label>
				<select class="form-select group-vehiculo" aria-label="Default select example" id="selectCatalogMarca-`+randomID+`" onChange='onChangeCatalog("marca",`+ randomID+`)'>
					<option disabled>Escoge un tipo de vehiculo...</option>
				</select>
			</div>
			<div id='divCatalogModelo123'>
				<label class="form-label">Modelo: </label>
					<select class="form-select group-vehiculo" aria-label="Default select example" id="selectCatalogModelo-`+randomID+`" >
						<option disabled>Escoge una marca...</option>
					</select>
			</div>
			<div class="div-row-vehiculo">
				<label class="form-label">Matrícula del Vehiculo:</label>
				<input type="text" class="form-control group-vehiculo" id="inputMatriculaVehiculo-`+ randomID+`>
			</div>
            <div class="div-row-vehiculo col-12 m-0 p-0">
                <label class="form-label">Estado:</label>
                <select class="form-select group-vehiculo" id="inputEstadoVehiculo-`+randomID+`" style="height: 40px !important; overflow: auto !important;">
                </select>
            </div>
			<div class="div-row-vehiculo">
				<label class="form-label">Color:</label>
				<select class="form-select group-vehiculo" aria-label="Default select example" id="inputColorVehiculo-`+randomID+`" style="height: 40px !important; overflow: auto !important;">
				</select>
		        <hr class="my-3">
			</div>
		</div>
	</div>
    `;
	$('#div-vehiculo').append(newItem)
	/*$(".select-item-register").select2({
	    tags: true
	});*/
	 //INFO: Inicializamos el primer catalago
	$("#divCatalogMarca"+randomID+"").hide();
	$("#divCatalogModelo"+randomID+"").hide();
	dataCatalogs.types_cars.forEach(function(e, i){
	   $("#selectTipoVehiculo-"+randomID+"").append($('<option></option>').val(e).text(e));
	});
    let selectEst= document.getElementById("inputEstadoVehiculo-"+randomID)
    $(document).ready(function() {
        for(let es of catEstados){
            selectEst.innerHTML += '<option value="'+capitalizeFirstLetter(es.toLowerCase()) +'">'+es+'</option>';
        }
    });
    selectEst.value=""
	let selectColores= document.getElementById("inputColorVehiculo-"+randomID)
	$(document).ready(function() {
		for(let color of coloresArray){
	        selectColores.innerHTML += '<option value="'+capitalizeFirstLetter(color.toLowerCase()) +'">'+color+'</option>';
	    }
	});
	selectColores.value=""
    $("#inputEstadoVehiculo-"+randomID+"").val("")
    $("#inputColorVehiculo-"+randomID+"").val("")
    $("#selectTipoVehiculo-"+randomID+"").val("")
}


//FUNCION eliminar set repetitivo de equipo
function setDeleteEquipo(id) {
	const element = document.getElementById('div-equipo-item-'+id);
	if(element && id!=123){
		element.remove()
	}
}


//FUNCION eliminar set repetitivo de equipo
function setAddEquipo() {
	let randomID = Date.now();
    let newItem=`
    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12  mb-1 row div-main-equipo" id="div-equipo-item-`+randomID+`">
		<div class="col-9 div-equipo-row-`+randomID+` div-row-equipo" >
		<div class="div-equipo-row-123 div-row-equipo mb-2" >
			<label class="form-label">Tipo de Equipo: *</label>
			<select class="form-select group-equipo" aria-label="Default select example" value="" id="selectTipoEquipo-`+randomID+`">
				<option value="Herramienta">Herramienta</option>
				<option value="Computo">Computo</option>
				<option value="Tablet">Tablet</option>
				<option value="Otra">Otra</option>
			</select>
		</div>
		</div>
		<div class="col-3 pt-4 mt-2 div-equipo-row-`+randomID+` div-row-equipo ">
			<button type="button" class="btn btn-success button-add-register" onclick="setAddEquipo();return false;">
				<i class="fa-solid fa-plus"></i>
			</button>
			<button type="button" class="btn btn-danger button-delete-register"  onclick="setDeleteEquipo(`+randomID+`);return false;">
				<i class="fa-solid fa-minus"></i>
			</button>
		</div>
		<div class="col-9 div-equipo-row-`+randomID+` div-row-equipo">
			<label class="form-label ">Nombre del Equipo:</label>
			<input type="text" class="form-control group-equipo" id="inputNombreEquipo-`+randomID+`">
		</div>
		<div class="col-9 div-equipo-row-`+randomID+` div-row-equipo">
			<label class="form-label ">Marca:</label>
			<input type="text" class="form-control group-equipo" id="inputMarcaEquipo-`+randomID+`">
		</div>
		<div class="col-9 div-equipo-row-`+randomID+` div-row-equipo">
			<label class="form-label ">Modelo:</label>
			<input type="text" class="form-control group-equipo" id="inputModeloEquipo-`+randomID+`">
		</div>
		<div class="col-9 div-equipo-row-`+randomID+` div-row-equipo">
			<label class="form-label ">No. de Serie:</label>
			<input type="text" class="form-control group-equipo" id="inputNoSerieEquipo-`+randomID+`">
		</div>
		<div class="col-9 div-equipo-row-`+randomID+` div-row-equipo">
			<label class="form-label ">Color:</label>
			 <select class="form-select group-equipo" aria-label="Default select example" id="inputColorEquipo-`+randomID+`" style="height: 40px !important; overflow: auto !important;">
                </select>
            <hr class="my-3">
		</div>
	</div>
    `;
	$('#div-equipo').append(newItem)
	/*$(".select-item-register").select2({
	    tags: true
	});*/
    $("#selectTipoEquipo-"+randomID+"").val("")

    let selectColores= document.getElementById("inputColorEquipo-"+randomID)
    $(document).ready(function() {
        for(let color of coloresArray){
            selectColores.innerHTML += '<option value="'+capitalizeFirstLetter(color.toLowerCase()) +'">'+color+'</option>';
        }
    });
    selectColores.value=""
    $("#inputColorEquipo-"+randomID+"").val("")
}


function setRequestFileImg(type, id="") {
    console.log("QUE ESS", type, id)
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
    }else if(type =="inputEvidenciaIncidenciaEditar"){
        idInput = 'inputFileEvidenciaIncidenciaEditar';
    }else if(type =="inputEvidenciaIncidencia"){
        idInput = 'inputFileEvidenciaIncidencia';
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
                if(type == 'inputCard'){
                    urlImgCard = res.file;
                    //fotosNuevoIncidente.identificacion.push({"file_name":res.file_name, "file_url":res.file})
                }else if(type == 'inputUser'){
                    urlImgUser = res.file;
                    //fotoNuevaFalla={"file_name":res.file_name, "file_url":res.file}
                }
                var canvas = document.getElementById('canvasPhoto'+id);
                    var ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
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