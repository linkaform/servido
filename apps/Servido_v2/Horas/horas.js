window.onload = function(){
  createElements(dicReportContext);
  setElementsStyle();
  const statusSession = getSession();
  if(statusSession == 'Active'){
    loadData();
  }else if(statusSession == 'Demo'){
    loadDemoData();
  }
}

function loadDemoData(){
    drawCardElement('cardFirst',20)
    drawCardElement('cardSecond',30)
    drawCardElement('cardThird',40)
    drawCardElement('cardFourth',50)

    drawChartElement('chartFirst','bar',dataChart1,setOptions1);
    drawChartElement('chartSecond','pie',dataChart2, setOptions2);
    drawChartElement('chartThird','bar',dataChart3, setOptions3);
    drawChartElement('chartFourth','bar',dataChart4, setOptions4);

    drawTableElement('tableFirst', dataTable1, columsTable1)
}

function loadData(data) {
    console.log('Pinta los elementos reales')
}

function getInformation(){
    const scriptId = getParameterURL('script_id');
    const demo = getParameterURL('demo');
    const statusSession = getSession();
    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
      const responseRequest = sendRequestReport(scriptId);
    }
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

