document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está logueado antes de cargar cualquier otra cosa
    const logueado = localStorage.getItem('logueado');
    const userDropdown = document.getElementById('userDropdown');

    // Verificar si el usuario no está logueado
    if (logueado !== 'true') {
        window.location.href = 'login.html';
        return; // Detiene la ejecución del resto del código si el usuario no está logueado
    } else {
        // Recuperar el objeto JSON del usuario
        
        const usuarioLogueado = localStorage.getItem('user');
        let user;

        try {
            if (usuarioLogueado) {
                user = JSON.parse(usuarioLogueado);  // Recuperar el objeto JSON correctamente
                console.log(user);  // Verifica el contenido del objeto

                // Mostrar el nombre del usuario en el dropdown
                if (userDropdown) {
                    userDropdown.textContent = user.name;  // Cambiar el texto del enlace a el nombre del usuario
                }
            } else {
               
                console.log("No hay usuario logueado");
            }
        } catch (error) {
            console.error("Error al parsear JSON: ", error);
        }
    }

    // Evento para cerrar sesión
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();  // Prevenir la acción predeterminada del enlace
            console.log("Se hizo clic en el botón de logout");

            // Eliminar datos del localStorage
            localStorage.removeItem('logueado');
            localStorage.removeItem('usuarioLogueado');

            // Redirigir a la página de login después de un pequeño delay
            setTimeout(function() {
                window.location.href = 'login.html'; // Redirige a la página de login
            }, 0,2); // Espera 1 segundo antes de redirigir
        });
    }
});
