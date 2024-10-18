document.addEventListener('DOMContentLoaded', function() {
    const userName = localStorage.getItem('authenticatedUser'); // Reemplaza con la clave correcta si es necesario
    if (usuarioLogueado) {
      document.getElementById('userDropdown').textContent = userName;
    }
  });
  
  document.getElementById('logout').addEventListener('click', function() {
      // Eliminar el usuario autenticado de localStorage
      localStorage.removeItem('authenticatedUser'); // Cambia 'authenticatedUser' por la clave correspondiente
      
      // Redirigir a la página de inicio de sesión
      window.location.href = 'login.html';
    });
    