window.onload = function () {
    document.getElementById("btnRequest").addEventListener("click", () => {
        sendRequest();
    });
    document.getElementById("spanEye").addEventListener("click", () => {
        togglePassword();
    });
};

async function sendRequest() {
    const email = document.getElementById("inputEmail").value.trim();
    const password = document.getElementById("inputPassword").value.trim();

    if (!validationRequest(email, password)) {
        return;
    }

    try {
        const response = await fetch(getUrlRequest("login"), {
            method: "POST",
            body: JSON.stringify({
                username: email,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const res = await response.json();
        if (res.hasOwnProperty("code") && res.code === 2) {
            await setCookies(res);
            Swal.fire({
                title: "¡Éxito, se ha logueado!",
                icon: "success",
                draggable: false,
            });
            setTimeout(() => {
                redirection_before_tab();
            }, 2000);
        } else {
            Swal.fire({
                title: "Error",
                html: res.error || "Ocurrió un error desconocido.",
                icon: "error",
            });
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            html: "Ocurrió un problema al realizar la solicitud.",
            icon: "error",
        });
        console.error("Error en la solicitud:", error);
    }
}

function validationRequest(email, password) {
    if (!email) {
        Swal.fire({
            title: "Error",
            html: "Es necesario ingresar un correo electrónico válido.",
            icon: "error",
        });
        return false;
    }

    if (!password) {
        Swal.fire({
            title: "Error",
            html: "Es necesario ingresar una contraseña válida.",
            icon: "error",
        });
        return false;
    }

    return true;
}

async function setCookies(response) {
    const userJwt = response.jwt || "";
    const sessionId = response.session_id || 0;
    const userId = response.user?.id || 0;
    const userName = response.user?.first_name || "";
    const userParentId = response.user?.parent_info?.id || 0;

    setCookie("sessionid", sessionId, 7);
    setCookie("userId", userId, 7);
    setCookie("userJwt", userJwt, 7);
    setCookie("userName", userName, 7);
    setCookie("userParentId", userParentId, 7);

    await getCompanyLogo(userParentId);
}

function togglePassword() {
    const passwordField = document.getElementById("inputPassword");
    const toggleIcon = document.querySelector(".toggle-password i");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleIcon.classList.replace("bi-eye-slash", "bi-eye");
    } else {
        passwordField.type = "password";
        toggleIcon.classList.replace("bi-eye", "bi-eye-slash");
    }
}
