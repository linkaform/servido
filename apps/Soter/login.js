window.onload = function(){
	const statusSession = getSession('login');
	if(statusSession == 'Active'){
	   getReportUrl();
    }else if(statusSession == 'Offline'){
      	document.getElementById("btnRequest").addEventListener("click", function (){
      		sendRequest();
    	});
    }
}

//---Login
function sendRequest() {
	let email = document.getElementById("inputEmail").value;  
  	let password = document.getElementById("inputPassword").value;  
  	let validation = validationRequest(email, password);
  	if (validation) {
		fetch('https://app.linkaform.com/api/infosync/user_admin/login/', {
			method: 'POST',
			body: JSON.stringify({
				username: email,
				password: password,
			}),
			headers:{
				'Content-Type': 'application/json',
			},
		})
		.then((res) => res.json())
		.then((res) => {
			if(res.hasOwnProperty('code') && res.code === 2){
				setCookies(res);
				getReportUrl();
			} else {
				Swal.fire({
					title: 'Error',
					html: res.error
				})
			}
		})
  	}
}

function validationRequest(email, password) {
	if(email!= ''){
		if(password!= ''){
			return true;
		}else{
			Swal.fire({
	          	title: 'Error',
	          	html: 'Es necesario ingresar una contraseña valida.'
	        });
		}	
	}else{
		Swal.fire({
          title: 'Error',
          html: 'Es necesario ingresar un correo electrónico.'
        });
	}
}

function setCookies(response){
	const userJwt = response.hasOwnProperty('jwt')  ? response.jwt : '';
	const sessionId = response.hasOwnProperty('session_id')  ? response.session_id : 0;
	const userId = response.hasOwnProperty('user') &&  response.user.hasOwnProperty('id') ? response.user.id : 0;
	const userName = response.hasOwnProperty('user') &&  response.user.hasOwnProperty('first_name') ? response.user.first_name : 0;
	const userParentId = response.hasOwnProperty('user') && response.user.hasOwnProperty('parent_info') && response.user.parent_info.hasOwnProperty('id') ? response.user.parent_info.id : 0;
	setCookie("sessionid", sessionId, 7);
	setCookie("userId", userId, 7);
	setCookie("userJwt", userJwt, 7);
	setCookie("userName", userName, 7);
	setCookie("userParentId", userParentId,7);
	getCompanyLogo(userParentId);
}