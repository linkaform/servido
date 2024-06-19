let dataTableListNotas = [ { status: 'Abierto', name: 'Juan Pérez', fechaHoraApertura: '05-12-2024 09:30', fechaHoraCierre: '05-12-2024 09:30',  note: 'Este es un registro de ejemplo',folio:1, fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Sin comentarios' },
  { status: 'Cerrado', name: 'María Rodríguez', fechaHoraApertura: '05-10-2024 14:45', fechaHoraCierre: '05-10-2024 14:45', note: 'Otro registro para ilustrar',folio:2, fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Se resolvió satisfactoriamente' },
  { status: 'Abierto', name: 'Pedro Gómez', fechaHoraApertura: '05-12-2024 11:20', fechaHoraCierre: '05-12-2024 11:20',  note: 'Tercer registro',folio:3,fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'En proceso' },
  { status: 'Cerrado', name: 'Ana López', fechaHoraApertura: '05-08-2024 08:00', fechaHoraCierre: '05-08-2024 08:00', note: 'Cuarto registro',folio:4,fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Cerrado por falta de acción' },
  { status: 'Abierto', name: 'David Martínez', fechaHoraApertura: '05-10-2024 15:10', fechaHoraCierre: '05-03-2024 15:10',  note: 'Quinto registro',folio:5,fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Requiere atención urgente' },
  { status: 'Cerrado', name: 'Laura Ramírez', fechaHoraApertura: '05-09-2024 10:30', fechaHoraCierre: '05-09-2024 10:30',  note: 'Sexto registro',folio:6, fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Resuelto con éxito' },
  { status: 'Abierto', name: 'Carlos Sánchez', fechaHoraApertura: '05-11-2024 16:50', fechaHoraCierre: '05-11-2024 16:50', note: 'Séptimo registro',folio:7, fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'En espera de confirmación' },
  { status: 'Cerrado', name: 'Elena García', fechaHoraApertura: '05-07-2024 12:15', fechaHoraCierre: '05-07-2024 12:15',  note: 'Octavo registro',folio:8,  fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Cerrado por duplicidad' },
  { status: 'Abierto', name: 'Sofía Hernández', fechaHoraApertura: '05-11-2024 09:00', fechaHoraCierre: '05-11-2024 09:00',  note: 'Noveno registro',folio:9, fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Pendiente de revisión'} ,
  { status: 'Cerrado', name: 'Mario Castillo', fechaHoraApertura: '05-06-2024 13:40', fechaHoraCierre: '05-06-2024 13:40',  note: 'Décimo registro',folio:10, fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Resuelto por el equipo de soporte' }];

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
	{ title:"Estatus", field:'status',hozAlign:"left",tooltip:true,headerFilter:true,width:100},
	{ title:"Empleado", field:'name',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Apertura", field:'fechaHoraApertura',hozAlign:"left",headerFilter:"date", headerFilterFunc:dateFilter, headerFilterParams:{ min: new Date(""), max: new Date("") }},
	{ title:"Cierre", field:'fechaHoraCierre',hozAlign:"left",headerFilter:"date", headerFilterFunc:dateFilter, headerFilterParams:{ min: new Date(""), max: new Date("") }},
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