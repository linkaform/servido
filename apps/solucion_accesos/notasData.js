let dataTableListNotas = [ { status: 'abierta', name: 'Juan Pérez', fechaHoraApertura: '2024-05-14 09:30', fechaHoraCierre: '2024-05-14 09:30',  note: 'Este es un registro de ejemplo',folio:1, fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Sin comentarios' },
  { status: 'Cerrada', name: 'María Rodríguez', fechaHoraApertura: '2024-05-10 14:45', fechaHoraCierre: '2024-05-10 14:45', note: 'Otro registro para ilustrar',folio:2, fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Se resolvió satisfactoriamente' },
  { status: 'Abierta', name: 'Pedro Gómez', fechaHoraApertura: '2024-05-12 11:20', fechaHoraCierre: '2024-05-12 11:20',  note: 'Tercer registro',folio:3,fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'En proceso' },
  { status: 'Cerrada', name: 'Ana López', fechaHoraApertura: '2024-05-08 08:00', fechaHoraCierre: '2024-05-08 08:00', note: 'Cuarto registro',folio:4,fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Cerrada por falta de acción' },
  { status: 'Abierta', name: 'David Martínez', fechaHoraApertura: '2024-05-13 15:10', fechaHoraCierre: '2024-05-13 15:10',  note: 'Quinto registro',folio:5,fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Requiere atención urgente' },
  { status: 'Cerrada', name: 'Laura Ramírez', fechaHoraApertura: '2024-05-09 10:30', fechaHoraCierre: '2024-05-09 10:30',  note: 'Sexto registro',folio:6, fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Resuelto con éxito' },
  { status: 'Abierta', name: 'Carlos Sánchez', fechaHoraApertura: '2024-05-11 16:50', fechaHoraCierre: '2024-05-11 16:50', note: 'Séptimo registro',folio:7, fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'En espera de confirmación' },
  { status: 'Cerrada', name: 'Elena García', fechaHoraApertura: '2024-05-07 12:15', fechaHoraCierre: '2024-05-07 12:15',  note: 'Octavo registro',folio:8,  fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Cerrada por duplicidad' },
  { status: 'Abierta', name: 'Sofía Hernández', fechaHoraApertura: '2024-05-15 09:00', fechaHoraCierre: '2024-05-15 09:00',  note: 'Noveno registro',folio:9, fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Pendiente de revisión' },
  { status: 'Cerrada', name: 'Mario Castillo', fechaHoraApertura: '2024-05-06 13:40', fechaHoraCierre: '2024-05-06 13:40',  note: 'Décimo registro',folio:10, fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Resuelto por el equipo de soporte' }];

const columnsTableListNotas = [
	{ title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:180,
		formatter: (cell, formatterParams) => {
			//----Button Trash
			let data = cell.getData();
			let folio = cell.getData().folio ? cell.getData().folio : 0;
			let divActions = '<div class="row d-flex">';
			divActions += `<button class="btn-table-bitacora" onClick="cerrarNotaAlert('${data.name}', '${data.note}', ${folio},'${data.status}')"><i class="fa-regular fa-circle-check"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="verNotasAlert('${data.name}', '${data.note}', ${folio}, '${data.status}', '${data.fotos}', '${data.archivos}')" ><i class="fa-regular fa-eye"></i></button>`;
			divActions += `<button class="btn-table-bitacora" data-bs-toggle="modal" data-bs-target="#editarNotasModal" id="buttonEditarNotas"  ><i class="fa-regular fa-edit"></i></button>`;
			divActions += '</div>';
			return divActions;
		},
	},
	{ title:"Estatus", field:'status',hozAlign:"left",headerFilter:true,width:100},
	{ title:"Empleado", field:'name',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Fecha y Hora apertura", field:'fechaHoraApertura',hozAlign:"left",headerFilter:true,width:150},
	{ title:"Fecha y Hora cierre", field:'fechaHoraCierre',hozAlign:"left",headerFilter:true,width:150},
	{ title:"Nota", field:'note',hozAlign:"left",headerFilter:true,width:330},
	{ title:"Archivo", field:'archivo',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Fotografia", field:'fotografia',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Comentarios", field:'comentarios',hozAlign:"left",headerFilter:true,width:290},
];



function drawTableNotas(id, columnsData, tableData, height){
    var  table = new Tabulator("#" + id, {
	    layout:"fitDataStretch",
	    height:height,
	    data:tableData,
	    textDirection:"ltr",
	    columns:columnsData,
	    pagination:true, 
	    paginationSize:40,
	});
	tables[id]=table;
}