

var columsTable1 = [
  { title:"# Doctos", field:'num_docs',hozAlign:"right",headerTooltip:true, width:150},
  { title:" $ ", field:'value',hozAlign:"right",headerTooltip:true,formatter:"money",formatterParams:{decimal:".",thousand:",",
    symbol:"$",symbolAfter:false,}, bottomCalc:"sum", bottomCalcFormatter:"money", bottomCalcFormatterParams: {decimal: ".", thousand: ",", symbol: "$",},  width:150},
  { title:"Asesor de Ventas", field:'asesor_ventas',hozAlign:"left",headerTooltip:true, width:250},
  { title:"Total", field:'total', hozAlign:"right", formatter:"money",formatterParams:{decimal:".",thousand:",",
    symbol:"$",symbolAfter:false,}, bottomCalc:"sum",bottomCalcFormatter:"money", bottomCalcFormatterParams: {decimal: ".", thousand: ",", symbol: "$",},  width:200
  },
  {title:"Al corriente", hozAlign:"center",
    columns:[
      { title:" $ ", field:'value_corriente',hozAlign:"right",formatter:"money",formatterParams:{decimal:".",thousand:",",
        symbol:"$",symbolAfter:false,}, bottomCalc:"sum", bottomCalcFormatter:"money", bottomCalcFormatterParams: {decimal: ".", thousand: ",", symbol: "$",},  width:150
      },
      { title:" % ", field:'percentage_corriente',hozAlign:"center", formatter:function(cell){
        var value = cell.getValue();
        if (value <= 2){
          cell.getElement().style.backgroundColor = "#A9DFBF";
        }
        else if(value > 2  && value < 4 ){
          cell.getElement().style.backgroundColor = "#F9E79F";
        }
        else if(value >= 4){
          cell.getElement().style.backgroundColor = "#F5B7B1";
        }
        return value+'%';
        },width:150
      },
    ]
  },
  {title:" 01-15 días", hozAlign:"center",
    columns:[
      { title:" $ ", field:'value_01_15',hozAlign:"right",formatter:"money",formatterParams:{decimal:".",thousand:",",
        symbol:"$",symbolAfter:false,}, bottomCalc:"sum", bottomCalcFormatter:"money", bottomCalcFormatterParams: {decimal: ".", thousand: ",", symbol: "$",},  width:150
      },
      { title:" % ", field:'percentage_01_15',hozAlign:"center", formatter:function(cell){
        var value = cell.getValue();
        if (value <= 2){
          cell.getElement().style.backgroundColor = "#A9DFBF";
        }
        else if(value > 2  && value < 4 ){
          cell.getElement().style.backgroundColor = "#F9E79F";
        }
        else if(value >= 4){
          cell.getElement().style.backgroundColor = "#F5B7B1";
        }
        return value+'%';
        },width:150
      },
    ]
  },
  {title:" 16-60 días", hozAlign:"center",
    columns:[
      { title:" $ ", field:'value_16_60',hozAlign:"right",formatter:"money",formatterParams:{decimal:".",thousand:",",
        symbol:"$",symbolAfter:false,}, bottomCalc:"sum", bottomCalcFormatter:"money", bottomCalcFormatterParams: {decimal: ".", thousand: ",", symbol: "$",},  width:150
      },
      { title:" % ", field:'percentage_16_60',hozAlign:"center", formatter:function(cell){
        var value = cell.getValue();
        if (value <= 2){
          cell.getElement().style.backgroundColor = "#A9DFBF";
        }
        else if(value > 2  && value < 4 ){
          cell.getElement().style.backgroundColor = "#F9E79F";
        }
        else if(value >= 4){
          cell.getElement().style.backgroundColor = "#F5B7B1";
        }
        return value+'%';
        },width:150
      },
    ]
  },
  {title:" 61-120 días", hozAlign:"center",
    columns:[
      { title:" $ ", field:'value_61_120',hozAlign:"right",formatter:"money",formatterParams:{decimal:".",thousand:",",
        symbol:"$",symbolAfter:false,}, bottomCalc:"sum", bottomCalcFormatter:"money", bottomCalcFormatterParams: {decimal: ".", thousand: ",", symbol: "$",},  width:150
      },
      { title:" % ", field:'percentage_61_120',hozAlign:"center", formatter:function(cell){
        var value = cell.getValue();
        if (value <= 2){
          cell.getElement().style.backgroundColor = "#A9DFBF";
        }
        else if(value > 2  && value < 4 ){
          cell.getElement().style.backgroundColor = "#F9E79F";
        }
        else if(value >= 4){
          cell.getElement().style.backgroundColor = "#F5B7B1";
        }
        return value+'%';
        },width:150
      },
    ]
  },
  {title:" +120 días", hozAlign:"center",
    columns:[
      { title:" $ ", field:'value_120',hozAlign:"right",formatter:"money",formatterParams:{decimal:".",thousand:",",
        symbol:"$",symbolAfter:false,}, bottomCalc:"sum", bottomCalcFormatter:"money", bottomCalcFormatterParams: {decimal: ".", thousand: ",", symbol: "$",},  width:150
      },
      { title:" % ", field:'percentage_120',hozAlign:"center", formatter:function(cell){
        var value = cell.getValue();
        if (value <= 2){
          cell.getElement().style.backgroundColor = "#A9DFBF";
        }
        else if(value > 2  && value < 4 ){
          cell.getElement().style.backgroundColor = "#F9E79F";
        }
        else if(value >= 4){
          cell.getElement().style.backgroundColor = "#F5B7B1";
        }
        return value+'%';
        },width:150
      },
    ]
  },
]

var dataTable1 = [
  {
    num_docs: "4",
    value: 2233,
    asesor_ventas: "Noriega Dominguez Jairo Hiriam",
    total: 4483495,
    value_corriente: 4172.901,
    percentage_corriente: 0.2,
    value_01_15: 156256,
    percentage_01_15: 3.5,
    value_16_60: 18256 ,
    percentage_16_60: 0.8,
    value_61_120: 19881,
    percentage_61_120: 0.4,
    value_120: 116374,
    percentage_120: 4.4,
  },
    {
    num_docs: "4",
    value: 2233,
    asesor_ventas: "Noriega Dominguez Jairo Hiriam",
    total: 4483495,
    value_corriente: 4172.901,
    percentage_corriente: 3.1,
    value_01_15: 156256,
    percentage_01_15: 1.5,
    value_16_60: 18256 ,
    percentage_16_60: 2.4,
    value_61_120: 19881,
    percentage_61_120: 1.4,
    value_120: 116374,
    percentage_120: 2.2,
  },
    {
    num_docs: "4",
    value: 2233,
    asesor_ventas: "Noriega Dominguez Jairo Hiriam",
    total: 4483495,
    value_corriente: 4172.901,
    percentage_corriente: 4.2,
    value_01_15: 156256,
    percentage_01_15: 5,
    value_16_60: 18256 ,
    percentage_16_60: 3.4,
    value_61_120: 19881,
    percentage_61_120: 3.4,
    value_120: 116374,
    percentage_120: 0.4,
  },
    {
    num_docs: "4",
    value: 2233,
    asesor_ventas: "Noriega Dominguez Jairo Hiriam",
    total: 4483495,
    value_corriente: 4172.901,
    percentage_corriente: 1,
    value_01_15: 156256,
    percentage_01_15: 1,
    value_16_60: 18256 ,
    percentage_16_60: 4.4,
    value_61_120: 19881,
    percentage_61_120: 4.1,
    value_120: 116374,
    percentage_120: 4.4,
  },
    {
    num_docs: "4",
    value: 2233,
    asesor_ventas: "Noriega Dominguez Jairo Hiriam",
    total: 4483495,
    value_corriente: 4172.901,
    percentage_corriente: 3.5,
    value_01_15: 156256,
    percentage_01_15: 4,
    value_16_60: 18256 ,
    percentage_16_60: 3.4,
    value_61_120: 19881,
    percentage_61_120: 0.1,
    value_120: 116374,
    percentage_120: 3,
  },
  {
    num_docs: "4",
    value: 2233,
    asesor_ventas: "Noriega Dominguez Jairo Hiriam",
    total: 4483495,
    value_corriente: 4172.901,
    percentage_corriente: 0.8,
    value_01_15: 156256,
    percentage_01_15: 3,
    value_16_60: 18256 ,
    percentage_16_60: 2.5,
    value_61_120: 19881,
    percentage_61_120: 1,
    value_120: 116374,
    percentage_120: 2,
  },
  {
    num_docs: "4",
    value: 2233,
    asesor_ventas: "Noriega Dominguez Jairo Hiriam",
    total: 4483495,
    value_corriente: 4172.901,
    percentage_corriente: 3.9,
    value_01_15: 156256,
    percentage_01_15: 4,
    value_16_60: 18256 ,
    percentage_16_60: 1,
    value_61_120: 19881,
    percentage_61_120: 3,
    value_120: 116374,
    percentage_120: 3.1,
  },
  {
    num_docs: "4",
    value: 2233,
    asesor_ventas: "Noriega Dominguez Jairo Hiriam",
    total: 4483495,
    value_corriente: 4172.901,
    percentage_corriente: 4.1,
    value_01_15: 156256,
    percentage_01_15: 5,
    value_16_60: 18256 ,
    percentage_16_60: 1.1,
    value_61_120: 19881,
    percentage_61_120: 2.4,
    value_120: 116374,
    percentage_120: 1,
  },
  {
    num_docs: "4",
    value: 2233,
    asesor_ventas: "Noriega Dominguez Jairo Hiriam",
    total: 4483495,
    value_corriente: 4172.901,
    percentage_corriente: 2.5,
    value_01_15: 156256,
    percentage_01_15: 3,
    value_16_60: 18256 ,
    percentage_16_60: 2.5,
    value_61_120: 19881,
    percentage_61_120: 3.4,
    value_120: 116374,
    percentage_120: 4.4,
  },
  {
    num_docs: "4",
    value: 2233,
    asesor_ventas: "Noriega Dominguez Jairo Hiriam",
    total: 4483495,
    value_corriente: 4172.901,
    percentage_corriente: 2.9,
    value_01_15: 156256,
    percentage_01_15: 1.5,
    value_16_60: 18256 ,
    percentage_16_60: 5,
    value_61_120: 19881,
    percentage_61_120: 1.4,
    value_120: 116374,
    percentage_120: 2.4,
  },
];

var columsTable2 = [
  { title:"Vendedor", field:'vendedor',hozAlign:"left",headerTooltip:true,width:300},
  { title:"Cliente", field:'cliente',hozAlign:"left",headerTooltip:true, width:150},
  { title:"Nombre", field:'nombre',hozAlign:"left",headerTooltip:true, width:250},
  { title:"Plazo", field:'plazo', hozAlign:"right", formatter:"money",formatterParams:{decimal:".",thousand:",",
    symbol:"$",symbolAfter:false,},  width:200
  },
  { title:"Fecha docto ", field:'fecha_doc',hozAlign:"left", width:250},
  { title:"Fecha vence ", field:'fecha_vence',hozAlign:"left", width:250},
  { title:"Concesión ", field:'concesion',hozAlign:"left", width:150},
  { title:"Serie ", field:'serie',hozAlign:"left", width:150},
  { title:"Document ", field:'documento',hozAlign:"left", width:150},
  { title:"Tipo ", field:'tipo',hozAlign:"left", width:150},
  { title:"Días", field:'dias',hozAlign:"center", width:150},
  { title:"Impr", field:'impr',hozAlign:"center", width:150},
  { title:"Metodo pago", field:'metodo_pago',hozAlign:"center", width:150},
  { title:"Total", field:'total', hozAlign:"right", formatter:"money",formatterParams:{decimal:".",thousand:",",
    symbol:"$",symbolAfter:false,}, bottomCalc:"sum",bottomCalcFormatter:"money", bottomCalcFormatterParams: {decimal: ".", thousand: ",", symbol: "$",},  width:200
  },
  { title:"Al Corriente", field:'value_corriente', hozAlign:"right", formatter:"money",formatterParams:{decimal:".",thousand:",",
    symbol:"$",symbolAfter:false,}, bottomCalc:"sum",bottomCalcFormatter:"money", bottomCalcFormatterParams: {decimal: ".", thousand: ",", symbol: "$",},  width:200
  },
  { title:"01-15", field:'value_01_15', hozAlign:"right", formatter:"money",formatterParams:{decimal:".",thousand:",",
    symbol:"$",symbolAfter:false,}, bottomCalc:"sum",bottomCalcFormatter:"money", bottomCalcFormatterParams: {decimal: ".", thousand: ",", symbol: "$",},  width:200
  },
  { title:"16-60", field:'value_16_60', hozAlign:"right", formatter:"money",formatterParams:{decimal:".",thousand:",",
    symbol:"$",symbolAfter:false,}, bottomCalc:"sum",bottomCalcFormatter:"money", bottomCalcFormatterParams: {decimal: ".", thousand: ",", symbol: "$",},  width:200
  },
  { title:"61-120", field:'value_61_120', hozAlign:"right", formatter:"money",formatterParams:{decimal:".",thousand:",",
    symbol:"$",symbolAfter:false,}, bottomCalc:"sum",bottomCalcFormatter:"money", bottomCalcFormatterParams: {decimal: ".", thousand: ",", symbol: "$",},  width:200
  },
  { title:"+120", field:'value_120', hozAlign:"right", formatter:"money",formatterParams:{decimal:".",thousand:",",
    symbol:"$",symbolAfter:false,}, bottomCalc:"sum",bottomCalcFormatter:"money", bottomCalcFormatterParams: {decimal: ".", thousand: ",", symbol: "$",},  width:200
  },
]


var dataTable2 = [
  {
    vendedor:"4745 Zenteno Geneste Oscar Daniel",
    cliente:"3884",
    nombre:"AVENDAÃ‘O CHAN CESAR JAIME",
    plazo:"45",
    fecha_doc:"01/19/2022",
    fecha_vence:"01/19/2022",
    concesion:"-45",
    serie:"HEOP",
    documento:"9210221",
    tipo:"Anticipo",
    dias:"377",
    impr:"1",
    metodo_pago:"PPD",
    total:"4350",
    value_corriente:"0",
    value_01_15:"0",
    value_16_60:"0",
    value_61_120:"4350",
    value_120:"0",
  },
  {
    vendedor:"4745 Zenteno Geneste Oscar Daniel",
    cliente:"3884",
    nombre:"AVENDAÃ‘O CHAN CESAR JAIME",
    plazo:"45",
    fecha_doc:"01/19/2022",
    fecha_vence:"01/19/2022",
    concesion:"-45",
    serie:"HEOP",
    documento:"9210221",
    tipo:"Anticipo",
    dias:"377",
    impr:"1",
    metodo_pago:"PPD",
    total:"4350",
    value_corriente:"0",
    value_01_15:"0",
    value_16_60:"0",
    value_61_120:"4350",
    value_120:"0",
  },
  {
    vendedor:"4745 Zenteno Geneste Oscar Daniel",
    cliente:"3884",
    nombre:"AVENDAÃ‘O CHAN CESAR JAIME",
    plazo:"45",
    fecha_doc:"01/19/2022",
    fecha_vence:"01/19/2022",
    concesion:"-45",
    serie:"HEOP",
    documento:"9210221",
    tipo:"Anticipo",
    dias:"377",
    impr:"1",
    metodo_pago:"PPD",
    total:"4350",
    value_corriente:"0",
    value_01_15:"0",
    value_16_60:"0",
    value_61_120:"4350",
    value_120:"0",
  },
  {
    vendedor:"4745 Zenteno Geneste Oscar Daniel",
    cliente:"3884",
    nombre:"AVENDAÃ‘O CHAN CESAR JAIME",
    plazo:"45",
    fecha_doc:"01/19/2022",
    fecha_vence:"01/19/2022",
    concesion:"-45",
    serie:"HEOP",
    documento:"9210221",
    tipo:"Anticipo",
    dias:"377",
    impr:"1",
    metodo_pago:"PPD",
    total:"4350",
    value_corriente:"0",
    value_01_15:"0",
    value_16_60:"0",
    value_61_120:"4350",
    value_120:"0",
  },
  {
    vendedor:"4745 Zenteno Geneste Oscar Daniel",
    cliente:"3884",
    nombre:"AVENDAÃ‘O CHAN CESAR JAIME",
    plazo:"45",
    fecha_doc:"01/19/2022",
    fecha_vence:"01/19/2022",
    concesion:"-45",
    serie:"HEOP",
    documento:"9210221",
    tipo:"Anticipo",
    dias:"377",
    impr:"1",
    metodo_pago:"PPD",
    total:"4350",
    value_corriente:"0",
    value_01_15:"0",
    value_16_60:"0",
    value_61_120:"4350",
    value_120:"0",
  },
  {
    vendedor:"4745 Zenteno Geneste Oscar Daniel",
    cliente:"3884",
    nombre:"AVENDAÃ‘O CHAN CESAR JAIME",
    plazo:"45",
    fecha_doc:"01/19/2022",
    fecha_vence:"01/19/2022",
    concesion:"-45",
    serie:"HEOP",
    documento:"9210221",
    tipo:"Anticipo",
    dias:"377",
    impr:"1",
    metodo_pago:"PPD",
    total:"4350",
    value_corriente:"0",
    value_01_15:"0",
    value_16_60:"0",
    value_61_120:"4350",
    value_120:"0",
  },
  {
    vendedor:"4745 Zenteno Geneste Oscar Daniel",
    cliente:"3884",
    nombre:"AVENDAÃ‘O CHAN CESAR JAIME",
    plazo:"45",
    fecha_doc:"01/19/2022",
    fecha_vence:"01/19/2022",
    concesion:"-45",
    serie:"HEOP",
    documento:"9210221",
    tipo:"Anticipo",
    dias:"377",
    impr:"1",
    metodo_pago:"PPD",
    total:"4350",
    value_corriente:"0",
    value_01_15:"0",
    value_16_60:"0",
    value_61_120:"4350",
    value_120:"0",
  },
  {
    vendedor:"4745 Zenteno Geneste Oscar Daniel",
    cliente:"3884",
    nombre:"AVENDAÃ‘O CHAN CESAR JAIME",
    plazo:"45",
    fecha_doc:"01/19/2022",
    fecha_vence:"01/19/2022",
    concesion:"-45",
    serie:"HEOP",
    documento:"9210221",
    tipo:"Anticipo",
    dias:"377",
    impr:"1",
    metodo_pago:"PPD",
    total:"4350",
    value_corriente:"0",
    value_01_15:"0",
    value_16_60:"0",
    value_61_120:"4350",
    value_120:"0",
  },
  {
    vendedor:"4745 Zenteno Geneste Oscar Daniel",
    cliente:"3884",
    nombre:"AVENDAÃ‘O CHAN CESAR JAIME",
    plazo:"45",
    fecha_doc:"01/19/2022",
    fecha_vence:"01/19/2022",
    concesion:"-45",
    serie:"HEOP",
    documento:"9210221",
    tipo:"Anticipo",
    dias:"377",
    impr:"1",
    metodo_pago:"PPD",
    total:"4350",
    value_corriente:"0",
    value_01_15:"0",
    value_16_60:"0",
    value_61_120:"4350",
    value_120:"0",
  },
  {
    vendedor:"4745 Zenteno Geneste Oscar Daniel",
    cliente:"3884",
    nombre:"AVENDAÃ‘O CHAN CESAR JAIME",
    plazo:"45",
    fecha_doc:"01/19/2022",
    fecha_vence:"01/19/2022",
    concesion:"-45",
    serie:"HEOP",
    documento:"9210221",
    tipo:"Anticipo",
    dias:"377",
    impr:"1",
    metodo_pago:"PPD",
    total:"4350",
    value_corriente:"0",
    value_01_15:"0",
    value_16_60:"0",
    value_61_120:"4350",
    value_120:"0",
  },
  {
    vendedor:"4745 Zenteno Geneste Oscar Daniel",
    cliente:"3884",
    nombre:"AVENDAÃ‘O CHAN CESAR JAIME",
    plazo:"45",
    fecha_doc:"01/19/2022",
    fecha_vence:"01/19/2022",
    concesion:"-45",
    serie:"HEOP",
    documento:"9210221",
    tipo:"Anticipo",
    dias:"377",
    impr:"1",
    metodo_pago:"PPD",
    total:"4350",
    value_corriente:"0",
    value_01_15:"0",
    value_16_60:"0",
    value_61_120:"4350",
    value_120:"0",
  },
]

