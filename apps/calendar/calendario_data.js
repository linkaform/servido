// Datos demo para Reporte ENcuestas MOntaje

//--Table Montajes Por Mes
var resources1 = [
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

//--TAble Montajes Por mes Region
var events1 = [
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

