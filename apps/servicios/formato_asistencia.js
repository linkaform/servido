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
hideElement("ThirdElement");

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
    //--Styles
    setSpinner();
    get_catalog(); //Obtener catálogos
    $("#grupos").multipleSelect('refresh');
    $('#divOptions').show();
    $('#title_report').show();
    document.getElementById("firstParameters").style.removeProperty('display');
    
  } else {
    unhideElement("inicio_ses");
    $('#divContent').hide();
    $('#divOptions').hide();
    $('#title_report').hide();
    $('.title_tables').hide();
    $('#grupo').multipleSelect('refresh');
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
  unhideElement("firstElement-Buttons");
  unhideElement("firstParameters");
  unhideElement("close_sesion");
  unhideElement("firstElement");
  unhideElement("secondElement");
}

function loadDemoData(){
  unhideElement("title_demo")
  $('.title_tables').show();
  document.getElementById("firstParameters").style.removeProperty('display');

  getDrawTable('firstElement', columsTable1, dataTable1);
  document.getElementById("firstElement").style.removeProperty('display');

  /*getDrawGraphicFirst(data1, options1);
  document.getElementById("secondElement").style.removeProperty('display');
  document.getElementById("graphicFirst").style.removeProperty('display');

  getDrawGraphicSecond(data2, options2);
  document.getElementById("ThirdElement").style.removeProperty('display');
  document.getElementById("graphicSecond").style.removeProperty('display');*/

}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");
  let institucion = $('#institucion').val()
  let grupos = $('#grupos').val()    
  
  getFirstElement(date_to.value, date_from.value, institucion, grupos);
};

function getFirstElement(dateTo, dateFrom, institucion, grupos){
  console.log(dateTo)
  console.log(dateFrom)
  console.log(institucion)
  console.log(grupos)
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();


  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 116153,
      date_to: dateTo,
      date_from: dateFrom,
      institucion:institucion,
      grupos:grupos,
      option:2
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
      console.log(res.response)
      if (res.response.json.firstElement) {
        getDrawTable('firstElement', res.response.json.firstElement.columns, res.response.json.firstElement.data);
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
    

    height:"100%",
    layout:"fitDataTable",
    data:tableData,
    resizableRows:false,
    dataTree:true,
    dataTreeStartExpanded:false,
    clipboard:true,
    clipboardPasteAction:"replace",
    textDirection:"ltr",
    columns:columnsData,
    addRowPos: "bottom",
    rowFormatter: function(row) {
        var data = row.getData();
        var porcentajeEfectividad = parseFloat(data.cumplimiento) + "%";
        var cell = row.getCell("cumplimiento"); // Encuentra la celda específica

        if (data.cumplimiento <= 69) {
            cell.getElement().style.backgroundColor = "red";
        } else if (data.cumplimiento >= 70 && data.cumplimiento <= 85) {
            cell.getElement().style.backgroundColor = "orange";
        } else if (data.cumplimiento >= 86 && data.cumplimiento <= 100) {
            cell.getElement().style.backgroundColor = "green";
        }
        cell.setValue(porcentajeEfectividad);
        row.reformat();
    },
    
  })

  table.addRow({numero:"Pruebas"})
  

  /*table.on("headerMouseOver", function(e, column){
    //e - the mouse event object
    //column - column component
    alert("Eres crack");
  });*/

  //---Definición de la estructura de las columnas del archivo xlsx y csv

  let structureColumns = [
      {header:'No.', key:"numero"},
      {header:'Tipo Documento', key:'tipo_documento'},
      {header:'Número identificación"', key:'numero_identificacion'},
      {header:'Nombres y Apellidos del estudiante', key:'nombre'},
      {header:'Sí', key:'si'},
      {header:'No', key:'no'},
      {header:'Total Asistencias', key:'asistencias'},
      {header:'Cumplimiento', key:'cumplimiento'},
    ]

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


//----- CATALOGS
var obj_instituciones = []
function get_catalog() 
{
  console.log('catalogo')
  arrayPlant = []
  arrayOut = []

  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 116153,
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
      console.log("Respuesta")
      console.log(res)
      if (res.response.json.firstElement.data){
        /*console.log(res.response.json)
        console.log("----------------")
        console.log(res.response.json.firstElement.data)*/
        //res.response.json.firstElement.data)
       /* let gestoresContent = $('#gestor');
        gestoresContent.empty();
        for (i = 0; i < res.response.json.firstElement.data.length; i++) {
        value = res.response.json.firstElement.data[i].gestor;

        gestoresContent.append('<option value="'+ value + '">'+value+'</option>');
        let option = $("<option></option>")
            .text(value)
            .val(value)
        console.log(option)

          gestoresContent.append(option)
         
        }
        
        gestoresContent.multipleSelect('refresh')*/
        let listGestor = []

        for (i = 0; i < res.response.json.firstElement.data.length; i++) {
          valueGestor = res.response.json.firstElement.data[i].gestor;

          if (listGestor.indexOf(valueGestor) === -1) {
            listGestor.push(valueGestor);
          }

        }

        console.log(listGestor)
         //----Pais
        $("#gestor").empty();
        for (i = 0; i < listGestor.length; i++) {
          value = listGestor[i]
          $('#gestor').append('<option value="'+ value +'">'+value+'</option>');
        }
        $("#gestor").multipleSelect('refresh');
      }

      if(res.response.json.catalog){
        console.log(res.response.json.catalog)

        obj_instituciones = res.response.json.catalog[0];
        console.log(obj_instituciones);

        let instituciones = []

        Object.keys(obj_instituciones).forEach((clave) => {
          instituciones.push(clave)
          console.log(clave)
        })

        console.log("Listas")
        console.log(instituciones)

        $("#institucion").empty()
        //$("#institucion").append('<option value="--"> Seleccione la institución</option>');
        instituciones.forEach(value => {
          $("#institucion").append('<option value="' + value + '">' + value + '</option>');
        })

        actualizarGrupo(instituciones[0])
        
      }
    } 
  })

};


//-----GRAPICH
let chart1;
function getDrawGraphicFirst(data, setOptions){
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
function getDrawGraphicSecond(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicSecond').getContext('2d');
  
  if (chart2) {
    chart2.destroy();
  }

  //-----COLORS
  var array_colors = getPAlleteColors(7,data.datasets.length);
  data.datasets.background = array_colors;

  chart2 = new Chart(ctx, {
    type: 'bar',
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}

//Función para actualizar el selecto de grupo
function actualizarGrupo(value){
  console.log(value)
  console.log(obj_instituciones)
  let grupos = []

  grupos = obj_instituciones[value]
  console.log(grupos)

  $("#grupos").empty()
  grupos.forEach(value => {
    $("#grupos").append('<option value="' + value + '">' + value + '</option>');
  })
  $("#grupos").multipleSelect('refresh');
}

/*document.getElementById('institucion').addEventListener('change', function(){
  let valor = this.value;

  console.log("El valor seleccionado es = " + valor);
})*/