class lkfNavbarComponent extends HTMLElement{
	constructor(){
		super();
	}

	connectedCallback() {
	this.innerHTML=`
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <link rel="stylesheet" href="./Styles_v2.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">

	<nav class="navbar header" id='myCustomNavBar'>
        <div class=" navbar-brand">
			<img src="https://app.linkaform.com/img/login-linkaform-logo.png" height="30" class="d-inline-block align-top" alt="">
        </div>
        <div class="navbar-brand navbarShowHide">
            <button id='buttonAccesos' class="btn btn-secondary" onclick="redirectionUrl('users');return false;" >Accesos</button>   
            <button id='buttonBitacoras' class="btn btn-secondary" onclick="redirectionUrl('bitacora');return false;" disabled>Bitacoras</button>   
            <button id='buttonIncidencias' class="btn btn-secondary" onclick="redirectionUrl('incidencias');return false;" >Incidencias</button>   
            <button id='buttonArticulos' class="btn btn-secondary" onclick="redirectionUrl('articulos');return false;">Articulos</button>   
            <button id='buttonRondines' class="btn btn-secondary" onclick="redirectionUrl('rondines');return false;">Rondines</button>   
            <div class="btn p-0 ">
			  <button type="button" class=" rounded-circle btn btn-secondary "  data-bs-toggle="dropdown" >
				<i class="fa fa-user fa-lg" aria-hidden="true"></i>
			  </button>
			  <ul class="dropdown-menu dropdown-menu-end myCustomDropdown ">
			    <li><button class="dropdown-item" type="button"> <i class="fa-solid fa-door-open"></i> Turno</button></li>
			    <li><button class="dropdown-item" type="button"> <i class="fa fa-sticky-note" aria-hidden="true"></i> Notas</button></li>
			    <li><button class="dropdown-item" type="button"> <i class="fa fa-cog" aria-hidden="true"></i>  Configuracion</button></li>
			     <li><button class="dropdown-item" onclick="setCloseSession();return false;" type="button"> 
			     	<i class="fa-solid fa-right-from-bracket"> </i>  Salir</button>
			 	</li>
			  </ul>
			</div>
		</div>
    </nav>
	`;
	} 

}
window.customElements.define('navbar-component', lkfNavbarComponent)
 

$('#buttonAccesos').hide(); 
$('#buttonBitacoras').hide(); 
$('#buttonIncidencias').hide(); 
$('#buttonArticulos').hide(); 
$('#buttonRondines').hide(); 



function customNavbar(location, turno){
    console.log('AL CAGAR NAVCBAR TENEMOS : ',location, turno)
     if(location === 'portal_turns' && turno === 'off'){
        $('#buttonAccesos').hide(); 
        $('#buttonBitacoras').hide(); 
        $('#buttonIncidencias').hide(); 
        $('#buttonArticulos').hide(); 
        $('#buttonRondines').hide(); 
     }else if(location === 'portal_turns' && turno === 'on'){
        $('#buttonAccesos').show(); 
        $('#buttonBitacoras').show(); 
        $('#buttonIncidencias').show(); 
        $('#buttonArticulos').show(); 
        $('#buttonRondines').show(); 
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
    console.log("DENTOROOO",type)
    if(type == 'users'){
        urlNew = `${protocol}//${host}/solucion_accesos/portal_registro_v2.html`
    }else if(type == 'bitacora'){
        urlNew = `${protocol}//${host}/solucion_accesos/portal_bitacora_v2.html`
    }else if(type == 'incidencias'){
        urlNew = `${protocol}//${host}/solucion_accesos/portal_incidencias_v2.html`
    }else if(type == 'articulos'){
        urlNew = `${protocol}//${host}/solucion_accesos/portal_articulos_v2.html`
    }else if(type == 'login'){
        urlNew = `${protocol}//${host}/solucion_accesos/login.html`
    }else if(type == 'rondines'){
        urlNew = `${protocol}//${host}/solucion_accesos/portal_rondines.html`
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
