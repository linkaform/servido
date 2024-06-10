let selectLocation;
let scriptName=''
let articulosPerdidos=[]
let articulosConcesionados=[]
let colors = getPAlleteColors(12,0)

window.onload = function(){
	setValueUserLocation('articulos');
	changeButtonColor();
	getInfoCatalogs();
	selectLocation= document.getElementById("selectLocation");
	selectLocation.onchange = function(){
    let response = fetchOnChangeLocation()
  };
 selectCaseta= document.getElementById("selectCaseta")
    selectCaseta.onchange = function() {
        let response = fetchOnChangeLocation()
    };
	setSpinner(true, 'divSpinner');
	let user = getCookie("userId");
	let jw = getCookie("userJwt");
	if(user !='' && jw!=''){
		//----QUery
		drawTable('tableArticles', columsDataArticles, dataTableArticles);
		drawTable('tableArticlesLose', columsDataArticlesLose, dataTableArticlesLose);
	}else{
		redirectionUrl('login',false)
	}

}

function getInfoCatalogs(){
	 //INFO: poner aqui FETCH para traer los catalogos y lo sig agregarlo dentro del response
     fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name: scriptName,
        }),
        headers:
        {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+jw
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
        }
    });
    //INFO: los array que estan en el archivo incidencias data se llenaran desde esta fetch

    dataCatalogs={
        "location":["Estacionamiento", "Edificio", "Casa"],
        "incident_location":["Caseta 1 Poniente","Caseta 2 Sur","Caseta 3 Poniente"],
        "incident":["Acceso no autorizado", "Fallo de energia", "Incidencia 3"],
        "report":["Miguel Perez","Manuel Gonzales","Erik Lopez"],
        "department":["Seguridad","Departamento 2","Departamento 3"],
        "responsable":["Jose Patricio","Josue de Jesus","Karina Moreno"]
    }
	  dataCatalogs.location.forEach(function(e, i){
        $("#idUbicacionArticles").append($('<option></option>').val(e).text(e));
        $("#idUbicacionArticlesLose").append($('<option></option>').val(e).text(e))
        $("#idUbicacionArticles").val("")
        $("#idUbicacionArticlesLose").val("")
    });
}


//funcion Escojer modales
function setModal(type = 'none',id){
	if(type == 'NewArticle'){
		$('#newArticleModal').modal('show');
	}else if(type == 'EditArticle'){
		$('#editArticleModal').modal('show');
	}else if(type == 'ViewArticle'){
		$('#viewArticleModal').modal('show');
	}else if(type == 'OutArticle'){
		$('#outArticleModal').modal('show');
	}else if(type == 'NewArticleConse'){
		$('#newArticleConModal').modal('show');
	}else if(type == 'ViewArticleConse'){
		$('#viewArticleConModal').modal('show');
	}else if(type == 'EditArticleConse'){
		$('#editArticleConModal').modal('show');
	}else if(type == 'OutArticleConse'){
		$('#outArticleConModal').modal('show');
	}
}

function resetFilters(table){
    let page= getValueUserLocation()
    console.log("REESTABLECER FILTROS", table)
}

function getInputsValueByClass(classInput){
    let data = {};
    let elements = document.getElementsByClassName(classInput)
    console.log("ELEMENTOS",elements)
    for (let i = 0; i < elements.length; i++) {
        let id = elements[i].id;
        let value = elements[i].value;
        let type = elements[i].type;
        if(type == 'radio'){
            let valueCheck = elements[i].checked;
            if(valueCheck){
                data[id] = value;
            }
        }else{
            data[id] = value;
        }
    }
    return data
}

function applyFilters(table, classFilter){
    let page= getValueUserLocation()
    let data= getInputsValueByClass(classFilter)
    if(table == 'tableArticles'){
        let resultadosFiltrados = dataTableArticles.filter(function(item) {
            let rangoFechaDesde = !(data.idFechaDesdeArticles != '' && data.idFechaHastaArticles != '') || (item.date >= data.idFechaDesdeArticles  && item.date <= data.idFechaHastaArticles);
            let rangoUbicacion= !(data.idUbicacionArticles != '') || (item.location.toLowerCase() ===  data.idUbicacionArticles.toLowerCase());
            return rangoFechaDesde && rangoUbicacion;
        });
        dataTableArticles = resultadosFiltrados;
        tables[table].setData(dataTableArticles);
    } else {
        let resultadosFiltrados = dataTableArticlesLose.filter(function(item) {
            let rangoFechaDesde = !(data.idFechaDesdeArticlesLose != '' && data.idFechaHastaArticlesLose != '') || (item.date >= data.idFechaDesdeArticlesLose  && item.date <= data.idFechaHastaArticlesLose);
            let rangoUbicacion= !(data.idUbicacionArticlesLose != '') || (item.location.toLowerCase() ===  data.idUbicacionArticlesLose.toLowerCase());
            return rangoFechaDesde && rangoUbicacion;
        });
        dataTableArticlesLose = resultadosFiltrados;
        tables[table].setData(dataTableArticlesLose);
    }
}


function nuevoArticulo(type){
	console.log("VGSKJD", type)
  let data = getInputsValueByClass("contentNuevoArticulo")
   
    if(!validarObjeto(data)){
        Swal.fire({
            title: "Validación",
            text: "Faltan campos por llenar, los campos marcados con asterisco son obligatorios.",
            type: "warning"
        });
    } else {
        //INFO: Poner FETCH AQUI para enviar el nuevo registro de incidencia
        fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name: scriptName,
            }),
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+jw
            },
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                //INFO devolverme la informacion actualizada o simplemente actualizar el array ya que tenemos response success
            }
        });

        Swal.fire({
            title: "Confirmación",
            text: "Incidencia creada correctamente.",
            type: "success"
        });
        let folioRandom = Date.now();
        dataTableArticles = dataTableArticles.concat({"comment": data.comentariosNuevaIncidencia, "date": data.fechaNuevaIncidencia, "dept": data.departamentoNuevaIncidencia, 
        "folio": folioRandom, "incident": data.incidenciaNuevaIncidencia, "location": data.ubicacionNuevaIncidencia, "place_accident": data.lugarNuevaIncidencia, 
        "report": data.reportaNuevaIncidencia, "time": data.timeNuevaIncidencia});

        tables["tableArticles"].setData(dataTableArticles);
        $("#newIncidentModal").modal('hide')
    }
}

function validarObjeto(objeto) {
    return Object.values(objeto).every(valor => valor !== undefined && valor !== null && valor !== '');
}

function editarArticulo(){

}


function descargarExcel(table) {
    let columns = tables[table].getColumns();
  /*  for(c in columns) {
        let nombreCOlumnas=""
        let keys = Object.keys(columns);
        for (e in columns){
            console.log("GEELKSN",columns[e])
            if (e !== keys[keys.length - 1]) {
                nombreCOlumnas += columns[e] + "\n";
            }
            else{
               nombreCOlumnas += columns[e] + "\t" 
            }
        }
        console.log("nombreCOlumnasAA", nombreCOlumnas)
        excelContent += nombreCOlumnas
    };*/


    let nombresColumnas = columns.map(function(column) {
        return column.getField(); // O puedes usar column.getTitle() para obtener los títulos de las columnas
    }); 
    // Crear un archivo Excel básico
    let excelContent = nombresColumnas+"\n"; // Cabecera
    tables[table].getData().forEach(function(row) {
        let fila=""
        let keys = Object.keys(row);
        for (e in row){
            if (e !== keys[keys.length - 1]) {
                fila += row[e] + "\n";
            }
            else{
               fila += row[e] + "\t"; 
            }
        }
        excelContent += fila 
    });
    // Crear un enlace de descarga y simular clic
    let blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = table +'.xlsx';
    link.click(); 
}

function selectCheckboxArticulos(folio){
    let checkboxes = document.querySelectorAll('.checkbox-articulos');
    articulosConcesionados=[]
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
        console.log("HEGLOO", checkbox.checked)

            for(d of dataTableArticles){
                if(parseInt(d.folio) === parseInt(checkbox.value)){
                    articulosConcesionados= articulosConcesionados.concat(d)
                }
            }
        }
    });
} 


function selectCheckboxArticulosLose(folio){
    let checkboxes = document.querySelectorAll('.checkbox-articulosLose');
    articulosPerdidos=[]
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
        	 console.log("HEGLOO", checkbox.checked)
            for(d of dataTableArticlesLose){
                if(parseInt(d.folio) === parseInt(checkbox.value)){
                    articulosPerdidos = articulosPerdidos.concat(d)
                }
            }
        }
    });
} 

function alertEliminarCheckbox(type){
    console.log(type)
    Swal.fire({
        title:'¿Estas seguro de querer eliminar los registros selecionados?',
        html:`
        <div class="m-2"> Esta accion no se puede deshacer. </div>`,
        type: "warning",
        showCancelButton: true,
        cancelButtonColor: colors[0],
        cancelButtonText: "Cancelar",
        confirmButtonColor: colors[1],
        confirmButtonText: "Si",
        heightAuto:false,
        reverseButtons: true
    })
    .then((result) => {
        //INFO: mandar llamar la FETCH aqui para eliminar esos registros y en el response traer la data actualizada y actualizar la tabla
        if (result.value) {
            if(type=="articles"){
                     console.log("ARTICULOSSS CONSESIONADOS" , articulosConcesionados)
                let ids=[]
                for (d of articulosConcesionados){
                    ids.push(d.folio)
                }
                dataTableArticles = dataTableArticles.filter(function(objeto) {
                    return !ids.includes(objeto.folio); // Retorna verdadero para mantener el objeto, falso para eliminarlo
                });
                tables["tableArticles"].setData(dataTableArticles);
            }else{
                console.log("ARTICU7LOS PERDIDOS", articulosPerdidos)
                let ids=[]
                for (d of articulosPerdidos){
                    ids.push(d.folio)
                }
                dataTableArticlesLose = dataTableArticlesLose.filter(function(objeto) {
                    return !ids.includes(objeto.folio); // Retorna verdadero para mantener el objeto, falso para eliminarlo
                });
                tables["tableArticlesLose"].setData(dataTableArticlesLose);
            }
            
        }
    });
}


function alertEliminarTable(folio, type){
    Swal.fire({
        title:'¿Estas seguro de querer eliminar el registro?',
        html:`
        <div class="m-2"> Esta accion no se puede deshacer. </div>`,
        type: "warning",
        showCancelButton: true,
        cancelButtonColor: colors[0],
        cancelButtonText: "Cancelar",
        confirmButtonColor: colors[1],
        confirmButtonText: "Si",
        heightAuto:false,
        reverseButtons: true
    })
    .then((result) => {
        if (result.value) {
            if(type=='articles'){
                let dataFiltered = dataTableArticlesLose.filter(x => x.folio !== folio);
                dataTableArticlesLose = dataFiltered
                tables["tableArticlesLose"].setData(dataTableArticlesLose);
            }else{
                let dataFiltered = dataTableArticles.filter(x => x.folio !== folio);
                dataTableArticles = dataFiltered
                tables["tableArticles"].setData(dataTableArticles);
            }
            
        }
    });
}
