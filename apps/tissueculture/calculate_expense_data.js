// Datos demo para Reporte ENcuestas MOntaje

//--Table Montajes Por Mes
var columsTable1 = [
  { title:"Expense date", field:'expense_date',hozAlign:"left",headerFilter:"input", width:200},
  { title:"Merchant",field:'merchant',hozAlign:"left", width:230 },
  { title:"Amount", field:'amount',hozAlign:"right", width:200, formatter:"money", formatterParams:{
    decimal:".",
    thousand:",",
    symbol:"$",
    symbolAfter:false,
    negativeSign:true,
    precision:false,
  } },
  { title:"Currency",field:'currency',hozAlign:"left",headerFilter:"currencyput", width:200 },
  { title:"Account",  field:'account',hozAlign:"right",width:200 },
  { title:"Department",  field:'department',hozAlign:"left",width:200 },
  {
  title: "Receipt Links", // Columna para los enlaces
  field: "receipt",
  formatter: function (cell, formatterParams, onRendered) {
    var images = cell.getValue(); // Obtén la lista de URLs de imágenes

    if (Array.isArray(images)) {
      var linkContainer = document.createElement("div");
      linkContainer.style.display = "flex";
      linkContainer.style.alignItems = "center";
      linkContainer.style.justifyContent = "center";

      images.forEach(function (imageUrl) {
        var link = document.createElement("a");
        link.href = imageUrl;
        link.target = "_blank";
        link.textContent = "Enlace a Ticket";
        link.style.marginRight = "10px";

        linkContainer.appendChild(link);
      });

      return linkContainer;
      }
    },
  },
{
  title: "Receipt Images", // Columna para las imágenes
  field: "receipt", // Asegúrate de utilizar el mismo campo que la columna anterior
  formatter: "image", // Usar el formatter "image" para mostrar imágenes
  formatterParams: {
    height: "85px", // Altura deseada
    width: "80px",  // Ancho automático para mantener la proporción original
  },
  width:100,
  formatter: function (cell, formatterParams, onRendered) {
    var img = document.createElement("img");
    img.src = cell.getValue();

    // Estilos CSS para centrar horizontalmente la imagen
    img.style.height = "90px";
    img.style.width = "auto";
    img.style.display = "block";
    img.style.margin = "0 auto";

    return img;
  },
},
];

var dataTable1c = [
  {
    "expense_date":'2023-08-15',
    "merchant":'18220021',
    "amount":'Green House 3',
    "currency":'Green House 4',
    "account":'700',
    "department":500,
    "receipt":400,
  },
  {
    "expense_date":'2023-08-15',
    "merchant":'18220021',
    "amount":'Green House 3',
    "currency":'Green House 4',
    "account":'700',
    "department":500,
    "receipt":400,
  },
  {
    "expense_date":'2023-08-15',
    "merchant":'18220021',
    "amount":'Green House 3',
    "currency":'Green House 4',
    "account":'700',
    "department":500,
    "receipt":400,
  },
  {
    "expense_date":'2023-08-15',
    "merchant":'18220021',
    "amount":'Green House 3',
    "currency":'Green House 4',
    "account":'700',
    "department":500,
    "receipt":400,
  },
  {
    "expense_date":'2023-08-15',
    "merchant":'18220021',
    "amount":'Green House 3',
    "currency":'Green House 4',
    "account":'700',
    "department":500,
    "receipt":400,
  },
  {
    "expense_date":'2023-08-15',
    "merchant":'18220021',
    "amount":'Green House 3',
    "currency":'Green House 4',
    "account":'700',
    "department":500,
    "receipt":400,
  },
  {
    "expense_date":'2023-08-15',
    "merchant":'18220021',
    "amount":'Green House 3',
    "currency":'Green House 4',
    "account":'700',
    "department":500,
    "receipt":400,
  },
  {
    "expense_date":'2023-08-15',
    "merchant":'18220021',
    "amount":'Green House 3',
    "currency":'Green House 4',
    "account":'700',
    "department":500,
    "receipt":400,
  },
];

var dataTable1 = [
    {
        "merchant": "Costco ",
        "account": 512009,
        "receipt": "Pendiente",
        "currency": "usd",
        "amount": 567.91,
        "expense_date": "2023-10-04",
        "department": [
            "https://f001.backblazeb2.com/file/app-linkaform/public-client-9908/82753/8C8CE7905E0A4B0CAA740FDE2BE6DF03/User_Image_1696465021.jpeg",
            "https://f001.backblazeb2.com/file/app-linkaform/public-client-9908/82753/7AE700980B884A048B4CF100205D08FF/User_Image_1696697112.jpeg",
            "https://f001.backblazeb2.com/file/app-linkaform/public-client-9908/82753/22E5A0EFD8D74CE8BE902B7443AC18F7/User_Image_1696976863.jpeg",
            "https://f001.backblazeb2.com/file/app-linkaform/public-client-9908/82753/F6294C20DE55401BB64E67B78695E135/User_Image_1697135887.jpeg"
        ],
        "receipt":"",
    },
    {
        "merchant": "Target",
        "account": 711007,
        "receipt": "Pendiente",
        "currency": "usd",
        "amount": 15.14,
        "expense_date": "2023-10-07",
        "department": [
            "https://f001.backblazeb2.com/file/app-linkaform/public-client-9908/82753/8C8CE7905E0A4B0CAA740FDE2BE6DF03/User_Image_1696465021.jpeg",
            "https://f001.backblazeb2.com/file/app-linkaform/public-client-9908/82753/7AE700980B884A048B4CF100205D08FF/User_Image_1696697112.jpeg",
            "https://f001.backblazeb2.com/file/app-linkaform/public-client-9908/82753/22E5A0EFD8D74CE8BE902B7443AC18F7/User_Image_1696976863.jpeg",
            "https://f001.backblazeb2.com/file/app-linkaform/public-client-9908/82753/F6294C20DE55401BB64E67B78695E135/User_Image_1697135887.jpeg"
        ],
        "receipt":"sdf",
    },
    {
        "merchant": "Stagecoach Foodmart ",
        "account": 512004,
        "receipt": "Pendiente",
        "currency": "usd",
        "amount": 70.68,
        "expense_date": "2023-10-10",
        "department": [
            "https://f001.backblazeb2.com/file/app-linkaform/public-client-9908/82753/8C8CE7905E0A4B0CAA740FDE2BE6DF03/User_Image_1696465021.jpeg",
            "https://f001.backblazeb2.com/file/app-linkaform/public-client-9908/82753/7AE700980B884A048B4CF100205D08FF/User_Image_1696697112.jpeg",
            "https://f001.backblazeb2.com/file/app-linkaform/public-client-9908/82753/22E5A0EFD8D74CE8BE902B7443AC18F7/User_Image_1696976863.jpeg",
            "https://f001.backblazeb2.com/file/app-linkaform/public-client-9908/82753/F6294C20DE55401BB64E67B78695E135/User_Image_1697135887.jpeg"
        ],
        "receipt":"",
    },
    {
        "merchant": "Tressies ",
        "account": 711008,
        "receipt": "Pendiente",
        "currency": "usd",
        "amount": 58,
        "expense_date": "2023-10-12",
        "department": [
            "https://f001.backblazeb2.com/file/app-linkaform/public-client-9908/82753/8C8CE7905E0A4B0CAA740FDE2BE6DF03/User_Image_1696465021.jpeg",
            "https://f001.backblazeb2.com/file/app-linkaform/public-client-9908/82753/7AE700980B884A048B4CF100205D08FF/User_Image_1696697112.jpeg",
            "https://f001.backblazeb2.com/file/app-linkaform/public-client-9908/82753/22E5A0EFD8D74CE8BE902B7443AC18F7/User_Image_1696976863.jpeg",
            "https://f001.backblazeb2.com/file/app-linkaform/public-client-9908/82753/F6294C20DE55401BB64E67B78695E135/User_Image_1697135887.jpeg"
        ],
        "receipt":"",
    }
]


//--Table Total
var columsTable2 = [
  { title:"Plant Code", field:'plant_code',hozAlign:"left",headerFilter:"input", width:150},
  { title:"Ready Week",field:'ready_week',hozAlign:"left",headerFilter:"input", width:200 },
  { title:"Warehouse Out", field:'out',hozAlign:"left",width:200 },
  { title:"Warehouse In",field:'in',hozAlign:"left",width:200 },
  { title:"Qty Total",  field:'qtyTotal',hozAlign:"right",width:200 },
];

var dataTable2 = [
  {
    "plant_code":'LNAFP',
    "ready_week":'18220021',
    "out":'Green House 3',
    "in":'Green House 4',
    "qtyTotal":500,
  },
  {
    "plant_code":'LNAFP',
    "ready_week":'18220023',
    "out":'Green House 3',
    "in":'Green House 4',
    "qtyTotal":500,
  },
  {
    "plant_code":'LNAFP',
    "ready_week":'18220024',
    "out":'Green House 3',
    "in":'Green House 4',
    "qtyTotal":500,
  },
  {
    "plant_code":'LNAFP',
    "ready_week":'18220026',
    "out":'Green House 3',
    "in":'Green House 4',
    "qtyTotal":500,
  },
  {
    "plant_code":'LNBFP',
    "ready_week":'18220021',
    "out":'Green House 3',
    "in":'Green House 4',
    "qtyTotal":500,
  },
  {
    "plant_code":'LNAFA',
    "ready_week":'18220021',
    "out":'Green House 3',
    "in":'Green House 4',
    "qtyTotal":500,
  },
  {
    "plant_code":'LNATP',
    "ready_week":'18220021',
    "out":'Green House 3',
    "in":'Green House 4',
    "qtyTotal":500,
  },
  {
    "plant_code":'LNATP',
    "ready_week":'18220021',
    "out":'Green House 3',
    "in":'Green House 4',
    "qtyTotal":500,
  },
];
