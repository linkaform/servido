
let dicData = {
	'name': 'Josue',
	'fecha_hora':'',
	'user_deliver':'',
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
	formData.append('field_id', '63e65029c0f814cb466658a2');
	formData.append('is_image', true);
	formData.append('form_id',  95435);

	fetch('https://app.linkaform.com/api/infosync/cloud_upload/', {
		method: 'POST',
		body: formData
	})
	.then(response => response.json())
	.then(res => {
		dicData['img'] = res.file ? res.file : '';
		$('#buttonSaveImg').hide();
		$('#inputFile').attr('disabled','disabled');
		alert('Se guardo la foto')
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
	}else if(input == 'check'){
		let valueCheked = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
		dicData['user_deliver'] = valueCheked;
	}else if(input == 'otro'){
		let value = $('#inputOtro').val();
		dicData['user_deliver_other'] = value;
	}
}

function setDataRecord(){
	//let urlLinkaform = 'https://preprod.linkaform.com/infosync/scripts/run/';
	let urlLinkaform = 'https://app.linkaform.com/api/infosync/scripts/run/';
	fetch(urlLinkaform, {
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
		if(res == '201'){
			alert('Se ingreso exitosamente el registro')
		}else{
			alert('Hubo problemas')
		}
	})
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
	getData('check');
	let option = dicData.user_deliver;
	if(option == 'Otro'){
		$("#divInputOther").show();
	}else{
		$("#divInputOther").hide();
		dicData['user_deliver_other'] = '';
	}
}

 $(".input-user-delivery").click( function(){
   	getValueCheck();
 });