window.onload = function(){
    //----Selectores
    initDropdown('filterMes');
    initDropdown('filterFabrica');


    drawChartElement('chartFirst','line',dataChart1,optionsChart1, undefined,  true);
    drawChartElement('chartSecond','bar',dataChart2,optionsChart2, undefined,  true);
    drawChartElement('chartThird','bar',dataChart3,optionsChart3, undefined,  true);
    drawChartElement('chartFourth','line',dataChart4,optionsChart4, undefined,  true);
    drawChartElement('chartFiveth','line',dataChart5A,optionsChart5A, undefined,  true);
    drawChartElement('chartSixth','bar',dataChart6,optionsChart6, undefined,  true);
    drawChartElement('chartSeventh','line',dataChart7,optionsChart7, undefined,  true);
    drawChartElement('chartEigth','line',dataChart8,optionsChart8, undefined,  true);
    drawChartElement('chartNineth','line',dataChart9,optionsChart9, undefined,  true);

    drawTableElement('tableFirst', dataTable1, columnsTable1, undefined, configTable1);


    /*
    createElements(dicReportContext);
    setElementsStyleNew();
    const statusSession = getSessionNew();
    if (statusSession === 'Active') {
        loadData();
    } else {
        loadDemoData();
    }*/
}



function initDropdown(dropdownId){
    const dropdown = document.getElementById(dropdownId);

    if(!dropdown){
        return;
    }

    const button = dropdown.querySelector('.dropdown-btn');
    const items = dropdown.querySelectorAll('.item');
    const selected = dropdown.querySelector('.selected-text');

    button.addEventListener('click', (e) => {

        e.stopPropagation();

        document.querySelectorAll('.dropdown.active').forEach(d => {
            if(d !== dropdown){
                d.classList.remove('active');
            }
        });

        dropdown.classList.toggle('active');
    });

    items.forEach(item => {

        item.addEventListener('click', () => {

            const value = item.dataset.value || item.textContent.replace('✓ ','').trim();

            selected.textContent = value;

            // Guardar valor en el botón
            button.dataset.value = value;

            items.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');

            dropdown.classList.remove('active');
        });

    });

}


function switchChart(option) {
    // Actualizar botones activos
    document.querySelectorAll('.chart-toggle-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === option);
    });

    // Lógica de la gráfica
    if (option === 'tendencia') {
        drawChartElement('chartFiveth','line',dataChart5A,optionsChart5A, undefined,  true);
    } else {
        drawChartElement('chartFiveth','bar',dataChart5B,optionsChart5B, undefined,  true);
    }
}