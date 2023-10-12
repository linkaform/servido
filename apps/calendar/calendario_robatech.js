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
    unHideReportElements();
    document.getElementById("firstParameters").style.removeProperty('display');
    
    if (scriptId == null) {
      loadDemoData();
    }

    //--ASSING VALUES
    var dateT = new Date();
    var dateTo = dateT.toISOString().substring(0, 10);
    get_catalog(1);

    //--Styles
    setSpinner();
    $("#gestor").multipleSelect('refresh');
    $("#activities").multipleSelect('refresh');
    $('#divOptions').show();
    $('#title_report').show();
    
    document.getElementById("firstParameters").style.removeProperty('display');
    //unHideReportElements()

  } else {
    unhideElement("inicio_ses");
    $('#divOptions').hide();
    $('#divContent').hide();
    $('#title_report').hide();
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
}

function loadDemoData(){
  unhideElement("title_demo")
  $('.title_tables').show();
  document.getElementById("firstParameters").style.removeProperty('display');
  document.getElementById("firstElement").style.removeProperty('display');

  getDrawCalendar('firstElement', resources1, events1);
}


const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

/*function runFirstElemento(){
  console.log("Pruebas")
  //firstElement = getFirstElement();
  //getFirstElement(gestores, activities);
  firstElement = getFirstElement();
};*/

function runFirstElement() {
  let gestores = $('#gestor').val();
  let activities = $('#activities').val();
  let option = 2;

  firstElement = getFirstElement(gestores, activities, option);
}

function getFirstElement(gestores, activities, option){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  //$('.title_tables').hide();

  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      gestores: gestores,
      activities: activities,
      option: option,

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
        
        //--Draw Calendar
        resourcess = res.response.json.firstElement.data
      }
      if (res.response.json.secondElement.data){
        eventss = res.response.json.secondElement.data

        getDrawCalendar('firstElement', resourcess, eventss);
        document.getElementById("firstParameters").style.removeProperty('display');
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


//----CATALOG
function get_catalog(option){
  console.log("Catálogo")
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 110328,
      option: 1,
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if(res.success){
        if(res.response.json.catalogFirst.data){
          $("#gestor").empty();
          $('#gestor').append('<option value="--">--Seleccione--</option>')
          for (i = 0; i < res.response.json.catalogFirst.data.length; i++){
            value = res.response.json.catalogFirst.data[i].gestor;
            $('#gestor').append('<option value="'+ value + '">'+value+'</option>');
          }
          $('#gestor').multipleSelect('refresh')
        }
    }
  })
}


//----CALENDAR
function getDrawCalendar(id, resources, events){
  let hoy = new Date();
  let ahora = formatoFecha()
  /*nowString = ahora.toString();
  console.log("Ahora...: ", nowString)
  console.log(typeof(nowString))*/
  var calendarEl = document.getElementById(id);
  var calendar = new FullCalendar.Calendar(calendarEl, {
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    now: ahora,
    selectable : true,
    editable: true,     // enable draggable events
    aspectRatio: 1.8,
    scrollTime: '06:00', // undo default 6am scrollTime
    headerToolbar: {
        left: 'today prev,next',
        center: 'title',
        right: 'resourceTimelineDay,timeGridWeek,dayGridMonth'
    },
    eventClick: function(info) {
      let evidencia = info.event._def.extendedProps.evidencia;
      let record_id = info.event.extendedProps.record_id;
      let url = "https://preprod.linkaform.com/#/records/detail/"

      let imgEvidencia = $('#evidencia');

      let btnRedirigir = $('#redirigirFolio')

      if(record_id){
        url = url+record_id;
        btnRedirigir.attr('href',url)
      }else{
        btnRedirigir.attr('href',url)
      }

      if(evidencia){
        $('contentEvidencia').show()
        imgEvidencia.attr('src',evidencia);
      } else {
        imgEvidencia.attr('src','');
        $('#contentEvidencia').hide()
      }
      $('#eventInfo').html(info.event.title);
      $('#eventDescription').html(info.event.extendedProps.activity);
      $('#eventModal').modal('show');
    },
    initialView: 'timeGridWeek',
    views: {
        resourceTimelineThreeDays: {
            type: 'resourceTimeline',
            duration: { days: 3 },
            buttonText: '3 days'
        }
    },
    resourceAreaWidth: '30%',
    resourceAreaColumns: [
        {
            group: true,
            headerContent: 'Gestores',
            field: 'nombre_usuario'
        },
        {
            headerContent: 'Actividad',
            field: 'nombre_actividad'
        },
    ],
    resources: resources,
    events: events
  });

  calendar.setOption('locale', 'es');
  calendar.render();
}

function formatoFecha() {
  // Obtén la fecha actual
  const fecha = new Date();

  // Obtiene el año, mes y día
  const año = fecha.getFullYear();
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 al mes porque en JavaScript los meses comienzan desde 0
  const dia = fecha.getDate().toString().padStart(2, '0');

  // Formatea la fecha en el formato deseado
  const fechaFormateada = `${año}-${mes}-${dia}`;

  console.log(fechaFormateada); // Mostrará la fecha en el formato "2023-10-11"

  return(fechaFormateada);
}

function cerrarModal(){
  $('#eventModal').modal('hide')
}