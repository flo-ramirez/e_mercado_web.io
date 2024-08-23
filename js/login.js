document.getElementById('formulario_ingreso').addEventListener('submit', function(event) {
    const usuario = document.getElementById('usuario');
    const contrasena = document.getElementById('contrasena');

    const password1 = document.getElementById('password1').value;
    const password2 = document.getElementById('password2').value;
    const passwordHelp = document.getElementById('passwordHelp');
    const checkbox = document.getElementById("ingreso");
    const mensajeError = document.getElementById("mensajeError");
    let formValid = true;

    /*/ codigo reutilizable de la tarea anterior --- Validación de la contraseña
    if (password1.length < 6) {
        passwordHelp.textContent = "La contraseña debe tener al menos 6 caracteres.";
        formValid = false;
    } else if (password1 !== password2) {
        passwordHelp.textContent = "Las contraseñas no coinciden.";
        formValid = false;
    } else {
        passwordHelp.textContent = "";
    }

    // Validación del checkbox
    if (!checkbox.checked) {
        mensajeError.textContent = "Debes aceptar los términos y condiciones para continuar.";
        formValid = false;
    } else {
        mensajeError.textContent = "";
    }

    // Si la validación falla, se previene el envío del formulario
    if (!formValid) {
        event.preventDefault();
        showAlertError();
    } else {
        showAlertSuccess();
    }
});

function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
    */
}
