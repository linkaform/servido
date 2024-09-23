let colors = getPAlleteColors(12,0)

window.onload = function(){
	/*
	let user = getCookie("userId");
	let jw = getCookie("userJwt");
	if(user !='' && jw!=''){
		let protocol = window.location.protocol;
		let host = window.location.host;
		let urlNew = `${protocol}//${host}/solucion_accesos/turnos.html`
		window.location.href =urlNew
		//window.open(`${protocol}//${host}/solucion_accesos/turnos.html`, "turnos")
		/*let urlNew = `${protocol}//${host}/solucion_accesos/turnos.html`
		Object.assign(document.createElement('a'), {
			rel: 'noopener noreferrer',
			href: urlNew,
		}).click();*/
	//	agregarPestana('turnos')
	//}
	/*
	let userInput = document.getElementById('user');
	let userError = document.getElementById('userError');
	userInput.addEventListener('input', function () {
		if(userInput.value == ""){
			userError.style.display = 'none';
		}else{
			if (validarEmail(userInput.value)) {
	        userError.style.display = 'none';
		    } else {
		        userError.style.display = 'block';
		    }
		}
	   
	});  */
}

function selectRadio(type){
	console.log("CLICK", type)
}


function changeLoginView(view){
	let res= getInputsValueByClass("login-form")
	let emptyProp=propiedadesVacias(res)
	if(view=="loginView"){
		$("#email").val("");
		$("#password").val("");
        $('#email').css('background-color', 'white !important');
		$('#password').css('background-color', 'white !important');

		$("#loginView").show();
        $("#loginViewFade").show(); 

        $("#accountTypeView").hide(); 
		$("#accountTypeViewFade").hide(); 
	}else if (view=="accountTypeView"){
		if(emptyProp.length == 0){
			if(validarEmail(res.email)){
                $("#loginView").hide();
                $("#loginViewFade").hide();
				$("#accountTypeView").show();
				$("#accountTypeViewFade").show(); 

				//LLAMAR FUNCION DE LOGIN

			}else{
					successMsg("Validación","Escribe un email valido", "warning")
				}
		}else if(emptyProp.length > 0){
			successMsg("Validación","Faltan campos por llenar", "warning")
		}
	}else if (createAccountView= 'createAccountView'){
		console.log("HELLO")
		let protocol = window.location.protocol;
		let host = window.location.host;
		let urlNew = `${protocol}//${host}/solucion_accesos/admin/crearCuenta.html`
		window.location.href =urlNew
	}if(view=="continue"){
		let protocol = window.location.protocol;
		let host = window.location.host;
		let urlNew = `${protocol}//${host}/solucion_accesos/admin/contratos.html`
		window.location.href =urlNew
	}
	
}

function selectRadio(){
}


function get_login(){
	let valueMail = $("#user").val();
	let valuePassword = $("#password").val();
	if(valueMail !='' && valuePassword!=''){
		fetch(url + 'infosync/user_admin/login/', {
			method: 'POST',
			body: JSON.stringify({
				username: valueMail,
				password: valuePassword,
			}),
			headers:{
				'Content-Type': 'application/json',
			},
		})
		.then((res) => res.json())
		.then((res) => {
			if(res.code == 2){
				/*
				let userId = res.user && res.user.id ? res.user.id : 0;
				let userJwt = res.jwt ? res.jwt:'';
				let sessionId = res.session_id ? res.session_id: 0;
				let userName = res.user.first_name ? res.user.first_name : '';
				let userParentId = res.user.parent_info.id ? res.user.parent_info.id: '';
				let userEmail = res.user.email ? res.user.email: '';
				let userPosition = res.user.position ? res.user.position: '';
				let userImg = res.user.thumb ? res.user.thumb: '';
				console.log("REESPUESTA LOGIN",res)
				setCookie("sessionid", sessionId, 7);
				setCookie("userId", userId, 7);
				setCookie("userJwt", userJwt, 7);
				setCookie("userName", userName, 7);
				setCookie("userParentId", userParentId,7);
				setCookie("userEmail", userEmail,7);
				setCookie("userPosition", userPosition,7);
				console.log("userPosition",userPosition)
				localStorage.setItem("imagenURL", userImg);

				setCookie("lkfLogo", res.user.company_logo.picture, 7)
				//redirectionUrl("turnos",false)
				
				let protocol = window.location.protocol;
				let host = window.location.host;
				let url = `${protocol}//${host}/solucion_accesos/turnos.html`;
				
				window.location.reload(); */



				//window.open(`${protocol}//${host}/solucion_accesos/turnos.html`, "turnos")
				//window.location.href =url
				/*
				Object.assign(document.createElement('a'), {
					rel: 'noopener noreferrer',
					href: url,
				}).click();
				*/	

				//agregarPestana("turnos")
				
			}else{
				errorAlert(res, "¡Ups!")
				$("#password").val('')
			}
		})
	}else{
		successMsg('Validación',"Faltan datos por llenar.", "warning")
	}
}

function reset() {
    $("#user").val('');
    $("#password").val('');
}
