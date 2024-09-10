// Verifica que el usuario esté logueado, sino redirige al login
document.addEventListener("DOMContentLoaded", function(){
    // Verificar si el usuario está logueado antes de cargar cualquier otra cosa
    const logueado = localStorage.getItem('logueado');
    const usuario = localStorage.getItem('usuarioLogeado');
    const liMostrarUsuario = document.getElementById("liMostrarUsuario");
    const Logout = document.getElementById("aLogout")
    if (logueado !== 'true'){
        window.location.href = 'login.html';
        return; // Detiene la ejecución del resto del código si el usuario no está logueado
    }
    else {
        liMostrarUsuario.innerHTML = `<span class="nav-link" id="spnUsuario">${usuario}</span>`;
    }
    Logout.addEventListener("click", function(){
        localStorage.removeItem('logueado');
        localStorage.removeItem('usuarioLogeado', null);

    })
});