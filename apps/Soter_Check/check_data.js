const checkListData = [
  {
    location: "CASETA DE VIGILANCIA PLANTA 1",
    tasks: [
      "5´s en caseta",
      "Botoneras",
      "Equipo de cómputo en buen estado",
      "Botiquines",
      "Tableros de avisos",
      "Alumbrado del exterior suficiente y correcto"
    ]
  },
  {
    location: "PARTE TRASERA DEL CUARTO ELÉCTRICO",
    tasks: [
      "Iluminación suficiente y correcta",
      "Malla perimetral en buen estado",
      "Sin personal ajeno deambulando"
    ]
  },
  {
    location: "CASETA DE GAS EN ESTACIONAMIENTO GENERAL",
    tasks: [
      "Iluminación suficiente y correcta"
    ]
  },
  {
    location: "ESTACIONAMIENTO GENERAL",
    tasks: [
      "Sin personas ajenas a esta área",
      "Autos cerrados y estacionados correctamente de reversa",
      "Zona prohibida para reparaciones mecánicas",
      "Malla perimetral en buen estado"
    ]
  },
  {
    location: "AREA DE TANQUES (PATIO) PLANTA 1",
    tasks: [
      "Puertas de acceso funcionales y Cerradas",
      "Cuanta con ayuda visual de solo personal autorizado",
      "5´s en el área",
      "Sin personal ajeno deambulando o en el área",
      "El equipo contra incendio en buen estado cargado al 100 y de libre acceso"
    ]
  },
  {
    location: "PATIO RAMPAS RECIBO",
    tasks: [
      "Iluminación suficiente y correcta",
      "Malla perimetral en buen estado",
      "Sin personal ajeno deambulando",
      "Cajas En rampas  con su calza, gato y candado en manguera de aire",
      "Cajas Estacionada correctamente en los cajones de patio"
    ]
  },
  {
    location: "BAÑO DE OPERADORES / LOGÍSTICA",
    tasks: [
      "Revisión de las condiciones generales",
      "Sin personas en el interior sin nada que hacer",
      "Funcionando correctamente y sin fugas  o sanitarios fuera de servicio.",
      "Iluminación suficiente y correcta"
    ]
  },
  {
    location: "AREA DE RAMPA 24",
    tasks: [
      "Cortinas arriba sin tener caja enrampada",
      "Montacargas mal estacionados o mal manejo",
      "Revisión de funcionamiento de cortinas"
    ]
  },
  {
    location: "ÁREA TANQUES DE GAS (MONTACARGAS)",
    tasks: [
      "Identificados vacíos/ llenos",
      "5´S",
      "Uso del EPP"
    ]
  },
  {
    location: "CISTERNA",
    tasks: [
      "5´s",
      "Solo personal Autorizado",
      "Sin evidencia de daños en la malla"
    ]
  },
  {
    location: "MALLA PERIMETRAL Y CANAL PLUVIAL",
    tasks: [
      "Sin evidencia de daños en la malla",
      "Sin maleza en malla perimetral",
      "Canal Limpio"
    ]
  },
  {
    location: "SUBESTACIÓN NORTE PLANTA 3",
    tasks: [
      "Cuanta con ayudas visual",
      "Iluminación suficiente y correcta",
      "Sin maleza en perímetro de malla.",
      "Sin persona ajeno en el área de trabajo"
    ]
  },
  {
    location: "CONDICIONES DE CAJAS NO ENRAMPADAS",
    tasks: [
      "Reportar cajas abiertas y sin sellos",
      "Cajas estacionadas correctamente",
      "Iluminación suficiente y lámparas en buen estado"
    ]
  },
  {
    location: "PATIO DE LOGÍSTICA PLANTA 3",
    tasks: [
      "Raiser 4,5, con presiones correctas sin fugas y libres de obstrucción",
      "Orden y Limpieza",
      "Personal en esta área con su EPP completo",
      "Tractores sin enganchar al cargar en rampa de enarques",
      "Semáforos funcionando correctamente",
      "Calzas y gatas colocadas según el estatus de la cajas",
      "Operadores parados  cumpliendo las medidas de seguridad",
      "Zona prohibida para reparaciones mecánicas",
      "Revisar que la iluminación sea suficiente y correcta"
    ]
  },
  {
    location: "AREA DE RESIDUOS DE MANEJO ESPECIALES (TOMEX)",
    tasks: [
      "Orden Y Limpieza",
      "Solo Personal autorizado PERSONAL AUTORIZADO",
      "Contenedores Ordenados  y compatibles y bien estibados",
      "Revisar que la Iluminación sea la suficiente y correcta"
    ]
  },
  {
    location: "ÁREA TANQUES DE GAS (MONTACARGAS) PLANTA 3",
    tasks: [
      "Identificados vacíos/ llenos",
      "5´S"
    ]
  },
  {
    location: "PLANTA 3 INTERIOR",
    tasks: [
      "Sin presencia de fugas de agua en raiser 6,7",
      "Con la Presión dentro de parámetros establecidos"
    ]
  },
  {
    location: "OFICINAS RECIBO/EMBARQUES",
    tasks: [
      "Orden y limpieza",
      "Sin personal ajeno a esta área",
      "Equipo contra incendio operable y libre de obstrucción",
      "Oficinas cerradas y puerta cerrada"
    ]
  },
  {
    location: "AREA DE CUARENTENA",
    tasks: [
      "Puerta Cerrada",
      "Solo personal autorizado y usando su E.P.P.",
      "Equipo contra incendios en operación y libre de obstrucción",
      "5´S en el área"
    ]
  },
  {
    location: "COLUMNA F21",
    tasks: [
      "Material estibado correctamente",
      "Pasillos de área de recibo libres de material",
      "Solo personal autorizado y usando su E.P.P."
    ]
  },
  {
    location: "ÁREA DE LOKERS COLUMNA (E11-E10)",
    tasks: [
      "5´S",
      "Locker cerrados con su candado",
    ]
  },
  {
    location: "CUARTO FRÍO / COMEDOR PLANTA 3",
    tasks: [
      "Personal trabajando con su EPP completo",
      "Laves funcionando correctamente",
      "Área de tarjas sin fugas de agua",
      "Área de químicos identificados i bien cerrados",
      "Limpieza de la bodega",
      "Limpieza de la cocina",
      "Temperatura del cuarto frio 1",
      "Temperatura del cuarto frio 2",
    ]
  },
  {
    location: "OFICINAS PLANTA 3",
    tasks: [
      "Puertas de acceso a las oficinas deben de permanecer  cerradas todo el tiempo",
    ]
  },
  {
    location: "ÁREA DE LOBBY PLANTA 3",
    tasks: [
      "Orden y limpieza del área",
      "Sin personal ajeno a esta área",
      "Puertas  de oficinas cerradas",
    ]
  },
  {
    location: "ÁREA DE SALAS DE JUNTAS",
    tasks: [
      "Puertas Cerradas",
      "Orden y limpieza",
      "Sin personal ajeno a esta área",
      "Clima apagado",
    ]
  },
  {
    location: "ÁREA DE TERRAZA",
    tasks: [
      "Puertas cerradas",
      "Orden y limpieza",
      "Sin personal ajeno al área",
    ]
  },
  {
    location: "PUERTAS DEL TÚNEL",
    tasks: [
      "Puertas cerradas",
      "Orden y limpieza",
      "Sin personal ajeno al área",
    ]
  },
  {
    location: "ALMACÉN MRO",
    tasks: [
      "Orden y limpieza  del área",
      "Sin personal ajeno a esta área",
      "Sin presencia de fugas de agua en raiser 6,7  y presión correctas",
    ]
  },
  {
    location: "CUARTO DE MANTENIMIENTO",
    tasks: [
      "Orden y limpieza  del área",
      "Sin personal ajeno a esta área",
    ]
  },
  {
    location: "ÁREA DE RECLAMO",
    tasks: [
      "Orden y limpieza  del área",
      "Sin personal ajeno a esta área",
    ]
  },
  {
    location: "RECIBO EMBARQUES PLANTA 3",
    tasks: [
      "Orden y limpieza  del área",
      "Sin personal ajeno a esta área",
      "Columna J9 Raiser 4,5 sin presencia de fugas de agua",
      "Raiser 4,5, con presiones correctas  y libres de obstrucción",
    ]
  },
  {
    location: "CUARTO DE COMPRESORES",
    tasks: [
      "Orden y limpieza  del área",
      "Sin personal ajeno a esta área",
    ]
  },
  {
    location: "CUARTO DE BOMBAS CONTRA INCENDIO",
    tasks: [
      "Orden y limpieza",
      "Sin personal ajeno a esta área",
      "Bomba Joker en automático",
      "Bomba diésel en automático",
      "Kit anti derrames completo",
      "Banco de baterías limpio y sin sarro",
      "Revisar que la iluminación sea suficiente y correcta",
    ]
  },
  {
    location: "CUARTO DE GASES",
    tasks: [
      "Orden y limpieza",
      "Sin personal ajeno al área",
      "Sin fugas de airea o gas",
      "Revisar que la iluminación sea suficiente y correcta",
      "Kit anti derrames completo",
      "Banco de baterías limpio y sin sarro",
      "Revisar que la iluminación sea suficiente y correcta",
    ]
  },
  {
    location: "CASETA DE VIGILANCIA",
    tasks: [
      "Orden y limpieza",
      "Solo personal autorizado",
      "Oficiales uniformando",
      "Iluminación sea  suficiente y correcta",
    ]
  },
  {
    location: "ÁREA DE LOBBY PLANTA 2",
    tasks: [
      "Orden y limpieza",
      "Sin personal ajeno a esta área",
      "Puertas cerradas.",
    ]
  },
  {
    location: "ÁREA DE LOKERS",
    tasks: [
      "5´S",
      "Locker cerrados con su candado",
    ]
  },
  {
    location: "OFICINAS GENERALES PLANTA 2",
    tasks: [
      "Orden y limpieza",
      "Sin personal ajeno a esta área",
      "Oficinas cerradas y puerta cerrada",
    ]
  },
  {
    location: "BAÑOS COLUMNA F7",
    tasks: [
      "Limpios",
      "Sin Fugas de agua",
      "Raiser 4,5 sin presencia de fugas de agua",
      "Funcionando correctamente",
    ]
  },
  {
    location: "LABORATORIO DE PRUEBAS PLANTA 2",
    tasks: [
      "Solo personal autorizado en el área",
      "Orden y limpieza del área",
      "Raiser 4,5, con presiones correctas sin fugas y libres de obstrucción",
    ]
  },
  {
    location: "ÁREA DE CARGA DE BATERÍAS COL F-1",
    tasks: [
      "Orden y limpieza del área",
      "Equipos conectas correctamente estacionados correctamente",
      "Personal usando su E.P.P",
      "Kit anti derrames completo",
    ]
  },
  {
    location: "COMEDOR",
    tasks: [
      "Personal trabajando con su EPP completo",
      "Limpieza de la bodega",
      "Limpieza de la cocina",
      "Área de comensales limpia y ordenada",
      "Cuartos fríos funcionando correctamente y materia prima ordenada",
    ]
  },
  {
    location: "SALIDA DE REHILETES",
    tasks: [
      "Orden y limpieza",
      "Equipo funcionan correctamente  sin daños",
    ]
  },
  {
    location: "ÁREA DE LOCKERS",
    tasks: [
      "5´S",
      "Locker cerrados con su candado",
    ]
  },
  {
    location: "OFICINAS RH",
    tasks: [
      "Oficinas cerradas todo el tiempo",
      "Sin personal ajeno a esta área",
    ]
  },
  {
    location: "TALLER DE TOOL ROOM",
    tasks: [
      "Personal trabajando con su E.P.P. completo",
      "Orden y limpieza",
      "Sin personal ajeno a esta área",
      "Los equipos y las herramientas están resguardaos correctamente",
    ]
  },
  {
    location: "SECCIÓN DE LOKERS JUNTO A TOOL ROOM",
    tasks: [
      "5´S",
      "Locker cerrados con su candado",
    ]
  },
  {
    location: "TALLER DE MANTENIMIENTO",
    tasks: [
      "Personal trabajando con su E.P.P. completo",
      "Orden y limpieza",
      "Sin personal ajeno a esta área",
      "Los equipos y las herramientas están resguardaos correctamente",
    ]
  },
  {
    location: "COLUMNA 17 -PRENSAS-",
    tasks: [
      "Personal  trabajando con su epp completo",
      "Orden y limpieza en el área",
      "Los rollos están asegurados correctamente",
      "Orden y limpieza en el área",
      "Los rollos están asegurados correctamente",
    ]
  },
  {
    location: "ÁREA DE TOMEX COLUMNA A16",
    tasks: [
      "Personal trabajando con su EPP completo",
      "Orden y limpieza área",
      "Sin personal ajeno a esta área",
    ]
  },
  {
    location: "MATERIALES",
    tasks: [
      "Material estibado correctamente",
      "Pasillos de área de recibo libres de material",
      "Personal del área usando su EPP todo el tiempo",
    ]
  },
  {
    location: "ÁREA DE TOMEX",
    tasks: [
      "Personal trabajando con su EPP completo",
      "Orden y limpieza en el área",
      "Sin personal ajeno a esta área",
    ]
  },
  {
    location: "CUARTO DE BOMBAS CONTRA INCENDIO",
    tasks: [
      "Limpieza del área",
      "Que no existan fugas ni derrames",
      "Nivel correcto del tanque de Diésel",
      "Bombas Diésel y Jockey encendidas y en automático",
      "Nivel correcto de agua del tanque elevado",
    ]
  },
  {
    location: "CUARTO DE QUÍMICOS",
    tasks: [
      "Orden y Limpieza",
      "Puestas a tierra correctos",
      "Químicos bien identificados",
      "Kit anti derrames completo",
      "Iluminación suficiente y correcta",
    ]
  },
  {
    location: "CUARTO DE RESIDUOS PELIGROSOS",
    tasks: [
      "Orden y Limpieza",
      "Residuos segregados correctamente",
      "Residuos etiquetados correctamente",
      "Iluminación suficiente y correcta",
    ]
  },
  {
    location: "PATIO DE SCRAP DE MANTENIMIENTO",
    tasks: [
      "Puerta de emergencia No. 11 sin obstruir",
      "Puerta de emergencia No. 12 sin obstruir",
      "Condiciones de la malla perimetral",
      "Iluminación suficiente y correcta",
    ]
  },
  {
    location: "OFICINAS GENERALES 2",
    tasks: [
      "Que no exista personal ajeno al área",
      "Verificar que las puertas estén cerradas",
      "Que no existan aparatos eléctricos funcionando",
    ]
  },
  {
    location: "COMEDOR 2",
    tasks: [
      "Personal trabajando con su EPP completo",
      "Limpieza de la bodega",
      "Limpieza de la cocina",
      "Área de comensales limpia y ordenada",
      "Cuartos fríos funcionando correctamente y materia prima ordenada",
    ]
  },
  {
    location: "ÁREA DE PULMONES DE COMPRESORES",
    tasks: [
      "Cortina cerrada todo el tiempo",
      "Área sin condiciones inseguras",
      "Condiciones de la malla perimetral",
      "Limpieza y escotilla en buen estado",
      "Revisión de equipo contra incendio",
    ]
  },
  {
    location: "CUARTO ELÉCTRICO",
    tasks: [
      "Puerta cerrada todo el tiempo",
      "Solo personal autorizado laborando en el área",
      "Orden y limpieza en el área",
    ]
  },
  {
    location: "TALLER DE TOOL ROOM",
    tasks: [
      "Personal laborando con su EPP",
      "Área limpia y ordenada",
      "Que no existan fugas ni derrames",
      "Puertas de emergencia cerradas y libres de obstáculos",
    ]
  },
  {
    location: "TALLER DE MANTENIMIENTO",
    tasks: [
      "Personal laborando con su EPP",
      "Área limpia y ordenada",
      "Que no existan fugas ni derrames",
      "Puertas de emergencia cerradas y libres de obstáculos",
    ]
  },
  {
    location: "ÁREA DE CARGA DE BATERÍAS COL F-1",
    tasks: [
      "Orden y limpieza del área",
      "Equipos conectas correctamente estacionados correctamente",
      "Personal usando su E.P.P",
      "Kit anti derrames completo",
    ]
  },
  {
    location: "ÁREA DE LOKERS 3",
    tasks: [
      "5´s en el área",
      "Locker cerrados con su candado",
    ]
  },
  {
    location: "ÁREA DE LOKERS 4",
    tasks: [
      "5´s en el área",
      "Locker cerrados con su candado",
    ]
  },
  {
    location: "PARABÚS DE EMPLEADOS",
    tasks: [
      "Iluminación suficiente y correcta",
      "Sin personal ajeno deambulando",
      "Rehiletes funcionando correctamente y en buen estado",
      "Puerta de acceso funcionando correctamente",
    ]
  },
  {
    location: "OFICINAS FRONTALES RH",
    tasks: [
      "PUERTAS CERRADAS",
      "Orden y limpieza del área",
      "Sin personal ajeno a esta área",
    ]
  },
];



