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
hideElement("thirdElement");
hideElement("fourthElement");
hideElement("fiveElement");
hideElement("sixthElement");
hideElement("filter_date")

window.onload = function(){
  var qs = urlParamstoJson();
  var formNode = document.getElementById("appCont");
	for(var key in qs){
    if (key === 'script_id' ){
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
  hideElement("firstParameters");


  if(us != "" && jw != "" || scriptId===null){
    console.log("Prueba...")
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
    console.log('estilos')
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

  //C O N  F G U R A T I O N  F I L T E R
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
  unhideElement("secondElement");
  unhideElement("thirdElement");
  unhideElement("fourthElement");
  unhideElement("fiveElement");
  unhideElement("sixthElement");
}



//-----DEMO 
function loadDemoData(){
  $('.title_tables').show();
  unhideElement("title_demo")
  document.getElementById("firstParameters").style.removeProperty('display');

  getDrawTable('firstElement', columsTable1, dataTable1, 350);
  document.getElementById("firstElement").style.removeProperty('display');

  getDrawTable('fourthElement', columsTable4, dataTable4, 350);
  document.getElementById("fourthElement").style.removeProperty('display');

  getDrawTable('sixthElement', columsTable6, dataTable6, 350);
  document.getElementById("sixthElement").style.removeProperty('display');


  getDrawGraphicFirst(data1, setOptions1);
  document.getElementById("secondElement").style.removeProperty('display');
  
  getDrawGraphicSecond(data1, setOptions2);
  document.getElementById("fivethElement").style.removeProperty('display');

  getDrawGraphicThird(data1, setOptions2);
  document.getElementById("seventhElement").style.removeProperty('display');


}

//-----EXCUTION
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
  console.log('getting first elemetn')

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
      if (res.response.json.firstElement.data) {
        getDrawTable('firstElement', columsTable1, res.response.json.firstElement.data);
        document.getElementById("firstElement").style.removeProperty('display');
       
      }
      
      if (res.response.json.secondElement.data) {
        console.log(res.response.json.secondElement.data)
        getDrawTable('secondElement', columsTable2, res.response.json.secondElement.data,);
        document.getElementById("secondElement").style.removeProperty('display');
      }

      // if (res.response.json.thirdElement.data) {
      //   console.log(res.response.json.thirdElement.data)
      //   //alert("Hay data")
        
      //   getDrawGraphicFirst(res.response.json.thirdElement.data, setOptions1);
      //   document.getElementById("thirdElement").style.removeProperty('display');
      // }



      if (res.response.json.fourthElement.data) {
        getDrawTable('fourthElement', columsTable3, res.response.json.fourthElement.data, 350);
        document.getElementById("secondElement").style.removeProperty('display');
      }

      if (res.response.json.fiveElement.data) {
        getDrawGraphicSecond(res.response.json.fiveElement.data, setOptions2);
        document.getElementById("fiveElement").style.removeProperty('display');
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
}

//-----TABLES
function getDrawTable(id, columnsData, tableData){
  var  table = new Tabulator("#" + id, {
    height:"500px",
    layout:"fitDataTable",
    data:tableData,
    resizableRows:false,
    dataTree:true,
    dataTreeStartExpanded:false,
    clipboard:false,
    clipboardPasteAction:"replace",
    textDirection:"ltr",
    columns:columnsData
  });

  if (document.getElementById("download_xlsx_"+id)){
    //trigger download of data.xlsx file
    document.getElementById("download_xlsx_"+id).replaceWith(document.getElementById("download_xlsx_"+id).cloneNode(true));
    document.getElementById("download_xlsx_"+id).addEventListener("click", function (){
    table.download("xlsx", "data.xlsx", {sheetName:"data"});
    });
  }

  if (document.getElementById("download_csv_"+id)){
    //trigger download of data.csv file
    document.getElementById("download_csv_"+id).replaceWith(document.getElementById("download_csv_"+id).cloneNode(true));
    document.getElementById("download_csv_"+id).addEventListener("click", function (){
      table.download("csv", "data.csv");
    });
  }
}

//-----GRAFICA
let chart1;
function getDrawGraphicFirst(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicFirst').getContext('2d');
  if (chart1) {
    chart1.destroy();
  }

  chart1 = new Chart(ctx, {
    type: 'line',
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}

let chart2;
function getDrawGraphicSecond(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicSecond').getContext('2d');
  if (chart2) {
    chart2.destroy();
  }

  chart2 = new Chart(ctx, {
    type: 'line',
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}



let chart3;
function getDrawGraphicThird(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicThird').getContext('2d');
  if (chart3) {
    chart3.destroy();
  }

  chart3 = new Chart(ctx, {
    type: 'line',
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
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