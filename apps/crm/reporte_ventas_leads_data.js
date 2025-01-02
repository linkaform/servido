
var columsTable1 = [
    { title:"Mes", field:'mes',hozAlign:"left",width:200},
    { title:"Leads generados", field:'leads_generados',hozAlign:"right",width:160 },
    { title:"Leads calificados",  field:'leads_calificados',hozAlign:"right",width:150 },
    { title:"Demos",  field:'demos',hozAlign:"right",width:150 },
    {
        title: "Leads ganados",
        field: "leads_ganados",
        hozAlign: "right",
        width: 150,
        cellClick: function (e, cell) {
          var data = cell.getRow().getData();
          var clientes = data.clientes;
  
          var content = "<ul>";
          clientes.forEach(function (cliente) {
            content += "<li>" + cliente + "</li>";
          });
          content += "</ul>";
  
          tippy(cell.getElement(), {
            content: content,
            theme: "light",  
            trigger: "click",
            arrow: true,     
            placement: "top",
            interactive: true,
          });
        },
    },
    { title:"% Demos por lead",  field:'porcentaje_demos',hozAlign:"right",width:150,formatter: "money",
        formatterParams: {
            symbol: "%",
            thousand: ",",
            decimal: ".",
            precision: 0,
            symbolAfter: true
    }},
    { title:"% Leads calificados",  field:'porcentaje_leads_calificados',hozAlign:"right",width:150,formatter: "money",
        formatterParams: {
            symbol: "%",
            thousand: ",",
            decimal: ".",
            precision: 0,
            symbolAfter: true
    }},
    { title:"% de cierre",  field:'porcentaje_cierre',hozAlign:"right",width:150,formatter: "money",
        formatterParams: {
            symbol: "%",
            thousand: ",",
            decimal: ".",
            precision: 0,
            symbolAfter: true
    }},
    { title:"Licencias en proceso",  field:'licencias_en_proceso',hozAlign:"right",width:150,formatter: "money",
        formatterParams: {
            symbol: "$",
            thousand: ",",
            decimal: ".",
            precision: 0,
    } },
    { title:"S.P En proceso",  field:'sp_en_proceso',hozAlign:"right",width:150,formatter: "money",
        formatterParams: {
            symbol: "$",
            thousand: ",",
            decimal: ".",
            precision: 0,
    } },
    { title:"Licencias vendidas",  field:'licencias_vendidas',hozAlign:"right",width:150,formatter: "money",
        formatterParams: {
            symbol: "$",
            thousand: ",",
            decimal: ".",
            precision: 0,
    } },
    { title:"S.P Vendidos",  field:'sp_vendidos',hozAlign:"right",width:150,formatter: "money",
        formatterParams: {
            symbol: "$",
            thousand: ",",
            decimal: ".",
            precision: 0,
    } },
  ];
  
  var dataTable1 = [
    {
      mes: '2024',
      _children: [
        {
          mes: 'Enero',
          leads_generados: '10',
          leads_calificados: '8',
          demos: '4',
          leads_ganados: '2',
          porcentaje_demos: '40%',
          porcentaje_leads_calificados: '80%',
          porcentaje_cierre: '25%',
          licencias_en_proceso: '3',
          sp_en_proceso: '2',
          licencias_vendidas: '10000',
          sp_vendidos: '1',
          clientes: ['Cliente A', 'Cliente B'],
        },
        {
          mes: 'Febrero',
          leads_generados: '15',
          leads_calificados: '12',
          demos: '5',
          leads_ganados: '3',
          porcentaje_demos: '33%',
          porcentaje_leads_calificados: '80%',
          porcentaje_cierre: '25%',
          licencias_en_proceso: '2',
          sp_en_proceso: '1',
          licencias_vendidas: '2',
          sp_vendidos: '1',
          clientes: ['Cliente A', 'Cliente B'],
        },
        {
          mes: 'Marzo',
          leads_generados: '20',
          leads_calificados: '18',
          demos: '6',
          leads_ganados: '4',
          porcentaje_demos: '30%',
          porcentaje_leads_calificados: '90%',
          porcentaje_cierre: '22%',
          licencias_en_proceso: '5',
          sp_en_proceso: '2',
          licencias_vendidas: '3',
          sp_vendidos: '2',
          clientes: ['Cliente A', 'Cliente B'],
        },
        {
          mes: 'Abril',
          leads_generados: '25',
          leads_calificados: '20',
          demos: '8',
          leads_ganados: '5',
          porcentaje_demos: '32%',
          porcentaje_leads_calificados: '80%',
          porcentaje_cierre: '25%',
          licencias_en_proceso: '4',
          sp_en_proceso: '3',
          licencias_vendidas: '2',
          sp_vendidos: '2',
          clientes: ['Cliente A', 'Cliente B'],
        },
        {
          mes: 'Mayo',
          leads_generados: '18',
          leads_calificados: '15',
          demos: '6',
          leads_ganados: '4',
          porcentaje_demos: '33%',
          porcentaje_leads_calificados: '83%',
          porcentaje_cierre: '27%',
          licencias_en_proceso: '3',
          sp_en_proceso: '2',
          licencias_vendidas: '1',
          sp_vendidos: '2',
          clientes: ['Cliente A', 'Cliente B', 'Cliente C', 'Cliente D'],
        },
        {
          mes: 'Junio',
          leads_generados: '22',
          leads_calificados: '19',
          demos: '7',
          leads_ganados: '5',
          porcentaje_demos: '32%',
          porcentaje_leads_calificados: '86%',
          porcentaje_cierre: '26%',
          licencias_en_proceso: '3',
          sp_en_proceso: '3',
          licencias_vendidas: '2',
          sp_vendidos: '3',
          clientes: ['Cliente A', 'Cliente B'],
        },
        {
          mes: 'Julio',
          leads_generados: '24',
          leads_calificados: '20',
          demos: '9',
          leads_ganados: '6',
          porcentaje_demos: '37%',
          porcentaje_leads_calificados: '83%',
          porcentaje_cierre: '30%',
          licencias_en_proceso: '4',
          sp_en_proceso: '3',
          licencias_vendidas: '3',
          sp_vendidos: '2',
          clientes: ['Cliente A', 'Cliente B'],
        },
        {
          mes: 'Agosto',
          leads_generados: '28',
          leads_calificados: '24',
          demos: '10',
          leads_ganados: '7',
          porcentaje_demos: '36%',
          porcentaje_leads_calificados: '85%',
          porcentaje_cierre: '29%',
          licencias_en_proceso: '5',
          sp_en_proceso: '4',
          licencias_vendidas: '4',
          sp_vendidos: '3',
          clientes: ['Cliente A', 'Cliente B'],
        },
        {
          mes: 'Septiembre',
          leads_generados: '30',
          leads_calificados: '26',
          demos: '11',
          leads_ganados: '8',
          porcentaje_demos: '37%',
          porcentaje_leads_calificados: '87%',
          porcentaje_cierre: '31%',
          licencias_en_proceso: '5',
          sp_en_proceso: '3',
          licencias_vendidas: '3',
          sp_vendidos: '4',
          clientes: ['Cliente A', 'Cliente B'],
        },
        {
          mes: 'Octubre',
          leads_generados: '35',
          leads_calificados: '30',
          demos: '12',
          leads_ganados: '9',
          porcentaje_demos: '34%',
          porcentaje_leads_calificados: '86%',
          porcentaje_cierre: '30%',
          licencias_en_proceso: '6',
          sp_en_proceso: '4',
          licencias_vendidas: '4',
          sp_vendidos: '5',
          clientes: ['Cliente A', 'Cliente B'],
        },
        {
          mes: 'Noviembre',
          leads_generados: '40',
          leads_calificados: '34',
          demos: '14',
          leads_ganados: '10',
          porcentaje_demos: '35%',
          porcentaje_leads_calificados: '85%',
          porcentaje_cierre: '29%',
          licencias_en_proceso: '7',
          sp_en_proceso: '5',
          licencias_vendidas: '5',
          sp_vendidos: '4',
          clientes: ['Cliente A', 'Cliente B'],
        },
        {
          mes: 'Diciembre',
          leads_generados: '45',
          leads_calificados: '40',
          demos: '15',
          leads_ganados: '12',
          porcentaje_demos: '33%',
          porcentaje_leads_calificados: '88%',
          porcentaje_cierre: '30%',
          licencias_en_proceso: '8',
          sp_en_proceso: '5',
          licencias_vendidas: '6',
          sp_vendidos: '5',
          clientes: ['Cliente A', 'Cliente B'],
        },
      ],
    },
    {
        mes: '2023',
        _children: [
          {
            mes: 'Enero',
            leads_generados: '10',
            leads_calificados: '8',
            demos: '4',
            leads_ganados: '2',
            porcentaje_demos: '40%',
            porcentaje_leads_calificados: '80%',
            porcentaje_cierre: '25%',
            licencias_en_proceso: '3',
            sp_en_proceso: '2',
            licencias_vendidas: '10000',
            sp_vendidos: '1',
            clientes: ['Cliente A', 'Cliente B'],
          },
          {
            mes: 'Febrero',
            leads_generados: '15',
            leads_calificados: '12',
            demos: '5',
            leads_ganados: '3',
            porcentaje_demos: '33%',
            porcentaje_leads_calificados: '80%',
            porcentaje_cierre: '25%',
            licencias_en_proceso: '2',
            sp_en_proceso: '1',
            licencias_vendidas: '2',
            sp_vendidos: '1',
            clientes: ['Cliente A', 'Cliente B'],
          },
          {
            mes: 'Marzo',
            leads_generados: '20',
            leads_calificados: '18',
            demos: '6',
            leads_ganados: '4',
            porcentaje_demos: '30%',
            porcentaje_leads_calificados: '90%',
            porcentaje_cierre: '22%',
            licencias_en_proceso: '5',
            sp_en_proceso: '2',
            licencias_vendidas: '3',
            sp_vendidos: '2',
            clientes: ['Cliente A', 'Cliente B'],
          },
          {
            mes: 'Abril',
            leads_generados: '25',
            leads_calificados: '20',
            demos: '8',
            leads_ganados: '5',
            porcentaje_demos: '32%',
            porcentaje_leads_calificados: '80%',
            porcentaje_cierre: '25%',
            licencias_en_proceso: '4',
            sp_en_proceso: '3',
            licencias_vendidas: '2',
            sp_vendidos: '2',
            clientes: ['Cliente A', 'Cliente B'],
          },
          {
            mes: 'Mayo',
            leads_generados: '18',
            leads_calificados: '15',
            demos: '6',
            leads_ganados: '4',
            porcentaje_demos: '33%',
            porcentaje_leads_calificados: '83%',
            porcentaje_cierre: '27%',
            licencias_en_proceso: '3',
            sp_en_proceso: '2',
            licencias_vendidas: '1',
            sp_vendidos: '2',
            clientes: ['Cliente A', 'Cliente B'],
          },
          {
            mes: 'Junio',
            leads_generados: '22',
            leads_calificados: '19',
            demos: '7',
            leads_ganados: '5',
            porcentaje_demos: '32%',
            porcentaje_leads_calificados: '86%',
            porcentaje_cierre: '26%',
            licencias_en_proceso: '3',
            sp_en_proceso: '3',
            licencias_vendidas: '2',
            sp_vendidos: '3',
            clientes: ['Cliente A', 'Cliente B'],
          },
          {
            mes: 'Julio',
            leads_generados: '24',
            leads_calificados: '20',
            demos: '9',
            leads_ganados: '6',
            porcentaje_demos: '37%',
            porcentaje_leads_calificados: '83%',
            porcentaje_cierre: '30%',
            licencias_en_proceso: '4',
            sp_en_proceso: '3',
            licencias_vendidas: '3',
            sp_vendidos: '2',
            clientes: ['Cliente A', 'Cliente B'],
          },
          {
            mes: 'Agosto',
            leads_generados: '28',
            leads_calificados: '24',
            demos: '10',
            leads_ganados: '7',
            porcentaje_demos: '36%',
            porcentaje_leads_calificados: '85%',
            porcentaje_cierre: '29%',
            licencias_en_proceso: '5',
            sp_en_proceso: '4',
            licencias_vendidas: '4',
            sp_vendidos: '3',
            clientes: ['Cliente A', 'Cliente B'],
          },
          {
            mes: 'Septiembre',
            leads_generados: '30',
            leads_calificados: '26',
            demos: '11',
            leads_ganados: '8',
            porcentaje_demos: '37%',
            porcentaje_leads_calificados: '87%',
            porcentaje_cierre: '31%',
            licencias_en_proceso: '5',
            sp_en_proceso: '3',
            licencias_vendidas: '3',
            sp_vendidos: '4',
            clientes: ['Cliente A', 'Cliente B'],
          },
          {
            mes: 'Octubre',
            leads_generados: '35',
            leads_calificados: '30',
            demos: '12',
            leads_ganados: '9',
            porcentaje_demos: '34%',
            porcentaje_leads_calificados: '86%',
            porcentaje_cierre: '30%',
            licencias_en_proceso: '6',
            sp_en_proceso: '4',
            licencias_vendidas: '4',
            sp_vendidos: '5',
            clientes: ['Cliente A', 'Cliente B'],
          },
          {
            mes: 'Noviembre',
            leads_generados: '40',
            leads_calificados: '34',
            demos: '14',
            leads_ganados: '10',
            porcentaje_demos: '35%',
            porcentaje_leads_calificados: '85%',
            porcentaje_cierre: '29%',
            licencias_en_proceso: '7',
            sp_en_proceso: '5',
            licencias_vendidas: '5',
            sp_vendidos: '4',
            clientes: ['Cliente A', 'Cliente B'],
          },
          {
            mes: 'Diciembre',
            leads_generados: '45',
            leads_calificados: '40',
            demos: '15',
            leads_ganados: '12',
            porcentaje_demos: '33%',
            porcentaje_leads_calificados: '88%',
            porcentaje_cierre: '30%',
            licencias_en_proceso: '8',
            sp_en_proceso: '5',
            licencias_vendidas: '6',
            sp_vendidos: '5',
            clientes: ['Cliente A', 'Cliente B'],
          },
        ],
      },
  ];
  


  var dataTable11 = [
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
    labels: ['Por Contactar', 'En Progreso', 'Cita para Demo', 'Cotización','Toma de Decisiones', 'Ganado', 'Perdido', 'Rechazado'],
    datasets: [
      {
        label: 'Leads Generados',
        data: [10, 15, 20, 25, 18, 22, 24, 28], // Valores de leads generados para cada mes
        backgroundColor: '#FFC145', // Color de las barras
        borderColor: '#FFC145', // Color del borde de las barras
        borderWidth: 1,
      },
    ]
  };
  
  //----- CONFIG OPTIONS
  var setOptions1 = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Leads por Etapa',
        font: {
          size: 25
        }
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        min: 0,
        max: 350,
        title: {
          display: true,
          text: 'Cantidad',
          font: {
              size: 18
          }
        },
      }
    }
  };
  
  //----- CONFIG GRAPHIC
  var data2 = {
    labels: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    datasets: [
        {
            label: 'Sí',
            data: [
                80, 80, 90, 80, 83, 86, 83, 85, 87, 86, 85, 88
            ], 
            backgroundColor: '#5CB338', // Color de fondo para "Sí"
            borderColor: 'transparent', // Bordes invisibles
            fill: true                   // Rellenar la barra
        },
      {
        label: 'No',
        data: [
            20, 20, 10, 20, 17, 14, 17, 15, 13, 14, 15, 12
        ], 
        backgroundColor: '#e74c3c',  // Color de fondo para "No"
        borderColor: 'transparent',  // Bordes invisibles
        fill: true                   // Rellenar la barra
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
          text: 'Leads Calificados',
          font: {
            size: 25
          }
      },
      datalabels: {
        color: 'white',
        formatter: function (value, context){
          var formato = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return formato + '%';
        }
      }
    },
    scales: {
      x: {
        stacked: false,    // Asegúrate de que las barras no estén apiladas y estén lado a lado
      },
      y: {
        title: {
          display: true,
          text: 'Porcentaje',
          font: {
              size: 18
          }
        },
        stacked: false,    // Asegúrate de que las barras no estén apiladas en el eje y
        min: 0,
        max: 100,
      }
    }
};
  

var data3 = {
    labels: [
        'Enero 2024', 'Febrero 2024', 'Marzo 2024', 'Abril 2024', 'Mayo 2024', 'Junio 2024', 
        'Julio 2024', 'Agosto 2024', 'Septiembre 2024', 'Octubre 2024', 'Noviembre 2024', 'Diciembre 2024'
    ],
    datasets: [
        {
            label: 'Licencias',
            data: [
                80, 90, 75, 100, 120, 140, 160, 170, 180, 200, 210, 220  // Datos de licencias vendidas
            ],
            borderColor: '#EFF3EA',  // Color de la línea de Licencias
            backgroundColor: 'rgba(52, 152, 219, 0.2)',  // Color de fondo de las áreas debajo de la línea
            tension: 0.4,  // Curvatura de la línea
            borderWidth: 2,  // Grosor de la línea
            pointBackgroundColor: 'blue',  // Color de relleno de los puntos
            pointBorderColor: 'darkblue',  // Color del borde de los puntos
            pointRadius: 3,  // Tamaño de los puntos
        },
        {
            label: 'Servicios Profesionales',
            data: [
                40, 45, 50, 60, 55, 70, 75, 80, 85, 95, 110, 115  // Datos de SP vendidos
            ],
            borderColor: '#4DA1A9',  // Color de la línea de SP
            backgroundColor: 'rgba(231, 76, 60, 0.2)',  // Color de fondo de las áreas debajo de la línea
            tension: 0.4,  // Curvatura de la línea
            borderWidth: 2,  // Grosor de la línea
            pointBackgroundColor: 'blue',  // Color de relleno de los puntos
            pointBorderColor: 'darkblue',  // Color del borde de los puntos
            pointRadius: 3,  // Tamaño de los puntos
        }
    ]
};

var setOptions3 = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        title: {
            display: true,
            text: 'Ventas Mensuales',
            font: {
                size: 25
            }
        },
        datalabels: {
            color: 'black',
            formatter: function (value, context){
                var formato = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return formato;  // Mostrar los datos de las ventas
            },
            anchor: 'end',  // Coloca las etiquetas al final del punto
            align: 'top',  // Alinea las etiquetas por encima del punto
        }
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'Mes y Año',
                font: {
                    size: 18
                }
            },
            ticks: {
                autoSkip: true,  // Esto asegura que las etiquetas no se superpongan
                maxRotation: 45,  // Ángulo de rotación de las etiquetas en el eje X para mejorar la visibilidad
                minRotation: 45   // Minimiza el ángulo de rotación para asegurar una lectura cómoda
            }
        },
        y: {
            min: 0,
            max: 250,  // Ajusta el valor máximo según tus datos
            title: {
                display: true,
                text: 'Ventas',
                font: {
                    size: 18
                }
            }
        }
    }
};

var data4 = {
    labels: [
        'Enero 2024', 'Febrero 2024', 'Marzo 2024', 'Abril 2024', 'Mayo 2024', 'Junio 2024', 
        'Julio 2024', 'Agosto 2024', 'Septiembre 2024', 'Octubre 2024', 'Noviembre 2024', 'Diciembre 2024'
    ],
    datasets: [
        {
            label: 'Porcentaje de Cierre',
            data: [
                85, 80, 78, 90, 88, 92, 94, 95, 96, 98, 99, 100  // Datos de porcentaje de cierre
            ],
            borderColor: '#E16A54',  // Color de la línea de porcentaje de cierre
            backgroundColor: 'rgba(155, 89, 182, 0.2)',  // Color de fondo de las áreas debajo de la línea
            tension: 0.4,  // Curvatura de la línea
            borderWidth: 2,  // Grosor de la línea
            pointBackgroundColor: 'blue',  // Color de relleno de los puntos
            pointBorderColor: 'darkblue',  // Color del borde de los puntos
            pointRadius: 3,  // Tamaño de los puntos
        }
    ]
};

var setOptions4 = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        title: {
            display: true,
            text: '% Cierre Mensual',
            font: {
                size: 25
            }
        },
        datalabels: {
            color: 'black',
            formatter: function (value, context){
                var formato = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return formato + '%';  // Mostrar los valores con el símbolo de porcentaje
            },
            anchor: 'end',  // Coloca las etiquetas al final del punto
            align: 'top',  // Alinea las etiquetas por encima del punto
        }
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'Mes y Año',
                font: {
                    size: 18
                }
            },
            ticks: {
                autoSkip: true,  // Evita que las etiquetas se superpongan
                maxRotation: 45,  // Ángulo de rotación de las etiquetas
                minRotation: 45   // Minimiza el ángulo de rotación
            }
        },
        y: {
            min: 0,
            max: 100,  // El porcentaje de cierre va de 0 a 100
            title: {
                display: true,
                text: 'Porcentaje',
                font: {
                    size: 18
                }
            }
        }
    }
};