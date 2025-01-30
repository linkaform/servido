//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirst', title:'Detalle de empleados'},
        ] 
    },
];


//-----Configuraciones de la tabla
let mapIcon = function(cell, formatterParams){ 
    const empleado = cell.getRow().getData().empleado;
    if(!empleado){
        return "<i class='fa-solid fa-map'></i>";
    }
    return '';
};


let columsTable1 = [
    { title:"Empleado", field:'empleado', hozAlign:"left",headerFilter: true, width:250},
    { formatter:mapIcon, hozAlign:"center", cellClick:function(e, cell){
        const url = cell.getRow().getData().url_check_in;
        if(url){ window.open(url,'_blank'); }
    },width:50},
    { title:"Check In", field:'check_in', hozAlign:"center",headerFilter: true, width:200},
    { formatter:mapIcon, hozAlign:"center", cellClick:function(e, cell){
        const url = cell.getRow().getData().url_check_out;
        if(url){ window.open(url,'_blank'); }
    },width:50},
    { title:"Check Out", field:'check_out', hozAlign:"center", headerFilter: true, width:200},
    { title:"Hrs Ordinarias", field:'hrs_ord', hozAlign:"center", width:200},
    { title:"Hrs Extra", field:'hrs_ext', hozAlign:"center", width:200},
    { title:"Horas Nocturna", field:'hrs_noc', hozAlign:"center", width:200},
    { title:"Horas Extraordinaria Sabatina", field:'hrs_ord_ext_sab', hozAlign:"center", width:250},
    { title:"Horas Ordinaria Sabatina", field:'hrs_ord_sab', hozAlign:"center", width:250},
    { title:"Total", field:'total', hozAlign:"center", width:100},
];

let dataTable1 = [
    {
        empleado: 'Empleado 1',
        check_in: '',
        check_out: '',
        hrs_ord: '6',
        hrs_ext: '2',
        hrs_noc: '4',
        hrs_ord_ext_sab: '1',
        hrs_ord_sab: '0.5',
        total: '13.5',
        _children: [
            {
                check_in: '2025-01-29 12:51:17',
                check_out: '2025-01-29 18:53:10',
                hrs_ord: '3',
                hrs_ext: '2',
                hrs_noc: '1',
                hrs_ord_sab: '0.5',
                hrs_ord_ext_sab: '1',
                total: '7.5',
                url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
                url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
            },
            {
                check_in: '2025-01-29 8:00:00',
                check_out: '2025-01-29 12:38:08',
                hrs_ord: '3',
                hrs_ext: '',
                hrs_noc: '3',
                hrs_ord_sab: '',
                hrs_ord_ext_sab: '',
                total: '6',
                url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
                url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
            }
        ]
    },
    ...Array.from({ length: 14 }, (_, i) => ({
        empleado: `Empleado ${i + 2}`,
        check_in: '',
        check_out: '',
        hrs_ord: '5',
        hrs_ext: '1',
        hrs_noc: '3',
        hrs_ord_ext_sab: '1',
        hrs_ord_sab: '0.5',
        total: '10.5',
        _children: [
            {
                check_in: '2025-01-29 09:00:00',
                check_out: '2025-01-29 14:00:00',
                hrs_ord: '4',
                hrs_ext: '1',
                hrs_noc: '2',
                hrs_ord_sab: '0.5',
                hrs_ord_ext_sab: '1',
                total: '8.5',
                url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
                url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
            },
            {
                check_in: '2025-01-29 15:00:00',
                check_out: '2025-01-29 19:00:00',
                hrs_ord: '3',
                hrs_ext: '1',
                hrs_noc: '2',
                hrs_ord_sab: '0.5',
                hrs_ord_ext_sab: '1',
                total: '7.5',
                url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
                url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
            }
        ]
    }))
];