

// Settings
var url = "https://app.linkaform.com/api/";
//var url = "http://127.0.0.1:8011/api/";
// var url = "https://app.linkaform.com/api/";
//var url = "http://192.168.0.25:8000/api/";
// End Settings

// Funciones Genericas Servido


//Funcion para retornar cambios en dos objetos con las mismas keys 
function encontrarCambios(objetoOriginal, objetoEditado) {
  let cambios = {};
  for (let key in objetoOriginal) {
        if (objetoOriginal.hasOwnProperty(key) && objetoEditado.hasOwnProperty(key)) {
            if (objetoOriginal[key] !== objetoEditado[key]) {
                    cambios[key] = objetoEditado[key]
                }
            /*
            if(objetoEditado[key] instanceof Array && objetoOriginal[key] instanceof Array){
                    for(let subKey in objetoOriginal[key]){
                        console.log("subkey",objetoOriginal[key][subKey])
                        if(objetoOriginal[key][subKey].hasOwnProperty('file_name') && objetoEditado[key][subKey].hasOwnProperty('file_name') ){
                            console.log(objetoOriginal[key][subKey].file_url !== objetoEditado[key][subKey].file_url)
                            if (objetoOriginal[key][subKey].file_url !== objetoEditado[key][subKey].file_url) {
                                cambios[key] = objetoEditado[key]
                            }
                        }else{
                            for(let subKey in objetoEditado[key]){
                                if (objetoOriginal[key][subKey]['6647fb38da07bf430e273ea2']!== objetoEditado[key][subKey]['6647fb38da07bf430e273ea2']) {
                                    cambios[key] = objetoEditado[key]
                                }
                            }
                        }
                    }
            }else{
                if (objetoOriginal[key] !== objetoEditado[key]) {
                    cambios[key] = objetoEditado[key]
                }
            }*/
        }
  }
  return cambios;
}



function convertDate(timestamp, timezone){
    const date = new Date(timestamp * 1000);
    const options = {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    let raw=date.toLocaleString('es-MX', options);
    let [fecha, hora] = raw.split(',');
    fecha = fecha.replace(/\//g, '-');
    hora = hora.slice(0, -3);
    return `${fecha.substr(6,4)}-${fecha.substr(3,2)}-${fecha.substr(0,2)} ${hora.trim()}`;
}

function urlParamstoJson() {
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if (typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = pair[1];
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [ query_string[pair[0]], pair[1] ];
			query_string[pair[0]] = arr;
		} else {
			query_string[pair[0]].push(pair[1]);
		}
	}
	return query_string;
};

function getAllElementsWithAttribute(rootNode, attribute, value){
	var matchingElements = [];
	var allElements = document.getElementsByTagName('*');
	for (var i = 0, n = allElements.length; i < n; i++){
		if (allElements[i].getAttribute(attribute) !== null &&
			allElements[i].getAttribute(attribute) === value){
			matchingElements.push(allElements[i]);
		}
	}
	return matchingElements;
}

function reset() {
  loading.style.display = 'flex';
  const user = document.getElementById('user');
  user.value = '';
  const pass = document.getElementById('pass');
  pass.value = '';

  hideLoading()
};

function hideElement(elementId) {
    const element = document.getElementById(elementId);
    // element.style.visibility = 'hidden';
    if(element){
        element.style.display = 'none';
    }
};

function unhideElement(elementId) {
    const element = document.getElementById(elementId);
    // element.style.visibility = 'visible';
    if(element){
        element.style.display = 'block';
    }
};

function hideLoading() {
  setTimeout(() => {
    loading.style.display = 'none';
  }, 1000);
};

function login() {
  loading.style.display = 'flex';
  var mensage = "Es necesario ingresar:<br /><br />";
  let err = 0;
  if(user.value == ""){
    err = 1;
    mensage += "- Usuario.<br />";
  }
  if(pass.value == ""){
    err = 1;
    mensage += "- Contraseña.<br />";
  }
  if(err == 0){
    //fetch('https://app.linkaform.com/api/infosync/user_admin/login/', {
    fetch(url + 'infosync/user_admin/login/', {
      method: 'POST',
      body: JSON.stringify({
        username: user.value,
        password: pass.value,
      }),
      headers:{
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.json())
    .then((res) => {
      if(res.code == 2){
        hideElement("inicio_ses");
        unhideElement("close_sesion");
        userId = res.user.id;
        userJwt = res.jwt;
        sessionId = res.session_id;
        userName = res.user.first_name;
        userParentId = res.user.parent_info.id;
        setCookie("sessionid", sessionId, 7);
        setCookie("userId", userId, 7);
        setCookie("userJwt", userJwt, 7);
        setCookie("userName", userName, 7);
        setCookie("userParentId", userParentId,7);
        hideLoading();
        unHideReportElements();
        if (scriptId == null) {
          console.log('Loding Demo Data');
          loadDemoData();
        }
        //---IMAGE
        if (userParentId!=null && userParentId!="")
        {
          getCompanyLogo(userParentId)
        }

      } else {
        hideLoading();
        Swal.fire({
          title: 'Error',
          html: res.error
        })
      }
    })
  } else {
    loading.style.display = 'none';
    Swal.fire({
      title: 'Error',
      html: mensage
    });
  }

}

function getCompanyLogo(userParentId){
  document.getElementById("image_log").setAttribute("src", "https://f001.backblazeb2.com/file/lkf-media/company_pictures/company_pic_"+userParentId+".thumbnail")
  document.getElementById("image_log").setAttribute("width","125");
  document.getElementById("image_log").setAttribute("height","75");
}

function changeColor() {
  $("#tableComisiones tr").find('td:eq(6)').each(function () {
    if ($(this).text() == '3' || $(this).text() > '3') {
      $(this).closest('tr').css('background-color', '#fffb97');
    }
  })
  $("#tableComisiones tr").find('td:eq(8)').each(function () {
    if ($(this).text() == 'Fuera') {
      $(this).closest('tr').css('background-color', '#ff0000');
    }
  })
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	var name = cname + "=";
	 var ca = document.cookie.split(';');
	 for(var i=0; i<ca.length; i++) {
		 var c = ca[i];
		 while (c.charAt(0)==' ') c = c.substring(1);
		 if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	 }
	 return "";
}

function closeSession(){
    var cookies = document.cookie.split(";"); 
    for (var i = 0; i < cookies.length; i++){ 
        var spcook = cookies[i].split("="); 
        document.cookie = spcook[0] + "=;expires=Thu, 21 Sep 1979 00:00:01 UTC;"; 
    }
  location.reload();
}

function setCloseSession(argument) {
    console.log("SALIRR")
    localStorage.setItem('cerrarSesion', Date.now());
    closeSession();
    // redirectionUrl('login',false, true);
    // let protocol = window.location.protocol;
    // let host = window.location.host;
    // window.location.href =`${protocol}//${host}/solucion_accesos/login.html`;

}

function validSession(user, userJwt){
    if(user =='' && userJwt =='' ){
        let protocol = window.location.protocol;
        let host = window.location.host;
        let urlNew = `${protocol}//${host}/solucion_accesos/login.html`
        window.location.href =urlNew
    }
} 

///-----STYLE
function getPAlleteColors(pallete,number){
  var arrayColors = new Array();
  //----Select Pallete
  if (pallete==1){
      arrayColors = chroma.scale(['#fafa6e','#2A4858']).mode('lch').colors(number);
  }else if(pallete==2){
      arrayColors = chroma.scale(['#1B4F72','#AED6F1','#F7DC6F']).mode('lch').colors(number);
  }else if(pallete==3){
      arrayColors = chroma.scale(['#90afc5','#336b87','#2a3132','#763626']).mode('lch').colors(number);
  }else if(pallete==4){
      arrayColors = chroma.scale(['#003b46','#07575b','#66a5ad','#c4dfe6']).mode('lch').colors(number);
  }else if(pallete==5){
    arrayColors = chroma.scale(['#27ae60','#f1c40f','#d35400']).mode('lch').colors(number);
  }else if(pallete==6){
    arrayColors = chroma.scale(['#3498db','#1b4f72','#27ae60']).mode('lch').colors(number);
  }else if(pallete==7){
    arrayColors = chroma.scale(['#0b7fab','#f1e4de','#f4d75e','#e9723d','#7c7b89']).mode('lch').colors(number);
  }else if(pallete==8){
    arrayColors = chroma.scale(['#FFBE70','#E89A66','#FF9D7D','#E87466','#FF7085']).mode('lch').colors(number);
  }else if(pallete==9){
    arrayColors = chroma.scale(['#8C062B','#DB1049','#FE6973','#FA8471','#F5B301','#FED053']).mode('lch').colors(number);
  }else if(pallete==10){
    arrayColors = chroma.scale(['#264653','#2A9D8F','#216974','#41766F','#E09453','#D1711F','#A34828']).mode('lch').colors(number);
  }else if(pallete==11){
    arrayColors = chroma.scale(['#E63946','#F1FAEE','#A8DADC','#457B9D','#1D3557']).mode('lch').colors(number);
  }else if(pallete == 12){
    arrayColors = chroma.scale(["#dc3545", "#28a745"]).mode('lch').colors(number);
  }else if(pallete == 13){
    arrayColors = chroma.scale(["#007CB3", "#EFB03B"]).mode('lch').colors(number);
  }
  return arrayColors;
}

function setSpinner(custom = false, idCustom = ''){

  if(!custom){
    if ($("#divContent")){
      $("#divContent").after(''+
        ' <div class="load-wrapp">'+
          '<div class="load-3">'+
            '<center>'+
              '<div class="line"></div>'+
              '<div class="line"></div>'+
              '<div class="line"></div>'+
              '<div class="line"></div>'+
            '</center>'+
          '</div>'+
        '</div>'
      ); 
      $('.load-wrapp').hide();
    }
  }else if(custom){
    if ($("#"+idCustom)){
      $("#"+idCustom).append(''+
        ' <div class="load-wrapp">'+
          '<div class="load-3">'+
            '<center>'+
              '<div class="line"></div>'+
              '<div class="line"></div>'+
              '<div class="line"></div>'+
              '<div class="line"></div>'+
            '</center>'+
          '</div>'+
        '</div>'
      ); 
    }
  }  
}

///-----DOWNLOAD 
function screenDownload(id,nameFile = null) 
{
  let title = 'file-name.png';
  if(nameFile != null){
    title = nameFile+'.png';
  }
  changeStyleScreen(id,true)
  html2canvas(document.querySelector("#"+id)).then(canvas => {
    getDownload(canvas.toDataURL(), title);
  });
  changeStyleScreen(id,false)
}



function get_chartDownload(id,style, nameFile = null) 
{
  let title = 'file-name.png';
  if(nameFile != null){
    title = nameFile+'.png';
  }
  $('#'+id).addClass(style);
  html2canvas(document.querySelector("#"+id)).then(canvas => {
    getDownload(canvas.toDataURL(), title);
  });
  $("#"+id).removeClass(style);
}

function getDownload(uri, filename){
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

function changeStyleScreen(id, option) {
  let element = document.getElementById(id);
  if(option){
    element.style.width = "2100px";  
    element.style.height = "95%"; 
  }else{
    element.style.width = "95%";  
    element.style.height = "50%"; 
  }
}


function setDateFilterMonth() {
  date = new Date();
  primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
  ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  $("#date_from").val(primerDia.toISOString().substring(0, 10));
  $("#date_to").val(ultimoDia.toISOString().substring(0, 10));
}

function getActiveCheckBoxs(instanceTables /*Object with propperties(id) of table instances*/, tableId){
    let selectedRows=[]
    let filas = instanceTables[tableId].getSelectedRows()
    filas.forEach(function(fila) {
        selectedRows= selectedRows.concat(fila.getData())
    });
    return selectedRows
}


let dateFilter = function(headerValue, rowValue, rowData, filterParams){
    var partes1 = headerValue.split("-");
    var anio1 = partes1[0];
    var mes1 = partes1[1] ;
    var dia1 = partes1[2];
    let headerValueDate = dia1+'-'+mes1+'-'+anio1

    let rowValueDate = rowValue.split(' ')[0]
    var partes = rowValueDate.split("-");
    var anio = partes[2];
    var mes = partes[1] ;
    var dia = partes[0];
    let stringDate= dia+'-'+mes+'-'+anio

    if (stringDate == headerValueDate) {
        return true;
    }else{
        return false;
    }
 }


function descargarExcel(tables, table){
    let columns = tables[table].getColumns();
    let nombresColumnas= []
    let containsFolio=false
     for(column of columns) {
        if(column.getField() !== 'actions' && column.getField() !== 'checkboxColumn' && column.getField() !== 'folio') {
           nombresColumnas.push(column.getField())
        }
    };
    nombresColumnas.unshift("folio");

    let excelContent = nombresColumnas.join('\t') + '\n'; // Titulos de las columnas
    tables[table].getData().forEach(function(row) {
        let fila = '';
        Object.keys(row).forEach(function(key, index) {
            if(row[key]!==undefined && key !== 'actions' &&  key !== 'checkboxColumn' ) {
                fila += '"' + row[key].toString().replace(/"/g, '""') + '"';
                if (index < Object.keys(row).length - 1) {
                    fila += '\t'; 
                }
            }
            
        });
        excelContent += fila + '\n';
    });
    let blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = table + '.xlsx';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function validarEmail(email){
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let result = false
    if (emailRegex.test(email)) {
        result = true
    }else{
        result= false
    }
    return result
}


function formatDateToService(isoDateStr, buttonLoading, button){
    const dateObj = new Date(isoDateStr);
    if(dateObj!==""){
        let formattedDateStr
        try {
            console.log(isoDateStr)
            formattedDateStr = dateObj.toISOString().replace('T', ' ').substring(0, 16);
        }catch{
            errorAlert("Selecciona una fecha y hora válida.","Validación", "warning")
            if(buttonLoading){
                $("#"+buttonLoading).hide();
            }
            if(button){
                $("#"+button).show();
            }
        }
        return formattedDateStr;
    }
}

function getTodayDateTime(){
    let fecha = new Date();
    // Obtener los componentes individuales de la fecha
    let año = fecha.getFullYear();
    let mes = ('0' + (fecha.getMonth() + 1)).slice(-2); // El mes se ajusta sumando 1 y asegurando que tenga dos dígitos
    let dia = ('0' + fecha.getDate()).slice(-2); // El día se asegura de tener dos dígitos
    let horas = ('0' + fecha.getHours()).slice(-2); // Las horas se aseguran de tener dos dígitos
    let minutos = ('0' + fecha.getMinutes()).slice(-2); // Los minutos se aseguran de tener dos dígitos
    let segundos = ('0' + fecha.getSeconds()).slice(-2); // Los segundos se aseguran de tener dos dígitos

    // Construir la cadena en el formato deseado
    let fechaFormateada = `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;

    // Mostrar la fecha formateada
    return fechaFormateada;
}

/*
let ejemplo={"status_code": 400, 
        "json": {
            "663fae53fa005c70de59eb95": {
                "1": {
                    "663bd466b19b7fb7d9e97cdc": {"msg": ["Este campo es requerido"], "error": [], "label": "ID usuario"}, 
                    "66a28f3ca6b0f085b1518ca8": {"msg": ["Este campo es requerido"], "error": [], "label": "Status"}
                }, 
                "0": {
                    "663bd466b19b7fb7d9e97cdc": {"msg": ["Este campo es requerido"], "error": [], "label": "ID usuario"}, 
                    "66a28f3ca6b0f085b1518ca8": {"msg": ["Este campo es requerido"], "error": [], "label": "Status"}
                }, 
                "group": {"msg": [], "error": [], "label": "Informaci\u00f3n del guardias de apoyo"}
            }
        }
    }
*/

function objLength(err,data){
    let objectCount = 0;
    const keys = Object.keys(data[err]);
    if (typeof data === 'object' || data !== null) {
        for (let key of keys) {
            if (typeof data[err][key] === 'object' && data[err][key] !== null) {
              objectCount++;
            }
        }
    }
    console.log(objectCount)
    return objectCount
}

function formatNumber(num) {
    return String(num).padStart(2, '0');
} 

function onChangeAmpmLabel(idHora, labelId){
    let selectHora = document.getElementById(idHora)
    if(selectHora.value > String(12) && selectHora.value < String(23)){
        $('#'+labelId).text('PM')
    }else{
        $('#'+labelId).text('AM')
    }
    $('#'+labelId).text('hrs')
}

function iniciarSelectHora(hr, min, lab){
    let selHora = document.getElementById(hr)
    let selMin = document.getElementById(min)
    let label = document.getElementById(lab)

    selMin.innerHTML=""
    selHora.innerHTML=""
    for (let i =0; i<60; i++){
        selMin.innerHTML += '<option value="'+formatNumber(i)+'">'+formatNumber(i)+'</option>';
    }
    for (let i = 0; i < 24; i++){
        selHora.innerHTML += '<option value="'+formatNumber(i)+'">'+formatNumber(i)+'</option>';
    }
    selMin.value='00'
    selHora.value='00'
    $('#'+lab).text('hrs')

}

function errorAlert(data, title = "Error", type="warning"){
    if(data.hasOwnProperty("json")){
        let errores=[]
        for(let err in data.json){
            let length=objLength(err, data.json)
             if(data.json[err].hasOwnProperty('label')){
                errores.push(data.json[err].label+': '+data.json[err].msg+" ")
            }else {
                for (let subKey in err){
                    for(let subKey2 in data.json[err][subKey]){
                        errores.push(data.json[err][subKey][subKey2].label+': '+data.json[err][subKey][subKey2].msg+" ")
                    }
                }
            }
        }
        Swal.fire({
            title: title,
            text: errores.flat(),
            type: "warning"
        });
    }else if (data.hasOwnProperty("error")){
        let error= data.error
        if(error.hasOwnProperty('msg')){
            if(typeof error.msg ==='string'){
                Swal.fire({
                    title: title,
                    text: error.msg,
                    type: "warning"
                });
            }else{
                Swal.fire({
                    title: error.msg.title,
                    text: error.msg.msg,
                    type: error.msg.type
                });
            }
        }else{
            Swal.fire({
                title: title,
                text: error,
                type: type
            });
        }
    }else if (typeof data ==='string'){
        Swal.fire({
            title: title,
            text: data,
            type: type
        });
    }
}

function errorLoginTurnos(data, type="warning", fn= ()=>{}){
    if (data.hasOwnProperty("error")){
        let error= data.error
        if(error.hasOwnProperty('msg')){
            Swal.fire({
                title: error.msg.title,
                text: error.msg.msg,
                type: error.msg.type,
                allowOutsideClick: false,
                showDenyButton: true,
                showCancelButton: true,
                cancelButtonColor: colors[0],
                confirmButtonColor: colors[1],
                confirmButtonText: "Salir",
                cancelButtonText: "Intentar de nuevo",
                reverseButtons: true,
                heightAuto:false,
            }).then((result) => {
                if (result.value) {
                    setCloseSession()
                }else{
                    fn()
                    location.reload()
                }
            });
        }else{
            Swal.fire({
                title: 'Ocurrio un error...',
                text: error,
                type: type,
                allowOutsideClick: false,
                showDenyButton: true,
                showCancelButton: true,
                cancelButtonColor: colors[0],
                confirmButtonColor: colors[1],
                confirmButtonText: "Salir",
                cancelButtonText: "Intentar de nuevo",
                reverseButtons: true,
                heightAuto:false,
            }).then((result) => {
                console.log(result)
                if (result.value) {
                    setCloseSession()
                }else{
                    fn()
                    location.reload()
                }
            });
        }
    }else if(typeof data ==='string'){
        console.log(data)
        Swal.fire({
            title: 'Ocurrio un error...',
            text: data,
            type: type,
            allowOutsideClick: false,
            showDenyButton: true,
            showCancelButton: true,
            cancelButtonColor: colors[0],
            confirmButtonColor: colors[1],
            confirmButtonText: "Salir",
            cancelButtonText: "Intentar de nuevo",
            reverseButtons: true,
            heightAuto:false,
        }).then((result) => {
            console.log(result)
            if (result.value) {
                setCloseSession()
            }else{
                fn()
                location.reload()
            }
        });
    }
}


function successMsg(title, text, type = "success"){
    Swal.fire({
        title: title,
        text: text,
        type: type
    });
}

function loadingService(text ="Procesando...", html=""){
    Swal.fire({
        title: text,
        html: html, // Icono con animación
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
       }
    });
}

function tienePropiedadesVacias(objeto) {
    for (let key in objeto) {
        if (objeto.hasOwnProperty(key)) {
            // Verificar si la propiedad es vacía
            if (objeto[key] === null ||
                objeto[key] === undefined ||
                objeto[key] === '' ||
                (Array.isArray(objeto[key]) && objeto[key].length === 0)) {
                return true; // Retorna true si encuentra una propiedad vacía
            }
        }
    }
    return false; // Retorna false si no encuentra ninguna propiedad vacía
}

function propiedadesVacias(objeto) {
    let array=[]
    for (let key in objeto) {
        if (objeto.hasOwnProperty(key)) {
            // Verificar si la propiedad es vacía
            if (objeto[key] === null ||
                objeto[key] === undefined ||
                objeto[key] === '' ||
                (Array.isArray(objeto[key]) && objeto[key].length === 0)) {
                array.push(key)
            }
        }
    }
    return array; // Retorna las propiedades vacias
}

function eliminarObjetosConPropiedadesVacias(array) {
    return array.filter(obj => {
        // Verificar si cada propiedad del objeto no está vacía
        return Object.values(obj).every(value => {
            return value !== "" && value !== null && value !== undefined && value.toString().trim() !== "";
        });
    });
}

function formatText(text) {
    let replacedText = text.replace(/_/g, ' ');
    let formattedText = replacedText.charAt(0).toUpperCase() + replacedText.slice(1).toLowerCase();
    return formattedText;
}

function uniqueID(){
    const timestamp = Date.now(); // Obtiene el timestamp actual en milisegundos
    const randomPart = Math.floor(Math.random() * 1000000); // Genera un número aleatorio entre 0 y 999999
    return `${timestamp}-${randomPart}`; // Combina ambos para formar el ID
}



function formatearFechaHora(fechaHora) {
    // Crear un objeto Date a partir de la fecha y hora proporcionada
    const fechaObj = new Date(fechaHora);
    
    // Crear arrays con los nombres de los meses
    const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    
    // Obtener el día, mes, año, hora, minuto y segundo
    const dia = fechaObj.getDate();
    const mes = meses[fechaObj.getMonth()];
    const año = fechaObj.getFullYear();
    const hora = fechaObj.getHours().toString().padStart(2, '0'); // Añadir ceros a la izquierda si es necesario
    const minuto = fechaObj.getMinutes().toString().padStart(2, '0');
    const segundo = fechaObj.getSeconds().toString().padStart(2, '0');
    
    // Formatear la fecha y hora en el formato deseado
    return `${dia} de ${mes} de ${año}, ${hora}:${minuto}:${segundo} hrs`;
}


function capitalizeFirstLetter(text) {
    if(text){
        if (text.length > 0) {
            const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
            return capitalizedText
        }
    }else{
        return ""
    }
}

//FUNCION obtener los valores de los inputs de un modal
function getInputsValueByClass(classInput){
    let data = {};
    let elements = document.getElementsByClassName(classInput)
    console.log("QUE PASAA",elements)
    for (let i = 0; i < elements.length; i++) {
        let id = elements[i].id;
        let value = elements[i].value;
        let type = elements[i].type;
        let tag = elements[i].tagName.toLowerCase()
        if(type == 'radio'){
            let valueCheck = elements[i].checked;
            if(valueCheck){
                data[id] = value;
            }
        } else if(tag == 'img'){
            data[id]=elements[i].src
        }
        else{
            data[id] = value;
        }
    }
    return data
}

function cleanCatalag(catalogsId){
    for (let cat of catalogsId){
        let selectCat = document.getElementById(cat)
        if(selectCat){
            selectCat.innerHTML=""
            selectCat.value=""
        }
    }
}

function eliminarPropiedadesVacias(obj) {
    for (const key in obj) {
        if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
            delete obj[key];
        }
    }
    return obj;
}

async function cargarCatalogos(bodys=[], loading=true) {
    let failedRequests=[]
    let format=[]
    let requests=[]
    if(bodys.length>0){
        if(loading)loadingService()
        for (let body of bodys){
            requests.push({
                url: url + urlScripts,
                options: {
                    method: 'POST',
                    body:JSON.stringify(body),
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+userJwt
                    },
                },
            })
        }
         // Crea un array de promesas fetch
        const fetchPromises = requests.map((request, index) =>
             fetch(request.url, request.options)
                .then(async response => {
                    if (!response.ok) {
                        let objBody= JSON.parse(request.options.body)
                        failedRequests.push(objBody.option)
                        Swal.close()
                        return Promise.reject({
                            index,
                            success:false,
                            url: request.url,
                            status: response.status,
                            error: objBody.option,
                            msj:`Error en la solicitud: ${objBody.option}, Se obtuvo status code: ${response.status}`
                        });
                    }else{
                        let objBody= JSON.parse(request.options.body)
                        const data = await response.json();
                        Swal.close()
                        return { index, url: request.url, data, objBody: objBody};
                    }
                })
                .catch(error => {
                    // Captura y maneja errores de red o de respuesta
                    let objBody= JSON.parse(request.options.body)
                    Swal.close()
                    return {
                        index,
                        url: request.url,
                        success:false,
                        error: objBody.option,
                        msj: `Error en la solicitud: ${objBody.option}, Se obtuvo status code: ${response.status}`
                    };
                })
        );
        // Ejecuta todas las promesas
        const results = await Promise.allSettled(fetchPromises);

        let successfulRequests = results
            .filter(result => result.status === 'fulfilled' && result.value.data.success)
            .map(result => result);
        for (let res of successfulRequests){
            format.push({objBody: res.value.objBody, data: res.value.data.response.data})
        }
    }
    return {format,failedRequests}
}



function getDataGrupoRepetitivo(divPadre,inputsHijos , cantidadInputs){
    let array=[]
    let divP = document.getElementById(divPadre);
    let inputs = divP.querySelectorAll(inputsHijos);
    for (let i = 0; i < inputs.length; i += cantidadInputs) { // Incrementar de dos en dos
        const datoInput1 = inputs[i].value; // Input
        const dataInput2 = inputs[i + 1].value; // Select
        let objTemporal={}
        if (datoInput1 && dataInput2) { // Verificar que el input no esté vacío
            if(inputsHijos=='.persona-div-nuevo'|| inputsHijos=='.persona-div-editar'){
                objTemporal.nombre_completo= datoInput1;
                objTemporal.tipo_persona= dataInput2;
            }
            if(inputsHijos=='.dano-div-nuevo' ||inputsHijos=='.dano-div-editar'){
                objTemporal.responsable_accion= datoInput1;
                objTemporal.acciones_tomadas= dataInput2;
            }
             if(inputsHijos=='.deposito-nuevo' ||inputsHijos=='.deposito-editar'){
                objTemporal.tipo_deposito= datoInput1;
                objTemporal.cantidad= dataInput2;
            }
            if(inputsHijos=='.com-div-nuevo' ||inputsHijos=='.com-div-nuevo'){
                objTemporal.tipo_comentario= datoInput1;
                objTemporal.comentario_pase= dataInput2;
            }
            if(inputsHijos=='.area-div-nuevo' ||inputsHijos=='.area-div-nuevo'){
                objTemporal.nombre_area= datoInput1;
                objTemporal.commentario_area= dataInput2;
            }
            array.push(objTemporal); // Agregar el objeto al array
        }
    }
    return array
}

function esLink(url) {
    const regex = /^(https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\/[a-zA-Z0-9-._~:?#&=]*$)?/;
    return regex.test(url);
}

function hideInMobile(type="User"){
    let mobile=""
    mobile = getMobileOperatingSystem()
    console.log("Tipo de dispositivo = ",mobile, type)
    if(mobile!=="iOS"){
        $("#buttonTake"+type).show();
    }else{
        $("#buttonTake"+type).hide();
    }
}

//FUNCION obtener la imagen del canvas
function getScreen(type, faceMode='user'){
    
    if(!flagVideoUser){
        flagVideoUser = true;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: faceMode }})
            .then(function(stream) {
                let video = document.createElement('video');
                video.style.width = '200px';
                video.style.height = '225px';
                document.getElementById('container'+type).appendChild(video);
                video.srcObject = stream;
                video.play();
                let canvas = document.getElementById('canvasPhoto'+type);
                let context = canvas.getContext('2d');
                //----Take Photo
                $("#buttonTake"+type).attr('disabled','disabled');
                $("#buttonTake"+type).hide();
                $("#buttonSave"+type).show();
                document.getElementById('buttonSave'+type).addEventListener('click', function() {
                    setTranslateImage(context, video, canvas, type)
                    if(type == 'User'){
                        $("#fotografiaActual img").hide();
                        $("#fotografiaActual p").css("visibility", "hidden");
                    }else if (type == 'Card'){
                        $("#identificacionActual img").hide();
                        $("#identificacionActual p").css("visibility", "hidden");
                    }
                });
                flagVideoUser=false
            })
            .catch(function(error) {
                console.error('Error al acceder a la cámara:', error);
                errorAlert("Error al acceder a la cámara")
            });
        } else {
            alert('Lo siento, tu dispositivo no soporta acceso a la cámara.');
        }
    }
}

function setTranslateImage(context, video, canvas, type){
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let photoUser = document.getElementById('img'+type);
    photoUser.src = canvas.toDataURL('image/png');
    photoUser.style.display = 'block';
    video.pause();
    video.srcObject.getTracks().forEach(function(track) {
        track.stop();
    });
    video.style.display = 'none';
    ///-- Save Input
    canvas.toBlob( (blob) => {
        const file = new File( [ blob ], "image"+type+".png" );
        const dT = new DataTransfer();
        dT.items.add( file );
        document.getElementById("inputFile"+type).files = dT.files;
    } );
    //-----Rquest Photo
    const flagBlankUser = isCanvasBlank(document.getElementById('canvasPhoto'+type));
    if(!flagBlankUser){
        setTimeout(() => {
            setRequestFileImg('input'+type, type);
        }, "1000");
    }
    //-----Clean ELement
    $("#buttonSave"+type).hide();
}
//FUNCION validar que el canvas este limpio
function isCanvasBlank(canvas) {
    const context = canvas.getContext('2d');
    const pixelBuffer = new Uint32Array(
        context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );
    return !pixelBuffer.some(color => color !== 0);
}

function validarFechasConHora(fechaV, fechaH) {
      fecha1 = new Date(fechaV.replace(' ', 'T')+':00');
      fecha2 = fechaH ? new Date(fechaH.replace(' ', 'T')+':00') : null;
      if (isNaN(fecha1.getTime())) {
        return { valido: false, mensaje: "La fecha de visita no es una fecha válida." };
      }

      // Verificar si la fecha de visita no es anterior a ahora (fecha y hora)
      const ahora = new Date();
      if (fecha1 < ahora) {
        return { valido: false, mensaje: "La fecha de visita no puede ser anterior a la fecha y hora actual." };
      }

      // Si hay una fecha de "hasta", verificar que sea válida y posterior a la fecha de visita
      if (fecha2) {
        if (isNaN(fecha2.getTime())) {
          return { valido: false, mensaje: "La fecha hasta no es una fecha válida." };
        }
        if (fecha2 < fecha1) {
          return { valido: false, mensaje: "La fecha hasta debe ser posterior a la fecha de visita." };
        }
      }

      // Si todas las validaciones pasan, las fechas y horas son válidas
      return { valido: true };
}

// Ejemplo de uso
const objeto = {
  fecha1: '2024-11-30T01:13:00', // Fecha y hora de visita
  fecha2: '2024-12-05T01:13:00'    // Fecha y hora de hasta (opcional)
};


function limpiarInputsPorClase(clase) {
        // Selecciona todos los elementos con la clase especificada
    $('.' + clase).each(function() {
        if ($(this).is('input[type="text"],input[type="tel"], input[type="password"], input[type="email"], input[type="number"], input[type="checkbox"], input[type="radio"],input[type="date"]')) {
            $(this).val(''); // Limpia el valor de los inputs de texto, número, etc.
            $(this).prop('checked', false); // Limpia los checkboxes y radios
        } else if ($(this).is('select')) {
            $(this).prop('selectedIndex', 0); // Restablece el valor del select a la opción por defecto
        } else if ($(this).is('textarea')) {
            $(this).val(''); // Limpia el contenido del textarea
        }
    });
    $('.'+clase).prop('disabled', false);
    $("#fechaVisitaOA").val('')

}

function formatearTelefono(id) {
    const input = document.getElementById(id);
    let tel = input.value.replace(/(\d{4})(\d{4})(\d{2})/, '$1 $2 $3');
    input.value = tel
}

function desformatearTelefono(telefonoFormateado) {
    return telefonoFormateado.replace(/\s+/g, '');  // Elimina todos los espacios
}


function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      // Windows Phone debe ir primero porque su UA tambien contiene "Android"
     if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
     }
     if (/android/i.test(userAgent)) {
        return "Android";
    }
         if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "desconocido";
}