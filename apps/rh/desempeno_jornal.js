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
$('.div_card').hide();
$('.title_tables').hide();
hideElement("title_demo")
hideElement("firstParameters")
hideElement("firstElement")


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
  if(us != "" && jw != ""){
    hideElement("inicio_ses");
    unhideElement("close_sesion");
    // getCompanyLogo(userParentId);
    userId = us;
    userJwt = jw;
    userName = getCookie("userName");
    unHideReportElements();
    if (scriptId == null) {
      loadDemoData();
    }else{
      $('.div_card').hide();
      $('.title_tables').hide();
    }
    
    getCatalog(79041,79040,1,catalogType='select');
    
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
    $('.div_card').hide();
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
  $('.title_tables').show();
  unhideElement("close_sesion");
  unhideElement("firstParameters");
  unhideElement("firstElement");
  unhideElement("firstElement-Buttons");
}

function loadDemoData(){
  //----
  $('.title_tables').show();
  $('.div_card').show();
  getDrawTable('secondElement', columsTable6, dataTableLicencias );
  getDrawTable('thirdElement', columsTable7, dataTableTotal);
  getDrawTableNested('fourthdElement', dataTableTest);
  

  //---Remove Format
  document.getElementById("firstParameters").style.removeProperty('display');
  document.getElementById("firstElement").style.removeProperty('display');
  document.getElementById("secondElement").style.removeProperty('display');
  document.getElementById("thirdElement").style.removeProperty('display');
  document.getElementById("fourthdElement").style.removeProperty('display');
  unhideElement("title_demo");
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  let year = document.getElementById("year");
  let month = document.getElementById("month");
  let code = document.getElementById("code");
  let empleado = document.getElementById("catalog-79040-level-1");
  firstElement  = getFirstElement( year.value, month.value, code.value, empleado.value);
};


function getEmpleadoNumber(){
  var nameEmp = $("#catalog-79040-level-1").val();

  empleados = getCatalog(79041,79040,2,catalogType='custom');
  console.log('empleados',empleados);
}

function customCatalogView(res){
  console.log('customCatalogView', res);
  var codeEmp = res.rows[0].key[1]['61b7f5c4ca8fd89bb3caa7bc']; 
  if (codeEmp !== null){
    $("#code").val(''); 
    $("#code").val(codeEmp);  
  }
  
}

function getFirstElement(year, month, hr_code, empleado){
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();
  $('.div_card').hide();
  $("#secondElement").html("");
  $("#thirdElement").html("");
  
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      year: year,
      month: month,
      code: hr_code,
      empleado: empleado,
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
        $('#textAlert1').text(res.response.firstElement['total_pagar'].toFixed(2));
        $('#textAlert2').text(res.response.firstElement['total_mes'].toFixed(2));
        $('#textAlert3').text(res.response.firstElement['total_dia'].toFixed(2));
        $(".div_card").show();
        document.getElementById("firstElement").style.removeProperty('display');
      }
      if (res.response.secondElement){
        getDrawTable('secondElement', columsTable6, res.response.secondElement);
      }
      if (res.response.thirdElement) {
        getDrawTable('thirdElement', columsTable7, res.response.thirdElement);
      }
      if (res.response.fourthElement) {
        getDrawTableNested('fourthdElement',Object.values(res.response.fourthElement));
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

function getDrawTableNested(id, tableData){
  unhideElement("firstElement-Buttons");

  var table = new Tabulator("#" + id, {
    height:"auto",
    layout:"fitDataTable",
    resizableColumns:false,
    data:tableData,
    columns: columsTable1,
    rowFormatter:function(row){

      //---TABLE PRODUCTION
      var subTable1Container = document.createElement("div");
      var subTable1 = document.createElement("div");

      subTable1Container.style.boxSizing = "border-box";
      subTable1Container.style.padding = "10px 30px 10px 10px";
      subTable1Container.style.borderTop = "1px solid  #17202a ";
      subTable1Container.style.borderBotom = "1px solid #333";
      subTable1.style.border = "1px solid #333";

      subTable1Container.appendChild(subTable1);
      row.getElement().appendChild(subTable1Container);

      var subTable = new Tabulator(subTable1, {
        layout:"fitDataTable",
        columnDefaults:{
          resizable:true,
        },
        data:row.getData().arrayProduction,
        columns:columsTable2,
      })


  
      //---TABLE INCIDENTS
      var subTable2Container = document.createElement("div");
      var subTable2 = document.createElement("div");

      subTable2Container.style.boxSizing = "border-box";
      subTable2Container.style.padding = "10px 30px 10px 10px";
      subTable2Container.style.borderTop = "1px solid   #17202a ";
      subTable2Container.style.borderBotom = "1px solid  #2ecc71 ";
      subTable2.style.border = "1px solid #333";

      subTable2Container.appendChild(subTable2);
      row.getElement().appendChild(subTable2Container);

      var subTable2 = new Tabulator(subTable2, {
        layout:"fitDataTable",
        data:row.getData().arrayIncidencias,
        columns:columsTable3
      })

      //---TABLE HORAS
      var subTable3Container = document.createElement("div");
      var subTable3 = document.createElement("div");

      subTable3Container.style.boxSizing = "border-box";
      subTable3Container.style.padding = "10px 30px 10px 10px";
      subTable3Container.style.borderTop = "1px solid   #17202a ";
      subTable3Container.style.borderBotom = "1px solid  #2ecc71 ";
      subTable3.style.border = "1px solid #333";

      subTable3Container.appendChild(subTable3);
      row.getElement().appendChild(subTable3Container);

      var subTable3 = new Tabulator(subTable3, {
        layout:"fitDataTable",
        data:row.getData().arrayHoras,
        columns:columsTable4
      })
      
      //---TABLE TOTALS
      var subTable4Container = document.createElement("div");
      var subTable4 = document.createElement("div");

      subTable4Container.style.boxSizing = "border-box";
      subTable4Container.style.padding = "10px 30px 10px 10px";
      subTable4Container.style.borderTop = "1px solid   #17202a ";
      subTable4Container.style.borderBotom = "1px solid  #2ecc71 ";
      subTable4.style.border = "1px solid #333";

      subTable4Container.appendChild(subTable4);
      row.getElement().appendChild(subTable4Container);

      var subTable4 = new Tabulator(subTable4, {
        layout:"fitDataTable",
        data:row.getData().arrayHorasTotales,
        columns:columsTable5
      })

    },
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

function getDrawTable(id, columnsData, tableData){
  $('#'+id).empty();
  var table = new Tabulator("#" + id, {
    height:"auto",
    layout:"fitDataTable",
    data:tableData,
    resizableRows:true,
    clipboard:true,
    clipboardPasteAction:"replace",
    textDirection:"ltr",
    columns:columnsData,
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
