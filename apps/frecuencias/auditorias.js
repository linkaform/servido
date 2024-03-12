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
    //--Styles
    setSpinner();
    $('#divOptions').show();
    $("#pais").multipleSelect('refresh');
    $("#localidad").multipleSelect('refresh');
    $("#tienda").multipleSelect('refresh');
    //---Catalog
    get_catalog(1);
    document.getElementById("firstParameters").style.removeProperty('display');
    
  } else {
    unhideElement("inicio_ses");
    $('#divContent').hide();
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
  unhideElement("firstElement-Buttons");
  unhideElement("firstParameters");
  unhideElement("close_sesion");
  unhideElement("firstElement");
}

function loadDemoData(){
  unhideElement("title_demo")
  $('.title_tables').show();
  document.getElementById("firstParameters").style.removeProperty('display');
  setGraphic(dataExample)
  
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");
  let id_forma = $("#formas").val()  
  let pais = $('#pais').val();
  let localidad = $('#localidad').val();  
  let tienda = $('#tienda').val();
  let option = 1;  
  //alert(id_forma)
  if(id_forma == '--'){
    Swal.fire({
      icon:'error',
      title:'Ojo',
      text:'Debe seleccionar una forma'
    })
  }else{
    getFirstElement(date_to.value, date_from.value, id_forma, pais, localidad, tienda);
  }  
};

function getFirstElement(dateTo, dateFrom, id_forma, pais, localidad, tienda){
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
      id_forma:id_forma,
      pais: pais,
      localidad: localidad,
      tienda: tienda,
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
      if (res.response.json.firstElement) {
        console.log('Valores',res.response.json.firstElement)
        if(res.response.json.firstElement[0].estandar == 0){
          Swal.fire({
            title:'Oops',
            text:'No se ha establecido un estandar para esta cuenta.',
            html: res.error
          })
        }else{
          setGraphic(res.response.json.firstElement)

        }
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
function getDrawGraphic(data, setOptions, canvas, type, name){
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

//----Funcion Dinamic
function setGraphic(data) {
  $('#divContent').empty()
  if (Object.entries(data).length != 0){
    //---Clean Body
    for (let key in data){
      form = data[key]
      console.log("Form")
      console.log(form)
      //Comprobar que existan registros
      if(form['tendencia'].length <= 0){
        Swal.fire({
          icon:"info",
          title: "Oops...",
          text: "No hay registros con tu criterio de busqueda."
        })
      }
      if ('historico' in form){
        //-----APPEND
        $("#divContent").append(
          "<div class='col-sm-12 col-md-12 col-lg-6 mt-5' style='overflow-y: scroll;'>"+
            "<h3 style='text-align: center;'>"+
                "<button class='btn btn-secondary button-chart float-right' type='button' onclick=\"get_chartDownload('historico_"+ form['id_formulario'] +"', 'chart_screenIV');return false;\" id='download_graphicFirst'>"+
                    "<i class='fa-sharp fa-solid fa-download'></i>"+
                "</button >"+
            "</h3>"+
            "<div  style='width: 800px;height: 450px;margin: auto;'>"+
              "<canvas id='historico_" + form['id_formulario'] + "'></canvas>"+
            "</div>"+
          "</div>"
        );
        name_array = []
        name_form =  form['name_form']
        name_array.push('Historico');
        name_array.push(name_form);
        id = 'historico_' + form['id_formulario']
        getDrawGraphic(form['historico'], setOptions1, id,'line',name_array);
      }
      if ('tendencia' in form){
        //-----APPEND
        $("#divContent").append(
          "<div class='col-sm-12 col-md-12 col-lg-6 mt-5' style='overflow-y: scroll;'>"+
            "<h3 style='text-align: center;'>"+
                "<button class='btn btn-secondary button-chart float-right' type='button' onclick=\"get_chartDownload('tendencia_"+ form['id_formulario'] +"', 'chart_screenIV');return false;\" id='download_graphicFirst'>"+
                    "<i class='fa-sharp fa-solid fa-download'></i>"+
                "</button >"+
            "</h3>"+
            "<div  style='width: 800px;height: 450px;margin: auto;'>"+
              "<canvas id='tendencia_" + form['id_formulario'] + "'></canvas>"+
            "</div>"+
          "</div>"
        );
        name_array = []
        name_form =  form['name_form']
        name_array.push('Resultados por sección');
        name_array.push(name_form);
        id = 'tendencia_' + form['id_formulario']
        let grading = 0
        grading = parseInt(form['grading'])
        if(grading == 1){
          getDrawGraphic(form['tendencia'], setOptions2, id,'bar',name_array);
        }else{
          getDrawGraphic(form['tendencia'], setOptions3, id,'bar',name_array);
        }
      }
    }
  }
}

//----- CATALOGS
/*function get_catalog(options) 
{
  arrayPais = []
  arrayLocalidad = []
  arrayTienda = []

  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 102558,
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
        valueFormas = res.response.json.catalogTwo;

        //----Formas
        $("#formas").empty();
        $('#formas').append('<option value="--">Seleccione la forma</option>');
        for (i = 0; i < valueFormas.length; i++) {
          //id_forma = Id de la forma
          id_forma = valueFormas[i].id
          str_id_forma = id_forma.toString();
          //name = Nombre de la forma
          name = valueFormas[i].name
          value = id_forma + '-' + name
          $('#formas').append('<option value="'+ value +'">'+name+'</option>');
        }


        for (i = 0; i < res.response.json.catalog.length; i++) {
          valuePais = res.response.json.catalog[i]['631fccdd844ed53c7d989718'];
          valueLocalidad = res.response.json.catalog[i]['631fc1e48d9fe191da0c3daf'];
          valueTienda = res.response.json.catalog[i]['6447050b61228c1a0c56f21f'];

          if (arrayPais.indexOf(valuePais) === -1) {
            arrayPais.push(valuePais);
          }
          if (arrayLocalidad.indexOf(valueLocalidad) === -1) {
            arrayLocalidad.push(valueLocalidad);
          }
          if (arrayTienda.indexOf(valueTienda) === -1) {
            arrayTienda.push(valueTienda);
          }
        }

        //----Pais
        $("#pais").empty();
        $('#pais').append('<option value="--">--Seleccione--</option>');
        for (i = 0; i < arrayPais.length; i++) {
          value = arrayPais[i]
          $('#pais').append('<option value="'+ value +'">'+value+'</option>');
        }
        $("#pais").multipleSelect('refresh');

        //----Pais
        $("#localidad").empty();
        $('#localidad').append('<option value="--">--Seleccione--</option>');
        for (i = 0; i < arrayLocalidad.length; i++) {
          value = arrayLocalidad[i]
          $('#localidad').append('<option value="'+ value +'">'+value+'</option>');
        }
        $("#localidad").multipleSelect('refresh');

        //----Pais
        $("#tienda").empty();
        $('#tienda').append('<option value="--">--Seleccione--</option>');
        for (i = 0; i < arrayTienda.length; i++) {
          value = arrayTienda[i]
          $('#tienda').append('<option value="'+ value +'">'+value+'</option>');
        }
        $("#tienda").multipleSelect('refresh');


      }
    } 
  })
};*/


function get_catalog(option) {
  pais  = $("#pais").val();
  localidades = $("#localidad").val();
  filter_data = ''
  type_catalog = ''
  if (option == 1) {
    type_catalog = 'pais'
  }
  if (option == 2) {
    type_catalog = 'localidad'
    filter_data = pais
  }
  else if(option == 3){
    type_catalog = 'tienda'
    filter_data = localidades
  }


  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 102558,
      option: 2,
      filter: filter_data,
      type_catalog: type_catalog,
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      if(res.response.json.array_filters.formas){
        $("#formas").empty()
        $("#formas").append('<option value="--">Seleccione la forma</option>');
        for(i = 0; i < res.response.json.array_filters.formas.length; i++){
          id_forma = res.response.json.array_filters.formas[i].id;
          str_id = id_forma.toString()
          name = res.response.json.array_filters.formas[i].name;
          value = id_forma + '-' + name;
          $('#formas').append('<option value="'+value+'">'+name+'</option>');
        }
      }

      if (option == 1){
        if (res.response.json.array_filters.paises){
          console.log("Paises")
          $("#pais").empty();
          $("#localidad").empty();
          $("#localidad").multipleSelect('refresh');
          $("#tienda").empty();
          $("#tienda").multipleSelect('refresh');
          $('#pais').append('<option value="--">--Seleccione--</option>');
          for (i = 0; i < res.response.json.array_filters.paises.length; i++) {
            value = res.response.json.array_filters.paises[i]
            $('#pais').append('<option value="'+ value +'">'+value+'</option>');
          }
          $("#pais").multipleSelect('refresh');
        }
      }
      if (option == 2){
        if (res.response.json.array_filters.localidades){
          $("#tienda").empty();
          $("#tienda").multipleSelect('refresh');
          $("#localidad").empty();
          $('#localidad').append('<option value="--">--Seleccione--</option>');
          //$("#localidad").multipleSelect('refresh');
          for (i = 0; i < res.response.json.array_filters.localidades.length; i++) {
            value = res.response.json.array_filters.localidades[i];
            $('#localidad').append('<option value="'+ value +'">'+value+'</option>');
          }
          $("#localidad").multipleSelect('refresh');
        }
      }
      if (option == 3){
        if (res.response.json.array_filters.tiendas){
          $("#tienda").empty();
          $('#tienda').append('<option value="--">--Seleccione--</option>');
          $("#tienda").multipleSelect('refresh');
          for (i = 0; i < res.response.json.array_filters.tiendas.length; i++) {
            value = res.response.json.array_filters.tiendas[i];
            $('#tienda').append('<option value="'+ value +'">'+value+'</option>');
          }
          $("#tienda").multipleSelect('refresh');
        }
      }
    } 
  })
};
//----EVENTS FILTERS
$(function() {
  $('#localidad').multipleSelect({
    filter: true,
    onClose: function () {
      get_catalog(3);
    },
  })
})