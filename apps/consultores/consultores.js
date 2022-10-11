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
hideElement("title_demo");
hideElement("firstParameters");
hideElement("firstElement");
hideElement("secondElement");
hideElement("thirdElement");
hideElement("fourthElement");


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
    if (scriptId == null) {
      loadDemoData();
    }
    //---Catalog
    getClientes();


    ///----ASSIGN VALUES
    //var dateF = new Date();
    var dateT = new Date();
    //dateF.setMonth(dateF.getMonth() - 6)
    //var dateFrom = dateF.toISOString().substring(0, 10);
    var dateTo = dateT.toISOString().substring(0, 10);
    console.log(dateTo);
    $("#date_from").val('2022-07-01');
    $("#date_to").val(dateTo);
    //--Styles
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
  unhideElement("close_sesion");
  unhideElement("firstParameters");
  unhideElement("firstElement");
  unhideElement("secondElement");
  unhideElement("thirdElement");
  unhideElement("firstElement-Buttons");
}



function loadDemoData(){
  unhideElement("title_demo")
  $('.title_tables').show();
  document.getElementById("firstParameters").style.removeProperty('display');
  document.getElementById("firstElement").style.removeProperty('display');
  document.getElementById("secondElement").style.removeProperty('display');
  getDrawTable('firstElement', columsTable1, dataTable1);
  drawSecondElement(dataSecondElement);
}


const loading = document.querySelector('.loading-container');
loading.style.display = 'none';


function runFirstElement(){
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");  
  let servicio = document.getElementById("servicio");
  let cliente = document.getElementById("cliente");
  let tecnico = document.getElementById("tecnico");
  getFirstElement(date_to.value, date_from.value, servicio.value, cliente.value, tecnico.value);
};


function getFirstElement(dateTo, dateFrom, servicio, cliente, tecnico){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();


  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      date_to: dateTo,
      date_from: dateFrom,
      servicio: servicio,
      cliente: cliente,
      tecnico: tecnico,
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
      console.log(res.response.json);
      if (res.response.json.firstElement.data) {
        console.log('drawFirstElement.........');
        getDrawTable('firstElement', columsTable1, res.response.json.firstElement.data);
      }
      if (res.response.json.secondElement) {
        console.log('drawSecondElement.........');
        drawSecondElement(res.response.json.secondElement);
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

let chart2;
function drawSecondElement(datasets){

  //---CHART
  var ctx = document.getElementById('graphicSecond').getContext('2d');
  
  if (chart2) {
      chart2.destroy();
  }

  chart2 = new Chart(ctx, {
    type: 'bar',
    data: datasets,
    plugins: [ChartDataLabels],
    options: {
      plugins: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{ticks: {min: 6, max:16}}],
        },
        title: {
          display: true,
          text: 'Servicios',
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
    }
  });
}


//-----TABLES
function getDrawTable(id, columnsData, tableData){
  var  table = new Tabulator("#" + id, {
    height:"500px",
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
    document.getElementById("download_xlsx_"+id).replaceWith(document.getElementById("download_xlsx_"+id).cloneNode(true));
    document.getElementById("download_xlsx_"+id).addEventListener("click", function (){
    table.download("xlsx", "data.xlsx", {sheetName:"data"});
    });
  }

  if (document.getElementById("download_csv_"+id)){
    document.getElementById("download_csv_"+id).replaceWith(document.getElementById("download_csv_"+id).cloneNode(true));
    document.getElementById("download_csv_"+id).addEventListener("click", function (){
      table.download("csv", "data.csv");
    });
  }

  //-----PDF TEST
  today_pdf = new Date();
  day = today_pdf.getDate()
  month = today_pdf.getMonth() + 1
  year = today_pdf.getFullYear()
  time = today_pdf.toLocaleTimeString()

  date = day + '/' + month + '/' + year + ' ' + time;

  var test = document.getElementById("download_pdf_"+id);
  var logo = "data:image/gif;base64,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bdCWeayereT4al6N5DLJpr1Us1x08yHmw+otudT/ACgVTcNpNN0No0lHpKopraaC3NoqatbG5rZKiKNrWjkMviNDse9yZWRun/bNv/0+/wDnUnKHb7QlrvcGpLZoqw0l2paNtuguENuhjqY6VvRsDZWtDmxjyYDy/Bdj7zNIffP9+v3qWf74vZ/Zfuv7DF7b4H+C8fl8Tk/RzhVRoNLJvnmUTu4yk2k/w7v7kBNdaL2Y2442NWDiW0xR1OjtwqZlysN2r2SezU9Vhnite9rhyDm8VpPXH4IkNa7IyxPov5OKhv8AYrBarXoW7Xm/V9NRW2ks1c6ulfNK9rWOd4MjhG0c3NzPIGAcZOAZOay0JorcG1Gxa60par9byeb2e4UjJ2Nd+U0OB5XfpDBHqvA0RsJsvtvXfdXQ+2OnLPXjIbWU1BGKhoIwQ2UgvaDnsDhUqg4t5JNd61PXeKcVm2mllo9HkWlvJqThX1leZdnt9bppX7o00EdZHS32YUjmxy9pKepcWcrjykERvD/d6jGMx84V5aPQ3FnqHaTYnXdXqvaeKyG41THV4raO3VjuTHgzN9xx5sNy3qQ4h3MY+YS215sftBuhVw3DcHbmw3yshZ4cdTV0bHTtZ35fE+ly9+mcdSvX0bt5obbu2Gz6E0labBROIc+G3UccDXuAxzP5QOd3xdkqt0pSkpPLT3+BRGvCFJwWbzXB8M+tFyoiKQRAiIgOnc7dQXi21VoudKyppK6F9NUQvGWyRvaWuafgQSPtUFeIjYbWOi7paroNM7e62obpc6eyUF81DSVMFxonS+5TCufBKyGpa3DYxPKxxceXnBz1nqCOnRW7r3Rdk3F0fdtE6hic+gu9M6nlLTh8Z7skYfJ7HBr2nyLQVbnBTXeSLa4lQnmuHMgtp/aluqtDXbcNt6h3s1Voe6RW+DRlNDLb7FbpfEbzCKiEcZmY3mzgMhidyygh4acyY4brlc9LtuexuqKOehrtMww3Ky09TMJZTZarLoYjIDiR1NJ4lM9zfd/Bsx0IVu7eUHEFLZX6RsegrDoS6NqZotS62q6aKR12qmSOa6spaNmDO+VvLJ4s7msy94DXYCyht9srprQd3m1ZPcLtqPVlZAaaqv8Aeas1FU+IkOMUY6RwxcwBDI2tHQZzhW6cGmmv59STc1lJOM3n1Za/LRc/eZGREUgxwREQBERAEREAREQFFVEQBERAFTAVUQBERAEREAREQBERAEREAREQBERAEREAREQBERAUIyvOq7FZq64Ut2rbPRVFdQ59lqpadj5YM9+R5GW588EL0lTITiE8uAVURAEREAREQBERAEREAREQBERAUVURAEREBRVREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREB/9k="; //Really long string of the logo in base 64

  if (test)
  {
    document.getElementById("download_pdf_"+id).replaceWith(document.getElementById("download_pdf_"+id).cloneNode(true));
    document.getElementById("download_pdf_"+id).addEventListener("click", function(){
      table.download("pdf", "data.pdf", {
          orientation:"landscape", //set page orientation to portrait
          theme: 'grid',
          autoTable:function(doc)
          { 
            var margins = 30;
            var leftMargin = 40;
            var marginsIndent = 40;
            doc.addImage(logo, 'PNG', 40, 20, 80, 65);

            doc.setFontSize(10);
            doc.text("" + date , 700, 40);


            doc.setFontSize(15);
            doc.setTextColor(191,94,10);
            doc.text("ACPC SOLUCIONES COMPUTACIONALES", 300, 40);

            doc.setFontSize(13);
            doc.setTextColor(120,126,133);
            doc.text("Moises Adrian Carrera Carreño", 350, 61);
            doc.setFontSize(12);
            doc.text("RFC: CACM750504UJ5", 365, 72);

            doc.setFontSize(12.5);
            doc.setTextColor(23,32,42);
            doc.text("Reporte de Servicio", 365, 88);
            

            doc.setFontSize(8);
            doc.text("Responsables Técnicos:", 40, 580);
            doc.text("TSU. Jazmín Ayala", 130, 575);
            doc.text("Ing. Moisés Carrera", 130, 585);

            doc.text("Aclaraciones de Servicio:", 550, 575);
            doc.text("Correo: soporte@alcarconsultores.com", 660, 570);
            doc.text("Cel / Whatsapp: 479 231 08 59", 660, 580);

            doc.setFontSize(11);
            return {
              styles: {
                cellPadding: 2, 
                fontSize: 8,
              },
              headStyles: {
                fillColor: [139, 0, 0]
              },
              startY: 100, //This was the way to push the start of the table down
            };
          },
          createdCell: function(cell, opts) {
            console.log(cell.raw)
            if (opts.column.index == 1) {        
              cell.styles.textColor = "#20a8d8";
              cell.styles.fillColor = "#000";
              
            }
          },
      });
    });
  }

}

//---CATALOG
function getClientes(){
  //--Form ID , Catalog, Level , Type
  getCatalog(86374,85937,1,catalogType='custom');
}

function customCatalogView(res){
  if (res){
    $("#cliente").empty();
    $('#cliente').append('<option value="--">--Seleccione--</option>');

    for (i = 0; i < res.rows.length; i++) {
      $('#cliente').append('<option value="'+res.rows[i].key+'">'+res.rows[i].key+'</option>');
    }
  }
}
