

window.onload = function(){

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
		agregarPestana('turnos')
	}
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
	   
	});
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
				let userId = res.user && res.user.id ? res.user.id : 0;
				let userJwt = res.jwt ? res.jwt:'';
				let sessionId = res.session_id ? res.session_id: 0;
				let userName = res.user.first_name ? res.user.first_name : '';
				let userParentId = res.user.parent_info.id ? res.user.parent_info.id: '';
				let userEmail = res.user.email ? res.user.email: '';
				let userPosition = res.user.position ? res.user.position: '';
				let userImg = res.user.thumb ? res.user.thumb: '';

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
				
				window.location.reload();
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

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires+"; SameSite=Strict;"
}

