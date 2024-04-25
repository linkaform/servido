
const columsData2 = [
    { title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:190,
        formatter: (cell, formatterParams) => {
            //----Button Trash
            let folio = cell.getData().folio ? cell.getData().folio : 0;
            let divActions = '<div class="row d-flex">';
            divActions += `<button class="btn-table-bitacora" onClick="setModal('Delivery',${folio})"><i class="fa-solid fa-address-card"></i></button>`;
            divActions += `<button class="btn-table-bitacora" ><i class="fa-solid fa-print"></i></button>`;
            divActions += '</div>';
            return divActions;
        },
    },
    { title:"Locker", field:'locker',hozAlign:"left",headerFilter:true,width:225},
    { title:"Estatus del locker", field:'status',hozAlign:"left",headerFilter:true,width:225},
    { title:"Visitante", field:'visit',hozAlign:"left",headerFilter:true,width:500},
    { title:"Documento", field:'document',hozAlign:"left",headerFilter:true,width:225},
    { title:"Número Gafete", field:'num_access',hozAlign:"left",headerFilter:true,width:225},
    { title:"Planta", field:'location',hozAlign:"left",headerFilter:true,width:225},
];



const dataTable2 = [
    {'locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
    {'locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
    {'locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
    {'locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
    {'locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
    {'locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
    {'locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
    {'locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
    {'locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
    {'locker':'Locker 1','status':'Ocupado','visit':'Rodolfo Peña Gonzales','document':'INE','num_access':'A58','location':'PLanta 1'},
]



window.onload = function(){
    let user = getCookie("userId");
    let jw = getCookie("userJwt");

    if(user !='' && jw!=''){
        drawTable('tableSalidas',columsData2,dataTable2);
    } else{
		redirectionUrl('login',false);
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
    }else if(type == 'incidencias'){
    	urlNew = `${protocol}//${host}/solucion_accesos/portal_incidencias_v2.html`
    }else if(type == 'articulos'){
    	urlNew = `${protocol}//${host}/solucion_accesos/portal_articulos_v2.html`
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
function setCloseSession(argument) {
	closeSession();
	redirectionUrl('login',false);
}