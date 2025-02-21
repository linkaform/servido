window.onload = function () {
    const newPassInput = document.getElementById('new_pass');
    const confirmPassInput = document.getElementById('confirm_pass');
    const newPassError = document.getElementById('new_pass_error');
    const confirmPassError = document.getElementById('confirm_pass_error');

    newPassInput.addEventListener('input', function () {
        if (newPassInput.value.length < 6) {
            newPassError.style.display = 'block';
        } else {
            newPassError.style.display = 'none';
        }
    });

    confirmPassInput.addEventListener('input', function () {
        if (confirmPassInput.value.length < 6) {
            confirmPassError.style.display = 'block';
        } else {
            confirmPassError.style.display = 'none';
        }
    });

    document.getElementById('update_pass_form').addEventListener('submit', function (event) {
        event.preventDefault();
        const newPass = newPassInput.value;
        const confirmPass = confirmPassInput.value;

        if (!newPass || !confirmPass) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, completa todos los campos.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
            return;
        }

        if (newPass.length < 6 || confirmPass.length < 6) {
            Swal.fire({
                title: 'Error',
                text: 'La contraseña debe tener al menos 6 caracteres.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
            return;
        }

        if (newPass !== confirmPass) {
            Swal.fire({
                title: 'Error',
                text: 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
            return;
        }

        updatePassword(newPass, confirmPass);
        document.getElementById('update_pass_form').reset();
    });
};


async function updatePassword(newPass, confirmPass){
    const urlParams = new URLSearchParams(window.location.search);
    let userId = urlParams.get('userId_soter');
    //Falta una forma de obtener el JWT para hacer la peticion
    let userJwt=''
    let urlChangeImage= `https://app.linkaform.com/api/infosync/user_admin/${userId}/`
    
    loadingService()
    await fetch(urlChangeImage, {
        method: 'PATCH',
        body: JSON.stringify({
            password: newPass,
            password2: confirmPass,
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userJwt
        },
    })
    .then(res => {
        if(res.status == 202){
            Swal.fire({
                title: 'Contraseña actualizada',
                text: 'La contraseña ha sido actualizada con éxito',
                icon: 'success',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: 'Aceptar',
                onClose: () => {
                    window.location.href = 'https://app.soter.mx/login.html';
                },
            })
        }else{
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al actualizar la contraseña',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
    })
    .catch(err => {
        console.log(err)
        Swal.close()
    })
};