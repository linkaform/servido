let dataTableNotas = [];
  /*{folio:1, status: 'Abierto', name: 'Juan Pérez', fechaHoraApertura: '05-12-2024 09:30', fechaHoraCierre: '05-12-2024 09:30',  note: 'Este es un registro de ejemplo',fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Sin comentarios' },
  {folio:2, status: 'Cerrado', name: 'María Rodríguez', fechaHoraApertura: '05-10-2024 14:45', fechaHoraCierre: '05-10-2024 14:45', note: 'Otro registro para ilustrar', fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Se resolvió satisfactoriamente' },
  {folio:3, status: 'Abierto', name: 'Pedro Gómez', fechaHoraApertura: '05-12-2024 11:20', fechaHoraCierre: '05-12-2024 11:20',  note: 'Tercer registro',fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'En proceso' },
  {folio:4, status: 'Cerrado', name: 'Ana López', fechaHoraApertura: '05-08-2024 08:00', fechaHoraCierre: '05-08-2024 08:00', note: 'Cuarto registro',fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Cerrado por falta de acción' },
  {folio:5, status: 'Abierto', name: 'David Martínez', fechaHoraApertura: '05-10-2024 15:10', fechaHoraCierre: '05-03-2024 15:10',  note: 'Quinto registro',fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Requiere atención urgente' },
  {folio:6, status: 'Cerrado', name: 'Laura Ramírez', fechaHoraApertura: '05-09-2024 10:30', fechaHoraCierre: '05-09-2024 10:30',  note: 'Sexto registro', fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Resuelto con éxito' },
  {folio:7, status: 'Abierto', name: 'Carlos Sánchez', fechaHoraApertura: '05-11-2024 16:50', fechaHoraCierre: '05-11-2024 16:50', note: 'Séptimo registro', fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'En espera de confirmación' },
  {folio:8, status: 'Cerrado', name: 'Elena García', fechaHoraApertura: '05-07-2024 12:15', fechaHoraCierre: '05-07-2024 12:15',  note: 'Octavo registro',  fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Cerrado por duplicidad' },
  {folio:9, status: 'Abierto', name: 'Sofía Hernández', fechaHoraApertura: '05-11-2024 09:00', fechaHoraCierre: '05-11-2024 09:00',  note: 'Noveno registro', fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Pendiente de revisión'} ,
  {folio:10, status: 'Cerrado', name: 'Mario Castillo', fechaHoraApertura: '05-06-2024 13:40', fechaHoraCierre: '05-06-2024 13:40',  note: 'Décimo registro', fotos:["https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1409/wavebreakmediamicro140906631/31351694-almac%C3%A9n-equipo-de-trabajo-durante-el-per%C3%ADodo-de-ocupados-en-un-gran-almac%C3%A9n.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchwjNLzL2V8JAcvRxxZbLmNc7cisMCMQkSwRe-1OSkQ&s"], archivos:["archivo1.pdf", "archivo2.pdf"], comentarios: 'Resuelto por el equipo de soporte' }*/

const columnsTableNotas = [
	{ title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:110,
		formatter: (cell, formatterParams) => {
			//----Button Trash
			let data = cell.getData();
			let folio = cell.getData().folio ? cell.getData().folio : 0;
			let divActions = '<div class="row d-flex">';
			divActions += `<button class="btn-table-bitacora" onClick="cerrarNotaAlert('${data.created_by_name}', '${data.note}','${folio}','${data.note_status}')"><i class="fa-regular fa-circle-check"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="verNotasAlert('${folio}')" ><i class="fa-regular fa-eye"></i></button>`;
			divActions += `<button class="btn-table-bitacora" onClick="editarNotaCargarInfo('${folio}', '${data.note_status}','${data.note_open_date}',
            '${data.note_close_date}', '${data.note}', '${data.note_comments}')"><i class="fa-regular fa-edit"></i></button>`;
			//divActions += `<button class="btn-table-bitacora" onClick="alertEliminarNota('${folio}')"><i class="fa-solid fa-trash" ></i></button>`;
			divActions += '</div>';
			return divActions;
		},
	},
	{ title:"Folio", field:'folio',hozAlign:"left",tooltip:true,headerFilter:true,width:100},
	{ title:"Empleado", field:'created_by_name',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Apertura", field:'note_open_date',hozAlign:"left",headerFilter:"date", headerFilterFunc:dateFilter, headerFilterParams:{ min: new Date(""), max: new Date("") }},
	{ title:"Cierre", field:'note_close_date',hozAlign:"left",headerFilter:"date", headerFilterFunc:dateFilter, headerFilterParams:{ min: new Date(""), max: new Date("") }},
	{ title:"Nota", field:'note',hozAlign:"left",headerFilter:true,width:330},
	{ title:"Archivo", field:'note_file',hozAlign:"left",headerFilter:true,width:250,
        formatter: function(cell) {
                let data = cell.getData();
                let link=""
	            if(data.note_file.length>0){
	            	link= `<a href="${data.note_file[0].file_url}" target="_blank">${data.note_file[0].file_name}</a>`;
	            }else{
	            	link=""
	            }
                return link; // Mostrar solo el primer nombre del array
            }},
	{ title:"Fotografia", field:'note_pic',hozAlign:"left",headerFilter:true,width:250,
            formatter: function(cell) {
		            let data = cell.getData();
		            let img=""
		            if(data.note_pic.length>0){
		            	img= `<img src="${data.note_pic[0].file_url}" alt="Imagen" style="width:120px;height:120px;" class="img-cell"/>`;
		            }else{
		            	img=""
		            }
		            return img;
		        }},
	{ title:"Comentarios", field:'note_comments',hozAlign:"left",headerFilter:true,width:290,
          formatter: function(cell) {
          		let comment=""
                let data = cell.getData();
                if(data.note_comments.length>0){
                	if(data.note_comments[0].hasOwnProperty(["6647fb38da07bf430e273ea2"])){
                		comment= data.note_comments[0]["6647fb38da07bf430e273ea2"]
                	}else{
                		comment= data.note_comments[0]
                	}
                }
                return comment
          }},
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
	    placeholder: "No hay registros disponibles", 
	});
	tables[id]=table;
}