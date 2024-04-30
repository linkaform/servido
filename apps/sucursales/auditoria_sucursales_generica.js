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
//$('.div_card').hide();
//$('.title_tables').hide();
$('.button-chart').hide();


hideElement("download_firstElement")
hideElement("download_secondElement")
hideElement("download_thirdElement")
hideElement("download_fourthElement")
hideElement("download_graphicFiveth")

hideElement("title_demo")
hideElement("firstParameters");
hideElement("firstElement");
hideElement("sixthElement");
hideElement("secondElement");
hideElement("thirdElement");
hideElement("fourthElement");
hideElement("fivethElement");
hideElement("seventhElement");
hideElement("eigthElement");

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
      //---MULTIPLE
    }else{
      $('.div_card').hide();
      $('.title_tables').hide();
    }
    $("#sucursal").multipleSelect('refresh');
    $("#bodega").multipleSelect('refresh');
    get_catalog_request();
    //---HIDE AND SHOW
    setSpinner();
    $('#divOptions').show();
    $('#title_report').show();
    document.getElementById("firstParameters").style.removeProperty('display');
  } else {
    //loadDemoData()
    unhideElement("inicio_ses");
    hideElement("title_demo");
    $('#divOptions').hide();
    $('#title_report').hide();
    $('.title_tables').hide();
    $("#tienda").multipleSelect('refresh');
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
  //$('.title_tables').show();
  unhideElement("firstParameters");
  unhideElement("close_sesion");
  unhideElement("firstElement");
  unhideElement("secondElement");
  unhideElement("thirdElement");
  unhideElement("fivethElement");
  unhideElement("seventhElement");
  unhideElement("fourthElement");
  unhideElement("sixthElement");
}

function loadDemoData(){
  unhideElement("title_demo")
  unhideElement("div_alert1");
  unhideElement("div_alert2");
  unhideElement("div_alert3");

  document.getElementById("firstParameters").style.removeProperty('display');

  //---Accountans
  document.getElementById("textAlert1").innerText = 10;
  document.getElementById("textAlert2").innerText = 10;
  getDrawGauge('gaugeFirst', 80);

  //---Graphic

  drawGraphicFirst(dataGraphic1,setOptions1)
  drawGraphicSecond(dataGraphic2,setOptions2)
  drawGraphicThird(dataGraphic3,setOptions3)
  drawGraphicFourth(dataGraphic4,setOptions4)
  drawFivethElement(dataFivethElement);
  //----Css
  unhideElement("seventhElement")
  unhideElement("eigthElement");
  unhideElement("fivethElement")
  $("#tienda").multipleSelect('refresh');
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  //--show alert
  unHideReportElements()
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");
  let pais = document.getElementById('pais');
  let regional = document.getElementById("regional");
  let transversal = $('#transversal').val();
  let sucursal = $('#sucursal').val();
  let bodega = $("#bodega").val();
  let option = 'terminada';
  if (document.getElementById('input_check').checked)
  {
    option = 'programada';
  }

  if(regional.value=="--"){
    Swal.fire({
      title:"Opps",
      text:"Necesita seleccionar un regional.",
    })
  }else{
    firstElement =getFirstElement( 
      date_from.value, 
      date_to.value,
      pais.value,
      regional.value,
      transversal,
      sucursal,
      bodega,
      option
    );

  }
  //--Syle
  unhideElement("div_alert1");
  unhideElement("div_alert2");
  unhideElement("div_alert3");

  document.getElementById("firstParameters").style.removeProperty('display');
};

function getFirstElement(date_from, date_to, pais, regional, transversal, sucursal, bodega, status){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();
  $('.div_card').hide();

  //----Clean
  $("#firstElement").html("");
  $("#secondElement").html("");
  $("#thirdElement").html("");
  $("#fivethElement").html("");

  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 113130,
      date_from: date_from,
      date_to: date_to,
      pais:pais,
      regional: regional,
      transversal: transversal,
      sucursal: sucursal,
      bodega:bodega,
      status:status,
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
      $("#download_secondElement").hide();
      $("#download_thirdElement").hide();
      $("#download_fourthElement").hide();
      $("#download_graphicFiveth").hide();

      hideElement("firstElement");
      hideElement("secondElement");
      hideElement("thirdElement");
      hideElement("fivethElement");
      hideElement("fourthElement");
      hideElement("seventhElement");

      let sucEvaluada = 0
      let numEval = 0
      if (res.response.json.firstElement)
      {
        document.getElementById("textAlert1").innerText = res.response.json.firstElement.numSucursales[0]['total'];
        sucEvaluada = res.response.json.firstElement.numSucursales[0]['total'];
      }
      if (res.response.json.firstElement)
      {
        document.getElementById("textAlert2").innerText = res.response.json.firstElement.numEvaluaciones[0]['total'];
        numEval = res.response.json.firstElement.numEvaluaciones[0]['total'];
      }
      if (res.response.json.thirdElement){
        let data = res.response.json.thirdElement.data;
        average = data.datasets[0].data.length > 0 ?  getAverageData(data.datasets[0].data) : 0;
        drawGraphicFirst(data, setOptions1);
        getDrawGauge('gaugeFirst', average)
      }
      if (res.response.json.fourthElement){
        let data = res.response.json.fourthElement.data;
        drawGraphicSecond(data, setOptions2);
      }
      if (res.response.json.fivethElement){
        let data = res.response.json.fivethElement.data;
        drawGraphicThird(data, setOptions3);
      }
      if (res.response.json.sixthElement){
        let data = res.response.json.sixthElement.data;
        drawGraphicFourth(data, setOptions4);
      }
      if (res.response.json.seventhElement){
        unhideElement("seventhElement")
        unhideElement("eigthElement");
        unhideElement("fivethElement")
        drawFivethElement(res.response.json.seventhElement);
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

//-----GRAPICH
let chart1;
function drawGraphicFirst(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicFirst').getContext('2d');
  if (chart1) {
    chart1.destroy();
  }

  chart1 = new Chart(ctx, {
    type: 'bar',
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}

let chart2;
function drawGraphicSecond(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicSecond').getContext('2d');
  if (chart2) {
    chart2.destroy();
  }
  chart2 = new Chart(ctx, {
    type: 'bar',
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}

let chart3;
function drawGraphicThird(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicThird').getContext('2d');
  if (chart3) {
    chart3.destroy();
  }
  chart3 = new Chart(ctx, {
    type: 'bar',
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}

let chart4;
function drawGraphicFourth(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicFourth').getContext('2d');
  if (chart4) {
    chart4.destroy();
  }
  chart4 = new Chart(ctx, {
    type: 'bar',
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}


function drawFourthElement(data){
  $('#fourthElement').empty();
   const margin = {top: 30, right: 30, bottom: 90, left: 90},
       width = 800 - margin.left - margin.right,
       height = 700 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3.select("#fourthElement")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

  d3.json("https://f001.backblazeb2.com/file/app-linkaform/public-client-126/561/5a7269f5f851c20c1bc7e87a/625de318a5b8b1b47d98bf51.txt").then( function(notUsed) {

  // X axis
  const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(d => d.perfil))
  .padding(0.2);

  svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("font-size", "14px")
  .style("text-anchor", "end");

  // Add Y axis
  const y = d3.scaleLinear()
  .domain([0, 10])
  .range([ height, 0]);

  svg.append("g")
  .call(d3.axisLeft(y));

  // Bars
  svg.selectAll("mybar")
    .data(data)
    .join("rect")
    .attr("x", d => x(d.perfil))
    .attr("y", d => y(d.score))
    .attr("fill", function(d) {
      if (d.score >= 80) {
        return "#27ae60";
      } else if (d.score >= 60 && d.score<=79.999) {
        return "#f1c40f";
      }
      else if(d.score<=59.999)
      {
        return " #e74c3c ";
      }
    })
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.score))
  })



  //---TItulo
  svg.append("text")
  .attr("x", (width / 2))
  .attr("y", 0 - (margin.top / 2))
  .attr("text-anchor", "middle")
  .style("font-size", "18px")
  .text("Evaluaciones por Transversal");

  const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(d => d.perfil))
  .padding(0.2);

  const y = d3.scaleLinear()
  .domain([0, 10])
  .range([ height, 0]);


  svg.selectAll(".label")
  .data(data)
  .enter()
  .append('text')
  .text((data) => (data.score) + '% / ' +data.total)
  .attr('x', data => x(data.perfil) + x.bandwidth() / 2)
  .attr('y', data => y(data.score) - 80)
  .style('fill','#494949')
  .style("font-size", "13.5px")
  .attr('text-anchor','middle');
}

function drawFivethElement(data){
  name_array = []
  name_array.push(data);
  id = 'fivethElement'
  getDrawGraphicFiveth(data, setOptions6, id,'line', 'Historico');
}

function getDrawGraphicFiveth(data, setOptions, canvas, type, name){
  let chart;
  //---CHART
  var ctx = document.getElementById(canvas).getContext('2d');
  if (chart) {
    chart.destroy();
  }

  setOptions['plugins']['title']['text'] = name
  chart = new Chart(ctx, {
    type: type,
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}

//-----GAUGE
function getDrawGauge(id, promedio){
  dataGauge = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: promedio,
      title: { text: "Resultado promedio" , 'font': {'size': 22} },
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
  var layout = { width: 340, height: 190, margin: { t: 42 , b: 0 } };
  Plotly.newPlot(id, dataGauge, layout);
}

//-----ALERTS
function getAverageData(data){
  let average = 0;
  if( data.length > 0){
    for (var i = 0; i < data.length; i++) {
      average += data[i];
    }
    average = average/data.length;
    average = average.toFixed(2);

  }
  return average;
}
//-----CATALOGS
function get_catalog_request(){
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 113130,
      option: 'get_catalogs',
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      let data = res.response;
      if ('catalog_country' in data && data['catalog_country'] !== '') {
        let data_list = data['catalog_country'];
        set_data_catalog('catalogCountry',data_list);
      }
      if ('catalog_transverse' in data && data['catalog_transverse'] !== '') {
        let data_list = data['catalog_transverse'];
        set_data_catalog('catalogTransverse',data_list);
      }
      if ('catalog_regional' in data && data['catalog_regional'] !== '') {
        let data_list = data['catalog_regional'];
        set_data_catalog('catalogRegional',data_list);
      }
      if ('catalog_branch_winery' in data) {
        let data_list_branch = data['catalog_branch_winery']['branch'];
        let data_list_winery = data['catalog_branch_winery']['winery'];
        if(data_list_branch != ''){
          set_data_catalog('catalogBranch',data_list_branch);
        }
        if(data_list_winery != ''){
          set_data_catalog('catalogWinery',data_list_winery);
        }
      }
    } else {
      console.log('Error',res.error);
    }
  })
}

function set_data_catalog(type, data){
  if(type == 'catalogCountry'){
    var select = document.getElementById("pais");
    for (var i = 0; i < data.length; i++) {
      var element = data[i];
      var optionElement = document.createElement("option"); 
      optionElement.text = element; 
      optionElement.value = element; 
      select.appendChild(optionElement); 
    }
  }else if(type == 'catalogTransverse'){
    var select = document.getElementById("transversal");
    for (var i = 0; i < data.length; i++) {
      var element = data[i];
      var optionElement = document.createElement("option"); 
      optionElement.text = element; 
      optionElement.value = element; 
      select.appendChild(optionElement); 
    }
  }else if(type == 'catalogRegional'){
    var select = document.getElementById("regional");
    for (var i = 0; i < data.length; i++) {
      var element = data[i];
      var optionElement = document.createElement("option"); 
      optionElement.text = element; 
      optionElement.value = element; 
      select.appendChild(optionElement); 
    }
  }else if(type == 'catalogBranch'){
    var select = document.getElementById("sucursal");
    for (var i = 0; i < data.length; i++) {
      var element = data[i];
      var optionElement = document.createElement("option"); 
      optionElement.text = element; 
      optionElement.value = element; 
      select.appendChild(optionElement); 
    }
    $("#sucursal").multipleSelect('refresh');
  }else if(type == 'catalogWinery'){
    var select = document.getElementById("bodega");
    for (var i = 0; i < data.length; i++) {
      var element = data[i];
      var optionElement = document.createElement("option"); 
      optionElement.text = element; 
      optionElement.value = element; 
      select.appendChild(optionElement); 
    }
    $("#bodega").multipleSelect('refresh');
  }
}
