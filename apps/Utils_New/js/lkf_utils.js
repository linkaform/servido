//----Funciona para buscar dentro de una lista de diccionarios, y llenar con valores unicos un selector
function set_catalog_select(listDic, key, id, allOption = false) {
    const selectElement = document.getElementById(id);
    if (!selectElement) {
      console.error(`No se encontró un elemento con el id: ${id}`);
      return;
    }
    const uniqueValues = new Set();

    listDic.forEach(item => {
      if (item[key]) {
        uniqueValues.add(item[key]);
      }
    });
    selectElement.innerHTML = '';

    //----Opción
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccione una opción';
    selectElement.appendChild(defaultOption);



    //-----Option All
    if(allOption){
      const allOption = document.createElement('option');
      allOption.value = 'all';
      allOption.textContent = 'Seleccionar todo';
      selectElement.appendChild(allOption);


      const noneOption = document.createElement('option');
      noneOption.value = 'none';
      noneOption.textContent = 'Deseleccionar todo';
      selectElement.appendChild(noneOption);
    }

    // Crear y añadir opciones al select
    uniqueValues.forEach(value => {
      const optionElement = document.createElement('option');
      optionElement.value = value;
      optionElement.textContent = value;
      selectElement.appendChild(optionElement);
    });
}

//-----Funciona en conjunto con set_catalog_select para poner una opción que seleccione todo y una que lo deseleccione
function controllerAllOptions(idElement) {
  $(`#${idElement}`).on('change', function () {
    const selected = $(this).val();
    if (selected.includes('all')) {
        const allValues = $(`#${idElement} option`)
            .map(function () { return this.value; })
            .get()
            .filter(v => v !== 'all' && v !== 'none');
        $(`#${idElement}`).val(allValues).trigger('change');
    } else if (selected.includes('none')) {
        $(`#${idElement}`).val(null).trigger('change');
    }
  });
}


//----Funciona para buscar dentro de una lista de diccionarios, y llenar con valores unicos un selector
function setSelect(listDic, labelKey, idKey, idElement) {
    const selectElement = document.getElementById(idElement);
    if (!selectElement) {
      console.error(`No se encontró un elemento con el id: ${id}`);
      return;
    }
    selectElement.innerHTML = '';
    //----Opción
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccione una opción';
    selectElement.appendChild(defaultOption);

    listDic.forEach(item => {
      const optionElement = document.createElement('option');
      optionElement.value = item[idKey];
      optionElement.textContent = item[labelKey];
      selectElement.appendChild(optionElement);
    });
}

//----Funciona para buscar dentro de una lista de diccionarios, y llenar con valores unicos un selector
function setCatalogSimple(list, id, language = false) {
  console.log('list',list)
  const selectElement = document.getElementById(id);
  if (!selectElement) {
    console.error(`No se encontró un elemento con el id: ${id}`);
    return;
  }

  // Obtener valores únicos
  const uniqueValues = Array.from(new Set(list));

  // Limpiar el select
  selectElement.innerHTML = '';

  // Opción por defecto
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  if(!language){
    defaultOption.textContent = 'Seleccione una opción';
  }else{
    defaultOption.textContent = 'Select a option';
  }
  selectElement.appendChild(defaultOption);

  // Agregar opciones
  uniqueValues.forEach(value => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    selectElement.appendChild(option);
  });
}

//----Funciona para limpiar un selector y dejarlo con una opción pre definida
function set_clean_select(id) {
  const selectElement = document.getElementById(id);
  if (!selectElement) {
    console.error(`No se encontró un elemento con el id: ${id}`);
    return;
  }

  selectElement.innerHTML = '';

  //----Opción
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Seleccione una opción';
  selectElement.appendChild(defaultOption);
}

//----Funciona para buscar datos unicos coincidentes en una key y devolverlos así
function findListDictionary(dictionary, key, value) {
  const isArray = Array.isArray(value);

  return dictionary.filter(item => {
      if (item.hasOwnProperty(key)) {
          if (isArray) {
              return value.includes(item[key]);
          }
          return item[key] === value;
      }
      return false;
  });
}

//----Funciona para generar una paleta de N colores apartir de opciones numeradas
function getPAlleteColors(pallete,number){
  var arrayColors = new Array();
  //----Select Pallete
  if (pallete==1){
      arrayColors = chroma.scale(['#fafa6e','#2A4858']).mode('lch').colors(number);
  }else if(pallete==2){
      arrayColors = chroma.scale(['#1B4F72','#AED6F1','#F7DC6F']).mode('lch').colors(number);
  }else if(pallete==3){
      arrayColors = chroma.scale(['#90afc5','#336b87','#2a3132','#763626']).mode('lch').colors(number);
  }else if(pallete==4){
      arrayColors = chroma.scale(['#003b46','#07575b','#66a5ad','#c4dfe6']).mode('lch').colors(number);
  }else if(pallete==5){
    arrayColors = chroma.scale(['#27ae60','#f1c40f','#d35400']).mode('lch').colors(number);
  }else if(pallete==6){
    arrayColors = chroma.scale(['#3498db','#1b4f72','#27ae60']).mode('lch').colors(number);
  }else if(pallete==7){
    arrayColors = chroma.scale(['#0b7fab','#f1e4de','#f4d75e','#e9723d','#7c7b89']).mode('lch').colors(number);
  }else if(pallete==8){
    arrayColors = chroma.scale(['#FFBE70','#E89A66','#FF9D7D','#E87466','#FF7085']).mode('lch').colors(number);
  }else if(pallete==9){
    arrayColors = chroma.scale(['#8C062B','#DB1049','#FE6973','#FA8471','#F5B301','#FED053']).mode('lch').colors(number);
  }else if(pallete==10){
    arrayColors = chroma.scale(['#264653','#2A9D8F','#216974','#41766F','#E09453','#D1711F','#A34828']).mode('lch').colors(number);
  }else if(pallete==11){
    arrayColors = chroma.scale(['#E63946','#F1FAEE','#A8DADC','#457B9D','#1D3557']).mode('lch').colors(number);
  }else if(pallete == 12){
    arrayColors = chroma.scale(["#dc3545", "#28a745"]).mode('lch').colors(number);
  }else if(pallete == 13){
    arrayColors = chroma.scale(["#007CB3", "#EFB03B"]).mode('lch').colors(number);
  }
  return arrayColors;
}

//----Funciona para tomar screen de imagesnes Graficas
function get_chartDownload(id,style, nameFile = null) 
{
  let title = 'file-name.png';
  if(nameFile != null){
    title = nameFile+'.png';
  }
  $('#'+id).addClass(style);
  html2canvas(document.querySelector("#"+id)).then(canvas => {
    getDownload(canvas.toDataURL(), title);
  });
  $("#"+id).removeClass(style);
}

//-----Descarga  un div en imagen
function getDownload(uri, filename){
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

