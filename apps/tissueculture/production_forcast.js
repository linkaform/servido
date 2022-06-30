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
hideElement("title_demo")
hideElement("firstParameters")
hideElement("firstElement")


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
    hideElement("inicio_ses");
    unhideElement("close_sesion");
    getCompanyLogo(userParentId);
    userId = us;
    userJwt = jw;
    userName = getCookie("userName");

    unHideReportElements()
    if (scriptId == null) {
      loadDemoData();
    }

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
    hideElement("firstElement-Buttons");
  }
  //---SHOW AND HIDE ELEMENT
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
  unhideElement("close_sesion");
  unhideElement("firstParameters");
  unhideElement("firstElement");
  unhideElement("firstElement-Buttons");
}

function loadDemoData(){
  getDrawTable('firstElement', columsTable1, dataTable1);
  const numSets = dataSecondElement.length;
  drawBarHistogram('secondElement', dataSecondElement , numSets);
  drawSecondElement(dataSecondElementB);
  unhideElement("title_demo")
}


const loading = document.querySelector('.loading-container');
loading.style.display = 'none';


function runFirstElement(){
  let yearWeekFrom = document.getElementById("yearWeekFrom");
  let yearWeekTo = document.getElementById("yearWeekTo");
  setStyleRemove();
  firstElement =getFirstElement( yearWeekFrom.value, yearWeekTo.value);
};


function getFirstElement(yearWeekFrom, yearWeekTo){
  //---Hide style
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();
  //---CLean
  $("#firstElement").html("");
  $("#secondElement").html("");
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      year_week_from: yearWeekFrom,
      year_week_to: yearWeekTo,
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
        console.log('drawFirstElement.........')
        //console.log('Data', res.response.firstElement.tabledata)
        //console.log('Data', res.response.firstElement.colsData)
        getDrawTable('firstElement',res.response.firstElement.colsData, res.response.firstElement.tabledata);
      }
      if (res.response.secondElement) {
        const numSets = res.response.secondElement.length;
       drawBarHistogram('secondElement', res.response.secondElement , numSets);
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



//----GRAPICH

let chart2;
function drawSecondElement(data){
  //---CHART
  var ctx = document.getElementById('graphicSecond').getContext('2d');

  if (chart2) {
    chart2.destroy();
  }

  chart2 = new Chart(ctx, {
    type: 'line',
    data: data,
    plugins: [ChartDataLabels],
    options: {
      plugins: {
          legend: {
              display: true
          },
           title: {
              display: true,
              text: 'Report',
              font: {
                  size: 25
              }
          },
          datalabels: {
              color: 'black',
              labels: {
                  title: {
                      font: {
                          weight: 'bold'
                      }
                      },
              },
              align:'top',
          }
      },
      scales: {
          x: {
            
          },
          "ay": {
            type: 'linear',
              display: true,
              position: 'right',
          },
          "ay1": {
            type: 'linear',
              display: true,
              position: 'left',
          }
      },   
    }  
  });
}



//-----TABLES
function getDrawTable(id, columnsData, tableData){
  unhideElement("firstElement-Buttons");
  //editableData();

  var table = new Tabulator("#" + id, {
    height:"550px",
    layout:"fitData",
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

function setStyleRemove()
{
  document.getElementById("firstParameters").style.removeProperty('display');
}

// Tabulator

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


//----D3 TABLE
function getTextWidth(text, fontSize, fontName) {
    c = document.createElement("canvas");
    ctx = c.getContext("2d");
    ctx.font = fontSize + ' ' + fontName;
    return ctx.measureText(text).width;
}

function DataSegregator(array, on) {
    var SegData;
    OrdinalPositionHolder = {
        valueOf: function () {
            thisObject = this;
            keys = Object.keys(thisObject);
            keys.splice(keys.indexOf("valueOf"), 1);
            keys.splice(keys.indexOf("keys"), 1);
            return keys.length == 0 ? -1 : d3.max(keys, function (d) { return thisObject[d] })
        }
        , keys: function () {
            keys = Object.keys(thisObject);
            keys.splice(keys.indexOf("valueOf"), 1);
            keys.splice(keys.indexOf("keys"), 1);
            return keys;
        }
    }
    array[0].map(function (d) { return d[on] }).forEach(function (b) {
        value = OrdinalPositionHolder.valueOf();
        OrdinalPositionHolder[b] = OrdinalPositionHolder > -1 ? ++value : 0;
    })

    SegData = OrdinalPositionHolder.keys().map(function () {
        return [];
    });

    array.forEach(function (d) {
        d.forEach(function (b) {
            SegData[OrdinalPositionHolder[b[on]]].push(b);
        })
    });

    return SegData;
}

function drawBarHistogram(id, data, numSets = 0){


  var width_chart = 0 ;
  if (numSets<=5){
    width_chart = 1000;
  }else if(numSets>=6 && numSets<=10){
    width_chart = 1500;
  }else if(numSets>=11 && numSets<=20){
    width_chart = 2500
  }else if(numSets>=21){
    width_chart = 4500
  }
  


  var margin = { top: 20, right: 50, bottom: 60, left: 50 },

  width = width_chart - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

  var textWidthHolder = 0;
  data.forEach(function (d) {
    d.LineCategory.forEach(function (b) {
      b.yearWeek = d.yearWeek;
    })
  });


  var Categories = new Array();
  // Extension method declaration
  Categories.pro

  var data;
  var ageNames;

  var x0 = d3.scale.ordinal().rangeRoundBands([0, width], .1);
  var XLine = d3.scale.ordinal().rangeRoundPoints([0, width], .1);
  var x1 = d3.scale.ordinal();


  var y = d3.scale.linear().range([height, 0]);

  var YLine = d3.scale.linear().range([height, 0])
  .domain([0, d3.max(data, function (d) { return d3.max(d.LineCategory, function (b) { return b.Value }) })]);

  //---COLOR BAR 
  var array_colors = getPAlleteColors(2,3);
  console.log('array_colors',array_colors);
  var color = d3.scale.ordinal().range(array_colors);

  var line = d3.svg.line().x(function (d) {
    return x0(d.yearWeek) + x0.rangeBand() / 2;
  })
  .y(function (d) { return YLine(d.Value) });


  var xAxis = d3.svg.axis()
  .scale(x0)
  .orient("bottom");

  var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .tickFormat(d3.format(".2s"));

  var YLeftAxis = d3.svg.axis().scale(YLine).orient("right").tickFormat(d3.format(".2s"));

  var svg = d3.select("#"+id).append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //--Title
  svg.append("text")
  .attr("x", (width / 2))
  .attr("y", 10 - (margin.top / 2))
  .attr("text-anchor", "middle")
  .style("font-size", "21px")
  .text("Reportes");



  //console.log(data.map(d => d.yearWeek));
  //console.log(data.Categories.map(d => d.Value));


  // Bar Data categories
  data.forEach(function (d) {
    d.Categories.forEach(function (b) {
      if (Categories.findIndex(function (c) { return c.Name===b.Name}) == -1) {
        b.Type = "bar";
        //console.log(JSON.stringify(b))
        Categories.push(b)
      }
    })
  });

  // Line Data categories
  data.forEach(function (d) {
    d.LineCategory.forEach(function (b) {
      if (Categories.findIndex(function (c) { return c.Name === b.Name }) == -1) {
        b.Type = "line";
        //console.log(JSON.stringify(b))
        Categories.push(b)
      }
    })
  });

  // Processing Line data
  lineData = DataSegregator(data.map(function (d) { return d.LineCategory }), "Name");

  // Line Coloring
  LineColor = d3.scale.ordinal();
  LineColor.domain(Categories.filter(function (d) { return d.Type == "line" }).map(function (d) { return d.Name }));
  //---COLOR LINE
  var array_colors = getPAlleteColors(4,3);
  LineColor.range(array_colors)
  x0.domain(data.map(function (d) { return d.yearWeek; }));
  XLine.domain(data.map(function (d) { return d.yearWeek; }));

  x1.domain(Categories.filter(function (d) { return d.Type == "bar" }).map(function (d) { return d.Name})).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(data, function (d) { return d3.max(d.Categories, function (d) { return d.Value; }); })]);


  ///----Title axis  X
  svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

  //----Title axis Y left
  svg.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(" + (width) + ",0)")
  .call(YLeftAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -10)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Hours");

  ///---Title axis Y rigth
  svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Eaches");


  var state = svg.selectAll(".state")
  .data(data)
  .enter().append("g")
  .attr("class", "state")
  .attr("transform", function (d) { return "translate(" + x0(d.yearWeek) + ",0)"; });


  state.selectAll("rect")
  .data(function (d) { return d.Categories; })
  .enter().append("rect")
  .attr("width", x1.rangeBand())
  .attr("x", function (d) { return x1(d.Name); })
  .attr("y", function (d) { return y(d.Value); })
  .style("fill", function (d) { return color(d.Name); })
  .transition().delay(500).attrTween("height", function (d) {
      var i = d3.interpolate(0, height - y(d.Value));
      return function (t)
      {
          return i(t);
      }
  });



  // drawaing lines
  svg.selectAll(".lines").data(lineData).enter().append("g").attr("class", "line")
  .each(function (d) {
    Name=d[0].Name
    d3.select(this).append("path").attr("d", function (b) { return line(b) }).style({ "stroke-width": "2px", "fill": "none" }).style("stroke", LineColor(Name)).transition().duration(1500);
  })

  // Legends
  var LegendHolder = svg.append("g").attr("class", "legendHolder");

  var legend = LegendHolder.selectAll(".legend")
  .data(Categories.map(function (d) { return {"Name":d.Name,"Type":d.Type}}))
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function (d, i) { return "translate(0," +( height + margin.bottom / 2 )+ ")"; })
  .each(function (d,i) {

    //  Legend Symbols
    d3.select(this).append("rect")
    .attr("width", function () { return 18 })
    .attr("x", function (b) {
      left = (i+1) * 15 + i * 18 + i * 5 + textWidthHolder;
      return left;
    })
    .attr("y", function (b) { return b.Type == 'bar'?0:7})
    .attr("height", function (b) { return b.Type== 'bar'? 18:5 })
    .style("fill", function (b) { return b.Type == 'bar' ? color(d.Name) : LineColor(d.Name) });


    //  Legend Text
    d3.select(this).append("text")
    .attr("x", function (b) {
      left = (i+1) * 15 + (i+1) * 18 + (i + 1) * 5 + textWidthHolder;
      return left;
    })
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(d.Name);

    textWidthHolder += getTextWidth(d.Name, "20px", "calibri");
  });


  // Legend Placing
  d3.select(".legendHolder").attr("transform", function (d) {
    thisWidth = d3.select(this).node().getBBox().width;
    return "translate(" + ((width) / 2 - thisWidth / 2) + ",0)";
  })
}



