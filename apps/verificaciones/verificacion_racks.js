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
    //--Select
    $("#almacen").multipleSelect('refresh');
    $("#pasadiso").multipleSelect('refresh');
    $("#cara").multipleSelect('refresh');
    $("#color").multipleSelect('refresh');
    $("#pregunta").multipleSelect('refresh');
    
    //--Styles
    setSpinner();
    $('#divOptions').show();
    $('#title_report').show();
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
}

function loadDemoData(){
  unhideElement("title_demo")
  $('.title_tables').show();
  document.getElementById("firstParameters").style.removeProperty('display');
  
  getDrawTable('firstElement', columsTable1, dataTable1, 280);
  document.getElementById("firstElement").style.removeProperty('display');


  getDrawGraphic(data1, setOptions1, 'graphicFirst', 'doughnut')
  document.getElementById("secondElement").style.removeProperty('display');
  document.getElementById("graphicFirst").style.removeProperty('display');


  getDrawGraphic(data2, setOptions2, 'graphicSecond', 'bar')
  document.getElementById("thirthElement").style.removeProperty('display');
  document.getElementById("graphicSecond").style.removeProperty('display');

  getDrawTable('fourthElement', columsTable2, dataTable2, 430);
  document.getElementById("fourthElement").style.removeProperty('display');
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  let almacen = $('#almacen').val();
  let pasadiso = $('#pasadiso').val();
  let cara = $('#cara').val();
  let torre = $('#torre').val();
  let num_rack = $('#number_rack').val();
  let color = $('#color').val();
  let pregunta = $('#pregunta').val();
  console.log('NUM RACK', num_rack);
  getFirstElement(almacen, pasadiso, cara, torre, num_rack, color, pregunta);
};

function getFirstElement(almacen, pasadiso, cara, torre, num_rack, color, pregunta){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();


  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      almacen: almacen,
      pasadiso: pasadiso,
      cara: cara,
      torre: torre,
      num_rack: num_rack,
      color: color,
      pregunta: pregunta,
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
      if (res.response.json.firstElement.data) {
        getDrawTable('firstElement', columsTable1, res.response.json.firstElement.data,350);
        document.getElementById("firstElement").style.removeProperty('display');
      }

      if (res.response.json.secondElement) {
        getDrawGraphic1(res.response.json.secondElement, setOptions1, 'graphicFirst', 'doughnut')
        document.getElementById("secondElement").style.removeProperty('display');
        document.getElementById("graphicFirst").style.removeProperty('display');
      }
      
      if (res.response.json.thirdElement) {
        getDrawGraphic2(res.response.json.thirdElement, setOptions2, 'graphicSecond', 'bar')
        document.getElementById("thirthElement").style.removeProperty('display');
        document.getElementById("graphicSecond").style.removeProperty('display');
      }

      if (res.response.json.fourthElement.data) {
        let columsTable = setColumsData(columsTable2)
        getDrawTable('fourthElement', columsTable, res.response.json.fourthElement.data,500);
        document.getElementById("fourthElement").style.removeProperty('display');
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
function getDrawTable(id, columnsData, tableData, height){
  var  table = new Tabulator("#" + id, {
    height:height + "px",
    layout:"fitDataTable",
    data:tableData,
    resizableRows:false,
    dataTree:true,
    dataTreeStartExpanded:false,
    clipboard:true,
    clipboardPasteAction:"replace",
    textDirection:"ltr",
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

  //---PDF
  var element = document.getElementById("download_pdf_"+id);
  if (element)
  {
    document.getElementById("download_pdf_"+id).replaceWith(document.getElementById("download_pdf_"+id).cloneNode(true));
    document.getElementById("download_pdf_"+id).addEventListener("click", function(){
      table.download("pdf", "data.pdf", {
          orientation:"landscape", //set page orientation to portrait
          format:'legal', // set needed dimensions for any element
          theme: 'grid',
          autoTable:function(doc)
          { 
            var margins = 30;
            var leftMargin = 40;
            var marginsIndent = 40;
            //----IMAGENES
            // Parametros - Posición weigth / Posición heigt / Weigth / Heigth 
            doc.addImage(img1_ceint, 'PNG', 35, 5, 90, 50);
            doc.setFont("helvetica");
            doc.setFontSize(18);
            doc.text(300, 50, 'Resumen de Inspecciones');

            return {
              styles: {
                cellPadding: 2, 
                fontSize: 8,
                halign : 'center'
              },
              headStyles: {
                fillColor: [38, 107, 115],
                valign: 'middle'
              },
              alternateRowStyles: {
                fillColor : [220, 230, 241]
              },
              columnStyles: {
                0: {cellWidth: 'auto',valign: 'middle', halign:'left'},
                1: {cellWidth: 'auto',valign: 'middle', halign:'center'},
                2: {cellWidth: 'auto',valign: 'middle', halign:'center'},
                3: {cellWidth: 'auto',valign: 'middle', halign:'center'},
                4: {cellWidth: 'auto',valign: 'middle', halign:'center'},
              },
              margin: { top: 10 },
              startY: 80, //This was the way to push the start of the table down
            };
          },
          createdCell: function(cell, opts) {
            if (opts.column.index == 1) {        
              cell.styles.textColor = "#20a8d8";
              cell.styles.fillColor = "#000";
            }
          },
      });
    });

  }
}

//-----GHRAPICH
let chart1;
function getDrawGraphic1(data, setOptions, canvas, type){
  //---CHART
  var ctx = document.getElementById(canvas).getContext('2d');
  if (chart1) {
    chart1.destroy();
  }

  chart1 = new Chart(ctx, {
    type: type,
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}


let chart2;
function getDrawGraphic2(data, setOptions, canvas, type){
  //---CHART
  var ctx = document.getElementById(canvas).getContext('2d');
  if (chart2) {
    chart2.destroy();
  }

  chart2 = new Chart(ctx, {
    type: type,
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}



//----CUSTOM COLUMS
function setColumsData(columsData){
  ///----VALORES
  filter = $("#pregunta").val()
  array_filter = []
  if (filter!=undefined){
    for (var i = 0; i < filter.length; i++) {
      value = filter[i]
      value = Number(value)
      array_filter.push(value)
    }
  }
  //----FORMATEO
  newColums = []
  count = 0
  if(filter!=undefined){
    if (array_filter.length > 0){
      for (var i = 0; i < columsData.length; i++) {
        if (i>=8 && i<=29) {
          if (array_filter.includes(count+1)) {
            newColums.push(columsData[i])
            console.log(columsData[i])
            console.log(count)
          }
          count+=1
        }else{
          newColums.push(columsData[i])
        }
      }
      columsData = newColums;
    }
  }
  console.log('Columnas',columsData);
  return columsData
}