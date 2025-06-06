let us = null;
let usTy = null;
let jw = null;
let userId = null;
let userJwt = null;
let userName = null;
let userParentId = null;
let scriptId = null;
console.log('cargando js')

$('#divOptions').hide();
$('#title_report').hide();
$('.title_tables').hide();
hideElement("title_demo");
hideElement("firstParameters");
hideElement("firstElement");
hideElement("secondElement");
hideElement("thirdElement");

let balanceo = false;

window.onload = function(){


  // document.getElementById("customSwitch1").addEventListener("change", function() {
  //   const label = document.getElementById("on_off");
  //   const switchButton = document.getElementById("customSwitch1");
  
  //   if (switchButton.checked) {
  //     label.textContent = "Activado";
  //     balanceo = true;
  //   } else {
  //     label.textContent = "Desactivado";
  //     balanceo = false;
  //   }
  // });
  

  var qs = urlParamstoJson();
  var formNode = document.getElementById("appCont");
	for(var key in qs){
    if (key === 'script_id' ){
      scriptId = parseInt(qs[key]);
    }
    if (key === 'env') {
      if (qs[key] === 'test'){
        url = "https://preprod.linkaform.com/api/";
      }
    }
    if (key === 'env') {
      if (qs[key] === 'local'){
        url = "http://192.168.0.25:8000/api/";
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
      $('#spinner_product_family').addClass('d-none');
      $('#spinner_wharehouse').addClass('d-none');
      loadDemoData();
    }else{
      $('#product_line').prop('disabled', true);
      $('#product_family').prop('disabled', true);
      $('#wharehouse_destination').prop('disabled', true);
      getCatalog();
    }
    //--Styles
    setSpinner();
    $('#divOptions').show();
    $('#title_report').show();
    $('.js-example-basic-multiple').select2();
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

  $("#product_family").on("change", function() {
    $('#product_line').prop('disabled', true);
    $('#spinner_product_line').removeClass('d-none');
    let selectedCategory = $(this).val();
    get_product_category(selectedCategory);
  });

}

function unHideReportElements(){
  //Set here all report elements that need to be unHiden on a loggin
  unhideElement("firstElement-Buttons");
  unhideElement("firstParameters");
  unhideElement("close_sesion");
  unhideElement("firstElement");
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';


//-----DEMO 
function loadDemoData(){
  $('.title_tables').show();
  $('#close_sesion').hide();
  $('#image_log').hide();
  unhideElement("title_demo")
  document.getElementById("firstParameters").style.removeProperty('display');
  
  getDrawTable('firstElement', columsTable1, dataTable1, 750);
  document.getElementById("firstElement").style.removeProperty('display');
}

//-----EXCUTION
function runFirstElement(){
  let familia = document.getElementById("product_family");
  let wharehouse = $("#wharehouse_destination").val();
  let linea = document.getElementById("product_line");
  // console.log("Familia", familia.value);
  // console.log("Almacen destino", wharehouse);
  // console.log("Linea", linea.value);
  // console.log("Balanceo sugerido", balanceo);

  if(!familia.value){
    Swal.fire({
      title: 'Atención',
      text: 'Debes seleccionar una Familia primero...',
      type: 'info'
    });
    return
  }
  // getFirstElement(familia.value, wharehouse);
  getFirstElement(wharehouse, familia.value, linea.value);
};

function getFirstElement(wharehouses, familia, line) {

  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();

  /*
    {"stockInfo": [{"sku": "750200301040",
     "desc_producto": "MTRS TUBO C/C SS304L C10 1/2\"",
      "line": "304",
      "familia": "TUBOS",
      "stock_mty": 0,
      "stock_gdl": 0,
      "stock_max": 0,
      "stock_merida": 0,
      "actuals": 42,
      "percentage_stock_max": 0,
      "stock_final": -416,
      "stock_to_move_alm_monterrey": 326,
      "stock_to_move_alm_guadalajara": 132,
      "actuals_alm_monterrey": 109,
      "actuals_cedis_guadalajara": 0,
      "actuals_alm_merida": 61,
      "actuals_alm_guadalajara": 42, 
      "stock_max_alm_guadalajara": 174.84,
      "p_stock_max_alm_guadalajara": 24.02,
      "stock_max_alm_merida": 27.26,
      "p_stock_max_alm_merida": 223.77,
      "stock_max_alm_monterrey": 435.22,
      "p_stock_max_alm_monterrey": 25.04}]}
  */

    /*
    {
    title:'Traspaso',
    columns:[
      { title:"Mty", field:'stock_mty', hozAlign:"left", formatter:"money", formatterParams:{thousand:","},width:150},
      { title:"% de stock minimo", field:'p_stock_min_mty', hozAlign:"left", formatter:"money", formatterParams:{thousand:","}, width:150},
      { title:"Gdl", field:'stock_gdl',hozAlign:"left",formatter:"money", formatterParams:{thousand:","},width:150},
      { title:"% de stock minimo", field:'p_stock_min_gdl', hozAlign:"left", formatter:"money", formatterParams:{thousand:","}, width:150},
      { title:"Merida", field:'stock_merida',hozAlign:"left",formatter:"money", formatterParams:{thousand:","},width:150},
      { title:"% de stock minimo", field:'p_stock_min_merida', hozAlign:"left", formatter:"money", formatterParams:{thousand:","}, width:150},
    ]
  },
    */


  columsTable1 = [
    { title: "Sku", field: 'sku', hozAlign: "left", width: 150,  headerFilter:"input", responsive:0 },
    { title: 'Descripción del Producto', field: 'desc_producto', hozAlign: "left", width: 150,  headerFilter:"input" },
    { title: 'Línea', field: 'line', hozAlign: "right", width: 150,  headerFilter:"input" },
    // { title: "Familia", field: 'familia', hozAlign: "left", width: 150 },
    { title: 'Stock CEDIS',
      cssClass: "stock-cedis",
      columns: [
        { title: "Inicial", field: 'actuals', hozAlign: "right", width: 100, formatter: "money", formatterParams: { thousand: "," } },
        { title: "Final", field: 'stock_final', hozAlign: "right", formatter: "money", formatterParams: { thousand: "," }, width: 100 },
      ]
    }
  ];
  
  if (wharehouses && wharehouses.length > 0) {
    let dynamicColumns = [];
    let traspasoColumn = {};
    let traspasoColumn2 = {
      title: 'Traspaso2',
      columns: []
    };
    let balanceoColumn = {
      title: 'Balanceo sugerido',
      columns: []
    };
    
    wharehouses.forEach(wharehouse => {
      let classHeader = "";
      let classHeaderColumns = "";
      if (wharehouse === "ALM MONTERREY") {
        classHeader = "alm-monterrey-header";
      } else if (wharehouse === "ALM GUADALAJARA") {
        classHeader = "alm-guadalajara-header";
      } else if (wharehouse === "ALM MERIDA") {
        classHeader = "alm-merida-header";
      }

      if (wharehouse === "ALM MONTERREY") {
        classHeaderColumns = "alm-monterrey-header-columns";
      } else if (wharehouse === "ALM GUADALAJARA") {
        classHeaderColumns = "alm-guadalajara-header-columns";
      } else if (wharehouse === "ALM MERIDA") {
        classHeaderColumns = "alm-merida-header-columns";
      }

      field_wharehouse = wharehouse.toLowerCase().replace(" ", "_")
      traspasoColumn = {
        title: wharehouse,
        cssClass: classHeader,
        columns: [
          {
            title: `% Inical`,
            field: `p_stock_max_${field_wharehouse}`,
            cssClass: classHeaderColumns,
            hozAlign: "right",
            // formatter: "money", formatterParams: { thousand: ",", symbol: "%", symbolAfter: true },
            width: 150,
            hozAlign: "left",
            formatter:"progress", formatterParams:{
                  min:-1,
                  max:100,
                  color:[
                    "rgb(211, 47, 47)",//, "rgb(239, 83, 80)","rgb(244, 143, 177)", ///reds
                    "rgb(255, 235, 59)",// "rgb(255, 241, 118)","rgb(230, 238, 156)", ///yellows
                    "rgb(76, 175, 80)", //"rgb(56, 142, 60)","rgb(56, 142, 60)", ///greens
                    ],
                  legendColor:"#24201E",
                  legendAlign:"center",
                  legend:function(value){return value + "%"}
            }
          },
          {
            title: 'Stock',
            field: `actuals_${field_wharehouse}`,
            cssClass: classHeaderColumns,
            formatter: "money", formatterParams: { thousand: ",", precision: 2, symbolAfter: true },
            hozAlign: "right",
            width: 100
          },
          //stock_to_move_alm_monterrey
          {
            title: 'Traspaso', //`Traspaso ${wharehouse}`,
            field: `stock_to_move_${field_wharehouse}`,
            cssClass: classHeaderColumns,
            hozAlign: "right",
            width: 130
          },
          {
            title: `%  Final`,
            field: `final_stock_percentage_${field_wharehouse}`,
            cssClass: classHeaderColumns,
            hozAlign: "right",
            // formatter: "money", formatterParams: { thousand: ",", symbol: "%", symbolAfter: true },
            width: 150,
            hozAlign: "left",
            formatter:"progress", formatterParams:{
                  min:-1,
                  max:100,
                  color:[
                    "rgb(211, 47, 47)",//, "rgb(239, 83, 80)","rgb(244, 143, 177)", ///reds
                    "rgb(255, 235, 59)",// "rgb(255, 241, 118)","rgb(230, 238, 156)", ///yellows
                    "rgb(76, 175, 80)", //"rgb(56, 142, 60)","rgb(56, 142, 60)", ///greens
                    // "", "","", ///reds
                    ],
                  legendColor:"#24201E",
                  legendAlign:"center",
                  legend:function(value){return value + "%"}
              }
          }
        ],
      }

      if (balanceo) {
        balanceoColumn.columns.push({
          title: `${wharehouse}`,
          field: `balanceo_sugerido_${field_wharehouse}`,
          hozAlign: "left",
          width: 150
        });
      }
      dynamicColumns.push(traspasoColumn);
    });
    
    columsTable1.splice(5, 0, ...dynamicColumns);
    
    if (balanceo && balanceoColumn.columns.length > 0) {
      columsTable1.push(balanceoColumn);
    }
  }
  
  getDrawTable('firstElement', columsTable1, dataTable1, 750);

  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      //warehouse: wharehouses,
      product_family: familia,
      product_line: String(line),
      option: 'get_report',
      runtime: 'before'
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
      
      if (res.response.stockInfo) {
        getDrawTable('firstElement', columsTable1, res.response.stockInfo, 750);
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
}

//-----CATALOG
function set_select(data, elementId) {
  const selectElement = document.getElementById(elementId);
  if (elementId == "wharehouse_destination"){
    while (selectElement.options.length > 0) {
      selectElement.remove(0);
    }  
  }else{
    while (selectElement.options.length > 1) {
      selectElement.remove(1);
    }
  }
  data.forEach(function(value) {
    let option = document.createElement("option");
    option.text = value;
    option.value = value;
    selectElement.appendChild(option);
  });
}

function getCatalog(){
  const selectedWarehouses = ['ALM MONTERREY', 'ALM GUADALAJARA', 'ALM MERIDA'];
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
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
      if (res.response.dataCatalogWarehouse) {
        set_select(res.response.dataCatalogWarehouse, "wharehouse_destination")
        set_select(res.response.dataCatalogProductFamily, "product_family")
        $('#spinner_product_family').addClass('d-none');
        $('#spinner_wharehouse').addClass('d-none');
        $('#product_line').prop('disabled', true);
        $('#product_family').prop('disabled', false);
        $('#wharehouse_destination').prop('disabled', false);
        // set_select(res.response.dataCatalogProductLine, "product_line")
        $('#wharehouse_destination').val(selectedWarehouses).trigger('change');
      }
    } 
  }) 
}

//-----TABLES
function getDrawTable(id, columnsData, tableData, height = 750){
  var  table = new Tabulator("#" + id, {
    height:height +"px",
    data:tableData,
    resizableRows:true,
    dataTree:true,
    dataTreeStartExpanded:false,
    clipboard:true,
    clipboardPasteAction:"replace",
    textDirection:"ltr",
    columns:columnsData,
  });

  if (document.getElementById("download_xlsx_"+id)){
    //trigger download of data.xlsx file
    document.getElementById("download_xlsx_"+id).replaceWith(document.getElementById("download_xlsx_"+id).cloneNode(true));
    document.getElementById("download_xlsx_"+id).addEventListener("click", function (){
    table.download("xlsx", "data.xlsx", {sheetName:"data"});
    });
  }

  if (document.getElementById("download_csv_"+id)){
    //trigger download of data.csv file
    document.getElementById("download_csv_"+id).replaceWith(document.getElementById("download_csv_"+id).cloneNode(true));
    document.getElementById("download_csv_"+id).addEventListener("click", function (){
      table.download("csv", "data.csv");
    });
  }
}

function get_product_category(type)
{
  fetch(url + 'infosync/scripts/run/',{
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      option:"get_product_line",
      product_code: type
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if(res.success){
      if(res.response){
        let dataLotNumber = res.response['product_line'];
        updateProductLineSelect(dataLotNumber);
      }
    }
  })
}

// Función para vaciar y rellenar el select
function updateProductLineSelect(data) {
  const selectElement = document.getElementById('product_line');
  
  selectElement.innerHTML = '<option value="">--Seleccione--</option>';
  
  data.forEach(item => {
    let option = document.createElement('option');
    option.value = item;
    option.text = item;
    selectElement.appendChild(option);
  });

  $('#product_line').prop('disabled', false);
  $('#spinner_product_line').addClass('d-none');
}
