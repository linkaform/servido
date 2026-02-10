let urlImgCard = '';
let urlImgUser = '';
let flagVideoCard = false;
let flagVideoUser = false;
let extraData=[]
let dataCatalogs="";
let id ="" 
let caseta=""
let ubicacion=""
let account_id=""
let paseDeAccesoScript= "pase_de_acceso_use_api.py"
let fotosNuevaVisita={foto:[], identificacion:[]}

window.onload = function(){
	setValueUserLocation('ingreso');
	customNavbar(getValueUserLocation(), getStatusTurn())
	userJwt = getCookie('userJwt_soter');
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

	ubicacion = urlParams.get('ubicacion') !== null ? urlParams.get('ubicacion') :'' ;
	caseta = urlParams.get('caseta') !== null ? urlParams.get('caseta') : '' ;
	account_id = urlParams.get('acc_id') !== null ? urlParams.get('acc_id') : 10 ;
	id = urlParams.get('id');
	if(id){
		getExtraInformation()
	}
	$("#textLocation").text(ubicacion);
	$("#textModule").text(caseta);
}	


//FUNCION para obtener la informacion extra en base a el parametro id mandado por la url
function getExtraInformation(){
	fetch(url + urlScripts, {
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
		extraData={ 
            nombre:'Valeria Guadalupe',
			empresa:"Empresa SCV",
			visita:"Lider de area de desarrollo"
        }
		$("#inputName").val(extraData.nombre)
		$("#inputNombreEmpresa").val(extraData.empresa)
		$("#inputAquienVisita").val(extraData.visita)
	})
}




//FUNCION para validar que se llenaron datos antes de enviar el formulario
function getValidation(allData) {
    let res= false
	if(allData.nameUser == ''  ||allData.visitMotivo==''
	||allData.companyUser == '' 
	||allData.visitUser == '' || urlImgUser == '' || urlImgCard == ''){
		Swal.fire({
	        title : "Error",
	        text: "Faltan datos, asegurese de llenar correctamente los datos",
	        type: "warning"
        });
    	res=false
	}else{
      res=true
    }
  return res
}


//FUNCION: para obtener las listas de quipos y vehiculos
function getListVehiculosEquipos(location, caseta, name, company, visit, motivo){
	let listInputsEquipo={};

    let divEquipo = document.getElementById("div-equipo");
    let inputsE = divEquipo.querySelectorAll('.group-equipo');
    inputsE.forEach(function(input) {
    let idE = input.id.split('-')[1];
        if (!listInputsEquipo[idE]) {
            listInputsEquipo[idE] = [];
        }
        listInputsEquipo[idE].push(input);
    });
	let allData = {
		'location':location,
		'caseta': caseta,
		'nameUser':name,
		'companyUser':company,
		'visitUser':visit,
		'visitMotivo':motivo,
		'listItemUser':listInputsEquipo,
	}
    let htmlAppendEquipos="";

    let arrayEquipos=[]

	return { htmlAppendEquipos,arrayEquipos}
}


//FUNCION: enviar dialogo de confirmacion
function AlertSendDataUser() {
	let location = $("#textLocation").text();
	let caseta = $("#textModule").text(); 
	let name = $("#inputName").val();
	let company = $("#inputNombreEmpresa").val();
	let visit = $("#inputAquienVisita").val();
	let motivo = $("#inputMotivoDeLaVisita").val();
	let html = getListVehiculosEquipos(location, caseta, name, company, visit, motivo);

	Swal.fire({
		title: `
			<div style="color:#2c3e50;font-size:1.25em;font-weight:700;">
				Confirmar registro
			</div>
		`,
		html: `
		<style>
          
			.modal-container{
				max-height:65vh;
				overflow-y:auto;
				padding:5px 6px;
				font-size:.92em;
				color:#2c3e50;
			}

			.info-section{
				background:#f9fafb;
				border-radius:10px;
				padding:14px;
				border:1px solid #eceff1;
			}

			/* GRID INFO */
			.info-grid{
				display:grid;
				grid-template-columns:1fr 1fr;
				gap:12px 20px;
			}

			.info-row{
				display:flex;
				align-items:flex-start;
				gap:8px;
			}

			.info-icon{
				font-size:.85em;
				color:#ff6b35;
				margin-top:2px;
				min-width:18px;
			}

			.info-label{
				font-weight:600;
				color:#495057;
				font-size:.85em;
				min-width:75px;
			}

			.info-value{
				color:#6c757d;
				font-size:.88em;
				line-height:1.4;
			}

			.section-divider{
				border:0;
				height:1px;
				background:linear-gradient(to right,transparent,#ff6b35,transparent);
				margin:18px 0;
			}

			.section-header{
				font-weight:700;
				font-size:.95em;
				margin-bottom:10px;
				display:flex;
				align-items:center;
				gap:6px;
				color:#2c3e50;
			}

			.photo-grid{
				display:grid;
				grid-template-columns:1fr 1fr;
				gap:14px;
				margin-top:10px;
			}
            .photo-item img{
                width:150px;
                aspect-ratio: 5 / 4; 
                object-fit: cover;
                border-radius:8px;
                border:1px solid #e0e0e0;
            }

			.motivo-text{
				background:#fff;
				padding:10px;
				border-radius:8px;
				border:1px solid #e5e7eb;
				font-size:.88em;
				color:#6c757d;
			}

			.equipos-grid{
				display:flex;
				flex-wrap:wrap;
				gap:8px;
			}

			/* Responsive */
			@media(max-width:576px){
				.info-grid{
					grid-template-columns:1fr;
				}
				.photo-grid{
					grid-template-columns:1fr;
				}
			}

			.swal2-image{
				object-fit:contain!important;
				max-width:110px!important;
			}
            .swal2-image {
                margin-bottom: 0 !important;
            }

            .swal2-title {
                margin-top: 0 !important;
            }

		</style>

		<div class="modal-container">

            <div class="info-grid">
                <div class="info-row">
                    <i class="fas fa-map-marker-alt info-icon"></i>
                    <span class="info-label">Ubicación</span>
                    <span class="info-value">${location}</span>
                </div>

                <div class="info-row">
                    <i class="fas fa-door-open info-icon"></i>
                    <span class="info-label">Caseta</span>
                    <span class="info-value">${caseta}</span>
                </div>

                <div class="info-row">
                    <i class="fas fa-user info-icon"></i>
                    <span class="info-label">Nombre</span>
                    <span class="info-value">${name}</span>
                </div>

                <div class="info-row">
                    <i class="fas fa-building info-icon"></i>
                    <span class="info-label">Empresa</span>
                    <span class="info-value">${company}</span>
                </div>
            </div>

			<hr class="section-divider">

			<div class="section-header">
				<i class="fas fa-images" style="color:#ff6b35;font-size:.9em;"></i>
				Documentos
			</div>

			<div class="photo-grid">
				<div class="photo-item">
					<img src="${urlImgCard}">
				</div>
				<div class="photo-item">
					<img src="${urlImgUser}">
				</div>
			</div>

			<hr class="section-divider">

			<div class="section-header">
				<i class="fas fa-handshake" style="color:#ff6b35;font-size:.9em;"></i>
				Detalles de visita
			</div>

			<div class="info-section">
				<div class="info-row">
					<i class="fas fa-user-tie info-icon"></i>
					<span class="info-label">Visita a</span>
					<span class="info-value">${visit}</span>
				</div>
			</div>

			<div style="margin-top:10px">
				<div class="section-header" style="font-size:.85em">
					<i class="fas fa-comment-dots" style="font-size:.8em"></i>
					Motivo
				</div>
				<div class="motivo-text">${motivo}</div>
			</div>

			<hr class="section-divider">

			<div class="section-header">
				<i class="fas fa-toolbox" style="color:#ff6b35;font-size:.9em;"></i>
				Equipos
			</div>

			<div class="equipos-grid">
				${html.htmlAppendEquipos}
			</div>
		</div>
		`,
		showCancelButton:true,
		imageUrl:"https://s203.q4cdn.com/155743495/files/design/site_logo/Logo-Tiendas-3B.png",
		confirmButtonColor:"#ff6b35",
		cancelButtonColor:"#b0b3b8",
		confirmButtonText:"Generar QR",
		cancelButtonText:"Cancelar",
		width:"500px"
	}) .then((result) => {
        if (result.value) {
        	loadingService()
	        let access_pass={
	            nombre: name,
	            perfil_pase:"Walkin",
	            telefono: "",
	            visita_a:visit,
	            email: getCookie("userEmail"),
	            empresa: company,
	            foto:fotosNuevaVisita.foto,
	            identificacion: fotosNuevaVisita.identificacion,
	           
	        }
        	
        
        	//FETCH PARA CREAR PASE DE ENTRADA
        	fetch(url + urlScripts, {
		        method: 'POST',
		        body: JSON.stringify({
		            script_name: paseDeAccesoScript,
	                option: 'create_access_pass',
	                location:location,
	                access_pass: access_pass,
					account_id: account_id
		        }),
		        headers:{
		            'Content-Type': 'application/json',
		            'Authorization': 'Bearer '+userJwt
		        },
		    })
		    .then(res => res.json())
		    .then(res => {
		        if (res.success) {
		        	Swal.close()
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
						backgroundAlpha: 0, 
						foreground: "#505050", 
						level: "L", 
					});
		        }else{
					Swal.close()
					errorAlert(res)
		        }
		    });


	      	
        }
	});
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
					fotosNuevaVisita.identificacion.push({"file_name":res.file_name, "file_url":res.file})
					//----Clean Canvas
					var canvas = document.getElementById('canvasPhoto');
					var ctx = canvas.getContext('2d');
					ctx.clearRect(0, 0, canvas.width, canvas.height);
				}else if(type == 'inputUser'){
					urlImgUser = res.file;
					fotosNuevaVisita.identificacion.push({"file_name":res.file_name, "file_url":res.file})
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


//FUNCION validar que el canvas este limpio
function isCanvasBlank(canvas) {
    const context = canvas.getContext('2d');
    const pixelBuffer = new Uint32Array(
        context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );
    return !pixelBuffer.some(color => color !== 0);
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



//FUNCION eliminar set repetitivo de equipo
function setDeleteEquipo(id) {
	 if (id === 123) {
        alert("No puedes eliminar el equipo principal");
        return;
    }
	const eq = document.getElementById(`div-equipo-${id}`);
	if (eq) {
		eq.remove();
	}
}


//FUNCION eliminar set repetitivo de equipo
function setAddEquipo() {
	let randomID = Date.now();
    let newItem=`
	<div class="div-main-vehiculo" id="div-vehiculo-${randomID}">
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
	</div>
    `;
	$('#div-equipo').append(newItem)
	$(".select-item-register").select2({
	    tags: true
	});
}


//FUNCION setear cookie
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}
