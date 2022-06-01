//Estilos
function style(feature) {
return {
weight: 1,
opacity: 1,
color: 'white',
fillOpacity: 0.7,
fillColor: getColor(feature.properties.COD_REGION)
};
}

function styler(feature) {
return {
fillColor: getColor(
feature.properties.ESTADO),
weight: 0.7,
opacity: 0.8,
color: 'black',
fillOpacity: 0.3
};
}

function getColor(b) {
return b == "ACTIVO" ? '#CC4634' :
b == "LIBRE" ? '#3FC13A' :
b == "RESERVADO" ? '#CC4634' :
b == "10" ? '#800026' :
b == "20" ? '#AA68D8' :
b == "30" ? '#E31A1C' :
b == "40" ? '#32863F' :
b == "50" ? '#FD8D3C' :
b == "60" ? '#E11F7C' :
b == "70" ? '#DEBD3C' :
'#349FCC';}


function styled(feature) {
return {
fillColor: getColor(
feature.properties.COD_REGION),
weight: 1,
opacity: 1,
color: 'white',
fillOpacity: 0.7
};
}

 function fullextend() {
	        bounds = mymap.fitBounds([
	            [-7, -78],
	            [15, -65]
	        ]);
	        click: bounds;

	    }
	    var extend = L.control({
	        position: 'topright'
	    });


//Centro de la vista del mapa
var map = L.map('map', {
    center: [4.677512 ,-74.083821],
    zoom: 5,
    minZoom: 4,
    maxZoom: 18,
});

function drawMap(){
  // console.log('****sectoress', sect_status2)
  if (!document.getElementById("map")){
    var formNode = document.getElementById("tst");
    var elemOption = document.createElement("div");
    elemOption.setAttribute('id','map');
    formNode.appendChild(elemOption);
  }

  //Mapa Base
  var mbAttr = '',
  	mbUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
  var Basemapa  = L.tileLayer(mbUrl, {id: '', attribution: mbAttr});

  //Popup
  var regiones1 = L.geoJSON(regiones,{ style: style, onEachFeature: function (feature, layer) { layer.bindPopup("<h4>" + feature.properties.NOM_REGION + "</h4><hr>"+"<strong> Código Región: </strong>"+feature.properties.COD_REGION +"<br/>"); } });

  var distritos1 = L.geoJSON(distritos, { style: styled, onEachFeature: function (feature, layer) { layer.bindPopup("<h4>Información del Distrito</h4><hr>"+"<strong> Codigo del Distrito : </strong>"+feature.properties.DISTRITO +"<br/>"+"<strong> Región del Distrito: </strong>"+feature.properties.NOM_REGION +"</br>"); } });

  var sectores1 = L.geoJSON(sect_status2, { style: styler, onEachFeature: function (feature, layer) { layer.bindPopup("<h4>Información de Sector</h4><hr>"+"<strong> Nombre del Sector : </strong>"+feature.properties.SECTOR+"<br/>"+"<strong> Estado Sector: </strong>"+feature.properties.ESTADO+"</br>"); } });
  map = L.map('map', {
      center: [4.677512 ,-74.083821],
      zoom: 5,
      minZoom: 4,
      maxZoom: 18,
      layers: [Basemapa, regiones1]
  });


  L.control.scale({
    imperial: false
  }).addTo(map);


  var searchControl = new L.Control.Search({
         layer: sectores1,
         propertyName: 'SECTOR',
         circleLocation: false
  });

  searchControl.on('search_locationfound', function(e) {
         e.layer.setStyle({fillColor: '#3f0', color: '#0f0'});
  })

  .on('search_collapsed', function(e) {
  		sectores1.eachLayer(function(layer) { //restauramos el color del elemento
  			sectores1.resetStyle(layer);
  		});
  	});

  map.addControl(searchControl);


  var overlayMaps = {
      "Regiones": regiones1,
      "Distritos":distritos1,
      "Sectores": sectores1
       };


  var baseLayers = {
  		"Vista Satelital": Basemapa
      	};

  L.control.layers(baseLayers, overlayMaps).addTo(map);

}
