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
$("#buttonFilter").hide();
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
    //---HIDE AND SHOW
    setSpinner();
    $("#buttonFilter").show();
    $('#divOptions').show();
    $('#title_report').show();
    document.getElementById("firstParameters").style.removeProperty('display');
  } else {
    unhideElement("inicio_ses");
    $('#divOptions').hide();
    $('#title_report').hide();
    $('.title_tables').hide();
    $("#buttonFilter").hide();
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
  getDrawTable('firstElement', columsTable1, dataTable1);
  unhideElement("title_demo");
  setStyleRemove();
  $("#buttonFilter").show();
}


const loading = document.querySelector('.loading-container');
loading.style.display = 'none';


function runFirstElement(){
  let plant_code = document.getElementById("plant_code");
  let extra_weeks = document.getElementById("extra_weeks");
  firstElement = getFirstElement( plant_code.value,);
};


function getFirstElement(plant_code,extra_weeks){
  //----Hide styles
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();
  //---CLean
  $("#firstElement").html("");

  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      plant_code: plant_code,
      extra_weeks: extra_weeks,
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
        console.log('Data', res.response.firstElement.tabledata)
        console.log('Data', res.response.firstElement.colsData)
        getDrawTable('firstElement',res.response.firstElement.colsData, res.response.firstElement.tabledata);
        //document.getElementById("firstElement").style.removeProperty('display');
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

//-----TABLES

function getDrawTable(id, columnsData, tableData){
  unhideElement("firstElement-Buttons");
  //editableData();

  var table = new Tabulator("#" + id, {
    //layout:"fitColumns",
    clipboard:true,
    clipboardPasteAction:"replace",
    columns:columnsData,
    data:tableData,
    dataTree:true,
    dataTreeBranchElement:false,
    //dataTreeChildIndent:25,
    dataTreeFilter:false,
    dataTreeStartExpanded:true,
    height:"490px",
    layout:"fitDataTable",
    // responsiveLayout: "hide",
    textDirection:"ltr",
    //renderHorizontal:"virtual",
    resizableRows:true,
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

function setStyleRemove()
{
  document.getElementById("firstParameters").style.removeProperty('display');
  document.getElementById("firstElement").style.removeProperty('display');
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
