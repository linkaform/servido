let img="https://static.vecteezy.com/system/resources/previews/007/468/567/non_2x/colorful-simple-flat-of-security-guard-icon-or-symbol-people-concept-illustration-vector.jpg";

var dataTableGuardiasApoyo = [
    {name:"Agustin Melgar", status:"Disponible", image:img},
    {name:"Fernando Montes",  status:"Disponible",image:img},
    {name:"Vicente Suares", status:"Disponible", image:img},
    {name:"Rodolfo Pena Gonzales",  status:"Disponible",image:img},
    {name:"Andres Torres Sanchez",  status:"Disponible",image:img},
    {name:"Agustin Melgar", status:"Disponible", image:img},
    {name:"Fernando Montes",  status:"Disponible",image:img},
]

var dataTableNotas = [
    {name:"Oli Bob", note:"United Kingdom", check:"red", view:"14/04/1984", edit:""},
    {name:"Mary May", note:"Germany", check:"blue", view:"14/05/1982", edit:""},
    {name:"James Newman", note:"Japan", check:"red", view:"22/03/1998", edit:""},
    {name:"Mary May", note:"Germany", check:"blue", view:"14/05/1982", edit:""},
    {name:"James Newman", note:"Japan", check:"red", view:"22/03/1998", edit:""},
];

const columsDataNotas = [
	{title:"Guardia", field:"name", width:160, responsive:0}, //never hide this column
    {title:"Nota", field:"note", width:330},
	{ title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:110,
		 formatter: (cell, formatterParams) => {
            //----Button Trash
            let folio = cell.getData().folio ? cell.getData().folio : 0;
            let divActions = '<div class="row d-flex">';
            divActions += `<button class="btn-table-bitacora" onClick="setModal('Cars',${folio})" ><i class="fa-regular fa-circle-check"></i></button>`;
            divActions += `<button class="btn-table-bitacora" onClick="setModal('Tools',${folio})"><i class="fa-regular fa-eye"></i></button>`;
            divActions += `<button class="btn-table-bitacora" onClick="setModal('Card',${folio})"><i class="fa-solid fa-pen"></i></button>`;
            divActions += '</div>';
            return divActions;
        },
	},
];

const columsDataGuardiasApoyo = [
    { title:"Guardias de Apoyo", field:'name',hozAlign:"left",headerFilter:true,width:390,
         formatter: (cell, formatterParams) => {
            let data = cell.getData();
            let folio = cell.getData().folio ? cell.getData().folio : 0;
            let divActions = '<div class="d-flex flex-row">';
            divActions+= '<div> <img height="60" src="'
            + data.image + '"> </div > <div class="flex-column ms-3"> <div> <b>'
            + data.name +'</b> </div><div> '+data.status+'</div> </div>';
            divActions += '</div>';
            return divActions;
        },
    },
    { title: "", field: "actions" , hozAlign: "left", resizable:false,width:10,
        formatter: (cell, formatterParams) => {
            let data = cell.getData();
            //----Button Trash
            let folio = cell.getData().folio ? cell.getData().folio : 0;
            let divActions = '<div class=" d-flex justify-content-center ml-0 ">';
            divActions += ` <input class="form-check-input" style="height:15px !important; width:2px;" type="checkbox">`;
            divActions += '</div>';
            return divActions;
        },
    },
    
];


window.onload = function(){
    let user = getCookie("userId");
    let jw = getCookie("userJwt");

    if(user !='' && jw!=''){
       drawTableNotas('tableNotas',columsDataNotas, dataTableNotas ,"180px");
       drawTableNotas('tableGuardiasApoyo',columsDataGuardiasApoyo,dataTableGuardiasApoyo, "475px");
    } else{
		redirectionUrl('login',false);
	}

}

//-----TABLES
function drawTableNotas(id, columnsData, tableData, height){
  var  table = new Tabulator("#" + id, {
    layout:"fitDataStretch",
    height:height,
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


//---Close Sesión
function setCloseSession(argument) {
	closeSession();
	redirectionUrl('login',false);
}