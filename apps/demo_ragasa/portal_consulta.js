//-----Columnas
const columsTable = [
  { title:"Folio", field:'folio', hozAlign:"left", formatter:"link", formatterParams:{
  url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
  target:"_blank",},headerFilter:"input", width:150},
  { title:"Contratista", field:'company', hozAlign:"left", headerTooltip:true,headerFilter:true,width:250},
  { title:"Nombre", field:'nombre', hozAlign:"left", headerTooltip:true,headerFilter:true,width:200},
  { title:"Equipo", field:'name_item', hozAlign:"left", headerTooltip:true,headerFilter:true,width:200},
  { title:"Serie", field:'desc_item', hozAlign:"left", headerTooltip:true,headerFilter:true,width:200},
  { title:"Curp", field:'curp', hozAlign:"left", headerTooltip:true,headerFilter:true,width:150},
  { title:"Hora Ingreso", field:'date_start', hozAlign:"left", headerTooltip:true,headerFilter:true,width:200},
];

let listItems = [];
//----Search
window.onload = function(){
  getListLocations();  
}

//---Get location
function getListLocations(){
    let url = 'https://app.linkaform.com/api/infosync/scripts/run/';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            script_id: 107705,
            option: 'get_locations',
        }),
        headers:{
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.success) {
            dataLocations = res.response.json;
            if(dataLocations.length > 0){
                for (let i = 0; i  < dataLocations.length; i++) {
                    let name = dataLocations[0].name;
                    let select = document.getElementById("codeLocation");
                    let option = document.createElement("option");
                    option.text = name;
                    option.value = name;
                    select.appendChild(option);
                }
            }
        }
    });
}

//-----Function Search
function getDataSearch(e) {
  let valueFilter = e.target.value;
  $('#divLoad').show();
  $('#divTable').hide();
  if(valueFilter != undefined){
    let url = 'https://app.linkaform.com/api/infosync/scripts/run/';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            script_id: 114367,
            option :'query',
            location: valueFilter,
        }),
        headers:{
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.success) {
          let response = res.response.json;
          getDrawTable('firstElement',columsTable, response);
          $('#divTable').show();
          $('#divLoad').hide();
        }
    });
  } 
}


//-----Function Table
function getDrawTable(id, columnsData, tableData){
  var  table = new Tabulator("#" + id, {
    height:'500px',
    layout:"fitDataTable",
    data:tableData,
    columns:columnsData,
    resizableRows:false,
    textDirection:"ltr",
    dataTree:true,
    dataTreeStartExpanded:false,
    pagination:true, 
    paginationSize:10, 
  });
}

/*
///-----Function Modal
function setAddItem(){
    let idTime =  new Date().valueOf();
    let textName = $("#textNameItem").val();
    let textDesc = $("#textDescItem").val();

    if(textName!="" && textDesc!=""){
        //----INFORMATION
        string_data = String(textName)+'|'+String(textDesc);
        listItems.push(string_data);
        $('#listItems').append('<li class="list-group-item" id="li_'+idTime+'">'+textName+'</li>');

        //---Send Data
        if(listItems.length > 0){
          $("#buttonSendItems").show();
        }else{
          $("#buttonSendItems").hide();
        }
        //---CLEAN AN ALERT
        $("#textNameItem").val('');
        $("#textDescItem").val('');
        $("#alertAdd").show();
        setTimeout(() => {
            $("#alertAdd").hide();
        }, "2000");
    }else{
        $("#alertEmpty").show();
        setTimeout(() => {
            $("#alertEmpty").hide();
        }, "2000");
    }
}

//----Function Add Data
function setAddRquest(data) {
  if(data.length > 0){
    $("#listItems").empty();
    for (var i = 0; i < data.length; i++) {
      let idTime =  new Date().valueOf();
      let name = data[i].name;
      let desc = data[i].desc_item;
      $('#listItems').append('<li class="list-group-item" id="li_'+idTime+'">'+name+'</li>');
      string_data = String(name)+'|'+String(desc);
      listItems.push(string_data);
    }
  }
}

//----Function Redirection
function redirectionUrl(){
    let protocol = window.location.protocol;
    let host = window.location.host;
    let urlNew =  `${protocol}//${host}/demo_ragasa/index.html`;
    Object.assign(document.createElement('a'), {
        target: '_blank',
        rel: 'noopener noreferrer',
        href: urlNew,
    }).click();
}

//-----Send Items
function setInputUser(curp){
  let inputElement = document.getElementById("inputCurpUser");
  inputElement.value = curp;

  //---Request Items
  let url = 'https://app.linkaform.com/api/infosync/scripts/run/';
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      script_id: 114367,
      option :'get_items',
      curp_record: curp,
    }),
    headers:{
      'Content-Type': 'application/json',
    },
  })
  .then((res) => res.json())
  .then((res) => {
    if (res.success) {
      let data = res.response.json;
      setAddRquest(data);
    }
  });
}

function setItemsData(){
  curpRecord = $("#inputCurpUser").val();
  $("#divList").hide();
  $("#divLoadModal").show();
  $("#buttonSendItems").hide();
  if(listItems.length > 0 && curpRecord != ''){
    let url = 'https://app.linkaform.com/api/infosync/scripts/run/';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        script_id: 114367,
        option :'add_data',
        curp_record: curpRecord,
        list_data: listItems,
    }),
    headers:{
      'Content-Type': 'application/json',
    },
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        let response = res.response.msg;
        if(response === 'Success'){
          //----Clean List
          $("#listItems").empty();
          $("#divLoadModal").hide();
          $("#divSuccess").show();
          setTimeout(() => {
              //---CLean Body
              $("#divSuccess").hide();
              $("#divList").show();
              //---Close Modal
              var buttonClose = document.getElementById("btnCloseModal");
              buttonClose.click();

          }, "5000");
        }
      }
    });
  }
}
*/