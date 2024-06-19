let optionsLocation=[]
let optionsCaseta=[]
let urlScripts='infosync/scripts/run/';
let idScript= 117936;
let user = getCookie("userId");
let jw = getCookie("userJwt");

class lkfLocationCard extends HTMLElement{
	constructor(){
		super();
	}

	connectedCallback() {
	this.innerHTML=`
    <script type="text/javascript" src="../utils/servido_utils.js"></script>
        <div class="card-body d-flex justify-content-start" >
            <div class="col-6 ">
                <div class="d-flex align-items-center justify-content-between">
                    <h6 class="text-black ">Ubicación: </h6>
                    <select class="form-select ms-1 " id="selectLocation"> </select>
                </div>
                <div class="d-flex align-items-center">
                    <h6 class="text-black" >Caseta: </h6>
                    <select class="form-select ms-4 mt-2" id="selectCaseta"> </select>
                </div>
            </div>
            <div class="d-flex flex-column mt-2 ms-2 justify-content-between">
                <div class="d-flex justify-content-start ">
                    <h6 class="text-black">Jefe en Guardia: </h6>
                    <h6 class="text-black-50 ms-1">Juan Alvarez</h6> 
                </div>
                <div class="d-flex justify-content-start">
                    <h6 class="text-black">Guardia de apoyo: </h6>
                    <h6 class="text-black-50 ms-1">Josue de Jesus</h6> 
                </div>
            </div>
        </div>
	`;
	} 

}
window.customElements.define('locationcard-component', lkfLocationCard)



window.onload = function(){  
}



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
            'Authorization': 'Bearer '+jw
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
    console.log("Llenar catalogos ubicación y caseta")
    optionsLocation=['Cumbres', 'Monterrey', 'San Jeronimo']
    optionsCaseta=[{name:"Caseta 1 Poniente", ubi:"Cumbres", status: 'Disponible', guard:'Juan Ecobedo' },{name:"Caseta 1 Sur", ubi:"Santa Catarina", status: 'Disponible', guard:'Francisco Flores'},
    {name:"Caseta 4 Poniente", ubi:"Monterrey", status: 'No disponible', guard:'Javier Almanza' },{name:"Caseta 3 Sur", ubi:"Escobedo", status: 'No disponible', guard:'Valeria Alvarado'},
    {name:"Caseta 6 Poniente", ubi:"San Jeronimo", status: 'Disponible', guard:'Erika Ruiz'},{name:"Caseta 6 Sur", ubi:"Monterrey", status: 'No disponible', guard:'Daniela Cepeda' }];

    let selectLocation= document.getElementById("selectLocation")
    selectLocation.innerHTML=""; 
    for (let obj of optionsLocation){
            selectLocation.innerHTML += '<option value="'+obj+'">'+obj+'</option>';
    }

   selectLocation.value  =  getCookie('userLocation')=='' ?  "Monterrey" : getCookie('userLocation');
    let selectCaseta= document.getElementById("selectCaseta")
    selectCaseta.innerHTML=""; 
    for (let obj of optionsCaseta){
            selectCaseta.innerHTML += '<option value="'+obj.name+'">'+obj.name+'</option>';
    }
    selectCaseta.value = getCookie('userCaseta')=='' ?  "Caseta 1 Poniente" : getCookie('userCaseta');    
}



function fetchOnChangeLocation(){
    //INFO: al momento de seleccionar una nueva location se manda la informacion junto con el 
    //resultado de la fetch a la pagina que lo esta solicitando
    let selectLocation= document.getElementById("selectLocation")
    let selectCaseta= document.getElementById("selectCaseta")
    let response=
    {"data":{
         "caseta":{
            "name": selectLocation.value,
            "location": selectCaseta.value,
            "visitsDay":15,
            "personalInside":75,
            "vehiclesInside":25,
            "ouputs":30
        }
    }};
    if(getCookie('userCaseta') == selectCaseta.value && getCookie('userLocation')==selectLocation.value){
        console.log('No hubo cambios en caseta o location')
    }
    else{
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
            'Authorization': 'Bearer '+jw
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            //INFO: Obtener la informacion y formatear los arrays para poder mandarlos como respuesta de esta funcion
        } 
    });
     setCookie('userCaseta',selectCaseta.value,7)
     setCookie('userLocation',selectLocation.value,7)
     selectCaseta.value = getCookie('userCaseta')
     selectLocation.value =  getCookie('userLocation')
    }
    return response
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
            'Authorization': 'Bearer '+jw

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

