let dataTableListNotas = [ { estatus: 'abierto', empleado: 'Juan Pérez', fechaHoraApertura: '2024-05-14 09:30',  nota: 'Este es un registro de ejemplo', archivo: 'https://ejemplo.com/archivo1.pdf', fotografia: 'https://ejemplo.com/foto1.jpg', comentarios: 'Sin comentarios' },
  { estatus: 'cerrado', empleado: 'María Rodríguez', fechaHoraApertura: '2024-05-10 14:45', nota: 'Otro registro para ilustrar', archivo: 'https://ejemplo.com/archivo2.pdf', fotografia: 'https://ejemplo.com/foto2.jpg', comentarios: 'Se resolvió satisfactoriamente' },
  { estatus: 'abierto', empleado: 'Pedro Gómez', fechaHoraApertura: '2024-05-12 11:20',  nota: 'Tercer registro', archivo: 'https://ejemplo.com/archivo3.pdf', fotografia: 'https://ejemplo.com/foto3.jpg', comentarios: 'En proceso' },
  { estatus: 'cerrado', empleado: 'Ana López', fechaHoraApertura: '2024-05-08 08:00', nota: 'Cuarto registro', archivo: 'https://ejemplo.com/archivo4.pdf', fotografia: 'https://ejemplo.com/foto4.jpg', comentarios: 'Cerrado por falta de acción' },
  { estatus: 'abierto', empleado: 'David Martínez', fechaHoraApertura: '2024-05-13 15:10',  nota: 'Quinto registro', archivo: 'https://ejemplo.com/archivo5.pdf', fotografia: 'https://ejemplo.com/foto5.jpg', comentarios: 'Requiere atención urgente' },
  { estatus: 'cerrado', empleado: 'Laura Ramírez', fechaHoraApertura: '2024-05-09 10:30',  nota: 'Sexto registro', archivo: 'https://ejemplo.com/archivo6.pdf', fotografia: 'https://ejemplo.com/foto6.jpg', comentarios: 'Resuelto con éxito' },
  { estatus: 'abierto', empleado: 'Carlos Sánchez', fechaHoraApertura: '2024-05-11 16:50', nota: 'Séptimo registro', archivo: 'https://ejemplo.com/archivo7.pdf', fotografia: 'https://ejemplo.com/foto7.jpg', comentarios: 'En espera de confirmación' },
  { estatus: 'cerrado', empleado: 'Elena García', fechaHoraApertura: '2024-05-07 12:15',  nota: 'Octavo registro', archivo: 'https://ejemplo.com/archivo8.pdf', fotografia: 'https://ejemplo.com/foto8.jpg', comentarios: 'Cerrado por duplicidad' },
  { estatus: 'abierto', empleado: 'Sofía Hernández', fechaHoraApertura: '2024-05-15 09:00',  nota: 'Noveno registro', archivo: 'https://ejemplo.com/archivo9.pdf', fotografia: 'https://ejemplo.com/foto9.jpg', comentarios: 'Pendiente de revisión' },
  { estatus: 'cerrado', empleado: 'Mario Castillo', fechaHoraApertura: '2024-05-06 13:40',  nota: 'Décimo registro', archivo: 'https://ejemplo.com/archivo10.pdf', fotografia: 'https://ejemplo.com/foto10.jpg', comentarios: 'Resuelto por el equipo de soporte' }];

const columnsTableListNotas = [
	{ title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:180,
		formatter: (cell, formatterParams) => {
			//----Button Trash
			let folio = cell.getData().folio ? cell.getData().folio : 0;
			let divActions = '<div class="row d-flex">';
			divActions += `<button class="btn-table-bitacora" onClick="setModal('Tools',${folio})"><i class="fa-regular fa-circle-check"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="setModal('Cars',${folio})" ><i class="fa-regular fa-eye"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="setModal('Data',${folio})" ><i class="fa-regular fa-edit"></i></button>`;
			divActions += '</div>';
			return divActions;
			//`<button  class="btn-table-bitacora" onClick="setModal('Tools',${folio})"><i class="fa-solid fa-car"></i></button> `;
		},
	},
	{ title:"Estatus", field:'status',hozAlign:"left",headerFilter:true,width:50},
	{ title:"Empleado", field:'empleado',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Fecha y Hora apertura", field:'fechaHoraApertura',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Nota", field:'nota',hozAlign:"left",headerFilter:true,width:330},
	{ title:"Archivo", field:'archivo',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Fotografia", field:'fotografia',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Comentarios", field:'comentarios',hozAlign:"left",headerFilter:true,width:290},
];




window.onload = function(){
    setValueUserLocation('portal_notas');
    let user = getCookie("userId");
    let jw = getCookie("userJwt");
    console.log("HERLLO", user, jw);
    if(user !='' && jw!=''){
    	drawTable('tableListNotas',columnsTableListNotas, dataTableListNotas );
    } else{
		redirectionUrl('login',false);
	}

}



//---Close Sesión
function setCloseSession(argument) {
	closeSession();
	redirectionUrl('login',false);
}