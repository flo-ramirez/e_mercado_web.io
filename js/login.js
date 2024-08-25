document.addEventListener('DOMContentLoaded', function() {
    const ingBtn = document.getElementById('ingBtn');
    const toast = document.getElementById('toast');
  
    ingBtn.addEventListener('click', (event) => {
      event.preventDefault(); // Evita que el formulario se envíe
  
      const usuario = document.getElementById('usuario').value.trim();
      const contrasena = document.getElementById('contrasena').value.trim();
      const checkbox = document.getElementById("ingreso").checked;
  
      // Verifica que ambos campos estén completos
      if (usuario.length > 0 && contrasena.length > 0) {
        if (checkbox) {
          // Guarda los datos solo si el checkbox está marcado
          localStorage.setItem('usuarioLogeado', usuario);
          localStorage.setItem('logueado', 'true');
        }
  
        // Redirige a index.html después de 1 segundo si ambos campos están completos
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      } else {
        // Muestra el cartel flotante si faltan datos
        showToast();
      }
  
      console.log('Usuario:', usuario);
      console.log('Contraseña:', contrasena);
      console.log('Checkbox marcado:', checkbox);
    });
  
    function showToast() {
      toast.classList.add('show'); // Muestra el toast
      setTimeout(() => {
        toast.classList.remove('show'); // Oculta el toast después de 3 segundos
      }, 3000);
    }
  });
  