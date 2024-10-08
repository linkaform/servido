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
    get_catalog();
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
  let id_forma = $('#formas').val();
  let pais = $('#pais').val();  
  let localidad = $('#localidad').val();
  if(id_forma == '--'){
    Swal.fire({
      icon:'error',
      title:'Ojo',
      text:'Debe seleccionar una forma'
    })
  }else{
    getFirstElement(date_to.value, date_from.value, id_forma, pais, localidad);
  }  

};

function getFirstElement(dateTo, dateFrom, id_forma, pais, localidad){
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
      id_forma: id_forma,
      pais: pais,
      localidad: localidad,
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

        /*console.log('Valores',res.response.json.firstElement)
        setGraphic(res.response.json.firstElement)*/
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
  console.log("D A T A")
  console.log(data)
  console.log("D A T A")
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
      console.log("Form")
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
        console.log("historico_")
        console.log(form['historico'][0])
        getDrawGraphic(form['historico'][0], setOptions1, id,'line',name_array);
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
        getDrawGraphic(form['tendencia'][0], setOptions2, id,'bar',name_array);
      }
    }
  }
}
var valuePaisLocalidad = {}
var tiendasSeleccionadas = {}
var localidades = []
//----- CATALOGS
function get_catalog() 
{
  arrayPais = []
  arrayLocalidad = []
  arrayTienda = []

  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 113389,
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
        
        valueFormas = res.response.json.catalog;
        valuePaisLocalidad = res.response.json.catalogTwo;
        list_pais = ''
        list_localidad = ''

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

        list_pais = Object.keys(valuePaisLocalidad)
        
        //----Pais
        $("#pais").empty();
        $('#pais').append('<option value="--">--Seleccione--</option>');
        for (i = 0; i < list_pais.length; i++) {
          value = list_pais[i]
          $('#pais').append('<option value="'+ value +'">'+value+'</option>');
        }
        $("#pais").multipleSelect('refresh');
        
        //----Localidad
        $("#localidad").empty();
        $('#localidad').append('<option value="--">--Seleccione--</option>');

        //----Tienda
        $("#tienda").empty();
        $('#tienda').append('<option value="--">--Seleccione--</option>');
        /*for (i = 0; i < valuePaisLocalidad.length; i++) {
          value = list_pais[i]
          $('#localidad').append('<option value="'+ value +'">'+value+'</option>');
        }*/

        Object.values(valuePaisLocalidad).forEach(value => {
          let localidades = Object.keys(value) //Almacena los nombres de las localidades
          console.log("Localidades = ")
          console.log(localidades)
          localidades.forEach(localidad => {
            $("#localidad").append('<option value="'+localidad+'">'+localidad+'</option>')
          })

          //Rellenar selectores de tienda

          Object.values(value).forEach(tiendas => {
            tiendas.forEach(tienda =>{
              if(tienda){
                $("#tienda").append('<option value="'+tienda+'">'+tienda+'</option>')
              }
            })
          })
        })

        $("#localidad").multipleSelect('refresh');
        $("#tienda").multipleSelect('refresh');
      }
    } 
  })
};

//Función para obtener las localidades según los paises seleccionados
$('#pais').multipleSelect({
  onClick: function(view){
    console.log("View:")
    console.log(view)
    let paisesSelect = $('#pais').multipleSelect('getSelects')
    console.log("Paises seleccionados")
    console.log(paisesSelect)
    actualizar_localidad_tienda(paisesSelect)
  }
})

//Función para obtener las tiendas según las localidades seleccionados
$('#localidad').multipleSelect({
  onClick: function(view){
    console.log("View:")
    console.log(view)
    let localidadSelect = $('#localidad').multipleSelect('getSelects')
    console.log("Localidades seleccionados")
    console.log(localidadSelect)
    actualizar_tienda(localidadSelect)
  }
})



document.getElementById("pais").addEventListener('change', ()=>{
  console.log("function")
  let paises = document.getElementById("pais");
  let loc_select = []

  for(var i = 0; i < paises.options.length; i ++){
    var option = paises.options[i];

    //Verificar el valor de la opción seleccionada
    if(option.selected){
      loc_select.push(option.value);
      console.log("Paises = ", option.value)
    }
  }
})


function actualizar_localidad_tienda(paises){
    //----Localidad
    $("#localidad").empty();
    $('#localidad').append('<option value="--">--Seleccione--</option>');

    //----Tienda
    $("#tienda").empty();
    $('#tienda').append('<option value="--">--Seleccione--</option>');
    paises.forEach(pais => {
      console.log(pais)
      console.log(valuePaisLocalidad)
      let localidades_tienda = valuePaisLocalidad[pais];
      console.log("Localidades tienda:")
      console.log(localidades_tienda)

      //Rellenar selectores de Localidad
      let localidades = Object.keys(localidades_tienda) //Almacena los nombres de las localidades
      console.log("Localidades = ")
      console.log(localidades)
      localidades.forEach(localidad => {
        $("#localidad").append('<option value="'+localidad+'">'+localidad+'</option>')
      })

      //Rellenar selectores de tienda
      Object.entries(localidades_tienda).forEach(([key, tiendas]) => {
        tiendasSeleccionadas[key] = tiendas; //Creamos una estructura con las tiendas de las localidades de los paises seleccionados.
        tiendas.forEach(tienda =>{
          if(tienda){
            $("#tienda").append('<option value="'+tienda+'">'+tienda+'</option>')
          }
        })
      })

    })
  $("#localidad").multipleSelect('refresh');
  $("#tienda").multipleSelect('refresh');
}

function actualizar_tienda(localidades){
  //----Tienda
  $("#tienda").empty();
  $('#tienda').append('<option value="--">--Seleccione--</option>');
  console.log("Tiendas selecciondas")
  console.log(tiendasSeleccionadas)

  Object.entries(tiendasSeleccionadas).forEach(([localidad, tiendas]) =>{ 
    if(localidades.includes(localidad)){
      tiendas.forEach(tienda =>{
          if(tienda){
            $("#tienda").append('<option value="'+tienda+'">'+tienda+'</option>')
          }
        })
    }
  })

  $("#tienda").multipleSelect('refresh');
}