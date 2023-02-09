// Reporte Production Forscast
// Librerias: Chart.js
var flag_element = 1;
var flag_show = true;
var count = 0;
var count_consult = 0;
var scrollInterval = null;

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
$('.div_card').hide();
$(".div_gauge").hide();
hideElement("title_demo");
hideElement("firstParameters");
hideElement("firstElement");
hideElement("secondElement");
hideElement("thirdElement");
hideElement("fourthElement");
hideElement("fivethElement");
hideElement("sixthElement");
hideElement("seventhElement");
hideElement("eigthElement");
hideElement("ninethElement");
hideElement("tenthElement");
hideElement("eleventhElement");
hideElement("twelfthElement");
hideElement("thirteenthElement");

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
    setDrawWeek();
    if (scriptId == null) {
      loadDemoData();
    }else{
      runFirstElement();
      setTimeout(()=> {},3000);
      setShowElements(0);
      setInterval(function(){
        getContador();
      }, 1000);
    
    }
    //--Styles

    setSpinner();
    $('#divOptions').show();
    $('#title_report').show();
    $("#week").multipleSelect('refresh');
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

  $('.title_tables').show();
  //unhideElement("title_demo")
  document.getElementById("firstParameters").style.removeProperty('display');
  
  getDrawTable('firstElement', columsTable1, dataTable1, 770);
  document.getElementById("firstElement").style.removeProperty('display');

  getDrawGauge('gaugeFirst', dataGauge1)
  document.getElementById("secondElement").style.removeProperty('display');

  getDrawGauge('gaugeSecond', dataGauge2)
  document.getElementById("thirdElement").style.removeProperty('display');

  getDrawGauge('gaugeThird', dataGauge3)
  document.getElementById("fourthElement").style.removeProperty('display');

  getDrawGauge('gaugeFourth', dataGauge4)
  document.getElementById("fivethElement").style.removeProperty('display');

  getDrawGauge('gaugeFiveth', dataGauge5)
  document.getElementById("sixthElement").style.removeProperty('display');

  getDrawGauge('gaugeSixth', dataGauge6)
  document.getElementById("seventhElement").style.removeProperty('display');

  getDrawGauge('gaugeSeventh', dataGauge7)
  document.getElementById("eigthElement").style.removeProperty('display');

  getDrawGauge('gaugeEigth', dataGauge8)
  document.getElementById("ninethElement").style.removeProperty('display');

  getDrawGauge('gaugeNineth', dataGauge9)
  document.getElementById("tenthElement").style.removeProperty('display');

  getDrawGauge('gaugeTeenth', dataGauge10)
  document.getElementById("eleventhElement").style.removeProperty('display');

  getDrawGauge('gaugeEleventh', dataGauge11)
  document.getElementById("twelfthElement").style.removeProperty('display');

  getDrawGauge('gaugeTwelfth', dataGauge12)
  document.getElementById("thirteenthElement").style.removeProperty('display');

  setShowElements(0)

}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  getFirstElement();
};

function getFirstElement(){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();

  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
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
      console.log('VALORES GENERALES',res.response);
      if (res.response.secondElement.tabledata.length) {
        getDrawGaugeList(res.response.secondElement.tabledata);
      }
      if (res.response.firstElement) {
        data = res.response.firstElement.hours

        if (data['total']['available']!= undefined){
          $("#textAlert1").text(data['total']['available'].toFixed(0))
        }
        if (data['total']['worked']!= undefined){
          $("#textAlert2").text(data['total']['worked'].toFixed(0))
        }

        if (data['Team 1']['available']!= undefined){
          $("#text_team1_01").text(data['Team 1']['available'].toFixed(0))
        }
        if (data['Team 1']['consumed']!= undefined){
          $("#text_team1_02").text(data['Team 1']['consumed'].toFixed(0) + '%')
        }

        if (data['Team 1']['worked']!= undefined){
          $("#text_team1_03").text(data['Team 1']['worked'].toFixed(0))
        }
        if (data['Team 1']['estimated']!= undefined){
          $("#text_team1_04").text(data['Team 1']['estimated'].toFixed(0))
        }

        if (data['Team 1']['stage2']!= undefined){
          $("#text_team1_05").text(data['Team 1']['stage2'].toFixed(0))
        }
        if (data['Team 1']['stage2_estimated']!= undefined){
          $("#text_team1_06").text(data['Team 1']['stage2_estimated'].toFixed(0))
        }

        if (data['Team 1']['stage3']!= undefined){
          $("#text_team1_07").text(data['Team 1']['stage3'].toFixed(0))
        }

        if (data['Team 1']['stage3_estimated']!= undefined){
          $("#text_team1_08").text(data['Team 1']['stage3_estimated'].toFixed(0))
        }

        
        if (data['Team 2']['available']!= undefined ){
          $("#text_team2_01").text(data['Team 2']['available'].toFixed(0))
        }

        if (data['Team 2']['consumed']!= undefined ){
          $("#text_team2_02").text(data['Team 2']['consumed'].toFixed(0) + '%')
        }

        if (data['Team 2']['worked']!= undefined ){
          $("#text_team2_03").text(data['Team 2']['worked'].toFixed(0))
        }

        if (data['Team 2']['estimated']!= undefined ){
          $("#text_team2_04").text(data['Team 2']['estimated'].toFixed(0))
        }

        if (data['Team 2']['stage2']!= undefined ){
          $("#text_team2_05").text(data['Team 2']['stage2'].toFixed(0))
        }

        if (data['Team 2']['stage2_estimated']!= undefined ){
          $("#text_team2_06").text(data['Team 2']['stage2_estimated'].toFixed(0))
        }

        if (data['Team 2']['stage3']!= undefined ){
          $("#text_team2_07").text(data['Team 2']['stage3'].toFixed(0))
        }

        if (data['Team 2']['stage3_estimated']!= undefined ){
          $("#text_team2_08").text(data['Team 2']['stage3_estimated'].toFixed(0))
        }


        if (data['Team 3']['available']!= undefined ){
          $("#text_team3_01").text(data['Team 3']['available'].toFixed(0))
        }
        if (data['Team 3']['consumed']!= undefined ){
          $("#text_team3_02").text(data['Team 3']['consumed'].toFixed(0) + '%')
        }

        if (data['Team 3']['worked']!= undefined ){
          $("#text_team3_03").text(data['Team 3']['worked'].toFixed(0))
        }
        if (data['Team 3']['estimated']!= undefined ){
          $("#text_team3_04").text(data['Team 3']['estimated'].toFixed(0))
        }

        if (data['Team 3']['stage2']!= undefined ){
          $("#text_team3_05").text(data['Team 3']['stage2'].toFixed(0))
        }
        if (data['Team 3']['stage2_estimated']!= undefined ){
          $("#text_team3_06").text(data['Team 3']['stage2_estimated'].toFixed(0))
        }

        if (data['Team 3']['stage3']!= undefined ){
          $("#text_team3_07").text(data['Team 3']['stage3'].toFixed(0))
        }
        if (data['Team 3']['stage3_estimated']!= undefined ){
          $("#text_team3_08").text(data['Team 3']['stage3_estimated'].toFixed(0))
        }
      }
      if (res.response.thirdElement){
        data = res.response.thirdElement.tabledata;
        data.sort(function (a, b) {
          if (a.progress > b.progress) {
            return 1;
          }
          if (a.progress < b.progress) {
            return -1;
          }
          return 0;
        });
        height = getDrawHeigth(data);
        getDrawTable('firstElement', columsTable1, data, height);
        document.getElementById("firstElement").style.removeProperty('display');
      }
      if (res.response.params.week){
        $("#text_weeek").text('Week: '+res.response.params.week)
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

//-----TIME
function setDrawWeek(){
  //--Week 
  date = new Date();
  oneJan = new Date(date.getFullYear(),0,1);
  numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  result = Math.ceil(( date.getDay() + 1 + numberOfDays) / 7);
  //$('#text_weeek').text('Week: '+result);

  //---Range Week
  date = new Date();
  monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
  date_from =  new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1);
  date_to = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7 - date.getDay());
  $('#text_range').text(monthNames[date_from.getMonth()] + ' ' + date_from.getDate() + ' to ' + monthNames[date_to.getMonth()] + ' ' + date_to.getDate());

  //---DAY
  date = new Date();
  $('#text_today').text('Today is '+ monthNames[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear() )
}

//-----TABLES
function getDrawTable(id, columnsData, tableData, height){
  var  table = new Tabulator("#" + id, {
    height: height + "px",
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
}

function getDrawHeigth(data) {
  valueHeigth = 30;
  numElements  = data.length;
  if (numElements > 0){
    valueHeigth = (numElements * 30)
  }
  return valueHeigth;
}

function setScrollTable(heigth, second){
  countScroll = 0;
  setTimeout(function(){
    heightTable = document.getElementById('firstElement').clientHeight; 
    console.log('heightTable',heightTable);
    if (heightTable > 650) {
      height = 0;
      heightTransition =  heightTable / 125;
      scrollInterval = setInterval(function(){
        height += heightTransition;
        window.scrollTo(0, height);
        console.log('height',height,'/',' heightTable', heightTable);
        heigthDifference = heightTable - 600;
        if (height >= heigthDifference){
          window.scrollTo(0, 0);
          height = 0;
        }
        countScroll += 1;
      }, 1000);
    }
  }, 3000);

}
//-----GAUGE
function getDrawGauge(id, data){
  var layout = { width: 340, height: 140, margin: { t: 42 , b: 0 } };
  Plotly.newPlot(id, data, layout);
}

function getFormatGauge(label, value, range, id) {
  range_steps = []
  range_value = range / 3;
  range_value2 = (range_value * 2)
  range_value3 = (range_value * 3)

  range_steps.push({ range: [0, range_value.toFixed(2)], color: "#ff5252" })
  range_steps.push({ range: [range_value.toFixed(2) , range_value2.toFixed(2) ], color: "#fdfc8b" })
  range_steps.push({ range: [range_value2.toFixed(2) , range_value3.toFixed(2) ], color: "#8db600" })


  dataGauge = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: value,
      title: { text: label , 'font': {'size': 20} },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, range], tickwidth: 1},
        bar: { color: "#f7bd53" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: range_steps,
      },
    }
  ];
  //console.log('DATA GAUGE',dataGauge)
  //console.log('Esquema',dataGauge);
  //---COntainer
  num = range.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  $('#text_' + id).text(num +' Eaches')
  getDrawGauge(id, dataGauge)
}

function getDrawGaugeList(data){
  if (data[0].length){
    if (data[0][0]){
      label = 'Total Required';
      value = data[0][0]['value'];
      range = data[0][0]['range'];
      id = 'gaugeFirst';
      getFormatGauge(label, value, range, id) 
    }
    if (data[0][1]){
      label = 'Stage 2';
      value = data[0][1]['value'];
      range = data[0][1]['range'];
      id = 'gaugeSecond';
      getFormatGauge(label, value, range, id) 
    }
    if (data[0][2]){
      label = 'Stage 3';
      value = data[0][2]['value'];
      range = data[0][2]['range'];
      id = 'gaugeThird';
      getFormatGauge(label, value, range, id) 
    }

    if (data[1][0]){
      label = 'Total Required';
      value = data[1][0]['value'];
      range = data[1][0]['range'];
      id = 'gaugeFourth';
      getFormatGauge(label, value, range, id) 
    }
    if (data[1][1]){
      label = 'Stage 2';
      value = data[1][1]['value'];
      range = data[1][1]['range'];
      id = 'gaugeFiveth';
      getFormatGauge(label, value, range, id) 
    }
    if (data[1][2]){
      label = 'Stage 3';
      value = data[1][2]['value'];
      range = data[1][2]['range'];
      id = 'gaugeSixth';
      getFormatGauge(label, value, range, id) 
    }

    if (data[2][0]){
      label = 'Total Required';
      value = data[2][0]['value'];
      range = data[2][0]['range'];
      id = 'gaugeSeventh';
      getFormatGauge(label, value, range, id) 
    }
    if (data[2][1]){
      label = 'Stage 2';
      value = data[2][1]['value'];
      range = data[2][1]['range'];
      id = 'gaugeEigth';
      getFormatGauge(label, value, range, id) 
    }
    if (data[2][2]){
      label = 'Stage 3';
      value = data[2][2]['value'];
      range = data[2][2]['range'];
      id = 'gaugeNineth';
      getFormatGauge(label, value, range, id) 
    }

    if (data[3][0]){
      label = 'Total Required';
      value = data[3][0]['value'];
      range = data[3][0]['range'];
      id = 'gaugeTeenth';
      getFormatGauge(label, value, range, id) 
    }
    if (data[3][1]){
      label = 'Stage 2';
      value = data[3][1]['value'];
      range = data[3][1]['range'];
      id = 'gaugeEleventh';
      getFormatGauge(label, value, range, id) 
    }
    if (data[3][2]){
      label = 'Stage 3';
      value = data[3][2]['value'];
      range = data[3][2]['range'];
      id = 'gaugeTwelfth';
      getFormatGauge(label, value, range, id) 
    }
  }
}

//-----TIMER SHOW
function setStopInterval(option = 0) {
  $("#divContent").hide();
  $('.load-wrapp').show();
  flag_show = false;
  setShowElements(option)
}

function getContador(){
  count ++;
  count_consult ++;
  //console.log('Segundo',count)
  console.log('Segundo General',count_consult)
  if (flag_show == true){
    if (count == 60) {
      $("#divContent").hide();
      $('.load-wrapp').show();
      if (flag_element == 0){
        setShowElements(0)
        flag_element = 1
      }
      else if (flag_element == 1){
        setShowElements(1)
        flag_element = 2
      }
      else if (flag_element == 2){
        setShowElements(2)
        flag_element = 0
      }  
      count = 0;
    }
  }  
  if (count_consult == 180) {
    runFirstElement();
    setTimeout(()=> {},1000);
    count_consult = 0;
  }
}

function setShowElements(option){
  console.log('OPtion', option)
  //---- HIDE
  $(".div_card").hide();
  $(".div_first").hide();
  $("#secondElement").hide();
  $("#thirdElement").hide();
  $("#fourthElement").hide();
  $("#fivethElement").hide();
  $("#sixthElement").hide();
  $("#seventhElement").hide();
  $("#eigthElement").hide();
  $("#ninethElement").hide();
  $("#tenthElement").hide();
  $("#eleventhElement").hide();
  $("#twelfthElement").hide();
  $("#thirteenthElement").hide();
 
  

  if (option == 0){
    $('#title_report').text('Report Production Plan Vs Done')
    $(".div_card").hide();
    $(".div_gauge").hide();
    $(".div_first").show();
    $("#secondElement").hide();
    $("#thirdElement").hide();
    $("#fourthElement").hide();
    $("#fivethElement").hide();
    $("#sixthElement").hide();
    $("#seventhElement").hide();
    $("#eigthElement").hide();
    $("#ninethElement").hide();
    $("#tenthElement").hide();
    $("#eleventhElement").hide();
    $("#twelfthElement").hide();
    $("#thirteenthElement").hide();

    $("#button_plant").addClass("active");
    $("#button_teams").removeClass("active");
    $("#button_hours").removeClass("active");
    setScrollTable();
  }
  else if(option == 1){
    $('#title_report').text('Report Production Plan Vs Done')
    $(".div_card").hide();
    $(".div_first").hide();
    $(".div_gauge").show();

    $("#secondElement").show();
    $("#thirdElement").show();
    $("#fourthElement").show();
    $("#fivethElement").show();
    $("#sixthElement").show();
    $("#seventhElement").show();
    $("#eigthElement").show();
    $("#ninethElement").show();
    $("#tenthElement").show();
    $("#eleventhElement").show();
    $("#twelfthElement").show();
    $("#thirteenthElement").show();

    $("#button_plant").removeClass("active");
    $("#button_teams").addClass("active");
    $("#button_hours").removeClass("active");
    clearInterval(scrollInterval);
  }
  else if(option == 2){
    $('#title_report').text('Work Hours Available, Worked and Estimated by Team an Stage')
    $(".div_card").show();
    $(".div_gauge").hide();
    $(".div_first").hide();
    $("#secondElement").hide();
    $("#thirdElement").hide();
    $("#fourthElement").hide();
    $("#fivethElement").hide();
    $("#sixthElement").hide();
    $("#seventhElement").hide();
    $("#eigthElement").hide();
    $("#ninethElement").hide();
    $("#tenthElement").hide();
    $("#eleventhElement").hide();
    $("#twelfthElement").hide();
    $("#thirteenthElement").hide();

    $("#button_plant").removeClass("active");
    $("#button_teams").removeClass("active");
    $("#button_hours").addClass("active");
    clearInterval(scrollInterval);
  }
  //---- STYLES
  setTimeout(()=> {
    $("#divContent").show();
    $('.load-wrapp').hide();
  }
  ,1500);
}