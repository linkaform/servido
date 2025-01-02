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
    unHideReportElements()
    if (scriptId == null) {
      loadDemoData();
    }
    console.log('estilos')
    //--Styles
    setSpinner();
    setDate();
    //get_catalog();
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
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';


//-----DEMO 
function loadDemoData(){
  $('.title_tables').show();
  unhideElement("title_demo")
  document.getElementById("firstParameters").style.removeProperty('display');

  getDrawTable('firstElement', columsTable1, dataTable1, 350);
  document.getElementById("firstElement").style.removeProperty('display');

  getDrawGraphicFirst(data1, setOptions1);
  document.getElementById("secondElement").style.removeProperty('display');
  
  getDrawGraphicSecond(data2, setOptions2);
  document.getElementById("thirdElement").style.removeProperty('display');
 
  getDrawGraphicThird(data3, setOptions3);
  document.getElementById("fourthElement").style.removeProperty('display');

  getDrawGraphicFourth(data4, setOptions4);
  document.getElementById("fifthElement").style.removeProperty('display');

//   getDrawTable('thirdElement', columsTable2, dataTable2, 350);
//   document.getElementById("thirdElement").style.removeProperty('display');

//   getDrawGraphicSecond(data2, setOptions2);
//   document.getElementById("fourthElement").style.removeProperty('display');
}

//-----DATE
function setDate(){
  array_month = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  //---DATE TO
  date_to = new Date();
  year = date_to.getFullYear();
  month = array_month[date_to.getMonth()];
  day = date_to.getDate();
  date_to = year +'-'+ month +'-'+ day;
  $('#date_to').val(date_to);
  //---DATE FROM
  date_from = new Date();
  date_from.setDate(date_from.getDate() - 30)

  year = date_from.getFullYear();
  month = array_month[date_from.getMonth()];
  day = date_from.getDate();
  date_from = year +'-'+ month +'-'+ day;
  $('#date_from').val(date_from);
}

//-----EXCUTION
function runFirstElement(){
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");  
  //let promotor = document.getElementById("promotor");  

  if (date_from.value != null && date_to.value != null && date_from.value != "" && date_to.value != ""){
    getFirstElement(date_to.value, date_from.value);
  }else if(date_from.value && !date_to.value){
    {
      Swal.fire({
        title: 'Debes seleccionar una fecha hasta.',
        type: "warning",
        width: 800,
      });
    }
  }else{
    getFirstElement(date_to.value, date_from.value);
  }
}

function getFirstElement(dateTo, dateFrom){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();


  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      date_from: dateFrom,
      date_to: dateTo,
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
      if (res.response.dataReport.firstElement.data) {
        getDrawTable('firstElement', columsTable1, res.response.dataReport.firstElement.data, 350);
        document.getElementById("firstElement").style.removeProperty('display');
       
      }

      if (res.response.dataReport.secondElement.data) {
        getDrawGraphicFirst(res.response.dataReport.secondElement.data, setOptions1, 'dataFetch');
        document.getElementById("secondElement").style.removeProperty('display');
      }

      if (res.response.dataReport.thirdElement.data) {
        getDrawGraphicSecond(res.response.dataReport.thirdElement.data, setOptions2, 'dataFetch');
        document.getElementById("thirdElement").style.removeProperty('display');
      }

      // if (res.response.dataReport.thirdElement.data) {
      //   getDrawGraphicSecond(res.response.dataReport.thirdElement.data, setOptions2, 'dataFetch');
      //   document.getElementById("thirdElement").style.removeProperty('display');
      // }

      if (res.response.dataReport.fifthElement.data) {
        getDrawGraphicFourth(res.response.dataReport.fifthElement.data, setOptions4, 'dataFetch');
        document.getElementById("fifthElement").style.removeProperty('display');
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
function getDrawTable(id, columnsData, tableData, height = 500){
  var  table = new Tabulator("#" + id, {
    height:height +"px",
    data:tableData,
    resizableRows:true,
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

//-----GRAPICH
let chart1;
function getDrawGraphicFirst(data, setOptions, option){
  //---CHART
  var ctx = document.getElementById('graphicFirst').getContext('2d');
  if (chart1) {
    chart1.destroy();
  }
  let dataFormateada = data
  if(option == 'dataFetch'){
    const dataLabels = data.map(label => {
      return label._id
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    });
    const dataConteo = data.map(label => label.conteo);
    dataFormateada = {
      labels: dataLabels,
      datasets: [
        {
          label: 'Leads Generados',
          data: dataConteo,
          backgroundColor: '#FFC145',
          borderColor: '#FFC145',
          borderWidth: 1,
        },
      ]
    };
  }

  chart1 = new Chart(ctx, {
    type: 'bar',
    data:dataFormateada,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}


let chart2;
function getDrawGraphicSecond(data, setOptions, option){
  //---CHART
  var ctx = document.getElementById('graphicSecond').getContext('2d');
  if (chart2) {
    chart2.destroy();
  }
  let dataFormateada = data
  if(option == 'dataFetch'){
    const dataLabels = data.map(label => `${label.mes}-${label.anio}`);
    const dataSi = data.map(label => label.porcentaje_si);
    const dataNo = data.map(label => label.porcentaje_no);
    dataFormateada = {
      labels: dataLabels,
      datasets: [
          {
              label: 'Sí',
              data: dataSi, 
              backgroundColor: '#5CB338',
              borderColor: 'transparent',
              fill: true
          },
        {
          label: 'No',
          data: dataNo, 
          backgroundColor: '#e74c3c',
          borderColor: 'transparent',
          fill: true
        }
      ]
    }
  }

  chart2 = new Chart(ctx, {
    type: 'bar',
    data:dataFormateada,
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

let chart4;
function getDrawGraphicFourth(data, setOptions, option){
  //---CHART
  var ctx = document.getElementById('graphicFourth').getContext('2d');
  if (chart4) {
    chart4.destroy();
  }
  let dataFormateada = data
  if(option == 'dataFetch'){
    const dataLabels = data.map(label => `${label.mes}-${label.anio}`);
    const dataPorcentaje = data.map(label => label.porcentaje_cierre);
    dataFormateada = {
      labels: dataLabels,
      datasets: [
          {
              label: 'Porcentaje de Cierre',
              data: dataPorcentaje,
              borderColor: '#E16A54',
              backgroundColor: 'rgba(155, 89, 182, 0.2)',
              tension: 0.4,
              borderWidth: 2,
              pointBackgroundColor: 'blue',
              pointBorderColor: 'darkblue',
              pointRadius: 3,
          }
      ]
    }
  }

  chart4 = new Chart(ctx, {
    type: 'line',
    data:dataFormateada,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}

