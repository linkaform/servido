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
hideElement("fivethElement");
hideElement("sixthElement");


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
    userId  = us;
    userJwt = jw;
    userName = getCookie("userName");

    if (scriptId == null) {
      loadDemoData();
    }
    ///----ASSIGN VALUES
    var dateT = new Date();
    var dateTo = dateT.toISOString().substring(0, 10);
    $("#date_from").val(dateTo);
    $("#date_to").val(dateTo);
    //--Styles
    setSpinner();
    $('#divUsuario').hide();
    $('#divOptions').show();
    $('#title_report').show();
    document.getElementById("firstParameters").style.removeProperty('display'); 
  } else {
    unhideElement("inicio_ses");
    $('#divOptions').hide();
    $('#divContent').hide();
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
  unhideElement("fourthElement");
}

function loadDemoData(){
  console.log('Entra a demo')
  unhideElement("title_demo")
  $('.title_tables').show();
  document.getElementById("firstParameters").style.removeProperty('display');

  getDrawTable('firstElement', columsTable1A, dataTable1)
  document.getElementById("firstElement").style.removeProperty('display');
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");   
  let check = false;
  if (document.getElementById('input_check').checked)
  {
    check = true;
  } 
  console.log('VALOR CJECK', check);
  getFirstElement(date_to.value, date_from.value, check);
};

function getFirstElement(dateTo, dateFrom, check){
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
      check: check,
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
      console.log(res.response.json.firstElement.data)
      if (res.response.json.firstElement.data) {
        colums  = columsTable1A;
        if (document.getElementById('input_check').checked)
        {
          colums  = columsTable1B;
        } 
        getDrawTable('firstElement', colums , res.response.json.firstElement.data);
        document.getElementById("firstElement").style.removeProperty('display');
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

//-----TABLES
function getDrawTable(id, columnsData, tableData){
  var  table = new Tabulator("#" + id, {
    height:"600px",
    layout:"fitDataTable",
    data:tableData,
    resizableRows:false,
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

  //---PDF
  var element = document.getElementById("download_pdf_"+id);
  if (element)
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

            //----IMAGENES
            // Parametros - Posición weigth / Posición heigt / Weigth / Heigth 
            doc.addImage(img_apymsa1, 'PNG', 25, 2, 180, 80);
            doc.addImage(img_apymsa2, 'PNG', 600, 20, 200, 60);



            doc.setFontSize(11);
            return {
              styles: {
                cellPadding: 2, 
                fontSize: 8,
                halign : 'center'
              },
              headStyles: {
                fillColor: [38, 107, 115],
                valign: 'middle'
              },
              alternateRowStyles: {
                fillColor : [220, 230, 241]
              },
              columnStyles: {
                0: {cellWidth: 0,valign: 'bottom',valign: 'middle'},
                1: {cellWidth: 50,valign: 'bottom',valign: 'middle'},
                2: {cellWidth: 50, halign: 'center',valign: 'bottom'},
                3: {cellWidth: 'auto', halign: 'left',valign: 'middle'},
                4: {cellWidth: 'auto',valign: 'middle'},
                5: {cellWidth: 'auto',valign: 'middle'},
                6: {cellWidth: 'auto',valign: 'middle'},
                7: {cellWidth: 'auto',valign: 'middle'},
                8: {cellWidth: 'auto',valign: 'middle'},
                9: {cellWidth: 'auto',valign: 'middle'},
                10: {cellWidth: 'auto',valign: 'middle'},
                11: {cellWidth: 'auto',valign: 'middle'},
                12: {cellWidth: 60,valign: 'middle'},
                13: {cellWidth: 'auto',fontSize: 9,fontStyle: 'bold',valign: 'middle'},
              },
              margin: { top: 10 },
              startY: 80, //This was the way to push the start of the table down
            };
          },
          createdCell: function(cell, opts) {
            if (opts.column.index == 1) {        
              cell.styles.textColor = "#20a8d8";
              cell.styles.fillColor = "#000";
            }
          },
      });
    });

  }
}

//------PDF
function getDownloadPdf(id = 0){
  Swal.fire('Espere Por Favor');
  Swal.showLoading();
  link = ''
  fetch(url + 'infosync/scripts/run/', {
      method: 'POST',
      body: JSON.stringify({
        script_id: 98210,
        ids: id,
        template: 254,
      }),
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+userJwt
      },
    })
    .then(res => res.json())
    .then(res => {
    if (res.success) {
      if (res.response.json.download.data){
        Swal.close()
        link = res.response.json.download.data.download_url;
        console.log('LINK',link)

        Object.assign(document.createElement('a'), {
          target: '_blank',
          rel: 'noopener noreferrer',
          href: link,
        }).click();
      }
    } 
  })
  return link;
}