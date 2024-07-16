let dataTableGuardiasApoyo = [];
let dataTableNotas = [];
let dataTableCambiarCaseta = []
/*[
    {name:"Caseta 1 Poniente", ubi:"Cumbres", status: casetaDisponible, guard:'Juan Ecobedo' ,comment:'comentsario de ejemplot'},
    {name:"Caseta 1 Sur", ubi:"Santa Catarina",  status: casetaDisponible, guard:'Francisco Flores', comment:'soy uncoment'},
    {name:"Caseta 4 Poniente", ubi:"Monterrey", status: casetaDisponible, guard:'Javier Almanza' ,comment:'comentsario de ejemplot'},
    {name:"Caseta 3 Sur", ubi:"Escobedo",  status: casetaDisponible, guard:'Valeria Alvarado',comment:'comentando squi'},
    {name:"Caseta 6 Poniente", ubi:"San Jeronimo", status: casetaDisponible, guard:'Erika Ruiz',comment:'comentsario de ejemplot'},
    {name:"Caseta 6 Sur", ubi:"Monterrey",  status: casetaDisponible, guard:'Daniela Cepeda',comment:'comentsario de ejemplot' }
];*/

let dataTableAgregarGuardiaApoyo = [  
    { name: 'Juan Pérez Gomez', status: 'Disponible' , img: 'https://img.favpng.com/1/10/3/computer-icons-child-avatar-png-favpng-1KY4gtPN1Fab6LrVpVM8AjtnH.jpg', id:20}, 
    { name: 'María Rodríguez Herandez', status: 'Disponible' , img:'https://img.favpng.com/11/2/11/child-computer-icons-avatar-png-favpng-5T7pGsVsca4MQcwET3VPe0X2n.jpg', id:21}, 
    { name: 'Pedro Gómez Flores', status: 'Disponible' , img:'https://img.favpng.com/10/24/16/avatar-child-youtube-computer-icons-png-favpng-PTMFwE8vBZBUGaNtVmMJGxrdc.jpg', id:22}, 
    { name: 'Ana López Rosales', status: 'Disponible' , img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStDHIGgUTPEb7gYe0oKLLp_AfrnvRgPcCkI2icqmuSU7OIQsrnVLxlRygPK1hn-Za8dlY&usqp=CAU', id:23},
    { name: 'David Martínez Alvarado', status: 'Disponible' , img:'https://www.shareicon.net/data/512x512/2016/06/25/786530_people_512x512.png', id:24}, 
    { name: 'Laura Ramírez LLanes', status: 'Disponible', img:'https://p7.hiclipart.com/preview/203/105/230/girl-computer-icons-avatar-child-boy-girl-face.jpg', id:25 }, 
    { name: 'Carlos Sánchez Espinosa', status: 'Disponible' ,img:'https://www.shareicon.net/data/512x512/2016/06/25/786525_people_512x512.png', id:26}, 
    { name: 'Elena García Garcia', status: ' Disponible' ,img:'https://cdn-icons-png.freepik.com/512/163/163813.png', id:27}, 
    { name: 'Sofía Hernández Campos', status: 'Disponible' , img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDAdo0KjHLNxkRXKlav2OfZ7KUlwFjyY6WJTH7LrFyfD6rfeBepm5ybnFBwM_Cd7prl0s&usqp=CAU', id:28}, 
    { name: 'Mario Castillo Hernandez', status: ' Disponible' , img:"https://www.shareicon.net/data/512x512/2016/06/25/786541_people_512x512.png", id:29}
];
const columsDataNotas = [
    {title:"Guardia", field:"name", width:160, responsive:0}, //never hide this column
    {title:"Nota", field:"note", width:250, resizable:true, tooltip:true},
    {title:"Estatus", field:"status", width:110, resizable:true, tooltip:true},
    {title:"Imagen", field:"img", width:140, resizable:true, tooltip:true},
    { title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:110,
        formatter: (cell, formatterParams) => {
            let data = cell.getData();
            let folio = cell.getData().folio ? cell.getData().folio : 0;
            let divActions = '<div class="row d-flex">';
            divActions += `<button class="btn-table-bitacora" onclick="cerrarNotaAlert('${data.name}', '${data.note}', ${folio},'${data.status}')" ><i class="fa-regular fa-circle-check"></i></button>`;
            divActions += `<button class="btn-table-bitacora" onclick="verNotasAlert('${data.name}', '${data.note}', ${folio}, '${data.status}', '${data.fotos}', '${data.archivos}')" > <i class="fa-regular fa-eye"></i></button>`;
            divActions += '</div>';
            return divActions;
        },
    },
];

const columsCambiarCaseta = [
    {title:"Caseta", field:"name", width:230, responsive:0},
    {title:"Ubicación", field:"ubi", width:100, resizable:true, tooltip:true},
    //{title:"Estatus", field:"status", width:180, resizable:true, tooltip:true},
    //{title:"Guardia en turno", field:"guard", width:180, resizable:true, tooltip:true}
];

const columsAgregarGuardiaApoyo = [
    {title:"Nombre", field:"name", width:240, responsive:0},
    {title:"Estatus", field:"status", width:330, resizable:true, tooltip:true},
];

const columsDataGuardiasApoyo = [
    {title:"Guardias de Apoyo", field:'name',hozAlign:"left",headerFilter:true,width:390,
         formatter: (cell, formatterParams) => {
            let data = cell.getData();
            let id = cell.getData().id ? cell.getData().id : 0;
            let divActions = '<div id="inf'+data.id +'"><div class="d-flex flex-row" id="listOfGuards">';
            divActions+= '<div col-sm-12 col-md-12 col-lg-6 col-xl-6> <img id="imgGuardiaApoyo" height="60" width="60" src="'
            + data.img + '"> </div > <div col-sm-12 col-md-12 col-lg-6 col-xl-6 class="flex-column ms-3"> <div> <b>'
            + data.name +'</b> </div><div id="idStatusGuardia"> '+ data.status +'</div></div>';
            divActions += '</div> </div>';
            return divActions;
        },
    },
    {title: "", field: "actions" , hozAlign: "left", resizable:false,width:10,
        formatter: (cell, formatterParams) => {
            let data = cell.getData();
            let id = cell.getData().id ? cell.getData().id : 0;
            let divActions = '<div class="row d-flex justify-content-center" id="inf2'+data.id +'">';
            divActions += `<input class="form-check-input customInputCheckout" type="checkbox" id="inp-${id}" onclick="selectCheckboxGuardia(${data.id})" value=${data.id}  style="border-color:darkgray">`;
            divActions += `<button class="btn-table-bitacora mt-3 customButtonCheckout" id="btn-${id}" onclick="eliminarGuardia(${id}, '${data.name}')" > <i class="fa solid fa-door-open"></i> </button>`;
            divActions += '</div>';
            return divActions;
        },
    },  
];


let load_shift_json = {
    "location":{
        "name": "Ubicacion Monterrey",
        "booth": "Caseta Sur 1",
        "city": "Monterrey",
        "state": "Nuevo Leon",
        "address": "Calzada Madero S/N",
        "boot_stats":{
            "in_invitees":11,
            "articulos_concesionados":12,
            "incidentes_pendites": 13,
            "vehiculos_estacionados": 14,
            "gefetes_pendientes": 15,
        },
        "boot_status":{
            "status": "No Disponible", 
            "guard_on_duty": "Pancho Villa",
            "stated_at": "2024-03-17 13:54"
        },
        "support_guards":[
            {
                "id":1,
                "name": "Guardia de Sporte 1",
                "status": 'Disponible',
                "picture":{ 
                    "file_url":"https://w7.pngwing.com/pngs/298/171/png-transparent-avatar-face-girl-female-woman-profile-happy-avatar-icon.png",
                    "file_name": "guarida1"
                },
            },
            {
                "id":2,
                "name": "Guardia de Sporte 2",
                "status": 'Disponible',
                "picture":{ 
                    "file_url":"https://w7.pngwing.com/pngs/900/441/png-transparent-avatar-face-man-boy-male-profile-smiley-avatar-icon.png",
                    "file_name": "guarida2"
                }
            },
            {
                "id":3,
                "name": "Guardia de Sporte 3",
                "status": 'Disponible',
                "picture": { 
                    "file_url":"https://w7.pngwing.com/pngs/210/236/png-transparent-avatar-face-girl-female-woman-profile-happy-avatar-icon.png",
                    "file_name": "guarida3"
                },
            },
            {
                "id":4,
                "name": "Guardia de Sporte 4",
                "status": 'Disponible',
                "picture": { 
                    "file_url":"https://cdn.icon-icons.com/icons2/2859/PNG/512/avatar_face_man_boy_male_profile_smiley_happy_people_icon_181661.png",
                    "file_name": "guarida4"
                },
            }
        ]
    },
    "guard":{
        "name": "Rondalo Rulfo",
        "status": "Turno Cerrado",
        "last_turn_date": "2024-03-15 20:05:13",
        "id": 126,
        "email": "josepato@hotmail.com",
        "picture":{
            "file_url":"https://f001.backblazeb2.com/file/lkf-media/profile_pictures/profile_pic_20.thumbnail",
            "file_name":"profilepic1"
        },
    },
    "notes":[
        {
            "created_by":{
                "name":"Juan Esuctia",
                "id":12,
                "email": "juan@esuctia.com",
            },
            "note": "Esta es la nota 1",
            "status": "Abierta",
            "images":[
                {
                    "file_url":"https://b2.linkaform.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/65dd1061092cd19498857933.jpg",
                    "file_name":"foto nota 1"
                },
                {
                    "file_url":"https://b2.linkaform.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/64a5ecbb0f9ef281200b7dba.jpeg",
                    "file_name":"foto nota 2"
                }
            ],
            "documents":[
                {
                    "file_url":"https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/6650c41a967ad190e6a76dd3/6650c4b5967ad190e6a76dda.pdf",
                    "file_name":"doc1"
                },
                {
                    "file_url":"https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/6650c41a967ad190e6a76dd3/6650c4c503b772fc66a76de4.pdf",
                    "file_name":"doc1"
                }
            ],
            "comments":"Comentario 1",
            "created_at":1716569749,
            "closed_at":"",
            "duration":"",
            "tz_offset": -300,
            "timezone": "America/Monterrey",
            "folio": 1234,
            "form_id": 1152,
            "closed_by":{}
        },
        {
            "created_by": {
                "name":"Juan Enriquez",
                "id":123,
                "email": "juan@juan.com",
            },
            "note": "Esta es la nota 2",
            "status": "Abierta",
            "images":[],
            "documents":[
                {
                    "file_url":"https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/6650c41a967ad190e6a76dd3/6650c4d2e93e2a409709552a.pdf",
                    "file_name":"doc1"
                }
            ],
            "comments":"Comentario 2",
            "created_at":1716569749,
            "closed_at":"",
            "duration":"",
            "tz_offset": -300,
            "timezone": "America/Monterrey",
            "folio": 1232,
            "form_id": 1152,
            "closed_by":{}
        }
    ]
}