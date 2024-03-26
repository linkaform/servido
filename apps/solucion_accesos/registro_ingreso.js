window.onload = function(){
}

//----Function Redirection
function redirectionUrl(type = 'null',blank = true){
    let urlNew =  '';
    let protocol = window.location.protocol;
    let host = window.location.host;
    if(type == 'users'){
    	urlNew = `${protocol}//${host}/solucion_accesos/portal_registro_v2.html`
    }else if(type == 'bitacora'){
    	urlNew = `${protocol}//${host}/solucion_accesos/portal_bitacora_v2.html`
    }else if(type == 'incidencias'){
    	urlNew = `${protocol}//${host}/solucion_accesos/portal_incidencias_v2.html`
    }else if(type == 'articulos'){
    	urlNew = `${protocol}//${host}/solucion_accesos/portal_articulos_v2.html`
    }else if(type == 'login'){
    	urlNew = `${protocol}//${host}/solucion_accesos/login.html`
    }
    //----Validation
    if(urlNew !='' && blank){
    	Object.assign(document.createElement('a'), {
        target: '_blank',
        rel: 'noopener noreferrer',
        href: urlNew,
    	}).click();
    }else if(urlNew !='' && !blank){
    	Object.assign(document.createElement('a'), {
        rel: 'noopener noreferrer',
        href: urlNew,
    	}).click();
    }
    
}
//-----Function Set Data
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


//------Photo
function getScreenCard(){
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
            //----Take
            $("#buttonTakeCard").hide();
            $("#buttonSaveCard").show();
            document.getElementById('buttonSaveCard').addEventListener('click', function() {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                let photoCard = document.getElementById('imgCard');
                photoCard.src = canvas.toDataURL('image/png');
                photoCard.style.display = 'block';
                video.pause();
                video.srcObject.getTracks().forEach(function(track) {
                    track.stop();
                });
                video.style.display = 'none';
                $("#buttonSaveCard").hide();
            });
        })
        .catch(function(error) {
            console.error('Error al acceder a la cámara:', error);
        });
    } else {
        alert('Lo siento, tu dispositivo no soporta acceso a la cámara.');
    }
}

function getScreenUser(){
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
            $("#buttonTakeUser").hide();
            $("#buttonSaveUser").show();
            document.getElementById('buttonSaveUser').addEventListener('click', function() {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                let photoCard = document.getElementById('imgUser');
                photoCard.src = canvas.toDataURL('image/png');
                photoCard.style.display = 'block';
                video.pause();
                video.srcObject.getTracks().forEach(function(track) {
                    track.stop();
                });
                video.style.display = 'none';
                $("#buttonSaveUser").hide();
            });
        })
        .catch(function(error) {
            console.error('Error al acceder a la cámara:', error);
        });
    } else {
        alert('Lo siento, tu dispositivo no soporta acceso a la cámara.');
    }
}


//------Elements
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
	newItem += '<select class="form-control" id="select-'+randomID+'">'
	//--Loop
	newItem += '<option value="">--Seleccione--</option>'
	newItem += '</select>'
	newItem += '</div>'
	newItem += '<div class="col-3 pt-4 mt-2 div-item-row-'+randomID+'">'
	newItem += '<button type="button" class="btn btn-success button-add-register" onclick="setAddItem();return false;"><i class="fa-solid fa-plus"></i></button>&nbsp;'
	newItem += '<button type="button" class="btn btn-danger button-delete-register" onclick="setDeleteItem('+randomID+');return false;"><i class="fa-solid fa-minus"></i></button>'
	newItem += '</div>'
	$('#div-item').append(newItem)
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
	newItem += '<select class="form-control" id="select-'+randomID+'">'
	//--Loop
	newItem += '<option value="">--Seleccione--</option>'
	newItem += '</select>'
	newItem += '</div>'
	newItem += '<div class="col-3 pt-4 mt-2 div-car-row-'+randomID+'">'
	newItem += '<button type="button" class="btn btn-success button-add-register" onclick="setAddCar();return false;"><i class="fa-solid fa-plus"></i></button>&nbsp;'
	newItem += '<button type="button" class="btn btn-danger button-delete-register" onclick="setDeleteCar('+randomID+');return false;"><i class="fa-solid fa-minus"></i></button>'
	newItem += '</div>'
	$('#div-car').append(newItem)
}

