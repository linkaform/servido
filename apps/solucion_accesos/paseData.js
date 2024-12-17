const columsListaPases= [
    { title:"Nombre", field:'nombre',hozAlign:"left",headerFilter:'input',
          formatter: (cell, formatterParams) => {
               let data = cell.getData();
               if(data.foto==undefined){
                    data.foto=[{file_name: "notfound", file_url: "https://www.smarttools.com.mx/wp-content/uploads/2019/05/imagen-no-disponible.png"}]
               }
               let foto= data.foto.length>0 ? data.foto[0].file_url : "https://www.smarttools.com.mx/wp-content/uploads/2019/05/imagen-no-disponible.png"
               let id = cell.getData().id ? cell.getData().id : 0;
               let divActions = '<div id="inf'+data.folio +'"><div class="d-flex flex-row" id="listOfGuards">';
               divActions+= '<div col-sm-12 col-md-12 col-lg-6 col-xl-6> <img id="imgGuardiaApoyo" height="60" width="60" src="'
               + foto + '"> </div > <div col-sm-12 col-md-12 col-lg-6 col-xl-6 class="flex-column ms-3"> <div> <b>'
               + data.nombre +'</b> </div></div>';
               divActions += '</div> </div>';
               return divActions;
          },
     }
];

//FUNCION para dibujar las tablas con opcion select de la pagina y guardar su instancia en el obj tables
function drawTableSelect(id, columnsData, tableData, height, select){
    let  table = new Tabulator("#" + id, {
        layout:"fitDataStretch",
        height:height,
        data:tableData,
        textDirection:"ltr",
        columns:columnsData,
        pagination:true, 
        selectableRows:select,
        paginationSize:40,
        placeholder: "No hay registros disponibles", 
    });
    tables[id]=table;
}