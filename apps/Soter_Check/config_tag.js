let listCatalog = [];

window.onload = function(){
    setRequestTag();
    //---Asign Events
    document.getElementById('selectUbicacion').addEventListener('change', function() {
        drawOptionsArea(document.getElementById('selectUbicacion').value)
    });
    document.getElementById('selectArea').addEventListener('change', function() {
        drawImageArea(document.getElementById('selectArea').value)
    });
    document.getElementById("buttonSend").addEventListener("click", () => {
        setRequestUpdateTag();
    });
}

function setRequestUpdateTag(){
    const buttonSend =  document.getElementById("buttonSend");
    buttonSend.disabled = false;
    let idCatalog =  document.getElementById('selectArea').value;
    let idTag =  document.getElementById('inputIdTag').value;
    fetch(getUrlRequest('script'), {
        method: 'POST',
        body: JSON.stringify({
            script_id: 'create_record_check.py',
            tagId:idTag,
            idCatalog:idCatalog,
            option: 'update_information_tag',
        }),
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers':'*',
        },
    })
    .then(res => res.json())
    .then(res => {
        const data = res.response && res.response.data ? res.response.data : {};
        if(data.status_request == '202'){
            alert('Se a registrado su tag');
        }
    })
}


function setRequestTag() {
    let tagId = getParameterURL('tagId');
    fetch(getUrlRequest('script'), {
        method: 'POST',
        body: JSON.stringify({
            script_id: 'create_record_check.py',
            tagId:tagId,
            option: 'get_information_tag',
        }),
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers':'*',
        },
    })
    .then(res => res.json())
    .then(res => {
        const data = res.response && res.response.data ? res.response.data : {};
        const inputIdTag = document.getElementById('inputIdTag');
        inputIdTag.value = tagId;
        if(data.status_request == 'included'){
            drawInformation(data.data_tag);
            console.log('entra a la otra',data.data_tag)
        }else if(data.status_request == 'not_included'){
            drawOptionsUbicacion(data.catalog_list)
        }
        ///---Hide Loading
        setTimeout(() => {hideLoading()}, 2000);
    })
}

function hideLoading(){
    const loading = document.getElementById('loading');
    const mainContent = document.getElementById('main-content');
    loading.style.display = 'none';
    mainContent.classList.remove('hidden');  
}

function drawOptionsUbicacion(catalogList) {
    listCatalog =  catalogList;
    //---Set OPtions Ubicación
    const listUbicacion = [...new Set(listCatalog.map(item => item.ubicacion_catalog))];
    const selectUbicacion = document.getElementById('selectUbicacion');
    selectUbicacion.innerHTML = '';
    //--Config
    const option_empty = document.createElement('option');
    option_empty.textContent = 'Seleccione una Ubicaciónn';
    option_empty.value = "";
    selectUbicacion.appendChild(option_empty);
    listUbicacion.forEach(item => {
        const option = document.createElement('option');
        option.textContent = item;
        option.value = item;
        selectUbicacion.appendChild(option);
    });
}

function drawOptionsArea(ubicacion) {
    const selectArea = document.getElementById('selectArea');
    if(ubicacion!=''){
        const listAreas = listCatalog.filter(item => item.ubicacion_catalog === ubicacion);
        selectArea.disabled = false;
        selectArea.innerHTML = '';
        //--Config
        const option_empty = document.createElement('option');
        option_empty.textContent = 'Seleccione una Ubicaciónn';
        option_empty.value = "";
        selectArea.appendChild(option_empty);
        listAreas.forEach(item => {
            const option = document.createElement('option');
            option.textContent = item.nombre_area_catalog;
            option.value = item._id_catalog;
            selectArea.appendChild(option);
        });
    }else{
        selectArea.innerHTML = '';
        selectArea.disabled = true;
        const imageContent = document.getElementById('image-content');
        imageContent.classList.add('hidden');
        document.getElementById("buttonSend").disabled = true;
    }
}

function drawImageArea(area) {
    if(area !=''){
        const areaDic = listCatalog.filter(item => item.area === area);
        if(areaDic.imagen_area_catalog != null){
            const imageElement = document.getElementById('imageArea');
            imageElement.src = areaDic.imagen_area_catalog;
        }
        document.getElementById("buttonSend").disabled = false;
    }else{
        const imageContent = document.getElementById('image-content');
        imageContent.classList.add('hidden');
        document.getElementById("buttonSend").disabled = true; 
    }
}

function drawInformation(data) {
    const selectComponentUbi =  document.getElementById("selectUbicacion");
    const selectComponentArea =  document.getElementById("selectArea");
    const buttonSend =  document.getElementById("buttonSend");
    const alertContent =  document.getElementById("alert-content");
    
    const imageContent = document.getElementById('image-content');
    const imageElement = document.getElementById('imageArea');

    const inputUbicacion =  document.getElementById("inputUbicacion");
    const inputArea =  document.getElementById("inputArea");


    //----Hidden
    selectComponentUbi.style.display = 'none';
    selectComponentArea.style.display = 'none';
    buttonSend.style.display = 'none';

    //----Show
    imageContent.classList.remove('hidden');  
    if(data.imagen_area_catalog != null){
        imageElement.src = data.imagen_area_catalog;
    }
    //---Information
    alertContent.classList.remove('hidden');
    inputArea.classList.remove('hidden');  
    inputUbicacion.classList.remove('hidden');  
    inputUbicacion.value = data.ubicacion_catalog ? data.ubicacion_catalog : '';
    inputArea.value = data.nombre_area_catalog ? data.nombre_area_catalog : '';
}