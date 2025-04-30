//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirst', title:'Horas Extra', optionPDF:true, optionExpanded:true},
            { type:'table', col: '6', id:'tableSecond', title:'Tardanzas', optionPDF:true, optionExpanded:true},
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

let userIcon = function(cell, formatterParams){ 
    const type = cell.getRow().getData().type;
    if(type == 'Tecnico'){
        return "<i class='fa-solid fa-user-gear'></i>";
    }else if(type == 'Ayudante'){
        return "<i class='fa-solid fa-users-gear'></i>";
    }
};


let columsTable1 = [
    { title:"Empleado", field:'empleado', hozAlign:"left", headerHozAlign: "left",headerFilter: true, width:250},
    { formatter:userIcon, hozAlign:"center", download: false, width:50},
    { formatter:mapIcon, hozAlign:"center", cellClick:function(e, cell){
        const url = cell.getRow().getData().url_check_in;
        if(url){ window.open(url,'_blank'); }
    }, download: false, width:50},
    { title:"Check In", field:'check_in', hozAlign:"center", headerHozAlign: "center", headerFilter: true, width:200},
    { formatter:mapIcon, hozAlign:"center", cellClick:function(e, cell){
        const url = cell.getRow().getData().url_check_out;
        if(url){ window.open(url,'_blank'); }
    }, download: false, width:50},
    { title:"Check Out", field:'check_out',  hozAlign:"center", headerHozAlign: "center", headerFilter: true, width:200},

    { title:"Cliente", field:'cliente', hozAlign:"left", headerHozAlign: "center",width:250},
    { title:"Localidad", field:'localidad', hozAlign:"left", headerHozAlign: "center",width:250},
    { title:"Supervisor", field:'supervisor', hozAlign:"left", headerHozAlign: "center",width:250},
    
    { title:"Hrs Nocturna", field:'hrs_noct', hozAlign:"center", headerHozAlign: "center", bottomCalc:"sum", bottomCalcParams:{precision:2,}, width:200},
    { title:"Hrs Extra al 35%", field:'hrs_ext', hozAlign:"center", headerHozAlign: "center", bottomCalc:"sum", bottomCalcParams:{precision:2,}, width:200},
    { title:"Hrs Extra al 100%", field:'hrs_ext_full', hozAlign:"center", headerHozAlign: "center", bottomCalc:"sum", bottomCalcParams:{precision:2,}, width:200},
    { title:"Total", field:'total', hozAlign:"center", headerHozAlign: "center",bottomCalc:"sum", bottomCalcParams:{precision:2,}, width:250},
];

let dataTable1 = [
    {
        empleado: 'Empleado 1',
        type:'Ayudante',
        check_in: '',
        check_out: '',
        hrs_ord: '6',
        hrs_ext: '2',
        hrs_noc: '4',
        hrs_ord_ext_sab: '1',
        hrs_ord_sab: '0.5',
        total: '12',
        _children: [
            {
                check_in: '2025-01-29 12:51:17',
                check_out: '2025-01-29 18:53:10',
                hrs_noct: '3',
                hrs_ext: '2',
                hrs_ext_full: '1',
                total: '6',
                url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
                url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
            },
            {
                check_in: '2025-01-29 8:00:00',
                check_out: '2025-01-29 12:38:08',
                hrs_noct: '3',
                hrs_ext: '2',
                hrs_ext_full: '1',
                total: '6',
                url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
                url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
            }
        ]
    },
    ...Array.from({ length: 14 }, (_, i) => ({
        empleado: `Empleado ${i + 2}`,
        type: i%2 ? 'Ayudante' : 'Técnico',
        check_in: '',
        check_out: '',
        hrs_noct: '6',
        hrs_ext: '4',
        hrs_ext_full: '2',
        total: '6',
        total: '12',
        _children: [
            {
                check_in: '2025-01-29 09:00:00',
                check_out: '2025-01-29 14:00:00',
                 hrs_noct: '3',
                hrs_ext: '2',
                hrs_ext_full: '1',
                total: '6',
                url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
                url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
            },
            {
                check_in: '2025-01-29 15:00:00',
                check_out: '2025-01-29 19:00:00',
                hrs_noct: '3',
                hrs_ext: '2',
                hrs_ext_full: '1',
                total: '6',
                url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
                url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
            }
        ]
    }))
];


let columsTable2 = [
    { title:"Empleado", field:'empleado', hozAlign:"left", headerHozAlign: "left",headerFilter: true, width:250},
    { formatter:userIcon, hozAlign:"center", download: false, width:50},
    { formatter:mapIcon, hozAlign:"center", cellClick:function(e, cell){
        const url = cell.getRow().getData().url_check_in;
        if(url){ window.open(url,'_blank'); }
    }, download: false, width:50},
    { 
        title:"Check In", 
        field:'check_in', 
        hozAlign:"center", 
        headerHozAlign: "center", 
        headerFilter: true, 
        width:200,
        formatter: function(cell, formatterParams) {
            let data = cell.getRow().getData();
            if (data.url_check_in) {
                cell.getElement().style.backgroundColor = "#FFA500"; 
                cell.getElement().style.color = "#000"; 
            }
            return cell.getValue();
        }
    },
    { formatter:mapIcon, hozAlign:"center", cellClick:function(e, cell){
        const url = cell.getRow().getData().url_check_out;
        if(url){ window.open(url,'_blank'); }
    }, download: false, width:50},
    { title:"Check Out", field:'check_out',  hozAlign:"center", headerHozAlign: "center", headerFilter: true, width:200},
];

let dataTable2 = [
    {
        empleado: 'Empleado 1',
        type:'Ayudante',
        check_in: '',
        check_out: '',
        _children: [
            {
                check_in: '2025-01-29 12:51:17',
                check_out: '2025-01-29 18:53:10',
                url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
                url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
            },
            {
                check_in: '2025-01-29 8:00:00',
                check_out: '2025-01-29 12:38:08',
                url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
                url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
            }
        ]
    },
    ...Array.from({ length: 14 }, (_, i) => ({
        empleado: `Empleado ${i + 2}`,
        type: i%2 ? 'Ayudante' : 'Técnico',
        check_in: '',
        check_out: '',
        _children: [
            {
                check_in: '2025-01-29 09:00:00',
                check_out: '2025-01-29 14:00:00',
                url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
                url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
            },
            {
                check_in: '2025-01-29 15:00:00',
                check_out: '2025-01-29 19:00:00',
                url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
                url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
            }
        ]
    }))
];

let configTableCustom2 = {
    height: "400px",
    layout:"fitDataFill",
    theme: "bootstrap5", 
    columnMinWidth: 100,
    autoColumns: false, 
    scrollX: true, 
    dataTree:true,
    dataTreeStartExpanded:true,
}

//----Diseño de PDF
const designPDF ={
    orientation:"landscape",
    theme: 'grid',
    autoTable:function(doc)
    { 
        let margins = 30;
        let leftMargin = 40;
        let marginsIndent = 40;
        doc.setFontSize(15);
        doc.setTextColor(23,32,42);
        doc.text("Consolidado de Horas Extra", 370, 40);

        let imageUrl = 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/679bcc5ae9370faf752d46dc.png'; 
        doc.addImage(imageUrl, 'JPEG', 730, -20, 80, 80);

        return {
            styles: {
                cellPadding: 2, 
                fontSize: 8,
                halign : 'center'
            },
            headStyles: {
                fillColor: [38, 107, 115],
                valign: 'middle'
            },
            alternateRowStyles: {
                fillColor : [220, 230, 241]
            },
            columnStyles: {
                0: {cellWidth: 'auto',},
                1: {cellWidth: 'auto',},
                2: {cellWidth: 'auto',},
                3: {cellWidth: 'auto',},
                4: {cellWidth: 'auto',},
                5: {cellWidth: 'auto',},
                6: {cellWidth: 'auto',},
                7: {cellWidth: 'auto',},
                8: {cellWidth: 'auto', fontSize: 9,fontStyle: 'bold',valign: 'middle'},
            },
            margin: { top: 10 },
            startY: 80,
        };
    },
    createdCell: function(cell, opts) {
        if (opts.column.index == 1) {        
            cell.styles.textColor = "#20a8d8";
            cell.styles.fillColor = "#000";
        }
    },
}

//----Diseño de PDF
const designPDF2 ={
    orientation:"landscape",
    theme: 'grid',
    autoTable:function(doc)
    { 
        let margins = 30;
        let leftMargin = 40;
        let marginsIndent = 40;
        doc.setFontSize(15);
        doc.setTextColor(23,32,42);
        doc.text("Tardanzas", 370, 40);

        let imageUrl = 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/679bcc5ae9370faf752d46dc.png'; 
        doc.addImage(imageUrl, 'JPEG', 730, -20, 80, 80);

        return {
            styles: {
                cellPadding: 2, 
                fontSize: 8,
                halign : 'center'
            },
            headStyles: {
                fillColor: [38, 107, 115],
                valign: 'middle'
            },
            alternateRowStyles: {
                fillColor : [220, 230, 241]
            },
            columnStyles: {
                0: {cellWidth: 'auto',},
                1: {cellWidth: 'auto',},
                2: {cellWidth: 'auto',},
                3: {cellWidth: 'auto',},
                4: {cellWidth: 'auto',},
                5: {cellWidth: 'auto',},
                6: {cellWidth: 'auto',},
                7: {cellWidth: 'auto',},
                8: {cellWidth: 'auto', fontSize: 9,fontStyle: 'bold',valign: 'middle'},
            },
            margin: { top: 10 },
            startY: 80,
        };
    },
    createdCell: function(cell, opts) {
        if (opts.column.index == 1) {        
            cell.styles.textColor = "#20a8d8";
            cell.styles.fillColor = "#000";
        }
    },
}