let urlImgCard = '';
let urlImgUser = '';
let flagVideoCard = false;
let flagVideoUser = false;

window.onload = function(){
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
}


//-----FUNCTION DATA

function getValidation(dicData) {
	if(dicData.nameUser !== '' 
	|| dicData.company !== '' 
	|| dicData.visit !== ''){
		if(urlImgUser !== ''){
			if(urlImgCard !== ''){
				return true;
			}else{
				Swal.fire({
					title	: "Error!",
					text: "Error al tomar foto de la identificación",
					icon: "danger"
				});
			}
		}else{
			Swal.fire({
				title	: "Error!",
				text: "Error al tomar foto de usuario",
				icon: "danger"
			});
		}
	}else{
		Swal.fire({
			title	: "Error!",
			text: "Faltan Datos, asegurese de llenar correctamente los datos",
			icon: "danger"
		});
	}
}	

function getDataUser() {
	let name = $("#inputName").val();
	let company = $("#selectCompany").val();
	let visit = $("#selectVisit").val();
	let listValueCar = [];
	let listValueItem = [];

	//-----List
	var listCars = document.querySelectorAll('.select-car-register');
	listCars.forEach(function(select) {
		let valueElement = select.value;
		if(valueElement !=''){
			listValueCar.push(valueElement);
		}
	});

	//-----List
	var listItems = document.querySelectorAll('.select-item-register');
	listItems.forEach(function(select) {
		let valueElement = select.value;
		if(valueElement !=''){
			listValueItem.push(valueElement);
		}
	});

	//-----Dic
	let dicData = {
		'nameUser':name,	
		'companyUser':company,
		'visitUser':visit,
		'listCarUser':listValueCar,	
		'listItemUser':listValueItem,	
	}
	let flagValidation = getValidation(dicData);
	if(flagValidation){
		console.log('ejecuta la siguiente parte del script');
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
				console.log('RES ',res.file)
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
				return 'Error';
				console.log('Error aqui 2');
			}
		})
		.catch(error => {
			return 'Error';
			console.log('Error aqui 3');
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
	//-----Save Photo
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



//------FUNCTION SET REPETITVE
function setDeleteItem(id) {
	const elements = document.querySelectorAll('.div-row-item');
	const count = elements.length;
	if(count > 1){
		console.log('Elements count','div-item-row-'+id);
		const elements = document.getElementsByClassName('div-item-row-'+id);
		while(elements.length > 0){
			elements[0].parentNode.removeChild(elements[0]);
		}
	}
}

function setAddItem() {
	let randomID = Date.now();
	//---Structure HTML
	let newItem = '<div class="col-9 div-item-row-'+randomID+' div-row-item">'
	newItem += '<label class="form-label">Equipo: *</label>'
	newItem += '<select class="form-control select-item-register" id="select-'+randomID+'">'
	//--Loop
	newItem += '<option value="">--Seleccione--</option>'
	newItem += '<option value="1">Option 1</option>'
	newItem += '<option value="2">Option 2</option>'
	newItem += '<option value="3">Option 3</option>'
	newItem += '<option value="4">Option 4</option>'
	newItem += '</select>'
	newItem += '</div>'
	newItem += '<div class="col-3 pt-4 mt-2 div-item-row-'+randomID+'">'
	newItem += '<button type="button" class="btn btn-success button-add-register" onclick="setAddItem();return false;"><i class="fa-solid fa-plus"></i></button>&nbsp;'
	newItem += '<button type="button" class="btn btn-danger button-delete-register" onclick="setDeleteItem('+randomID+');return false;"><i class="fa-solid fa-minus"></i></button>'
	newItem += '</div>'
	$('#div-item').append(newItem)
	$(".select-item-register").select2({
	  tags: true
	});
}

function setDeleteCar(id) {
	const elements = document.querySelectorAll('.div-row-car');
	const count = elements.length;
	if(count > 1){
		const elements = document.getElementsByClassName('div-car-row-'+id);
		while(elements.length > 0){
			elements[0].parentNode.removeChild(elements[0]);
		}
	}
}

function setAddCar() {
	let randomID = Date.now();
	//---Structure HTML
	let newItem = '<div class="col-9 div-car-row-'+randomID+' div-row-car">'
	newItem += '<label class="form-label">Vehículo: *</label>'
	newItem += '<select class="form-control select-car-register" id="select-'+randomID+'">'
	//--Loop
	newItem += '<option value="">--Seleccione--</option>'
	newItem += '<option value="1">Option 1</option>'
	newItem += '<option value="2">Option 2</option>'
	newItem += '<option value="3">Option 3</option>'
	newItem += '<option value="4">Option 4</option>'
	newItem += '</select>'
	newItem += '</div>'
	newItem += '<div class="col-3 pt-4 mt-2 div-car-row-'+randomID+'">'
	newItem += '<button type="button" class="btn btn-success button-add-register" onclick="setAddCar();return false;"><i class="fa-solid fa-plus"></i></button>&nbsp;'
	newItem += '<button type="button" class="btn btn-danger button-delete-register" onclick="setDeleteCar('+randomID+');return false;"><i class="fa-solid fa-minus"></i></button>'
	newItem += '</div>'
	$('#div-car').append(newItem)
	$(".select-car-register").select2({
	  tags: true
	});
}

