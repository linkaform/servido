//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirst', title:'Licencias'},
        ] 
    },
];



//-----Configuraciones de la tabla
var columsTable1 = [
  { title:"Id" , field:'codigo', hozAlign:"left", width:250},
  { title:"Nombre de Usuario" , field:'username', hozAlign:"left",headerFilter:"input", width:300},
  { title:"Primer Nombre", field:'nombre', hozAlign:"left", headerFilter:"input",width:450},
  { title:"Correo Electrónico", field:'mail', hozAlign:"left",headerFilter:"input", width:250},
  { title:"Posición", field:'posicion', hozAlign:"left",headerFilter:"input", width:300},
  { title:"Expira", field:'expiracion', hozAlign:"left", width:200},
  { title:"Cuenta Padre", field:'cuenta', hozAlign:"left", width:200},
  { title:"Nombre Cuenta Padre", field:'partnert', hozAlign:"left", headerFilter:"input", width:250},
  { title:"Correo Electrónico Cuenta Padre", field:'email_partnert', hozAlign:"left", width:250},
];


const dataTable1 = [
  {
    codigo: "USR-1001",
    username: "jlopez",
    nombre: "Juan López",
    mail: "juan.lopez@example.com",
    posicion: "Supervisor",
    expiracion: "2026-12-31",
    cuenta: "CP-001",
    partnert: "Grupo Central",
    email_partnert: "contacto@grupocentral.com"
  },
  {
    codigo: "USR-1002",
    username: "mgarcia",
    nombre: "María García",
    mail: "maria.garcia@example.com",
    posicion: "Analista",
    expiracion: "2026-10-15",
    cuenta: "CP-002",
    partnert: "Distribuidora Norte",
    email_partnert: "soporte@norte.com"
  },
  {
    codigo: "USR-1003",
    username: "cfernandez",
    nombre: "Carlos Fernández",
    mail: "carlos.fernandez@example.com",
    posicion: "Administrador",
    expiracion: "2027-01-20",
    cuenta: "CP-003",
    partnert: "Servicios Integrales",
    email_partnert: "admin@servicios.com"
  },
  {
    codigo: "USR-1004",
    username: "arodriguez",
    nombre: "Ana Rodríguez",
    mail: "ana.rodriguez@example.com",
    posicion: "Coordinador",
    expiracion: "2026-09-05",
    cuenta: "CP-004",
    partnert: "Logística MX",
    email_partnert: "info@logisticamx.com"
  },
  {
    codigo: "USR-1005",
    username: "lmartinez",
    nombre: "Luis Martínez",
    mail: "luis.martinez@example.com",
    posicion: "Operador",
    expiracion: "2026-11-11",
    cuenta: "CP-005",
    partnert: "Operaciones LATAM",
    email_partnert: "contacto@latamops.com"
  },
  {
    codigo: "USR-1006",
    username: "sperez",
    nombre: "Sofía Pérez",
    mail: "sofia.perez@example.com",
    posicion: "Gerente",
    expiracion: "2027-03-01",
    cuenta: "CP-006",
    partnert: "Corporativo Sigma",
    email_partnert: "gerencia@sigma.com"
  },
  {
    codigo: "USR-1007",
    username: "dhernandez",
    nombre: "Diego Hernández",
    mail: "diego.hernandez@example.com",
    posicion: "Inspector",
    expiracion: "2026-08-19",
    cuenta: "CP-007",
    partnert: "Calidad Total",
    email_partnert: "calidad@total.com"
  },
  {
    codigo: "USR-1008",
    username: "rcruz",
    nombre: "Ricardo Cruz",
    mail: "ricardo.cruz@example.com",
    posicion: "Técnico",
    expiracion: "2026-07-30",
    cuenta: "CP-008",
    partnert: "Tecnologías Avanzadas",
    email_partnert: "soporte@tecavanzadas.com"
  },
  {
    codigo: "USR-1009",
    username: "ecastillo",
    nombre: "Elena Castillo",
    mail: "elena.castillo@example.com",
    posicion: "Auditor",
    expiracion: "2027-02-14",
    cuenta: "CP-009",
    partnert: "Auditorías Globales",
    email_partnert: "auditoria@globales.com"
  },
  {
    codigo: "USR-1010",
    username: "fmorales",
    nombre: "Fernando Morales",
    mail: "fernando.morales@example.com",
    posicion: "Desarrollador",
    expiracion: "2026-12-01",
    cuenta: "CP-010",
    partnert: "Innovación Digital",
    email_partnert: "dev@innovaciondigital.com"
  }
];