//-----Variables
const columsData1 = [
	{ title:"Tipo", field:'type',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Marca", field:'marca',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Modelo", field:'modelo',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Serie", field:'serie',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Color", field:'color',hozAlign:"left",headerFilter:true,width:250},
	{ title: "Seleccionar", field: "actions" , hozAlign: "left", resizable:false,
		formatter: (cell, formatterParams) => {
			//----Button Trash
			let modelo = cell.getData().modelo ? cell.getData().modelo : 0;
			let component = '<div class="d-flex">';
			component += '  <input class="form-check-input " type="checkbox" id="checkbox'+modelo+'" value="">';
			component += '</div>';
			return component;
		},
	}
];

const columsData2 = [
	{ title:"Marca", field:'marca',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Modelo", field:'modelo',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Color", field:'color',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Placas", field:'placas',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Estado", field:'estado',hozAlign:"left",headerFilter:true,width:250},
	{ title: "Seleccionar", field: "actions" , hozAlign: "left", resizable:false,
		formatter: (cell, formatterParams) => {
			//----Button Trash
			let modelo = cell.getData().modelo ? cell.getData().modelo : 0;
			let component = '<div>';
			component += '  <input class="form-check-input " type="checkbox" id="checkbox'+modelo+'" value="">';
			component += '</div>';
			return component;
		},
	}
];

const dataTable1 = [
	{'type':'Computo','marca':'Dell','modelo':'ThinkPd X1 Yoga','serie':'DELL5820-12-3452','color':'Negro','check':'True'},
	{'type':'Computo','marca':'Dell','modelo':'ThinkPd X1 Yoga','serie':'DELL5820-12-3452','color':'Negro','check':'True'},
	{'type':'Computo','marca':'Dell','modelo':'ThinkPd X1 Yoga','serie':'DELL5820-12-3452','color':'Negro','check':'True'},
	{'type':'Computo','marca':'Dell','modelo':'ThinkPd X1 Yoga','serie':'DELL5820-12-3452','color':'Negro','check':'True'},
	{'type':'Computo','marca':'Dell','modelo':'ThinkPd X1 Yoga','serie':'DELL5820-12-3452','color':'Negro','check':'True'},
	{'type':'Computo','marca':'Dell','modelo':'ThinkPd X1 Yoga','serie':'DELL5820-12-3452','color':'Negro','check':'True'},
	{'type':'Computo','marca':'Dell','modelo':'ThinkPd X1 Yoga','serie':'DELL5820-12-3452','color':'Negro','check':'True'},
]


const dataTable2 = [
	{'marca':'Nissan','modelo':'Kicsk','color':'Blanco','placas':'PRC-1265','estado':'Nuevo León'},
	{'marca':'Nissan','modelo':'Kicsk','color':'Blanco','placas':'PRC-1265','estado':'Nuevo León'},
	{'marca':'Nissan','modelo':'Kicsk','color':'Blanco','placas':'PRC-1265','estado':'Nuevo León'},
	{'marca':'Nissan','modelo':'Kicsk','color':'Blanco','placas':'PRC-1265','estado':'Nuevo León'},
	{'marca':'Nissan','modelo':'Kicsk','color':'Blanco','placas':'PRC-1265','estado':'Nuevo León'},
	{'marca':'Nissan','modelo':'Kicsk','color':'Blanco','placas':'PRC-1265','estado':'Nuevo León'},
]


window.onload = function(){
	setSpinner(true, 'divSpinner');
	let user = getCookie("userId");
	let jw = getCookie("userJwt");

	if(user !='' && jw!=''){
		drawTable('tableEquipo',columsData1,dataTable1);
		drawTable('tableVehiculos',columsData2,dataTable2);
		getDataAlert();
	}else{
		redirectionUrl('login',false)
	}
}


//-----TABLES
function drawTable(id, columnsData, tableData,){
  var  table = new Tabulator("#" + id, {
    layout:"fitDataTable",
    data:tableData,
    textDirection:"ltr",
    columns:columnsData,
    pagination:true, 
    paginationSize:40,
  });
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
    }else if(type == 'login'){
    	urlNew = `${protocol}//${host}/solucion_accesos/login.html`
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

//---Close Sesión
function setCloseSession() {
	closeSession();
	redirectionUrl('login',false);
}

//-----Function Get Data
function getDataAlert() {
	let urlLinkaform = 'https://preprod.linkaform.com/api/infosync/scripts/run/';
	let userJwt = getCookie("userJwt");
	console.log('userJwt',userJwt);

	fetch(urlLinkaform, {
		method: 'POST',
		body: JSON.stringify({
			script_id: 116097,
			option: 'query_alerts',
		}),
		headers:{
	      'Content-Type': 'application/json',
	      'Authorization': 'Bearer '+userJwt,
	      'Access-Control-Request-Headers':'*'
	    },
	})
	.then(res => res.json())
	.then(res => {
		if (res.success) {
			console.log('RES',res);

		} 
	})

}