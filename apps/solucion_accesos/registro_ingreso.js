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

document.getElementById('abrirCamara').addEventListener('click', function() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            var video = document.createElement('video');
            document.body.appendChild(video);
            video.srcObject = stream;
            video.play();
        })
        .catch(function(error) {
            console.error('Error al acceder a la cámara:', error);
        });
    } else {
        alert('Lo siento, tu dispositivo no soporta acceso a la cámara.');
    }
});