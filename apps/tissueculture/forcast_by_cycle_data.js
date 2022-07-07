
var columsTable1 = [
  {"headerFilter": "input", "title": "Plant Code", "frozen": false, "hozAlign": "left", "field": "plant_code", "with": 150},
  {"headerFilter": "input", "title": "Row Type", "frozen": false, "hozAlign": "left", "field": "row_type", "with": 150},
  {"title": "Cycle 1", "frozen": false, "hozAlign": "right", "field": "cycle_1", "formatter": "money", "with": 75,
    "formatterParams": {"symbol": "", "symbolAfter": "", "decimal": ".", "thousand": ",", "precision": 0}},
  {"title": "Cycle 2", "frozen": false, "hozAlign": "right", "field": "cycle_2", "formatter": "money", "with": 75,
    "formatterParams": {"symbol": "", "symbolAfter": "", "decimal": ".", "thousand": ",", "precision": 0}},
  {"title": "Cycle 3", "frozen": false, "hozAlign": "right", "field": "cycle_3", "formatter": "money", "with": 75,
    "formatterParams": {"symbol": "", "symbolAfter": "", "decimal": ".", "thousand": ",", "precision": 0} },
  {"title": "Cycle 4", "frozen": false, "hozAlign": "right", "field": "cycle_4", "formatter": "money", "with": 75,
    "formatterParams": {"symbol": "", "symbolAfter": "", "decimal": ".", "thousand": ",", "precision": 0} },
  {"title": "Cycle 5", "frozen": false, "hozAlign": "right", "field": "cycle_5", "formatter": "money", "with": 75,
    "formatterParams": {"symbol": "", "symbolAfter": "", "decimal": ".", "thousand": ",", "precision": 0}},
  {"title": "Cycle 6", "frozen": false, "hozAlign": "right", "field": "cycle_6", "formatter": "money", "with": 75,
    "formatterParams": {"symbol": "", "symbolAfter": "", "decimal": ".", "thousand": ",", "precision": 0}},
  {"title": "Cycle 7", "frozen": false, "hozAlign": "right", "field": "cycle_7", "formatter": "money", "with": 75,
    "formatterParams": {"symbol": "", "symbolAfter": "", "decimal": ".", "thousand": ",", "precision": 0}},
  {"title": "Cycle 8", "frozen": false, "hozAlign": "right", "field": "cycle_8", "formatter": "money", "with": 75,
    "formatterParams": {"symbol": "", "symbolAfter": "", "decimal": ".", "thousand": ",", "precision": 0}},
  {"title": "Cycle 9", "frozen": false, "hozAlign": "right", "field": "cycle_9", "formatter": "money", "with": 75,
    "formatterParams": {"symbol": "", "symbolAfter": "", "decimal": ".", "thousand": ",", "precision": 0}},
  {"title": "Cycle 10", "frozen": false, "hozAlign": "right", "field": "cycle_10", "formatter": "money", "with": 75,
    "formatterParams": {"symbol": "", "symbolAfter": "", "decimal": ".", "thousand": ",", "precision": 0}},
  {"title": "Cycle 11", "frozen": false, "hozAlign": "right", "field": "cycle_11", "formatter": "money", "with": 75,
    "formatterParams": {"symbol": "", "symbolAfter": "", "decimal": ".", "thousand": ",", "precision": 0}},
  {"title": "Cycle 12", "frozen": false, "hozAlign": "right", "field": "cycle_12", "formatter": "money", "with": 75,
    "formatterParams": {"symbol": "", "symbolAfter": "", "decimal": ".", "thousand": ",", "precision": 0},cellPopUp:rowPopupFormatter}
]


/*var dataTable1 = [
 {id:1, plant_name:"Oli Bob", gender:"female", actuals202238:"12", col:"red", dob:""},
 {id:2, plant_name:"Mary May", actuals202238:"1", col:"blue", dob:"14/05/1982"},
 {id:3, plant_name:"Christine Lobowski", actuals202238:"42", col:"green", dob:"22/05/1982"},
 {id:4, plant_name:"Brendon Philips", actuals202238:"125", col:"orange", dob:"01/08/1980"},
 {id:5, plant_name:"Margret Marmajuke", actuals202238:"16", col:"yellow", dob:"31/01/1999"},
];
*/

var dataTable1 = [
  {"cycle_4": -272856, "cycle_5": 110106, "cycle_6": -72800, "cycle_7": 14676, "cycle_1": -74487, "cycle_2": -36579, "cycle_3": 43822, "plant_code": "LAGBG", "cycle_8": -118614,
    "_children": [
        {"cycle_4": 274656, "cycle_5": 4549, "cycle_6": 86573, "cycle_7": 53717, "cycle_1": 78207, "cycle_2": 50186, "cycle_3": 52384, "cycle_8": 118614, "id": 1, "row_type": "Required", "name": "Required"},
        {"cycle_4": 1800.0, "cycle_5": 114655.59999999999, "cycle_6": 13772.22, "cycle_7": 68393.2, "cycle_1": 3720.0, "cycle_2": 13606.109999999999, "cycle_3": 96206.81,  "cycle_8": 0.0, "row_type": "Actuals"}], "row_type": "Fulfillment"},

  {"cycle_4": -272856, "cycle_5": 110106, "cycle_6": -86178, "cycle_7": -53717, "cycle_1": -74487, "cycle_2": -36579, "cycle_3": 43822, "plant_code": "LAGTW", "cycle_8": -2476, "_children": [{"cycle_4": 274656, "cycle_5": 4549, "cycle_6": 86573, "cycle_7": 53717, "cycle_1": 78207, "cycle_2": 50186, "cycle_3": 52384, "plant_code": "LAGTW", "cycle_8": 2476, "id": 1, "row_type": "Required", "name": "Required"},

  {"cycle_4": 1800.0, "cycle_5": 114655.59999999999, "cycle_6": 394.24, "row_type": "Actuals", "cycle_1": 3720.0, "cycle_2": 13606.109999999999, "cycle_3": 96206.81, "plant_code": "LAGTW"}], "row_type": "Fulfillment"}, {"cycle_4": -272856, "cycle_5": 110106, "cycle_6": -72800, "cycle_7": -52111, "cycle_1": -74487, "cycle_2": -36579, "cycle_3": 43822, "plant_code": "LAGET", "cycle_8": -14188, "_children": [{"cycle_4": 274656, "cycle_5": 4549, "cycle_6": 86573, "cycle_7": 53717, "cycle_1": 78207, "cycle_2": 50186, "cycle_3": 52384, "plant_code": "LAGET", "cycle_8": 14188, "id": 1, "row_type": "Required", "name": "Required"}, {"cycle_4": 1800.0, "cycle_5": 114655.59999999999, "cycle_6": 13772.22, "cycle_7": 1605.4499999999998, "cycle_1": 3720.0, "cycle_2": 13606.109999999999, "cycle_3": 96206.81, "plant_code": "LAGET", "row_type": "Actuals"}], "row_type": "Fulfillment"}, {"cycle_4": -272856, "cycle_5": 110106, "cycle_6": -72800, "cycle_7": 14676, "cycle_1": -74487, "cycle_2": -36579, "cycle_3": 43822, "plant_code": "LAGNS", "cycle_8": -2342, "_children": [{"cycle_4": 274656, "cycle_5": 4549, "cycle_6": 86573, "cycle_7": 53717, "cycle_1": 78207, "cycle_2": 50186, "cycle_3": 52384, "plant_code": "LAGNS", "cycle_8": 2787, "id": 1, "row_type": "Required", "name": "Required"}, {"cycle_4": 1800.0, "cycle_5": 114655.59999999999, "cycle_6": 13772.22, "cycle_7": 68393.2, "cycle_1": 3720.0, "cycle_2": 13606.109999999999, "cycle_3": 96206.81, "plant_code": "LAGNS", "cycle_8": 444.78, "row_type": "Actuals"}], "row_type": "Fulfillment"},

  {"cycle_4": -274656, "cycle_5": -4549, "cycle_6": -86573, "cycle_7": -53717, "cycle_1": -78207, "cycle_2": -50186, "cycle_3": -52384, "plant_code": "LRUPT", "cycle_8": -1185, "_children": [{"cycle_4": 274656, "cycle_5": 4549, "cycle_6": 86573, "cycle_7": 53717, "cycle_1": 78207, "cycle_2": 50186, "cycle_3": 52384, "plant_code": "LRUPT", "cycle_8": 1185, "id": 1, "row_type": "Required", "name": "Required"}, {"plant_code": "LRUPT", "row_type": "Actuals"}], "row_type": "Fulfillment"}, {"cycle_4": -272856, "cycle_5": 4318, "cycle_6": -86573, "cycle_7": -53717, "cycle_1": -74487, "cycle_2": -36579, "cycle_3": 43822, "plant_code": "LAGBF", "cycle_8": -3187, "_children": [{"cycle_4": 274656, "cycle_5": 4549, "cycle_6": 86573, "cycle_7": 53717, "cycle_1": 78207, "cycle_2": 50186, "cycle_3": 52384, "plant_code": "LAGBF", "cycle_8": 3187, "id": 1, "row_type": "Required", "name": "Required"}, {"cycle_4": 1800.0, "cycle_5": 8867.039999999999, "row_type": "Actuals", "cycle_1": 3720.0, "cycle_2": 13606.109999999999, "cycle_3": 96206.81, "plant_code": "LAGBF"}], "row_type": "Fulfillment"}, {"cycle_4": -274656, "cycle_5": -4549, "cycle_6": -86573, "cycle_7": -53717, "cycle_1": -78207, "cycle_2": -50186, "cycle_3": -52384, "plant_code": "LRUPR", "cycle_8": -160, "_children": [{"cycle_4": 274656, "cycle_5": 4549, "cycle_6": 86573, "cycle_7": 53717, "cycle_1": 78207, "cycle_2": 50186, "cycle_3": 52384, "plant_code": "LRUPR", "cycle_8": 160, "id": 1, "row_type": "Required", "name": "Required"}, {"plant_code": "LRUPR", "row_type": "Actuals"}], "row_type": "Fulfillment"},

];
