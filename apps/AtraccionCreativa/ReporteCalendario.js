// Variable global para el calendario
let calendar;

// ADAPTAR: Eventos por defecto en el formato que espera FullCalendar
const defaultEvents = [
    {
        id: '1',
        title: 'Mantenimiento AC - Hotel Plaza',
        start: '2025-08-05T09:00:00',
        end: '2025-08-05T17:00:00',
        color: '#28a745',
        extendedProps: {
            cliente: 'Hotel Plaza',
            servicio: 'Mantenimiento AC',
            status: 'Completado',
            tecnico: 'Juan Pérez',
            activity: 'Mantenimiento preventivo de sistema de aire acondicionado',
            evidencia: '',
            record_id: 'OS-2025-001'
        }
    },
    {
        id: '2',
        title: 'Instalación - Oficinas Centro',
        start: '2025-08-06T08:00:00',
        end: '2025-08-06T16:00:00',
        color: '#17a2b8',
        extendedProps: {
            cliente: 'Oficinas Centro',
            servicio: 'Instalación Sistema HVAC',
            status: 'En Proceso',
            tecnico: 'María López',
            activity: 'Instalación completa de sistema HVAC en oficinas principales',
            evidencia: '',
            record_id: 'OS-2025-002'
        }
    },
    {
        id: '3',
        title: 'Reparación Urgente - Clínica Sur',
        start: '2025-08-07T10:00:00',
        end: '2025-08-07T14:00:00',
        color: '#dc3545',
        extendedProps: {
            cliente: 'Clínica Sur',
            servicio: 'Reparación Compresor',
            status: 'Urgente',
            tecnico: 'Carlos Ruiz',
            activity: 'Reparación urgente de compresor principal',
            evidencia: '',
            record_id: 'OS-2025-003'
        }
    },
    {
        id: '4',
        title: 'Inspección - Centro Comercial',
        start: '2025-08-08T09:00:00',
        end: '2025-08-08T12:00:00',
        color: '#ffc107',
        extendedProps: {
            cliente: 'Centro Comercial Norte',
            servicio: 'Inspección Anual',
            status: 'Pendiente',
            tecnico: 'Ana García',
            activity: 'Inspección anual de todos los sistemas de climatización',
            evidencia: '',
            record_id: 'OS-2025-004'
        }
    },
    {
        id: '5',
        title: 'Limpieza Ductos - Restaurante',
        start: '2025-08-09T08:00:00',
        end: '2025-08-09T15:00:00',
        color: '#6f42c1',
        extendedProps: {
            cliente: 'Restaurante El Sabor',
            servicio: 'Limpieza de Ductos',
            status: 'Reprogramado',
            tecnico: 'Luis Torres',
            activity: 'Limpieza completa del sistema de ductos de ventilación',
            evidencia: '',
            record_id: 'OS-2025-005'
        }
    }
];

window.onload = function () {
    createElements(dicReportContext);
    setElementsStyle();

    const statusSession = getSession();
    if (statusSession == 'Active') {
        loadData();
    } else if (statusSession == 'Demo') {
        loadDemoData();
    } else if (statusSession == 'Offline') {
        loadDemoData();
    }
}

//-----LOAD DATA DEMO (modificar para incluir todas las cards)
function loadDemoData() {
    // Primera fila de cards
    createListCard('statsOrdersContainer', dataTable1, 'Órdenes de Servicio', {
        titleIcon: '📊',
        colorPalette: ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6f42c1', '#fd7e14', '#20c997']
    });

    createTableCard('statsIgualaContainer', dataTable2, 'UDS Iguala', {
        titleIcon: '⚖️',
        colorPalette: ['#28a745', '#17a2b8', '#ffc107', '#dc3545']
    });

    createListCard('statsStatusContainer', dataTable3, 'Status OS', {
        titleIcon: '📈',
        colorPalette: ['#007bff', '#17a2b8', '#ffc107', '#fd7e14', '#28a745', '#dc3545']
    });

    createTableCard('statsTypeContainer', dataTable4, 'UDS por tipo de Mantto', {
        titleIcon: '🔧',
        colorPalette: ['#6f42c1', '#e83e8c', '#fd7e14', '#20c997']
    });

    // Segunda fila de cards - NUEVAS
    createListCard('statsEstadosContainer', dataTable5, 'UDS por Estado', {
        titleIcon: '🗺️',
        colorPalette: ['#e74c3c', '#3498db', '#f39c12', '#2ecc71', '#9b59b6', '#1abc9c', '#e67e22']
    });

    createTableCard('statsMueblesContainer', dataTable6, 'UDS por Tipo de Mueble', {
        titleIcon: '🪑',
        colorPalette: ['#8e44ad', '#2980b9', '#27ae60', '#f39c12']
    });

    createListCard('statsCanalContainer', dataTable7, 'UDS por Canal', {
        titleIcon: '📱',
        colorPalette: ['#c0392b', '#8e44ad', '#2980b9', '#16a085']
    });

    // Mostrar stats y calendario
    setTimeout(() => {
        showStats();
        showCalendar();
        initializeCalendar();

        // AGREGAR: Igualar alturas después de mostrar
        equalizeCardHeights();
    }, 500);

    //-----Loading
    setTimeout(() => { hide_loading(); }, 2000);
}

function showStats() {
    $('#content-div-stats').fadeIn(500, function () {
        // Igualar alturas después de la animación
        equalizeCardHeights();
    });
}

//-----LOAD DATA ACTIVE
function loadData() {
    // Primera fila de cards
    createListCard('statsOrdersContainer', dataTable1, 'Órdenes de Servicio', {
        titleIcon: '📊',
        colorPalette: ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6f42c1', '#fd7e14', '#20c997']
    });

    createTableCard('statsIgualaContainer', dataTable2, 'UDS Iguala', {
        titleIcon: '⚖️',
        colorPalette: ['#28a745', '#17a2b8', '#ffc107', '#dc3545']
    });

    createListCard('statsStatusContainer', dataTable3, 'Status OS', {
        titleIcon: '📈',
        colorPalette: ['#007bff', '#17a2b8', '#ffc107', '#fd7e14', '#28a745', '#dc3545']
    });

    createTableCard('statsTypeContainer', dataTable4, 'UDS por tipo de Mantto', {
        titleIcon: '🔧',
        colorPalette: ['#6f42c1', '#e83e8c', '#fd7e14', '#20c997']
    });

    // Segunda fila de cards - NUEVAS
    createListCard('statsEstadosContainer', dataTable5, 'UDS por Estado', {
        titleIcon: '🗺️',
        colorPalette: ['#e74c3c', '#3498db', '#f39c12', '#2ecc71', '#9b59b6', '#1abc9c', '#e67e22']
    });

    createTableCard('statsMueblesContainer', dataTable6, 'UDS por Tipo de Mueble', {
        titleIcon: '🪑',
        colorPalette: ['#8e44ad', '#2980b9', '#27ae60', '#f39c12']
    });

    createListCard('statsCanalContainer', dataTable7, 'UDS por Canal', {
        titleIcon: '📱',
        colorPalette: ['#c0392b', '#8e44ad', '#2980b9', '#16a085']
    });

    //----Assing Events
    const buttonExecution = document.getElementById("buttonExecution");
    buttonExecution.addEventListener("click", () => {
        getInformation();
    });

    // Mostrar calendario
    setTimeout(() => {
        showStats();
        showCalendar();
        initializeCalendar();
    }, 500);

    //-----Loading
    setTimeout(() => { hide_loading(); }, 2000);
}

// NUEVA: Función para inicializar el calendario (adaptada de calendario_robatech)
function initializeCalendar() {
    // Verificar que FullCalendar esté disponible
    if (typeof FullCalendar === 'undefined') {
        console.error('FullCalendar no está cargado');
        setTimeout(initializeCalendar, 500);
        return;
    }

    var calendarEl = document.getElementById('firstElement');

    if (!calendarEl) {
        console.error('Elemento #firstElement no encontrado');
        return;
    }

    calendar = new FullCalendar.Calendar(calendarEl, {
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        selectable: true,
        editable: false,
        aspectRatio: 1.8,
        scrollTime: '06:00',
        headerToolbar: {
            left: 'today prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día'
        },

        // AGREGAR: Configuración específica para colores
        eventDisplay: 'block', // Asegurar que se muestren como bloques

        eventContent: function (arg) {
            var event = arg.event;
            var startTime = getHours(event.startStr);
            var endTime = getHours(event.endStr);

            if (!endTime) {
                endTime = '';
            }

            var html = '<b>' + startTime + '-' + endTime + ' ' + event.extendedProps.tecnico + '</b><br>' + event.title;

            // MODIFICAR: Asegurar que el color se aplique
            var containerStyle = `
                max-width: 250px; 
                white-space: nowrap; 
                overflow: hidden; 
                text-overflow: ellipsis;
                background-color: ${event.backgroundColor || event.color} !important;
                border-color: ${event.borderColor || event.color} !important;
                color: white !important;
                padding: 2px 4px;
                border-radius: 3px;
            `;

            html = '<div style="' + containerStyle + '">' + html + '</div>';

            return { html: html };
        },

        // AGREGAR: Callback para asegurar colores en diferentes vistas
        eventDidMount: function (info) {
            // Aplicar colores manualmente si no se muestran
            info.el.style.backgroundColor = info.event.color || info.event.backgroundColor;
            info.el.style.borderColor = info.event.color || info.event.borderColor;
        },

        eventClick: function (info) {
            showEventDetails(info.event);
        },
        initialView: 'dayGridMonth',
        events: defaultEvents
    });

    calendar.setOption('locale', 'es');
    calendar.render();
    console.log('✅ Calendario inicializado correctamente');
}

// CAMBIAR: Función para mostrar detalles del evento (mejorada)
function showEventDetails(event) {
    const props = event.extendedProps;

    Swal.fire({
        title: event.title,
        html: `
            <div class="text-start" style="font-family: 'Segoe UI', sans-serif;">
                <div class="mb-3">
                    <strong style="color: #495057;">🏢 Cliente:</strong><br>
                    <span style="color: #6c757d;">${props.cliente}</span>
                </div>
                <div class="mb-3">
                    <strong style="color: #495057;">🔧 Servicio:</strong><br>
                    <span style="color: #6c757d;">${props.servicio}</span>
                </div>
                <div class="mb-3">
                    <strong style="color: #495057;">📅 Fecha:</strong><br>
                    <span style="color: #6c757d;">${event.start.toLocaleDateString('es-ES')}</span>
                </div>
                <div class="mb-3">
                    <strong style="color: #495057;">⏰ Horario:</strong><br>
                    <span style="color: #6c757d;">${getHours(event.startStr)} - ${getHours(event.endStr)}</span>
                </div>
                <div class="mb-3">
                    <strong style="color: #495057;">📊 Status:</strong><br>
                    <span class="badge px-3 py-2" style="background-color: ${event.color}; font-size: 0.9rem;">
                        ${props.status}
                    </span>
                </div>
                <div class="mb-3">
                    <strong style="color: #495057;">👨‍🔧 Técnico:</strong><br>
                    <span style="color: #6c757d;">${props.tecnico}</span>
                </div>
                <div class="mb-0">
                    <strong style="color: #495057;">📋 Descripción:</strong><br>
                    <span style="color: #6c757d; font-style: italic;">${props.activity}</span>
                </div>
            </div>
        `,
        confirmButtonText: 'Cerrar',
        width: 500,
        showClass: {
            popup: 'animate__animated animate__fadeInUp animate__faster'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster'
        }
    });
}

// COPIAR: Función para obtener horas (del calendario_robatech)
function getHours(hourDate) {
    try {
        var date = new Date(hourDate);

        if (isNaN(date)) {
            throw new Error("La cadena no representa una fecha válida.");
        }

        var hour = date.getHours();
        var minute = date.getMinutes();

        if (minute < 10) {
            minute = '0' + minute;
        }

        return hour + ":" + minute;
    } catch (error) {
        console.error(error);
        return '';
    }
}

// Función para mostrar el calendario
function showCalendar() {
    $('#content-div-empty').hide();
    $('#content-div-calendar').show();
}

// Función para ocultar el calendario
function hideCalendar() {
    $('#content-div-calendar').hide();
    $('#content-div-empty').show();
}

// NUEVA: Función para cargar eventos desde el backend
function loadCalendarEvents(eventos) {
    if (!calendar) {
        console.warn('Calendario no inicializado');
        return;
    }

    // Limpiar eventos existentes
    calendar.removeAllEvents();

    // Agregar nuevos eventos
    calendar.addEventSource(eventos);

    console.log(`✅ Cargados ${eventos.length} eventos en el calendario`);
}

//-----SET REQUEST ACTIVE (mantener igual pero agregar carga de calendario)
async function getInformation() {
    showLoadingComponent();
    const scriptId = getParameterURL('script_id');
    const demo = getParameterURL('demo');
    const statusSession = getSession();

    if (statusSession == 'Demo' || demo) {
        Swal.fire({
            title: 'Advertencia',
            html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
        hideLoadingComponent();
    } else if (scriptId != null && statusSession == 'Active' && !demo) {
        const dicAdional = {
            option: 'get_report',
        }
        const responseRequest = await sendRequestReport(scriptId, dicAdional);
        const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};

        if (data.almacen_guadalajara) {
            drawTableElement('tableThird', data?.almacen_guadalajara, columsTable3, undefined, configTableCustom3);
        }

        // Si hay datos del calendario, cargarlos
        if (data.calendar_events) {
            loadCalendarEvents(data.calendar_events);
            showCalendar();
        }

        hideLoadingComponent();
        showElements();
    }
}

// MODIFICAR: Función para crear una card con lista de tipos y cantidades (sin objetivos)
function createListCard(containerId, data, title, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Contenedor ${containerId} no encontrado`);
        return;
    }

    // Configuración por defecto
    const config = {
        showTotal: true,
        showPercentage: false, // CAMBIAR: Sin porcentajes
        colorPalette: ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6f42c1', '#fd7e14', '#20c997'],
        titleIcon: '📊',
        showProgress: false, // CAMBIAR: Sin barras de progreso
        ...options
    };

    // Calcular total
    const total = data.reduce((sum, item) => sum + item.qty, 0);

    // Crear HTML
    let html = `
        <div class="list-card">
            <div class="list-card-header">
                <h5 class="list-card-title">
                    <span class="title-icon">${config.titleIcon}</span>
                    ${title}
                </h5>
                ${config.showTotal ? `<div class="total-badge">${total.toLocaleString()}</div>` : ''}
            </div>
            <div class="list-card-body">
    `;

    data.forEach((item, index) => {
        const color = config.colorPalette[index % config.colorPalette.length];

        html += `
            <div class="list-item">
                <div class="list-item-content">
                    <div class="list-item-indicator" style="background-color: ${color};"></div>
                    <div class="list-item-text">
                        <span class="item-type">${item.type}</span>
                    </div>
                    <div class="item-quantity" style="color: ${color};">
                        ${item.qty.toLocaleString()}
                    </div>
                </div>
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;

    container.innerHTML = html;
}

// MODIFICAR: Función para crear card estilo tabla (sin objetivos)
function createTableCard(containerId, data, title, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Contenedor ${containerId} no encontrado`);
        return;
    }

    const config = {
        showTotal: true,
        showPercentage: false, // CAMBIAR: Sin porcentajes
        colorPalette: ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6f42c1', '#fd7e14', '#20c997'],
        titleIcon: '📊',
        ...options
    };

    const total = data.reduce((sum, item) => sum + item.qty, 0);

    let html = `
        <div class="table-card">
            <div class="table-card-header">
                <h5 class="table-card-title">
                    ${config.titleIcon} ${title}
                </h5>
                ${config.showTotal ? `<span class="total-summary">${total.toLocaleString()}</span>` : ''}
            </div>
            <div class="table-card-body">
                <div class="custom-table">
                    <div class="table-header">
                        <div class="col-type">Tipo</div>
                        <div class="col-qty">Cantidad</div>
                    </div>
    `;

    data.forEach((item, index) => {
        const color = config.colorPalette[index % config.colorPalette.length];

        html += `
            <div class="table-row" style="border-left: 3px solid ${color};">
                <div class="col-type">
                    <span class="type-indicator" style="background-color: ${color};"></span>
                    ${item.type}
                </div>
                <div class="col-qty">
                    <strong style="color: ${color};">${item.qty.toLocaleString()}</strong>
                </div>
            </div>
        `;
    });

    html += `
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

// Función para igualar alturas de las cards
function equalizeCardHeights() {
    // Esperar a que el DOM esté completamente renderizado
    setTimeout(() => {
        const cards = document.querySelectorAll('#content-div-stats .list-card, #content-div-stats .table-card');

        if (cards.length === 0) return;

        // Resetear alturas
        cards.forEach(card => {
            card.style.height = 'auto';
        });

        // Obtener la altura máxima
        let maxHeight = 0;
        cards.forEach(card => {
            const height = card.offsetHeight;
            if (height > maxHeight) {
                maxHeight = height;
            }
        });

        // Aplicar la altura máxima a todas las cards
        cards.forEach(card => {
            card.style.height = maxHeight + 'px';
        });

        console.log(`✅ Alturas igualadas: ${maxHeight}px`);
    }, 100);
}

// AGREGAR evento para igualar alturas cuando se redimensiona la ventana
window.addEventListener('resize', function () {
    if (document.getElementById('content-div-stats').style.display !== 'none') {
        equalizeCardHeights();
    }
});