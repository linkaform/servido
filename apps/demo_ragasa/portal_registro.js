//---New FUnction
let listItems = [];

window.onload = function(){
    getListLocations();
}


//---Redirection
function redirectionUrl(){
    let protocol = window.location.protocol;
    let host = window.location.host;
    let urlNew =  `${protocol}//${host}/demo_ragasa/portal_consulta.html`;
    Object.assign(document.createElement('a'), {
        target: '_blank',
        rel: 'noopener noreferrer',
        href: urlNew,
    }).click();
}

//--- CLean a card
function setCleanBody(){
    $("#imgBlockUser").attr("src","https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/64f20728ae9055c88de293eb.png");
    $("#nameUser").text('');
    $("#companyUser").text('');
    $("#textType").text('');
    $("#textValidity").text('');
    $("#textDateNow").text('');
    $("#textServices").text('');
    $("#divAccess").empty();
    $("#divEquipment").empty();
    $('#buttonRegister').show();
    $('#buttonEquipment').show();
    $("#divRegister").removeClass("col-12");
    $("#divRegister").addClass("col-4");
    $('#listItems').empty();
}

//---Set Information 
function setInformationDiv(data){
    let divStatus = document.getElementById("divStatus");
    divStatus.classList.remove("card_authorized");
    divStatus.classList.remove("card_noAuthorized");
    status = data.status_user;
    if (status !== ""){
        let urlImage = data.img_user && data.img_user[0] ? data.img_user[0].file_url : ''; 
        $("#imgUser").attr("src",urlImage);
        $("#nameUser").text(data.name_user);
        $("#companyUser").text(data.company_user);
        $("#textType").text(data.type_movement);
        $("#textValidity").text(data.date_validity);
        $("#textDateNow").text(getTimeNow()); 
        $("#textServices").text(data.services_user); 
        //--Iteration access
        if (data.list_access.length > 0){
            for (var i = 0; i < data.list_access.length; i++) {
                nameAcess = data.list_access[i].name_access ; 
                $('#divAccess').append('<div class="col-sm-12 col-md-12 col-lg-4">'+
                    '<p class="font-weight-li ght mt-1 "><i class="fa-solid fa-diamond"></i>&nbsp;'+nameAcess+'</p>'+
                '</div>');
            }
        }
        //--Iteration items
        if (data.list_item.length > 0){
            for (var i = 0; i < data.list_item.length; i++) {
                nameItems = data.list_item[i].name_item ; 
                $('#divEquipment').append('<div class="col-sm-12 col-md-12 col-lg-4">'+
                    '<p class="font-weight-li ght mt-1 "><i class="fa-solid fa-diamond"></i>&nbsp;'+nameItems+'</p>'+
                '</div>');
            }
        }
        //--Conditional
        if(status == 'Valido'){
            $("#textStatus").text('Autorizado');
            divStatus.classList.add("card_authorized");
        }else if(status == 'Invalido'){
            $("#textStatus").text('No Autorizado');
            divStatus.classList.add("card_noAuthorized");
        }
        //-----MOvement
        if(data.type_movement == 'Entrada'){
            $('#buttonEquipment').show();
            $("#divRegister").removeClass("col-12");
            $("#divRegister").addClass("col-4");
        }else{
            $('#buttonEquipment').hide();
            $("#divRegister").removeClass("col-4");
            $("#divRegister").addClass("col-12");
        }
        $('#divLoad').hide();
        $('#dataCard').show();
        document.getElementById("dataCard").style.removeProperty('display');
    }
    $('#divLoad').hide();   
}

///-----Function Modal
function setAddItem(){
    let idTime =  new Date().valueOf();
    let textName = $("#textNameItem").val();
    let textDesc = $("#textDescItem").val();
    if(textName!="" && textDesc!=""){
        //----INFORMATION
        string_data = String(textName)+'|'+String(textDesc);
        listItems.push(string_data);
        $('#listItems').append('<li class="list-group-item" id="li_'+idTime+'">'+textName+'</li>');
        //---CLEAN AN ALERT
        $("#textNameItem").val('');
        $("#textDescItem").val('');
        $("#alertAdd").show();
        setTimeout(() => {
            $("#alertAdd").hide();
        }, "2000");
    }else{
        $("#alertEmpty").show();
        setTimeout(() => {
            $("#alertEmpty").hide();
        }, "2000");
    }
}


//----Get Time Format
function getTimeNow(){
    let dateNow = new Date();
    let day = dateNow.getDate();
    let month = dateNow.getMonth() + 1; 
    let year = dateNow.getFullYear();
    let hours = dateNow.getHours();
    let minutes = dateNow.getMinutes();
    let seconds = dateNow.getSeconds();
    let dateFormat = year + "-" + (month < 10 ? '0' : '') + month + "-" + (day < 10 ? '0' : '') + day;
    let timeFormat = (hours < 10 ? '0' : '') + hours + ":" + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    let dateAll = dateFormat + " " + timeFormat;
    return dateAll;
}   

//---Get location
function getListLocations(){
    let url = 'https://app.linkaform.com/api/infosync/scripts/run/';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            script_id: 107705,
            option: 'get_locations',
        }),
        headers:{
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.success) {
            dataLocations = res.response.json;
            if(dataLocations.length > 0){
                for (let i = 0; i  < dataLocations.length; i++) {
                    let name = dataLocations[0].name;
                    let select = document.getElementById("codeLocation");
                    let option = document.createElement("option");
                    option.text = name;
                    option.value = name;
                    select.appendChild(option);
                }
            }
        }
    });
}

//----Onclick Rquest
function onClickRequest(){
    let url = 'https://app.linkaform.com/api/infosync/scripts/run/';
    valuePlant = $("#codeLocation").val();
    valueUser = $("#codeUser").val();

    if(valuePlant!= undefined && valueUser != undefined){
        $('#divLoad').show();
        $('#divEmpty').hide();
        $('#dataCard').hide();
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                script_id: 107705,
                option: 'get_information',
                code_curp: valueUser,
                code_plant: valuePlant,
            }),
            headers:{
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                dataFormat = res.response.json;
                if(dataFormat.data){
                    listItems = [];
                    setCleanBody();
                    setInformationDiv(dataFormat.data);
                }else{
                    $('#divEmpty').show();
                    $('#divLoad').hide();
                }
            }
        });
    }else{
        $('#divLoad').hide();
    }
}


//----Create Registro
function onClickSetRegister(){
    let url = 'https://app.linkaform.com/api/infosync/scripts/run/';
    let valuePlant = $("#codeLocation").val();
    let valueUser = $("#codeUser").val();
    if (valuePlant != "" && valueUser != ""){
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                script_id: 107705,
                option: 'set_record',
                code_curp: valueUser,
                code_plant: valuePlant,
                equipment: listItems,
            }),
            headers:{
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                responseStatus = res.response.status;
                if(responseStatus =='201' || responseStatus =='202'){
                    Swal.fire({
                        title: "Se a registrado el movimiento de el usuario",
                        icon: 'success',
                        showCancelButton: false,
                    });
                    $('#buttonRegister').hide();
                    $('#buttonEquipment').hide();
                }else{
                    Swal.fire({
                        title: "No se registro el movimiento del usuario",
                        icon: 'warning',
                        showCancelButton: false,
                    });
                }
            }
        });
    }else{
        Swal.fire({
            title: "Seleccione correctamente los filtros",
            icon: 'warning',
            showCancelButton: false,
        });
    }
}