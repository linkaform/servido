let tables={}

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

const columsListaPases= [
    { title:"Nombre", field:'nombre',hozAlign:"left",headerFilter:'input',
          formatter: (cell, formatterParams) => {
               let data = cell.getData();
               if(!data.hasOwnProperty('foto') || data.foto==undefined){
                    data.foto=[{file_name: "notfound", file_url: "https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067"}]
               }
               let foto= data.foto.length>0 ? data.foto[0].file_url : "https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067"
               let id = cell.getData().id ? cell.getData().id : 0;
               let divActions = '<div id="inf'+data.folio +'"><div class="d-flex flex-row" id="listOfGuards">';
               divActions+= '<div col-sm-12 col-md-12 col-lg-6 col-xl-6> <img class="rounded-circle m-1" id="imgGuardiaApoyo" height="80" width="80" style="object-fit:fill" src="'
               + foto + '"> </div > <div col-sm-12 col-md-12 col-lg-6 col-xl-6 class="flex-column ms-3"> <div> <b>'
               + data.nombre +'</b> </div></div>';
               divActions += '</div> </div>';
               return divActions;
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


function drawTable(id, columnsData, tableData,){
  var  table = new Tabulator("#" + id, {
    layout:"fitDataTable",
    data:tableData,
    textDirection:"ltr",
    columns:columnsData,
    pagination:true, 
    paginationSize:40,
    placeholder: "No hay registros disponibles", 
  });
}

//FUNCION para dibujar las tablas con opcion select de la pagina y guardar su instancia en el obj tables
function drawTableSelect(id, columnsData, tableData, height, select){     
    let  table = new Tabulator("#" + id, {
        layout:"fitDataStretch",
        height:height,
        data:tableData,
        textDirection:"ltr",
        columns:columnsData,
        pagination:true, 
        selectableRows:select,
        paginationSize:40,
        placeholder: "No hay registros disponibles", 
        initialFilter: [],  // No aplicar ningún filtro al principio
       filterBy: (data, filterParams) => {
         // Obtener el valor del filtro global
         let query = filterParams.value.toLowerCase();
         return data.nombre.toLowerCase().includes(query) || data.estatus.toLowerCase().includes(query);
       }
    });
    tables[id]=table;
}

let load_shift_json = {
	"booth":"Caseta 1",
	"location":"Monterrey",
	"booth_stats":{
		"guard_on_duty": {
			"name":"Juan Alvarez",
			"id":100
		},
		"support_guard":{
			"name":"Guardia Soporte 1",
			"status":"Turno Iniciado",
			"id":101,
		},
		"access":{
			"visits_per_day": 15,
			"staff_indoors":20,
			"vehicles_inside":13,
			"registered_exits":14,
		},
		"incidents":{
			"fails_per_day": 15,
			"fails_to_resolve":20,
		},
		"items":{
			"concession_items":13,
			"registered_exits":14,
		},
		"patrols":{
			"pending_tours":13,
			"guards_on_patrol":12,
			"guards_on_duty":14
		}
	}
}


let search_access_pass_json={
     "data": {
          "portador": {
               "_id": "66563787d2f0b4fb84768be5",
               "folio": "169-10",
               "created_at": "2024-05-28",
               "updated_at": "2024-05-28",
               "ubicacion": "Planta Monterrey",
               "nombre_visita": "Roberto Cervantes Lopez",
               "email_vsita": [
                    "roberto@gmai.com"
               ],
               "curp": [
                    "ROB3515"
               ],
               "foto": [
                    {
                         "file_name": "12.png",
                         "file_url": "https://f001.backblazeb2.com/file/app-linkaform/public-client-10/119228/5ea35de83ab7dad56c66e045/66552183b96aa262efeddb72.png"
                    }
               ],
               "identificacion": [
                    {
                         "file_name": "identificaci\u00f3n2.jpg",
                         "file_url": "https://f001.backblazeb2.com/file/app-linkaform/public-client-10/119228/65ce34985fa9df3dbf9dd2d0/665521acc9a20a1c3688b7f9.jpg"
                    }
               ],
               "status_visita": [
                    "Autorizado"
               ],
               "tipo_visita_pase": "fecha_fija",
               "fecha_desde_visita": "2024-06-17 13:57:29",
               "config_dia_de_acceso": "cualquier_d\u00eda"
          },
          "comentarios": [
               {
                    "msg": "Comentario 1"
               },
               {
                    "msg": "Comentario 2"
               }
          ],
          "accesos": [
               {
                    "nombre": "Cuarto de Maquinas",
                    "location": "Planta Durango",
                    "area": "Nombre de la area",
                    "status": "Permitido"
               },
               {
                    "nombre": "Piso 1",
                    "location": "Planta Durango",
                    "area": "Nombre de la area",
                    "status": "Permitido"
               },
               {
                    "nombre": "Piso 2",
                    "location": "Planta Durango",
                    "area": "Nombre de la area",
                    "status": "Permitido"
               },
               {
                    "nombre": "Piso 15-35",
                    "location": "Planta Durango",
                    "area": "Nombre de la area",
                    "status": "Permitido"
               }
          ],
          "certificaiones": [
               {
                    "nombre": "Examen de Alturas",
                    "status": "Aprovado",
                    "expiracion": "2024-09-15"
               },
               {
                    "nombre": "Licencia de Manejar",
                    "status": "Expirado",
                    "expiracion": "2023-09-15"
               }
          ],
          "ultimo_acceso": [
               {
                    "nombre_visita": "Juan Rulfo",
                    "location": "Planta Durango",
                    "fecha": "2024-09-15T15:05",
                    "duration": 5683
               },
               {
                    "nombre_visita": "Gabriel Garcia Marquez",
                    "location": "Planta Durango",
                    "fecha": "2024-09-15T21:33",
                    "duration": 600
               }
          ],
          "equipo": [
               {
                    "tipo": "Computadora",
                    "marca": "Lenovo",
                    "modelo": "T42S",
                    "serie": "u4568",
                    "color": "Negra"
               },
               {
                    "tipo": "Herramienta",
                    "marca": "Truper",
                    "modelo": "Pinza",
                    "serie": "N/A",
                    "color": "Naranja"
               }
          ],
          "vehiculos": [
               {
                    "tipo": "Camion",
                    "marca": "Volvo",
                    "modelo": "Modelo T",
                    "placa": "TZ-58996-S",
                    "color": "Azul"
               },
               {
                    "tipo": "Auto",
                    "marca": "Ford",
                    "modelo": "Fiesta",
                    "placa": "ZF-M4M0N",
                    "color": "Blanco"
               }
          ]
     }
}