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
    $("#pais").multipleSelect('refresh');
    $("#localidad").multipleSelect('refresh');
    $("#tienda").multipleSelect('refresh');

    $('#divOptions').show();
    $('#title_report').show();
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
  /*
    getDrawGraphicFirst(data1, setOptions1)
    document.getElementById("firstElement").style.removeProperty('display');

    getDrawGraphicSecond(data2, setOptions2)
    document.getElementById("secondElement").style.removeProperty('display');

    getDrawGraphicThird(data3, setOptions3)
    document.getElementById("thirdElement").style.removeProperty('display');

    getDrawGraphicFourth(data4, setOptions4)
    document.getElementById("fourthElement").style.removeProperty('display');
  */
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");  
  getFirstElement(date_to.value, date_from.value);
};

function getFirstElement(dateTo, dateFrom){
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
      if (res.response.json.firstElement.data) {
        console.log('drawFirstElement.........');
        getDrawTable('firstElement', columsTable1, res.response.json.firstElement.data);
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
function getDrawGraphic(data, setOptions, canvas){
  let chart;
  //---CHART
  var ctx = document.getElementById(canvas).getContext('2d');
  if (chart) {
    chart.destroy();
  }
  chart = new Chart(ctx, {
    type: 'bar',
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}

//----Funcion Dinamic
function setGraphic(data) {
  if (Object.entries(data).length != 0){
    //---Clean Body
    document.getElementById("divContent").innerHTML = "";   

    for (let key in data){
      form = data[key]
      for (let obj in form){
        graphic = form[obj]
        console.log(graphic);
        //-----APPEND
        $("#divContent").append(
          "<div class='col-sm-12 col-md-12 col-lg-6 mt-5' style='overflow-y: scroll;'>"+
            "<div  style='width: 800px;height: 450px;margin: auto;'>"+
              "<canvas id='"+key+"_"+obj+"'></canvas>"+
            "</div>"+
          "</div>"
        );
        //----ADD NAME
        console.log('setOptions1',setOptions1)

        //----ADD GRAPHIC
        if (obj == 'historico'){
          getDrawGraphic(graphic, setOptions1, key+"_"+obj);
        }else if(obj == 'tendencia'){
          getDrawGraphic(graphic, setOptions2, key+"_"+obj);
        }

      }
    }
  }
}


                    
                        
                            
                       
                    
