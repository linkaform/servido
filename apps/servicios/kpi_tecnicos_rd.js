// Reporte KPI Tecnicos
// Librerias: Tabulator, Chart.js

let us = null;
let usTy = null;
let jw = null;
let userId = null;
let userJwt = null;
let userName = null;
let userParentId = null;
var scriptId = null;

$('#divOptions').hide();
$('#title_report').hide();
$('.title_tables').hide();
hideElement("firstElement-Buttons")
hideElement("title_demo")
hideElement("firstParameters")

hideElement("firstElement")
hideElement("secondElement")
hideElement("fourthElement")
hideElement("fivethElement")
hideElement("sixthElement"  )
hideElement("seventhElement")
hideElement("eigthElement")
hideElement("ninethElement")
hideElement("tenthElement")

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
  hideElement("close_sesion");
  hideElement("firstParameters");

  if(us != "" && jw != ""){
    hideElement("inicio_ses");
    unhideElement("close_sesion");
    userId = us;
    userJwt = jw;
    userName = getCookie("userName");
    // loading.style.display = 'flex';
    unHideReportElements()
    if (scriptId == null) {
      loadDemoData();
    }
    //---HIDE AND SHOW
    setSpinner();
    $('#divOptions').show();
    $('#title_report').show();
    document.getElementById("firstParameters").style.removeProperty('display');
  } else {
    unhideElement("inicio_ses");
    $('.title_tables').hide();
    hideElement("title_demo");
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
  unhideElement("close_sesion");
  unhideElement("firstParameters");
  unhideElement("firstElement");
  unhideElement("secondElement");
  unhideElement("thirdElement");
  unhideElement("fourthElement");
  unhideElement("fivethElement");
  unhideElement("sixthElement");
  unhideElement("seventhElement");
  unhideElement("eigthElement");
  unhideElement("ninethElement");
  unhideElement("tenthElement");
  unhideElement("firstElement-Buttons");
}

function loadDemoData(){
  $('.title_tables').show();
  drawGraphic1(dataGraphic1);
  drawGraphic2(dataGraphic2);
  getDrawTable('firstElement', columsTable1, dataTable1);
  getDrawTable('fourthElement', columsTable2, dataTable2);
  getDrawTable('fivethElement', columsTable3, dataTable3);
  getDrawTable('sixthElement', columsTable4, dataTable4);
  getDrawTable('seventhElement', columsTable7, dataTable7);
  getDrawTable('eigthElement', columsTable6, dataTable6);
  getDrawTable('ninethElement', columsTable8, dataTable8);
  getDrawTable('tenthElement', columsTable9, dataTable9);
  setStyleRemove();
  unhideElement("title_demo")
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");
  setStyleRemove();
  firstElement = getFirstElement( date_from.value, date_to.value);
};

function getFirstElement(date_from, date_to){
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();
  //----CLEAN
  $("#firstElement").html("");
  $("#thirdElement").html("");
  $("#fourthElement").html("");
  $("#fivethElement").html("");
  $("#sixthElement").html("");
  $("#seventhElement").html("");
  $("#eigthElement").html("");
  $("#ninethElement").html("");
  $("#tenthElement").html("");
  setStyleRemove();
  console.log('Get first',url);
  console.log('Script id.........',scriptId);
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      date_from: date_from,
      date_to: date_to,
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      $('.load-wrapp').hide();
      $("#divContent").show();
      $('.title_tables').show();
      if (res.response.json.firstElement.tabledata) {
        getDrawTable('firstElement',columsTable1,res.response.json.firstElement.tabledata);
      }
      if (res.response.json.secondElement.data) {
        console.log('drawSecondElement.........');
        drawGraphic1(res.response.json.secondElement.data);
        $('#graphic_1').show();
      }
      if (res.response.json.thirdElement.data) {
        console.log('drawThirdElement.........');
        drawGraphic2(res.response.json.thirdElement.data);
        $('#graphic_2').show();
      }
      if (res.response.json.fivethElement) {
        console.log('fivethElement.........');
        if (res.response.json.fivethElement[0].data_mtto)
        {
          unhideElement("fourthElement");
          getDrawTable('fourthElement',columsTable2,res.response.json.fivethElement[0].data_mtto);
          console.log(res.response.json.fivethElement[0].data_mtto);
        }
        if (res.response.json.fivethElement[0].data_serv)
        {
          unhideElement("fivethElement");
          getDrawTable('fivethElement',columsTable3,res.response.json.fivethElement[0].data_serv);
        }
        if (res.response.json.fivethElement[0].data_vist)
        {
          unhideElement("sixthElement");
          getDrawTable('sixthElement',columsTable4,res.response.json.fivethElement[0].data_vist);
        }
      }
      if (res.response.json.sixthElement) {
        console.log('sixthElement.........');
        unhideElement("eigthElement");
        getDrawTable('eigthElement',columsTable6,res.response.json.sixthElement.tabledata);

      }
      if (res.response.json.seventhElement) {
        console.log('seventhElement.........');
        unhideElement("seventhElement");
        getDrawTable('seventhElement',columsTable7,res.response.json.seventhElement.tabledata);
      }
      if (res.response.json.eigthElement) {
        console.log('eigthElement.........');
        unhideElement("tenthElement");
        getDrawTable('tenthElement',columsTable9,res.response.json.eigthElement.tabledata);
      }
      if (res.response.json.ninethElement) {
        console.log('ninethElement.........');
        unhideElement("ninethElement");
        getDrawTable('ninethElement',columsTable8,res.response.json.ninethElement.tabledata);
      }

      setStyleRemove();
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

function editableData(){
  //create and style input
  //console.log('entra a editable data')
  var dateEditor = function(cell, onRendered, success, cancel){
    console.log('data editor', cell)
    var cellValue = luxon.DateTime.fromFormat(cell.getValue(), "dd/MM/yyyy").toFormat("yyyy-MM-dd"),
    input = document.createElement("input");

    input.setAttribute("type", "date");

    input.style.padding = "4px";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";

    input.value = cellValue;

    onRendered(function(){
        input.focus();
        input.style.height = "100%";
    });

    function onChange(){
        console.log('on change')
        if(input.value != cellValue){
            success(luxon.DateTime.fromFormat(input.value, "yyyy-MM-dd").toFormat("dd/MM/yyyy"));
        }else{
            cancel();
        }
    }

    //submit new value on blur or change
    input.addEventListener("blur", onChange);

    //submit new value on enter
    input.addEventListener("keydown", function(e){
        if(e.keyCode == 13){
          console.log('onchange>>>')
          onChange();
          console.log('onchange<<<<<')
        }

        if(e.keyCode == 27){
            cancel();
        }
    });
    console.log('return inpunt', input)
    return input;
   };
};


function getDrawTable(id, columnsData, tableData){

  var  table = new Tabulator("#" + id, {
    height:"auto",
    layout:"fitDataTable",
    data:tableData,
    resizableRows:false,
    clipboard:true,
    clipboardPasteAction:"replace",
    textDirection:"ltr",
    columns:columnsData,
  });
  //trigger download of data.xlsx file
  document.getElementById("download_xlsx_"+id).replaceWith(document.getElementById("download_xlsx_"+id).cloneNode(true));
  document.getElementById("download_xlsx_"+id).addEventListener("click", function (){
    table.download("xlsx", "data.xlsx", {sheetName:"data"});
  });

  //trigger download of data.csv file
  document.getElementById("download_csv_"+id).replaceWith(document.getElementById("download_csv_"+id).cloneNode(true));
  document.getElementById("download_csv_"+id).addEventListener("click", function (){
    table.download("csv", "data.csv");
  });

}

//-----GRAPICHS
let chart1;

function drawGraphic1(data){
  ///-----DATA
  var labels = data.map(function(e) {
    return e.responsable +' | %' + e.percentage_total;
  });
  var datasets = data.map(function(e) {
    return e.percentage_total;
  });;

  var array_colors = getPAlleteColors(4,datasets.length);

  //---CHART
  var ctx = document.getElementById('graphic_1').getContext('2d');
  if (chart1) {
      chart1.destroy();
  }

  chart1 = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        backgroundColor: array_colors,
        data: datasets
      }]
    },
    options: {
      plugins: {
        tooltip:{
          enabled: true,
        },
        legend:{
          display: true,
        },
        title: {
            display: true,
            text: 'Reportes Por Tecnico',
            font: {
              size: 25
            }
        },
      },
    }
  });
}

let chart2;
function drawGraphic2(data){
  ///-----DATA
  var labels = data.map(function(e) {
    return e.Title + ' | %'+ e.Porcentaje;
  });
  var datasets = data.map(function(e) {
    return e.Porcentaje;
  });;

  var array_colors = getPAlleteColors(4,datasets.length);

  //---CHART
  var ctx = document.getElementById('graphic_2').getContext('2d');
  if (chart2) {
    chart2.destroy();
  }

  chart2 =  new Chart(document.getElementById("graphic_2"), {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: "Test",
        backgroundColor: array_colors,
        data: datasets
      }]
    },
    options: {
      plugins: {
        tooltip:{
          enabled: true,
        },
        legend:{
          display: true,
        },
        title: {
            display: true,
            text: 'Mantenimiento VS Servicio',
            font: {
              size: 25
            }
        },
      },
    }
  });
}


function setStyleRemove() 
{
  document.getElementById("firstParameters").style.removeProperty('display');
  document.getElementById("secondElement").style.removeProperty('display');
  document.getElementById("fourthElement").style.removeProperty('display');
  document.getElementById("fivethElement").style.removeProperty('display');
  document.getElementById("sixthElement").style.removeProperty('display');
  document.getElementById("seventhElement").style.removeProperty('display');
  document.getElementById("eigthElement").style.removeProperty('display');
  document.getElementById("ninethElement").style.removeProperty('display');
  document.getElementById("tenthElement").style.removeProperty('display');
}
// Tabulator
// Tabulator
// Tabulator

var minMaxFilterEditor = function(cell, onRendered, success, cancel, editorParams){
    var end;
    var container = document.createElement("span");
    //create and style inputs
    var start = document.createElement("input");
    start.setAttribute("type", "number");
    start.setAttribute("placeholder", "Min");
    start.setAttribute("min", 0);
    start.setAttribute("max", 100);
    start.style.padding = "4px";
    start.style.width = "50%";
    start.style.boxSizing = "border-box";
    start.value = cell.getValue();
    function buildValues(){
        success({
            start:start.value,
            end:end.value,
        });
    }
    function keypress(e){
        if(e.keyCode == 13){
            buildValues();
        }

        if(e.keyCode == 27){
            cancel();
        }
    }
    end = start.cloneNode();
    end.setAttribute("placeholder", "Max");
    start.addEventListener("change", buildValues);
    start.addEventListener("blur", buildValues);
    start.addEventListener("keydown", keypress);
    end.addEventListener("change", buildValues);
    end.addEventListener("blur", buildValues);
    end.addEventListener("keydown", keypress);
    container.appendChild(start);
    container.appendChild(end);
    return container;
 }

// Tabulator
 //custom max min filter function
function minMaxFilterFunction(headerValue, rowValue, rowData, filterParams){
   //headerValue - the value of the header filter element
   //rowValue - the value of the column in this row
   //rowData - the data for the row being filtered
   //filterParams - params object passed to the headerFilterFuncParams property
       if(rowValue){
           if(headerValue.start != ""){
               if(headerValue.end != ""){
                   return rowValue >= headerValue.start && rowValue <= headerValue.end;
               }else{
                   return rowValue >= headerValue.start;
               }
           }else{
               if(headerValue.end != ""){
                   return rowValue <= headerValue.end;
               }
           }
       }
   return true; //must return a boolean, true if it passes the filter.
}
