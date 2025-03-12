const urlParams = new URLSearchParams(window.location.search);
let userNameUrl = urlParams.get('userUsername');

window.onload = function () {
    const newPassInput = document.getElementById('new_pass');
    const confirmPassInput = document.getElementById('confirm_pass');
    const actualPassInput = document.getElementById('actual_pass');
    const newPassError = document.getElementById('new_pass_error');
    const confirmPassError = document.getElementById('confirm_pass_error');
    const userNameSpan = document.getElementById('userNameSpan');
    
    userNameSpan.innerText = userNameUrl;

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
        const actualPass = actualPassInput.value;

        if (!newPass || !confirmPass || !actualPass) {
            Swal.fire({
                title: 'Aviso',
                text: 'Por favor, completa todos los campos.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
            return;
        }

        if (newPass.length < 6 || confirmPass.length < 6) {
            Swal.fire({
                title: 'Aviso',
                text: 'La contraseña debe tener al menos 6 caracteres.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
            return;
        }

        if (newPass !== confirmPass) {
            Swal.fire({
                title: 'Aviso',
                text: 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
            return;
        }

        getLoginCreds(userNameUrl, actualPass, newPass, confirmPass);
        document.getElementById('update_pass_form').reset();
    });

    const toggleButtons = document.querySelectorAll(".toggle-password");

    toggleButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const targetId = button.getAttribute("data-target");
            const passwordInput = document.getElementById(targetId);

            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                button.innerHTML = `<i class="fa-regular fa-eye"></i>`;
            } else {
                passwordInput.type = "password";
                button.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
            }
        });
    });

    activateAccount();
};

async function activateAccount(){
    let urlActivateAccount= `https://app.linkaform.com/api/infosync/activate_user/`
    
    await fetch(urlActivateAccount, {
        method: 'POST',
        body: JSON.stringify({
            username: userNameUrl,
        }),
        headers:{
            'Content-Type': 'application/json',
        },
    })
    .then(res => {
        if(res.status == 202){
            console.log('Cuenta activada');
        }else{
            console.log('La cuenta ya se encuentra activa');
        }
    })
    .catch(err => {
        console.log(err);
    })
};

function getLoginCreds(userUsername, userPassword, newPass, confirmPass){
    loadingService();
    let urlLogin = `https://app.linkaform.com/api/infosync/user_admin/login/`

    if(userUsername !='' && userPassword!=''){
        fetch(urlLogin, {
            method: 'POST',
            body: JSON.stringify({
                username: userUsername,
                password: userPassword,
            }),
            headers:{
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.code == 2){
                let userId = res.user && res.user.id ? res.user.id : 0;
                let userJwt = res.jwt ? res.jwt : '';
                setCookie("userId_soter", userId, 7);
                setCookie("userJwt_soter", userJwt, 7);
                updatePassword(newPass, confirmPass);
            }else{
                Swal.fire({
                    title: 'Aviso',
                    text: res.error,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            }
        })
    }else{
        console.log('Faltan datos en login')
    }
};

function clearCookies(nombres) {
    nombres.forEach(nombre => {
        document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
};

async function updatePassword(newPass, confirmPass){
    let userId = getCookie('userId_soter');
    let userJwt = getCookie('userJwt_soter');
    let urlChangePassword= `https://app.linkaform.com/api/infosync/user_admin/${userId}/`
    
    await fetch(urlChangePassword, {
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
                    setUserActiveInForm()
                },
            })
        }else{
            Swal.fire({
                title: 'Aviso',
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

const LKF_ENDPOINT_UPDATE_USER_REGISTER = 'https://app.linkaform.com/api/infosync/scripts/run/'

async function setUserActiveInForm(){
    const userJwt = getCookie('userJwt_soter')
    const userId = parseInt(getCookie('userId_soter'))

    try{
        const res = await fetch(LKF_ENDPOINT_UPDATE_USER_REGISTER, {
            method: 'POST',
            body: JSON.stringify({
                script_id: 130440,
                userId: userId,
                username: userNameUrl,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userJwt
            }
        })
        const data = await res.json()
        if (data.reponse == 200 || data.reponse == 201 || data.reponse == 202){
            clearCookies(["userId_soter", "userJwt_soter"]);
            window.location.href = 'https://app.soter.mx/login.html';
        }else{
            Swal.fire({
                title: 'Aviso',
                text: 'Hubo un error al actualizar tu cuenta',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
    }catch(e){
        throw new Error('Error updating register in lkf', e)
    }
}