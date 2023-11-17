// Reporte Production Forscast
// Librerias: Chart.js

let us = null;
let usTy = null;
let jw = null;
let userId = null;
let userJwt = null;
let userName = null;
let userParentId = null;
let scriptId = null;

$('#divOptions').hide();
$('#title_report').hide();
$('.title_tables').hide();
hideElement("title_demo");
hideElement("firstParameters");
hideElement("firstElement");
hideElement("secondElement");
hideElement("filter_date")

window.onload = function(){
  var qs = urlParamstoJson();
  var formNode = document.getElementById("appCont");
	for(var key in qs){
    if (key === 'script_id' ){
      console.log('script id', key)
      scriptId = parseInt(qs[key]);
    }
    if (key === 'env') {
      if (qs[key] === 'test'){
         url = "https://preprod.linkaform.com/api/";
      }
    }
    if (key ==='title'){
      $("#title_report").text(qs[key]);
    }
		var elements = getAllElementsWithAttribute(formNode, 'data-infosync-id', key);
		var value = decodeURI(qs[key]);
    if (key === 'infosyncRecordID'){
      var recId = document.getElementById("infosyncRecordID");
      recId.value = value;
    }
		else if(elements.length > 0){
			switch(elements[0].type){
				case 'text':
					elements[0].value = value;
					break;
				case 'textarea':
					elements[0].value = value;
					break;
				case 'select-one':
					elements[0].value = value;
					break;
				case 'radio':
					for(var idx in elements){
						if(elements[idx].value === value){
							elements[idx].checked = true;
						}
					}
					break;
				case 'checkbox':
					var values = value.split(';');
					for(var idx in elements){
						if(values.indexOf(elements[idx].value) !== -1){
							elements[idx].checked = true;
						}
					}
					break;
			}
		}
	}

  us = getCookie("userId");
  jw = getCookie("userJwt");
  userParentId = getCookie("userParentId");
  hideElement("close_sesion");
  //hideElement("firstParameters");
  hideElement("firstParameters");


  if(us != "" && jw != "" || scriptId===null){
    hideElement("inicio_ses");
    unhideElement("close_sesion");
    getCompanyLogo(userParentId);
    userId = us;
    userJwt = jw;
    userName = getCookie("userName");
    document.getElementById("firstParameters").style.removeProperty('display');
    $('#firstParameters').addClass('show'); //---IMPORTANTE: Quitar cuando no se ocupe la librería de JQuery Multiple Select.
    unHideReportElements()
    if (scriptId == null) {
      loadDemoData();
    }
    //--Styles
    setSpinner();
    console.log('-------------script id', scriptId)
    get_catalog(scriptId);
    $('#divOptions').show();
    $('#title_report').show();
    document.getElementById("firstParameters").style.removeProperty('display');
    
  } else {
    unhideElement("inicio_ses");
    $('#divContent').hide();
    $('#divOptions').hide();
    $('#title_report').hide();
    $('.title_tables').hide();
    /* I M P O R T A N T E */
    /*Se tiene que eliminar la clase de show al elemento con clase firstParameters ya que las librerías
    para los multiselectores alteran ligeramente si se muestran o no.*/
    $('#firstParameters').removeClass('show'); //----IMPORTANTE: Quitar cuando no se ocupe la librería de JQuery Multiple Select.
    $("#warehouse").multipleSelect('refresh');
    hideElement("firstElement-Buttons");
  }
  ///-----HIDE AND SHOW
  for(var key in qs){
    if (key === 'embed'){
      if (qs[key]){
        $("#close_sesion").hide();
        $("#image_log").hide();
      }
    }
  }

  /*$(document).ready(function() {
    $('#warehouse').multiselect();
  });*/

  /*$(document).ready(function() {
    $('#warehouse').multiselect();
  });*/

  $(document).ready(function() {
    $('.js-theme-multiple').select2({
        placeholder: 'Loading',
        allowClear: true, // Opcional, para agregar una "X" para deseleccionar
        selectionCssClass: "select2-selection",

    });
  });

  $(document).ready(function() {
    $('#warehouse').select2({
      language: {
      noResults: function() {
        return '';
      }
    }
    });
  });

  $(document).ready(function(){
    //----Función que escucha al selector de params
    $("#productCode").on('select2:select', function(e){
      var data = e.params.data;
      console.log(data)
      get_lotNumber(data.id);
    })
  })

}

function unHideReportElements(){
  //Set here all report elements that need to be unHiden on a loggin
  unhideElement("firstElement-Buttons");
  unhideElement("firstParameters");
  unhideElement("close_sesion");
  unhideElement("firstElement");
  //unhideElement("secondElement");
}

function loadDemoData(){
  console.log('dem,o data....')
  unhideElement("title_demo")
  $('.title_tables').show();

  //$("#warehouse").multiselect('refresh');

  getDrawTableTwo('firstElement', columsTable2, dataTable2);
  document.getElementById("firstElement").style.removeProperty('display');

  unhideElement("secondElement");
  document.getElementById("secondElement").style.removeProperty('display');
  
  //----Vaciar el elemento select con ID 'warehouse'
  /*$("#warehouse").empty();

  //----Definir los datos demo
  let data_demo = ["warehouse1", "warehouse2", "warehouse3", "warehouse4", "warehouse5"];
  let data_multiselect = [];

  for (let i = 0; i < data_demo.length; i++) {
      let valueMultiselect = data_demo[i];
      let objMultiselect = { label: valueMultiselect, value: valueMultiselect };
      data_multiselect.push(objMultiselect);
  }

  //console.log('value----');
  $('#warehouse').multiselect('dataprovider', data_multiselect);
  $('#warehouse').multiselect('refresh');*/

  document.getElementById("firstParameters").style.removeProperty('display');
  
}


const loading = document.querySelector('.loading-container');
loading.style.display = 'none';
function runFirstElement(){
  let dateFrom = document.getElementById("dateFrom");
  let dateTo = document.getElementById("dateTo");  
  let dateOptions = document.getElementById("dateOptions");  
  let productCode = document.getElementById("productCode");  
  let lotNumber = document.getElementById("lotNumber");  
  let warehouse = document.getElementById("warehouse"); 
  let selectedWarehouse = [...warehouse.selectedOptions].map(option => option.value);
  getFirstElement(dateFrom.value, dateTo.value, dateOptions.value, productCode.value, lotNumber.value, selectedWarehouse);
};

function getFirstElement(dateFrom, dateTo, dateOptions, productCode, lotNumber, warehouse){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();

  console.log('logNumber', lotNumber)
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      date_from: dateFrom,
      date_to: dateTo,
      date_options: dateOptions,
      product_code: productCode,
      lot_number: lotNumber,
      warehouse: warehouse,
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      //----Hide and show
      $('.load-wrapp').hide();
      $("#divContent").show();
      $('.title_tables').show();
      console.log(res.response.json)
      if(res.response.json.secondElement.data){
        //----Se crea y define una variable que almacene la data de la query para no escribir toda la ruta
        let dataTableTwo = res.response.json.secondElement.data;
        console.log('tabel 2')
        getDrawTableTwo('firstElement', columsTable2, dataTableTwo);
        document.getElementById("firstElement").style.removeProperty('display');

        //document.getElementById("secondElement").style.removeProperty('display');
        unhideElement("secondElement");
        document.getElementById("secondElement").style.removeProperty('display');
        
      }
      
    } else {
      hideLoading();
      if(res.code == 11){
        Swal.fire({
          title: 'Error',
          html: res.error
        });
        $('.load-wrapp').hide();
      } else {
        Swal.fire({
          title: 'Error',
          html: res.error
        });
        $('.load-wrapp').hide();
      }
    }
  })
};

//-----TABLES

var subData;
function getDrawTableTwo(id, columnsData, tableData){
  var  table = new Tabulator("#" + id, {
    columnHeaderVertAlign:"top",
    height:"100%",
    layout:"fitDataTable",
    columnDefaults:{
      resizable:false,
    },
    data:tableData,
    columns:columnsData,

    rowFormatter:function(row){
        //create and style holder elements
       var holderEl = document.createElement("div");
       var tableEl = document.createElement("div");

       holderEl.style.boxSizing = "border-box";
       holderEl.style.padding = "0px 0px 0px 0px";
       //holderEl.style.borderTop = "1px solid #333";
       //holderEl.style.borderBotom = "1px solid #333";
       

       //tableEl.style.border = "1px solid #333";

       holderEl.appendChild(tableEl);

       row.getElement().appendChild(holderEl);

       var subTable = new Tabulator(tableEl, {
           layout:"fitDataTable",
           addRowPos: "bottom",
           columnDefaults:{
              resizable:false,
           },
           data:row.getData().serviceHistory,
           // columns:[
           // {title:"Date", field:"date", sorter:"date"},
           // {title:"Product Code", field:"product_code"},
           // {title:"Lot Number", field:"lot_number", hozAlign:"right"},
           // {title:"Warehouse from", field:"warehouse_from"},
           // {title:"Warehouse to", field:"warehouse_to"},
           // {title:"Move Type", field:"move_type"},
           // {title:"Unit", field:"unit"},
           // {title:"Qty In", field:"qty_in", hozAlign:"right", formatter: "money",formatterParams: {symbol: "", symbolAfter: "", decimal: ".", thousand: ",", precision: 0}},
           // {title:"Qty Out", field:"qty_out", hozAlign:"right", formatter: "money",formatterParams: {symbol: "", symbolAfter: "", decimal: ".", thousand: ",", precision: 0}},
           // {title:"Balance", field:"balance", hozAlign:"right", sorter:"number", formatter: "money",formatterParams: {symbol: "", symbolAfter: "", decimal: ".", thousand: ",", precision: 0}},
           // ],
           columns:columsTable2B,
           rowFormatter:function(row){
            subData = row.getData();

           },

           tableBuilt: function () {
              // Evento interno cuando la tabla se ha construido
              subTable.addRow({})
            }
       });

      //Agregar nueva fila       
       
      // Aplica la clase CSS para ocultar los encabezados de la tabla anidada
      subTable.element.classList.add("tabulator-sub-table");

      if (row.getData().id === 'warehouse') {
        row.getElement().classList.add("green-row");
      }

      var cell = row.getCell("date_title");
      cell.getElement().style.backgroundColor = "#007bff"
      cell.getElement().style.color = "white"

      var cell = row.getCell("product_code_title");
      cell.getElement().style.backgroundColor = "#007bff"
      cell.getElement().style.color = "white"

      var cell = row.getCell("lot_number_title");
      cell.getElement().style.backgroundColor = "#007bff"
      cell.getElement().style.color = "white"

      var cell = row.getCell("warehouse");
      cell.getElement().style.backgroundColor = "#007bff"
      cell.getElement().style.color = "white"

      var cell = row.getCell("warehouse_to_table");
      cell.getElement().style.backgroundColor = "#007bff"
      cell.getElement().style.color = "white"

      var cell = row.getCell("move_type_table");
      cell.getElement().style.backgroundColor = "#007bff"
      cell.getElement().style.color = "white"

      var cell = row.getCell("unit_table");
      cell.getElement().style.backgroundColor = "#007bff"
      cell.getElement().style.color = "white"

      var cell = row.getCell("qty_in_table");
      cell.getElement().style.backgroundColor = "#007bff"
      cell.getElement().style.color = "white"

      var cell = row.getCell("qty_out_table");
      cell.getElement().style.backgroundColor = "#007bff"
      cell.getElement().style.color = "white"

      var cell = row.getCell("balance_table");
      cell.getElement().style.backgroundColor = "#007bff"
      cell.getElement().style.color = "white"
      cell.getElement().style.fontWeight = "bold"

    },

    downloadConfig:{
      columnGroups: true,
      rowGroups: true,
    }

  });

  //---Definición de la estructura de las columnas del archivo xlsx y csv

  let structureColumns = [
      {header:'Date', key:"date"},
      {header:'Product code', key:'product_code'},
      {header:'Lot number', key:'lot_number'},
      {header:'Warehouse from', key:'warehouse_from'},
      {header:'Warehouse to', key:'warehouse_to'},
      {header:'Move type', key:'move_type'},
      {header:'Unit', key:'unit'},
      {header:'Qty in', key:'qty_in'},
      {header:'Qty out', key:'qty_out'},
      {header:'Balance', key:'balance'},
    ]

  if (document.getElementById("download_xlsx_"+id)){
    //----Trigger download of data.xlsx file
    document.getElementById("download_xlsx_"+id).replaceWith(document.getElementById("download_xlsx_"+id).cloneNode(true));
    document.getElementById("download_xlsx_"+id).addEventListener("click", function (){
    //----Obtener datos anidados
    var nestedData = table.getData(true);
    //----Almacena los datos de las tablas anidadas
    var exportData = [];
    //----Almacena 
    var styleRows = [];
    let contRow = 1;

    nestedData.forEach(row => {
        let titles = {
          'date':" ",
          'lot_number':" ",
          'product_code':" ",
          'move_type':" ",
          'warehouse_from':row.warehouse || '',
          'warehouse_to':" ",
          'unit': " ",
          'qty_in': " ",
          'qty_out': "Initial",
          'balance':"0",
        }
        contRow ++;
        styleRows.push(contRow)
        if (row.hasOwnProperty("serviceHistory")) {
            exportData.push(titles);
            exportData.push(...row.serviceHistory);
            contRow = contRow + (row.serviceHistory.length)
        }
    });

    const dataForXLSX = exportData.map(item => {
    return {
        'date': item.date || " ",
        'lot_number': item.lot_number || " ",
        'product_code': item.product_code || " ",
        'move_type': item.move_type || " ",
        'warehouse_from': item.warehouse_from || " ",
        'warehouse_to': item.warehouse_to || " ",
        'unit': item.unit || " ",
        'qty_in': item.qty_in || " ",
        'qty_out': item.qty_out || " ",
        'balance': item.balance || " ",
      };
    });

    //----Creación del libro de trabajo
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'linkaform';
    workbook.lastModifiedBy = 'Bot';
    workbook.created = new Date(2023, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2023, 7, 27);

    //----Creación de la hoja de trabajo
    const sheet = workbook.addWorksheet('NestedData');

    //----Creación de columnas
    sheet.columns = structureColumns;

  sheet.addRows(dataForXLSX);

  //----Agregar formato
  for(let iRow = 2; iRow <= dataForXLSX.length; iRow ++){
    if(styleRows.includes(iRow) == false){
      const rowToStyle = sheet.getRow(iRow);
      for(let i = 8; i<=10; i++){
        let cell = rowToStyle.getCell(i);
        cell.numFmt = '#,##0';
      }
    }
  }

  // Estiliza el título
  const rowTitle = sheet.getRow(1);
  for(let i = 1; i<=10; i++){
    rowTitle.getCell(i).font = {
      name: 'Arial Black',
      family: 2,
      size: 14,
    }
  }

  //----Ontener la fila a la que deseas aplicar el estilo (por ejemplo, la fila 2)
  styleRows.forEach(num => {
    const rowToStyle = sheet.getRow(num);

    //----Aplica background a las primeras 8 celdas 
    for (let i = 1; i <=8; i++){
      rowToStyle.getCell(i).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '007bff' },
      };
    }

    //----Aplicar background a las últimas dos celdas
    for (let i = 9; i <=10; i++){
      if(i == 10){
        rowToStyle.getCell(i).alignment = {horizontal: 'right'}
      }
      rowToStyle.getCell(i).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '007bff' },
      };
    }

  })


  //----Generar el archivo y descárgalo
  workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'nombre_archivo.xlsx');
  });

  });
  }

  if (document.getElementById("download_csv_"+id)){
    //----trigger download of data.csv file
    document.getElementById("download_csv_"+id).replaceWith(document.getElementById("download_csv_"+id).cloneNode(true));
    document.getElementById("download_csv_"+id).addEventListener("click", function (){
    //----Obtener datos anidados
    var nestedData = table.getData(true);
    //----Almacena los datos de las tablas anidadas
    var exportData = [];
    var styleRows = [];
    let contRow = 1;

    nestedData.forEach(row => {
        let titles = {
          'date':" ",
          'lot_number':" ",
          'product_code':" ",
          'move_type':" ",
          'warehouse_from':row.warehouse || '',
          'warehouse_to':" ",
          'unit': " ",
          'qty_in': " ",
          'qty_out': "Initial",
          'balance':"0",
        }
        contRow ++;
        styleRows.push(contRow)
        if (row.hasOwnProperty("serviceHistory")) {
            exportData.push(titles);
            exportData.push(...row.serviceHistory);
            contRow = contRow + (row.serviceHistory.length)
        }
    });

    const dataForXLSX = exportData.map(item => {
    return {
        'date': item.date || " ",
        'lot_number': item.lot_number || " ",
        'product_code': item.product_code || " ",
        'move_type': item.move_type || " ",
        'warehouse_from': item.warehouse_from || " ",
        'warehouse_to': item.warehouse_to || " ",
        'unit': item.unit || " ",
        'qty_in': item.qty_in || " ",
        'qty_out': item.qty_out || " ",
        'balance': item.balance || " ",
        };
    });

    //----Creación del libro de trabajo
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'linkaform';
    workbook.lastModifiedBy = 'Bot';
    workbook.created = new Date(2023, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2023, 7, 27);

    //----Creación de la hoja de trabajo
    const sheet = workbook.addWorksheet('NestedData');

    //----Creación de columnas
    sheet.columns = structureColumns;

  sheet.addRows(dataForXLSX);

  // Genera el archivo y descárgalo
  workbook.csv.writeBuffer().then((csvData) => {
    const csvBlob = new Blob([csvData], { type: 'text/csv' });
    saveAs(csvBlob, 'nombre_archivo.csv');
  });

    });
  }
}

//----- CATALOGS
function get_catalog(scriptId) 
{
  arrayPlant = []
  arrayOut = []


  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      option: "getFilters",
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      if (res.response.json){
        //Creamos una variable para renderizar el elemento multiselect
        var warehouseOptions = $("#warehouse")
        res.response.json['productCode'].sort();
        res.response.json['warehouse'].sort();
        //----Product code
        $('#productCode').select2({
              placeholder: 'Select',
              allowClear: true, // Opcional, para agregar una "X" para deseleccionar
              selectionCssClass: "select2-selection",

        });
        $("#productCode").empty();
        $("#productCode").append("<option value=''/></option> ")
        for (i = 0; i < res.response.json['productCode'].length; i++) {
          value =  res.response.json['productCode'][i]
          $('#productCode').append('<option value="'+ value +'">'+value+'</option>');
        }

        //----Warehouse
        $("#warehouse").empty();

        //----Almacenar los datos de la query en una variable para procesarla
        let data_warehouse = res.response.json['warehouse'];
        //----La variable permitirá guardar la data en el formato aceptado por la librería, la cual es: [{label: "elemento1", value: "elemento1"},]
        let data_multiselect = [];

        //---Iterar a través de los datos y crear objetos para el multiselect
        for (let i = 0; i < data_warehouse.length; i++) {
            let valueMultiselect = data_warehouse[i];
            let objMultiselect = { label: valueMultiselect, value: valueMultiselect };
            data_multiselect.push(objMultiselect);
        }

        
        $('#warehouse').multiselect('dataprovider', data_multiselect);
        $('#warehouse').multiselect('refresh');
      }
    } 
  })

};

/*Esta función será llamada al seleccionar un plant code determinado.
  La función llamará a los lot_number correspondientes a cada plant code y los agregará al selector lotNumber."
*/
function get_lotNumber(id)
{
  fetch(url + 'infosync/scripts/run/',{
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      option:"getLotNumber",
      product_code: id
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if(res.success){
      if(res.response.json){
        
          //----Lot number
          $('#lotNumber').select2({
              placeholder: 'Select',
              allowClear: true, // Opcional, para agregar una "X" para deseleccionar
              selectionCssClass: "select2-selection",

          });
          $("#lotNumber").empty();
          $("#lotNumber").append("<option value=''/></option> ")
          let dataLotNumber = res.response.json['lotNumber'];
          for(let i = 0; i < dataLotNumber.length; i++){
            value = dataLotNumber[i];
            $("#lotNumber").append('<option value="' + value + '">'+value+'</option>');
          }
        
      }
    }
  })
}

function filtro_fechas(selectElement) {
  var valorSeleccionado = selectElement.value;
  if (valorSeleccionado === "custom") {
    $("#filter_range").hide()
    $("#filter_date").show()
    realizarAccionCustom();
  }
}