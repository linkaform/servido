//----DATA TABLE
var columsTable1 = [
  { title:"Pregunta", field:'pregunta',hozAlign:"left",width:500},
  { title:"Sí", field:'si',hozAlign:"left",width:80},
  { title:"No", field:'no',hozAlign:"right",width:80},
  { title:"%Sí", field:'si_percentage',hozAlign:"right",width:80},
  { title:"%No", field:'no_percentage',hozAlign:"right",width:80},
];


var dataTable1 = [
  {
    pregunta:'¿Los pernos de anclaje están rotos o incompletos?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
  {
    pregunta:'¿Los pernos de anclaje están desajustados o torcidos?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
  {
    pregunta:'¿La placa base presenta golpes o fisuras?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
  {
    pregunta:'¿La placa base o los pernos tienen presencia de óxido?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
  {
    pregunta:'¿La placa base está sin protector de puntal?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
  {
    pregunta:'¿El protector de puntal está oxidado o abollado?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
  {
    pregunta:'¿Los puntales presentan deformaciones o golpes?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
  {
    pregunta:'¿Las diagonales presentan deformaciones o golpes?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
  {
    pregunta:'¿Las horizontales presentan deformaciones o golpes?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
  {
    pregunta:'¿Los distanciadores presentan deformaciones o golpes?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
  {
    pregunta:'¿El puntal presenta problemas de verticalidad?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
  {
    pregunta:'¿Existen elementos oxidados?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
  {
    pregunta:'¿El protector lateral del bastidor está oxidado o abollado?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
  {
    pregunta:'¿Los pernos y seguros están desajustados o incompletos?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
  {
    pregunta:'¿El larguero presenta deformaciones o golpes?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
  {
    pregunta:'¿El larguero presenta problemas de horizontalidad?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
  {
    pregunta:'¿El larguero presenta problemas de oxidación?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
  {
    pregunta:'¿Los pernos y clavijas de anclaje están desajustados o incompletos?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
  {
    pregunta:'¿El tensor esta roto, deformado o desconectado?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
  {
    pregunta:'¿Los pernos están desajustados o incompletos?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
  {
    pregunta:'¿La losa presenta daños o desniveles?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
  {
    pregunta:'¿Tiene otras observaciones?',
    si:40,
    no:20,
    si_percentage:75,
    no_percentage:25,
  },
];


//----DATA TABLE
var columsTable2 = [
  { title:"Folio", field:'folio', hozAlign:"left", formatter:"link", formatterParams:{
    url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
    target:"_blank",},headerFilter:"input", width:150},
  { title:"Almacén", field:'almacen',hozAlign:"left",headerFilter:"input",width:100},
  { title:"Pasadizo", field:'pasadizo',hozAlign:"left",headerFilter:"input",width:100},
  { title:"Cara", field:'cara',hozAlign:"left",headerFilter:"input",width:100},
  { title:"Torre", field:'torre',hozAlign:"left",headerFilter:"input",width:100},
  { title:"Número de Rack", field:'num_rack',hozAlign:"right",headerFilter:"input",width:150},
  { title:"Inspector", field:'inspector',hozAlign:"left",headerFilter:"input",width:200},
  { title:"Status", field:'status',hozAlign:"center",formatter:function(cell){
    var value = cell.getValue();
    if (value == 'Verde'){
      cell.getElement().style.backgroundColor = "#A9DFBF";
    }
    else if(value == 'Amarillo'){
      cell.getElement().style.backgroundColor = "#F9E79F";
    }
    else if(value == 'Rojo'){
      cell.getElement().style.backgroundColor = "#F5B7B1";
    }
    return value;
  },hozAlign:"left",width:200},
  {//create column group
    title:"¿Los pernos de anclaje están rotos o incompletos?",
    columns:[
      {title:"Si/No", field:"pregunta_1", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_1",hozAlign:"center",width:200},
      {title:"Observaciones", field:"observaciones_1", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿Los pernos de anclaje están desajustados o torcidos?",
    columns:[
      {title:"Si/No", field:"pregunta_2", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_2",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones_2", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿La placa base presenta golpes o fisuras?",
    columns:[
      {title:"Si/No", field:"pregunta_3", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_3",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones_3", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿La placa base o los pernos tienen presencia de óxido?",
    columns:[
      {title:"Si/No", field:"pregunta_4", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_4",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones_4", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿La placa base está sin protector de puntal?",
    columns:[
      {title:"Si/No", field:"pregunta_5", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_5",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones_5", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿El protector de puntal está oxidado o abollado?",
    columns:[
      {title:"Si/No", field:"pregunta_6", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_6",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones_6", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿Los pernos del protector de puntal se encuentran desajustados o torcidos?",
    columns:[
      {title:"Si/No", field:"pregunta_7", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_7",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones_7", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿Los puntales presentan deformaciones o golpes?",
    columns:[
      {title:"Si/No", field:"pregunta_8", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_8",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones_8", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿Las diagonales presentan deformaciones o golpes?",
    columns:[
      {title:"Si/No", field:"pregunta_9", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_9",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones_9", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿Las horizontales presentan deformaciones o golpes?",
    columns:[
      {title:"Si/No", field:"pregunta_10", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_10",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones_10", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿Los distanciadores presentan deformaciones o golpes?",
    columns:[
      {title:"Si/No", field:"pregunta_11", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_11",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones_11", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿El puntal presenta problemas de verticalidad?",
    columns:[
      {title:"Si/No", field:"pregunta_12", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_12",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones_12", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿Existen elementos oxidados?",
    columns:[
      {title:"Si/No", field:"pregunta_13", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_13",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones_13", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿El protector lateral del bastidor está oxidado o abollado?",
    columns:[
      {title:"Si/No", field:"pregunta_14", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_14",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones_14", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿Los pernos y seguros están desajustados o incompletos?",
    columns:[
      {title:"Si/No", field:"pregunta_15", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_15",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones_15", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿El larguero presenta deformaciones o golpes?",
    columns:[
      {title:"Si/No", field:"pregunta_16", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_16",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones_16", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿El larguero presenta problemas de horizontalidad?",
    columns:[
      {title:"Si/No", field:"pregunta_17", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_17",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones_17", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿El larguero presenta problemas de oxidación?",
    columns:[
      {title:"Si/No", field:"pregunta_18", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_18",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones_18", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿Los pernos y clavijas de anclaje están desajustados, torcidos o incompletos?",
    columns:[
      {title:"Si/No", field:"pregunta_19", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_19",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones_19", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿El larguero presenta problemas de engranaje o conexión con el puntal?",
    columns:[
      {title:"Si/No", field:"pregunta_20", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_20",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones_20", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿El tensor está roto, deformado o desconectado?",
    columns:[
      {title:"Si/No", field:"pregunta_21", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_21",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones_21", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿El arriostre está roto, deformado o desconectado?",
    columns:[
      {title:"Si/No", field:"pregunta_22", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_22",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones22", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿Los pernos están desajustados o incompletos?",
    columns:[
      {title:"Si/No", field:"pregunta_23", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_23",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones23", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿La losa presenta daños o desniveles?",
    columns:[
      {title:"Si/No", field:"pregunta_24", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_24",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones24", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  {//create column group
    title:"¿Tiene otras observaciones?",
    columns:[
      {title:"Si/No", field:"pregunta_25", hozAlign:"right", width:150},
      {title:"Evidencia", field:"evidencia_25",hozAlign:"center", width:200},
      {title:"Observaciones", field:"observaciones25", hozAlign:"left", tooltip:true ,width:200},
    ],
  },
  { title:"Comentarios Adicionales", field:'comentarios',hozAlign:"left", tooltip:true ,width:200},
];

var dataTable2 = [
  {
    folio:'1-12460',
    almacen:'Lurin',
    pasadizo:'Ejemplo ',
    cara:'Ejemplo ',
    torre:'Torre',
    num_rack:'1A75',
    inspector:'Daniel Eduardo',
    status:'Verde',
    pregunta_1:'Si',
    evidencia1:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones1:'Observaciones Ejemplo',
    pregunta_2:'Sí',
    evidencia2:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones2:'Observaciones',
    comentarios:'Comentarios ejemplo',
  },
  {
    folio:'2-12460',
    almacen:'Lurin',
    pasadizo:'Ejemplo ',
    cara:'Ejemplo ',
    torre:'Torre',
    num_rack:'1A78',
    inspector:'Daniel Eduardo',
    status:'Amarillo',
    pregunta_1:'Si',
    evidencia1:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones1:'Observaciones Ejemplo',
    pregunta_2:'Sí',
    evidencia2:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones2:'Observaciones',
    comentarios:'Comentarios ejemplo',
  },
  {
    folio:'2-12460',
    almacen:'Punta Hermosa',
    pasadizo:'Ejemplo ',
    cara:'Ejemplo ',
    torre:'Torre',
    num_rack:'2B75',
    inspector:'Daniel Eduardo',
    status:'Rojo',
    pregunta_1:'Si',
    evidencia1:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones1:'Observaciones Ejemplo',
    pregunta_2:'Sí',
    evidencia2:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones2:'Observaciones',
    comentarios:'Comentarios ejemplo',
  },
  {
    folio:'1-12460',
    almacen:'Lurin',
    pasadizo:'Ejemplo ',
    cara:'Ejemplo ',
    torre:'Torre',
    num_rack:'1A75',
    inspector:'Daniel Eduardo',
    status:'Verde',
    pregunta_1:'Si',
    evidencia1:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones1:'Observaciones Ejemplo',
    pregunta_2:'Sí',
    evidencia2:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones2:'Observaciones',
    comentarios:'Comentarios ejemplo',
  },
  {
    folio:'2-12460',
    almacen:'Lurin',
    pasadizo:'Ejemplo ',
    cara:'Ejemplo ',
    torre:'Torre',
    num_rack:'1A78',
    inspector:'Daniel Eduardo',
    status:'Amarillo',
    pregunta_1:'Si',
    evidencia1:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones1:'Observaciones Ejemplo',
    pregunta_2:'Sí',
    evidencia2:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones2:'Observaciones',
    comentarios:'Comentarios ejemplo',
  },
  {
    folio:'2-12460',
    almacen:'Punta Hermosa',
    pasadizo:'Ejemplo ',
    cara:'Ejemplo ',
    torre:'Torre',
    num_rack:'2B75',
    inspector:'Daniel Eduardo',
    status:'Rojo',
    pregunta_1:'Si',
    evidencia1:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones1:'Observaciones Ejemplo',
    pregunta_2:'Sí',
    evidencia2:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones2:'Observaciones',
    comentarios:'Comentarios ejemplo',
  },
  {
    folio:'1-12460',
    almacen:'Lurin',
    pasadizo:'Ejemplo ',
    cara:'Ejemplo ',
    torre:'Torre',
    num_rack:'1A75',
    inspector:'Daniel Eduardo',
    status:'Verde',
    pregunta_1:'Si',
    evidencia1:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones1:'Observaciones Ejemplo',
    pregunta_2:'Sí',
    evidencia2:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones2:'Observaciones',
    comentarios:'Comentarios ejemplo',
  },
  {
    folio:'2-12460',
    almacen:'Lurin',
    pasadizo:'Ejemplo ',
    cara:'Ejemplo ',
    torre:'Torre',
    num_rack:'1A78',
    inspector:'Daniel Eduardo',
    status:'Amarillo',
    pregunta_1:'Si',
    evidencia1:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones1:'Observaciones Ejemplo',
    pregunta_2:'Sí',
    evidencia2:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones2:'Observaciones',
    comentarios:'Comentarios ejemplo',
  },
  {
    folio:'2-12460',
    almacen:'Punta Hermosa',
    pasadizo:'Ejemplo ',
    cara:'Ejemplo ',
    torre:'Torre',
    num_rack:'2B75',
    inspector:'Daniel Eduardo',
    status:'Rojo',
    pregunta_1:'Si',
    evidencia1:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones1:'Observaciones Ejemplo',
    pregunta_2:'Sí',
    evidencia2:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones2:'Observaciones',
    comentarios:'Comentarios ejemplo',
  },
  {
    folio:'1-12460',
    almacen:'Lurin',
    pasadizo:'Ejemplo ',
    cara:'Ejemplo ',
    torre:'Torre',
    num_rack:'1A75',
    inspector:'Daniel Eduardo',
    status:'Verde',
    pregunta_1:'Si',
    evidencia1:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones1:'Observaciones Ejemplo',
    pregunta_2:'Sí',
    evidencia2:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones2:'Observaciones',
    comentarios:'Comentarios ejemplo',
  },
  {
    folio:'2-12460',
    almacen:'Lurin',
    pasadizo:'Ejemplo ',
    cara:'Ejemplo ',
    torre:'Torre',
    num_rack:'1A78',
    inspector:'Daniel Eduardo',
    status:'Amarillo',
    pregunta_1:'Si',
    evidencia1:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones1:'Observaciones Ejemplo',
    pregunta_2:'Sí',
    evidencia2:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones2:'Observaciones',
    comentarios:'Comentarios ejemplo',
  },
  {
    folio:'2-12460',
    almacen:'Punta Hermosa',
    pasadizo:'Ejemplo ',
    cara:'Ejemplo ',
    torre:'Torre',
    num_rack:'2B75',
    inspector:'Daniel Eduardo',
    status:'Rojo',
    pregunta_1:'Si',
    evidencia1:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones1:'Observaciones Ejemplo',
    pregunta_2:'Sí',
    evidencia2:'https://www.lugaresturisticosenmexico.com/wp-content/uploads/2022/05/Puerto-Escondido-Oaxaca-Playa-Carrizalillo.jpg',
    observaciones2:'Observaciones',
    comentarios:'Comentarios ejemplo',
  },
];


//----- CONFIG GRAPHIC
var data1 = {
  labels: [
    'Sí %',
    'No %',
  ],
  datasets: [
    {
      label: 'Valores',
      data: [80,20],
      backgroundColor: ['#98D8AA','#FF6D60'],
    },
  ]
};

var setOptions1 = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Reporte Porcentual',
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'black',
      font: {
        size: 25
      },
      formatter: function (value, context){
        return value + '%';
      }
    }
  },

};


var data2 = {
  labels: [
    '¿Los pernos de anclaje están rotos o incompletos?',
    '¿Los pernos de anclaje están desajustados o torcidos?',
    '¿La placa base presenta golpes o fisuras?',
    '¿La placa base o los pernos tienen presencia de óxido?',
    '¿La placa base está sin protector de puntal?',
    '¿El protector de puntal está oxidado o abollado?',
    '¿Los puntales presentan deformaciones o golpes?',
    '¿Las diagonales presentan deformaciones o golpes?',
    '¿Las horizontales presentan deformaciones o golpes?',
    '¿Los distanciadores presentan deformaciones o golpes?',
    '¿El puntal presenta problemas de verticalidad?',
    '¿Existen elementos oxidados?',
    '¿El protector lateral del bastidor está oxidado o abollado?',
    '¿Los pernos y seguros están desajustados o incompletos?',
    '¿El larguero presenta deformaciones o golpes?',
    '¿El larguero presenta problemas de horizontalidad?',
    '¿El larguero presenta problemas de oxidación?',
    '¿Los pernos y clavijas de anclaje están desajustados o incompletos?',
    '¿El tensor esta roto, deformado o desconectado?',
    '¿Los pernos están desajustados o incompletos?',
    '¿La losa presenta daños o desniveles?',
    '¿Tiene otras observaciones?',
  ],
  datasets: [
    {
      label: 'Sí',
      data: [80,90,70,60,20,90,70,30,50,20,50,80,90,70,60,20,90,70,30,50,20,50],
      backgroundColor: '#98D8AA',
    },
    {
      label: 'No',
      data: [20,10,30,40,80,10,30,70,50,80,50,20,10,30,40,80,10,30,70,50,80,50],
      backgroundColor: '#FF6D60',
    },
  ]
};

var setOptions2 = {
  indexAxis: 'y',
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Reporte Grafico',
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'black',
      formatter: function (value, context){
        return value + '%';
      }
    }
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      ticks: {
        stepSize: 1
      },
    }
  }
};


img1_ceint = "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"
