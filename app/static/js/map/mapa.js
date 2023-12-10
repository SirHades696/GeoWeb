var map = L.map("map", {
  center: [19.2812646, -99.6948895], // Toluca
  zoom: 12,
});

var base = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var clues_gjson = new L.GeoJSON.AJAX(
  "http://localhost:8080/geoserver/accesibilidad_espacial/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=accesibilidad_espacial:CLUES_BASE&outputFormat=application/json",
  {
    onEachFeature: onEachFeature(
      true,
      ["CLUES", "LOCALIDAD"],
      ["Clave de la unidad médica: ", "Localidad: "]
    ),
  }
);

var lzmt_p_gjson = new L.GeoJSON.AJAX(
  "http://localhost:8080/geoserver/accesibilidad_espacial/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=accesibilidad_espacial:LZMT_Puntos&outputFormat=application/json",
  {
    onEachFeature: onEachFeature(
      false,
      ["CVEGEO", "NOMGEO"],
      ["Clave geográfica: ", "Nombre: "]
    ),
  }
);

var lzmt_po_gjson = new L.GeoJSON.AJAX(
  "http://localhost:8080/geoserver/accesibilidad_espacial/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=accesibilidad_espacial:LZMT_Poligonos&outputFormat=application/json",
  {
    onEachFeature: onEachFeature(
      false,
      ["CVEGEO", "NOMGEO"],
      ["Clave geográfica: ", "Nombre: "]
    ),
  }
);

var baseLayers = {
  OpenStreetMap: base,
};

function onEachFeature(useCustomMarker, propertiesKeys, mensajes) {
  return function (feature, layer) {
    if (feature.properties) {
      var popupContent = "";
      for (var i = 0; i < propertiesKeys.length; i++) {
        var key = propertiesKeys[i];
        var msg = mensajes[i];

        if (feature.properties[key]) {
          popupContent += msg + feature.properties[key] + "<br>";
        }
      }
      if (popupContent !== "") {
        layer.bindPopup(popupContent);
        if (useCustomMarker) {
          layer.setIcon(
            L.icon({
              iconUrl: "static/images/hospital.png",
              iconSize: [41, 41], // Tam
              iconAnchor: [24, 41], // anclaje icono
              popupAnchor: [-4, -34], // anclaje popup
            })
          );
        }
      }
    }
  };
}

var clues_base = L.tileLayer.wms(
  "http://localhost:8080/geoserver/accesibilidad_espacial/wms",
  {
    layers: "accesibilidad_espacial:CLUES_BASE",
    format: "image/png",
    transparent: true,
  }
);

var lzmt_puntos = L.tileLayer.wms(
  "http://localhost:8080/geoserver/accesibilidad_espacial/wms",
  {
    layers: "accesibilidad_espacial:LZMT_Puntos",
    format: "image/png",
    transparent: true,
  }
);

var lzmt_puntos_ROVMC = L.tileLayer.wms(
  "http://localhost:8080/geoserver/accesibilidad_espacial/wms",
  {
    layers: "accesibilidad_espacial:LZMT_PUNTOS_VMC_EJ2",
    format: "image/png",
    transparent: true,
  }
);

var lzmt_puntos_ROVMenC = L.tileLayer.wms(
  "http://localhost:8080/geoserver/accesibilidad_espacial/wms",
  {
    layers: "accesibilidad_espacial:LZMT_PUNTOS_VMenC_EJ2",
    format: "image/png",
    transparent: true,
  }
);

var lineas_RO1 = L.tileLayer.wms(
  "http://localhost:8080/geoserver/accesibilidad_espacial/wms",
  {
    layers: "accesibilidad_espacial:LINEAS_RO_EJ1",
    format: "image/png",
    transparent: true,
  }
);

var VMC_RO1 = L.tileLayer.wms(
  "http://localhost:8080/geoserver/accesibilidad_espacial/wms",
  {
    layers: "accesibilidad_espacial:LZMT_POLIGONOS_VMC_EJ1",
    format: "image/png",
    transparent: true,
  }
);

var VMenC_RO1 = L.tileLayer.wms(
  "http://localhost:8080/geoserver/accesibilidad_espacial/wms",
  {
    layers: "	accesibilidad_espacial:LZMT_POLIGONOS_VMENC_EJ1",
    format: "image/png",
    transparent: true,
  }
);

var VMenC_RD1 = L.tileLayer.wms(
  "http://localhost:8080/geoserver/accesibilidad_espacial/wms",
  {
    layers: "	accesibilidad_espacial:LZMT_POLIGONOS_VMenC_RD1",
    format: "image/png",
    transparent: true,
  }
);

var VMC_RD1 = L.tileLayer.wms(
  "http://localhost:8080/geoserver/accesibilidad_espacial/wms",
  {
    layers: "	accesibilidad_espacial:LZMT_POLIGONOS_VMC_RD1",
    format: "image/png",
    transparent: true,
  }
);

var clues_RD1 = L.tileLayer.wms(
  "http://localhost:8080/geoserver/accesibilidad_espacial/wms",
  {
    layers: "	accesibilidad_espacial:CLUES_RD1",
    format: "image/png",
    transparent: true,
  }
);

var groupedOverlays = {
  "Zona Metropolitana": {
    Clues: clues_gjson,
    "ZMT Puntos": lzmt_p_gjson,
    "ZMT Polígonos": lzmt_po_gjson,
  },
  "Análisis desde la demanda": {
    "Polígonos evaluados": VMC_RO1,
    "Polígonos descartados": VMenC_RO1,
    "Líneas de conectividad": lineas_RO1,
    Clues: clues_base,
    Centroides: lzmt_puntos,
    "Puntos evaluados": lzmt_puntos_ROVMC,
    "Puntos descartados": lzmt_puntos_ROVMenC,
  },
  "Análisis desde la oferta": {
    "Polígonos": VMC_RD1,
    "Polígonos descartados": VMenC_RD1,
    "Clues evaluados": clues_RD1,
  },
};

controlLayers = L.control.groupedLayers(baseLayers, groupedOverlays).addTo(map);

map.on("overlayadd overlayremove", function (eventLayer) {
  if (eventLayer.name === "Polígonos evaluados") {
    legend1.style.display = eventLayer.type === "overlayadd" ? "block" : "none";
  }
  if (eventLayer.name === "Puntos evaluados") {
    legend2.style.display = eventLayer.type === "overlayadd" ? "block" : "none";
  }
  if (eventLayer.name === "Clues evaluados") {
    legend3.style.display = eventLayer.type === "overlayadd" ? "block" : "none";
  }
});
