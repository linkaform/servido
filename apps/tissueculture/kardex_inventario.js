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
  hideElement("firstParameters");


  if(us != "" && jw != "" || scriptId===null){
    hideElement("inicio_ses");
    unhideElement("close_sesion");
    getCompanyLogo(userParentId);
    userId = us;
    userJwt = jw;
    userName = getCookie("userName");
    document.getElementById("firstParameters").style.removeProperty('display');
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
    $('#out').multipleSelect('refresh');
    document.getElementById("firstParameters").style.removeProperty('display');
    
  } else {
    unhideElement("inicio_ses");
    $('#divContent').hide();
    $('#divOptions').hide();
    $('#title_report').hide();
    $('.title_tables').hide();
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
}


function unHideReportElements(){
  //Set here all report elements that need to be unHiden on a loggin
  unhideElement("firstElement-Buttons");
  unhideElement("firstParameters");
  unhideElement("close_sesion");
  unhideElement("firstElement");
  unhideElement("secondElement");
}

function loadDemoData(){
  console.log("Estas en Demo")
  unhideElement("title_demo")
  $('.title_tables').show();
  document.getElementById("firstParameters").style.removeProperty('display');

  getDrawTable('firstElement', columsTable1, dataTable1);
  document.getElementById("firstElement").style.removeProperty('display');

  getDrawTableTwo('secondElement', columsTable2, dataTable2);
  document.getElementById("secondElement").style.removeProperty('display');
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';
function runFirstElement(){
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");  
  let plant = document.getElementById("plant");  
  let option_in = document.getElementById("in");  
  let option_out = document.getElementById("out"); 
  check = 'on';
  if (document.getElementById('input_check').checked)
  {
    //---created date
    check = 'off';
  }
  getFirstElement(date_to.value, date_from.value, plant.value, option_in.value, option_out.value, check);
};

function getFirstElement(dateTo, dateFrom, plant, option_in, option_out, check){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();


  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      date_to: dateTo,
      date_from: dateFrom,
      product_code: product_code,
      lot_number: lot_number,
      warehouse: warehouse,
      range_date: '',
      date_from: '',
      date_to:''
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
      if(res.response.json.secondElement.data){
        getDrawTable('secondElement', columsTable2, res.response.json.secondElement.data);
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
function getDrawTable(id, columnsData, tableData){
  var  table = new Tabulator("#" + id, {
    height:"70px",
    layout:"fitDataTable",
    data:tableData,
    resizableRows:false,
    dataTree:true,
    dataTreeStartExpanded:false,
    clipboard:true,
    clipboardPasteAction:"replace",
    textDirection:"ltr",
    //groupBy:"in",
    columns:columnsData,
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


function getDrawTableTwo(id, columnsData, tableData){
  var  table = new Tabulator("#" + id, {
    columnHeaderVertAlign:"top",
    height:"341px",
    layout:"fitColumns",
    columnDefaults:{
      resizable:true,
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
           layout:"fitColumns",
           data:row.getData().serviceHistory,
           columns:[
           {title:"Date", field:"date", sorter:"date"},
           {title:"Product Code", field:"product_code"},
           {title:"Lot Number", field:"lot_number"},
           {title:"Warehouse from", field:"warehouse_from"},
           {title:"Warehouse to", field:"warehouse_to"},
           {title:"Move Type", field:"move_type"},
           {title:"Unit", field:"unit"},
           {title:"Qty In", field:"qty_ins"},
           {title:"Qty Out", field:"qty_outs"},
           {title:"Balance", field:"balance", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:2}},
           ],
       });
       
      // Aplica la clase CSS para ocultar los encabezados de la tabla anidada
      subTable.element.classList.add("tabulator-sub-table");

      if (row.getData().id === 'warehouse') {
      row.getElement().classList.add("green-row");
      }

      var cell = row.getCell("date_title");
      cell.getElement().style.backgroundColor = "#76D7C4"

      var cell = row.getCell("product_code_title");
      cell.getElement().style.backgroundColor = "#76D7C4"

      var cell = row.getCell("lot_number_title");
      cell.getElement().style.backgroundColor = "#76D7C4"

      var cell = row.getCell("warehouse");
      cell.getElement().style.backgroundColor = "#76D7C4"

      var cell = row.getCell("warehouse_to_table");
      cell.getElement().style.backgroundColor = "#76D7C4"

      var cell = row.getCell("move_type_table");
      cell.getElement().style.backgroundColor = "#76D7C4"

      var cell = row.getCell("unit_table");
      cell.getElement().style.backgroundColor = "#76D7C4"

      var cell = row.getCell("qty_in_table");
      cell.getElement().style.backgroundColor = "#76D7C4"

      var cell = row.getCell("qty_out_table");
      cell.getElement().style.backgroundColor = "#BFC9CA"

      var cell = row.getCell("balance_table");
      cell.getElement().style.backgroundColor = "#BFC9CA"


    },

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
      if (res.response.json.catalog){
        //console.log(res.response.json.catalog)
        for (i = 0; i < res.response.json.catalog.length; i++) {
          valuePlant = res.resposne.json.catalog[i]['plantCode'];
          valueWarehouse = res.response.json.catalog[i]['warehouse'];
          if (arrayPlant.indexOf(valuePlant) === -1) {
            arrayPlant.push(valuePlant);
          }
          if (arrayOut.indexOf(valueOut) === -1) {
            arrayOut.push(valueOut);
          }
        }
        arrayPlant.sort();
        arrayOut.sort();
        //----Pais
        $("#plant").empty();
        $('#plant').append('<option value="--">--Seleccione--</option>');
        for (i = 0; i < arrayPlant.length; i++) {
          value = arrayPlant[i]
          $('#plant').append('<option value="'+ value +'">'+value+'</option>');
        }

        //----Pais
        $("#out").empty();
        $('#out').append('<option value="--">--Seleccione--</option>');
        for (i = 0; i < arrayOut.length; i++) {
          value = arrayOut[i]
          $('#out').append('<option value="'+ value +'">'+value+'</option>');
        }
      }
    } 
  })

};

function filtro_fechas(selectElement) {
  var valorSeleccionado = selectElement.value;
  if (valorSeleccionado === "custom") {
    $("#filter_range").hide()
    $("#filter_date").show()
    realizarAccionCustom();
  }
}