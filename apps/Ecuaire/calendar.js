let us = null;
let usTy = null;
let jw = null;
let userId = null;
let userJwt = null;
let userName = null;
let userParentId = null;
let scriptId = null;

let catalog_client = [];
let catalog_items = [];
let catalog_checklist = [];
let catalog_usuarios = [];

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
      if (qs[key] === 'test' || qs[key] === 'Test'){
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
    get_catalogs();
    $("#selectActividad").select2({
      placeholder: "Busca una actividad",
      allowClear: true, 
    });
    $("#selectGestor").select2({
      placeholder: "Busca el Gestor",
      allowClear: true, 
    });

    //--Styles
    setSpinner();
    $('#divOptions').show();
    $('#title_report').show();
    document.getElementById("firstParameters").style.removeProperty('display');
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
  getDrawCalendar('firstElement', events2);
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement() {
  let gestor = $('#selectGestor').val();
  let actividad = $('#selectActividad').val();
  firstElement = getFirstElement(gestor, actividad);
}

function getFirstElement(gestor, actividad){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();

  fetch('https://preprod.linkaform.com/api/infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      gestor: gestor,
      actividad: actividad,
      option: 'get_records',

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
      
      //----Res
      if (res.response && res.response.data && res.response.data.length > 0) {
        getDrawCalendar('firstElement',  res.response.data);
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

//----CALENDAR
function getDrawCalendar(id,  events){
  const calendarEl = document.getElementById(id);

  const calendar = new FullCalendar.Calendar(calendarEl, {
    locale : 'es',
    selectable : true,
    aspectRatio: 2,
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    initialView: window.innerWidth < 768 ? 'dayGridMonth' : 'dayGridMonth', 
    height: window.innerWidth < 768 ? 800 : 1200,
    headerToolbar: {
      left: 'prev,next', 
      center: 'title',
      right: 'today',
    },
    dateClick: function (info) {
      const modal = new bootstrap.Modal(document.getElementById('eventModal'));
      document.getElementById('eventDate').value = info.dateStr; // Guardar la fecha seleccionada
      modal.show();
    },
    eventClick: function (info) {
      let event = info.event;
      let title = event.title || 'N/A';
      let contacto = event.extendedProps.contacto || 'N/A';
      let celular = event.extendedProps.celular || 'N/A';
      let check_equipo = event.extendedProps.check_equipo || 'No';
      let check_list = event.extendedProps.check_list || 'N/A';
      let status = event.extendedProps.status || 'N/A';
      let description = event.extendedProps.description || 'N/A';
      let equipo = '';
      if(check_equipo == 'Sí'){
        equipo =  event.extendedProps.catalog_serie || 'No';
      }else if(check_equipo == 'No'){
        equipo =  event.extendedProps.input_equipo || 'No';
      }
      document.getElementById('modalCliente').textContent = title;
      document.getElementById('modalContacto').textContent = contacto;
      document.getElementById('modalTelefono').textContent = celular;
      document.getElementById('modalEquipo').textContent = equipo;
      document.getElementById('modalCheckList').textContent = check_list;
      document.getElementById('modalStatus').textContent = event.status;
      let eventModal = new bootstrap.Modal(document.getElementById('viewModal'));
      eventModal.show();
    },
    events: events,
    windowResize: function (view) {
      const newView = window.innerWidth < 768 ? 'dayGridMonth' : 'dayGridMonth';
      calendar.changeView(newView);
    },
  });
  calendar.render();
  document.getElementById("buttonSave").addEventListener("click", () => {
    //----Fecht
    dicData = getDataForm();
    fetch('https://preprod.linkaform.com/api/infosync/scripts/run/', {
      method: 'POST',
      body: JSON.stringify({
        script_id: 126611,
        option: 'creation_record',
        formInformation: dicData,
      }),
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+userJwt
      },
    })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        let status = res.response && res.response.status ?  res.response.status : '400';
        if(status == '201'){
          const modal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
          modal.hide();
          alert('Se a guardado su evento');
          const title = document.getElementById('inputClient').value;
          const date = document.getElementById('eventDate').value;
          calendar.addEvent({
            title: title,
            start: date,
            allDay: true
          });
          //----Close Modal
          cleanForm();
          e.target.reset();
          
        }else{
          const modal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
          modal.hide();
          alert('No se a guardado su evento');
        }
      }   
    })
 });
}

function setFormItem(option) {
  const classDivCatalog = document.querySelectorAll(".div-catalog-item");
  const classDivItem = document.querySelectorAll(".div-input-item");

  if (option == 'si') {
    classDivCatalog.forEach((elemento) => {
      elemento.style.display = "block";
    });
    classDivItem.forEach((elemento) => {
      elemento.style.display = "none";
    });
  }else if(option == 'no'){
    classDivCatalog.forEach((elemento) => {
      elemento.style.display = "none";
    });
    classDivItem.forEach((elemento) => {
      elemento.style.display = "block";
    });
  }
}

function validationsForm(data){
  if(data.inputClient == '' || data.inputClient == null){
    alert('Seleccione Cliente')
    return false;
  }
  if(data.inputNameContac == '' || data.inputNameContac == null){
    alert('Ingrese datos requeridos de Nombre de contacto')
    return false;
  }
  if(data.inputTextJob == '' || data.inputTextJob == null){
    alert('Ingrese datos requeridos de Trabajo a realizar')
    return false;
  }
  if(data.inputPhone != '' || data.inputPhone != null){
    if (!/^\d+$/.test(data.inputPhone)) {
      alert('El numero debe contener solo digitos')
      return false;
    }else{
      if (data.inputPhone.length < 10 || data.inputPhone.length > 15) {
        alert('El número debe tener entre 7 y 15 dígitos.')
        return false;
      }
    }
  }
  if(data.inputCheck == '' || data.inputCheck == null){
    console.log('data.inputCheck',data.inputCheck)
    alert('Seleccione un tipo de checklist')
    return false;
  }
  let checkboxCatalog = document.getElementById('checkItemYes');
  let checkboxInput = document.getElementById('checkItemNo');
  if (checkboxCatalog.checked) {
    if(data.inputItem == '' || data.inputItem == null){
      alert('Seleccione Cliente')
      return false;
    }
  }
  if (checkboxInput.checked) {
    if(data.inputTextItem == '' || data.inputTextItem == null){
      alert('Ingrese datos del Equipo')
      return false;
    }
  }
  if(data.inputTextOrden == '' || data.inputTextOrden == null){
    alert('Especifique Orden')
    return false;
  }
  if(data.inputUser == '' || data.inputUser == null){
    alert('Seleccione un Usuario')
    return false;
  }
  return true;  
}

function getDataForm() {
  //---Get Data
  const inputs = document.querySelectorAll(".input-form-event");
  const datos = {};
  inputs.forEach((input) => {
    if (input.type === "radio") {
      if (input.checked) {
        datos[input.id] = input.value;
      }
    } else if (input.tagName.toLowerCase() === "select") {
      datos[input.id] = input.value; 
    } else {
      datos[input.id] = input.value;
    }
  });
  //---Validations
  const validation = validationsForm(datos);
  if(validation){
    //---AutoComplete
    if(datos.inputClient){
      let searchClient = datos.inputClient;
      const dicClient = catalog_client.find(item => item.nombre_comercial === searchClient);
      datos['dicClient'] = dicClient;
    }
    if(datos.checkItemYes){
      let searchItem = datos.inputItem;
      const dicItem = catalog_items.find(item => item.nombre_equipo === searchItem);
      datos['dicItem'] = dicItem;
    }
    if(datos.inputUser){
      let searchUser = datos.inputUser;
      const dicUser = catalog_usuarios.find(item => item.nombre === searchUser);
      datos['dicUser'] = dicUser;
    }
    if(datos.inputCheck){
      let searchCheck = datos.inputCheck;
      const dicCheck = catalog_checklist.find(item => item.checklist === searchCheck);
      datos['dicCheck'] = dicCheck;
    }
    return datos;
  }
}

function sendRequest(data) {
}

function get_catalogs() {
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 126611,
      option: 'get_catalog',
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      let data = res.response && res.response.data ?  res.response.data : {};
      if(data.catalog_checklist){
        let catalogSortC = data.catalog_checklist.sort((a, b) => a.checklist.localeCompare(b.checklist));
        catalog_checklist = catalogSortC;
        const selectElement = document.getElementById("inputCheck");
        catalog_checklist.forEach(item => {
          const option = document.createElement("option");
          option.value = item.checklist;
          option.textContent = item.checklist;
          selectElement.appendChild(option);
        });
      }
      if(data.catalog_client){
        //----Select Actividad
        let uniqueCatalogClient = [
          ...new Map(
            data.catalog_client.map(item => [item.nombre_comercial, item])
          ).values(),
        ];
        let catalogSortCli = uniqueCatalogClient.sort((a, b) =>
          a.nombre_comercial.localeCompare(b.nombre_comercial)
        );
        catalog_client = catalogSortCli;

        const selectActividad = document.getElementById("selectActividad");
        catalog_client.forEach(item => {
          const option = document.createElement("option");
          option.value = item.nombre_comercial;
          option.textContent = item.nombre_comercial;
          selectActividad.appendChild(option);
        });
        //----Select Client
        const selectClient = document.getElementById("inputClient");
        catalog_client.forEach(item => {
          const option = document.createElement("option");
          option.value = item.nombre_comercial;
          option.textContent = item.nombre_comercial;
          selectClient.appendChild(option);
        });
        //---Selector
        $('#selectActividad').select2();
      }
      if(data.catalog_items){
        let catalogSortI = data.catalog_items.sort((a, b) => a.nombre_equipo.localeCompare(b.nombre_equipo));
        catalog_items = catalogSortI;
        const selectItem = document.getElementById("inputItem");
        catalog_items.forEach(item => {
          const option = document.createElement("option");
          option.value = item.nombre_equipo;
          option.textContent = item.nombre_equipo;
          selectItem.appendChild(option);
        });
      }
      if(data.catalog_usuarios){
        let catalogSortU = data.catalog_usuarios.sort((a, b) => a.nombre.localeCompare(b.nombre));
        catalog_usuarios = catalogSortU;
        //----Select Gestor
        const selectGestor = document.getElementById("selectGestor");
        catalog_usuarios.forEach(item => {
          const option = document.createElement("option");
          option.value = item.nombre;
          option.textContent = item.nombre;
          selectGestor.appendChild(option);
        });
        //----Select User
        const selectUser = document.getElementById("inputUser");
        catalog_usuarios.forEach(item => {
          const option = document.createElement("option");
          option.value = item.nombre;
          option.textContent = item.nombre;
          selectUser.appendChild(option);
        });
        $('#selectGestor').select2();
      }  
    }   
  })
}

function cleanForm() {
  //---Clean
  const elements = document.querySelectorAll('.input-form-event');
  elements.forEach(element => {
    if (element.tagName === 'INPUT') {
      if (element.type === 'checkbox' || element.type === 'radio') {
        element.checked = false;
      } else {
        element.value = '';
      }
    } else if (element.tagName === 'SELECT') {
      element.selectedIndex = 0;
    } else if (element.tagName === 'TEXTAREA') {
      element.value = '';
    }
  });
  //---Hide and Show
  const classDivCatalog = document.querySelectorAll(".div-catalog-item");
  const classDivItem = document.querySelectorAll(".div-input-item");
  classDivCatalog.forEach((elemento) => {
    elemento.style.display = "none";
  });
  classDivItem.forEach((elemento) => {
    elemento.style.display = "none";
  });
}