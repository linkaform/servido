let dicData = {
	'name': '',
	'fecha_hora':'',
	'user_deliver':'',
	'cedula':'',
	'telefono':'',
	'direccion':'',
	'silla':'',
	'checknew':'',
	'aspecto':'',
	'user_deliver_other':'',
	'img':'',
}


function setImg(){
	const fileInput = document.getElementById('inputFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('No existe archivo');
        return;
    }
 	const formData = new FormData();
	formData.append('File', file);
	formData.append('field_id', '6615c1390794eb4be10df580');
	formData.append('is_image', true);
	formData.append('form_id',  117320);

	fetch('https://app.linkaform.com/api/infosync/cloud_upload/', {
		method: 'POST',
		body: formData
	})
	.then(response => response.json())
	.then(res => {
		dicData['img'] = res.file ? res.file : '';
		$('#buttonSaveImg').hide();
		$('#inputFile').attr('disabled','disabled');
		alert('Se guardo la firma correctamente')
	})
	.catch(error => {
		alert('Error en la imagen');
		return 'Error';
	});
}

function getData(input){
	if(input == 'name'){
		let value = $('#inputName').val();
		dicData['name'] = value;

	}else if(input == 'date'){
		let value = $('#inputDate').val();
		dicData['fecha_hora'] = value;

	}else if(input == 'cedula'){
			let value = $('#inputCedula').val();
			dicData['cedula'] = value;

    }else if(input == 'telefono'){
			let value = $('#inputTelefono').val();
			dicData['telefono'] = value;

	}else if(input == 'direccion'){
			let value = $('#inputDireccion').val();
			dicData['direccion'] = value;	

	}else if(input == 'silla'){
			let value = $('#inputSilla').val();
			dicData['silla'] = value;

	}else if(input == 'check'){
		let valueCheked = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
		dicData['user_deliver'] = valueCheked;

	}else if(input == 'checknew'){
		let valueCheked = document.querySelector('input[name="radioline"]:checked').value;
		console.log('',valueCheked) 
		dicData['checknew'] = valueCheked;

	}else if(input == 'aspecto'){
		let value = $('#inputaspecto').val();
		dicData['aspecto'] = value;	

	}else if(input == 'otro'){
		let value = $('#inputOtro').val();
		dicData['user_deliver_other'] = value;
	}
}

function gettest(){let valueCheked = document.querySelector('input[name="radioline"]:checked').value;
console.log('',valueCheked)
dicData['checknew'] = valueCheked;
console.log(dicData) 
}

function setDataRecord(){
	getData('checknew');
	
	//let urlLinkaform = 'https://preprod.linkaform.com/infosync/scripts/run/';
	let urlLinkaform = 'https://app.linkaform.com/api/infosync/scripts/run/';
	fetch(urlLinkaform,{ 
		method: 'POST',
		body: JSON.stringify({
			script_id: 117319,
			formInformation: dicData,
			option: 'add_record',
		}),
		headers:{
			'Content-Type': 'application/json',
			'Access-Control-Request-Headers':'*'
		},
    })
    .then(res => res.json())
    .then(res => {
        // Verificar si la respuesta es exitosa
        if (res === '201') {
            // Mostrar alerta exitosa
            alert('Se ingresó exitosamente el registro');
            // Actualizar la página
            
        } else {
            // Manejar otros casos de respuesta
            alert('Se ingresó exitosamente el registro.');
			location.reload();
        }
    })
    .catch(error => {
        // Manejar errores de conexión
        alert('Hubo un error al conectarse al servidor. Inténtalo de nuevo.');
        console.error('Error:', error);
    });
}
function getFolioList() {
	let folio = $("#selectFolio").val();
	if(folio !=""){
		$("#divDataName").show();
		$("#divDataDate").show();
		$("#buttonUpdateRecord").show();
	}
}


function getValueCheck(){
	
	
	console.log('',dicData)
	let option = dicData.user_deliver;
	if(option == 'Otro'){
		$("#divInputOther").show();
	}else{
		$("#divInputOther").hide();
		dicData['user_deliver_other'] = '';
	}
	getData('check');
}

 $(".input-user-delivery").click( function(){
   	getValueCheck();
 });
 