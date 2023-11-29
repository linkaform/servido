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
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1438-7243",
        "nombre_actividad": "Cotizaciones"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1438-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1438-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1438-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1438-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1486-7243",
        "nombre_actividad": "Cotizaciones"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1486-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1486-7243",
        "nombre_actividad": "Cotizaciones"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1486-7243",
        "nombre_actividad": "Cotizaciones"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1486-7243",
        "nombre_actividad": "Visita presencial"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1558-7243",
        "nombre_actividad": "Reuniones virtuales"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1558-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1558-7243",
        "nombre_actividad": "Cotizaciones"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1558-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1558-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1558-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1687-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1687-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1687-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1687-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1687-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1429-7243",
        "nombre_actividad": "Llamadas y asistencias telefonicas"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1443-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1449-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1452-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1465-7243",
        "nombre_actividad": "Traslados"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1467-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1468-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1485-7243",
        "nombre_actividad": "Traslados"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1493-7243",
        "nombre_actividad": "Cotizaciones"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1494-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1496-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1498-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1522-7243",
        "nombre_actividad": "Cotizaciones"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1523-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1524-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1525-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1529-7243",
        "nombre_actividad": "Traslados"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1530-7243",
        "nombre_actividad": "Visita presencial"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1531-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1532-7243",
        "nombre_actividad": "Visita presencial"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1533-7243",
        "nombre_actividad": "Visita presencial"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1534-7243",
        "nombre_actividad": "Visita presencial"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1535-7243",
        "nombre_actividad": "Traslados"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1536-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1549-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1608-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1609-7243",
        "nombre_actividad": "Visita presencial"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1610-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1655-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1656-7243",
        "nombre_actividad": "Traslados"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1657-7243",
        "nombre_actividad": "Visita presencial"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1658-7243",
        "nombre_actividad": "Visita presencial"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1659-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1660-7243",
        "nombre_actividad": "Traslados"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1662-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1663-7243",
        "nombre_actividad": "Visita presencial"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1665-7243",
        "nombre_actividad": "Traslados"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1666-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1672-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1673-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1674-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1679-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1726-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1727-7243",
        "nombre_actividad": "Reuniones virtuales"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1728-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1729-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1731-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1732-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1764-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1770-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1773-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1774-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1775-7243",
        "nombre_actividad": "Reuniones virtuales"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1776-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1777-7243",
        "nombre_actividad": "Reuniones virtuales"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1799-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1800-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1801-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1813-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1814-7243",
        "nombre_actividad": "Reuniones virtuales"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1817-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1820-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1821-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1823-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1825-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1827-7243",
        "nombre_actividad": "Reuniones virtuales"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1843-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1845-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1849-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1881-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1882-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1883-7243",
        "nombre_actividad": "Reuniones virtuales"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1884-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1885-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1886-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1887-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1936-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1937-7243",
        "nombre_actividad": "Traslados"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1945-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1947-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1949-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1954-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1956-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1958-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1959-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1960-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1961-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1962-7243",
        "nombre_actividad": "Traslados"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1964-7243",
        "nombre_actividad": "Traslados"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1965-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1966-7243",
        "nombre_actividad": "Traslados"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1967-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1968-7243",
        "nombre_actividad": "Reuniones virtuales"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1969-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1970-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "1972-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "2033-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "2034-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "2035-7243",
        "nombre_actividad": "Reuniones virtuales"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "2036-7243",
        "nombre_actividad": "Asistencia administrativa"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "2039-7243",
        "nombre_actividad": "Otras"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "2040-7243",
        "nombre_actividad": "Reuniones virtuales"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "2041-7243",
        "nombre_actividad": "Reuniones virtuales"
    },
    {
        "nombre_usuario": "José Alejandro Mora",
        "id": "2042-7243",
        "nombre_actividad": "Otras"
    }
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
        "status": "planificada",
        "end": "2023-10-23T13:00:00",
        "title": "Cotizaciones",
        "color": "#F4D03F",
        "resourceId": "1438-7243",
        "start": "2023-10-23T8:00:00",
        "activity": "Cotización de servicio mayor para clarton, cotización de sensor de presión eh instalación en fehrer",
        "record_id": "6536bd6343bc63b328a4a90c",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "planificada",
        "end": "2023-10-24T13:00:00",
        "title": "Otras",
        "color": "#F4D03F",
        "resourceId": "1438-7243",
        "start": "2023-10-24T8:00:00",
        "activity": "Lectura de manual robapur 20",
        "record_id": "6536bd6343bc63b328a4a90c",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "planificada",
        "end": "2023-10-25T17:30:00",
        "title": "Otras",
        "color": "#F4D03F",
        "resourceId": "1438-7243",
        "start": "2023-10-25T8:00:00",
        "activity": "Reparación de pistola reka ",
        "record_id": "6536bd6343bc63b328a4a90c",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "planificada",
        "end": "2023-10-24T17:30:00",
        "title": "Otras",
        "color": "#F4D03F",
        "resourceId": "1438-7243",
        "start": "2023-10-24T14:00:00",
        "activity": "Limpieza a pistola reka ",
        "record_id": "6536bd6343bc63b328a4a90c",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "planificada",
        "end": "2023-10-23T17:30:00",
        "title": "Otras",
        "color": "#F4D03F",
        "resourceId": "1438-7243",
        "start": "2023-10-23T14:00:00",
        "activity": "Cotizaciones guala",
        "record_id": "6536bd6343bc63b328a4a90c",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "planificada",
        "end": "2023-10-30T14:00:00",
        "title": "Cotizaciones",
        "color": "#F4D03F",
        "resourceId": "1486-7243",
        "start": "2023-10-30T8:00:00",
        "activity": "Cotizar equipo para eson",
        "record_id": "653ff93e571d19b7f9ebd4f2",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "planificada",
        "end": "2023-10-30T17:30:00",
        "title": "Otras",
        "color": "#F4D03F",
        "resourceId": "1486-7243",
        "start": "2023-10-30T14:00:00",
        "activity": "Diagnóstico mangueras aluplastic",
        "record_id": "653ff93e571d19b7f9ebd4f2",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "planificada",
        "end": "2023-10-31T17:30:00",
        "title": "Cotizaciones",
        "color": "#F4D03F",
        "resourceId": "1486-7243",
        "start": "2023-10-31T8:00:00",
        "activity": "Seguimiento a cotizaciones ",
        "record_id": "653ff93e571d19b7f9ebd4f2",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "planificada",
        "end": "2023-11-01T17:30:00",
        "title": "Cotizaciones",
        "color": "#F4D03F",
        "resourceId": "1486-7243",
        "start": "2023-11-01T8:00:00",
        "activity": "Cotizar carrito se aluminio para el cliente ",
        "record_id": "653ff93e571d19b7f9ebd4f2",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "planificada",
        "end": "2023-11-02T17:30:00",
        "title": "Visita presencial",
        "color": "#F4D03F",
        "resourceId": "1486-7243",
        "start": "2023-11-02T8:00:00",
        "activity": "Visita a grammer san luis potosí ",
        "record_id": "653ff93e571d19b7f9ebd4f2",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "planificada",
        "end": "2023-11-06T9:00:00",
        "title": "Reuniones virtuales",
        "color": "#F4D03F",
        "resourceId": "1558-7243",
        "start": "2023-11-06T8:00:00",
        "activity": "Junta de gestores ",
        "record_id": "654906495529872e86a66593",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "planificada",
        "end": "2023-11-06T17:30:00",
        "title": "Otras",
        "color": "#F4D03F",
        "resourceId": "1558-7243",
        "start": "2023-11-06T9:00:00",
        "activity": "Actividades en taller, bomba kpc 16 ",
        "record_id": "654906495529872e86a66593",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "planificada",
        "end": "2023-11-07T17:30:00",
        "title": "Cotizaciones",
        "color": "#F4D03F",
        "resourceId": "1558-7243",
        "start": "2023-11-07T8:00:00",
        "activity": "Cotizaciones plasman ",
        "record_id": "654906495529872e86a66593",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "planificada",
        "end": "2023-11-08T17:30:00",
        "title": "Otras",
        "color": "#F4D03F",
        "resourceId": "1558-7243",
        "start": "2023-11-08T8:00:00",
        "activity": "Lectura de manual de instrucciones ",
        "record_id": "654906495529872e86a66593",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "planificada",
        "end": "2023-11-09T17:30:00",
        "title": "Asistencia administrativa",
        "color": "#F4D03F",
        "resourceId": "1558-7243",
        "start": "2023-11-09T8:00:00",
        "activity": "Lista clientes y prospectos ",
        "record_id": "654906495529872e86a66593",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "planificada",
        "end": "2023-11-10T17:30:00",
        "title": "Asistencia administrativa",
        "color": "#F4D03F",
        "resourceId": "1558-7243",
        "start": "2023-11-10T8:00:00",
        "activity": "Correos clientes",
        "record_id": "654906495529872e86a66593",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "planificada",
        "end": "2023-11-13T17:30:00",
        "title": "Asistencia administrativa",
        "color": "#F4D03F",
        "resourceId": "1687-7243",
        "start": "2023-11-13T8:00:00",
        "activity": "Revisión de correos y seguimiento de cotizaciones ",
        "record_id": "65523878e63e907b92e7b80e",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "planificada",
        "end": "2023-11-14T17:30:00",
        "title": "Asistencia administrativa",
        "color": "#F4D03F",
        "resourceId": "1687-7243",
        "start": "2023-11-14T8:00:00",
        "activity": "Elaboración de reportes, seguimiento de correos.",
        "record_id": "65523878e63e907b92e7b80e",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "planificada",
        "end": "2023-11-15T17:30:00",
        "title": "Otras",
        "color": "#F4D03F",
        "resourceId": "1687-7243",
        "start": "2023-11-15T8:00:00",
        "activity": "Armado de cabezal ",
        "record_id": "65523878e63e907b92e7b80e",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "planificada",
        "end": "2023-11-16T17:30:00",
        "title": "Otras",
        "color": "#F4D03F",
        "resourceId": "1687-7243",
        "start": "2023-11-16T8:00:00",
        "activity": "Instalación de cabezal ",
        "record_id": "65523878e63e907b92e7b80e",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "planificada",
        "end": "2023-11-17T17:30:00",
        "title": "Otras",
        "color": "#F4D03F",
        "resourceId": "1687-7243",
        "start": "2023-11-17T8:00:00",
        "activity": "Instalación de cabezal de laminado ",
        "record_id": "65523878e63e907b92e7b80e",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-10-23T10:30:00",
        "title": "Llamadas y asistencias telefonicas",
        "color": "#B7950B",
        "resourceId": "1429-7243",
        "evidencia": "https://f001.backblazeb2.com/file/app-linkaform/public-client-7243/110246/65208af70159b6bfff4c5aa4/117eeb4691464f5ea4d6a1fe6e19dc66.jpg",
        "start": "2023-10-23T9:30:00",
        "activity": "Se contactó con omar par el seguimiento...",
        "record_id": "6532c85ea44c6e39b242d3b1",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-10-23T15:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1443-7243",
        "evidencia": "",
        "start": "2023-10-23T14:00:00",
        "activity": "Salir a comer ",
        "record_id": "6536ec8fa35a53d9cb36bfac",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-10-24T14:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1449-7243",
        "evidencia": "",
        "start": "2023-10-24T13:00:00",
        "activity": "Salir por comida ",
        "record_id": "6538392565f43f9365f41040",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-10-24T17:30:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1452-7243",
        "evidencia": "https://f001.backblazeb2.com/file/app-linkaform/public-client-7243/110246/65208af70159b6bfff4c5aa4/22a78d81099b439e8bf2cb5212c32f87.jpg",
        "start": "2023-10-24T14:00:00",
        "activity": "Se recibe pistola reka que fue usada en pruebas, se realiza limpieza interna y externa, al finalizar realizamos pruebas corroborando un buen funcionamiento, se coloca en su caja y se guarda.",
        "record_id": "653934cdaff5c79231c2355f",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-10-27T14:00:00",
        "title": "Traslados",
        "color": "#B7950B",
        "resourceId": "1465-7243",
        "evidencia": "",
        "start": "2023-10-27T7:00:00",
        "activity": "Traslado de querétaro a puebla ",
        "record_id": "653fc3873011a5e1c2e7b842",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-10-27T18:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1467-7243",
        "evidencia": "https://f001.backblazeb2.com/file/app-linkaform/public-client-7243/110246/65208af70159b6bfff4c5aa4/afc4b8eb78c34c6db264692be6e56ff4.jpg",
        "start": "2023-10-27T14:00:00",
        "activity": "Se entrega equipo para pruebas con robot, se explica funcionamiento y se hacen pruebas manuales ",
        "record_id": "653fc4351fc19baf3bc87bb1",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-10-27T19:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1468-7243",
        "evidencia": "https://f001.backblazeb2.com/file/app-linkaform/public-client-7243/110246/65208af70159b6bfff4c5aa4/23aa690492e94ca9b9cf28160dcf10ce.jpg",
        "start": "2023-10-27T18:00:00",
        "activity": "Comer ",
        "record_id": "653fc4baf17f60646e9e6856",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-10-28T16:00:00",
        "title": "Traslados",
        "color": "#B7950B",
        "resourceId": "1485-7243",
        "evidencia": "",
        "start": "2023-10-28T10:00:00",
        "activity": "Traslado de puebla a querétaro ",
        "record_id": "653ff6544f333166e99755d1",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-10-30T14:00:00",
        "title": "Cotizaciones",
        "color": "#B7950B",
        "resourceId": "1493-7243",
        "evidencia": "",
        "start": "2023-10-30T8:00:00",
        "activity": "Se cotizo un equipo completo y pistola reka para eson tomando en cuenta la configuración necesaria.\nno. (1033,1034)",
        "record_id": "65411a0a483ed864539e6823",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-10-30T17:30:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1494-7243",
        "evidencia": "",
        "start": "2023-10-30T15:00:00",
        "activity": "Se habilita bomba de engranes para pruebas y pistola reka para reparación.",
        "record_id": "65411a5df8ace5a06b9e6829",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-10-30T15:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1496-7243",
        "evidencia": "",
        "start": "2023-10-30T14:00:00",
        "activity": "Salir por comida ",
        "record_id": "65411aaa0b491f73b4a664b5",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-10-31T10:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1498-7243",
        "evidencia": "",
        "start": "2023-10-31T8:00:00",
        "activity": "Elaboración de reportes de servicio y actividades ",
        "record_id": "65411b05f8ace5a06b9e6838",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-10-31T14:00:00",
        "title": "Cotizaciones",
        "color": "#B7950B",
        "resourceId": "1522-7243",
        "evidencia": "",
        "start": "2023-10-31T10:00:00",
        "activity": "Se redacta correo para plasman por servicio de mangueras y bomba.",
        "record_id": "65450dd437eb18a6569755a6",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-10-31T15:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1523-7243",
        "evidencia": "",
        "start": "2023-10-31T14:00:00",
        "activity": "Salir a comer ",
        "record_id": "65450e0dd8efc79101ebd4ca",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-10-31T17:30:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1524-7243",
        "evidencia": "",
        "start": "2023-10-31T15:00:00",
        "activity": "Se abre caja donde está el equipo, se revisan condiciones y se empieza a desmontar plato para enviarlo a tlaxcala.",
        "record_id": "6545115c5c1cf087f4e7b844",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-01T11:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1525-7243",
        "evidencia": "",
        "start": "2023-11-01T8:00:00",
        "activity": "Se desarma plato para envío a tlaxcala. se cambia de indicaciones y se arma plato para enviarlo.",
        "record_id": "6545121223fbf5d7719755e2",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-01T17:00:00",
        "title": "Traslados",
        "color": "#B7950B",
        "resourceId": "1529-7243",
        "evidencia": "https://f001.backblazeb2.com/file/app-linkaform/public-client-7243/110246/65208af70159b6bfff4c5aa4/84b1ae888dfe4cef8532cc0120ddf900.jpg",
        "start": "2023-11-01T11:00:00",
        "activity": "Traslado de las oficinas de querétaro a zwisstex tlaxcala, tráfico en carretera.",
        "record_id": "65451562a51a59ceeea664c0",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-01T20:00:00",
        "title": "Visita presencial",
        "color": "#B7950B",
        "resourceId": "1530-7243",
        "evidencia": "",
        "start": "2023-11-01T17:00:00",
        "activity": "Se entrega plato de robadrum 200 y se termina de armar",
        "record_id": "654515e3c804d0e0e6c87b5c",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-01T21:30:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1531-7243",
        "evidencia": "",
        "start": "2023-11-01T20:00:00",
        "activity": "Salir de planta zwisstex, comer, regresar a planta.",
        "record_id": "6545165eca1cd39702e7b8e2",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-01T23:59:00",
        "title": "Visita presencial",
        "color": "#B7950B",
        "resourceId": "1532-7243",
        "evidencia": "",
        "start": "2023-11-01T21:30:00",
        "activity": "Se ingresa a zwisstex para instalar el plato del robadrum 200",
        "record_id": "654516e6be618a9bc29e67e1",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-02T8:00:00",
        "title": "Visita presencial",
        "color": "#B7950B",
        "resourceId": "1533-7243",
        "evidencia": "",
        "start": "2023-11-02T0:00:00",
        "activity": "Se instala plato nuevo de robadrum 200, se hacen pruebas, retiramos y colocamos plato viejo reparado. se hacen pruebas y se confirma correcto funcionamiento.",
        "record_id": "654517b5a92d45e866e7b87e",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-02T17:30:00",
        "title": "Visita presencial",
        "color": "#B7950B",
        "resourceId": "1534-7243",
        "evidencia": "",
        "start": "2023-11-02T14:30:00",
        "activity": "Se recolecta plato de robadrum 200 nuevo. se retiran algunas piezas para dejarlas como refacciones al cliente.",
        "record_id": "654518ca5c1cf087f4e7b86b",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-02T22:30:00",
        "title": "Traslados",
        "color": "#B7950B",
        "resourceId": "1535-7243",
        "evidencia": "",
        "start": "2023-11-02T17:30:00",
        "activity": "Se viaja de zwisstex tlaxcala a las oficinas robatech querétaro.",
        "record_id": "654519c8d8efc79101ebd589",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-03T11:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1536-7243",
        "evidencia": "",
        "start": "2023-11-03T8:00:00",
        "activity": "Se registran actividades de la semana y se elaboran reportes pendientes de servicio ",
        "record_id": "65451a32e7f1b4c13897559d",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-03T17:30:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1549-7243",
        "evidencia": "",
        "start": "2023-11-03T11:00:00",
        "activity": "Se limpia bomba kpc 16 para cambio de sellos. cliente de acero.",
        "record_id": "6548ffa9f542fd5f669755b4",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-06T11:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1608-7243",
        "evidencia": "",
        "start": "2023-11-06T8:00:00",
        "activity": "Se continúa limpiando y reparando piezas de bomba para armado",
        "record_id": "654abc6f3e6db9c57aa664a6",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-06T18:40:00",
        "title": "Visita presencial",
        "color": "#B7950B",
        "resourceId": "1609-7243",
        "evidencia": "",
        "start": "2023-11-06T11:00:00",
        "activity": "Se visita cliente para revisar falla que presenta uno de sus equipos y se hace levantamiento para cotizar refacciones.",
        "record_id": "654abd7c5710ea9ac3c87b2e",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-07T17:30:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1610-7243",
        "evidencia": "",
        "start": "2023-11-07T8:00:00",
        "activity": "Se arma bomba, realizamos pruebas, presenta fallas, se procede a desarmar y armar nuevamente.",
        "record_id": "654abe4acd6bfb40cb975667",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-08T13:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1655-7243",
        "evidencia": "",
        "start": "2023-11-08T8:00:00",
        "activity": "Se busca equipo de taller con software key, se habilita para préstamo.",
        "record_id": "654e86d522917a6b87e7b8b5",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-08T17:00:00",
        "title": "Traslados",
        "color": "#B7950B",
        "resourceId": "1656-7243",
        "evidencia": "",
        "start": "2023-11-08T13:00:00",
        "activity": "Se realiza traslado de querétaro a toluca para instalación de equipo.",
        "record_id": "654e86faa4624254a3a664cb",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-08T23:59:00",
        "title": "Visita presencial",
        "color": "#B7950B",
        "resourceId": "1657-7243",
        "evidencia": "",
        "start": "2023-11-08T17:00:00",
        "activity": "Se inicia proceso de ingreso a planta eh instalación de equipo que se queda a préstamo. ",
        "record_id": "654e8733930fb40d28ebd4c9",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-10T5:00:00",
        "title": "Visita presencial",
        "color": "#B7950B",
        "resourceId": "1658-7243",
        "evidencia": "",
        "start": "2023-11-10T0:00:00",
        "activity": "Se finaliza la instalación, se realizan pruebas y se da una capacitación al personal para uso del equipo.",
        "record_id": "654e875b313dd6f389e7b826",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-09T6:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1659-7243",
        "evidencia": "",
        "start": "2023-11-09T5:00:00",
        "activity": "Comer ",
        "record_id": "654e87be5b8d06e2ce9756ef",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-09T6:50:00",
        "title": "Traslados",
        "color": "#B7950B",
        "resourceId": "1660-7243",
        "evidencia": "",
        "start": "2023-11-09T6:00:00",
        "activity": "Traslado de suandy a restaurante y de restaurante a hotel ",
        "record_id": "654e8839e673243de5c87b92",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-09T14:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1662-7243",
        "evidencia": "",
        "start": "2023-11-09T13:00:00",
        "activity": "Hora de comida ",
        "record_id": "654e88a1f54029b2c8c87b25",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-09T17:30:00",
        "title": "Visita presencial",
        "color": "#B7950B",
        "resourceId": "1663-7243",
        "evidencia": "",
        "start": "2023-11-09T14:00:00",
        "activity": "Se ingresa a planta suandy para entrega de documentación.",
        "record_id": "654e88bc447fb5121fa66508",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-09T22:00:00",
        "title": "Traslados",
        "color": "#B7950B",
        "resourceId": "1665-7243",
        "evidencia": "",
        "start": "2023-11-09T18:00:00",
        "activity": "Se realiza traslado de toluca suandy a querétaro ",
        "record_id": "654e88e2d288050dc897561e",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-09T23:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1666-7243",
        "evidencia": "",
        "start": "2023-11-09T22:00:00",
        "activity": "Hora de comida ",
        "record_id": "654e8938511b84f4a8ebd4fe",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-10T10:00:00",
        "title": "Asistencia administrativa",
        "color": "#B7950B",
        "resourceId": "1672-7243",
        "evidencia": "",
        "start": "2023-11-10T8:00:00",
        "activity": "",
        "record_id": "654e8a63eb5222e2abe7b857",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-10T13:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1673-7243",
        "evidencia": "",
        "start": "2023-11-10T10:00:00",
        "activity": "Se purga con cera limpiadora a 3 inyectores con pur y revisión de la kpc 16 para entrega final ",
        "record_id": "654e8aeda28002eceaebd517",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-10T14:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1674-7243",
        "evidencia": "",
        "start": "2023-11-10T13:00:00",
        "activity": "Reunión presencial con zamara. en otro horario pero con la misma duración. la hora la coloco para no hacer más reportes, respetando horarios de actividades.",
        "record_id": "654e8be25c0d7321479e691f",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-10T15:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1679-7243",
        "evidencia": "",
        "start": "2023-11-10T14:00:00",
        "activity": "Hora de comida ",
        "record_id": "655231c9c5084fdb1dc87b39",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-13T8:30:00",
        "title": "Asistencia administrativa",
        "color": "#B7950B",
        "resourceId": "1726-7243",
        "evidencia": "",
        "start": "2023-11-13T8:00:00",
        "activity": "Reviso los correos de la semana pasa que por falta de tiempo no revise.",
        "record_id": "6552afc60210b7b246ebd4ea",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-13T9:00:00",
        "title": "Reuniones virtuales",
        "color": "#B7950B",
        "resourceId": "1727-7243",
        "evidencia": "",
        "start": "2023-11-13T8:30:00",
        "activity": "Se toma junta semanal para visualizar resultados de la semana pasada ",
        "record_id": "6552b014e755623db5c87b1e",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-13T10:00:00",
        "title": "Asistencia administrativa",
        "color": "#B7950B",
        "resourceId": "1728-7243",
        "evidencia": "",
        "start": "2023-11-13T9:00:00",
        "activity": "Se revisan correos y se contestan los que estaban pendientes",
        "record_id": "6552b0cd783af4c43fe7b86b",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-13T14:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1729-7243",
        "evidencia": "",
        "start": "2023-11-13T10:00:00",
        "activity": "Se habilita aplicador manual ergo star para pruebas con cliente automotriz.",
        "record_id": "6552b116b01fada22fa6649f",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-13T15:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1731-7243",
        "evidencia": "",
        "start": "2023-11-13T14:00:00",
        "activity": "Comer ",
        "record_id": "6552b14b783af4c43fe7b876",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-13T17:30:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1732-7243",
        "evidencia": "",
        "start": "2023-11-13T15:00:00",
        "activity": "Se realizan pruebas con el aplicado habilitado, eligiendo la mejor boquilla para la aplicación.",
        "record_id": "6552b1920210b7b246ebd526",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-14T11:00:00",
        "title": "Asistencia administrativa",
        "color": "#B7950B",
        "resourceId": "1764-7243",
        "evidencia": "",
        "start": "2023-11-14T8:00:00",
        "activity": "Se realiza la lectura del manual de robapur 20 para captura de información",
        "record_id": "6554dba2a02f7954a0e7b878",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-14T14:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1770-7243",
        "evidencia": "",
        "start": "2023-11-14T11:00:00",
        "activity": "Se hace un listado de lo que se ocupa para habilitar equipo y se comienza la recuperación.",
        "record_id": "6554dcdd27eee35cc29755e6",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-14T15:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1773-7243",
        "evidencia": "",
        "start": "2023-11-14T14:00:00",
        "activity": "Hora de comida ",
        "record_id": "6554dd203456fd8952975650",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-14T16:30:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1774-7243",
        "evidencia": "",
        "start": "2023-11-14T15:00:00",
        "activity": "Se revisan tarjetas para conectar equipo y hacerlo funcionar.",
        "record_id": "6554dd7e0c53a52e7ea6651a",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-14T17:30:00",
        "title": "Reuniones virtuales",
        "color": "#B7950B",
        "resourceId": "1775-7243",
        "evidencia": "",
        "start": "2023-11-14T16:30:00",
        "activity": "Se hace junta para entrega de resultados de curso de ventas.",
        "record_id": "6554de13dacc8867fb9e6836",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-15T8:30:00",
        "title": "Asistencia administrativa",
        "color": "#B7950B",
        "resourceId": "1776-7243",
        "evidencia": "",
        "start": "2023-11-15T8:00:00",
        "activity": "Se realizan los reportes del día anterior para estar al día con actividades.",
        "record_id": "6554de72dacc8867fb9e683f",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-15T9:00:00",
        "title": "Reuniones virtuales",
        "color": "#B7950B",
        "resourceId": "1777-7243",
        "evidencia": "",
        "start": "2023-11-15T8:30:00",
        "activity": "Se hace reunión para lectura de libro.",
        "record_id": "6554df65851833f2e7e7b88f",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-15T14:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1799-7243",
        "evidencia": "",
        "start": "2023-11-15T9:00:00",
        "activity": "Se conecta lo faltante para encender equipo.\nse recoge el espacio de taller.",
        "record_id": "6556328e255a63e6629755b5",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-15T15:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1800-7243",
        "evidencia": "",
        "start": "2023-11-15T14:00:00",
        "activity": "Hora de comida ",
        "record_id": "655632dcb3b72188c3c87b02",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-15T17:30:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1801-7243",
        "evidencia": "",
        "start": "2023-11-15T15:00:00",
        "activity": "Se realizan pruebas con el robapur eliminando errores y se visita proveedor para cotizar una tapa presurizada de concept 30.",
        "record_id": "655634ffba11c713369e692d",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-16T8:30:00",
        "title": "Asistencia administrativa",
        "color": "#B7950B",
        "resourceId": "1813-7243",
        "evidencia": "",
        "start": "2023-11-16T8:00:00",
        "activity": "Se da seguimiento a correos nuevos.",
        "record_id": "655783be66ac6e918fb3c7f2",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-16T9:00:00",
        "title": "Reuniones virtuales",
        "color": "#B7950B",
        "resourceId": "1814-7243",
        "evidencia": "",
        "start": "2023-11-16T8:30:00",
        "activity": "Se toma junta diaria y se llenan reportes de actividades pendiente ",
        "record_id": "655784421704c0381addcd7b",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-16T11:00:00",
        "title": "Asistencia administrativa",
        "color": "#B7950B",
        "resourceId": "1817-7243",
        "evidencia": "",
        "start": "2023-11-16T9:00:00",
        "activity": "Elaboración de reportes y correos. revisión de reporte para habilitar robapur 2",
        "record_id": "6557856066ecccdb52b3c7c8",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-16T14:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1820-7243",
        "evidencia": "",
        "start": "2023-11-16T11:00:00",
        "activity": "Cambio de bobina y pruebas a sempre de color express ",
        "record_id": "655786589c8fd8233cccd0cc",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-16T15:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1821-7243",
        "evidencia": "",
        "start": "2023-11-16T14:00:00",
        "activity": "Hora de comida ",
        "record_id": "6557869bb10ade590937aa5c",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-16T17:30:00",
        "title": "Asistencia administrativa",
        "color": "#B7950B",
        "resourceId": "1823-7243",
        "evidencia": "",
        "start": "2023-11-16T15:00:00",
        "activity": "Elaboración de reporte de servicio de sempre, continuación de reportes robapur ",
        "record_id": "6557875637ff7c1d3cb3f49f",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-17T8:30:00",
        "title": "Asistencia administrativa",
        "color": "#B7950B",
        "resourceId": "1825-7243",
        "evidencia": "",
        "start": "2023-11-17T8:00:00",
        "activity": "Revisión y seguimos de correos",
        "record_id": "6557879ac8d4894527778edf",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-17T9:00:00",
        "title": "Reuniones virtuales",
        "color": "#B7950B",
        "resourceId": "1827-7243",
        "evidencia": "",
        "start": "2023-11-17T8:30:00",
        "activity": "Se toma junta para espacio de lectura y se comentan puntos relevantes.",
        "record_id": "655787f390591e2be1ddce1f",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-17T14:00:00",
        "title": "Asistencia administrativa",
        "color": "#B7950B",
        "resourceId": "1843-7243",
        "evidencia": "",
        "start": "2023-11-17T9:00:00",
        "activity": "Elaboración de reportes de refacciones a solicitar, 2 equipos y 1 carrito.",
        "record_id": "6557f131c9b14fcf25ddcd18",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-17T15:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1845-7243",
        "evidencia": "",
        "start": "2023-11-17T14:00:00",
        "activity": "Hora de comida ",
        "record_id": "6557f15ddfb5d19cb7b3f4a0",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-17T17:30:00",
        "title": "Asistencia administrativa",
        "color": "#B7950B",
        "resourceId": "1849-7243",
        "evidencia": "",
        "start": "2023-11-17T15:00:00",
        "activity": "Seguimiento de reportes, listos para enviarse ",
        "record_id": "6557f22bb42a0de91cddcd1f",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-20T17:30:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1881-7243",
        "evidencia": "",
        "start": "2023-11-20T8:00:00",
        "activity": "N/a",
        "record_id": "655d35b4b16d7879c0812fe9",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-21T8:30:00",
        "title": "Asistencia administrativa",
        "color": "#B7950B",
        "resourceId": "1882-7243",
        "evidencia": "",
        "start": "2023-11-21T8:00:00",
        "activity": "Se revisan correos pendientes ",
        "record_id": "655d35f2b05b649e7544cd11",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-21T9:00:00",
        "title": "Reuniones virtuales",
        "color": "#B7950B",
        "resourceId": "1883-7243",
        "evidencia": "",
        "start": "2023-11-21T8:30:00",
        "activity": "Se toma espacio de lectura ",
        "record_id": "655d36304d22c90b6f812ffe",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-21T13:00:00",
        "title": "Asistencia administrativa",
        "color": "#B7950B",
        "resourceId": "1884-7243",
        "evidencia": "",
        "start": "2023-11-21T9:00:00",
        "activity": "Se mandan correos pendientes y se da seguimiento",
        "record_id": "655d366c7dc8a1de0cd7ebe7",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-21T14:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1885-7243",
        "evidencia": "",
        "start": "2023-11-21T13:00:00",
        "activity": "Hora de comida ",
        "record_id": "655d369b5cd483100944ccac",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-21T16:30:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1886-7243",
        "evidencia": "",
        "start": "2023-11-21T14:00:00",
        "activity": "Se instala power supply en equipo de guala, se conecta variador de robapur 20.",
        "record_id": "655d36e8019608c48b1b6aa5",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-21T17:30:00",
        "title": "Asistencia administrativa",
        "color": "#B7950B",
        "resourceId": "1887-7243",
        "evidencia": "",
        "start": "2023-11-21T16:30:00",
        "activity": "Llenado de reportes ",
        "record_id": "655d3723c11242672b843fe1",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-22T9:30:00",
        "title": "Asistencia administrativa",
        "color": "#B7950B",
        "resourceId": "1936-7243",
        "evidencia": "",
        "start": "2023-11-22T8:00:00",
        "activity": "Se revisan correos nuevos, se toma tiempo de lectura y se hace solicitud de gastos para ir a pagar el material del carrito de grammer ",
        "record_id": "655fc90422f760398636a6e3",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-22T10:30:00",
        "title": "Traslados",
        "color": "#B7950B",
        "resourceId": "1937-7243",
        "evidencia": "",
        "start": "2023-11-22T9:30:00",
        "activity": "Se hace traslado a ferretería para solicitar el material, se hace el pago y se regresa a la oficina.",
        "record_id": "655fc9d1865e61ccc7560b79",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-22T14:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1945-7243",
        "evidencia": "",
        "start": "2023-11-22T10:30:00",
        "activity": "El compañero eduardo solicita una tarjeta de concept a con una lista de parámetros cargados. se busca la tarjeta y se cargan parámetros. fue más tardado de lo normal porque la tarjeta tenía otra versión del software al manual que está en el portal.",
        "record_id": "655fcae3f4e2e23a87560b9d",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-22T14:30:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1947-7243",
        "evidencia": "",
        "start": "2023-11-22T14:00:00",
        "activity": "Se recibe material para armado de carrito de grammer.",
        "record_id": "655fcb6e865e61ccc7560b94",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-22T15:30:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1949-7243",
        "evidencia": "",
        "start": "2023-11-22T14:30:00",
        "activity": "Hora de comida ",
        "record_id": "655fcb9d865e61ccc7560ba2",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-22T16:30:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1954-7243",
        "evidencia": "",
        "start": "2023-11-22T15:30:00",
        "activity": "Se desmonta tarjeta de concept a, se coloca en una caja y se entrega para su envío.",
        "record_id": "655fcc2c08579b6429560b8c",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-22T17:30:00",
        "title": "Asistencia administrativa",
        "color": "#B7950B",
        "resourceId": "1956-7243",
        "evidencia": "",
        "start": "2023-11-22T16:30:00",
        "activity": "Se estructuran correos para evidenciar la entrega de material, se da seguimiento a correos nuevos.",
        "record_id": "655fcc7d865e61ccc7560ba9",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-23T9:00:00",
        "title": "Asistencia administrativa",
        "color": "#B7950B",
        "resourceId": "1958-7243",
        "evidencia": "",
        "start": "2023-11-23T8:00:00",
        "activity": "Se revisan correos nuevos, se da seguimiento y se toma tiempo de lectura.",
        "record_id": "655fcd747b6038ca89560bdb",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-23T10:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1959-7243",
        "evidencia": "",
        "start": "2023-11-23T9:00:00",
        "activity": "Se retiran fusibles de robadrum 200 para visualizar el amperaje al que trabajan, se manda la información a eduardo quien lo solicito y se vuelven a colocar en el equipo, esperando respuesta del compañero.",
        "record_id": "655fce0a03ee8ca472560be2",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-23T10:30:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1960-7243",
        "evidencia": "",
        "start": "2023-11-23T10:00:00",
        "activity": "Se descargan refacciones de la camioneta y material",
        "record_id": "655fce85865e61ccc7560d25",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-23T11:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1961-7243",
        "evidencia": "",
        "start": "2023-11-23T10:30:00",
        "activity": "Se colocan cinchos a la tapa de la camioneta el cual estaba tirado.",
        "record_id": "655fd098a58997ab6750d3ea",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-23T11:30:00",
        "title": "Traslados",
        "color": "#B7950B",
        "resourceId": "1962-7243",
        "evidencia": "",
        "start": "2023-11-23T11:00:00",
        "activity": "Se realiza traslado de la oficina a la agencia vw para dejar la camioneta a reparación ",
        "record_id": "655fd17296cc6ee14744c50a",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-23T12:30:00",
        "title": "Traslados",
        "color": "#B7950B",
        "resourceId": "1964-7243",
        "evidencia": "",
        "start": "2023-11-23T11:30:00",
        "activity": "Se realiza traslado a terminal de autobuses para hacer 2 envíos.",
        "record_id": "655fd2170f17ac3c1cf660ab",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-23T13:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1965-7243",
        "evidencia": "",
        "start": "2023-11-23T12:30:00",
        "activity": "Se entregan 2 paquetes para envío, se hace el pago y llenado de datos.",
        "record_id": "655fd2636e6832430850d3cd",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-23T14:00:00",
        "title": "Traslados",
        "color": "#B7950B",
        "resourceId": "1966-7243",
        "evidencia": "",
        "start": "2023-11-23T13:00:00",
        "activity": "Se realiza traslado de la terminal de autobuses a la oficina, se demora mucho al no tener dinero para la caseta.",
        "record_id": "655fd335b9923a852298b3ac",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-23T15:00:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1967-7243",
        "evidencia": "",
        "start": "2023-11-23T14:00:00",
        "activity": "Hora de comida ",
        "record_id": "655fd3aafe50c2d20998b43a",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-23T16:00:00",
        "title": "Reuniones virtuales",
        "color": "#B7950B",
        "resourceId": "1968-7243",
        "evidencia": "",
        "start": "2023-11-23T15:00:00",
        "activity": "Se toma junta para nuevos modelos robatech ",
        "record_id": "655fd49e2a898975f036a641",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-23T17:00:00",
        "title": "Asistencia administrativa",
        "color": "#B7950B",
        "resourceId": "1969-7243",
        "evidencia": "",
        "start": "2023-11-23T16:00:00",
        "activity": "Se realiza llenado de reportes.",
        "record_id": "655fd584019f172115f660c7",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-23T17:30:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1970-7243",
        "evidencia": "",
        "start": "2023-11-23T8:00:00",
        "activity": "Se corta y ensambla carrito para grammer ",
        "record_id": "655fd64c48b36b7b49f66145",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-23T17:30:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "1972-7243",
        "evidencia": "",
        "start": "2023-11-23T17:00:00",
        "activity": "Se apoya a compañero kevyn para diagnostico de bomba kpc 16 ",
        "record_id": "655fdb7f7c0691685a560c9d",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-27T16:30:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "2033-7243",
        "evidencia": "",
        "start": "2023-11-27T9:00:00",
        "activity": "Se revisan equipos de taller para habilitar o desmantelar",
        "record_id": "6565198575b44cb701a2b4df",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-27T8:30:00",
        "title": "Asistencia administrativa",
        "color": "#B7950B",
        "resourceId": "2034-7243",
        "evidencia": "",
        "start": "2023-11-27T8:00:00",
        "activity": "Revisión de correos pendientes ",
        "record_id": "656519d43ecdd3279ba2b4ea",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-27T9:00:00",
        "title": "Reuniones virtuales",
        "color": "#B7950B",
        "resourceId": "2035-7243",
        "evidencia": "",
        "start": "2023-11-27T8:30:00",
        "activity": "Se toma el tiempo de lectura y entregan resultados de kpis",
        "record_id": "65651a2dca4776536aa2b520",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-27T17:30:00",
        "title": "Asistencia administrativa",
        "color": "#B7950B",
        "resourceId": "2036-7243",
        "evidencia": "",
        "start": "2023-11-27T16:30:00",
        "activity": "Elaboración de reportes de actividades y diagnósticos",
        "record_id": "65651a6308c257138ba2b4e4",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-28T17:30:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "2039-7243",
        "evidencia": "",
        "start": "2023-11-28T9:00:00",
        "activity": "Seguimiento de equipos de taller ",
        "record_id": "65651ad0ab1e820593a2b53d",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-28T9:00:00",
        "title": "Reuniones virtuales",
        "color": "#B7950B",
        "resourceId": "2040-7243",
        "evidencia": "",
        "start": "2023-11-28T8:00:00",
        "activity": "Tiempo de lectura y correos ",
        "record_id": "65651b7bfd798d2fd4a2b4cb",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-29T9:00:00",
        "title": "Reuniones virtuales",
        "color": "#B7950B",
        "resourceId": "2041-7243",
        "evidencia": "",
        "start": "2023-11-29T8:00:00",
        "activity": "Se toma hora lectura y seguimos de correos.",
        "record_id": "65651c013ecdd3279ba2b546",
        "gestor": "José Alejandro Mora"
    },
    {
        "status": "realizada",
        "end": "2023-11-29T17:30:00",
        "title": "Otras",
        "color": "#B7950B",
        "resourceId": "2042-7243",
        "evidencia": "",
        "start": "2023-11-29T9:00:00",
        "activity": "Acomodo de taller, seguimiento ",
        "record_id": "65651c3319872dac88a2b4ff",
        "gestor": "José Alejandro Mora"
    }
]