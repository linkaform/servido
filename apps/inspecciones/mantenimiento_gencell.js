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
hideElement("graphicFourth");

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
    }else{
      //--Catalog
      get_catalog(1);
    }
    //--Styles
    setSpinner();
    $('#divOptions').show();
    $('#title_report').show();
    //$("#cliente").multipleSelect('refresh');
    /*$("#canton").multipleSelect('refresh');
    $("#parroquia").multipleSelect('refresh');*/
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
  
  getDrawTable('firstElement', columsTable1, dataTable1, '295px');
  document.getElementById("firstElement").style.removeProperty('display');

  drawFirstElement(dataFirstElement);
  document.getElementById("secondElement").style.removeProperty('display');

  getDrawTable('thirdElement', columsTable2, dataTable2, '380px');
  document.getElementById("thirdElement").style.removeProperty('display');

  drawSecondElement(dataSecondElement);
  document.getElementById("graphicFourth").style.removeProperty('display');
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");  
  let cliente = $("#cliente").val()
  console.log("clientes")
  console.log(cliente)  
  console.log(date_from.value)
  console.log(date_to.value)
  getFirstElement(
    date_to.value,
    date_from.value, 
    cliente
  );
};

function getFirstElement(dateTo, dateFrom, cliente){
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
      cliente: cliente,
      
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
        console.log(res.response.json.firstElement.data)
        getDrawTable('firstElement', columsTable1, res.response.json.firstElement.data);
        document.getElementById("firstElement").style.removeProperty('display');
      }
      if (res.response.json.secondElement.data[0]) {
        console.log(res.response.json.secondElement.data[0])
        drawFirstElement(res.response.json.secondElement.data[0]);
        document.getElementById("secondElement").style.removeProperty('display');
      }
      if (res.response.json.thirdElement.data) {
        console.log(res.response.json.thirdElement.data)
        getDrawTable('thirdElement', columsTable2, res.response.json.thirdElement.data, '380px');
        document.getElementById("thirdElement").style.removeProperty('display');
      }
      if (res.response.json.fourthElement.data) {
        console.log("Fourth element")
        console.log(res.response.json.fourthElement.data)
        drawSecondElement(res.response.json.fourthElement.data);
        document.getElementById("graphicFourth").style.removeProperty('display');
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
function getDrawTable(id, columnsData, tableData, heightTable='300px'){
  var  table = new Tabulator("#" + id, {
    height:"100%",
    layout:"fitDataTable",
    data:tableData,
    resizableRows:false,
    dataTree:true,
    dataTreeStartExpanded:true,
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
}

//----- CATALOGS
function get_catalog(option = 1) 
{
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 114449,
      option: option,
      
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
      if (res.response.json.catalog){
        console.log("Los datos son: ")
        console.log(res.response.json.catalog)
        if (option == 1){
          //-----FILTER PROVINCIA 
          $("#cliente").empty();
          //$('#cliente').append('<option value="--">Seleccione el cliente</option>');
          for (i = 0; i < res.response.json.catalog.length; i++) {
            value = res.response.json.catalog[i]
            $('#cliente').append('<option value="'+ value +'">'+value+'</option>');
          }
          $("#cliente").multipleSelect('refresh');
        }

      }
  })
};

//-----SELECT
$(function() {
    $('#cliente').multipleSelect({
      filter: true,
      /*
      onClick: function (view) {
        console.log('onClick event fire! view: ' + JSON.stringify(view) + '\n');
      },
      */
      onClose: function () {
        get_catalog(2);
      },
    })

    $('#canton').multipleSelect({
      filter: true,
      /*
      onClick: function (view) {
        console.log('onClick event fire! view: ' + JSON.stringify(view) + '\n');
      },
      */
      onClose: function () {
        get_catalog(3);
      },
    })

})

//-----GRAPHIC
//Configuration for the graphic
let chart2;
function  drawFirstElement(data){
  //unhideElement("firstElement");
  var ctx = document.getElementById("graphicFirst").getContext('2d');

  if (chart2){
    chart2.destroy()
  }

  chart2 = new Chart(ctx,{
    type: "pie",
    data:data,
    plugins: [ChartDataLabels],
    options: {
    responsive: true,
    /*plugins: {

      tooltip: {
        callbacks: {
          title: function(context) {
              console.log(context)
              const labelIndex = (context[0].datasetIndex * 2) + context[0].dataIndex;
              return context[0].chart.data.labels[labelIndex]
          },

          label: function(context) {
            console.log(context)
            const labelIndex = (context.datasetIndex * 2) + context.dataIndex;
            return context.chart.data.labels[labelIndex] + ': ' + context.formattedValue;
          }

        }
      }
    }*/
    plugins: {
      legend: {
        labels: {
          generateLabels: function(chart) {
            // Get the default label list
            const original = Chart.overrides.pie.plugins.legend.labels.generateLabels;
            const labelsOriginal = original.call(this, chart);

            // Build an array of colors used in the datasets of the chart
            let datasetColors = chart.data.datasets.map(function(e) {
              return e.backgroundColor;
            });
            datasetColors = datasetColors.flat();

            // Modify the color and hide state of each label
            labelsOriginal.forEach(label => {
              // There are twice as many labels as there are datasets. This converts the label index into the corresponding dataset index
              label.datasetIndex = (label.index - label.index % 2) / 2;

              // The hidden state must match the dataset's hidden state
              label.hidden = !chart.isDatasetVisible(label.datasetIndex);

              // Change the color to match the dataset
              label.fillStyle = datasetColors[label.index];
            });

            return labelsOriginal;
          }
        },
        onClick: function(mouseEvent, legendItem, legend) {
          // toggle the visibility of the dataset from what it currently is
          legend.chart.getDatasetMeta(
            legendItem.datasetIndex
          ).hidden = legend.chart.isDatasetVisible(legendItem.datasetIndex);
          legend.chart.update();
        }
      },
      tooltip: {
        callbacks: {
          title: function(context) {
              console.log(context)
              const labelIndex = (context[0].datasetIndex * 2) + context[0].dataIndex;
              return context[0].chart.data.labels[labelIndex]
          },
          
          label: function(context) {
            const labelIndex = (context.datasetIndex * 2) + context.dataIndex;
            return context.chart.data.labels[labelIndex] + ': ' + context.formattedValue;
          }
        }
      }
    }
  },
  })
}

let chart3;
function  drawSecondElement(data){
  //unhideElement("firstElement");
  var ctx = document.getElementById("graphicSecond").getContext('2d');

  if (chart3){
    chart3.destroy()
  }

  chart3 = new Chart(ctx,{
    type: "bar",
    data:data,
    plugins: [ChartDataLabels],
    options: {
      plugins:{
        legend: {
          display: false
        },
        scales:{
          yAxes: [{ticks: {min:1, max:200}}],
        },
        title:{
          display: true,
          text: 'Mantenimientos por Tecnico',
          font: {
            size: 25
          }
        },
        datalabels:{
          color: 'black',
          labels: {
            title: {
              font: {
                weight: 'bold'
              }
            },
          },
          align: 'top'
        }
      }
    }
  })
}
