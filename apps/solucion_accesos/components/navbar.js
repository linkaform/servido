let userJwt='';

class lkfNavbarComponent extends HTMLElement{
	constructor(){
		super()
	}

	connectedCallback() {
	this.innerHTML=`
    <link rel="stylesheet" href="./Styles_v2.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.10.5/dist/sweetalert2.min.css">
    <link href="https://unpkg.com/tabulator-tables/dist/css/tabulator.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>


	<nav class="navbar header">
        <div class=" navbar-brand">
			<img src="https://app.linkaform.com/img/login-linkaform-logo.png" height="30" class="d-inline-block align-top" alt="">
        </div>
        <div class="navbar-brand navbarShowHide">
            <button class="btn btn-secondary" onclick="redirectionUrl('users');return false;" >Accesos</button>   
            <button class="btn btn-secondary" onclick="redirectionUrl('bitacora');return false;" disabled>Bitacoras</button>   
            <button class="btn btn-secondary" onclick="redirectionUrl('incidencias');return false;" >Incidencias</button>   
            <button class="btn btn-secondary" onclick="redirectionUrl('articulos');return false;">Articulos</button>   
            <button class="btn btn-secondary">Rondines</button>   
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





window.onload =function(){
 console.log('page',getValueUserLocation())

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
