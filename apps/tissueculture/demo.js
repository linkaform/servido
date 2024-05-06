// Reporte Auditoria de Sucursrales
// Librerias: Dynatable y D3 charts

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
$('.div_card').hide();
$('.title_tables').hide();
$('.button-chart').hide();


hideElement("download_firstElement")


hideElement("title_demo")
//hideElement("firstElement");
hideElement("sixthElement");
hideElement("firstParameters");
//hideElement("secondElement");

hideElement("div_alert1");
hideElement("div_alert2");
hideElement("div_alert3");

window.onload = function(){
  var qs = urlParamstoJson();
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
    //get_parameters();
    var formNode = document.getElementById("appCont");
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


  if(us != "" && jw != "" || scriptId===null){
    hideElement("inicio_ses");
    unhideElement("close_sesion");
    userId = us;
    userJwt = jw;
    userName = getCookie("userName");

    //getRegionales();
    //getSucursales();
    unHideReportElements()
    if (scriptId == null) {
      loadDemoData();
    }else{
      $('.div_card').hide();
      $('.title_tables').hide();
    }
    //---MULTIPLE
    $("#sucursal").multipleSelect('refresh');
    //get_catalog();

    //---HIDE AND SHOW
    setSpinner();
    $('#divOptions').show();
    $('#title_report').show();
    document.getElementById("firstParameters").style.removeProperty('display');

  } else {
    unhideElement("inicio_ses");
    hideElement("title_demo");
    $('#divOptions').hide();
    $('#title_report').hide();
    $('.title_tables').hide();
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

function get_parameters(){
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 113130,
      only_users: true
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.response)
    {
      console.log(res.response)
    }
  })
}

function unHideReportElements(){
  //Set here all report elements that need to be unHiden on a loggin
  $('.title_tables').show();
  //$('.divOptions').show();
  unhideElement("firstParameters");
  //unhideElement("secondElement");
}

function loadDemoData(){
  unhideElement("title_demo")
  unhideElement("div_alert1");
  unhideElement("div_alert2");
  unhideElement("div_alert3");

  document.getElementById("firstParameters").style.removeProperty('display');

  document.getElementById("textAlert1").innerText = 10;
  document.getElementById("textAlert2").innerText = 10;
  drawFirstElement(dataFirstElement);
  //document.getElementById("firstElement").style.removeProperty('display');

  getDrawTable('secondElement', columsTable1, dataTable1);

  getDrawGauge('gaugeFirst', dataGauge1)
  document.getElementById("firstGauge").style.removeProperty('display');
  $("#sucursal").multipleSelect('refresh');

  //Tabla
  //document.getElementById("secondElementB").style.removeProperty('display');
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  //--show alert
  //unHideReportElements()
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");
  
  
  firstElement =getFirstElement( 
    date_from.value, 
    date_to.value,
    
    );
  //--Syle
  unhideElement("div_alert1");
  unhideElement("div_alert2");
  unhideElement("div_alert3");
  //unhideElement("firstElement");


  document.getElementById("firstParameters").style.removeProperty('display');
};

function getFirstElement(date_from, date_to){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();
  $('.div_card').hide();

  //----Clean
  //$("#firstElement").html("");
  
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 113907,
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
      //----Hide and show
      $('.load-wrapp').hide();
      $("#divContent").show();
      $('.title_tables').show();
      //----CLEAN
      document.getElementById("textAlert1").innerText = 0;
      document.getElementById("textAlert2").innerText = 0;

      $("#download_firstElement").hide();
      
      //hideElement("firstElement");
      

      let sucEvaluada = 0
      let numEval = 0
      let promedio = 0
      console.log(res.response.json)
      if (res.response.json.firstElement)
      {
        document.getElementById("textAlert1").innerText = res.response.json.firstElement.adjustInTotal;
        sucEvaluada = res.response.json.firstElement.adjustInTotal;
        
        document.getElementById("textAlert2").innerText = res.response.json.firstElement.adjustOutTotal;
        numEval = res.response.json.firstElement.adjustOutTotal;

        balanceTotal = res.response.json.firstElement.balanceTotal;

        var dataGauge = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: balanceTotal,
          title: { text: "Balance total" , 'font': {'size': 22} },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
          axis: { range: [null, 100], tickwidth: 1},
          bar: { color: "#018088" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
          { range: [0, 100], color: "#fff" }
          ],
          },
        }
        ];

        getDrawGauge('gaugeFirst', dataGauge)
      }
      if (res.response.json.secondElement){
        console.log("D A T A")
        //Gráfico de Evaluaciones por sucursal
        drawFirstElement(res.response.json.secondElement);
        //drawFirstElement(dataFirstElement);
        //document.getElementById("firstElement").style.removeProperty('display');

        /*res.response.json.thirdElement.data.forEach(element =>{
          promedio += element['score']
        })
        promedio = promedio / res.response.json.thirdElement.data.length;
        unhideElement("firstElement")*/
        //unhideElement("firstElement")
        $("#download_firstElement").show();
      }
      if(res.response.json.thirdElement.data){
        getDrawTable('secondElement', columsTable1, res.response.json.thirdElement.data);
      }
      if (res.response.json.fourthElement){
        //Grafico de evaluaciones por sucursal
        unhideElement("fourthElement")
        $("#download_secondElement").show();
        drawFourthElement(res.response.json.fourthElement.data);
      }
      if (res.response.json.fivethElement){
        //Grafico para evaluacioens por regional
        unhideElement("secondElement")
        $("#download_secondElement").show();
        drawSecondElement(res.response.json.fivethElement.data);
      }
      if (res.response.json.sixthElement){
        //Grafico para evaluaciones por sección
        unhideElement("thirdElement")
        $("#download_thirdElement").show();
        drawThirdElement(res.response.json.sixthElement.data);
      }
      if (res.response.json.seventhElement){
        console.log("------------------------")
        console.log(res.response.json.seventhElement)
        console.log("------------------------")
        unhideElement("seventhElement")
        unhideElement("eigthElement");
        unhideElement("fivethElement")
        drawFivethElement(res.response.json.seventhElement);
        $("#download_fivethElement").show();
        //drawFivethElement(res.response.json.seventhElement);
      }
      /*if (res.response.json.fourthElement.length){
        getDrawTable('fivethElement', columsTable1, res.response.json.fourthElement, 'auto');
        document.getElementById("fivethElement").style.removeProperty('display');
      }*/
      
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
          text: 'Visitas por promotor',
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

//-----GAUGE
function getDrawGauge(id, data){
  var layout = { width: 340, height: 190, margin: { t: 42 , b: 0 } };
  Plotly.newPlot(id, data, layout);
}

//-----TABLES
function getDrawTable(id, columnsData, tableData){
  var  table = new Tabulator("#" + id, {
    height:"100%",
    layout:"fitDataTable",
    data:tableData,
    resizableRows:false,
    dataTree:true,
    dataTreeStartExpanded:false,
    clipboard:true,
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
