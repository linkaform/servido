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

    changeButtonColor();

    fillCatalogs();

    selectLocation= document.getElementById("selectLocation")
    selectLocation.onchange = function() {
        console.log("La selección ha cambiado");
        let response = fetchOnChangeLocation()
        console.log(response.data)
    };
     selectCaseta= document.getElementById("selectCaseta")
    selectCaseta.onchange = function() {
        console.log("La selección ha cambiado");
        let response = fetchOnChangeLocation()
        console.log('hiii',response.data)
    };
    
    let user = getCookie("userId");
    let jw = getCookie("userJwt");

    if(user !='' && jw!=''){
    } else{
		redirectionUrl('login',false);
	}

}




//---Close Sesión
function setCloseSession(argument) {
	closeSession();
	redirectionUrl('login',false);
}