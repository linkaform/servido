let userJwt ="";
let urlLinkaform='https://app.linkaform.com/api/';
let idScriptCatalog=117935;
let opScriptCatalog='catalog_brands';
let urlImgCard = '';
let urlImgUser = '';
let flagVideoCard = false;
let flagVideoUser = false;
let extraData=[]
let dataCatalogs="";
let id ="" 
let caseta=""
let ubicacion=""

window.onload = function(){
	setValueUserLocation('ingreso');


	customNavbar(getValueUserLocation(), getStatusTurn())
	
	userJwt = getCookie('userJwt');
	$(".select-car-register").select2({
	  tags: true
	});
	$(".select-item-register").select2({
	  tags: true
	});
	$("#selectCompany").select2({
	  tags: true
	});
	$("#selectVisit").select2({
	  tags: true 
	});
	const valores = window.location.search;
	const urlParams = new URLSearchParams(valores);

	ubicacion = urlParams.get('ubicacion');
	caseta = urlParams.get('caseta');
	id = urlParams.get('id');
	if(id){
		getExtraInformation()
	}
	$("#textLocation").text(ubicacion);
	$("#textModule").text(caseta);
  getCatalogs();
}	

function getExtraInformation(){
	fetch(urlLinkaform + urlScripts, {
		method: 'POST',
		body: JSON.stringify({
			script_id: idScriptCatalog,
			option: "get_extra_Information",
			id:id,
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
		extraData={ nombre:'Valeria Guadalupe',
			empresa:"Empresa SCV",
			visita:"Lider de area de desarrollo"}
		
		
		$("#inputName").val(extraData.nombre)
		$("#inputNombreEmpresa").val(extraData.empresa)
		$("#inputAquienVisita").val(extraData.visita)
	})
	
}



function getCatalogs(){
	$("#selectTipoVehiculo-123").prop( "disabled", true );
	$("#divCatalogMarca123").hide();
	$("#divCatalogModelo123").hide();
	fetch(urlLinkaform + urlScripts, {
		method: 'POST',
		body: JSON.stringify({
			script_id: idScriptCatalog,
			option: opScriptCatalog,
		}),
		headers:{
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+userJwt
			},
	})
	.then(res => res.json())
	.then(res => {
		if (res.success) {
			dataCatalogs = res.response.data;

			$("#selectTipoVehiculo-123").prop( "disabled", false );
			$("#spinnerTipoVehiculo").css("display", "none");
			dataCatalogs.types_cars.forEach(function(e, i){
			$("#datalistOptionsTipo").append($('<option></option>').val(e).text(e));
			});
		} 
	})
}

function onChangeCatalog(type, id){
	if(type == "vehiculo"){
		$("#divCatalogMarca"+id+"").show();

		let inputMarca= document.getElementById("selectCatalogMarca-"+id+"");
		inputMarca.value="";
		let datalistMarca= document.getElementById("datalistOptionsMarca"+id+"");
		datalistMarca.innerHTML=""; 
		let inputModelo= document.getElementById("selectCatalogModelo-"+id+"");
		inputModelo.value="";
		let datalistModelo= document.getElementById("datalistOptionsModelo"+id+"");
		datalistModelo.innerHTML=""; 

		let selectedValue = $( "#selectTipoVehiculo-"+id+"" ).val();
	  let catalogMarca = filterCatalogBy('type', selectedValue);
		for (let obj in catalogMarca){
				$("#datalistOptionsMarca"+id+"").append($('<option></option>').val(catalogMarca[obj].brand).text(catalogMarca[obj].brand));
		}
	}else if (type == "marca"){
		$("#divCatalogModelo"+id+"").show();

		let inputModelo= document.getElementById("selectCatalogModelo-"+id+"");
		inputModelo.value="";
		let datalistModelo= document.getElementById("datalistOptionsModelo"+id+"");
		datalistModelo.innerHTML=""; 

		 let selectedValue = $( "#selectCatalogMarca-"+id+"" ).val();
	   let catalogMarca = filterCatalogBy('brand', selectedValue);
		for (let obj in catalogMarca){
				$("#datalistOptionsModelo"+id+"").append($('<option></option>').val(catalogMarca[obj].model).text(catalogMarca[obj].model));
		}
	}
}

function filterCatalogBy(key, value ){
		/*INFO: 
		key: podemos filtrar por 'type' (marca) o 'brand' (modelo)
		value: valor de type o model segun corresponda
		*/
	let dataCatalogChild="";
	if(key == 'type'){
		dataCatalogChild = dataCatalogs.brands_cars.filter(obj => obj.type == value);
	}else{
		dataCatalogChild = dataCatalogs.model_cars.filter(obj => obj.brand == value);
	}
	return dataCatalogChild;
}


//-----FUNCTION DATA

function getValidation(allData) {
	if(allData.nameUser !== '' ||allData.location!==''||allData.caseta!=='' ||allData.visitMotivo!==''
	||allData.companyUser !== '' 
	||allData.visitUser !== ''){
			if(urlImgUser !== ''){
						if(urlImgCard !== ''){
							return true;
						}else{
							Swal.fire({
								title	: "Error",
								text: "Asegurese de tomar foto de la identificación",
								type: "warning"
							});
						}
				}else{
					Swal.fire({
						title	: "Error",
						text: "Asegurese de tomar foto de usuario",
						type: "warning"
					});
				}
		}else{
				Swal.fire({
				title	: "Error",
				text: "Faltan datos, asegurese de llenar correctamente los datos",
				type: "warning"
			});
		}
	
	}

//INFO: enviar dialogo de confirmacion
function AlertSendDataUser() {

	let location= $("#textLocation").text();
	let caseta= $("#textModule").text(); 
	let name = $("#inputName").val();
	let company = $("#inputNombreEmpresa").val();
	let visit = $("#inputAquienVisita").val();
	let motivo= $("#inputMotivoDeLaVisita").val();
	//INFO: Arrays de objetos
	let listInputsVehicule={};
	let listInputsEquipo={};
	//INFO: Separar elementos por id y ponerlos en arrays
	let divVehiculos = document.getElementById("div-vehiculo");
  let inputsV = divVehiculos.querySelectorAll('.group-vehiculo');
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
	//-----DICCIONARIO
	let allData = {
		'location':location,
		'caseta': caseta,
		'nameUser':name,
		'companyUser':company,
		'visitUser':visit,
		'visitMotivo':motivo,
		'listCarUser':listInputsVehicule,	
		'listItemUser':listInputsEquipo,
	}
	let flagValidation = getValidation(allData);
	if(flagValidation){
			let htmlAppendEquipos="";
			for (let equipo in listInputsEquipo) {
					 htmlAppendEquipos +="<div class='col-sm-12 col-md-12 col-lg-5 col-xl-5'>"
		  			htmlAppendEquipos+="<table class='table table-borderless customShadow' style=' font-size: .8em; background-color: lightgray !important;'>"
						htmlAppendEquipos+="<tbody> <tr> <td><b>Tipo de Equipo:</b></td> <td> <span > "+ listInputsEquipo[equipo][0].value +"</span></td> </tr>"
						htmlAppendEquipos+="<tr> <td><b>Nombre:</b></td> <td> <span > "+ listInputsEquipo[equipo][1].value +"</span></td> </tr>"	
						htmlAppendEquipos+="<tr> <td><b>Marca:</b></td> <td> <span > "+ listInputsEquipo[equipo][2].value +"</span></td> </tr>"
						htmlAppendEquipos+="<tr> <td><b>Modelo:</b></td> <td> <span > "+ listInputsEquipo[equipo][3].value +"</span></td> </tr>"
					  htmlAppendEquipos+="<tr> <td><b>Color:</b></td> <td> <span > "+ listInputsEquipo[equipo][4].value +"</span></td> </tr>"
						htmlAppendEquipos+="</tbody> </table>	</div>"		
			}
			let htmlAppendVehiculos="";
			for (let vehiculo in listInputsVehicule) {
						htmlAppendVehiculos +="<div class='col-sm-12 col-md-12 col-lg-5 col-xl-5'>"
						htmlAppendVehiculos +="<table class='table table-borderless customShadow' style='border: none; font-size: .8em; background-color: lightgray!important;'>"
						htmlAppendVehiculos +="<tbody> <tr> <td><b>Tipo de Vehiculo:</b></td> <td><span > "+ listInputsVehicule[vehiculo][0].value +"</span></td> </tr>"
						htmlAppendVehiculos +="<tr> <td><b>Marca:</b></td> <td><span > "+ listInputsVehicule[vehiculo][1].value +"</span></td> </tr>"
						htmlAppendVehiculos +="<tr> <td><b>Modelo:</b></td> <td><span > "+ listInputsVehicule[vehiculo][2].value +"</span></td> </tr>"
						htmlAppendVehiculos +="<tr> <td><b>Matricula:</b></td> <td><span > "+ listInputsVehicule[vehiculo][3].value +"</span></td> </tr>"
						htmlAppendVehiculos +="<tr> <td> <b> Color: </b></td> <td><span > "+ listInputsVehicule[vehiculo][4].value +"</span></td> </tr> </tbody> </table> </div>"
			}
			Swal.fire({
		      title:'Confirmación',
		      html:`
		      		</section>
				<div class=-flex flex-column " >
						<table class="table table-borderless customShadow" >
								<thead>
									<tr>
										<th  style="background-color: lightgray; text-align:left !important;" > Detalle del visitante  </th>
										<th  style="background-color: lightgray;"> </th>
									</tr>
									
								</thead>
								<tbody>
									<tr>
										<td><b>Ubicacion:</b></td>
										<td> <span > `+location+`</span></td>
									</tr>
									<tr>
										<td><b>Caseta:</b></td>
										<td><span > `+caseta+`</span></td>
									</tr>
									<tr>
										<td><b>Nombre:</b></td>
										<td><span >`+name+`</span></td>
									</tr>
									<tr>
										<td><b>Empresa:</b></td>
										<td><span > `+company+`</span></td>
									</tr>
									<tr>
										<td><b>identificación:</b></td>
										<td> <img src="`+urlImgCard+`" height="100px"  style="object-fit: contain !important;"></td>
									</tr>
									<tr>
										<td><b>Fotografia:</b></td>
										<td> <img src="`+urlImgUser+`" height="100px"  style="object-fit: contain !important;"></td>
									</tr>
								</tbody>
							</table>
							<hr>
							<table class="table table-borderless customShadow" style="border: none;">
								<thead>
									<tr>
										<th scope='row' style="background-color: lightgray; text-align:left !important;" class="m-0"> Detalle de la visita </th>
										<th scope='row' style="background-color: lightgray;"> </th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><b>Visita a:</b></td>
										<td> <span > `+visit+`</span></td>
									</tr>
								</tbody>
							</table>
							<div ><h5> Motivo de la visita:</h5></div>
							<div style="color:#777777; "> 
								<span>`+motivo+`</span>
							</div>
							<hr>
							<div class="d-flex justify-content-start" ><h5> Equipos:</h5></div>
							<div class="d-flex justify-content-between flex-wrap"> 
							`+ htmlAppendEquipos +`
							</div>

							<div class="d-flex justify-content-start" ><h5> Vehiculos: </h5></div>
							<div class="d-flex justify-content-between flex-wrap"> 
							`+ htmlAppendVehiculos +`
							</div>
				</div>
			<section>
		      `,
		      type: "warning",
		      showCancelButton: true,
		      imageUrl: "https://app.linkaform.com/img/login-linkaform-logo.png",
		      confirmButtonColor: "#28a745",
		      cancelButtonColor: "#dc3545",
		      confirmButtonText: " Guardar y Generar Qr",
		      heightAuto:false,
		      width:750,
		    }).then((result) => {

		      if (result.value) {
		      	Swal.fire({
		      		type:"success",
		      		imageUrl: "https://app.linkaform.com/img/login-linkaform-logo.png",
		      		text: "Tu informacion se ha guardado correctamente.",
				      html:`
				      	 <div class="mb-3 mt-2" style="font-weight: bold; font-size: 1.1em; color:#8ebd73 !important; "> ¡Tu información fue guardada correctamente! </div>
				      <div class="d-flex justify-content-center ">
				      	 <div class='align-items-start m-2'>
				      	  	<i class="fa-solid fa-street-view"></i>
				      	 </div>
				      	 <div class="d-flex flex-column mb-3" >
					      	<div> `+ location +`</div>
					      	<div> `+ caseta +`</div> 
				      </div>
				      </div>

				     
				      <img class="mt-1" alt="Código QR" id="codigo">`,
				      icon: "success",
				    });

				    new QRious({
						  element: document.querySelector("#codigo"),
						  value: 'Te damos la bienvenida ' + name + '\n Registro creado en ' + location + ', ' + caseta, // La URL o el texto
						  size: 200,
						  backgroundAlpha: 0, // 0 para fondo transparente
						  foreground: "#505050", // Color del QR
						  level: "L", // Puede ser L,M,Q y H (L es el de menor nivel, H el mayor)
						});

		      }
			});
	}
}

/*
function setDataUser(){
	//----Val
	let codeUser  = $("#inputCodeUser").val();
	$("#buttonIn").hide();
	$("#buttonOut").hide();
	//----Cookie 
	let urlLinkaform = 'https://app.linkaform.com/api/infosync/scripts/run/';
	let userJwt = getCookie("userJwt");
	let dataItem = {'listItemsData':listItemsData,'listNewItems':listNewItems}
	let dataVehicule = {'listVehiculesData':listVehiculesData,'listNewVehicules':listNewVehicules}
	fetch(urlLinkaform, {
		method: 'POST',
		body: JSON.stringify({
			script_id: 116097,
			option: 'set_movement_users',
			curp: codeUser,
			dataItem: dataItem,
			dataVehicule: dataVehicule,
		}),
		headers:{
	      'Content-Type': 'application/json',
	      'Authorization': 'Bearer '+userJwt,
	      'Access-Control-Request-Headers':'*'
	    },
	})
	.then(res => res.json())
	.then(res => {
		if (res.success) {
			let data = res.response.json;
			setHideElements('buttonsModal');
			setDataInformation('informatioUser',data)
			Swal.fire({
				title	: "Exito!",
				text: "Movimiento de usuario registrado",
				icon: "success"
			});
			setCleanData();
			setHideElements('dataHide');
			setHideElements('buttonsOptions');
			setHideElements('buttonNew');
		} 
	})
}
*/



//------FUNCTION IMG
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

function isCanvasBlank(canvas) {
  const context = canvas.getContext('2d');
  const pixelBuffer = new Uint32Array(
    context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
  );
  return !pixelBuffer.some(color => color !== 0);
}

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

//------FUNCTIONS SET REPETITVE
function setDeleteVehiculo(id) {
	const elements = document.querySelectorAll('.div-row-vehiculo');
	const count = elements.length;
	if(count > 1){
		const elements = document.getElementsByClassName('div-vehiculo-row-'+id);
		while(elements.length > 0){
			elements[0].parentNode.removeChild(elements[0]);
		}
	}
}

function setAddVehiculo() {
	console.log("ENTRANDO")
	let randomID = Date.now();
	//---Structure HTML
let newItem=`
			<div class="col-9 div-vehiculo-row-`+randomID+` div-row-vehiculo" >
				
					<label class="form-label">Tipo de Vehiculo: </label>
					<input class="form-control  group-vehiculo" list="datalistOptionsTipo`+randomID+`" id="selectTipoVehiculo-`+randomID+`" placeholder="Escribe algo para buscar..." 
					onChange='onChangeCatalog("vehiculo",`+ randomID+`)'>
					<datalist id="datalistOptionsTipo`+randomID+`">
					</datalist>
			</div>
			<div class="col-3 pt-4 mt-2 div-vehiculo-row-`+randomID+`">
						<button type="button" class="btn btn-success button-add-register" onclick="setAddVehiculo();return false;">
							<i class="fa-solid fa-plus"></i>
						</button>
						<button type="button" class="btn btn-danger button-delete-register"  onclick="setDeleteVehiculo(`+randomID+`);return false;">
							<i class="fa-solid fa-minus"></i>
						</button>
				</div>  
			<div class="col-9 div-vehiculo-row-`+randomID+` div-row-vehiculo">
				<div id='divCatalogMarca`+ randomID+`'>
						<label class="form-label">Marca: </label>
						<input class="form-control group-vehiculo" list="datalistOptionsMarca`+randomID+`" id="selectCatalogMarca-`+randomID+`" placeholder="Escribe algo para buscar..." 
						onchange='onChangeCatalog("marca", `+ randomID+`)'> 
						<datalist id="datalistOptionsMarca`+ randomID+`">
				
						</datalist>
				</div>
				
				<div id='divCatalogModelo`+ randomID+`' class="div-vehiculo-row-`+randomID+`">
						<label class="form-label">Modelo: </label>
						<input class="form-control group-vehiculo" list="datalistOptionsModelo`+randomID+`" id="selectCatalogModelo-`+randomID+`" placeholder="Escribe algo para buscar...">
						<datalist id="datalistOptionsModelo`+ randomID+`">
				
						</datalist>
				</div>
				<div class="div-row-vehiculo-`+randomID+`">
						<label class="form-label">Matricula del Vehiculo:</label>
						<input type="text" class="form-control group-vehiculo" id="inputMatriculaVehiculo-`+randomID+`">
				</div>
				<div class="div-row-vehiculo-`+randomID+`">
						<label class="form-label">Color:</label>
						<input type="text" class="form-control group-vehiculo" id="inputColor-`+randomID+`">
						<hr >
					</div>
			</div>
`;
	$('#div-vehiculo').append(newItem)
	$(".select-item-register").select2({
	  tags: true
	});
	 //INFO: Inicializamos el primer catalago
	$("#divCatalogMarca"+randomID+"").hide();
	$("#divCatalogModelo"+randomID+"").hide();
	dataCatalogs.types_cars.forEach(function(e, i){
	$("#datalistOptionsTipo"+randomID+"").append($('<option></option>').val(e).text(e));
	});
}

function setDeleteEquipo(id) {
	const elements = document.querySelectorAll('.div-row-equipo');
	const count = elements.length;
	console.log("equopososss",count)
	if(count > 1){
		const elements = document.getElementsByClassName('div-equipo-row-'+id);
		while(elements.length > 0){
			elements[0].parentNode.removeChild(elements[0]);
		}
	}
}

function setAddEquipo() {
	let randomID = Date.now();
	//---Structure HTML
let newItem=`
				<div class="col-9 div-equipo-row-`+randomID+` div-row-equipo" >
					<label class="form-label">Tipo de Equipo: *</label>

					<input class="form-control group-equipo" list="datalistOptionsEquipo`+randomID+`" id="selectTipoEquipo-`+randomID+`" placeholder="Escribe algo para buscar..." >
					<datalist id="datalistOptionsEquipo`+randomID+`">
						  <option value="Computo">
						  <option value="Herramientas">
					</datalist>
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
					<label class="form-label ">Nombre del Equipo:*</label>
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
					<input type="text" class="form-control group-equipo" id="inputColorEquipo-`+randomID+`">
				</div>
`;
	$('#div-equipo').append(newItem)
	$(".select-item-register").select2({
	  tags: true
	});
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}
