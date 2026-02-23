let urlImgCard = '';
let urlImgUser = '';
let flagVideoCard = false;
let flagVideoUser = false;
let extraData=[]
let dataCatalogs="";
let id ="" 
let caseta=""
let ubicacion=""
let account_id=""
let paseDeAccesoScript= "pase_de_acceso_use_api.py"
let fotografiaRequerida=false;
let identificacionRequerida=false;
let fotosNuevaVisita={foto:[], identificacion:[]}
const coloresCat=["Amarillo", "Azul", "Beige", "Blanco", "Cafe", "Crema", "Dorado", "Gris", 
      "Morado", "Naranja","Negro", "Plateado", "Rojo", "Rosa", "Verde", "Violeta", "Otro"];
const equiposAgregados=[]

window.onload = function(){
	setValueUserLocation('ingreso');
	customNavbar(getValueUserLocation(), getStatusTurn())
	userJwt = getCookie('userJwt_soter');
	$(".select-car-register").select2({
	  tags: true
	});
	$(".select-item-register").select2({
	  tags: true
	});
	$("#selectCompany").select2({
	  tags: true
	});
	$("#selectVisit").select2({
	  tags: true 
	});
	const valores = window.location.search;
	const urlParams = new URLSearchParams(valores);

	ubicacion = urlParams.get('ubicacion') !== null ? urlParams.get('ubicacion').replace(/"/g,"") :'' ;
	caseta = urlParams.get('caseta') !== null ? urlParams.get('caseta').replace(/"/g,"") : '' ;
	account_id = urlParams.get('acc_id') !== null ? urlParams.get('acc_id') : 10 ;
	id = urlParams.get('id');
	if(id){
		getExtraInformation()
	}
	$("#textLocation").text(ubicacion);
	$("#textModule").text(caseta);
    cargarConfiguracionModulo();
}	

function showSectionLoader() {
    document.getElementById("sectionLoader").classList.remove("d-none");
}

function hideSectionLoader() {
    document.getElementById("sectionLoader").classList.add("d-none");
}

async function cargarConfiguracionModulo() {
    if (!ubicacion) {
        console.error("No se encontró location en la URL");
        return;
    }
    mostrarLoaderFotos();
    try {
        const response = await fetch(url + urlScripts, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                locations: [ubicacion],
                option: "get_config_modulo_seguridad",
                script_name: "pase_de_acceso_use_api.py",
                account_id:account_id
            })
        });

        const data = await response.json();
        aplicarConfiguracion(data);

    } catch (error) {
        console.error(error);
        alert("Error al cargar configuración");
    } finally {
        ocultarLoaderFotos();
    }
}

function mostrarLoaderFotos() {
    document.getElementById("photoLoader").classList.remove("d-none");
    document.getElementById("photoContent").style.visibility = "hidden";
}

function ocultarLoaderFotos() {
    document.getElementById("photoLoader").classList.add("d-none");
    document.getElementById("photoContent").style.visibility = "visible";
}
function configurarRequerido(tipo, requerido) {

    if (tipo === "foto") {
        const label = document.querySelector("#containerUser")
            .closest(".photo-section")
            .querySelector(".photo-label");

        if (requerido) {
            label.innerHTML = `
                <i class="fas fa-portrait me-2" style="color: var(--primary-red);"></i>
                Fotografía *
            `;
            document.getElementById("containerUser").dataset.required = "true";
        } else {
            label.innerHTML = `
                <i class="fas fa-portrait me-2" style="color: var(--primary-red);"></i>
                Fotografía
            `;
            document.getElementById("containerUser").dataset.required = "false";
        }
    }

    if (tipo === "id") {
        const label = document.querySelector("#containerCard")
            .closest(".photo-section")
            .querySelector(".photo-label");

        if (requerido) {
            label.innerHTML = `
                <i class="fas fa-id-card me-2" style="color: var(--primary-red);"></i>
                Identificación *
            `;
            document.getElementById("containerCard").dataset.required = "true";
        } else {
            label.innerHTML = `
                <i class="fas fa-id-card me-2" style="color: var(--primary-red);"></i>
                Identificación
            `;
            document.getElementById("containerCard").dataset.required = "false";
        }
    }
}

function aplicarConfiguracion(data) {

    if (!data.success) return;

    const requerimientos = data.response.data.requerimientos || [];

    fotografiaRequerida = requerimientos.includes("fotografia");
    identificacionRequerida = requerimientos.includes("identificacion");

    document.getElementById("colFotografia").style.display =
        fotografiaRequerida ? "block" : "none";

    document.getElementById("colIdentificacion").style.display =
        identificacionRequerida ? "block" : "none";
}

//FUNCION para obtener la informacion extra en base a el parametro id mandado por la url
function getExtraInformation(){
	fetch(url + urlScripts, {
		method: 'POST',
		body: JSON.stringify({
			script_id: "pase_de_acceso_use_api.py",
			option: "get_extra_Information",
			id:id,
		}),
		headers:{
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+userJwt
		},
	})
	.then(res => res.json())
	.then(res => {
		if (res.success) {
		} 	
		extraData={ 
            nombre:'Valeria Guadalupe',
			empresa:"Empresa SCV",
			visita:"Lider de area de desarrollo"
        }
		$("#inputName").val(extraData.nombre)
		$("#inputNombreEmpresa").val(extraData.empresa)
		// $("#inputAquienVisita").val(extraData.visita)
	})
}

function ultimaValidacion() {
    let hasVisibleInvalid = false;

    const invalidFields = document.querySelectorAll(".is-invalid");

    invalidFields.forEach(field => {
        if (field.offsetParent !== null) {
            hasVisibleInvalid = true;
        }
    });

	const inputTelefono = document.getElementById("inputTelefonoVisita");
	if (inputTelefono && inputTelefono.offsetParent !== null) {
		const telValue = inputTelefono.value.trim();
		if (telValue) {
			if (!iti2.isValidNumber()) {
				inputTelefono.classList.add("is-invalid");
				hasVisibleInvalid = true;
			} else {
				inputTelefono.classList.remove("is-invalid");
			}
		} else {
			inputTelefono.classList.remove("is-invalid"); // limpio si está vacío
		}
	}

	const inputEmail = document.getElementById("inputEmailVisita");
	if (inputEmail && inputEmail.offsetParent !== null) {
		const emailValue = inputEmail.value.trim();
		if (emailValue) { // solo validar si hay algo escrito
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(emailValue)) {
				inputEmail.classList.add("is-invalid");
				hasVisibleInvalid = true;
			} else {
				inputEmail.classList.remove("is-invalid");
			}
		} else {
			inputEmail.classList.remove("is-invalid"); // limpio si está vacío
		}
	}

    if (hasVisibleInvalid) {
        Swal.fire({
            icon: "error",
            title: "Campos inválidos",
            text: "Revisa los campos en rojo antes de continuar",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#ff6b35",
            width: "400px"
        });
        return false; 
    }

    return true; 
}
//FUNCION para validar que se llenaron datos antes de enviar el formulario
function getValidation(allData) {
    let res= false
	if(allData.nameUser == ''  ||allData.visitMotivo==''
	||allData.companyUser == '' 
	||allData.visitUser == '' || urlImgUser == '' || urlImgCard == ''){
		Swal.fire({
	        title : "Error",
	        text: "Faltan datos, asegurese de llenar correctamente los datos",
	        type: "warning"
        });
    	res=false
	}else{
      res=true
    }
  return res
}

    const formContainer = document.getElementById('formEquipoContainer');

    function ocultarEquipo() {
        formContainer.classList.add('d-none');
    }

    function resetEquipoForm() {
        document.getElementById('selectTipoEquipo').value = '';
        document.getElementById('inputMarcaEquipo').value = '';
        document.getElementById('inputModeloEquipo').value = '';
        document.getElementById('inputColorEquipo').value = '';
    }

    function guardarEquipo() {
        alert('Equipo guardado'); 
        resetEquipoForm();
        formContainer.classList.add('d-none');
    }
    const selectColor = document.getElementById('selectColorEquipo');

    coloresCat.forEach(color => {
        const option = document.createElement('option');
        option.value = color;
        option.textContent = color;
        selectColor.appendChild(option);
    });

    const inputEmail = document.getElementById("inputEmail");

    inputEmail.addEventListener("blur", function () {

        const email = inputEmail.value.trim();

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email ==="") {
            inputEmail.classList.remove("is-invalid");
        }
        else if (!regex.test(email)) {
            inputEmail.classList.add("is-invalid");
        } else {
            inputEmail.classList.remove("is-invalid");
            inputEmail.classList.add("is-valid");
        }
    });

    const inputEmail2 = document.getElementById("inputEmailVisita");

    inputEmail2.addEventListener("blur", function () {

        const email = inputEmail2.value.trim();

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email ==="") {
            inputEmail2.classList.remove("is-invalid");
        }
        else if (!regex.test(email)) {
            inputEmail2.classList.add("is-invalid");
        } else {
            inputEmail2.classList.remove("is-invalid");
            inputEmail2.classList.add("is-valid");
        }
    });


	const input = document.querySelector("#inputTelefono");
	const iti = window.intlTelInput(input, {
		initialCountry: "mx",
		preferredCountries: ["mx"],
		separateDialCode: true,
		utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js"
	});
	
	input.addEventListener("blur", function () {
		const value = input.value.trim();
		
		if (value === "") {
			input.classList.remove("is-invalid");
			input.classList.remove("is-valid");
		} else if (iti.isValidNumber()) {
			input.classList.remove("is-invalid");
			input.classList.add("is-valid");
		} else {
			input.classList.add("is-invalid");
			input.classList.remove("is-valid");
		}
	});

	const input2 = document.querySelector("#inputTelefonoVisita");
	const iti2 = window.intlTelInput(input2, {
		initialCountry: "mx",
		preferredCountries: ["mx"],
		separateDialCode: true,
		utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js"
	});
	
	input2.addEventListener("blur", function () {
		const value = input2.value.trim();
		
		if (value === "") {
			input2.classList.remove("is-invalid");
			input2.classList.remove("is-valid");
		} else if (iti2.isValidNumber()) {
			input2.classList.remove("is-invalid");
			input2.classList.add("is-valid");
		} else {
			input2.classList.add("is-invalid");
			input2.classList.remove("is-valid");
		}
	});
    
	document.getElementById('motivoSelect').addEventListener('change', function() {
		const otroContainer = document.getElementById('otroMotivoContainer');
		const motivoInput = document.getElementById('inputMotivoDeLaVisita');
		
		if (this.value === 'otro') {
			otroContainer.style.display = 'block';
			motivoInput.required = true;
			motivoInput.value = ''; 
		} else {
			otroContainer.style.display = 'none';
			motivoInput.required = false;
			motivoInput.value = this.value; 
		}
	});
//FUNCION: enviar dialogo de confirmacion
function AlertSendDataUser() {  
    let isValid = true;
	console.log(fotografiaRequerida, identificacionRequerida)
	if (fotografiaRequerida) {
        const imgUser = document.getElementById("imgUser");
        const errorFoto = document.getElementById("errorFoto");
        const fotoWrapper = document.getElementById("fotoWrapper");

        const tieneFoto = fotosNuevaVisita.foto &&
                          fotosNuevaVisita.foto.length > 0 &&
                          imgUser &&
                          imgUser.src &&
                          imgUser.style.display !== "none";

        if (!tieneFoto) {
            if (errorFoto) errorFoto.classList.remove("d-none");
            if (fotoWrapper) fotoWrapper.classList.add("border", "border-danger");
            if (fotoWrapper) fotoWrapper.classList.add("is-invalid");
            isValid = false;
        } else {
            if (errorFoto) errorFoto.classList.add("d-none");
            if (fotoWrapper) fotoWrapper.classList.remove("border", "border-danger");
            if (fotoWrapper) fotoWrapper.classList.remove("is-invalid");
        }
    }

    if (identificacionRequerida) {
        const imgCard = document.getElementById("imgCard");
        const errorId = document.getElementById("errorIdentificacion");
        const idWrapper = document.getElementById("idWrapper");

        const tieneId = fotosNuevaVisita.identificacion &&
                         fotosNuevaVisita.identificacion.length > 0 &&
                         imgCard &&
                         imgCard.src &&
                         imgCard.style.display !== "none";

        if (!tieneId) {
            if (errorId) errorId.classList.remove("d-none");
            if (idWrapper) idWrapper.classList.add("border", "border-danger");
            if (idWrapper) idWrapper.classList.add("is-invalid");
            isValid = false;
        } else {
            if (errorId) errorId.classList.add("d-none");
            if (idWrapper) idWrapper.classList.remove("border", "border-danger");
            if (idWrapper) idWrapper.classList.remove("is-invalid");
        }
    }


    const requiredFields = [
        "inputName",
        "inputNombreEmpresa",
        "inputMotivoDeLaVisita"
    ];

    requiredFields.forEach(id => {
        const field = document.getElementById(id);
        if (!field) {
            console.warn("No se encontró el campo con id:", id);
            return;
        }
    
        if (field.value.trim() === "") {
            field.classList.add("is-invalid");
            isValid = false;
        } else {
            field.classList.remove("is-invalid");
        }
    });

    const emailInput = document.getElementById("inputEmail");
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email !== "" && !emailRegex.test(email)) {
        emailInput.classList.add("is-invalid");
        isValid = false;
    } else {
        emailInput.classList.remove("is-invalid");
    }

  
    const fotoRequired = document.getElementById("containerUser").dataset.required === "true";
    const idRequired = document.getElementById("containerCard").dataset.required === "true";
    
    const imgUser = document.getElementById("imgUser").src;
    const imgCard = document.getElementById("imgCard").src;
    
    if (fotoRequired && (!imgUser || imgUser.trim() === "")) {
        Swal.fire("Falta fotografía", "La fotografía es obligatoria.", "warning");
        return;
    }
    
    if (idRequired && (!imgCard || imgCard.trim() === "")) {
        Swal.fire("Falta identificación", "La identificación es obligatoria.", "warning");
        return;
    }
    let visitNombre = $("#inputNombreVisita").val();
    let visitEmail = $("#inputEmailVisita").val();
    let visitTelefono = $("#inputTelefonoVisita").val();

    const errorDiv = document.getElementById("errorVisita");

    if (!visitNombre && !visitEmail && !visitTelefono) {
        errorDiv.classList.remove("d-none");
        ["inputNombreVisita","inputEmailVisita","inputTelefonoVisita"].forEach(id => {
            document.getElementById(id).classList.add("is-invalid");
        });
        isValid=false;
        return;
    } else {
        errorDiv.classList.add("d-none");
        ["inputNombreVisita","inputEmailVisita","inputTelefonoVisita"].forEach(id => {
            document.getElementById(id).classList.remove("is-invalid");
        });
        isValid=true;
    }

	if (!isValid) {
        Swal.fire({
            icon: "warning",
            title: "Campos incompletos",
            text: "Por favor completa los campos obligatorios correctamente."
        });
        return;
    }

	if (!ultimaValidacion()) {
		return; 
	}
	
    let location = $("#textLocation").text().replace(/"/g,"");
    let caseta  = $("#textModule").text().replace(/"/g,"");
    let name = $("#inputName").val();
    let company = $("#inputNombreEmpresa").val();
    let telefono = $("#inputTelefono").val();
    // let motivo = $("#inputMotivoDeLaVisita").val();
    let equipos = equiposAgregados.map(({ id, ...rest }) => rest);
	const selectMotivo = document.getElementById('motivoSelect').value;
    const inputMotivo = document.getElementById('inputMotivoDeLaVisita').value;
    let motivo=""
    if (selectMotivo === 'otro') {
        motivo= inputMotivo.trim();
    } else {
        motivo= selectMotivo;
    }

	let equiposHTML = '';
	if (equipos.length > 0) {
		equipos.forEach((equipo, index) => {
			equiposHTML += `
				<div class="equipo-item">
					<div class="equipo-header" onclick="window.toggleEquipo(${index})">
						<div class="equipo-title">
							<i class="fas fa-toolbox" style="color: var(--primary-red); margin-right:8px;"></i>
							<span>${equipo.tipo || 'Equipo'} - ${equipo.marca || 'Sin marca'}</span>
						</div>
						<i class="fas fa-chevron-down equipo-toggle"  style="color: var(--primary-red);" id="toggle-${index}"></i>
					</div>
					<div class="equipo-details" id="equipo-${index}" style="display:none;">
						<div class="equipo-info-row">
							<span class="equipo-label">Tipo:</span>
							<span class="equipo-value">${equipo.tipo || '-'}</span>
						</div>
						<div class="equipo-info-row">
							<span class="equipo-label">Marca:</span>
							<span class="equipo-value">${equipo.marca || '-'}</span>
						</div>
						<div class="equipo-info-row">
							<span class="equipo-label">Modelo:</span>
							<span class="equipo-value">${equipo.modelo || '-'}</span>
						</div>
						<div class="equipo-info-row">
							<span class="equipo-label">No. Serie:</span>
							<span class="equipo-value">${equipo.numero_serie || '-'}</span>
						</div>
						<div class="equipo-info-row">
							<span class="equipo-label">Color:</span>
							<span class="equipo-value">${equipo.color || '-'}</span>
						</div>
					</div>
				</div>
			`;
		});
	} else {
		equiposHTML = '<div style="text-align:center;color:#6c757d;font-size:0.9em;padding:10px;">No se agregaron equipos</div>';
	}

	window.toggleEquipo = function(index) {
		const details = document.getElementById('equipo-' + index);
		const toggle = document.getElementById('toggle-' + index);
		
		if (details.style.display === 'none') {
			details.style.display = 'block';
			toggle.classList.add('rotated');
		} else {
			details.style.display = 'none';
			toggle.classList.remove('rotated');
		}
	}

	Swal.fire({
		title: `
			<div style="color:#2c3e50;font-size:.8em;font-weight:700;">
				Confirmar registro
			</div>
		
		`,
		html: `
		<style>
			.swal2-title {
				display: flex !important;
				flex-direction: column !important;
				align-items: center !important;
				padding: 10px 24px !important;
			}
			.custom-buttons-container {
				display: flex !important;
				gap: 10px !important;
				justify-content: center !important;
				margin-top: 10px !important;
			}
			.custom-btn {  
				padding: 10px 20px !important;
				border: none !important;
				border-radius: 5px !important;
				font-weight: 600 !important;
				cursor: pointer !important;
				font-size: 14px !important;
				color: white !important;
				transition: all 0.2s ease !important;
			}
			
			.custom-confirm-btn {
				background-color: #28a745 !important;
			}
			.custom-confirm-btn:hover {
				background-color: #218838 !important;
			}
			
			.custom-cancel-btn {
				background-color: #b0b3b8 !important;
			}
			
			.custom-cancel-btn:hover {
				background-color: #9a9da1 !important;
			}
		
			.modal-container{
				max-height:65vh;
				overflow-y:auto;
				padding:5px 6px;
				font-size:.92em;
				color:#2c3e50;
			}
			.info-section{
				background:#f9fafb;
				border-radius:10px;
				padding:14px;
				border:1px solid #eceff1;
			}
			/* GRID INFO */
			.info-grid{
				display:grid;
				grid-template-columns:1fr 1fr;
				gap:12px 20px;
			}
			.info-row{
				display:flex;
				flex-direction:column;
				align-items:flex-start;
				gap:4px;
			}
			.info-icon-label{
				display:flex;
				align-items:center;
				gap:6px;
			}
			.info-icon{
				font-size:.85em;
				color:#ff6b35;
			}
			.info-label{
				font-weight:600;
				color:#495057;
				font-size:.85em;
			}
			.info-value{
				color:#6c757d;
				font-size:.88em;
				line-height:1.4;
				padding-left:22px;
				text-align:left;
				width:100%;
			}
			.section-divider{
				border:0;
				height:1px;
				background:linear-gradient(to right,transparent,#ff6b35,transparent);
				margin:18px 0;
			}
			.section-header{
				font-weight:700;
				font-size:.95em;
				margin-bottom:10px;
				display:flex;
				align-items:center;
				gap:6px;
				color:#2c3e50;
			}
			.photo-grid{
				display:grid;
				grid-template-columns:1fr 1fr;
				gap:14px;
				margin-top:10px;
			}
			
			.photo-item img{
				width:150px;
				aspect-ratio: 5 / 4; 
				object-fit: cover;
				border-radius:8px;
				border:1px solid #e0e0e0;
			}
			/* EQUIPOS */
			.equipos-grid{
				display:flex;
				flex-direction:column;
				gap:10px;
			}
			.equipo-item{
				background:#fff;
				border:1px solid #e5e7eb;
				border-radius:8px;
				overflow:hidden;
			}
			.equipo-header{
				display:flex;
				justify-content:space-between;
				align-items:center;
				padding:12px 14px;
				cursor:pointer;
				background:#f9fafb;
				transition:all 0.3s ease;
			}
			.equipo-header:hover{
				background:#f1f3f5;
			}
			.equipo-title{
				display:flex;
				align-items:center;
				font-weight:600;
				font-size:.9em;
				color:#2c3e50;
			}
			.equipo-toggle{
				color:#6c757d;
				font-size:.8em;
				transition:transform 0.3s ease;
			}
			.equipo-toggle.rotated{
				transform:rotate(180deg);
			}
			.equipo-details{
				padding:0 14px 12px 14px;
				background:#fff;
			}
			.equipo-info-row{
				display:flex;
				padding:6px 0;
				border-bottom:1px solid #f1f3f5;
			}
			.equipo-info-row:last-child{
				border-bottom:none;
			}
			.equipo-label{
				font-weight:600;
				color:#495057;
				font-size:.85em;
				min-width:80px;
			}
			.equipo-value{
				color:#6c757d;
				font-size:.85em;
			}
			/* Responsive */
			@media(max-width:576px){
				.info-grid{
					grid-template-columns:1fr;
				}
				.photo-grid{
					grid-template-columns:1fr;
				}
			}
			.swal2-image{
				object-fit:contain!important;
				max-width:90px!important;
				margin: 0 !important;
				padding: 0 !important;
			}
		
			.swal2-popup {
				display: grid !important;
				grid-template-rows: auto auto 1fr auto;
			}

			.swal2-title {
				grid-row: 1 !important;
			}

			.swal2-actions {
				grid-row: 2 !important;
				margin-top: 5px !important;
				margin-bottom: 10px !important;
				gap: 12px !important; 
			}
			.swal2-html-container {
				grid-row: 3 !important;
			}

		</style>
			
		<div class="modal-container">
			<div class="info-grid">
				<div class="info-row">
					<div class="info-icon-label">
						<i class="fas fa-map-marker-alt info-icon" style="color: var(--primary-red);"></i>
						<span class="info-label">Ubicación</span>
					</div>
					<span class="info-value">${location}</span>
				</div>
				<div class="info-row">
					<div class="info-icon-label">
						<i class="fas fa-door-open info-icon"  style="color: var(--primary-red);"></i>
						<span class="info-label">Caseta</span>
					</div>
					<span class="info-value">${caseta}</span>
				</div>
				<div class="info-row">
					<div class="info-icon-label">
						<i class="fas fa-user info-icon" style="color: var(--primary-red);"></i>
						<span class="info-label">Nombre</span>
					</div>
					<span class="info-value">${name}</span>
				</div>
				<div class="info-row">
					<div class="info-icon-label">
						<i class="fas fa-building info-icon" style="color: var(--primary-red);"></i>
						<span class="info-label">Empresa</span>
					</div>
					<span class="info-value">${company}</span>
				</div>
				<div class="info-row">
					<div class="info-icon-label">
						<i class="fas fa-envelope info-icon" style="color: var(--primary-red);"></i>
						<span class="info-label">Email</span>
					</div>
					<span class="info-value">${email}</span>
				</div>
				<div class="info-row">
					<div class="info-icon-label">
						<i class="fas fa-phone info-icon" style="color: var(--primary-red);"></i>
						<span class="info-label">Teléfono</span>
					</div>
					<span class="info-value">${telefono}</span>
				</div>
				<div class="info-row">
				<div class="info-icon-label">
					<i class="fas fa-user-tie info-icon" style="color: var(--primary-red);"></i>
					<span class="info-label">Visita a</span>
				</div>
				<div class="flex flex-col info-value">
					<div id="displayNombre"><strong>Nombre:</strong> ${visitNombre}</div>
					<div id="displayTelefono"><strong>Teléfono:</strong> ${visitTelefono}</div>
					<div id="displayEmail"><strong>Email:</strong> ${visitEmail}</div>
				</div>
			</div>
				<div class="info-row">
					<div class="info-icon-label">
						<i class="fas fa-comment-dots info-icon" style="color: var(--primary-red);"></i>
						<span class="info-label">Motivo</span>
					</div>
					<span class="info-value">${motivo}</span>
				</div>
			</div>
			<hr class="section-divider">
			<div class="section-header">
				<i class="fas fa-images" style="color: var(--primary-red); font-size:.9em;"></i>
				Documentos
			</div>
			<div class="photo-grid">
				<div class="photo-item">
					<img src="${urlImgUser}">
				</div>
				<div class="photo-item">
					<img src="${urlImgCard}">
				</div>
			</div>
			<hr class="section-divider">
			<div class="section-header">
				<i class="fas fa-toolbox" style="color: var(--primary-red); font-size:.9em;"></i>
				Equipos (${equipos.length})
			</div>
			<div class="equipos-grid">
				${equiposHTML}
			</div>
		</div>
		`,
		imageUrl:"https://s203.q4cdn.com/155743495/files/design/site_logo/Logo-Tiendas-3B.png",
		showConfirmButton: true,
		showCancelButton: true,
		confirmButtonText: 'Crear pase',
		cancelButtonText: 'Cancelar',
	
		customClass: {
			confirmButton: 'custom-btn custom-confirm-btn',
			cancelButton: 'custom-btn custom-cancel-btn'
		},
		buttonsStyling: false,
	
		allowOutsideClick: false,
		allowEscapeKey: false,
		didOpen: () => {
			const title = Swal.getTitle();
			const actions = Swal.getActions();
		
			if (title && actions) {
				title.insertAdjacentElement('afterend', actions);
			}
		},
	}).then((result) => {
		console.log("result",result)
		if (result.dismiss === Swal.DismissReason.cancel) {
			return;
		}
		console.log('Crear pase clicked!');
			loadingService()
			let access_pass={
				
				ubicaciones:[location],
				nombre: name,
				perfil_pase:caseta=="Lobby"? "Internos": "Walkin",
				telefono: telefono,
				  visita_a: {
					nombre: visitNombre,
					email: visitEmail,
					telefono: visitTelefono
				},
				email: email,
				empresa: company,
				foto:fotosNuevaVisita.foto,
				identificacion: fotosNuevaVisita.identificacion,
				equipos: equipos,
				motivo: motivo,
				created_from:"auto_registro",
			}
			
			fetch(url + urlScripts, {
				method: 'POST',
				body: JSON.stringify({
					script_name: paseDeAccesoScript,
					option: 'create_access_pass',
					access_pass: access_pass,
					account_id: account_id
				}),
				headers:{
					'Content-Type': 'application/json',
					'Authorization': 'Bearer '+userJwt
				},
			})
			.then(res => res.json())
			.then(res => {
				const statusCode = res?.response?.data?.status_code || res?.status_code;
			
				if (!res.success || (statusCode && statusCode >= 400)) {
					Swal.close();
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Ocurrió un error al crear el pase, revisa la configuración',
						confirmButtonColor: "#e74c3c",
						confirmButtonText: "Aceptar"
					});
					return;
				}
			
				
				if (res.success) {
					const qrCode = res?.response?.data?.json?.id;
					
					// Cerrar el loading y mostrar el modal inmediatamente
					Swal.close();
					
					Swal.fire({
						imageUrl: "https://s203.q4cdn.com/155743495/files/design/site_logo/Logo-Tiendas-3B.png",
						imageHeight: 110,
						showConfirmButton: true,
						confirmButtonColor: "#e74c3c",
						confirmButtonText: 'Descargar PDF <i class="fas fa-download me-2"></i>',
						showCancelButton: true,
						cancelButtonText: "Aceptar",
						cancelButtonColor: "#efefef",
						allowOutsideClick: false,
						allowEscapeKey: false,
						buttonsStyling: false, 
						customClass: {
							confirmButton: 'btn-descargar-pdf',
							cancelButton: 'btn-aceptar-pdf',
							actions: 'swal-actions-custom'
						},
						html: `
							<div class="mb-3 mt-2 text-center">
								<div style="font-weight:bold; font-size:1.1em; color:#333;">
									¡Información guardada correctamente!
								</div>
								<div class="d-flex justify-content-center align-items-center mt-3 mb-3" style="gap: 0.5rem;">
									<i class="fa-solid fa-map-marker-alt" style="color:#666;"></i>
									<div class="d-flex text-start" style="gap: 0.75rem;">
										<div style="color:#666; font-size:0.95em;">${location}</div>
										<div style="color:#666; font-size:0.95em;">${caseta}</div> 
									</div>
								</div>
								<img class="mt-2" alt="Código QR" id="codigo">
							</div>
						`
					}).then(async (result) => {
						if (result.value) {
							// AQUÍ SE LLAMA AL SERVICIO CUANDO HACE CLIC EN "Descargar PDF"
							loadingService("Generando PDF...");
							
							try {
								const pdfResponse = await fetch(url + urlScripts, {
									method: 'POST',
									body: JSON.stringify({
										script_name: paseDeAccesoScript,
										option: 'get_pdf',
										qr_code: qrCode,
										account_id: account_id,
									}),
									headers:{
										'Content-Type': 'application/json',
										'Authorization': 'Bearer '+userJwt
									},
								});
								
								const pdfRes = await pdfResponse.json();
								Swal.close();
								
								const statusCode = pdfRes?.response?.data?.status_code || pdfRes?.status_code;
			
								if (!pdfRes.success || (statusCode && statusCode >= 400)) {
									Swal.fire({
										icon: 'error',
										title: 'Error',
										text: 'Ocurrió un error al crear el pase',
										confirmButtonColor: "#e74c3c",
										confirmButtonText: "Aceptar"
									});
									return;
								}
			
								if (pdfRes.success) {
									const downloadUrl = pdfRes?.response?.data?.data?.download_url || 
													  pdfRes?.response?.data?.json?.download_url;
									const fileName = pdfRes?.response?.data?.data?.file_name || 
												   pdfRes?.response?.data?.json?.file_name || 
												   'Pase_de_Acceso';
									
									if (!downloadUrl) {
										throw new Error('URL de descarga no disponible');
									}
									
									const response = await fetch(downloadUrl);
									
									if (!response.ok) {
										throw new Error('Error al descargar el archivo');
									}
									
									const blob = await response.blob();
									const blobUrl = window.URL.createObjectURL(blob);
									
									const link = document.createElement('a');
									link.href = blobUrl;
									link.download = (fileName.split('/').pop() || 'Pase_de_Acceso') + '.pdf';
									document.body.appendChild(link);
									link.click();
									
									document.body.removeChild(link);
									window.URL.revokeObjectURL(blobUrl);
									
									Swal.fire({
										icon: 'success',
										title: '¡Descargado!',
										text: 'Tu pase de acceso ha sido descargado correctamente',
										confirmButtonColor: "#8ebd73",
										confirmButtonText: "Aceptar",
										timer: 2500,
										timerProgressBar: true
									});
									window.location.reload();
									
								} else {
									errorAlert(pdfRes);
								}
								
							} catch (error) {
								console.error('Error al descargar:', error);
								Swal.close();
								Swal.fire({
									icon: 'error',
									title: 'Error al descargar',
									text: 'No se pudo descargar el PDF. Intenta nuevamente.',
									confirmButtonColor: "#8ebd73"
								});
								window.location.reload();
							}
						} else {
							window.location.reload();
						}
					});
					
					// Generar el QR después de mostrar el modal
					setTimeout(() => {
						new QRious({
							element: document.querySelector("#codigo"),
							value: qrCode ?? "QR no disponible, ocurrió un error al generar el QR",
							size: 200,
							backgroundAlpha: 0, 
							foreground: "#505050", 
							level: "L", 
						});
					}, 100);
					
				} else {
					Swal.close();
					errorAlert(res);
				}
			}).catch(error => {
				console.error('Error en create_access_pass:', error);
				Swal.close();
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'No se pudo crear el pase de acceso',
					confirmButtonColor: "#8ebd73"
				});
			});
			
		});
}
function setRequestFileImg(type) {
	let idInput = '';
	if(type == 'inputCard'){
		idInput = 'inputFileCard';
	}else if(type == 'inputUser'){
		idInput = 'inputFileUser';
	}
	const fileInput = document.getElementById(idInput);
	const file = fileInput.files[0];
    if (file) {
		const formData = new FormData();
		formData.append('File', file);
		formData.append('field_id', '660459dde2b2d414bce9cf8f');
		formData.append('is_image', true);
		formData.append('form_id', 116852);
		fetch('https://app.linkaform.com/api/infosync/cloud_upload/', {
			method: 'POST',
			body: formData
		})
		.then(response => response.json())
		.then(res => {
			if(res.file !== undefined && res.file !== null){
				if(type == 'inputCard'){
					urlImgCard = res.file;
					fotosNuevaVisita.identificacion.push({"file_name":res.file_name, "file_url":res.file});
				
					var canvas = document.getElementById('canvasPhoto');
					var ctx = canvas.getContext('2d');
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					document.getElementById("buttonResetCard").style.display = "inline-block";
					const errorId = document.getElementById("errorIdentificacion");
					const idWrapper = document.getElementById("idWrapper");
					if (errorId) errorId.classList.add("d-none");
					if (idWrapper) idWrapper.classList.remove("border", "border-danger");
				
				}else if(type == 'inputUser'){
					urlImgUser = res.file;
					fotosNuevaVisita.foto.push({"file_name":res.file_name, "file_url":res.file});
					document.getElementById("buttonResetUser").style.display = "inline-block";
					var canvas = document.getElementById('canvasPhotoUser');
					var ctx = canvas.getContext('2d');
					ctx.clearRect(0, 0, canvas.width, canvas.height);
				
					const errorFoto = document.getElementById("errorFoto");
					const fotoWrapper = document.getElementById("fotoWrapper");
					if (errorFoto) errorFoto.classList.add("d-none");
					if (fotoWrapper) fotoWrapper.classList.remove("border", "border-danger");
				}
				
			}else{
				console.log('Error aqui 2');
				return 'Error';
			}
		})
		.catch(error => {
			console.log('Error aqui 3');
			return 'Error';
		});
	}else{
		return 'Error';
	}
}


//FUNCION validar que el canvas este limpio
function isCanvasBlank(canvas) {
    const context = canvas.getContext('2d');
    const pixelBuffer = new Uint32Array(
        context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );
    return !pixelBuffer.some(color => color !== 0);
}


//FUNCION obtener la imagen del canvas
function getScreenCard(){
	if(!flagVideoCard){
        flagVideoCard = true;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }})
            .then(function(stream) {
                let video = document.createElement('video');
                video.style.width = '180px';
                video.style.height = '180px';
                document.getElementById('containerCard').appendChild(video);
                video.srcObject = stream;
                video.play();
                let canvas = document.getElementById('canvasPhoto');
                let context = canvas.getContext('2d');
                $("#buttonTakeCard").attr('disabled','disabled');
                $("#buttonTakeCard").hide();
                $("#buttonSaveCard").show();
                document.getElementById('buttonSaveCard').addEventListener('click', function() {
                    setTranslateImageCard(context, video, canvas)
                });
            })
            .catch(function(error) {
                console.error('Error al acceder a la cámara:', error);
            });
        } else {
            alert('Lo siento, tu dispositivo no soporta acceso a la cámara.');
        }
    }
}


//FUNCION obtener la imagen del canvas
function getScreenUser(){
	//-----Save Photo
	if(!flagVideoUser){
		flagVideoUser = true;
   
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	        navigator.mediaDevices.getUserMedia({ video: true })
	        .then(function(stream) {
	            let video = document.createElement('video');
	            video.style.width = '180px';
	            video.style.height = '180px';
	            document.getElementById('containerUser').appendChild(video);
	            video.srcObject = stream;
	            video.play();
	            let canvas = document.getElementById('canvasPhotoUser');
	            let context = canvas.getContext('2d');
	            //----Take
	            $("#buttonTakeUser").attr('disabled','disabled');
	            $("#buttonTakeUser").hide();
	            $("#buttonSaveUser").show();
	            document.getElementById('buttonSaveUser').addEventListener('click', function() {
	            	setTranslateImageUser(context, video, canvas);
	            });
	        })
	        .catch(function(error) {
	            console.error('Error al acceder a la cámara:', error);
	        });
	    } else {
	        alert('Lo siento, tu dispositivo no soporta acceso a la cámara.');
	    }
	}
}


//FUNCION obtener la imagen del canvas parte2
function setTranslateImageUser(context, video, canvas){
	context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let photoCard = document.getElementById('imgUser');
    photoCard.src = canvas.toDataURL('image/png');
    photoCard.style.display = 'block';
    video.pause();
    video.srcObject.getTracks().forEach(function(track) {
        track.stop();
    });
    video.style.display = 'none';
    ///-- Save Input
	canvas.toBlob( (blob) => {
		const file = new File( [ blob ], "imageUser.png" );
		const dT = new DataTransfer();
		dT.items.add( file );
		document.getElementById("inputFileUser").files = dT.files;
	} );
	//-----Rquest Photo
	const flagBlankUser = isCanvasBlank(document.getElementById('canvasPhotoUser'));
	if(!flagBlankUser){
		setTimeout(() => {
			setRequestFileImg('inputUser');
		}, "1000");
	}
	//-----Clean ELement
    $("#buttonSaveUser").hide();
}

//FUNCION obtener la imagen del canvas parte2
function setTranslateImageCard(context, video, canvas){
	context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let photoCard = document.getElementById('imgCard');
    photoCard.src = canvas.toDataURL('image/png');
    photoCard.style.display = 'block';
    video.pause();
    video.srcObject.getTracks().forEach(function(track) {
        track.stop();
    });
    video.style.display = 'none';
	canvas.toBlob( (blob) => {
		const file = new File( [ blob ], "imageCard.png" );
		const dT = new DataTransfer();
		dT.items.add( file );
		document.getElementById("inputFileCard").files = dT.files;
	} );
    const flagBlankCard = isCanvasBlank(document.getElementById('canvasPhoto'));
	if(!flagBlankCard){
		setTimeout(() => {
			setRequestFileImg('inputCard');
		}, "1000");
	}
    $("#buttonSaveCard").hide();
}

//FUNCION eliminar set repetitivo de equipo
function setDeleteEquipo(id) {
	 if (id === 123) {
        alert("No puedes eliminar el equipo principal");
        return;
    }
	const eq = document.getElementById(`div-equipo-${id}`);
	if (eq) {
		eq.remove();
	}
}

document.getElementById('btnAgregarEquipo').addEventListener('click', function() {
    document.getElementById('formEquipoContainer').style.display = 'block';
    document.getElementById('formEquipoContainer').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
    });
});

// Función para ocultar el formulario de equipo
function ocultarEquipo() {
    document.getElementById('formEquipoContainer').style.display = 'none';
}

// Función para limpiar el formulario de equipo
function resetEquipoForm() {
    document.getElementById('selectTipoEquipo').value = '';
    document.getElementById('inputMarcaEquipo').value = '';
    document.getElementById('inputModeloEquipo').value = '';
    document.getElementById('inputNoSerieEquipo').value = '';
    document.getElementById('selectColorEquipo').value = '';
}


function setAddEquipo() {
    const tipo = document.getElementById('selectTipoEquipo').value;
    const marca = document.getElementById('inputMarcaEquipo').value;
    const modelo = document.getElementById('inputModeloEquipo').value;
    const noSerie = document.getElementById('inputNoSerieEquipo').value;
    const color = document.getElementById('selectColorEquipo').value;
    if (!tipo || !marca || !modelo || !noSerie || !color) {
        alert("Por favor completa todos los campos antes de agregar el equipo.");
        return;
    }
    const randomID = Date.now();

    const equipo = { id: randomID, tipo, marca, modelo, noSerie, color };
    equiposAgregados.push(equipo);

    const newCard = document.createElement('div');
    newCard.className = 'card mb-2 shadow-sm';
    newCard.id = `equipo-${randomID}`;
    newCard.innerHTML = `
        <div class="card-header d-flex justify-content-between align-items-center" 
             style="cursor:pointer; background-color:#fff;" 
             onclick="toggleEquipo(${randomID})">
            <div class="fw-bold text-danger">
                <i class="fa-solid fa-toolbox me-1"></i> ${tipo}
            </div>
            <div>
                <button class="btn btn-sm btn-danger" onclick="deleteEquipo(${randomID}); event.stopPropagation();">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="card-body p-2 d-none" id="body-equipo-${randomID}" style="font-size:0.9em;">
            <div class="d-flex flex-wrap gap-2">
                <span><strong>Marca:</strong> ${marca}</span>
                <span><strong>Modelo:</strong> ${modelo}</span>
                <span><strong>No. Serie:</strong> ${noSerie}</span>
                <span><strong>Color:</strong> ${color}</span>
            </div>
        </div>
    `;

    document.getElementById('div-equipos-agregados').appendChild(newCard);
    document.getElementById('selectTipoEquipo').value = '';
    document.getElementById('inputMarcaEquipo').value = '';
    document.getElementById('inputModeloEquipo').value = '';
    document.getElementById('inputNoSerieEquipo').value = '';
    document.getElementById('selectColorEquipo').value = '';
}

function deleteEquipo(id) {
    const index = equiposAgregados.findIndex(eq => eq.id === id);
    if (index !== -1) equiposAgregados.splice(index, 1);

    const card = document.getElementById(`equipo-${id}`);
    if (card) card.remove();
}
function toggleEquipo(id) {
    const body = document.getElementById(`body-equipo-${id}`);
    if(body) body.classList.toggle('d-none');
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function resetUserPhoto() {
    const imgUser = document.getElementById("imgUser");
    const canvasUser = document.getElementById("canvasPhotoUser");
    const buttonTake = document.getElementById("buttonTakeUser");
    const buttonSave = document.getElementById("buttonSaveUser");
    const buttonReset = document.getElementById("buttonResetUser");

    if (imgUser) {
        imgUser.src = "";
        imgUser.style.display = "none";
    }
    if (canvasUser) {
        const ctx = canvasUser.getContext("2d");
        ctx.clearRect(0, 0, canvasUser.width, canvasUser.height);
    }

    fotosNuevaVisita.foto = [];

    if (buttonTake) buttonTake.style.display = "inline-block";
    if (buttonSave) buttonSave.style.display = "none";
    if (buttonReset) buttonReset.style.display = "none";

    flagVideoUser = false;
    getScreenUser();
}

function resetCardPhoto() {
    const imgCard = document.getElementById("imgCard");
    const canvasCard = document.getElementById("canvasPhotoCard");
    const buttonTake = document.getElementById("buttonTakeCard");
    const buttonSave = document.getElementById("buttonSaveCard");
    const buttonReset = document.getElementById("buttonResetCard");

    if (imgCard) {
        imgCard.src = "";
        imgCard.style.display = "none";
    }
    if (canvasCard) {
        const ctx = canvasCard.getContext("2d");
        ctx.clearRect(0, 0, canvasCard.width, canvasCard.height);
    }

    fotosNuevaVisita.foto = [];

    if (buttonTake) buttonTake.style.display = "inline-block";
    if (buttonSave) buttonSave.style.display = "none";
    if (buttonReset) buttonReset.style.display = "none";

    flagVideoCard = false;
    getScreenCard();
}