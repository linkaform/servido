window.onload = function(){
  //loadDemoData();
  $("#divContentFirst").hide();
  $("#divContentSecond").hide();
}

function loadDemoData(){
  drawGraphicFirst(dataChart1, setOptions1);
  document.getElementById("graphicFirst").style.removeProperty('display');
  drawGraphicSecond(dataChart2, setOptions2);
  document.getElementById("graphicSecond").style.removeProperty('display');
}

//----Request
function getInformationRequest(){
  //---Get filters
  let month = $("#month").val();
  let urlLinkaform = 'https://app.linkaform.com/api/infosync/scripts/run/';
  if(month != '' && month != 0){
    fetch(urlLinkaform, {
      method: 'POST',
      body: JSON.stringify({
        script_id: 119618,
        option: 'get_grafic',
        month: month,
      }),
      headers:{
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        //----Data
        let data = res.response;
        if(data.response_grafica_franja){
          $("#divContentFirst").show();
          drawGraphicFirst(data.response_grafica_franja, setOptions1);
        }
        if(data.response_grafica_franja_april){
          $("#divContentSecond").show();
          drawGraphicSecond(data.response_grafica_franja_april, setOptions2);
        }
      }   
    })
  }else{
    alert('Seleccione el mes')
  }
}

//-----GRAPICH
let chart1;
function drawGraphicFirst(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicFirst').getContext('2d');
  if (chart1) {
    chart1.destroy();
  }
  //----Add Color
  let length = data['datasets'].length;
  let list_colors = getPAlleteColors(5,length);
  for (var i = 0; i < data['datasets'].length; i++) {
    data['datasets'][i]['backgroundcolor'] = list_colors[i];
    data['datasets'][i]['borderColor'] = list_colors[i];
  }

  chart1 = new Chart(ctx, {
    type: 'line',
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}

let chart2;
function drawGraphicSecond(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicSecond').getContext('2d');
  if (chart2) {
    chart2.destroy();
  }
  //----Add Color
  let length = data['datasets'].length;
  let list_colors = getPAlleteColors(5,length);
  for (var i = 0; i < data['datasets'].length; i++) {
    data['datasets'][i]['backgroundcolor'] = list_colors[i];
    data['datasets'][i]['borderColor'] = list_colors[i];
  }

  chart2 = new Chart(ctx, {
    type: 'line',
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}
