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
hideElement("firstParameters");
hideElement("secondElement");
hideElement("thirdElement");
hideElement("fourthElement");
hideElement("fivethElement");
hideElement("seventhElement");
hideElement("eigthElement");
hideElement("div_alert1");
hideElement("div_alert2");


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
    get_parameters();
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

    getRegionales();
    getSucursales();
    unHideReportElements()
    if (scriptId == null) {
      loadDemoData();
    }else{
      $('.div_card').hide();
      $('.title_tables').hide();
    }
    //---MULTIPLE
    $("#perfil").multipleSelect('refresh');

    //---HIDE AND SHOW
    get_catalog();
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
      script_id: scriptId,
      only_users: true
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.response.perfiles)
    {
      $('#perfil').empty()
      $("#perfil").append('<option >--Seleccione--</option>')
      for (var i = 0 ; i < res.response.perfiles.length; i++) {
        $("#perfil").append("<option value='" + res.response.perfiles[i] + "'>" + res.response.perfiles[i] + "</option>")
      }
      $("#perfil").multipleSelect('refresh');
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
  unhideElement("fourthElement");
  unhideElement("fivethElement");
}

function loadDemoData(){
  unhideElement("title_demo")
  unhideElement("div_alert1");
  unhideElement("div_alert2");
  document.getElementById("firstParameters").style.removeProperty('display');
  document.getElementById("fivethElement").style.removeProperty('display');

  document.getElementById("textAlert1").innerText = 10;
  document.getElementById("textAlert2").innerText = 10;
  drawFirstElement(dataFirstElement);
  drawSecondElement(dataSecondElement);
  drawThirdElement(dataThirdElement);
  drawFourthElement(dataFourthElement);
  getDrawTable('fivethElement',columsTable1,dataTable1, 'auto');
  getDrawTable('eigthElement',columsTable2,dataTable2, 'auto');
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
  let regional = document.getElementById("catalog-79950-level-1");
  let perfil = $('#perfil').val();
  let seccion = document.getElementById("seccion");
  let sucursal = document.getElementById("sucursalesLista");
  let ceo = document.getElementById("ceo");
  let check = 'on';
  if (document.getElementById('input_check').checked)
  {
    check = 'off';
  }



  firstElement =getFirstElement( 
    date_from.value, 
    date_to.value,
    regional.selectedOptions[0].value,
    perfil,
    seccion.value, 
    sucursal.value,
    ceo.value,
    check
    );
  //--Syle
  unhideElement("div_alert1");
  unhideElement("div_alert2");
  document.getElementById("firstParameters").style.removeProperty('display');
};

function getFirstElement(date_from, date_to, regional, perfil, seccion, sucursal, ceo, check){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();
  $('.div_card').hide();

  //----Clean
  $("#firstElement").html("");
  $("#secondElement").html("");
  $("#thirdElement").html("");
  console.log('PERFIL:',perfil);

  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      date_from: date_from,
      date_to: date_to,
      regional: regional,
      perfil: perfil,
      seccion: seccion,
      sucursal: sucursal,
      ceo: ceo,
      check:check
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
      hideElement("firstElement");
      hideElement("secondElement");
      hideElement("thirdElement");
      hideElement("fourthElement");
      hideElement("fivethElement");
      hideElement("seventhElement");
      hideElement("eigthElement");

      if (res.response.json.totalSucursales)
      {
        document.getElementById("textAlert1").innerText = res.response.json.totalSucursales;
      }
      if (res.response.json.totalSucursales)
      {
        document.getElementById("textAlert2").innerText = res.response.json.totalEvaluaciones;
      }
      if (res.response.json.firstElement.length){
        drawFirstElement(res.response.json.firstElement);
        unhideElement("firstElement")
        $("#download_firstElement").show();
      }
      if (res.response.json.secondElement.length){
        unhideElement("secondElement")
        $("#download_secondElement").show();
        drawSecondElement(res.response.json.secondElement)
      }
      if (res.response.json.fifthElement.length){
        unhideElement("thirdElement")
        $("#download_thirdElement").show();
        drawThirdElement(res.response.json.fifthElement)
      }
      if (res.response.json.fourthElement.length){
        getDrawTable('fivethElement', columsTable1, res.response.json.fourthElement, 'auto');
        document.getElementById("fivethElement").style.removeProperty('display');
      }
      if (res.response.json.sixthElement.length){
        unhideElement("fourthElement")
        $("#download_fourthElement").show();
        drawFourthElement(res.response.json.sixthElement);
      }
      if (res.response.json.sevenElement.length){
        dataElementFormat = getFormatterFiveth(res.response.json.sevenElement);
        $("#download_graphicFiveth").show();
        getDrawGraphicFiveth(dataElementFormat, setOptions5)
        document.getElementById("seventhElement").style.removeProperty('display');
      }
      if (res.response.json.eigthElement.length){
        console.log('Valores Octavo', res.response.json.eigthElement)
        getDrawTable('eigthElement', columsTable2, res.response.json.eigthElement, '300px');
        document.getElementById("eigthElement").style.removeProperty('display');
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

//-----GRAPHIC
function drawFirstElement(data){
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
    .domain([0, 120])
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
  .text("Evaluaciones por Unidad de Negocio");

   //----Toltip
  const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(d => d.sucursal))
  .padding(0.2);

  const y = d3.scaleLinear()
  .domain([0, 120])
  .range([ height, 0]);
  svg.append("g")
  .call(d3.axisLeft(y));

  svg.selectAll(".label")
  .data(data)
  .enter()
  .append('text')
  .text((data) => parseInt(data.score) + '% / ' +data.total)
  .attr('x', data => x(data.sucursal) + x.bandwidth() / 2)
  .attr('y', data => y(data.score) - 15)
  .style('fill','#494949')
  .style("font-size", "13.5px")
  .attr('text-anchor','middle');
}

function drawSecondElement(data){
   $('#secondElement').empty();
    const margin = {top: 30, right: 30, bottom: 210, left: 90},
       width = 1800 - margin.left - margin.right,
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
     .domain([0, 120])
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
  .domain([0, 120])
  .range([ height, 0]);


  svg.selectAll(".label")
  .data(data)
  .enter()
  .append('text')
  .text((data) => parseInt(data.score) + '% / ' +data.total)
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
  .domain([0, 120])
  .range([ height, 0]);


  svg.selectAll(".label")
  .data(data)
  .enter()
  .append('text')
  .text((data) =>  data.section_grade + '% / ' +data.total)
  .attr('x', data => x(data.pagina) + x.bandwidth() / 2)
  .attr('y', data => y(data.section_grade) - 85)
  .style('fill','#494949')
  .style("font-size", "17px")
  .style("font-weight", "bold")
  .attr('text-anchor','middle');
}

function drawFourthElement(data){
  $('#fourthElement').empty();
   const margin = {top: 30, right: 30, bottom: 150, left: 90},
       width = 1800 - margin.left - margin.right,
       height = 650 - margin.top - margin.bottom;

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
  .domain([0, 100])
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
  .text("Evaluaciones por perfil");

  const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(d => d.perfil))
  .padding(0.2);

  const y = d3.scaleLinear()
  .domain([0, 120])
  .range([ height, 0]);


  svg.selectAll(".label")
  .data(data)
  .enter()
  .append('text')
  .text((data) => parseInt(data.score) + '% / ' +data.total)
  .attr('x', data => x(data.perfil) + x.bandwidth() / 2)
  .attr('y', data => y(data.score) - 60)
  .style('fill','#494949')
  .style("font-size", "13.5px")
  .attr('text-anchor','middle');
}

let chart5;
function getDrawGraphicFiveth(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicFiveth').getContext('2d');

  if (chart5) {
    chart5.destroy();
  }

  chart5 = new Chart(ctx, {
    type: 'bar',
    data:data,
    plugins: [ChartDataLabels],
    options: setOptions,
  });
}


//-----TABLES
function getDrawTable(id, columnsData, tableData, height){
  $('#'+id).empty();
  var table = new Tabulator("#" + id, {
    height:height,
    layout:"fitDataTable",
    data:tableData,
    dataTree:true,
    dataTreeStartExpanded:false,
    resizableRows:true,
    clipboard:true,
    clipboardPasteAction:"replace",
    textDirection:"ltr",
    columns:columnsData,
    renderHorizontal:"virtual",
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


//----FORMATTER
function getFormatterFiveth(data){
  data = data.sort(function (a, b) {
    if(a.total == b.total) {
      return 0; 
    }
    if(a.total > b.total) {
      return -1;
    }
    return 1;
  });

  array_colors = []
  labelsValue = data.map(function(e) {
    return e.ceo;
  });

  dataValue = data.map(function(e) {
    if (e.total >= 80 ){
      array_colors.push("#27ae60");
    }
    else if (e.total  >= 60 && e.total <=79.999 ){
      array_colors.push("#f1c40f");
    }
    else if (e.total <=59.999 ){
      array_colors.push("#e74c3c");
    }
    return e.total;

  });
  
  dataElement = {
    labels: labelsValue,
    datasets: [
      {
        label: 'Valores:',
        data: dataValue,
        backgroundColor: array_colors,
      },
    ]
  }

  return dataElement;
}


//-----CATALOG
function get_catalog() 
{
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 83787,
      option: 2,
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      if (res.response.json.catalog){
        arrayCeo = []
        for (i = 0; i <res.response.json.catalog.length; i++) {
          value = res.response.json.catalog[i]['61d7aed1647e2b73d9b1f681']
          if (!arrayCeo.includes(value)){
            arrayCeo.push(value);
          }
        }
        if(arrayCeo.length){
          $("#ceo").empty();
          $('#ceo').append('<option value="--">--Seleccione--</option>');
          for (i = 0; i < arrayCeo.length; i++) {
            value = arrayCeo[i]
            $('#ceo').append('<option value="'+ value +'">'+value+'</option>');
          }
        }
      }
    } 
  })
};


