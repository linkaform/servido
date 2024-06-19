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
			"id":101
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