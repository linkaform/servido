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
hideElement("title_demo")
hideElement("firstParameters")
hideElement("firstElement")


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
      if (qs[key] === 'local'){
         url = "http://192.168.0.25:8000/api/";
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

    unHideReportElements()
    if (scriptId == null) {
      loadDemoData();
    }

    //----SET VALUE
    var year_now = new Date().getFullYear();
    var year = new Date(new Date().getFullYear(),0,1);
    var numDays = Math.floor((new Date() - year) / (24 * 60 * 60 * 1000));
    var result = Math.ceil(( new Date().getDay() + 1 + numDays) / 7);
    var resulto = result + 3;

    $("#yearWeekFrom").val(year_now +''+result)
    $("#yearWeekTo").val(year_now +''+resulto)


    //---HIDE AND SHOW
    setSpinner();
    $('#divOptions').show();
    $('#title_report').show();
    document.getElementById("firstParameters").style.removeProperty('display');

  } else {
    unhideElement("inicio_ses");
    $('#divOptions').hide();
    $('#title_report').hide();
    $('.title_tables').hide();
    hideElement("firstElement-Buttons");
  }
  //---SHOW AND HIDE ELEMENT
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
  unhideElement("firstElement-Buttons");
}

function loadDemoData(){
  $('.title_tables').show();
  getDrawTable('firstElement', columsTable1, dataTable1);
  drawSecondElement(dataSecondElementB);
  unhideElement("title_demo")
}


const loading = document.querySelector('.loading-container');
loading.style.display = 'none';


function runFirstElement(){
  let yearWeekFrom = document.getElementById("yearWeekFrom");
  let yearWeekTo = document.getElementById("yearWeekTo");
  setStyleRemove();
  firstElement =getFirstElement( yearWeekFrom.value, yearWeekTo.value);
};


function getFirstElement(yearWeekFrom, yearWeekTo){
  //---Hide style
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();
  //---CLean
  $("#firstElement").html("");
  $("#secondElement").html("");
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      year_week_from: yearWeekFrom,
      year_week_to: yearWeekTo,
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      //----SHOW STYLES
      $('.load-wrapp').hide();
      $("#divContent").show();
      $('.title_tables').show();
      if (res.response.firstElement) {
        console.log('drawFirstElement.........')
        colData = res.response.firstElement.colsData
        columns = get_sort_object(colData);

        getDrawTable('firstElement',columns, res.response.firstElement.tabledata);
      }
      if (res.response.secondElement) {
        const numSets = res.response.secondElement.length;
       // drawBarHistogram('secondElement', res.response.secondElement , numSets);
       drawSecondElement( res.response.secondElement );
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
  .catch(function(error)
  {
    Swal.fire({
      title: 'Error',
      html: res.error
    });
    $('.load-wrapp').hide();
  });
};


function editableData(){
  //create and style input
  console.log('entra a editable data')
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



//----GRAPICH

let chart2;
function drawSecondElement(data){
  //---CHART
  var ctx = document.getElementById('graphicSecond').getContext('2d');

  if (chart2) {
    chart2.destroy();
  }

  chart2 = new Chart(ctx, {
    type: 'line',
    data: data,
    plugins: [ChartDataLabels],
    options: {
      plugins: {
          legend: {
              display: true
          },
           title: {
              display: true,
              text: 'Requirements Report ',
              font: {
                  size: 25
              }
          },
          datalabels: {
            color: '#707B7C',
            labels: {
              title: {
                font: {
                  weight: 'bold',
                  size: 12,
                }
              },
            },
            padding:{
              top: 20,
              bottom:10,
            },
            align:'bot',
            formatter: function (value, context){
              var formato = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              return formato;
            }
          }
      },
      scales: {
          x: {
            display: true,
            title:{
              display: true,
              text: 'Year Week',
              size: 30,
            },
            ticks: {
              fontSize: 40
            }
          },
          "ay": {
            type: 'linear',
            display: true,
            title:{
              display: true,
              text: 'Hours',
              size: 30,
            },
            ticks: {
              fontSize: 40
            },
            position: 'right',
          },
          "ay1": {
            type: 'linear',
            display: true,
            title:{
              display: true,
              text: 'Eaches',
              size: 30,
            },
            ticks: {
              fontSize: 40
            },
            position: 'left',
          }
      },
    }
  });
}



//-----TABLES
function getDrawTable(id, columnsData, tableData){
  unhideElement("firstElement-Buttons");
  //editableData();

  var table = new Tabulator("#" + id, {
    height:"550px",
    layout:"fitData",
    //layout:"fitColumns",
    data:tableData,
    // responsiveLayout: "hide",
    resizableRows:true,
    clipboard:true,
    clipboardPasteAction:"replace",
    textDirection:"ltr",
    columns:columnsData,
    renderHorizontal:"virtual",
  });

  //trigger download of data.xlsx file
  if (document.getElementById("download_xlsx_"+id)){
    document.getElementById("download_xlsx_"+id).replaceWith(document.getElementById("download_xlsx_"+id).cloneNode(true));
    document.getElementById("download_xlsx_"+id).addEventListener("click", function (){
      table.download("xlsx", "data.xlsx", {sheetName:"data"});
    });
  }

  //trigger download of data.csv file
  if (document.getElementById("download_csv_"+id)){
    document.getElementById("download_csv_"+id).replaceWith(document.getElementById("download_csv_"+id).cloneNode(true));
    document.getElementById("download_csv_"+id).addEventListener("click", function (){
      table.download("csv", "data.csv");
    });
  }
}

function setStyleRemove()
{
  document.getElementById("firstParameters").style.removeProperty('display');
}

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



function get_sort_object(data) {
  data_result = []
  data_colums = []
  for (var i = 0; i < data.length; i++) {
    if (data[i].columns === undefined) {
      data_result.push(data[i])
    } else {
      data_colums.push(data[i])
    }
  }

  data_colums.sort( (a, b) => {
    if(a.title < b.title) {
      return -1;
    }
    if(a.title > b.title) {
      return 1;
    }
    return 0;
  });

  for (var i = 0; i < data_colums.length; i++) {
    data_result.push(data_colums[i])
  } 
  return data_result;
}