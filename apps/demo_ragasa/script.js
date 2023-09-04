var flag_load = false;


function onClick() {
    valuePlant = $("#codePlant").val();
    valueUser = $("#codeUser").val();

    console.log('Value',valuePlant);
    if (valuePlant != "" && valueUser != ""){
        runRequest(valueUser, valuePlant);
    }else{
        Swal.fire({
            title: "Seleccione correctamente los filtros",
            icon: 'warning',
            showCancelButton: false,
        });
    }
};


function runRequest(codeUser, codePlant) {
    setClean();
    $('#divLoad').show();
    fetch('https://app.linkaform.com/api/infosync/scripts/run/', {
        method: 'POST',
        body: JSON.stringify({
            //script_id: 55115,
            script_id: 107705,
            code_curp: codeUser,
            code_plant: codePlant,
            flag: flag_load,
        }),
        headers:{
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.success) {
            dataUser = res.response.json
            getStylesDiv(dataUser);
        }
    });
}

function getStylesDiv(data){
    status = data.status;
    information = data.firstElement;
    if (status == "Authorized"){
        $("#imgUser").attr("src",information.image_colaborador);
        $("#nameUser").text(information.name_colaborador);
        $("#companyUser").text(information.company_colaborador);
        $("#textPlant").text(information.name_plant);
        $("#textValidity").text(information.expiration);

        $("#textType").text(information.type);
        $("#textDate").text(information.created_at);
        $("#textProyect").text(information.proyect_colaborador);
        $("#textStatus").text('Autorizado');

        if (information.access.length > 0){
            information.access.forEach(function(value,index) {
                $('#divAccess').append('<div class="col-sm-12 col-md-12 col-lg-4">'+
                    '<p class="font-weight-li ght mt-1 "><i class="fa-solid fa-diamond"></i>&nbsp;'+value+'</p>'+
                '</div>');
            });    
        }

        string_data = String(information.curp)+'|'+String(information.name_plant)+'|'+String(information.type)+'|'+String(information.name_colaborador)+'|'+String(information.company_colaborador);
        $('#divInformation').append('<input type="text" id="dataUser" value="'+string_data+'" />');
        document.getElementById("dataCard").style.removeProperty('display');
    }else if(status == "Unauthorized Time"){
        console.log()
        $("#imgBlockUser").attr("src",information.image_colaborador);
        $("#blockNameUser").text(information.name_colaborador);
        $("#blockCompanyUser").text(information.company_colaborador);
        $("#textBlockPlant").text(information.name_plant);
        $("#textBlockValidity").text(information.validity);
        document.getElementById("dataBlockCard").style.removeProperty('display');
    }else if(status == "Empty" || status == "Unauthorized"){
        document.getElementById("divEmpty").style.removeProperty('display');
    }
    $('#divLoad').hide();
    if (flag_load == true) {
        if(information.type == 'Entrada')
        {
            $("#buttonAddEquipment").show();
        }
        $("#buttonSend").show();
    }
    else
    {
        setTimeout(() => {
            $("#dataCard").hide();
            $("#dataBlockCard").hide();
            $("#codeUser").val('');
        }, "10000");
    }
}



function setClean(){
    $('#dataCard').hide();
    $('#dataBlockCard').hide();
    $('#divEmpty').hide();
    $('#divLoad').hide();
    $('#divAccess').empty();
    $('#divInformation').empty();
    $('#listItems').empty();

    $("#buttonAddEquipment").hide();
    $("#buttonSend").hide();

    $("#imgBlockUser").attr("src","https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/64f20728ae9055c88de293eb.png");
    $("#nameUser").text('Nombre');
    $("#companyUser").text('Compañia');
    $("#textPlant").text('Planta');
    $("#textValidity").text('YYYY-MM-DD');
    $("#textType").text('Tipo');
    $("#textDate").text('YYYY-MM-DD');
}

function setFlag(){
    if (document.getElementById('switchCheck').checked) {
        flag_load = true
    }else{
        flag_load = false
    }
    console.log('Valor',document.getElementById('switchCheck').checked)
}




function setAddItem(){
    let idTime =  new Date().valueOf();
    let textName = $("#textNameItem").val();
    let textDesc = $("#textDescItem").val();

    if(textName!="" && textDesc!=""){
        //----INFORMATION
        string_data = String(textName)+'|'+String(textDesc);
        $('#divInformation').append('<input type="text" class="dataItem" id="item_'+idTime+'" value="'+string_data+'" />');
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

function getDataModal(){
    let dic = {'data_user':'','list_item':[]}
    dic.data_user = $('#dataUser').val();

    $('.dataItem').each(function(){
        var data = $(this).val();
        console.log('list item', data);
        dic.list_item.push(data)
    });
    return dic
}

function setAddRegister(){
    $('#dataCard').hide();
    $('#divLoad').show();
    dic_data = getDataModal();

    fetch('https://app.linkaform.com/api/infosync/scripts/run/', {
        method: 'POST',
        body: JSON.stringify({
            script_id: 107881,
            data_record: dic_data,
        }),
        headers:{
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.success) {
            console.log('SUCCESS')

        }
    });

    setTimeout(() => {
        $('#divLoad').hide();
        $("#divSucces").show();
    }, "2000");

    setTimeout(() => {
        $("#divSucces").hide();
        $("#dataCard").hide();
        $("#codeUser").val('');
    }, "5000");
}

function pulse(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        onClick();
    }
}