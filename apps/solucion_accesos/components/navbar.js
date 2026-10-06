class lkfNavbarComponent extends HTMLElement{
	constructor(){
		super();
	}

	connectedCallback() {
	this.innerHTML=`
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <link rel="stylesheet" href="./style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">

	<nav class="navbar m-0 p-0 mb-0 customShadow" >
        <div class="navbar-brand cursor-pointer" onclick="redirectionUrl('menu', false);">
			<img src="https://f001.backblazeb2.com/file/lkf-media/company_pictures/company_pic_10.png" height="40" class="d-inline-block align-top ms-3" id="imageLinkaform" alt="">
        </div>
        <div class="d-flex flex-grow-1" ><button id='buttonPases' class="btn btn-sm btn-secondary custom-navbar-button ocultar"  onclick="redirectionUrl('pases');return false;" >Pases de entrada</button></div>
        <div class="navbar-brand navbarShowHide customNoBorder">
            <button id='buttonAccesos' class="btn btn-sm btn-secondary custom-navbar-button ocultar menu"  onclick="redirectionUrl('accesos');return false;" >Accesos</button>   
            <button id='buttonBitacoras' class="btn btn-sm btn-secondary custom-navbar-button ocultar menu" onclick="redirectionUrl('bitacora');return false;" >Bitacoras</button>   
            <button id='buttonIncidencias' class="btn btn-sm btn-secondary custom-navbar-button ocultar menu" onclick="redirectionUrl('incidencias');return false;" >Incidencias</button>   
            <button id='buttonArticulos' class="btn btn-sm btn-secondary custom-navbar-button ocultar menu" onclick="redirectionUrl('articulos');return false;">Articulos</button>   
            <button id='buttonRondines' class="btn btn-sm btn-secondary custom-navbar-button ocultar menu" onclick="redirectionUrl('rondines');return false;">Rondines</button>   
            <div class="btn p-0 ms-2 customNoBorder" id="userMenu">
			  <button type="button" class=" rounded-circle btn btn-secondary" id="imageUserButton" data-bs-toggle="dropdown" >
				<img src="" id="imageUserNavbar">
			  </button>
			  <ul class="dropdown-menu dropdown-menu-end">
			    <li>
                    <div id="buttonTurnos" class="menu">
                        <button class="dropdown-item"  onclick="redirectionUrl('turnos');return false;" type="button"> 
                        <i class="fa-solid fa-door-open"></i> Turno</button>
                    </div> 
                </li>
			    <li>
                    <div id="buttonNotas" class="menu">
                        <button  class="dropdown-item" type="button" onclick="redirectionUrl('notas');return false;"> <i class="fa fa-sticky-note" aria-hidden="true"></i> Notas</button>
                    </div> 
                </li>
			    <li>
                    <button class="dropdown-item" type="button"> <i class="fa fa-cog" aria-hidden="true"></i>  Configuracion</button>
                </li>
			     <li>
                    <button class="dropdown-item" onclick="setCloseSession();return false;" type="button"> 
			     	<i class="fa-solid fa-right-from-bracket"></i>  Salir</button>
			 	</li>
			  </ul>
			</div>
		</div>
    </nav>
	`;
	} 

}
window.customElements.define('navbar-component', lkfNavbarComponent)

let userTurnCerrado="Turno Cerrado";
let userTurnAbierto="Turno Abierto";
let casetaDisponible="Disponible";
let casetaNoDisponible="No Disponible";
let statusAbierto="abierto";
let statusCerrado="cerrado";
let statusDisponible="Disponible";
let statusEnUso="En Uso";
let statusVisitaEntrada="Entrada"
let statusVisitaSalida="Salida"
let statusFallaAbierto="Abierto"
let statusFallaResuelto="Resuelto"

function changeButtonColor(){
    $("#imageUserNavbar").attr("src", getCookie('userImg'));
    let user = getCookie("userId_soter");
        let jw = getCookie("userJwt_soter");
        if(user !='' && jw!=''){
            let imagenMostradaNavbar = document.getElementById("imageUserNavbar");
            imagenMostradaNavbar.src= localStorage.getItem("imagenURL");
            //$("#imageLinkaform").attr("src", getCookie('lkfLogo'));
            switch (getValueUserLocation()) {
              case "accesos":
                let btn1 = document.getElementById("buttonAccesos");
                btn1.style.setProperty('background-color', '#0275d8', 'important');
                btn1.style.setProperty('color', 'white', 'important');
                break;
              case "bitacora":
                let btn2 = document.getElementById("buttonBitacoras");
                btn2.style.setProperty('background-color', '#0275d8', 'important');
                btn2.style.setProperty('color', 'white', 'important');
                break;
              case "incidencias":
                let btn3 = document.getElementById("buttonIncidencias");
                btn3.style.setProperty('background-color', '#0275d8', 'important');
                btn3.style.setProperty('color', 'white', 'important');
                break;
              case "articulos":
                let btn4 = document.getElementById("buttonArticulos");
                btn4.style.setProperty('background-color', '#0275d8', 'important');
                btn4.style.setProperty('color', 'white', 'important');
                break;
              case "rondines":
                let btn5 = document.getElementById("buttonRondines");
                btn5.style.setProperty('background-color', '#0275d8', 'important');
                btn5.style.setProperty('color', 'white', 'important');
                break;
              case "pases":
                let btn6 = document.getElementById("buttonPases");
                btn6.style.setProperty('background-color', '#0275d8', 'important');
                btn6.style.setProperty('color', 'white', 'important');
                break;

            }
        } 
}


function customNavbar(location, turno, showPic = true){
    let menus = getCookie('menus_soter') !==''? JSON.parse(getCookie('menus_soter')):""
    // if(turno === userTurnCerrado ){ 
    //     showSpecificMenu([], showPic)
    // }else if(turno === userTurnAbierto){ 
    //     showSpecificMenu(menus)
    // }
    if(location == "menu"){
        showSpecificMenu([], showPic)
    }else if (location == "pase_no_session"){
        showSpecificMenu([], showPic)
    }else{
        showSpecificMenu(menus, showPic) 
    }
}


function getIdsMenu(idClass){
    let divs = document.querySelectorAll('div.'+idClass);
    let divsB = document.querySelectorAll('button.'+idClass);
    let ids = [];
    divs.forEach(div => {
        if (div.id.startsWith('button')) {
            let key = div.id.substring(6).toLowerCase();
            ids.push(key);
        }
    })
    divsB.forEach(div => {
        if (div.id.startsWith('button')) {
            let key = div.id.substring(6).toLowerCase();
            ids.push(key);
        }
    })
    return ids
}


function showSpecificMenu(menus, showPic){
    if (menus.length>0){
        for (let m of menus){
        console.log("MENUS", m)
            $('#button'+capitalizeFirstLetter(m)).removeClass('ocultar')
        }
    }else{
        let menusUnlock = [] 
       
        for (let m of menus){
            $('#button'+capitalizeFirstLetter(m)).addClass('ocultar')
        }
    }
    
    if(showPic){
        $("#userMenu").show()
    }else{
        $("#userMenu").hide()
    }

}


//----Function Redirection
function redirectionUrl(type = 'null',blank = false, logout=false){
    console.log(type)
    let urlNew =  '';
    let protocol = window.location.protocol;
    let host = window.location.host;
    // let existingTab = window.open('', type); 
    const pestanas = JSON.parse(localStorage.getItem("pestanas_key")) || [];
    agregarPestana(type)
    // if (existingTab && type !=="login") {
    if (type !=="login") {
        window.open(`${protocol}//${host}/solucion_accesos/${type}.html`, type)
    }else if(type=='login' && logout){
        urlNew = `${protocol}//${host}/solucion_accesos/login.html`
        window.location.href = urlNew
    }else if(type=='login' && !blank){
        urlNew = `${protocol}//${host}/solucion_accesos/login.html`
        window.location.href = urlNew
    }
    /* else {
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
        }else if(type == 'rondines'){
            urlNew = `${protocol}//${host}/solucion_accesos/rondines.html`
        }else if(type == 'turnos'){
            urlNew = `${protocol}//${host}/solucion_accesos/turnos.html`
        }else if(type == 'accesos'){
            urlNew = `${protocol}//${host}/solucion_accesos/accesos.html`
        }else if(type == 'notas'){
            urlNew = `${protocol}//${host}/solucion_accesos/notas.html`
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
    } */
}


function agregarPestana(type){
    const pestanas = JSON.parse(localStorage.getItem("pestanas_key")) || [];
    if(!pestanas.includes(type)){
        pestanas.push(type);
        localStorage.setItem("pestanas_key", JSON.stringify(pestanas));
    }
}


function cerrarPestanas() {
    const pestanas = JSON.parse(localStorage.getItem("pestanas_key")) || [];
    pestanas.forEach(name => {
        const pestana = window.open('', name);
        if (pestana && !pestana.closed) {
            pestana.close();
        }
    });
    // Limpia la lista de pestañas en localStorage
    localStorage.removeItem("pestanas_key");
}