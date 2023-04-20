// Datos demo para Reporte ENcuestas MOntaje

//-- Tabla 1 
var columsTable1 = [
  { title:"Persona", field:'persona',hozAlign:"left", width:200},
  {title:"Semana 9", hozAlign:"center", cssClass:"title_semana",
    columns:[
      {title:"R", field:'r_semana9',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#ABEBC6";return value;},width:80},
      {title:"P", field:'p_semana9',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#F9E79F";return value;},width:80},
      {title:"V", field:'v_semana9',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#F5B7B1";return value;},width:80},
      {title:"T", field:'t_semana9',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#CCD1D1";return value;},width:80},
    ]
  },
  {title:"Semana 10", hozAlign:"center",
    columns:[
      {title:"R", field:'r_semana10',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#ABEBC6";return value;},width:80},
      {title:"P", field:'p_semana10',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#F9E79F";return value;},width:80},
      {title:"V", field:'v_semana10',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#F5B7B1";return value;},width:80},
      {title:"T", field:'t_semana10',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#CCD1D1";return value;},width:80},
    ]
  },
  {title:"Semana 11", hozAlign:"center",
    columns:[
      {title:"R", field:'r_semana11',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#ABEBC6";return value;},width:80},
      {title:"P", field:'p_semana11',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#F9E79F";return value;},width:80},
      {title:"V", field:'v_semana11',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#F5B7B1";return value;},width:80},
      {title:"T", field:'t_semana11',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#CCD1D1";return value;},width:80},
    ]
  },
  {title:"Semana 12", hozAlign:"center",
    columns:[
      {title:"R", field:'r_semana12',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#ABEBC6";return value;},width:80},
      {title:"P", field:'p_semana12',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#F9E79F";return value;},width:80},
      {title:"V", field:'v_semana12',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#F5B7B1";return value;},width:80},
      {title:"T", field:'t_semana12',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#CCD1D1";return value;},width:80},
    ]
  },
  {title:"Semana 13", hozAlign:"center",
    columns:[
      {title:"R", field:'r_semana13',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#ABEBC6";return value;},width:80},
      {title:"P", field:'p_semana13',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#F9E79F";return value;},width:80},
      {title:"V", field:'v_semana13',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#F5B7B1";return value;},width:80},
      {title:"T", field:'t_semana13',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#CCD1D1";return value;},width:80},
    ]
  },
  {title:"Resumen Mes", hozAlign:"center",
    columns:[
      {title:"R", field:'r_resumen',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#ABEBC6";return value;},width:80},
      {title:"P", field:'p_resumen',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#F9E79F";return value;},width:80},
      {title:"V", field:'v_resumen',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#F5B7B1";return value;},width:80},
      {title:"T", field:'t_resumen',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#CCD1D1";return value;},width:80},
    ]
  },
  {title:"Total Acumulado", hozAlign:"center",
    columns:[
      {title:"Rok", field:'rok',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#ABEBC6";return value;},width:80},
      {title:"Realizadas Fuera", field:'realizadas_fuera',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#F9E79F";return value;},width:150},
      {title:"V", field:'v_total',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#F5B7B1";return value;},width:80},
      {title:"T", field:'t_total',hozAlign:"right",formatter:function(cell){var value = cell.getValue();cell.getElement().style.backgroundColor = "#CCD1D1";return value;},width:80},
    ]
  },
  {title:"Cumplimiento", hozAlign:"center",
    columns:[
      {title:"% Ok", field:'ok_cumplimiento',hozAlign:"right",formatter: "money",formatterParams: {symbol: "%", symbolAfter: true, decimal: ".", thousand: ",", precision: 0},width:100},
      {title:"% Fuera", field:'fuera_cumplimiento',hozAlign:"right",formatter: "money",formatterParams: {symbol: "%", symbolAfter: true, decimal: ".", thousand: ",", precision: 0},width:100},
      {title:"% Vencidas", field:'vencidas_cumplimiento',hozAlign:"right",formatter: "money",formatterParams: {symbol: "%", symbolAfter: true, decimal: ".", thousand: ",", precision: 0},width:100},
    ]
  },
];




var dataTable1 = [
  {
    'persona': "Juan",
    'r_semana9': "3",
    'p_semana9': "15",
    'v_semana9': "4",
    't_semana9': "18",
    'r_semana10': "7",
    'p_semana10': "10",
    'v_semana10': "4",
    't_semana10': "17",
    'r_semana11': "3",
    'p_semana11': "15",
    'v_semana11': "4",
    't_semana11': "18",
    'r_semana12': "",
    'p_semana12': "",
    'v_semana12': "",
    't_semana12': "0",
    'r_semana13': "",
    'p_semana13': "15",
    'v_semana13': "4",
    't_semana13': "15",
    'r_resumen': "13",
    'p_resumen': "55",
    'v_resumen': "4",
    't_resumen': "68",
    'rok': "10",
    'realizadas_fuera': "2",
    'v_total': "4",
    't_total': "0",
    'ok_cumplimiento': "100",
    'fuera_cumplimiento': "100",
    'vencidas_cumplimiento': "100",
  },
   {
    'persona': "Hugo",
    'r_semana9': "3",
    'p_semana9': "15",
    'v_semana9': "4",
    't_semana9': "18",
    'r_semana10': "7",
    'p_semana10': "10",
    'v_semana10': "4",
    't_semana10': "17",
    'r_semana11': "3",
    'p_semana11': "15",
    'v_semana11': "4",
    't_semana11': "18",
    'r_semana12': "",
    'p_semana12': "",
    'v_semana12': "",
    't_semana12': "0",
    'r_semana13': "",
    'p_semana13': "15",
    'v_semana13': "4",
    't_semana13': "15",
    'r_resumen': "13",
    'p_resumen': "55",
    'v_resumen': "4",
    't_resumen': "68",
    'rok': "10",
    'realizadas_fuera': "2",
    'v_total': "4",
    't_total': "0",
    'ok_cumplimiento': "100",
    'fuera_cumplimiento': "100",
    'vencidas_cumplimiento': "100",
  }, 
  {
    'persona': "Paco",
    'r_semana9': "3",
    'p_semana9': "15",
    'v_semana9': "4",
    't_semana9': "18",
    'r_semana10': "7",
    'p_semana10': "10",
    'v_semana10': "4",
    't_semana10': "17",
    'r_semana11': "3",
    'p_semana11': "15",
    'v_semana11': "4",
    't_semana11': "18",
    'r_semana12': "",
    'p_semana12': "",
    'v_semana12': "",
    't_semana12': "0",
    'r_semana13': "",
    'p_semana13': "15",
    'v_semana13': "4",
    't_semana13': "15",
    'r_resumen': "13",
    'p_resumen': "55",
    'v_resumen': "4",
    't_resumen': "68",
    'rok': "10",
    'realizadas_fuera': "2",
    'v_total': "4",
    't_total': "0",
    'ok_cumplimiento': "100",
    'fuera_cumplimiento': "100",
    'vencidas_cumplimiento': "100",
  },
  {
    'persona': "Luis",
    'r_semana9': "3",
    'p_semana9': "15",
    'v_semana9': "4",
    't_semana9': "18",
    'r_semana10': "7",
    'p_semana10': "10",
    'v_semana10': "4",
    't_semana10': "17",
    'r_semana11': "3",
    'p_semana11': "15",
    'v_semana11': "4",
    't_semana11': "18",
    'r_semana12': "",
    'p_semana12': "",
    'v_semana12': "",
    't_semana12': "0",
    'r_semana13': "",
    'p_semana13': "15",
    'v_semana13': "4",
    't_semana13': "15",
    'r_resumen': "13",
    'p_resumen': "55",
    'v_resumen': "4",
    't_resumen': "68",
    'rok': "10",
    'realizadas_fuera': "2",
    'v_total': "4",
    't_total': "0",
    'ok_cumplimiento': "100",
    'fuera_cumplimiento': "100",
    'vencidas_cumplimiento': "100",
  },
  {
    'persona': "Josue",
    'r_semana9': "3",
    'p_semana9': "15",
    'v_semana9': "4",
    't_semana9': "18",
    'r_semana10': "7",
    'p_semana10': "10",
    'v_semana10': "4",
    't_semana10': "17",
    'r_semana11': "3",
    'p_semana11': "15",
    'v_semana11': "4",
    't_semana11': "18",
    'r_semana12': "",
    'p_semana12': "",
    'v_semana12': "",
    't_semana12': "0",
    'r_semana13': "",
    'p_semana13': "15",
    'v_semana13': "4",
    't_semana13': "15",
    'r_resumen': "13",
    'p_resumen': "55",
    'v_resumen': "4",
    't_resumen': "68",
    'rok': "10",
    'realizadas_fuera': "2",
    'v_total': "4",
    't_total': "0",
    'ok_cumplimiento': "100",
    'fuera_cumplimiento': "100",
    'vencidas_cumplimiento': "100",
  },
];



//---Grafica 
var dataElement1 = {
  labels: ["Juan","Hugo","Paco","Luis","Josue"],
  datasets: [
    {
      label: "Realizadas",
      data: [80,50,76,38,29],
      backgroundColor: "#2e86c1",
    },
    {
      label: "Vencidas",
      data: [90,30,38,10,15],
      backgroundColor: "#e74c3c",
    },
    {
      label: "Pendientes",
        data: [100,12,45,78,36],
        backgroundColor: "#f4d03f",
    }
  ]
};



var setOptions = {
  plugins: {
    legend: {
      display: true,
    },
    title: {
        display: true,
        text: 'Resumen de Actividades Mensual por Colaborador',
        font: {
          size: 25
        }
    },
    datalabels: {
        color: 'white',
        font: {
            weight: 'bold',
            size: 25,
      },
        align:'bot',
      }
  },
  tooltips: {
    enabled: true
  },
  scales: {
    x: {
      display: true,
      
    },
    y:{
      display: true,
    }
  },
};
