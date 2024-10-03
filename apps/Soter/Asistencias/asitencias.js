window.onload = function(){
	loadDemoData();
}

function loadDemoData(){
  drawFirstElement(dataChart1, setOptions1);
  drawSecondElement(dataChart2, setOptions2);
  drawThirdElement(dataChart3, setOptions3)
	getDrawTable('fivethElement', columsTable1, dataTable1, '320');
}

//-----TABLES
function getDrawTable(id, columnsData, tableData, height){
    let table = new Tabulator("#" + id, {
	    height: height+"px",
	    theme: "bootstrap5", 
	    layout: "fitDataStretch", 
	    //responsiveLayout: true,
	    columnMinWidth: 100,
	    autoColumns: false, 
	    scrollX: true, 
	    dataTree:true,
	    data:tableData,
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
function drawFirstElement(datasets, dataconfig){

  //---CHART
  var ctx = document.getElementById('chartFirst').getContext('2d');
  if (chart1) {
    chart1.destroy();
  }
  //---Color
  array_colors = getPAlleteColors(6,datasets['datasets'].length);
  for (let i = 0; i < datasets['datasets'].length; i++) {
    datasets['datasets'][i]['backgroundColor'] = array_colors[i];
  }
  chart1 = new Chart(ctx, {
    type: 'bar',
    data: datasets,
    plugins: [ChartDataLabels],
    options: dataconfig
  });
}

let chart2;
function drawSecondElement(datasets, dataconfig){

  //---CHART
  var ctx = document.getElementById('chartSecond').getContext('2d');
  
  if (chart2) {
    chart2.destroy();
  }
  //---Color
  array_colors = getPAlleteColors(6,datasets['labels'].length);
  datasets['datasets'][0]['backgroundColor'] = array_colors;
  datasets['datasets'][0]['borderColor'] = array_colors;
  chart2 = new Chart(ctx, {
    type: 'pie',
    data: datasets,
    plugins: [ChartDataLabels],
    options: dataconfig
  });
}

let chart3;
function drawThirdElement(datasets, dataconfig){

  //---CHART
  var ctx = document.getElementById('chartThird').getContext('2d');
  
  if (chart3) {
    chart3.destroy();
  }
  //---Color
  array_colors = getPAlleteColors(6,datasets['labels'].length);
  datasets['datasets'][0]['backgroundColor'] = array_colors;
  datasets['datasets'][0]['borderColor'] = array_colors;
  chart3 = new Chart(ctx, {
    type: 'bar',
    data: datasets,
    plugins: [ChartDataLabels],
    options: dataconfig
  });
}
