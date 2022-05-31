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


hideElement("title_demo")
hideElement("firstElement");
hideElement("firstParameters");
hideElement("secondElement");
hideElement("thirdElement");
hideElement("fourthElement");
hideElement("fivethElement");
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
    get_parameters()
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


  if(us != "" && jw != ""){
    hideElement("inicio_ses");
    unhideElement("close_sesion");
    userId = us;
    userJwt = jw;
    userName = getCookie("userName");

    getRegionales()
    unHideReportElements()
    if (scriptId == null) {
      loadDemoData();
    }
  } else {
    unhideElement("inicio_ses");
    hideElement("title_demo");
    document.getElementById("firstParameters").classname = "div_filter_hide";
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
      for (var i = 0 ; i < res.response.perfiles.length; i++) {
        $("#perfil").append("<option value='" + res.response.perfiles[i] + "'>" + res.response.perfiles[i] + "</option>")
      }
    }
  })
}

function unHideReportElements(){
  //Set here all report elements that need to be unHiden on a loggin
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
  getDrawTable('fivethElement',columsTable1,dataTable1);
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function getRegionales(){
  console.log('regionales')
  regionales = getCatalog(83987, 79950, 1, catalogType='select')
  // regionales = getCatalog(79975, 79950, 1, catalogType='select')
  console.log('regionales', regionales)
}

function runFirstElement(){
  //--show alert
  unHideReportElements()
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");
  let regional = document.getElementById("catalog-79950-level-1");
  let perfil = document.getElementById("perfil");
  firstElement =getFirstElement( date_from.value, date_to.value,
    regional.selectedOptions[0].value,
    perfil.selectedOptions[0].value);
  //--Syle
  unhideElement("div_alert1");
  unhideElement("div_alert2");
  document.getElementById("firstParameters").style.removeProperty('display');
};

function getFirstElement(date_from, date_to, regional, perfil){
  $("#firstElement").html("");
  $("#secondElement").html("");
  $("#thirdElement").html("");
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      date_from: date_from,
      date_to: date_to,
      regional: regional,
      perfil: perfil
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      if (res.response.json.firstElement.length) {
        if (res.response.json.totalSucursales)
        {
          document.getElementById("textAlert1").innerText = res.response.json.totalSucursales;
        }
        if (res.response.json.totalSucursales)
        {
          document.getElementById("textAlert2").innerText = res.response.json.totalEvaluaciones;
        }
        if (res.response.json.firstElement.length){
          drawFirstElement(res.response.json.firstElement)
        }
        if (res.response.json.secondElement.length){
          unhideElement("secondElement")
          drawSecondElement(res.response.json.secondElement)
        }
        if (res.response.json.fifthElement.length){
          unhideElement("thirdElement")
          drawThirdElement(res.response.json.fifthElement)
        }
        if (res.response.json.fourthElement.length){
          getDrawTable('fivethElement', columsTable1, res.response.json.fourthElement);
          unhideElement("fivethElement")
          document.getElementById("fivethElement").style.removeProperty('display');
        }
        if (res.response.json.sixthElement.length)
        {
          unhideElement("fourthElement")
          drawFourthElement(res.response.json.sixthElement);
        }

      }
    } else {
      hideLoading();
      if(res.code == 11){
        Swal.fire({
          title: 'Error',
          html: res.error
        });
      } else {
        Swal.fire({
          title: 'Error',
          html: res.error
        });
      }
    }
  })
};

//-----GRAPHIC

function drawFirstElement(data){
   $('#firstElement').empty();
   const margin = {top: 30, right: 30, bottom: 150, left: 60},
       width = 1400 - margin.left - margin.right,
       height = 600 - margin.top - margin.bottom;

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
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.score))
      .attr("fill", "#5488c2")
    })


   //--Title
   svg.append("text")
  .attr("x", (width / 2))
  .attr("y", 0 - (margin.top / 2))
  .attr("text-anchor", "middle")
  .style("font-size", "22px")
  .text("Evaluaciones por sucursal");

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
  .text((data) => parseInt(data.score) + ' / ' +data.total)
  .attr('x', data => x(data.sucursal) + x.bandwidth() / 2)
  .attr('y', data => y(data.score) - 15)
  .style('fill','#494949')
  .style("font-size", "12px")
  .attr('text-anchor','middle');
}

function drawSecondElement(data){
   $('#secondElement').empty();
   const margin = {top: 30, right: 30, bottom: 150, left: 60},
       width = 700 - margin.left - margin.right,
       height = 300 - margin.top - margin.bottom;

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
       .attr("width", x.bandwidth())
       .attr("height", d => height - y(d.score))
       .attr("fill", "#5488c2")

   })

   //---TItle
  svg.append("text")
  .attr("x", (width / 2))
  .attr("y", 0 - (margin.top / 2))
  .attr("text-anchor", "middle")
  .style("font-size", "18px")
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
  .text((data) => parseInt(data.score) + ' / ' +data.total)
  .attr('x', data => x(data.regional) + x.bandwidth() / 2)
  .attr('y', data => y(data.score) - 15)
  .style('fill','#494949')
  .style("font-size", "12px")
  .attr('text-anchor','middle');
}

function drawThirdElement(data){
   $('#thirdElement').empty();
   const margin = {top: 30, right: 30, bottom: 150, left: 60},
       width = 700 - margin.left - margin.right,
       height = 300 - margin.top - margin.bottom;

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
       .attr("width", x.bandwidth())
       .attr("height", d => height - y(d.section_grade))
       .attr("fill", "#5488c2")

   })

   //---TItulo
  svg.append("text")
  .attr("x", (width / 2))
  .attr("y", 0 - (margin.top / 2))
  .attr("text-anchor", "middle")
  .style("font-size", "18px")
  .text("Evaluaciones por sección");
}

function drawFourthElement(data){
  $('#fourthElement').empty();
  const margin = {top: 30, right: 30, bottom: 150, left: 60},
  width = 700 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

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
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.score))
    .attr("fill", "#5488c2")
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
  .text((data) => parseInt(data.score) + ' / ' +data.total)
  .attr('x', data => x(data.perfil) + x.bandwidth() / 2)
  .attr('y', data => y(data.score) - 15)
  .style('fill','#494949')
  .style("font-size", "12px")
  .attr('text-anchor','middle');

}

//-----TABLES
function getDrawTable(id, columnsData, tableData){
  $('#'+id).empty();
  var table = new Tabulator("#" + id, {
    height:"auto",
    layout:"fitDataTable",
    //layout:"fitColumns",
    data:tableData,
    // responsiveLayout: "hide",
    resizableRows:true,
    clipboard:true,
    clipboardPasteAction:"replace",
    textDirection:"ltr",
    columns:columnsData,
    renderHorizontal:"virtual",
  });
  //trigger download of data.csv file
  document.getElementById("download-csv").addEventListener("click", function(){
      table.download("csv", "data.csv");
  });

  //trigger download of data.xlsx file
  document.getElementById("download-xlsx").addEventListener("click", function(){
      table.download("xlsx", "data.xlsx", {sheetName:"Auditorias"});
  });
}


function agregarCelda(etiqueta, valor, tbody, header){
  tr = document.createElement("tr");
  td = document.createElement("td");
  if(header == 1){
    td.setAttribute('class',"encabezado");
  } else if(header == 3) {
    td.setAttribute('class',"remanente");
  }
  tdText = document.createTextNode(etiqueta);
  td.appendChild(tdText);
  tr.appendChild(td);

  td = document.createElement("td");
  if(header == 1){
    td.setAttribute('class',"encabezado");
  } else if(header == 3) {
    td.setAttribute('class',"remanente");
  }
  /*
  tdText = document.createTextNode(valor);
  td.appendChild(tdText);
  */
  td.innerHTML = valor;
  tr.appendChild(td);
  tbody.appendChild(tr);
}
