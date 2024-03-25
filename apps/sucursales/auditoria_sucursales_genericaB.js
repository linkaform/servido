// Reporte Auditoria de Sucursrales
// Librerias: Chart.js, Dynatable y D3 charts

let us = null;
let usTy = null;
let jw = null;
let userId = null;
let userJwt = null;
let userName = null;
let userParentId = null;
var scriptId = null;

$('#divOptions').hide();
$('#title_report').hide();
//$('.div_card').hide();
//$('.title_tables').hide();
$('.button-chart').hide();


hideElement("download_firstElement")
hideElement("download_secondElement")
hideElement("download_thirdElement")
hideElement("download_fourthElement")
hideElement("download_graphicFiveth")

hideElement("title_demo")
hideElement("firstParameters");
hideElement("firstElement");
hideElement("sixthElement");
hideElement("secondElement");
hideElement("thirdElement");
hideElement("fourthElement");
hideElement("fivethElement");
hideElement("seventhElement");
hideElement("eigthElement");

hideElement("div_alert1");
hideElement("div_alert2");
hideElement("div_alert3");

window.onload = function(){
	var qs = urlParamstoJson();
	var formNode = document.getElementById("appCont");
	for(var key in qs){
		console.log("script id", key)
		scriptId = parseInt(qs[key])
		if(key === "env"){
			if(qs[key] === "test"){
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
    console.log(us)
    console.log("++++++")
    console.log(jw)

    if(us != "" && jw != "" || scriptId===null){
    hideElement("inicio_ses");
    unhideElement("close_sesion");
    getCompanyLogo(userParentId);
    userId = us;
    userJwt = jw;
    userName = getCookie("userName");
    //document.getElementById("firstParameters").style.removeProperty('display');
    unHideReportElements()
    if (scriptId == null) {
      $("#tienda").multipleSelect('refresh');
      $("#bodega").multipleSelect('refresh');
      loadDemoData();
    }else{
      //--Catalog
      $('.div_card').hide();
      $('.title_tables').hide();
    }
    //--Styles
    setSpinner();
    $('#divOptions').show();
    $('#title_report').show();
    //$("#cliente").multipleSelect('refresh');
    /*$("#canton").multipleSelect('refresh');
    $("#parroquia").multipleSelect('refresh');*/
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
  unhideElement("secondElement");
  unhideElement("thirdElement");
  unhideElement("fivethElement");
  unhideElement("seventhElement");
  unhideElement("fourthElement");
  unhideElement("sixthElement");
}

function loadDemoData(){
  unhideElement("title_demo")
  unhideElement("div_alert1");
  unhideElement("div_alert2");
  unhideElement("div_alert3");

  document.getElementById("firstParameters").style.removeProperty('display');

  document.getElementById("textAlert1").innerText = 10;
  document.getElementById("textAlert2").innerText = 10;
  drawFirstElement(dataFirstElement);
  drawSecondElement(dataSecondElement);
  drawThirdElement(dataThirdElement);
  drawFourthElement(dataFourthElement);
  drawFivethElement(dataFivethElement);
  unhideElement("seventhElement")
  unhideElement("eigthElement");
  unhideElement("fivethElement")
  getDrawGauge('gaugeFirst', dataGauge1)
  document.getElementById("firstGauge").style.removeProperty('display');
  $("#tienda").multipleSelect('refresh');

}
