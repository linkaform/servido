
var columsTable1 = [
  { title:"Mes", field:'mes',hozAlign:"left",width:200},
  { title:"Actividad", field:'actividad',hozAlign:"left",width:160 },
  { title:"Cantidad",  field:'cantidad',hozAlign:"left",width:150 },
];


var dataTable1 = [
  {
    mes: '2023-Junio',
    actividad: '',
    cantidad: '22', _children:[
      {
        mes: '2023-Junio',
        actividad: 'Reparto',
        cantidad: '24',
      },
      {
        mes: '2023-Junio',
        actividad: 'Montaje',
        cantidad: '15',
      },
      {
        mes: '2023-Junio',
        actividad: 'Recolección',
        cantidad: '18',
      },
      {
        mes: '2023-Junio',
        actividad: 'Compras',
        cantidad: '15',
      },
      {
        mes: '2023-Junio',
        actividad: 'Paquetería',
        cantidad: '18',
      },

      ]
  },
  {
    mes: '2023-Julio',
    actividad: '2020-10-15',
    cantidad: '2',
  },
  {
    mes: '2023-Agosto',
    actividad: '2020-10-15',
    cantidad: '10',
  }
  ,
  {
    mes: '2023-Septiembre',
    actividad: '2020-10-15',
    cantidad: '24',
  },
  {
    mes: '2023-Octubre',
    actividad: '2020-10-15',
    cantidad: '30',
  },
  {
    mes: '2023-Noviembre',
    actividad: '2020-10-15',
    cantidad: '40',
  }

];


var columsTable2 = [
  { title:"Mes", field:'mes',hozAlign:"left",width:200},
  { title:"Región", field:'ubicacion',hozAlign:"left",width:160 },
  { title:"Usuario",  field:'usuario',hozAlign:"left",width:150 },
  { title:"Cantidad",  field:'cantidad',hozAlign:"left",width:150 },
];


var dataTable2 = [
  {
    mes: '2023-Junio',
    ubicacion: '',
    usuario: '', 
    cantidad: '174',_children:[
        {
          mes: '',
          ubicacion: 'Centro',
          usuario: '',
          cantidad: '137',_children:[
        {
          mes: '',
          ubicacion: '',
          usuario: 'Martín Layseca',
          cantidad: '57',
        },
        {
          mes: '',
          ubicacion: '',
          usuario: 'Daniel López',
          cantidad: '15',
        },
        {
          mes: '',
          ubicacion: '',
          usuario: 'Erick Robledo',
          cantidad: '20',
        },
        {
          mes: ' ',
          ubicacion: ' ',
          usuario: 'Enrique Mata',
          cantidad: '45',
        },
      ],
      },
      {
        mes: '',
        ubicacion: 'Bajío',
        usuario: '',
        cantidad: '37',_children:[
        {
          mes: '',
          ubicacion: '',
          usuario: 'Pedro Layseca',
          cantidad: '25',
        },
        {
          mes: '',
          ubicacion: '',
          usuario: 'Pablo López',
          cantidad: '12',
        },
      ],
      },
      {
        mes: '',
        ubicacion: 'Toluca',
        usuario: '',
        cantidad: '',
      },

      ],
  },
  {
    mes: '2023-Julio',
    ubicacion: '2020-10-15',
    usuario: 'Martín Layseca',
    cantidad: '2',
  },
  {
    mes: '2023-Agosto',
    ubicacion: '2020-10-15',
    usuario: 'Martín Layseca',
    cantidad: '10',
  }
  ,
  {
    mes: '2023-Septiembre',
    ubicacion: '2020-10-15',
    usuario: 'Martín Layseca',
    cantidad: '24',
  },
  {
    mes: '2023-Octubre',
    ubicacion: '2020-10-15',
    usuario: 'Martín Layseca',
    cantidad: '30',
  },
  {
    mes: '2023-Noviembre',
    ubicacion: '2020-10-15',
    usuario: 'Martín Layseca',
    cantidad: '40',
  }

];

//----- CONFIG GRAPHIC
var data1 = {
  labels: ['2021-Enero','2021-Febrero','2021-Marzo','2021-Abril','2021-Mayo','2021-Junio','2021-Julio','2021-Agosto','2021-Septiembre','2021-Octubre','2021-Noviembre','2021-Diciembre','2022-Enero','2022-Febrero'],
  datasets: [
    {
      label: 'Reparto',
      data: [1,28,13,10,25,40,35,40,40,45,50,50,60],
      borderColor: '#1a5276',
      backgroundColor: '#1a5276',
      fill: false
    },
    {
      label: 'Montaje',
      data: [1,10,15,12,12,11,11,15,14,14,12,13,13,14],
      backgroundColor: ' #f39c12',
      borderColor: '#f39c12',
      fill: false
    },
    {
      label: 'Recolección',
      data: [1,20,32,19,18,26,36,56,40,60,50,70,80,87],
      backgroundColor: '#2ecc71',
      borderColor: '#2ecc71',
      fill: false
    },
    {
      label: 'Compras',
      data: [1,8,13,10,20,25,20,30,28,38,46,50,55,60],
      backgroundColor: '#7d3c98',
      borderColor: '#7d3c98',
      fill: false
    },
    {
      label: 'Paquetería',
      data: [1,5,4,10,9,5,7,5,4,9,10,11,7,10],
      backgroundColor: '#cb4335',
      borderColor: '#cb4335',
      fill: false
    }
    
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
        text: 'Delivery por actividad',
        font: {
          size: 25
        }
    },
    labels:{
      fontSize: 20,
      fontWeight: 'bold',
      position:'outside',
      textMargin: 5
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      min:0,
      max:120,
    }
  }
};



//----- CONFIG GRAPHIC
var data2 = {
  labels: ['2021-Enero','2021-Febrero','2021-Marzo','2021-Abril','2021-Mayo','2021-Junio','2021-Julio','2021-Agosto','2021-Septiembre','2021-Octubre','2021-Noviembre','2021-Diciembre','2022-Enero','2022-Febrero'],
  datasets: [
    {
      label: 'Centro',
      data: [1,28,13,10,25,40,35,40,40,45,50,50,60],
      backgroundColor: '#1a5276',
      borderColor:'#1a5276',
      fill: false
    },
    {
      label: 'Bajío',
      data: [1,20,10,5,2,20,4,20,15,10,10,13,8,16],
      backgroundColor: '#117a65',
      borderColor:'#117a65',
      fill: false
    },
    {
      label: 'Toluca',
      data: [1,15,16,20,20,40,50,30,38,40,70,90,76,80],
      backgroundColor: '#76448a',
      borderColor:'#76448a',
      fill: false
    }
    
  ]
};

var setOptions2 = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Delivery por región',
        font: {
          size: 25
        }
    },
    labels:{
      fontSize: 20,
      fontWeight: 'bold',
      position:'outside',
      textMargin: 5
    },
    datalabels: {
      color: 'white',
      formatter: function (value, context){
        var formato = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formato;
      }
    }
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      min:0,
      max:120,
    }
  }
};
