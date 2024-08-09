class lkfNavbarComponent extends HTMLElement{
	constructor(){
		super();
	}

	connectedCallback() {
	this.innerHTML=`
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <link rel="stylesheet" href="./style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">

	<nav class="navbar header m-0 p-0 mb-5" id='myCustomNavBar'>
        <div class=" navbar-brand">
			<img src="" height="40" height="60" class="d-inline-block align-top ms-3" id="imageLinkaform" alt="">
        </div>
        <div class="navbar-brand navbarShowHide customNoBorder">
            <button id='buttonAccesos' class="btn btn-sm btn-secondary custom-navbar-button ocultar"  onclick="redirectionUrl('accesos');return false;" >Accesos</button>   
            <button id='buttonBitacoras' class="btn btn-sm btn-secondary custom-navbar-button ocultar" onclick="redirectionUrl('bitacora');return false;" >Bitacoras</button>   
            <button id='buttonIncidencias' class="btn btn-sm btn-secondary custom-navbar-button ocultar" onclick="redirectionUrl('incidencias');return false;" >Incidencias</button>   
            <button id='buttonArticulos' class="btn btn-sm btn-secondary custom-navbar-button ocultar" onclick="redirectionUrl('articulos');return false;">Articulos</button>   
            <button id='buttonRondines' class="btn btn-sm btn-secondary custom-navbar-button ocultar" onclick="redirectionUrl('rondines');return false;">Rondines</button>   
            <div class="btn p-0 ms-2 customNoBorder">
			  <button type="button" class=" rounded-circle btn btn-secondary" id="imageUserButton" data-bs-toggle="dropdown" >
				<img src="" id="imageUserNavbar">
			  </button>
			  <ul class="dropdown-menu dropdown-menu-end  ">
			    <li>
                    <button class="dropdown-item"  onclick="redirectionUrl('turnos');return false;" type="button"> 
                    <i class="fa-solid fa-door-open"></i> Turno</button>
                    </li>
			    <li>
                    <button class="dropdown-item" type="button" onclick="redirectionUrl('notas');return false;"> <i class="fa fa-sticky-note" aria-hidden="true"></i> Notas</button>
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

function changeButtonColor(){
    console.log("IMAGEN DEL USER", getCookie('userImg'))
    $("#imageUserNavbar").attr("src", getCookie('userImg'));
    let user = getCookie("userId");
        let jw = getCookie("userJwt");
        if(user !='' && jw!=''){
            let imagenMostradaNavbar = document.getElementById("imageUserNavbar");
            imagenMostradaNavbar.src= localStorage.getItem("imagenURL");
            $("#imageLinkaform").attr("src", getCookie('lkfLogo'));
            switch (getValueUserLocation()) {
              case "accesos":
                 let btn1 = document.getElementById("buttonAccesos");
                 btn1.style.boxShadow= "rgba(227, 200, 110, 0.80) 100px -50px 20px -10px inset";
                break;
              case "bitacora":
                 let btn2 = document.getElementById("buttonBitacoras");
                 btn2.style.boxShadow= "rgba(227, 200, 110, 0.80) 100px -50px 20px -10px inset";
                break;
              case "incidencias":
                 let btn3 = document.getElementById("buttonIncidencias");
                 btn3.style.boxShadow= "rgba(227, 200, 110, 0.80) 100px -50px 20px -10px inset";
                break;
              case "articulos":
                 let btn4 = document.getElementById("buttonArticulos");
                 btn4.style.boxShadow= "rgba(227, 200, 110, 0.80) 100px -50px 20px -10px inset";
                break;
              case "rondines":
                 let btn5 = document.getElementById("buttonRondines");
                 btn5.style.boxShadow= "rgba(227, 200, 110, 0.80) 100px -50px 20px -10px inset"; 
                break;
            }
        } 
}

function customNavbar(location, turno){
     if(turno === userTurnCerrado ){
        $('#buttonAccesos').addClass('ocultar');
        $('#buttonBitacoras').addClass('ocultar');
        $('#buttonIncidencias').addClass('ocultar');
        $('#buttonArticulos').addClass('ocultar');
        $('#buttonRondines').addClass('ocultar');
     }else if(turno === userTurnAbierto){
        $('#buttonAccesos').removeClass("ocultar"); 
        $('#buttonBitacoras').removeClass("ocultar"); 
        $('#buttonIncidencias').removeClass("ocultar"); 
        $('#buttonArticulos').removeClass("ocultar"); 
        $('#buttonRondines').removeClass("ocultar"); 
     }
}

//---Close Sesión
function setCloseSession(argument) {
    closeSession();
    redirectionUrl('login',false);

}
//----Function Redirection
function redirectionUrl(type = 'null',blank = true){
    let urlNew =  '';
    let protocol = window.location.protocol;
    let host = window.location.host;

    let existingTab = window.open('', type); 
    if (existingTab) {
        console.dir(window.open(`${protocol}//${host}/solucion_accesos/${type}.html`, type));
    } else {
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
    }

    
}


window.onload = function(){
}