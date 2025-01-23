var userActualPage=''; 
var userStatusTurn=''; 
var arrayUserBoothsLocations=[];
let userJwt = getCookie("userJwt_soter");
let coloresArray=["Amarillo", "Azul", "Beige", "Blanco", "Cafe", "Crema", "Dorado", "Gris", 
    "Morado", "Naranja","Negro", "Plateado", "Rojo", "Rosa", "Verde", "Violeta", "Otro"]

function setValueUserLocation(txt){
	userActualPage=txt;
}

function getValueUserLocation(){
	return userActualPage;
}

function getStatusTurn(){
	return userStatusTurn;
}
function setStatusTurn(txt){
	userStatusTurn= txt;
}

//-----TABLES
function drawTable(id, columnsData, tableData,){
    var  table = new Tabulator("#" + id, {
        layout:"fitDataTable",
        data:tableData,
        textDirection:"ltr",
        columns:columnsData,
        pagination:true, 
        paginationSize:40,
        placeholder: "No hay registros disponibles", 
  });
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires+"; SameSite=Strict";
}

function loadBoothsLocations(){
    fetch(url + urlScripts, {
    method: 'POST',
    body: JSON.stringify({
        script_name: 'script_turnos.py',
        option:'get_user_booths'
    }),
    headers:
        {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+userJwt
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            if(user !='' && userJwt!=''){
                arrayUserBoothsLocations=[]
                let userBooths=res.response.data
                if(userBooths.length>0){
                    for(let booth of userBooths){
                        arrayUserBoothsLocations.push({name:booth.area, ubi:booth.location, status:booth.status , guard: booth.employee, folio: booth.folio})
                    }
                }else{
                    arrayUserBoothsLocations=[]
                }
            }
        }
    });
}

function enviarCorreoPase(bodyPost){
    // loadingService('Enviando correo...')
    fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify(bodyPost),
        headers:{
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer '+userJwt
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            let dataR=res.response.data
            if(dataR.status_code==400 || dataR.status_code==401){
                errorAlert(dataR)
            }else if(dataR.status_code==202 || dataR.status_code==201){
                // Swal.close()
                // successMsg("Confirmación", "Correo enviado correctamente.", "success")
            }
        }else{
            errorAlert(res)
        }
    })
}

async function enviarSmsPase(bodyPost){
    loadingService("Enviando sms...")
    await fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify(bodyPost),
        headers:{
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer '+userJwt
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            let dataR=res.response.data
            if(dataR.status_code==400 || dataR.status_code==401){
                errorAlert(dataR)
            }else if(dataR.status_code==202 || dataR.status_code==201 || dataR.status_code==200){
                Swal.close()
                successMsg("Confirmación", "Mensaje enviado correctamente.", "success")
            }
        }else{
            Swal.close()
            errorAlert(res)
        }
    })
}

async function get_pdf(qr_code, account_id){
    let pdf=""
    // loadingService()
    console.log("URL" ,url, urlScripts)
    await fetch(url + urlScripts, {
            method: 'POST',
            body: JSON.stringify({
                script_name:"pase_de_acceso_use_api.py",
                option:"get_pdf",
                qr_code: qr_code,
                account_id: parseInt(account_id) 
            }),
            headers:{
                'Content-Type': 'application/json',
                 // 'Authorization': 'Bearer '+userJwt
            },
        })
        .then(res => res.json())
        .then(res => {
            console.log("QUE PASAAaaaA")
            if(res.success){
                Swal.close()
                pdf=res.response.data.data
            }else{
                Swal.close()
                errorAlert(res)
            }
        })
    return pdf
}

function descargarPdfPase(url_pase){
    loadingService('Obteniendo tu información...')
    fetch(url_pase)
        .then(response => {
            // Verificar si la respuesta es correcta
            if (!response.ok) {
                throw new Error('No se pudo obtener el archivo');
            }
            return response.blob();  // Convertir la respuesta en un Blob
        })
        .then(blob => {
            // Crear un enlace de descarga con el Blob
            const url = URL.createObjectURL(blob); // Crear una URL temporal del Blob

            // Crear un enlace <a> para iniciar la descarga
            const a = document.createElement('a');
            a.href = url;
            a.download = 'PASE_DE_ENTRADA.pdf'; // Nombre del archivo descargado
            document.body.appendChild(a);
            a.click(); // Hacer clic en el enlace para descargar el archivo

            // Limpiar: eliminar el enlace temporal
            document.body.removeChild(a);
            URL.revokeObjectURL(url); // Liberar la URL temporal

            setTimeout(() => {
                Swal.close()
                // successMsg("Confirmación", "Información enviada correctamente.", "success")
                Swal.fire({
                    type:"success",
                    title: "Confirmación",
                    text: "Información enviada correctamente",
                    showConfirmButton:true,
                    confirmButtonText: "Ok",
                    onClose: () => {
                        setTimeout(() => {
                            redirectionUrl("login", false)
                        }, 1000)
                    }
                })
            }, 7000)
        })
        .catch(error => {
            console.error('Error al descargar el PDF:', error);
        });
}


function validURL(actualPage){
    console.log("hii")
    let menus = getCookie('menus_soter') !==''? JSON.parse(getCookie('menus_soter')):""
    menus.push('menu')
    if(!menus.includes(actualPage)){
        if(user !=='' && userJwt !=='' ){
            redirectionUrl("menu", false,false)
        }
    }
}

async function getMenuFetch(){
    $("#spinner").show()
    let menus=[]
    await fetch(url + urlScripts, {
        method: 'POST',
        body: JSON.stringify({
            script_name:"script_turnos.py",
            option:"get_user_menu",
        }),
        headers:
        {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+userJwt
        },
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){
            $("#spinner").hide()
            menus = res.response.data.menus  || []
        }else{
            $("#spinner").hide()
            errorAlert(res)
        }
    })
    return menus
}