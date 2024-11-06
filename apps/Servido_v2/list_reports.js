//----Variable Data
const data = [
  { parentId:126 ,title: 'Reporte Asistencias', type: 'Tissueculture', form: 'Stock Form', url:'Soter/Asistencias/Index.html', scriptId:124764},
  { parentId:126 ,title: 'Reporte Horas', type: 'Sales', form: 'Sales Form', url:'Soter/Horas/Index.html', scriptId:124764},
];


//----Onload
window.onload = function(){
	const statusSession = getSession();
	if(statusSession == 'Active'){
	   viewCards(data)
    }
}

function viewCards(data) {
	let stateEmpty = false;
  	const contenedor = document.getElementById('content-list');
  	const parentId = getCookie('userParentId');
  	contenedor.innerHTML = '';
	data.forEach(reporte => {
		if (parentId == reporte.parentId) {
            stateEmpty = true;
    	  	//--Conditionals
    	  	let divType = '';
    	  	if (data.hasOwnProperty('type')){
    	  		divType = `<span class="badge rounded-pill bg-primary float-md-end mb-3 mb-sm-0">${data.type}</span>`
    	  	}
    	  	//--Create Card
    	    const colDiv = document.createElement('div');
    	    colDiv.classList.add('col-lg-4', 'col-md-6', 'col-12', 'mt-4', 'pt-2');
    	    colDiv.innerHTML = `
    	      <div class="card border-0 bg-light rounded shadow">
    	          <div class="card-body p-4">
    	              ${divType}
    	              <h5>${reporte.title}</h5>
    	              <div class="mt-3">
    	                  <span class="text-muted d-block"><i class="fab fa-wpforms" aria-hidden="true"></i> ${reporte.form}</span>
    	              </div>
    	              <div class="mt-3">
    	                  <button class="btn btn-primary btn-style" onClick="redirectionReport('${reporte.url}','${reporte.scriptId}')">Ver Reporte</button>
    	              </div>
    	          </div>
    	      </div>
    	    `;
    	    contenedor.appendChild(colDiv);
		}
	});
    //---Empty
    if (stateEmpty == false){
        emptyCards();
    }
}

function redirectionReport(url, script) {
	const protocolo = window.location.protocol;    
  	const hostname = window.location.hostname;      
  	const puerto = window.location.port;
  	//---URL REDIRECTION LOGIN
  	let urlRedirection = `${protocolo}//${hostname}:${puerto}/${url}?script_id=${script}`;
  	window.location.href = urlRedirection;
}

function emptyCards(){
 	const containerDescription = document.getElementById('content-description');
    containerDescription.style.display = 'none';
    const container = document.getElementById('content-empty');
 	const colDiv = document.createElement('div');
    colDiv.classList.add('col-lg-12', 'col-md-12', 'col-12', 'mt-4', 'pt-2');
	colDiv.innerHTML = `
		<div class="container mt-5">
            <p class="text-white  text-center">
		      <i class="fas fa-chart-bar text-light fs-1 text-center"></i>
            <p/>
            <p class="text-white fs-2 text-center">Nose encontrarón reportes</p>
            <p class="text-white fs-2 text-center">
                Contacte a soporte para recibir soporte.
            </p>
		</div>
    `;
    container.appendChild(colDiv);
}