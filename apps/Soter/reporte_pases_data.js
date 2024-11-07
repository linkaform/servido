
let columsTable1 = [
    { title:"Contratista", field:'contratista',vertAlign:"middle"},
    { title:'Pases Activos', field:'pases_activos', hozAlign:"left", vertAlign:"middle"},
    { title:'Pases en Proceso', field:'pases_en_proceso', vertAlign:"middle"},
    { title:"Pases Vencidos", field:'pases_vencidos',vertAlign:"middle"},
    { title:"Total de Pases", field:'total_de_pases',vertAlign:"middle"},
    { title:"Fecha del Último Pase Emitido", field:'fecha_ultimo_pase_emitido',vertAlign:"middle"},
  ];
  
  
  
  let dataTable1 = [
    {
      "contratista": "Constructora XYZ",
      "pases_activos": 120,
      "pases_en_proceso": 15,
      "pases_vencidos": 5,
      "total_de_pases": 140,
      "fecha_ultimo_pase_emitido": "2024-11-01"
    },
    {
      "contratista": "Infraestructura ABC",
      "pases_activos": 80,
      "pases_en_proceso": 10,
      "pases_vencidos": 2,
      "total_de_pases": 92,
      "fecha_ultimo_pase_emitido": "2024-10-28"
    },
    {
      "contratista": "Servicios LMN",
      "pases_activos": 50,
      "pases_en_proceso": 20,
      "pases_vencidos": 10,
      "total_de_pases": 80,
      "fecha_ultimo_pase_emitido": "2024-10-25"
    },
    {
      "contratista": "Obras DEF",
      "pases_activos": 200,
      "pases_en_proceso": 30,
      "pases_vencidos": 15,
      "total_de_pases": 245,
      "fecha_ultimo_pase_emitido": "2024-10-20"
    },
    {
        "contratista": "Constructora XYZ",
        "pases_activos": 120,
        "pases_en_proceso": 15,
        "pases_vencidos": 5,
        "total_de_pases": 140,
        "fecha_ultimo_pase_emitido": "2024-11-01"
    },
    {
        "contratista": "Infraestructura ABC",
        "pases_activos": 80,
        "pases_en_proceso": 10,
        "pases_vencidos": 2,
        "total_de_pases": 92,
        "fecha_ultimo_pase_emitido": "2024-10-28"
    },
    {
        "contratista": "Servicios LMN",
        "pases_activos": 50,
        "pases_en_proceso": 20,
        "pases_vencidos": 10,
        "total_de_pases": 80,
        "fecha_ultimo_pase_emitido": "2024-10-25"
    },
  ];
  
  let columsTable2 = [
    { title:"Folio", field:'folio',vertAlign:"middle"},
    { title:"Nombre", field:'nombre',vertAlign:"middle"},
    { title:"Contratista", field:'contratista',vertAlign:"middle"},
    { title:"Tipo de Perfil", field:'tipo_perfil',vertAlign:"middle"},
    { title:"Total de Pases Emitidos", field:'total_de_pases_emitidos',vertAlign:"middle"},
    { title:"Estado del Último Pase", field:'estado_ultimo_pase',vertAlign:"middle"},
    { title:"Documentación Pendiente", field:'documentacion_pendiente',vertAlign:"middle"},
    { title:"Fecha de Vigencia del Último Pase", field:'fecha_vigencia_ultimo_pase',vertAlign:"middle"},
  ];
  
  
  
  let dataTable2 = [
    {
        "folio": "F1234",
        "nombre": "Juan Pérez",
        "contratista": "Constructora XYZ",
        "tipo_perfil": "Supervisor",
        "total_de_pases_emitidos": 5,
        "estado_ultimo_pase": "Activo",
        "documentacion_pendiente": "Ninguna",
        "fecha_vigencia_ultimo_pase": "2024-11-01"
    },
    {
        "folio": "F5678",
        "nombre": "María López",
        "contratista": "Infraestructura ABC",
        "tipo_perfil": "Trabajador",
        "total_de_pases_emitidos": 3,
        "estado_ultimo_pase": "Vencido",
        "documentacion_pendiente": "Foto",
        "fecha_vigencia_ultimo_pase": "2024-10-28"
    },
    {
        "folio": "F9101",
        "nombre": "Carlos Ruiz",
        "contratista": "Servicios LMN",
        "tipo_perfil": "Inspector",
        "total_de_pases_emitidos": 7,
        "estado_ultimo_pase": "Activo",
        "documentacion_pendiente": "Ninguna",
        "fecha_vigencia_ultimo_pase": "2024-10-25"
    },
    {
        "folio": "F1121",
        "nombre": "Ana González",
        "contratista": "Obras DEF",
        "tipo_perfil": "Técnico",
        "total_de_pases_emitidos": 2,
        "estado_ultimo_pase": "En proceso",
        "documentacion_pendiente": "Permiso",
        "fecha_vigencia_ultimo_pase": "2024-10-20"
    },
    {
        "folio": "F9101",
        "nombre": "Carlos Ruiz",
        "contratista": "Servicios LMN",
        "tipo_perfil": "Inspector",
        "total_de_pases_emitidos": 7,
        "estado_ultimo_pase": "Activo",
        "documentacion_pendiente": "Ninguna",
        "fecha_vigencia_ultimo_pase": "2024-10-25"
    },
    {
        "folio": "F1121",
        "nombre": "Ana González",
        "contratista": "Obras DEF",
        "tipo_perfil": "Técnico",
        "total_de_pases_emitidos": 2,
        "estado_ultimo_pase": "En proceso",
        "documentacion_pendiente": "Permiso",
        "fecha_vigencia_ultimo_pase": "2024-10-20"
    },
    {
        "folio": "F9101",
        "nombre": "Carlos Ruiz",
        "contratista": "Servicios LMN",
        "tipo_perfil": "Inspector",
        "total_de_pases_emitidos": 7,
        "estado_ultimo_pase": "Activo",
        "documentacion_pendiente": "Ninguna",
        "fecha_vigencia_ultimo_pase": "2024-10-25"
    },
    {
        "folio": "F1121",
        "nombre": "Ana González",
        "contratista": "Obras DEF",
        "tipo_perfil": "Técnico",
        "total_de_pases_emitidos": 2,
        "estado_ultimo_pase": "En proceso",
        "documentacion_pendiente": "Permiso",
        "fecha_vigencia_ultimo_pase": "2024-10-20"
    }
];

//-----Configuiración de la grafica
var setOptions1 = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
};

var dataChart1 = {
  labels: ['Visita General', 'Chófer', 'Instalador', 'Contratista', 'Auditor', 'Supervisor', 'Otros'],
  datasets: [
    {
      label: 'Cantidad',
      data: [60, 65, 80, 81, 55, 52, 40],
    },
  ]
};