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
                    <select class="form-select ms-1" id="selectLocation"> </select>
                </div>
                <div class="d-flex align-items-center" >
                    <h6 class="text-black" >Caseta: </h6>
                    <select class="form-select ms-4 mt-2" id="selectCaseta"> </select>
                </div>
            </div>
            <div class=" d-flex flex-column mt-2 ms-2 justify-content-between ">
                <div class="d-flex justify-content-start ">
                    <h6 class="text-black" id="textJefeGuardia">Jefe en Guardia: </h6>
                    <h6 class="text-black-50 ms-1" id="textGuardiaApoyo">`+getCookie('userName')+`</h6> 
                </div>
                <div id="divTodasLasCasetas" style="display:none;">
                    <input class="form-check-input mt-1"  type="checkbox" id="checkboxTodasLasCasetas">
                    <label class="form-check-label" style="margin-left:5px" for="flexCheckDefault" id="flexCheckDefault">
                    <h6>Todas las casetas</h6>
                    </label>
                </div>
                <!--<div id="labelGuardiaDeApoyo" class="d-flex justify-content-start">
                    <h6 class="text-black">Guardia de apoyo: </h6>
                    <h6 class="text-black-50 ms-1"></h6> 
                </div> -->
            </div>
        </div>
	`;
	} 

}
window.customElements.define('locationcard-component', lkfLocationCard)


function initializeCatalogs(){
    /*fetch(url + urlScripts, {
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
    }); */
    let valueCaseta = getCookie('userCaseta')
    let valueLocation =  getCookie('userLocation')
    let selectCaseta= document.getElementById("selectCaseta")
    //selectCaseta.value = valueCaseta
    let selectLocation= document.getElementById("selectLocation")
    selectLocation.value = valueLocation
}

function fillCatalogs(){
     if(getCookie("arrayUserBoothsLocations") == ""){
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
                    loadCatalogsLocation(arrayUserBoothsLocations)
                    loadCatalogsCaseta(getCookie('userLocation') ,arrayUserBoothsLocations)
                    setCookie("arrayUserBoothsLocations", JSON.stringify(arrayUserBoothsLocations),7);
                }
            }
        });
    } else{
        loadCatalogsLocation(JSON.parse(getCookie('arrayUserBoothsLocations')))
        loadCatalogsCaseta(getCookie('userLocation') ,JSON.parse(getCookie('arrayUserBoothsLocations')))
    }
}

function loadCatalogsLocation(arrayUserBoothsLocations){
    let selectCaseta= document.getElementById("selectCaseta")
    selectCaseta.innerHTML = "";

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
    if(getValueUserLocation()=='accesos'){
        selectLocation.disabled=true
    }
}


function loadCatalogsCaseta(location ,arrayUserBoothsLocations){
    optionsCaseta = arrayUserBoothsLocations.filter(booth => {
        return booth.ubi == location ;
    });
    let selectCaseta= document.getElementById("selectCaseta")
    selectCaseta.innerHTML=""; 
    for (let obj of optionsCaseta){
            selectCaseta.innerHTML += '<option value="'+obj.name+'">'+obj.name+'</option>';
    }
    selectCaseta.value = getCookie('userCaseta')
    if(getValueUserLocation()=='accesos'){
        selectCaseta.disabled=true
    }else if(getValueUserLocation()=='articulos' || getValueUserLocation()=='bitacoras'){
        selectCaseta.value=''
        selectCaseta.disabled=true
    }
    
}


async function fetchOnChangeCaseta(script, option, area, location){
    loadingService()
    let responseData=""
    let response={ "data":{
         "caseta":{
            "name": location,
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
    console.log(body)
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


async function fetchOnChangeLocation(location){
    loadCatalogsCaseta(location,JSON.parse(getCookie('arrayUserBoothsLocations')).length>0? JSON.parse(getCookie('arrayUserBoothsLocations')): arrayUserBoothsLocations )
    let selectCaseta= document.getElementById("selectCaseta")
    selectCaseta.value = ""

    /*loadingService()
    let body={
        script_name: script,
        option:option,
    }
    if (location){
        body.location=location
    }
    console.log(body)
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
    }else{
        errorAlert("Ocurrio un error al cargar la lista.", "Error", "warning")
    }
    return data*/
}


function getCasetaActual(){
    let selectLocation= document.getElementById("selectLocation");
    return selectLocation.value
}

