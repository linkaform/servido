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
  unhideElement("secondElement");
}

function loadDemoData(){
  unhideElement("title_demo")
  $('.title_tables').show();
  document.getElementById("firstParameters").style.removeProperty('display');
  document.getElementById("firstElement").style.removeProperty('display');

  document.getElementById("secondElement").style.removeProperty('display');

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

        eventss.forEach(element => {
          console.log(element)
          let parColor = arrayColors[element.gestor]
          if(element.status == 'Planificado'){
            
            //alert(parColor)
            
            //let colores = arrayColors.indiceGestor;
           element.color = parColor[0]
          }else{
            element.color = colores[1]
          }
        });

        getDrawCalendar('firstElement', resourcess, eventss);
        document.getElementById("firstParameters").style.removeProperty('display');
        document.getElementById("firstElement").style.removeProperty('display');
        document.getElementById("secondElement").style.removeProperty('display');
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

var arrayColors = {};
var secondArrayColors = [];
var lengthCatalog = 0;
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
          console.log(res.response.json.catalogFirst.data)
          var selectElement = $("#gestor");
          selectElement.empty();
          selectElement.append('<option value="--">--Seleccione--</option>')
          lengthCatalog = res.response.json.catalogFirst.data.length; //Definimos el tamaño del catálogo
          
          let coloresFormateados = generarArregloConTonalidades(res.response.json.catalogFirst.data.length)

          for (i = 0; i < res.response.json.catalogFirst.data.length; i++){
            
            value = res.response.json.catalogFirst.data[i].gestor;

            arrayColors[value] = coloresFormateados[i];
            secondArrayColors.push({
              "nombre": value,
              "colores": coloresFormateados[i]
            })

            colores = res.response.json.catalogFirst.data[i].color;
            selectElement.append('<option value="'+ value + '">'+value+'</option>');
            var optionContainer = $("<div class='option-container'></div>")
            var option = $("<option></option>")
              .text(value)
              .val(value)

            var colorDiv1 = $("<div class='color-box'></div>").css({width: "20px", height: "20px", backgroundColor: colores[0]}).addClass("color-box");
            var colorDiv2 = $("<div class='color-box'></div>").css({width: "20px", height: "20px", backgroundColor: colores[1]}).addClass("color-box");
            
            optionContainer.append(colorDiv1)
            optionContainer.append(colorDiv2)
            optionContainer.append(option)

            //Agregar la opción al select
            selectElement.append(optionContainer);
          }

          //--- Modificación de colores
          var elementoIndentificador = $("#identificador");
          var usuariosColores = secondArrayColors;

          usuariosColores.forEach(function(usuario){
            var usuarioContainer = $("<div>").addClass('usuario-container')
              .css({display:"flex"})
            var usuarioElement = $("<div>").text(usuario.nombre)
              .css({padding:"5px"})
            usuarioElement.css("color", usuario.colores[0],);

            var colorElement1 = $("<div>")
              .addClass("color-circle")
              .css({
                backgroundColor: usuario.colores[0],
                width: "30px",
                height: "30px",
                borderRadius:"50%",
                display:"inline-block",
                marginRight:"10px"
              });

            var colorElement2 = $("<div>")
              .css({
                backgroundColor: usuario.colores[1],
                width: "30px",
                height: "30px",
                borderRadius:"50%",
                display:"inline-block",
                marginRight:"10px"
              });

              usuarioContainer.append(usuarioElement, colorElement1, colorElement2);
              elementoIndentificador.append(usuarioContainer)

          })

          console.log(arrayColors); // Muestra el arreglo con las tonalidades generadas
          selectElement.multipleSelect('refresh')
        }
    }
  })
}


//----CALENDAR
function getDrawCalendar(id, resources, events){
  // Obtén la fecha actual
  var today = new Date();

  let secondElement = $('#numSemana');

  // Calcula el número de semana
  var weekNumber = getWeekNumber(today);

  if(weekNumber){
    secondElement.html('Semana actual: ' + weekNumber);
  }

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
    eventContent: function(arg) {
      var event = arg.event;
      var startTime = getHours(event.startStr);

      var endTime = getHours(event.endStr);
      if (!endTime){
        endTime = ''
      } 
      var html = '<b>' + startTime + '-' + endTime + " " + event.extendedProps.gestor +'</b><br>' + event.title;

      // Puedes personalizar aún más la apariencia del evento aquí.
      // Por ejemplo, puedes cambiar el color del evento, agregar clases CSS, etc.

      // Aplicar estilos CSS al contenedor del evento
      var containerStyle = 'max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;';
      html = '<div style="' + containerStyle + '">' + html + '</div>';

      return { html: html };
    },
    eventClick: function(info) {
      console.log("El event Object es:")
      console.log(info.event)
      let evidencia = info.event._def.extendedProps.evidencia;
      let record_id = info.event.extendedProps.record_id;
      let url = "https://app.linkaform.com/#/records/detail/"
      let infoGestor = info.event.extendedProps.gestor;
      let infoStatus = info.event.extendedProps.status;

      //---Variables del elemento HTML
      let imgEvidencia = $('#evidencia');
      let btnRedirigir = $('#redirigirFolio')
      let nameGestor = $('#nameGestor')
      let statusActivity = $('#statusActivity')

      //---Funcionalidades
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

      if(infoGestor){
        nameGestor.show();
        nameGestor.html(infoGestor)
      }else{
        nameGestor.html('');
      }

      if(infoStatus){
        statusActivity.html("Actividad "+infoStatus)
      }else{
        statusActivity.html('');
      }

      $('#eventInfo').html(info.event.title);
      $('#eventDescription').html(info.event.extendedProps.activity);
      $('#eventModal').modal('show');
    },
    viewDidMount: function(viewInfo){
      var vistaActual = viewInfo.view.type;
      if(vistaActual === 'dayGridMonth'){
        $('#numSemana').css("visibility", "hidden").css("height",0);
      }else{
        $('#numSemana').css("visibility", "visible").css("height",'auto');
      }
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

//---Función para agregar el número de la semana actual al calendario
function getWeekNumber(date) {
  // Copia la fecha para evitar cambios en la fecha original
  date = new Date(date);

  // Establece el día 4 (jueves) como el primer día de la semana
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);

  // Calcular el número de semana
  var week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

function getHours(hourDate) {
  try {
    var date = new Date(hourDate);

    if (isNaN(date)) {
      throw new Error("La cadena no representa una fecha válida.");
    }

    var hour = date.getHours();
    var minute = date.getMinutes();

    if (minute < 10) {
      minute = '0' + minute;
    }

    return hour + ":" + minute;
  } catch (error) {
    console.error(error);
    return ''; 
  }
}

//Generar colores en automático
function generarArregloConTonalidades(cantidad) {
  var colores = [];

  for (var i = 0; i < cantidad; i++) {
    var base = "#" + Math.floor(Math.random() * 16777215).toString(16); // Generar un color hexadecimal aleatorio
    var baseColor = base;
    
    // Obtén los componentes RGB del color base
    var baseInt = parseInt(base.slice(1), 16);
    var rBase = (baseInt >> 16) & 150;
    var gBase = (baseInt >> 16) & 190;
    var bBase = baseInt & 230;

    // Ajusta los componentes de color para obtener tonalidades diferentes
    var r = Math.min(rBase + i, 100);
    var g = Math.min(gBase + i, 150);
    var b = Math.min(bBase + i, 190);

    var tonalidad = "#" + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
    colores.push([baseColor, tonalidad]);
  }

  return colores;
}

/*function formatearUsuarios(){
  arrayColors.forEach(element => {
    alert(element);
  })
}*/