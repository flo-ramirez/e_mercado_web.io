document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está logueado antes de cargar cualquier otra cosa
    const logueado = localStorage.getItem('logueado');
    const usuario = localStorage.getItem('usuarioLogueado');
    const userDropdown = document.getElementById('userDropdown');
    const mostrarUsuario = document.getElementById("userDropdown");
    const logoutButton = document.getElementById('logout');
    const user = JSON.parse(localStorage.getItem("user"))
    const userName = user.name;

    // Verificar si el usuario no está logueado
    if (logueado !== 'true') {
        window.location.href = 'login.html';
        return; // Detiene la ejecución del resto del código si el usuario no está logueado
    } else {
        // Mostrar el nombre del usuario en el menú desplegable
        if (userDropdown) {
            userDropdown.textContent = usuario;
        }
        // Alternativamente, puedes mostrar el nombre en otro lugar si prefieres
        if (mostrarUsuario) {
            mostrarUsuario.innerHTML = `<span class="nav-link" id="spnUsuario">${user.name}</span>`;
        }
    }

    // Evento para cerrar sesión
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('logueado');
            localStorage.removeItem('usuarioLogueado');
            localStorage.removeItem('user');
            localStorage.removeItem('catID');
            window.location.href = 'login.html'; // Redirigir a la página de login después de cerrar sesión
        });
    }
});
