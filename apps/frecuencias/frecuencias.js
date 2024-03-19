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
var tableFirstData = null;
var fecha_de = null;
var fecha_hasta = null;
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
    //--Catalog
    get_catalog(1);
    //--Styles
    setSpinner();
    $("#localidades").multipleSelect('refresh');
    $("#tienda").multipleSelect('refresh');
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
  unhideElement("title_demo")
  $('.title_tables').show();
  document.getElementById("firstParameters").style.removeProperty('display');
  document.getElementById("firstElement").style.removeProperty('display');
  document.getElementById("secondElement").style.removeProperty('display');
  document.getElementById("thirdElement").style.removeProperty('display');
  document.getElementById("fourthElement").style.removeProperty('display');
  document.getElementById("fivethElement").style.removeProperty('display');
  document.getElementById("sixthElement").style.removeProperty('display');

  //----PDF ASIGN
  tableFirstData = dataTable1;
  getDrawTable('firstElement', columsTable1, dataTable1);
  getDrawTable('secondElement', columsTable2, dataTable2);
  getDrawTable('thirdElement', columsTable3, dataTable3);
  getDrawTable('fourthElement', columsTable4, dataTable4);
  drawFourthElement(dataFourthElement, dataConfigFourth);
  drawFivethElement(dataFivethElement, dataConfigFiveth);

}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';


function runFirstElement(flagPrint = false){
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");    
  let usuario = document.getElementById("usuario");    
  let paises = $('#paises').val();
  let localidades = $('#localidades').val();
  let tiendas = $("#tienda").val();
  check = 'on';
  if (document.getElementById('input_check').checked)
  {
    check = 'off';
  }
  fecha_de = date_from.value
  fecha_hasta = date_to.value
  console.log("tiendas = ", tiendas)
  getFirstElement(date_to.value, date_from.value, paises, localidades, tiendas, usuario.value, check, flagPrint);
};


function getFirstElement(dateTo, dateFrom, paises, localidades, tiendas, usuario, check, flagPrint = false){
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
      paises: paises,
      localidades: localidades,
      tiendas: tiendas,
      usuario: usuario,
      check: check,
      option: 1,
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
      if (res.response.json.firstElement.data) {
        tableFirstData = res.response.json.firstElement.data;
        getDrawTable('firstElement', columsTable1, res.response.json.firstElement.data, flagPrint);
        document.getElementById("firstElement").style.removeProperty('display');
      }
      if (res.response.json.secondElement.data) {
        getDrawTable('secondElement', columsTable2, res.response.json.secondElement.data, flagPrint);
        document.getElementById("secondElement").style.removeProperty('display');
      }
      if (res.response.json.thirdElement.data) {
        getDrawTable('thirdElement', columsTable3, res.response.json.thirdElement.data, flagPrint);
        document.getElementById("thirdElement").style.removeProperty('display');
      }
      if (res.response.json.fourthElement) {
        drawFourthElement(res.response.json.fourthElement, dataConfigFourth);
        document.getElementById("fivethElement").style.removeProperty('display');
      }
      if (res.response.json.fivethElement) {
        drawFivethElement(res.response.json.fivethElement, dataConfigFiveth);
        document.getElementById("sixthElement").style.removeProperty('display');
      }
      if (res.response.json.sixthElement) {
        getDrawTable('fourthElement', res.response.json.sixthElement.colums_data, res.response.json.sixthElement.data, flagPrint);
        document.getElementById("fourthElement").style.removeProperty('display');
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
function drawFourthElement(datasets, dataconfig){

  //---CHART
  var ctx = document.getElementById('graphicFourth').getContext('2d');
  
  if (chart1) {
    chart1.destroy();
  }

  chart1 = new Chart(ctx, {
    type: 'bar',
    data: datasets,
    plugins: [ChartDataLabels],
    options: dataconfig
  });
}

let chart2;
function drawFivethElement(datasets, dataconfig){

  //---CHART
  var ctx = document.getElementById('graphicFiveth').getContext('2d');
  
  if (chart2) {
      chart2.destroy();
  }

  chart2 = new Chart(ctx, {
    type: 'bar',
    data: datasets,
    plugins: [ChartDataLabels],
    options: dataconfig,
  });
}

//-----TABLES
function getDrawTable(id, columnsData, tableData, flagPrint){
  optionHeight = ''
  if (flagPrint){
    optionHeight = '100%'
  }else{
    optionHeight = '250px'
  }
  var  table = new Tabulator("#" + id, {
    height:optionHeight,
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

  //---PDF CUSTOM
  if (document.getElementById("download_pdf_"+id)){
    //trigger download of data.csv file
    document.getElementById("download_pdf_"+id).replaceWith(document.getElementById("download_pdf_"+id).cloneNode(true));
    document.getElementById("download_pdf_"+id).addEventListener("click", function(){
      //----IMAGE GRAPHIC
      let intentoA = 0;
      let intentoB = 0;
      let limite = 7;

      let urlGraphicFourth = '';
      
        html2canvas(document.querySelector("#graphicFourth")).then(canvas => {
        imageTimeout:4500,
        urlGraphicFourth =  canvas.toDataURL();
        console.log(urlGraphicFourth)
        console.log()
        });
        
      let urlGraphicFiveth = '';
      
        html2canvas(document.querySelector("#graphicFiveth")).then(canvas => {
        imageTimeout:4500,
        urlGraphicFiveth = canvas.toDataURL('image/jpeg');
        console.log(urlGraphicFiveth)
        console.log()
        
        });
      
      setTimeout(() => {
        // Obtener la fecha actual en el formato solicitado
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

        

        table.download("pdf", "data.pdf", {
          orientation:"landscape", //set page orientation to portrait
          theme: 'grid',
          autoTable:function(doc){ 

            // Función para agregar contenido a cada página
            const addContentToPage = () => {
                //----Agregar texto que se repite en cada página
                doc.setFontSize(9);
                doc.text(`Fecha de consulta: ${formattedDate}`, 635, 560);
            };

            var margins = 30;
            var leftMargin = 40;
            var marginsIndent = 40;

            //----IMAGENES
            doc.setFontSize(9);
            doc.text(300, 40, 'Reporte de Cumplimiento');
            doc.text(405, 40, 'Del')
            doc.text(420, 40, fecha_de)
            doc.text(469, 40, 'Al')
            doc.text(479, 40, fecha_hasta)
            doc.addImage(img_morpho, 'JPEG', 650, 20, 140, 40);

            //----Parametros - Posición weigth / Posición heigt / Weigth / Heigth 
            doc.addImage(urlGraphicFourth, 'JPEG', 150, 60, 500, 250);
            doc.addImage(urlGraphicFiveth, 'JPEG', 150, 310, 500, 250);

            //doc.addFontSize(8)
            doc.text(`Fecha de consulta: ${formattedDate}`, 635, 565)


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
              didParseCell: function (data) {
                if( data.row.raw[2].content < data.row.raw[3].content && data.column.index == 2 && data.section === 'body'){
                  data.cell.styles.textColor = "red";
                }else if( data.row.raw[2].content >= data.row.raw[3].content && data.column.index == 2 && data.section === 'body'){
                  data.cell.styles.textColor = "green";
                }
              },
              columnStyles: {
                0: {cellWidth: 'auto',halign: 'left'},
                1: {cellWidth: 'auto',halign: 'left'},
                2: {cellWidth: 'auto',halign: 'center'},
                3: {cellWidth: 'auto',halign: 'center'},
                4: {cellWidth: 'auto',halign: 'center'},
                5: {cellWidth: 'auto',halign: 'center'},
              },
              margin: { top: 10 },
              startY: 800, //This was the way to push the start of the table down
              addPageContent: function (currentPage, pageCount, options) {
                    // Agregar contenido a cada página
                    addContentToPage();

                    // Puedes agregar más contenido adicional en cada página si es necesario
                }
            };
          },
        });
      }, 3500);
    });
  }
}

//----- CATALOGS
var loc_global = []
function get_catalog(option) 
{
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 89485,
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
      if (option == 1){
        if (res.response.json.array_filters.paises){
          $("#paises").empty();
          $('#paises').append('<option value="--">--Seleccione--</option>');
          for (i = 0; i < res.response.json.array_filters.paises.length; i++) {
            value = res.response.json.array_filters.paises[i]
            $('#paises').append('<option value="'+ value +'">'+value+'</option>');
          }
        }
        if (res.response.json.array_filters.localidades){
          //Localidades
          loc_global = res.response.json.array_filters.localidades
          $("#localidades").empty();
          $('#localidades').append('<option value="--">--Seleccione--</option>');
          //Tiendas
          $("#tienda").empty();
          $("#tienda").append('<option value="--">Seleccione</option>');
          for (i = 0; i < res.response.json.array_filters.localidades.length; i++) {
            value = res.response.json.array_filters.localidades[i].localidad;
            $('#localidades').append('<option value="'+ value +'">'+value+'</option>');

            tiendas = res.response.json.array_filters.localidades[i].tiendas;
            if(tiendas){
              tiendas.forEach(tienda => {
                if(tienda){
                  $("#tienda").append('<option value="' + tienda + '">'+tienda+'</option>');
                }
              })
            }
          }
          $("#localidades").multipleSelect('refresh');
          $("#tienda").multipleSelect('refresh');

        }
      }else if(option == 2){
        filter = $('#paises').val();
        get_tienda(pais = filter)
        if (res.response.json.array_filters.localidades){
          $("#localidades").empty();
          $('#localidades').append('<option value="--">--Seleccione--</option>');

         for (i = 0; i < res.response.json.array_filters.localidades.length; i++) {
            pais  = res.response.json.array_filters.localidades[i].pais;
            value = res.response.json.array_filters.localidades[i].localidad;
            if (filter == '--'){
              $('#localidades').append('<option value="'+ value +'">'+value+'</option>');
            }
            else
            {
              console.log(filter,'==',pais)
              if(filter == pais){
                $('#localidades').append('<option value="'+ value +'">'+value+'</option>');
              }
            }
          }
        }
        $("#localidades").multipleSelect('refresh');
        
      }
    } 
  })
};

//---- NEW FUNCTION
function printPDF() {
  var table = new Tabulator("#firstElementDownload", {
    height:'10px',
    layout:"fitDataTable",
    data:tableFirstData,
    textDirection:"ltr",
    columns:columsTable1,
  });

  if (document.getElementById("buttonDownloadFirst")){
    //trigger download of data.csv file
    document.getElementById("buttonDownloadFirst").replaceWith(document.getElementById("buttonDownloadFirst").cloneNode(true));
    document.getElementById("buttonDownloadFirst").addEventListener("click", function (){
      table.download("csv", "data.csv");
    });
  }
  document.querySelector('#buttonDownloadFirst').click();
}

//Función para actualizar los valores del selector multiple Tienda
function get_tienda(pais = ''){
  console.log(pais)
  let localidades = document.getElementById("localidades");
  let loc_select = []

  for(var i = 0; i < localidades.options.length; i ++){
    var option = localidades.options[i];

    //Verificar el valor de la opción seleccionada
    if(option.selected){
      loc_select.push(option.value);
      console.log("option = ", option.value)
    }
  }

  console.log("Las localidades seleccionadas son: ", loc_select);

  console.log("Localidades globales")
  console.log(loc_global)

  //Se ejectua cuando no se ha seleccionado un pais
  $("#tienda").empty();
  $("#tienda").append('<option value="--">Seleccione</option>');
  if(!pais){
      console.log("Sin tienda")
      loc_global.forEach(localidad =>{
        if(loc_select.includes(localidad.localidad)){
          console.log("La incluye ", localidad.localidad)
          localidad.tiendas.forEach(tienda => {
            if(tienda){
              $("#tienda").append('<option value="' + tienda+ '">'+tienda+'</option>');
            }
          })
        }
      })
  }else{
    console.log("Con pais ", pais)
    loc_global.forEach(localidad =>{
      if(pais == localidad.pais){
        console.log("La incluye ", localidad.localidad)
        localidad.tiendas.forEach(tienda => {
          if(tienda){
            $("#tienda").append('<option value="' + tienda+ '">'+tienda+'</option>');
          }
        })
      }
    })
  }
  $("#tienda").multipleSelect('refresh');

}