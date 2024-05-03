//-----Configuración de la tabla
const columsData1 = [
	{ title:"Folio", field:'folio', hozAlign:"left", formatter:"link", formatterParams:{
        url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
        target:"_blank",
    },headerFilter:"input", width:150},
	{ title:"Hora", field:'hour',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Proveedor", field:'provider',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Chofer", field:'chauffer',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Placas tracto", field:'serie_tracto',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Placas Remolque", field:'serie_remolque',hozAlign:"left",headerFilter:false,width:250},
	{ title:"Peso Guía", field:'weight',hozAlign:"left",headerFilter:false,width:250},
	{ title:"Producto", field:'product',hozAlign:"left",headerFilter:false,width:250},
]

var listJumps = [1,11,21,31,41,51];
var listTitle = [
	'Entradas',
	'Pendientes control de calidad',
	'Aceptados en control de calidad y pendientes de descarga',
	'Rechazados en control de calidad y pendientes de salida',
	'Camiones descargados',
	'Camiones rechazados',
];



var dataTable = [
	{
        folio: "Title",
    },
    {
        folio: "ABC123",
        hour: "2024-05-02T14:30:00",
        provider: "Proveedor1",
        chauffeur: "Chofer1",
        serie_tracto: "ABC123",
        serie_remolque: "XYZ456",
        weight: 5000,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "DEF456",
        hour: "2024-05-03T08:45:00",
        provider: "Proveedor2",
        chauffeur: "Chofer2",
        serie_tracto: "DEF456",
        serie_remolque: "UVW789",
        weight: 7000,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "GHI789",
        hour: "2024-05-04T11:15:00",
        provider: "Proveedor3",
        chauffeur: "Chofer3",
        serie_tracto: "GHI789",
        serie_remolque: "LMN012",
        weight: 6000,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "JKL012",
        hour: "2024-05-05T16:20:00",
        provider: "Proveedor4",
        chauffeur: "Chofer4",
        serie_tracto: "JKL012",
        serie_remolque: "OPQ345",
        weight: 5500,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "MNO345",
        hour: "2024-05-06T09:10:00",
        provider: "Proveedor5",
        chauffeur: "Chofer5",
        serie_tracto: "MNO345",
        serie_remolque: "RST678",
        weight: 7200,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "PQR678",
        hour: "2024-05-07T13:55:00",
        provider: "Proveedor6",
        chauffeur: "Chofer6",
        serie_tracto: "PQR678",
        serie_remolque: "UVW901",
        weight: 4800,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "STU901",
        hour: "2024-05-08T10:25:00",
        provider: "Proveedor7",
        chauffeur: "Chofer7",
        serie_tracto: "STU901",
        serie_remolque: "XYZ234",
        weight: 6500,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "VWX234",
        hour: "2024-05-09T15:40:00",
        provider: "Proveedor8",
        chauffeur: "Chofer8",
        serie_tracto: "VWX234",
        serie_remolque: "ABC567",
        weight: 5800,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "YZA567",
        hour: "2024-05-10T12:05:00",
        provider: "Proveedor9",
        chauffeur: "Chofer9",
        serie_tracto: "YZA567",
        serie_remolque: "DEF890",
        weight: 6900,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "Title",
    },
    {
        folio: "BCD890",
        hour: "2024-05-11T17:00:00",
        provider: "Proveedor10",
        chauffeur: "Chofer10",
        serie_tracto: "BCD890",
        serie_remolque: "GHI123",
        weight: 5100,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "ABC123",
        hour: "2024-05-02T14:30:00",
        provider: "Proveedor1",
        chauffeur: "Chofer1",
        serie_tracto: "ABC123",
        serie_remolque: "XYZ456",
        weight: 5000,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "DEF456",
        hour: "2024-05-03T08:45:00",
        provider: "Proveedor2",
        chauffeur: "Chofer2",
        serie_tracto: "DEF456",
        serie_remolque: "UVW789",
        weight: 7000,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "GHI789",
        hour: "2024-05-04T11:15:00",
        provider: "Proveedor3",
        chauffeur: "Chofer3",
        serie_tracto: "GHI789",
        serie_remolque: "LMN012",
        weight: 6000,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "JKL012",
        hour: "2024-05-05T16:20:00",
        provider: "Proveedor4",
        chauffeur: "Chofer4",
        serie_tracto: "JKL012",
        serie_remolque: "OPQ345",
        weight: 5500,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "MNO345",
        hour: "2024-05-06T09:10:00",
        provider: "Proveedor5",
        chauffeur: "Chofer5",
        serie_tracto: "MNO345",
        serie_remolque: "RST678",
        weight: 7200,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "PQR678",
        hour: "2024-05-07T13:55:00",
        provider: "Proveedor6",
        chauffeur: "Chofer6",
        serie_tracto: "PQR678",
        serie_remolque: "UVW901",
        weight: 4800,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "STU901",
        hour: "2024-05-08T10:25:00",
        provider: "Proveedor7",
        chauffeur: "Chofer7",
        serie_tracto: "STU901",
        serie_remolque: "XYZ234",
        weight: 6500,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "VWX234",
        hour: "2024-05-09T15:40:00",
        provider: "Proveedor8",
        chauffeur: "Chofer8",
        serie_tracto: "VWX234",
        serie_remolque: "ABC567",
        weight: 5800,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "Title",
    },
    {
        folio: "YZA567",
        hour: "2024-05-10T12:05:00",
        provider: "Proveedor9",
        chauffeur: "Chofer9",
        serie_tracto: "YZA567",
        serie_remolque: "DEF890",
        weight: 6900,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "BCD890",
        hour: "2024-05-11T17:00:00",
        provider: "Proveedor10",
        chauffeur: "Chofer10",
        serie_tracto: "BCD890",
        serie_remolque: "GHI123",
        weight: 5100,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "ABC123",
        hour: "2024-05-02T14:30:00",
        provider: "Proveedor1",
        chauffeur: "Chofer1",
        serie_tracto: "ABC123",
        serie_remolque: "XYZ456",
        weight: 5000,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "DEF456",
        hour: "2024-05-03T08:45:00",
        provider: "Proveedor2",
        chauffeur: "Chofer2",
        serie_tracto: "DEF456",
        serie_remolque: "UVW789",
        weight: 7000,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "GHI789",
        hour: "2024-05-04T11:15:00",
        provider: "Proveedor3",
        chauffeur: "Chofer3",
        serie_tracto: "GHI789",
        serie_remolque: "LMN012",
        weight: 6000,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "JKL012",
        hour: "2024-05-05T16:20:00",
        provider: "Proveedor4",
        chauffeur: "Chofer4",
        serie_tracto: "JKL012",
        serie_remolque: "OPQ345",
        weight: 5500,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "MNO345",
        hour: "2024-05-06T09:10:00",
        provider: "Proveedor5",
        chauffeur: "Chofer5",
        serie_tracto: "MNO345",
        serie_remolque: "RST678",
        weight: 7200,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "PQR678",
        hour: "2024-05-07T13:55:00",
        provider: "Proveedor6",
        chauffeur: "Chofer6",
        serie_tracto: "PQR678",
        serie_remolque: "UVW901",
        weight: 4800,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "STU901",
        hour: "2024-05-08T10:25:00",
        provider: "Proveedor7",
        chauffeur: "Chofer7",
        serie_tracto: "STU901",
        serie_remolque: "XYZ234",
        weight: 6500,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "Title",
    },
    {
        folio: "VWX234",
        hour: "2024-05-09T15:40:00",
        provider: "Proveedor8",
        chauffeur: "Chofer8",
        serie_tracto: "VWX234",
        serie_remolque: "ABC567",
        weight: 5800,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "YZA567",
        hour: "2024-05-10T12:05:00",
        provider: "Proveedor9",
        chauffeur: "Chofer9",
        serie_tracto: "YZA567",
        serie_remolque: "DEF890",
        weight: 6900,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "BCD890",
        hour: "2024-05-11T17:00:00",
        provider: "Proveedor10",
        chauffeur: "Chofer10",
        serie_tracto: "BCD890",
        serie_remolque: "GHI123",
        weight: 5100,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "ABC123",
        hour: "2024-05-02T14:30:00",
        provider: "Proveedor1",
        chauffeur: "Chofer1",
        serie_tracto: "ABC123",
        serie_remolque: "XYZ456",
        weight: 5000,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "DEF456",
        hour: "2024-05-03T08:45:00",
        provider: "Proveedor2",
        chauffeur: "Chofer2",
        serie_tracto: "DEF456",
        serie_remolque: "UVW789",
        weight: 7000,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "GHI789",
        hour: "2024-05-04T11:15:00",
        provider: "Proveedor3",
        chauffeur: "Chofer3",
        serie_tracto: "GHI789",
        serie_remolque: "LMN012",
        weight: 6000,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "JKL012",
        hour: "2024-05-05T16:20:00",
        provider: "Proveedor4",
        chauffeur: "Chofer4",
        serie_tracto: "JKL012",
        serie_remolque: "OPQ345",
        weight: 5500,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "MNO345",
        hour: "2024-05-06T09:10:00",
        provider: "Proveedor5",
        chauffeur: "Chofer5",
        serie_tracto: "MNO345",
        serie_remolque: "RST678",
        weight: 7200,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "PQR678",
        hour: "2024-05-07T13:55:00",
        provider: "Proveedor6",
        chauffeur: "Chofer6",
        serie_tracto: "PQR678",
        serie_remolque: "UVW901",
        weight: 4800,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "Title",
    },
    {
        folio: "STU901",
        hour: "2024-05-08T10:25:00",
        provider: "Proveedor7",
        chauffeur: "Chofer7",
        serie_tracto: "STU901",
        serie_remolque: "XYZ234",
        weight: 6500,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "VWX234",
        hour: "2024-05-09T15:40:00",
        provider: "Proveedor8",
        chauffeur: "Chofer8",
        serie_tracto: "VWX234",
        serie_remolque: "ABC567",
        weight: 5800,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "YZA567",
        hour: "2024-05-10T12:05:00",
        provider: "Proveedor9",
        chauffeur: "Chofer9",
        serie_tracto: "YZA567",
        serie_remolque: "DEF890",
        weight: 6900,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "BCD890",
        hour: "2024-05-11T17:00:00",
        provider: "Proveedor10",
        chauffeur: "Chofer10",
        serie_tracto: "BCD890",
        serie_remolque: "GHI123",
        weight: 5100,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "ABC123",
        hour: "2024-05-02T14:30:00",
        provider: "Proveedor1",
        chauffeur: "Chofer1",
        serie_tracto: "ABC123",
        serie_remolque: "XYZ456",
        weight: 5000,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "DEF456",
        hour: "2024-05-03T08:45:00",
        provider: "Proveedor2",
        chauffeur: "Chofer2",
        serie_tracto: "DEF456",
        serie_remolque: "UVW789",
        weight: 7000,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "GHI789",
        hour: "2024-05-04T11:15:00",
        provider: "Proveedor3",
        chauffeur: "Chofer3",
        serie_tracto: "GHI789",
        serie_remolque: "LMN012",
        weight: 6000,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "JKL012",
        hour: "2024-05-05T16:20:00",
        provider: "Proveedor4",
        chauffeur: "Chofer4",
        serie_tracto: "JKL012",
        serie_remolque: "OPQ345",
        weight: 5500,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "MNO345",
        hour: "2024-05-06T09:10:00",
        provider: "Proveedor5",
        chauffeur: "Chofer5",
        serie_tracto: "MNO345",
        serie_remolque: "RST678",
        weight: 7200,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "Title",
    },
    {
        folio: "PQR678",
        hour: "2024-05-07T13:55:00",
        provider: "Proveedor6",
        chauffeur: "Chofer6",
        serie_tracto: "PQR678",
        serie_remolque: "UVW901",
        weight: 4800,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "STU901",
        hour: "2024-05-08T10:25:00",
        provider: "Proveedor7",
        chauffeur: "Chofer7",
        serie_tracto: "STU901",
        serie_remolque: "XYZ234",
        weight: 6500,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "VWX234",
        hour: "2024-05-09T15:40:00",
        provider: "Proveedor8",
        chauffeur: "Chofer8",
        serie_tracto: "VWX234",
        serie_remolque: "ABC567",
        weight: 5800,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "YZA567",
        hour: "2024-05-10T12:05:00",
        provider: "Proveedor9",
        chauffeur: "Chofer9",
        serie_tracto: "YZA567",
        serie_remolque: "DEF890",
        weight: 6900,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "BCD890",
        hour: "2024-05-11T17:00:00",
        provider: "Proveedor10",
        chauffeur: "Chofer10",
        serie_tracto: "BCD890",
        serie_remolque: "GHI123",
        weight: 5100,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "ABC123",
        hour: "2024-05-02T14:30:00",
        provider: "Proveedor1",
        chauffeur: "Chofer1",
        serie_tracto: "ABC123",
        serie_remolque: "XYZ456",
        weight: 5000,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "DEF456",
        hour: "2024-05-03T08:45:00",
        provider: "Proveedor2",
        chauffeur: "Chofer2",
        serie_tracto: "DEF456",
        serie_remolque: "UVW789",
        weight: 7000,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "GHI789",
        hour: "2024-05-04T11:15:00",
        provider: "Proveedor3",
        chauffeur: "Chofer3",
        serie_tracto: "GHI789",
        serie_remolque: "LMN012",
        weight: 6000,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "JKL012",
        hour: "2024-05-05T16:20:00",
        provider: "Proveedor4",
        chauffeur: "Chofer4",
        serie_tracto: "JKL012",
        serie_remolque: "OPQ345",
        weight: 5500,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "MNO345",
        hour: "2024-05-06T09:10:00",
        provider: "Proveedor5",
        chauffeur: "Chofer5",
        serie_tracto: "MNO345",
        serie_remolque: "RST678",
        weight: 7200,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "PQR678",
        hour: "2024-05-07T13:55:00",
        provider: "Proveedor6",
        chauffeur: "Chofer6",
        serie_tracto: "PQR678",
        serie_remolque: "UVW901",
        weight: 4800,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "STU901",
        hour: "2024-05-08T10:25:00",
        provider: "Proveedor7",
        chauffeur: "Chofer7",
        serie_tracto: "STU901",
        serie_remolque: "XYZ234",
        weight: 6500,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "VWX234",
        hour: "2024-05-09T15:40:00",
        provider: "Proveedor8",
        chauffeur: "Chofer8",
        serie_tracto: "VWX234",
        serie_remolque: "ABC567",
        weight: 5800,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "YZA567",
        hour: "2024-05-10T12:05:00",
        provider: "Proveedor9",
        chauffeur: "Chofer9",
        serie_tracto: "YZA567",
        serie_remolque: "DEF890",
        weight: 6900,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    },
    {
        folio: "BCD890",
        hour: "2024-05-11T17:00:00",
        provider: "Proveedor10",
        chauffeur: "Chofer10",
        serie_tracto: "BCD890",
        serie_remolque: "GHI123",
        weight: 5100,
		_children: [
			{ product: "Camiseta" },
			{ product: "Pantalones" },
			{ product: "Zapatos" },
			{ product: "Bufanda" },
			{ product: "Gorra" }
		],

    }
];

