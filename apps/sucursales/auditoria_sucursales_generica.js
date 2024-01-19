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
hideElement("download_secondElement")
hideElement("download_thirdElement")
hideElement("download_fourthElement")
hideElement("download_graphicFiveth")

hideElement("title_demo")
hideElement("firstElement");
hideElement("sixthElement");
hideElement("firstParameters");
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
    }else{
      $('.div_card').hide();
      $('.title_tables').hide();
    }
    //---MULTIPLE
    $("#sucursal").multipleSelect('refresh');
    get_catalog();

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
  unhideElement("firstParameters");
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

  document.getElementById("textAlert1").innerText = 10;
  document.getElementById("textAlert2").innerText = 10;
  drawFirstElement(dataFirstElement);
  drawSecondElement(dataSecondElement);
  drawThirdElement(dataThirdElement);
  drawFourthElement(dataFourthElement);
  drawFivethElement(dataFivethElement);
  unhideElement("seventhElement")
  unhideElement("eigthElement");
  unhideElement("fivethElement")
  getDrawGauge('gaugeFirst', dataGauge1)
  document.getElementById("firstGauge").style.removeProperty('display');
  $("#sucursal").multipleSelect('refresh');

}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';


function customCatalogView(res){
  if (res){
    $("#sucursalesLista").empty();
    $('#sucursalesLista').append('<option value="--">--Seleccione--</option>');

    for (i = 0; i < res.rows.length; i++) {
      $('#sucursalesLista').append('<option value="'+res.rows[i].key+'">'+res.rows[i].key+'</option>');
    }
  }
}

function getRegionales(){
  regionales = getCatalog(83987, 79950, 1, catalogType='select')
}

function getSucursales(){
  sucursales = getCatalog(79975,79950,1,catalogType='custom');
}



function runFirstElement(){
  //--show alert
  unHideReportElements()
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");
  let regional = document.getElementById("regional");
  let transversal = $('#transversal').val();
  let sucursal = $('#tienda').val();
  
  firstElement =getFirstElement( 
    date_from.value, 
    date_to.value,
    regional.value,
    transversal,
    sucursal,
    );
  //--Syle
  unhideElement("div_alert1");
  unhideElement("div_alert2");
  unhideElement("div_alert3");

  document.getElementById("firstParameters").style.removeProperty('display');
};

function getFirstElement(date_from, date_to, regional, transversal, sucursal){
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
  console.log('Transversal:',transversal);

  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 113130,
      date_from: date_from,
      date_to: date_to,
      regional: regional,
      transversal: transversal,
      sucursal: sucursal,
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
      let promedio = 0
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
        console.log("D A T A")
        //Gráfico de Evaluaciones por sucursal
        drawFirstElement(res.response.json.thirdElement.data);
        res.response.json.thirdElement.data.forEach(element =>{
          promedio += element['score']
        })
        promedio = promedio / res.response.json.thirdElement.data.length;
        unhideElement("firstElement")
        $("#download_firstElement").show();
      }
       if (res.response.json.secondElement)
      {
        
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
        getDrawGauge('gaugeFirst', dataGauge)
        //document.getElementById("firstGauge").style.removeProperty('display');
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
function drawFirstElement(data){
  console.log("Primer elemento")
   $('#firstElement').empty();
   const margin = {top: 30, right: 30, bottom: 150, left: 110},
       width = 1800 - margin.left - margin.right,
       height = 650 - margin.top - margin.bottom;

   // append the svg object to the body of the page
   const svg = d3.select("#firstElement")
     .append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
     .append("g")
       .attr("transform", `translate(${margin.left},${margin.top})`);

   // Parse the Data
   // d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv").then( function(data) {
   d3.json("https://f001.backblazeb2.com/file/app-linkaform/public-client-126/561/5a7269f5f851c20c1bc7e87a/625de318a5b8b1b47d98bf51.txt").then( function(notUsed) {
     // data = res.response.json;

   // X axis
      const x = d3.scaleBand()
     .range([ 0, width ])
     .domain(data.map(d => d.sucursal))
     .padding(0.2);

      svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("font-size", "13px")
      .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, 10])
    .range([ height, 0]);

    svg.append("g")
    .call(d3.axisLeft(y));


    svg.selectAll("mybar")
      .data(data)
      .enter()
      .append('rect')
      .attr("x", d => x(d.sucursal))
      .attr("y", d => y(d.score))
      .attr("fill", function(d) {
        
        if (d.score >= 80) {
          return "#27ae60";
        } else if (d.score >= 60 && d.score<=79.999) {
          return "#f1c40f";
        }
        else if(d.score<=59.9999)
        {
          return " #e74c3c ";
        }
      })
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.score))
    })


   //--Title
   svg.append("text")
  .attr("x", (width / 2))
  .attr("y", 10 - (margin.top / 2))
  .attr("text-anchor", "middle")
  .style("font-size", "21px")
  .text("Evaluaciones por Sucursal");

   //----Toltip
  const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(d => d.sucursal))
  .padding(0.2);

  const y = d3.scaleLinear()
  .domain([0, 10])
  .range([ height, 0]);
  svg.append("g")
  .call(d3.axisLeft(y));

  svg.selectAll(".label")
  .data(data)
  .enter()
  .append('text')
  .text((data) => (data.score) + '% / ' +data.total)
  .attr('x', data => x(data.sucursal) + x.bandwidth() / 2)
  .attr('y', data => y(data.score) - 15)
  .style('fill','#494949')
  .style("font-size", "13.5px")
  .attr('text-anchor','middle');
}

function drawSecondElement(data){
   $('#secondElement').empty();
    const margin = {top: 30, right: 30, bottom: 210, left: 90},
       width = 800 - margin.left - margin.right,
      //height = 650 - margin.top - margin.bottom;
      height = 850 - margin.top - margin.bottom;

   // append the svg object to the body of the page
   const svg = d3.select("#secondElement")
     .append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
     .append("g")
       .attr("transform", `translate(${margin.left},${margin.top})`);

   // Parse the Data
   // d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv").then( function(data) {
   d3.json("https://f001.backblazeb2.com/file/app-linkaform/public-client-126/561/5a7269f5f851c20c1bc7e87a/625de318a5b8b1b47d98bf51.txt").then( function(notUsed) {
     // data = res.response.json;
     console.log('data', data)
   // X axis
   const x = d3.scaleBand()
     .range([ 0, width ])
     .domain(data.map(d => d.regional))
     .padding(0.2);

    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("font-size", "17px")
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
       .attr("x", d => x(d.regional))
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

   //---TItle
  svg.append("text")
  .attr("x", (width / 2))
  .attr("y", 0 - (margin.top / 2))
  .attr("text-anchor", "middle")
  .style("font-size", "22px")
  .text("Evaluaciones por regional");

  //----Toltip
  const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(d => d.regional))
  .padding(0.2);

  const y = d3.scaleLinear()
  .domain([0, 10])
  .range([ height, 0]);


  svg.selectAll(".label")
  .data(data)
  .enter()
  .append('text')
  .text((data) => (data.score) + '% / ' +data.total)
  .attr('x', data => x(data.regional) + x.bandwidth() / 2)
  .attr('y', data => y(data.score) - 15)
  .style('fill','#494949')
  .style("font-size", "17px")
  .style("font-weight", "bold")
  .attr('text-anchor','middle');
}

function drawThirdElement(data){
   $('#thirdElement').empty();
    const margin = {top: 30, right: 30, bottom: 220, left: 115},
       width = 1800 - margin.left - margin.right,
       //height = 650 - margin.top - margin.bottom;
       height = 850 - margin.top - margin.bottom;

   // append the svg object to the body of the page
   const svg = d3.select("#thirdElement")
     .append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
     .append("g")
       .attr("transform", `translate(${margin.left},${margin.top})`);

   // Parse the Data
   // d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv").then( function(data) {
   d3.json("https://f001.backblazeb2.com/file/app-linkaform/public-client-126/561/5a7269f5f851c20c1bc7e87a/625de318a5b8b1b47d98bf51.txt").then( function(notUsed) {
     // data = res.response.json;
     console.log('data', data)
   // X axis
   const x = d3.scaleBand()
     .range([ 0, width ])
     .domain(data.map(d => d.pagina))
     .padding(0.2);


   svg.append("g")
     .attr("transform", `translate(0, ${height})`)
     .call(d3.axisBottom(x))
     .selectAll("text")
       .attr("transform", "translate(-10,0)rotate(-45)")
        .style("font-size", "17px")
       .style("text-anchor", "end");

   // Add Y axis
   const y = d3.scaleLinear()
     .domain([0, 100])
     .range([ height, 0]);

   svg.append("g")
     .call(d3.axisLeft(y));


   // Bars
    svg.selectAll("mybar")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.pagina))
      .attr("y", d => y(d.section_grade))
      .attr("fill", function(d) {
      if (d.section_grade >= 80) {
      return "#27ae60";
      } else if (d.section_grade >= 60 && d.section_grade<=79.999) {
        return "#f1c40f";
      }
      else if(d.section_grade<=59.999)
      {
        return " #e74c3c ";
      }
      })
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.section_grade))
   })

   //---TItulo
  svg.append("text")
  .attr("x", (width / 2))
  .attr("y", 0 - (margin.top / 2))
  .attr("text-anchor", "middle")
  .style("font-size", "22px")
  .text("Evaluaciones por sección");

  const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(d => d.pagina))
  .padding(0.2);

  const y = d3.scaleLinear()
  .domain([0, 10])
  .range([ height, 0]);


  svg.selectAll(".label")
  .data(data)
  .enter()
  .append('text')
  .text((data) =>  data.section_grade + '% / ' +data.total)
  .attr('x', data => x(data.pagina) + x.bandwidth() / 2)
  .attr('y', data => y(data.section_grade) - 10)
  .style('fill','#494949')
  .style("font-size", "17px")
  .style("font-weight", "bold")
  .attr('text-anchor','middle');
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
  console.log(setOptions)

  chart = new Chart(ctx, {
    type: type,
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}

//-----GAUGE
function getDrawGauge(id, data){
  var layout = { width: 340, height: 190, margin: { t: 42 , b: 0 } };
  Plotly.newPlot(id, data, layout);
}

function get_catalog() 
{
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 113130,
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      if (res.response.json){
        hideElement("seventhElement");

        list_transversal = []
        list_regional = []
        list_sucursal = []

        if(res.response.json.firstCatalog){
          list_transversal = res.response.json.firstCatalog
          console.log(list_transversal)
          $('#transversal').empty();
          $('#transversal').append('<option value="--">Seleccione</option>')
          for(i = 0; i < list_transversal.length; i++){
              email = list_transversal[i]['email']
              transversal = list_transversal[i]['transversal']
              console.log("Transversal = " , transversal);
              //---TRANSVERSAL
              $('#transversal').append('<option value="' + transversal + '">' + transversal + '</option>');
          }
        }
        if(res.response.json.secondCatalog){
          list_regional = res.response.json.secondCatalog
          console.log(list_regional)
          $('#regional').empty();
          $('#regional').append('<option value="--">Seleccione</option>')
          for(i = 0; i < list_regional.length; i++){
              email = list_regional[i]['email']
              regional = list_regional[i]['regional']
              console.log("regional = " , regional);
              //---REGIONAL
              $('#regional').append('<option value="' + regional + '">' + regional + '</option>');
          }
        }

        if(res.response.json.thirdCatalog){
          list_sucursal = res.response.json.thirdCatalog
          console.log(list_sucursal)
          $('#tienda').empty();
          $('#tienda').append('<option value="--">Seleccione</option>')
          for(i = 0; i < list_sucursal.length; i++){
              email = list_sucursal[i]['email']
              sucursal = list_sucursal[i]['sucursal']
              console.log("sucursal = " , sucursal);
              //---SUCURSAL
              $('#tienda').append('<option value="' + sucursal + '">' + sucursal + '</option>');
          }

          $("#tienda").multipleSelect('refresh');
        }


        //console.log(res.response.json.firstElement)
      }

      
    } 
  })
};