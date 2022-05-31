
var url = "https://app.linkaform.com/api/";


// Funciones Linkafrom
function getCatalog(form_id, catalog_id, level, catalogType='select') {
  var start_key = Array();
  var end_key = Array();
  if (level > 1){
    for (next_level = 1; next_level < level; next_level++){
      var catalogSelect = document.getElementById("catalog-"+catalog_id+"-level-"+next_level).value;
      start_key.push(catalogSelect);
      if (next_level + 1 == level){
        if (typeof(catalogSelect) === 'number') {
          end_key.push(catalogSelect + 0.001);
        }else{
          end_key.push(catalogSelect + '\n');
        }
      }else{
        end_key.push(catalogSelect);
      }
    }
    end_key.push('{}');
    }else{
      var next_level = level;
  }
  if (catalogType === 'select'){
    var is_edition = false
  }else{
    var is_edition = true
  }
  return fetch(url + 'infosync/catalog/view/', {
    method: 'POST',
    body: JSON.stringify({
      "form_id":form_id,
      "parent_catalog_id":null,
      "catalog_id":catalog_id,
      "options":{"group_level":level,
      "startkey":start_key,
      "endkey":end_key},
      "is_edition":is_edition
        }),
    headers:{
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Authorization': 'Bearer '+userJwt
    },
  }).then((res) => res.json())
  .then((res) => {
    var formNode = document.getElementById("catalog-"+catalog_id+"-level-"+next_level);
    if (catalogType === 'select'){
      formNode.options.length = 0
      var elemOption = document.createElement("option");
      elemOption.setAttribute('value','--Seleccione--');
      elemOption.text = '--Seleccione--';
      formNode.appendChild(elemOption);
    }
    if (res.rows){
      for (i = 0; i < res.rows.length; i++){
        if (catalogType === 'select'){
          var elemOption = document.createElement("option");
          elemOption.setAttribute('value',res.rows[i]['key'][next_level-1])
          elemOption.text = res.rows[i]['key'][next_level-1];
          formNode.appendChild(elemOption);
        }
       }
     }
  })
}
