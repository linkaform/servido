document.addEventListener("DOMContentLoaded", (event) => {
    setValueUserLocation('rondines');
    selectLocation= document.getElementById("selectLocation")
    selectLocation.onchange = function() {
        console.log("La selección ha cambiado");
        let response = fetchOnChangeLocation()
        console.log(response.data)
    };

})

window.onload = function(){
    setValueUserLocation('rondines');
    let user = getCookie("userId");
    let jw = getCookie("userJwt");

    if(user !='' && jw!=''){
    } else{
		redirectionUrl('login',false);
	}

}


//----Function Redirection
function redirectionUrl(type = 'null',blank = true){
    let urlNew =  '';
    let protocol = window.location.protocol;
    let host = window.location.host;
    if(type == 'users'){
    	urlNew = `${protocol}//${host}/solucion_accesos/accesos.html`
    }else if(type == 'bitacora'){
    	urlNew = `${protocol}//${host}/solucion_accesos/bitacora.html`
    }else if(type == 'incidencias'){
    	urlNew = `${protocol}//${host}/solucion_accesos/incidencias.html`
    }else if(type == 'articulos'){
    	urlNew = `${protocol}//${host}/solucion_accesos/articulos.html`
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


//---Close Sesión
function setCloseSession(argument) {
	closeSession();
	redirectionUrl('login',false);
}