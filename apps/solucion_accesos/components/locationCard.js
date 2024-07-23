let optionsLocation=[]
let optionsCaseta=[]
let urlScripts='infosync/scripts/run/';
let idScript= 117936;
let user = getCookie("userId");
//let userJwt = getCookie("userJwt");
//let arrayUserBoothsLocations=[]
class lkfLocationCard extends HTMLElement{
	constructor(){
		super();
	}

	connectedCallback() {
	this.innerHTML=`
    <script type="text/javascript" src="../utils/servido_utils.js"></script>
        <div class="card-body d-flex justify-content-start " >
            <div class="">
                <div class="d-flex align-items-center justify-content-between">
                    <h6 class="text-black ">Ubicación: </h6>
                    <select class="form-select ms-1 " id="selectLocation"> </select>
                </div>
                <div class="d-flex align-items-center" >
                    <h6 class="text-black" >Caseta: </h6>
                    <select class="form-select ms-4 mt-2" id="selectCaseta"> </select>
                </div>
            </div>
            <div class=" d-flex flex-column mt-2 ms-2 justify-content-between ">
                <div class="d-flex justify-content-start ">
                    <h6 class="text-black" id="textJefeGuardia">Jefe en Guardia: </h6>
                    <h6 class="text-black-50 ms-1" id="textGuardiaApoyo">Solucion Seguridad</h6> 
                </div>
                <div class="d-flex  justify-content-start">
                    <h6 class="text-black">Guardia de apoyo: </h6>
                    <h6 class="text-black-50 ms-1"></h6> 
                </div>
            </div>
        </div>
	`;
	} 

}
window.customElements.define('locationcard-component', lkfLocationCard)


function initializeCatalogs(){
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_id: idScript,
            option: 'get_caseta_info',
            email : 'guardia1@linkaform.com'
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+userJwt
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            //INFO: Obtener la informacion y formatear los arrays para poder mandarlos como opciones de los catalogos
        } 
    });
    let valueCaseta = getCookie('userCaseta')
    let valueLocation =  getCookie('userLocation')
    let selectCaseta= document.getElementById("selectCaseta")
    selectCaseta.value = valueCaseta
    let selectLocation= document.getElementById("selectLocation")
    selectLocation.value = valueLocation
}



function fillCatalogs(){
     if(getCookie("userUbicaciones") == "" && getCookie("userCasetas")==""){
        fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: 'script_turnos.py',
            option:'get_user_booths'
        }),
        headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+userJwt
            },
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                if(user !='' && userJwt!=''){
                    let userBooths=res.response.data
                    if(userBooths.length>0){
                        for(let booth of userBooths){
                            arrayUserBoothsLocations.push({name:booth.area, ubi:booth.location, status:booth.status , guard: booth.employee, folio: booth.folio, 
                            address: booth.address, city:booth.city})
                        }
                    }else{
                        arrayUserBoothsLocations=[]
                    }

                    let locationsUnique = new Set();
                    arrayUserBoothsLocations.forEach(function(booth) {
                        locationsUnique.add(booth.ubi);
                    });
                    optionsLocation = Array.from(locationsUnique);

                    let selectLocation= document.getElementById("selectLocation")
                    selectLocation.innerHTML=""; 
                    for (let obj of optionsLocation){
                            selectLocation.innerHTML += '<option value="'+obj+'">'+obj+'</option>';
                    }
                    selectLocation.value = getCookie('userLocation');

                    optionsCaseta = arrayUserBoothsLocations.filter(function(booth) {
                        return booth.ubi == selectLocation.value && booth.status === "Disponible";
                    });

                    let selectCaseta= document.getElementById("selectCaseta")
                    selectCaseta.innerHTML=""; 
                    for (let obj of optionsCaseta){
                            selectCaseta.innerHTML += '<option value="'+obj.name+'">'+obj.name+'</option>';
                    }
                    selectCaseta.value = getCookie('userCaseta')
                    if(getValueUserLocation()=='accesos'){
                        selectLocation.disabled=true
                        selectCaseta.disabled=true
                    }
                    setCookie("userUbicaciones",  JSON.stringify(optionsLocation),7);
                    setCookie("userCasetas",  JSON.stringify(optionsCaseta),7);
                }
            }
        });
    } else{
        let jsonArrayUbicaciones = JSON.parse(getCookie("userUbicaciones"));
        let jsonArrayCasetas = JSON.parse(getCookie("userCasetas"));

        let selectLocation= document.getElementById("selectLocation")
        selectLocation.innerHTML=""; 
        for (let obj of jsonArrayUbicaciones){
                selectLocation.innerHTML += '<option value="'+obj+'">'+obj+'</option>';
        }
        


        
        //selectLocation.innerHTML += '<option value="'+'Planta Durango'+'">'+'Planta Durango'+'</option>';




        let selectCaseta= document.getElementById("selectCaseta")
        selectCaseta.innerHTML=""; 
        for (let obj of jsonArrayCasetas){
                selectCaseta.innerHTML += '<option value="'+obj.name+'">'+obj.name+'</option>';
        }



        
        //selectCaseta.innerHTML += '<option value="'+'Caseta Norte 2'+'">'+'Caseta Norte 2'+'</option>';




        if(getValueUserLocation()=='accesos'){
            selectLocation.disabled=true
            selectCaseta.disabled=true
        }
    }
}



async function fetchOnChangeLocation(script, option, area, location){
    Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
       }
    });
    //INFO: al momento de seleccionar una nueva location se manda la informacion junto con el 
    //resultado de la fetch a la pagina que lo esta solicitando
    let jsonArrayUbicaciones = JSON.parse(getCookie("userUbicaciones"));
    let jsonArrayCasetas = JSON.parse(getCookie("userCasetas"));

    let selectLocation= document.getElementById("selectLocation")
    let selectCaseta= document.getElementById("selectCaseta")
    let responseData=""
    /*
    selectLocation.innerHTML += '<option value="'+'Planta Durango'+'">'+'Planta Durango'+'</option>';
        let selectCaseta= document.getElementById("selectCaseta")
        selectCaseta.innerHTML=""; 
        for (let obj of jsonArrayCasetas){
                selectCaseta.innerHTML += '<option value="'+obj.name+'">'+obj.name+'</option>';
        }*/
       
    let response={ "data":{
         "caseta":{
            "name": selectLocation.value,
            "location": selectCaseta.value,
            "visitsDay":15,
            "personalInside":75,
            "vehiclesInside":25,
            "ouputs":30
        }
    }};

        let body={
            script_name: script,
            option:option,
        }
        if(area){
            body.area=area
        }
        if (location){
            body.location=location
        }

        let dataCasetas=[]
        let fetchData= await fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify(body), 
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+userJwt
            },
        })
        
        let data = await fetchData.json();
        if (data){
            Swal.close()
        }
    return data
}


function fetchOnChangeCaseta(){
    //INFO: al momento de seleccionar una nueva location se manda la informacion junto con el 
    //resultado de la fetch a la pagina que lo esta solicitando
    let selectLocation= document.getElementById("selectLocation")
    let selectCaseta= document.getElementById("selectCaseta")
    let response={
        "data":{
            "caseta":{
                "name": selectLocation.value,
                "location": selectCaseta.value,
                "visitsDay":15,
                "personalInside":75,
                "vehiclesInside":25,
                "ouputs":30
            }
        }
    };
    //FETCH AQUI 
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_id: idScript,
            option: 'get_caseta_information',
            email : 'guardia1@linkaform.com'
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+userJwt

        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            //INFO: Obtener la informacion y formatear los arrays para poder mandarlos como respuesta de esta funcion
        } 
    });
    return response
}



function getCasetaActual(){
    let selectLocation= document.getElementById("selectLocation");
    return selectLocation.value
}

