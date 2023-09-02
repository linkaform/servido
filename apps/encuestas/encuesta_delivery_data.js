
var columsTable1 = [
  { title:"Mes", field:'month',hozAlign:"left",width:200},
  { title:"Actividad", field:'activity',hozAlign:"left",width:160 },
  { title:"Cantidad",  field:'total',hozAlign:"left",width:150 },
];


var dataTable1 = [
  {
    month: '2023-Junio',
    total: '22', _children:[
      {
        month: '2023-Junio',
        activity: 'Reparto',
        total: '24',
      },
      {
        month: '2023-Junio',
        activity: 'Montaje',
        total: '15',
      },
      {
        month: '2023-Junio',
        activity: 'Recolección',
        total: '18',
      },
      {
        month: '2023-Junio',
        activity: 'Compras',
        total: '15',
      },
      {
        month: '2023-Junio',
        activity: 'Paquetería',
        total: '18',
      },

      ]
  },
  {
    month: '2023-Julio',
    activity: 'Reparto',
    total: '2',
  },
  {
    month: '2023-Agosto',
    activity: 'Reparto',
    total: '10',
  }
  ,
  {
    month: '2023-Septiembre',
    activity: 'Reparto',
    total: '24',
  },
  {
    month: '2023-Octubre',
    activity: 'Reparto',
    total: '30',
  },
  {
    month: '2023-Noviembre',
    activity: 'Reparto',
    total: '40',
  }

];


var columsTable2 = [
  { title:"Mes", field:'month',hozAlign:"left",width:200},
  { title:"Región", field:'region',hozAlign:"left",width:160 },
  { title:"Usuario",  field:'user',hozAlign:"left",width:150 },
  { title:"Cantidad",  field:'total',hozAlign:"left",width:150 },
];


var dataTable2B = [
  {
    mes: '2023-Junio',
    region: '',
    user: '', 
    total: '174',_children:[
        {
          mes: '',
          region: 'Centro',
          user: '',
          total: '137',_children:[
        {
          mes: '',
          region: '',
          user: 'Martín Layseca',
          total: '57',
        },
        {
          mes: '',
          region: '',
          user: 'Daniel López',
          total: '15',
        },
        {
          mes: '',
          region: '',
          user: 'Erick Robledo',
          total: '20',
        },
        {
          mes: ' ',
          region: ' ',
          user: 'Enrique Mata',
          total: '45',
        },
      ],
      },
      {
        mes: '',
        region: 'Bajío',
        user: '',
        total: '37',_children:[
        {
          mes: '',
          region: '',
          user: 'Pedro Layseca',
          total: '25',
        },
        {
          mes: '',
          region: '',
          user: 'Pablo López',
          total: '12',
        },
      ],
      },
      {
        mes: '',
        region: 'Toluca',
        user: '',
        total: '',
      },

      ],
  },
  {
    mes: '2023-Julio',
    region: 'Centro',
    user: 'Martín Layseca',
    total: '2',
  },
  {
    mes: '2023-Agosto',
    region: 'Monterrey',
    user: 'Martín Layseca',
    total: '10',
  }
  ,
  {
    mes: '2023-Septiembre',
    region: 'Norte',
    user: 'Martín Layseca',
    total: '24',
  },
  {
    mes: '2023-Octubre',
    region: 'Sur',
    user: 'Martín Layseca',
    total: '30',
  },
  {
    mes: '2023-Noviembre',
    region: 'Centro',
    user: 'Martín Layseca',
    total: '40',
  }

];

var dataTable2 = [
  {
    month: '2023-Junio',
    _children:[
        {
          region: 'Centro',
          total: '143',_children:[
        {
          user: 'Martín Layseca',
          total: '57',
        },
        {
          user: 'Daniel López',
          total: '15',
        },
        {
          user: 'Erick Robledo',
          total: '20',
        },
        {
          user: 'Enrique Mata',
          total: '45',
        },
      ],
      },
      {
        region: 'Bajío',
        total: '37',_children:[
        {
          user: 'Pedro Layseca',
          total: '35',
        },
        {
          user: 'Pablo López',
          total: '12',
        },
      ],
      },
      ],
    total: '200',
  },
  {
    month: '2023-Julio',
    region: '2020-10-15',
    user: 'Martín Layseca',
    total: '2',
  },
  {
    month: '2023-Agosto',
    region: '2020-10-15',
    user: 'Martín Layseca',
    total: '10',
  }
  ,
  {
    month: '2023-Septiembre',
    region: '2020-10-15',
    user: 'Martín Layseca',
    total: '24',
  },
  {
    month: '2023-Octubre',
    region: '2020-10-15',
    user: 'Martín Layseca',
    total: '30',
  },
  {
    month: '2023-Noviembre',
    region: '2020-10-15',
    user: 'Martín Layseca',
    total: '40',
  }

];

//----- CONFIG GRAPHIC
var data1 = {
  labels: ['2021-Enero'],
  datasets: [
    {
      label: 'Reparto',
      data: [1],
      borderColor: '#1a5276',
      backgroundColor: '#1a5276',
      fill: false
    },
    {
      label: 'Montaje',
      data: [3],
      backgroundColor: ' #f39c12',
      borderColor: '#f39c12',
      fill: false
    },
    {
      label: 'Recolección',
      data: [20],
      backgroundColor: '#2ecc71',
      borderColor: '#2ecc71',
      fill: false
    },
    {
      label: 'Compras',
      data: [8],
      backgroundColor: '#7d3c98',
      borderColor: '#7d3c98',
      fill: false
    },
    {
      label: 'Paquetería',
      data: [4],
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
      data: [28],
      backgroundColor: '#1a5276',
      borderColor:'#1a5276',
      fill: false
    },
    {
      label: 'Bajío',
      data: [1],
      backgroundColor: '#117a65',
      borderColor:'#117a65',
      fill: false
    },
    {
      label: 'Toluca',
      data: [135],
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
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      min:0,
      max:200,
    }
  }
};
<<<<<<< HEAD
=======


>>>>>>> ec74369 (Modificación del reporte de Forbo)
