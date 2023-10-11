// Datos demo para Reporte ENcuestas MOntaje

//--Table Montajes Por Mes
var resources2 = [
    { id: 'a', nombre_hospital: 'Hospital Norte', nombre_equipo: 'Máquina de ECG' },
    { id: 'b', nombre_hospital: 'Hospital Norte', nombre_equipo: 'Sistemas de estrés', },
    { id: 'c', nombre_hospital: 'Hospital Norte', nombre_equipo: 'Unidades electroquirúrgicas', },
    { id: 'd', nombre_hospital: 'Hospital Norte', nombre_equipo: 'Luces quirúrgicas',},
    { id: 'e', nombre_hospital: 'Hospital Norte', nombre_equipo: 'Ultrasonido de diagnóstico' },
    { id: 'f', nombre_hospital: 'Hospital Norte', nombre_equipo: 'Mesas quirúrgicas' },
  
    { id: 'g', nombre_hospital: 'Hospital Sur', nombre_equipo: 'Esterilizadores' },
    { id: 'h', nombre_hospital: 'Hospital Sur', nombre_equipo: 'Máquina de anestesia' },
    { id: 'i', nombre_hospital: 'Hospital Sur', nombre_equipo: 'Desfibriladores' },
    { id: 'j', nombre_hospital: 'Hospital Sur', nombre_equipo: 'Monitores de pacientes' },
  
    { id: 'k', nombre_hospital: 'Hospital Este', nombre_equipo: 'Ultrasonido de diagnóstico' },
    { id: 'l', nombre_hospital: 'Hospital Este', nombre_equipo: 'Desfibriladores' },
    { id: 'm', nombre_hospital: 'Hospital Este', nombre_equipo: 'Monitores de pacientes' },
    { id: 'ñ', nombre_hospital: 'Hospital Este', nombre_equipo: 'Mesas quirúrgicas ' },
  
    { id: 'o', nombre_hospital: 'Hospital Oeste', nombre_equipo: 'Luces quirúrgicas' },
    { id: 'p', nombre_hospital: 'Hospital Oeste', nombre_equipo: 'Mesas quirúrgicas' },
    { id: 'q', nombre_hospital: 'Hospital Oeste', nombre_equipo: 'Monitores de pacientes' },
    { id: 'r', nombre_hospital: 'Hospital Oeste', nombre_equipo: 'Desfibriladores' },
  ];
  
  var resources1 = [
    { id:'a', nombre_usuario: 'Juan Contreras', nombre_actividad: 'Agendar Cita con Cliente'},
    { id:'b', nombre_usuario: 'Juan Contreras', nombre_actividad: 'Realizar Visita'},
    { id:'c', nombre_usuario: 'Juan Contreras', nombre_actividad: 'Elaboración de Reportes'},
    { id:'d', nombre_usuario: 'Juan Contreras', nombre_actividad: 'Actualización de Base de Datos y Prospectos'},
    
    { id:'e', nombre_usuario: 'Miguel Pérez Cruz', nombre_actividad: 'Elaboración de Reportes'},
    { id:'f', nombre_usuario: 'Miguel Pérez Cruz', nombre_actividad: 'Servicio'},
    { id:'g', nombre_usuario: 'Miguel Pérez Cruz', nombre_actividad: 'Seguimiento de Cotizaciones'},
    { id:'h', nombre_usuario: 'Miguel Pérez Cruz', nombre_actividad: 'Entrega Material'},
  ]
  //--TAble Montajes Por mes Region
  var events2 = [
    {  resourceId: 'a', start: '2022-06-16T02:00:00', end: '2022-06-16T07:00:00', title: 'Mantenimiento Correctivo',  color :'#27ae60'},
    {  resourceId: 'a', start: '2022-06-16T02:00:00', end: '2022-06-16T07:00:00', title: 'Checkup', color :'#2980b9'},
    {  resourceId: 'b', start: '2022-06-16T05:00:00', end: '2022-06-16T22:00:00', title: 'Mantenimiento Preventivo',color:'#f1c40f'},
  
    {  resourceId: 'c', start: '2022-06-16T02:00:00', end: '2022-06-16T07:00:00', title: 'Mantenimiento Correctivo', color :'#27ae60'  },
    {  resourceId: 'd', start: '2022-06-16T02:00:00', end: '2022-06-16T07:00:00', title: 'Checkup' ,color :'#2980b9'},
    {  resourceId: 'e', start:'2022-06-16T05:00:00',  end: '2022-06-16T22:00:00', title: 'Mantenimiento Preventivo',color:'#f1c40f'},
  
  
    {  resourceId: 'f', start: '2022-06-16T03:00:00', end: '2022-06-16T08:00:00', title: 'Mantenimiento Preventivo',color:'#f1c40f'},
    {  resourceId: 'g', start: '2022-06-16T00:30:00', end: '2022-06-16T02:30:00', title: 'Checkup',color :'#2980b9'},
    {  resourceId: 'h', start: '2022-06-16T00:30:00', end: '2022-06-16T02:30:00', title: 'Mantenimiento Correctivo', color :'#27ae60' },
  
  
    {  resourceId: 'i', start: '2022-06-16T05:00:00', end: '2022-06-16T10:00:00', title: 'Mantenimiento Preventivo',color:'#f1c40f'},
    {  resourceId: 'j', start: '2022-06-16T00:30:00', end: '2022-06-16T02:30:00', title: 'Checkup',color :'#2980b9'},
    {  resourceId: 'k', start: '2022-06-16T00:30:00', end: '2022-06-16T02:30:00', title: 'Mantenimiento Correctivo', color :'#27ae60' },
  
    {  resourceId: 'l', start: '2022-06-16T05:00:00', end: '2022-06-16T10:00:00', title: 'Mantenimiento Preventivo',color:'#f1c40f'},
    {  resourceId: 'm', start: '2022-06-16T00:30:00', end: '2022-06-16T02:30:00', title: 'Checkup',color :'#2980b9'},
    {  resourceId: 'ñ', start: '2022-06-16T00:30:00', end: '2022-06-16T02:30:00', title: 'Mantenimiento Correctivo', color :'#27ae60'},
  
    {  resourceId: 'o', start: '2022-06-16T05:00:00', end: '2022-06-16T10:00:00', title: 'Mantenimiento Preventivo',color:'#f1c40f'},
    {  resourceId: 'p', start: '2022-06-16T00:30:00', end: '2022-06-16T02:30:00', title: 'Checkup',color :'#2980b9'},
    {  resourceId: 'q', start: '2022-06-16T00:30:00', end: '2022-06-16T02:30:00', title: 'Mantenimiento Correctivo',  color :'#27ae60' },
    {  resourceId: 'r', start: '2022-06-16T00:30:00', end: '2022-06-16T02:30:00', title: 'Mantenimiento Correctivo',  color :'#27ae60' },
  ];
  
  let events1 =  [
    {
        "color": "#CA6F1E",
        "resourceId": "1384-7243",
        "end": "2023-10-09T10:00:00",
        "start": "2023-10-09T09:00:00",
        "title": "realizar_visita"
    },
    {
        "color": "#CA6F1E",
        "resourceId": "1384-7243",
        "end": "2023-10-09T13:00:00",
        "start": "2023-10-09T11:00:00",
        "title": "concretar_venta"
    },
    {
        "color": "#CA6F1E",
        "resourceId": "1384-7243",
        "end": "2023-10-10T0:56:00",
        "start": "2023-10-10T7:56:00",
        "title": ""
    },
    {
        "color": "#CA6F1E",
        "resourceId": "1388-7243",
        "end": "2023-10-09T16:30:00",
        "start": "2023-10-09T15:30:00",
        "title": "taller"
    },
    {
        "color": "#CA6F1E",
        "resourceId": "1388-7243",
        "end": "2023-10-10T10:30:00",
        "start": "2023-10-10T09:00:00",
        "title": "realizar_visita"
    },
    {
        "color": "#CA6F1E",
        "resourceId": "1388-7243",
        "end": "2023-10-11T15:32:00",
        "start": "2023-10-11T15:32:00",
        "title": "seguimiento_de_cotizaciones"
    },
    {
        "color": "#28B463",
        "resourceId": "1389-7243",
        "end": "2023-10-09T16:35:00",
        "start": "2023-10-09T15:35:00",
        "title": "elaboración_de_reportes"
    }
]
  